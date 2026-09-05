import React, { useState } from 'react';

// Sifariş mərhələləri
const STEPS = [
  { id: 1, title: 'Sifariş Qəbul Edildi', desc: 'Məlumatlar təsdiqləndi' },
  { id: 2, title: 'Hazırlanır', desc: 'Anbarda paketlənir' },
  { id: 3, title: 'Kuryerdədir', desc: 'Çatdırılma ünvanına yoldadır' },
  { id: 4, title: 'Təhvil Verildi', desc: 'Çatdırılma tamamlandı' },
];

// Nümunə üçün sistemdə olan düzgün sifarişlər
const VALID_ORDERS = {
  '1024': {
    code: '1024',
    currentStep: 2,
    estimatedDelivery: 'Sabah, 14:00 - 18:00',
  },
  'LIB-889': {
    code: 'LIB-889',
    currentStep: 3,
    estimatedDelivery: 'Bu gün, 18:00-a dək',
  },
};

export default function OrdersPage() {
  const [orderCode, setOrderCode] = useState('');
  const [activeOrder, setActiveOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanCode = orderCode.trim().replace('#', '').toUpperCase();

    // Əgər girilən kod sistemdə varsa
    if (VALID_ORDERS[cleanCode]) {
      setActiveOrder(VALID_ORDERS[cleanCode]);
      setErrorMessage('');
    } else {
      // Fərqli rəqəm və ya kod yazıldıqda
      setActiveOrder(null);
      setErrorMessage(`"${orderCode}" koduna uyğun heç bir sifariş tapılmadı. Lütfen kodu düzgün daxil etdiyinizdən əmin olun.`);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Səhifə Başlığı */}
      <div style={headerStyle}>
        <span style={badgeStyle}>Sifariş İzləmə</span>
        <h1 style={titleStyle}>Sifarişinizin Statusu</h1>
        <p style={subtitleStyle}>
          Sifariş kodunuzu daxil edərək çatdırılma prosesini real vaxt rejimində izləyin.
        </p>
      </div>

      {/* Axtarış Qutusu */}
      <div style={searchCardStyle}>
        <form onSubmit={handleSearch} style={formStyle}>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              placeholder="Sifariş kodu (yoxlamaq üçün test kodları: 1024 və ya LIB-889)"
              value={orderCode}
              onChange={(e) => {
                setOrderCode(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Statusu Yoxla
          </button>
        </form>
      </div>

      {/* Xəta Mesajı (Uyğun sifariş tapılmadıqda) */}
      {errorMessage && (
        <div style={errorBoxStyle}>
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Nəticə və Status Mərhələləri */}
      {activeOrder && (
        <div style={resultCardStyle}>
          {/* Sifariş Başlıq Məlumatları */}
          <div style={orderHeaderStyle}>
            <div>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>Sifariş Kodu:</span>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#111827' }}>
                #{activeOrder.code}
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>Təxmini Çatdırılma:</span>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#2563eb' }}>
                {activeOrder.estimatedDelivery}
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '20px 0' }} />

          {/* Vizual Mərhələ İndikatoru */}
          <div style={stepperContainerStyle}>
            {STEPS.map((step) => {
              const isDone = step.id < activeOrder.currentStep;
              const isCurrent = step.id === activeOrder.currentStep;

              return (
                <div key={step.id} style={stepItemStyle}>
                  <div
                    style={{
                      ...stepCircleStyle,
                      backgroundColor: isDone || isCurrent ? '#2563eb' : '#f3f4f6',
                      color: isDone || isCurrent ? '#ffffff' : '#9ca3af',
                      borderColor: isCurrent ? '#bfdbfe' : 'transparent',
                    }}
                  >
                    {isDone ? '✓' : step.id}
                  </div>
                  <div style={stepTitleStyle}>{step.title}</div>
                  <div style={stepDescStyle}>{step.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Qeyd Qutusu */}
          <div style={infoBoxStyle}>
            📦 Sifarişinizin məlumatları yeniləndi. Kuryer ünvanınıza yaxınlaşdıqda sizə zəng edəcəkdir.
          </div>
        </div>
      )}

      {/* Dəstək Bölməsi */}
      <div style={helpBoxStyle}>
        <span style={{ fontSize: '20px' }}>💬</span>
        <div>
          <h4 style={{ margin: '0 0 2px 0', fontSize: '15px', color: '#1f2937' }}>
            Sifariş kodunu tapmaqda çətinlik çəkirsiniz?
          </h4>
          <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
            Sifariş kodu sizə təsdiq e-poçtu və SMS vasitəsilə göndərilmişdir.
          </p>
        </div>
      </div>
    </div>
  );
}

// Stil Obyektləri
const containerStyle = {
  maxWidth: '850px',
  margin: '0 auto',
  padding: '40px 20px 60px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '32px',
};

const badgeStyle = {
  display: 'inline-block',
  backgroundColor: '#eff6ff',
  color: '#2563eb',
  fontSize: '13px',
  fontWeight: '600',
  padding: '6px 14px',
  borderRadius: '20px',
  marginBottom: '10px',
};

const titleStyle = {
  fontSize: '32px',
  fontWeight: '800',
  color: '#111827',
  margin: '0 0 10px 0',
  letterSpacing: '-0.5px',
};

const subtitleStyle = {
  fontSize: '15px',
  color: '#6b7280',
  margin: 0,
};

const searchCardStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
  marginBottom: '24px',
};

const formStyle = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
};

const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  border: '1px solid #d1d5db',
  borderRadius: '10px',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
};

const buttonStyle = {
  padding: '14px 28px',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  border: 'none',
  borderRadius: '10px',
  fontWeight: '600',
  fontSize: '15px',
  cursor: 'pointer',
};

const errorBoxStyle = {
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  color: '#dc2626',
  padding: '16px 20px',
  borderRadius: '12px',
  marginBottom: '24px',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '1.5',
};

const resultCardStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '16px',
  padding: '28px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
  marginBottom: '24px',
};

const orderHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
};

const stepperContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: '16px',
  margin: '32px 0',
  textAlign: 'center',
};

const stepItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const stepCircleStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '700',
  fontSize: '16px',
  marginBottom: '10px',
  border: '4px solid transparent',
};

const stepTitleStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1f2937',
  marginBottom: '4px',
};

const stepDescStyle = {
  fontSize: '12px',
  color: '#6b7280',
};

const infoBoxStyle = {
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  borderRadius: '10px',
  padding: '16px',
  color: '#0369a1',
  fontSize: '14px',
  lineHeight: '1.5',
};

const helpBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  backgroundColor: '#f9fafb',
  border: '1px solid #f3f4f6',
  borderRadius: '12px',
  padding: '18px 20px',
};