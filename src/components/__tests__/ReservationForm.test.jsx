import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ReservationForm from "../ReservationForm" // Path import disesuaikan

// Mock console.log untuk mencegah output selama tes, jika diperlukan
// beforeEach(() => {
//   jest.spyOn(console, 'log').mockImplementation(() => {});
// });
// afterEach(() => {
//   console.log.mockRestore();
// });

describe("ReservationForm", () => {
  test("renders all form fields and the submit button", () => {
    render(<ReservationForm />)

    // Cek label dan input terkait
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email $$optional$$/i)).toBeInTheDocument() // Perhatikan escape karakter khusus
    expect(screen.getByLabelText(/special requests $$optional$$/i)).toBeInTheDocument() // Perhatikan escape karakter khusus

    // Cek tombol submit
    expect(screen.getByRole("button", { name: /confirm reservation/i })).toBeInTheDocument()
  })

  test("updates form data on user input", async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    const nameInput = screen.getByLabelText(/full name/i)
    await user.type(nameInput, "John Doe")
    expect(nameInput).toHaveValue("John Doe")

    const guestsInput = screen.getByLabelText(/number of guests/i)
    await user.clear(guestsInput) // Hapus nilai default dulu jika ada
    await user.type(guestsInput, "4")
    expect(guestsInput).toHaveValue(4)

    const dateInput = screen.getByLabelText(/choose date/i)
    fireEvent.change(dateInput, { target: { value: "2025-12-25" } }) // userEvent.type tidak bekerja baik untuk type date
    expect(dateInput).toHaveValue("2025-12-25")

    const timeSelect = screen.getByLabelText(/choose time/i)
    await user.selectOptions(timeSelect, "20:00")
    expect(timeSelect).toHaveValue("20:00")

    const occasionSelect = screen.getByLabelText(/occasion/i)
    await user.selectOptions(occasionSelect, "Birthday")
    expect(occasionSelect).toHaveValue("Birthday")
  })

  test("shows confirmation message after successful submission with correct data", async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    // Isi semua field yang wajib
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: "2025-07-10" } })
    await user.selectOptions(screen.getByLabelText(/choose time/i), "19:00")
    const guestsInput = screen.getByLabelText(/number of guests/i)
    await user.clear(guestsInput)
    await user.type(guestsInput, "3")
    await user.selectOptions(screen.getByLabelText(/occasion/i), "Anniversary")
    await user.type(screen.getByLabelText(/full name/i), "Jane Roe")
    await user.type(screen.getByLabelText(/phone number/i), "123-456-7890")

    // Klik tombol submit
    const submitButton = screen.getByRole("button", { name: /confirm reservation/i })
    await user.click(submitButton)

    // Cek pesan konfirmasi
    expect(screen.getByRole("heading", { name: /thank you, jane roe!/i })).toBeInTheDocument()
    expect(
      screen.getByText(/your reservation for 3 guest$$s$$ on 2025-07-10 at 19:00 for anniversary has been requested./i), // Perhatikan escape karakter khusus
    ).toBeInTheDocument()
    expect(screen.getByText(/we will contact you shortly if any confirmation is needed./i)).toBeInTheDocument()

    // Cek tombol "Make Another Reservation"
    expect(screen.getByRole("button", { name: /make another reservation/i })).toBeInTheDocument()
  })

  test("'Make Another Reservation' button resets the form view", async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    // Submit form dulu (data minimal untuk submit)
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: "2025-08-15" } })
    await user.type(screen.getByLabelText(/full name/i), "Test User")
    await user.type(screen.getByLabelText(/phone number/i), "555-5555")
    await user.click(screen.getByRole("button", { name: /confirm reservation/i }))

    // Pastikan pesan konfirmasi muncul
    expect(screen.getByRole("heading", { name: /thank you, test user!/i })).toBeInTheDocument()

    // Klik tombol "Make Another Reservation"
    const makeAnotherButton = screen.getByRole("button", { name: /make another reservation/i })
    await user.click(makeAnotherButton)

    // Cek apakah form awal muncul lagi
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /confirm reservation/i })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: /thank you, test user!/i })).not.toBeInTheDocument() // Pesan konfirmasi hilang
  })

  test("HTML5 validation attributes are present", () => {
    render(<ReservationForm />)

    expect(screen.getByLabelText(/choose date/i)).toBeRequired()
    expect(screen.getByLabelText(/choose time/i)).toBeRequired()
    expect(screen.getByLabelText(/number of guests/i)).toBeRequired()
    expect(screen.getByLabelText(/number of guests/i)).toHaveAttribute("min", "1")
    expect(screen.getByLabelText(/number of guests/i)).toHaveAttribute("max", "10")
    expect(screen.getByLabelText(/full name/i)).toBeRequired()
    expect(screen.getByLabelText(/phone number/i)).toBeRequired()

    // Email dan Special Requests tidak required
    expect(screen.getByLabelText(/email $$optional$$/i)).not.toBeRequired() // Perhatikan escape karakter khusus
    expect(screen.getByLabelText(/special requests $$optional$$/i)).not.toBeRequired() // Perhatikan escape karakter khusus
  })
})
