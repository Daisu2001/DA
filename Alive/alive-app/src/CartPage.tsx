import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import './App.css';

function CartPage() {
  const navigate = useNavigate();
  const [likedItems, setLikedItems] = useState<number[]>(() => {
    const saved = localStorage.getItem('likedCartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [quantities, setQuantities] = useState<{ [key: number]: number }>(() => {
    const saved = localStorage.getItem('cartQuantities');
    return saved ? JSON.parse(saved) : { 0: 1, 1: 1, 2: 1, 3: 1 };
  });

  // Save liked items to localStorage
  useEffect(() => {
    localStorage.setItem('likedCartItems', JSON.stringify(likedItems));
  }, [likedItems]);

  // Save quantities to localStorage
  useEffect(() => {
    localStorage.setItem('cartQuantities', JSON.stringify(quantities));
  }, [quantities]);

  const toggleLike = (index: number) => {
    setLikedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const updateQuantity = (index: number, increment: boolean) => {
    setQuantities(prev => ({
      ...prev,
      [index]: Math.max(1, prev[index] + (increment ? 1 : -1))
    }));
  };

  return (
    <div className="cart-page">
      <nav className={`nav-buttons`}>
        <button 
          className="icon-button menu-button" 
          aria-label="Back"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={24} />
        </button>
      </nav>
      <div className="cart-content">
        <h1 className="cart-title">Cart</h1>
        <button className="wishlist-button">Wishlist</button>
        
        <div className="cart-items">
          {[1, 2, 3, 4].map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-image"></div>
              <div className="item-controls">
                <div className="quantity-control">
                  <span>Quantity: {quantities[index]}</span>
                  <div className="quantity-buttons">
                    <button 
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(index, false)}
                      className={quantities[index] <= 1 ? 'disabled' : ''}
                      disabled={quantities[index] <= 1}
                    >
                      -
                    </button>
                    <button 
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(index, true)}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-actions">
                    <button 
                      aria-label="Add to wishlist"
                      onClick={() => toggleLike(index)}
                      className={likedItems.includes(index) ? 'liked' : ''}
                    >
                      <Heart 
                        size={16} 
                        fill={likedItems.includes(index) ? 'black' : 'none'}
                      />
                    </button>
                    <button aria-label="Remove item">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="item-price">--- $</div>
              </div>
              <div className="item-divider"></div>
            </div>
          ))}
        </div>

        <div className="cart-total">
          <span>Total: --- $</span>
        </div>

        <div className="cart-buttons">
          <button className="pay-now-button">
            Pay now
          </button>
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            Back to Alive
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage; 