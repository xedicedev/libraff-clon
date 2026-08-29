import React from 'react';

export default function ClassicsBanner() {
  return (
    <div style={{ 
      width: '100%', 
      backgroundColor: '#0a2e12', // Şəklin kənarındakı tünd yaşıl fon rəngi
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0
    }}>
      <a 
        href="/category/dunya-klassikleri" 
        style={{ 
          display: 'block', 
          width: '100%', 
          maxWidth: '100%', // Geniş ekranlarda səliqəli mərkəzlənməsi üçün
          textDecoration: 'none',
          cursor: 'pointer'
        }}
      >
        <img 
          src="/classics.png" 
          alt="Dünya Klassikləri Seriyası" 
          style={{ 
            width: '100%', 
            height: 'auto', 
            display: 'block', 
            objectFit: 'cover' 
          }} 
        />
      </a>
    </div>
  );
}