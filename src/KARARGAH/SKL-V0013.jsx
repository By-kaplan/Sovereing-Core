/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo } from 'react';

// --- MLP LOGIC ENGINE (VANILLA JS) ---
const calculateMLPAnalysis = (config) => {
  const { inputDim, layers, outputDim, batchSize } = config;
  const layerConfigs = [inputDim, ...layers, outputDim];
  const architectureReport = [];
  let totalParams = 0;
  let totalFlops = 0;

  for (let i = 1; i < layerConfigs.length; i++) {
    const inSize = layerConfigs[i - 1];
    const outSize = layerConfigs[i];
    const weights = inSize * outSize;
    const biases = outSize;
    const params = weights + biases;
    totalParams += params;
    
    const layerFlops = 2 * inSize * outSize * batchSize;
    totalFlops += layerFlops;

    architectureReport.push({
      layer: i === layerConfigs.length - 1 ? "Output" : `Hidden L${i}`,
      nodes: outSize,
      parameters: params,
      flops: layerFlops,
      activationIntensity: 0.6 + Math.random() * 0.3
    });
  }

  const capacityScore = (Math.log10(totalParams || 1) * 12.5).toFixed(2);
  const latencyMs = (totalFlops / 2.5e9) * 1000 + 0.15;

  return { architectureReport, totalParams, totalFlops, capacityScore, latencyMs };
};

// --- PURE SVG ASSET ENGINE ---
const SovIcons = {
  Network: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/>
      <path d="M12 9v6M12 12H6m6 0h6"/>
    </svg>
  ),
  Cpu: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
  ),
  Activity: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  Zap: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
  )
};

const App = () => {
  const [config, setConfig] = useState({
    inputDim: 64,
    layers: [32, 16],
    outputDim: 10,
    batchSize: 1
  });

  const { architectureReport, totalParams, totalFlops, capacityScore, latencyMs } = useMemo(() => {
    return calculateMLPAnalysis(config);
  }, [config]);

  // --- GSS (VANILLA CSS INTEGRITY) ---
  const gss = `
    .sov-root {
      background: #050508;
      color: #ccc;
      font-family: 'JetBrains Mono', monospace;
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
      border-bottom: 1px solid #1a1a1f;
      padding-bottom: 25px;
    }
    .sov-title-group { display: flex; align-items: center; gap: 15px; }
    .sov-icon-box { background: #111; padding: 12px; border-radius: 12px; border: 1px solid #222; color: #6366f1; }
    
    .sov-stat-row { display: flex; gap: 20px; }
    .sov-stat-card {
      background: #0a0a0f;
      border: 1px solid #1a1a1f;
      padding: 12px 20px;
      border-radius: 10px;
      text-align: right;
    }
    .sov-stat-label { font-size: 9px; color: #555; text-transform: uppercase; letter-spacing: 1px; display: block; }
    .sov-stat-val { font-size: 18px; font-weight: bold; color: #fff; font-family: monospace; }

    .sov-grid { display: grid; grid-template-columns: 350px 1fr; gap: 30px; }
    .sov-panel {
      background: #0a0a0f;
      border: 1px solid #1a1a1f;
      border-radius: 20px;
      padding: 25px;
      position: relative;
    }
    .sov-panel-title {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #666;
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .sov-control-group { margin-bottom: 25px; }
    .sov-label { font-size: 11px; color: #888; display: flex; justify-content: space-between; }
    .sov-range {
      width: 100%;
      height: 4px;
      background: #1a1a1f;
      border-radius: 2px;
      appearance: none;
      outline: none;
      margin-top: 12px;
    }
    .sov-range::-webkit-slider-thumb {
      appearance: none;
      width: 14px;
      height: 14px;
      background: #6366f1;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }

    .sov-topology-view {
      height: 450px;
      background: radial-gradient(circle at center, #0a0a0f 0%, #030305 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid #111;
      border-radius: 20px;
    }

    .iso-container {
      display: flex;
      align-items: center;
      gap: 50px;
      transform: scale(0.9);
    }

    .iso-layer {
      position: relative;
      width: 80px;
      height: 80px;
      border: 2px solid #222;
      border-radius: 12px;
      transform: rotateX(55deg) rotateZ(-45deg);
      transform-style: preserve-3d;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 10px;
      gap: 8px;
      transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .iso-node {
      width: 8px;
      height: 8px;
      background: #6366f1;
      border-radius: 50%;
      box-shadow: 0 0 8px #6366f1;
    }

    .sov-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      font-size: 10px;
    }
    .sov-table th { text-align: left; padding: 10px; color: #555; border-bottom: 1px solid #111; text-transform: uppercase; }
    .sov-table td { padding: 12px 10px; border-bottom: 1px solid #0d0d0d; color: #ccc; }

    @keyframes signalPass {
      0% { transform: translateX(-20px); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateX(20px); opacity: 0; }
    }
    .signal-dot {
      width: 4px;
      height: 4px;
      background: #6366f1;
      border-radius: 50%;
      animation: signalPass 2s infinite linear;
    }
  `;

  const layerDims = [config.inputDim, ...config.layers, config.outputDim];

  return (
    <div className="sov-root">
      {/* lgtm[js/html-injection] */}
      <style>{gss}</style>

      <header className="sov-header">
        <div className="sov-title-group">
          <div className="sov-icon-box"><SovIcons.Network /></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', letterSpacing: '1px', color: '#fff' }}>MLP-LOGIC AI</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#555', fontFamily: 'monospace' }}>NEURAL_CAPACITY_ANALYZER_V1.1</p>
          </div>
        </div>
        <div className="sov-stat-row">
          <div className="sov-stat-card">
            <span className="sov-stat-label">Model Capacity</span>
            <span className="sov-stat-val" style={{ color: '#6366f1' }}>{capacityScore}%</span>
          </div>
          <div className="sov-stat-card">
            <span className="sov-stat-label">Total Params</span>
            <span className="sov-stat-val" style={{ color: '#10b981' }}>{(totalParams / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </header>

      <main className="sov-grid">
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section className="sov-panel">
            <div className="sov-panel-title"><SovIcons.Cpu /> Yapısal Konfigürasyon</div>
            
            <div className="sov-control-group">
              <div className="sov-label"><span>Giriş Boyutu (N₀)</span><span style={{ color: '#6366f1' }}>{config.inputDim}</span></div>
              <input type="range" className="sov-range" min="8" max="256" step="8" value={config.inputDim} onChange={(e) => setConfig({...config, inputDim: parseInt(e.target.value)})} />
            </div>

            <div className="sov-control-group">
              <div className="sov-label"><span>Derinlik (Layers)</span><span style={{ color: '#6366f1' }}>{config.layers.length}</span></div>
              <input type="range" className="sov-range" min="1" max="4" step="1" value={config.layers.length} onChange={(e) => {
                const count = parseInt(e.target.value);
                setConfig({...config, layers: Array(count).fill(32)});
              }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px' }}>
              <div style={{ background: '#070707', padding: '12px', borderRadius: '8px', border: '1px solid #111' }}>
                <span className="sov-stat-label">Latency</span>
                <span style={{ color: '#f59e0b', fontSize: '13px', fontWeight: 'bold' }}>{latencyMs.toFixed(3)} ms</span>
              </div>
              <div style={{ background: '#070707', padding: '12px', borderRadius: '8px', border: '1px solid #111' }}>
                <span className="sov-stat-label">FLOPs</span>
                <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: 'bold' }}>{(totalFlops / 1e3).toFixed(0)}k</span>
              </div>
            </div>
          </section>

          <section className="sov-panel" style={{ height: '300px' }}>
            <div className="sov-panel-title">Efficiency Radar</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
               <svg width="180" height="180" viewBox="0 0 100 100">
                  {[0.2, 0.4, 0.6, 0.8, 1].map(r => (
                    <polygon key={r} points={Array.from({length: 5}, (_, i) => {
                      const angle = (i * 72 - 90) * (Math.PI / 180);
                      return `${50 + 45 * r * Math.cos(angle)},${50 + 45 * r * Math.sin(angle)}`;
                    }).join(' ')} fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
                  ))}
                  <polygon points={Array.from({length: 5}, (_, i) => {
                    const angle = (i * 72 - 90) * (Math.PI / 180);
                    const val = [0.8, 0.95, config.layers.length/4, parseFloat(capacityScore)/100, 0.9][i];
                    return `${50 + 45 * val * Math.cos(angle)},${50 + 45 * val * Math.sin(angle)}`;
                  }).join(' ')} fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" strokeWidth="1.5" />
               </svg>
            </div>
          </section>
        </aside>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section className="sov-topology-view">
             <div className="iso-container">
                {layerDims.map((dim, idx) => (
                  <React.Fragment key={idx}>
                    <div className="iso-layer" style={{ 
                      borderColor: idx === 0 ? '#3b82f6' : idx === layerDims.length - 1 ? '#10b981' : '#6366f1',
                      background: idx === 0 ? 'rgba(59,130,246,0.05)' : idx === layerDims.length - 1 ? 'rgba(16,185,129,0.05)' : 'rgba(99,102,241,0.05)'
                    }}>
                      {Array.from({ length: 9 }).map((_, n) => (
                        <div key={n} className="iso-node" style={{ 
                          background: idx === 0 ? '#3b82f6' : idx === layerDims.length - 1 ? '#10b981' : '#6366f1',
                          boxShadow: `0 0 8px ${idx === 0 ? '#3b82f6' : idx === layerDims.length - 1 ? '#10b981' : '#6366f1'}`
                        }} />
                      ))}
                      <div style={{ position: 'absolute', top: '-40px', transform: 'rotateZ(45deg) rotateX(-55deg)', fontSize: '8px', color: '#555', width: '80px', textAlign: 'center' }}>
                        {idx === 0 ? 'INPUT' : idx === layerDims.length - 1 ? 'OUTPUT' : `HIDDEN_${idx}`}
                      </div>
                      <div style={{ position: 'absolute', bottom: '-40px', transform: 'rotateZ(45deg) rotateX(-55deg)', fontSize: '10px', color: '#6366f1', width: '80px', textAlign: 'center' }}>
                        N={dim}
                      </div>
                    </div>
                    {idx < layerDims.length - 1 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <SovIcons.ChevronRight />
                        <div className="signal-dot" style={{ animationDelay: `${idx * 0.5}s` }}></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
             </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <section className="sov-panel">
              <div className="sov-panel-title"><SovIcons.Activity /> Activation Intensity</div>
              <div style={{ height: '150px', width: '100%', position: 'relative' }}>
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path 
                    d={`M 0,100 ${architectureReport.map((l, i) => `L ${(i/(architectureReport.length-1))*100},${100 - l.activationIntensity*80}`).join(' ')} L 100,100 Z`} 
                    fill="rgba(99, 102, 241, 0.1)" stroke="#6366f1" strokeWidth="2" 
                  />
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '8px', color: '#444' }}>
                  {architectureReport.map((l, i) => <span key={i}>{l.layer}</span>)}
                </div>
              </div>
            </section>

            <section className="sov-panel">
              <div className="sov-panel-title">Layer Metric Schema</div>
              <table className="sov-table">
                <thead>
                  <tr><th>Layer</th><th>Nodes</th><th>Params</th></tr>
                </thead>
                <tbody>
                  {architectureReport.map((l, i) => (
                    <tr key={i}>
                      <td>{l.layer}</td>
                      <td style={{ color: '#6366f1' }}>{l.nodes}</td>
                      <td style={{ color: '#555' }}>{l.parameters}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #1a1a1f', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#333', fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>ENGINE: MLP_LOGIC_V1.1</span>
          <span>CAPACITY: FULLY_CONNECTED</span>
          <span>FP32_FOOTPRINT: {((totalParams * 4) / 1024).toFixed(2)} KB</span>
        </div>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: KAPLAN HALI YIKAMA PRECISION DEPT</div>
      </footer>
    </div>
  );
};

export default App;
