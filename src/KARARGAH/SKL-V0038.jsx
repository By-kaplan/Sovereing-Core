/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / RNN-LOGIC
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v4.5.0-RNN (Temporal Verified)
 * @credits   : React, Chart.js, Lucide Icons, Tailwind CSS.
 * @license   : MIT | Mühendislik mühürü korunmak şartıyla serbest kullanım.
 * @note      : Özyinelemeli durum güncellemeleri ve zamansal açılım simülatörü.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  RefreshCw, Activity, Zap, Layers, Terminal, 
  Database, ChevronRight, AlertTriangle, Cpu, 
  BarChart3, Binary, Clock
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
  BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Tooltip, Legend, Filler
);

/**
 * --- RNNMetricSchema.js ---
 * RNN Teknik Parametre Veri Şeması
 */
const RNNMetricSchema = {
  sequence_length: 50,      // T
  hidden_size: 128,         // h
  learning_rate: 0.001,
  gradient_norm: 0.45,
  error_per_sequence: 0.12,
  latency_ms: 8.5
};

/**
 * --- rnnLogicEngine.js ---
 * Özyinelemeli durum güncellemeleri ve gradyan dinamikleri hesaplama motoru.
 */
const rnnLogicEngine = {
  // h_t = sigma(Whh * h_t-1 + Wxh * x_t + b_h)
  calculateState: (prevH, input, whh, wxh) => {
    const activation = (whh * prevH) + (wxh * input);
    return Math.tanh(activation); 
  },

  // Gradyan sönümlenme simülasyonu
  simulateGradientDecay: (T, whh) => {
    const decay = [];
    let currentGradient = 1.0;
    for (let t = 0; t < T; t++) {
      decay.push(currentGradient);
      currentGradient *= (whh * 0.9); 
    }
    return decay;
  },

  generateSequenceIntegrity: (T, gradientNorm) => {
    return {
      integrity_score: Math.max(0, 1 - (T * 0.015) / gradientNorm),
      vanishing_threshold: T > 30 ? "KRITIK" : "STABIL"
    };
  }
};

/**
 * --- TemporalUnrollingVisualizer.jsx ---
 * RNN biriminin zaman eksenindeki (t) açılımını simüle eden vizüalizör.
 */
const TemporalUnrollingVisualizer = ({ sequenceLength, gradientNorm }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let offset = 0;

    const render = () => {
      if (!containerRef.current) return;
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);
      offset += 0.02;

      const centerX = w / 2;
      const centerY = h / 2;
      const spacing = 80;
      const visibleSteps = 6;

      for (let i = -2; i < visibleSteps; i++) {
        const x = (i * spacing) - ((offset * 40) % spacing) + 100;
        
        const scale = 1 - (Math.abs(x - centerX) / (w * 0.8));
        const alpha = Math.max(0, scale);
        
        ctx.globalAlpha = alpha;

        // Gizli Durum (Hidden State) Hücresi
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x - 20, centerY - 20, 40, 40, 8);
        } else {
          ctx.rect(x - 20, centerY - 20, 40, 40);
        }
        ctx.fillStyle = '#6366f1';
        ctx.fill();
        ctx.strokeStyle = '#818cf8';
        ctx.stroke();

        // Girdi (x_t) oku
        ctx.beginPath();
        ctx.moveTo(x, centerY + 60);
        ctx.lineTo(x, centerY + 25);
        ctx.strokeStyle = '#94a3b8';
        ctx.setLineDash([5, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Çıktı (y_t) oku
        ctx.beginPath();
        ctx.moveTo(x, centerY - 25);
        ctx.lineTo(x, centerY - 60);
        ctx.strokeStyle = '#10b981';
        ctx.stroke();

        // Zamansal Bağlantı (h_t-1 -> h_t)
        if (i < visibleSteps - 1) {
          const nextX = x + spacing;
          ctx.beginPath();
          ctx.moveTo(x + 25, centerY);
          ctx.lineTo(nextX - 25, centerY);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * gradientNorm})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          
          const pPos = (offset % 1);
          ctx.beginPath();
          ctx.arc(x + 25 + (nextX - x - 50) * pPos, centerY, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '10px monospace';
        ctx.fillText('h_t', x - 10, centerY + 5);
        ctx.fillStyle = '#64748b';
        ctx.fillText('x_t', x - 10, centerY + 75);
      }

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, [sequenceLength, gradientNorm]);

  return (
    <div ref={containerRef} className="relative w-full h-[350px] bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-6 left-8 flex flex-col gap-1">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] italic">Temporal Unrolling Simülasyonu</span>
        <span className="text-[9px] text-slate-500 uppercase font-bold">Döngüsel Bağımlılık Zinciri ($t \to t+1$)</span>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

function StatItem({ label, value, icon, color = "text-white" }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-slate-600 bg-slate-800/50 p-2 rounded-lg">{icon}</span>
      <div>
        <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">{label}</p>
        <p className={`text-[12px] font-black italic ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function ArchitectureBox({ label, count, color }) {
  return (
    <div className={`border ${color} p-3 rounded-xl bg-slate-950 flex flex-col items-center min-w-[80px] shadow-lg`}>
      <span className="text-[7px] uppercase font-black text-slate-500 tracking-widest mb-1">{label}</span>
      <span className="text-[11px] font-black text-slate-300 italic">{count}</span>
    </div>
  );
}

function FooterStat({ icon, label, value, desc }) {
  return (
    <div className="flex items-start gap-4 p-2">
      <div className="mt-1 p-2 bg-slate-900 rounded-lg">{icon}</div>
      <div>
        <div className="flex items-center gap-3">
          <p className="text-slate-200 font-black uppercase text-[10px] tracking-widest">{label}</p>
          <p className="text-indigo-400 font-black text-[10px] tracking-[0.2em] italic">{value}</p>
        </div>
        <p className="text-slate-500 text-[9px] mt-1 font-bold italic opacity-70 uppercase tracking-tight">{desc}</p>
      </div>
    </div>
  );
}

// --- MAIN APP ---

export default function App() {
  const [metrics, setMetrics] = useState(RNNMetricSchema);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNorm = 0.3 + Math.random() * 0.4;
      setMetrics(prev => ({
        ...prev,
        gradient_norm: newNorm,
        error_per_sequence: Math.random() * 0.2
      }));
      
      setLogs(l => [`[t] BPTT Gradient: ${newNorm.toFixed(4)}`, ...l.slice(0, 5)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const gradientData = useMemo(() => ({
    labels: Array.from({ length: 20 }, (_, i) => `t-${20 - i}`),
    datasets: [{
      label: 'Gradyan Sönümlenme Katsayısı',
      data: rnnLogicEngine.simulateGradientDecay(20, 0.95),
      borderColor: '#f43f5e',
      backgroundColor: 'rgba(244, 63, 94, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 0
    }]
  }), []);

  return (
    <div className="min-h-screen bg-[#030509] text-slate-400 font-mono text-[12px] p-4 md:p-8 selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* DASHBOARD HEADER */}
        <header className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 backdrop-blur-2xl shadow-2xl">
          <div className="col-span-1 flex items-center gap-5 border-r border-slate-800/50 pr-6">
            <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/20 text-white">
              <RefreshCw size={28} className="animate-[spin_10s_linear_infinite]" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">RNN-LOGIC AI</h1>
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2">v4.5.0 STABLE</p>
            </div>
          </div>
          
          <div className="col-span-3 flex flex-wrap gap-10 items-center px-6">
            <StatItem label="Sekans (T)" value={String(metrics.sequence_length)} icon={<Clock size={14}/>} />
            <StatItem label="Gizli Birim (h)" value={String(metrics.hidden_size)} icon={<Layers size={14}/>} />
            <StatItem label="Gradyan Norm" value={metrics.gradient_norm.toFixed(3)} color="text-rose-400" icon={<Activity size={14}/>} />
            <StatItem label="Gecikme" value={`${metrics.latency_ms}ms`} icon={<Zap size={14}/>} />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          
          {/* ANALİZ PANELİ */}
          <section className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
              <h3 className="flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px] mb-8 tracking-[0.2em] italic">
                <Binary size={16} /> Durum Güncelleme Denklemi
              </h3>
              <div className="p-6 bg-black/40 rounded-3xl border border-slate-800 font-serif italic text-center text-slate-200 text-lg shadow-inner">
                {"$h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$"}
              </div>
              <div className="mt-8 space-y-5">
                <div className="flex justify-between items-center text-[10px] font-black italic uppercase tracking-widest">
                  <span className="text-slate-500">Matris Çarpım Yoğunluğu</span>
                  <span className="text-emerald-500">14.2 GFLOPs</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-indigo-500 w-[65%] shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
              <h3 className="flex items-center gap-3 text-rose-400 font-black uppercase text-[10px] mb-6 tracking-[0.2em] italic">
                <AlertTriangle size={16} /> Vanishing Gradient Monitor
              </h3>
              <div className="h-[200px] w-full">
                <Line 
                  data={gradientData}
                  options={{
                    maintainAspectRatio: false,
                    scales: { 
                      y: { display: false }, 
                      x: { 
                        grid: { display: false }, 
                        ticks: { color: '#475569', font: { size: 9, family: 'monospace' } } 
                      } 
                    },
                    plugins: { legend: { display: false } }
                  }}
                />
              </div>
              <p className="mt-6 text-[9px] text-slate-500 leading-relaxed italic font-bold uppercase tracking-tight opacity-70">
                {"* Uzun sekanslarda (T > 30) hata sinyali, $W_{hh}$ matrisinin ardışıl çarpımları nedeniyle sönümlenir."}
              </p>
            </div>
          </section>

          {/* VİZÜALİZASYON PANELİ */}
          <section className="col-span-12 lg:col-span-8 space-y-8">
            <TemporalUnrollingVisualizer 
              sequenceLength={metrics.sequence_length} 
              gradientNorm={metrics.gradient_norm} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
                <h3 className="flex items-center gap-3 text-emerald-400 font-black uppercase text-[10px] mb-8 tracking-[0.2em] italic">
                  <Cpu size={16} /> Mimari Eşleyici (Many-to-Many)
                </h3>
                <div className="flex justify-around items-center py-6">
                  <ArchitectureBox label="Input Seq" count="T" color="border-indigo-500/30" />
                  <ChevronRight size={20} className="text-slate-800" />
                  <ArchitectureBox label="Recurrent" count="h" color="border-slate-800" />
                  <ChevronRight size={20} className="text-slate-800" />
                  <ArchitectureBox label="Output Seq" count="T" color="border-emerald-500/30" />
                </div>
                <div className="mt-6 text-[10px] text-slate-500 text-center font-black uppercase tracking-widest italic">
                  BPTT derinliği: {metrics.sequence_length} adım
                </div>
              </div>

              <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
                <h3 className="flex items-center gap-3 text-slate-400 font-black uppercase text-[10px] mb-6 tracking-[0.2em] italic">
                  <Terminal size={16} /> BPTT İşlem Kayıtları
                </h3>
                <div className="bg-black/60 p-6 rounded-2xl border border-slate-800 font-mono text-[9px] h-[120px] overflow-y-auto space-y-2 scrollbar-hide shadow-inner leading-relaxed">
                  {logs.map((log, i) => (
                    <div key={i} className={i === 0 ? "text-indigo-400 font-bold" : "text-slate-600"}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER METRICS */}
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-900/20 p-8 rounded-[2rem] border border-slate-800/30 border-dashed mb-12">
          <FooterStat 
            icon={<BarChart3 size={20} className="text-indigo-500" />}
            label="Bağlam Koruma Skoru"
            value="0.742"
            desc="Kısa vadeli bağımlılık tutarlılığı."
          />
          <FooterStat 
            icon={<Activity size={20} className="text-rose-500" />}
            label="Gradyan Kararlılığı"
            value="DÜŞÜK"
            desc="Sönümlenme saptandı (T>20)."
          />
          <FooterStat 
            icon={<Database size={20} className="text-emerald-500" />}
            label="Bellek Verimliliği"
            value="%92.1"
            desc="GPU tensör kullanım oranı."
          />
        </footer>
      </div>
    </div>
  );
}
