/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / LSTM-LOGIC
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v5.0.0-LSTM (Memory Verified)
 * @credits   : React, Chart.js, Lucide Icons, Tailwind CSS.
 * @license   : MIT | Mühendislik mühürü korunmak şartıyla serbest kullanım.
 * @note      : Seçici sinyal kapılaması ve hücre belleği (Long Short-Term Memory) simülatörü.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MemoryStick, Activity, Zap, ShieldCheck, Layers, 
  Terminal, Database, TrendingUp, Cpu, Network,
  Info, ArrowRight, RefreshCw, Lock
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
 * --- LSMetricSchema.js ---
 * LSTM mimarisi teknik parametre şeması.
 */
const LSMetricSchema = {
  time_step: 0,
  forget_gate: 0.85,    // f_t
  input_gate: 0.12,     // i_t
  output_gate: 0.45,    // o_t
  cell_state_var: 0.05, // C_t varyansı
  param_count: 102400,
  latency_ms: 12
};

/**
 * --- lstmLogicEngine.js ---
 * Kapı matrislerini ve hücre durumu güncellemelerini yöneten motor.
 */
const lstmLogicEngine = {
  sigmoid: (x) => 1 / (1 + Math.exp(-x)),
  tanh: (x) => Math.tanh(x),
  
  // f_t = sigma(Wf * [h_t-1, x_t] + bf)
  calculateForgetGate: (prevH, input, weights) => {
    return lstmLogicEngine.sigmoid(weights.wf * (prevH + input) + weights.bf);
  },
  
  // C_t = f_t * C_t-1 + i_t * ~C_t
  updateCellState: (f_t, i_t, prevC, candidateC) => {
    return (f_t * prevC) + (i_t * candidateC);
  },
  
  // h_t = o_t * tanh(C_t)
  calculateHiddenState: (o_t, currentC) => {
    return o_t * lstmLogicEngine.tanh(currentC);
  }
};

/**
 * --- GateMechanismVisualizer.jsx ---
 * LSTM hücresindeki sinyal akışını 2D Canvas üzerinde 3D devre olarak simüle eder.
 */
const GateMechanismVisualizer = ({ metrics }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;

    // Devre düğümleri (3D koordinatlar)
    const nodes = [
      { id: 'input', x: -150, y: 0, z: 0, label: 'x_t', color: '#6366f1' },
      { id: 'forget', x: -50, y: 50, z: 20, label: 'f_t', color: '#f43f5e' },
      { id: 'input_gate', x: -50, y: -50, z: 20, label: 'i_t', color: '#10b981' },
      { id: 'cell_state', x: 0, y: 0, z: -50, label: 'C_t', color: '#f59e0b' },
      { id: 'output_gate', x: 80, y: 30, z: 20, label: 'o_t', color: '#3b82f6' },
      { id: 'hidden', x: 150, y: 0, z: 0, label: 'h_t', color: '#a855f7' }
    ];

    const render = () => {
      if (!containerRef.current) return;
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);
      time += 0.02;

      const focalLength = 400;
      const centerX = w / 2;
      const centerY = h / 2;

      // Rotasyon (Y ekseni)
      const cosY = Math.cos(time * 0.3);
      const sinY = Math.sin(time * 0.3);

      const projectedNodes = nodes.map(n => {
        const x = n.x * cosY - n.z * sinY;
        const z = n.x * sinY + n.z * cosY;
        const scale = focalLength / (focalLength + z + 200);
        return {
          ...n,
          px: x * scale + centerX,
          py: n.y * scale + centerY,
          pz: z,
          pscale: scale
        };
      });

      // Bağlantı hatları (Sinyal Akışı)
      ctx.lineWidth = 2;
      const drawLink = (fromId, toId, intensity, color) => {
        const n1 = projectedNodes.find(n => n.id === fromId);
        const n2 = projectedNodes.find(n => n.id === toId);
        if (!n1 || !n2) return;
        
        ctx.beginPath();
        ctx.moveTo(n1.px, n1.py);
        ctx.lineTo(n2.px, n2.py);
        ctx.strokeStyle = color;
        ctx.globalAlpha = intensity * 0.6;
        ctx.stroke();
        
        // Akış partikülleri
        const pCount = 3;
        for (let i = 0; i < pCount; i++) {
          const t = (time + i / pCount) % 1;
          const px = n1.px + (n2.px - n1.px) * t;
          const py = n1.py + (n2.py - n1.py) * t;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      };

      drawLink('input', 'forget', metrics.forget_gate, '#f43f5e');
      drawLink('input', 'input_gate', metrics.input_gate, '#10b981');
      drawLink('forget', 'cell_state', metrics.forget_gate, '#f59e0b');
      drawLink('input_gate', 'cell_state', metrics.input_gate, '#f59e0b');
      drawLink('cell_state', 'output_gate', 1.0, '#3b82f6');
      drawLink('output_gate', 'hidden', metrics.output_gate, '#a855f7');

      // Düğümleri çiz
      projectedNodes.forEach(n => {
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(n.px, n.py, 6 * n.pscale, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
        
        ctx.fillStyle = '#94a3b8';
        ctx.font = `${Math.floor(10 * n.pscale)}px monospace`;
        ctx.fillText(n.label, n.px + 10, n.py - 10);
      });

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, [metrics]);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      <div className="absolute top-6 left-8 flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-2xl backdrop-blur-xl">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">Hücre Durumu Sinyal Modülasyonu</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [history, setHistory] = useState([]);
  const [currentMetrics, setCurrentMetrics] = useState({ ...LSMetricSchema });

  // Simülasyon döngüsü
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetrics(prev => {
        const nextStep = prev.time_step + 1;
        const f_t = 0.5 + Math.sin(nextStep * 0.1) * 0.4; // Forget gate dalgalanması
        const i_t = 0.3 + Math.cos(nextStep * 0.2) * 0.2; // Input gate dalgalanması
        const o_t = 0.6 + Math.sin(nextStep * 0.05) * 0.3; // Output gate
        
        const newMetrics = {
          ...prev,
          time_step: nextStep,
          forget_gate: Math.max(0, Math.min(1, f_t)),
          input_gate: Math.max(0, Math.min(1, i_t)),
          output_gate: Math.max(0, Math.min(1, o_t)),
          cell_state_var: Math.random() * 0.1
        };

        setHistory(h => [...h.slice(-29), newMetrics]);
        return newMetrics;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: history.map(h => h.time_step),
    datasets: [
      {
        label: 'Unutma Kapısı (f_t)',
        data: history.map(h => h.forget_gate),
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0
      },
      {
        label: 'Giriş Kapısı (i_t)',
        data: history.map(h => h.input_gate),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-400 font-mono text-[12px] p-4 md:p-8 selection:bg-amber-500/30">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-6 border-r border-slate-800/50 pr-8">
            <div className="p-4 bg-amber-600 rounded-2xl shadow-xl shadow-amber-500/20 text-white">
              <MemoryStick size={28} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">LSTM-LOGIC ENGINE</h1>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2">v1.0 PRECISION MEMORY</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 items-center px-6">
            <MetricCard label="T-Step" value={String(currentMetrics.time_step)} icon={<Activity size={14}/>} />
            <MetricCard label="f_t (Forget)" value={currentMetrics.forget_gate.toFixed(3)} color="text-rose-400" />
            <MetricCard label="i_t (Input)" value={currentMetrics.input_gate.toFixed(3)} color="text-emerald-400" />
            <MetricCard label="Gecikme" value="12ms" icon={<Zap size={14}/>} />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          
          {/* CONTROL PANEL */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
              <h3 className="flex items-center gap-3 text-amber-500 font-black uppercase text-[10px] mb-8 tracking-[0.2em] italic">
                <Lock size={16} /> Kapı Aktivasyon Yoğunluğu
              </h3>
              <div className="space-y-8">
                <GateProgress label="Forget Gate (f_t)" value={currentMetrics.forget_gate} color="bg-rose-500" />
                <GateProgress label="Input Gate (i_t)" value={currentMetrics.input_gate} color="bg-emerald-500" />
                <GateProgress label="Output Gate (o_t)" value={currentMetrics.output_gate} color="bg-blue-500" />
              </div>
              <div className="mt-10 p-6 bg-black/40 rounded-3xl border border-slate-800 shadow-inner">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Gradyan Akış Kararlılığı</span>
                  <span className="text-emerald-500 font-black italic">Stabil</span>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className={`h-4 rounded-md shadow-sm ${Math.random() > 0.2 ? 'bg-emerald-500/40' : 'bg-rose-500/40'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
              <h3 className="flex items-center gap-3 text-slate-400 font-black uppercase text-[10px] mb-6 tracking-[0.2em] italic">
                <Terminal size={16} /> Gate Logic Logs
              </h3>
              <div className="bg-black/60 p-6 rounded-2xl border border-slate-800 font-mono text-[9px] h-[150px] overflow-y-auto space-y-3 scrollbar-hide shadow-inner leading-relaxed">
                <div className="text-slate-500 italic">-- Initializing Cell State C_0 --</div>
                <div className="text-rose-400 font-bold">[t={currentMetrics.time_step}] Forget gate suppressed signal at 1-f_t.</div>
                <div className="text-emerald-400 font-bold">[t={currentMetrics.time_step}] Input gate writing candidate state.</div>
                <div className="text-blue-400 font-bold">[t={currentMetrics.time_step}] Output gate modulating h_t via Tanh.</div>
                <div className="text-slate-400 font-bold italic">[STAT] Gradient preservation: 99.8%.</div>
              </div>
            </div>
          </aside>

          {/* SIMULATION AREA */}
          <main className="col-span-12 lg:col-span-8 space-y-8">
            <GateMechanismVisualizer metrics={currentMetrics} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
                <h3 className="flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px] mb-8 tracking-[0.2em] italic">
                  <TrendingUp size={16} /> Kapı Dinamikleri (Zaman Serisi)
                </h3>
                <div className="h-[220px] w-full">
                  <Line 
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: { 
                          display: true, 
                          grid: { color: '#1e293b', borderDash: [2, 2] }, 
                          ticks: { color: '#64748b', font: { size: 9, family: 'monospace' } } 
                        },
                        x: { display: false }
                      },
                      plugins: { legend: { display: false } }
                    }}
                  />
                </div>
              </div>

              <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
                <h3 className="flex items-center gap-3 text-slate-400 font-black uppercase text-[10px] mb-6 tracking-[0.2em] italic">
                  <Database size={16} /> Hücre Belleği Parametreleri
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <DataCard label="Param Count" value="102.4k" />
                  <DataCard label="Sequence L." value="256" />
                  <DataCard label="Cell Var" value={(currentMetrics.cell_state_var * 100).toFixed(1) + "%"} />
                  <DataCard label="Memory Load" value="14.2 MB" />
                </div>
                <div className="mt-8 p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-[1.5rem] shadow-inner">
                  <div className="flex items-center gap-3 mb-3 text-indigo-400">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Hücre Durumu Koruması</span>
                  </div>
                  <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic opacity-75 uppercase tracking-tight">
                    Hücre hattı (Cell State) üzerindeki doğrusal işlemler sayesinde, gradyanlar zaman adımları boyunca sönümlenmeden akışını sürdürür.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon, color = "text-white" }) {
  return (
    <div className="bg-slate-950 border border-slate-800 px-5 py-2.5 rounded-2xl flex items-center gap-4 shadow-lg">
      {icon && <div className="text-slate-500">{icon}</div>}
      <div>
        <div className="text-[8px] text-slate-600 uppercase font-black tracking-widest leading-none mb-1">{label}</div>
        <div className={`text-[12px] font-black italic ${color}`}>{value}</div>
      </div>
    </div>
  );
}

function GateProgress({ label, value, color }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-[10px] font-black italic tracking-widest">
        <span className="text-slate-500 uppercase">{label}</span>
        <span className="text-white">{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-in-out shadow-[0_0_12px_rgba(0,0,0,0.5)]`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
}

function DataCard({ label, value }) {
  return (
    <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl shadow-sm hover:border-slate-700 transition-colors">
      <div className="text-[8px] text-slate-600 uppercase font-black tracking-widest mb-2">{label}</div>
      <div className="text-[12px] text-slate-300 font-black italic tracking-tighter">{value}</div>
    </div>
  );
}
