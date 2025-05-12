import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Trash2, X } from 'lucide-react';
import './App.css';

function CartPage() {
  const navigate = useNavigate();

  // Clear all cart data on mount
  useEffect(() => {
    localStorage.removeItem('likedCartItems');
    localStorage.removeItem('cartQuantities');
    localStorage.removeItem('cartVisibleItems');
  }, []);

  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [visibleItems, setVisibleItems] = useState<number[]>([0, 1, 2, 3]);
  const [itemsToAnimate, setItemsToAnimate] = useState<number[]>([]);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  // Mock prices for items
  const itemPrices = [29.99, 39.99, 24.99, 34.99];

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('likedCartItems', JSON.stringify(likedItems));
  }, [likedItems]);

  useEffect(() => {
    localStorage.setItem('cartQuantities', JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    localStorage.setItem('cartVisibleItems', JSON.stringify(visibleItems));
  }, [visibleItems]);

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
      [index]: Math.max(0, (prev[index] || 0) + (increment ? 1 : -1))
    }));
  };

  const confirmDelete = (index: number) => {
    setItemToDelete(index);
  };

  const cancelDelete = () => {
    setItemToDelete(null);
  };

  const removeItem = (index: number) => {
    // Start fade-out animation
    setItemsToAnimate(prev => [...prev, index]);
    setItemToDelete(null);
    
    // Remove item after animation
    setTimeout(() => {
      setVisibleItems(prev => prev.filter(i => i !== index));
      setQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[index];
        return newQuantities;
      });
    }, 300); // Match this with CSS animation duration
  };

  // Calculate total price
  const calculateTotal = () => {
    return visibleItems.reduce((total, index) => {
      const quantity = quantities[index] || 0;
      return total + (itemPrices[index] * quantity);
    }, 0).toFixed(2);
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
          {[0, 1, 2, 3].map((index) => (
            visibleItems.includes(index) && (
              <div 
                key={index} 
                className={`cart-item ${itemsToAnimate.includes(index) ? 'fade-out' : ''}`}
              >
                <div className="item-image"></div>
                <div className="item-controls">
                  <div className="quantity-control">
                    <span>Quantity: {quantities[index] || 0}</span>
                    <div className="quantity-buttons">
                      <button 
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(index, false)}
                        className={(quantities[index] || 0) <= 0 ? 'disabled' : ''}
                        disabled={(quantities[index] || 0) <= 0}
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
                      <button 
                        aria-label="Remove item"
                        onClick={() => confirmDelete(index)}
                        className="remove-button"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="item-price">${itemPrices[index]}</div>
                </div>
                <div className="item-divider"></div>
              </div>
            )
          ))}
        </div>

        <div className="cart-total">
          <span>Total: ${calculateTotal()}</span>
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

        {/* Confirmation Popup */}
        {itemToDelete !== null && (
          <>
            <div className="backdrop" onClick={cancelDelete}></div>
            <div className="delete-confirmation-popup">
              <button className="close-button" onClick={cancelDelete}>
                <X size={24} />
              </button>
              <h2>Remove Item?</h2>
              <div className="confirmation-buttons">
                <button onClick={cancelDelete}>Cancel</button>
                <button onClick={() => removeItem(itemToDelete)}>Remove</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage; 