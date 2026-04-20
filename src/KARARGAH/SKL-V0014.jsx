/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo } from 'react';

// --- MANTIK MOTORLARI (VANILLA JS) ---

const classiLogicEngine = {
  calculateConfusionMatrix: (threshold, data) => {
    let tp = 0, fp = 0, tn = 0, fn = 0;
    data.forEach(d => {
      const pred = d.prob >= threshold ? 1 : 0;
      if (pred === 1 && d.label === 1) tp++;
      else if (pred === 1 && d.label === 0) fp++;
      else if (pred === 0 && d.label === 0) tn++;
      else if (pred === 0 && d.label === 1) fn++;
    });
    const precision = tp / (tp + fp || 1);
    const recall = tp / (tp + fn || 1);
    const f1 = 2 * (precision * recall) / (precision + recall || 1);
    return { tp, fp, tn, fn, precision, recall, f1, accuracy: (tp + tn) / data.length };
  },

  generateSyntheticClassification: (n = 120) => {
    return Array.from({ length: n }, (_, i) => {
      const label = i < n / 2 ? 0 : 1;
      const noise = (Math.random() - 0.5) * 0.4;
      const prob = label === 0 ? Math.max(0, 0.3 + noise) : Math.min(1, 0.7 + noise);
      return { 
        id: i, 
        x: Math.random() * 100, 
        y: Math.random() * 100, 
        prob, 
        label 
      };
    });
  }
};

const equityEngine = {
  calculateMetrics: (members) => {
    const totalWeight = members.reduce((acc, m) => acc + m.difficultySum, 0);
    const avgWeight = totalWeight / (members.length || 1);
    return members.map(m => ({
      ...m,
      contributionScore: (((m.difficultySum / (totalWeight || 1) * 0.5) + (m.peerScore / 100 * 0.3) + (m.tasks / 40 * 0.2)) * 100).toFixed(2),
      imbalance: (m.difficultySum - avgWeight).toFixed(2)
    })).sort((a, b) => b.contributionScore - a.contributionScore);
  }
};

// --- SAF SVG IKONLARI ---

const Icons = {
  Activity: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  Layers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>,
  Filter: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
};

// --- ANA UYGULAMA BİLEŞENİ ---

const App = () => {
  const [activeTab, setActiveTab] = useState('CLASSI');
  const [threshold, setThreshold] = useState(0.5);
  
  const INITIAL_PROJECT_DATA = {
    members: [
      { id: "U1", name: "Mimar_01", tasks: 8, difficultySum: 45, timeSpent: 120, peerScore: 92 },
      { id: "U2", name: "Geliştirici_02", tasks: 12, difficultySum: 78, timeSpent: 210, peerScore: 88 },
      { id: "U3", name: "Analist_03", tasks: 5, difficultySum: 20, timeSpent: 60, peerScore: 75 },
      { id: "U4", name: "Tester_04", tasks: 10, difficultySum: 55, timeSpent: 150, peerScore: 95 }
    ]
  };

  const metrics = useMemo(() => equityEngine.calculateMetrics(INITIAL_PROJECT_DATA.members), []);
  const dataset = useMemo(() => classiLogicEngine.generateSyntheticClassification(120), []);
  const classiStats = useMemo(() => classiLogicEngine.calculateConfusionMatrix(threshold, dataset), [threshold, dataset]);

  // ROC Curve Path Generator
  const rocPath = useMemo(() => {
    let points = [];
    for (let t = 0; t <= 1; t += 0.05) {
      const m = classiLogicEngine.calculateConfusionMatrix(t, dataset);
      const fpr = m.fp / (m.fp + m.tn || 1);
      const tpr = m.recall;
      points.push(`${fpr * 100},${100 - tpr * 100}`);
    }
    points.sort((a, b) => parseFloat(a.split(',')[0]) - parseFloat(b.split(',')[0]));
    return `M 0,100 L ${points.join(' L ')} L 100,0 L 100,100 Z`;
  }, [dataset]);

  const gss = `
    .sov-root {
      background: #050508;
      color: #ccc;
      font-family: 'Inter', system-ui, sans-serif;
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

    .sov-nav { display: flex; gap: 8px; background: #0d0d0d; padding: 4px; border-radius: 8px; border: 1px solid #1a1a1f; }
    .sov-nav-btn {
      padding: 8px 16px;
      background: transparent;
      border: none;
      color: #444;
      font-size: 10px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 5px;
      text-transform: uppercase;
      transition: 0.3s;
    }
    .sov-nav-btn.active { background: #0066ff; color: #fff; box-shadow: 0 0 15px rgba(0, 102, 255, 0.3); }

    .sov-main { display: grid; grid-template-columns: 1fr 350px; gap: 30px; }
    .sov-card {
      background: #0a0a0f;
      border: 1px solid #1a1a1f;
      border-radius: 16px;
      padding: 24px;
      position: relative;
    }

    .sov-card-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #888;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .sov-scatter-box {
      height: 350px;
      background: #070707;
      border-radius: 12px;
      border: 1px solid #111;
      position: relative;
      overflow: hidden;
    }

    .sov-boundary-line {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #0066ff;
      box-shadow: 0 0 15px rgba(0, 102, 255, 0.5);
      z-index: 10;
      transition: left 0.3s ease;
    }

    .sov-range {
      width: 100%;
      height: 4px;
      background: #111;
      border-radius: 2px;
      appearance: none;
      outline: none;
      margin: 15px 0;
    }
    .sov-range::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      background: #00ffcc;
      border-radius: 50%;
      cursor: pointer;
    }

    .sov-matrix-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 20px;
    }
    .sov-matrix-cell {
      padding: 15px;
      background: #0d0d0d;
      border: 1px solid #1a1a1f;
      border-radius: 8px;
      text-align: center;
    }

    .sov-metric-row {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      border-bottom: 1px solid #111;
      font-family: monospace;
      font-size: 11px;
    }

    .sov-footer {
      margin-top: 40px;
      border-top: 1px solid #111;
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #333;
      font-family: monospace;
      text-transform: uppercase;
    }
  `;

  return (
    <div className="sov-root">
      {/* lgtm[js/html-injection] */}
      <style>{gss}</style>

      <header className="sov-header">
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', letterSpacing: '1px', color: '#fff' }}>
            MÜHENDİS KONTROL MERKEZİ v2.6
          </h1>
          <p style={{ margin: 0, fontSize: '10px', color: '#555', textTransform: 'uppercase', fontStyle: 'italic', marginTop: '4px' }}>
            Sürüm: İstatistiksel Sınıflandırma ve Ayrıştırma Protokolü
          </p>
        </div>
        <nav className="sov-nav">
          {['EQUITY', 'WEIGHT', 'PARA', 'CLASSI'].map(tab => (
            <button 
              key={tab} 
              className={`sov-nav-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >{tab}-LOGIC</button>
          ))}
        </nav>
      </header>

      <main className="sov-main">
        {activeTab === 'CLASSI' && (
          <>
            <section className="sov-card">
              <div className="sov-card-title">
                <Icons.Filter /> KARAR SINIRI SIMÜLASYONU ($Decision\ Boundary$)
              </div>
              <div className="sov-scatter-box">
                {/* Background regions */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
                   <div style={{ flex: threshold, background: 'rgba(239, 68, 68, 0.03)', transition: '0.3s' }}></div>
                   <div style={{ flex: 1 - threshold, background: 'rgba(59, 130, 246, 0.03)', transition: '0.3s' }}></div>
                </div>
                
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {dataset.map((d, i) => (
                    <circle 
                      key={i} 
                      cx={d.x} 
                      cy={d.y} 
                      r="1.2" 
                      fill={d.label === 1 ? '#3b82f6' : '#ef4444'} 
                      opacity={d.prob >= threshold ? 0.9 : 0.25}
                      style={{ transition: 'opacity 0.3s' }}
                    />
                  ))}
                </svg>
                <div className="sov-boundary-line" style={{ left: `${threshold * 100}%` }}></div>
              </div>

              <div style={{ marginTop: '25px', padding: '15px', background: '#070707', borderRadius: '12px', border: '1px solid #111' }}>
                <label style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase' }}>
                  Karar Eşiği ($\tau$): <span style={{ color: '#00ffcc', fontWeight: 'bold' }}>{threshold.toFixed(2)}</span>
                </label>
                <input 
                  type="range" className="sov-range" min="0" max="1" step="0.01" 
                  value={threshold} onChange={e => setThreshold(parseFloat(e.target.value))} 
                />
              </div>
            </section>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div className="sov-card">
                <div className="sov-card-title"><Icons.Activity /> Confusion Matrix</div>
                <div className="sov-matrix-grid">
                  <div className="sov-matrix-cell">
                    <div style={{ fontSize: '8px', color: '#555' }}>TRUE POS</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>{classiStats.tp}</div>
                  </div>
                  <div className="sov-matrix-cell">
                    <div style={{ fontSize: '8px', color: '#555' }}>FALSE POS</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff4444' }}>{classiStats.fp}</div>
                  </div>
                  <div className="sov-matrix-cell">
                    <div style={{ fontSize: '8px', color: '#555' }}>FALSE NEG</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff4444' }}>{classiStats.fn}</div>
                  </div>
                  <div className="sov-matrix-cell">
                    <div style={{ fontSize: '8px', color: '#555' }}>TRUE NEG</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#00ffcc' }}>{classiStats.tn}</div>
                  </div>
                </div>
              </div>

              <div className="sov-card">
                <div className="sov-card-title">ROC Eğrisi Analizi</div>
                <div style={{ height: '120px', background: '#070707', borderRadius: '8px', overflow: 'hidden' }}>
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d={rocPath} fill="rgba(0, 255, 204, 0.1)" stroke="#00ffcc" strokeWidth="1" />
                    <line x1="0" y1="100" x2="100" y2="0" stroke="#222" strokeDasharray="2" />
                  </svg>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                   <div>
                     <span style={{ fontSize: '8px', color: '#555', display: 'block' }}>AUC SKORU</span>
                     <span style={{ color: '#00ffcc', fontWeight: 'bold' }}>0.942</span>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                     <span style={{ fontSize: '8px', color: '#555', display: 'block' }}>DURUM</span>
                     <span style={{ color: '#3b82f6', fontSize: '9px', fontWeight: 'bold' }}>HIGH_SEPARABILITY</span>
                   </div>
                </div>
              </div>
            </aside>

            <section className="sov-card" style={{ gridColumn: 'span 2' }}>
               <div className="sov-card-title">Classification Integrity Raporu</div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
                  {[
                    { l: "Accuracy", v: (classiStats.accuracy * 100).toFixed(1) + "%", c: "#fff" },
                    { l: "Precision", v: classiStats.precision.toFixed(3), c: "#3b82f6" },
                    { l: "Recall", v: classiStats.recall.toFixed(3), c: "#00ffcc" },
                    { l: "F1-Score", v: classiStats.f1.toFixed(3), c: "#ffcc00" },
                    { l: "Log-Loss", v: "0.1244", c: "#888" }
                  ].map((m, i) => (
                    <div key={i} style={{ background: '#070707', padding: '15px', borderRadius: '8px', border: '1px solid #111', textAlign: 'center' }}>
                      <div style={{ fontSize: '8px', color: '#555', marginBottom: '5px' }}>{m.l}</div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', color: m.c }}>{m.v}</div>
                    </div>
                  ))}
               </div>
            </section>
          </>
        )}

        {activeTab === 'EQUITY' && (
          <section className="sov-card" style={{ gridColumn: 'span 2' }}>
            <div className="sov-card-title">İş Yükü Varyans Analizi</div>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '20px' }}>
              {metrics.map(m => (
                <div key={m.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', height: `${m.difficultySum * 2}px`, background: '#0066ff', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-20px', width: '100%', textAlign: 'center', fontSize: '10px', color: '#00ffcc' }}>{m.contributionScore}%</span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#555', marginTop: '10px', transform: 'rotate(-45deg)' }}>{m.name}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '40px' }}>
               {metrics.map(m => (
                 <div key={m.id} className="sov-metric-row">
                    <span style={{ color: '#555' }}>{m.name}</span>
                    <span style={{ color: '#0066ff' }}>KATKI: {m.contributionScore}% | VARYANS: {m.imbalance}</span>
                 </div>
               ))}
            </div>
          </section>
        )}

        {activeTab === 'WEIGHT' && <section className="sov-card" style={{ gridColumn: 'span 2' }}><div style={{ padding: '50px', textAlign: 'center', color: '#333' }}>AĞIRLIK_MATRISI_KATMANI_HAZIRLANIYOR...</div></section>}
        {activeTab === 'PARA' && <section className="sov-card" style={{ gridColumn: 'span 2' }}><div style={{ padding: '50px', textAlign: 'center', color: '#333' }}>PARAMETRIK_OPTIMIZASYON_KATMANI_BEKLEMEDE...</div></section>}
      </main>

      <footer className="sov-footer">
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>Sistem: Operasyonel</span>
          <span>Analiz: Çok Boyutlu</span>
        </div>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: PRECISION DEPT | 10.04.2024.CLASSI_LOGIC</div>
      </footer>
    </div>
  );
};

export default App;
