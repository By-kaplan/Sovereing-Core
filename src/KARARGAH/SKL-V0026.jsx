/**
 * SOVEREIGN CORE LIBRARY
 * @project: ERROR LOGIC - BIAS-VARIANCE TRADEOFF
 * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version: v4.1.1-ERROR-ANALYSIS
 * @note: [PLUG-AND-PLAY]: Sıfır bağımlılık, Saf SVG/JS mimarisi.
 * @description: Karmaşıklık analizi, Sapma-Varyans dengesi ve üye verimlilik denetimi.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- CORE LOGIC: errorLogicEngine.js ---
const errorLogicEngine = {
  calculateTradeoff: (complexity) => {
    // Bias^2 düşer, Variance artar.
    const biasSq = 100 * Math.exp(-0.5 * complexity);
    const variance = 2 * Math.pow(complexity, 1.8);
    const noise = 15; 
    const totalError = biasSq + variance + noise;
    
    return { 
      complexity: complexity,
      biasSq, 
      variance, 
      noise, 
      totalError 
    };
  },

  generateTradeoffCurve: (points = 40) => {
    return Array.from({ length: points }, (_, i) => {
      const c = (i / (points - 1)) * 10;
      return errorLogicEngine.calculateTradeoff(c);
    });
  },

  findSweetSpot: (curveData) => {
    return curveData.reduce((min, p) => p.totalError < min.totalError ? p : min, curveData[0]);
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

const INITIAL_PROJECT_DATA = {
  appId: "ecc-error-011",
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
  TrendingDown: ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  Zap: ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Crosshair: ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
};

// --- CHART COMPONENTS (Pure SVG Engines) ---

const TradeoffCurveSovereign = ({ data, activeComplexity, sweetSpot }) => {
  const maxVal = 150;
  
  const getPoints = (key) => {
    return data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d[key] / maxVal) * 100;
      return `${x},${y}`;
    }).join(' ');
  };

  const cursorX = (activeComplexity / 10) * 100;
  const sweetX = (sweetSpot.complexity / 10) * 100;

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Grid Lines */}
      {[25, 50, 75].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#1e293b" strokeWidth="0.2" />)}
      
      {/* Sweet Spot Line */}
      <line x1={sweetX} y1="0" x2={sweetX} y2="100" stroke="#10b981" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
      
      {/* Curves */}
      <polyline points={getPoints('biasSq')} fill="none" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="1,1" />
      <polyline points={getPoints('variance')} fill="none" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="1,1" />
      <polyline points={getPoints('noise')} fill="none" stroke="#64748b" strokeWidth="0.5" strokeDasharray="1,2" />
      <polyline points={getPoints('totalError')} fill="none" stroke="#10b981" strokeWidth="1.5" />
      
      {/* Active Cursor */}
      <line x1={cursorX} y1="0" x2={cursorX} y2="100" stroke="#3b82f6" strokeWidth="0.5" />
      <circle cx={cursorX} cy={100 - (errorLogicEngine.calculateTradeoff(activeComplexity).totalError / maxVal) * 100} r="1.5" fill="#3b82f6" />
    </svg>
  );
};

const PieChartSovereign = ({ data }) => {
  const total = data.reduce((a, b) => a + b.value, 0);
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <svg width="100%" height="100%" viewBox="-1.2 -1.2 2.4 2.4">
      {data.map((slice, i) => {
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += slice.value / total;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
        const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;
        const pathData = [
          `M ${startX} ${startY}`,
          `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          `L 0 0`,
        ].join(' ');
        return <path key={i} d={pathData} fill={slice.color} stroke="#0f172a" strokeWidth="0.02" />;
      })}
      <circle cx="0" cy="0" r="0.6" fill="#0f172a" />
    </svg>
  );
};

const BarChartSovereign = ({ data, dataKey }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    {data.map((d, i) => {
      const height = (parseFloat(d[dataKey]) / 100) * 100;
      const width = 100 / data.length - 4;
      return (
        <rect 
          key={i} 
          x={i * (100 / data.length) + 2} 
          y={100 - height} 
          width={width} 
          height={height} 
          fill="#3b82f6" 
          rx="1"
          opacity="0.8"
        />
      );
    })}
  </svg>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('ERROR');
  const [complexity, setComplexity] = useState(4.2);
  
  const tradeoffCurve = useMemo(() => errorLogicEngine.generateTradeoffCurve(40), []);
  const currentMetrics = useMemo(() => errorLogicEngine.calculateTradeoff(complexity), [complexity]);
  const sweetSpot = useMemo(() => errorLogicEngine.findSweetSpot(tradeoffCurve), [tradeoffCurve]);
  const equityMetrics = useMemo(() => equityEngine.calculateMetrics(INITIAL_PROJECT_DATA.members), []);

  const gss = `
    .sov-root { background: #020617; color: #94a3b8; font-family: 'JetBrains Mono', monospace; min-height: 100vh; padding: 32px; }
    .sov-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 24px; margin-bottom: 32px; }
    .sov-nav { display: flex; background: #0f172a; padding: 4px; border-radius: 8px; border: 1px solid #1e293b; }
    .sov-nav-btn { padding: 6px 16px; background: transparent; border: none; color: #475569; font-size: 10px; font-weight: bold; cursor: pointer; border-radius: 6px; text-transform: uppercase; transition: 0.3s; }
    .sov-nav-btn.active { background: #3b82f6; color: #fff; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2); }
    
    .sov-grid { display: grid; grid-template-columns: 1fr 340px; gap: 32px; }
    .sov-panel { background: #0a0f1e; border: 1px solid #1e293b; border-radius: 20px; padding: 24px; position: relative; }
    .sov-panel-title { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; font-weight: 800; }
    
    .chart-box { height: 320px; width: 100%; border: 1px solid #1e293b; border-radius: 12px; background: #030712; position: relative; padding: 20px; overflow: hidden; }
    
    .sov-slider { width: 100%; height: 4px; background: #1e293b; border-radius: 2px; outline: none; -webkit-appearance: none; margin: 16px 0; }
    .sov-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; background: #3b82f6; border-radius: 50%; cursor: pointer; border: 2px solid #fff; }
    
    .sov-list-item { display: flex; align-items: center; justify-content: space-between; font-size: 10px; padding: 12px; background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; margin-bottom: 8px; }
    .sov-report-grid { display: grid; grid-template-columns: repeat(6, 1fr); border-top: 1px solid #1e293b; background: #030712; margin-top: 32px; }
    .sov-report-cell { padding: 20px; border-right: 1px solid #1e293b; text-align: center; }
    .sov-report-lbl { font-size: 8px; color: #475569; margin-bottom: 5px; text-transform: uppercase; font-weight: bold; }
    .sov-report-val { font-size: 13px; font-weight: bold; color: #f1f5f9; }

    .badge { font-size: 8px; font-weight: bold; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
    .badge-blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
    .badge-red { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
    .badge-green { background: rgba(16, 185, 129, 0.1); color: #10b981; }
  `;

  return (
    <div className="sov-root">
      <style>{gss}</style>

      <header className="sov-header">
        <div>
          <h1 className="flex items-center gap-3 text-white text-2xl font-black tracking-tighter uppercase">
            <Icons.Layers className="text-blue-500" /> MÜHENDİS KONTROL MERKEZİ <span className="text-blue-500 text-sm">v4.1.1</span>
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest italic">Sistem Stabilizasyonu: Sapma-Varyans Analiz Modülü</p>
        </div>
        <nav className="sov-nav">
          {['EQUITY', 'VALIDATION', 'ERROR'].map(tab => (
            <button key={tab} className={`sov-nav-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}-LOGIC</button>
          ))}
        </nav>
      </header>

      <main>
        {activeTab === 'ERROR' && (
          <div className="sov-grid">
            <section className="sov-panel">
              <div className="flex justify-between items-center mb-6">
                <div className="sov-panel-title"><Icons.TrendingDown /> Hata Dekompozisyonu (Bias-Variance)</div>
                <div className="badge badge-green">Hedef: Minimal Beklenen Hata</div>
              </div>
              <div className="chart-box">
                <TradeoffCurveSovereign data={tradeoffCurve} activeComplexity={complexity} sweetSpot={sweetSpot} />
                <div style={{ position: 'absolute', top: '20px', right: '20px', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 'bold' }}>TOTAL ERROR</div>
                  <div style={{ fontSize: '9px', color: '#3b82f6', opacity: 0.7 }}>BIAS² (SAPMA)</div>
                  <div style={{ fontSize: '9px', color: '#ef4444', opacity: 0.7 }}>VARIANCE (VARYANS)</div>
                </div>
              </div>
              <div style={{ marginTop: '32px', padding: '24px', background: '#030712', border: '1px solid #1e293b', borderRadius: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div>
                  <div className="flex justify-between items-center">
                    <div className="sov-report-lbl">Karmaşıklık ($M$): {complexity.toFixed(1)}</div>
                    <span className={`badge ${complexity < 3 ? 'badge-blue' : complexity > 7 ? 'badge-red' : 'badge-green'}`}>
                      {complexity < 3 ? 'Underfitting' : complexity > 7 ? 'Overfitting' : 'Optimal Fit'}
                    </span>
                  </div>
                  <input type="range" className="sov-slider" min="0" max="10" step="0.1" value={complexity} onChange={e => setComplexity(parseFloat(e.target.value))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="sov-list-item">
                    <span className="sov-report-lbl">Bias²</span>
                    <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>{currentMetrics.biasSq.toFixed(2)}</span>
                  </div>
                  <div className="sov-list-item">
                    <span className="sov-report-lbl">Variance</span>
                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{currentMetrics.variance.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <section className="sov-panel">
                <div className="sov-panel-title"><Icons.Crosshair /> Hata Bileşenleri</div>
                <div style={{ height: '180px' }}>
                  <PieChartSovereign data={[
                    { name: 'Bias²', value: currentMetrics.biasSq, color: '#3b82f6' },
                    { name: 'Variance', value: currentMetrics.variance, color: '#ef4444' },
                    { name: 'Noise', value: currentMetrics.noise, color: '#475569' }
                  ]} />
                </div>
                <div className="sov-list-item" style={{ marginTop: '20px', borderStyle: 'dashed' }}>
                  <span className="sov-report-lbl">Toplam Hata (Loss)</span>
                  <span style={{ color: '#10b981', fontWeight: '900' }}>{currentMetrics.totalError.toFixed(2)}</span>
                </div>
              </section>

              <section className="sov-panel">
                <div className="sov-panel-title"><Icons.Zap /> Stabilite Denetimi</div>
                <div style={{ fontSize: '9px', marginBottom: '10px' }}>GENELLEME BOŞLUĞU</div>
                <div style={{ height: '4px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, (currentMetrics.variance / 1.5))}%`, background: '#3b82f6' }} />
                </div>
                <p style={{ marginTop: '16px', fontSize: '8px', color: '#475569', lineHeight: '1.4' }}>
                  Karmaşıklık artışı varyansı tetikler; model eğitim verisini ezberleme riskine girer.
                </p>
              </section>
            </aside>
          </div>
        )}

        {activeTab === 'EQUITY' && (
          <div className="sov-grid">
            <section className="sov-panel">
              <div className="sov-panel-title"><Icons.Activity /> İş Yükü Varyans Analizi</div>
              <div className="chart-box">
                <BarChartSovereign data={equityMetrics} dataKey="difficultySum" />
              </div>
              <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {equityMetrics.map(m => (
                  <div key={m.id} className="sov-panel" style={{ padding: '16px', background: '#030712' }}>
                    <div className="sov-report-lbl">{m.name}</div>
                    <div className="text-white font-bold">{m.contributionScore}%</div>
                  </div>
                ))}
              </div>
            </section>
            <aside className="sov-panel">
              <div className="sov-panel-title">Üye Sapma İndeksi</div>
              {equityMetrics.map(m => (
                <div key={m.id} className="sov-list-item">
                  <span>{m.name}</span>
                  <span style={{ color: parseFloat(m.imbalance) > 0 ? '#ef4444' : '#10b981' }}>{parseFloat(m.imbalance) > 0 ? '+' : ''}{m.imbalance} Δ</span>
                </div>
              ))}
            </aside>
          </div>
        )}

        {activeTab === 'VALIDATION' && (
          <div style={{ padding: '100px', textAlign: 'center', background: '#0a0f1e', borderRadius: '20px', border: '1px solid #1e293b' }}>
            <div className="sov-report-lbl">Doğrulama Analiz Katmanı Hazırlanıyor...</div>
          </div>
        )}

        <section className="sov-report-grid">
          {[
            { label: "Bias^2 (Sapma)", val: currentMetrics.biasSq.toFixed(2) },
            { label: "Variance (Varyans)", val: currentMetrics.variance.toFixed(2) },
            { label: "Gürültü (ε)", val: "15.00" },
            { label: "Toplam Loss", val: currentMetrics.totalError.toFixed(2) },
            { label: "Serbestlik Derecesi", val: Math.floor(complexity * 12) },
            { label: "Stabilite Skoru", val: (100 - (currentMetrics.variance / currentMetrics.totalError) * 100).toFixed(1) + "%" }
          ].map((item, idx) => (
            <div key={idx} className="sov-report-cell">
              <div className="sov-report-lbl">{item.label}</div>
              <div className="sov-report-val">{item.val}</div>
            </div>
          ))}
        </section>
      </main>

      <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase' }}>
        <div style={{ display: 'flex', gap: '32px' }}>
          <span>Metodoloji: Bias-Variance Decomposition</span>
          <span>Hata Denetimi: Aktif</span>
        </div>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: KAPLAN HALI YIKAMA PRECISION DEPT</div>
      </footer>
    </div>
  );
}
