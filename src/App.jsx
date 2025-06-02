import React from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import Specials from './components/Specials.jsx';
import Testimonials from './components/Testimonials.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import './styles/main.css'; 

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Specials />
        <Testimonials />
        <About />
      </main>
      <Footer />
    </>
  );
}

export default App;
