import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Menu, CheckCircle } from 'lucide-react';
const initialDecisions = [
  {
    id: '1',
    title: 'Hansı növdə sayt yaratmaq istəyirsiniz?',
    selectedOptionId: null,
    options: [
      { id: '101', text: 'E-commerce (Onlayn Mağaza)', votes: 3 },
      { id: '102', text: 'Personal Portfolio', votes: 1 },
      { id: '103', text: 'Blog / Xəbər Saytı', votes: 2 },
      { id: '104', text: 'Corporate / Şirkət Saytı', votes: 0 }
    ]
  },
  {
    id: '2',
    title: 'Layihə üçün hansı CSS framework-ü seçək?',
    selectedOptionId: null,
    options: [
      { id: '201', text: 'Tailwind CSS', votes: 4 },
      { id: '202', text: 'Bootstrap', votes: 1 },
      { id: '203', text: 'Styled Components', votes: 0 }
    ]
  }
];
export default function App() {
  const [decisions, setDecisions] = useState(() => {
    const saved = localStorage.getItem('decision_board_data');
    return saved ? JSON.parse(saved) : initialDecisions;
  });
  const [activeId, setActiveId] = useState(decisions[0]?.id || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false); // Silinmə bildirişi üçün state
  const [newTitle, setNewTitle] = useState('');
  const [newOptions, setNewOptions] = useState(['', '']);
  useEffect(() => {
    localStorage.setItem('decision_board_data', JSON.stringify(decisions));
  }, [decisions]);
  const activeDec = decisions.find(d => d.id === activeId);
  const activeIdx = decisions.findIndex(d => d.id === activeId);
  const getTotalVotes = (opts) => opts.reduce((sum, o) => sum + o.votes, 0);
  const handleVote = (decId, optId) => {
    setDecisions(decisions.map(dec => {
      if (dec.id !== decId || dec.selectedOptionId === optId) return dec;
      const options = dec.options.map(opt => {
        if (opt.id === optId) return { ...opt, votes: opt.votes + 1 };
        if (opt.id === dec.selectedOptionId) return { ...opt, votes: Math.max(0, opt.votes - 1) };
        return opt;
      });
      return { ...dec, selectedOptionId: optId, options };
    }));
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const validOpts = newOptions.filter(o => o.trim());
    if (!newTitle.trim() || validOpts.length < 2) return;
    const newDec = {
      id: Date.now().toString(),
      title: newTitle,
      selectedOptionId: null,
      options: validOpts.map((text, i) => ({ id: `${Date.now()}-${i}`, text, votes: 0 }))
    };
    setDecisions([...decisions, newDec]);
    setActiveId(newDec.id);
    setNewTitle('');
    setNewOptions(['', '']);
    setIsModalOpen(false);
    setIsSidebarOpen(false);
  };
  const handleDelete = (id) => {
    const updated = decisions.filter(d => d.id !== id);
    setDecisions(updated);
    if (activeId === id) setActiveId(updated[0]?.id || null);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100 bg-light font-monospace position-relative">
      <header className="d-md-none bg-dark text-white p-3 d-flex justify-content-between align-items-center sticky-top">
        <button className="btn btn-outline-light btn-sm" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={20} />
        </button>
        <span className="fw-bold">Decision Board</span>
        <button className="btn btn-warning btn-sm" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
        </button>
      </header>
      {isSidebarOpen && (
        <div 
          className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" 
          style={{ zIndex: 1040 }} 
          onClick={() => setIsSidebarOpen(false)} />
      )}
      <aside 
        className={`bg-dark text-light p-3 flex-shrink-0 ${
          isSidebarOpen ? 'position-fixed top-0 start-0 h-100 shadow-lg' : 'd-none d-md-flex flex-column'
        }`}
        style={{ width: '300px', zIndex: 1045 }} >
        <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom border-secondary">
          <div>
            <h5 className="mb-0 text-white fw-bold">Decision Board</h5>
            <small className="text-muted">qərarlar reyestri</small>
          </div>
          <button className="btn btn-warning btn-sm p-1" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
          </button>
        </div>
        <nav className="nav nav-pills flex-column overflow-auto">
          {decisions.map((dec, i) => (
            <button
              key={dec.id}
              onClick={() => { setActiveId(dec.id); setIsSidebarOpen(false); }}
              className={`nav-link text-start rounded-0 p-2 mb-1 border-start border-3 w-100 ${
                activeId === dec.id ? 'active bg-secondary bg-opacity-25 border-warning text-white' : 'text-light border-transparent'
              }`} >
              <div className="d-flex gap-2 w-100" style={{ minWidth: 0 }}>
                <small className={`mt-1 ${activeId === dec.id ? 'text-warning' : 'text-muted'}`}>
                  {String(i + 1).padStart(2, '0')}
                </small>
                <div className="w-100" style={{ minWidth: 0 }}>
                  <div className="small text-white text-break" style={{ lineHeight: '1.3' }}>{dec.title}</div>
                  <small className="text-muted d-block mt-1" style={{ fontSize: '10px' }}>{getTotalVotes(dec.options)} səs</small>
                </div>
              </div>
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-grow-1 p-3 p-md-5 w-100" style={{ maxWidth: '850px', minWidth: 0 }}>
        {activeDec ? (
          <section>
            <div className="d-flex justify-content-between align-items-start pb-3 border-bottom border-dark">
              <div className="pe-3" style={{ minWidth: 0 }}>
                <small className="text-warning fw-bold">No. {String(activeIdx + 1).padStart(2, '0')}</small>
                <h2 className="h4 mb-0 mt-1 text-break">{activeDec.title}</h2>
              </div>
              <button className="btn btn-link text-danger p-0 flex-shrink-0" onClick={() => handleDelete(activeDec.id)}>
                <Trash2 size={18} />
              </button>
            </div>
            <p className="text-muted small my-3"> ümumi səs sayı: <strong>{getTotalVotes(activeDec.options)}</strong></p>
            <div className="list-group list-group-flush border-top border-bottom">
              {activeDec.options.map((opt) => {
                const total = getTotalVotes(activeDec.options);
                const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
                const chosen = activeDec.selectedOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={`list-group-item position-relative py-3 ${chosen ? 'bg-warning bg-opacity-10' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleVote(activeDec.id, opt.id)}>
                    <div
                      className="position-absolute top-0 bottom-0 start-0 bg-secondary bg-opacity-25"
                      style={{ width: `${pct}%`, zIndex: 0, transition: 'width 0.3s' }}/>
                    <div className="position-relative d-flex justify-content-between align-items-center gap-3" style={{ zIndex: 1 }}>
                      <div className="d-flex align-items-center gap-2" style={{ minWidth: 0 }}>
                        <input type="radio" checked={chosen} readOnly className="form-check-input mt-0 flex-shrink-0" />
                        <span className="small text-break">{opt.text}</span>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="fw-bold text-warning small me-1">{pct}%</span>
                        <small className="text-muted">({opt.votes})</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <div className="text-muted text-center py-5">Hər hansı bir qərar seçilməyib.</div>
        )}
      </main>
      {showToast && (
        <div 
          className="position-fixed bottom-0 end-0 p-3" 
          style={{ zIndex: 1060 }} >
          <div className="toast show align-items-center text-white bg-success border-0 shadow" role="alert">
            <div className="d-flex p-2">
              <div className="toast-body d-flex align-items-center gap-2">
                <CheckCircle size={18} />
                <span>Uğurla silindi!</span>
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)} />
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3 bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
          <div className="bg-white rounded p-4 w-100" style={{ maxWidth: '450px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 fw-bold fs-6">Yeni Qərar Əlavə Et</h5>
              <button className="btn btn-link text-dark p-0" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <input
                type="text"
                placeholder="Sualın başlığı..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="form-control form-control-sm mb-3"
                required
              />
              {newOptions.map((opt, idx) => (
                <div key={idx} className="d-flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Seçim ${idx + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const updated = [...newOptions];
                      updated[idx] = e.target.value;
                      setNewOptions(updated);
                    }}
                    className="form-control form-control-sm"
                    required
                  />
                  {newOptions.length > 2 && (
                    <button type="button" className="btn btn-outline-danger btn-sm p-1" onClick={() => setNewOptions(newOptions.filter((_, i) => i !== idx))}>
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-sm btn-outline-secondary mb-3 w-100" onClick={() => setNewOptions([...newOptions, ''])}>+ Variant Əlavə Et </button>
              <div className="d-flex justify-content-end gap-2 border-top pt-2">
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => setIsModalOpen(false)}>Ləğv et</button>
                <button type="submit" className="btn btn-sm btn-warning fw-bold">Yarat</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}