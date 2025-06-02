"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import HeroSection from "./HeroSection.jsx"
import Specials from "./Specials.jsx"
import Testimonials from "./Testimonials.jsx"
import About from "./About.jsx"

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo)
      element?.scrollIntoView({ behavior: "smooth" })
    }
  }, [location])

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
