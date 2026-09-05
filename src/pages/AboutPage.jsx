import React from 'react';
import { Percent, ShoppingBag, Gift, MapPin } from 'lucide-react';
import libraffCardImg from '../../assets/images/libraffcard.jpg';
export default function LoyaltyCard() {
  const bannerImageUrl = libraffCardImg;
  return (
    <div style={{ width: '100%', minHeight: '80vh', backgroundColor: '#fff', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 12px 16px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Haqqımızda</h1>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto 32px auto', padding: '0 16px' }}>
        <img 
          src={bannerImageUrl} 
          alt="LIBRAFF" 
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            display: 'block',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
        />
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', color: '#374151', fontSize: '15px', lineHeight: '1.7' }}>
        <p style={{ marginBottom: '16px' }}>2017-ci ildə yaradılan “LIBRAFF” Azərbaycanda ən böyük modern kitab mağazaları şəbəkəsidir.</p>
        <p style={{ marginBottom: '16px' }}>“LIBRAFF” kitab mağazaları şəbəkəsinin Bakıda 6, Sumqayıtda 1, Gəncədə isə 1 filialı fəaliyyət göstərir.</p>
        <p style={{ marginBottom: '16px' }}>Mağazalarımızda azərbaycan, rus, ingilis, türk və digər xarici dillərdə olan zəngin kitab çeşidi mövcuddur.</p>
        <p style={{ marginBottom: '16px', color: '#4b5563' }}>Həmçinin, yerli və aparıcı beynəlxalq nəşriyyatların klassik əsərlərini, xüsusi seçilmiş müasir ədəbiyyat nümunələrini, uşaq və yeniyetmələrin şəxsi inkişafına istiqamətlənmiş əyləncə və oxu materiallarını əldə etmək mümkündür.</p>
        <p style={{ marginBottom: '32px' }}>Mağazalarımızda kitablarla yanaşı, oyuncaqlar, hədiyyəlik əşyalar, suvenirlər, məktəb və ofis ləvazimatları, elektronika məhsullarını da əldə etmək mümkündür.</p>
          <p style={{ marginBottom: '32px' }}>“LIBRAFF”ın ˝Gənclik Mall˝ filialında “coffeeshop in bookshop” konseptində “STORIES COFFEE”  fəaliyyət göstərir.</p>
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
            <h4 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0' }}>Ünvanlar</h4>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Filiallarımıza yaxınlaşaraq məhsullarımızı əldə edin.</p>
          </div>
        </div>

      </div>
    </div>
  );
}