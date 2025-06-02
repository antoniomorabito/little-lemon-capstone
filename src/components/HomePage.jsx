"use client"

import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom" // Import useNavigate
import HeroSection from "./HeroSection.jsx"
import Specials from "./Specials.jsx"
import Testimonials from "./Testimonials.jsx"
import About from "./About.jsx"

function HomePage() {
  const location = useLocation()
  const navigate = useNavigate() // Gunakan useNavigate

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo)
      if (element) {
        // Tunggu sebentar untuk memastikan DOM siap, terutama setelah navigasi
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
          // Hapus state setelah scroll agar tidak scroll lagi jika HomePage render ulang
          // Gunakan replace agar tidak menambah history baru
          navigate(location.pathname, { replace: true, state: {} })
        }, 100) // Penundaan kecil, bisa disesuaikan
      } else {
        console.warn(`Element with ID '${location.state.scrollTo}' not found for scrolling.`)
        // Hapus state juga jika elemen tidak ditemukan
        navigate(location.pathname, { replace: true, state: {} })
      }
    }
  }, [location, navigate]) // Tambahkan navigate ke dependency array

  return (
    <>
      <HeroSection />
      <Specials />
      <Testimonials />
      <About />
    </>
  )
}

export default HomePage
