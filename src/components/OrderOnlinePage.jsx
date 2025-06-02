import { Link } from "react-router-dom"

function OrderOnlinePage() {
  return (
    <div className="container" style={{ textAlign: "center", padding: "4rem 1rem", minHeight: "60vh" }}>
      <h1>Order Online</h1>
      <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
        Our online ordering system is currently under construction.
      </p>
      <p style={{ marginBottom: "2rem" }}>
        We are working hard to bring you a seamless online ordering experience. Please check back soon!
      </p>
      <p style={{ marginBottom: "1rem" }}>In the meantime, you can call us to place an order:</p>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#495E57", marginBottom: "2rem" }}>(312) 555-0199</p>
      <Link to="/" className="hero-button" style={{ padding: "0.75rem 1.5rem" }}>
        Back to Homepage
      </Link>
    </div>
  )
}

export default OrderOnlinePage
