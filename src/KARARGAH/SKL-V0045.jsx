/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / ATTENTION-LOGIC
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v1.0.0-ATTENTION (Mathematical Verified)
 * @credits   : React, Chart.js, Lucide Icons, Tailwind CSS.
 * @license   : MIT | Kimlik mührü korunmak şartıyla serbest kullanım.
 * @note      : Self-attention mekanizması ve olasılık dağılım simülatörü.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Activity, 
  Cpu, 
  Layers, 
  Search, 
  Key, 
  Database, 
  Maximize2, 
  Zap, 
  Target, 
  Link2,
  BarChart3,
  Network,
  Info
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Chart } from 'react-chartjs-2';

// Chart.js Kaydı - Eksik olan Controller'lar eklendi
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- ÇEKİRDEK MATEMATİKSEL MOTOR (Engine) ---
const selfAttentionLogic = {
  computeWeights: (Q, K, dk) => {
    const n = Q.length;
    const scale = Math.sqrt(dk);
    const rawScores = Array(n).fill(0).map((_, i) => 
      Array(n).fill(0).map((_, j) => {
        let dot = 0;
        for (let k = 0; k < dk; k++) dot += Q[i][k] * K[j][k];
        return dot / scale;
      })
    );

    return rawScores.map(row => {
      const maxVal = Math.max(...row);
      const exps = row.map(v => Math.exp(v - maxVal));
      const sum = exps.reduce((a, b) => a + b, 0);
      return exps.map(v => v / sum);
    });
  },
  
  getEntropy: (weights) => {
    return weights.map(row => 
      -row.reduce((acc, v) => acc + (v * Math.log(v + 1e-9)), 0)
    );
  }
};

// --- GÖRSELLEŞTİRME BİLEŞENİ (Canvas Fallback ile) ---
const AttentionVisualizer = ({ weights, n }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const nodes = [];
    const radius = 80;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2;
      nodes.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      });
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Bağlantılar (Synapses)
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const weight = weights[i][j];
          if (weight < 0.05) continue;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${weight * 0.8})`;
          ctx.lineWidth = weight * 3;
          ctx.stroke();
        }
      }

      // Düğümler
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time / 500 + i) * 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#06b6d4';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame((t) => draw(t));
    };

    draw(0);
    return () => cancelAnimationFrame(animationId);
  }, [weights, n]);

  return (
    <div className="w-full aspect-square bg-slate-950/50 rounded-2xl border border-white/5 flex items-center justify-center p-4">
      <canvas ref={canvasRef} width={300} height={300} className="w-full h-full" />
    </div>
  );
};

// --- ANA DASHBOARD BİLEŞENİ ---
export default function App() {
  const n = 6; // Token Sayısı
  const dk = 64; // d_k Boyutu

  const [matrices, setMatrices] = useState(() => {
    const gen = (r, c) => Array(r).fill(0).map(() => Array(c).fill(0).map(() => Math.random() * 2 - 1));
    return { Q: gen(n, dk), K: gen(n, dk), V: gen(n, dk) };
  });

  const attentionData = useMemo(() => {
    const weights = selfAttentionLogic.computeWeights(matrices.Q, matrices.K, dk);
    const entropies = selfAttentionLogic.getEntropy(weights);
    return { weights, entropies };
  }, [matrices, n, dk]);

  const entropyChartData = {
    labels: Array.from({length: n}, (_, i) => `T${i}`),
    datasets: [{
      label: 'Entropi (Bilgi Dağılımı)',
      data: attentionData.entropies,
      backgroundColor: 'rgba(6, 182, 212, 0.2)',
      borderColor: '#06b6d4',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  };

  const regenerate = () => {
    const gen = (r, c) => Array(r).fill(0).map(() => Array(c).fill(0).map(() => Math.random() * 2 - 1));
    setMatrices({ Q: gen(n, dk), K: gen(n, dk), V: gen(n, dk) });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-4 md:p-8 overflow-x-hidden">
      {/* Üst Bilgi Çubuğu */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
            <Network className="text-cyan-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase leading-none">
              Self-Attention <span className="text-cyan-500 italic">Logic AI</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">
              Lineer Cebir ve Vektör Uzayı Eşlemesi
            </p>
          </div>
        </div>

        <div className="flex gap-4">
           <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase font-bold text-right leading-none">Ölçekleme Mantığı</span>
              <span className="text-xs font-mono text-cyan-400 mt-1">1 / √dₖ (0.125)</span>
           </div>
           <button 
             onClick={regenerate}
             className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-cyan-900/20"
           >
             <Zap size={14} /> PROJEKSİYONU YENİLE
           </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* Sol Panel */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 backdrop-blur-md shadow-xl">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Layers size={14} className="text-cyan-500" /> Vektör İzdüşümleri (L0)
            </h3>
            <div className="space-y-4">
              <MatrixThumb label="Query (Wq)" color="cyan" />
              <MatrixThumb label="Key (Wk)" color="blue" />
              <MatrixThumb label="Value (Wv)" color="indigo" />
            </div>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-5 shadow-lg">
            <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={14} /> Teknik Parametreler
            </h3>
            <div className="space-y-3">
              <Stat label="Dizi Uzunluğu (n)" value={n} />
              <Stat label="Model Boyutu (d)" value={dk} />
              <Stat label="Maksimum Alfa" value={(Math.max(...attentionData.weights.flat())).toFixed(3)} />
              <div className="h-px bg-white/5 my-2" />
              <p className="text-[9px] text-slate-500 leading-relaxed italic text-center px-2">
                * Skorlar, nokta çarpımı benzerliği ile hesaplanıp Softmax ile normalize edilmiştir.
              </p>
            </div>
          </div>
        </div>

        {/* Orta Panel */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 leading-none">
                 <BarChart3 size={16} className="text-cyan-400" /> Softmax Olasılık Matrisi
               </h2>
               <span className="text-[9px] font-mono text-slate-500 uppercase font-black">Ölçek: [0, 1]</span>
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {attentionData.weights.map((row, i) => (
                row.map((val, j) => (
                  <div 
                    key={`${i}-${j}`}
                    className="aspect-square rounded-md border border-white/5 flex items-center justify-center relative group overflow-hidden transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: `rgba(6, 182, 212, ${val * 0.85 + 0.05})` }}
                  >
                    <span className="text-[8px] font-mono font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      {val.toFixed(2)}
                    </span>
                    {i === j && <div className="absolute inset-0.5 border border-white/20 rounded pointer-events-none" />}
                  </div>
                ))
              ))}
            </div>
            
            <div className="flex justify-between mt-6 text-[9px] text-slate-600 font-bold uppercase tracking-tighter">
              <span>Token[0] Girişi</span>
              <div className="flex gap-4">
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-cyan-500 rounded-sm" /> Yüksek Dikkat</span>
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-800 rounded-sm" /> Gürültü</span>
              </div>
              <span>Token[n] Girişi</span>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 h-64 shadow-xl">
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 leading-none">Dikkat Entropisi (Bilgi Dağılımı)</h3>
             <div className="h-44">
              <Chart type="bar" data={entropyChartData} options={chartOptions} />
             </div>
          </div>
        </div>

        {/* Sağ Panel */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition"></div>
            <div className="relative bg-slate-900/80 rounded-3xl p-4 overflow-hidden border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-4 px-2">
                 <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest leading-none">Bağlam Ağı</h3>
                 <Activity size={12} className="text-cyan-500 animate-pulse" />
              </div>
              <AttentionVisualizer weights={attentionData.weights} n={n} />
            </div>
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 shadow-lg">
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 leading-none">
               <Target size={14} /> Dikkat Mantığı
             </h3>
             <div className="space-y-4">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 shadow-inner">
                   <div className="text-[10px] text-cyan-400 font-mono mb-1 uppercase font-bold tracking-tight">Formül:</div>
                   <div className="text-[11px] text-white font-mono break-all italic tracking-tight">
                     exp(q·k/scale) / Σexp(q·k/scale)
                   </div>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed italic text-justify">
                  Bu katman, her öğenin dizi içindeki diğer tüm öğelerle olan istatistiksel hizalamasını (alignment) dinamik olarak hesaplar.
                </p>
             </div>
          </div>
        </div>

      </div>
      
      <footer className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold text-slate-600 uppercase tracking-widest max-w-7xl mx-auto">
        <div className="flex gap-12">
          <span>Core Engine: SELF-ATTENTION_v1.0.0</span>
          <span className="flex items-center gap-2 text-cyan-500/80 leading-none italic">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" /> 
            Vector Synthesis Operational
          </span>
        </div>
        <div className="text-right italic">
          ORIGIN: KAPLAN_HALI_YIKAMA_PRECISION_DEPT | MİMAR: ÖMER KAPLAN
        </div>
      </footer>
    </div>
  );
}

const MatrixThumb = ({ label, color }) => (
  <div className="space-y-2 group cursor-help">
    <div className="flex justify-between items-center">
      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter transition-colors group-hover:text-slate-300">{label}</span>
      <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]`} />
    </div>
    <div className="grid grid-cols-4 gap-1">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="h-4 bg-black/40 rounded border border-white/5 transition-colors group-hover:border-white/10" />
      ))}
    </div>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-1">
    <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">{label}</span>
    <span className="text-xs font-mono text-white font-bold italic">{value}</span>
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
