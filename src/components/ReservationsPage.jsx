/* global fetchAPI, submitAPI */ // <-- INI TETAP PENTING DAN SUDAH BENAR
"use client" // Hapus jika tidak menggunakan Next.js App Router

import React, { useReducer, useEffect } from "react"
import ReservationForm from "./ReservationForm"

// Contoh SVG sederhana untuk dekorasi halaman reservasi
const DiningIllustrationSVG = () => (
  <svg viewBox="0 0 200 100" className="reservation-illustration">
    <rect x="10" y="30" width="80" height="60" rx="5" fill="#F4CE14" />
    <circle cx="50" cy="20" r="15" fill="#495E57" />
    <rect x="15" y="35" width="10" height="40" rx="2" fill="#A0522D" />
    <rect x="75" y="35" width="10" height="40" rx="2" fill="#A0522D" />
    <rect x="120" y="10" width="70" height="80" rx="5" fill="#EDEFEE" />
    <line x1="155" y1="10" x2="155" y2="90" stroke="#495E57" strokeWidth="2" />
    <line x1="120" y1="50" x2="190" y2="50" stroke="#495E57" strokeWidth="2" />
    <text x="50" y="70" fontFamily="Arial, sans-serif" fontSize="10" fill="#333" textAnchor="middle">
      Table for You
    </text>
  </svg>
)

// Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0") // Bulan dimulai dari 0
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// Reducer untuk mengelola availableTimes
export const updateTimes = (state, action) => {
  switch (action.type) {
    case "SET_TIMES":
      return action.payload // payload adalah array of times
    default:
      return state
  }
}

// Fungsi untuk inisialisasi times (dipanggil sekali)
export const initializeTimes = async (dispatch) => {
  console.log("Attempting to initializeTimes...")
  try {
    const today = new Date()
    // Panggil fetchAPI langsung, tanpa window.
    const times = await window.fetchAPI(today) // Ini baris yang mungkin error jika fetchAPI undefined
    console.log("Fetched times:", times)
    dispatch({ type: "SET_TIMES", payload: times })
  } catch (error) {
    console.error("Error in initializeTimes:", error)
    dispatch({ type: "SET_TIMES", payload: [] })
  }
}

function ReservationsPage() {
  const [availableTimes, dispatchTimes] = useReducer(updateTimes, [])
  const [currentDate, setCurrentDate] = React.useState(getTodayDate())

  console.log("ReservationsPage component rendered/re-rendered.")

  useEffect(() => {
    console.log("ReservationsPage useEffect triggered.")
    console.log("Type of fetchAPI in useEffect:", typeof window.fetchAPI)
    if (typeof window.fetchAPI === "function") {
      console.log("fetchAPI is a function, calling initializeTimes.")
      initializeTimes(dispatchTimes)
    } else {
      // Ini adalah log yang Anda lihat:
      console.error("fetchAPI function is not available globally. (from useEffect)")
      dispatchTimes({ type: "SET_TIMES", payload: [] })
    }
  }, []) // Dependensi kosong, hanya jalan sekali saat mount

  const handleDateChange = async (selectedDateString) => {
    // ... (logika handleDateChange dengan pemanggilan fetchAPI) ...
    setCurrentDate(selectedDateString)
    console.log(`handleDateChange called with: ${selectedDateString}`)
    console.log("Type of fetchAPI in handleDateChange:", typeof window.fetchAPI)
    try {
      const selectedDateObject = new Date(selectedDateString)
      const times = await window.fetchAPI(selectedDateObject)
      console.log("Fetched times for new date:", times)
      dispatchTimes({ type: "SET_TIMES", payload: times })
    } catch (error) {
      console.error("Error in handleDateChange fetching times:", error)
      dispatchTimes({ type: "SET_TIMES", payload: [] })
    }
  }

  const submitForm = async (formData) => {
    // ... (logika submitForm dengan pemanggilan submitAPI) ...
    console.log("submitForm called with:", formData)
    console.log("Type of submitAPI in submitForm:", typeof window.submitAPI)
    try {
      const success = await window.submitAPI(formData)
      if (success) {
        console.log("Booking successful:", formData)
        return true
      }
      console.error("Booking failed via API.")
      return false
    } catch (error) {
      console.error("Error submitting form:", error)
      return false
    }
  }

  return (
    <section id="reservations" className="reservations-page container">
      <div className="reservations-header">
        <h1>Reserve Your Table</h1>
        <p>Book a table at Little Lemon for an unforgettable Mediterranean dining experience.</p>
      </div>
      <div className="reservations-content">
        <div className="reservation-form-container">
          <ReservationForm
            availableTimes={availableTimes}
            onDateChange={handleDateChange}
            submitForm={submitForm}
            initialDate={currentDate}
          />
        </div>
        <div className="reservation-visual">
          <DiningIllustrationSVG />
          <p className="visual-caption">We look forward to hosting you!</p>
        </div>
      </div>
    </section>
  )
}

export default ReservationsPage
