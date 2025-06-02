import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./components/HomePage.jsx"
import ReservationsPage from "./components/ReservationsPage.jsx"
import OrderOnlinePage from "./components/OrderOnlinePage.jsx" // <-- Import baru
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
          <Route path="/order-online" element={<OrderOnlinePage />} />
          
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
