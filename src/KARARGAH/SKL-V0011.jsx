/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo } from 'react';

const App = () => {
  const [config, setConfig] = useState({
    learningRate: 0.01,
    momentum: 0.9,
    scheduler: 'None',
    iterations: 60,
    batchSize: 32
  });

  // --- ANALYTICS ENGINE (VANILLA JS) ---
  const dynamics = useMemo(() => {
    const { learningRate, momentum, scheduler, iterations, batchSize } = config;
    const convergenceData = [];
    let currentW = 10.0;
    let velocity = 0;
    let currentLR = learningRate;
    let diverged = false;

    for (let i = 0; i <= iterations; i++) {
      const gradient = 2 * currentW;
      const noise = (Math.random() - 0.5) * (1 / Math.sqrt(batchSize));
      const effectiveGradient = gradient + noise;

      velocity = momentum * velocity - currentLR * effectiveGradient;
      currentW += velocity;

      if (scheduler === 'Exponential') currentLR *= 0.98;
      else if (scheduler === 'Step') if (i % 20 === 0 && i > 0) currentLR *= 0.5;

      const loss = Math.pow(currentW, 2);
      if (loss > 1000 || isNaN(loss)) { diverged = true; break; }

      convergenceData.push({ x: i, y: loss });
    }

    const lrFinderData = [];
    for (let j = -5; j <= 0; j += 0.25) {
      const lr = Math.pow(10, j);
      const simulatedLoss = Math.max(0.1, 10 - (lr * 100) + Math.pow(lr * 150, 2));
      lrFinderData.push({ x: j, y: simulatedLoss });
    }

    const lastLoss = convergenceData[convergenceData.length - 1]?.y || 0;
    const stabilityIndex = diverged ? 0 : Math.max(0, 100 - (lastLoss * 10)).toFixed(2);
    const convergenceSpeed = diverged ? 0 : (1 / (convergenceData.length / 10)).toFixed(2);

    return { convergenceData, lrFinderData, stabilityIndex, convergenceSpeed, diverged };
  }, [config]);

  // --- GSS (VANILLA CSS INTEGRITY) ---
  const gss = `
    .sov-root {
      background: #050505;
      color: #ccc;
      font-family: 'Inter', system-ui, sans-serif;
      min-height: 100vh;
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 30px;
      user-select: none;
    }

    .sov-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #1a1a1a;
      padding-bottom: 20px;
    }

    .sov-title-group { display: flex; align-items: center; gap: 15px; }
    .sov-icon-box { 
      background: #111; 
      padding: 12px; 
      border-radius: 12px; 
      border: 1px solid #222; 
      box-shadow: 0 0 20px rgba(0,255,204,0.1);
    }

    .sov-grid {
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: 30px;
    }

    .sov-card {
      background: #0a0a0a;
      border: 1px solid #1a1a1a;
      border-radius: 20px;
      padding: 25px;
      position: relative;
    }

    .sov-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #666;
      margin-bottom: 20px;
      display: block;
    }

    .sov-input-group { margin-bottom: 25px; }
    .sov-range {
      width: 100%;
      height: 4px;
      background: #1a1a1a;
      border-radius: 2px;
      appearance: none;
      outline: none;
      margin-top: 10px;
    }
    .sov-range::-webkit-slider-thumb {
      appearance: none;
      width: 14px;
      height: 14px;
      background: #00ffcc;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 10px #00ffcc;
    }

    .sov-stat-row {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background: #0d0d0d;
      border-radius: 8px;
      margin-top: 10px;
      border: 1px solid #111;
    }

    .sov-btn-group { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
    .sov-btn {
      background: #111;
      border: 1px solid #222;
      color: #555;
      padding: 8px;
      font-size: 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.2s;
    }
    .sov-btn.active {
      border-color: #00ffcc;
      color: #00ffcc;
      background: rgba(0,255,204,0.05);
    }

    .sov-visualizer {
      height: 400px;
      background: radial-gradient(circle at center, #111 0%, #050505 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .sov-chart-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .sov-badge {
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: bold;
    }
  `;

  // --- SVG CHART GENERATORS ---
  const generatePath = (data, width, height) => {
    if (!data.length) return "";
    const minX = Math.min(...data.map(d => d.x));
    const maxX = Math.max(...data.map(d => d.x));
    const minY = 0;
    const maxY = Math.max(...data.map(d => d.y), 1);

    return data.map((d, i) => {
      const x = ((d.x - minX) / (maxX - minX)) * width;
      const y = height - ((d.y - minY) / (maxY - minY)) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(" ");
  };

  const valleyPath = "M 50,50 Q 200,350 350,50";

  return (
    <div className="sov-root">
      {/* lgtm[js/html-injection] */}
      <style>{gss}</style>

      <header className="sov-header">
        <div className="sov-title-group">
          <div className="sov-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', letterSpacing: '2px', color: '#fff' }}>RATE-LOGIC AI</h1>
            <span style={{ fontSize: '10px', color: '#555', fontFamily: 'monospace' }}>SOVEREIGN_CORE_PRECISION_V1.1</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="sov-stat-row" style={{ minWidth: '120px' }}>
            <span style={{ fontSize: '10px' }}>STABILITY</span>
            <span style={{ color: dynamics.diverged ? '#ff4444' : '#00ffcc', fontWeight: 'bold' }}>{dynamics.stabilityIndex}%</span>
          </div>
          <div className="sov-stat-row" style={{ minWidth: '120px' }}>
            <span style={{ fontSize: '10px' }}>SPEED</span>
            <span style={{ color: '#0066ff', fontWeight: 'bold' }}>{dynamics.convergenceSpeed}x</span>
          </div>
        </div>
      </header>

      <div className="sov-grid">
        <aside className="sov-card">
          <span className="sov-label">Control Panel</span>
          
          <div className="sov-input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span>Learning Rate (η)</span>
              <span style={{ color: '#00ffcc' }}>{config.learningRate}</span>
            </div>
            <input 
              type="range" className="sov-range" min="0.001" max="0.5" step="0.001" 
              value={config.learningRate} onChange={(e) => setConfig({...config, learningRate: parseFloat(e.target.value)})} 
            />
          </div>

          <div className="sov-input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span>Momentum (γ)</span>
              <span style={{ color: '#0066ff' }}>{config.momentum}</span>
            </div>
            <input 
              type="range" className="sov-range" min="0" max="0.99" step="0.01" 
              value={config.momentum} onChange={(e) => setConfig({...config, momentum: parseFloat(e.target.value)})} 
            />
          </div>

          <div className="sov-input-group">
            <span style={{ fontSize: '11px', display: 'block', marginBottom: '10px' }}>Scheduler</span>
            <div className="sov-btn-group">
              {['None', 'Exponential', 'Step'].map(s => (
                <button 
                  key={s} className={`sov-btn ${config.scheduler === s ? 'active' : ''}`}
                  onClick={() => setConfig({...config, scheduler: s})}
                >{s}</button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '15px', border: '1px solid #1a1a1a', borderRadius: '12px', background: '#070707' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={dynamics.diverged ? "#ff4444" : "#00ffcc"} strokeWidth="2">
                  {dynamics.diverged ? (
                    <g>
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v4"/>
                      <path d="M12 16h.01"/>
                    </g>
                  ) : (
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  )}
                </svg>
                <span style={{ fontSize: '10px', color: dynamics.diverged ? '#ff4444' : '#888' }}>
                  {dynamics.diverged ? "CRITICAL: DIVERGENCE DETECTED" : "SYSTEM: OPTIMAL STABILITY"}
                </span>
             </div>
          </div>
        </aside>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="sov-card sov-visualizer">
            <svg width="400" height="300" viewBox="0 0 400 300">
              <path d={valleyPath} fill="none" stroke="#222" strokeWidth="4" strokeDasharray="5 5" />
              <circle cx="200" cy="225" r="8" fill="none" stroke="#00ffcc" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
              </circle>
              
              <g>
                <circle r="8" fill={dynamics.diverged ? "#ff4444" : "#00ffcc"}>
                  <animateMotion 
                    dur={dynamics.diverged ? "0.8s" : "3s"} 
                    repeatCount="indefinite" 
                    path={valleyPath}
                    keyPoints={dynamics.diverged ? "0.5;0.8;0.3;0.9" : "0;0.5;0.8;0.95;1"}
                    keyTimes="0;0.3;0.6;1"
                  />
                </circle>
              </g>
            </svg>
            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
               <span className="sov-badge" style={{ 
                 background: dynamics.diverged ? 'rgba(255,68,68,0.1)' : 'rgba(0,255,204,0.1)', 
                 color: dynamics.diverged ? '#ff4444' : '#00ffcc', 
                 border: `1px solid ${dynamics.diverged ? '#ff4444' : '#00ffcc'}` 
               }}>
                 LIVE_GRADIENT_DESCENT
               </span>
            </div>
          </div>

          <div className="sov-chart-container">
            <div className="sov-card" style={{ height: '240px' }}>
              <span className="sov-label">Loss Convergence</span>
              <svg width="100%" height="140" preserveAspectRatio="none">
                <path 
                  d={generatePath(dynamics.convergenceData, 300, 140)} 
                  fill="none" stroke="#0066ff" strokeWidth="2" 
                />
              </svg>
            </div>
            <div className="sov-card" style={{ height: '240px' }}>
              <span className="sov-label">LR Finder Analysis</span>
              <svg width="100%" height="140" preserveAspectRatio="none">
                 <path 
                  d={generatePath(dynamics.lrFinderData, 300, 140)} 
                  fill="none" stroke="#00ffcc" strokeWidth="2" 
                />
                <line x1="150" y1="0" x2="150" y2="140" stroke="#ff4444" strokeDasharray="4" />
              </svg>
            </div>
          </div>
        </main>
      </div>

      <footer style={{ borderTop: '1px solid #1a1a1a', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#444', fontFamily: 'monospace' }}>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: PRECISION DEPT</div>
        <div>STOCHASTIC_GRADIENT_MONITOR_ACTIVE</div>
      </footer>
    </div>
  );
};

export default App;
