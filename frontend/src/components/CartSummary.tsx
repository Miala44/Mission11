import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  //   const totalAmount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.length;

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px', // Ensure it's positioned at the top-right
        background: '#f28fad', // Bootstrap primary blue
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
        fontWeight: 'bold',
        border: 'none',
        zIndex: 1000, // Ensure it appears on top of other elements
      }}
      onClick={() => navigate('/TotalCartPage')}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="View what is in your cart!"
    >
      🛒 <strong>{totalAmount}</strong>
    </div>
  );
};

export default CartSummary;
