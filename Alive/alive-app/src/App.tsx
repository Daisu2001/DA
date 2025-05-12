import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Menu, ShoppingCart, Phone, ChevronDown, X } from 'lucide-react';
import CartPage from './CartPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNextSectionVisible, setIsNextSectionVisible] = useState(false);
  const [isWhatHowOpen, setIsWhatHowOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsDarkBackground(scrollPosition < windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleScrollClick = (targetId?: string) => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const HomePage = () => (
    <div className="app">
      <nav className={`nav-buttons ${isMenuOpen || isWhatHowOpen ? 'hidden' : ''}`}>
        <button 
          className={`icon-button menu-button ${isDarkBackground ? 'light-icon' : 'dark-icon'}`}
          aria-label="Menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
        <button 
          className={`icon-button cart-button ${isDarkBackground ? 'light-icon' : 'dark-icon'}`}
          aria-label="Shopping Cart"
          onClick={() => navigate('/cart')}
        >
          <ShoppingCart size={24} />
        </button>
      </nav>

      {/* Sliding Menu */}
      <div className={`sliding-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <button 
            className="menu-item"
            onClick={() => handleScrollClick('what-and-how')}
          >
            What we do
          </button>
          <div className="menu-divider"></div>
          <button className="menu-item">Brands</button>
          <div className="menu-divider"></div>
          <button className="menu-item">About us</button>
          <div className="menu-divider"></div>
          <button className="menu-item">Join us</button>
          <div className="menu-divider"></div>
          <div className="menu-footer">
            <button 
              className="menu-item icon-button"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart size={24} />
            </button>
            <button className="menu-item icon-button">
              <Phone size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* What & How Popup */}
      <div className={`what-how-popup ${isWhatHowOpen ? 'open' : ''}`}>
        <div className="popup-content">
          <button 
            className="close-button"
            onClick={() => setIsWhatHowOpen(false)}
          >
            <X size={24} />
          </button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>
        </div>
      </div>

      {/* Backdrop */}
      {(isMenuOpen || isWhatHowOpen) && (
        <div 
          className="backdrop" 
          onClick={() => {
            setIsMenuOpen(false);
            setIsWhatHowOpen(false);
          }}
        ></div>
      )}

      <section className="home-section">
        <div className={`center-container ${isMenuOpen || isWhatHowOpen ? 'blur' : ''}`}>
          <img src="/alivetext.png" alt="ALIVE Text" className="centered-image" />
        </div>
        <button onClick={() => handleScrollClick()} className="discover-button">
          <span>Discover</span>
          <ChevronDown size={20} />
        </button>
      </section>

      <section id="what-and-how" className="next-section">
        <button 
          className="what-how-button"
          onClick={() => setIsWhatHowOpen(true)}
        >
          What we do
        </button>
        <img 
          src="/girl.png" 
          alt="Girl in white sweater" 
          className={`girl-image ${isWhatHowOpen ? 'blur' : ''}`} 
        />
      </section>
    </div>
  );

  return (
    <div className={isNextSectionVisible ? 'next-section-visible' : ''}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
