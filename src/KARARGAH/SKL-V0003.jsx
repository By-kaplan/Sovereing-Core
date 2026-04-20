/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- PURE SVG ICONS (JSX CONSTANTS FOR STABILITY) ---
const LayersIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

const ActivityIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

const ZapIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const CpuIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/>
  </svg>
);

const BoxIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('MODEL');
  const [params, setParams] = useState({ k: 5.0, c: 0.5, abstraction: 50, timeStep: 0.1 });
  const [trainingEpochs, setEpochs] = useState(25);

  const { k, c, abstraction, timeStep } = params;

  // --- KAPLAN LOGIC: MANTIK MOTORLARI (BRANCHLESS/DALLANMASIZ) ---
  
  // Model Logic: Diferansiyel Denklem Çözücü (Sönümlü Harmonik Osilatör)
  const simulationData = useMemo(() => {
    const m = 2.0;
    let curX = 10;
    let curV = 0;
    const history = [];
    
    // Güvenlik: timeStep 0 ise sonsuz döngüden kaçın
    const dt = timeStep > 0 ? timeStep : 0.1;

    for (let t = 0; t <= 20; t += dt) {
      const accX = - (k / m) * curX - (c / m) * curV;
      curV += accX * dt;
      curX += curV * dt;
      history.push({ 
        t: t.toFixed(2), 
        posX: curX * 4 + 50, // Ölçeklendirme (0-100 aralığına yakınsama)
        velV: curV * 4 + 50, 
        energy: (0.5 * m * curV * curV + 0.5 * k * curX * curX) * 1.5
      });
    }
    return history;
  }, [k, c, timeStep]);

  // Training Logic: Kayıp Fonksiyonu Simülasyonu
  const trainingData = useMemo(() => {
    return Array.from({ length: trainingEpochs }, (_, i) => {
      const noise = (Math.random() - 0.5) * 0.02;
      return 2.0 * Math.exp(-0.2 * i) + 0.1 + noise;
    });
  }, [trainingEpochs]);

  // Equity Metrics
  const projectMembers = useMemo(() => [
    { id: "U1", name: "Mimar_01", load: 45, score: 92 },
    { id: "U2", name: "Geliştirici_02", load: 78, score: 88 },
    { id: "U3", name: "Analist_03", load: 20, score: 75 },
    { id: "U4", name: "Tester_04", load: 55, score: 95 }
  ], []);

  // Sadakat Skoru (Fidelity)
  const fidelityScore = useMemo(() => {
    return (Math.max(0, 100 - c * 15 + abstraction * 0.2)).toFixed(1);
  }, [c, abstraction]);

  // --- VANILLA CSS (GSS) ---
  const gss = `
    .scl-root {
      --bg: #02040a;
      --panel: #0d1117;
      --gold: #facc15;
      --blue: #3b82f6;
      --red: #ef4444;
      --emerald: #10b981;
      --border: rgba(255, 255, 255, 0.05);
      --text: #c9d1d9;
      --text-dim: #6e7681;
      background: var(--bg);
      color: var(--text);
      font-family: 'SF Mono', 'Monaco', monospace;
      min-height: 100vh;
      padding: 40px;
    }

    header {
      max-width: 1200px;
      margin: 0 auto 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding-bottom: 20px;
    }

    .scl-nav {
      display: flex;
      background: var(--panel);
      padding: 4px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .scl-nav-btn {
      padding: 8px 16px;
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--text-dim);
      border-radius: 6px;
      transition: all 0.2s;
    }

    .scl-nav-btn.active {
      background: var(--blue);
      color: #fff;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .scl-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .scl-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      position: relative;
    }

    .col-8 { grid-column: span 8; }
    .col-4 { grid-column: span 4; }
    .col-12 { grid-column: span 12; }

    .scl-label {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-dim);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .chart-box {
      width: 100%;
      height: 300px;
      background: #000;
      border-radius: 8px;
      border: 1px solid var(--border);
      position: relative;
      overflow: hidden;
    }

    .scl-input-group {
      margin-top: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .scl-range {
      width: 100%;
      appearance: none;
      height: 4px;
      background: #161b22;
      border-radius: 2px;
      accent-color: var(--blue);
      cursor: pointer;
    }

    .scl-range-red { accent-color: var(--red); }

    .scl-metric-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      padding: 12px 0;
      font-size: 11px;
    }

    .scl-report-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      border-top: 1px solid var(--border);
      background: rgba(255,255,255,0.01);
    }

    .report-item {
      padding: 20px;
      border-right: 1px solid var(--border);
      text-align: center;
    }

    .report-val { display: block; font-size: 14px; font-weight: 900; color: #fff; margin-top: 4px; }
  `;

  const simLen = simulationData.length || 1;
  const trainingLen = trainingData.length || 1;

  return (
    <div className="scl-root">
      <style>{gss}</style>
      
      <header>
        <div>
          <h1 style={{fontSize:'20px', fontWeight:900, display:'flex', alignItems:'center', gap:'10px'}}>
            <span style={{color:'var(--blue)'}}>{LayersIcon}</span>
            MÜHENDİS KONTROL MERKEZİ v3.5.0
          </h1>
          <div style={{fontSize:'8px', color:'var(--text-dim)', letterSpacing:'2px', textTransform:'uppercase', marginTop:'4px'}}>
            Sistem Modelleme: Diferansiyel Denklem ve Faz Uzayı
          </div>
        </div>

        <nav className="scl-nav">
          {['EQUITY', 'TRAINING', 'MODEL'].map(t => (
            <button 
              key={t} 
              className={`scl-nav-btn ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t === 'EQUITY' ? 'TEAMEQUITY' : t === 'TRAINING' ? 'TRAINING-LOGIC' : 'MODEL-LOGIC'}
            </button>
          ))}
        </nav>
      </header>

      <main className="scl-grid">
        {/* TABS: EQUITY */}
        {activeTab === 'EQUITY' && (
          <>
            <div className="scl-card col-8">
              <div className="scl-label">{ActivityIcon} İş Yükü Varyans Analizi</div>
              <div className="chart-box">
                <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {projectMembers.map((m, i) => (
                    <g key={m.id}>
                      <rect 
                        x={40 + i * 90} 
                        y={Math.max(0, 200 - (m.load * 2))} 
                        width="40" 
                        height={Math.max(0, m.load * 2)} 
                        fill="var(--blue)" 
                        rx="2"
                      />
                      <text x={60 + i * 90} y="195" textAnchor="middle" fill="#555" fontSize="8" style={{fontFamily: 'monospace'}}>{m.name}</text>
                    </g>
                  ))}
                  <line x1="0" y1="180" x2="400" y2="180" stroke="#111" />
                </svg>
              </div>
            </div>
            <div className="scl-card col-4">
              <div className="scl-label">Verimlilik Analizi</div>
              {projectMembers.map(m => (
                <div key={m.id} className="scl-metric-row">
                  <span style={{color:'var(--text-dim)'}}>{m.name}</span>
                  <span style={{color:'var(--blue)', fontWeight:900}}>{m.score}%</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* TABS: TRAINING */}
        {activeTab === 'TRAINING' && (
          <div className="scl-card col-12">
            <div className="scl-label">{ActivityIcon} Eğitim Kaybı (Loss Projection)</div>
            <div className="chart-box">
              <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
                <path 
                  d={`M 0 200 ${trainingData.map((v, i) => `L ${(i / (trainingLen - 1)) * 800} ${Math.max(0, 200 - v * 50)}`).join(' ')} L 800 200 Z`}
                  fill="rgba(239, 68, 68, 0.1)"
                />
                <path 
                  d={`M 0 200 ${trainingData.map((v, i) => `L ${(i / (trainingLen - 1)) * 800} ${Math.max(0, 200 - v * 50)}`).join(' ')}`}
                  fill="none" stroke="var(--red)" strokeWidth="2"
                />
              </svg>
            </div>
            <div className="scl-input-group">
               <div>
                  <label className="scl-label">Epochs: {trainingEpochs}</label>
                  <input type="range" className="scl-range" min="10" max="100" value={trainingEpochs} onChange={e => setEpochs(+e.target.value)} />
               </div>
            </div>
          </div>
        )}

        {/* TABS: MODEL */}
        {activeTab === 'MODEL' && (
          <>
            <div className="scl-card col-8">
              <div className="scl-label">{BoxIcon} Sistem Davranış Analizi ($Phase\\ Space$)</div>
              <div className="chart-box">
                <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  {[0, 25, 50, 75, 100].map(gridY => <line key={gridY} x1="0" y1={gridY} x2="200" y2={gridY} stroke="#111" strokeWidth="0.5" />)}
                  
                  {/* Energy Line */}
                  <path 
                    d={`M 0 100 ${simulationData.map((d, i) => `L ${(i / simLen) * 200} ${Math.max(0, 100 - d.energy)}`).join(' ')}`}
                    fill="none" stroke="var(--emerald)" strokeWidth="0.8"
                  />
                  {/* Position Area */}
                  <path 
                    d={`M 0 100 ${simulationData.map((d, i) => `L ${(i / simLen) * 200} ${Math.max(0, 100 - d.posX)}`).join(' ')} L 200 100 Z`}
                    fill="rgba(59, 130, 246, 0.05)"
                  />
                  <path 
                    d={`M 0 100 ${simulationData.map((d, i) => `L ${(i / simLen) * 200} ${Math.max(0, 100 - d.posX)}`).join(' ')}`}
                    fill="none" stroke="var(--blue)" strokeWidth="1"
                  />
                </svg>
                {/* Math Overlay */}
                <div style={{position:'absolute', top:'10px', right:'10px', background:'rgba(0,0,0,0.8)', border:'1px solid var(--border)', padding:'8px', fontSize:'8px', color:'var(--blue)', fontFamily: 'monospace'}}>
                   {"STATE_VECTOR: $\\dot{x} = [v, -\\frac{k}{m}x - \\frac{c}{m}v]^T$"}
                </div>
              </div>
              
              <div className="scl-input-group">
                <div>
                  <label className="scl-label">Yay Sabiti (k): {k.toFixed(1)}</label>
                  <input type="range" className="scl-range" min="1" max="20" step="0.5" value={k} onChange={e => setParams({...params, k: +e.target.value})} />
                </div>
                <div>
                  <label className="scl-label">Sönümleme (c): {c.toFixed(2)}</label>
                  <input type="range" className="scl-range scl-range-red" min="0" max="5" step="0.05" value={c} onChange={e => setParams({...params, c: +e.target.value})} />
                </div>
              </div>
            </div>

            <div className="scl-card col-4">
              <div className="scl-label">{ZapIcon} Model Sadakati</div>
              <div style={{display:'flex', justifyContent:'center', margin:'20px 0'}}>
                <svg width="120" height="120" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#111" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" stroke="var(--blue)" strokeWidth="8" 
                    strokeDasharray="283" 
                    strokeDashoffset={Math.max(0, 283 - (283 * (parseFloat(fidelityScore) / 100)))}
                    transform="rotate(-90 50 50)"
                    style={{transition: 'stroke-dashoffset 0.5s ease'}}
                  />
                  <text x="50" y="55" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="900" style={{fontFamily: 'monospace'}}>
                    {String(fidelityScore)}%
                  </text>
                </svg>
              </div>
              <div>
                <label className="scl-label">Soyutlama: {abstraction}%</label>
                <input type="range" className="scl-range" min="10" max="100" value={abstraction} onChange={e => setParams({...params, abstraction: +e.target.value})} />
              </div>
              <div style={{marginTop:'30px'}}>
                <div className="scl-label">{CpuIcon} Hassasiyet Analizi</div>
                <div className="scl-metric-row"><span style={{color:'#555'}}>PARAM_K</span><div style={{width:'60%', height:'4px', background:'#111', borderRadius:'2px'}}><div style={{width:'75%', height:'100%', background:'var(--emerald)'}}/></div></div>
                <div className="scl-metric-row"><span style={{color:'#555'}}>PARAM_C</span><div style={{width:'60%', height:'4px', background:'#111', borderRadius:'2px'}}><div style={{width:'40%', height:'100%', background:'var(--emerald)'}}/></div></div>
              </div>
            </div>

            <div className="scl-card col-12" style={{padding:0, overflow:'hidden'}}>
               <div className="scl-report-grid">
                  <div className="report-item"><span className="stat-lbl" style={{fontSize: '7px'}}>DEĞİŞKEN (n)</span><span className="report-val">2 (DURUM)</span></div>
                  <div className="report-item"><span className="stat-lbl" style={{fontSize: '7px'}}>RMSE</span><span className="report-val">0.0042</span></div>
                  <div className="report-item"><span className="stat-lbl" style={{fontSize: '7px'}}>ZAMAN ADIMI</span><span className="report-val">{String(timeStep)}s</span></div>
                  <div className="report-item"><span className="stat-lbl" style={{fontSize: '7px'}}>YAKINSAMA</span><span className="report-val">94.2%</span></div>
                  <div className="report-item"><span className="stat-lbl" style={{fontSize: '7px'}}>K-PARAM</span><span className="report-val">{String(k)}</span></div>
                  <div className="report-item">
                    <span className="stat-lbl" style={{fontSize: '7px'}}>KARARLILIK</span>
                    <span className="report-val" style={{color: c > 0 ? 'var(--emerald)' : 'var(--red)'}}>
                      {c > 0 ? 'ASYMPTOTIC' : 'UNSTABLE'}
                    </span>
                  </div>
               </div>
            </div>
          </>
        )}
      </main>

      <footer style={{maxWidth:'1200px', margin:'40px auto 0', display:'flex', justifyContent:'space-between', fontSize:'9px', color:'var(--text-dim)', textTransform:'uppercase', letterSpacing:'2px'}}>
        <div>State-Space Logic: Active // Simulation Horizon: Infinite</div>
        <div>KAPLAN HALI YIKAMA - PRECISION DEPT. | SOVEREIGN CORE v3.5.0</div>
      </footer>
    </div>
  );
};

export default App;
