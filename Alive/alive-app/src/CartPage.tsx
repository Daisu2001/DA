import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './App.css';

function CartPage() {
  const navigate = useNavigate();

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
      <div className="cart-content">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty</p>
      </div>
    </div>
  );
}

export default CartPage; 