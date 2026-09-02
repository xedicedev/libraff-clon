import React from 'react';
import { Percent, ShoppingBag, Gift, MapPin } from 'lucide-react';
import loyalCardImg from '../../assets/images/loyalcard.jpg';
export default function LoyaltyCard() {
  // Şəkil linkini buraya daxil edə bilərsiniz
  const bannerImageUrl = loyalCardImg;

  return (
    <div style={{ width: '100%', minHeight: '80vh', backgroundColor: '#fff', paddingBottom: '60px' }}>
      
      {/* Səhifə Başlığı */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 12px 16px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
          Loyallıq Kartı
        </h1>
      </div>

      {/* Şəkil Banner Bölməsi */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 32px auto', padding: '0 16px' }}>
        <img 
          src={bannerImageUrl} 
          alt="LIBRAFF Loyallıq Kartı 3% Cashback" 
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            display: 'block',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
        />
      </div>

      {/* Mətn Content Bölməsi */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', color: '#374151', fontSize: '15px', lineHeight: '1.7' }}>
        
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px', letterSpacing: '0.5px' }}>
          YENİLİK!
        </h3>

        <p style={{ marginBottom: '16px' }}>
          <strong>"LIBRAFF"</strong> Mağazalar şəbəkəsindən etdiyiniz hər alış-verişə görə <strong>3% "Cashback"</strong> qazanacaqsınız! Bu sizə əlavə imkanlar və yeni seçimlər yaradacaqdır.
        </p>

        <p style={{ marginBottom: '16px' }}>
          Bunun üçün <strong>"Loyallıq kartı"</strong>mızı əldə etməyiniz kifayətdir. Kartda yığılan vəsaiti yalnız mağazalarda alışlar zamanı istifadə etmək mümkündür.
        </p>

        <p style={{ marginBottom: '16px' }}>
          Loyallıq kartı olan hər kəs mağazalarımızdakı endirim kampaniyaları və yeniliklər barədə mütəmadi məlumat əldə edə biləcək. Həmçinin etdiyiniz alış-verişə uyğun <strong>SİZƏ ÖZƏL</strong> təkliflərimiz olacaq!
        </p>

        <p style={{ marginBottom: '16px', color: '#4b5563' }}>
          Məlumat üçün bildirək ki, endirimdə olan məhsullar üçün keşbek nəzərdə tutulmayıb və toplanan vəsaiti nağdlaşdırmaq qeyri-mümkündür.
        </p>

        <p style={{ marginBottom: '32px' }}>
          Kartları əldə etmək üçün mağazalarımıza yaxınlaşıb, <strong>"Loyallıq Kartı Aktivləşdirmə Anket"</strong>ini doldurmağınız kifayətdir.
        </p>

        {/* Xüsusiyyət Kartları */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginTop: '40px',
          borderTop: '1px solid #f3f4f6',
          paddingTop: '32px'
        }}>
          <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <Percent size={28} color="#dc2626" style={{ margin: '0 auto 10px auto' }} />
            <h4 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0' }}>3% Keşbek</h4>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Hər alış-verişdən 3% balansınıza qaytarılır.</p>
          </div>

          <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <ShoppingBag size={28} color="#dc2626" style={{ margin: '0 auto 10px auto' }} />
            <h4 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0' }}>Mağaza İçi İstifadə</h4>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Toplanan balansı filiallarımızda xərcləyin.</p>
          </div>

          <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <Gift size={28} color="#dc2626" style={{ margin: '0 auto 10px auto' }} />
            <h4 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0' }}>Özəl Təkliflər</h4>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Kart sahiblərinə xüsusi kampaniya və endirimlər.</p>
          </div>

          <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
            <MapPin size={28} color="#dc2626" style={{ margin: '0 auto 10px auto' }} />
            <h4 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0' }}>Haradan Əldə Etməli?</h4>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Filiallarımıza yaxınlaşaraq anketi doldurun.</p>
          </div>
        </div>

      </div>
    </div>
  );
}