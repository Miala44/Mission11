import { useCallback, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function TotalCartPage() {
  const navigate = useNavigate(); // Navigation hook
  const { cart, removeFromCart, clearCart } = useCart(); // Access cart and actions from context
  const grandTotal = cart.reduce(
    // Calculate grand total of all items
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>

      {/* Display empty cart message or items */}
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '15px',
          }}
        >
          {cart.map((item) => (
            <div
              key={item.bookID}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '15px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                background: '#fff',
              }}
            >
              <h3>{item.title}</h3>
              <p>
                <strong>Price:</strong> ${item.price.toFixed(2)}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Total:</strong> $
                {(item.quantity * item.price).toFixed(2)}
              </p>
              {/* Button to remove item from cart */}
              <button
                onClick={() => removeFromCart(item.bookID)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Click to delete this book from your cart!"
                style={{
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Grand total section */}
      <h3>Items: {cart.length}</h3>
      <h3>Total: ${grandTotal.toFixed(2)}</h3>

      {/* Checkout and continue shopping buttons */}
      <div style={{ marginTop: '15px' }}>
        <button
          onClick={() => clearCart()}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Click to clear your whole cart!"
          style={{
            background: 'green',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Checkout
        </button>
        <button
          onClick={() => navigate('/')}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="See all books!"
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default TotalCartPage;
