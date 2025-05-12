import React, { useState } from 'react';
import './App.css';
import { Menu, ShoppingCart, Phone, ChevronDown } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app">
      <nav className="nav-buttons">
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
        {/* Content for the next section will go here */}
      </section>
    </div>
  );
}

export default App;
