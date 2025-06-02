import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ReservationsPage, { initializeTimes, updateTimes } from "../ReservationsPage"


// Mock Local Storage
let localStorageStore = {}
const localStorageMock = {
  getItem: jest.fn((key) => localStorageStore[key] || null),
  setItem: jest.fn((key, value) => {
    localStorageStore[key] = value.toString()
  }),
  removeItem: jest.fn((key) => {
    delete localStorageStore[key]
  }),
  clear: jest.fn(() => {
    localStorageStore = {}
  }),
}
Object.defineProperty(window, "localStorage", { value: localStorageMock })

// Mock fungsi global fetchAPI dan submitAPI yang SEKARANG berasal dari public/api.js
// Kita tidak perlu lagi mock implementasi fetchAPI dan submitAPI secara detail di sini
// karena kita akan menguji implementasi aktual di public/api.js melalui interaksi.
// Namun, kita tetap perlu spyOn mereka jika ingin mengecek pemanggilannya.
// Untuk tes initializeTimes, kita akan membiarkan fetchAPI (dari public/api.js) berjalan apa adanya.

// Helper untuk mendapatkan tanggal dalam format YYYY-MM-DD
const getTodayDateString = () => {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
}

const formatDateKeyForTest = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const defaultTestTimes = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]

describe("initializeTimes function (with localStorage-backed fetchAPI)", () => {
  beforeEach(() => {
    localStorageMock.clear() // Bersihkan localStorage mock sebelum setiap tes
    jest.clearAllMocks() // Bersihkan semua mock Jest (termasuk localStorageMock.getItem dll.)
    jest.spyOn(console, "error").mockImplementation(() => {}) // Supress console.error
    jest.spyOn(console, "log").mockImplementation(() => {}) // Supress console.log
  })

  afterEach(() => {
    console.error.mockRestore()
    console.log.mockRestore()
  })

  test("should call fetchAPI, which retrieves default times and stores them in localStorage if not present", async () => {
    const mockDispatch = jest.fn()
    const today = new Date()
    const todayKey = formatDateKeyForTest(today)

    // Pastikan tidak ada di localStorage awalnya
    expect(localStorageMock.getItem(todayKey)).toBeNull()

    await initializeTimes(mockDispatch) // Ini akan memanggil fetchAPI (versi localStorage)

    // Verifikasi bahwa localStorage.getItem dipanggil
    expect(localStorageMock.getItem).toHaveBeenCalledWith(todayKey)
    // Verifikasi bahwa localStorage.setItem dipanggil karena data belum ada
    expect(localStorageMock.setItem).toHaveBeenCalledWith(todayKey, JSON.stringify(defaultTestTimes))
    // Verifikasi bahwa dispatch dipanggil dengan default times
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_TIMES", payload: defaultTestTimes })
  })

  test("should call fetchAPI, which retrieves times from localStorage if present", async () => {
    const mockDispatch = jest.fn()
    const today = new Date()
    const todayKey = formatDateKeyForTest(today)
    const storedTimes = ["10:00", "11:00"]

    // Simpan data di localStorage mock terlebih dahulu
    localStorageMock.setItem(todayKey, JSON.stringify(storedTimes))
    // Reset mock setItem agar kita bisa cek apakah dipanggil lagi atau tidak
    localStorageMock.setItem.mockClear()

    await initializeTimes(mockDispatch)

    expect(localStorageMock.getItem).toHaveBeenCalledWith(todayKey)
    // setItem TIDAK boleh dipanggil lagi karena data sudah ada
    expect(localStorageMock.setItem).not.toHaveBeenCalled()
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_TIMES", payload: storedTimes })
  })

  test("should dispatch SET_TIMES with an empty array if fetchAPI (localStorage version) returns empty or fails", async () => {
    const mockDispatch = jest.fn()
    // Buat fetchAPI (global, dari api.js) mengembalikan array kosong untuk tes ini
    const originalFetchAPI = window.fetchAPI
    window.fetchAPI = jest.fn().mockResolvedValue([]) // Mock fetchAPI global sementara

    await initializeTimes(mockDispatch)

    expect(window.fetchAPI).toHaveBeenCalled() // Pastikan versi mock kita yang dipanggil
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_TIMES", payload: [] })

    window.fetchAPI = originalFetchAPI // Kembalikan fetchAPI asli
  })
})

describe("updateTimes reducer", () => {
  // Tes untuk updateTimes tidak berubah karena logikanya murni
  test("should return the new times when action type is SET_TIMES", () => {
    const initialState = ["17:00", "18:00"]
    const newTimes = ["10:00", "11:00", "12:00"]
    const action = { type: "SET_TIMES", payload: newTimes }
    const updatedState = updateTimes(initialState, action)
    expect(updatedState).toEqual(newTimes)
  })

  test("should return the current state for an unknown action type", () => {
    const initialState = ["17:00", "18:00"]
    const action = { type: "UNKNOWN_ACTION", payload: ["anything"] }
    const updatedState = updateTimes(initialState, action)
    expect(updatedState).toEqual(initialState)
  })
})

describe("ReservationsPage Component (with localStorage-backed API)", () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
    jest.spyOn(console, "error").mockImplementation(() => {})
    jest.spyOn(console, "log").mockImplementation(() => {})
    // Pastikan window.fetchAPI dan window.submitAPI adalah implementasi dari public/api.js
    // Jika public/api.js belum termuat oleh JSDOM, kita mungkin perlu memuatnya secara manual
    // atau memastikan JSDOM mengeksekusinya. Untuk sekarang, kita asumsikan sudah termuat.
  })
  afterEach(() => {
    console.error.mockRestore()
    console.log.mockRestore()
  })

  test("initializes times on mount (fetching from localStorage or generating defaults)", async () => {
    render(<ReservationsPage />)
    const todayKey = formatDateKeyForTest(new Date())

    await waitFor(() => {
      // fetchAPI (via initializeTimes) akan terpanggil
      // localStorage.getItem akan dipanggil untuk tanggal hari ini
      expect(localStorageMock.getItem).toHaveBeenCalledWith(todayKey)
    })

    // Jika ini adalah kali pertama (localStorage kosong), setItem akan dipanggil
    // dan opsi default akan ditampilkan
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(todayKey, JSON.stringify(defaultTestTimes))
    })

    for (const time of defaultTestTimes) {
      expect(await screen.findByRole("option", { name: time })).toBeInTheDocument()
    }
  })

  test("fetches new times when date is changed (from localStorage or generating defaults)", async () => {
    render(<ReservationsPage />)
    const user = userEvent.setup()

    // Tunggu inisialisasi awal selesai
    await waitFor(() => {
      expect(screen.getByRole("option", { name: defaultTestTimes[0] })).toBeInTheDocument()
    })
    localStorageMock.getItem.mockClear() // Clear mocks setelah panggilan awal
    localStorageMock.setItem.mockClear()

    const dateInput = screen.getByLabelText(/choose date/i)
    const newTestDateString = "2025-12-25"
    const newDateKey = formatDateKeyForTest(new Date(newTestDateString))

    fireEvent.change(dateInput, { target: { value: newTestDateString } })

    await waitFor(() => {
      expect(localStorageMock.getItem).toHaveBeenCalledWith(newDateKey)
    })
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(newDateKey, JSON.stringify(defaultTestTimes))
    })

    for (const time of defaultTestTimes) {
      expect(await screen.findByRole("option", { name: time })).toBeInTheDocument()
    }
  })

  test("submits form data and shows confirmation on success (submitAPI returns true)", async () => {
    render(<ReservationsPage />)
    const user = userEvent.setup()

    // Tunggu inisialisasi awal
    await screen.findByRole("option", { name: defaultTestTimes[0] })

    const dateInput = screen.getByLabelText(/choose date/i)
    const todayDateStr = getTodayDateString()
    fireEvent.change(dateInput, { target: { value: todayDateStr } })

    await user.selectOptions(screen.getByLabelText(/choose time/i), defaultTestTimes[0])
    await user.type(screen.getByLabelText(/number of guests/i), "2")
    await user.type(screen.getByLabelText(/full name/i), "John Doe")
    await user.type(screen.getByLabelText(/phone number/i), "123-456-7890")

    const submitButton = screen.getByRole("button", { name: /confirm reservation/i })
    await user.click(submitButton)

    await waitFor(() => {
      // submitAPI (dari public/api.js) akan mencatat ke localStorage
      expect(localStorageMock.setItem).toHaveBeenCalledWith("reservations_log", expect.any(String))
    })
    expect(await screen.findByRole("heading", { name: /thank you, john doe!/i })).toBeInTheDocument()
  })
})
