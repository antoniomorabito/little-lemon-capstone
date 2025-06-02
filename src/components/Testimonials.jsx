import React from 'react';

function Testimonials() {
  return (
    <section className="testimonials container">
      <h2>What our customers say!</h2>
      <div className="testimonial-grid">
        <article className="testimonial-card">
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>“Amazing feta salad! Will definitely come back.”</p>
          <small>— Sara Lopez</small>
        </article>

        <article className="testimonial-card">
          <h3>⭐⭐⭐⭐</h3>
          <p>“Bruschetta was crunchy and fresh, love the vibe.”</p>
          <small>— Jon D.</small>
        </article>

        <article className="testimonial-card">
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>“Dessert was divine! Lemon flavor just right.”</p>
          <small>— Anne M.</small>
        </article>

        <article className="testimonial-card">
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>“Family-friendly place with top-notch service.”</p>
          <small>— Reza K.</small>
        </article>
      </div>
    </section>
  );
}

export default Testimonials;
