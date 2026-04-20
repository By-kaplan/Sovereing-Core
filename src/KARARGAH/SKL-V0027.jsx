/**
 * SOVEREIGN CORE LIBRARY
 * @project: AE-LOGIC - AUTOENCODER & DIMENSIONALITY REDUCTION
 * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version: v4.2.0-AE-FLOW
 * @note: [PLUG-AND-PLAY]: Sıfır bağımlılık, Saf SVG/JS/Canvas mimarisi.
 * @description: Bilgi darboğazı analizi, latent uzay yoğunluğu ve manifold sürekliliği.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- 1. CORE LOGIC: aeLogicEngine.js ---
const aeLogicEngine = {
  calculateCompression: (inputDim, latentDim) => {
    return (inputDim / latentDim).toFixed(1);
  },

  estimateMSE: (latentDim, inputDim, noise) => {
    const baseError = (inputDim / latentDim) * 0.001;
    const noiseFactor = noise * 0.05;
    return (baseError + noiseFactor).toFixed(4);
  },

  analyzeManifold: (latentDim) => {
    return {
      sparsity: Math.max(0.1, 1 - (latentDim / 128)).toFixed(2),
      continuity: (0.85 + (latentDim / 1000)).toFixed(2)
    };
  }
};

// --- 2. SOVEREIGN SVG ASSETS (Manual Vector Icons) ---
const Icons = {
  Database: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  ),
  Cpu: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
  ),
  Activity: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  Maximize2: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
  ),
  Minimize2: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
  ),
  Zap: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Binary: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M10 7v10M14 7v10"/><path d="M7 10h10M7 14h10"/></svg>
  ),
  AlertTriangle: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  Layers: ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  ),
  BarChart3: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
  ),
  RefreshCw: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
  )
};

// --- 3. CHART COMPONENTS (Pure SVG Engines) ---

const SovereignLineChart = ({ data, color = "#10b981" }) => {
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.val * 100);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M 0,100 ${points} L 100,100 Z`} fill="url(#lineGrad)" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1" />
      {data.map((d, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * 100} cy={100 - (d.val * 100)} r="1.5" fill={color} />
      ))}
    </svg>
  );
};

// --- 4. VISUALIZER: BottleneckFlowVisualizer ---
const BottleneckFlowVisualizer = ({ isProcessing }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const particles = [];
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        offset: Math.random() * Math.PI * 2,
        size: 1 + Math.random() * 2
      });
    }

    const draw = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const width = canvas.width * 0.8;
      
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.beginPath();
      ctx.moveTo(centerX - width/2, centerY - 100);
      ctx.lineTo(centerX - 20, centerY - 10);
      ctx.lineTo(centerX - 20, centerY + 10);
      ctx.lineTo(centerX - width/2, centerY + 100);
      ctx.moveTo(centerX + width/2, centerY - 100);
      ctx.lineTo(centerX + 20, centerY - 10);
      ctx.lineTo(centerX + 20, centerY + 10);
      ctx.lineTo(centerX + width/2, centerY + 100);
      ctx.stroke();

      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.fillRect(centerX - 15, centerY - 25, 30, 50);
      ctx.strokeStyle = '#10b981';
      ctx.strokeRect(centerX - 15, centerY - 25, 30, 50);

      particles.forEach(p => {
        if (isProcessing) p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        let x, y, currentWidth;
        const normalizedP = p.progress;

        if (normalizedP < 0.5) {
          const localP = normalizedP * 2;
          x = (centerX - width/2) + (width/2 - 20) * localP;
          currentWidth = 100 * (1 - localP) + 10;
          y = centerY + Math.sin(p.offset + normalizedP * 10) * currentWidth;
        } else {
          const localP = (normalizedP - 0.5) * 2;
          x = (centerX + 20) + (width/2 - 20) * localP;
          currentWidth = 10 * (1 - localP) + 100 * localP;
          y = centerY + Math.sin(p.offset + normalizedP * 10) * currentWidth;
        }

        const alpha = normalizedP < 0.1 || normalizedP > 0.9 ? 0 : 1;
        ctx.fillStyle = normalizedP > 0.45 && normalizedP < 0.55 ? '#fbbf24' : '#10b981';
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isProcessing]);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-full border border-white/5 rounded-2xl bg-black/20" />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-32 pointer-events-none">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Encoder</span>
        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em]">Latent (z)</span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Decoder</span>
      </div>
    </div>
  );
};

// --- 5. MAIN APP COMPONENT ---
export default function App() {
  const [latentDim, setLatentDim] = useState(32);
  const [inputDim, setInputDim] = useState(784);
  const [noiseLevel, setNoiseLevel] = useState(0.1);
  const [isProcessing, setIsProcessing] = useState(true);

  const metrics = useMemo(() => {
    const mse = aeLogicEngine.estimateMSE(latentDim, inputDim, noiseLevel);
    const comp = aeLogicEngine.calculateCompression(inputDim, latentDim);
    const manifold = aeLogicEngine.analyzeManifold(latentDim);
    return { mse, comp, ...manifold };
  }, [latentDim, inputDim, noiseLevel]);

  const gss = `
    .sov-root { background: #020617; color: #94a3b8; font-family: 'JetBrains Mono', monospace; min-height: 100vh; padding: 32px; }
    .sov-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 24px; margin-bottom: 32px; }
    .sov-panel { background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; backdrop-filter: blur(12px); }
    .sov-panel-title { font-size: 10px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
    
    .sov-grid { display: grid; grid-template-columns: 320px 1fr 320px; gap: 24px; }
    
    .sov-slider { width: 100%; height: 4px; background: #1e293b; border-radius: 2px; outline: none; -webkit-appearance: none; margin: 16px 0; }
    .sov-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; background: #10b981; border-radius: 50%; cursor: pointer; border: 2px solid #fff; }
    
    .sov-metric-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid rgba(255,255,255,0.03); margin-bottom: 12px; }
    .sov-btn { width: 100%; padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); font-size: 10px; font-weight: 900; cursor: pointer; transition: 0.3s; text-transform: uppercase; }
    
    .chart-box { height: 200px; width: 100%; position: relative; }
    .sov-stat-num { font-size: 14px; font-weight: 900; color: #fff; }
    .sov-stat-lbl { font-size: 9px; color: #475569; text-transform: uppercase; }

    .sov-analysis-bar { height: 4px; background: #1e293b; border-radius: 2px; overflow: hidden; margin-top: 8px; }
  `;

  return (
    <div className="sov-root">
      <style>{gss}</style>

      <header className="sov-header">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Icons.Layers />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
              AE-Logic <span className="text-emerald-500">AI</span>
            </h1>
            <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase">Dimensionality Reduction & Feature Distillation</p>
          </div>
        </div>
        <div className="flex gap-4">
          <StatusCard icon={<Icons.Zap />} label="MODE" value="Denoising AE" color="emerald" />
          <StatusCard icon={<Icons.Activity />} label="LATENCY" value="12.4ms" color="blue" />
        </div>
      </header>

      <main className="sov-grid">
        {/* Left Control Panel */}
        <aside className="space-y-6">
          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Cpu /> Mimari Yapılandırma</div>
            <div className="space-y-6">
              <SliderControl label="Giriş Boyutu (n)" value={inputDim} min={128} max={2048} step={128} onChange={setInputDim} color="#10b981" />
              <SliderControl label="Darboğaz Boyutu (z)" value={latentDim} min={2} max={128} step={2} onChange={setLatentDim} color="#fbbf24" />
              <SliderControl label="Gürültü (σ)" value={noiseLevel} min={0} max={1} step={0.05} onChange={setNoiseLevel} color="#f43f5e" />
              
              <button 
                className="sov-btn" 
                style={{ background: isProcessing ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: isProcessing ? '#f43f5e' : '#10b981', borderColor: isProcessing ? '#f43f5e33' : '#10b98133' }}
                onClick={() => setIsProcessing(!isProcessing)}
              >
                {isProcessing ? "Motoru Durdur" : "İşlemeyi Başlat"}
              </button>
            </div>
          </section>

          <section className="sov-panel">
            <div className="sov-panel-title">Verimlilik Metrikleri</div>
            <div className="sov-metric-item">
              <div><div className="sov-stat-lbl">Sıkıştırma</div><div className="sov-stat-num">{metrics.comp}x</div></div>
              <Icons.Binary className="text-emerald-500" />
            </div>
            <div className="sov-metric-item">
              <div><div className="sov-stat-lbl">Reconstruction Error</div><div className="sov-stat-num">{metrics.mse}</div></div>
              <Icons.AlertTriangle className="text-amber-500" />
            </div>
          </section>
        </aside>

        {/* Center Visualizer */}
        <div className="space-y-6">
          <section className="sov-panel" style={{ padding: '8px' }}>
             <BottleneckFlowVisualizer isProcessing={isProcessing} />
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section className="sov-panel">
              <div className="sov-panel-title">Öznitelik Analizi</div>
              <div className="space-y-4">
                <AnalysisBar label="Salient Features" value={85} color="#10b981" />
                <AnalysisBar label="Noise Filtering" value={noiseLevel * 100} color="#f43f5e" />
                <AnalysisBar label="Manifold Continuity" value={metrics.continuity * 100} color="#fbbf24" />
              </div>
            </section>

            <section className="sov-panel">
              <div className="sov-panel-title">Anomali Eşiği</div>
              <div className="flex items-end gap-1 h-24">
                {Array.from({length: 20}).map((_, i) => (
                  <div key={i} className="flex-1 bg-emerald-500/20" style={{ height: `${Math.random() * 80 + 10}%`, borderRadius: '1px' }} />
                ))}
              </div>
              <div style={{ marginTop: '12px', fontSize: '9px', display: 'flex', justifyContent: 'space-between' }}>
                <span>NORMAL DAĞILIM</span>
                <span className="text-emerald-400">MSE: {metrics.mse}</span>
              </div>
            </section>
          </div>
        </div>

        {/* Right Analysis Panel */}
        <aside className="space-y-6">
          <section className="sov-panel">
            <div className="sov-panel-title">MSE / Latent Trend</div>
            <div className="chart-box">
              <SovereignLineChart data={[
                { val: 0.8 }, { val: 0.6 }, { val: 0.4 }, { val: 0.25 }, { val: 0.12 }, { val: 0.08 }, { val: 0.05 }
              ]} />
            </div>
            <p style={{ fontSize: '9px', lineHeight: '1.6', marginTop: '16px', color: '#475569' }}>
              Latent boyut (z) arttıkça yeniden inşa hatası logaritmik olarak azalır. Darboğaz kısıtı, verinin en önemli özelliklerini damıtmaya zorlar.
            </p>
          </section>

          <section className="sov-panel" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.1)' }}>
            <div className="sov-panel-title" style={{ color: '#10b981' }}>Latent Report</div>
            <ReportRow label="Compression" value="A+" />
            <ReportRow label="Preservation" value="94.2%" />
            <ReportRow label="Sparsity" value={metrics.sparsity} />
            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <Icons.BarChart3 className="text-emerald-400 mb-2" />
              <p style={{ fontSize: '8px', fontStyle: 'italic', color: '#475569' }}>
                Ağ, yüksek frekanslı gürültüyü başarıyla filtreleyerek düşük boyutlu manifold üzerinde kararlı bir temsil oluşturmuştur.
              </p>
            </div>
          </section>
        </aside>
      </main>

      <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 'bold' }}>
        <span>Method: Nonlinear Dimensionality Reduction</span>
        <span>ARCHITECT: ÖMER KAPLAN | PRECISION DEPT</span>
      </footer>
    </div>
  );
}

// --- HELPER COMPONENTS ---
const StatusCard = ({ icon, label, value, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
    <span style={{ color: color === 'emerald' ? '#10b981' : '#3b82f6' }}>{icon}</span>
    <div>
      <div style={{ fontSize: '8px', color: '#475569' }}>{label}</div>
      <div style={{ fontSize: '10px', color: '#fff', fontWeight: '900' }}>{value}</div>
    </div>
  </div>
);

const SliderControl = ({ label, value, min, max, step, onChange, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-bold uppercase">
      <span style={{ color: '#475569' }}>{label}</span>
      <span style={{ color }}>{value}</span>
    </div>
    <input type="range" className="sov-slider" min={min} max={max} step={step} value={value} onChange={e => onChange(parseFloat(e.target.value))} />
  </div>
);

const AnalysisBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-[9px] font-bold uppercase mb-1">
      <span style={{ color: '#475569' }}>{label}</span>
      <span style={{ color }}>%{Math.round(value)}</span>
    </div>
    <div className="sov-analysis-bar"><div style={{ height: '100%', width: `${value}%`, background: color }} /></div>
  </div>
);

const ReportRow = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '9px' }}>
    <span style={{ color: '#475569' }}>{label}</span>
    <span style={{ color: '#f1f5f9', fontWeight: 'bold' }}>{value}</span>
  </div>
);
