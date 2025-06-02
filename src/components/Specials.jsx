// SVG untuk Greek Salad
const GreekSaladSVG = () => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
    <rect width="100" height="100" fill="#EDEFEE" /> {/* Background color matching card */}
    {/* Bowl */}
    <ellipse cx="50" cy="70" rx="40" ry="25" fill="#A0A0A0" />
    {/* Lettuce */}
    <circle cx="50" cy="55" r="20" fill="#8FBC8F" />
    <circle cx="35" cy="60" r="15" fill="#98FB98" />
    <circle cx="65" cy="60" r="15" fill="#90EE90" />
    {/* Tomatoes */}
    <circle cx="40" cy="45" r="7" fill="#FF6347" />
    <circle cx="60" cy="45" r="7" fill="#FF6347" />
    <circle cx="50" cy="65" r="6" fill="#DC143C" />
    {/* Feta Cheese */}
    <rect x="30" y="50" width="10" height="10" rx="2" fill="#FFFFFF" />
    <rect x="60" y="50" width="10" height="10" rx="2" fill="#FFFFFF" />
    <rect x="45" y="35" width="10" height="10" rx="2" fill="#FFFFFF" />
    {/* Olives */}
    <circle cx="35" cy="40" r="4" fill="#000000" />
    <circle cx="65" cy="40" r="4" fill="#000000" />
    <circle cx="50" cy="50" r="4" fill="#000000" />
  </svg>
)

// SVG untuk Bruschetta
const BruschettaSVG = () => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
    <rect width="100" height="100" fill="#EDEFEE" />
    {/* Bread Slice */}
    <ellipse cx="50" cy="60" rx="35" ry="20" fill="#DEB887" stroke="#A0522D" strokeWidth="2" />
    {/* Tomato Topping */}
    <rect x="30" y="45" width="15" height="10" rx="3" fill="#FF6347" />
    <rect x="55" y="45" width="15" height="10" rx="3" fill="#FF6347" />
    <rect x="40" y="52" width="20" height="12" rx="3" fill="#DC143C" />
    {/* Basil Leaves */}
    <ellipse cx="35" cy="42" rx="5" ry="3" fill="#228B22" transform="rotate(-30 35 42)" />
    <ellipse cx="65" cy="42" rx="5" ry="3" fill="#228B22" transform="rotate(30 65 42)" />
    <ellipse cx="50" cy="40" rx="4" ry="2.5" fill="#006400" />
  </svg>
)

// SVG untuk Lemon Dessert
const LemonDessertSVG = () => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
    <rect width="100" height="100" fill="#EDEFEE" />
    {/* Plate */}
    <circle cx="50" cy="80" r="18" fill="#D3D3D3" />
    {/* Dessert Slice */}
    <path d="M30 70 L50 30 L70 70 Z" fill="#FFFACD" stroke="#F0E68C" strokeWidth="2" />
    {/* Lemon Slice Garnish */}
    <circle cx="50" cy="25" r="8" fill="#FFD700" />
    <line x1="50" y1="17" x2="50" y2="33" stroke="#FFFACD" strokeWidth="1" />
    <line x1="42" y1="25" x2="58" y2="25" stroke="#FFFACD" strokeWidth="1" />
    {/* Mint Leaf */}
    <ellipse cx="60" cy="30" rx="6" ry="3" fill="#2E8B57" transform="rotate(20 60 30)" />
  </svg>
)

function Specials() {
  return (
    <section className="specials">
      <div className="container">
        <div className="specials-header-row">
          <h2>This Week's Specials</h2>
          <button className="menu-button">Menu</button>
        </div>

        <div className="specials-grid">
          {/* Greek Salad */}
          <article className="special-card">
            <div className="special-card-image">
              <GreekSaladSVG />
            </div>
            <div className="special-content">
              <div className="special-title-row">
                <h3>Greek Salad</h3>
                <span className="price">$12.99</span>
              </div>
              <p>
                The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished
                with crunchy garlic and rosemary croutons.
              </p>
              <a href="#">Order a delivery 🚚</a>
            </div>
          </article>

          {/* Bruschetta */}
          <article className="special-card">
            <div className="special-card-image">
              <BruschettaSVG />
            </div>
            <div className="special-content">
              <div className="special-title-row">
                <h3>Bruschetta</h3>
                <span className="price">$5.99</span>
              </div>
              <p>
                Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with olive oil
                and salt.
              </p>
              <a href="#">Order a delivery 🚚</a>
            </div>
          </article>

          {/* Lemon Dessert */}
          <article className="special-card">
            <div className="special-card-image">
              <LemonDessertSVG />
            </div>
            <div className="special-content">
              <div className="special-title-row">
                <h3>Lemon Dessert</h3>
                <span className="price">$5.00</span>
              </div>
              <p>
                This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as
                authentic as can be imagined.
              </p>
              <a href="#">Order a delivery 🚚</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Specials
