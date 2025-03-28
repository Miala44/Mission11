import './App.css';
import BookPage from './pages/BookPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import TotalCartPage from './pages/TotalCartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookPage />} />
            <Route path="/cart/:title/:bookID/:price" element={<CartPage />} />
            <Route path="/TotalCartPage" element={<TotalCartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
