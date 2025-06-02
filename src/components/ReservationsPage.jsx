/* global fetchAPI, submitAPI */ // <-- TAMBAHAN PENTING UNTUK ESLINT
"use client" // Hapus jika tidak menggunakan Next.js App Router

import React, { useReducer, useEffect } from "react"
import ReservationForm from "./ReservationForm"
// import { fetchAPI, submitAPI } from "./api" // Import fetchAPI dan submitAPI

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
  try {
    const today = new Date()
    const times = await window.fetchAPI(today) // Menggunakan window untuk mengakses variabel global
    dispatch({ type: "SET_TIMES", payload: times })
  } catch (error) {
    console.error("Failed to initialize times:", error)
    dispatch({ type: "SET_TIMES", payload: [] }) // Set ke array kosong jika error
  }
}

function ReservationsPage() {
  const [availableTimes, dispatchTimes] = useReducer(updateTimes, [])
  const [currentDate, setCurrentDate] = React.useState(getTodayDate())

  useEffect(() => {
    if (typeof window.fetchAPI === "function") {
      // Menggunakan window untuk mengakses variabel global
      initializeTimes(dispatchTimes)
    } else {
      console.error("fetchAPI function is not available globally.")
      dispatchTimes({ type: "SET_TIMES", payload: [] })
    }
  }, []) // Jalankan sekali saat komponen mount

  const handleDateChange = async (selectedDateString) => {
    setCurrentDate(selectedDateString)
    try {
      const selectedDateObject = new Date(selectedDateString)
      const times = await window.fetchAPI(selectedDateObject) // Menggunakan window untuk mengakses variabel global
      dispatchTimes({ type: "SET_TIMES", payload: times })
    } catch (error) {
      console.error("Failed to fetch times for selected date:", error)
      dispatchTimes({ type: "SET_TIMES", payload: [] })
    }
  }

  const submitForm = async (formData) => {
    try {
      const success = await window.submitAPI(formData) // Menggunakan window untuk mengakses variabel global
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
