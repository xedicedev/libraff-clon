import React, { useState, useMemo } from 'react';
import { User, BookOpen, ChevronRight, ArrowLeft } from 'lucide-react';

// Bütün data fayllarından kitabları idxal edirik
import { booksData as books1 } from '../data/books';
import { BOOKS_DATA as books2 } from '../data/booksData';
import { THREE_ALMA_MULTI_DATA as books3 } from '../data/3alma';
import { TEAS_PRESS_BOOKS as books4 } from '../data/teasPress';
import { BOOKS_DATA as books5 } from '../data/vbooksData';

// Bütün dataları tək massivdə birləşdiririk
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

export default function AuthorsPage({ onNavigate }) {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Unikal müəlliflərin siyahısını və onların kitab sayını hesablayırıq
  const authorsList = useMemo(() => {
    const map = new Map();

    ALL_BOOKS.forEach((book) => {
      const authorName = book?.author?.trim();
      if (authorName) {
        if (map.has(authorName)) {
          map.set(authorName, map.get(authorName) + 1);
        } else {
          map.set(authorName, 1);
        }
      }
    });

    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Axtarışa görə müəllifləri filtrləyirik
  const filteredAuthors = authorsList.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Seçilmiş müəllifin kitabları
  const authorBooks = useMemo(() => {
    if (!selectedAuthor) return [];
    return ALL_BOOKS.filter(
      (book) => book?.author?.trim().toLowerCase() === selectedAuthor.toLowerCase()
    );
  }, [selectedAuthor]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' }}>
      
      {/* SEÇİLMİŞ MÜƏLLİFƏ AİD KİTABLARIN GÖSTƏRİLMƏSİ */}
      {selectedAuthor ? (
        <div>
          <button
            onClick={() => setSelectedAuthor(null)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '20px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
            }}
          >
            <ArrowLeft size={16} /> Bütün müəlliflərə qayıt
          </button>

          <div style={{ marginBottom: '24px', borderBottom: '2px solid #fee2e2', paddingBottom: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
              {selectedAuthor}
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
              Axtarış üzrə tapılan müəllif kitabları: <strong>{authorBooks.length} kitab</strong>
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {authorBooks.map((book, idx) => {
              const title = book.title || book.name || 'Adsız Kitab';
              const image = book.coverImage || book.image || book.img;

              return (
                <div
                  key={`${book.id || 'book'}-${idx}`}
                  onClick={() => onNavigate && onNavigate('product-detail', book)}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      height: '220px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      backgroundColor: '#f9fafb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <BookOpen size={40} color="#d1d5db" />
                    )}
                  </div>
                  <h3
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1f2937',
                      margin: '0 0 6px 0',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {title}
                  </h3>
                  {book.price && (
                    <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#dc2626' }}>
                        {book.price} ₼
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* UNİKAL MÜƏLLİFLƏRİN SİYAHISI */
        <div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                Müəlliflər
              </h1>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0 0 0' }}>
                Sevimli müəllifinizin bütün əsərləri ilə tanış olun
              </p>
            </div>

            {/* Müəllif Axtarışı */}
            <input
              type="text"
              placeholder="Müəllif axtar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: '9999px',
                border: '1px solid #d1d5db',
                outline: 'none',
                width: '100%',
                maxWidth: '280px',
                fontSize: '14px',
              }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {filteredAuthors.map((author) => (
              <div
                key={author.name}
                onClick={() => setSelectedAuthor(author.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #f3f4f6',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.borderColor = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                  e.currentTarget.style.borderColor = '#f3f4f6';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#fee2e2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#dc2626',
                    }}
                  >
                    <User size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                      {author.name}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {author.count} kitab
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} color="#9ca3af" />
              </div>
            ))}
          </div>

          {filteredAuthors.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
              Axtarışa uyğun müəllif tapılmadı.
            </div>
          )}
        </div>
      )}
    </div>
  );
}