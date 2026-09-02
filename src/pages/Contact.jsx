import React from 'react';

export default function Contact({ onNavigate }) {
  const branches = [
    {
      id: 1,
      name: 'Gənclik Mall Filialı',
      address: 'Bakı şəhəri, Nərimanov rayonu, Fətəli Xan Xoyski küçəsi 38, "Gənclik Mall" Ticarət Mərkəzi.',
      hours: 'Hər gün 10:00 - 22:00',
      email: 'ganjlikmall@libraff.az',
      phone: '+994 50 290 44 72',
    },
    {
      id: 2,
      name: 'İstiqlaliyyət Filialı',
      address: 'Bakı şəhəri, Səbail rayonu, İstiqlaliyyət küçəsi 71 b (Monolit).',
      hours: 'Hər gün 10:00 - 22:00',
      email: 'istiqlaliyyet@libraff.az',
      phone: '+994 50 290 44 62',
    },
    {
      id: 3,
      name: 'Fəvvarələr Filialı',
      address: 'Bakı şəhəri, Səbail rayonu, Rəsul Rza küçəsi 26A',
      hours: 'Hər gün 10:00 - 22:00',
      email: 'fountains@libraff.az',
      phone: '+994 50 290 80 01',
    },
    {
      id: 4,
      name: 'Gəncə Mall Filialı',
      address: 'Gəncə şəhəri, Heydər Əliyev prospekti 433, "Gəncə MALL" Ticarət Mərkəzi.',
      hours: 'Hər gün 10:00 - 22:00',
      email: 'ganjamall@libraff.az',
      phone: '+994 50 290 44 72',
    },
    {
      id: 5,
      name: 'Hava Limanı Filialı',
      address: 'Bakı şəhəri, Xəzər rayonu, "Heydər Əliyev adına Hava Limanı", 1-ci Beynəlxalq Terminal, "A" zonası, 3-cü mərtəbə.',
      hours: '7/24 - Hər gün',
      email: 'havalimani@libraff.az',
      phone: '+994 50 290 44 96',
    },
    {
      id: 6,
      name: 'Sumqayıt filialı',
      address: 'Sumqayıt şəhəri, 3-cü mikrorayon, Sülh küçəsi, 176B.',
      hours: 'Hər gün 10:00 - 22:00',
      email: 'sumgait@libraff.az',
      phone: '+994 50 290 44 96',
    },
  ];

  // Gmail pəncərəsini açan funksiya
  const openEmail = (e, email) => {
    e.stopPropagation();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    window.open(gmailUrl, '_blank');
  };

  // WhatsApp chat açan funksiya
  const openWhatsApp = (e, phone) => {
    e.stopPropagation();
    // Nömrədən probel və + işarəsini təmizləyirik (məsələn: 994502904496)
    const cleanPhone = phone.replace(/[^\d]/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const linkStyle = {
    color: '#e53e3e',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: '500',
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#fff', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '14px', color: '#888', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span 
            onClick={() => onNavigate && onNavigate('home')} 
            style={{ cursor: 'pointer', color: '#888' }}
          >
            Əsas səhifə
          </span>
          <span>/</span>
          <span style={{ color: '#555', fontWeight: '500' }}>Mağazalar və Əlaqə</span>
        </div>

        {/* Səhifə Başlığı */}
        <h1 style={{ fontSize: '32px', fontWeight: '400', color: '#111', marginBottom: '32px' }}>
          Mağazalar və Əlaqə
        </h1>

        {/* Baş Ofis Məlumatı + Google Map */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '56px', alignItems: 'center' }}>
          
          {/* Sol məlumatlar */}
          <div style={{ fontSize: '15px', lineHeight: '1.6', color: '#333' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111', marginBottom: '20px' }}>
              Libraff - Onlayn Kitab Mağazası
            </h2>

            <p style={{ marginBottom: '14px' }}>
              <strong>Baş ofis:</strong> Landau küçəsi 16, 2-ci mərtəbə (Park Academy Business Center). Bakı, Azərbaycan, AZ1073
            </p>

            <p style={{ marginBottom: '14px' }}>
              <strong>Tel.:</strong>{' '}
              <span 
                onClick={(e) => openWhatsApp(e, '+994502904496')}
                style={linkStyle}
              >
                +994 50 290 44 96
              </span>
            </p>

            <p style={{ marginBottom: '18px' }}>
              <strong>E-poçt:</strong>{' '}
              <span 
                onClick={(e) => openEmail(e, 'info@libraff.az')}
                style={linkStyle}
              >
                info@libraff.az
              </span>
            </p>

            <div style={{ marginBottom: '18px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '6px' }}>Müştəri Xidmətinin İş Saatları:</p>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                <li>Bazar ertəsi-Cümə: 09:00 - 18:00</li>
                <li>Şənbə və Bazar: 09:00 - 15:00</li>
              </ul>
            </div>

            <p>
              <strong>Korporativ satış üçün əlaqə:</strong>{' '}
              <span 
                onClick={(e) => openWhatsApp(e, '+994502903735')}
                style={linkStyle}
              >
                +994 50 290 37 35
              </span>
              {' – '}
              <span 
                onClick={(e) => openEmail(e, 'tural.isayev@libraff.az')}
                style={linkStyle}
              >
                tural.isayev@libraff.az
              </span>
            </p>
          </div>

          {/* Xəritə */}
          <div style={{ width: '100%', height: '360px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <iframe
              title="Libraff Head Office Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.467475960002!2d49.8132!3d40.3764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d9bc8f498bd%3A0x8e833ebc8309503!2sLev%20Landau%20St%2C%20Baku!5e0!3m2!1sen!2saz!4v1680000000000!5m2!1sen!2saz"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Filiallar Kart Grid-i */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {branches.map((b) => (
            <div
              key={b.id}
              style={{
                border: '1px solid #edf2f7',
                borderRadius: '12px',
                padding: '24px',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c', marginBottom: '12px' }}>
                  {b.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#4a5568', marginBottom: '20px', lineHeight: '1.5', minHeight: '42px' }}>
                  {b.address}
                </p>

                <div style={{ fontSize: '14px', marginBottom: '16px' }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>İş Saatları:</p>
                  <p style={{ color: '#4a5568', margin: 0 }}>{b.hours}</p>
                </div>

                <div style={{ fontSize: '14px', marginBottom: '20px' }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>Əlaqə:</p>
                  
                  {/* Filial Maili */}
                  <div style={{ marginBottom: '6px' }}>
                    <span 
                      onClick={(e) => openEmail(e, b.email)}
                      style={linkStyle}
                    >
                      {b.email}
                    </span>
                  </div>

                  {/* Filial Telefonu (WhatsApp-a yönləndirir) */}
                  {b.phone && (
                    <div>
                      <span 
                        onClick={(e) => openWhatsApp(e, b.phone)}
                        style={linkStyle}
                      >
                        {b.phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Xəritə Linki */}
              <div style={{ paddingTop: '16px', borderTop: '1px solid #edf2f7', fontSize: '14px' }}>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{ color: '#e53e3e', textDecoration: 'none', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  📍 Xəritə
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}