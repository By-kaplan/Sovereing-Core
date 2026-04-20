/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo } from 'react';

// --- CORE LOGIC (searchEngine.js) ---
const searchEngine = {
  rankResults: (query, articles) => {
    if (!query) return [];
    const tokens = query.toLowerCase().split(/\s+/);
    
    return articles.map(article => {
      let score = 0;
      const title = article.title.toLowerCase();
      const tags = article.tags.map(t => t.toLowerCase());
      const snippet = article.steps[0]?.content.toLowerCase() || "";

      tokens.forEach(token => {
        if (title.includes(token)) score += 10;
        if (tags.some(tag => tag.includes(token))) score += 5;
        if (snippet.includes(token)) score += 1;
      });

      return { ...article, relevance_score: score };
    })
    .filter(a => a.relevance_score > 0)
    .sort((a, b) => b.relevance_score - a.relevance_score);
  }
};

// --- DATA SCHEMA (KnowledgeSchema.js) ---
const KNOWLEDGE_BASE = [
  {
    id: "GUIDE-001",
    title: "Kurumsal Laptop İlk Kurulum Prosedürü",
    category: "Donanım",
    last_updated: "2023-10-15",
    difficulty: "Başlangıç",
    tags: ["MacBook", "Kurulum", "VPN", "Güvenlik"],
    steps: [
      { id: 1, title: "Kutu İçeriği Kontrolü", content: "Cihaz, adaptör ve garanti belgesinin eksiksiz olduğunu teyit edin.", type: "info" },
      { id: 2, title: "Disk Şifreleme (FileVault)", content: "Sistem Ayarları > Güvenlik kısmından FileVault'u aktif hale getirin.", type: "critical", warning: "Bu adım atlanırsa şirket ağına erişim engellenir." },
      { id: 3, title: "VPN Konfigürasyonu", content: "GlobalProtect istemcisini kurun ve portal adresine 'vpn.sirket.com' yazın.", type: "step" }
    ],
    troubleshooting: [
      { question: "VPN Bağlantısı sağlanamadı mı?", action: "DNS ayarlarını kontrol edin." },
      { question: "Şifreleme hatası mı alıyorsunuz?", action: "IT Destek birimine 'ERR-SEC-01' koduyla bilet açın." }
    ]
  },
  {
    id: "GUIDE-002",
    title: "Docker Container Optimizasyonu",
    category: "Yazılım",
    last_updated: "2024-03-01",
    difficulty: "İleri Seviye",
    tags: ["Docker", "DevOps", "Backend"],
    steps: [
      { id: 1, title: "Multi-stage Build", content: "Dockerfile içerisinde multi-stage build yapısını kurarak imaj boyutunu küçültün.", type: "step" }
    ]
  }
];

// --- PURE SVG ASSETS (Manual Vector Mastery) ---
const SovIcons = {
  Terminal: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Book: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Monitor: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Cpu: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>,
  Shield: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  ArrowLeft: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  ChevronRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  Alert: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Clock: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [view, setView] = useState('home');

  const checkFreshness = (dateString) => {
    const diff = (new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24);
    return diff > 180;
  };

  const searchResults = useMemo(() => 
    searchEngine.rankResults(searchQuery, KNOWLEDGE_BASE), 
    [searchQuery]
  );

  const renderGuide = (article) => {
    setSelectedArticle(article);
    setCurrentStep(0);
    setView('guide');
  };

  // --- GSS (VANILLA CSS INTEGRITY) ---
  const gss = `
    .sov-root {
      background: #0a0a0c;
      color: #ccc;
      font-family: 'JetBrains Mono', monospace;
      min-height: 100vh;
      display: flex;
    }
    .sov-sidebar {
      width: 260px;
      background: #0f0f12;
      border-right: 1px solid #1a1a1f;
      padding: 30px 20px;
      position: fixed;
      height: 100vh;
    }
    .sov-main { flex: 1; margin-left: 260px; padding: 40px; }
    .sov-nav-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: transparent;
      border: none;
      color: #666;
      font-size: 11px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 8px;
      text-transform: uppercase;
      margin-bottom: 5px;
      transition: 0.3s;
    }
    .sov-nav-btn.active { background: #6366f1; color: #fff; }
    .sov-nav-btn:hover:not(.active) { background: #1a1a1f; color: #fff; }

    .sov-search-box {
      background: #111116;
      border: 1px solid #1a1a1f;
      border-radius: 12px;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 40px;
      max-width: 800px;
    }
    .sov-input { background: transparent; border: none; color: #fff; width: 100%; outline: none; font-size: 13px; }

    .sov-card {
      background: #0f0f12;
      border: 1px solid #1a1a1f;
      border-radius: 16px;
      padding: 24px;
      cursor: pointer;
      transition: 0.3s;
      position: relative;
    }
    .sov-card:hover { border-color: #6366f1; transform: translateY(-2px); }

    .sov-badge { font-size: 8px; font-weight: bold; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; }
    .sov-stale-badge { background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2); color: #f59e0b; }

    .sov-guide-header { margin-bottom: 40px; }
    .sov-guide-title { font-size: 32px; color: #fff; margin: 10px 0; letter-spacing: -1px; }

    .sov-step-box {
      background: #0f0f12;
      border: 1px solid #1a1a1f;
      border-radius: 20px;
      padding: 40px;
      position: relative;
      overflow: hidden;
    }
    .sov-step-num { position: absolute; top: 10px; right: 20px; font-size: 80px; font-weight: 900; opacity: 0.03; font-style: italic; }

    .sov-progress { height: 4px; background: #111; border-radius: 2px; margin: 20px 0; overflow: hidden; }
    .sov-progress-fill { height: 100%; background: #6366f1; transition: width 0.5s ease; }

    .sov-matrix-table { width: 100%; border-collapse: collapse; background: #0f0f12; border-radius: 12px; overflow: hidden; border: 1px solid #1a1a1f; }
    .sov-matrix-table th { background: #111116; padding: 15px; text-align: left; font-size: 10px; color: #555; text-transform: uppercase; }
    .sov-matrix-table td { padding: 15px; border-bottom: 1px solid #1a1a1f; font-size: 12px; }
  `;

  return (
    <div className="sov-root">
      {/* lgtm[js/html-injection] */}
      <style>{gss}</style>

      <aside className="sov-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ background: '#6366f1', padding: '8px', borderRadius: '8px' }}>
            <SovIcons.Terminal />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Tech<span style={{color: '#6366f1'}}>Guide</span></span>
        </div>

        <button className={`sov-nav-btn ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
          <SovIcons.Book /> Rehberler
        </button>
        <button className={`sov-nav-btn ${view === 'matrix' ? 'active' : ''}`} onClick={() => setView('matrix')}>
          <SovIcons.Monitor /> Donanım Matrisi
        </button>
        <button className="sov-nav-btn"><SovIcons.Cpu /> Yazılım Standartları</button>
        <button className="sov-nav-btn"><SovIcons.Shield /> Güvenlik Protokolleri</button>

        <div style={{ position: 'absolute', bottom: '30px', left: '20px', right: '20px', background: 'rgba(99,102,241,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.1)' }}>
          <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#6366f1', display: 'block', marginBottom: '5px' }}>KATKIDA BULUN</span>
          <p style={{ margin: 0, fontSize: '10px', color: '#555', lineHeight: '1.4' }}>Yeni bir prosedür eklemek için editörü açın.</p>
          <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
            <SovIcons.Edit /> Yeni Makale
          </button>
        </div>
      </aside>

      <main className="sov-main">
        <header className="sov-search-box">
          <SovIcons.Search />
          <input 
            className="sov-input" 
            placeholder="Makale, hata kodu veya etiket ara... (CMD + K)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </header>

        {view === 'home' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            {searchQuery && (
              <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '10px', color: '#555', marginBottom: '15px' }}>ARAMA SONUÇLARI ({searchResults.length})</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                  {searchResults.map(item => (
                    <div key={item.id} className="sov-card" onClick={() => renderGuide(item)}>
                      {checkFreshness(item.last_updated) && <span className="sov-badge sov-stale-badge" style={{ position: 'absolute', top: '15px', right: '15px' }}>! İNCELEME GEREKİYOR</span>}
                      <div style={{ fontSize: '9px', color: '#6366f1', fontWeight: 'bold', marginBottom: '10px' }}>{item.category}</div>
                      <h4 style={{ margin: '0 0 10px 0', color: '#fff' }}>{item.title}</h4>
                      <p style={{ margin: 0, fontSize: '11px', color: '#555', lineHeight: '1.5' }}>{item.steps[0]?.content}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '25px' }}>Popüler Rehberler</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {KNOWLEDGE_BASE.map(item => (
                  <div key={item.id} className="sov-card" onClick={() => renderGuide(item)}>
                    {checkFreshness(item.last_updated) && <span className="sov-badge sov-stale-badge" style={{ position: 'absolute', top: '15px', right: '15px' }}>ESKİ VERİ</span>}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                      <span style={{ fontSize: '9px', background: '#111', color: '#888', padding: '2px 6px', borderRadius: '4px' }}>{item.category}</span>
                      <span style={{ fontSize: '9px', background: '#111', color: '#888', padding: '2px 6px', borderRadius: '4px' }}>{item.difficulty}</span>
                    </div>
                    <h4 style={{ margin: '0 0 12px 0', color: '#fff', fontSize: '16px' }}>{item.title}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #111' }}>
                      <span style={{ fontSize: '9px', color: '#444' }}>{item.steps.length} ADIM</span>
                      <SovIcons.ChevronRight />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {view === 'guide' && selectedArticle && (
          <div style={{ maxWidth: '800px', animation: 'slideUp 0.5s ease' }}>
            <button onClick={() => setView('home')} style={{ background: 'none', border: 'none', color: '#555', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '30px' }}>
              <SovIcons.ArrowLeft /> Listeye Geri Dön
            </button>

            <header className="sov-guide-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ background: '#6366f1', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' }}>{selectedArticle.category}</span>
                <span style={{ fontSize: '11px', color: '#444', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <SovIcons.Clock /> Son Güncelleme: {selectedArticle.last_updated}
                </span>
              </div>
              <h1 className="sov-guide-title">{selectedArticle.title}</h1>
              <div style={{ display: 'flex', gap: '8px' }}>
                {selectedArticle.tags.map(t => <span key={t} style={{ fontSize: '9px', color: '#555', border: '1px solid #111', padding: '2px 8px', borderRadius: '4px' }}>#{t}</span>)}
              </div>
            </header>

            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', color: '#6366f1', marginBottom: '8px' }}>
                <span>ADIM {currentStep + 1} / {selectedArticle.steps.length}</span>
                <span>{Math.round(((currentStep + 1) / selectedArticle.steps.length) * 100)}%</span>
              </div>
              <div className="sov-progress">
                <div className="sov-progress-fill" style={{ width: `${((currentStep + 1) / selectedArticle.steps.length) * 100}%` }}></div>
              </div>
            </div>

            <section className="sov-step-box">
              <div className="sov-step-num">{currentStep + 1}</div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#fff', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '32px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>{currentStep + 1}</div>
                {selectedArticle.steps[currentStep].title}
              </h3>
              <p style={{ fontSize: '16px', color: '#888', lineHeight: '1.6', marginBottom: '30px' }}>{selectedArticle.steps[currentStep].content}</p>

              {selectedArticle.steps[currentStep].type === 'critical' && (
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', padding: '20px', borderRadius: '12px', display: 'flex', gap: '15px', marginBottom: '30px' }}>
                  <div style={{ color: '#ef4444' }}><SovIcons.Alert /></div>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#ef4444', display: 'block', marginBottom: '5px' }}>KRİTİK UYARI</span>
                    <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{selectedArticle.steps[currentStep].warning}</p>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '30px', borderTop: '1px solid #111' }}>
                <button 
                  disabled={currentStep === 0} 
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  style={{ background: 'none', border: 'none', color: currentStep === 0 ? '#222' : '#555', fontWeight: 'bold', cursor: 'pointer' }}
                >GERİ</button>
                {currentStep === selectedArticle.steps.length - 1 ? (
                  <button onClick={() => setView('home')} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <SovIcons.Check /> TAMAMLANDI
                  </button>
                ) : (
                  <button onClick={() => setCurrentStep(prev => prev + 1)} style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    SONRAKİ ADIM <SovIcons.ChevronRight />
                  </button>
                )}
              </div>
            </section>

            {selectedArticle.troubleshooting && (
              <div style={{ marginTop: '40px' }}>
                <h4 style={{ fontSize: '10px', color: '#555', letterSpacing: '2px', marginBottom: '15px' }}>SORUN GİDERME KARAR AĞACI</h4>
                {selectedArticle.troubleshooting.map((t, i) => (
                  <div key={i} style={{ background: '#0d0d0f', border: '1px solid #111', padding: '15px', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#fff' }}>{t.question}</span>
                    <span style={{ fontSize: '10px', color: '#6366f1', background: 'rgba(99,102,241,0.05)', padding: '4px 10px', borderRadius: '6px' }}>ÇÖZÜM: {t.action}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'matrix' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '5px' }}>Knowledge Matrix</h2>
            <p style={{ fontSize: '10px', color: '#444', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '30px' }}>Cihaz Modelleri & Hata Kodları Referansı</p>

            <table className="sov-matrix-table">
              <thead>
                <tr><th>Ekipman Modeli</th><th>Hata Kodu</th><th>Frekans</th><th>Süre (Ort)</th><th>Öncelik</th></tr>
              </thead>
              <tbody>
                {[
                  { m: "MacBook Pro M3", c: "ERR-PWR-04", f: "12", t: "15 dk", p: "YÜKSEK", pc: "#f59e0b" },
                  { m: "Dell Latitude 5440", c: "ERR-DISK-01", f: "4", t: "45 dk", p: "KRİTİK", pc: "#ef4444" },
                  { m: "Logitech MX Master", c: "ERR-BT-09", f: "28", t: "2 dk", p: "DÜŞÜK", pc: "#10b981" }
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 'bold', color: '#fff' }}>{row.m}</td>
                    <td><code style={{ background: '#111', color: '#6366f1', padding: '2px 6px', borderRadius: '4px' }}>{row.c}</code></td>
                    <td style={{ color: '#555' }}>{row.f}/Ay</td>
                    <td style={{ color: '#555', fontStyle: 'italic' }}>{row.t}</td>
                    <td><span style={{ fontSize: '8px', padding: '2px 6px', borderRadius: '4px', background: `${row.pc}11`, color: row.pc, border: `1px solid ${row.pc}33` }}>{row.p}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer style={{ position: 'fixed', bottom: 0, left: '260px', right: 0, background: '#0a0a0c', borderTop: '1px solid #1a1a1f', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#333' }}>
        <div style={{ display: 'flex', gap: '30px' }}>
          <span>ENGINE: KNOWLEDGE_RANK_v1.0</span>
          <span>STATUS: OPERATIONAL</span>
        </div>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: KAPLAN HALI YIKAMA PRECISION DEPT</div>
      </footer>
    </div>
  );
};

export default App;
