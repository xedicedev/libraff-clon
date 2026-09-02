import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Heart, ArrowLeft } from 'lucide-react';

export default function WishlistPage({ onNavigate }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Geri düyməsi üçün funksiya (Eger onNavigate varsa işlədir, yoxdursa brauzerin tarixçəsi ilə geri qayıdır)
  const handleGoBack = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.history.back();
    }
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Heart size={36} />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Favorilər siyahınız boşdur
        </h2>
        <p style={{ color: '#6b7280', maxWidth: '380px', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
          Bəyəndiyiniz kitabları ürək ikonuna klikləyərək bura əlavə edə bilərsiniz.
        </p>
        <button
          onClick={handleGoBack}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '500', fontSize: '14px', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} />
          <span>Geri qayıt</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px', width: '100%', boxSizing: 'border-box' }}>
      {/* Geri Düyməsi və Başlıq Bölməsi */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* GERİ DÜYMƏSİ */}
          <button
            onClick={handleGoBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={18} />
            <span>Geri</span>
          </button>

          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
            Favorilərim
          </h1>
        </div>

        <span style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563', backgroundColor: '#f3f4f6', padding: '6px 12px', borderRadius: '9999px' }}>
          {wishlist.length} kitab
        </span>
      </div>
      
      {/* Kitab Grid-i */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
        {wishlist.map((book) => {
          const title = book.title || book.name;
          const image = book.coverImage || book.image || book.img;

          return (
            <div 
              key={book.id || book._id} 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div>
                {/* Kitab Üz Qabığı */}
                <div style={{ position: 'relative', width: '100%', height: '220px', backgroundColor: '#f9fafb', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <img
                    src={image || '/placeholder.png'}
                    alt={title}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                  
                  {/* Silmə (Ürək) Düyməsi */}
                  <button
                    onClick={() => toggleWishlist(book)}
                    style={{ position: 'absolute', top: '8px', right: '8px', padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    title="Favorilərdən çıxar"
                  >
                    <Heart size={16} fill="#dc2626" color="#dc2626" />
                  </button>
                </div>

                {/* Mətnlər */}
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '36px' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {book.author || 'Müəllif qeyd olunmayıb'}
                </p>
              </div>

              {/* Qiymət və Səbət Düyməsi */}
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>
                  {book.price} <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#6b7280' }}>AZN</span>
                </div>

                <button
                  onClick={() => addToCart && addToCart(book)}
                  style={{ backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}
                >
                  <ShoppingBag size={14} />
                  <span>Səbətə at</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}