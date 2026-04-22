/**
 * @project SOVEREIGN CORE LIBRARY | @uid SKL-0019
 * @architect [Ömer Kaplan] | @origin Kaplan Halı Yıkama - Precision Dept.
 * @engine Gemini Pro Hybrid-AI | @collaboration Human-AI Augmented
 * @license MIT (Attribution Required) | @status Production-Ready
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Target, 
  Activity, 
  Settings, 
  Layers, 
  TrendingUp, 
  Hash,
  Box,
  Zap,
  Minimize2
} from 'lucide-react';
import {
  Chart as SKL_ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

SKL_ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * @architecture & INTEL
 * @dependencies: react, chart.js, react-chartjs-2, lucide-react, tailwindcss
 * @credits: Kaplan Precision Dept. - Kapasite Kontrol ve Düzenlileştirme Analiz Birimi.
 * @ai-context: SKL-0019, modelin aşırı uyum karakterini analiz eden ve kısıt geometrilerini simüle eden regülasyon motorudur.
 * @status: Hardware-Independent (CPU-Based Canvas Projection)
 */

// --- 1. SKL_RegLogicEngine ---
const SKL_RegLogicEngine = {
  SKL_CalculateImpact: (lambda, type, baseWeights, dropoutRate) => {
    let weights = [...baseWeights];
    let penalty = 0;
    
    if (type === "L1 (Lasso)") {
      weights = weights.map(w => {
        const sign = w > 0 ? 1 : -1;
        const newVal = w - lambda * 0.1 * sign;
        return (sign > 0 ? Math.max(0, newVal) : Math.min(0, newVal));
      });
      penalty = lambda * weights.reduce((sum, val) => sum + Math.abs(val), 0);
    } else if (type === "L2 (Ridge)") {
      const decay = 1 - (lambda * 0.1);
      weights = weights.map(w => w * decay);
      penalty = lambda * weights.reduce((sum, val) => sum + val * val, 0);
    } else if (type === "Elastic Net") {
      const l1 = lambda * 0.5;
      const l2 = lambda * 0.5;
      weights = weights.map(w => {
        const sign = w > 0 ? 1 : -1;
        const newVal = (w - l1 * 0.05 * sign) * (1 - l2 * 0.05);
        return (sign > 0 ? Math.max(0, newVal) : Math.min(0, newVal));
      });
      penalty = (l1 * weights.reduce((sum, val) => sum + Math.abs(val), 0)) + 
                (l2 * weights.reduce((sum, val) => sum + val * val, 0));
    }

    const effectiveParams = weights.length * (1 - dropoutRate);
    const sparsityCount = weights.filter(w => Math.abs(w) < 0.001).length;
    
    return {
      updatedWeights: weights,
      penaltyValue: penalty,
      effectiveParams,
      sparsity: (sparsityCount / weights.length) * 100,
      genScore: Math.max(0, Math.min(100, 85 - (lambda * 20) + (dropoutRate * 30)))
    };
  }
};

// --- 2. SKL_SafeWeightVisualizer (CPU-Based 3D Projection) ---
// WebGL gerektirmeyen, matematiksel izdüşüm kullanan görselleştirici
const SKL_SafeWeightVisualizer = ({ type, lambda, weights }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    const project = (x, y, z) => {
      const fov = 400;
      const distance = 350;
      const scale = fov / (distance + z);
      return { px: x * scale + cx, py: y * scale + cy, scale };
    };

    const draw = () => {
      time += 0.02;
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      const budget = Math.max(20, 100 / (lambda + 0.5));
      const rotationY = time;
      const rotationX = Math.PI / 6;

      // 3D Köşe Noktaları (Kısıt Geometrisi)
      let vertices = [];
      if (type === "L1 (Lasso)") {
        vertices = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]].map(v => v.map(c => c * budget));
      } else if (type === "L2 (Ridge)" || type === "Elastic Net") {
        const segments = 12;
        for (let i = 0; i <= segments; i++) {
          const lat = (i / segments) * Math.PI;
          for (let j = 0; j <= segments; j++) {
            const lon = (j / segments) * 2 * Math.PI;
            vertices.push([
              budget * Math.sin(lat) * Math.cos(lon),
              budget * Math.sin(lat) * Math.sin(lon),
              budget * Math.cos(lat)
            ]);
          }
        }
      } else {
        vertices = [[1,1,1], [1,1,-1], [1,-1,1], [1,-1,-1], [-1,1,1], [-1,1,-1], [-1,-1,1], [-1,-1,-1]].map(v => v.map(c => c * budget * 1.5));
      }

      // Rotasyon ve İzdüşüm
      const projected = vertices.map(v => {
        let x = v[0], y = v[1], z = v[2];
        // Y-axis rotation
        let tx = x * Math.cos(rotationY) - z * Math.sin(rotationY);
        let tz = x * Math.sin(rotationY) + z * Math.cos(rotationY);
        // X-axis rotation (tilt)
        let ty = y * Math.cos(rotationX) - tz * Math.sin(rotationX);
        let finalZ = y * Math.sin(rotationX) + tz * Math.cos(rotationX);
        return project(tx, ty, finalZ);
      });

      // Çizim
      ctx.beginPath();
      ctx.strokeStyle = type === "L1 (Lasso)" ? "#ef4444" : type === "L2 (Ridge)" ? "#3b82f6" : "#8b5cf6";
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3;
      
      projected.forEach((p, i) => {
        projected.slice(i + 1).forEach(p2 => {
          const d = Math.hypot(p.px - p2.px, p.py - p2.py);
          if (d < 100 * p.scale) {
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(p2.px, p2.py);
          }
        });
      });
      ctx.stroke();

      // Ağırlık Vektörleri (Rastgele Örnekleme)
      ctx.globalAlpha = 0.8;
      weights.slice(0, 15).forEach((w, i) => {
        const r = Math.abs(w) * budget * 1.2;
        const ang = (i / 15) * Math.PI * 2 + rotationY;
        const targetX = Math.cos(ang) * r;
        const targetZ = Math.sin(ang) * r;
        const targetY = (Math.sin(i + time) * budget * 0.5);
        
        const p = project(targetX, targetY, targetZ);
        ctx.beginPath();
        ctx.strokeStyle = w > 0 ? '#10b981' : '#f43f5e';
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.px, p.py);
        ctx.stroke();
      });

      ctx.globalAlpha = 1.0;
      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [type, lambda, weights]);

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center relative">
      <canvas ref={canvasRef} width={600} height={400} className="w-full h-full object-contain" />
      <div className="absolute top-2 right-2 bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-[8px] font-black uppercase border border-blue-500/20">
        Safe_CPU_Render_Active
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function App() {
  const [lambda, setLambda] = useState(0.15);
  const [dropout, setDropout] = useState(0.3);
  const [regType, setRegType] = useState("L2 (Ridge)");
  const [baseWeights] = useState(() => Array.from({ length: 120 }, () => (Math.random() - 0.5) * 2));

  const analysis = useMemo(() => {
    return SKL_RegLogicEngine.SKL_CalculateImpact(lambda, regType, baseWeights, dropout);
  }, [lambda, regType, baseWeights, dropout]);

  const SKL_Result = {
    SKL_ID: "SKL-0019",
    SKL_GenScore: analysis.genScore.toFixed(2),
    SKL_Sparsity: analysis.sparsity.toFixed(2),
    SKL_Status: "OPERASYONEL_STABIL"
  };

  const histogramData = {
    labels: Array.from({ length: 20 }, (_, i) => ((i - 10) / 10).toFixed(1)),
    datasets: [{
      label: 'Ağırlık Dağılımı',
      data: analysis.updatedWeights.reduce((acc, w) => {
        const bin = Math.min(19, Math.max(0, Math.floor((w + 1) * 10)));
        acc[bin] = (acc[bin] || 0) + 1;
        return acc;
      }, new Array(20).fill(0)),
      backgroundColor: regType.includes("L1") ? 'rgba(239, 68, 68, 0.5)' : 'rgba(59, 130, 246, 0.5)',
      borderColor: regType.includes("L1") ? '#ef4444' : '#3b82f6',
      borderWidth: 1,
      borderRadius: 4
    }]
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-mono text-xs p-4 md:p-8 selection:bg-rose-500/30">
      <header className="mb-8 border-b border-white/5 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-white text-2xl font-black tracking-tighter flex items-center gap-3 uppercase">
            <Cpu className="text-rose-500 animate-pulse" size={28} /> SKL-0019 <span className="text-slate-500 text-xs bg-slate-800 px-2 py-0.5 rounded uppercase font-bold tracking-widest">Reg-Logic</span>
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-[0.3em] font-bold">Kapasite Kontrol & Genelleme Analizörü</p>
        </div>
        <div className="flex gap-4">
          <SKL_StatBadge label="Genelleme" value={`${analysis.genScore.toFixed(1)}%`} color="text-emerald-400" />
          <SKL_StatBadge label="Sparsity" value={`${analysis.sparsity.toFixed(1)}%`} color="text-blue-400" />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Kontrol Paneli */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <SKL_SidePanel title="Konfigürasyon" icon={Settings}>
            <div className="space-y-6">
              <SKL_ControlSlider label="Ceza Katsayısı (λ)" value={lambda} min={0} max={1} step={0.01} onChange={setLambda} accent="accent-rose-500" />
              <SKL_ControlSlider label="Dropout Oranı (p)" value={dropout} min={0} max={0.9} step={0.05} onChange={setDropout} accent="accent-blue-500" />
              <div className="pt-4 border-t border-white/5">
                <p className="text-[9px] text-slate-500 uppercase font-black mb-3 tracking-widest">Metot Seçimi</p>
                <div className="grid grid-cols-1 gap-2">
                  {["Yok", "L1 (Lasso)", "L2 (Ridge)", "Elastic Net"].map(t => (
                    <button key={t} onClick={() => setRegType(t)}
                      className={`text-left px-3 py-2 rounded-lg text-[10px] transition-all border ${
                        regType === t ? 'bg-rose-500/10 border-rose-500 text-white font-bold shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'border-white/5 text-slate-400 hover:bg-white/5'
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SKL_SidePanel>

          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-4 shadow-xl">
             <h3 className="text-[10px] font-black text-rose-400 uppercase mb-4 flex items-center gap-2 tracking-widest">
               <ShieldAlert size={12} /> Sistem Özeti
             </h3>
             <div className="space-y-3">
                <SKL_MetricItem label="Penalty" value={analysis.penaltyValue.toFixed(4)} />
                <SKL_MetricItem label="Effective Params" value={Math.floor(analysis.effectiveParams)} />
                <SKL_MetricItem label="Engine" value="CPU_Safe_Mode" />
             </div>
          </div>
        </div>

        {/* Görselleştirme */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 h-[450px] relative overflow-hidden shadow-2xl">
            <div className="absolute top-6 left-6 z-10 bg-black/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <h4 className="text-[10px] font-black text-white uppercase flex items-center gap-2">
                <Box size={14} className="text-rose-500" /> Kısıt Geometrisi (Space Constraint)
              </h4>
            </div>
            
            <SKL_SafeWeightVisualizer type={regType} lambda={lambda} weights={analysis.updatedWeights} />
            
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
                <p className="text-[9px] text-slate-500 uppercase font-black mb-1 tracking-tighter">Lagrange Dual Çözüm</p>
                <p className="text-xl font-black text-rose-400 tabular-nums">||w||ₚ ≤ B</p>
              </div>
              <div className="text-right">
                <span className="block text-[9px] text-emerald-400 font-black tracking-widest uppercase">Precision_Engine_v2.7</span>
                <span className="text-slate-500 text-[9px]">Kaplan Logic Stabilizer</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-[10px] font-black text-white uppercase mb-4 flex items-center gap-2"><Hash size={12} className="text-blue-400" /> Ağırlık Dağılım Histogramı</h3>
            <div className="h-40"><Bar data={histogramData} options={SKL_ChartOptionsMinimal} /></div>
          </div>
        </div>

        {/* Sağ Panel */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden group shadow-2xl">
            <h3 className="text-xs font-black text-white uppercase mb-4 flex items-center gap-2"><Zap size={14} className="text-amber-400" /> Stokastik Dropout</h3>
            <p className="text-[10px] leading-relaxed text-slate-400 mb-6 italic">Nöron maskeleme işlemi, modelin varyansını düşürür ve "Overfitting" riskini minimize eder.</p>
            <div className="bg-black/30 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between text-[9px] mb-2 font-black uppercase tracking-tighter"><span>Direnç Katsayısı</span><span className="text-amber-400">{(dropout * 10).toFixed(1)}x</span></div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-amber-500 transition-all duration-700" style={{ width: `${dropout * 100}%` }} /></div>
            </div>
          </div>
          
          <SKL_SidePanel title="Nedensellik" icon={TrendingUp}>
            <p className="text-[10px] text-slate-500 leading-relaxed mb-4">
              Ceza katsayısı (λ), bias ve varyans arasındaki dengeyi belirleyen ana Lagrange çarpanıdır.
            </p>
            <div className="bg-black/40 p-3 rounded border border-white/5 font-mono text-[9px] text-emerald-400 break-all">
               {JSON.stringify(SKL_Result)}
            </div>
          </SKL_SidePanel>
        </div>
      </div>

      <footer className="mt-12 pt-6 border-t border-white/5 text-[9px] font-black text-slate-600 uppercase tracking-widest flex justify-between items-center font-mono">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>SKL-0019 // PRECISION_CAPACITY_MONITOR</span>
        </div>
        <span>© 2026 KAPLAN_ANALYTICS</span>
      </footer>
    </div>
  );
}

// HELPERS
const SKL_SidePanel = ({ title, icon: Icon, children }) => (
  <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md flex-1">
    <h3 className="text-xs font-bold text-white mb-6 uppercase flex items-center gap-2 tracking-widest"><Icon size={14} className="text-rose-400" /> {title}</h3>
    {children}
  </div>
);

const SKL_StatBadge = ({ label, value, color }) => (
  <div className="bg-slate-900 border border-white/5 px-4 py-2 rounded-xl shadow-xl min-w-[120px] transition-all hover:border-white/10">
    <p className="text-[9px] text-slate-500 uppercase font-black mb-1 tracking-tighter">{label}</p>
    <p className={`text-lg font-black tabular-nums tracking-tighter ${color}`}>{value}</p>
  </div>
);

const SKL_MetricItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 font-mono text-[10px]">
    <span className="text-slate-500 uppercase font-bold tracking-tight">{label}</span>
    <span className="text-white font-black">{value}</span>
  </div>
);

const SKL_ControlSlider = ({ label, value, min, max, step, onChange, accent }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-[10px] font-black uppercase">
      <span className="text-slate-500">{label}</span>
      <span className="text-white bg-slate-800 px-2 py-0.5 rounded shadow-inner">{value}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(parseFloat(e.target.value))} className={`w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer ${accent}`} />
  </div>
);

const SKL_ChartOptionsMinimal = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { display: false } },
    x: { grid: { display: false }, ticks: { font: { size: 8 }, color: '#475569' } }
  }
};
