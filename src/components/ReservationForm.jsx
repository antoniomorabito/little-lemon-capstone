import { useState, useEffect } from "react"

// Helper function to get today's date in YYYY-MM-DD format
// This can be moved to a utils file if used elsewhere
const getTodayString = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function ReservationForm({ availableTimes = [], onDateChange, submitForm, initialDate }) {
  const [formData, setFormData] = useState({
    date: initialDate || getTodayString(),
    time: availableTimes.length > 0 ? availableTimes[0] : "",
    guests: 1,
    occasion: "None",
    name: "",
    phone: "",
    email: "",
    requests: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionError, setSubmissionError] = useState(null)

  // Update form date if initialDate prop changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, date: initialDate || getTodayString() }))
  }, [initialDate])

  // Update default time when availableTimes or date changes
  useEffect(() => {
    if (availableTimes.length > 0) {
      const currentTimeIsValid = availableTimes.includes(formData.time)
      setFormData((prev) => ({
        ...prev,
        time: currentTimeIsValid ? prev.time : availableTimes[0],
      }))
    } else if (formData.date) {
      setFormData((prev) => ({ ...prev, time: "" }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableTimes, formData.date]) // formData.time sengaja tidak dimasukkan agar tidak loop

  const handleChange = (e) => {
    const { name, value } = e.target
    let processedValue = value
    if (name === "guests") {
      processedValue = Number.parseInt(value, 10)
      if (isNaN(processedValue)) processedValue = "" // Handle non-numeric input for guests temporarily
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: processedValue,
    }))

    if (name === "date" && typeof onDateChange === "function") {
      onDateChange(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Double check validity before submitting, though button should be disabled
    if (!isFormValid) {
      setSubmissionError("Please correct the errors in the form.")
      return
    }
    setSubmissionError(null)
    const success = await submitForm(formData)
    if (success) {
      setIsSubmitted(true)
    } else {
      setSubmissionError("There was an error submitting your reservation. Please try again.")
    }
  }

  const handleMakeAnotherReservation = () => {
    setIsSubmitted(false)
    setSubmissionError(null)
    const today = getTodayString()
    setFormData({
      date: initialDate || today,
      time: availableTimes.length > 0 ? availableTimes[0] : "",
      guests: 1,
      occasion: "None",
      name: "",
      phone: "",
      email: "",
      requests: "",
    })
    if (typeof onDateChange === "function") {
      onDateChange(initialDate || today)
    }
  }

  // Client-side validation logic for disabling the submit button
  const isFormValid =
    formData.date &&
    new Date(formData.date) >= new Date(getTodayString()) && // Date is today or in the future
    formData.time &&
    availableTimes.includes(formData.time) && // A valid time from availableTimes is selected
    formData.guests >= 1 &&
    formData.guests <= 10 &&
    formData.name.trim().length >= 2 &&
    formData.phone.trim().length >= 7 && // Basic phone length, pattern handles more
    (formData.email.trim().length > 0 ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) : true) // Valid email if provided

  if (isSubmitted) {
    return (
      <div className="reservation-confirmation">
        <h2>Thank You, {formData.name}!</h2>
        <p>
          Your reservation for {formData.guests} guest(s) on {formData.date} at {formData.time}
          {formData.occasion !== "None" ? ` for ${formData.occasion}` : ""} has been confirmed.
        </p>
        <p>We look forward to welcoming you!</p>
        <button onClick={handleMakeAnotherReservation} className="form-button">
          Make Another Reservation
        </button>
      </div>
    )
  }

  return (
    // Removed noValidate to allow HTML5 default validation messages
    <form onSubmit={handleSubmit} className="reservation-form">
      <div className="form-group">
        <label htmlFor="res-date">Choose date*</label>
        <input
          type="date"
          id="res-date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          aria-required="true"
          min={getTodayString()} // HTML5: Date cannot be in the past
        />
      </div>

      <div className="form-group">
        <label htmlFor="res-time">Choose time*</label>
        <select
          id="res-time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          aria-required="true"
          disabled={!formData.date || availableTimes.length === 0}
        >
          {availableTimes.length > 0 ? (
            availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))
          ) : (
            <option value="" disabled>
              {formData.date ? "No times available" : "Select a date first"}
            </option>
          )}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of guests*</label>
        <input
          type="number"
          placeholder="1"
          min="1" // HTML5: Minimum 1 guest
          max="10" // HTML5: Maximum 10 guests
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange}>
          <option>None</option>
          <option>Birthday</option>
          <option>Anniversary</option>
          <option>Business Meeting</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="name">Full Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-required="true"
          minLength="2" // HTML5: Minimum 2 characters
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number*</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="e.g., (123) 456-7890"
          value={formData.phone}
          onChange={handleChange}
          required
          aria-required="true"
          pattern="^\+?([0-9]{1,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,7})$" // More flexible phone pattern
          title="Phone number (e.g., +1-123-4567890 or 123-456-7890)"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email (Optional)</label>
        <input
          type="email" // HTML5: Validates email format if a value is entered
          id="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="requests">Special Requests (Optional)</label>
        <textarea
          id="requests"
          name="requests"
          rows="3"
          placeholder="e.g., dietary restrictions, high chair"
          value={formData.requests}
          onChange={handleChange}
          maxLength="200" // HTML5: Optional max length
        ></textarea>
      </div>

      {submissionError && (
        <p className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
          {submissionError}
        </p>
      )}

      <button type="submit" className="form-button" disabled={!isFormValid}>
        Confirm Reservation
      </button>
    </form>
  )
}

export default ReservationForm
