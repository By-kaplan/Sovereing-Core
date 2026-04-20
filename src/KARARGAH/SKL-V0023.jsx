/**
 * SOVEREIGN CORE LIBRARY
 * @project: MODEL VALIDATION & GENERALIZATION ENGINE
 * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version: v2.9.5-SOVEREIGN-PRO
 * @note: [PLUG-AND-PLAY]: Sıfır bağımlılık (No Recharts, No Lucide), Saf SVG/JS mimarisi.
 * @description: K-Fold, Tensor Cebri, İş Yükü Varyans Analizi ve OOD Belirsizlik Katmanı.
 */

import React, { useState, useMemo, useEffect } from 'react';

// --- CORE LOGIC ENGINES ---

const validationLogicEngine = {
  simulateKFold: (k, baseMetric) => {
    return Array.from({ length: k }, (_, i) => ({
      fold: i + 1,
      accuracy: baseMetric + (Math.random() - 0.5) * 0.05,
      loss: 0.1 + Math.random() * 0.05
    }));
  },
  generateLearningCurve: (epochs = 24) => {
    return Array.from({ length: epochs }, (_, i) => {
      const trainErr = 0.5 * Math.pow(0.82, i);
      const valErr = trainErr + 0.06 + (i > 12 ? (i - 12) * 0.015 : 0);
      return { epoch: i + 1, trainErr, valErr };
    });
  },
  detectLeakage: (splitRatio) => {
    // Veri bölme oranı çok yüksekse sızıntı riski artar simülasyonu
    const correlation = 0.75 + (splitRatio * 0.1);
    return correlation > 0.82 ? { risk: "HIGH", index: correlation } : { risk: "LOW", index: correlation };
  }
};

const tensorLogicEngine = {
  calculateMatrixStats: (m, n, p, sparsity = 0.12) => ({
    rank: "FULL",
    shape: `[${m}, ${p}]`,
    n: (m * p).toLocaleString(),
    flops: (2 * m * n * p).toLocaleString(),
    memoryFP32: ((m * n + n * p + m * p) * 4 / (1024 * 1024)).toFixed(2),
    sparsity: (sparsity * 100).toFixed(1) + "%"
  })
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

const INITIAL_PROJECT_DATA = {
  appId: "ecc-validation-009",
  members: [
    { id: "U1", name: "Mimar_01", tasks: 8, difficultySum: 45, timeSpent: 120, peerScore: 92 },
    { id: "U2", name: "Geliştirici_02", tasks: 12, difficultySum: 78, timeSpent: 210, peerScore: 88 },
    { id: "U3", name: "Analist_03", tasks: 5, difficultySum: 20, timeSpent: 60, peerScore: 75 },
    { id: "U4", name: "Tester_04", tasks: 10, difficultySum: 55, timeSpent: 150, peerScore: 95 }
  ]
};

// --- SOVEREIGN SVG ASSETS ---
const Icons = {
  Activity: ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Layers: ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  CheckCircle: ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Shield: ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Cpu: ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>,
  TrendingUp: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Terminal: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
};

// --- CHART COMPONENTS (Pure SVG Engines) ---

const LearningCurveManual = ({ data }) => {
  const trainPoints = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d.trainErr * 180)}`).join(' ');
  const valPoints = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d.valErr * 180)}`).join(' ');
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d={`M 0,100 ${trainPoints} L 100,100 Z`} fill="rgba(59, 130, 246, 0.05)" />
      <polyline points={trainPoints} fill="none" stroke="#3b82f6" strokeWidth="1" />
      <path d={`M 0,100 ${valPoints} L 100,100 Z`} fill="rgba(239, 68, 68, 0.05)" />
      <polyline points={valPoints} fill="none" stroke="#ef4444" strokeWidth="1" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,2" />
    </svg>
  );
};

const BarChartManual = ({ data, dataKey, color = "#3b82f6" }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    {data.map((d, i) => {
      const val = parseFloat(d[dataKey]);
      const barHeight = (val / 100) * 100;
      const width = 100 / data.length - 6;
      return (
        <rect 
          key={i} 
          x={i * (100 / data.length) + 3} 
          y={100 - barHeight} 
          width={width} 
          height={barHeight} 
          fill={color} 
          rx="1"
          opacity={0.8}
        />
      );
    })}
  </svg>
);

const RadarChartManual = ({ data }) => {
  const points = data.map((d, i) => {
    const angle = (i * 2 * Math.PI) / data.length - Math.PI / 2;
    const r = (d.val / 100) * 45;
    return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
  }).join(' ');
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      {[15, 30, 45].map(r => <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#1a1a1f" strokeWidth="0.5" />)}
      {data.map((_, i) => {
        const angle = (i * 2 * Math.PI) / data.length - Math.PI / 2;
        return <line key={i} x1="50" y1="50" x2={50 + 45 * Math.cos(angle)} y2={50 + 45 * Math.sin(angle)} stroke="#1a1a1f" strokeWidth="0.5" />;
      })}
      <polygon points={points} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1" />
    </svg>
  );
};

const MatrixVisualizer = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100">
    {Array.from({ length: 100 }).map((_, i) => (
      <rect 
        key={i} 
        x={(i % 10) * 10 + 1} 
        y={Math.floor(i / 10) * 10 + 1} 
        width="8" 
        height="8" 
        fill={Math.random() > 0.85 ? "#3b82f6" : "#08080a"} 
        rx="1"
      />
    ))}
  </svg>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeTab, setActiveTab] = useState('VALIDATION');
  const [splitRatio, setSplitRatio] = useState(0.8);
  const [kFoldValue, setKFoldValue] = useState(5);
  const [logs, setLogs] = useState(["[SYSTEM]: Kernel initialized.", "[SYSTEM]: Validation engine ready."]);

  const metrics = useMemo(() => equityEngine.calculateMetrics(INITIAL_PROJECT_DATA.members), []);
  const learningCurveData = useMemo(() => validationLogicEngine.generateLearningCurve(24), []);
  const kFoldData = useMemo(() => validationLogicEngine.simulateKFold(kFoldValue, 0.91), [kFoldValue]);
  const tensorStats = useMemo(() => tensorLogicEngine.calculateMatrixStats(1024, 512, 1024), []);
  const leakage = useMemo(() => validationLogicEngine.detectLeakage(splitRatio), [splitRatio]);

  const addLog = (msg) => setLogs(prev => [`[${new Date().toLocaleTimeString()}]: ${msg}`, ...prev].slice(0, 5));

  const gss = `
    .sov-root { background: #050508; color: #ccc; font-family: 'JetBrains Mono', monospace; min-height: 100vh; padding: 40px; }
    .sov-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a1a1f; padding-bottom: 25px; margin-bottom: 40px; }
    .sov-nav { display: flex; background: #0d0d0d; padding: 4px; border-radius: 8px; border: 1px solid #1a1a1f; }
    .sov-nav-btn { padding: 6px 14px; background: transparent; border: none; color: #444; font-size: 10px; font-weight: bold; cursor: pointer; border-radius: 6px; text-transform: uppercase; transition: 0.3s; }
    .sov-nav-btn.active { background: #0066ff; color: #fff; box-shadow: 0 4px 12px rgba(0, 102, 255, 0.2); }
    
    .sov-grid { display: grid; grid-template-columns: 1fr 340px; gap: 30px; }
    .sov-panel { background: #0a0a0f; border: 1px solid #1a1a1f; border-radius: 20px; padding: 24px; position: relative; }
    .sov-panel-title { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #555; margin-bottom: 25px; display: flex; align-items: center; gap: 10px; font-weight: 800; }
    
    .chart-box { height: 300px; width: 100%; border: 1px solid #111; border-radius: 12px; background: #070707; position: relative; padding: 20px; overflow: hidden; }
    
    .sov-list-item { display: flex; align-items: center; justify-content: space-between; font-size: 10px; padding: 12px; background: #0d0d0d; border: 1px solid #1a1a1f; border-radius: 8px; margin-bottom: 10px; transition: 0.3s; }
    .sov-list-item:hover { background: #111; border-color: #333; }
    .sov-bar-mini { height: 4px; background: #111; border-radius: 2px; flex: 1; margin: 0 15px; overflow: hidden; }
    
    .sov-report-grid { display: grid; grid-template-columns: repeat(6, 1fr); border-top: 1px solid #1a1a1f; background: #070707; margin-top: 30px; border-radius: 0 0 20px 20px; overflow: hidden; }
    .sov-report-cell { padding: 20px; border-right: 1px solid #1a1a1f; text-align: center; }
    .sov-report-lbl { font-size: 8px; color: #444; margin-bottom: 5px; text-transform: uppercase; font-weight: bold; }
    .sov-report-val { font-size: 13px; font-weight: bold; color: #ccc; }

    .sov-slider { width: 100%; height: 4px; background: #111; border-radius: 2px; outline: none; -webkit-appearance: none; margin: 15px 0; }
    .sov-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; background: #0066ff; border-radius: 50%; cursor: pointer; border: 2px solid #fff; }
    
    .sov-footer { margin-top: 40px; border-top: 1px solid #1a1a1f; padding-top: 20px; display: flex; justify-content: space-between; font-size: 9px; color: #333; font-weight: bold; text-transform: uppercase; }
    
    .sov-badge { font-size: 8px; font-weight: bold; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; }
    .sov-badge-blue { background: rgba(0, 102, 255, 0.1); color: #0066ff; border: 1px solid rgba(0, 102, 255, 0.2); }
    .sov-badge-green { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
    .sov-badge-red { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }

    .log-box { font-size: 9px; color: #444; margin-top: 20px; max-height: 100px; overflow-y: auto; }
  `;

  return (
    <div className="sov-root">
      {/* lgtm[js/html-injection] */}
      <style>{gss}</style>

      <header className="sov-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ color: '#0066ff' }}><Icons.Layers size={32} /></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>MÜHENDİS KONTROL MERKEZİ <span style={{ color: '#0066ff', fontSize: '12px' }}>v2.9.5-PRO</span></h1>
            <p style={{ margin: 0, fontSize: '9px', color: '#555', textTransform: 'uppercase', letterSpacing: '2px' }}>{INITIAL_PROJECT_DATA.appId} | Model Doğrulama ve Genelleme Protokolü</p>
          </div>
        </div>
        <nav className="sov-nav">
          {['EQUITY', 'TENSOR', 'VALIDATION'].map(tab => (
            <button key={tab} className={`sov-nav-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}-LOGIC</button>
          ))}
        </nav>
      </header>

      <main>
        {activeTab === 'VALIDATION' && (
          <div className="sov-grid">
            <section className="sov-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div className="sov-panel-title"><Icons.Shield /> Genelleme Performansı (Learning Curves)</div>
                <div className="sov-badge sov-badge-green">Gap Analysis: Active</div>
              </div>
              <div className="chart-box">
                <LearningCurveManual data={learningCurveData} />
                <div style={{ position: 'absolute', top: '30px', right: '30px', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '9px', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '2px', background: '#3b82f6' }}></div> TRAIN ERROR</div>
                  <div style={{ fontSize: '9px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '2px', background: '#ef4444' }}></div> VAL ERROR</div>
                </div>
                <div style={{ position: 'absolute', top: '50%', right: '140px', transform: 'rotate(-90deg)', fontSize: '8px', color: '#ef4444', opacity: 0.4, fontWeight: 'bold' }}>OVERFITTING ZONE</div>
              </div>
              <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div>
                  <div className="sov-report-lbl">Veri Bölme Oranı: {splitRatio * 100}% / {Math.round((1-splitRatio)*100)}%</div>
                  <input type="range" className="sov-slider" min="0.5" max="0.9" step="0.05" value={splitRatio} onChange={e => { setSplitRatio(parseFloat(e.target.value)); addLog("Split ratio updated."); }} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '10px' }}>
                    <span style={{ color: '#444' }}>SIZINTI RİSKİ (Data Leakage):</span>
                    <span style={{ color: leakage.risk === 'HIGH' ? '#ef4444' : '#10b981' }}>{leakage.risk} ({(leakage.index * 100).toFixed(0)}%)</span>
                  </div>
                  <div style={{ height: '4px', background: '#111', borderRadius: '2px' }}><div style={{ width: `${leakage.index * 100}%`, height: '100%', background: leakage.risk === 'HIGH' ? '#ef4444' : '#10b981' }}></div></div>
                </div>
              </div>
              <div className="log-box">
                {logs.map((log, i) => <div key={i} style={{ marginBottom: '4px' }}>{log}</div>)}
              </div>
            </section>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <section className="sov-panel">
                <div className="sov-panel-title"><Icons.CheckCircle /> K-Fold Doğrulama (k={kFoldValue})</div>
                {kFoldData.map(f => (
                  <div key={f.fold} className="sov-list-item">
                    <span style={{ color: '#555', fontWeight: 'bold' }}>FOLD {f.fold}</span>
                    <div className="sov-bar-mini"><div style={{ height: '100%', width: `${f.accuracy * 100}%`, background: '#0066ff' }}></div></div>
                    <span style={{ color: '#0066ff', fontWeight: 'bold' }}>{(f.accuracy * 100).toFixed(1)}%</span>
                  </div>
                ))}
                <div style={{ marginTop: '20px' }}>
                  <div className="sov-report-lbl">Fold Sayısı Ayarı:</div>
                  <input type="range" className="sov-slider" min="3" max="10" step="1" value={kFoldValue} onChange={e => { setKFoldValue(parseInt(e.target.value)); addLog(`K-Fold set to ${e.target.value}`); }} />
                </div>
              </section>

              <section className="sov-panel">
                <div className="sov-panel-title">OOD Belirsizlik Analizi</div>
                <div style={{ height: '180px' }}>
                  <RadarChartManual data={[
                    { subject: 'Precision', val: 92 },
                    { subject: 'Recall', val: 88 },
                    { subject: 'F1', val: 90 },
                    { subject: 'Stability', val: 85 },
                    { subject: 'Robustness', val: 78 }
                  ]} />
                </div>
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                   <div style={{ fontSize: '10px', color: '#0066ff', fontWeight: 'bold' }}>Genelleme Boşluğu: 0.042 Δ</div>
                </div>
              </section>
            </aside>
          </div>
        )}

        {activeTab === 'EQUITY' && (
          <div className="sov-grid">
            <section className="sov-panel">
              <div className="sov-panel-title"><Icons.Activity /> İş Yükü Varyans Analizi</div>
              <div className="chart-box">
                <BarChartManual data={metrics} dataKey="difficultySum" />
              </div>
              <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                {metrics.map(m => (
                  <div key={m.id} className="sov-list-item">
                    <div>
                      <div style={{ fontSize: '8px', color: '#444' }}>{m.name}</div>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{m.contributionScore}%</div>
                    </div>
                    <div className="sov-badge sov-badge-blue">Score</div>
                  </div>
                ))}
              </div>
            </section>
            <aside className="sov-panel">
              <div className="sov-panel-title">Sapma İndeksi</div>
              {metrics.map(m => (
                <div key={m.id} className="sov-list-item">
                  <span style={{ color: '#555' }}>{m.name}</span>
                  <span style={{ color: parseFloat(m.imbalance) > 0 ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
                    {parseFloat(m.imbalance) > 0 ? '+' : ''}{m.imbalance} Δ
                  </span>
                </div>
              ))}
              <div style={{ marginTop: '20px', fontSize: '8px', color: '#333', lineHeight: '1.4' }}>
                Sapma indeksi, ortalama iş yükünden (average difficulty) olan uzaklığı temsil eder. Negatif değerler düşük yükü, pozitif değerler aşırı yükü ifade eder.
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'TENSOR' && (
          <div className="sov-grid">
            <section className="sov-panel">
              <div className="sov-panel-title"><Icons.Cpu /> Tensör Cebri & Matris Projeksiyonu</div>
              <div className="chart-box" style={{ background: '#020205' }}>
                <MatrixVisualizer />
              </div>
              <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <div className="sov-stat-card">
                  <div className="sov-report-lbl">Shape (Proj)</div>
                  <div className="sov-stat-num">{tensorStats.shape}</div>
                </div>
                <div className="sov-stat-card">
                  <div className="sov-report-lbl">Memory (FP32)</div>
                  <div className="sov-stat-num">{tensorStats.memoryFP32} MB</div>
                </div>
                <div className="sov-stat-card">
                  <div className="sov-report-lbl">Sparsity</div>
                  <div className="sov-stat-num">{tensorStats.sparsity}</div>
                </div>
              </div>
            </section>
            <aside className="sov-panel">
              <div className="sov-panel-title">Karmaşıklık Analizi</div>
              <div className="sov-list-item"><Icons.TrendingUp size={12}/> <span>Elements</span><span>{tensorStats.n}</span></div>
              <div className="sov-list-item"><Icons.Terminal size={12}/> <span>FLOPs</span><span>{(parseFloat(tensorStats.flops.replace(/,/g, '')) / 1e9).toFixed(2)} G</span></div>
              <div className="sov-list-item"><Icons.CheckCircle size={12}/> <span>Rank</span><span>{tensorStats.rank}</span></div>
              <div style={{ marginTop: '20px', padding: '15px', background: '#050508', borderRadius: '12px', border: '1px solid #111' }}>
                <div style={{ fontSize: '9px', fontWeight: 'bold', color: '#555', marginBottom: '8px' }}>MİMARİ NOT:</div>
                <p style={{ fontSize: '8px', color: '#333', lineHeight: '1.5', margin: 0 }}>
                  Tensör operasyonları, gizli katmanlardaki (hidden layers) aktivasyon yoğunluğunu ve matris çarpımı maliyetlerini simüle etmektedir.
                </p>
              </div>
            </aside>
          </div>
        )}

        <section className="sov-report-grid">
          {[
            { label: "Örneklem (n)", val: "1.240" },
            { label: "Katlama (k)", val: kFoldValue },
            { label: "Ort. Hata (MSE)", val: "0.034" },
            { label: "Std. Sapma (σ)", val: "0.012" },
            { label: "P-Değeri", val: "0.0042" },
            { label: "Genelleme Skoru", val: "92.4%" }
          ].map((item, idx) => (
            <div key={idx} className="sov-report-cell">
              <div className="sov-report-lbl">{item.label}</div>
              <div className="sov-report-val">{item.val}</div>
            </div>
          ))}
        </section>
      </main>

      <footer className="sov-footer">
        <div style={{ display: 'flex', gap: '30px' }}>
          <span>Strategy: K-Fold / Hold-out Validation</span>
          <span>Gen: Statistical Learning Theory</span>
        </div>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: KAPLAN HALI YIKAMA PRECISION DEPT</div>
      </footer>
    </div>
  );
};

export default App;
