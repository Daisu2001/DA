import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Menu, ShoppingCart, Phone, ChevronDown, X, Heart, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import CartPage from './CartPage';
import BrandPage from './BrandPage';

// Add interface for brand data
interface Brand {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
}

const brands: Brand[] = [
  { 
    id: 'valentino', 
    name: 'VALENTINO', 
    image: '/ValBack.png',
    description: 'Luxury Italian fashion house founded in 1960.',
    rating: 4.8
  },
  { 
    id: 'prada', 
    name: 'PRADA', 
    image: '/PradaBack.png',
    description: 'Leading fashion and luxury goods brand since 1913.',
    rating: 4.9
  },
  { 
    id: 'chanel', 
    name: 'CHANEL', 
    image: '/ChanelBack.png',
    description: 'Iconic French luxury fashion house established in 1909.',
    rating: 4.9
  }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNextSectionVisible, setIsNextSectionVisible] = useState(false);
  const [isWhatHowOpen, setIsWhatHowOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const [isOverBlackSection, setIsOverBlackSection] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('brandFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [cartCount, setCartCount] = useState(0);
  const [isNewBadge, setIsNewBadge] = useState(false);
  const navigate = useNavigate();

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('brandFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Update cart count whenever it changes
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (!Array.isArray(cartItems)) {
          setCartCount(0);
          return;
        }
        const totalItems = cartItems.reduce((sum: number, item: any) => {
          const quantity = item?.quantity || 0;
          return sum + quantity;
        }, 0);
        
        if (totalItems !== cartCount) {
          setCartCount(totalItems);
          setIsNewBadge(true);
          setTimeout(() => setIsNewBadge(false), 300);
        }
      } catch (error) {
        console.error('Error updating cart count:', error);
        setCartCount(0);
      }
    };

    // Initial update
    updateCartCount();

    // Listen for storage changes and custom cart updates
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, [cartCount]);

  const toggleFavorite = (brandId: string) => {
    setFavorites(prev => {
      if (prev.includes(brandId)) {
        return prev.filter(id => id !== brandId);
      } else {
        return [...prev, brandId];
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show back to top button when scrolled down more than one screen height
      setShowBackToTop(currentScrollY > windowHeight);

      // Update background state for icon colors
      const blackSection = document.querySelector('.black-section');
      const isOverDarkSection = currentScrollY < windowHeight || // Home section
        (blackSection?.getBoundingClientRect().top ?? windowHeight + 1) <= windowHeight;
      
      setIsDarkBackground(isOverDarkSection);
      
      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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

  // Add scroll listener for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleBrandClick = (brandId: string) => {
    navigate(`/brand/${brandId}`);
  };

  const HomePage = () => {
    const location = window.location.search;
    const params = new URLSearchParams(location);
    const section = params.get('section');

    useEffect(() => {
      if (section === 'our-brands') {
        const brandsSection = document.getElementById('our-brands');
        if (brandsSection) {
          brandsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [section]);

    return (
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
            {cartCount > 0 && (
              <span className={`cart-badge ${isNewBadge ? 'new' : ''}`}>
                {cartCount}
              </span>
            )}
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
            <button 
              className="menu-item"
              onClick={() => handleScrollClick('our-brands')}
            >
              Our brands
            </button>
            <div className="menu-divider"></div>
            <button 
              className="menu-item"
              onClick={() => handleScrollClick('about-us')}
            >
              About us
            </button>
            <div className="menu-divider"></div>
            <button 
              className="menu-item"
              onClick={() => handleScrollClick('contact-us')}
            >
              Join us
            </button>
            <div className="menu-divider"></div>
            <div className="menu-footer">
              <button 
                className="menu-item icon-button cart-button"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className={`cart-badge ${isNewBadge ? 'new' : ''}`}>
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                className="menu-item icon-button"
                onClick={() => handleScrollClick('contact-us')}
              >
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
            <img src="/AliveText.png" alt="ALIVE Text" className="centered-image" />
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
            src="/Girl.png" 
            alt="Girl in white sweater" 
            className={`girl-image ${isWhatHowOpen ? 'blur' : ''}`} 
          />
        </section>

        <section id="our-brands" className="brands-section">
          <h1>Our brands</h1>
          <div className="brands-list">
            {brands.map((brand, index) => (
              <div 
                key={brand.id} 
                className="brand-card"
                onClick={() => handleBrandClick(brand.id)}
              >
                <div className="brand-content">
                  <div className="brand-background-wrapper">
                    <img 
                      src={brand.image} 
                      alt={brand.name} 
                      className="brand-background" 
                    />
                    <div className="brand-overlay"></div>
                  </div>
                  <div className="brand-info">
                    <div className="brand-header">
                      <h2>{brand.name}</h2>
                      <div className="brand-stats">
                        <span className="brand-rating">★ {brand.rating}</span>
                      </div>
                    </div>
                    <p className="brand-description">{brand.description}</p>
                    <div className="brand-actions">
                      <button className="discover-brand-button">
                        Discover this brand
                        <span className="button-arrow">→</span>
                      </button>
                      <button 
                        className={`favorite-button ${favorites.includes(brand.id) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(brand.id);
                        }}
                        aria-label="Toggle favorite"
                      >
                        <Heart 
                          size={24} 
                          fill={favorites.includes(brand.id) ? 'white' : 'none'}
                          style={{ pointerEvents: 'none' }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Us Section */}
        <section id="about-us" className="middle-section">
          <div className="middle-section-content">
            <div className="about-content">
              <div className="about-section">
                <h3>About us</h3>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum</p>
              </div>
              <div className="about-section">
                <h3>Mission</h3>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum</p>
              </div>
              <div className="about-section">
                <h3>Vision</h3>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-us" className="black-section">
          <div className="black-section-content">
            <h2>Let your style come</h2>
            <div className="alive-text-container">
              <img src="/AliveText.png" alt="ALIVE" className="alive-text-contact" />
            </div>
            <h3>Apply to join us!</h3>
            <div className="contact-buttons">
              <button className="contact-button">Call us</button>
              <button className="contact-button">E-mail</button>
            </div>
            <button 
              className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ChevronDown size={24} />
            </button>
          </div>
        </section>

      </div>
    );
  };

  return (
    <div className={isNextSectionVisible ? 'next-section-visible' : ''}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/brand/:brandId" element={<BrandPage />} />
      </Routes>
    </div>
  );
}

export default App;
