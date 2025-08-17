

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage
  // The function passed to useState only runs once on initial render
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('shopping_cart');
      // If data exists in localStorage, parse it; otherwise, return an empty array
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      // Handle potential errors during parsing (e.g., corrupted data)
      console.error("Failed to parse cart from localStorage:", error);
      return []; // Return empty cart to prevent app crash
    }
  });

  // Use useEffect to save cart to localStorage whenever the cart state changes
  useEffect(() => {
    try {
      localStorage.setItem('shopping_cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]); // The effect re-runs only when the 'cart' state array changes

  const addToCart = (medicine) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === medicine._id);
      if (existing) {
        return prev.map((item) =>
          item._id === medicine._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...medicine, quantity: 1 }];
      }
    });
    // The useEffect above will automatically handle saving this change to localStorage
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
    // The useEffect above will automatically handle saving this change to localStorage
  };

  const clearCart = () => {
    setCart([]);
    // The useEffect above will automatically handle saving this change to localStorage
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
    // The useEffect above will automatically handle saving this change to localStorage
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);