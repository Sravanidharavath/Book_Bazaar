// pages/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // const addToCart = (item) => {
  //   setCartItems((prevItems) => {
  //     // const exists = prevItems.find((i) => i.id === item.id);

  //     // if (exists) {
  //     //   toast.info(`${item.title} is already in cart!`);
  //     //   return prevItems;
  //     // } else {
  //       toast.success(`${item.title} added to cart successfully!`);
  //       return [...prevItems, { ...item, quantity: 1 }];
  //     // }
  //   });
  // };
  const addToCart = (item) => {
    let alreadyExists = false;
  
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          alreadyExists = true;
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
  
      if (alreadyExists) {
        return updatedCart;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  
    // Show a toast after updating
    toast.success(`${item.title} added to cart successfully!`);
  };
  

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.warn(`Item removed from cart.`);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.error('Cart cleared.');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
