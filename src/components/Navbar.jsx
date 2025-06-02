import React from 'react';

function Navbar() {
  return (
    <header>
      <nav>
        <div className="logo">Little Lemon</div>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#reservations">Reservations</a></li>
          <li><a href="#order">Order Online</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
