"use client"

import { useState, useEffect } from "react"

function ReservationForm({ availableTimes, onDateChange, submitForm, initialDate }) {
  const [formData, setFormData] = useState({
    date: initialDate || "",
    time: availableTimes && availableTimes.length > 0 ? availableTimes[0] : "17:00",
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
    setFormData((prev) => ({ ...prev, date: initialDate }))
  }, [initialDate])

  // Update default time when availableTimes or date changes
  useEffect(() => {
    if (availableTimes && availableTimes.length > 0) {
      // Cek apakah waktu saat ini masih ada di availableTimes baru
      const currentTimeIsValid = availableTimes.includes(formData.time)
      setFormData((prev) => ({
        ...prev,
        time: currentTimeIsValid ? prev.time : availableTimes[0],
      }))
    } else if (formData.date) {
      // Jika ada tanggal tapi tidak ada waktu tersedia
      setFormData((prev) => ({ ...prev, time: "" })) // Kosongkan pilihan waktu
    }
  }, [availableTimes, formData.date]) // formData.time sengaja tidak dimasukkan agar tidak loop

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "guests" ? Number.parseInt(value, 10) : value,
    }))

    if (name === "date") {
      onDateChange(value) // Panggil callback saat tanggal berubah
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmissionError(null) // Reset error
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
    const today = new Date()
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate(),
    ).padStart(2, "0")}`

    setFormData({
      date: initialDate, // Gunakan initialDate dari props (yang diupdate oleh ReservationsPage)
      time: availableTimes && availableTimes.length > 0 ? availableTimes[0] : "17:00",
      guests: 1,
      occasion: "None",
      name: "",
      phone: "",
      email: "",
      requests: "",
    })
    // Trigger pengambilan ulang waktu untuk tanggal awal jika perlu
    // onDateChange(initialDate); // Ini mungkin tidak perlu jika initialDate sudah benar
  }

  // Validasi sederhana untuk tombol submit
  const isFormValid = formData.date && formData.time && formData.name && formData.phone && formData.guests >= 1

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
    <form onSubmit={handleSubmit} className="reservation-form" noValidate>
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
          {availableTimes && availableTimes.length > 0 ? (
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
          min="1"
          max="10"
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
          minLength="2"
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
          pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email (Optional)</label>
        <input
          type="email"
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
