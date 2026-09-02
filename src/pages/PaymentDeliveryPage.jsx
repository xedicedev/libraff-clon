import React from 'react';
import { Truck, CreditCard, ShieldCheck, Clock } from 'lucide-react';

export default function PaymentDelivery() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px', textAlign: 'center' }}>
        Ödəniş və Çatdırılma
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px', textAlign: 'center' }}>
          <Truck size={36} color="#dc2626" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Sürətli Çatdırılma</h3>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Bakı şəhəri daxilində 24 saat ərzində çatdırılma həyata keçirilir.</p>
        </div>

        <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px', textAlign: 'center' }}>
          <CreditCard size={36} color="#dc2626" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Rahat Ödəniş</h3>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Onlayn bank kartları və ya qapıda nağd/kartla ödəniş imkanı.</p>
        </div>

        <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px', textAlign: 'center' }}>
          <ShieldCheck size={36} color="#dc2626" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Təhlükəsiz Qablaşdırma</h3>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Sifarişləriniz zədələnmədən tam xüsusi qablaşdırmada təhvil verilir.</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '12px', border: '1px solid #f3f4f6' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>Qaydalar və Şərtlər</h2>
        <ul style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Şəhərdaxili çatdırılma haqqı 3 AZN təşkil edir. 50 AZN-dən yuxarı sifarişlərdə çatdırılma pulsuzdur.</li>
          <li>Rayonlara çatdırılma Azərpoçt vasitəsilə 3-5 iş günü ərzində həyata keçirilir.</li>
          <li>Sifariş təhvil alınan zaman məhsulun tamlığı yoxlanılmalıdır.</li>
        </ul>
      </div>
    </div>
  );
}