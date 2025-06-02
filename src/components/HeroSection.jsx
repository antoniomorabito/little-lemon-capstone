import React from 'react';

function HeroSection() {
  return (
   <section className="hero">
        <div className="hero-text">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
            <button>Reserve a table</button>
        </div>
        <div className="hero-image">
            <img src="/assets/hero-image.jpg" alt="Chef holding appetizers" />
        </div>
    </section>

  );
}

export default HeroSection;
