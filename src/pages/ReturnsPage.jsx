import React, { useState } from 'react';

// Kateqoriya göstəriciləri üçün kart məlumatları
const STATS = [
  { icon: '↺', title: '14 Gün Ərzində', desc: 'Məhsulu qaytarma imkanı' },
  { icon: '🧾', title: 'Qəbz və ya Çek', desc: 'Əsas tələb olunan sənəd' },
  { icon: '📦', title: 'Zədəsiz Qablaşdırma', desc: 'İlkin görünüşün qorunması' },
];

// Tez-tez verilən suallar / Şərtlər
const FAQ_ITEMS = [
  {
    id: 1,
    question: 'Qaytarılma və dəyişdirilmə müddəti nə qədərdir?',
    answer:
      'Azərbaycan Respublikasının İstehlakçıların hüquqlarının müdafiəsi haqqında Qanununa əsasən, istehlakçı lazımi keyfiyyətli qeyri-ərzaq malını fərqli ölçü, forma, çeşid və ya rəngdə oxşar mala dəyişdirmək və ya 14 gün ərzində qaytarmaq hüququna malikdir.',
  },
  {
    id: 2,
    question: 'Məhsul qaytarılarkən hansı şərtlər vacibdir?',
    answer:
      'Mal istifadə olunmadıqda, onun əmtəə görünüşü, istehlak xassələri, plombu, yarlaqları, habelə satılan mal ilə birlikdə istehlakçıya verilmiş kassa çeki və ya digər əmtəə sənədi saxlanıldıqda dəyişdirilir və ya qaytarılır.',
  },
  {
    id: 3,
    question: 'Ödənilən məbləğ necə və nə vaxt geri qaytarılır?',
    answer:
      'Məhsul qaytarıldıqdan sonra ödəniş 3-7 iş günü ərzində müraciət etdiyiniz ödəniş üsulu ilə (kart hesabı və ya nağd) tam şəkildə geri ödənilir.',
  },
  {
    id: 4,
    question: 'Hansı məhsullar dəyişdirilmir və ya qaytarılmıra bilər?',
    answer:
      'İstifadə olunmuş, cırılmış, üzərində yazılar yazılmış kitablar və qablaşdırması zədələnmiş kantselyariya məhsulları qaytarılmaya bilsin.',
  },
];

export default function ReturnsPage() {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div style={containerStyle}>
      {/* Səhifə Başlığı */}
      <div style={headerSectionStyle}>
        <span style={badgeStyle}>Müştəri Xidməti</span>
        <h1 style={titleStyle}>Dəyişdirilmə və Qaytarılma Şərtləri</h1>
        <p style={subtitleStyle}>
          Sifariş etdiyiniz məhsulların qaytarılması və dəyişdirilməsi qaydaları ilə tanış olun.
        </p>
      </div>

      {/* Statistik Kartlar */}
      <div style={statsGridStyle}>
        {STATS.map((item, index) => (
          <div key={index} style={statCardStyle}>
            <div style={iconBoxStyle}>{item.icon}</div>
            <h3 style={statTitleStyle}>{item.title}</h3>
            <p style={statDescStyle}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Açılıb-bağlanan Şərtlər / Suallar */}
      <div style={faqContainerStyle}>
        <h2 style={sectionTitleStyle}>Əsas Qaydalar və Tez-Tez Verilən Suallar</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  ...faqItemStyle,
                  borderColor: isOpen ? '#2563eb' : '#e5e7eb',
                  boxShadow: isOpen ? '0 4px 12px rgba(37, 99, 235, 0.08)' : 'none',
                }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  style={faqButtonStyle}
                >
                  <span style={{ fontWeight: '600', fontSize: '16px', color: '#1f2937' }}>
                    {faq.question}
                  </span>
                  <span style={{ ...arrowStyle, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div style={faqAnswerStyle}>
                    <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.6', fontSize: '14px' }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Əlaqə və Dəstək Qutusu */}
      <div style={supportBoxStyle}>
        <div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#111827' }}>
            Hələ də sualınız var?
          </h3>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Bizim dəstək xidmətimiz sizə kömək etməyə hazırdır.
          </p>
        </div>
        <a
          href="https://wa.me/994502904496"
          target="_blank"
          rel="noopener noreferrer"
          style={supportButtonStyle}
        >
          Bizə Yazın (WhatsApp)
        </a>
      </div>
    </div>
  );
}

// Stil Obyektləri
const containerStyle = {
  maxWidth: '960px',
  margin: '0 auto',
  padding: '40px 20px 60px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const headerSectionStyle = {
  textAlign: 'center',
  marginBottom: '40px',
};

const badgeStyle = {
  display: 'inline-block',
  backgroundColor: '#eff6ff',
  color: '#2563eb',
  fontSize: '13px',
  fontWeight: '600',
  padding: '6px 14px',
  borderRadius: '20px',
  marginBottom: '12px',
};

const titleStyle = {
  fontSize: '32px',
  fontWeight: '800',
  color: '#111827',
  margin: '0 0 12px 0',
  letterSpacing: '-0.5px',
};

const subtitleStyle = {
  fontSize: '16px',
  color: '#6b7280',
  margin: 0,
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  marginBottom: '48px',
};

const statCardStyle = {
  backgroundColor: '#f9fafb',
  border: '1px solid #f3f4f6',
  borderRadius: '12px',
  padding: '24px',
  textAlign: 'center',
};

const iconBoxStyle = {
  fontSize: '28px',
  marginBottom: '10px',
};

const statTitleStyle = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 6px 0',
};

const statDescStyle = {
  fontSize: '13px',
  color: '#6b7280',
  margin: 0,
};

const faqContainerStyle = {
  marginBottom: '48px',
};

const sectionTitleStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#111827',
  marginBottom: '20px',
};

const faqItemStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  backgroundColor: '#ffffff',
};

const faqButtonStyle = {
  width: '100%',
  padding: '18px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
};

const arrowStyle = {
  fontSize: '12px',
  color: '#6b7280',
  transition: 'transform 0.2s ease',
};

const faqAnswerStyle = {
  padding: '0 20px 18px 20px',
  borderTop: '1px solid #f3f4f6',
  paddingTop: '14px',
};

const supportBoxStyle = {
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  borderRadius: '12px',
  padding: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
};

const supportButtonStyle = {
  backgroundColor: '#0284c7',
  color: '#ffffff',
  padding: '12px 20px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'background-color 0.2s',
};