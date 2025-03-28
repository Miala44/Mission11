import WelcomeTitle from '../components/WelcomeTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate(); // Navigation hook
  const { title, bookID, price } = useParams(); // Get book details from URL
  const { addToCart } = useCart(); // Access addToCart function from context
  const [quantity, setQuantity] = useState<number>(1); // Quantity state

  const bookPrice = price ? Number(price) : 0; // Price conversion
  const totalPrice = (bookPrice * quantity).toFixed(2); // Total price

  const handleAddToCart = () => {
    if (quantity < 1) return; // Prevent invalid quantity

    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No book found',
      quantity,
      price: bookPrice,
    };
    addToCart(newItem); // Add item to cart
    navigate('/TotalCartPage'); // Navigate to cart page
  };

  return (
    <div className="container mt-5">
      <WelcomeTitle />
      <h2 className="text-center mb-4">Add to Cart</h2>

      <div className="row justify-content-center">
        <div className="col-md-16 p-5 border rounded bg-light shadow">
          <h3>{title}</h3> {/* Display book title */}
          {/* Quantity input */}
          <div className="mb-3">
            <label className="form-label">
              <strong>Quantity:</strong>
            </label>
            <input
              type="number"
              className="form-control"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          {/* Price details */}
          <p>
            <strong>Book Price:</strong> ${bookPrice.toFixed(2)}
          </p>
          <p>
            <strong>Total Price:</strong> ${totalPrice}
          </p>
          {/* Buttons */}
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-primary flex-grow-1"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Click to add this book to your cart!"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-secondary flex-grow-1"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Click to go back to all books!"
              onClick={() => navigate('/')}
            >
              Return to Book List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
