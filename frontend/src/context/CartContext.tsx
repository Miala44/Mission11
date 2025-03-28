import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

// Define the structure of the CartContext
interface CartContextType {
  cart: CartItem[]; // Array to hold cart items
  addToCart: (item: CartItem) => void; // Function to add an item to the cart
  removeFromCart: (bookID: number) => void; // Function to remove an item by its bookID
  clearCart: () => void; // Function to clear the cart
}

// Create the context with a default value of undefined (this will be checked later)
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component that manages the cart's state and actions
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]); // Initialize cart state as an empty array

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart.find((book) => book.bookID === item.bookID);

      // If the item exists, update the quantity; otherwise, add it as a new item
      const updatedCart = prevCart.map(
        (book) =>
          book.bookID === item.bookID
            ? { ...book, quantity: book.quantity + item.quantity } // Update quantity if item is found
            : book // Otherwise keep the item unchanged
      );

      // If the item wasn't in the cart, add it to the array
      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  // Function to remove an item from the cart by its bookID
  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((book) => book.bookID !== bookID));
    // Filter out the book that matches the given bookID
  };

  // Function to clear all items from the cart
  const clearCart = () => {
    setCart(() => []); // Set the cart to an empty array
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children} {/* Render children components within the provider */}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = () => {
  const context = useContext(CartContext); // Access the context value

  // If the context is undefined (not within CartProvider), throw an error
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context; // Return the context value (cart state and actions)
};
