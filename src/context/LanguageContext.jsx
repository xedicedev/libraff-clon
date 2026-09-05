import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  AZ: {
    // Navbar
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
    workHours: "B.e.-C. : 9:00-18:00",
    
    // TeasPressSection
    teasPressTitle: "TEAS Press",
    showMore: "Daha çox göstər",
    collapse: "Bağla",
    reviewsText: "Rəylər",
    noBooks: "Kitab məlumatı tapılmadı.",

    // TodaysPicks
    todaysPicksTitle: "Bugünün seçimləri",
    addToFavorites: "Sevimlilərə əlavə et",
    removeFromFavorites: "Sevimlilərdən çıxar",
    addedToWishlistModal: "Məhsul seçilmişlər siyahısına əlavə edildi",
    viewWishlist: "Seçilmiş məhsulların siyahısına baxın",
    tabAz: "Azərbaycan",
    tabRu: "Rusca",
    tabTr: "Türkcə",

    // CategoriesSection
    categoriesTitle: "Kateqoriyalar",
    noBooksInCategory: "Bu kateqoriyada hələ ki kitab yoxdur.",
    catPersonalDev: "Şəxsi İnkişaf",
    catPsychology: "Psixologiya",
    catClassics: "Klassiklər",
    catSciFi: "Elmi-fantastika & Fantaziya",
    catDetective: "Detektiv",
    catFiction: "Bədii ədəbiyyat",
    catNovels: "Romanlar & Novellalar",
    catDiscounts: "Endirimlər",
    catKidsFiction: "Bədii uşaq ədəbiyyatı",
    catKidsNonFiction: "Qeyri-bədii uşaq ədəbiyyatı",
    close: "Bağla",

    // MostViewedSection
    mostViewedTitlePrefix: "Həftənin ən çox",
    mostViewedTitleHighlight: "baxılanları",
    showLess: "Daha az göstər",

    // ThreeAlmaSection
    threeAlmaTitleSuffix: "ən yenilər",
    viewPrice: "Qiymətə bax",

    // Footer
    company: "Şirkət",
    stores: "Mağazalar",
    aboutUs: "Haqqımızda",
    vacancies: "Vakansiyalar",
    siteMap: "Sayt Xəritəsi",
    customerService: "Müştəri Xidməti",
    returns: "Dəyişdirilmə və qaytarılma",
    orderInfo: "Sifarişiniz haqqında",
    favorites: "Seçilmişlər",
    addressText: "Bakı, Badamdar qəs., Mikayıl Müşfiq küç. 1c (Badamdar Estates)",
    deliveryTerms: "* Çatdırılma şərtləri tətbiq olunur.",
    moreDetails: "Ətraflı"
  },
  RU: {
    // Navbar
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
    workHours: "Пн.-Пт. : 9:00-18:00",
    
    // TeasPressSection
    teasPressTitle: "TEAS Press",
    showMore: "Показать больше",
    collapse: "Свернуть",
    reviewsText: "Отзывы",
    noBooks: "Информация о книгах не найдена.",

    // TodaysPicks
    todaysPicksTitle: "Выбор дня",
    addToFavorites: "Добавить в избранное",
    removeFromFavorites: "Удалить из избранного",
    addedToWishlistModal: "Товар добавлен в список избранного",
    viewWishlist: "Посмотреть список избранного",
    tabAz: "Азербайджанский",
    tabRu: "Русский",
    tabTr: "Турецкий",

    // CategoriesSection
    categoriesTitle: "Категории",
    noBooksInCategory: "В этой категории пока нет книг.",
    catPersonalDev: "Личное развитие",
    catPsychology: "Психология",
    catClassics: "Классика",
    catSciFi: "Фантастика и фэнтези",
    catDetective: "Детективы",
    catFiction: "Художественная литература",
    catNovels: "Романы",
    catDiscounts: "Скидки",
    catKidsFiction: "Детская художественная литература",
    catKidsNonFiction: "Детская познавательная литература",
    close: "Закрыть",

    // MostViewedSection
    mostViewedTitlePrefix: "Самые просматриваемые",
    mostViewedTitleHighlight: "за неделю",
    showLess: "Показать меньше",

    // ThreeAlmaSection
    threeAlmaTitleSuffix: "новинки",
    viewPrice: "Смотреть цену",

    // Footer
    company: "Компания",
    stores: "Магазины",
    aboutUs: "О нас",
    vacancies: "Вакансии",
    siteMap: "Карта сайта",
    customerService: "Служба поддержки",
    returns: "Обмен и возврат",
    orderInfo: "О вашем заказе",
    favorites: "Избранное",
    addressText: "Баку, пос. Бадамдар, ул. Микаила Мушфига, 1с (Badamdar Estates)",
    deliveryTerms: "* Применяются условия доставки.",
    moreDetails: "Подробнее"
  },
  TR: {
    // Navbar
    catalog: "Katalog",
    searchPlaceholder: "Sonraki kitabınızı bulun",
    myAccount: "Hesabım",
    bestsellers: "Çok Satanlar",
    discounts: "İndirimler",
    authors: "Yazarlar",
    classics: "Klasikler",
    paymentAndDelivery: "Ödeme ve Teslimat",
    events: "Etkinlikler",
    loyaltyCard: "Sadakat Kartı",
    faq: "SSS",
    contact: "İletişim",
    whatsappContact: '"Whatsapp" ile iletişime geçin',
    workHours: "Pzt.-Cum. : 9:00-18:00",
    
    // TeasPressSection
    teasPressTitle: "TEAS Press",
    showMore: "Daha fazla göster",
    collapse: "Gizle",
    reviewsText: "Değerlendirmeler",
    noBooks: "Kitap bilgisi bulunamadı.",

    // TodaysPicks
    todaysPicksTitle: "Günün seçimleri",
    addToFavorites: "Favorilere ekle",
    removeFromFavorites: "Favorilerden çıkar",
    addedToWishlistModal: "Ürün favoriler listesine eklendi",
    viewWishlist: "Favori listesini görüntüle",
    tabAz: "Azerbaycan",
    tabRu: "Rusça",
    tabTr: "Türkçe",

    // CategoriesSection
    categoriesTitle: "Kategoriler",
    noBooksInCategory: "Bu kategoride henüz kitap yok.",
    catPersonalDev: "Kişisel Gelişim",
    catPsychology: "Psikoloji",
    catClassics: "Klasikler",
    catSciFi: "Bilim Kurgu & Fantazi",
    catDetective: "Polisiye",
    catFiction: "Kurgu",
    catNovels: "Romanlar & Novellalar",
    catDiscounts: "İndirimler",
    catKidsFiction: "Çocuk Kurgu Edebiyatı",
    catKidsNonFiction: "Çocuk Kurgu Dışı Edebiyat",
    close: "Kapat",

    // MostViewedSection
    mostViewedTitlePrefix: "Haftanın en çok",
    mostViewedTitleHighlight: "görüntülenenleri",
    showLess: "Daha az göster",

    // ThreeAlmaSection
    threeAlmaTitleSuffix: "en yeniler",
    viewPrice: "Fiyata bak",

    // Footer
    company: "Şirkət",
    stores: "Mağazalar",
    aboutUs: "Hakkımızda",
    vacancies: "Kariyer",
    siteMap: "Site Haritası",
    customerService: "Müşteri Hizmetleri",
    returns: "İade ve Değişim",
    orderInfo: "Siparişiniz hakkında",
    favorites: "Favoriler",
    addressText: "Bakü, Badamdar kas., Mikayıl Mushfig sok. 1c (Badamdar Estates)",
    deliveryTerms: "* Teslimat koşulları geçerlidir.",
    moreDetails: "Daha fazla"
  },
  EN: {
    // Navbar
    catalog: "Catalog",
    searchPlaceholder: "Search for your next book",
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
    whatsappContact: 'Contact us on "Whatsapp"',
    workHours: "Mon.-Fri. : 9:00-18:00",
    
    // TeasPressSection
    teasPressTitle: "TEAS Press",
    showMore: "Show more",
    collapse: "Collapse",
    reviewsText: "Reviews",
    noBooks: "No book information found.",

    // TodaysPicks
    todaysPicksTitle: "Today's Picks",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    addedToWishlistModal: "Product added to your wishlist",
    viewWishlist: "View your wishlist",
    tabAz: "Azerbaijani",
    tabRu: "Russian",
    tabTr: "Turkish",

    // CategoriesSection
    categoriesTitle: "Categories",
    noBooksInCategory: "There are no books in this category yet.",
    catPersonalDev: "Personal Development",
    catPsychology: "Psychology",
    catClassics: "Classics",
    catSciFi: "Sci-Fi & Fantasy",
    catDetective: "Detective",
    catFiction: "Fiction",
    catNovels: "Novels & Novellas",
    catDiscounts: "Discounts",
    catKidsFiction: "Children's Fiction",
    catKidsNonFiction: "Children's Non-Fiction",
    close: "Close",

    // MostViewedSection
    mostViewedTitlePrefix: "This week's most",
    mostViewedTitleHighlight: "viewed",
    showLess: "Show less",

    // ThreeAlmaSection
    threeAlmaTitleSuffix: "latest",
    viewPrice: "View price",

    // Footer
    company: "Company",
    stores: "Stores",
    aboutUs: "About Us",
    vacancies: "Vacancies",
    siteMap: "Site Map",
    customerService: "Customer Service",
    returns: "Returns & Exchanges",
    orderInfo: "About your order",
    favorites: "Favorites",
    addressText: "Baku, Badamdar settl., Mikayil Mushfig str. 1c (Badamdar Estates)",
    deliveryTerms: "* Delivery terms apply.",
    moreDetails: "More details"
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