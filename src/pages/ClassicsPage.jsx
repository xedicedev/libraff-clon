import React from 'react';
import { BOOKS_DATA } from '../data/vbooksData';
import { useWishlist } from '../context/WishlistContext';

export default function ClassicsPage({ onNavigate, searchTerm = '', onAddToCart }) {
  const { wishlist, toggleWishlist, addToWishlist, isInWishlist } = useWishlist();

  // vbooksData faylından categoryId === 'classics' olan kitablar
  const classics = (BOOKS_DATA || []).filter((book) => {
    const isClassic = book?.categoryId === 'classics';
    const title = String(book?.title || '').toLowerCase();
    const author = String(book?.author || '').toLowerCase();
    const query = String(searchTerm || '').toLowerCase();

    return isClassic && (title.includes(query) || author.includes(query));
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px', fontFamily: 'sans-serif', minHeight: '80vh' }}>
      
      {/* Səhifə Başlığı */}
      <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: 0 }}>
          Klassik Ədəbiyyat
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>
          Dünya və Azərbaycan klassiklərinin ən seçilmiş əsərləri
        </p>
      </div>

      {/* Grid */}
      {classics.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <p style={{ color: '#6b7280', fontSize: '15px' }}>Axtarışınıza uyğun klassik kitab tapılmadı.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '24px'
        }}>
          {classics.map((book) => {
            const isFav = isInWishlist 
              ? isInWishlist(book.id) 
              : wishlist?.some((item) => String(item.id) === String(book.id));

            return (
              <div
                key={book.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxSizing: 'border-box'
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
                {/* Ürək Düyməsi */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (toggleWishlist) toggleWishlist(book);
                    else if (addToWishlist) addToWishlist(book);
                  }}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
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
                  title="Seçilmişlərə əlavə et"
                >
                  <span style={{ fontSize: '16px', color: isFav ? '#ef3842' : '#9ca3af', lineHeight: 1 }}>
                    {isFav ? '♥' : '♡'}
                  </span>
                </button>

                {/* Şəkil */}
                <div
                  onClick={() => onNavigate && onNavigate('product-detail', book)}
                  style={{
                    width: '100%',
                    height: '180px',
                    marginBottom: '12px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Başlıq və Müəllif */}
                <div style={{ minHeight: '54px', marginBottom: '8px' }}>
                  <h3
                    onClick={() => onNavigate && onNavigate('product-detail', book)}
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#111827',
                      margin: '0 0 2px 0',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    title={book.title}
                  >
                    {book.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {book.author || 'Məlumat yoxdur'}
                  </p>
                </div>

                {/* Qiymət */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#ef3842' }}>
                    {book.price} ₼
                  </span>
                  {book.oldPrice && (
                    <span style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through' }}>
                      {book.oldPrice} ₼
                    </span>
                  )}
                </div>

                {/* SƏBƏTƏ ƏLAVƏ ET DÜYMƏSİ */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAddToCart) onAddToCart(book);
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: '#ef3842',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    marginTop: 'auto'
                  }}
                >
                  Səbətə əlavə et
                </button>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}