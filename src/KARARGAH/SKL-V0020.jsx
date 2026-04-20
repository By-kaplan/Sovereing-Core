/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo } from 'react';

// --- LOGIC ENGINES (VANILLA JS) ---

const INITIAL_PROJECT_DATA = {
  members: [
    { id: "U1", name: "Mimar_01", tasks: 8, difficultySum: 45, timeSpent: 120, peerScore: 92 },
    { id: "U2", name: "Geliştirici_02", tasks: 12, difficultySum: 78, timeSpent: 210, peerScore: 88 },
    { id: "U3", name: "Analist_03", tasks: 5, difficultySum: 20, timeSpent: 60, peerScore: 75 },
    { id: "U4", name: "Tester_04", tasks: 10, difficultySum: 55, timeSpent: 150, peerScore: 95 }
  ],
  tasks: [
    { id: "T1", title: "API Integration", weight: 8, status: "In-Progress", assignedTo: "U2", deadline: "2024-05-20" },
    { id: "T2", title: "UI Components", weight: 5, status: "Completed", assignedTo: "U1", deadline: "2024-05-15" },
    { id: "T3", title: "Loss Engine", weight: 10, status: "Blocked", assignedTo: "U2", deadline: "2024-05-25" }
  ]
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
    const dw = -2 * x * (y - pred);
    const db = -2 * (y - pred);
    return { dw, db, norm: Math.sqrt(dw * dw + db * db) };
  }
};

// --- PURE SVG ASSETS (Manual Vector Mastery) ---
const Icons = {
  Activity: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Layers: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Alert: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
};

const App = () => {
  const [activeTab, setActiveTab] = useState('EQUITY');
  const [params, setParams] = useState({ w: 0.5, b: 0.2 });
  const [history, setHistory] = useState([]);

  const metrics = useMemo(() => equityEngine.calculateMetrics(INITIAL_PROJECT_DATA.members), []);

  const stepOptimization = () => {
    const learningRate = 0.1;
    const grad = lossLogicEngine.getGradient(params.w, params.b, 1.0, 1.0);
    const newW = params.w - learningRate * grad.dw;
    const newB = params.b - learningRate * grad.db;
    const currentLoss = lossLogicEngine.calculateLoss('MSE', 1.0, newW + newB);
    
    setParams({ w: newW, b: newB });
    setHistory(prev => [...prev.slice(-14), { loss: currentLoss, gradNorm: grad.norm, iteration: prev.length + 1 }]);
  };

  // --- GSS (VANILLA CSS INTEGRITY) ---
  const gss = `
    .sov-root {
      background: #050508;
      color: #ccc;
      font-family: 'JetBrains Mono', monospace;
      min-height: 100vh;
      padding: 40px;
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
      height: 350px;
      background: #070707;
      border: 1px solid #111;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
    }

    .sov-bar-container { height: 250px; display: flex; align-items: flex-end; gap: 24px; padding: 20px 40px; }
    .sov-bar-group { flex: 1; height: 100%; display: flex; align-items: flex-end; position: relative; }
    .sov-bar { width: 100%; border-radius: 4px 4px 0 0; position: relative; transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
    .sov-bar-label { position: absolute; bottom: -30px; width: 100%; text-align: center; font-size: 10px; color: #444; }

    .sov-indicator { background: #0d0d0d; padding: 15px; border-radius: 10px; border: 1px solid #1a1a1f; margin-bottom: 12px; }
    
    .sov-btn-action {
      background: #8b5cf6;
      color: #fff;
      border: none;
      padding: 12px 24px;
      border-radius: 30px;
      font-weight: bold;
      cursor: pointer;
      font-size: 10px;
      letter-spacing: 1px;
      transition: 0.3s;
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2);
    }
    .sov-btn-action:hover { background: #7c3aed; transform: translateY(-1px); }

    .sov-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .sov-table th { text-align: left; font-size: 9px; color: #444; text-transform: uppercase; padding: 12px; border-bottom: 1px solid #1a1a1f; }
    .sov-table td { padding: 12px; border-bottom: 1px solid #0d0d0d; font-size: 11px; }

    .sov-footer {
      margin-top: 60px;
      border-top: 1px solid #1a1a1f;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #333;
    }

    @keyframes sovPulse {
      0% { transform: scale(1); opacity: 0.4; }
      50% { transform: scale(1.1); opacity: 0.1; }
      100% { transform: scale(1); opacity: 0.4; }
    }
    .sov-contour { animation: sovPulse 3s infinite ease-in-out; }
  `;

  return (
    <div className="sov-root">
      {/* lgtm[js/html-injection] */}
      <style>{gss}</style>

      <header className="sov-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ color: '#0066ff' }}><Icons.Layers /></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>ENGINEERING CONTROL CENTER</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' }}>Protocol: Performance & Optimization v2.1</p>
          </div>
        </div>
        <nav className="sov-nav">
          <button className={`sov-nav-btn ${activeTab === 'EQUITY' ? 'active' : ''}`} onClick={() => setActiveTab('EQUITY')}>TEAMEQUITY</button>
          <button className={`sov-nav-btn ${activeTab === 'LOSS' ? 'active' : ''}`} onClick={() => setActiveTab('LOSS')}>LOSS-LOGIC</button>
        </nav>
      </header>

      <main>
        {activeTab === 'EQUITY' && (
          <div className="sov-grid">
            <section className="sov-panel">
              <div className="sov-panel-title"><Icons.Activity /> Katkı ve İş Yükü Analizi</div>
              <div className="sov-bar-container">
                {metrics.map(m => (
                  <div key={m.id} className="sov-bar-group">
                    <div className="sov-bar" style={{ height: `${m.difficultySum * 3}px`, background: '#0066ff' }}>
                      <div style={{ position: 'absolute', top: '-20px', width: '100%', textAlign: 'center', fontSize: '9px', color: '#0066ff' }}>{m.difficultySum}</div>
                    </div>
                    <div className="sov-bar" style={{ height: `${m.contributionScore * 2}px`, background: '#10b981', marginLeft: '4px', opacity: 0.6 }}></div>
                    <div className="sov-bar-label">{m.name}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '50px', display: 'flex', gap: '20px', padding: '0 20px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', color: '#444' }}>
                    <div style={{ width: '8px', height: '8px', background: '#0066ff', borderRadius: '2px' }}></div> İŞ YÜKÜ
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', color: '#444' }}>
                    <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '2px' }}></div> KATKI SKORU (%)
                 </div>
              </div>
            </section>

            <aside>
              <div className="sov-panel" style={{ marginBottom: '20px' }}>
                <div className="sov-panel-title"><Icons.Alert /> Risk İndikatörleri</div>
                {metrics.map(m => (
                  <div key={m.id} className="sov-indicator">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold' }}>{m.name}</span>
                      <span style={{ fontSize: '10px', color: Math.abs(m.imbalance) > 15 ? '#ef4444' : '#10b981' }}>{m.imbalance > 0 ? '+' : ''}{m.imbalance} Δ</span>
                    </div>
                    <div style={{ height: '3px', background: '#111', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(Math.abs(m.imbalance) * 4, 100)}%`, background: Math.abs(m.imbalance) > 15 ? '#ef4444' : '#10b981' }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sov-panel" style={{ background: 'rgba(0,102,255,0.05)', borderColor: 'rgba(0,102,255,0.2)' }}>
                <span style={{ fontSize: '9px', color: '#0066ff', fontWeight: 'bold' }}>VARIATIONAL DISTRIBUTION INDEX</span>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>
                  {((metrics.reduce((a,b) => a + parseFloat(b.imbalance), 0) / metrics.length)).toFixed(4)}
                </div>
                <span style={{ fontSize: '8px', color: '#444' }}>Net Katkı Oranı ($\sigma$)</span>
              </div>
            </aside>

            <section className="sov-panel" style={{ gridColumn: 'span 2', marginTop: '10px' }}>
              <div className="sov-panel-title">Critical Path - Bottleneck Detector</div>
              <table className="sov-table">
                <thead>
                  <tr><th>Task ID</th><th>Zorluk (W)</th><th>Durum</th><th>Sorumlu</th><th style={{ textAlign: 'right' }}>Gecikme Riski</th></tr>
                </thead>
                <tbody>
                  {INITIAL_PROJECT_DATA.tasks.map(t => (
                    <tr key={t.id}>
                      <td style={{ fontWeight: 'bold', color: '#0066ff' }}>{t.id}</td>
                      <td>{t.weight}/10</td>
                      <td>
                        <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '4px', background: t.status === 'Completed' ? 'rgba(16,185,129,0.1)' : t.status === 'Blocked' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: t.status === 'Completed' ? '#10b981' : t.status === 'Blocked' ? '#ef4444' : '#f59e0b' }}>
                          {t.status}
                        </span>
                      </td>
                      <td style={{ color: '#555' }}>{t.assignedTo}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#f59e0b' }}>{(t.weight * (t.status === 'Blocked' ? 1.5 : 0.8)).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}

        {activeTab === 'LOSS' && (
          <div className="sov-grid">
            <section className="sov-panel">
              <div className="sov-panel-title"><Icons.Layers /> Loss Landscape Topology</div>
              <div className="sov-visual-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                  <defs>
                    <radialGradient id="gradLoss" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#050508" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#gradLoss)" />
                  {[40, 80, 120, 160, 200].map((r, i) => (
                    <circle key={i} cx="50%" cy="50%" r={r} fill="none" stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="5,5" className="sov-contour" style={{ animationDelay: `${i * 0.5}s` }} />
                  ))}
                </svg>
                <div style={{ zIndex: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', fontWeight: '900', color: '#8b5cf6', marginBottom: '10px' }}>
                    L: {history.length ? history[history.length-1].loss.toFixed(6) : '0.000000'}
                  </div>
                  <div style={{ fontSize: '10px', color: '#444', marginBottom: '30px' }}>
                    Point: (w: {params.w.toFixed(3)}, b: {params.b.toFixed(3)})
                  </div>
                  <button className="sov-btn-action" onClick={stepOptimization}>RUN GRADIENT STEP ($\nabla \mathcal{L}$)</button>
                </div>
              </div>
            </section>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="sov-panel">
                <div className="sov-panel-title">Yakınsama Analizi</div>
                <div style={{ height: '180px', width: '100%' }}>
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path 
                      d={`M 0,100 ${history.map((h, i) => `L ${(i/(history.length-1 || 1))*100},${100 - Math.min(h.loss * 80, 100)}`).join(' ')} L 100,100 Z`}
                      fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"
                    />
                  </svg>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
                  <div className="sov-indicator" style={{ marginBottom: 0, padding: '10px' }}>
                    <span style={{ fontSize: '8px', color: '#444', display: 'block' }}>GRADYANNORM</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#8b5cf6' }}>{history.length ? history[history.length-1].gradNorm.toFixed(4) : '0.000'}</span>
                  </div>
                  <div className="sov-indicator" style={{ marginBottom: 0, padding: '10px' }}>
                    <span style={{ fontSize: '8px', color: '#444', display: 'block' }}>ADIMSAYISI</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0066ff' }}>{history.length}</span>
                  </div>
                </div>
              </div>

              <div className="sov-panel">
                <div className="sov-panel-title">Parametre Logu</div>
                <div style={{ maxHeight: '150px', overflowY: 'auto', fontSize: '9px', color: '#555' }}>
                  {history.slice().reverse().map((h, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #111' }}>
                      <span>Iter {h.iteration}</span>
                      <span style={{ color: '#8b5cf6' }}>L: {h.loss.toFixed(6)}</span>
                      <span style={{ color: '#0066ff' }}>G: {h.gradNorm.toFixed(3)}</span>
                    </div>
                  ))}
                  {!history.length && <div style={{ textAlign: 'center', padding: '20px' }}>Log verisi bekleniyor...</div>}
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <footer className="sov-footer">
        <div style={{ display: 'flex', gap: '30px' }}>
          <span>STATUS: OPERATIONAL</span>
          <span>BUILD: 20.04.2024.ECC_v2.1</span>
        </div>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: KAPLAN HALI YIKAMA PRECISION DEPT</div>
      </footer>
    </div>
  );
};

export default App;
