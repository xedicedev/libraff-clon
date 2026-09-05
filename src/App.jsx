import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import ClassicsBanner from './components/ClassicsBanner';
import FloatingChat from './components/FloatingChat';
import Footer from './components/Footer';
import TodaysPicks from './components/TodaysPicks';
import CategoriesSection from './components/Categories';
import IsMostViewed from './components/IsMostViewed';
import ThreeAlmaSection from './components/ThreeAlmaSection';
import TeasPressSection from './components/TeasPressSection';

// Mövcud Səhifələr
import BestsellersPage from './pages/BestsellersPage'; 
import DiscountsPage from './pages/DiscountsPage';
import AuthorsPage from './pages/AuthorsPage';
import ClassicsPage from './pages/ClassicsPage';
import PaymentDelivery from './pages/PaymentDeliveryPage';
import EventsPage from './pages/EventsPage';
import LoyaltyCard from './pages/LoyaltyCard';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Catalog from './pages/Catalog';
import WishlistPage from './pages/WishlistPage'; // Favorilər səhifəsi
import CartPage from './pages/CartPage';         // Səbət səhifəsi
import BookDetailsPage from './pages/BookDetailsPage'; // Detal səhifəsi əlavə olundu

// Footer üçün Əlavə Olunan Səhifələr
import AboutPage from './pages/AboutPage';
import VacanciesPage from './pages/VacanciesPage';
import ReturnsPage from './pages/ReturnsPage';
import OrdersPage from './pages/OrdersPage';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // CartContext-dən addToCart funksiyası alındı
  const { addToCart } = useCart();

  // Səhifə, seçilən kitab və Login Modal vəziyyətləri
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false); // Login modalının açılıb-bağlanmasını idarə edir

  // Naviqasiya funksiyası - Həm (route, book), həm də birbaşa (book) parametrlərini tutur
  const onNavigate = (param1, param2 = null) => {
    if (typeof param1 === 'object' && param1 !== null) {
      // Əgər birbaşa kitab obyekti ötürülübsə: onNavigate(book)
      setSelectedBook(param1);
      setCurrentPage('product-detail');
    } else if (typeof param1 === 'string') {
      // Əgər route adı ötürülübsə: onNavigate('product-detail', book)
      setCurrentPage(param1);
      if (param2 && typeof param2 === 'object') {
        setSelectedBook(param2);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden flex flex-col">
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onNavigate={onNavigate} 
        onOpenAuth={() => setIsAuthOpen(true)} // <-- Şəxsi kabinetə basdıqda modalı açır
      />

      <main className="w-full flex-1">
        {/* 1. Ana Səhifə */}
        {currentPage === 'home' && (
          <div className="w-full">
            <ClassicsBanner />
            <TodaysPicks searchTerm={searchTerm} onNavigate={onNavigate} onAddToCart={addToCart} />
            <CategoriesSection onNavigate={onNavigate} />
            <IsMostViewed searchTerm={searchTerm} onNavigate={onNavigate} onAddToCart={addToCart} />
            <ThreeAlmaSection onNavigate={onNavigate} searchTerm={searchTerm} onAddToCart={addToCart} />
            <TeasPressSection onNavigate={onNavigate} searchTerm={searchTerm} onAddToCart={addToCart} />
          </div>
        )}

        {/* 2. Kataloq Səhifəsi */}
        {currentPage === 'catalog' && (
          <Catalog onNavigate={onNavigate} onAddToCart={addToCart} />
        )}

        {/* 3. Bestseller Səhifəsi */}
        {currentPage === 'bestsellers' && (
          <BestsellersPage onNavigate={onNavigate} onAddToCart={addToCart} />
        )}

        {/* 4. Endirimlər Səhifəsi */}
        {currentPage === 'discounts' && (
          <DiscountsPage onNavigate={onNavigate} onAddToCart={addToCart} />
        )}

        {/* 5. Müəlliflər Səhifəsi */}
        {currentPage === 'authors' && (
          <AuthorsPage onNavigate={onNavigate} />
        )}

        {/* 6. Klassiklər Səhifəsi */}
        {currentPage === 'classics' && (
          <ClassicsPage 
            onNavigate={onNavigate} 
            searchTerm={searchTerm} 
            onAddToCart={addToCart} 
          />
        )}

        {/* 7. Ödəniş və Çatdırılma Səhifəsi */}
        {currentPage === 'payment-delivery' && (
          <PaymentDelivery />
        )}

        {/* 8. Tədbirlər Səhifəsi */}
        {currentPage === 'events' && (
          <EventsPage onNavigate={onNavigate} />
        )}

        {/* 9. Loyallıq Kartı Səhifəsi */}
        {currentPage === 'loyalty-card' && (
          <LoyaltyCard />
        )}

        {/* 10. FAQ Səhifəsi */}
        {currentPage === 'faq' && (
          <Faq onNavigate={onNavigate} />
        )}

        {/* 11. Əlaqə Səhifəsi */}
        {currentPage === 'contact' && (
          <Contact onNavigate={onNavigate} />
        )}

        {/* 12. Favorilər Səhifəsi */}
        {currentPage === 'favorites' && (
          <WishlistPage onNavigate={onNavigate} onAddToCart={addToCart} />
        )}

        {/* 13. Səbət Səhifəsi */}
        {currentPage === 'cart' && (
          <CartPage onNavigate={onNavigate} />
        )}

        {/* 14. Haqqımızda Səhifəsi */}
        {currentPage === 'about' && (
          <AboutPage />
        )}

        {/* 15. Vakansiyalar Səhifəsi */}
        {currentPage === 'vacancies' && (
          <VacanciesPage />
        )}

        {/* 16. Dəyişdirilmə və Qaytarılma Səhifəsi */}
        {currentPage === 'returns' && (
          <ReturnsPage />
        )}

        {/* 17. Sifarişiniz Haqqında Səhifəsi */}
        {currentPage === 'orders' && (
          <OrdersPage />
        )}

        {/* 18. Kitab Ətraflı Səhifəsi */}
        {currentPage === 'product-detail' && (
          <BookDetailsPage 
            book={selectedBook} 
            onNavigate={onNavigate} 
            onAddToCart={addToCart} 
          />
        )}
      </main>

      {/* Login / Auth Modalı */}
      {isAuthOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '24px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Şəxsi Kabinet / Giriş</h3>
              <button 
                onClick={() => setIsAuthOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#6b7280' }}
              >
                ✕
              </button>
            </div>
            
            {/* Buraya öz login/qeydiyyat form komponentinizi əlavə edə bilərsiniz */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="email" placeholder="E-poçt və ya nömrə" style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
              <input type="password" placeholder="Şifrə" style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
              <button style={{ backgroundColor: '#dc2626', color: '#fff', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
                Daxil ol
              </button>
            </div>
          </div>
        </div>
      )}

      <FloatingChat />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </CartProvider>
  );
}