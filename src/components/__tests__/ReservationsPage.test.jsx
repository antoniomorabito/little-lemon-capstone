import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ReservationsPage from "../ReservationsPage" // Sesuaikan path jika perlu


// Mock fungsi global fetchAPI dan submitAPI
global.fetchAPI = jest.fn()
global.submitAPI = jest.fn()

// Helper untuk mendapatkan tanggal dalam format YYYY-MM-DD
const getTodayDateString = () => {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
}

describe("ReservationsPage", () => {
  beforeEach(() => {
    // Reset mock sebelum setiap tes
    global.fetchAPI.mockClear()
    global.submitAPI.mockClear()
    // Reset semua spy dan mock lainnya jika ada
    jest.restoreAllMocks()
  })

  test("initializes times on mount and displays them", async () => {
    const mockTimes = ["17:00", "18:00", "19:00"]
    global.fetchAPI.mockResolvedValue(mockTimes)

    render(<ReservationsPage />)

    // 1. Tunggu fetchAPI dipanggil
    await waitFor(() => {
      expect(global.fetchAPI).toHaveBeenCalledTimes(1)
    })
    const today = new Date(getTodayDateString())
    expect(global.fetchAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        getFullYear: today.getFullYear,
        getMonth: today.getMonth,
        getDate: today.getDate,
      }),
    )

    // 2. Pastikan elemen select (label) ada di dokumen.
    const timeSelectLabel = screen.getByLabelText(/choose time/i)
    expect(timeSelectLabel).toBeInTheDocument()

    // 3. Gunakan findBy* untuk menunggu opsi pertama muncul.
    // Ini menandakan bahwa state telah diperbarui dan UI telah dirender ulang.
    await screen.findByRole("option", { name: mockTimes[0] })

    // 4. Setelah opsi pertama dikonfirmasi ada, verifikasi semua opsi lainnya.
    // getBy* cocok di sini karena kita mengharapkan elemen sudah ada.
    for (const time of mockTimes) {
      expect(screen.getByRole("option", { name: time })).toBeInTheDocument()
    }
  })

  test("fetches new times when date is changed", async () => {
    const initialMockTimes = ["17:00", "18:00"]
    const newDateMockTimes = ["20:00", "21:00"]
    global.fetchAPI.mockResolvedValueOnce(initialMockTimes).mockResolvedValueOnce(newDateMockTimes)

    render(<ReservationsPage />)

    await waitFor(() => expect(global.fetchAPI).toHaveBeenCalledTimes(1))

    const dateInput = screen.getByLabelText(/choose date/i)
    const newTestDateString = "2025-12-25"
    fireEvent.change(dateInput, { target: { value: newTestDateString } })

    await waitFor(() => {
      expect(global.fetchAPI).toHaveBeenCalledTimes(2)
    })
    const newTestDateObject = new Date(newTestDateString)
    newTestDateObject.setHours(0, 0, 0, 0)
    const lastCallArgs = global.fetchAPI.mock.calls[1][0]
    lastCallArgs.setHours(0, 0, 0, 0)
    expect(lastCallArgs.toISOString().split("T")[0]).toEqual(newTestDateObject.toISOString().split("T")[0])

    // Gunakan findBy* untuk menunggu opsi pertama dari waktu baru muncul.
    await screen.findByRole("option", { name: newDateMockTimes[0] })

    for (const time of newDateMockTimes) {
      expect(screen.getByRole("option", { name: time })).toBeInTheDocument()
    }
    for (const time of initialMockTimes) {
      expect(screen.queryByRole("option", { name: time })).not.toBeInTheDocument()
    }
  })

  test("submits form data and shows confirmation on success", async () => {
    const user = userEvent.setup()
    const mockInitialTimes = ["17:00"]
    global.fetchAPI.mockResolvedValue(mockInitialTimes)
    global.submitAPI.mockResolvedValue(true)

    render(<ReservationsPage />)

    await waitFor(() => expect(global.fetchAPI).toHaveBeenCalled())

    const dateInput = screen.getByLabelText(/choose date/i)
    const todayDateStr = getTodayDateString()
    fireEvent.change(dateInput, { target: { value: todayDateStr } })

    // Gunakan findBy* untuk menunggu opsi waktu muncul sebelum memilih
    await screen.findByRole("option", { name: "17:00" })
    await user.selectOptions(screen.getByLabelText(/choose time/i), "17:00")

    const guestsInput = screen.getByLabelText(/number of guests/i)
    await user.clear(guestsInput)
    await user.type(guestsInput, "2")
    const nameInput = screen.getByLabelText(/full name/i)
    await user.type(nameInput, "John Doe")
    const phoneInput = screen.getByLabelText(/phone number/i)
    await user.type(phoneInput, "123-456-7890")

    const submitButton = screen.getByRole("button", { name: /confirm reservation/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(global.submitAPI).toHaveBeenCalledTimes(1)
    })
    expect(global.submitAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        date: todayDateStr,
        time: "17:00",
        guests: 2,
        name: "John Doe",
        phone: "123-456-7890",
      }),
    )

    // findBy* sudah benar digunakan di sini.
    expect(await screen.findByRole("heading", { name: /thank you, john doe!/i })).toBeInTheDocument()
  })

  test("handles API failure when fetching times", async () => {
    global.fetchAPI.mockRejectedValue(new Error("API Error"))
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {})

    render(<ReservationsPage />)

    await waitFor(() => {
      expect(global.fetchAPI).toHaveBeenCalledTimes(1)
    })

    const timeSelect = screen.getByLabelText(/choose time/i)
    // Di sini, kita menunggu perubahan atribut pada elemen yang sudah ada.
    // `waitFor` dengan `expect` di dalamnya masih merupakan pola yang valid
    // karena `findBy*` adalah untuk *menemukan* elemen, bukan menunggu atribut berubah.
    await waitFor(() => {
      expect(timeSelect).toBeDisabled()
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to initialize times:", expect.any(Error))
  })
})
