/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / GAN-LOGIC
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v1.1.0-GAN (Adversarial Verified)
 * @credits   : React, Chart.js, Lucide Icons, Tailwind CSS.
 * @license   : MIT | Kimlik mührü korunmak şartıyla serbest kullanım.
 * @note      : Adversarial Nash Equilibrium Analyzer ve üretici evrim simülatörü.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Zap, 
  Activity, 
  ShieldCheck, 
  Target, 
  Binary, 
  AlertOctagon, 
  TrendingUp, 
  Layers,
  Cpu,
  RefreshCw
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ==========================================
// 1. GANMetricSchema.js (Veri Şeması)
// ==========================================
const GANMetricSchema = {
  latentDim: 100,
  learningRateRatio: "G:1e-4 / D:4e-4", // Two-Timescale Update Rule (TTUR)
  metrics: {
    fidScore: 18.24, // Frechet Inception Distance
    gradientPenalty: 10.0,
    inceptionScore: 8.5,
    modeCollapseRisk: 0.12
  }
};

// ==========================================
// 2. ganLogicEngine.js (Çekirdek Algoritmalar)
// ==========================================
const ganLogicEngine = {
  // Minimax Kayıp Hesaplama (Binary Cross Entropy Proxy)
  calculateLosses: (step, stability) => {
    const baseG = Math.exp(-step / 500) * 5;
    const baseD = Math.exp(-step / 400) * 4;
    
    // Çekişmeli gürültü ekle
    const oscillation = Math.sin(step / 10) * (1 - stability);
    
    return {
      lossG: (baseG + oscillation + 1).toFixed(4),
      lossD: (baseD - oscillation * 0.5 + 0.8).toFixed(4)
    };
  },

  // Dağılım Hizalama (Wasserstein Mesafesi Simülasyonu)
  calculateDistance: (step) => {
    return Math.max(0.01, 2.5 * Math.exp(-step / 300)).toFixed(4);
  },

  // Mod Çökmesi (Mode Collapse) Analizi
  detectModeCollapse: (gLoss, dLoss, variance) => {
    if (dLoss < 0.1 && gLoss > 4) return 0.95; // Denetleyici çok güçlü, Üretici çöktü
    return (0.1 / (variance + 0.01)).toFixed(2);
  }
};

// ==========================================
// 3. GenerativeEvolutionVisualizer (3D Probabilistic Space)
// ==========================================
const GenerativeEvolutionVisualizer = ({ step, isTraining }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const points = Array.from({ length: 400 }, () => ({
      zx: (Math.random() - 0.5) * 2, // Latent Noise X
      zy: (Math.random() - 0.5) * 2, // Latent Noise Y
      targetX: (Math.random() - 0.5) * 300,
      targetY: (Math.random() - 0.5) * 300,
      color: Math.random() > 0.5 ? '#6366f1' : '#10b981'
    }));

    const draw = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Eğitim İlerlemesi (0 -> 1)
      const progress = Math.min(1, step / 1000);
      const noiseReduction = 1 - progress;

      // Karar Sınırı (Decision Boundary) - D(x)
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = `rgba(244, 63, 94, ${0.2 + Math.sin(step/10)*0.1})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150 * (0.8 + progress * 0.2), 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Veri Noktalarının Evrimi
      points.forEach(p => {
        // Latent Space'den Target Manifold'a projeksiyon
        const currentX = centerX + (p.zx * 200 * noiseReduction) + (p.targetX * 0.5 * progress);
        const currentY = centerY + (p.zy * 200 * noiseReduction) + (p.targetY * 0.5 * progress);

        const dist = Math.sqrt(Math.pow(currentX - centerX, 2) + Math.pow(currentY - centerY, 2));
        const isReal = dist < 150 * (0.8 + progress * 0.2);

        ctx.fillStyle = isReal ? '#10b981' : '#f43f5e';
        ctx.globalAlpha = isReal ? 0.6 : 0.3;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      if (isTraining) animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [step, isTraining]);

  return (
    <div className="relative w-full h-full min-h-[450px]">
      <canvas ref={canvasRef} width={800} height={500} className="w-full h-full rounded-2xl bg-black/20" />
      <div className="absolute top-4 right-6 text-right">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Olasılık Uzayı (p_gen vs p_data)</div>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> <span className="text-[9px] font-mono">D(G(z)) &gt; 0.5</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /> <span className="text-[9px] font-mono">D(G(z)) &lt; 0.5</span></div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. Main Application
// ==========================================
export default function App() {
  const [step, setStep] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [stability, setStability] = useState(0.85);

  const logic = useMemo(() => {
    const losses = ganLogicEngine.calculateLosses(step, stability);
    const distance = ganLogicEngine.calculateDistance(step);
    const modeCollapse = ganLogicEngine.detectModeCollapse(parseFloat(losses.lossG), parseFloat(losses.lossD), stability);
    return { ...losses, distance, modeCollapse };
  }, [step, stability]);

  useEffect(() => {
    let interval;
    if (isTraining && step < 1000) {
      interval = setInterval(() => setStep(s => s + 1), 50);
    } else {
      setIsTraining(false);
    }
    return () => clearInterval(interval);
  }, [isTraining, step]);

  const lossChartData = {
    labels: Array.from({ length: 20 }, (_, i) => i * 50),
    datasets: [
      {
        label: 'L_G (Generator)',
        data: Array.from({ length: 20 }, (_, i) => ganLogicEngine.calculateLosses(i * 50, stability).lossG),
        borderColor: '#6366f1',
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.3
      },
      {
        label: 'L_D (Discriminator)',
        data: Array.from({ length: 20 }, (_, i) => ganLogicEngine.calculateLosses(i * 50, stability).lossD),
        borderColor: '#f43f5e',
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.3
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-4 md:p-8 overflow-x-hidden">
      {/* Üst Bilgi Çubuğu */}
      <header className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 border-b border-white/5 pb-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <RefreshCw className={`text-indigo-400 ${isTraining ? 'animate-spin' : ''}`} size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">
              GAN-Logic <span className="text-indigo-500">AI</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-mono tracking-[0.3em] uppercase mt-1">
              Adversarial Nash Equilibrium Analyzer
            </p>
          </div>
        </div>
        <div className="flex gap-2">
           <StatusBadge label="STRATEGY" value="Minimax" color="indigo" />
           <StatusBadge label="LOSS" value="W-Distance" color="emerald" />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* Sol: Parametre Kontrolü */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <section className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Cpu size={14} className="text-indigo-400" /> Hiperparametreler
            </h3>
            
            <div className="space-y-6">
              <ControlSlider 
                label="Öğrenme Kararlılığı" 
                value={stability} min={0.1} max={1} step={0.05} 
                onChange={setStability} color="indigo"
              />
              
              <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3 shadow-inner">
                 <div className="flex justify-between text-[10px] font-mono uppercase font-black">
                    <span className="text-slate-500">Latent Dim (z)</span>
                    <span className="text-white tracking-tighter">100-d</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-mono uppercase font-black">
                    <span className="text-slate-500">Batch Size</span>
                    <span className="text-white">64</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-mono uppercase font-black">
                    <span className="text-slate-500">Optimizasyon</span>
                    <span className="text-white italic text-[8px]">Adam (β1=0.5)</span>
                 </div>
              </div>

              <button 
                onClick={() => {
                  if (step >= 1000) setStep(0);
                  setIsTraining(!isTraining);
                }}
                className={`w-full py-4 rounded-xl border flex items-center justify-center gap-3 text-xs font-black transition-all shadow-lg ${isTraining ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-rose-900/10' : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-indigo-900/10'}`}
              >
                {isTraining ? <Zap size={16} className="animate-pulse" /> : <TrendingUp size={16} />}
                {isTraining ? "EĞİTİMİ DURDUR" : "ADVERSARIAL EĞİTİMİ BAŞLAT"}
              </button>
            </div>
          </section>

          <section className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 shadow-lg">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Çekişme Dengesi</h3>
            <div className="space-y-4">
               <MetricRow label="Üretici Kaybı (L_G)" value={logic.lossG} sub="Adversarial Loss" />
               <MetricRow label="Denetleyici Kaybı (L_D)" value={logic.lossD} sub="Classification Loss" />
               <MetricRow label="JS-Divergence" value={logic.distance} sub="Distribution Distance" />
            </div>
          </section>
        </div>

        {/* Orta: Evrim Görselleştirici */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-1 overflow-hidden relative shadow-2xl">
            <div className="absolute top-6 left-6 z-10 bg-black/60 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
               <div className="flex items-center gap-2 mb-1">
                 <div className={`w-2 h-2 rounded-full ${isTraining ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
                 <h2 className="text-white text-[10px] font-black uppercase tracking-widest">Generative Evolution</h2>
               </div>
               <p className="text-[9px] text-slate-500 font-mono font-bold">Epoch: {(step / 10).toFixed(0)} | Step: {step}</p>
            </div>
            <GenerativeEvolutionVisualizer step={step} isTraining={isTraining} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 shadow-xl">
               <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <AlertOctagon size={14} className="text-rose-400" /> Mode Collapse Risk
               </h3>
               <div className="flex items-center gap-4">
                  <div className="text-3xl font-black text-white italic">%{Math.round(logic.modeCollapse * 100)}</div>
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                     <div 
                       className={`h-full transition-all duration-1000 ${logic.modeCollapse > 0.5 ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-indigo-500 shadow-[0_0_8px_#6366f1]'}`}
                       style={{ width: `${logic.modeCollapse * 100}%` }}
                     />
                  </div>
               </div>
               <p className="mt-3 text-[9px] text-slate-500 leading-tight italic font-bold uppercase">
                  Üreticinin sınırlı bir manifolda sıkışma ve çıktı çeşitliliğini yitirme olasılığı.
               </p>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 shadow-xl">
               <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <ShieldCheck size={14} className="text-emerald-400" /> Gradient Penalty (GP)
               </h3>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono font-black uppercase tracking-tighter">
                     <span className="text-slate-500">Norm Constraint</span>
                     <span className="text-emerald-400">||∇D|| ≤ 1</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full shadow-inner overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[70%] shadow-[0_0_8px_#10b981]" />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Sağ: Analitik Raporlar */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <section className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 shadow-xl">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 leading-none">Eğitim Eğrileri (Loss Map)</h3>
            <div className="h-[200px]">
              <Line data={lossChartData} options={chartOptions} />
            </div>
          </section>

          <section className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity size={14} /> Adversarial Report
            </h3>
            <div className="space-y-4">
               <ReportRow label="FID Score" value={GANMetricSchema.metrics.fidScore.toFixed(2)} />
               <ReportRow label="Inception Score" value={GANMetricSchema.metrics.inceptionScore.toFixed(1)} />
               <ReportRow label="Nash Eq. Gap" value={(Math.abs(logic.lossG - logic.lossD)).toFixed(3)} />
               <ReportRow label="Training Speed" value="240 step/sec" />
            </div>
            <div className="mt-6 p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20 shadow-inner">
               <div className="flex items-center gap-2 mb-2">
                  <Target size={14} className="text-indigo-400" />
                  <span className="text-[10px] font-black text-white uppercase tracking-tighter">Sistem Kararlılığı</span>
               </div>
               <div className="text-[9px] text-slate-400 font-mono leading-relaxed italic uppercase font-bold tracking-tight">
                  Minimax dengesi korunuyor. Denetleyici gradyanları doygunluğa (saturation) ulaşmadı.
               </div>
            </div>
          </section>
        </div>

      </div>

      <footer className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] max-w-7xl mx-auto">
        <div className="flex gap-12">
           <span>Engine: GAN_LOGIC_v1.1.0</span>
           <span className="flex items-center gap-2 text-indigo-500/80 italic">
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" /> 
             Nash Equilibrium Monitor Operational
           </span>
        </div>
        <div className="text-right italic">
          ORIGIN: KAPLAN_HALI_YIKAMA_PRECISION_DEPT | MİMAR: ÖMER KAPLAN
        </div>
      </footer>
    </div>
  );
}

// Yardımcı Bileşenler
const StatusBadge = ({ label, value, color }) => (
  <div className={`px-3 py-1 bg-${color}-500/10 border border-${color}-500/20 rounded-lg flex items-center gap-2 shadow-sm`}>
    <span className={`text-[9px] font-black text-${color}-500/70 uppercase tracking-widest`}>{label}</span>
    <span className={`text-[10px] font-black text-${color}-400 uppercase italic`}>{value}</span>
  </div>
);

const ControlSlider = ({ label, value, min, max, step, onChange, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <span className={`text-xs font-mono font-black text-${color}-400 italic`}>{value}</span>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-${color}-500 shadow-inner`}
    />
  </div>
);

const MetricRow = ({ label, value, sub }) => (
  <div className="flex justify-between items-start group p-2 hover:bg-white/5 rounded-lg transition-all border-b border-white/5 last:border-0 pb-2">
    <div>
      <div className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{label}</div>
      <div className="text-[8px] text-slate-600 font-mono uppercase italic font-bold">{sub}</div>
    </div>
    <div className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors italic font-mono">{value}</div>
  </div>
);

const ReportRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
    <span className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">{label}</span>
    <span className="text-[11px] font-black text-slate-200 font-mono italic">{value}</span>
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
    y: { display: false },
    x: { 
      grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false }, 
      ticks: { color: '#475569', font: { size: 8, family: 'monospace' } } 
    }
  }
};
