import React, { useState } from 'react';
import { TEAS_PRESS_BOOKS } from '../data/teasPress';

export default function TeasPressSection({ onNavigate }) {
  const [books, setBooks] = useState(TEAS_PRESS_BOOKS);
  const [isExpanded, setIsExpanded] = useState(false); // Tam açılıb-açılmadığını izləyir

  const toggleFavorite = (id) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
      )
    );
  };

  // Açılmış halda bütün kitablar, əks halda ilk 6-sı görünür
  const visibleBooks = isExpanded ? books : books.slice(0, 6);

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '40px 32px',
        boxSizing: 'border-box',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* BAŞLIQ */}
      <h2
        style={{
          fontSize: '28px',
          fontWeight: '600',
          color: '#212529',
          marginBottom: '28px',
        }}
      >
        TEAS Press
      </h2>

      {/* KİTABLAR ŞƏBƏKƏSİ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        {visibleBooks.map((book) => (
          <div
            key={book.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            {/* ŞƏKİL KONTEYNERİ */}
            <div
              onClick={() => onNavigate && onNavigate('details', book)}
              style={{
                position: 'relative',
                backgroundColor: '#f8f9fa',
                borderRadius: '16px',
                padding: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '280px',
                boxSizing: 'border-box',
                marginBottom: '12px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(book.id);
                }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: book.isFavorite ? '#e52e2e' : '#6c757d',
                  zIndex: 2,
                }}
              >
                {book.isFavorite ? '♥' : '♡'}
              </button>

              <img
                src={book.image}
                alt={book.title}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
            </div>

            {/* MƏTLƏB VƏ QİYMƏT */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3
                  onClick={() => onNavigate && onNavigate('details', book)}
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#212529',
                    margin: '0 0 6px 0',
                    lineHeight: '1.4',
                    cursor: 'pointer',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: '40px',
                  }}
                >
                  {book.title}
                </h3>

                {book.rating && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      color: '#6c757d',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ color: '#e52e2e' }}>★</span>
                    <span style={{ fontWeight: '600', color: '#212529' }}>
                      {book.rating}
                    </span>
                    <span>(Rəylər: {book.reviewsCount})</span>
                  </div>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: 'auto',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#212529',
                  }}
                >
                  {book.currentPrice.toFixed(2)} ₼
                </span>
                {book.originalPrice && (
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#adb5bd',
                      textDecoration: 'line-through',
                    }}
                  >
                    {book.originalPrice.toFixed(2)} ₼
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DAHA ÇOX GÖSTƏR / BAĞLA DÜYMƏSİ */}
      {books.length > 6 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '36px',
          }}
        >
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e52e2e',
              color: '#e52e2e',
              borderRadius: '24px',
              padding: '10px 32px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e52e2e';
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#e52e2e';
            }}
          >
            {isExpanded ? 'Bağla' : 'Daha çox göstər'}
          </button>
        </div>
      )}
    </section>
  );
}