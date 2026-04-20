/**
 * SOVEREIGN CORE LIBRARY
 * @project: FORWARD-LOGIC AI (DETERMINISTIC INFERENCE)
 * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version: v5.2.1-FORWARD-FIX
 * @note: [PLUG-AND-PLAY]: Sıfır bağımlılık (No Lucide, No Recharts).
 * @description: Matris çarpımı simülasyonu, izometrik tensör hacimleme ve inferans analizi.
 */

import React, { useState, useMemo, useEffect } from 'react';

// --- 1. CORE LOGIC: forwardLogicEngine.js ---
/**
 * Deterministik İleri Besleme ve İnferans Analizörü
 */
const calculateForwardAnalysis = (config) => {
  const { inputSize, hiddenLayers, outputClasses, batchSize } = config;
  
  const tensorFlow = [];
  let currentDim = inputSize;
  let totalFlops = 0;
  
  // Giriş katmanı
  tensorFlow.push({ name: "Giriş", dim: [batchSize, inputSize], type: "Tensör", color: "#3b82f6" });

  // Gizli katmanlar
  for (let i = 0; i < hiddenLayers; i++) {
    const nextDim = Math.max(outputClasses * 2, Math.floor(currentDim / 2));
    // FLOPs: 2 * in * out (Matris Çarpımı + Bias)
    totalFlops += 2 * currentDim * nextDim * batchSize;
    tensorFlow.push({ 
      name: `Gizli L${i+1}`, 
      dim: [batchSize, nextDim], 
      type: "Lineer + ReLU",
      activation: 0.6 + (Math.random() * 0.3),
      color: "#6366f1"
    });
    currentDim = nextDim;
  }

  // Çıkış katmanı (Softmax)
  totalFlops += 2 * currentDim * outputClasses * batchSize;
  tensorFlow.push({ name: "Çıkış", dim: [batchSize, outputClasses], type: "Softmax", color: "#10b981" });

  const latencyMs = (totalFlops / 1e9) * 850 + 0.2; // Donanım simülasyonu
  const bandwidthGb = (totalFlops * 4) / 1e9;
  const confidence = 0.88 + (Math.random() * 0.08);

  return { tensorFlow, totalFlops, latencyMs, bandwidthGb, confidence };
};

// --- 2. SOVEREIGN SVG ASSETS (Manual Vector Icons) ---
const Icons = {
  Zap: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Cpu: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
  ),
  Activity: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  Target: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  Database: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  ),
  Binary: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M10 7v10M14 7v10"/><path d="M7 10h10M7 14h10"/></svg>
  ),
  ChevronRight: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="9 18 15 12 9 6"/></svg>
  )
};

// --- 3. CHART COMPONENTS (Manual SVG Engines) ---

const SovereignBarChart = ({ data, highlightIdx }) => {
  const barWidth = 100 / data.length - 2;
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      {data.map((d, i) => {
        const h = d.prob;
        return (
          <rect
            key={i}
            x={i * (100 / data.length) + 1}
            y={100 - h}
            width={barWidth}
            height={h}
            fill={i === highlightIdx ? "#10b981" : "#1e293b"}
            rx="1"
          />
        );
      })}
    </svg>
  );
};

const SovereignLineChart = ({ data, color = "#6366f1" }) => {
  if (!data || data.length < 2) return null;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.intensity * 100);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
      {data.map((d, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * 100} cy={100 - (d.intensity * 100)} r="1.5" fill={color} />
      ))}
    </svg>
  );
};

// --- 4. VISUALIZER: SignalFlowVisualizer ---

const SignalFlowVisualizer = ({ tensorFlow, isAnimating }) => {
  const isoTransform = "rotateX(60deg) rotateZ(-45deg)";

  return (
    <div className="w-full h-[450px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-8">
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="flex items-center gap-12 relative z-10">
        {tensorFlow.map((layer, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center group relative">
              <div 
                className="relative border-2 transition-all duration-500 hover:scale-110"
                style={{ 
                  width: `${Math.max(40, layer.dim[1] / 2.5)}px`, 
                  height: `${Math.max(40, layer.dim[1] / 2.5)}px`,
                  transform: isoTransform,
                  transformStyle: 'preserve-3d',
                  borderColor: layer.color + '88',
                  backgroundColor: layer.color + '11'
                }}
              >
                <div className="absolute inset-2 border border-white/5 bg-white/5 animate-pulse" />
                {/* 3D Sides */}
                <div className="absolute top-0 left-0 h-full w-2 bg-white/5" style={{ transform: 'rotateY(-90deg)', transformOrigin: 'left' }} />
                <div className="absolute top-0 left-0 w-full h-2 bg-white/5" style={{ transform: 'rotateX(90deg)', transformOrigin: 'top' }} />
              </div>

              <div className="absolute -bottom-24 flex flex-col items-center w-32">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{layer.name}</span>
                <span className="text-[9px] font-mono text-slate-400">[{layer.dim.join('x')}]</span>
                <span className="text-[8px] mt-1 px-2 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800 uppercase font-black">{layer.type}</span>
              </div>

              {isAnimating && idx < tensorFlow.length - 1 && (
                <div className="absolute top-1/2 left-full w-12 h-1 z-0">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full blur-[1px] animate-signal-flow" />
                </div>
              )}
            </div>
            {idx < tensorFlow.length - 1 && <Icons.ChevronRight className="text-slate-800" />}
          </React.Fragment>
        ))}
      </div>
      <style>{`
        @keyframes signalFlow {
          0% { transform: translateX(-10px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(50px); opacity: 0; }
        }
        .animate-signal-flow { animation: signalFlow 1.5s infinite ease-in; }
      `}</style>
    </div>
  );
};

// --- 5. MAIN APP COMPONENT ---

export default function App() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [config, setConfig] = useState({
    inputSize: 128,
    hiddenLayers: 3,
    outputClasses: 10,
    batchSize: 1
  });

  const { tensorFlow, totalFlops, latencyMs, bandwidthGb, confidence } = useMemo(() => {
    return calculateForwardAnalysis(config);
  }, [config]);

  const activationData = useMemo(() => {
    return tensorFlow.filter(l => l.activation).map(l => ({
      name: l.name,
      intensity: l.activation
    }));
  }, [tensorFlow]);

  const outputDistribution = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      label: `C${i}`,
      prob: i === 3 ? confidence * 100 : (100 - confidence * 100) / 9
    }));
  }, [confidence]);

  const gss = `
    .sov-root { background: #020617; color: #94a3b8; font-family: 'JetBrains Mono', monospace; min-height: 100vh; padding: 40px; }
    .sov-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 40px; margin-bottom: 40px; }
    .sov-panel { background: rgba(15, 23, 42, 0.3); border: 1px solid #1e293b; border-radius: 24px; padding: 24px; backdrop-filter: blur(8px); }
    .sov-panel-title { font-size: 10px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
    .sov-grid { display: grid; grid-template-columns: 340px 1fr; gap: 32px; }
    
    .sov-slider { width: 100%; height: 4px; background: #1e293b; border-radius: 2px; outline: none; -webkit-appearance: none; margin: 16px 0; }
    .sov-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; background: #6366f1; border-radius: 50%; cursor: pointer; border: 2px solid #fff; }
    
    .sov-stat-card { background: #0f172a; border: 1px solid #1e293b; padding: 16px; border-radius: 16px; display: flex; flex-direction: column; gap: 4px; }
    .sov-stat-lbl { font-size: 8px; color: #475569; text-transform: uppercase; font-weight: 800; }
    .sov-stat-val { font-size: 16px; font-weight: 900; color: #f1f5f9; }

    .sov-btn { padding: 8px 16px; border-radius: 8px; background: #1e293b; color: #fff; border: 1px solid #334155; font-size: 10px; font-weight: bold; cursor: pointer; transition: 0.3s; text-transform: uppercase; }
    .sov-btn:hover { background: #334155; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 3px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
  `;

  return (
    <div className="sov-root">
      <style>{gss}</style>

      <header className="sov-header">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/20">
            <Icons.Zap size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">FORWARD-LOGIC <span className="text-indigo-500">AI</span></h1>
            <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase mt-1">İleri Besleme ve İnferans Denetleyicisi v5.2.1</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="sov-stat-card" style={{ flexDirection: 'row', alignItems: 'center', minWidth: '180px' }}>
             <Icons.Target className="text-emerald-500" />
             <div>
               <div className="sov-stat-lbl">Confidence (Güven)</div>
               <div className="text-emerald-400 font-black">{(confidence * 100).toFixed(2)}%</div>
             </div>
          </div>
          <button className="sov-btn" onClick={() => setIsAnimating(!isAnimating)}>{isAnimating ? 'Sinyali Durdur' : 'Akışı Başlat'}</button>
        </div>
      </header>

      <main className="sov-grid">
        {/* Sol Kontrol Paneli */}
        <aside className="space-y-6">
          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Cpu /> Yapılandırma</div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase"><span>Giriş Boyutu (d_in)</span><span className="text-indigo-400">{config.inputSize}</span></div>
                <input type="range" className="sov-slider" min="32" max="512" step="32" value={config.inputSize} onChange={e => setConfig(p => ({ ...p, inputSize: parseInt(e.target.value) }))} />
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase"><span>Derinlik (L)</span><span className="text-indigo-400">{config.hiddenLayers} Katman</span></div>
                <input type="range" className="sov-slider" min="1" max="5" step="1" value={config.hiddenLayers} onChange={e => setConfig(p => ({ ...p, hiddenLayers: parseInt(e.target.value) }))} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="sov-stat-card">
                  <div className="sov-stat-lbl">Gecikme</div>
                  <div className="sov-stat-val" style={{ color: '#fbbf24' }}>{latencyMs.toFixed(2)}ms</div>
                </div>
                <div className="sov-stat-card">
                  <div className="sov-stat-lbl">Flops</div>
                  <div className="sov-stat-val" style={{ color: '#3b82f6' }}>{(totalFlops / 1e6).toFixed(1)}M</div>
                </div>
              </div>
            </div>
          </section>

          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Activity /> Softmax Dağılımı</div>
            <div className="h-48">
              <SovereignBarChart data={outputDistribution} highlightIdx={3} />
            </div>
            <div className="mt-4 flex justify-between text-[9px] font-bold text-slate-500 uppercase italic">
               <span>P(Sınıf_0)</span>
               <span className="text-emerald-500">P(Argmax)</span>
            </div>
          </section>
        </aside>

        {/* Sağ Ana Panel */}
        <div className="space-y-6">
          <SignalFlowVisualizer tensorFlow={tensorFlow} isAnimating={isAnimating} />
          
          <div className="grid grid-cols-2 gap-6">
            <section className="sov-panel">
              <div className="sov-panel-title"><Icons.Activity /> Aktivasyon Şiddeti</div>
              <div className="h-40">
                <SovereignLineChart data={activationData} />
              </div>
              <p className="text-[9px] text-slate-600 mt-4 leading-relaxed uppercase italic">Katmanlar arası sinyal doygunluk analizi; Gradyan kaybolma riskini takip eder.</p>
            </section>

            <section className="sov-panel overflow-hidden">
               <div className="sov-panel-title"><Icons.Binary /> Tensör Boyut Takibi</div>
               <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  {tensorFlow.map((l, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] p-2 bg-black/20 rounded border border-white/5">
                      <span className="text-slate-500 font-bold uppercase tracking-tighter">{l.name}</span>
                      <span className="text-indigo-400 font-mono font-black">[{l.dim.join('x')}]</span>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          <section className="grid grid-cols-3 gap-6">
            <div className="sov-panel">
              <div className="sov-panel-title" style={{ marginBottom: '12px' }}><Icons.Database /> Bant Genişliği</div>
              <div className="text-2xl font-black text-white mb-2">{bandwidthGb.toFixed(2)} <span className="text-xs text-slate-600">GB/s</span></div>
              <p className="text-[8px] leading-relaxed text-slate-500 italic">Matris verilerinin bellek bus üzerindeki anlık transfer yükü tahmini.</p>
            </div>
            <div className="sov-panel">
              <div className="sov-panel-title" style={{ marginBottom: '12px' }}>İşlem Verimliliği</div>
              <div className="text-2xl font-black text-emerald-500 mb-2">%{(94.2 - config.hiddenLayers * 1.5).toFixed(1)}</div>
              <p className="text-[8px] leading-relaxed text-slate-500 italic">Donanım kaynaklarının (ALU/FPU) inferans anındaki kullanım oranı.</p>
            </div>
            <div className="sov-panel">
              <div className="sov-panel-title" style={{ marginBottom: '12px' }}>GEMM Kararlılığı</div>
              <div className="text-2xl font-black text-amber-500 mb-2">SAFE</div>
              <p className="text-[8px] leading-relaxed text-slate-500 italic">Deterministik matris çarpımı operasyonlarının sayısal stabilite raporu.</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-600">
        <div className="flex gap-12">
           <span>Model: Forward_GEMM_v5.2.1</span>
           <span className="flex items-center gap-2 text-indigo-500/80"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" /> Sistem Operasyonel</span>
        </div>
        <div>MİMAR: ÖMER KAPLAN | ORIGIN: KAPLAN HALI YIKAMA PRECISION DEPT</div>
      </footer>
    </div>
  );
}
