import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu, ShoppingCart, ChevronLeft, Phone, Heart, Plus, Star, X } from 'lucide-react';
import './App.css';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  isNew?: boolean;
  isFavorite?: boolean;
  colors: Color[];
}

interface Color {
  name: string;
  code: string;
  image: string;
}

const dummyProducts: Product[] = [
  { 
    id: '1', 
    name: 'Limited Edition Watch', 
    image: '/placeholder.png', 
    price: 999.99, 
    rating: 4.8, 
    isNew: true,
    colors: [
      { name: 'Olive', code: '#808000', image: '/placeholder.png' },
      { name: 'Dark Brown', code: '#3e2723', image: '/placeholder.png' },
      { name: 'Navy', code: '#000080', image: '/placeholder.png' },
      { name: 'Silver', code: '#C0C0C0', image: '/placeholder.png' }
    ]
  },
  { 
    id: '2', 
    name: 'Classic Timepiece', 
    image: '/placeholder.png', 
    price: 799.99, 
    rating: 4.5,
    colors: [
      { name: 'Gold', code: '#FFD700', image: '/placeholder.png' },
      { name: 'Silver', code: '#C0C0C0', image: '/placeholder.png' },
      { name: 'Rose Gold', code: '#B76E79', image: '/placeholder.png' }
    ]
  },
  { 
    id: '3', 
    name: 'Diamond Collection', 
    image: '/placeholder.png', 
    price: 1299.99, 
    rating: 4.9, 
    isNew: true,
    colors: [
      { name: 'White Gold', code: '#E8E8E8', image: '/placeholder.png' },
      { name: 'Yellow Gold', code: '#FFD700', image: '/placeholder.png' }
    ]
  },
  { 
    id: '4', 
    name: 'Sport Edition', 
    image: '/placeholder.png', 
    price: 899.99, 
    rating: 4.6,
    colors: [
      { name: 'Black', code: '#000000', image: '/placeholder.png' },
      { name: 'Red', code: '#FF0000', image: '/placeholder.png' },
      { name: 'Blue', code: '#0000FF', image: '/placeholder.png' }
    ]
  },
  { 
    id: '5', 
    name: 'Gold Series', 
    image: '/placeholder.png', 
    price: 1499.99, 
    rating: 4.7,
    colors: [
      { name: 'Yellow Gold', code: '#FFD700', image: '/placeholder.png' },
      { name: 'Rose Gold', code: '#B76E79', image: '/placeholder.png' }
    ]
  },
  { 
    id: '6', 
    name: 'Silver Collection', 
    image: '/placeholder.png', 
    price: 999.99, 
    rating: 4.4,
    colors: [
      { name: 'Silver', code: '#C0C0C0', image: '/placeholder.png' },
      { name: 'Platinum', code: '#E5E4E2', image: '/placeholder.png' }
    ]
  }
];

const BrandPage: React.FC = () => {
  const navigate = useNavigate();
  const { brandId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCartConfirmation, setShowCartConfirmation] = useState(false);

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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closePreview = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    setShowCartConfirmation(true);
    setTimeout(() => {
      setShowCartConfirmation(false);
      setSelectedProduct(null);
    }, 1500);
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
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image-placeholder">
                {product.isNew && (
                  <div className="new-badge">
                    New
                  </div>
                )}
                <button 
                  className={`favorite-button ${favorites.includes(product.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
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
                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color.code}
                      className="color-button"
                      style={{ backgroundColor: color.code }}
                      aria-label={`${color.name} color`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Confirmation Popup */}
      {showCartConfirmation && (
        <div className="cart-confirmation">
          <div className="cart-confirmation-content">
            <ShoppingCart size={24} />
            <span>Added to cart!</span>
          </div>
        </div>
      )}

      {/* Product Preview Modal */}
      {selectedProduct && (
        <div className="preview-modal" onClick={closePreview}>
          <div className="preview-content" onClick={e => e.stopPropagation()}>
            <button className="close-preview" onClick={closePreview}>
              <X size={24} />
            </button>
            <div className="preview-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
            <div className="preview-info">
              <h3>{selectedProduct.name}</h3>
              <div className="preview-rating">
                <Star size={16} />
                <span>{selectedProduct.rating}</span>
              </div>
              <div className="preview-price">
                ${selectedProduct.price.toLocaleString()}
              </div>
              <div className="preview-colors">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color.code}
                    className="color-button"
                    style={{ backgroundColor: color.code }}
                    aria-label={`${color.name} color`}
                  />
                ))}
              </div>
              <button className="add-to-cart" onClick={handleAddToCart}>
                <Plus size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

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