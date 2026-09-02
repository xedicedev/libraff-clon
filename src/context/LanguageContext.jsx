import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  AZ: {
    catalog: "Kataloq",
    searchPlaceholder: "Növbəti kitabınızı axtarın",
    myAccount: "Hesabım",
    bestsellers: "Bestseller",
    discounts: "Endirimlər",
    authors: "Müəlliflər",
    classics: "Klassiklər",
    paymentAndDelivery: "Ödəniş və çatdırılma",
    events: "Tədbirlər",
    loyaltyCard: "Loyallıq Kartı",
    faq: "FAQ",
    contact: "Əlaqə",
    whatsappContact: '"Whatsapp"la əlaqə saxlayın',
    workHours: "B.e.-C. : 9:00-18:00"
  },
  RU: {
    catalog: "Каталог",
    searchPlaceholder: "Найдите свою следующую книгу",
    myAccount: "Мой аккаунт",
    bestsellers: "Бестселлеры",
    discounts: "Скидки",
    authors: "Авторы",
    classics: "Классика",
    paymentAndDelivery: "Оплата и доставка",
    events: "Мероприятия",
    loyaltyCard: "Карта лояльности",
    faq: "FAQ",
    contact: "Контакты",
    whatsappContact: 'Свяжитесь по "Whatsapp"',
    workHours: "Пн.-Пт. : 9:00-18:00"
  },
  EN: {
    catalog: "Catalog",
    searchPlaceholder: "Find your next book",
    myAccount: "My Account",
    bestsellers: "Bestsellers",
    discounts: "Discounts",
    authors: "Authors",
    classics: "Classics",
    paymentAndDelivery: "Payment & Delivery",
    events: "Events",
    loyaltyCard: "Loyalty Card",
    faq: "FAQ",
    contact: "Contact",
    whatsappContact: 'Contact via "Whatsapp"',
    workHours: "Mon-Fri : 9:00-18:00"
  }
};

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState('AZ');

  const changeLanguage = (langCode) => {
    setCurrentLang(langCode);
  };

  const t = translations[currentLang] || translations.AZ;

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}