import React, { useState } from 'react';
import { BookOpen, Filter, ArrowUpDown, Heart, ShoppingBag, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import { booksData as books1 } from '../data/books';
import { BOOKS_DATA as books2 } from '../data/booksData';
import { THREE_ALMA_MULTI_DATA as books3 } from '../data/3alma';
import { TEAS_PRESS_BOOKS as books4 } from '../data/teasPress';
import { BOOKS_DATA as books5 } from '../data/vbooksData';

// Bütün data mənbələrini vahid massivdə birləşdiririk
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

export default function Catalog({ onNavigate, onAddToCart, onToggleFavorite, favoriteIds = [], cartItemIds = [] }) {
  const { currentLang, t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Lokal state-ləri prop-lardan gələn məlumatlarla inisializasiya edirik
  const [favorites, setFavorites] = useState(favoriteIds);
  const [cartItems, setCartItems] = useState(cartItemIds);

  // Ədəbiyyat kateqoriyalarının siyahısı
  const categoriesList = [
    { key: 'all', label: t.catalog || 'Bütün ədəbiyyatlar' },
    { key: 'az', label: 'Azərbaycan ədəbiyyatı' },
    { key: 'tr', label: 'Türk ədəbiyyatı' },
    { key: 'child', label: 'Uşaq ədəbiyyatı' },
    { key: 'ru', label: 'Rus ədəbiyyatı' },
    { key: 'world', label: 'Dünya ədəbiyyatı' },
    { key: 'classic', label: t.classics || 'Klassiklər' },
    { key: 'fiction', label: 'Bədii ədəbiyyat' }
  ];

  // Favorilərə əlavə etmə / çıxarma
  const handleFavoriteClick = (e, book, bookId) => {
    e.stopPropagation();
    
    // 1. Lokal state-də düymə görünüşünü dərhal dəyişirik
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );

    // 2. Valideyn komponentə (App/WishlistContext) kitab obyektini ötürürük
    if (onToggleFavorite) {
      onToggleFavorite(book);
    }
  };

  // Səbətə əlavə etmə
  const handleAddToCartClick = (e, book, bookId) => {
    e.stopPropagation();

    // 1. Lokal state-də səbət statusunu dərhal yeniləyirik
    if (!cartItems.includes(bookId)) {
      setCartItems((prev) => [...prev, bookId]);
    }

    // 2. Valideyn komponentə (App/CartContext) kitab obyektini ötürürük
    if (onAddToCart) {
      onAddToCart(book);
    }
  };

  // Ədəbiyyata görə filtrləmə
  const filteredBooks = ALL_BOOKS.filter(book => {
    if (selectedCategory === 'all') return true;

    const bookLang = (book.lang || book.language || '').toLowerCase();
    const bookCat = (typeof book.category === 'object' ? book.category[currentLang] : (book.category || book.langCategory || '')).toLowerCase();
    const bookTitle = (typeof book.title === 'object' ? book.title[currentLang] : (book.title || book.name || '')).toLowerCase();
    const bookPublisher = (book.publisher || book.publisherName || '').toLowerCase();

    if (selectedCategory === 'tr') {
      return (
        bookLang === 'tr' ||
        bookLang.includes('türk') ||
        bookLang.includes('turkish') ||
        bookCat.includes('türk') ||
        bookCat.includes('tr') ||
        bookPublisher.includes('türk') ||
        bookPublisher.includes('yayın') ||
        bookTitle.includes('türkçe') ||
        bookTitle.includes('türk')
      );
    }

    if (selectedCategory === 'child') {
      return (
        bookCat.includes('uşaq') ||
        bookCat.includes('child') ||
        bookCat.includes('skazka') ||
        bookTitle.includes('uşaq') ||
        bookTitle.includes('сказка') ||
        bookTitle.includes('çocuk')
      );
    }

    if (selectedCategory === 'az') {
      return (
        bookCat.includes('azərbaycan') ||
        bookCat.includes('az') ||
        bookLang.includes('az') ||
        bookLang.includes('azerbaijani')
      );
    }

    if (selectedCategory === 'ru') {
      return (
        bookCat.includes('rus') ||
        bookCat.includes('ru') ||
        bookLang.includes('ru') ||
        /[а-яА-ЯёЁ]/.test(bookTitle)
      );
    }

    if (selectedCategory === 'world') {
      return (
        bookCat.includes('dünya') ||
        bookCat.includes('xarici') ||
        bookCat.includes('world')
      );
    }

    if (selectedCategory === 'classic') {
      return (
        bookCat.includes('klassik') ||
        bookCat.includes('classic') ||
        bookTitle.includes('klassik')
      );
    }

    if (selectedCategory === 'fiction') {
      return (
        bookCat.includes('bədii') ||
        bookCat.includes('roman') ||
        bookCat.includes('fiction')
      );
    }

    return true;
  });

  // Sıralama
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const priceA = parseFloat(a.price) || 0;
    const priceB = parseFloat(b.price) || 0;

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'title') {
      const titleA = typeof a.title === 'object' ? a.title[currentLang] : (a.title || a.name || '');
      const titleB = typeof b.title === 'object' ? b.title[currentLang] : (b.title || b.name || '');
      return titleA.localeCompare(titleB);
    }
    return 0;
  });

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '16px 32px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6c757d', marginBottom: '12px' }}>
          <span onClick={() => onNavigate && onNavigate('home')} style={{ cursor: 'pointer' }}>
            {currentLang === 'AZ' ? 'Əsas səhifə' : currentLang === 'RU' ? 'Главная' : 'Home'}
          </span>
          <span>&gt;</span>
          <span style={{ color: '#0d1222', fontWeight: 600 }}>{t.catalog}</span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0d1222', margin: 0 }}>{t.catalog}</h1>
          <span style={{ fontSize: '13px', color: '#6c757d' }}>
            Toplam <strong>{sortedBooks.length}</strong> kitab tapıldı
          </span>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          
          {/* Kateqoriya Filtri */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="#e51937" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0d1222' }}>Ədəbiyyat:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                backgroundColor: '#fff',
                border: '1.5px solid #e51937',
                borderRadius: '20px',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#0d1222',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {categoriesList.map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {cat.label} {cat.key === 'all' ? `(${ALL_BOOKS.length})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Sıralama */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={16} color="#6c757d" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0d1222' }}>Sırala:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ced4da',
                borderRadius: '20px',
                padding: '6px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#0d1222',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="default">Varsayılan</option>
              <option value="price-low">Qiymət: Ucuzdan bahaya</option>
              <option value="price-high">Qiymət: Bahadan ucuza</option>
              <option value="title">Adına görə (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Kitablar Grid-i */}
        {sortedBooks.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '20px'
          }}>
            {sortedBooks.map((book, index) => {
              const bookId = book.id || `book-${index}`;
              const title = typeof book.title === 'object' ? book.title[currentLang] : (book.title || book.name || 'Adsız Kitab');
              const author = typeof book.author === 'object' ? book.author[currentLang] : (book.author || 'Müəllif qeyd edilməyib');
              const image = book.coverImage || book.image || book.img;
              
              const isFav = favorites.includes(bookId);
              const isInCart = cartItems.includes(bookId);

              return (
                <div
                  key={bookId}
                  onClick={() => onNavigate && onNavigate('product-detail', book)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  }}
                >
                  <div>
                    {/* Kitab Şəkli Konteyneri */}
                    <div style={{
                      width: '100%',
                      height: '280px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#f1f3f5',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <BookOpen size={36} color="#adb5bd" />
                      )}

                      {/* Favorilər (Ürək) Düyməsi */}
                      <button
                        onClick={(e) => handleFavoriteClick(e, book, bookId)}
                        title={isFav ? t.addToWishlist : t.addToWishlist}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#fff',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          transition: 'transform 0.2s, background-color 0.2s'
                        }}
                      >
                        <Heart
                          size={16}
                          color={isFav ? '#e51937' : '#495057'}
                          fill={isFav ? '#e51937' : 'none'}
                        />
                      </button>
                    </div>

                    {/* Ad və Müəllif */}
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#0d1222',
                      margin: '0 0 4px 0',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {title}
                    </h3>

                    <p style={{
                      fontSize: '12px',
                      color: '#868e96',
                      margin: '0 0 10px 0',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {author}
                    </p>
                  </div>

                  {/* Qiymət və Səbətə At Düyməsi */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '6px'
                  }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#e51937' }}>
                      {book.price ? `${book.price} ₼` : 'Təyin edilməyib'}
                    </span>

                    {/* Səbətə At Düyməsi */}
                    <button
                      onClick={(e) => handleAddToCartClick(e, book, bookId)}
                      title={isInCart ? t.addToCart : t.addToCart}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: isInCart ? '#2b8a3e' : '#e51937',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s, transform 0.1s'
                      }}
                    >
                      {isInCart ? (
                        <>
                          <Check size={14} color="#fff" />
                          <span>Əlavə olundu</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} color="#fff" />
                          <span>{t.addToCart}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#868e96' }}>
            <p style={{ fontSize: '15px' }}>{t.notFound}</p>
          </div>
        )}

      </div>
    </div>
  );
}