/**
 * SOVEREIGN CORE LIBRARY
 * @project: FLUID CURRICULUM ENGINE | LIMITLESS SCHOOL
 * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @credits: Open-source ecosystem: React (Core Engine).
 * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.
 * @description: Bilişsel akış dengesi, dinamik müfredat yönlendirme ve adaptif öğrenme metrikleri motoru.
 */

import React, { useState, useMemo, useEffect } from 'react';

// --- CORE LOGIC: fluidCurriculumEngine.js ---
const fluidCurriculumEngine = {
  calculateFlowPhi: (skill, challenge) => {
    const diff = Math.abs(skill - challenge);
    const maxVal = Math.max(skill, challenge, 1);
    return (1 - diff / maxVal).toFixed(3);
  }
};

const INITIAL_LEARNING_METRICS = {
  flowPhi: 0.885,
  adaptationLatency: 45,
  masteryRate: 72.4,
  momentumIndex: 1.42,
  cognitiveLoad: 42,
  branchingCount: 14,
  flowZoneData: [
    { x: 10, y: 15, z: 5, status: 'Boredom' },
    { x: 45, y: 50, z: 8, status: 'Flow' },
    { x: 80, y: 95, z: 6, status: 'Anxiety' },
    { x: 55, y: 60, z: 10, status: 'Flow' },
    { x: 30, y: 35, z: 7, status: 'Flow' },
  ],
  retentionCurve: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    retention: Math.exp(-0.05 * i) * 100,
    optimized: Math.exp(-0.01 * i) * 100
  }))
};

// --- PURE SVG ASSETS (Manual Vector Mastery) ---
const Icons = {
  Orbit: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="3"/><path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>
  ),
  Brain: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-4.16Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-4.16Z"/></svg>
  ),
  Waypoints: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="3"/><path d="M16 16l3 3"/><path d="M19 5l-3 3"/><path d="M5 19l3-3"/><path d="M8 8L5 5"/></svg>
  ),
  Refresh: ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
  ),
  Gauge: ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
  ),
  Target: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  Cpu: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
  ),
  Activity: ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  )
};

// --- SUB-COMPONENTS (Manual SVG Charts) ---
const FlowScatter = ({ data }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <line x1="0" y1="100" x2="100" y2="0" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
    <text x="5" y="95" fill="#334155" fontSize="4" fontWeight="bold">SIKILMA</text>
    <text x="75" y="10" fill="#334155" fontSize="4" fontWeight="bold">KAYGI</text>
    {data.map((p, i) => (
      <circle key={i} cx={p.x} cy={100 - p.y} r={p.z / 2} fill="#10b981" opacity="0.6">
        <animate attributeName="r" values={`${p.z/2};${p.z/2 + 1};${p.z/2}`} dur="3s" repeatCount="indefinite" />
      </circle>
    ))}
  </svg>
);

const RetentionLine = ({ data }) => {
  const points = data.map((d, i) => `${(i / 23) * 100},${100 - d.retention}`).join(' ');
  const optPoints = data.map((d, i) => `${(i / 23) * 100},${100 - d.optimized}`).join(' ');
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" points={points} />
      <polyline fill="none" stroke="#10b981" strokeWidth="2" points={optPoints} />
    </svg>
  );
};

const App = () => {
  const [metrics, setMetrics] = useState(INITIAL_LEARNING_METRICS);
  const [activePath, setActivePath] = useState('Quantum Computing');
  const [isAdapting, setIsAdapting] = useState(false);
  const [evolutionLogs, setEvolutionLogs] = useState([]);

  const triggerAdaptation = () => {
    if (isAdapting) return;
    setIsAdapting(true);
    const newLog = {
      id: `EVO-${Math.floor(Math.random() * 10000)}`,
      timestamp: new Date().toLocaleTimeString(),
      status: "STABLE",
      analysis: "Bilişsel durum yeniden haritalandı. Akış bölgesini korumak için zorluk +12% kaydırıldı."
    };
    setEvolutionLogs(prev => [newLog, ...prev].slice(0, 5));
    setTimeout(() => {
      setIsAdapting(false);
      setMetrics(prev => ({
        ...prev,
        flowPhi: (Math.random() * (0.95 - 0.85) + 0.85).toFixed(3),
        masteryRate: (parseFloat(prev.masteryRate) + 0.5).toFixed(1),
        momentumIndex: (Math.random() * 0.5 + 1.2).toFixed(2),
        cognitiveLoad: Math.floor(Math.random() * (50 - 35) + 35)
      }));
    }, 1500);
  };

  // --- GSS (VANILLA CSS INTEGRITY) ---
  const gss = `
    .sov-root { background: #050508; color: #ccc; font-family: 'JetBrains Mono', monospace; min-height: 100vh; padding: 40px; }
    .sov-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1a1a1f; padding-bottom: 25px; margin-bottom: 40px; }
    .sov-nav { display: flex; background: #0d0d0d; padding: 4px; border-radius: 8px; border: 1px solid #1a1a1f; }
    .sov-nav-btn { padding: 6px 12px; background: transparent; border: none; color: #444; font-size: 9px; font-weight: bold; cursor: pointer; border-radius: 5px; text-transform: uppercase; transition: 0.3s; }
    .sov-nav-btn.active { background: #10b981; color: #fff; }
    
    .sov-btn-adapt { background: #0d0d0d; border: 1px solid #1a1a1f; color: #ccc; padding: 8px 16px; border-radius: 6px; font-size: 10px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
    .sov-btn-adapt.loading { border-color: #10b981; color: #10b981; box-shadow: 0 0 15px rgba(16,185,129,0.1); }
    .sov-btn-adapt:hover:not(.loading) { background: #1a1a1f; border-color: #333; }

    .sov-grid { display: grid; grid-template-columns: 320px 1fr 320px; gap: 30px; }
    .sov-panel { background: #0a0a0f; border: 1px solid #1a1a1f; border-radius: 20px; padding: 24px; position: relative; }
    .sov-panel-title { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #555; margin-bottom: 25px; display: flex; align-items: center; gap: 10px; font-weight: 800; }
    
    .sov-phi-box { margin-bottom: 30px; }
    .sov-phi-val { font-size: 42px; font-weight: 900; color: #fff; letter-spacing: -2px; }
    .sov-progress-bg { height: 4px; background: #111; border-radius: 2px; overflow: hidden; margin-top: 15px; }
    .sov-progress-fill { height: 100%; background: #10b981; transition: 1s; }

    .chart-box { height: 180px; width: 100%; border: 1px solid #111; border-radius: 12px; padding: 10px; background: #070707; position: relative; }
    
    .sov-graph-view { height: 480px; background: #000; border: 1px solid #1a1a1f; border-radius: 24px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .sov-brain-node { width: 100px; height: 100px; border: 2px solid #10b981; border-radius: 50%; background: #0a0a0f; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10; transition: 0.7s; box-shadow: 0 0 40px rgba(16,185,129,0.1); }
    .sov-node-label { font-size: 8px; color: #fff; font-weight: bold; text-transform: uppercase; margin-top: 5px; text-align: center; max-width: 80%; }
    
    .sov-log-item { font-size: 8px; border-bottom: 1px solid #111; padding: 10px 0; }
    .sov-log-id { color: #555; font-weight: bold; display: flex; justify-content: space-between; text-transform: uppercase; }
    
    .sov-footer { margin-top: 40px; border-top: 1px solid #1a1a1f; padding-top: 20px; display: flex; justify-content: space-between; font-size: 9px; color: #333; font-weight: bold; text-transform: uppercase; }
    
    .sov-metric-card { background: #050508; padding: 12px; border: 1px solid #111; border-radius: 10px; display: flex; align-items: center; gap: 10px; }
    
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .anim-spin { animation: spin 2s linear infinite; }
  `;

  return (
    <div className="sov-root">
      {/* lgtm[js/html-injection] */}
      <style>{gss}</style>

      <header className="sov-header">
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: 0, fontSize: '20px', fontWeight: '900', color: '#10b981' }}>
            <Icons.Orbit /> FLUID CURRICULUM ENGINE
          </h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '9px', color: '#555', textTransform: 'uppercase', letterSpacing: '2px' }}>Cognitive Flow Optimization | LIMITLESS SCHOOL | Φ: {metrics.flowPhi}</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <nav className="sov-nav">
            {['Quantum Physics', 'Bio-Engineering', 'Neural Nets'].map(p => (
              <button key={p} className={`sov-nav-btn ${activePath === p ? 'active' : ''}`} onClick={() => setActivePath(p)}>{p}</button>
            ))}
          </nav>
          <button className={`sov-btn-adapt ${isAdapting ? 'loading' : ''}`} onClick={triggerAdaptation}>
            <div className={isAdapting ? 'anim-spin' : ''}><Icons.Refresh /></div>
            {isAdapting ? 'EVOLVING...' : 'ADAPT CURRICULUM'}
          </button>
        </div>
      </header>

      <main className="sov-grid">
        {/* Left Column: Cognitive Metrics */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Gauge /> Akış Katsayısı (Φ)</div>
            <div className="sov-phi-box">
              <div className="sov-phi-val">Φ {metrics.flowPhi}</div>
              <div style={{ fontSize: '9px', color: '#444', textTransform: 'uppercase', marginTop: '5px' }}>Bilişsel Akış Dengesi</div>
              <div className="sov-progress-bg">
                <div className="sov-progress-fill" style={{ width: `${metrics.flowPhi * 100}%` }}></div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>{metrics.masteryRate}%</span>
                <span style={{ display: 'block', fontSize: '8px', color: '#444' }}>HAKİMİYET</span>
              </div>
              <div>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b' }}>{metrics.adaptationLatency}ms</span>
                <span style={{ display: 'block', fontSize: '8px', color: '#444' }}>ADAPTASYON</span>
              </div>
            </div>
          </section>

          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Activity /> Akış Kanalı Analizi</div>
            <div className="chart-box">
              <FlowScatter data={metrics.flowZoneData} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7px', color: '#333', marginTop: '10px', fontWeight: 'bold' }}>
              <span>AKIŞ BÖLGESİ</span>
              <span style={{ color: '#555' }}>DİNAMİK ÖĞRENME KANALI</span>
              <span>Φ OPTİMİZASYON</span>
            </div>
          </section>
        </aside>

        {/* Middle Column: Knowledge Graph */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div className="sov-graph-view">
            <div className="sov-brain-node" style={{ transform: isAdapting ? 'scale(1.1)' : 'scale(1)' }}>
              <Icons.Brain />
              <div className="sov-node-label">{activePath}</div>
            </div>
            {/* Orbital Nodes */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <div key={i} style={{ position: 'absolute', transform: `rotate(${angle}deg) translateY(${isAdapting ? -140 : -120}px) rotate(-${angle}deg)`, transition: '0.7s' }}>
                <div style={{ width: '40px', height: '40px', background: '#0d0d0d', border: '1px solid #1a1a1f', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isAdapting ? 0.5 : 1 }}>
                  <Icons.Waypoints />
                </div>
                <div style={{ position: 'absolute', width: '1px', height: '80px', background: 'linear-gradient(to top, #10b98144, transparent)', bottom: '40px', left: '20px' }}></div>
              </div>
            ))}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '9px', color: '#222', letterSpacing: '2px', fontWeight: 'bold' }}>DYNAMIC_NEURAL_ROUTING</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
            <div className="sov-metric-card">
              <Icons.Target />
              <div>
                <span style={{ display: 'block', fontSize: '7px', color: '#444' }}>DALLANMASAYISI</span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>{metrics.branchingCount} Aktif Rota</span>
              </div>
            </div>
            <div className="sov-metric-card">
              <div style={{ color: '#10b981' }}><Icons.Orbit /></div>
              <div>
                <span style={{ display: 'block', fontSize: '7px', color: '#444' }}>MOMENTUM</span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#10b981' }}>x{metrics.momentumIndex}</span>
              </div>
            </div>
            <div className="sov-metric-card">
               <div style={{ color: '#f59e0b' }}><Icons.Refresh /></div>
               <div>
                <span style={{ display: 'block', fontSize: '7px', color: '#444' }}>BİLİŞSELYÜK</span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#f59e0b' }}>%{metrics.cognitiveLoad}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Persistence & Evolution Feed */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <section className="sov-panel" style={{ flex: 1 }}>
            <div className="sov-panel-title">Knowledge Persistence</div>
            <div className="chart-box" style={{ height: '120px', marginBottom: '20px' }}>
              <RetentionLine data={metrics.retentionCurve} />
              <div style={{ textAlign: 'center', fontSize: '7px', color: '#444', marginTop: '5px' }}>UNUTMA EĞRİSİ VS OPTİMİZASYON</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
              <div style={{ background: '#050508', borderLeft: '2px solid #10b981', padding: '10px', borderRadius: '4px' }}>
                <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#fff' }}>REINFORCEMENT NODE</span>
                <p style={{ margin: '5px 0 0 0', fontSize: '8px', color: '#555', lineHeight: '1.4' }}>"Entropy and Information Theory" hatırlatıcı düğümü akışa dahil edildi.</p>
              </div>
              <div style={{ background: '#050508', borderLeft: '2px solid #3b82f6', padding: '10px', borderRadius: '4px' }}>
                <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#fff' }}>P2P MATCHER</span>
                <p style={{ margin: '5px 0 0 0', fontSize: '8px', color: '#555', lineHeight: '1.4' }}>Benzer ilgi alanına sahip 2 öğrenci mikro-proje için hazır.</p>
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '9px', fontWeight: '800', color: '#333', marginBottom: '15px', borderBottom: '1px solid #111', paddingBottom: '5px' }}>CURRICULUM EVOLUTION FEED</div>
              {evolutionLogs.map(log => (
                <div key={log.id} className="sov-log-item">
                  <div className="sov-log-id"><span>{log.id}</span> <span style={{ color: '#10b981' }}>{log.status}</span></div>
                  <div style={{ marginTop: '3px', color: '#555' }}>{log.analysis}</div>
                </div>
              ))}
              {!evolutionLogs.length && (
                <div style={{ textAlign: 'center', padding: '30px', opacity: 0.2 }}>
                  <Icons.Cpu />
                  <div style={{ fontSize: '8px', marginTop: '10px' }}>MONITORING COGNITIVE STATE...</div>
                </div>
              )}
            </div>
          </section>
        </aside>
      </main>

      <footer className="sov-footer">
        <div style={{ display: 'flex', gap: '30px' }}>
          <span>GRAPH-DENSITY: OPTIMAL</span>
          <span>SKILL-GAP: ε &lt; 0.05</span>
        </div>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: KAPLAN HALI YIKAMA PRECISION DEPT</div>
      </footer>
    </div>
  );
};

export default App;
