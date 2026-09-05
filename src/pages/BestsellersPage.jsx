import React, { useState } from 'react';
import { bestsellersData } from '../data/bestsellersData';
import { useCart } from '../context/CartContext';

export default function BestsellersPage({ onNavigate, onAddToCart, onSelectBook }) {
  const [activeTab, setActiveTab] = useState('Azərbaycan');
  const { addToCart } = useCart();

  const tabs = [
    { id: 'Azərbaycan', label: 'Azərbaycan' },
    { id: 'Türkcə', label: 'Türkcə' },
    { id: 'Rusca', label: 'Rusca' },
    { id: 'Uşaq ədəbiyyatı', label: 'Uşaq ədəbiyyatı' },
  ];

  const getCurrentMonthNameAz = () => {
    const aylar = [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
      "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
    ];
    return aylar[new Date().getMonth()];
  };

  const filteredBooks = (bestsellersData || []).filter(book => {
    if (activeTab === 'Uşaq ədəbiyyatı') {
      return book.category === 'Uşaq Ədəbiyyatı';
    }
    return book.language === activeTab && book.category !== 'Uşaq Ədəbiyyatı';
  });

  const handleAddToCart = (e, book) => {
    e.stopPropagation();
    if (addToCart) {
      addToCart(book);
    } else if (onAddToCart) {
      onAddToCart(book);
    }
  };

  const handleOpenDetail = (book) => {
    if (onSelectBook) {
      onSelectBook(book);
    } else if (onNavigate) {
      onNavigate('product-detail', book);
    }
  };

  return (
    <>
      <style>
        {`
          /* Mobil görünüş üçün ümumi sazlamalar */
          .book-card-container {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .desktop-view {
            display: none !important;
          }
          .mobile-view {
            display: flex !important;
            flex-direction: column;
            gap: 12px;
          }

          /* Masaüstü ekranlar üçün (640px-dən yuxarı) */
          @media (min-width: 640px) {
            .page-wrapper {
              padding: 24px 16px !important;
            }
            .page-title {
              font-size: 24px !important;
            }
            .page-desc {
              font-size: 14px !important;
            }
            .book-card-container {
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              gap: 24px;
            }
            .mobile-view {
              display: none !important;
            }
            .desktop-view {
              display: flex !important;
            }
          }
        `}
      </style>

      <div className="page-wrapper" style={{ width: '100%', backgroundColor: '#f9fafb', padding: '16px 12px', minHeight: '100vh', boxSizing: 'border-box' }}>
        
        {/* ƏSAS KONTEYNER */}
        <div style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}>
          
          {/* Breadcrumb */}
          <nav style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>
            <button 
              onClick={() => onNavigate && onNavigate('home')} 
              style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
            >
              Əsas səhifə
            </button>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#4b5563', fontWeight: '500' }}>
              Bestsellerlər ({getCurrentMonthNameAz()} 2026)
            </span>
          </nav>

          {/* Başlıq */}
          <h1 className="page-title" style={{ textAlign: 'center', fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
            {getCurrentMonthNameAz()} ayının ən çox satılan kitabları – Bestsellerlər (2026)
          </h1>

          {/* Şərh mətni */}
          <div className="page-desc" style={{ textAlign: 'center', fontSize: '13px', color: '#4b5563', lineHeight: '1.6', marginBottom: '24px', maxWidth: '768px', margin: '0 auto 24px auto' }}>
            <p style={{ marginBottom: '8px' }}>
              Hər ay minlərlə oxucu növbəti kitabını tapmaq üçün mağazalarımızı və saytımızı ziyarət edir. Biz aylıq bestseller siyahımızda oxucular tərəfindən ən çox alınan kitabları təqdim edirik.
            </p>
            <p>
              Unudulmaz hekayələrdən ilhamverici fikirlərə, klassiklərdən yeni nəşrlərə qədər – bu siyahı oxucuların qəlbinə toxunan kitablardan ibarətdir.
            </p>
          </div>

          {/* Tab Düymələri */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '500',
                    border: isActive ? '1px solid #ef3842' : '1px solid #d1d5db',
                    backgroundColor: isActive ? '#ef3842' : '#ffffff',
                    color: isActive ? '#ffffff' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 1px 3px rgba(239, 56, 66, 0.3)' : 'none'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* KARTLAR SİYAHISI */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            {filteredBooks.map((book, index) => (
              <div
                key={book.id || index}
                onClick={() => handleOpenDetail(book)}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                
                {/* ================= MOBİL LAYOUT ================= */}
                <div className="mobile-view">
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827', paddingTop: '2px', minWidth: '16px' }}>
                      {index + 1}.
                    </span>

                    <div style={{
                      width: '90px',
                      height: '125px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6px',
                      flexShrink: 0,
                      border: '1px solid #f3f4f6'
                    }}>
                      <img
                        src={book.coverImage || book.image}
                        alt={book.title}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0', lineHeight: '1.3' }}>
                        {book.title}
                      </h2>
                      
                      <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#6b7280', marginBottom: '6px' }}>
                        <span style={{ color: '#ef3842', fontWeight: '700' }}>★ {book.rating || 5}</span>
                        <span>Kod: {book.code}</span>
                      </div>

                      <div style={{ fontSize: '11px', color: '#4b5563' }}>
                        <span style={{ color: '#9ca3af' }}>Müəllif:</span> <span style={{ color: '#ef3842', fontWeight: '600' }}>{book.author}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '12px',
                    color: '#4b5563',
                    margin: 0,
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    "{book.summary}"
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #f3f4f6' }}>
                    <div>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                        {Number(book.price).toFixed(2)} ₼
                      </span>
                      {book.oldPrice && (
                        <span style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'line-through', marginLeft: '6px' }}>
                          {Number(book.oldPrice).toFixed(2)} ₼
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, book)}
                      style={{
                        backgroundColor: '#ef3842',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Səbətə at</span>
                    </button>
                  </div>
                </div>


                {/* ================= DESKTOP LAYOUT ================= */}
                <div className="desktop-view" style={{ alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
                  
                  <div style={{
                    width: '120px',
                    height: '160px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    flexShrink: 0,
                    border: '1px solid #f3f4f6'
                  }}>
                    <img
                      src={book.coverImage || book.image}
                      alt={book.title}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '700', color: '#111827', flexShrink: 0 }}>{index + 1}.</span>
                        <div style={{ minWidth: 0 }}>
                          <h2 
                            style={{ 
                              fontSize: '16px', 
                              fontWeight: '700', 
                              color: '#111827', 
                              margin: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {book.title}
                          </h2>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                            <span style={{ color: '#ef3842', fontWeight: '700' }}>★ {book.rating || 5}</span>
                            <span>(Rəylər: {book.reviewsCount || 0})</span>
                            <span>Kod: {book.code}</span>
                          </div>
                        </div>
                      </div>

                      <p style={{
                        fontSize: '12px',
                        color: '#4b5563',
                        marginTop: '8px',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        "{book.summary}"
                      </p>
                    </div>

                    <div style={{
                      marginTop: '16px',
                      paddingTop: '8px',
                      borderTop: '1px solid #f3f4f6',
                      fontSize: '12px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '4px 16px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9ca3af' }}>Cild:</span> <span style={{ fontWeight: '500' }}>{book.binding}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9ca3af' }}>Dil:</span> <span style={{ fontWeight: '500' }}>{book.language}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9ca3af' }}>Müəllif:</span> <span style={{ color: '#ef3842', fontWeight: '700', textTransform: 'uppercase' }}>{book.author}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9ca3af' }}>Nəşriyyat:</span> <span style={{ fontWeight: '500' }}>{book.publisher}</span></div>
                    </div>
                  </div>

                  <div style={{
                    width: '180px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    borderLeft: '1px solid #f3f4f6',
                    paddingLeft: '24px',
                    height: '130px',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '22px', fontWeight: '700', color: '#111827' }}>
                        {Number(book.price).toFixed(2)} ₼
                      </span>
                      {book.oldPrice && (
                        <div style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through' }}>
                          {Number(book.oldPrice).toFixed(2)} ₼
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, book)}
                      style={{
                        width: '100%',
                        backgroundColor: '#ef3842',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Səbətə əlavə et</span>
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}