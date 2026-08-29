import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  // Google ilə daxil olma funksiyası
  const handleGoogleLogin = () => {
    // 1-ci üsul: Əgər Node.js (Express/Passport.js) backend-iniz varsa:
    window.location.href = 'http://localhost:5000/api/auth/google';

    // 2-ci üsul: Əgər Firebase Auth istifadə edirsinizsə:
    // signInWithPopup(auth, googleProvider)
    //   .then((result) => { console.log(result.user); onClose(); })
    //   .catch((error) => console.error(error));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '16px'
    }}>
      
      {/* Modal Kartı */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '28px 24px',
        width: '100%',
        maxWidth: '430px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        
        {/* Başlıq və Bağlama Düyməsi */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
            Sizə necə kömək edə bilərik?
          </h2>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '4px' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Alt Açıqlama Mətni */}
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.4', marginBottom: '20px', fontWeight: '500' }}>
          "Sual ver" xidmətindən istifadə üçün hesabınıza daxil olun və ya qeydiyyatdan keçin.
        </p>

        {/* Google ilə Daxil Ol Düyməsi */}
        <button 
          onClick={handleGoogleLogin} // <-- Düyməyə onClick əlavə olundu
          style={{
            width: '100%',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '9999px',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontSize: '15px',
            fontWeight: '500',
            color: '#374151',
            cursor: 'pointer',
            marginBottom: '20px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
        >
          {/* Google İkonu */}
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.35 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
          </svg>
          <span>Google hesabı ilə daxil ol</span>
        </button>

        {/* Bölücü Xətt */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#9ca3af', fontSize: '13px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
          <span style={{ padding: '0 12px', color: '#6b7280' }}>və ya</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
              E-poçt <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Şifrə <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <a href="#" style={{ fontSize: '13px', color: '#ef4444', textDecoration: 'none' }}>
                Şifrəni unutdum
              </a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '9999px',
              padding: '12px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            Daxil ol
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
          Hesabınız yoxdur?{' '}
          <a href="#" style={{ color: '#ef4444', fontWeight: '500', textDecoration: 'none' }}>
            Qeydiyyatdan keçin
          </a>
        </div>

      </div>
    </div>
  );
}