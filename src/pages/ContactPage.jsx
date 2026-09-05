import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Əlaqə</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '24px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Məlumat</h3>
          <p style={textStyle}><strong>Ünvan:</strong> Bakı, Badamdar qəs., Mikayıl Müşfiq küç. 1c (Badamdar Estates)</p>

          <p style={textStyle}>
            <strong>Telefon / WhatsApp:</strong>{' '}
            <a href="https://wa.me/994502904496" style={{ color: '#dc2626', textDecoration: 'none' }}>
              +994-50-290-44-96
            </a>
          </p>

          <p style={textStyle}>
            <strong>E-poçt:</strong>{' '}
            <a href="mailto:online@libraff.az" style={{ color: '#dc2626', textDecoration: 'none' }}>
              online@libraff.az
            </a>
          </p>

          <p style={textStyle}><strong>İş saatları:</strong> B.e.-B. 09:00 - 18:00</p>
        </div>

        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Bizə yazın</h3>
          {submitted ? (
            <div style={{ padding: '16px', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '8px' }}>
              Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Adınız və Soyadınız" required style={inputStyle} />
              <input type="email" placeholder="E-poçt ünvanınız" required style={inputStyle} />
              <textarea placeholder="Mesajınız" rows="4" required style={inputStyle}></textarea>
              <button type="submit" style={buttonStyle}>Göndər</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}