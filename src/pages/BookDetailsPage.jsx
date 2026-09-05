import React, { useState } from 'react';
import { 
  Brain, 
  UserCheck, 
  Feather, 
  Sparkles, 
  Search, 
  BookOpen, 
  Image as ImageIcon, 
  Percent, 
  Castle, 
  Rocket, 
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES = [
  { id: 'personal_dev', nameKey: 'catPersonalDev', defaultName: 'Şəxsi İnkişaf', icon: Brain },
  { id: 'psychology', nameKey: 'catPsychology', defaultName: 'Psixologiya', icon: UserCheck },
  { id: 'classics', nameKey: 'catClassics', defaultName: 'Klassiklər', icon: Feather },
  { id: 'sci_fi', nameKey: 'catSciFi', defaultName: 'Elmi-fantastika & Fantaziya', icon: Sparkles },
  { id: 'detective', nameKey: 'catDetective', defaultName: 'Detektiv', icon: Search },
  { id: 'fiction', nameKey: 'catFiction', defaultName: 'Bədii ədəbiyyat', icon: BookOpen },
  { id: 'novels', nameKey: 'catNovels', defaultName: 'Romanlar & Novellalar', icon: ImageIcon },
  { id: 'discounts', nameKey: 'catDiscounts', defaultName: 'Endirimlər', icon: Percent },
  { id: 'kids_fiction', nameKey: 'catKidsFiction', defaultName: 'Bədii uşaq ədəbiyyatı', icon: Castle },
  { id: 'kids_non_fiction', nameKey: 'catKidsNonFiction', defaultName: 'Qeyri-bədii uşaq ədəbiyyatı', icon: Rocket },
];

const BOOKS_DATA = [
  { id: 1, title: 'Atomik Vərdişlər', categoryId: 'personal_dev', price: 15.50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuunVa4hAqLpFTMGLHf9waXCDGmNeuK-SEtklMFWKToZEkV2KOqazkZF3s&s=100' },
  { id: 2, title: 'Dostları Necə Qazanmalı', categoryId: 'personal_dev', price: 12.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Ja4f_yJjXjZmz3ApTDYzV9GgK28svenNnfWassOAgxMwiiOxvRPV3o8Z&s=100' },
  { id: 3, title: 'Varlı Ata, Kasıb Ata', categoryId: 'personal_dev', price: 14.80, image: 'https://imgv2-2-f.scribdassets.com/img/document/517952996/original/c1d76118bd/1?v=1' },
  { id: 4, title: 'Dahilər və Autsayderlər', categoryId: 'personal_dev', price: 13.50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgSQfsed2vElDc7jhLHrD_S6b2AvIFPZ0hR6teXMn6awOwyY9wpoP0-mI&s=10' },
  { id: 5, title: 'İnsan və Onun Simvolları', categoryId: 'psychology', price: 18.00, image: 'https://kitabal.az/img/books/3814145.jpg' },
  { id: 6, title: 'Şüuraltının Gücü', categoryId: 'psychology', price: 11.20, image: 'https://cdn.insales-shop.ru/images/products/1/1563/218252827/Jozef_Morfi_qapaq.png' },
  { id: 7, title: 'İnsanın Məna Axtarışı', categoryId: 'psychology', price: 10.50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmJVAunW08rZgU9Qjqz61NM8DXMS2DVOWehL9O0DrCm0vTHd_6e5QftCci&s=10' },
  { id: 8, title: 'Səfillər', categoryId: 'classics', price: 22.00, image: 'https://www.libraff.az/images/thumbnails/600/600/from_1c/5e1c96dc-0686-11ed-a509-503eaa120fc7_1_1759181812.jpg.webp' },
  { id: 9, title: 'Cinayət və Cəza', categoryId: 'classics', price: 17.50, image: 'https://www.libraff.az/images/thumbnails/600/600/from_1c/2622170a-3255-11f0-a56c-503eaa120fc7_1_1759181410.jpg.webp' },
  { id: 10, title: 'Qürur və Qərəz', categoryId: 'classics', price: 13.00, image: 'https://www.kitabyurdu.org/uploads/posts/2017-06/1497120492_ceyn-ostin-qurur-ve-qerez-cover-page-300x400.jpg' },
  { id: 11, title: 'Anna Karenina', categoryId: 'classics', price: 21.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbo0A2PPd55256Xdyp1lLoKslpkyutyeUXzc3FMnEiTsw_EeCGHU8K7LU&s=10' },
  { id: 12, title: 'Harri Potter və Fəlsəfə Daşı', categoryId: 'sci_fi', price: 16.50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkN1vDsqxZEQDfjPiEZsvUP2N43TD9Z42jxJf4GhPAi3Cwnk2HtdnP8bEQ&s=10' },
  { id: 13, title: 'Dune (Qum Dünyası)', categoryId: 'sci_fi', price: 19.90, image: 'https://cdn.insales-shop.ru/images/products/1/6496/272791904/0000000662978-1.jpg' },
  { id: 14, title: 'Üzüklərin Hökmdarı', categoryId: 'sci_fi', price: 25.00, image: 'https://upload.wikimedia.org/wikipedia/az/9/9d/%C3%9Cz%C3%BCkl%C9%99rin_h%C3%B6kmdar%C4%B1_-_%C3%9Cz%C3%BCk_qarda%C5%9Fl%C4%B1%C4%9F%C4%B1_%28film%2C_2001%29.jpg' },
  { id: 15, title: 'Şerlok Holms', categoryId: 'detective', price: 12.00, image: 'https://m.media-amazon.com/images/M/MV5BMTg0NjEwNjUxM15BMl5BanBnXkFtZTcwMzk0MjQ5Mg@@._V1_.jpg' },
  { id: 16, title: 'Şərq Ekspresində Qətl', categoryId: 'detective', price: 13.80, image: 'https://static.insales-cdn.com/images/products/1/126/996515966/SHERQ_EKSPRESINDE_QETL_qapaq_Curved_21v.jpg' },
  { id: 17, title: 'Da Vinçi Şifrəsi', categoryId: 'detective', price: 18.50, image: 'https://cdn.insales-shop.ru/r/DuszKVDUKuA/rs:fit:570:570:1/q:80/plain/images/products/1/5084/171070428/c87668381338010ade334f4c2907c1b6.jpg@jpg' },
  { id: 18, title: '1984', categoryId: 'fiction', price: 14.00, image: 'https://static.insales-cdn.com/images/products/1/6688/532666912/2022-03-26-09-32-261648272746.jpg' },
  { id: 19, title: 'Çovdarlıqda Uçurumdan Qoruyan', categoryId: 'fiction', price: 12.50, image: 'https://cdn.insales-shop.ru/r/NDiJ6w3qNp4/rs:fit:570:570:1/q:80/plain/images/products/1/6089/203028425/5945314.jpg@jpg' },
  { id: 20, title: 'Çevrilmə', categoryId: 'fiction', price: 9.00, image: 'https://static.insales-cdn.com/images/products/1/5248/212980864/Kafka_Cevrilme_Esas.png' },
  { id: 21, title: 'Qraf Monte-Kristo', categoryId: 'novels', price: 24.00, image: 'https://www.libraff.az/images/thumbnails/600/600/from_1c/86bd78ec-e296-11f0-828b-5cb901ffc870_1_1785877212.jpg.webp' },
  { id: 22, title: 'Martin İden', categoryId: 'novels', price: 15.00, image: 'https://www.libraff.az/images/thumbnails/600/600/from_1c/1ca8cb58-5054-11eb-a4d2-503eaa128442_2_1759181561.jpg.webp' },
  { id: 23, title: 'Ağ Diş', categoryId: 'discounts', price: 8.00, image: 'https://static.insales-cdn.com/r/NIV5eTFOcAY/rs:fit:570:570:1/q:80/plain/images/products/1/5947/505034555/agdis.jpg@jpg' },
  { id: 24, title: 'Balaca Şahzadə', categoryId: 'discounts', price: 6.50, image: 'https://www.libraff.az/images/thumbnails/400/600/from_1c/fc7e8998-284c-11ed-a50a-503eaa120fc7_1_1760391148.jpg.webp' },
  { id: 25, title: 'Kiçik Şahzadə', categoryId: 'kids_fiction', price: 10.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW3AjPgwFIwqECYdaOzwMurpgaEX4JfFZ7SAIp24JaGq2DlbS2xvIh82U&s=10' },
  { id: 26, title: 'Alisa Möcüzələr Diyarında', categoryId: 'kids_fiction', price: 9.50, image: 'https://cdn.insales-shop.ru/images/products/1/4362/209768714/Alisa-Mocuzeler-Olkesi-Qapaq-Esas.png' },
  { id: 27, title: 'Kosmos Ensiklopediyası', categoryId: 'kids_non_fiction', price: 18.00, image: 'https://static.insales-cdn.com/images/products/1/1406/889505150/2024-05-31-00-06-421717099602.jpg' },
];

export default function CategoriesSection({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t } = useLanguage();

  const filteredBooks = selectedCategory
    ? BOOKS_DATA.filter((book) => book.categoryId === selectedCategory)
    : [];

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <section style={{ backgroundColor: '#f8fafc', padding: '40px 24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* BAŞLIQ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
            {t.categoriesTitle || "Kateqoriyalar"}
          </h2>
        </div>

        {/* KATEQORİYA KARTLARI */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '20px',
            marginBottom: selectedCategory ? '30px' : '0'
          }}
        >
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const categoryName = t[cat.nameKey] || cat.defaultName;

            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  padding: '24px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #dc2626' : '1px solid transparent',
                  boxShadow: isSelected ? '0 4px 12px rgba(220, 38, 38, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.2s ease',
                  userSelect: 'none',
                }}
                onMouseOver={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  }
                }}
              >
                <div 
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    marginBottom: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#dc2626'
                  }}
                >
                  <IconComponent size={42} strokeWidth={1.5} />
                </div>

                <span 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: isSelected ? '600' : '500', 
                    color: isSelected ? '#dc2626' : '#1f2937', 
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}
                >
                  {categoryName}
                </span>
              </div>
            );
          })}
        </div>

        {/* SEÇİLƏN KATEQORİYANIN MƏHSULLARI */}
        {selectedCategory && (
          <div style={{ paddingTop: '24px', borderTop: '1px solid #e5e7eb', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                {activeCategoryObj ? (t[activeCategoryObj.nameKey] || activeCategoryObj.defaultName) : ''}
              </h3>
              <button 
                onClick={() => setSelectedCategory(null)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  background: '#f3f4f6', 
                  border: 'none', 
                  borderRadius: '20px', 
                  padding: '6px 12px', 
                  fontSize: '13px', 
                  cursor: 'pointer',
                  color: '#4b5563'
                }}
              >
                {t.collapse || "Bağla"} <X size={14} />
              </button>
            </div>

            {filteredBooks.length === 0 ? (
              <p style={{ color: '#6b7280', fontSize: '15px' }}>{t.noBooksInCategory || "Bu kateqoriyada hələ ki kitab yoxdur."}</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
                {filteredBooks.map((book) => (
                  <div 
                    key={book.id} 
                    onClick={() => onNavigate && onNavigate('product-detail', book)}
                    style={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '12px', 
                      padding: '12px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ width: '100%', height: '220px', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/180x260?text=Kitab+Üzlüyü';
                        }}
                      />
                    </div>
                    <h4 style={{ fontSize: '14px', margin: '0 0 6px 0', color: '#1f2937', fontWeight: '500', height: '36px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {book.title}
                    </h4>
                    <p style={{ fontWeight: '700', color: '#dc2626', margin: 0 }}>{book.price.toFixed(2)} ₼</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}