import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
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

// Səhifələr
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

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Səhifə və seçilən kitab vəziyyətləri
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);

  // Naviqasiya funksiyası
  const onNavigate = (route, book = null) => {
    setCurrentPage(route);
    if (book) {
      setSelectedBook(book);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden flex flex-col">
          <Navbar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            onNavigate={onNavigate} 
          />

          <main className="w-full flex-1">
            {/* 1. Ana Səhifə */}
            {currentPage === 'home' && (
              <div className="w-full">
                <ClassicsBanner />
                <TodaysPicks searchTerm={searchTerm} onNavigate={onNavigate} />
                <CategoriesSection onNavigate={onNavigate} />
                <IsMostViewed searchTerm={searchTerm} onNavigate={onNavigate} />
                <ThreeAlmaSection onNavigate={onNavigate} searchTerm={searchTerm} />
                <TeasPressSection onNavigate={onNavigate} searchTerm={searchTerm} />
              </div>
            )}

            {/* 2. Kataloq Səhifəsi */}
            {currentPage === 'catalog' && (
              <Catalog onNavigate={onNavigate} />
            )}

            {/* 3. Bestseller Səhifəsi */}
            {currentPage === 'bestsellers' && (
              <BestsellersPage onNavigate={onNavigate} />
            )}

            {/* 4. Endirimlər Səhifəsi */}
            {currentPage === 'discounts' && (
              <DiscountsPage onNavigate={onNavigate} />
            )}

            {/* 5. Müəlliflər Səhifəsi */}
            {currentPage === 'authors' && (
              <AuthorsPage onNavigate={onNavigate} />
            )}

            {/* 6. Klassiklər Səhifəsi */}
            {currentPage === 'classics' && (
              <ClassicsPage onNavigate={onNavigate} searchTerm={searchTerm} />
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
              <WishlistPage onNavigate={onNavigate} />
            )}

            {/* 13. Səbət Səhifəsi */}
            {currentPage === 'cart' && (
              <CartPage onNavigate={onNavigate} />
            )}

            {/* 14. Kitab Ətraflı Səhifəsi */}
            {currentPage === 'product-detail' && (
              <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow my-8 flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedBook?.coverImage || selectedBook?.image || selectedBook?.img} 
                  alt={selectedBook?.title || selectedBook?.name} 
                  className="w-full md:w-64 h-80 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedBook?.title || selectedBook?.name}</h2>
                    <p className="text-gray-600 mt-2">Müəllif: {selectedBook?.author || 'Məlumat yoxdur'}</p>
                    <p className="text-xl font-semibold text-red-600 mt-4">{selectedBook?.price} ₼</p>
                  </div>
                  <button 
                    onClick={() => onNavigate('home')}
                    className="mt-6 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                  >
                    Ana səhifəyə qayıt
                  </button>
                </div>
              </div>
            )}
          </main>

          <FloatingChat />
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}