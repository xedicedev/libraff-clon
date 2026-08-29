// src/pages/BookDetailsPage.jsx
import React, { useState } from 'react';

export default function BookDetailsPage({ book, onNavigate }) {
  const [quantity, setQuantity] = useState(1);

  // Əgər seçilmiş kitab yoxdursa
  if (!book) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Məhsul tapılmadı</h2>
        <button
          onClick={() => onNavigate('home')}
          className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-700"
        >
          Ana səhifəyə qayıt
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      {/* Geri Düyməsi */}
      <button
        onClick={() => onNavigate('home')}
        className="mb-6 text-sm text-gray-500 hover:text-gray-800 flex items-center gap-2 cursor-pointer"
      >
        ← Ana səhifəyə qayıt
      </button>

      {/* Kart Konteyneri */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* SOL: Şəkil */}
        <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center">
          <img
            src={book.image}
            alt={book.title}
            className="max-h-80 object-contain rounded-md shadow-md"
          />
        </div>

        {/* SAĞ: Məlumatlar */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h1>
            
            <p className="inline-block bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              ● Stokda var
            </p>

            <div className="text-3xl font-extrabold text-gray-900 mb-6">
              {(book.price * quantity).toFixed(2)} ₼
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {book.description || 'Bu kitab haqqında ətraflı məlumat tezliklə əlavə olunacaq.'}
            </p>
          </div>

          {/* Sayğac və Düymələr */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            {/* Sayğac */}
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1.5">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="text-lg font-semibold px-2 text-gray-600 hover:text-black"
              >
                -
              </button>
              <span className="px-3 text-sm font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="text-lg font-semibold px-2 text-gray-600 hover:text-black"
              >
                +
              </button>
            </div>

            {/* Səbətə At Düyməsi */}
            <button
              className="flex-1 bg-red-600 text-white font-medium py-3 px-6 rounded-full hover:bg-red-700 transition"
            >
              Səbətə əlavə et
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}