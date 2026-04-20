/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo } from 'react';

// --- LOJİK: perceptronLogicEngine.js ---
const calculatePerceptron = (config) => {
  const { inputs, weights, bias } = config;
  const weightedSum = inputs.reduce((acc, val, i) => acc + (val * weights[i]), 0);
  const netInput = weightedSum + bias;
  const output = netInput >= 0 ? 1 : 0;
  const signalIntensity = Math.abs(netInput);
  return { weightedSum, netInput, output, signalIntensity };
};

// --- PURE SVG ASSETS (Manual Vector Mastery) ---
const SovIcons = {
  Cpu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>,
  Settings: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33-1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Target: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Activity: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Layers: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
};

const App = () => {
  const [inputs, setInputs] = useState([1, 0]);
  const [weights, setWeights] = useState([0.8, -0.5]);
  const [bias, setBias] = useState(-0.3);

  const result = useMemo(() => calculatePerceptron({ inputs, weights, bias }), [inputs, weights, bias]);

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
      margin-bottom: 40px;
    }
    .sov-grid { display: grid; grid-template-columns: 350px 1fr; gap: 30px; }
    .sov-panel {
      background: #0a0a0f;
      border: 1px solid #1a1a1f;
      border-radius: 20px;
      padding: 24px;
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
    .sov-slider-box { background: #0d0d0d; padding: 15px; border-radius: 12px; border: 1px solid #1a1a1f; margin-bottom: 20px; }
    .sov-label { font-size: 10px; color: #555; display: flex; justify-content: space-between; margin-bottom: 10px; text-transform: uppercase; }
    .sov-slider { width: 100%; height: 4px; background: #1a1a1f; appearance: none; border-radius: 2px; outline: none; margin-top: 10px; }
    .sov-slider::-webkit-slider-thumb { appearance: none; width: 14px; height: 14px; background: #6366f1; border-radius: 50%; cursor: pointer; }
    
    .sov-neuron-view {
      background: #070707;
      border: 1px solid #111;
      border-radius: 20px;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .sov-btn-toggle {
      background: #1a1a1f;
      border: 1px solid #333;
      color: #555;
      font-size: 9px;
      font-weight: bold;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.3s;
    }
    .sov-btn-toggle.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }

    .chart-box { height: 200px; width: 100%; border: 1px solid #111; border-radius: 12px; padding: 15px; background: #08080a; }
  `;

  // Manual SVG Path for Heaviside Step
  const stepPath = useMemo(() => {
    let pts = [];
    for (let x = -50; x <= 50; x += 1) {
      const val = x >= 0 ? 1 : 0;
      pts.push(`${50 + x},${80 - val * 60}`);
    }
    return `M ${pts.join(' L ')}`;
  }, []);

  return (
    <div className="sov-root">
      {/* lgtm[js/html-injection] */}
      <style>{gss}</style>

      <header className="sov-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ color: '#6366f1' }}><SovIcons.Cpu /></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', letterSpacing: '1px', color: '#fff' }}>PERCEPTRON-LOGIC AI</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#555', textTransform: 'uppercase' }}>Neural Aggr. & Unit Analysis v1.0</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '9px', color: '#555', display: 'block' }}>Net Girdi (z)</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: result.netInput >= 0 ? '#10b981' : '#f43f5e' }}>{result.netInput.toFixed(3)}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '9px', color: '#555', display: 'block' }}>Ateşleme</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: result.output ? '#10b981' : '#444' }}>{result.output ? 'AKTİF' : 'BOŞTA'}</span>
          </div>
        </div>
      </header>

      <main className="sov-grid">
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section className="sov-panel">
            <div className="sov-panel-title"><SovIcons.Settings /> Sinaptik Parametreler</div>
            {inputs.map((input, i) => (
              <div key={i} className="sov-slider-box">
                <div className="sov-label">
                  <span>Giriş X{i+1}</span>
                  <button 
                    className={`sov-btn-toggle ${input === 1 ? 'active' : ''}`}
                    onClick={() => {
                      const n = [...inputs];
                      n[i] = n[i] === 1 ? 0 : 1;
                      setInputs(n);
                    }}
                  >{input ? 'SİNYAL: VAR' : 'SİNYAL: YOK'}</button>
                </div>
                <div className="sov-label" style={{marginTop: '15px'}}>
                  <span>Ağırlık W{i+1}</span>
                  <span style={{color: '#6366f1'}}>{weights[i].toFixed(2)}</span>
                </div>
                <input 
                  type="range" className="sov-slider" min="-1" max="1" step="0.1" 
                  value={weights[i]} onChange={(e) => {
                    const w = [...weights];
                    w[i] = parseFloat(e.target.value);
                    setWeights(w);
                  }} 
                />
              </div>
            ))}
            <div className="sov-slider-box" style={{background: 'rgba(99,102,241,0.03)'}}>
              <div className="sov-label"><span>Bias Ofseti (b)</span><span style={{color: '#fff'}}>{bias.toFixed(2)}</span></div>
              <input type="range" className="sov-slider" min="-1" max="1" step="0.1" value={bias} onChange={(e) => setBias(parseFloat(e.target.value))} />
            </div>
          </section>

          <section className="sov-panel">
            <div className="sov-panel-title">Birim Metrikleri</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: '#070707', padding: '12px', borderRadius: '8px', border: '1px solid #111' }}>
                <div style={{ fontSize: '8px', color: '#444', marginBottom: '5px' }}>TOPLAM FLOPs</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#3b82f6' }}>4 İşlem</div>
              </div>
              <div style={{ background: '#070707', padding: '12px', borderRadius: '8px', border: '1px solid #111' }}>
                <div style={{ fontSize: '8px', color: '#444', marginBottom: '5px' }}>SİNYAL ŞİDDETİ</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>{result.signalIntensity.toFixed(2)}</div>
              </div>
            </div>
          </section>
        </aside>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <section className="sov-neuron-view">
            <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ overflow: 'visible' }}>
              {/* Synapses */}
              {inputs.map((input, i) => {
                const y = 80 + i * 140;
                return (
                  <g key={i}>
                    <line x1="50" y1={y} x2="180" y2="150" stroke={input ? '#3b82f6' : '#222'} strokeWidth={Math.abs(weights[i]) * 8 + 1} opacity="0.6" style={{ transition: '0.5s' }} />
                    <circle cx="50" cy={y} r="8" fill={input ? '#3b82f6' : '#111'} stroke="#3b82f6" strokeWidth="2" />
                    <text x="30" y={y+4} fill="#555" fontSize="9" textAnchor="end">X{i+1}:{input}</text>
                    <text x="110" y={y-10} fill="#6366f1" fontSize="8" textAnchor="middle">W{i+1}:{weights[i].toFixed(1)}</text>
                  </g>
                );
              })}
              {/* Soma */}
              <circle cx="200" cy="150" r="45" fill="#0a0a0f" stroke={result.output ? '#10b981' : '#6366f1'} strokeWidth="3" style={{ transition: '0.5s' }} />
              <text x="200" y="145" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">Σ</text>
              <text x="200" y="165" textAnchor="middle" fill="#555" fontSize="9">b:{bias.toFixed(1)}</text>
              {/* Activation Pulse */}
              {result.output === 1 && (
                <circle cx="200" cy="150" r="45" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.8">
                  <animate attributeName="r" from="45" to="70" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Axon */}
              <line x1="245" y1="150" x2="340" y2="150" stroke={result.output ? '#10b981' : '#222'} strokeWidth="4" />
              <circle cx="350" cy="150" r="12" fill={result.output ? '#10b981' : '#111'} stroke={result.output ? '#10b981' : '#222'} strokeWidth="2" />
              <text x="375" y="154" fill={result.output ? '#10b981' : '#555'} fontSize="14" fontWeight="bold">Y:{result.output}</text>
            </svg>
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#000', padding: '8px 12px', border: '1px solid #222', borderRadius: '8px', fontSize: '9px', color: '#6366f1', letterSpacing: '1px' }}>SINIR BİRİMİ SİMÜLATÖRÜ</div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
            <section className="sov-panel">
              <div className="sov-panel-title"><SovIcons.Target /> Doğrusal Ayrıştırma (AND)</div>
              <div className="chart-box">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <line x1="10" y1="90" x2="90" y2="90" stroke="#111" />
                  <line x1="10" y1="10" x2="10" y2="90" stroke="#111" />
                  {/* Scatter Points */}
                  {[0,0, 0,1, 1,0, 1,1].map((v, i) => {
                    const x = (i % 2 === 0 ? 0 : 1);
                    const y = (Math.floor(i / 2) === 0 ? 0 : 1);
                    const target = (x === 1 && y === 1) ? 1 : 0;
                    return <circle key={i} cx={20 + x * 60} cy={80 - y * 60} r="4" fill={target ? '#10b981' : '#f43f5e'} />
                  })}
                  <line x1="20" y1="20" x2="80" y2="80" stroke="#6366f1" strokeDasharray="4" opacity="0.3" />
                </svg>
              </div>
            </section>

            <section className="sov-panel">
              <div className="sov-panel-title"><SovIcons.Activity /> Transfer: Heaviside Step</div>
              <div className="chart-box">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#111" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#111" />
                  <path d={stepPath} fill="none" stroke="#6366f1" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <circle cx={50 + result.netInput * 10} cy="50" r="3" fill="#f43f5e" />
                </svg>
              </div>
            </section>
          </div>
        </div>
      </main>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
        {[
          { icon: <SovIcons.Layers />, title: "Doğrusal Agregasyon", desc: "Giriş ve ağırlık vektörlerinin iç çarpımı verinin ölçeklenmesini sağlar. Bias ofseti ise aktivasyon eşiğini kaydırır." },
          { icon: <SovIcons.Activity />, title: "Öğrenme Kuralı", desc: "Hata tabanlı ağırlık revizyonu ($\Delta w$) ile nöronun ateşleme hassasiyeti matematiksel olarak optimize edilir." },
          { icon: <SovIcons.Target />, title: "Doğrusal Limit", desc: "Tekil perceptron sadece doğrusal olarak ayrıştırılabilir (Linearly Separable) kümeleri sınıflandırabilir." }
        ].map((item, i) => (
          <div key={i} className="sov-panel">
            <div style={{ color: '#6366f1', marginBottom: '15px' }}>{item.icon}</div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '11px', color: '#fff', textTransform: 'uppercase' }}>{item.title}</h4>
            <p style={{ margin: 0, fontSize: '10px', color: '#555', lineHeight: '1.6', fontStyle: 'italic' }}>{item.desc}</p>
          </div>
        ))}
      </section>

      <footer className="sov-footer">
        <div style={{ display: 'flex', gap: '30px' }}>
          <span>MOTOR: PERCEPTRON_LOGIC_V1.0</span>
          <span>MODEL: MCCULLOCH-PITTS</span>
          <span>DURUM: ATEŞLEME_HAZIR</span>
        </div>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: KAPLAN HALI YIKAMA PRECISION DEPT</div>
      </footer>
    </div>
  );
};

export default App;
