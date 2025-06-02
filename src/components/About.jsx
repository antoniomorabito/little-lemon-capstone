// SVG Placeholder untuk Chef Mario
const ChefMarioSVG = () => (
  <svg
    viewBox="0 0 150 200"
    preserveAspectRatio="xMidYMid slice"
    style={{ width: "100%", height: "100%", display: "block" }}
  >
    <rect width="150" height="200" fill="#D2B48C" rx="10" ry="10" /> {/* Warna dasar krem/coklat muda */}
    {/* Kepala */}
    <circle cx="75" cy="50" r="30" fill="#F5DEB3" /> {/* Warna kulit */}
    {/* Rambut (sedikit) */}
    <path d="M50 30 Q75 15 100 30 L95 50 L55 50 Z" fill="#A0522D" /> {/* Coklat tua untuk rambut */}
    {/* Mata */}
    <circle cx="65" cy="45" r="3" fill="#000" />
    <circle cx="85" cy="45" r="3" fill="#000" />
    {/* Mulut (senyum) */}
    <path d="M65 60 Q75 65 85 60" stroke="#000" strokeWidth="2" fill="none" />
    {/* Baju Chef (putih) */}
    <rect x="45" y="80" width="60" height="80" fill="#FFFFFF" />
    {/* Kerah */}
    <path d="M55 80 L45 90 L50 95 L75 85 L100 95 L105 90 L95 80 Z" fill="#E0E0E0" />
    {/* Kancing (opsional) */}
    <circle cx="75" cy="95" r="3" fill="#333" />
    <circle cx="75" cy="110" r="3" fill="#333" />
    <circle cx="75" cy="125" r="3" fill="#333" />
    {/* Tangan (sederhana) */}
    <ellipse cx="35" cy="110" rx="10" ry="25" fill="#F5DEB3" transform="rotate(-10 35 110)" />
    <ellipse cx="115" cy="110" rx="10" ry="25" fill="#F5DEB3" transform="rotate(10 115 110)" />
  </svg>
)

// SVG Placeholder untuk Chef Adrian
const ChefAdrianSVG = () => (
  <svg
    viewBox="0 0 150 200"
    preserveAspectRatio="xMidYMid slice"
    style={{ width: "100%", height: "100%", display: "block" }}
  >
    <rect width="150" height="200" fill="#C0C0C0" rx="10" ry="10" /> {/* Warna dasar abu-abu muda */}
    {/* Kepala */}
    <circle cx="75" cy="50" r="30" fill="#FFE0B2" /> {/* Warna kulit sedikit beda */}
    {/* Rambut (lebih banyak/beda gaya) */}
    <path d="M45 25 Q75 10 105 25 L100 55 L50 55 Z" fill="#5C4033" /> {/* Coklat lebih gelap */}
    {/* Mata */}
    <circle cx="65" cy="45" r="3.5" fill="#000" /> {/* Mata sedikit lebih besar */}
    <circle cx="85" cy="45" r="3.5" fill="#000" />
    {/* Mulut (sedikit beda) */}
    <rect x="68" y="58" width="14" height="3" rx="1" fill="#000" />
    {/* Baju Chef (biru muda atau warna lain) */}
    <rect x="40" y="80" width="70" height="85" fill="#ADD8E6" />
    {/* Apron (opsional) */}
    <path d="M50 100 L75 160 L100 100 Z" fill="#A9A9A9" />
    {/* Tangan (posisi beda) */}
    <ellipse cx="40" cy="100" rx="12" ry="20" fill="#FFE0B2" transform="rotate(15 40 100)" />
    <ellipse cx="110" cy="100" rx="12" ry="20" fill="#FFE0B2" transform="rotate(-15 110 100)" />
  </svg>
)

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Little Lemon</h2>
            <h3>Chicago</h3>
            <p>
              We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
              Our chefs, Adrian and Mario, bring years of experience and a passion for authentic flavors to create a
              unique dining experience.
            </p>
            <p>
              Inspired by the rich culinary heritage of the Mediterranean, we source the freshest ingredients to craft
              dishes that are both delicious and wholesome. Join us for a memorable meal.
            </p>
          </div>
          <div className="about-images">
            <div className="about-image-wrapper about-image-mario">
              <ChefMarioSVG />
            </div>
            <div className="about-image-wrapper about-image-adrian">
              <ChefAdrianSVG />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
