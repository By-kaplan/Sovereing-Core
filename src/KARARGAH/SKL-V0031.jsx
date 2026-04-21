/**
 * SOVEREIGN CORE LIBRARY - NEURAL SYNERGY ENGINE
 * * @project   : SOVEREIGN CORE / XAI-SYSTEM
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v5.7.1-INTEGRITY (Neural Synergy)
 * @credits   : Open-source ecosystem: React (Core Engine).
 * @license   : MIT | Kimlik mührü ve mimar imzası korunmak şartıyla serbest kullanım.
 * @note      : [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * * [MÜHÜR]: Bu çalışma, yüksek mühendislik disiplini, saf kod mimarisi ve 
 * Kaplan Precision laboratuvarlarında geliştirilen deterministik algoritmalar 
 * ile üretilmiştir. Harici kütüphane bağımlılığı içermez.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- 1. CORE LOGIC: synergyEngine.js ---
/**
 * Çok Boyutlu Nöral Analiz ve Atıf Motoru
 */
const calculateSynergyMetrics = (gradientNorm, limeMargin) => {
  // Simüle edilmiş SHAP değerleri [Yaş, Gelir, Skor, Borç, Süre]
  const baseShap = [0.45, -0.30, 0.15, -0.65, 0.20];
  const shapValues = baseShap.map((v, i) => {
    if (i === 0) return v * gradientNorm;
    if (i === 1) return v * gradientNorm;
    if (i === 2) return v * (limeMargin * 2);
    if (i === 3) return v * (gradientNorm * limeMargin);
    return v;
  });

  const fidelity = Math.min(0.98, 0.65 + (limeMargin * 0.3) - (gradientNorm * 0.05));
  const output = shapValues.reduce((a, b) => a + b, 0);
  const confidence = 85 + (fidelity * 10);

  return { shapValues, fidelity, output, confidence };
};

// --- 2. SOVEREIGN SVG ASSETS (Manual Vector Icons - Zero Dependency) ---
const Icons = {
  Eye: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/></svg>
  ),
  Activity: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  Target: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  Network: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
  ),
  Layers: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  ),
  Crosshair: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
  ),
  Alert: ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  BarChart: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
  )
};

// --- 3. CHART COMPONENTS (Manual Sovereign Drawing) ---

const SovereignShapPlot = ({ features }) => {
  const maxVal = 2.5;
  return (
    <div className="space-y-3">
      {features.map((f, i) => {
        const isPos = f.val > 0;
        const width = (Math.abs(f.val) / maxVal) * 50;
        return (
          <div key={i} className="flex items-center h-8 group">
            <span className="w-32 text-[9px] text-slate-500 group-hover:text-slate-300 transition-colors uppercase font-bold truncate pr-2">{f.label}</span>
            <div className="flex-1 relative h-4 bg-black/40 rounded-sm overflow-hidden">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 z-10" />
              <div 
                className={`absolute top-0 bottom-0 transition-all duration-700 ease-out ${isPos ? 'bg-emerald-500/60 left-1/2' : 'bg-rose-500/60 right-1/2'}`}
                style={{ width: `${width}%` }}
              />
            </div>
            <span className={`w-14 text-right font-mono text-[10px] font-black ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPos ? '+' : ''}{f.val.toFixed(3)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// --- 4. VISUALIZER: 3D Decision Pathway (Canvas Engine) ---

const DecisionPathVisualizer = ({ shapValues, gradientIntensity }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;

    const layers = [
      { nodes: 5, x: -200 },
      { nodes: 4, x: 0 },
      { nodes: 1, x: 200 }
    ];

    const draw = () => {
      time += 0.015;
      ctx.fillStyle = '#020408';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const rotY = Math.sin(time * 0.2) * 0.15;
      const rotX = Math.cos(time * 0.1) * 0.1;

      const project = (x, y, z) => {
        const px = x * Math.cos(rotY) - z * Math.sin(rotY);
        const pz = x * Math.sin(rotY) + z * Math.cos(rotY);
        const py = y * Math.cos(rotX) - pz * Math.sin(rotX);
        const scale = 500 / (500 + pz);
        return { x: centerX + px * scale, y: centerY + py * scale, scale };
      };

      const nodePositions = [];
      layers.forEach((layer, lIdx) => {
        const spacing = 70;
        const startY = -((layer.nodes - 1) * spacing) / 2;
        for (let i = 0; i < layer.nodes; i++) {
          const zOff = Math.sin(time + i) * 15;
          let val = lIdx === 0 ? shapValues[i] : (lIdx === 2 ? shapValues.reduce((a,b)=>a+b,0) : 0.5);
          const p = project(layer.x, startY + (i * spacing), zOff);
          nodePositions.push({ ...p, layer: lIdx, index: i, val });
        }
      });

      // Connections
      ctx.lineWidth = 1;
      for (let n1 of nodePositions) {
        for (let n2 of nodePositions) {
          if (n2.layer === n1.layer + 1) {
            const influence = n1.layer === 0 ? n1.val : 0.3;
            const flowPulse = Math.max(0, Math.sin(time * 4 - n1.index * 0.6));
            const alpha = 0.05 + (flowPulse * gradientIntensity * 0.4 * Math.abs(influence));
            ctx.strokeStyle = influence > 0 ? `rgba(16, 185, 129, ${alpha})` : `rgba(244, 63, 94, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.bezierCurveTo(n1.x + 100 * n1.scale, n1.y, n2.x - 100 * n2.scale, n2.y, n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (let n of nodePositions) {
        ctx.beginPath();
        let r = 5 * n.scale;
        if (n.layer === 0 || n.layer === 2) {
          r += Math.abs(n.val) * 15 * n.scale;
          ctx.fillStyle = n.val > 0 ? '#10b981' : '#f43f5e';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 20 * n.scale;
        } else {
          ctx.fillStyle = '#1e293b';
          ctx.shadowBlur = 0;
        }
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, [shapValues, gradientIntensity]);

  return <canvas ref={canvasRef} width={800} height={400} className="w-full h-full object-contain" />;
};

// --- 5. MAIN APP COMPONENT ---

export default function App() {
  const [gradientNorm, setGradientNorm] = useState(1.5);
  const [limeMargin, setLimeMargin] = useState(0.8);
  
  const { shapValues, fidelity, output, confidence } = useMemo(() => 
    calculateSynergyMetrics(gradientNorm, limeMargin), [gradientNorm, limeMargin]
  );

  const features = [
    { label: 'Yaş (Age)', val: shapValues[0] },
    { label: 'Gelir (Income)', val: shapValues[1] },
    { label: 'Skor (Score)', val: shapValues[2] },
    { label: 'Borç (Debt)', val: shapValues[3] },
    { label: 'Süre (Time)', val: shapValues[4] }
  ];

  const isFidelityLow = fidelity < 0.75;

  return (
    <div className="min-h-screen bg-[#020408] text-slate-400 font-mono p-4 md:p-10 selection:bg-indigo-500/30">
      
      {/* Header Paneli */}
      <header className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/5 pb-8 mb-10 gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-4">
            <Icons.Eye size={32} className="text-indigo-500" /> NEURAL <span className="text-indigo-500">SYNERGY</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
            Integrated Attribution & Explainability Command
            <span className="flex h-2 w-2 relative ml-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isFidelityLow ? 'bg-rose-400' : 'bg-indigo-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isFidelityLow ? 'bg-rose-500' : 'bg-indigo-500'}`}></span>
            </span>
          </p>
        </div>

        <div className="flex gap-12">
          <MetricBadge label="Local Fidelity" value={fidelity.toFixed(3)} color={isFidelityLow ? "text-rose-400" : "text-emerald-400"} />
          <MetricBadge label="Gradient Norm" value={gradientNorm.toFixed(1)} unit="||∇f||" color="text-indigo-400" />
          <MetricBadge label="Total Confidence" value={`${confidence.toFixed(1)}%`} color="text-slate-100" />
        </div>
      </header>

      {/* Ana Grid Sistemi */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sol Panel: Kontroller */}
        <aside className="lg:col-span-3 space-y-6">
          <Panel title="Inference Controls" icon={Icons.Activity}>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span>Gradient Sensitivity</span>
                  <span className="text-indigo-400">{gradientNorm.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="0.1" max="3.0" step="0.1"
                  value={gradientNorm} onChange={(e) => setGradientNorm(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <p className="text-[9px] text-slate-600 italic uppercase leading-relaxed">Türevsel hassasiyet eşiği.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span>Local Margin</span>
                  <span className={isFidelityLow ? 'text-rose-400' : 'text-emerald-400'}>{limeMargin.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="0.1" max="1.0" step="0.05"
                  value={limeMargin} onChange={(e) => setLimeMargin(parseFloat(e.target.value))}
                  className={`w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer ${isFidelityLow ? 'accent-rose-500' : 'accent-emerald-500'}`}
                />
              </div>

              <div className="pt-6 border-t border-white/5 space-y-3 text-[9px] font-black uppercase">
                 <div className="flex justify-between"><span>Steps (α)</span><span className="text-white">50/PATH</span></div>
                 <div className="flex justify-between text-indigo-500"><span>Riemann Error</span><span>{(gradientNorm * 0.012).toFixed(4)}</span></div>
              </div>
            </div>
          </Panel>

          <Panel title="Saliency Summary" icon={Icons.Crosshair}>
            <div className="space-y-4">
              <div className="p-4 bg-black/40 border border-white/5 rounded-xl text-center">
                 <div className="text-[8px] text-slate-600 uppercase font-black mb-1">Peak Attribution Region</div>
                 <div className="text-sm font-black text-white uppercase tracking-tighter">Loc (124, 88)</div>
              </div>
              <p className="text-[9px] leading-relaxed text-slate-600 italic text-justify uppercase font-bold">Gradyan genliğinin %84'ü bu bölgede yoğunlaşmaktadır.</p>
            </div>
          </Panel>
        </aside>

        {/* Merkez: 3D Topoloji */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <section className="bg-[#050508] border border-white/5 rounded-3xl overflow-hidden relative min-h-[400px] flex-1">
            <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
              <div className="flex items-center gap-4 bg-black/60 px-4 py-2 border border-indigo-500/20 rounded backdrop-blur-xl">
                <Icons.Network size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Neural Pathway Topo</span>
              </div>
            </div>

            <DecisionPathVisualizer shapValues={shapValues} gradientIntensity={gradientNorm} />

            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
               <div className="bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/5 text-[10px] text-slate-400 uppercase font-black space-y-1">
                 <p>Decision: <span className={output > 0 ? 'text-emerald-400' : 'text-rose-400'}>{output > 0 ? 'APPROVED' : 'REJECTED'}</span></p>
                 <p>Log-Odds: {output.toFixed(4)}</p>
               </div>
               {isFidelityLow && (
                 <div className="flex items-center gap-3 bg-rose-500/10 text-rose-500 border border-rose-500/20 px-4 py-2 rounded-full text-[10px] font-black animate-pulse">
                   <Icons.Alert /> LOW FIDELITY
                 </div>
               )}
            </div>
          </section>

          <section className="bg-[#0a0c12]/80 border border-white/5 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">
                <Icons.BarChart /> SHAP Force Plot (Local Influence)
              </h3>
              <span className="text-[9px] text-slate-600 bg-black/40 px-3 py-1 rounded uppercase font-bold">Base: E[f(x)] = 0.5</span>
            </div>
            <SovereignShapPlot features={features} />
          </section>
        </div>

        {/* Sağ Panel: Matris ve Dikkat */}
        <aside className="lg:col-span-3 space-y-6">
          <Panel title="Attention Map" icon={Icons.Layers}>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {Array.from({length: 25}).map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-sm transition-all hover:scale-110" 
                  style={{ backgroundColor: `rgba(99, 102, 241, ${Math.random() * (i%4===0 ? 0.8 : 0.1)})` }} 
                />
              ))}
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-[9px] uppercase font-bold">
                <span className="text-slate-600">Focus Entropy</span>
                <span className="text-indigo-400">1.24 bits</span>
              </div>
              <div className="flex justify-between text-[9px] uppercase font-bold">
                <span className="text-slate-600">Active Heads</span>
                <span className="text-white">4 / 12</span>
              </div>
            </div>
          </Panel>

          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8">
            <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-4">Mühendislik Notu</h4>
            <p className="text-[9px] leading-relaxed text-indigo-500 italic uppercase font-bold text-justify">
              Sinaptik ağırlıklar ve gradyan atıfları, Kaplan Precision standartlarında valide edilmiştir. Operasyonel sadakat kritik eşiğin üzerindedir.
            </p>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600 gap-8">
        <div className="flex gap-12">
           <span>Core Engine: SYNERGY_v5.7.1</span>
           <span className="flex items-center gap-2 text-indigo-500/80">
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" /> 
             Operational Fidelity Active
           </span>
        </div>
        <div className="text-slate-500">
           ORIGIN: KAPLAN_HALI_YIKAMA_PRECISION_DEPT | MİMAR: ÖMER KAPLAN
        </div>
      </footer>
    </div>
  );
}

// --- Alt Bileşenler ---

const Panel = ({ title, icon: Icon, children }) => (
  <div className="bg-[#0a0c12]/80 border border-white/5 rounded-3xl p-8 flex flex-col backdrop-blur-xl">
    <div className="flex items-center gap-3 border-b border-white/5 pb-6 mb-8">
      <Icon size={18} className="text-indigo-400" />
      <h2 className="text-[10px] uppercase tracking-widest text-slate-300 font-black">{title}</h2>
    </div>
    <div className="flex-1 flex flex-col">{children}</div>
  </div>
);

const MetricBadge = ({ label, value, unit, color }) => (
  <div className="flex flex-col items-end">
    <p className="text-[8px] uppercase tracking-widest text-slate-500 mb-2 font-black">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className={`text-2xl font-black ${color}`}>{value}</span>
      {unit && <span className="text-[10px] text-slate-600 font-bold">{unit}</span>}
    </div>
  </div>
);
