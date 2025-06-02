import React, { useState } from 'react';

const LemonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="28"
    height="28"
    style={{ verticalAlign: 'middle' }}
  >
    <path
      d="M50 14C44 8 36 6 30 8C20 12 14 24 18 36C21 44 30 54 42 52C52 50 60 38 58 28C56 20 54 16 50 14Z"
      fill="#F4CE14"
      stroke="#495E57"
      strokeWidth="2"
    />
    <path
      d="M24 8L20 2"
      stroke="#495E57"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M32 8L32 1"
      stroke="#495E57"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M40 10L44 2"
      stroke="#495E57"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="navbar container">
        <div className="navbar-top">
          <div className="navbar-logo">
            <LemonIcon />
            <span>Little Lemon</span>
          </div>

          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </div>
        </div>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a></li>
          <li><a href="#reservations" onClick={() => setMenuOpen(false)}>Reservations</a></li>
        </ul>

        <div className={`navbar-actions ${menuOpen ? 'hide-mobile' : ''}`}>
          <button className="order-button">Order online</button>
          <span className="cart-icon">🛒</span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
