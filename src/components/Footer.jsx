import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        {/* 1. Hesabım */}
        <div>
          <h3 style={headingStyle}>Hesabım</h3>
          <ul style={listStyle}>
            <li>
              <a href="#" style={linkStyle}>
                Daxil ol
              </a>
            </li>
            <li>
              <a href="#" style={linkStyle}>
                Qeydiyyatdan keç
              </a>
            </li>
          </ul>
        </div>

        {/* 2. Şirkət */}
        <div>
          <h3 style={headingStyle}>Şirkət</h3>
          <ul style={listStyle}>
            <li>
              <a href="#" style={linkStyle}>
                Haqqımızda
              </a>
            </li>
            <li>
              <a href="#" style={linkStyle}>
                Əlaqə
              </a>
            </li>
            <li>
              <a href="#" style={linkStyle}>
                Vakansiyalar
              </a>
            </li>
            <li>
              <a href="#" style={linkStyle}>
                Sayt Xəritəsi
              </a>
            </li>
          </ul>
        </div>

        {/* 3. Müştəri Xidməti */}
        <div>
          <h3 style={headingStyle}>Müştəri Xidməti</h3>
          <ul style={listStyle}>
            <li>
              <a href="#" style={linkStyle}>
                Dəyişdirilmə və qaytarılma
              </a>
            </li>
            <li>
              <a href="#" style={linkStyle}>
                Ödəniş və çatdırılma
              </a>
            </li>
            <li>
              <a href="#" style={linkStyle}>
                Sifarişiniz haqqında
              </a>
            </li>
            <li>
              <a href="#" style={linkStyle}>
                Seçilmişlər
              </a>
            </li>
          </ul>
        </div>

        {/* 4. Əlaqə */}
        <div>
          <h3 style={headingStyle}>Əlaqə</h3>
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
              Bakı, Badamdar qəs., Mikayıl Müşfiq küç. 1c (Badamdar Estates)
            </p>

            {/* "Open WhatsApp?" pəncərəsini çıxaran keçid */}
            <a
              href="whatsapp://send?phone=994502904496"
              style={linkStyle}
            >
              +994-50-290-44-96
            </a>

            <p style={{ margin: 0 }}>B.e.-B. 9.00 - 18.00</p>

            {/* Gmail Yönləndirmə Linki */}
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
            width: isMobile ? '100%' : 'auto',
            position: isMobile ? 'static' : 'absolute',
            left: '50%',
            transform: isMobile ? 'none' : 'translateX(-50%)',
          }}
        >
          * Çatdırılma şərtləri tətbiq olunur.{' '}
          <a
            href="#"
            style={{ color: '#374151', textDecoration: 'underline' }}
          >
            Ətraflı
          </a>
        </div>
      </div>
    </footer>
  );
}

// Stil Obyektləri
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
};