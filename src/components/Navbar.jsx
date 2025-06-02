"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const LemonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="28"
    height="28"
    style={{ verticalAlign: "middle" }}
  >
    <path
      d="M50 14C44 8 36 6 30 8C20 12 14 24 18 36C21 44 30 54 42 52C52 50 60 38 58 28C56 20 54 16 50 14Z"
      fill="#F4CE14"
      stroke="#495E57"
      strokeWidth="2"
    />
    <path d="M24 8L20 2" stroke="#495E57" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 8L32 1" stroke="#495E57" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 10L44 2" stroke="#495E57" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const closeMenu = () => setMenuOpen(false)

  const handleScrollToSection = (sectionId) => {
    closeMenu()
    // Hapus '#' dari sectionId untuk digunakan sebagai state
    const targetId = sectionId.startsWith("#") ? sectionId.substring(1) : sectionId

    // Jika sudah di homepage, scroll langsung
    if (window.location.pathname === "/") {
      const element = document.getElementById(targetId)
      element?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      // Jika di halaman lain, navigasi ke homepage dengan state
      navigate("/", { state: { scrollTo: targetId } })
    }
  }

  return (
    <header>
      <nav className="navbar container">
        <div className="navbar-top">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <LemonIcon />
            <span>Little Lemon</span>
          </Link>

          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </div>
        </div>

        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <button onClick={() => handleScrollToSection("about")} className="nav-button-link">
              About
            </button>
          </li>
          <li>
            <button onClick={() => handleScrollToSection("menu")} className="nav-button-link">
              Menu
            </button>
          </li>
          <li>
            <Link to="/reservations" onClick={closeMenu}>
              Reservations
            </Link>
          </li>
        </ul>

        <div className={`navbar-actions ${menuOpen ? "hide-mobile" : ""}`}>
          {/* Mengubah button menjadi Link untuk Order Online */}
          <Link to="/order-online" className="order-button" onClick={closeMenu}>
            Order online
          </Link>
          <span className="cart-icon">🛒</span> {/* Nanti bisa jadi Link ke halaman Cart */}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
