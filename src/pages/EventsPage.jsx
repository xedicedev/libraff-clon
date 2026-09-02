import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: 'Yazıçılarla Görüş və İmza Günü',
      date: '15 Sentyabr 2026',
      time: '15:00',
      location: 'LIBRAFF Park Bulvar filialı',
      mapQuery: 'LIBRAFF Park Bulvar Baku',
      description: 'Məşhur yerli yazıçılarla canlı söhbət, sual-cavab sessiyası və imza günü.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      title: 'Uşaqlar üçün Nağıl Saatı',
      date: '20 Sentyabr 2026',
      time: '12:00',
      location: 'LIBRAFF Elmlər filialı',
      mapQuery: 'LIBRAFF Elmler Baku',
      description: 'Balaca oxucularımız üçün interaktiv nağıl oxuma və əyləncəli master-klass.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', minHeight: '80vh' }}>
      {/* Səhifə Başlığı */}
      <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '32px', textAlign: 'center' }}>
        Tədbirlər və Görüşlər
      </h1>

      {/* Tədbir Kartları (Alt-alta) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              display: 'flex',
              flexWrap: 'wrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
          >
            {/* Şəkil */}
            <div style={{ flex: '1 1 260px', maxHeight: '220px', overflow: 'hidden' }}>
              <img
                src={event.image}
                alt={event.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Məzmun Və Detallar */}
            <div style={{ flex: '2 1 300px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                  {event.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#4b5563', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                  {event.description}
                </p>
              </div>

              {/* Məlumat Paneli */}
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #f3f4f6',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '13px',
                color: '#4b5563'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Calendar size={16} style={{ color: '#ef3842', flexShrink: 0 }} />
                  <span>{event.date}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={16} style={{ color: '#ef3842', flexShrink: 0 }} />
                  <span>{event.time}</span>
                </div>

                {/* Google Maps linki */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#ef3842',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                  title="Xəritədə baxın"
                >
                  <MapPin size={16} style={{ flexShrink: 0 }} />
                  <span style={{ textDecoration: 'underline' }}>{event.location}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}