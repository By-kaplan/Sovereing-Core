/**
 * SOVEREIGN CORE LIBRARY - TRANSFORMER LOGIC ENGINE
 * @project   : SOVEREIGN CORE / TRANSFORMER-SYSTEM
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v5.9.0-TRANSFORMER-LOGIC (Attention Architecture)
 * @credits   : Open-source ecosystem: React (Core Engine).
 * @license   : MIT | Kimlik mührü ve mimar imzası korunmak şartıyla serbest kullanım.
 * @note      : [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * [MÜHÜR]: Bu çalışma, yüksek mühendislik disiplini, saf kod mimarisi ve 
 * Kaplan Precision laboratuvarlarında geliştirilen deterministik algoritmalar 
 * ile üretilmiştir. Harici kütüphane bağımlılığı içermez.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- 1. CORE LOGIC: transformerLogicEngine.js ---
const transformerLogicEngine = {
  calculateParameters: (N, d_model, h, d_ff) => {
    const vocabSize = 50257; // GPT-2 standard
    const embedding = vocabSize * d_model;
    const attention = N * (4 * Math.pow(d_model, 2));
    const ffn = N * (2 * d_model * d_ff);
    const other = N * (4 * d_model);
    
    const total = embedding + attention + ffn + other;
    return {
      total: (total / 1e6).toFixed(2), 
      breakdown: [
        { label: 'Embedding', val: embedding },
        { label: 'Attention', val: attention },
        { label: 'FFN', val: ffn },
        { label: 'LayerNorm/Other', val: other }
      ]
    };
  },

  generatePositionalEncoding: (n, d_model) => {
    const pe = [];
    for (let pos = 0; pos < n; pos++) {
      const row = [];
      for (let i = 0; i < 16; i++) { // Visualization subset
        const val = i % 2 === 0 
          ? Math.sin(pos / Math.pow(10000, i / d_model))
          : Math.cos(pos / Math.pow(10000, (i - 1) / d_model));
        row.push(val);
      }
      pe.push(row);
    }
    return pe;
  }
};

// --- 2. SOVEREIGN SVG ASSETS (Manual Vector Icons) ---
const Icons = {
  Cpu: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
  ),
  Activity: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  Layers: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  ),
  Settings: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
  Zap: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Database: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  )
};

// --- 3. CHART COMPONENTS (Manual Sovereign Drawing) ---

const SovereignLatencyChart = ({ rnnData, transformerData }) => {
  const pointsRNN = rnnData.map((d, i) => `${(i / (rnnData.length - 1)) * 100},${100 - (d / 1.5)}`).join(' ');
  const pointsTF = transformerData.map((d, i) => `${(i / (transformerData.length - 1)) * 100},${100 - (d * 3)}`).join(' ');
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible">
      <polyline points={pointsRNN} fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2 2" />
      <polyline points={pointsTF} fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
      {/* Legend inside SVG */}
      <g transform="translate(5, 10)">
        <line x1="0" y1="0" x2="10" y2="0" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2 2" />
        <text x="12" y="3" fill="#64748b" fontSize="4" fontWeight="bold">RNN</text>
        <line x1="0" y1="8" x2="10" y2="8" stroke="#06b6d4" strokeWidth="2" />
        <text x="12" y="11" fill="#64748b" fontSize="4" fontWeight="bold">TRANSFORMER</text>
      </g>
    </svg>
  );
};

// --- 4. VISUALIZER: Architecture2D (Canvas Engine) ---

const Architecture2D = ({ layers }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = Array.from({ length: 15 }, () => ({
      x: Math.random() * 200 - 100,
      y: -150,
      speed: 1 + Math.random() * 2
    }));

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      // Layers Drawing
      for (let i = 0; i < layers; i++) {
        const yPos = (i - layers / 2) * 30;
        const opacity = 0.8 - (i * 0.05);
        
        ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.strokeStyle = `rgba(34, 211, 238, ${opacity + 0.2})`;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(centerX - 80, centerY + yPos - 5);
        ctx.lineTo(centerX + 80, centerY + yPos + 5);
        ctx.lineTo(centerX + 100, centerY + yPos - 15);
        ctx.lineTo(centerX - 60, centerY + yPos - 25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Residual Connection Lines
        if (i < layers - 1) {
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(centerX + 90, centerY + yPos - 5);
          ctx.bezierCurveTo(centerX + 120, centerY + yPos + 10, centerX + 120, centerY + yPos + 20, centerX + 90, centerY + yPos + 25);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Particles
      particles.forEach(p => {
        p.y += p.speed;
        if (p.y > 150) p.y = -150;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(centerX + p.x, centerY + p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [layers]);

  return <canvas ref={canvasRef} width={500} height={500} className="w-full h-full object-contain" />;
};

// --- 5. MAIN APP COMPONENT ---

export default function App() {
  const [config, setConfig] = useState({
    N: 6,
    d_model: 512,
    h: 8,
    d_ff: 2048
  });

  const { total, breakdown } = useMemo(() => 
    transformerLogicEngine.calculateParameters(config.N, config.d_model, config.h, config.d_ff), 
  [config]);

  const peData = useMemo(() => 
    transformerLogicEngine.generatePositionalEncoding(12, config.d_model),
  [config.d_model]);

  // Latency Mock Data
  const latencyLabels = [128, 256, 512, 1024];
  const rnnLat = [20, 45, 90, 180];
  const tfLat = [10, 15, 20, 25];

  const gss = `
    .sov-root { background: #020408; color: #94a3b8; font-family: 'JetBrains Mono', monospace; min-height: 100vh; padding: 32px; font-size: 11px; }
    .sov-header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid rgba(6, 182, 212, 0.2); padding-bottom: 24px; margin-bottom: 32px; }
    .sov-panel { background: rgba(10, 12, 18, 0.6); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; padding: 24px; backdrop-filter: blur(12px); display: flex; flex-direction: column; }
    .sov-panel-title { font-size: 10px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
    .sov-grid { display: grid; grid-template-columns: 320px 1fr 320px; gap: 24px; }
    .sov-slider { width: 100%; height: 2px; background: #1e293b; border-radius: 1px; outline: none; -webkit-appearance: none; margin: 12px 0; }
    .sov-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 10px; height: 10px; background: #06b6d4; border-radius: 50%; cursor: pointer; border: 1px solid #fff; }
    .custom-scrollbar::-webkit-scrollbar { width: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
  `;

  return (
    <div className="sov-root">
      <style>{gss}</style>

      <header className="sov-header">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase flex items-center gap-4">
            <Icons.Cpu size={28} className="text-cyan-500" /> TRANSFORMER <span className="text-cyan-500">LOGIC</span>
          </h1>
          <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
            Parallel Processing & Self-Attention Command
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
            </span>
          </p>
        </div>

        <div className="flex gap-10 text-right">
          <div>
            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Params</div>
            <div className="text-2xl font-black text-white">{total}M</div>
          </div>
          <div>
            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Memory Est.</div>
            <div className="text-2xl font-black text-cyan-400">~{(total * 4 / 1024).toFixed(2)}GB</div>
          </div>
        </div>
      </header>

      <main className="sov-grid">
        {/* Left: Configuration */}
        <aside className="space-y-6">
          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Settings /> Mimari Yapılandırma</div>
            <div className="space-y-6">
              <RangeItem label="Katman Sayısı (N)" val={config.N} min={1} max={24} onChange={v => setConfig({...config, N: v})} />
              <RangeItem label="Model Boyutu (d_model)" val={config.d_model} min={128} max={2048} step={128} onChange={v => setConfig({...config, d_model: v})} />
              <RangeItem label="Dikkat Kafası (h)" val={config.h} min={1} max={32} onChange={v => setConfig({...config, h: v})} />
              <RangeItem label="FFN Boyutu (d_ff)" val={config.d_ff} min={512} max={8192} step={512} onChange={v => setConfig({...config, d_ff: v})} />
            </div>
          </section>

          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Activity /> Gecikme Analizi (RNN vs TF)</div>
            <div className="h-40 bg-black/20 rounded-lg p-4 border border-white/5">
              <SovereignLatencyChart rnnData={rnnLat} transformerData={tfLat} />
            </div>
            <p className="text-[8px] text-slate-600 mt-4 leading-relaxed uppercase italic">
              Transformer mimarisi, dizi uzunluğu arttıkça RNN'lerin aksine sabit derinlikte (O(1)) paralel işlem yapabilir.
            </p>
          </section>
        </aside>

        {/* Center: Architecture Visualization */}
        <div className="flex flex-col gap-6">
          <section className="sov-panel relative overflow-hidden bg-[#050508] p-0 flex-1 border-cyan-500/20 shadow-2xl shadow-cyan-500/5" style={{ minHeight: '450px' }}>
            <div className="absolute top-8 left-8 z-10 flex flex-col gap-1">
              <div className="flex items-center gap-3 bg-black/60 px-4 py-2 border border-cyan-500/20 rounded backdrop-blur-md">
                <Icons.Layers size={14} className="text-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Vertical Block Stack</span>
              </div>
              <p className="text-[8px] text-slate-600 uppercase tracking-widest ml-1 font-bold">
                Residual Streams & Feed-Forward Projections
              </p>
            </div>

            <Architecture2D layers={config.N} />

            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
              <div className="bg-black/60 backdrop-blur p-3 rounded-xl border border-white/5 text-[9px] text-slate-400 uppercase font-bold">
                <p>Complexity: <span className="text-white">O(n² · d)</span></p>
                <p>Scaling: <span className="text-cyan-400">Quadratic Attention</span></p>
              </div>
              <div className="bg-cyan-500/10 backdrop-blur p-3 rounded-xl border border-cyan-500/20 text-[9px] text-cyan-300 uppercase font-black flex items-center justify-center animate-pulse">
                Paralel İşlem Aktif
              </div>
            </div>
          </section>

          <section className="sov-panel">
             <div className="sov-panel-title"><Icons.Database /> Parametre Dağılımı</div>
             <div className="space-y-3 overflow-y-auto max-h-40 pr-2 custom-scrollbar">
                {breakdown.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[9px] font-bold uppercase">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="text-white">{(item.val / 1e6).toFixed(1)}M</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{ width: `${(item.val / (total * 1e6)) * 100}%` }} />
                    </div>
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Right: Heatmap & Metrics */}
        <aside className="space-y-6">
          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Zap /> Konumsal Kodlama (PE)</div>
            <div className="grid grid-cols-16 gap-0.5 mt-2 bg-black/40 p-2 rounded-lg border border-white/5">
              {peData.map((row, rIdx) => 
                row.map((val, cIdx) => (
                  <div 
                    key={`${rIdx}-${cIdx}`} 
                    className="aspect-square rounded-sm" 
                    style={{ backgroundColor: `rgba(6, 182, 212, ${Math.abs(val) * 0.9})` }} 
                    title={val.toFixed(4)}
                  />
                ))
              )}
            </div>
            <p className="text-[8px] text-slate-500 mt-4 leading-relaxed uppercase italic">
              Dizideki konumsal bilgileri (pos/10000^...) vektör uzayına enjekte eden sinüzoidal dalgalar.
            </p>
          </section>

          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Database /> Mimari Detaylar</div>
            <div className="space-y-3">
              <DetailRow label="Aktivasyon" val="GELU" />
              <DetailRow label="Normalizasyon" val="Pre-LayerNorm" />
              <DetailRow label="Dikkat Tipi" val="Scaled Dot-Product" />
              <DetailRow label="FFN Genişlik" val={`x${(config.d_ff / config.d_model).toFixed(0)}`} />
            </div>
          </section>

          <div className="bg-cyan-600/10 border border-cyan-500/20 rounded-2xl p-6 flex flex-col gap-4">
             <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Mühendislik Notu</h4>
             <p className="text-[9px] leading-relaxed text-slate-500 italic uppercase font-bold text-justify">
               Transformer bloğu, {config.h} kafa üzerinden çoklu-dikkat (Multi-head) operasyonu yürüterek bağlamsal ilişkileri paralel olarak yakalar.
             </p>
          </div>
        </aside>
      </main>

      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600 gap-8">
        <div className="flex gap-12">
           <span>Engine: TRANSFORMER_GEMM_v5.9.0</span>
           <span className="flex items-center gap-2 text-cyan-500/80">
             <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" /> 
             System Operational
           </span>
        </div>
        <div>MİMAR: ÖMER KAPLAN | KAPLAN PRECISION DEPT</div>
      </footer>
    </div>
  );
}

// --- Helper Components ---

const RangeItem = ({ label, val, min, max, step = 1, onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[9px] font-black uppercase">
      <span className="text-slate-500">{label}</span>
      <span className="text-cyan-400">{val}</span>
    </div>
    <input type="range" className="sov-slider" min={min} max={max} step={step} value={val} onChange={e => onChange(parseInt(e.target.value))} />
  </div>
);

const DetailRow = ({ label, val }) => (
  <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
    <span className="text-[9px] text-slate-500 uppercase font-bold">{label}</span>
    <span className="text-[10px] text-white font-mono font-black">{val}</span>
  </div>
);
