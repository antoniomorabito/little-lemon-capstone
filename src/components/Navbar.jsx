import React, { useState } from 'react';

const LemonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" fill="#F4CE14" stroke="#495E57" strokeWidth="3" />
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
