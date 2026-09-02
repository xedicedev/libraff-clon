import React, { useState, useEffect } from 'react';
import { THREE_ALMA_MULTI_DATA } from '../data/3alma';

export default function ThreeAlmaSection({ onNavigate }) {
  const { leftTop, leftBottom, center, rightTop, rightBottom } = THREE_ALMA_MULTI_DATA || {};
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: isMobile ? '24px 16px' : '40px 24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <h2
        style={{
          fontSize: isMobile ? '22px' : '28px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: isMobile ? '16px' : '24px',
        }}
      >
        <span style={{ color: '#e52e2e' }}>3alma</span> ən yenilər
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr 1fr',
          gap: '20px',
          alignItems: 'stretch',
        }}
      >
        {/* SOL SÜTUN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SmallCardSlider items={leftTop} onNavigate={onNavigate} isMobile={isMobile} />
          <SmallCardSlider items={leftBottom} onNavigate={onNavigate} isMobile={isMobile} />
        </div>

        {/* ORTA SÜTUN */}
        <CenterCardSlider items={center} onNavigate={onNavigate} isMobile={isMobile} />

        {/* SAĞ SÜTUN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SmallCardSlider items={rightTop} onNavigate={onNavigate} isMobile={isMobile} />
          <SmallCardSlider items={rightBottom} onNavigate={onNavigate} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}

// Kiçik Kart Slayderi
function SmallCardSlider({ items = [], onNavigate, isMobile }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(timer);
  }, [index, isHovered, items.length]);

  const currentBook = items[index] || {};

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: currentBook.bgColor || '#f9fafb',
        borderRadius: '16px',
        padding: isMobile ? '16px' : '20px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flex: 1,
        height: '100%',
        boxSizing: 'border-box',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Sol Ox */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
          }}
          style={{
            position: 'absolute',
            left: '6px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#374151',
            zIndex: 10,
            opacity: isMobile || isHovered ? 1 : 0,
            pointerEvents: isMobile || isHovered ? 'auto' : 'none',
            transition: 'opacity 0.2s ease',
          }}
        >
          &#10094;
        </button>
      )}

      {/* Kontent */}
      <div
        onClick={() => onNavigate && onNavigate('product-detail', currentBook)}
        style={{ flex: 1, overflow: 'hidden', cursor: 'pointer' }}
      >
        <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
          {currentBook.author}
        </span>
        <h3 style={{ fontSize: isMobile ? '15px' : '16px', fontWeight: '700', color: '#1f2937', margin: '0 0 6px 0' }}>
          {currentBook.title}
        </h3>
        <p
          style={{
            fontSize: '12px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {currentBook.description}
        </p>
      </div>

      <div
        onClick={() => onNavigate && onNavigate('product-detail', currentBook)}
        style={{ width: isMobile ? '75px' : '90px', height: isMobile ? '105px' : '120px', flexShrink: 0, cursor: 'pointer' }}
      >
        <img
          src={currentBook.image}
          alt={currentBook.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '6px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          }}
        />
      </div>

      {/* Sağ Ox */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
          }}
          style={{
            position: 'absolute',
            right: '6px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#374151',
            zIndex: 10,
            opacity: isMobile || isHovered ? 1 : 0,
            pointerEvents: isMobile || isHovered ? 'auto' : 'none',
            transition: 'opacity 0.2s ease',
          }}
        >
          &#10095;
        </button>
      )}
    </div>
  );
}

// Orta Böyük Kart Slayderi
function CenterCardSlider({ items = [], onNavigate, isMobile }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(timer);
  }, [index, isHovered, items.length]);

  const currentBook = items[index] || {};

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: currentBook.bgColor || '#fef3c7',
        borderRadius: '16px',
        padding: isMobile ? '20px 16px' : '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: isMobile ? '300px' : '380px',
        boxSizing: 'border-box',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Sol Ox */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
          }}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#374151',
            zIndex: 10,
            opacity: isMobile || isHovered ? 1 : 0,
            pointerEvents: isMobile || isHovered ? 'auto' : 'none',
            transition: 'opacity 0.2s ease',
          }}
        >
          &#10094;
        </button>
      )}

      {/* Şəkil */}
      <div
        onClick={() => onNavigate && onNavigate('product-detail', currentBook)}
        style={{
          cursor: 'pointer',
          height: isMobile ? '170px' : '220px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <img
          src={currentBook.image}
          alt={currentBook.title}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            borderRadius: '8px',
            boxShadow: '0 8px 12px -2px rgba(0,0,0,0.12)',
          }}
        />
      </div>

      {/* Mətn */}
      <div
        onClick={() => onNavigate && onNavigate('product-detail', currentBook)}
        style={{
          cursor: 'pointer',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: 'hidden',
        }}
      >
        <span style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>
          {currentBook.author}
        </span>
        <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', color: '#1f2937', margin: '0 0 6px 0' }}>
          {currentBook.title}
        </h3>
        <p
          style={{
            fontSize: '12px',
            color: '#4b5563',
            margin: 0,
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {currentBook.description}
        </p>
      </div>

      {/* Sağ Ox */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
          }}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#374151',
            zIndex: 10,
            opacity: isMobile || isHovered ? 1 : 0,
            pointerEvents: isMobile || isHovered ? 'auto' : 'none',
            transition: 'opacity 0.2s ease',
          }}
        >
          &#10095;
        </button>
      )}
    </div>
  );
}