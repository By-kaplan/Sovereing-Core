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
  Box: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  Career: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Shield: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Alert: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
};

const App = () => {
  const [activeTab, setActiveTab] = useState('ACTIVATION');
  const [selectedFunc, setSelectedFunc] = useState('ReLU');
  const [range, setRange] = useState(5);
  const [overfitEpoch, setOverfitEpoch] = useState(60);
  const [overfitConfig, setOverfitConfig] = useState({ complexity: 5, lambda: 0.1, noise: 0.5 });
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

  // --- OVERFIT LOGIC ENGINE (BRANCHLESS/MASKED) ---
  const overfitResult = useMemo(() => {
    const { complexity, lambda, noise } = overfitConfig;
    const learningCurve = [];
    const overfitPt = Math.max(20, Math.floor(100 - (complexity * 5)));
    
    for (let i = 0; i <= overfitEpoch; i++) {
      const trainLoss = (100 / (i + 5)) + (Math.random() * 0.5);
      const overfitMask = +(i >= overfitPt);
      
      const normalVal = (110 / (i + 5)) + (Math.random() * 1.5) + (noise * 2);
      const gapFactor = (i - overfitPt) * (complexity * 0.05) / (lambda + 0.1);
      const overfitVal = (110 / (overfitPt + 5)) + gapFactor + (Math.random() * 2);
      
      const valLoss = (1 - overfitMask) * normalVal + overfitMask * overfitVal;
      learningCurve.push({ t: i, train: trainLoss, val: valLoss, gap: Math.abs(valLoss - trainLoss) });
    }
    
    const curr = learningCurve[learningCurve.length - 1];
    return {
      learningCurve,
      gap: curr.gap.toFixed(3),
      integrity: Math.max(0, 100 - (curr.gap * 5)).toFixed(1),
      variance: (curr.gap * complexity * 2).toFixed(1),
      overfitPt
    };
  }, [overfitConfig, overfitEpoch]);

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
      background: var(--bg); color: var(--text);
      font-family: 'SF Mono', 'Monaco', monospace; min-height: 100vh; padding: 30px;
    }

    header { max-width: 1250px; margin: 0 auto 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 20px; }
    .scl-nav { display: flex; background: var(--panel); padding: 4px; border-radius: 8px; border: 1px solid var(--border); }
    .scl-nav-btn { padding: 10px 18px; font-size: 10px; font-weight: 900; text-transform: uppercase; cursor: pointer; border: none; background: transparent; color: var(--text-dim); border-radius: 6px; transition: all 0.3s; }
    .scl-nav-btn.active { background: var(--blue); color: #fff; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); }

    .scl-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; max-width: 1250px; margin: 0 auto; }
    .scl-card { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 24px; position: relative; }
    .col-4 { grid-column: span 4; } .col-8 { grid-column: span 8; } .col-12 { grid-column: span 12; }

    .scl-label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: var(--gold); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
    .manifold-wrap { width: 100%; height: 350px; background: #000; border-radius: 8px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
    .scl-range { width: 100%; appearance: none; height: 4px; background: #161b22; border-radius: 2px; accent-color: var(--blue); cursor: pointer; }
    
    .stat-pill { background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 12px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .stat-val { font-size: 14px; font-weight: 900; color: #fff; }
    .stat-lbl { font-size: 8px; color: var(--text-dim); text-transform: uppercase; }

    .curve-path { transition: d 0.5s ease; }
    .dot { transition: all 0.3s; }
    .dot:hover { r: 5; fill: var(--gold); }
  `;

  return (
    <div className="scl-root">
      <style>{gss}</style>
      
      <header>
        <div>
          <h1 style={{fontSize:'22px', fontWeight:900, display:'flex', alignItems:'center', gap:'12px'}}>
            <span style={{color:'var(--blue)'}}><Icons.Zap /></span>
            MÜHENDİS KONTROL MERKEZİ v4.2.0
          </h1>
          <div style={{fontSize:'9px', color:'var(--text-dim)', letterSpacing:'3px', textTransform:'uppercase', marginTop:'4px'}}>
            Bias-Variance & Generalization Integrity Monitor
          </div>
        </div>

        <nav className="scl-nav">
          {['ACTIVATION', 'MODEL', 'OVERFIT', 'CAREER'].map(t => (
            <button 
              key={t} className={`scl-nav-btn ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main className="scl-grid">
        {activeTab === 'OVERFIT' && (
          <>
            <aside className="col-4 space-y-4" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              <div className="scl-card">
                <div className="scl-label"><Icons.Settings /> Kapasite Denetimi</div>
                <div className="space-y-6" style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                   <div>
                    <label className="stat-lbl">Epok: {overfitEpoch}</label>
                    <input type="range" className="scl-range" min="10" max="150" value={overfitEpoch} onChange={e => setOverfitEpoch(+e.target.value)} />
                   </div>
                   <div>
                    <label className="stat-lbl">Karmaşıklık: {overfitConfig.complexity}</label>
                    <input type="range" className="scl-range" min="1" max="15" value={overfitConfig.complexity} onChange={e => setOverfitConfig({...overfitConfig, complexity: +e.target.value})} />
                   </div>
                   <div>
                    <label className="stat-lbl">Regülarizasyon (λ): {overfitConfig.lambda}</label>
                    <input type="range" className="scl-range" min="0" max="1" step="0.1" value={overfitConfig.lambda} onChange={e => setOverfitConfig({...overfitConfig, lambda: +e.target.value})} />
                   </div>
                </div>
              </div>

              <div className="scl-card">
                <div className="scl-label">Genelleme Analizi</div>
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                  <div className="stat-pill"><span className="stat-lbl">Bütünlük</span><span className="stat-val" style={{color: overfitResult.integrity > 70 ? 'var(--emerald)' : 'var(--red)'}}>{overfitResult.integrity}%</span></div>
                  <div className="stat-pill"><span className="stat-lbl">Varyans</span><span className="stat-val" style={{color:'var(--gold)'}}>{overfitResult.variance}</span></div>
                </div>
              </div>

              <div className="scl-card" style={{display:'flex', alignItems:'center', gap:'15px'}}>
                <div style={{color: overfitEpoch > overfitResult.overfitPt ? 'var(--red)' : 'var(--emerald)'}}>
                  {overfitEpoch > overfitResult.overfitPt ? <Icons.Alert /> : <Icons.Shield />}
                </div>
                <div style={{fontSize:'9px', color:'var(--text-dim)', lineHeight:'1.4'}}>
                  {overfitEpoch > overfitResult.overfitPt ? "DİKKAT: Ezberleme fazı aktif. Model gürültüye odaklanıyor." : "STABİL: Model genelleme kapasitesini koruyor."}
                </div>
              </div>
            </aside>

            <section className="col-8 space-y-4" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              <div className="manifold-wrap">
                <svg width="100%" height="100%" viewBox="0 0 400 300" className="manifold-svg">
                  <path d="M 40 260 L 360 260" stroke="#111" strokeWidth="1" />
                  <path d="M 40 40 L 40 260" stroke="#111" strokeWidth="1" />
                  {/* Grid */}
                  {Array.from({length:5}).map((_, i) => <line key={i} x1="40" y1={40 + i*55} x2="360" y2={40 + i*55} stroke="#080808" strokeWidth="0.5" />)}
                  
                  {/* Training Loss Path (Emerald) */}
                  <path 
                    d={`M 40 ${260 - overfitResult.learningCurve[0].train * 2} ${overfitResult.learningCurve.map((p, i) => `L ${40 + (i/overfitEpoch)*320} ${260 - p.train * 2}`).join(' ')}`}
                    fill="none" stroke="var(--emerald)" strokeWidth="2"
                  />
                  {/* Val Loss Path (Red) */}
                  <path 
                    d={`M 40 ${260 - overfitResult.learningCurve[0].val * 2} ${overfitResult.learningCurve.map((p, i) => `L ${40 + (i/overfitEpoch)*320} ${260 - p.val * 2}`).join(' ')}`}
                    fill="none" stroke="var(--red)" strokeWidth="2"
                  />
                  {/* Overfit Point Marker */}
                  <line x1={40 + (overfitResult.overfitPt/overfitEpoch)*320} y1="40" x2={40 + (overfitResult.overfitPt/overfitEpoch)*320} y2="260" stroke="var(--gold)" strokeWidth="1" strokeDasharray="4,4" />
                  <text x={45 + (overfitResult.overfitPt/overfitEpoch)*320} y="50" fill="var(--gold)" fontSize="7" fontWeight="900">BREAKPOINT: EPOK {overfitResult.overfitPt}</text>
                  
                  <text x="360" y="275" textAnchor="end" fill="var(--text-dim)" fontSize="7">EPOK (t)</text>
                  <text x="35" y="45" textAnchor="end" fill="var(--text-dim)" fontSize="7" transform="rotate(-90 35 45)">LOSS (L)</text>
                </svg>
                <div style={{position:'absolute', bottom:20, left:20, display:'flex', gap:'20px'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'5px'}}><div style={{width:8, height:2, background:'var(--emerald)'}}/><span style={{fontSize:'7px', color:'var(--text-dim)'}}>TRAIN_LOSS</span></div>
                  <div style={{display:'flex', alignItems:'center', gap:'5px'}}><div style={{width:8, height:2, background:'var(--red)'}}/><span style={{fontSize:'7px', color:'var(--text-dim)'}}>VAL_LOSS</span></div>
                </div>
              </div>

              <div className="scl-card" style={{height:'320px', padding:0, display:'flex', flexDirection:'column'}}>
                <div style={{padding:'20px', borderBottom:'1px solid var(--border)'}}><div className="scl-label" style={{margin:0}}><Icons.Binary /> Gürültü Ezber Haritası</div></div>
                <div style={{flex:1, position:'relative'}}>
                  <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {overfitResult.learningCurve.filter((_,i)=>i%4===0).map((p, i) => (
                      <circle 
                        key={i} 
                        cx={(p.t/overfitEpoch)*400} 
                        cy={200 - p.gap * 4} 
                        r="3" 
                        fill={p.t > overfitResult.overfitPt ? 'var(--red)' : 'var(--blue)'} 
                        opacity="0.6"
                        className="dot"
                      />
                    ))}
                  </svg>
                  <div style={{position:'absolute', bottom:10, right:10, fontSize:'7px', color:'var(--text-dim)'}}>$\Delta$ ERROR GAP PROJECTION</div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* MİRAS TABS: ACTIVATION / CAREER / MODEL (Korundu) */}
        {activeTab === 'ACTIVATION' && (
          <>
            <aside className="col-4 space-y-4" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              <div className="scl-card">
                <div className="scl-label"><Icons.Layers /> Fonksiyon Karakterizasyonu</div>
                {Object.keys(activationCore).map(key => (
                  <button key={key} className={`func-btn ${selectedFunc === key ? 'active' : ''}`} onClick={() => setSelectedFunc(key)}>{key}</button>
                ))}
                <div style={{marginTop:'20px'}}>
                  <label className="stat-lbl">Giriş Aralığı: ±{range}</label>
                  <input type="range" className="scl-range" min="1" max="10" value={range} onChange={e => setRange(+e.target.value)} />
                </div>
              </div>
              <div className="scl-card">
                <div className="scl-label">Doygunluk Monitörü</div>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}><span className="stat-lbl">Gradyan Kaybı</span><span className="stat-val">{metrics.saturation.toFixed(1)}%</span></div>
                <div style={{height:'6px', background:'#000', borderRadius:'3px', overflow:'hidden'}}><div style={{height:'100%', background: metrics.saturation > 40 ? 'var(--red)' : 'var(--emerald)', width: `${metrics.saturation}%`}} /></div>
              </div>
            </aside>
            <section className="col-8 space-y-4" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              <div className="manifold-wrap">
                <svg width="400" height="300" viewBox="0 0 200 150" className="manifold-svg">
                  <path d={`M 20 120 Q 100 ${120 - metrics.avgGrad * 100} 180 120`} stroke="var(--blue)" strokeWidth="4" fill="none" />
                  <circle cx="100" cy={120 - metrics.avgGrad * 100} r="3" fill="var(--gold)" />
                </svg>
              </div>
              <div className="scl-card" style={{height:'320px', padding:0, display:'flex', flexDirection:'column'}}>
                <div style={{padding:'20px', borderBottom:'1px solid var(--border)'}}><div className="scl-label" style={{margin:0}}><Icons.Activity /> Diferansiyel Analiz</div></div>
                <div style={{flex:1, position:'relative'}}>
                  <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path d={`M 0 200 ${chartData.map((d, i) => `L ${(i/chartData.length)*400} ${200 - d.y * (100/range)}`).join(' ')} L 400 200 Z`} fill="rgba(59, 130, 246, 0.05)" />
                    <path d={`M 0 200 ${chartData.map((d, i) => `L ${(i/chartData.length)*400} ${200 - d.y * (100/range)}`).join(' ')}`} fill="none" stroke="var(--blue)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'CAREER' && (
          <section className="col-12 scl-card">
            <div className="scl-label"><Icons.Career /> Algoritmik Eşleşen Pozisyonlar</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'20px'}}>
              {processedJobs.map(job => (
                <div key={job.id} className="scl-card" style={{borderLeft:'4px solid var(--blue)'}}>
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div><h3 style={{fontWeight:900}}>{job.role}</h3><p style={{fontSize:'10px', color:'var(--blue)'}}>{job.comp}</p></div>
                    <div style={{fontSize:'18px', fontWeight:900}}>%{job.eligibility}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'MODEL' && (
          <div className="col-12 scl-card">
            <div className="scl-label"><Icons.Box /> Faz Uzayı Analizi</div>
            <div className="manifold-wrap" style={{height:'400px'}}>
              <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                <line x1="0" y1="100" x2="400" y2="100" stroke="#111" strokeWidth="1" />
                <text x="200" y="110" textAnchor="middle" fill="#222" fontSize="10" fontWeight="900">STATE_SPACE_ENGINE_ACTIVE</text>
              </svg>
            </div>
          </div>
        )}
      </main>

      <footer style={{maxWidth:'1250px', margin:'40px auto 0', display:'flex', justifyContent:'space-between', fontSize:'9px', color:'var(--text-dim)', textTransform:'uppercase', letterSpacing:'3px', borderTop:'1px solid var(--border)', paddingTop:'20px'}}>
        <div>Engine: Overfit_Logic_v1.2 // Logic: Branchless</div>
        <div>KAPLAN HALI YIKAMA - PRECISION DEPT. | SOVEREIGN CORE v4.2.0</div>
      </footer>
    </div>
  );
};

export default App;
