// Menggunakan kembali LemonIcon dari Navbar jika memungkinkan, atau definisikan di sini
const LemonIconFooter = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="40" // Ukuran lebih besar untuk footer
    height="40"
    style={{ verticalAlign: "middle" }}
  >
    <path
      d="M50 14C44 8 36 6 30 8C20 12 14 24 18 36C21 44 30 54 42 52C52 50 60 38 58 28C56 20 54 16 50 14Z"
      fill="#F4CE14"
      stroke="#EDEFEE" // Stroke lebih terang untuk kontras dengan background gelap footer
      strokeWidth="2"
    />
    <path d="M24 8L20 2" stroke="#EDEFEE" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 8L32 1" stroke="#EDEFEE" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 10L44 2" stroke="#EDEFEE" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-logo-section">
          <LemonIconFooter />
          {/* Jika tidak ingin ikon, bisa ganti dengan:
          <img src="/placeholder.svg?width=150&height=50" alt="Little Lemon Logo" />
          atau teks:
          <span className="footer-logo-text">Little Lemon</span> */}
        </div>

        <nav className="footer-nav">
          <h4>Doormat Navigation</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#reservations">Reservations</a>
            </li>
            <li>
              <a href="#order">Order Online</a>
            </li>
            <li>
              <a href="#login">Login</a>
            </li>
          </ul>
        </nav>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>123 Lemon St, Chicago, IL</p>
          <p>Phone: (312) 555-0199</p>
          <p>Email: info@littlelemon.com</p>
        </div>

        <div className="footer-social">
          <h4>Social Media</h4>
          <ul>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
