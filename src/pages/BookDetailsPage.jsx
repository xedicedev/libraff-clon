import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import { useWishlist } from './context/WishlistContext';

export default function BookDetailsPage({ book, onNavigate }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  if (!book) {
    return (
      <div className="w-full py-16 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Məhsul tapılmadı</h2>
        <button
          onClick={() => onNavigate && onNavigate('home')}
          className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
        >
          Ana səhifəyə qayıt
        </button>
      </div>
    );
  }

  const isFav = isInWishlist && isInWishlist(book.id);

  return (
    <div className="w-full bg-white min-h-screen font-sans py-6">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Əsas Düzen - Sol Böyük Şəkil, Sağ Məlumat Bloku */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SOL TƏRƏF: Böyük Açık-Boz Şəkil Konteyneri (7 Sütun) */}
          <div className="lg:col-span-7 bg-[#f7f8f9] rounded-2xl p-6 sm:p-10 flex items-center justify-center min-h-[500px] lg:min-h-[620px]">
            <img
              src={book.image}
              alt={book.title}
              className="max-h-[520px] w-auto object-contain shadow-md rounded"
            />
          </div>

          {/* SAĞ TƏRƏF: Məlumat və İdarəetmə Panel (5 Sütun) */}
          <div className="lg:col-span-5 flex flex-col pt-2">
            
            {/* Kod */}
            <div className="text-xs text-gray-400 mb-2">
              Kod: <span className="text-gray-600">{book.id || '9789952563306'}</span>
            </div>

            {/* Başlıq */}
            <h1 className="text-3xl font-normal text-gray-900 mb-3">
              {book.title}
            </h1>

            {/* Müəllif & Düymə */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-500 underline cursor-pointer hover:text-black">
                {book.author || 'Məlumat yoxdur'}
              </span>
              <button className="bg-[#6b7280] text-white text-[11px] px-2.5 py-1 rounded font-medium">
                Müəllif səhifəsi
              </button>
            </div>

            {/* Ulduzlar və Rəylər */}
            <div className="flex items-center gap-2 mb-6 text-xs text-gray-500">
              <span className="text-red-600 text-sm">★★★★★</span>
              <span className="font-semibold text-gray-700">5</span>
              <span>Rəylər: 2</span>
              <button className="text-red-600 underline ml-1 cursor-pointer">
                Rəy yaz
              </button>
            </div>

            {/* Onlayn Sipariş Endirim Kartı */}
            <div className="border border-red-100 bg-red-50/40 rounded-xl p-3.5 mb-6 flex items-start gap-3">
              <div className="bg-red-600 text-white p-2 rounded-lg text-sm shrink-0 mt-0.5">
                🏷️
              </div>
              <div>
                <p className="text-xs font-semibold text-red-600">
                  Onlayn sifarişlərə özəl – 15% Endirim
                </p>
                <p className="text-[11px] text-gray-500 cursor-pointer hover:underline mt-0.5">
                  Aksiya haqqında ətraflı məlumat ⓘ
                </p>
              </div>
            </div>

            {/* Qiymət */}
            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-900">
                {(book.price * quantity).toFixed(2)} ₼
              </div>
              {book.oldPrice && (
                <div className="text-sm text-gray-400 line-through mt-0.5">
                  {(book.oldPrice * quantity).toFixed(2)} ₼
                </div>
              )}
            </div>

            {/* Çatdırılma Məlumat Kartı */}
            <div className="border border-gray-200 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex items-center gap-3 text-xs text-gray-700">
                <span className="bg-emerald-600 text-white p-1.5 rounded-full text-xs shrink-0">
                  🚚
                </span>
                <span>
                  <strong>Sabah</strong> ünvana çatdırılsın. *
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-700">
                <span className="bg-slate-700 text-white p-1.5 rounded-full text-xs shrink-0">
                  🏪
                </span>
                <span>
                  Sabah filiallarımızdan <strong>pulsuz</strong> təhvil alın. *
                </span>
              </div>
            </div>

            {/* Səbətə Əlavə Et Düyməsi (Şəkildəki kimi Qırmızı Pill-shaped) */}
            <button
              onClick={() => addToCart && addToCart(book, quantity)}
              className="w-full bg-[#ef3340] hover:bg-red-700 text-white font-medium py-3.5 rounded-full transition flex items-center justify-center gap-2 mb-4 text-sm cursor-pointer shadow-sm"
            >
              <span>🛍️</span>
              <span>Səbətə əlavə et</span>
            </button>

            {/* Seçilmiş (Wishlist) */}
            {addToWishlist && (
              <button
                onClick={() => addToWishlist(book)}
                className="flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-red-600 cursor-pointer w-fit"
              >
                <span className={isFav ? 'text-red-600 text-base' : 'text-gray-400 text-base'}>
                  ♥
                </span>
                <span>Seçilmiş</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}