/**
 * SOVEREIGN CORE LIBRARY
 * @project: NÖRO-ANLATI VE ANLATIR ZEKA MOTORU (NEURO-NARRATIVE ENGINE)
 * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version: v4.5.1-SOVEREIGN-PURE
 * @note: [PLUG-AND-PLAY]: Sıfır bağımlılık (No Lucide, No Recharts).
 * @description: Akılda kalıcılık (Λ) analizi, Freytag Piramidi haritalama ve nöro-semantik rezonans.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- 1. CORE LOGIC: narrativeLogicEngine.js ---
const narrativeLogicEngine = {
  calculateNarrativeEfficiency: (dataIntegrity, emotionalValence, retentionRate) => {
    // Lambda (Λ) - Akılda Kalıcılık Katsayısı
    const lambda = (retentionRate * (1 + emotionalValence * 0.25)).toFixed(4);
    // Semantik Rezonans Skoru
    const resonance = (dataIntegrity * Math.log2(1 + parseFloat(lambda))).toFixed(2);
    
    return {
      lambda: parseFloat(lambda),
      resonance: parseFloat(resonance),
      efficiencyAudit: lambda > 0.85 ? 'OPTIMIZED' : 'SUBOPTIMAL',
      cognitiveLoad: (1 - retentionRate / 2).toFixed(2)
    };
  }
};

// --- 2. SOVEREIGN SVG ASSETS (Manual Vector Icons) ---
const Icons = {
  Zap: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Brain: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-4.16Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-4.16Z"/></svg>
  ),
  Target: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  Activity: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  ShieldCheck: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  Cpu: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
  ),
  Refresh: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
  ),
  BookOpen: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  BarChart: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
  ),
  Dna: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="m8 3 4 8 5-5"/><path d="m17 21-4-8-5 5"/><circle cx="14" cy="6" r="2"/><circle cx="10" cy="18" r="2"/></svg>
  )
};

// --- 3. CHART COMPONENTS (Manual SVG Engines) ---

const SovereignRadarChart = ({ data, color = "#6366f1" }) => {
  const center = 50;
  const radius = 35;
  const angleStep = (Math.PI * 2) / data.length;

  const points = data.map((d, i) => {
    const r = (d.A / 100) * radius;
    const x = center + Math.cos(i * angleStep - Math.PI / 2) * r;
    const y = center + Math.sin(i * angleStep - Math.PI / 2) * r;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      {[0.2, 0.4, 0.6, 0.8, 1].map(f => (
        <circle key={f} cx={center} cy={center} r={radius * f} fill="none" stroke="#1e293b" strokeWidth="0.5" />
      ))}
      {data.map((_, i) => (
        <line key={i} x1={center} y1={center} 
              x2={center + Math.cos(i * angleStep - Math.PI / 2) * radius} 
              y2={center + Math.sin(i * angleStep - Math.PI / 2) * radius} 
              stroke="#1e293b" strokeWidth="0.5" />
      ))}
      <polygon points={points} fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
      {data.map((d, i) => {
        const x = center + Math.cos(i * angleStep - Math.PI / 2) * (radius + 8);
        const y = center + Math.sin(i * angleStep - Math.PI / 2) * (radius + 8);
        return <text key={i} x={x} y={y} fontSize="3" fill="#64748b" textAnchor="middle" alignmentBaseline="middle" className="uppercase font-bold">{d.subject}</text>;
      })}
    </svg>
  );
};

const SovereignAreaChart = ({ data, color = "#6366f1" }) => {
  const getPath = (key) => {
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - d[key];
      return `${x},${y}`;
    });
    return `M 0,100 ${points.map(p => `L ${p}`).join(' ')} L 100,100 Z`;
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={getPath('focus')} fill="url(#areaGrad)" stroke={color} strokeWidth="1" />
      <path d={getPath('empathy')} fill="none" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="2,2" />
    </svg>
  );
};

// --- 4. DATA SCHEMA ---
const INITIAL_METRICS = {
  lambda: 0.9241,
  tension: 78,
  transferEfficiency: 94.2,
  dopaminergicThreshold: 0.82,
  semanticResonance: 88.5,
  biometricPredictions: Array.from({ length: 12 }, (_, i) => ({
    time: i * 5,
    focus: 60 + Math.sin(i * 0.5) * 20,
    empathy: 40 + Math.cos(i * 0.5) * 30,
    retention: 50 + (i * 4)
  })),
  radarData: [
    { subject: 'Kalıcılık', A: 92 },
    { subject: 'Duygu', A: 78 },
    { subject: 'Bilişsel', A: 45 },
    { subject: 'Bütünlük', A: 98 },
    { subject: 'Netlik', A: 85 }
  ]
};

// --- 5. MAIN APP COMPONENT ---
export default function App() {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [activeStoryType, setActiveStoryType] = useState('Epic');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [storyLogs, setStoryLogs] = useState([
    { ts: '0ms', msg: 'Ham Veri -> Kahramanın Yolculuğu eşleşmesi başlatıldı.', type: 'system' },
    { ts: '450ms', msg: 'Anatagonist Parametresi: Veri Bozulması (Bit-Rot) tanımlandı.', type: 'logic' },
    { ts: '1200ms', msg: 'Hipokampal Kanca (Mnemonic Hook) yerleştirildi.', type: 'neuro' }
  ]);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const audit = narrativeLogicEngine.calculateNarrativeEfficiency(0.98, 0.75, 0.92);
      setMetrics(prev => ({
        ...prev,
        lambda: audit.lambda,
        semanticResonance: audit.resonance
      }));
      setStoryLogs(prev => [
        { ts: `${Date.now() % 1000}ms`, msg: `Anlatı Verimliliği Denetimi: ${audit.efficiencyAudit}`, type: 'success' },
        ...prev
      ]);
    }, 1500);
  };

  const gss = `
    .sov-root { background: #020408; color: #94a3b8; font-family: 'JetBrains Mono', monospace; min-height: 100vh; padding: 32px; }
    .sov-header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 24px; margin-bottom: 32px; }
    .sov-panel { background: rgba(10, 12, 18, 0.8); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; backdrop-filter: blur(12px); }
    .sov-panel-title { font-size: 10px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
    
    .sov-grid { display: grid; grid-template-columns: 360px 1fr; gap: 24px; }
    .sov-btn { padding: 8px 16px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); font-size: 10px; font-weight: bold; transition: 0.3s; text-transform: uppercase; cursor: pointer; color: inherit; }
    .sov-btn.active { background: #4f46e5; color: #fff; border-color: #6366f1; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }
    
    .metric-card { background: rgba(255,255,255,0.03); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
    .metric-num { font-size: 22px; font-weight: 900; color: #fff; }
    .metric-lbl { font-size: 8px; color: #475569; text-transform: uppercase; font-weight: bold; margin-bottom: 4px; }

    .story-arc-container { position: relative; height: 450px; background: #05070a; border-radius: 24px; overflow: hidden; border: 1px solid rgba(99,102,241,0.1); }
    .core-anim { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
    
    .custom-scrollbar::-webkit-scrollbar { width: 3px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
  `;

  return (
    <div className="sov-root">
      <style>{gss}</style>

      <header className="sov-header">
        <div>
          <h1 className="flex items-center gap-4 text-indigo-500 text-2xl font-black tracking-tighter uppercase">
            <Icons.Brain size={32} className="text-indigo-400" /> NÖRO-ANLATI ZEKA MOTORU
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-[0.3em]">Neuro-Narrative Engineering • Akılda Kalıcılık (Λ): {metrics.lambda}</p>
        </div>
        <div className="flex gap-3">
          {['Epic', 'Technical', 'Interactive'].map(t => (
            <button key={t} className={`sov-btn ${activeStoryType === t ? 'active' : ''}`} onClick={() => setActiveStoryType(t)}>{t}</button>
          ))}
          <button className="sov-btn" style={{ background: '#059669', color: '#fff', border: 'none' }} onClick={runAnalysis} disabled={isAnalyzing}>
             <div className="flex items-center gap-2">
               <Icons.Refresh className={isAnalyzing ? 'animate-spin' : ''} />
               <span>{isAnalyzing ? "İŞLENİYOR..." : "ANALİZ ET"}</span>
             </div>
          </button>
        </div>
      </header>

      <main className="sov-grid">
        {/* Left: Metrics & Mapping */}
        <aside className="space-y-6">
          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Target /> Verimlilik Matrisi</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="metric-card"><div className="metric-lbl">Akılda Kalıcılık</div><div className="metric-num">{metrics.lambda}</div></div>
              <div className="metric-card"><div className="metric-lbl">Semantik Rezonans</div><div className="metric-num" style={{ color: '#6366f1' }}>{metrics.semanticResonance}</div></div>
              <div className="metric-card"><div className="metric-lbl">Dopamin Eşiği</div><div className="metric-num" style={{ color: '#f59e0b' }}>{metrics.dopaminergicThreshold}</div></div>
              <div className="metric-card"><div className="metric-lbl">Transfer Verimlilik</div><div className="metric-num" style={{ color: '#10b981' }}>%{metrics.transferEfficiency}</div></div>
            </div>
          </section>

          <section className="sov-panel" style={{ height: '260px' }}>
            <div className="sov-panel-title"><Icons.Dna /> Bilişsel Denge</div>
            <SovereignRadarChart data={metrics.radarData} />
          </section>

          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.BookOpen /> Protagonist Mapping</div>
            <div className="space-y-3">
               {[
                 { label: 'Antagonist', val: '⚠️ Sistemik Hata' },
                 { label: 'Protagonist', val: '👤 Ham Veri Seti' },
                 { label: 'Weapon', val: '⚔️ Mnemonic Hook' }
               ].map((m, i) => (
                 <div key={i} className="flex justify-between text-[9px] p-2 bg-white/5 rounded border border-white/5">
                   <span className="font-bold text-slate-500 uppercase">{m.label}</span>
                   <span className="text-white">{m.val}</span>
                 </div>
               ))}
            </div>
          </section>
        </aside>

        {/* Center: Story Arc Visualizer */}
        <div className="space-y-6">
          <section className="story-arc-container">
            <svg viewBox="0 0 1000 400" className="absolute inset-0 w-full h-full opacity-10 stroke-indigo-500 fill-none" strokeWidth="2">
              <path d="M 50 350 L 300 300 L 500 50 L 700 250 L 950 320" />
              {[50, 300, 500, 700, 950].map((x, i) => (
                <circle key={i} cx={x} cy={i === 2 ? 50 : i === 0 ? 350 : i === 1 ? 300 : i === 3 ? 250 : 320} r="4" fill="#6366f1" />
              ))}
            </svg>

            <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Anlatı Arkı Topografisi (Freytag)</span>
            </div>

            <div className="core-anim">
               <div className={`w-56 h-56 rounded-full border border-indigo-500/20 flex items-center justify-center transition-all duration-1000 ${isAnalyzing ? 'scale-110 rotate-90 border-emerald-500/40' : ''}`}>
                  <Icons.Zap size={48} className={isAnalyzing ? 'text-emerald-400' : 'text-indigo-400'} />
                  <div className="absolute -bottom-10 whitespace-nowrap text-[9px] font-black bg-black/50 px-3 py-1 border border-white/10 uppercase">Semantik Çekirdek</div>
               </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 p-6">
              <SovereignAreaChart data={metrics.biometricPredictions} />
            </div>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section className="sov-panel">
              <div className="sov-panel-title"><Icons.BarChart /> Mnemonics Optimizasyon</div>
              <div className="space-y-4">
                {[
                  { label: 'Hipokampal Kanca (LTP)', val: 88 },
                  { label: 'Bilişsel Çapa Skoru', val: 92 }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase">
                      <span>{item.label}</span><span>%{item.val}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${item.val}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="sov-panel">
              <div className="sov-panel-title"><Icons.Activity /> Anlatı Logu</div>
              <div className="h-24 overflow-y-auto space-y-2 text-[8px] font-mono pr-2 custom-scrollbar">
                {storyLogs.map((log, i) => (
                  <div key={i} className="flex gap-2 border-b border-white/5 pb-1">
                    <span className="text-indigo-500">[{log.ts}]</span>
                    <span className={log.type === 'neuro' ? 'text-pink-400' : log.type === 'logic' ? 'text-blue-400' : 'text-slate-500'}>{log.msg}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center opacity-60 text-[9px] font-bold uppercase tracking-widest">
        <div className="flex gap-10">
           <div><div className="text-slate-500 text-[8px] mb-1">Tansiyon</div><div>{metrics.tension}/100</div></div>
           <div><div className="text-slate-500 text-[8px] mb-1">Yük</div><div>LOW_STRESS</div></div>
        </div>
        <div className="px-4 py-1 rounded-full border border-indigo-500/30 text-indigo-500 flex items-center gap-2">
           <Icons.ShieldCheck /> NARRATIVE_FIDELITY: CERTIFIED
        </div>
        <div>ARCHITECT: ÖMER KAPLAN | PRECISION DEPT</div>
      </footer>
    </div>
  );
}
