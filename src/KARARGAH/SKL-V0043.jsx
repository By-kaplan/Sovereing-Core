/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / NORM-LOGIC
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v1.5.0-NORM (Numerical Verified)
 * @credits   : React, Chart.js, Lucide Icons, Tailwind CSS.
 * @license   : MIT | Kimlik mührü korunmak şartıyla serbest kullanım.
 * @note      : Sayısal stabilite ve gradyan analiz laboratuvarı.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Settings2, 
  Activity, 
  Zap, 
  TrendingDown, 
  Layers, 
  ShieldCheck,
  Minimize2,
  Maximize2,
  ArrowDownCircle,
  Cpu
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController,
  LineController
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Chart.js bileşenlerinin kaydı
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- 1. NormMetricSchema.js (Veri Şeması) ---
const NORM_SCHEMA = {
  methods: ["Ham Veri (Raw)", "Min-Max Ölçekleme", "Z-Score Standardizasyonu", "Yığın Normalizasyonu (Batch Norm)"],
  computeConditionNumber: (scaleA, scaleB) => Math.max(scaleA, scaleB) / Math.min(scaleA, scaleB),
  stabilityThreshold: 1.0e-7
};

// --- 2. normLogicEngine.js (İstatistiksel Analiz Motoru) ---
const normLogicEngine = {
  simulateConvergence: (conditionNumber) => {
    const steps = Math.floor(conditionNumber * 15 + 10);
    const loss = Array.from({ length: 20 }, (_, i) => ({
      epoch: i,
      val: Math.exp(-i / (conditionNumber * 0.5)) + Math.random() * 0.01
    }));
    return { steps, loss };
  }
};

// --- 3. LossLandscape (2D Canvas Tabanlı Topoloji - WebGL Gerektirmez) ---
const LossLandscape = ({ conditionNumber, normalized }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const draw = (time) => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Topografik eğrileri çiz (Eş yükseklik eğrileri)
      const scaleX = normalized ? 1 : Math.max(1.2, conditionNumber * 0.1);
      
      ctx.lineWidth = 1.5;
      for (let i = 1; i <= 8; i++) {
        ctx.beginPath();
        const alpha = 0.5 - (i * 0.05);
        ctx.strokeStyle = normalized ? `rgba(14, 165, 233, ${alpha})` : `rgba(244, 63, 94, ${alpha})`;
        
        // Eliptik veya dairesel topoloji çizimi
        ctx.ellipse(centerX, centerY, i * 12 * scaleX, i * 12, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Gradyan İniş Yolu (Beyaz top)
      const t = (time / 2000) % 1;
      const progress = 1 - t; // Merkeze doğru ilerleme
      const radius = 80 * progress;
      
      // Eliptik yolda zikzak/salınım efekti (Unnormalized durumda)
      const oscillation = normalized ? 0 : Math.sin(time / 200) * 0.5;
      
      const px = centerX + Math.cos(oscillation) * radius * scaleX;
      const py = centerY + Math.sin(oscillation) * radius;

      // Parlama efekti
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Hedef Noktası (Global Minimum)
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fill();
      
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [conditionNumber, normalized]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 shadow-inner">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={250} 
          className="w-full h-auto object-contain max-h-[250px]" 
        />
      </div>
      <div className="mt-4 flex items-center gap-2">
         <div className={`w-2 h-2 rounded-full ${normalized ? 'bg-blue-500' : 'bg-rose-500 animate-pulse'}`} />
         <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
           {normalized ? 'Stabil Gradyan Akışı' : 'Zikzaklı Salınım Rejimi'}
         </span>
      </div>
    </div>
  );
};

const MetricItem = ({ label, value, color = "text-white" }) => (
  <div className="flex justify-between py-1 border-b border-white/5 last:border-0 items-center">
    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">{label}</span>
    <span className={`text-[10px] font-black font-mono ${color}`}>{value}</span>
  </div>
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { display: false },
    tooltip: {
      backgroundColor: '#020617',
      titleFont: { size: 10, family: 'monospace' },
      bodyFont: { size: 10, family: 'monospace' },
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      displayColors: false
    }
  },
  scales: {
    y: { 
      grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false }, 
      ticks: { color: '#475569', font: { size: 8 } } 
    },
    x: { 
      grid: { display: false }, 
      ticks: { color: '#475569', font: { size: 8 } } 
    }
  }
};

// --- ANA BİLEŞEN ---
export default function App() {
  const [featureScales, setFeatureScales] = useState({ f1: 10, f2: 1000 });
  const [method, setMethod] = useState("Ham Veri (Raw)");

  const metrics = useMemo(() => {
    const isRaw = method === "Ham Veri (Raw)";
    const kappa = NORM_SCHEMA.computeConditionNumber(featureScales.f1, featureScales.f2);
    const conv = normLogicEngine.simulateConvergence(isRaw ? kappa : 1.2);
    return { kappa, conv };
  }, [featureScales, method]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 p-4 md:p-6 font-mono text-sm overflow-x-hidden">
      {/* Başlık Bölümü */}
      <header className="mb-8 border-b border-white/5 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-white text-xl font-black tracking-tighter flex items-center gap-2 uppercase">
            <Activity className="text-blue-500" size={24} /> Norm-Logic AI <span className="text-slate-500 text-sm">v1.5</span>
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest italic leading-tight">
            Sayısal Stabilite ve Gradyan Analiz Laboratuvarı
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-slate-900 border border-white/5 px-4 py-2 rounded-xl flex-1 md:flex-none shadow-inner">
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Hessian Koşul Sayısı ($\kappa$)</p>
            <p className={`text-sm font-black ${metrics.kappa > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {metrics.kappa.toFixed(2)}
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        
        {/* SOL PANEL: Giriş Parametreleri */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 backdrop-blur-md shadow-xl">
            <h3 className="text-xs font-bold text-white mb-6 uppercase flex items-center gap-2">
              <Settings2 size={14} className="text-blue-400" /> Giriş Parametreleri
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold">
                   <span className="text-slate-500 tracking-tight">Özellik A Ölçeği (Maaş)</span>
                   <span className="text-white">{featureScales.f2}</span>
                </div>
                <input type="range" min="10" max="10000" step="10" value={featureScales.f2}
                  onChange={e => setFeatureScales({...featureScales, f2: Number(e.target.value)})}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold">
                   <span className="text-slate-500 tracking-tight">Özellik B Ölçeği (Yaş)</span>
                   <span className="text-white">{featureScales.f1}</span>
                </div>
                <input type="range" min="1" max="100" step="1" value={featureScales.f1}
                  onChange={e => setFeatureScales({...featureScales, f1: Number(e.target.value)})}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <p className="text-[10px] text-slate-500 uppercase font-black mb-3 tracking-widest border-b border-white/5 pb-2">Normalizasyon Metodu</p>
              {NORM_SCHEMA.methods.map(m => (
                <button key={m} onClick={() => setMethod(m)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[10px] transition-all border ${
                    method === m ? 'bg-blue-600/20 border-blue-500 text-white font-bold shadow-lg shadow-blue-500/10' : 'border-white/5 hover:bg-white/5 text-slate-400'
                  }`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-950/20 border border-blue-500/20 rounded-2xl p-5 shadow-lg shadow-blue-900/10">
             <h3 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2">
               <ShieldCheck size={12} /> Sayısal Kararlılık
             </h3>
             <p className="text-[11px] leading-relaxed text-slate-400">
               Büyük ölçek farkları Hessian matrisini "kötü koşullandırılmış" hale getirir. Normalizasyon, gradyanların homojen dağılımını sağlar.
             </p>
          </div>
        </div>

        {/* ORTA PANEL: Görselleştirme */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden p-6 h-[350px] md:h-[400px] relative shadow-2xl group transition-all hover:border-white/10">
              <div className="absolute top-6 left-6 z-10">
                <h4 className="text-[10px] font-bold text-rose-500 uppercase flex items-center gap-2 bg-rose-950/30 px-2 py-1 rounded border border-rose-500/20 backdrop-blur-sm">
                  <Minimize2 size={12} /> Ham Yüzey (Eliptik)
                </h4>
              </div>
              <LossLandscape conditionNumber={metrics.kappa} normalized={false} />
            </div>

            <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden p-6 h-[350px] md:h-[400px] relative shadow-2xl group transition-all hover:border-white/10">
              <div className="absolute top-6 left-6 z-10">
                <h4 className="text-[10px] font-bold text-blue-500 uppercase flex items-center gap-2 bg-blue-950/30 px-2 py-1 rounded border border-blue-500/20 backdrop-blur-sm">
                  <Maximize2 size={12} /> Normalize (Dairesel)
                </h4>
              </div>
              <LossLandscape conditionNumber={metrics.kappa} normalized={true} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 shadow-xl">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
                <h3 className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <TrendingDown size={14} className="text-emerald-400" /> Yakınsama Analizi (Log Loss)
                </h3>
                <span className="text-[9px] text-slate-500 font-bold uppercase bg-white/5 px-2 py-1 rounded border border-white/5 tracking-tighter">
                  Epoch Tasarrufu: {Math.max(0, metrics.conv.steps - 20)} Birim
                </span>
             </div>
             <div className="h-48">
                <Line 
                  data={{
                    labels: metrics.conv.loss.map(d => d.epoch),
                    datasets: [{
                      label: 'Loss',
                      data: metrics.conv.loss.map(d => d.val),
                      borderColor: method === 'Ham Veri (Raw)' ? '#f43f5e' : '#0ea5e9',
                      backgroundColor: method === 'Ham Veri (Raw)' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(14, 165, 233, 0.1)',
                      fill: true,
                      tension: 0.4,
                      pointRadius: 0
                    }]
                  }}
                  options={chartOptions}
                />
             </div>
          </div>
        </div>

        {/* SAĞ PANEL: Raporlama */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-white mb-6 uppercase flex items-center gap-2 tracking-tighter font-black">
              <Layers size={14} className="text-blue-400" /> İstatistiksel Momentler
            </h3>
            <div className="space-y-4">
              <MetricItem label="Beklenen Değer (μ)" value={method.includes("Standard") ? "0.000" : (featureScales.f2/2.1).toFixed(2)} />
              <MetricItem label="Varyans (σ²)" value={method.includes("Standard") ? "1.000" : (Math.pow(featureScales.f2, 1.8)/15).toFixed(2)} />
              <MetricItem label="Gradyan Salınımı" value={method === "Ham Veri (Raw)" ? "Kritik" : "Stabil"} color={method === "Ham Veri (Raw)" ? "text-rose-400" : "text-emerald-400"} />
              <MetricItem label="Optimizasyon Rejimi" value={method === "Ham Veri (Raw)" ? "Zayıf" : "Optimal"} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ArrowDownCircle size={14} /> Gradyan Akışı
            </h3>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[10px] leading-relaxed font-mono">
              <p className="text-slate-500 mb-2 font-bold">Öğrenme Hızı (η) Sınırı:</p>
              <code className="text-blue-400 font-bold">{"η < (2 / λ_max)"}</code>
              <p className="mt-2 text-slate-400 italic leading-relaxed tracking-tight">
                Normalizasyon, Hessian'ın spektral çapını daraltarak daha yüksek öğrenme hızlarını (η) mümkün kılar.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-indigo-950/40 border border-blue-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                <Cpu size={56} />
             </div>
             <div className="relative z-10">
               <h4 className="text-white font-black text-sm mb-1 uppercase tracking-tighter">Batch Normalization</h4>
               <p className="text-[10px] text-slate-400 leading-tight mb-4">
                 Internal Covariate Shift'i minimize ederek dağılımı her mini-batch'te stabilize eder.
               </p>
               <div className="flex items-center gap-2">
                  <Zap className="text-amber-400" size={14} />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">Hızlandırma: x{ Math.min(10, (metrics.kappa / 4.5)).toFixed(1) }</span>
               </div>
             </div>
          </div>
        </div>

      </div>
      
      <footer className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">
        <span>© 2024 NORM-LOGIC // NUMERICAL STABILITY ANALYZER</span>
        <div className="flex gap-4">
          <span>Hessian Koşullanması: {metrics.kappa < 10 ? 'Optimal' : 'Kritik'}</span>
          <span>Hassasiyet: FP32</span>
        </div>
      </footer>
    </div>
  );
}
