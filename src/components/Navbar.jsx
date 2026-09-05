import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, Heart, ShoppingBag, User, LayoutGrid, 
  ChevronDown, Phone, Globe, Menu, X, ChevronRight, BookOpen 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';

import { booksData as books1 } from '../data/books';
import { BOOKS_DATA as books2 } from '../data/booksData';
import { THREE_ALMA_MULTI_DATA as books3 } from '../data/3alma';
import { TEAS_PRESS_BOOKS as books4 } from '../data/teasPress';
import { BOOKS_DATA as books5 } from '../data/vbooksData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { 
  faWhatsapp, faFacebookF, faInstagram, 
  faXTwitter, faYoutube, faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';

// Bütün data mənbələrini massivdə birləşdiririk
const ALL_BOOKS = [
  ...(Array.isArray(books1) ? books1 : []),
  ...(Array.isArray(books2) ? books2 : []),
  ...(Array.isArray(books3?.leftTop) ? books3.leftTop : []),
  ...(Array.isArray(books3?.leftBottom) ? books3.leftBottom : []),
  ...(Array.isArray(books3?.rightTop) ? books3.rightTop : []),
  ...(Array.isArray(books3?.rightBottom) ? books3.rightBottom : []),
  ...(Array.isArray(books4) ? books4 : []),
  ...(Array.isArray(books5) ? books5 : []),
];

export default function Navbar({ searchTerm, setSearchTerm, onNavigate, onOpenAuth }) {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { currentLang, changeLanguage, t } = useLanguage();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef(null);

  // Ekran ölçüsü dəyişdikdə mobil rejim yoxlaması
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Xaricə klik olunduqda və ya ESC basıldıqda menyuları bağlamaq
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsLangOpen(false);
        setIsPhoneOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLangSelect = (langCode) => {
    changeLanguage(langCode);
    setIsLangOpen(false);
  };

  // Performans optimallaşdırılması: Axtarış nəticələri useMemo ilə hesablanır
  const filteredBooks = useMemo(() => {
    if (!searchTerm || searchTerm.trim() === '') return [];
    const query = searchTerm.toLowerCase().trim();

    return ALL_BOOKS.filter((book) => {
      const title = String(book?.title || book?.name || '').toLowerCase();
      const author = String(book?.author || '').toLowerCase();
      return title.includes(query) || author.includes(query);
    });
  }, [searchTerm]);

  const handleBookClick = (book) => {
    if (onNavigate) onNavigate('product-detail', book);
    setIsSearchOpen(false);
  };

  return (
    <header style={{
      width: '100%',
      backgroundColor: '#fff',
      borderBottom: '1px solid #f3f4f6',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    }}>
      {/* Top Bar */}
      <div style={{
        width: '100%',
        padding: isMobile ? '6px 16px' : '6px 32px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontSize: '12px',
        color: '#4b5563',
        gap: '16px',
        borderBottom: '1px solid #f9fafb'
      }}>
        {/* Dil Seçimi */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            style={topBarBtnStyle}
          >
            <Globe size={14} color="#6b7280" />
            <span>{currentLang}</span>
            <ChevronDown size={12} style={{ transform: isLangOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
          </button>

          {isLangOpen && (
            <div style={dropdownStyle}>
              {['AZ', 'RU', 'EN'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangSelect(lang)}
                  style={dropdownItemStyle}
                >
                  <span>{lang === 'AZ' ? 'Azərbaycan' : lang === 'RU' ? 'Русский' : 'English'}</span>
                  <span style={{ fontSize: '10px', color: '#9ca3af' }}>{lang}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Əlaqə Nömrəsi */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsPhoneOpen(!isPhoneOpen)}
            style={topBarBtnStyle}
          >
            <Phone size={12} color="#6b7280" />
            <span style={{ fontSize: '12px' }}>+994-50-290-44-96</span>
            <ChevronDown size={12} style={{ transform: isPhoneOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: '#9ca3af' }} />
          </button>

          {isPhoneOpen && (
            <div style={{
              ...dropdownStyle,
              width: isMobile ? '260px' : '290px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#1f2937' }}>+994-50-290-44-96</span>
                <button onClick={() => setIsPhoneOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                  <FontAwesomeIcon icon={faXmark} style={{ fontSize: '18px' }} />
                </button>
              </div>

              <a
                href="https://wa.me/994502904496"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  backgroundColor: '#25D366',
                  color: '#fff',
                  borderRadius: '24px',
                  padding: '10px',
                  fontSize: '13px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  marginBottom: '14px'
                }}
              >
                <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '18px' }} />
                {t.whatsappContact}
              </a>

              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                {t.workHours}
              </div>

              <div style={{ height: '1px', backgroundColor: '#e5e7eb', width: '100%', marginBottom: '12px' }} />

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <SocialLink href="https://www.facebook.com/libraff.az" icon={faFacebookF} />
                <SocialLink href="https://www.instagram.com/libraff.az" icon={faInstagram} />
                <SocialLink href="https://x.com" icon={faXTwitter} />
                <SocialLink href="https://www.youtube.com" icon={faYoutube} fontSize="12px" />
                <SocialLink href="https://www.linkedin.com/company/libraff" icon={faLinkedinIn} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Bar */}
      <div style={{
        width: '100%',
        padding: isMobile ? '10px 16px' : '14px 32px',
        display: 'flex',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: isMobile ? '12px' : '24px'
      }}>
        {/* Logo */}
        <div
          onClick={() => onNavigate && onNavigate('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', flexShrink: 0 }}
        >
          <span style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 900, letterSpacing: '0.04em', color: '#dc2626', fontFamily: 'sans-serif' }}>
            LIBRAFF
          </span>
          <svg width={isMobile ? "18" : "22"} height={isMobile ? "24" : "30"} viewBox="0 0 22 30" fill="#dc2626" style={{ marginLeft: '2px' }}>
            <path d="M6 0L12 7H22V30H0V7L6 0Z" />
          </svg>
        </div>

        {/* Desktop Catalog Button */}
        {!isMobile && (
          <button
            onClick={() => onNavigate && onNavigate('catalog')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#dc2626',
              color: '#fff',
              padding: '10px 22px',
              borderRadius: '9999px',
              fontWeight: 500,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <LayoutGrid size={18} />
            <span>{t.catalog}</span>
          </button>
        )}

        {/* Dynamic Search Input */}
        <div ref={searchRef} style={{ flex: isMobile ? '1 1 100%' : '1', position: 'relative', order: isMobile ? 3 : 0 }}>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm || ''}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => {
              if (setSearchTerm) setSearchTerm(e.target.value);
              setIsSearchOpen(true);
            }}
            style={{
              width: '100%',
              backgroundColor: '#f3f4f6',
              fontSize: isMobile ? '13px' : '14px',
              padding: isMobile ? '9px 38px 9px 38px' : '11px 40px 11px 42px',
              borderRadius: '9999px',
              outline: 'none',
              border: '1px solid transparent',
              color: '#1f2937'
            }}
          />
          <Search size={isMobile ? 16 : 18} style={{ position: 'absolute', left: isMobile ? '14px' : '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          
          {/* Mətni silmə (Clear) düyməsi */}
          {searchTerm && (
            <button
              onClick={() => {
                if (setSearchTerm) setSearchTerm('');
                setIsSearchOpen(false);
              }}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          )}

          {/* Search Results Dropdown */}
          {isSearchOpen && searchTerm && searchTerm.trim() !== '' && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '6px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
              border: '1px solid #e5e7eb',
              maxHeight: '350px',
              overflowY: 'auto',
              zIndex: 100
            }}>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => {
                  const title = book.title || book.name || 'Adsız Kitab';
                  const image = book.coverImage || book.image || book.img;

                  return (
                    <div
                      key={`${book.id || 'book'}-${index}`}
                      onClick={() => handleBookClick(book)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 16px',
                        borderBottom: '1px solid #f3f4f6',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                    >
                      {image ? (
                        <img src={image} alt={title} style={{ width: '40px', height: '55px', objectFit: 'cover', borderRadius: '4px' }} />
                      ) : (
                        <div style={{ width: '40px', height: '55px', backgroundColor: '#f3f4f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BookOpen size={20} color="#9ca3af" />
                        </div>
                      )}
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {title}
                        </h4>
                        {book.author && (
                          <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0 0' }}>
                            {book.author}
                          </p>
                        )}
                      </div>
                      {book.price && (
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#dc2626' }}>
                          {book.price} ₼
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: '16px', textAlign: 'center', color: '#6b7280', fontSize: '13px' }}>
                  Axtarışa uyğun kitab tapılmadı.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Icons */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: isMobile ? '12px' : '20px', 
          color: '#374151', 
          flexShrink: 0,
          marginLeft: isMobile ? 'auto' : '0' 
        }}>
          {/* Masaüstü Hesab Düyməsi */}
          {!isMobile && (
            <button 
              onClick={() => onOpenAuth && onOpenAuth()}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}
            >
              <User size={20} />
              <span>{t.myAccount}</span>
              <ChevronDown size={14} color="#9ca3af" />
            </button>
          )}

          {/* Favorilər */}
          <button
            onClick={() => onNavigate && onNavigate('favorites')}
            title="Favorilər"
            style={{ position: 'relative', padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Heart size={isMobile ? 20 : 22} />
            {wishlist && wishlist.length > 0 && (
              <span style={badgeStyle}>{wishlist.length}</span>
            )}
          </button>

          {/* Səbət */}
          <button
            onClick={() => onNavigate && onNavigate('cart')}
            title="Səbət"
            style={{ position: 'relative', padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ShoppingBag size={isMobile ? 20 : 22} />
            {cartCount > 0 && (
              <span style={badgeStyle}>{cartCount}</span>
            )}
          </button>

          {/* Mobil Menyu Açma Düyməsi */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151', padding: '4px', display: 'flex', alignItems: 'center' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          width: '100%',
          backgroundColor: '#fff',
          borderTop: '1px solid #e5e7eb',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 40,
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <button
            onClick={() => {
              if (onNavigate) onNavigate('catalog');
              setIsMobileMenuOpen(false);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#dc2626',
              color: '#fff',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '15px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <LayoutGrid size={18} />
            <span>{t.catalog}</span>
          </button>

          {/* Mobil Hesab Düyməsi (Login Modalı Açır) */}
          <button 
            onClick={() => {
              if (onOpenAuth) onOpenAuth();
              setIsMobileMenuOpen(false);
            }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '8px', fontSize: '14px', color: '#374151', fontWeight: 500, cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} />
              <span>{t.myAccount}</span>
            </div>
            <ChevronRight size={16} color="#9ca3af" />
          </button>

          <div style={{ height: '1px', backgroundColor: '#f3f4f6', width: '100%' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>
            <MobileNavItem onClick={() => { onNavigate?.('bestsellers'); setIsMobileMenuOpen(false); }}>{t.bestsellers}</MobileNavItem>
            <MobileNavItem onClick={() => { onNavigate?.('discounts'); setIsMobileMenuOpen(false); }}>{t.discounts}</MobileNavItem>
            <MobileNavItem onClick={() => { onNavigate?.('authors'); setIsMobileMenuOpen(false); }}>{t.authors}</MobileNavItem>
            <MobileNavItem onClick={() => { onNavigate?.('classics'); setIsMobileMenuOpen(false); }}>{t.classics}</MobileNavItem>
          </div>

          <div style={{ height: '1px', backgroundColor: '#f3f4f6', width: '100%' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#6b7280' }}>
            <MobileNavItem onClick={() => { onNavigate?.('payment-delivery'); setIsMobileMenuOpen(false); }}>{t.paymentAndDelivery}</MobileNavItem>
            <MobileNavItem onClick={() => { onNavigate?.('events'); setIsMobileMenuOpen(false); }}>{t.events}</MobileNavItem>
            <MobileNavItem onClick={() => { onNavigate?.('loyalty-card'); setIsMobileMenuOpen(false); }}>{t.loyaltyCard}</MobileNavItem>
            <MobileNavItem onClick={() => { onNavigate?.('faq'); setIsMobileMenuOpen(false); }}>{t.faq}</MobileNavItem>
            <MobileNavItem onClick={() => { onNavigate?.('contact'); setIsMobileMenuOpen(false); }}>{t.contact}</MobileNavItem>
          </div>
        </div>
      )}

      {/* Desktop Submenu */}
      {!isMobile && (
        <div style={{ width: '100%', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ width: '100%', padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontWeight: 500, color: '#374151' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate?.('bestsellers')}>{t.bestsellers}</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate?.('discounts')}>{t.discounts}</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate?.('authors')}>{t.authors}</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate?.('classics')}>{t.classics}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#6b7280' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate?.('payment-delivery')}>{t.paymentAndDelivery}</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate?.('events')}>{t.events}</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate?.('loyalty-card')}>{t.loyaltyCard}</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate?.('faq')}>{t.faq}</span>
              <span style={{ cursor: 'pointer' }} onClick={() => onNavigate?.('contact')}>{t.contact}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Helper Stil Obyektləri və Komponentlər
const topBarBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '4px 6px',
  color: '#374151'
};

const dropdownStyle = {
  position: 'absolute',
  right: 0,
  marginTop: '4px',
  width: '130px',
  backgroundColor: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
  padding: '4px 0',
  zIndex: 60
};

const dropdownItemStyle = {
  width: '100%',
  textAlign: 'left',
  padding: '8px 12px',
  fontSize: '12px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  color: '#374151'
};

const badgeStyle = {
  position: 'absolute',
  top: '-2px',
  right: '-2px',
  backgroundColor: '#dc2626',
  color: '#fff',
  fontSize: '10px',
  fontWeight: 'bold',
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1
};

function SocialLink({ href, icon, fontSize = '14px' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: '32px',
        height: '32px',
        backgroundColor: '#7a7a7a',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textDecoration: 'none',
        fontSize
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}

function MobileNavItem({ children, onClick }) {
  return (
    <span style={{ cursor: 'pointer' }} onClick={onClick}>
      {children}
    </span>
  );
}