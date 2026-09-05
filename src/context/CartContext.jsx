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

  // DÜZƏLİŞ: 2-ci parametr olaraq quantity (miqdar) əlavə edildi
  const addToCart = (product, quantityToAdd = 1) => {
    if (!product) return;

    // Gələn miqdarı ədədə çeviririk (əgər ötürülməyibsə, 1 götürür)
    const amount = Number(quantityToAdd) || 1;

    setCartItems((prevItems) => {
      const rawTitle = product.title || product.name || 'Adsız Kitab';
      const productId = product.id || product._id || product.code || `${rawTitle}-${product.price}`;

      const existingIndex = prevItems.findIndex((item) => {
        const itemId = item.id || item._id || item.code || (item.book && (item.book.id || item.book._id)) || `${item.title || item.name}-${item.price}`;
        return String(itemId) === String(productId);
      });

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const currentQty = Number(updated[existingIndex].quantity) || 1;
        
        // DÜZƏLİŞ: Sabit +1 əvəzinə seçilən miqdarı (amount) əlavə edirik
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: currentQty + amount
        };
        return updated;
      } else {
        // DÜZƏLİŞ: İlk dəfə əlavə olunanda da seçilən miqdarı (amount) mənimsədirik
        return [...prevItems, { ...product, id: productId, quantity: amount }];
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
          return { ...item, quantity: Number(newQuantity) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = Number(item.price || (item.book && item.book.price)) || 0;
    return sum + price * (Number(item.quantity) || 1);
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