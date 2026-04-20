/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo, useEffect } from 'react';

// --- LOGIC ENGINES (VANILLA JS) ---

const biasLogicEngine = {
  calculateActivation: (w, x, b, type = 'Sigmoid') => {
    const z = w * x + b;
    if (type === 'Sigmoid') return 1 / (1 + Math.exp(-z));
    if (type === 'ReLU') return Math.max(0, z);
    return z;
  },
  analyzeSaturation: (activation) => {
    if (activation < 0.05 || activation > 0.95) return { risk: 'HIGH', factor: 0.92 };
    if (activation < 0.15 || activation > 0.85) return { risk: 'MEDIUM', factor: 0.45 };
    return { risk: 'LOW', factor: 0.05 };
  },
  getDecisionBoundaryShift: (b, w) => -b / (w || 1e-10)
};

const equityEngine = {
  calculateMetrics: (members) => {
    const totalWeight = members.reduce((acc, m) => acc + m.difficultySum, 0);
    const avgWeight = totalWeight / members.length;
    return members.map(m => ({
      ...m,
      contributionScore: (((m.difficultySum / totalWeight * 0.5) + (m.peerScore / 100 * 0.3) + (m.tasks / members.reduce((a,b)=>a+b.tasks,0) * 0.2)) * 100).toFixed(2),
      imbalance: (m.difficultySum - avgWeight).toFixed(2)
    })).sort((a, b) => b.contributionScore - a.contributionScore);
  }
};

const lossLogicEngine = {
  calculateLoss: (type, yTrue, yPred) => type === 'MSE' ? Math.pow(yTrue - yPred, 2) : -(yTrue * Math.log(yPred + 1e-15) + (1 - yTrue) * Math.log(1 - yPred + 1e-15)),
  getGradient: (w, b, x, y) => {
    const pred = w * x + b;
    return { dw: -2 * x * (y - pred), db: -2 * (y - pred), norm: Math.sqrt(Math.pow(-2 * x * (y - pred), 2) + Math.pow(-2 * (y - pred), 2)) };
  }
};

// --- PURE SVG ASSETS (Manual Vector Mastery) ---
const Icons = {
  Activity: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Layers: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Target: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Cpu: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
};

const INITIAL_PROJECT_DATA = {
  members: [
    { id: "U1", name: "Mimar_01", tasks: 8, difficultySum: 45, timeSpent: 120, peerScore: 92 },
    { id: "U2", name: "Geliştirici_02", tasks: 12, difficultySum: 78, timeSpent: 210, peerScore: 88 },
    { id: "U3", name: "Analist_03", tasks: 5, difficultySum: 20, timeSpent: 60, peerScore: 75 },
    { id: "U4", name: "Tester_04", tasks: 10, difficultySum: 55, timeSpent: 150, peerScore: 95 }
  ]
};

const App = () => {
  const [activeTab, setActiveTab] = useState('EQUITY');
  const [bias, setBias] = useState(0.0);
  const [weight, setWeight] = useState(1.0);
  const [optimParams, setOptimParams] = useState({ w: 0.5, b: 0.2 });
  const [lossHistory, setLossHistory] = useState([]);

  const metrics = useMemo(() => equityEngine.calculateMetrics(INITIAL_PROJECT_DATA.members), []);

  const activationData = useMemo(() => {
    let pts = [];
    for (let x = -5; x <= 5; x += 0.2) {
      const val = biasLogicEngine.calculateActivation(weight, x, bias, 'Sigmoid');
      pts.push({ x: (x + 5) * 10, y: 100 - val * 100 });
    }
    return `M ${pts.map(p => `${p.x},${p.y}`).join(' L ')}`;
  }, [bias, weight]);

  const stepOptimization = () => {
    const grad = lossLogicEngine.getGradient(optimParams.w, optimParams.b, 1.0, 1.0);
    const newW = optimParams.w - 0.1 * grad.dw;
    const newB = optimParams.b - 0.1 * grad.db;
    const currentLoss = lossLogicEngine.calculateLoss('MSE', 1.0, newW + newB);
    
    setOptimParams({ w: newW, b: newB });
    setLossHistory(prev => [...prev.slice(-14), currentLoss]);
  };

  const currentShift = biasLogicEngine.getDecisionBoundaryShift(bias, weight);
  const saturation = biasLogicEngine.analyzeSaturation(biasLogicEngine.calculateActivation(weight, 0, bias));

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
      text-transform: uppercase;
      transition: 0.3s;
    }
    .sov-nav-btn.active { background: #0066ff; color: #fff; }

    .sov-grid { display: grid; grid-template-columns: 1fr 350px; gap: 30px; }
    .sov-panel {
      background: #0a0a0f;
      border: 1px solid #1a1a1f;
      border-radius: 20px;
      padding: 24px;
      position: relative;
    }
    .sov-panel-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #666;
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .sov-visual-box {
      height: 300px;
      background: #070707;
      border: 1px solid #111;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
    }

    .sov-range-group { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .sov-control { background: #0d0d0d; padding: 15px; border-radius: 10px; border: 1px solid #1a1a1f; }
    .sov-label { font-size: 10px; color: #555; display: flex; justify-content: space-between; margin-bottom: 10px; }
    .sov-slider { width: 100%; height: 4px; background: #1a1a1f; appearance: none; border-radius: 2px; outline: none; }
    .sov-slider::-webkit-slider-thumb { appearance: none; width: 14px; height: 14px; background: #0066ff; border-radius: 50%; cursor: pointer; }

    .sov-bar-container { height: 250px; display: flex; align-items: flex-end; gap: 20px; padding: 20px; }
    .sov-bar { flex: 1; background: #0066ff; border-radius: 4px 4px 0 0; position: relative; transition: height 0.5s ease; }
    .sov-bar-label { position: absolute; bottom: -25px; width: 100%; text-align: center; font-size: 9px; color: #444; }

    .sov-btn-optim {
      background: #8b5cf6;
      color: #fff;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      font-size: 10px;
      transition: 0.3s;
    }
    .sov-btn-optim:hover { background: #7c3aed; box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }

    .sov-footer {
      margin-top: 40px;
      border-top: 1px solid #1a1a1f;
      padding-top: 15px;
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
          <div style={{ color: '#0066ff' }}><Icons.Layers /></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', letterSpacing: '1px', color: '#fff' }}>ENGINEERING CONTROL CENTER</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#555', textTransform: 'uppercase' }}>Protocol: Analysis & Simulation v2.2</p>
          </div>
        </div>
        <nav className="sov-nav">
          {['EQUITY', 'LOSS', 'BIAS'].map(tab => (
            <button 
              key={tab} 
              className={`sov-nav-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >{tab === 'EQUITY' ? 'TEAMEQUITY' : tab + '-LOGIC'}</button>
          ))}
        </nav>
      </header>

      <main className="sov-grid">
        {activeTab === 'BIAS' && (
          <>
            <section className="sov-panel">
              <div className="sov-panel-title"><Icons.Target /> Activation Shift Visualizer</div>
              <div className="sov-visual-box">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Grid */}
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#1a1a1f" strokeWidth="0.5" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#1a1a1f" strokeWidth="0.5" />
                  {/* Sigmoid Curve */}
                  <path d={activationData} fill="none" stroke="#0066ff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  {/* Threshold */}
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                </svg>
              </div>
              <div className="sov-range-group">
                <div className="sov-control">
                  <div className="sov-label"><span>Bias (b)</span><span style={{color: '#0066ff'}}>{bias.toFixed(2)}</span></div>
                  <input type="range" className="sov-slider" min="-5" max="5" step="0.1" value={bias} onChange={(e) => setBias(parseFloat(e.target.value))} />
                </div>
                <div className="sov-control">
                  <div className="sov-label"><span>Weight (w)</span><span style={{color: '#8b5cf6'}}>{weight.toFixed(2)}</span></div>
                  <input type="range" className="sov-slider" min="0.1" max="5" step="0.1" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} />
                </div>
              </div>
            </section>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="sov-panel">
                <div className="sov-panel-title"><Icons.Layers /> Karar Hiper-Düzlemi</div>
                <div style={{ height: '140px', background: '#070707', borderRadius: '10px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <svg width="200" height="100">
                    <line x1="0" y1="50" x2="200" y2="50" stroke="#1a1a1f" />
                    <line x1="100" y1="0" x2="100" y2="100" stroke="#1a1a1f" />
                    <line 
                      x1={100 + currentShift * 15} y1="10" 
                      x2={100 + currentShift * 15} y2="90" 
                      stroke="#0066ff" strokeWidth="3" 
                      style={{ transition: '0.3s' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '8px', color: '#333' }}>PLANE_TRANSLATION_LOGIC</div>
                </div>
                <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,102,255,0.05)', borderRadius: '8px', border: '1px solid rgba(0,102,255,0.1)' }}>
                   <span style={{ fontSize: '9px', color: '#555' }}>ÖTELEME MİKTARI ($\Delta$)</span>
                   <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{currentShift.toFixed(4)}</div>
                </div>
              </div>

              <div className="sov-panel">
                <div className="sov-panel-title">Vanishing Gradient</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '10px' }}>
                  <span style={{ color: '#555' }}>Doygunluk Riski:</span>
                  <span style={{ color: saturation.risk === 'HIGH' ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>{saturation.risk}</span>
                </div>
                <div style={{ height: '4px', background: '#111', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${saturation.factor * 100}%`, height: '100%', background: saturation.risk === 'HIGH' ? '#ef4444' : '#10b981', transition: '0.5s' }}></div>
                </div>
              </div>
            </aside>
          </>
        )}

        {activeTab === 'LOSS' && (
          <>
            <section className="sov-panel">
              <div className="sov-panel-title">Loss Landscape Analysis</div>
              <div className="sov-visual-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.1 }}>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                <div style={{ textAlign: 'center', zIndex: 10 }}>
                  <div style={{ fontSize: '42px', fontWeight: '900', color: '#8b5cf6', fontFamily: 'monospace' }}>
                    L: {lossHistory.length ? lossHistory[lossHistory.length-1].toFixed(6) : '0.000000'}
                  </div>
                  <button className="sov-btn-optim" onClick={stepOptimization} style={{ marginTop: '20px' }}>CALCULATE GRADIENT</button>
                </div>
              </div>
            </section>
            <aside className="sov-panel">
               <div className="sov-panel-title">Convergence Data</div>
               <div style={{ height: '200px', width: '100%' }}>
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path 
                      d={`M 0,100 ${lossHistory.map((l, i) => `L ${(i/(lossHistory.length-1 || 1))*100},${100 - Math.min(l * 50, 100)}`).join(' ')} L 100,100 Z`} 
                      fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2" 
                    />
                  </svg>
               </div>
               <p style={{ fontSize: '9px', color: '#444', marginTop: '20px' }}>Gradyan inişi ile MSE (Mean Squared Error) minimizasyonu simüle ediliyor.</p>
            </aside>
          </>
        )}

        {activeTab === 'EQUITY' && (
          <section className="sov-panel" style={{ gridColumn: 'span 2' }}>
            <div className="sov-panel-title"><Icons.Activity /> Workload Variance Analysis</div>
            <div className="sov-bar-container">
              {metrics.map(m => (
                <div key={m.id} className="sov-bar" style={{ height: `${m.difficultySum * 2}px` }}>
                   <div style={{ position: 'absolute', top: '-25px', width: '100%', textAlign: 'center', fontSize: '10px', color: '#0066ff' }}>{m.contributionScore}%</div>
                   <div className="sov-bar-label">{m.name}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
               {metrics.map(m => (
                 <div key={m.id} className="sov-control">
                    <div style={{ fontSize: '9px', color: '#555' }}>VARYANS ($\Delta$)</div>
                    <div style={{ color: Math.abs(m.imbalance) > 15 ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>{m.imbalance}</div>
                 </div>
               ))}
            </div>
          </section>
        )}
      </main>

      <footer className="sov-footer">
        <div style={{ display: 'flex', gap: '30px' }}>
          <span>STATUS: OPERATIONAL</span>
          <span>BUILD: 10.04.2024.REV_02</span>
        </div>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: KAPLAN HALI YIKAMA PRECISION DEPT</div>
      </footer>
    </div>
  );
};

export default App;
