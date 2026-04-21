/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / TRANSFORMER-LOGIC
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v4.0.0-TRANSFORMER (Attention Verified)
 * @credits   : React, Chart.js, Lucide Icons, Tailwind CSS.
 * @license   : MIT | Kimlik mührü korunmak şartıyla serbest kullanım.
 * @note      : Çok başlı dikkat mekanizması ve paralel tensör işleme simülatörü.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Cpu, Activity, Layers, Database, Zap, Target, 
  TrendingDown, BarChart3, RefreshCcw, Binary, 
  Search, Network, Boxes, Maximize2, Terminal, ShieldCheck,
  Eye, Brain, GitCommit, LayoutPanelLeft
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  RadarController,
  RadialLinearScale,
  BarElement
} from 'chart.js';
import { Line, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  RadialLinearScale, Tooltip, Legend, Filler, 
  RadarController, BarElement
);

/**
 * --- transformerLogicEngine.js ---
 * Multi-Head Attention ve Softmax skorlarını yöneten matematiksel motor.
 */
const transformerLogicEngine = {
  softmax: (arr) => {
    const max = Math.max(...arr);
    const exps = arr.map(x => Math.exp(x - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(x => x / sum);
  },

  // Score = Softmax(QK^T / sqrt(dk))
  generateAttentionMap: (size, heads = 8) => {
    return Array.from({ length: heads }, () => 
      Array.from({ length: size }, () => 
        transformerLogicEngine.softmax(Array.from({ length: size }, () => Math.random() * 2))
      )
    );
  }
};

/**
 * --- AttentionMapVisualizer.jsx ---
 * Attention Head etkileşimlerini görselleştiren interaktif matris.
 */
const AttentionMapVisualizer = ({ sequenceSize, activeHead }) => {
  const [map, setMap] = useState([]);

  useEffect(() => {
    setMap(transformerLogicEngine.generateAttentionMap(sequenceSize, 8));
  }, [sequenceSize]);

  if (!map[activeHead]) return null;

  return (
    <div className="w-full bg-slate-900/50 rounded-2xl border border-slate-800 p-8 relative shadow-2xl overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <Eye className="text-indigo-500" size={18} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Head-{activeHead} Aktivasyon Matrisi
          </h3>
        </div>
        <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest italic">
          Korelasyon: Dot-Product Attention
        </div>
      </div>

      <div 
        className="grid gap-1 mx-auto" 
        style={{ 
          gridTemplateColumns: `repeat(${sequenceSize}, minmax(0, 1fr))`,
          maxWidth: '500px'
        }}
      >
        {map[activeHead].map((row, i) => 
          row.map((val, j) => (
            <div 
              key={`${i}-${j}`}
              className="aspect-square rounded-sm transition-all duration-500 hover:scale-110 cursor-crosshair border border-slate-800/50"
              style={{ 
                backgroundColor: `rgba(99, 102, 241, ${val * 3})`,
                boxShadow: val > 0.4 ? `0 0 10px rgba(99, 102, 241, ${val})` : 'none'
              }}
              title={`Pos[${i},${j}]: ${(val * 100).toFixed(2)}%`}
            />
          ))
        )}
      </div>

      <div className="mt-8 flex justify-between items-end border-t border-slate-800 pt-6">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-600 uppercase font-black">Entropy</span>
            <span className="text-xs font-bold text-indigo-400">0.842 bits</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-600 uppercase font-black">Sparsity</span>
            <span className="text-xs font-bold text-emerald-400">12.4%</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-500 font-mono italic">
          Score = Softmax(QKᵀ / √dₖ)
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeHead, setActiveHead] = useState(0);
  const [sequenceSize, setSequenceSize] = useState(16);

  const radarData = {
    labels: ['Context Window', 'Parallelization', 'Throughput', 'Accuracy', 'Parameter Efficiency'],
    datasets: [{
      label: 'Transformer-L',
      data: [98, 95, 92, 90, 88],
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: '#6366f1',
      borderWidth: 2,
      pointRadius: 0
    }]
  };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 font-mono text-[13px] selection:bg-indigo-500/40">
      <div className="max-w-[1600px] mx-auto grid grid-cols-12 h-screen overflow-hidden">
        
        {/* SOL PANEL */}
        <aside className="col-span-12 md:col-span-3 border-r border-slate-800 p-8 flex flex-col gap-8 overflow-y-auto bg-slate-900/10">
          <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
            <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-600/20">
              <Brain size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-black uppercase tracking-tighter text-xl leading-none italic">Transformer-Logic</h1>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Multi-Head Attention Engine</span>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-indigo-400 font-black flex items-center gap-3 uppercase text-[10px] tracking-widest italic">
              <Zap size={14} /> Head Selection
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveHead(i)}
                  className={`p-3 rounded-lg border text-[10px] font-black transition-all ${
                    activeHead === i 
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' 
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  H{i}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-slate-400 font-black flex items-center gap-3 uppercase text-[10px] tracking-widest italic">
              <Cpu size={14} /> Global Parameters
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] uppercase font-black text-slate-500">
                  <span>Seq Length (N)</span>
                  <span className="text-indigo-400">{sequenceSize} tokens</span>
                </div>
                <input 
                  type="range" min="8" max="24" step="2"
                  value={sequenceSize}
                  onChange={(e) => setSequenceSize(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-full appearance-none cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl shadow-inner">
                  <span className="text-[8px] text-slate-600 uppercase font-black">d_model</span>
                  <div className="text-sm font-bold text-slate-200">512</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl shadow-inner">
                  <span className="text-[8px] text-slate-600 uppercase font-black">heads</span>
                  <div className="text-sm font-bold text-slate-200">8</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto hidden md:block opacity-40 grayscale hover:grayscale-0 transition-all">
             <Radar 
                data={radarData}
                options={{
                  scales: { r: { grid: { color: '#1e293b' }, angleLines: { color: '#1e293b' }, pointLabels: { display: false }, ticks: { display: false } } },
                  plugins: { legend: { display: false } }
                }}
              />
          </div>
        </aside>

        {/* ORTA PANEL */}
        <main className="col-span-12 md:col-span-6 p-8 space-y-8 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-900 pb-6">
            <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
              <RefreshCcw size={14} className="text-indigo-500 animate-[spin_10s_linear_infinite]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Attention Map v4.0</span>
            </div>
            <div className="text-[9px] text-slate-600 font-mono tracking-widest uppercase italic">X-Global Attention Masking: OFF</div>
          </div>

          <AttentionMapVisualizer sequenceSize={sequenceSize} activeHead={activeHead} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600/20" />
              <div className="flex items-center gap-3 text-indigo-400 text-[10px] font-black uppercase mb-6 tracking-widest italic">
                <BarChart3 size={14} /> Attention Entropy Analizi
              </div>
              <div className="h-[180px]">
                <Line 
                  data={{
                    labels: Array(20).fill(''),
                    datasets: [{
                      data: [82, 85, 80, 88, 92, 85, 84, 86, 88, 87, 85, 89, 92, 90, 88, 86, 85, 88, 91, 94],
                      borderColor: '#6366f1',
                      tension: 0.4,
                      borderWidth: 3,
                      pointRadius: 0,
                    }]
                  }}
                  options={{
                    maintainAspectRatio: false,
                    scales: { x: { display: false }, y: { display: false } },
                    plugins: { legend: { display: false } }
                  }}
                />
              </div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-xl">
              <div className="flex items-center gap-3 text-emerald-400 text-[10px] font-black uppercase mb-6 tracking-widest italic">
                <LayoutPanelLeft size={14} /> Layer Normalization (RMS)
              </div>
              <div className="space-y-3">
                {['Sublayer-1', 'Attention', 'FeedForward', 'Residual'].map((layer, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800/50 shadow-inner">
                    <span className="text-[11px] text-slate-500 font-bold uppercase italic">{layer}</span>
                    <span className="text-[10px] font-black text-emerald-500 italic">{(0.992 - i*0.012).toFixed(4)} μ</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* SAĞ PANEL */}
        <aside className="col-span-12 md:col-span-3 border-l border-slate-800 p-8 flex flex-col gap-8 bg-slate-900/10">
          <div className="space-y-6">
            <h2 className="text-slate-400 font-black flex items-center gap-3 uppercase text-[10px] tracking-widest italic">
              <Database size={14} /> Contextual Encoding
            </h2>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] space-y-6 shadow-2xl">
              <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest">
                <span>Input Embedding</span>
                <span>Context Vector</span>
              </div>
              <div className="relative h-2 bg-slate-950 rounded-full overflow-hidden shadow-inner border border-slate-800">
                <div className="absolute left-0 top-0 h-full bg-indigo-500 w-[88%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000" />
              </div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-black text-indigo-400 italic">0.912</span>
                <span className="text-[10px] text-slate-600 font-bold mb-1 italic tracking-widest">Cosine: Stable</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-amber-500 font-black flex items-center gap-3 uppercase text-[10px] tracking-widest italic">
              <TrendingDown size={14} /> Attention Sparsity
            </h2>
            <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-[2rem] shadow-inner">
              <div className="text-[10px] text-slate-500 leading-relaxed italic uppercase font-bold opacity-70">
                Model, dikkat başlıkları arasında ortogonalizasyon sağlayarak aşırı korelasyonu engellemektedir.
                <span className="block mt-4 text-amber-500 font-black uppercase tracking-widest">Hata Payı: ±0.0004%</span>
              </div>
            </div>
          </div>

          <div className="mt-auto bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
             <div className="flex items-center gap-3 mb-4">
               <ShieldCheck size={16} className="text-emerald-500 shadow-emerald-500/20 shadow-lg" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Core Diagnostics</span>
             </div>
             <div className="text-[9px] text-slate-600 space-y-2 font-bold uppercase tracking-tight">
               <div>• Engine: Parallel-Tensor-TPU</div>
               <div>• Architecture: Self-Attention-v4</div>
               <div>• Precision: BFloat16/FP32</div>
               <div className="text-slate-800 pt-2 border-t border-slate-800">ORIGIN: KAPLAN_PRECISION_DEPT</div>
             </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
