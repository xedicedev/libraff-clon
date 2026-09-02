import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage({ onNavigate }) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  // Kupon state-ləri
  const [couponInput, setCouponInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Çarxın mükafatları
  const prizes = [
    { code: 'SANS5', percent: 5, label: '5%', color: '#ef4444' },
    { code: 'LIBRAFF10', percent: 10, label: '10%', color: '#f59e0b' },
    { code: 'SUPER15', percent: 15, label: '15%', color: '#10b981' },
    { code: 'PROMO20', percent: 20, label: '20%', color: '#3b82f6' },
    { code: 'SANS5', percent: 5, label: '5%', color: '#8b5cf6' },
    { code: 'LIBRAFF10', percent: 10, label: '10%', color: '#ec4899' },
    { code: 'SUPER15', percent: 15, label: '15%', color: '#06b6d4' },
    { code: 'PROMO20', percent: 20, label: '20%', color: '#84cc16' },
  ];

  // Çarx animasiya state-ləri
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonCoupon, setWonCoupon] = useState(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleGoBack = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.history.back();
    }
  };

  const applyDiscount = (code, percent) => {
    setCouponInput(code);
    setDiscountPercent(percent);
    setCouponError('');
    setCouponSuccess(`${percent}% endirim tətbiq olundu! (${code})`);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const cleanCode = couponInput.trim().toUpperCase();

    if (!cleanCode) {
      setCouponError('Zəhmət olmasa kupon kodunu daxil edin.');
      return;
    }

    if (cleanCode === 'LIBRAFF10') applyDiscount('LIBRAFF10', 10);
    else if (cleanCode === 'PROMO20') applyDiscount('PROMO20', 20);
    else if (cleanCode === 'SANS5') applyDiscount('SANS5', 5);
    else if (cleanCode === 'SUPER15') applyDiscount('SUPER15', 15);
    else setCouponError('Daxil edilən kupon kodu yanlışdır.');
  };

  const spinWheel = () => {
    if (isSpinning || hasPlayed) return;

    setIsSpinning(true);
    setCouponError('');

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];

    const numSlices = prizes.length;
    const sliceAngle = 360 / numSlices;

    const extraTurns = 1800; 
    const targetDegree = rotation + extraTurns + (360 - (randomIndex * sliceAngle)) - (sliceAngle / 2);

    setRotation(targetDegree);

    setTimeout(() => {
      setWonCoupon(selectedPrize);
      setIsSpinning(false);
      setHasPlayed(true);
    }, 4000);
  };

  const originalTotal = totalPrice ? Number(totalPrice) : 0;
  const discountAmount = (originalTotal * discountPercent) / 100;
  const finalTotal = originalTotal - discountAmount;

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '16px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', width: '100%' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>
          <button
            onClick={handleGoBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              color: '#374151',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <ArrowLeft size={16} /> Geri
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
            Səbətim ({cartItems ? cartItems.length : 0})
          </h1>
        </div>

        {!cartItems || cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 16px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <ShoppingBag size={48} color="#9ca3af" style={{ marginBottom: '16px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>Səbətiniz boşdur</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>Alış-verişə davam etmək üçün kataloqa nəzər salın.</p>
            <button
              onClick={() => onNavigate && onNavigate('catalog')}
              style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Kataloqa keç
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 1. YUXARI HİSSƏ: KİTABLAR 2 SÜTUN HALINDA (Grid/Flex) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              width: '100%'
            }}>
              {cartItems.map((item, index) => {
                const book = item.book || item.product || item;
                const itemId = item.id || item._id || book.id || book._id || index;
                const title = item.title || book.title || item.name || book.name || 'Adsız Kitab';
                const image = item.coverImage || book.coverImage || item.image || book.image || item.img || book.img;
                const price = Number(item.price || book.price) || 0;
                const quantity = item.quantity || 1;

                return (
                  <div
                    key={itemId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1', minWidth: 0 }}>
                      <img
                        src={image || '/placeholder.png'}
                        alt={title}
                        style={{ 
                          width: '60px', 
                          height: '80px', 
                          objectFit: 'cover', 
                          borderRadius: '6px', 
                          backgroundColor: '#f9fafb',
                          flexShrink: 0
                        }}
                      />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <h3 style={{ 
                          fontSize: '14px', 
                          fontWeight: '700', 
                          color: '#111827', 
                          margin: '0 0 4px 0',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {title}
                        </h3>
                        <p style={{ 
                          fontSize: '12px', 
                          color: '#6b7280', 
                          margin: '0 0 6px 0',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {item.author || book.author || 'Müəllif qeyd olunmayıb'}
                        </p>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: '#dc2626' }}>
                          {price.toFixed(2)} AZN
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                      <button
                        onClick={() => removeFromCart(itemId)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#f9fafb' }}>
                        <button
                          onClick={() => updateQuantity(itemId, quantity - 1)}
                          style={{ border: 'none', background: 'transparent', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#374151' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: '600', padding: '0 6px', color: '#111827' }}>
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(itemId, quantity + 1)}
                          style={{ border: 'none', background: 'transparent', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#374151' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. ALT HİSSƏ: SOLDA ÇARX, SAĞDA KUPON KODU VƏ ÜMUMİ MƏBLƏĞ */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px', 
              alignItems: 'start' 
            }}>
              
              {/* SOL AŞAĞI: Bəxt Çarxı */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Sparkles size={18} color="#dc2626" />
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>
                    Şans Çarxı
                  </h3>
                </div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 16px 0' }}>
                  Çarxı fırladaraq xüsusi endirim kodu qazanın
                </p>

                <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 16px auto' }}>
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '16px solid #111827',
                    zIndex: 20
                  }} />

                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '5px solid #1f2937',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 4s cubic-bezier(0.15, 0.9, 0.1, 1)',
                    boxSizing: 'border-box'
                  }}>
                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      {prizes.map((prize, idx) => {
                        const sliceAngle = 360 / prizes.length;
                        const startAngle = idx * sliceAngle;
                        const endAngle = startAngle + sliceAngle;

                        const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                        const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                        const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                        const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                        const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                        const textAngle = startAngle + sliceAngle / 2;
                        const textRad = (Math.PI * textAngle) / 180;
                        const textX = 50 + 32 * Math.cos(textRad);
                        const textY = 50 + 32 * Math.sin(textRad);

                        const textRotation = textAngle > 90 && textAngle < 270 ? textAngle - 90 : textAngle + 90;

                        return (
                          <g key={idx}>
                            <path d={pathData} fill={prize.color} stroke="#ffffff" strokeWidth="0.8" />
                            <text
                              x={textX}
                              y={textY}
                              fill="#ffffff"
                              fontSize="7.5"
                              fontWeight="bold"
                              textAnchor="middle"
                              dominantBaseline="central"
                              transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                            >
                              {prize.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    border: '3px solid #1f2937',
                    zIndex: 10
                  }} />
                </div>

                {!wonCoupon ? (
                  <button
                    onClick={spinWheel}
                    disabled={isSpinning || hasPlayed}
                    style={{
                      backgroundColor: isSpinning || hasPlayed ? '#9ca3af' : '#dc2626',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 16px',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: isSpinning || hasPlayed ? 'not-allowed' : 'pointer',
                      width: '100%'
                    }}
                  >
                    {isSpinning ? 'Çarx fırlanır...' : 'Fırlat və Qazan'}
                  </button>
                ) : (
                  <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '10px' }}>
                    <p style={{ fontSize: '12px', fontWeight: '600', color: '#166534', margin: '0 0 6px 0' }}>
                      {wonCoupon.percent}% Endirim Qazandınız!
                    </p>
                    <button
                      onClick={() => applyDiscount(wonCoupon.code, wonCoupon.percent)}
                      style={{
                        backgroundColor: '#16a34a',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        fontWeight: '600',
                        fontSize: '12px',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      Kuponu Tətbiq Et
                    </button>
                  </div>
                )}
              </div>

              {/* SAĞ AŞAĞI: Kupon Kodu + Yekun Məbləğ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Kupon Kodu Paneli */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#374151', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={15} color="#dc2626" /> Kupon Kodunuz Var?
                  </h3>
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Məsələn: PROMO20"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      style={{
                        flex: '1',
                        padding: '9px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: '#111827',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '9px 14px',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Tətbiq et
                    </button>
                  </form>

                  {couponError && <p style={{ color: '#ef4444', fontSize: '12px', margin: '6px 0 0 0' }}>{couponError}</p>}
                  {couponSuccess && (
                    <p style={{ color: '#16a34a', fontSize: '12px', margin: '6px 0 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={14} /> {couponSuccess}
                    </p>
                  )}
                </div>

                {/* Sifariş Xülasəsi Paneli */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: '0 0 12px 0', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>
                    Sifariş Xülasəsi
                  </h2>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: '#4b5563' }}>
                    <span>Məhsul sayı:</span>
                    <span style={{ fontWeight: '600', color: '#111827' }}>
                      {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} ədəd
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: '#4b5563' }}>
                    <span>Məbləğ:</span>
                    <span style={{
                      fontWeight: '600',
                      color: discountPercent > 0 ? '#9ca3af' : '#111827',
                      textDecoration: discountPercent > 0 ? 'line-through' : 'none'
                    }}>
                      {originalTotal.toFixed(2)} AZN
                    </span>
                  </div>

                  {discountPercent > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: '#16a34a' }}>
                      <span>Kupon endirimi ({discountPercent}%):</span>
                      <span style={{ fontWeight: '600' }}>-{discountAmount.toFixed(2)} AZN</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '12px 0', fontSize: '16px', fontWeight: '700', color: '#111827', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                    <span>Yekun ödəniş:</span>
                    <span style={{ color: '#dc2626' }}>{finalTotal.toFixed(2)} AZN</span>
                  </div>

                  <button
                    onClick={() => alert(`Sifariş qəbul olundu! Yekun ödəniş: ${finalTotal.toFixed(2)} AZN`)}
                    style={{
                      width: '100%',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Sifarişi Tamamla
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}