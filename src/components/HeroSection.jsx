"use client" // Tambahkan ini jika belum ada, untuk penggunaan hook react-router-dom

import { Link } from "react-router-dom" // Import Link

const HeroSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
  >
    <circle cx="32" cy="32" r="30" fill="#fbdabb" />
    <path fill="#495E57" d="M24 38c-1 6 2 10 8 10s9-4 8-10c-2-5-6-5-8-5s-6 0-8 5z" />
    <circle cx="32" cy="24" r="6" fill="#F4CE14" />
    <path d="M24 20h16v2a8 8 0 0 1-16 0z" fill="#fff" />
    <text x="32" y="54" fontSize="6" fill="#333" textAnchor="middle">
      Chef!
    </text>
  </svg>
)

function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </p>
          {/* Mengubah button menjadi Link */}
          <Link to="/reservations" className="hero-button">
            Reserve a table
          </Link>
        </div>
        <div className="hero-image">
          <HeroSVG />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
