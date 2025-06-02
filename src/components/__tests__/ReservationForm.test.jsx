import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ReservationForm from "../ReservationForm"

// Helper function to get today's date in YYYY-MM-DD format for tests
const getTodayTestString = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const mockAvailableTimes = ["17:00", "18:00", "19:00", "20:00"]
const mockSubmitForm = jest.fn()
const mockOnDateChange = jest.fn()

describe("ReservationForm with Validations", () => {
  beforeEach(() => {
    mockSubmitForm.mockClear()
    mockOnDateChange.mockClear()
    // Mock console.log and console.error to keep test output clean
    jest.spyOn(console, "log").mockImplementation(() => {})
    jest.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    console.log.mockRestore()
    console.error.mockRestore()
  })

  const renderForm = (props = {}) => {
    const defaultProps = {
      availableTimes: mockAvailableTimes,
      onDateChange: mockOnDateChange,
      submitForm: mockSubmitForm,
      initialDate: getTodayTestString(),
    }
    return render(<ReservationForm {...defaultProps} {...props} />)
  }

  test("renders all form fields and the submit button", () => {
    renderForm()
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email $$optional$$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/special requests $$optional$$/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /confirm reservation/i })).toBeInTheDocument()
  })

  test("HTML5 validation attributes are present", () => {
    renderForm()
    const today = getTodayTestString()

    const dateInput = screen.getByLabelText(/choose date/i)
    expect(dateInput).toBeRequired()
    expect(dateInput).toHaveAttribute("min", today)

    expect(screen.getByLabelText(/choose time/i)).toBeRequired()

    const guestsInput = screen.getByLabelText(/number of guests/i)
    expect(guestsInput).toBeRequired()
    expect(guestsInput).toHaveAttribute("min", "1")
    expect(guestsInput).toHaveAttribute("max", "10")

    const nameInput = screen.getByLabelText(/full name/i)
    expect(nameInput).toBeRequired()
    expect(nameInput).toHaveAttribute("minLength", "2")

    const phoneInput = screen.getByLabelText(/phone number/i)
    expect(phoneInput).toBeRequired()
    expect(phoneInput).toHaveAttribute("pattern", "^\\+?([0-9]{1,3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,7})$")

    expect(screen.getByLabelText(/email $$optional$$/i)).toHaveAttribute("type", "email")
    expect(screen.getByLabelText(/special requests $$optional$$/i)).toHaveAttribute("maxLength", "200")
  })

  test("submit button is initially disabled if required fields are not met", () => {
    renderForm({ initialDate: getTodayTestString(), availableTimes: [] }) // No available times initially
    expect(screen.getByRole("button", { name: /confirm reservation/i })).toBeDisabled()
  })

  test("submit button becomes enabled when all required fields are valid", async () => {
    const user = userEvent.setup()
    renderForm()

    // Initially button might be disabled or enabled depending on defaults, let's fill to ensure
    const submitButton = screen.getByRole("button", { name: /confirm reservation/i })

    // Fill form with valid data
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: getTodayTestString() } })
    await user.selectOptions(screen.getByLabelText(/choose time/i), mockAvailableTimes[0])
    await user.clear(screen.getByLabelText(/number of guests/i))
    await user.type(screen.getByLabelText(/number of guests/i), "2")
    await user.type(screen.getByLabelText(/full name/i), "John Doe")
    await user.type(screen.getByLabelText(/phone number/i), "123-456-7890") // Matches new pattern implicitly

    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })
  })

  test("submit button is disabled if date is in the past", async () => {
    const user = userEvent.setup()
    renderForm()
    const submitButton = screen.getByRole("button", { name: /confirm reservation/i })

    // Fill other fields validly
    await user.selectOptions(screen.getByLabelText(/choose time/i), mockAvailableTimes[0])
    await user.type(screen.getByLabelText(/number of guests/i), "2")
    await user.type(screen.getByLabelText(/full name/i), "John Doe")
    await user.type(screen.getByLabelText(/phone number/i), "123-456-7890")

    // Set date to past
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: "2020-01-01" } })

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })
  })

  test("submit button is disabled if number of guests is invalid", async () => {
    const user = userEvent.setup()
    renderForm()
    const submitButton = screen.getByRole("button", { name: /confirm reservation/i })
    const guestsInput = screen.getByLabelText(/number of guests/i)

    // Fill other fields validly
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: getTodayTestString() } })
    await user.selectOptions(screen.getByLabelText(/choose time/i), mockAvailableTimes[0])
    await user.type(screen.getByLabelText(/full name/i), "John Doe")
    await user.type(screen.getByLabelText(/phone number/i), "123-456-7890")

    // Test guests < 1
    await user.clear(guestsInput)
    await user.type(guestsInput, "0")
    await waitFor(() => expect(submitButton).toBeDisabled())

    // Test guests > 10
    await user.clear(guestsInput)
    await user.type(guestsInput, "11")
    await waitFor(() => expect(submitButton).toBeDisabled())
  })

  test("submit button is disabled if name is too short", async () => {
    const user = userEvent.setup()
    renderForm()
    const submitButton = screen.getByRole("button", { name: /confirm reservation/i })

    // Fill other fields validly
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: getTodayTestString() } })
    await user.selectOptions(screen.getByLabelText(/choose time/i), mockAvailableTimes[0])
    await user.type(screen.getByLabelText(/number of guests/i), "2")
    await user.type(screen.getByLabelText(/phone number/i), "123-456-7890")

    // Set name too short
    await user.type(screen.getByLabelText(/full name/i), "J")
    await waitFor(() => expect(submitButton).toBeDisabled())
  })

  test("form submission calls submitForm prop with form data when valid", async () => {
    const user = userEvent.setup()
    mockSubmitForm.mockResolvedValue(true) // Simulate successful submission
    renderForm()

    const date = getTodayTestString()
    const time = mockAvailableTimes[1]
    const guests = 3
    const occasion = "Birthday"
    const name = "Jane Doe"
    const phone = "987-654-3210"
    const email = "jane@example.com"
    const requests = "Window seat please"

    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: date } })
    await user.selectOptions(screen.getByLabelText(/choose time/i), time)
    await user.clear(screen.getByLabelText(/number of guests/i))
    await user.type(screen.getByLabelText(/number of guests/i), guests.toString())
    await user.selectOptions(screen.getByLabelText(/occasion/i), occasion)
    await user.type(screen.getByLabelText(/full name/i), name)
    await user.type(screen.getByLabelText(/phone number/i), phone)
    await user.type(screen.getByLabelText(/email $$optional$$/i), email)
    await user.type(screen.getByLabelText(/special requests $$optional$$/i), requests)

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /confirm reservation/i })).toBeEnabled()
    })

    await user.click(screen.getByRole("button", { name: /confirm reservation/i }))

    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalledWith({
        date,
        time,
        guests,
        occasion,
        name,
        phone,
        email,
        requests,
      })
    })
    expect(await screen.findByText(`Thank You, ${name}!`)).toBeInTheDocument()
  })
})
