import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./components/HomePage.jsx" // Kita akan buat komponen ini
import ReservationsPage from "./components/ReservationsPage.jsx"
import Footer from "./components/Footer.jsx"
import "./styles/main.css"

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
