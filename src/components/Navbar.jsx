import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, LayoutGrid, ChevronDown, Phone, Globe, Menu, X, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';

// FontAwesome İkonları
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faFacebookF, faInstagram, faXTwitter, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Navbar({ searchTerm, setSearchTerm, onNavigate }) {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { currentLang, changeLanguage, t } = useLanguage();
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Ekran ölçüsü dəyişdikdə rejimi izləyir
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLangSelect = (langCode) => {
    changeLanguage(langCode);
    setIsLangOpen(false);
  };

  return (
    <header style={{ width: '100%', background: '#fff', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', overflowX: 'hidden' }}>
      
      {/* 1. Top Bar (Dil və Telefon) */}
      <div style={{ width: '100%', padding: isMobile ? '6px 16px' : '6px 32px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '12px', color: '#4b5563', gap: '16px', borderBottom: '1px solid #f9fafb' }}>
        
        {/* Dil seçimi */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer', background: 'none', border: 'none', padding: '4px 6px', color: '#374151' }}
          >
            <Globe size={14} color="#6b7280" />
            <span>{currentLang}</span>
            <ChevronDown size={12} style={{ transform: isLangOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
          </button>

          {isLangOpen && (
            <div style={{ position: 'absolute', right: 0, marginTop: '4px', width: '130px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '4px 0', zIndex: 60 }}>
              <button onClick={() => handleLangSelect('AZ')} style={{ width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', color: '#374151' }}>
                <span>Azərbaycan</span><span style={{ fontSize: '10px', color: '#9ca3af' }}>AZ</span>
              </button>
              <button onClick={() => handleLangSelect('RU')} style={{ width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', color: '#374151' }}>
                <span>Русский</span><span style={{ fontSize: '10px', color: '#9ca3af' }}>RU</span>
              </button>
              <button onClick={() => handleLangSelect('EN')} style={{ width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', color: '#374151' }}>
                <span>English</span><span style={{ fontSize: '10px', color: '#9ca3af' }}>EN</span>
              </button>
            </div>
          )}
        </div>

        {/* Telefon nömrəsi */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setIsPhoneOpen(!isPhoneOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#4b5563', padding: '4px 0' }}
          >
            <Phone size={12} color="#6b7280" />
            <span style={{ fontSize: '12px' }}>+994-50-290-44-96</span>
            <ChevronDown size={12} style={{ transform: isPhoneOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: '#9ca3af' }} />
          </button>

          {isPhoneOpen && (
            <div style={{ position: 'absolute', right: 0, marginTop: '8px', width: isMobile ? '260px' : '290px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '16px', zIndex: 60 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#1f2937' }}>+994-50-290-44-96</span>
                <button onClick={() => setIsPhoneOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                  <FontAwesomeIcon icon={faXmark} style={{ fontSize: '18px' }} />
                </button>
              </div>

              <a href="https://wa.me/994502904496" target="_blank" rel="noopener noreferrer" style={{ width: '100%', backgroundColor: '#25D366', color: '#fff', border: 'none', borderRadius: '24px', padding: '10px', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', marginBottom: '14px' }}>
                <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '18px' }} />
                {t.whatsappContact}
              </a>

              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                {t.workHours}
              </div>

              <div style={{ height: '1px', backgroundColor: '#e5e7eb', width: '100%', marginBottom: '12px' }}></div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <a href="https://www.facebook.com/libraff.az" target="_blank" rel="noopener noreferrer" style={{ width: '32px', height: '32px', backgroundColor: '#7a7a7a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontSize: '14px' }}><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="https://www.instagram.com/libraff.az" target="_blank" rel="noopener noreferrer" style={{ width: '32px', height: '32px', backgroundColor: '#7a7a7a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontSize: '14px' }}><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{ width: '32px', height: '32px', backgroundColor: '#7a7a7a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontSize: '14px' }}><FontAwesomeIcon icon={faXTwitter} /></a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" style={{ width: '32px', height: '32px', backgroundColor: '#7a7a7a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontSize: '12px' }}><FontAwesomeIcon icon={faYoutube} /></a>
                <a href="https://www.linkedin.com/company/libraff" target="_blank" rel="noopener noreferrer" style={{ width: '32px', height: '32px', backgroundColor: '#7a7a7a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontSize: '14px' }}><FontAwesomeIcon icon={faLinkedinIn} /></a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Bar (Logo, Axtarış, Düymələr) */}
      <div style={{ width: '100%', padding: isMobile ? '10px 16px' : '14px 32px', display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? '12px' : '24px' }}>
        
        {/* Logo */}
        <div onClick={() => onNavigate && onNavigate('home')} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', flexShrink: 0 }}>
          <span style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 900, letterSpacing: '0.04em', color: '#dc2626', fontFamily: 'sans-serif' }}>
            LIBRAFF
          </span>
          <svg width={isMobile ? "18" : "22"} height={isMobile ? "24" : "30"} viewBox="0 0 22 30" fill="#dc2626" style={{ marginLeft: '2px' }}>
            <path d="M6 0L12 7H22V30H0V7L6 0Z" />
          </svg>
        </div>

        {/* Desktop Kataloq Düyməsi */}
        {!isMobile && (
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#dc2626', color: '#fff', padding: '10px 22px', borderRadius: '9999px', fontWeight: 500, fontSize: '14px', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
            <LayoutGrid size={18} />
            <span>{t.catalog}</span>
          </button>
        )}

        {/* Desktop Axtarış Paneli */}
        {!isMobile && (
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm || ''}
              onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              style={{ width: '100%', backgroundColor: '#f3f4f6', fontSize: '14px', padding: '11px 16px 11px 42px', borderRadius: '9999px', outline: 'none', border: '1px solid transparent', color: '#1f2937' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          </div>
        )}

        {/* Sağ İkonlar (Bəyəndiklərim, Səbət + Mobil Menyu) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '20px', color: '#374151', flexShrink: 0 }}>
          
          {!isMobile && (
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}>
              <User size={20} />
              <span>{t.myAccount}</span>
              <ChevronDown size={14} color="#9ca3af" />
            </button>
          )}

          {/* Favorilər Düyməsi */}
          <button 
            onClick={() => onNavigate && onNavigate('favorites')}
            title="Favorilər"
            style={{ position: 'relative', padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Heart size={isMobile ? 20 : 22} />
            {wishlist && wishlist.length > 0 && (
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', backgroundColor: '#dc2626', color: '#fff', fontSize: '10px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Səbət Düyməsi */}
          <button style={{ position: 'relative', padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={isMobile ? 20 : 22} />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', backgroundColor: '#dc2626', color: '#fff', fontSize: '10px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobil Menyu İkonu */}
          {isMobile && (
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151', padding: '4px', display: 'flex', alignItems: 'center' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Mobil Axtarış Paneli */}
        {isMobile && (
          <div style={{ width: '100%', position: 'relative', marginTop: '2px' }}>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm || ''}
              onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
              style={{ width: '100%', backgroundColor: '#f3f4f6', fontSize: '13px', padding: '9px 16px 9px 38px', borderRadius: '9999px', outline: 'none', border: '1px solid transparent', color: '#1f2937' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          </div>
        )}
      </div>

      {/* 3. Bütün Menyu Keçidlərini Əhatə Edən Mobil Menyu (Hamburger Paneli) */}
      {isMobile && isMobileMenuOpen && (
        <div style={{ width: '100%', backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 40, maxHeight: '80vh', overflowY: 'auto' }}>
          
          <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#dc2626', color: '#fff', padding: '12px', borderRadius: '8px', fontWeight: 600, fontSize: '15px', border: 'none', cursor: 'pointer' }}>
            <LayoutGrid size={18} />
            <span>{t.catalog}</span>
          </button>

          <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '8px', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} />
              <span>{t.myAccount}</span>
            </div>
            <ChevronRight size={16} color="#9ca3af" />
          </button>

          <div style={{ height: '1px', backgroundColor: '#f3f4f6', width: '100%' }}></div>

          {/* Əsas Kateqoriya Keçidləri */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit', padding: '4px 0' }}>{t.bestsellers}</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit', padding: '4px 0' }}>{t.discounts}</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit', padding: '4px 0' }}>{t.authors}</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit', padding: '4px 0' }}>{t.classics}</a>
          </div>

          <div style={{ height: '1px', backgroundColor: '#f3f4f6', width: '100%' }}></div>

          {/* Əlavə Məlumat Keçidləri */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#6b7280' }}>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.paymentAndDelivery}</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.events}</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.loyaltyCard}</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.faq}</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.contact}</a>
          </div>

        </div>
      )}

      {/* 4. Yalnız Desktop üçün Alt Menyu Barı */}
      {!isMobile && (
        <div style={{ width: '100%', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ width: '100%', padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontWeight: 500, color: '#374151' }}>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.bestsellers}</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.discounts}</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.authors}</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.classics}</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#6b7280' }}>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.paymentAndDelivery}</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.events}</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.loyaltyCard}</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.faq}</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{t.contact}</a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}