/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo } from 'react';

// --- INITIAL DATA & LOGIC ENGINES (VANILLA JS) ---
const INITIAL_PROJECT_DATA = {
  appId: "ecc-tensor-008",
  members: [
    { id: "U1", name: "Mimar_01", tasks: 8, difficultySum: 45, timeSpent: 120, peerScore: 92 },
    { id: "U2", name: "Geliştirici_02", tasks: 12, difficultySum: 78, timeSpent: 210, peerScore: 88 },
    { id: "U3", name: "Analist_03", tasks: 5, difficultySum: 20, timeSpent: 60, peerScore: 75 },
    { id: "U4", name: "Tester_04", tasks: 10, difficultySum: 55, timeSpent: 150, peerScore: 95 }
  ]
};

const tensorLogicEngine = {
  calculateMatrixStats: (m, n, p, sparsity = 0.1) => {
    const totalElements = m * n + n * p + m * p;
    const flops = 2 * m * n * p;
    const memoryFP32 = (totalElements * 4) / (1024 * 1024);
    const memoryINT8 = totalElements / (1024 * 1024);
    return {
      rank: 2,
      shape: `[${m}, ${p}]`,
      n: m * p,
      flops,
      memoryFP32: memoryFP32.toFixed(2),
      memoryINT8: memoryINT8.toFixed(2),
      sparsity: (sparsity * 100).toFixed(1) + "%"
    };
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

const App = () => {
  const [activeTab, setActiveTab] = useState('TENSOR');
  const [dimM, setDimM] = useState(64);
  const [dimN, setDimN] = useState(128);
  const [dimP, setDimP] = useState(64);
  const [sparsity, setSparsity] = useState(0.2);

  const metrics = useMemo(() => equityEngine.calculateMetrics(INITIAL_PROJECT_DATA.members), []);
  const stats = useMemo(() => tensorLogicEngine.calculateMatrixStats(dimM, dimN, dimP, sparsity), [dimM, dimN, dimP, sparsity]);

  // --- GSS (VANILLA CSS INTEGRITY) ---
  const gss = `
    .sov-container {
      background: #050505;
      color: #e0e0e0;
      font-family: 'Inter', -apple-system, monospace;
      min-height: 100vh;
      padding: 40px;
      user-select: none;
    }

    .sov-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #1a1a1a;
      padding-bottom: 25px;
      margin-bottom: 30px;
    }

    .sov-title h1 { font-size: 22px; margin: 0; letter-spacing: 2px; color: #fff; }
    .sov-title p { font-size: 10px; color: #555; text-transform: uppercase; margin-top: 5px; font-style: italic; }

    .sov-tabs { display: flex; gap: 8px; background: #0d0d0d; padding: 4px; border-radius: 8px; border: 1px solid #1a1a1a; }
    .sov-tab-btn {
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
    .sov-tab-btn.active { background: #0066ff; color: #fff; box-shadow: 0 0 15px rgba(0, 102, 255, 0.3); }

    .sov-main { display: grid; grid-template-columns: 1fr 350px; gap: 30px; }
    .sov-card {
      background: #0a0a0a;
      border: 1px solid #1a1a1a;
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

    .sov-slider-group { margin-top: 20px; }
    .sov-slider {
      width: 100%;
      height: 4px;
      background: #111;
      border-radius: 2px;
      appearance: none;
      outline: none;
      margin: 15px 0;
    }
    .sov-slider::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      background: #00ffcc;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
    }

    .sov-stat-item {
      padding: 12px;
      background: #070707;
      border: 1px solid #111;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-family: monospace;
      font-size: 12px;
    }

    .sov-bar-container { height: 250px; display: flex; align-items: flex-end; gap: 20px; padding: 20px; }
    .sov-bar-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .sov-bar { width: 100%; background: #0066ff; border-radius: 4px 4px 0 0; position: relative; transition: height 0.5s ease; }
    .sov-bar:hover { background: #00ffcc; box-shadow: 0 0 20px rgba(0, 255, 204, 0.3); }

    .sov-footer {
      margin-top: 40px;
      border-top: 1px solid #111;
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #333;
      font-family: monospace;
    }
  `;

  return (
    <div className="sov-container">
      {/* lgtm[js/html-injection] */}
      <style>{gss}</style>

      <header className="sov-header">
        <div className="sov-title">
          <h1>MÜHENDİS KONTROL MERKEZİ v2.8</h1>
          <p>Sürüm: Tensör Cebri ve Paralel Hesaplama Protokolü</p>
        </div>
        <nav className="sov-tabs">
          {['EQUITY', 'LINEAR', 'TENSOR'].map(tab => (
            <button 
              key={tab} 
              className={`sov-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >{tab}-LOGIC</button>
          ))}
        </nav>
      </header>

      <main className="sov-main">
        {activeTab === 'TENSOR' && (
          <>
            <section className="sov-card">
              <div className="sov-card-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
                LINEER TRANSFORMASYON SIMÜLASYONU
              </div>
              <div style={{ background: '#070707', borderRadius: '12px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="400" height="300" viewBox="0 0 400 300">
                  <g transform="translate(50, 120) skewY(-15)">
                    <rect width={dimN/2} height={dimM/2} fill="#0066ff" fillOpacity="0.1" stroke="#0066ff" strokeWidth="1" />
                    <text x="-35" y="20" fill="#0066ff" fontSize="10" transform="skewY(15)">A[M,N]</text>
                  </g>
                  <g transform={`translate(${80 + dimN/2}, 80) skewX(-25)`}>
                    <rect width={dimP/2} height={dimN/2} fill="#ff4444" fillOpacity="0.1" stroke="#ff4444" strokeWidth="1" />
                    <text x="10" y="-10" fill="#ff4444" fontSize="10" transform="skewX(25)">B[N,P]</text>
                  </g>
                  <g transform={`translate(${80 + dimN/2}, 120) skewY(-15)`}>
                    <rect width={dimP/2} height={dimM/2} fill="#00ffcc" fillOpacity="0.3" stroke="#00ffcc" strokeWidth="2" />
                    <text x="10" y={dimM/2 + 20} fill="#00ffcc" fontSize="11" fontWeight="bold" transform="skewY(15)">C = A × B</text>
                  </g>
                  <line x1="100" y1="150" x2="160" y2="150" stroke="#333" strokeDasharray="4" />
                </svg>
              </div>
              <div className="sov-slider-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <div>
                  <label style={{fontSize: '9px', color: '#555'}}>DIM M: {dimM}</label>
                  <input type="range" className="sov-slider" min="32" max="200" value={dimM} onChange={e => setDimM(parseInt(e.target.value))} />
                </div>
                <div>
                  <label style={{fontSize: '9px', color: '#555'}}>DIM N: {dimN}</label>
                  <input type="range" className="sov-slider" min="32" max="200" value={dimN} onChange={e => setDimN(parseInt(e.target.value))} />
                </div>
                <div>
                  <label style={{fontSize: '9px', color: '#555'}}>DIM P: {dimP}</label>
                  <input type="range" className="sov-slider" min="32" max="200" value={dimP} onChange={e => setDimP(parseInt(e.target.value))} />
                </div>
              </div>
            </section>

            <aside className="sov-card">
              <div className="sov-card-title">HESAPLAMA PROFİLİ</div>
              <div className="sov-stat-item"><span>İŞLEM HACMİ</span><span style={{color: '#0066ff'}}>{(stats.flops / 1000000).toFixed(2)}M FLOPs</span></div>
              <div className="sov-stat-item"><span>FP32 BELLEK</span><span style={{color: '#fff'}}>{stats.memoryFP32} MB</span></div>
              <div className="sov-stat-item"><span>INT8 BELLEK</span><span style={{color: '#00ffcc'}}>{stats.memoryINT8} MB</span></div>
              <div className="sov-stat-item"><span>SPARSITY</span><span style={{color: '#888'}}>{stats.sparsity}</span></div>
              
              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <svg width="120" height="120" viewBox="0 0 36 36">
                  <path stroke="#111" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path stroke="#00ffcc" strokeWidth="3" fill="none" 
                    strokeDasharray={`${100 - parseFloat(stats.sparsity)}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  />
                  <text x="18" y="20.35" fontSize="6" textAnchor="middle" fill="#fff" fontWeight="bold">{100 - parseFloat(stats.sparsity)}%</text>
                  <text x="18" y="26" fontSize="3" textAnchor="middle" fill="#555">DENSE RATIO</text>
                </svg>
              </div>
            </aside>
          </>
        )}

        {activeTab === 'EQUITY' && (
          <section className="sov-card" style={{ gridColumn: 'span 2' }}>
            <div className="sov-card-title">İŞ YÜKÜ VARYANS ANALİZİ</div>
            <div className="sov-bar-container">
              {metrics.map(m => (
                <div key={m.id} className="sov-bar-item">
                  <div className="sov-bar" style={{ height: `${m.difficultySum * 2}px` }}>
                    <span style={{ position: 'absolute', top: '-25px', width: '100%', textAlign: 'center', fontSize: '10px', color: '#00ffcc' }}>{m.contributionScore}%</span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#555', transform: 'rotate(-45deg)', marginTop: '20px' }}>{m.name}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '50px', borderTop: '1px solid #111', paddingTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                {metrics.map(m => (
                  <div key={m.id} style={{ background: '#070707', padding: '15px', borderRadius: '8px', border: '1px solid #111' }}>
                    <div style={{ fontSize: '9px', color: '#555', marginBottom: '5px' }}>{m.name}</div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#0066ff' }}>{m.contributionScore}%</div>
                    <div style={{ fontSize: '8px', color: m.imbalance > 0 ? '#ff4444' : '#00ffcc', marginTop: '5px' }}>VARYANS: {m.imbalance}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'LINEAR' && (
          <section className="sov-card" style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px' }}>
            <div style={{ textAlign: 'center' }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1" strokeLinecap="round"><path d="M3 3v18h18"/><path d="M19 9l-5 5-4-4-3 3" stroke="#00ffcc" strokeWidth="2"/></svg>
              <div style={{ color: '#333', fontSize: '10px', marginTop: '10px', letterSpacing: '4px' }}>REGRESYON_MODÜLÜ_BEKLEMEDE</div>
            </div>
          </section>
        )}
      </main>

      <footer className="sov-footer">
        <div>HIZLANDIRICI: CUDA TENSOR CORES | PRECISION: BFLOAT16</div>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: KAPLAN HALI YIKAMA PRECISION DEPT</div>
      </footer>
    </div>
  );
};

export default App;
