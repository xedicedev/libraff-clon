import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, Truck, CreditCard, RefreshCw, ShieldCheck } from 'lucide-react';

export default function Faq() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    { id: 'all', label: 'Bütün Suallar', icon: HelpCircle },
    { id: 'delivery', label: 'Çatdırılma', icon: Truck },
    { id: 'payment', label: 'Ödəniş', icon: CreditCard },
    { id: 'returns', label: 'Qaytarılma', icon: RefreshCw },
    { id: 'account', label: 'Hesab və Təhlükəsizlik', icon: ShieldCheck },
  ];

  const faqs = [
    {
      category: 'delivery',
      question: "Sifarişlər neçə günə çatdırılır?",
      answer: "Bakı şəhəri daxilində sifarişlər 1-2 iş günü ərzində ünvanınıza çatdırılır. Rayonlara çatdırılma isə Poçt vasitəsilə 3-5 iş günü ərzində təhvil verilir."
    },
    {
      category: 'delivery',
      question: "Çatdırılma haqqı nə qədərdir?",
      answer: "Bakı şəhəri daxilində 30 ₼-dən yuxarı sifarişlər üçün çatdırılma tamamilə pulsuzdur. 30 ₼-dən aşağı sifarişlərdə çatdırılma haqqı 3 ₼ təşkil edir."
    },
    {
      category: 'payment',
      question: "Hansı ödəniş üsulları mövcuddur?",
      answer: "Saytımızda Visa və Mastercard bank kartları ilə onlayn ödəniş, həmçinin kuryerə qapıda nağd və ya POS-terminal vasitəsilə ödəniş edə bilərsiniz."
    },
    {
      category: 'returns',
      question: "Aldığım kitabı qaytara və ya dəyişdirə bilərəmmi?",
      answer: "Qanunvericiliyə uyğun olaraq, aldığınız kitabı 14 gün ərzində zədələnməmiş və çeklə birlikdə filiallarımıza yaxınlaşaraq dəyişdirə və ya qaytara bilərsiniz."
    },
    {
      category: 'account',
      question: "Loyallıq (Bonus) kartını necə əldə edə bilərəm?",
      answer: "Libraff filiallarından və ya saytda qeydiyyatdan keçərək rəqəmsal loyallıq kartınızı aktivləşdirə və hər alış-verişdən keshbek qazana bilərsiniz."
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#f9fafb', minHeight: '100vh', padding: '40px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Sərlövhə */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>
            Tez-tez Verilən Suallar
          </h1>
          <p style={{ color: '#4b5563', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
            Sualınız var? Sizə kömək etməkdən məmnunluq duyuruq. Aşağıdakı kateqoriyalardan istifadə edərək cavabınızı tapın.
          </p>
        </div>

        {/* Axtarış Sətiri */}
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 32px auto' }}>
          <input
            type="text"
            placeholder="Sualınızı yazın (məs: çatdırılma, ödəniş)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 44px',
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '9999px',
              fontSize: '14px',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              boxSizing: 'border-box'
            }}
          />
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
        </div>

        {/* Kateqoriyalar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: '500',
                  border: isActive ? '1px solid #dc2626' : '1px solid #e5e7eb',
                  backgroundColor: isActive ? '#dc2626' : '#fff',
                  color: isActive ? '#fff' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Suallar Siyahısı */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '18px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '15px' }}>
                      {faq.question}
                    </span>
                    <ChevronDown 
                      size={18} 
                      style={{ 
                        color: isOpen ? '#dc2626' : '#6b7280', 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                        transition: 'transform 0.2s',
                        flexShrink: 0 
                      }} 
                    />
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 20px 18px 20px',
                      fontSize: '14px',
                      color: '#4b5563',
                      lineHeight: '1.6',
                      borderTop: '1px solid #f3f4f6',
                      paddingTop: '12px',
                      backgroundColor: '#fafafa'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '32px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: '14px' }}>
              Axtarışınıza uyğun heç bir sual tapılmadı.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}