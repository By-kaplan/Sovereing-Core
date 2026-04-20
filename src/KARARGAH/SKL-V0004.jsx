/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- PURE SVG ICONS (SCL STANDART) ---
const Icons = {
  Layers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Activity: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Zap: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Cpu: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>,
  Binary: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><path d="M7 7h1v10H7zM11 7h1v10h-1zM15 7h1v10h-1z"/></svg>,
  Box: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
};

const App = () => {
  const [activeTab, setActiveTab] = useState('ACTIVATION');
  const [selectedFunc, setSelectedFunc] = useState('ReLU');
  const [range, setRange] = useState(5);
  const [params, setParams] = useState({ k: 5.0, c: 0.5, abstraction: 50, timeStep: 0.1 });

  // --- KAPLAN LOGIC: BRANCHLESS ACTIVATION CORE ---
  const activationCore = useMemo(() => ({
    ReLU: {
      fn: (x) => Math.max(0, x),
      deriv: (x) => +(x > 0),
      desc: "Negatif girdileri sıfırlayarak seyreklik sağlar.",
      range: "[0, ∞)", cost: "Low", zero: "No"
    },
    Sigmoid: {
      fn: (x) => 1 / (1 + Math.exp(-x)),
      deriv: (x) => { const s = 1 / (1 + Math.exp(-x)); return s * (1 - s); },
      desc: "Sinyali [0,1] aralığına sıkıştırır. Doygunluk riski yüksektir.",
      range: "[0, 1]", cost: "High", zero: "No"
    },
    Tanh: {
      fn: (x) => Math.tanh(x),
      deriv: (x) => 1 - Math.pow(Math.tanh(x), 2),
      desc: "Sıfır merkezli çıktı üretir, öğrenmeyi stabilize eder.",
      range: "[-1, 1]", cost: "High", zero: "Yes"
    },
    LeakyReLU: {
      fn: (x) => (+(x > 0) * x) + (+(x <= 0) * 0.01 * x),
      deriv: (x) => (+(x > 0) * 1) + (+(x <= 0) * 0.01),
      desc: "Negatif bölgede küçük bir eğim bırakarak ölümü engeller.",
      range: "(-∞, ∞)", cost: "Mid", zero: "Partial"
    }
  }), []);

  const chartData = useMemo(() => {
    const points = [];
    const core = activationCore[selectedFunc];
    for (let x = -range; x <= range; x += (range * 2 / 50)) {
      points.push({ x, y: core.fn(x), dy: core.deriv(x) });
    }
    return points;
  }, [selectedFunc, range, activationCore]);

  const metrics = useMemo(() => {
    const grads = chartData.map(d => d.dy);
    const satCount = grads.filter(g => Math.abs(g) < 0.01).length;
    const saturation = (satCount / chartData.length) * 100;
    const avgGrad = grads.reduce((a, b) => a + b, 0) / grads.length;
    return { saturation, avgGrad, stability: (100 - saturation * 0.7).toFixed(1) };
  }, [chartData]);

  // --- VANILLA CSS (GSS) ---
  const gss = `
    .scl-root {
      --bg: #010204;
      --panel: #0a0c10;
      --gold: #facc15;
      --blue: #3b82f6;
      --emerald: #10b981;
      --red: #f85149;
      --border: rgba(255, 255, 255, 0.05);
      --text: #c9d1d9;
      --text-dim: #484f58;
      background: var(--bg);
      color: var(--text);
      font-family: 'SF Mono', 'Monaco', monospace;
      min-height: 100vh;
      padding: 30px;
    }

    header {
      max-width: 1250px;
      margin: 0 auto 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding-bottom: 20px;
    }

    .scl-nav { display: flex; background: var(--panel); padding: 4px; border-radius: 8px; border: 1px solid var(--border); }
    .scl-nav-btn {
      padding: 10px 18px; font-size: 10px; font-weight: 900; text-transform: uppercase; cursor: pointer;
      border: none; background: transparent; color: var(--text-dim); border-radius: 6px; transition: all 0.3s;
    }
    .scl-nav-btn.active { background: var(--blue); color: #fff; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); }

    .scl-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; max-width: 1250px; margin: 0 auto; }
    .scl-card { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 24px; }
    .col-4 { grid-column: span 4; }
    .col-8 { grid-column: span 8; }
    .col-12 { grid-column: span 12; }

    .scl-label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: var(--gold); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
    
    .manifold-wrap {
      width: 100%; height: 350px; background: #000; border-radius: 8px; border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;
    }

    .scl-range { width: 100%; appearance: none; height: 4px; background: #161b22; border-radius: 2px; accent-color: var(--blue); cursor: pointer; }

    .func-btn {
      width: 100%; padding: 12px; font-size: 10px; font-weight: 900; border-radius: 6px; border: 1px solid var(--border);
      background: #111; color: var(--text-dim); cursor: pointer; transition: all 0.2s; text-align: left; margin-bottom: 8px;
    }
    .func-btn.active { border-color: var(--blue); color: #fff; background: rgba(59, 130, 246, 0.1); }

    .stat-pill { background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 12px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .stat-val { font-size: 14px; font-weight: 900; color: #fff; }
    .stat-lbl { font-size: 8px; color: var(--text-dim); text-transform: uppercase; }

    .manifold-svg { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.2)); }
    
    .report-bar { height: 160px; display: flex; align-items: flex-end; gap: 40px; padding: 20px; background: #020305; border-top: 1px solid var(--border); }
    .bar-unit { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .bar-rect { width: 100%; border-radius: 2px 2px 0 0; transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
  `;

  return (
    <div className="scl-root">
      <style>{gss}</style>
      
      <header>
        <div>
          <h1 style={{fontSize:'22px', fontWeight:900, display:'flex', alignItems:'center', gap:'12px'}}>
            <span style={{color:'var(--blue)'}}><Icons.Zap /></span>
            MÜHENDİS KONTROL MERKEZİ v3.6.0
          </h1>
          <div style={{fontSize:'9px', color:'var(--text-dim)', letterSpacing:'3px', textTransform:'uppercase', marginTop:'4px'}}>
            Non-Linear Manifold & Gradient Stability Simulator
          </div>
        </div>

        <nav className="scl-nav">
          {['ACTIVATION', 'MODEL', 'EQUITY'].map(t => (
            <button 
              key={t} className={`scl-nav-btn ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t === 'ACTIVATION' ? 'ACTIVATION-LOGIC' : t === 'MODEL' ? 'STATE-SPACE' : 'TEAM-EQUITY'}
            </button>
          ))}
        </nav>
      </header>

      <main className="scl-grid">
        {activeTab === 'ACTIVATION' && (
          <>
            <aside className="col-4 space-y-4" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              <div className="scl-card">
                <div className="scl-label"><Icons.Layers /> Fonksiyon Karakterizasyonu</div>
                {Object.keys(activationCore).map(key => (
                  <button 
                    key={key} className={`func-btn ${selectedFunc === key ? 'active' : ''}`}
                    onClick={() => setSelectedFunc(key)}
                  >
                    {key}
                  </button>
                ))}
                <div style={{marginTop:'20px'}}>
                  <label className="stat-lbl" style={{display:'block', marginBottom:'8px'}}>Giriş Aralığı: ±{range}</label>
                  <input type="range" className="scl-range" min="1" max="10" value={range} onChange={e => setRange(+e.target.value)} />
                </div>
              </div>

              <div className="scl-card">
                <div className="scl-label">Doygunluk Monitörü</div>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                  <span className="stat-lbl">Gradyan Kaybı</span>
                  <span className="stat-val" style={{fontSize:'12px'}}>{metrics.saturation.toFixed(1)}%</span>
                </div>
                <div style={{height:'6px', background:'#000', borderRadius:'3px', overflow:'hidden'}}>
                  <div style={{height:'100%', background: metrics.saturation > 40 ? 'var(--red)' : 'var(--emerald)', width: `${metrics.saturation}%`, transition:'width 0.5s'}} />
                </div>
                <p style={{fontSize:'8px', color:'var(--text-dim)', marginTop:'12px', lineHeight:'1.4'}}>
                  * Gradyanın 0.01 altına düştüğü bölge oranı. {metrics.saturation > 40 ? 'TEHLİKE: Sönümlenme riski.' : 'Dinamik akış stabil.'}
                </p>
              </div>

              <div className="scl-card space-y-4" style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                <div className="stat-pill"><span className="stat-lbl">Stabilite Skoru</span><span className="stat-val" style={{color:'var(--blue)'}}>{metrics.stability}%</span></div>
                <div className="stat-pill"><span className="stat-lbl">Ort. Gradyan</span><span className="stat-val" style={{color:'var(--emerald)'}}>{metrics.avgGrad.toFixed(3)}</span></div>
              </div>
            </aside>

            <section className="col-8 space-y-4" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              <div className="manifold-wrap">
                <svg width="400" height="300" viewBox="0 0 200 150" className="manifold-svg">
                  <defs>
                    <linearGradient id="glow" x1="0" y1="0" x2="100%" y2="0">
                      <stop offset="0%" stopColor="var(--blue)" stopOpacity="0" />
                      <stop offset="50%" stopColor="var(--blue)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--emerald)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  {Array.from({length:10}).map((_, i) => (
                    <line key={i} x1={i*20} y1="0" x2={i*20} y2="150" stroke="#111" strokeWidth="0.5" />
                  ))}
                  {/* Manifold Surface Path */}
                  <path 
                    d={`M 20 120 Q 100 ${120 - metrics.avgGrad * 100} 180 120`}
                    stroke="url(#glow)" strokeWidth="4" fill="none" strokeLinecap="round"
                  />
                  <circle cx="100" cy={120 - metrics.avgGrad * 100} r="3" fill="var(--gold)" />
                  <text x="100" y="140" textAnchor="middle" fill="#333" fontSize="5" fontWeight="900" letterSpacing="1">NON-LINEAR MANIFOLD PROJECTOR</text>
                </svg>
                <div style={{position:'absolute', top:20, right:20, fontSize:'8px', color:'var(--blue)', fontWeight:900, letterSpacing:'2px'}}>DIMENSION_DEFORM_V1.0</div>
              </div>

              <div className="scl-card" style={{height:'320px', padding:0, display:'flex', flexDirection:'column'}}>
                <div style={{padding:'20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between'}}>
                   <div className="scl-label" style={{margin:0}}><Icons.Activity /> Diferansiyel Analiz</div>
                   <div style={{fontSize:'9px', color:'var(--emerald)', fontWeight:900}}>{selectedFunc.toUpperCase()} FLOW</div>
                </div>
                <div style={{flex:1, position:'relative', padding:'20px'}}>
                  <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path 
                      d={`M 0 200 ${chartData.map((d, i) => `L ${(i/chartData.length)*400} ${200 - d.y * (100/range)}`).join(' ')} L 400 200 Z`}
                      fill="rgba(59, 130, 246, 0.05)"
                    />
                    <path 
                      d={`M 0 200 ${chartData.map((d, i) => `L ${(i/chartData.length)*400} ${200 - d.y * (100/range)}`).join(' ')}`}
                      fill="none" stroke="var(--blue)" strokeWidth="2"
                    />
                    <path 
                      d={`M 0 200 ${chartData.map((d, i) => `L ${(i/chartData.length)*400} ${200 - d.dy * 100}`).join(' ')}`}
                      fill="none" stroke="var(--emerald)" strokeWidth="1" strokeDasharray="4,2"
                    />
                  </svg>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'8px', color:'#444', marginTop:'10px'}}>
                    <span>-{range}</span><span>0</span><span>+{range}</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="scl-card col-12" style={{padding:0, overflow:'hidden'}}>
               <div className="scl-report-grid" style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', background:'rgba(255,255,255,0.01)'}}>
                  {[
                    { l: "Range", v: activationCore[selectedFunc].range },
                    { l: "Cost", v: activationCore[selectedFunc].cost },
                    { l: "Zero Centered", v: activationCore[selectedFunc].zero },
                    { l: "Max Gradient", v: Math.max(...chartData.map(d=>d.dy)).toFixed(2) },
                    { l: "Sparsity", v: "Dynamic" }
                  ].map((item, idx) => (
                    <div key={idx} className="report-item" style={{padding:'20px', borderRight:'1px solid var(--border)', textAlign:'center'}}>
                      <span className="stat-lbl">{item.l}</span>
                      <span className="report-val" style={{display:'block', marginTop:'4px', color:'#fff', fontWeight:900}}>{item.v}</span>
                    </div>
                  ))}
               </div>
            </div>
          </>
        )}

        {/* MİRAS TABS: MODEL (Basitleştirilmiş Girdi Uyumlu) */}
        {activeTab === 'MODEL' && (
          <div className="col-12 scl-card">
            <div className="scl-label"><Icons.Box /> Faz Uzayı Analizi</div>
            <div className="manifold-wrap" style={{height:'400px'}}>
              <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path 
                  d={`M 0 100 L 400 100`} stroke="#111" strokeWidth="1"
                />
                <text x="200" y="110" textAnchor="middle" fill="#222" fontSize="10" fontWeight="900">STATE_SPACE_ENGINE_ACTIVE</text>
              </svg>
            </div>
          </div>
        )}
      </main>

      <footer style={{maxWidth:'1250px', margin:'40px auto 0', display:'flex', justifyContent:'space-between', fontSize:'9px', color:'var(--text-dim)', textTransform:'uppercase', letterSpacing:'3px', borderTop:'1px solid var(--border)', paddingTop:'20px'}}>
        <div>Engine: Activation_Logic_v1.0 // Differentiation: Analytical</div>
        <div>KAPLAN HALI YIKAMA - PRECISION DEPT. | SOVEREIGN CORE v3.6.0</div>
      </footer>
    </div>
  );
};

export default App;
