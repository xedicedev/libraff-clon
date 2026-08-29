import React from 'react';
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
const onNavigate = (route, book) => {
};

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-gray-50 w-full">
          <Navbar />
          <ClassicsBanner />
          <TodaysPicks />
          <CategoriesSection onNavigate={onNavigate} />
          <IsMostViewed />
          <ThreeAlmaSection onNavigate={onNavigate} />
          <TeasPressSection onNavigate={onNavigate} />
          <FloatingChat />
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}