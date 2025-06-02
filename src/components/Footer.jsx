import React from 'react';

function Footer() {
  return (
    <footer className="container">
      <div className="footer-logo">🍋 Little Lemon</div>
      <nav className="footer-nav">
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#reservations">Reservations</a></li>
          <li><a href="#order">Order Online</a></li>
        </ul>
      </nav>
      <div className="footer-contact">
        <p>Address: Chicago, IL</p>
        <p>Phone: (555) 123-4567</p>
        <p>Email: info@littlelemon.com</p>
      </div>
      <div className="footer-social">
        <a href="#">Instagram</a> | <a href="#">Facebook</a>
      </div>
    </footer>
  );
}

export default Footer;
