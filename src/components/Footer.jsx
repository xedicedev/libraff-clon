import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Performans üçün stil obyektlərini komponent xaricində saxlayırıq
const headingStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '16px',
  color: '#111827',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const linkStyle = {
  color: '#374151',
  textDecoration: 'none',
  fontSize: '14px',
  transition: 'color 0.2s',
  cursor: 'pointer',
};

export default function Footer({ onNavigate }) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keçidləri idarə edən funksiya
  const handleLinkClick = (e, page) => {
    e.preventDefault();
    if (typeof onNavigate === 'function') {
      onNavigate(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#f8f9fa',
        color: '#212529',
        padding: isMobile ? '32px 16px 20px' : '48px 64px 24px',
        fontSize: '14px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        borderTop: '1px solid #e9ecef',
      }}
    >
      {/* 4 Sütunlu Əsas Şəbəkə */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '28px' : '32px',
          marginBottom: '40px',
        }}
      >
        {/* 1. Hesabım / LIBRAFF */}
        <div>
          <h3 style={headingStyle}>LIBRAFF</h3>
          <ul style={listStyle}>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                style={linkStyle}
              >
                {t.stores || "Mağazalar"}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                style={linkStyle}
              >
                {t.contact}
              </a>
            </li>
          </ul>
        </div>

        {/* 2. Şirkət */}
        <div>
          <h3 style={headingStyle}>{t.company || "Şirkət"}</h3>
          <ul style={listStyle}>
            <li>
              <a
                href="#about"
                onClick={(e) => handleLinkClick(e, 'about')}
                style={linkStyle}
              >
                {t.aboutUs || "Haqqımızda"}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                style={linkStyle}
              >
                {t.contact}
              </a>
            </li>
            <li>
              <a
                href="#vacancies"
                onClick={(e) => handleLinkClick(e, 'vacancies')}
                style={linkStyle}
              >
                {t.vacancies || "Vakansiyalar"}
              </a>
            </li>
            <li>
              <a
                href="#catalog"
                onClick={(e) => handleLinkClick(e, 'catalog')}
                style={linkStyle}
              >
                {t.siteMap || "Sayt Xəritəsi"}
              </a>
            </li>
          </ul>
        </div>

        {/* 3. Müştəri Xidməti */}
        <div>
          <h3 style={headingStyle}>{t.customerService || "Müştəri Xidməti"}</h3>
          <ul style={listStyle}>
            <li>
              <a
                href="#returns"
                onClick={(e) => handleLinkClick(e, 'returns')}
                style={linkStyle}
              >
                {t.returns || "Dəyişdirilmə və qaytarılma"}
              </a>
            </li>
            <li>
              <a
                href="#payment-delivery"
                onClick={(e) => handleLinkClick(e, 'payment-delivery')}
                style={linkStyle}
              >
                {t.paymentAndDelivery}
              </a>
            </li>
            <li>
              <a
                href="#orders"
                onClick={(e) => handleLinkClick(e, 'orders')}
                style={linkStyle}
              >
                {t.orderInfo || "Sifarişiniz haqqında"}
              </a>
            </li>
            <li>
              <a
                href="#favorites"
                onClick={(e) => handleLinkClick(e, 'favorites')}
                style={linkStyle}
              >
                {t.favorites || "Seçilmişlər"}
              </a>
            </li>
          </ul>
        </div>

        {/* 4. Əlaqə */}
        <div>
          <h3 style={headingStyle}>{t.contact}</h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              color: '#374151',
              lineHeight: '1.5',
            }}
          >
            <p style={{ margin: 0 }}>
              {t.addressText || "Bakı, Badamdar qəs., Mikayıl Müşfiq küç. 1c (Badamdar Estates)"}
            </p>

            <a
              href="https://wa.me/994502904496"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              +994-50-290-44-96
            </a>

            <p style={{ margin: 0 }}>{t.workHours}</p>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=online@libraff.az"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...linkStyle, textDecoration: 'underline' }}
            >
              online@libraff.az
            </a>
          </div>
        </div>
      </div>

      {/* Müəllif Hüquqları və Çatdırılma Qeydi */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: '12px',
          paddingTop: '20px',
          fontSize: '13px',
          color: '#4b5563',
          position: 'relative',
        }}
      >
        <div>© 2017 - 2026 Libraff.</div>

        <div
          style={{
            textAlign: isMobile ? 'left' : 'center',
            width: isMobile ? 'auto' : 'auto',
            position: isMobile ? 'static' : 'absolute',
            left: '50%',
            transform: isMobile ? 'none' : 'translateX(-50%)',
          }}
        >
          {t.deliveryTerms || "* Çatdırılma şərtləri tətbiq olunur."}{' '}
          <a
            href="#payment-delivery"
            onClick={(e) => handleLinkClick(e, 'payment-delivery')}
            style={{ color: '#374151', textDecoration: 'underline' }}
          >
            {t.moreDetails || "Ətraflı"}
          </a>
        </div>
      </div>
    </footer>
  );
}