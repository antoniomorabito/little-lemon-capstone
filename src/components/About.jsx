import React from 'react';

function About() {
  return (
    <section id="about" className="about container">
      <h2>About Us</h2>
      <div className="about-content">
        <div className="about-text">
          <h3>Little Lemon, Chicago</h3>
          <p>
            We are Adrian and Mario, passionate about Mediterranean cuisine and hospitality.
            Our mission is to bring a touch of tradition with a modern twist to your plate.
          </p>
        </div>
        <div className="about-images">
          <img src="/assets/adrian.jpg" alt="Adrian" />
          <img src="/assets/mario.jpg" alt="Mario" />
        </div>
      </div>
    </section>
  );
}

export default About;
