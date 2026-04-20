/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo, useEffect } from 'react';

// --- CORE LOGIC: globalSyncEngine.js (Vanilla JS) ---
const globalSyncEngine = {
  calculatePropagation: (t) => {
    const lambda = 0.85;
    const saturation = (1 - Math.exp(-lambda * t)) * 100;
    return {
      lambda: lambda.toFixed(2),
      saturation: saturation.toFixed(2),
      latency: (450 / (t + 1)).toFixed(2),
      immunityScore: (saturation * 0.99).toFixed(2)
    };
  }
};

const equityEngine = {
  calculateBalance: (members) => {
    const weights = members.map(m => m.workload);
    const mean = weights.reduce((a, b) => a + b, 0) / weights.length;
    const variance = weights.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / weights.length;
    const sigma = Math.sqrt(variance);
    return {
      mean: mean.toFixed(2),
      sigma: sigma.toFixed(2),
      imbalanceAlert: sigma > 15,
      efficiencyScore: (100 - (sigma * 2)).toFixed(2)
    };
  }
};

// --- DATA SCHEMA ---
const INITIAL_DATA = {
  members: [
    { id: 1, name: "Ahmet Y.", workload: 85, tasks: 12, quality: 92, delayRisk: 5 },
    { id: 2, name: "Selin K.", workload: 40, tasks: 5, quality: 88, delayRisk: 45 },
    { id: 3, name: "Mehmet A.", workload: 78, tasks: 10, quality: 95, delayRisk: 10 },
    { id: 4, name: "Deniz B.", workload: 55, tasks: 7, quality: 80, delayRisk: 25 },
  ],
  evolution: Array.from({ length: 10 }, (_, i) => ({
    iteration: i,
    omega: (1 - 1/(i+2)),
    intelligence: Math.pow(1.3, i)
  }))
};

// --- PURE SVG ASSETS (Manual Vector Mastery) ---
const Icons = {
  Mesh: () => (
    <svg viewBox="0 0 100 100" width="32" height="32" stroke="#6366f1" fill="none" strokeWidth="2">
      <circle cx="50" cy="50" r="40" strokeDasharray="4 4" opacity="0.2" />
      <circle cx="50" cy="20" r="3" fill="#6366f1" />
      <circle cx="80" cy="50" r="3" fill="#6366f1" />
      <circle cx="50" cy="80" r="3" fill="#6366f1" />
      <circle cx="20" cy="50" r="3" fill="#6366f1" />
      <path d="M50 20 L80 50 L50 80 L20 50 Z" />
      <path d="M50 20 L50 80 M20 50 L80 50" strokeOpacity="0.5" />
    </svg>
  ),
  Globe: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Shield: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Cpu: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/>
    </svg>
  )
};

const App = () => {
  const [activeTab, setActiveTab] = useState('equity');
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prev => (prev < 12 ? prev + 0.1 : 0));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const syncStats = useMemo(() => globalSyncEngine.calculatePropagation(currentTime), [currentTime]);
  const stats = useMemo(() => equityEngine.calculateBalance(INITIAL_DATA.members), []);

  // --- GSS (VANILLA CSS INTEGRITY) ---
  const gss = `
    .sov-root {
      background: #050508;
      color: #ccc;
      font-family: 'JetBrains Mono', monospace;
      min-height: 100vh;
      padding: 40px;
      user-select: none;
    }
    .sov-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #1a1a1f;
      padding-bottom: 25px;
      margin-bottom: 30px;
    }
    .sov-nav { display: flex; background: #0d0d0d; padding: 4px; border-radius: 8px; border: 1px solid #1a1a1f; }
    .sov-nav-btn {
      padding: 8px 16px;
      background: transparent;
      border: none;
      color: #444;
      font-size: 10px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 5px;
      transition: 0.3s;
    }
    .sov-nav-btn.active { background: #6366f1; color: #fff; }

    .sov-main { display: grid; grid-template-columns: 350px 1fr; gap: 30px; }
    .sov-panel {
      background: #0a0a0f;
      border: 1px solid #1a1a1f;
      border-radius: 20px;
      padding: 24px;
      position: relative;
    }
    .sov-label { font-size: 9px; color: #555; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
    
    .sov-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px; }
    .sov-stat-card { background: #070707; padding: 15px; border-radius: 12px; border: 1px solid #111; }
    .sov-stat-val { font-size: 22px; font-weight: bold; color: #fff; display: block; }
    .sov-stat-desc { font-size: 9px; color: #444; text-transform: uppercase; }

    .sov-chart-container { height: 400px; width: 100%; position: relative; margin-top: 20px; }
    .sov-bar-group { display: flex; align-items: flex-end; gap: 20px; height: 100%; padding-bottom: 40px; }
    .sov-bar-item { flex: 1; display: flex; flex-direction: column; align-items: center; }
    .sov-bar { width: 100%; background: #6366f1; border-radius: 4px 4px 0 0; transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1); position: relative; }
    .sov-bar:hover { background: #818cf8; }

    .sov-logs { margin-top: 30px; border-top: 1px solid #111; padding-top: 20px; max-height: 150px; overflow-y: auto; }
    .sov-log-entry { border-left: 2px solid #6366f1; padding: 4px 12px; background: rgba(99,102,241,0.03); margin-bottom: 8px; font-size: 11px; color: #666; }
    
    .sov-footer {
      margin-top: 40px;
      border-top: 1px solid #1a1a1f;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #333;
    }
  `;

  return (
    <div className="sov-root">
      {/* lgtm[js/html-injection] */}
      <style>{gss}</style>

      <header className="sov-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Icons.Mesh />
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '1px', color: '#fff' }}>GEMINI MESH</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '2px' }}>v5.2.0-GLOBAL-SYNC</p>
          </div>
        </div>
        <nav className="sov-nav">
          {['equity', 'evolution', 'global'].map(tab => (
            <button 
              key={tab} 
              className={`sov-nav-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'equity' ? 'ADALET DENETİMİ' : tab === 'evolution' ? 'EVRİMSEL DÖNGÜ' : 'KÜRESEL SYNC'}
            </button>
          ))}
        </nav>
      </header>

      <main className="sov-main">
        {/* Left Stats */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section className="sov-panel">
            <div className="sov-label"><Icons.Globe /> AĞ METRİKLERİ (\Lambda)</div>
            <div className="sov-stat-grid">
              <div className="sov-stat-card">
                <span className="sov-stat-val">{syncStats.saturation}%</span>
                <span className="sov-stat-desc">Ağ Doygunluğu</span>
              </div>
              <div className="sov-stat-card">
                <span className="sov-stat-val" style={{color: '#6366f1'}}>{syncStats.latency}ms</span>
                <span className="sov-stat-desc">Yayılım Gecikmesi</span>
              </div>
            </div>
            <div style={{ marginTop: '15px', height: '4px', background: '#111', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${syncStats.saturation}%`, height: '100%', background: '#6366f1', transition: 'width 0.1s linear' }}></div>
            </div>
          </section>

          <section className="sov-panel">
            <div className="sov-label" style={{color: '#ef4444'}}><Icons.Shield /> TEHDİT İSTİHBARATI</div>
            <div className="sov-log-entry" style={{borderColor: '#ef4444'}}>
              <span style={{color: '#fff'}}>NODE_ASIA_X01:</span> VACCINE_DEPLOYED
            </div>
            <div className="sov-log-entry" style={{borderColor: '#444', opacity: 0.5}}>
              <span style={{color: '#fff'}}>NODE_EU_W04:</span> IDLE
            </div>
          </section>

          <section className="sov-panel">
            <div className="sov-label" style={{color: '#10b981'}}><Icons.Cpu /> KOLEKTİF BAĞIŞIKLIK</div>
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981' }}>{syncStats.immunityScore}%</span>
              <p style={{ margin: 0, fontSize: '9px', color: '#444' }}>SIFIRINCI GÜN TEHDİT DİRENCİ</p>
            </div>
          </section>
        </aside>

        {/* Main Content Area */}
        <section className="sov-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="sov-label">
            {activeTab === 'equity' ? 'İŞ YÜKÜ & RİSK ANALİZİ' : activeTab === 'evolution' ? 'BİLİŞSEL DOYGUNLUK SPİRALİ' : 'P2P GOSSIP YAYILIM EĞRİSİ'}
          </div>

          <div className="sov-chart-container">
            {activeTab === 'equity' && (
              <div className="sov-bar-group">
                {INITIAL_DATA.members.map(m => (
                  <div key={m.id} className="sov-bar-item">
                    <div className="sov-bar" style={{ height: `${m.workload * 3}px` }}>
                       <span style={{ position: 'absolute', top: '-20px', width: '100%', textAlign: 'center', fontSize: '10px' }}>{m.workload}%</span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#555', marginTop: '15px' }}>{m.name}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'evolution' && (
              <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none">
                <path 
                  d={`M 0,400 ${INITIAL_DATA.evolution.map((e, i) => `L ${i * 111},${400 - e.intelligence * 20}`).join(' ')}`} 
                  fill="none" stroke="#6366f1" strokeWidth="4" 
                />
                {INITIAL_DATA.evolution.map((e, i) => (
                  <circle key={i} cx={i * 111} cy={400 - e.intelligence * 20} r="6" fill="#fff" stroke="#6366f1" strokeWidth="2" />
                ))}
              </svg>
            )}

            {activeTab === 'global' && (
              <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="syncGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d={`M 0,400 Q 300,380 500,200 T 1000,0 L 1000,400 Z`} 
                  fill="url(#syncGrad)" stroke="#6366f1" strokeWidth="2" 
                />
                <line x1="0" y1="400" x2="1000" y2="400" stroke="#111" />
              </svg>
            )}
          </div>

          <div className="sov-logs">
             <div className="sov-log-entry">[09:22:15] <span style={{color: '#6366f1'}}>INFO:</span> Global yama v5.2.1 atomik olarak tüm düğümlere iletildi.</div>
             <div className="sov-log-entry">[09:22:10] <span style={{color: '#10b981'}}>AUTH:</span> BFT Konsensüsü %98.4 doğruluk oranıyla sağlandı.</div>
             <div className="sov-log-entry" style={{borderColor: '#ef4444'}}>[09:21:45] <span style={{color: '#ef4444'}}>WARN:</span> Node_NA_East_02 üzerinde anomali tespit edildi.</div>
          </div>
        </section>
      </main>

      <footer className="sov-footer">
        <div style={{ display: 'flex', gap: '30px' }}>
          <span>P2P MESH AKTİF: 1,250 DÜĞÜM</span>
          <span>SYNK KATSAYISI (\Lambda): 0.85</span>
        </div>
        <div style={{ color: '#10b981', fontWeight: 'bold' }}>KOLEKTİF SAVUNMA AKTİF // SOVEREIGN_CORE_V5.2</div>
      </footer>
    </div>
  );
};

export default App;
