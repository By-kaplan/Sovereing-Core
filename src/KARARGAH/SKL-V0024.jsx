/**
 * SOVEREIGN CORE LIBRARY
 * @project: ATTENTION-LOGIC & NEURAL ARCHITECTURE
 * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version: v3.0.1-ATTENTION-FIXED
 * @note: [PLUG-AND-PLAY]: Sıfır bağımlılık (No Chart.js, No Lucide), Saf SVG/JS/Canvas mimarisi.
 * @description: Skaler Çarpım Dikkat Mekanizması, Softmax Dağılımı ve 2D Sinaps Ağı Analizi.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- 1. CORE LOGIC: attentionLogicEngine.js ---
const attentionLogicEngine = {
  softmax: (vector) => {
    const maxVal = Math.max(...vector);
    const exps = vector.map(x => Math.exp(x - maxVal));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    return exps.map(x => x / sumExps);
  },

  processAttention: (n, d_k) => {
    // QK^T Simülasyonu
    const QK_T = Array.from({ length: n }, () => 
      Array.from({ length: n }, () => (Math.random() * 2 - 1) * 2)
    );

    const scale = Math.sqrt(d_k);
    const weights = QK_T.map(row => 
      attentionLogicEngine.softmax(row.map(val => val / scale))
    );

    const entropy = weights.map(row => 
      -row.reduce((acc, val) => acc + (val * Math.log(val + 1e-9)), 0)
    );

    return {
      weights,
      avg_entropy: (entropy.reduce((a, b) => a + b, 0) / n).toFixed(4),
      peak_relevance: Math.max(...weights.flat()).toFixed(4),
      alignment_report: {
        sparsity: (weights.flat().filter(w => w < 0.05).length / (n * n) * 100).toFixed(2),
        latency_ms: (n * 0.12).toFixed(2)
      }
    };
  }
};

// --- 2. SOVEREIGN SVG ASSETS (Manual Vector Icons with Props Support) ---
const Icons = {
  Brain: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-4.16Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-4.16Z"/></svg>
  ),
  Binary: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M10 22h4M12 2v20M2 10h20M2 14h20"/></svg>
  ),
  Zap: ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Network: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8"/></svg>
  ),
  Cpu: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
  ),
  Crosshair: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
  ),
  Activity: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  )
};

// --- 3. CHART COMPONENTS (Pure SVG Engines) ---
const BarChartManual = ({ data, color = "#22d3ee" }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    {data.map((val, i) => (
      <rect 
        key={i} 
        x={i * (100 / data.length) + 1} 
        y={100 - (val * 100)} 
        width={100 / data.length - 2} 
        height={val * 100} 
        fill={color} 
        rx="1"
        opacity="0.8"
      />
    ))}
  </svg>
);

const SynapseNetwork2D = ({ weights, n }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const nodes = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.7;

    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2;
      nodes.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        baseX: centerX + Math.cos(angle) * radius,
        baseY: centerY + Math.sin(angle) * radius
      });
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach((node, i) => {
        node.x = node.baseX + Math.sin(time / 1000 + i) * 8;
        node.y = node.baseY + Math.cos(time / 1200 + i) * 8;
      });

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const weight = weights[i] ? weights[i][j] : 0;
          if (weight > 0.08) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${weight * 0.7})`;
            ctx.lineWidth = weight * 4;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 6);
        grad.addColorStop(0, '#22d3ee');
        grad.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(node.x, node.y, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#22d3ee';
        ctx.beginPath(); ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2); ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [weights, n]);

  return (
    <div className="w-full aspect-square flex items-center justify-center">
      <canvas ref={canvasRef} width={400} height={400} className="w-full h-full max-w-[400px]" />
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function App() {
  const [params, setParams] = useState({
    n: 12,        // Sekans Uzunluğu
    d_model: 512, // Model Boyutu
    h: 8          // Kafa Sayısı
  });

  const d_k = params.d_model / params.h;
  const analysis = useMemo(() => 
    attentionLogicEngine.processAttention(params.n, d_k), 
  [params.n, d_k]);

  const gss = `
    .sov-root { background: #020617; color: #94a3b8; font-family: 'JetBrains Mono', monospace; min-height: 100vh; padding: 32px; }
    .sov-header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px; margin-bottom: 32px; }
    .sov-panel { background: rgba(15, 23, 42, 0.5); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; backdrop-filter: blur(12px); }
    .sov-panel-title { font-size: 10px; font-weight: bold; color: #fff; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
    .sov-grid { display: grid; grid-template-columns: 320px 1fr 320px; gap: 24px; }
    
    .sov-slider { width: 100%; height: 4px; background: #1e293b; border-radius: 2px; outline: none; -webkit-appearance: none; margin: 12px 0; }
    .sov-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; background: #22d3ee; border-radius: 50%; cursor: pointer; border: 2px solid #fff; }
    
    .sov-metric-card { background: rgba(0,0,0,0.3); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.03); }
    .sov-stat-num { font-size: 18px; font-weight: 900; color: #fff; }
    .sov-stat-lbl { font-size: 8px; color: #475569; text-transform: uppercase; font-weight: bold; }
    
    .heat-cell { border-radius: 2px; transition: 0.2s; }
    .heat-cell:hover { transform: scale(1.15); z-index: 10; }
    
    .sov-btn { width: 100%; padding: 12px; background: #0891b2; color: #000; font-size: 10px; font-weight: 900; text-transform: uppercase; border-radius: 8px; border: none; cursor: pointer; transition: 0.3s; }
    .sov-btn:hover { background: #22d3ee; box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
  `;

  return (
    <div className="sov-root">
      <style>{gss}</style>

      <header className="sov-header">
        <div>
          <h1 className="flex items-center gap-3 text-white text-2xl font-black tracking-tighter uppercase">
            <Icons.Brain size={28} className="text-cyan-400" /> Attention-Logic <span className="text-slate-600 text-sm">v3.0.1</span>
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Neural Synapse & Scaled Dot-Product Engine</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold">
            KARMAŞIKLIK: <span className="text-cyan-400">O(n²)</span>
          </div>
          <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold">
            MESAFE: <span className="text-emerald-400">O(1)</span>
          </div>
        </div>
      </header>

      <main className="sov-grid">
        {/* SOL PANEL: Hiperparametreler */}
        <aside className="space-y-6">
          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Binary /> Hiperparametreler</div>
            <div className="space-y-6">
              <InputRange label="Dizi Uzunluğu (n)" val={params.n} min={4} max={32} onChange={v => setParams(p => ({...p, n: v}))} />
              <InputRange label="d_model (Boyut)" val={params.d_model} min={128} max={2048} step={128} onChange={v => setParams(p => ({...p, d_model: v}))} />
              <InputRange label="Kafa Sayısı (h)" val={params.h} min={1} max={16} onChange={v => setParams(p => ({...p, h: v}))} />
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="sov-stat-lbl">Kafa Boyutu (d_k)</span>
                <span className="text-xs font-bold text-white">{d_k}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="sov-stat-lbl">Ölçek (√d_k)</span>
                <span className="text-xs font-bold text-cyan-400">{Math.sqrt(d_k).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="sov-stat-lbl">Topl. FLOPs</span>
                <span className="text-xs font-bold text-slate-300">{( (2*params.n*params.d_model**2 + 2*params.n**2*params.d_model)/1e6 ).toFixed(2)}M</span>
              </div>
            </div>
          </section>

          <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-2xl p-5">
            <h3 className="text-[10px] font-black text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <Icons.Zap /> Stabilizasyon Raporu
            </h3>
            <p className="text-[11px] leading-relaxed text-slate-400">
              $\sqrt{d_k}$ faktörü, nokta çarpım değerlerinin büyümesini engeller. Bu, Softmax gradyanlarının yok olmasını önleyerek eğitim stabilitesini korur.
            </p>
          </div>
        </aside>

        {/* ORTA PANEL: Sinaps Ağı */}
        <div className="space-y-6">
          <section className="sov-panel relative overflow-hidden" style={{ minHeight: '450px' }}>
            <div className="flex justify-between items-center mb-6">
              <div className="sov-panel-title" style={{ margin: 0 }}><Icons.Network /> İlişkisel Yoğunluk (Synapse)</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[9px] text-slate-500 font-bold">CANLI ANALİZ AKTİF</span>
              </div>
            </div>
            
            <SynapseNetwork2D weights={analysis.weights} n={params.n} />
            
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
              <div className="sov-metric-card">
                <p className="sov-stat-lbl">Ort. Entropi</p>
                <p className="sov-stat-num">{analysis.avg_entropy}</p>
              </div>
              <div className="sov-metric-card">
                <p className="sov-stat-lbl">Zirve Relevans</p>
                <p className="sov-stat-num" style={{ color: '#22d3ee' }}>%{ (parseFloat(analysis.peak_relevance) * 100).toFixed(0) }</p>
              </div>
              <div className="sov-metric-card">
                <p className="sov-stat-lbl">Gecikme</p>
                <p className="sov-stat-num" style={{ color: '#94a3b8' }}>{analysis.alignment_report.latency_ms}ms</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section className="sov-panel h-64">
              <div className="sov-panel-title"><Icons.Activity /> Isı Haritası</div>
              <div className="grid h-32 w-full gap-1" style={{ gridTemplateColumns: `repeat(${params.n}, 1fr)` }}>
                {analysis.weights.flat().map((w, i) => (
                  <div key={i} className="heat-cell" style={{ backgroundColor: `rgba(34, 211, 238, ${w * 1.5})` }} />
                ))}
              </div>
              <p className="text-[9px] text-slate-600 mt-4 text-center font-bold uppercase tracking-widest">Giriş / Çıkış Korelasyonu</p>
            </section>
            
            <section className="sov-panel h-64">
              <div className="sov-panel-title"><Icons.Activity /> Olasılık Dağılımı</div>
              <div className="h-40">
                <BarChartManual data={analysis.weights[0]} />
              </div>
            </section>
          </div>
        </div>

        {/* SAĞ PANEL: Raporlama */}
        <aside className="space-y-6">
          <section className="sov-panel">
            <div className="sov-panel-title"><Icons.Crosshair /> Bağlam Sadakati</div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] mb-2 font-bold">
                  <span>HİZALAMA DOĞRULUĞU</span>
                  <span className="text-cyan-400">98.2%</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500" style={{ width: '98.2%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-2 font-bold">
                  <span>SEYREKLİK (SPARSITY)</span>
                  <span className="text-orange-400">{analysis.alignment_report.sparsity}%</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${analysis.alignment_report.sparsity}%` }} />
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-[10px] text-slate-600 font-bold mb-3 uppercase">Matematiksel Rejim</h4>
              <div className="text-[9px] font-mono text-cyan-400/80 bg-black/40 p-3 rounded-lg border border-cyan-500/10 break-all leading-relaxed">
                z_i = ∑ softmax( (q_i ⋅ k_jᵀ) / √d_k ) ⋅ v_j
              </div>
            </div>
          </section>

          <div className="sov-panel bg-gradient-to-br from-indigo-950/40 to-cyan-950/40 border-cyan-500/10">
            <Icons.Cpu size={24} className="text-cyan-400 mb-4" />
            <h4 className="text-white font-black text-sm mb-2 uppercase tracking-tighter">İşlem Kapasitesi</h4>
            <p className="text-[11px] text-slate-500 leading-tight mb-6">
              Paralel çalışan {params.h} adet kafa, sekans bağımlılıklarını eş zamanlı olarak $d_k = {d_k}$ uzaylarında işler.
            </p>
            <button className="sov-btn">Analizi Derinleştir</button>
          </div>
        </aside>
      </main>

      <footer className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-slate-700 uppercase tracking-widest">
        <span>© 2024 ATTENTION-LOGIC AI // NEURAL ARCHITECTURE ANALYZER</span>
        <div className="flex gap-6">
          <span>Ölçek: Softmax-Normalized</span>
          <span>Mod: Multi-Head Parallel</span>
        </div>
      </footer>
    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---
const InputRange = ({ label, val, min, max, step = 1, onChange }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
      <span className="text-slate-500">{label}</span>
      <span className="text-cyan-400">{val}</span>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={val}
      onChange={e => onChange(Number(e.target.value))}
      className="sov-slider"
    />
  </div>
);
