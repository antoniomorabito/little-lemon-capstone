"use client"
import { useState } from "react"

function ReservationForm() {
  const [formData, setFormData] = useState({
    date: "",
    time: "17:00", // Default time
    guests: 1,
    occasion: "None",
    name: "",
    phone: "",
    email: "",
    requests: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Di sini Anda akan mengirim data ke API atau backend
    console.log("Reservation Data:", formData)
    setIsSubmitted(true)
    // Reset form atau tindakan lain setelah submit
  }

  if (isSubmitted) {
    return (
      <div className="reservation-confirmation">
        <h2>Thank You, {formData.name}!</h2>
        <p>
          Your reservation for {formData.guests} guest(s) on {formData.date} at {formData.time} for {formData.occasion}{" "}
          has been requested.
        </p>
        <p>We will contact you shortly if any confirmation is needed.</p>
        <button onClick={() => setIsSubmitted(false)} className="form-button">
          Make Another Reservation
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <div className="form-group">
        <label htmlFor="res-date">Choose date*</label>
        <input type="date" id="res-date" name="date" value={formData.date} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="res-time">Choose time*</label>
        <select id="res-time" name="time" value={formData.time} onChange={handleChange} required>
          <option>17:00</option>
          <option>18:00</option>
          <option>19:00</option>
          <option>20:00</option>
          <option>21:00</option>
          <option>22:00</option>
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

      <button type="submit" className="form-button">
        Confirm Reservation
      </button>
    </form>
  )
}

export default ReservationForm
