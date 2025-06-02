import React from 'react';

function Specials() {
  return (
    <section className="specials container">
      <header>
        <h2>This Week's Specials</h2>
        <button>Online Menu</button>
      </header>
      <div className="specials-grid">
        <article className="special-card">
          <img src="/assets/greek-salad.jpg" alt="Greek Salad" />
          <h3>Greek Salad <span>$12.99</span></h3>
          <p>Crisp lettuce, peppers, olives, and Chicago-style feta with crunchy rosemary croutons.</p>
          <a href="#">Order a delivery 🚚</a>
        </article>

        <article className="special-card">
          <img src="/assets/bruschetta.jpg" alt="Bruschetta" />
          <h3>Bruschetta <span>$5.99</span></h3>
          <p>Grilled bread smeared with garlic and seasoned with olive oil and salt.</p>
          <a href="#">Order a delivery 🚚</a>
        </article>

        <article className="special-card">
          <img src="/assets/lemon-dessert.jpg" alt="Lemon Dessert" />
          <h3>Lemon Dessert <span>$5.00</span></h3>
          <p>Grandma’s recipe, authentic Mediterranean lemon cake from scratch.</p>
          <a href="#">Order a delivery 🚚</a>
        </article>
      </div>
    </section>
  );
}

export default Specials;
