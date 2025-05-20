import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu, ShoppingCart, ChevronLeft, Filter, Phone } from 'lucide-react';
import './App.css';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

const dummyProducts: Product[] = [
  { id: '1', name: 'Product 1', image: '/placeholder.png', price: 999.99 },
  { id: '2', name: 'Product 2', image: '/placeholder.png', price: 799.99 },
  { id: '3', name: 'Product 3', image: '/placeholder.png', price: 1299.99 },
  { id: '4', name: 'Product 4', image: '/placeholder.png', price: 899.99 },
  { id: '5', name: 'Product 5', image: '/placeholder.png', price: 1499.99 },
  { id: '6', name: 'Product 6', image: '/placeholder.png', price: 999.99 },
];

const BrandPage: React.FC = () => {
  const navigate = useNavigate();
  const { brandId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBackToBrands = () => {
    navigate('/');
    setTimeout(() => {
      const brandsSection = document.getElementById('our-brands');
      if (brandsSection) {
        brandsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleScrollClick = (targetId: string) => {
    setIsMenuOpen(false);
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="brand-page">
      {/* Navigation Bar */}
      <nav className="brand-nav">
        <button className="icon-button" onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} />
        </button>
        <div className="brand-logo">
          {brandId?.toUpperCase()}
        </div>
        <button className="icon-button" onClick={() => navigate('/cart')}>
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
              className="menu-item icon-button"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart size={24} />
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

      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="backdrop" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Back to Brands Button */}
      <button className="back-to-brands" onClick={handleBackToBrands}>
        <ChevronLeft size={16} />
        Back to brands
      </button>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-content">
          <div className="filter-left">
            <Filter size={16} />
          </div>
          <button className="type-button">Type</button>
          <div className="rec-added">Rec. added</div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`products-grid ${isMenuOpen ? 'blur' : ''}`}>
        {dummyProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-placeholder"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPage; 