import React, { useState } from 'react';

const VACANCIES = [
  {
    id: 1,
    title: 'Məsləhətçi Satıcı',
    department: 'Mağazalar',
    location: 'Bakı mağazaları',
    type: 'Tam ştat',
    description: 'Müştərilərə kitab və kantselyariya seçimində köməklik göstərmək, rəflərin səliqəsinə nəzarət etmək.',
  },
  {
    id: 2,
    title: 'Kassir',
    department: 'Mağazalar',
    location: 'Bakı mağazaları',
    type: 'Növbəli',
    description: 'Kassa əməliyyatlarını həyata keçirmək, nağd və nağdsız ödənişləri qəbul etmək.',
  },
  {
    id: 3,
    title: 'SMM Mütəxəssisi',
    department: 'Offis',
    location: 'Baş Ofis',
    type: 'Tam ştat',
    description: 'Sosial media hesablarının idarə olunması, kontent planın hazırlanması və vizual məzmunun yaradılması.',
  },
  {
    id: 4,
    title: 'Anbar Mütəxəssisi',
    department: 'Logistika',
    location: 'Mərkəzi Anbar',
    type: 'Tam ştat',
    description: 'Daxil olan məhsulların qəbulu, yerləşdirilməsi və mağazalara bölgüsünün təşkili.',
  },
];

export default function VacanciesPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState('Bütün');
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  
  // Forma sahələri
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', file: null });

  // Telefon sahəsinə yalnız rəqəm və + yazılması üçün
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9+]/g, '');
    setFormData({ ...formData, phone: onlyNums });
    setPhoneError(''); // Yazdıqca xətanı sıfırla
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Azərbaycan nömrə formatı yoxlanışı (050/051/055/070/077/099 və ya +994 ilə başlayan nömrələr)
    const phoneRegex = /^(\+994|0)(50|51|55|70|77|99|10)\d{7}$/;

    if (!phoneRegex.test(formData.phone)) {
      setPhoneError('Nömrə düzgün formatda deyil! (Məs: 0501234567 və ya +994501234567)');
      return;
    }

    if (!formData.file) {
      alert('Zəhmət olmasa CV faylınızı əlavə edin!');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedJob(null);
      setFormData({ name: '', email: '', phone: '', file: null });
      setPhoneError('');
    }, 2500);
  };

  const filteredVacancies = filter === 'Bütün' 
    ? VACANCIES 
    : VACANCIES.filter(v => v.department === filter);

  return (
    <div style={containerStyle}>
      {/* Səhifə Başlığı */}
      <div style={headerStyle}>
        <span style={badgeStyle}>Karyera</span>
        <h1 style={titleStyle}>Bizim Komandaya Qoşulun</h1>
        <p style={subtitleStyle}>
          LIBRAFF ailəsinin bir hissəsi olmaq və kitab dünyasında öz karyeranıza başlamaq üçün aktiv vakansiyalarımızla tanış olun.
        </p>
      </div>

      {/* Kateqoriya Filtr Düymələri */}
      <div style={filterContainerStyle}>
        {['Bütün', 'Mağazalar', 'Offis', 'Logistika'].map((dep) => (
          <button
            key={dep}
            onClick={() => setFilter(dep)}
            style={{
              ...filterButtonStyle,
              backgroundColor: filter === dep ? '#2563eb' : '#ffffff',
              color: filter === dep ? '#ffffff' : '#4b5563',
              borderColor: filter === dep ? '#2563eb' : '#e5e7eb',
            }}
          >
            {dep}
          </button>
        ))}
      </div>

      {/* Vakansiya Kartları */}
      <div style={jobsGridStyle}>
        {filteredVacancies.map((job) => (
          <div key={job.id} style={jobCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h3 style={jobTitleStyle}>{job.title}</h3>
              <span style={typeBadgeStyle}>{job.type}</span>
            </div>
            
            <p style={jobDescStyle}>{job.description}</p>
            
            <div style={jobMetaStyle}>
              <span>📍 {job.location}</span>
              <span>🏢 {job.department}</span>
            </div>

            <button
              onClick={() => {
                setSelectedJob(job);
                setSubmitted(false);
                setPhoneError('');
              }}
              style={applyButtonStyle}
            >
              Müraciət Et 📝
            </button>
          </div>
        ))}
      </div>

      {/* CV Məlumat Qutusu */}
      <div style={cvInfoBoxStyle}>
        <div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#111827' }}>
            Axtardığınız vakansiyanı tapmadınız?
          </h3>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            İstənilən vaxt müstəqil müraciət üçün CV-nizi <strong>hr@libraff.az</strong> ünvanına ünvanlaya bilərsiniz.
          </p>
        </div>
      </div>

      {/* Modal - Müraciət Forması */}
      {selectedJob && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', color: '#111827' }}>
                {selectedJob.title} - Müraciət
              </h3>
              <button
                onClick={() => setSelectedJob(null)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div style={successBoxStyle}>
                ✅ Müraciətiniz uğurla qəbul olundu! İnsan Resursları komandamız sizinlə əlaqə saxlayacaq.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Ad və Soyad <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Əli Əliyev"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>E-poçt <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Telefon <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="tel"
                    required
                    placeholder="0501234567 və ya +994501234567"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    style={{
                      ...inputStyle,
                      borderColor: phoneError ? '#dc2626' : '#d1d5db',
                    }}
                  />
                  {phoneError && (
                    <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                      {phoneError}
                    </span>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>CV Yüklə (PDF, DOCX) <span style={{ color: '#dc2626' }}>*</span></label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    style={cancelButtonStyle}
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    style={submitButtonStyle}
                  >
                    Müraciəti Göndər
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Stil Obyektləri
const containerStyle = {
  maxWidth: '900px',
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

const filterContainerStyle = {
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: '32px',
};

const filterButtonStyle = {
  padding: '8px 18px',
  borderRadius: '20px',
  border: '1px solid',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s',
};

const jobsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
  marginBottom: '40px',
};

const jobCardStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
};

const jobTitleStyle = {
  margin: 0,
  fontSize: '18px',
  fontWeight: '700',
  color: '#111827',
};

const typeBadgeStyle = {
  backgroundColor: '#f3f4f6',
  color: '#374151',
  fontSize: '12px',
  padding: '4px 8px',
  borderRadius: '6px',
  fontWeight: '500',
};

const jobDescStyle = {
  fontSize: '14px',
  color: '#4b5563',
  lineHeight: '1.5',
  margin: '0 0 16px 0',
};

const jobMetaStyle = {
  display: 'flex',
  gap: '16px',
  fontSize: '13px',
  color: '#6b7280',
  marginBottom: '20px',
};

const applyButtonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
};

const cvInfoBoxStyle = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '20px 24px',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  padding: '20px',
};

const modalContentStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '14px',
  padding: '28px',
  maxWidth: '460px',
  width: '100%',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '600',
  color: '#374151',
  marginBottom: '4px',
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '14px',
  boxSizing: 'border-box',
};

const cancelButtonStyle = {
  padding: '10px 18px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  backgroundColor: '#fff',
  cursor: 'pointer',
};

const submitButtonStyle = {
  padding: '10px 18px',
  borderRadius: '8px',
  backgroundColor: '#2563eb',
  color: '#fff',
  border: 'none',
  fontWeight: '600',
  cursor: 'pointer',
};

const successBoxStyle = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  color: '#166534',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  fontWeight: '500',
  lineHeight: '1.5',
};