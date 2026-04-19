/**
 * @project SOVEREIGN CORE LIBRARY | @uid SKL-0017
 * @architect [Ömer Kaplan] | @origin Kaplan Halı Yıkama - Precision Dept.
 * @engine Gemini Pro Hybrid-AI | @collaboration Human-AI Augmented
 * @license MIT (Attribution Required) | @status Production-Ready
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Network, 
  BrainCircuit, 
  Activity, 
  Database,
  ShieldAlert,
  GitMerge,
  ArrowDownToLine,
  Cpu,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as SKL_ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

SKL_ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

/**
 * @architecture & INTEL
 * @dependencies: react, chart.js, react-chartjs-2, lucide-react, tailwindcss
 * @credits: Kaplan Precision Dept. - Sürekli Öğrenme ve Katastrofik Unutma Engelleme Birimi.
 * @ai-context: SKL-0017, yapay sinir ağlarında yeni bilgi öğrenilirken eski verilerin korunmasını sağlayan EWC ve GEM algoritmalarını simüle eden kontrol modülüdür.
 * @ai-bridge: SKL_SKL_0016 -> SKL_SKL_0017 -> SKL_SKL_0018
 * @ai-roadmap: 100k+ dosya entegrasyonu için dinamik kapasite genişletme ve otonom ağırlık dondurma protokolleri.
 */

// --- 1. SKL_ContinualLogicEngine ---
const SKL_ContinualLogicEngine = {
  // Elastic Weight Consolidation (EWC) Penalty Calculation
  SKL_CalculateEWCPenalty: (lambda, currentWeights, oldWeights, fisherDiagonal) => {
    let penalty = 0;
    for (let i = 0; i < currentWeights.length; i++) {
      const delta = currentWeights[i] - oldWeights[i];
      penalty += (lambda / 2.0) * fisherDiagonal[i] * (delta * delta);
    }
    return penalty;
  },

  // Gradient Episodic Memory (GEM) Projection
  SKL_ProjectGradientGEM: (currentGrad, pastGrads) => {
    let dotProduct = currentGrad.reduce((acc, val, i) => acc + val * pastGrads[i], 0);
    if (dotProduct < 0) {
      const pastNormSq = pastGrads.reduce((acc, val) => acc + val * val, 0);
      const scalar = dotProduct / (pastNormSq || 1e-8);
      return currentGrad.map((val, i) => val - scalar * pastGrads[i]);
    }
    return currentGrad;
  },

  SKL_GenerateAuditReport: (stabilityRatio, plasticityRatio, forgettingMeasure) => {
    const isStable = forgettingMeasure < 5.0 && stabilityRatio > 0.6;
    return {
      timestamp: new Date().toISOString(),
      systemState: isStable ? "CATASTROPHIC_FORGETTING_PREVENTED" : "INTERFERENCE_DETECTED",
      retentionScore: (stabilityRatio * 100).toFixed(2),
      adaptationScore: (plasticityRatio * 100).toFixed(2),
      recommendation: isStable ? "PROCEED_NEXT_TASK" : "INCREASE_EWC_LAMBDA"
    };
  }
};

// --- 2. SKL_MemoryRetentionVisualizer ---
const SKL_MemoryRetentionVisualizer = ({ ewcLambda, plasticityFocus }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;

    const nodes = Array.from({ length: 80 }, (_, i) => {
      const isTask1 = i < 30;
      const isTask2 = i >= 30 && i < 55;
      return {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        z: (Math.random() - 0.5) * 200,
        baseX: 0, baseY: 0, baseZ: 0,
        type: isTask1 ? 1 : (isTask2 ? 2 : 3),
        fisherInfo: isTask1 ? 0.9 : (isTask2 ? 0.4 : 0.05),
        phase: Math.random() * Math.PI * 2
      };
    });

    nodes.forEach(n => { n.baseX = n.x; n.baseY = n.y; n.baseZ = n.z; });

    const draw = () => {
      time += 0.02;
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const cosT = Math.cos(time * 0.2);
      const sinT = Math.sin(time * 0.2);

      const projectedNodes = nodes.map(node => {
        const ewcConstraint = 1.0 - Math.min(1.0, (ewcLambda / 10000) * node.fisherInfo);
        const movementAmplitude = node.type === 3 ? (plasticityFocus * 0.5) : (10 * ewcConstraint);
        
        const currentX = node.baseX + Math.sin(time * 2 + node.phase) * movementAmplitude;
        const currentY = node.baseY + Math.cos(time * 1.5 + node.phase) * movementAmplitude;
        const currentZ = node.baseZ + Math.sin(time * 1.8 + node.phase) * movementAmplitude;

        const rotX = currentX * cosT - currentZ * sinT;
        const rotZ = currentZ * cosT + currentX * sinT;

        const scale = 300 / (300 + rotZ);
        const px = centerX + rotX * scale;
        const py = centerY + currentY * scale;

        return { ...node, px, py, scale, zDepth: rotZ };
      });

      projectedNodes.sort((a, b) => b.zDepth - a.zDepth);

      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];
          const dist = Math.hypot(n1.px - n2.px, n1.py - n2.py);
          if (dist < 45 * n1.scale) {
            if (Math.abs(n1.type - n2.type) <= 1) {
              const alpha = (1 - dist / (45 * n1.scale)) * 0.3;
              ctx.strokeStyle = n1.type === 1 && n2.type === 1 
                ? `rgba(56, 189, 248, ${alpha})` 
                : (n1.type === 3 || n2.type === 3 ? `rgba(168, 85, 247, ${alpha})` : `rgba(148, 163, 184, ${alpha})`);
              ctx.beginPath();
              ctx.moveTo(n1.px, n1.py);
              ctx.lineTo(n2.px, n2.py);
              ctx.stroke();
            }
          }
        }
      }

      projectedNodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.px, node.py, (node.type === 1 ? 2.5 : 2) * node.scale, 0, Math.PI * 2);
        ctx.fillStyle = node.type === 1 ? '#38bdf8' : (node.type === 2 ? '#94a3b8' : '#a855f7');
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [ewcLambda, plasticityFocus]);

  return <canvas ref={canvasRef} width={600} height={350} className="w-full h-full object-contain" />;
};

// --- MAIN COMPONENT ---
export default function App() {
  const [ewcLambda, setEwcLambda] = useState(5000);
  const [replayBuffer, setReplayBuffer] = useState(512);
  
  const chartData = {
    labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
    datasets: [
      {
        label: 'Task 1 Accuracy (%)',
        data: [
          98.5, 
          98.5 - (10000 - ewcLambda)*0.001, 
          98.5 - (10000 - ewcLambda)*0.0025, 
          98.5 - (10000 - ewcLambda)*0.004
        ],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.3
      },
      {
        label: 'Current Task Accuracy (%)',
        data: [98.5, 96.2, 94.8, 93.5 + (ewcLambda > 8000 ? -2 : 2)],
        borderColor: '#a855f7',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.3
      }
    ]
  };

  const forgettingMeasure = 98.5 - chartData.datasets[0].data[3];
  const isForgettingCritical = forgettingMeasure > 5.0;

  const SKL_Result = {
    SKL_ID: "SKL-0017",
    SKL_Lambda: ewcLambda,
    SKL_Stability: (ewcLambda / 10000).toFixed(2),
    SKL_Status: isForgettingCritical ? "INTERFERENCE" : "STABLE"
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-300 font-mono text-xs p-6 selection:bg-purple-500/30">
      {/* HEADER */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-purple-900/40 pb-4 mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3 tracking-tighter uppercase">
            <BrainCircuit className="text-purple-500" size={28} />
            SKL-0017 <span className="text-purple-500">CONTINUAL</span>
          </h1>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[10px] flex items-center gap-2 font-black">
            Catastrophic Forgetting Prevention Kernel
            <span className={`inline-flex rounded-full h-2 w-2 ${isForgettingCritical ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`}></span>
          </p>
        </div>
        <div className="flex gap-6">
          <SKL_MetricBadge label="Tasks Learned" value="4" unit="k" color="text-fuchsia-400" />
          <SKL_MetricBadge label="Forgetting Measure" value={forgettingMeasure.toFixed(2)} unit="%" color={isForgettingCritical ? "text-red-400" : "text-cyan-400"} />
          <SKL_MetricBadge label="Protected Params" value="68.4" unit="%" color="text-indigo-400" />
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[520px]">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <SKL_Panel title="Regularization (EWC)" icon={ShieldAlert}>
            <div className="flex-1 flex flex-col justify-center gap-5">
              <div>
                <div className="flex justify-between text-[10px] uppercase text-slate-400 mb-2 font-black">
                  <span>Fisher Penalty (λ)</span>
                  <span className="text-cyan-400">{ewcLambda}</span>
                </div>
                <input 
                  type="range" min="0" max="10000" step="100"
                  value={ewcLambda}
                  onChange={(e) => setEwcLambda(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
              <div className="space-y-2 text-[10px] pt-4 border-t border-white/5">
                 <SKL_DataRow label="Fisher Matrix Update" value="Diagonal Approx." />
                 <SKL_DataRow label="L2 Norm Shift (Δθ)" value={(0.12 - (ewcLambda/100000)).toFixed(4)} highlight />
              </div>
            </div>
          </SKL_Panel>

          <SKL_Panel title="Episodic Memory (GEM)" icon={Database}>
            <div className="flex-1 flex flex-col justify-center gap-5">
              <div>
                <div className="flex justify-between text-[10px] uppercase text-slate-400 mb-2 font-black">
                  <span>Replay Buffer Size</span>
                  <span className="text-purple-400">{replayBuffer} MB</span>
                </div>
                <input 
                  type="range" min="64" max="2048" step="64"
                  value={replayBuffer}
                  onChange={(e) => setReplayBuffer(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
              <div className="space-y-2 text-[10px]">
                 <SKL_DataRow label="Gradient Projection" value="Orthogonal" />
                 <SKL_DataRow label="Negative Transfer" value="BLOCKED" highlight />
              </div>
            </div>
          </SKL_Panel>
        </div>

        {/* CENTER COLUMN */}
        <div className="lg:col-span-6 flex flex-col bg-[#08080c] border border-purple-900/30 rounded-xl overflow-hidden relative">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
            <div className="flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded border border-purple-900/50 backdrop-blur-md">
              <Network size={14} className="text-purple-400" />
              <span className="uppercase text-[10px] text-slate-300 tracking-widest font-black">Weight Space Topology</span>
            </div>
          </div>
          <SKL_MemoryRetentionVisualizer ewcLambda={ewcLambda} plasticityFocus={60} />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
             <div className="bg-black/60 backdrop-blur px-3 py-2 rounded border border-white/5 text-[9px] text-slate-400">
               <p>Stability / Plasticity Ratio: {(ewcLambda/10000).toFixed(2)} / {(1 - ewcLambda/10000).toFixed(2)}</p>
               <p>Regime: {ewcLambda > 7000 ? 'High Stability (Rigid)' : ewcLambda < 3000 ? 'High Plasticity' : 'Balanced Optimal'}</p>
             </div>
             {isForgettingCritical && (
                <div className="flex items-center gap-2 bg-red-900/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded text-[10px] font-black animate-pulse">
                  <ShieldAlert size={12} /> CATASTROPHIC FORGETTING
                </div>
             )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <SKL_Panel title="Transfer Analysis" icon={GitMerge}>
             <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-2 text-[9px] mb-4">
                   <div className="bg-slate-900/50 p-2 rounded text-center border border-slate-800">
                     <p className="text-slate-500 mb-1">Transfer Gain</p>
                     <p className="text-emerald-400 font-black">+0.42%</p>
                   </div>
                   <div className="bg-slate-900/50 p-2 rounded text-center border border-slate-800">
                     <p className="text-slate-500 mb-1">Interference</p>
                     <p className="text-cyan-400 font-black">Minimal</p>
                   </div>
                </div>
                <div className="space-y-2 mt-auto text-[10px]">
                   <SKL_DataRow label="Generative Replay" value="Active (GAN)" />
                   <SKL_DataRow label="Synthetic Samples" value={`${Math.floor(replayBuffer * 12.4)}/batch`} />
                </div>
             </div>
          </SKL_Panel>

          <SKL_Panel title="Architecture Scaler" icon={ArrowDownToLine}>
             <div className="flex flex-col gap-3 h-full justify-center">
                <div className="p-3 border bg-slate-900/30 border-purple-900/30 rounded text-center">
                   <span className="text-[9px] uppercase block mb-1 text-slate-400 font-black tracking-tighter">Capacity Expansion</span>
                   <span className="text-xs font-bold text-white">Katman Dondurma (Freezing)</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-relaxed text-justify italic">
                  Kapasite sınırı aşıldığında, eski görevlerin ağırlıkları dondurulur ve alt ağ genişlemesi tetiklenir.
                </p>
             </div>
          </SKL_Panel>
        </div>
      </div>

      {/* FOOTER ANALYTICS */}
      <div className="mt-6 bg-[#08080c] border border-purple-900/30 rounded-xl p-4 h-[220px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] uppercase tracking-widest text-slate-400 flex items-center gap-2 font-black">
            <Activity size={14} /> Stability-Plasticity Accuracy Matrix
          </h3>
          <span className="text-[9px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded font-bold">TASK_PROGRESSION // SLC_0017</span>
        </div>
        <div className="h-[140px]">
          <Line data={chartData} options={SKL_ChartOptions} />
        </div>
      </div>

      <footer className="mt-4 pt-4 border-t border-slate-800 text-slate-600 flex justify-between items-center text-[9px] uppercase tracking-widest font-black">
        <span>Sistem Durumu: Operasyonel // SKL-0017</span>
        <code>{JSON.stringify(SKL_Result)}</code>
      </footer>
    </div>
  );
}

// HELPERS
const SKL_Panel = ({ title, icon: Icon, children }) => (
  <div className="bg-slate-900/20 border border-purple-900/30 rounded-xl p-4 flex-1 flex flex-col">
    <div className="flex items-center gap-2 border-b border-purple-900/30 pb-2 mb-4">
      <Icon size={14} className="text-purple-600" />
      <h2 className="text-[10px] uppercase tracking-widest text-slate-300 font-black">{title}</h2>
    </div>
    <div className="flex-1 flex flex-col">{children}</div>
  </div>
);

const SKL_MetricBadge = ({ label, value, unit, color }) => (
  <div className="text-right">
    <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-black">{label}</p>
    <div className="flex items-baseline justify-end gap-1">
      <span className={`text-xl font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-slate-600 font-mono">{unit}</span>
    </div>
  </div>
);

const SKL_DataRow = ({ label, value, highlight }) => (
  <div className="flex justify-between border-b border-white/5 pb-1 mb-1">
    <span className="text-slate-500 font-bold tracking-tighter uppercase">{label}</span>
    <span className={`font-mono ${highlight ? 'text-purple-400 font-black' : 'text-slate-300'}`}>{value}</span>
  </div>
);

const SKL_ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { color: 'rgba(147, 51, 234, 0.05)' }, ticks: { color: '#64748b', font: { size: 9 } } },
    y: { grid: { color: 'rgba(147, 51, 234, 0.05)' }, ticks: { color: '#64748b', font: { size: 9 } }, min: 80, max: 100 }
  },
  plugins: { legend: { labels: { color: '#94a3b8', font: { size: 9 }, boxWidth: 10 } } }
};

/**
 * @ai_delta: SKL-0017 olarak güncellendi. "Continual-Logic AI" mimarisi entegre edildi. EWC ve GEM tabanlı katastrofik unutma engelleme dashboardu oluşturuldu.
 * @ai-tags: #ContinualLearning #CatastrophicForgetting #SKL0017 #KaplanLogic #EWC
 */
