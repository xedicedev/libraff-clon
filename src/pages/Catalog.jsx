import React, { useState } from 'react';
import { BookOpen, Filter, ArrowUpDown, Heart, ShoppingBag } from 'lucide-react';

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

export default function Catalog({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Ədəbiyyat kateqoriyalarının siyahısı
  const categoriesList = [
    { key: 'all', label: 'Bütün ədəbiyyatlar' },
    { key: 'az', label: 'Azərbaycan ədəbiyyatı' },
    { key: 'tr', label: 'Türk ədəbiyyatı' },
    { key: 'child', label: 'Uşaq ədəbiyyatı' },
    { key: 'ru', label: 'Rus ədəbiyyatı' },
    { key: 'world', label: 'Dünya ədəbiyyatı' },
    { key: 'classic', label: 'Klassiklər' },
    { key: 'fiction', label: 'Bədii ədəbiyyat' }
  ];

  // Ədəbiyyata və xüsusilə Türk/Uşaq ədəbiyyatına görə dəqiq filtrləmə
  const filteredBooks = ALL_BOOKS.filter(book => {
    if (selectedCategory === 'all') return true;

    const bookLang = (book.lang || book.language || '').toLowerCase();
    const bookCat = (book.category || book.langCategory || '').toLowerCase();
    const bookTitle = (book.title || book.name || '').toLowerCase();
    const bookPublisher = (book.publisher || book.publisherName || '').toLowerCase();

    // Türk ədəbiyyatı: Türk dilində olan, türk nəşriyyatlı və ya kateqoriyasında türk qeyd olunanlar
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

    // Uşaq ədəbiyyatı
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

    // Azərbaycan ədəbiyyatı
    if (selectedCategory === 'az') {
      return (
        bookCat.includes('azərbaycan') ||
        bookCat.includes('az') ||
        bookLang.includes('az') ||
        bookLang.includes('azerbaijani')
      );
    }

    // Rus ədəbiyyatı
    if (selectedCategory === 'ru') {
      return (
        bookCat.includes('rus') ||
        bookCat.includes('ru') ||
        bookLang.includes('ru') ||
        /[а-яА-ЯёЁ]/.test(bookTitle)
      );
    }

    // Dünya ədəbiyyatı
    if (selectedCategory === 'world') {
      return (
        bookCat.includes('dünya') ||
        bookCat.includes('xarici') ||
        bookCat.includes('world')
      );
    }

    // Klassiklər
    if (selectedCategory === 'classic') {
      return (
        bookCat.includes('klassik') ||
        bookCat.includes('classic') ||
        bookTitle.includes('klassik')
      );
    }

    // Bədii ədəbiyyat
    if (selectedCategory === 'fiction') {
      return (
        bookCat.includes('bədii') ||
        bookCat.includes('roman') ||
        bookCat.includes('fiction')
      );
    }

    return true;
  });

  // Sıralama məntiqi
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const priceA = parseFloat(a.price) || 0;
    const priceB = parseFloat(b.price) || 0;

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'title') {
      const titleA = a.title || a.name || '';
      const titleB = b.title || b.name || '';
      return titleA.localeCompare(titleB);
    }
    return 0;
  });

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '16px 32px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6c757d', marginBottom: '12px' }}>
          <span onClick={() => onNavigate && onNavigate('home')} style={{ cursor: 'pointer' }}>Əsas səhifə</span>
          <span>&gt;</span>
          <span style={{ color: '#0d1222', fontWeight: 600 }}>Kataloq</span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0d1222', margin: 0 }}>Kitab Kataloqu</h1>
          <span style={{ fontSize: '13px', color: '#6c757d' }}>
            Toplam <strong>{sortedBooks.length}</strong> kitab tapıldı
          </span>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          
          {/* Kateqoriya (Ədəbiyyat) Filtri */}
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
              const title = book.title || book.name || 'Adsız Kitab';
              const image = book.coverImage || book.image || book.img;

              return (
                <div
                  key={`${book.id || 'cat-book'}-${index}`}
                  onClick={() => onNavigate && onNavigate('product-detail', book)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
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
                      justify: 'center'
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

                      {/* Ürək ikonu */}
                      <button
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: '#fff',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
                        }}
                      >
                        <Heart size={15} color="#495057" />
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
                      {book.author || 'Müəllif qeyd edilməyib'}
                    </p>
                  </div>

                  {/* Qiymət və Səbət Düyməsi */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    paddingTop: '6px'
                  }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#e51937' }}>
                      {book.price ? `${book.price} ₼` : 'Təyin edilməyib'}
                    </span>

                    <button style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      border: '1px solid #dee2e6',
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      cursor: 'pointer'
                    }}>
                      <ShoppingBag size={14} color="#495057" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#868e96' }}>
            <p style={{ fontSize: '15px' }}>Bu kateqoriyada kitab tapılmadı.</p>
          </div>
        )}

      </div>
    </div>
  );
}