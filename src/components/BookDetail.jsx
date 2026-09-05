import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Star, Check, Truck, RotateCcw, ShieldCheck } from 'lucide-react';

export default function BookDetail({ books = [], addToCart, toggleFavorite, favorites = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [addedAlert, setAddedAlert] = useState(false);

  const book = books.find((b) => String(b.id) === String(id));

  if (!book) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-36 sm:pt-44 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Kitab tapılmadı</h2>
        <p className="text-gray-500 mb-6">Axtardığınız kitab mövcud deyil və ya silinib.</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-[#e51937] text-white px-6 py-2.5 rounded-lg hover:bg-[#c4122d] transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> Əsas səhifəyə qayıt
        </button>
      </div>
    );
  }

  const isFavorite = favorites.some((fav) => String(fav.id) === String(book.id));

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(book, quantity);
      setAddedAlert(true);
      setTimeout(() => setAddedAlert(false), 3000);
    }
  };

  const handleToggleFavorite = () => {
    if (toggleFavorite) {
      toggleFavorite(book);
    }
  };

  return (
    <div className="w-full bg-white font-sans text-gray-900 pt-36 sm:pt-44 pb-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Qayıtmaq üçün naviqasiya */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#e51937] mb-6 transition-colors duration-200 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Geri qayıt
        </button>

        {/* Xəbərdarlıq bildirimi */}
        {addedAlert && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3 transition-all duration-300">
            <Check className="w-5 h-5 text-green-600 shrink-0" />
            <span className="text-sm font-medium">Məhsul uğurla səbətə əlavə olundu!</span>
          </div>
        )}

        {/* Əsas Detal Şəbəkəsi */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Sol: Kitab Şəkli */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[340px] bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-center group shadow-sm">
              {book.discount && (
                <span className="absolute top-4 left-4 bg-[#e51937] text-white text-xs font-bold px-2.5 py-1 rounded-md z-10">
                  -{book.discount}%
                </span>
              )}

              <button
                onClick={handleToggleFavorite}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white shadow-sm border border-gray-100 transition-colors duration-200 z-10"
                aria-label="Sevimlilərə əlavə et"
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isFavorite ? 'fill-[#e51937] text-[#e51937]' : 'text-gray-400 hover:text-[#e51937]'
                  }`}
                />
              </button>

              <img
                src={book.image || 'https://via.placeholder.com/300x450?text=No+Cover'}
                alt={book.title}
                className="w-full h-auto max-h-[420px] object-contain rounded-md shadow-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>

          {/* Sağ: Kitab Haqqında Məlumatlar */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between">
            <div>
              {/* Müəllif və Kateqoriya */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                {book.author && <span className="font-semibold text-gray-700">{book.author}</span>}
                {book.author && book.category && <span>•</span>}
                {book.category && <span className="text-[#e51937] font-medium">{book.category}</span>}
              </div>

              {/* Başlıq */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug">{book.title}</h1>

              {/* Qiymətləndirmə (Rating) */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(book.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {book.rating || '5.0'} ({book.reviewsCount || 12} rəy)
                </span>
              </div>

              {/* Qiymət */}
              <div className="flex items-baseline gap-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-3xl font-extrabold text-[#e51937]">
                  {book.price} AZN
                </span>
                {book.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {book.oldPrice} AZN
                  </span>
                )}
              </div>

              {/* Qısa Təsvir */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Məhsul haqqında:</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {book.description ||
                    'Bu məhsul haqqında ətraflı məlumat yaxın zamanlarda əlavə olunacaq. Yüksək keyfiyyətli nəşr və orijinal məzmun zəmanəti ilə təqdim edilir.'}
                </p>
              </div>

              {/* Miqdar və Düymələr */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                {/* Miqdar seçimi */}
                <div className="flex items-center justify-between border border-gray-200 rounded-lg h-12 w-full sm:w-32 px-3 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-gray-500 hover:text-black font-bold text-lg w-8 h-full flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="font-semibold text-gray-800 text-base">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-gray-500 hover:text-black font-bold text-lg w-8 h-full flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Səbətə Əlavə Et Düyməsi */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#e51937] hover:bg-[#c4122d] text-white font-medium h-12 px-6 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.98]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Səbətə əlavə et</span>
                </button>

                {/* Sevimlilər Düyməsi */}
                <button
                  onClick={handleToggleFavorite}
                  className={`h-12 px-5 rounded-lg border flex items-center justify-center gap-2 font-medium transition-colors duration-200 ${
                    isFavorite
                      ? 'border-[#e51937] bg-red-50 text-[#e51937]'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#e51937] text-[#e51937]' : ''}`} />
                  <span className="hidden sm:inline">{isFavorite ? 'Sevilənlərdədir' : 'Sevimlilərə əlavə et'}</span>
                </button>
              </div>
            </div>

            {/* Əlavə Xidmət Məlumatları */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#e51937] shrink-0" />
                <span>Sürətli və etibarlı çatdırılma</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-[#e51937] shrink-0" />
                <span>14 gün ərzində qaytarılma</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#e51937] shrink-0" />
                <span>100% Orijinal məhsul</span>
              </div>
            </div>

          </div>
        </div>

        {/* Ətraflı Parametrlər Bölməsi */}
        <div className="mt-14 border-t border-gray-100 pt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Xüsusiyyətlər</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <div className="flex justify-between py-2.5 px-4 bg-gray-50 rounded-lg text-sm">
              <span className="text-gray-500">Dil</span>
              <span className="font-semibold text-gray-800">{book.language || 'Azərbaycan'}</span>
            </div>
            <div className="flex justify-between py-2.5 px-4 bg-gray-50 rounded-lg text-sm">
              <span className="text-gray-500">Cild</span>
              <span className="font-semibold text-gray-800">{book.coverType || 'Yumşaq'}</span>
            </div>
            <div className="flex justify-between py-2.5 px-4 bg-gray-50 rounded-lg text-sm">
              <span className="text-gray-500">Səhifə sayı</span>
              <span className="font-semibold text-gray-800">{book.pageCount || '250'}</span>
            </div>
            <div className="flex justify-between py-2.5 px-4 bg-gray-50 rounded-lg text-sm">
              <span className="text-gray-500">Nəşriyyat</span>
              <span className="font-semibold text-gray-800">{book.publisher || 'Libraff'}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}