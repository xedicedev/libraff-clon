import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('libraff_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('libraff_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (book) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === book.id);
      if (exists) {
        return prev.filter((item) => item.id !== book.id);
      }
      return [...prev, book];
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);