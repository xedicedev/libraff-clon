import React, { useState } from 'react';
import { MessageSquareMore, X, Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import LoginModal from './LoginModal'; // Modal-ı daxil edirik

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenLoginModal = (e) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
    setIsOpen(false); // Menyu düymələrini bağlayır
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
        
        {/* Açılan Menyu Hissəsi */}
        {isOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', marginBottom: '4px' }}>
            
            {/* Saytdaxili mesaj -> Modalı açır */}
            <button 
              onClick={handleOpenLoginModal}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <span style={{ 
                backgroundColor: '#404e5f', 
                color: '#fff', 
                padding: '6px 14px', 
                borderRadius: '6px', 
                fontSize: '14px', 
                fontWeight: '500',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap'
              }}>
                Saytdaxili mesaj
              </span>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                backgroundColor: '#404e5f', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}>
                <Mail size={22} />
              </div>
            </button>

            {/* WhatsApp keçidi */}
            <a 
              href="https://wa.me/994502904496" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
            >
              <span style={{ 
                backgroundColor: '#404e5f', 
                color: '#fff', 
                padding: '6px 14px', 
                borderRadius: '6px', 
                fontSize: '14px', 
                fontWeight: '500',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap'
              }}>
                WhatsApp
              </span>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                backgroundColor: '#404e5f', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}>
                <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '24px' }} />
              </div>
            </a>

          </div>
        )}

        {/* Əsas Qırmızı Düymə */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#dc2626',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)',
            transition: 'transform 0.2s ease',
            outline: 'none'
          }}
        >
          {isOpen ? <X size={28} /> : <MessageSquareMore size={26} />}
        </button>

      </div>

      {/* Login Modalı */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}