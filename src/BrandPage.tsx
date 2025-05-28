import React, { useState, useEffect } from 'react';
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

interface CartItem {
  id: string;
  brandId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: Color;
}

const pradaProducts: Product[] = [
  { 
    id: '1', 
    name: 'Re-Nylon Gabardine Jacket', 
    image: '/Prada.jpg', 
    price: 2950.00, 
    rating: 4.8, 
    isNew: true,
    colors: [
      { name: 'Olive', code: '#808000', image: '/Prada.jpg' },
      { name: 'Dark Brown', code: '#3e2723', image: '/Prada (2).jpg' },
      { name: 'Navy', code: '#000080', image: '/Prada (3).jpg' },
      { name: 'Black', code: '#000000', image: '/Prada (4).jpg' }
    ]
  },
  { 
    id: '2', 
    name: 'Technical Cotton Jacket', 
    image: '/Prada (2).jpg', 
    price: 2750.00, 
    rating: 4.5,
    colors: [
      { name: 'Brown', code: '#8B4513', image: '/Prada (2).jpg' },
      { name: 'Black', code: '#000000', image: '/Prada (3).jpg' },
      { name: 'Navy', code: '#000080', image: '/Prada (4).jpg' }
    ]
  },
  { 
    id: '3', 
    name: 'Cotton Piqué Shirt', 
    image: '/Prada (3).jpg', 
    price: 1150.00, 
    rating: 4.9, 
    isNew: true,
    colors: [
      { name: 'White', code: '#FFFFFF', image: '/Prada (3).jpg' },
      { name: 'Light Blue', code: '#ADD8E6', image: '/Prada (4).jpg' }
    ]
  },
  { 
    id: '4', 
    name: 'Re-Nylon Gabardine Pants', 
    image: '/Prada (4).jpg', 
    price: 1850.00, 
    rating: 4.6,
    colors: [
      { name: 'Black', code: '#000000', image: '/Prada (4).jpg' },
      { name: 'Navy', code: '#000080', image: '/Prada (5).jpg' },
      { name: 'Beige', code: '#F5F5DC', image: '/Prada (6).jpg' }
    ]
  },
  { 
    id: '5', 
    name: 'Leather Bomber Jacket', 
    image: '/Prada (5).jpg', 
    price: 4950.00, 
    rating: 4.7,
    colors: [
      { name: 'Black', code: '#000000', image: '/Prada (5).jpg' },
      { name: 'Brown', code: '#8B4513', image: '/Prada (6).jpg' }
    ]
  },
  { 
    id: '6', 
    name: 'Padded Nylon Jacket', 
    image: '/Prada (6).jpg', 
    price: 2850.00, 
    rating: 4.4,
    colors: [
      { name: 'Black', code: '#000000', image: '/Prada (6).jpg' },
      { name: 'Navy', code: '#000080', image: '/Prada.jpg' }
    ]
  }
];

const chanelProducts: Product[] = [
  { 
    id: '1', 
    name: 'Diamond Solitaire Ring', 
    image: '/Chanel1.png', 
    price: 12500.00, 
    rating: 4.9, 
    isNew: true,
    colors: [
      { name: 'White Gold', code: '#E8E8E8', image: '/Chanel1.png' },
      { name: 'Yellow Gold', code: '#FFD700', image: '/Chanel2.png' }
    ]
  },
  { 
    id: '2', 
    name: 'Coco Crush Ring', 
    image: '/Chanel2.png', 
    price: 8900.00, 
    rating: 4.8,
    colors: [
      { name: 'Yellow Gold', code: '#FFD700', image: '/Chanel2.png' },
      { name: 'White Gold', code: '#E8E8E8', image: '/Chanel3.png' }
    ]
  },
  { 
    id: '3', 
    name: 'Camélia Ring', 
    image: '/Chanel3.png', 
    price: 15800.00, 
    rating: 4.9, 
    isNew: true,
    colors: [
      { name: 'White Gold', code: '#E8E8E8', image: '/Chanel3.png' },
      { name: 'Rose Gold', code: '#B76E79', image: '/Chanel4.png' }
    ]
  },
  { 
    id: '4', 
    name: 'Ultra Ring', 
    image: '/Chanel4.png', 
    price: 9800.00, 
    rating: 4.8,
    colors: [
      { name: 'White Gold', code: '#E8E8E8', image: '/Chanel4.png' },
      { name: 'Yellow Gold', code: '#FFD700', image: '/Chanel5.png' }
    ]
  },
  { 
    id: '5', 
    name: 'Baroque Ring', 
    image: '/Chanel5.png', 
    price: 11200.00, 
    rating: 4.7,
    colors: [
      { name: 'Yellow Gold', code: '#FFD700', image: '/Chanel5.png' },
      { name: 'White Gold', code: '#E8E8E8', image: '/Chanel6.png' }
    ]
  },
  { 
    id: '6', 
    name: 'Comète Ring', 
    image: '/Chanel6.png', 
    price: 13500.00, 
    rating: 4.9,
    colors: [
      { name: 'White Gold', code: '#E8E8E8', image: '/Chanel6.png' },
      { name: 'Yellow Gold', code: '#FFD700', image: '/Chanel1.png' }
    ]
  }
];

const valentinoProducts: Product[] = [
  { 
    id: '1', 
    name: 'Crystal-Embellished Heels', 
    image: '/valentino.jpg', 
    price: 1200.00, 
    rating: 4.8, 
    isNew: true,
    colors: [
      { name: 'Black', code: '#000000', image: '/valentino.jpg' },
      { name: 'Red', code: '#FF0000', image: '/valentino (2).jpg' }
    ]
  },
  { 
    id: '2', 
    name: 'Tailored Wide-Leg Pants', 
    image: '/valentino (2).jpg', 
    price: 1450.00, 
    rating: 4.7,
    colors: [
      { name: 'Black', code: '#000000', image: '/valentino (2).jpg' },
      { name: 'Navy', code: '#000080', image: '/valentino (3).jpg' }
    ]
  },
  { 
    id: '3', 
    name: 'Structured Wool Jacket', 
    image: '/valentino (3).jpg', 
    price: 3200.00, 
    rating: 4.9, 
    isNew: true,
    colors: [
      { name: 'Black', code: '#000000', image: '/valentino (3).jpg' },
      { name: 'Beige', code: '#F5F5DC', image: '/valentino (4).jpg' }
    ]
  },
  { 
    id: '4', 
    name: 'Statement Collar Blouse', 
    image: '/valentino (4).jpg', 
    price: 980.00, 
    rating: 4.6,
    colors: [
      { name: 'White', code: '#FFFFFF', image: '/valentino (4).jpg' },
      { name: 'Black', code: '#000000', image: '/valentino (5).jpg' }
    ]
  },
  { 
    id: '5', 
    name: 'Cashmere Knit Sweater', 
    image: '/valentino (5).jpg', 
    price: 1750.00, 
    rating: 4.8,
    colors: [
      { name: 'Cream', code: '#FFFDD0', image: '/valentino (5).jpg' },
      { name: 'Grey', code: '#808080', image: '/valentino (6).jpg' }
    ]
  },
  { 
    id: '6', 
    name: 'Strappy Evening Top', 
    image: '/valentino (6).jpg', 
    price: 890.00, 
    rating: 4.7,
    colors: [
      { name: 'Black', code: '#000000', image: '/valentino (6).jpg' },
      { name: 'Red', code: '#FF0000', image: '/valentino.jpg' }
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
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isNewBadge, setIsNewBadge] = useState(false);

  // Select products based on brandId
  const products = brandId?.toLowerCase() === 'chanel' 
    ? chanelProducts 
    : brandId?.toLowerCase() === 'valentino'
    ? valentinoProducts
    : pradaProducts;

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
    if (!selectedProduct || !brandId) return;

    // Get existing cart items or initialize empty array
    const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(
      item => item.id === selectedProduct.id && item.brandId === brandId
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item if it doesn't exist
      const newItem: CartItem = {
        id: selectedProduct.id,
        brandId: brandId,
        name: selectedProduct.name,
        image: selectedProduct.image,
        price: selectedProduct.price,
        quantity: 1,
        selectedColor: selectedColor || selectedProduct.colors[0]
      };
      existingCart.push(newItem);
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCart));

    // Update cart count immediately
    const totalItems = existingCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setCartCount(totalItems);

    // Dispatch custom event for cart update
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    setShowCartConfirmation(true);
    setTimeout(() => {
      setShowCartConfirmation(false);
      setSelectedProduct(null);
    }, 1500);
  };

  // Update cart count whenever it changes
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (!Array.isArray(cartItems)) {
          setCartCount(0);
          return;
        }
        const totalItems = cartItems.reduce((sum: number, item: CartItem) => {
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

  // Add color selection handler
  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
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
          <button className="icon-button cart-button" onClick={() => navigate('/cart')}>
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className={`cart-badge ${isNewBadge ? 'new' : ''}`}>
                {cartCount}
              </span>
            )}
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
          {products.map((product) => (
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
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
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
                    className={`color-button ${selectedColor?.code === color.code ? 'selected' : ''}`}
                    style={{ backgroundColor: color.code }}
                    aria-label={`${color.name} color`}
                    onClick={() => handleColorSelect(color)}
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