import ReservationForm from "./ReservationForm"

const DiningIllustrationSVG = () => (
  <svg viewBox="0 0 200 100" className="reservation-illustration">
    <rect x="10" y="30" width="80" height="60" rx="5" fill="#F4CE14" /> {/* Meja */}
    <circle cx="50" cy="20" r="15" fill="#495E57" /> {/* Piring/Lampu gantung */}
    <rect x="15" y="35" width="10" height="40" rx="2" fill="#A0522D" /> {/* Kaki meja */}
    <rect x="75" y="35" width="10" height="40" rx="2" fill="#A0522D" /> {/* Kaki meja */}
    <rect x="120" y="10" width="70" height="80" rx="5" fill="#EDEFEE" /> {/* Jendela/Lukisan */}
    <line x1="155" y1="10" x2="155" y2="90" stroke="#495E57" strokeWidth="2" />
    <line x1="120" y1="50" x2="190" y2="50" stroke="#495E57" strokeWidth="2" />
    <text x="50" y="70" fontFamily="Arial, sans-serif" fontSize="10" fill="#333" textAnchor="middle">
      Table for You
    </text>
  </svg>
)

function ReservationsPage() {
  return (
    <section id="reservations" className="reservations-page container">
      <div className="reservations-header">
        <h1>Reserve Your Table</h1>
        <p>Book a table at Little Lemon for an unforgettable Mediterranean dining experience.</p>
      </div>
      <div className="reservations-content">
        <div className="reservation-form-container">
          <ReservationForm />
        </div>
        <div className="reservation-visual">
          <DiningIllustrationSVG />
          <p className="visual-caption">We look forward to hosting you!</p>
        </div>
      </div>
    </section>
  )
}

export default ReservationsPage
