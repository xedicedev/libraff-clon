import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('libraff_cart');
      return localData ? JSON.parse(localData) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('libraff_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error("Cart storage error:", e);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product) return;

    setCartItems((prevItems) => {
      // Unikal ID tapma və ya yaratma mexanizmi
      const rawTitle = product.title || product.name || 'Adsız Kitab';
      const productId = product.id || product._id || product.code || `${rawTitle}-${product.price}`;

      const existingIndex = prevItems.findIndex((item) => {
        const itemId = item.id || item._id || item.code || (item.book && (item.book.id || item.book._id)) || `${item.title || item.name}-${item.price}`;
        return String(itemId) === String(productId);
      });

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1
        };
        return updated;
      } else {
        return [...prevItems, { ...product, id: productId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => {
        const itemId = item.id || item._id || item.code || `${item.title || item.name}-${item.price}`;
        return String(itemId) !== String(id);
      })
    );
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const itemId = item.id || item._id || item.code || `${item.title || item.name}-${item.price}`;
        if (String(itemId) === String(id)) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item.price || (item.book && item.book.price)) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}