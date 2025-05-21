import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu, ShoppingCart, ChevronLeft, Phone, Heart, Plus, Star } from 'lucide-react';
import './App.css';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  isNew?: boolean;
  isFavorite?: boolean;
}

const dummyProducts: Product[] = [
  { id: '1', name: 'Limited Edition Watch', image: '/placeholder.png', price: 999.99, rating: 4.8, isNew: true },
  { id: '2', name: 'Classic Timepiece', image: '/placeholder.png', price: 799.99, rating: 4.5 },
  { id: '3', name: 'Diamond Collection', image: '/placeholder.png', price: 1299.99, rating: 4.9, isNew: true },
  { id: '4', name: 'Sport Edition', image: '/placeholder.png', price: 899.99, rating: 4.6 },
  { id: '5', name: 'Gold Series', image: '/placeholder.png', price: 1499.99, rating: 4.7 },
  { id: '6', name: 'Silver Collection', image: '/placeholder.png', price: 999.99, rating: 4.4 },
];

const BrandPage: React.FC = () => {
  const navigate = useNavigate();
  const { brandId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

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

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="brand-page">
      <div className="page-container">
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

        {/* Back to Brands Button */}
        <div className="navigation-section">
          <button className="back-to-brands" onClick={handleBackToBrands}>
            <ChevronLeft size={16} />
            Back to brands
          </button>
        </div>

        {/* Products Grid */}
        <div className={`products-grid ${isMenuOpen ? 'blur' : ''}`}>
          {dummyProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-placeholder">
                {product.isNew && (
                  <div className="new-badge">
                    New
                  </div>
                )}
                <button 
                  className={`favorite-button ${favorites.includes(product.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart size={20} />
                </button>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-rating">
                  <Star size={16} />
                  <span>{product.rating}</span>
                </div>
                <div className="product-price">
                  ${product.price.toLocaleString()}
                </div>
                <button className="add-to-cart">
                  <Plus size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default BrandPage; 