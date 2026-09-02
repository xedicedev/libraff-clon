import React from 'react';
import { booksData as books1 } from '../data/books';
import { BOOKS_DATA as books2 } from '../data/booksData';
import { THREE_ALMA_MULTI_DATA as books3 } from '../data/3alma';
import { TEAS_PRESS_BOOKS as books4 } from '../data/teasPress';
import { BOOKS_DATA as books5 } from '../data/vbooksData';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag } from 'lucide-react';

const ALL_BOOKS = [
  ...(Array.isArray(books1) ? books1 : []),
  ...(Array.isArray(books2) ? books2 : []),
  ...(Array.isArray(books3?.leftTop) ? books3.leftTop : []),
  ...(Array.isArray(books3?.leftBottom) ? books3.leftBottom : []),
  ...(Array.isArray(books3?.rightTop) ? books3.rightTop : []),
  ...(Array.isArray(books3?.rightBottom) ? books3.rightBottom : []),
  ...(Array.isArray(books4) ? books4 : []),
  ...(Array.isArray(books5) ? books5 : []),
];

export default function DiscountsPage({ onNavigate, onAddToCart }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Yalnız köhnə qiyməti olan və ya endirimli kitablar
  const discountedBooks = ALL_BOOKS.filter(
    (book) => book.oldPrice || book.isDiscounted || book.discountPercent
  );

  // Səbətə əlavə etmə funksiyası
  const handleAddToCart = (book) => {
    if (addToCart) {
      addToCart(book);
    } else if (onAddToCart) {
      onAddToCart(book);
    }
  };

  // Ana səhifəyə qaytma funksiyası
  const handleGoHome = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.history.back();
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif', backgroundColor: '#fff', minHeight: '80vh' }}>
      
      {/* İncə Şriftlə Breadcrumb Naviqasiya */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '300', marginBottom: '20px' }}>
        <span
          onClick={handleGoHome}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ef3842')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
          style={{
            color: '#4b5563',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontWeight: '300',
            transition: 'color 0.2s ease'
          }}
        >
          Əsas səhifə
        </span>
        <span style={{ color: '#9ca3af', fontWeight: '300' }}>/</span>
        <span style={{ color: '#374151', fontWeight: '400' }}>
          Endirimli Kitablar ({discountedBooks.length})
        </span>
      </div>

      {/* Başlıq */}
      <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '12px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>
          Endirimli Kitablar <span style={{ fontSize: '18px', color: '#ef3842', fontWeight: '600' }}>({discountedBooks.length})</span>
        </h1>
      </div>

      {discountedBooks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
          <p style={{ fontSize: '16px' }}>Hazırda endirimdə olan kitab tapılmadı.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '24px'
        }}>
          {discountedBooks.map((book, index) => {
            const title = book.title || book.name || 'Adsız Kitab';
            const image = book.coverImage || book.image || book.img;
            const isFav = wishlist.some((item) => String(item.id) === String(book.id));
            
            const priceNum = parseFloat(book.price);
            const oldPriceNum = parseFloat(book.oldPrice);
            const calcDiscount = (oldPriceNum && priceNum && oldPriceNum > priceNum)
              ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100)
              : book.discountPercent;

            return (
              <div
                key={`${book.id || 'discount'}-${index}`}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '16px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#fff',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Endirim Rozetkası (Badge) */}
                {calcDiscount && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#ef3842',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    zIndex: 2
                  }}>
                    -{calcDiscount}%
                  </div>
                )}

                {/* Heart / Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(book);
                  }}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#ffffff',
                    border: '1px solid #f3f4f6',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    zIndex: 2
                  }}
                >
                  <Heart size={16} color={isFav ? '#ef3842' : '#9ca3af'} fill={isFav ? '#ef3842' : 'none'} />
                </button>

                {/* Cover Image */}
                <div
                  onClick={() => onNavigate && onNavigate('product-detail', book)}
                  style={{
                    height: '220px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    padding: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                  <img
                    src={image}
                    alt={title}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {book.author && (
                    <span style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px', fontWeight: '600' }}>
                      {book.author}
                    </span>
                  )}

                  <h3
                    onClick={() => onNavigate && onNavigate('product-detail', book)}
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#111827',
                      margin: '0 0 12px 0',
                      lineHeight: '1.4',
                      height: '40px',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {title}
                  </h3>

                  {/* Price Section */}
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: '#ef3842' }}>
                      {book.price} ₼
                    </span>
                    {book.oldPrice && (
                      <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>
                        {book.oldPrice} ₼
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(book);
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: '#ef3842',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    <ShoppingBag size={15} />
                    <span>Səbətə əlavə et</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}