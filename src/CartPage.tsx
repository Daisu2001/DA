import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Trash2, X } from 'lucide-react';
import './App.css';

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

interface DeleteItem {
  id: string;
  brandId: string;
}

function CartPage() {
  const navigate = useNavigate();
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemsToAnimate, setItemsToAnimate] = useState<string[]>([]);
  const [itemToDelete, setItemToDelete] = useState<DeleteItem | null>(null);

  const toggleLike = (itemId: string) => {
    setLikedItems(prev => {
      const newLikedItems = prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];
      
      // Save to localStorage immediately after updating
      localStorage.setItem('likedCartItems', JSON.stringify(newLikedItems));
      return newLikedItems;
    });
  };

  const handleDeleteItem = (itemId: string, brandId: string) => {
    // Get current cart items
    const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Find the item to remove
    const updatedCart = currentCart.filter(
      (item: CartItem) => !(item.id === itemId && item.brandId === brandId)
    );
    
    // Save the updated cart
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Update local state
    setCartItems(updatedCart);
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Close delete confirmation if open
    setItemToDelete(null);
  };

  const handleQuantityChange = (itemId: string, brandId: string, change: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId && item.brandId === brandId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const confirmDelete = (id: string, brandId: string) => {
    setItemToDelete({ id, brandId });
  };

  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    const savedLikedItems = localStorage.getItem('likedCartItems');
    if (savedLikedItems) {
      setLikedItems(JSON.parse(savedLikedItems));
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <nav className="nav-buttons">
        <button 
          className="icon-button menu-button" 
          aria-label="Back"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={24} />
        </button>
      </nav>
      
      <h1 className="cart-title">Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add items from our luxury brands to start shopping</p>
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div 
                key={`${item.brandId}-${item.id}`}
                className={`cart-item ${itemsToAnimate.includes(item.id) ? 'fade-out' : ''}`}
              >
                <div className="item-image">
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  {item.selectedColor && (
                    <div className="item-color">
                      <span>Color: {item.selectedColor.name}</span>
                      <div 
                        className="color-preview" 
                        style={{ backgroundColor: item.selectedColor.code }}
                      />
                    </div>
                  )}
                </div>
                <div className="item-controls">
                  <div className="quantity-control">
                    <span>Quantity: {item.quantity}</span>
                    <div className="quantity-buttons">
                      <button 
                        aria-label="Decrease quantity"
                        onClick={() => handleQuantityChange(item.id, item.brandId, -1)}
                        className={item.quantity <= 1 ? 'disabled' : ''}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <button 
                        aria-label="Increase quantity"
                        onClick={() => handleQuantityChange(item.id, item.brandId, 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      aria-label="Add to wishlist"
                      onClick={() => toggleLike(item.id)}
                      className={likedItems.includes(item.id) ? 'liked' : ''}
                    >
                      <Heart 
                        size={16} 
                        fill={likedItems.includes(item.id) ? 'black' : 'none'}
                      />
                    </button>
                    <button 
                      aria-label="Remove item"
                      onClick={() => confirmDelete(item.id, item.brandId)}
                      className="remove-button"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div className="item-divider"></div>
              </div>
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
        </>
      )}

      {itemToDelete && (
        <>
          <div className="backdrop" onClick={() => setItemToDelete(null)}></div>
          <div className="delete-confirmation-popup">
            <button className="close-button" onClick={() => setItemToDelete(null)}>
              <X size={24} />
            </button>
            <h2>Remove Item?</h2>
            <div className="confirmation-buttons">
              <button onClick={() => setItemToDelete(null)}>Cancel</button>
              <button onClick={() => handleDeleteItem(itemToDelete.id, itemToDelete.brandId)}>Remove</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage; 