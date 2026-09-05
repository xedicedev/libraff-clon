import React, { useState, useRef } from 'react';
import { BOOKS_DATA } from '../data/vbooksData';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';

export default function MostViewedSection({ onNavigate, onSelectBook }) {
  const { t } = useLanguage();
  const INITIAL_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  
  const sectionRef = useRef(null);

  const { wishlist, toggleWishlist } = useWishlist();
  const [modalBook, setModalBook] = useState(null);

  // Məlumatları təhlükəsiz şəkildə oxuyuruq
  const rawBooks = Array.isArray(BOOKS_DATA) ? BOOKS_DATA : (BOOKS_DATA?.az || []);
  
  // Əgər isMostViewed xüsusiyyəti yoxdursa, bütün kitabları göstərməsi üçün alternativ yaradırıq
  const currentBooks = rawBooks.length > 0 
    ? rawBooks.filter((book) => book.isMostViewed !== false) 
    : [];

  const displayedBooks = currentBooks.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + INITIAL_COUNT);
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => Math.max(INITIAL_COUNT, prev - INITIAL_COUNT));
  };

  const handleCloseAll = () => {
    setVisibleCount(INITIAL_COUNT);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFavoriteClick = (book) => {
    const isAlreadyFav = wishlist.some((item) => item.id === book.id);
    toggleWishlist(book);

    if (!isAlreadyFav) {
      setModalBook(book);
    }
  };

  // Yönləndirmə funksiyası
  const handleOpenDetail = (book) => {
    if (onSelectBook) {
      onSelectBook(book);
    } else if (onNavigate) {
      onNavigate('product-detail', book);
    }
  };

  const isAllShown = visibleCount >= currentBooks.length;

  return (
    <section
      ref={sectionRef}
      style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '40px 24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* BAŞLIQ */}
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '32px',
        }}
      >
        {t.mostViewedTitlePrefix} <span style={{ color: '#e52e2e' }}>{t.mostViewedTitleHighlight}</span>
      </h2>

      {/* KİTABLAR ŞƏBƏKƏSİ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {displayedBooks.map((book) => {
          const isFav = wishlist.some((item) => item.id === book.id);
          const safePrice = Number(book.price) || 0;
          const safeOldPrice = book.oldPrice ? Number(book.oldPrice) : null;

          return (
            <div
              key={book.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div
                onClick={() => handleOpenDetail(book)}
                style={{
                  position: 'relative',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  aspectRatio: '3/4',
                  marginBottom: '12px',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/180x260?text=Kitab+Üzlüyü';
                  }}
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick(book);
                  }}
                  title={isFav ? t.removeFromFavorites : t.addToFavorites}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                    transition: 'transform 0.15s ease',
                  }}
                >
                  <HeartIcon isFavorite={isFav} />
                </button>
              </div>

              <h3
                onClick={() => handleOpenDetail(book)}
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#1f2937',
                  margin: '0 0 6px 0',
                  lineHeight: '1.3',
                  height: '36px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  cursor: 'pointer',
                }}
              >
                {book.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: 'auto' }}>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#1f2937' }}>
                  {safePrice.toFixed(2)} ₼
                </span>
                {safeOldPrice && (
                  <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>
                    {safeOldPrice.toFixed(2)} ₼
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* DÜYMƏLƏR */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        {!isAllShown && (
          <button
            onClick={handleShowMore}
            style={{
              padding: '10px 28px',
              borderRadius: '24px',
              border: '1px solid #e52e2e',
              backgroundColor: '#fff',
              color: '#e52e2e',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t.showMore}
          </button>
        )}
        
        {visibleCount > INITIAL_COUNT && (
          <button
            onClick={handleShowLess}
            style={{
              padding: '10px 28px',
              borderRadius: '24px',
              border: '1px solid #6b7280',
              backgroundColor: '#fff',
              color: '#4b5563',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t.showLess}
          </button>
        )}

        {isAllShown && currentBooks.length > INITIAL_COUNT && (
          <button
            onClick={handleCloseAll}
            style={{
              padding: '10px 28px',
              borderRadius: '24px',
              border: '1px solid #1f2937',
              backgroundColor: '#1f2937',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t.close}
          </button>
        )}
      </div>

      {/* MODAL PƏNCƏRƏ */}
      {modalBook && (
        <div
          onClick={() => setModalBook(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '500', color: '#1f2937' }}>
                {t.addedToWishlistModal}
              </h3>
              <button
                onClick={() => setModalBook(null)}
                style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#6b7280', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px' }}>
              <img
                src={modalBook.image}
                alt={modalBook.title}
                style={{ width: '50px', height: '70px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e52e2e', fontSize: '15px' }}>{modalBook.title}</span>
                <span style={{ color: '#1f2937', fontSize: '15px', fontWeight: '500' }}>
                  1 x {(Number(modalBook.price) || 0).toFixed(2)} ₼
                </span>
              </div>
            </div>

            <div style={{ padding: '0 24px 24px 24px' }}>
              <button
                onClick={() => {
                  setModalBook(null);
                  if (onNavigate) onNavigate('favorites');
                }}
                style={{
                  backgroundColor: '#1f2937',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                {t.viewWishlist}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function HeartIcon({ isFavorite }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={isFavorite ? '#e52e2e' : 'none'}
      stroke={isFavorite ? '#e52e2e' : '#4b5563'}
      strokeWidth="2"
      style={{ transition: 'all 0.2s ease' }}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}