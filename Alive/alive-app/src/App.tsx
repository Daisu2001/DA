import React, { useState, useEffect } from 'react';
import './App.css';
import { Menu, ShoppingCart, Phone, ChevronDown } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNextSectionVisible, setIsNextSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target.classList.contains('next-section')) {
            setIsNextSectionVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 }
    );

    const nextSection = document.querySelector('.next-section');
    if (nextSection) {
      observer.observe(nextSection);
    }

    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`app ${isNextSectionVisible ? 'next-section-visible' : ''}`}>
      <nav className={`nav-buttons ${isMenuOpen ? 'hidden' : ''}`}>
        <button 
          className="icon-button menu-button" 
          aria-label="Menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
        <button className="icon-button cart-button" aria-label="Shopping Cart">
          <ShoppingCart size={24} />
        </button>
      </nav>

      {/* Sliding Menu */}
      <div className={`sliding-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <button className="menu-item">What we do</button>
          <div className="menu-divider"></div>
          <button className="menu-item">Brands</button>
          <div className="menu-divider"></div>
          <button className="menu-item">About us</button>
          <div className="menu-divider"></div>
          <button className="menu-item">Join us</button>
          <div className="menu-divider"></div>
          <div className="menu-footer">
            <button className="menu-item icon-button">
              <ShoppingCart size={24} />
            </button>
            <button className="menu-item icon-button">
              <Phone size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="backdrop" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <section className="home-section">
        <div className={`center-container ${isMenuOpen ? 'blur' : ''}`}>
          <img src="/alivetext.png" alt="ALIVE Text" className="centered-image" />
        </div>
        <button onClick={handleScroll} className="discover-button">
          <span>Discover</span>
          <ChevronDown size={20} />
        </button>
      </section>

      <section className="next-section">
        <button className="what-how-button">
          <span>¿What</span>
          <span>&</span>
          <span>How?</span>
        </button>
        <img src="/girl.png" alt="Girl in white sweater" className="girl-image" />
      </section>
    </div>
  );
}

export default App;
