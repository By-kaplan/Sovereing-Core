/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / UNIVERSAL-DISCOVERY
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v2.5.0-STABLE (Isomorphic Verified)
 * @credits   : React, Chart.js, Lucide Icons, Tailwind CSS.
 * @license   : MIT | Kimlik mührü korunmak şartıyla serbest kullanım.
 * @note      : Scale-Invariant Intelligence & Isomorphism Monitor.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Network, 
  Activity, 
  GitMerge, 
  Database, 
  Cpu, 
  Terminal, 
  Layers,
  AlertOctagon,
  Torus
} from 'lucide-react';
import { Radar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
} from 'chart.js';

ChartJS.register(
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

// --- 1. Universal Metric Schema ---
const UniversalMetricSchema = {
  connectionCoefficient_rho: { current: 0.9412, unit: "ρ" },
  dataDiversity: { current: 4.85, unit: "bits/node" },
  isomorphismScore: { current: 0.887, unit: "Ic" },
  computationalComplexity: { current: "O(V^3 log E)", unit: "Time" },
  predictedNewLinks: { current: 142, unit: "edges" },
  systemStabilityIndex: { current: 0.992, unit: "SI" },
  ontologicalDistance: { current: 1.2e-3, unit: "d" }
};

// --- 2. Universal Logic Engine ---
const universalLogicEngine = {
  calculateCosineSimilarity: (vecA, vecB) => {
    let dotProduct = 0, normA = 0, normB = 0;
    for(let i=0; i<vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  },
  
  computeTopologicalEquivalence: (graphDegreeDistA, graphDegreeDistB) => {
    const wassersteinDistance = Math.abs(
      graphDegreeDistA.reduce((a,b)=>a+b,0) - graphDegreeDistB.reduce((a,b)=>a+b,0)
    ) / 100;
    return Math.max(0, 1 - wassersteinDistance);
  }
};

export default function App() {
  const canvasRef = useRef(null);
  const [alignmentPhase, setAlignmentPhase] = useState(0); 
  const [logs, setLogs] = useState([]);

  // Log Simulator & Alignment Progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const timestamp = new Date().toISOString().split('T')[1].slice(0,-1);
        const newLog = `[${timestamp}] GIN: Eigenvalue mapping updated. Det(A-λI) Δ=${(Math.random()*0.01).toFixed(4)}`;
        return [newLog, ...prev].slice(0, 8);
      });
      setAlignmentPhase(prev => {
        if (prev >= 1) return 0.1; // Reset loop for continuous demo
        return prev + 0.02;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- 3. 2D Canvas Manifold Aligner ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    let frameId;
    let time = 0;

    const nodeCount = 120;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      astroOffset: { x: (Math.random() - 0.5) * 800, y: (Math.random() - 0.5) * 600 },
      bioOffset: { x: (Math.random() - 0.5) * 300, y: (Math.random() - 0.5) * 300 },
      targetPhase: i * 0.1,
      targetRadius: 100 + (Math.random() - 0.5) * 40
    }));

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const draw = () => {
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }

      ctx.fillStyle = '#030305';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.02;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let x = 0; x < canvas.width; x += 50) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
      for(let y = 0; y < canvas.height; y += 50) { ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
      ctx.stroke();

      const phase = alignmentPhase;
      const smoothPhase = phase < 0.5 ? 2 * phase * phase : 1 - Math.pow(-2 * phase + 2, 2) / 2; 

      // Calculate positions
      const currentNodes = nodes.map((node) => {
        const targetX = cx + Math.sin(node.targetPhase + time * 0.5) * node.targetRadius * 1.5;
        const targetY = cy + Math.cos(node.targetPhase * 0.8 + time * 0.3) * node.targetRadius * 1.2;

        const astroX = cx + node.astroOffset.x + Math.sin(time + node.id) * 20;
        const astroY = cy + node.astroOffset.y + Math.cos(time + node.id) * 20;

        const bioX = cx + node.bioOffset.x + Math.cos(time - node.id) * 10;
        const bioY = cy + node.bioOffset.y + Math.sin(time - node.id) * 10;

        return {
          astro: { x: lerp(astroX, targetX, smoothPhase), y: lerp(astroY, targetY, smoothPhase) },
          bio: { x: lerp(bioX, targetX, smoothPhase), y: lerp(bioY, targetY, smoothPhase) }
        };
      });

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < currentNodes.length; i++) {
        const alpha = Math.max(0.05, smoothPhase * 0.5);
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(currentNodes[i].astro.x, currentNodes[i].astro.y);
        ctx.lineTo(currentNodes[i].bio.x, currentNodes[i].bio.y);
        ctx.stroke();

        if (i % 3 === 0 && i < currentNodes.length - 3) {
          ctx.strokeStyle = `rgba(16, 185, 129, 0.15)`;
          ctx.beginPath();
          ctx.moveTo(currentNodes[i].bio.x, currentNodes[i].bio.y);
          ctx.lineTo(currentNodes[i+3].bio.x, currentNodes[i+3].bio.y);
          ctx.stroke();
        }
      }

      // Draw Astro Nodes
      ctx.fillStyle = `rgba(147, 51, 234, ${0.4 + smoothPhase * 0.6})`;
      currentNodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.astro.x, n.astro.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Bio Nodes
      ctx.fillStyle = `rgba(16, 185, 129, ${0.4 + smoothPhase * 0.6})`;
      currentNodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.bio.x, n.bio.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [alignmentPhase]);

  // --- Analytic Data ---
  const structuralAlignmentData = useMemo(() => ({
    labels: ['Düğüm Derecesi', 'Kümelenme Kats.', 'Özvektör Mrk.', 'Kısa Yol Ort.', 'Asortativite', 'Ağ Modülaritesi'],
    datasets: [
      {
        label: 'Astro-Network',
        data: [0.85, 0.72, 0.91, 0.65, 0.44, 0.88],
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderColor: '#9333ea',
        pointBackgroundColor: '#9333ea',
        borderWidth: 1,
      },
      {
        label: 'Bio-Network',
        data: [0.82, 0.75, 0.89, 0.68, 0.48, 0.85],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: '#10b981',
        pointBackgroundColor: '#10b981',
        borderWidth: 1,
      }
    ]
  }), []);

  const entropyTransferData = useMemo(() => ({
    labels: ['t-50', 't-40', 't-30', 't-20', 't-10', 't-0'],
    datasets: [{
      label: 'Transfer Entropisi (dS/dt)',
      data: [0.012, 0.015, 0.022, 0.018, 0.025, 0.024],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  }), []);

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-300 font-mono text-xs selection:bg-blue-500/30 overflow-x-hidden p-4">
      
      {/* Header */}
      <header className="border-b border-white/10 pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3 uppercase tracking-widest">
            <Torus className="text-blue-500" size={24} />
            Universal-Discovery <span className="text-blue-500">AI</span>
          </h1>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[10px]">
            Scale-Invariant Intelligence & Isomorphism Monitor // v.2.5.0-Stable
          </p>
        </div>
        <div className="flex gap-4">
          <MetricBadge label="ρ (Korelasyon)" value={UniversalMetricSchema.connectionCoefficient_rho.current} color="text-blue-400" />
          <MetricBadge label="Ic (İzomorfizm)" value={UniversalMetricSchema.isomorphismScore.current} color="text-emerald-400" />
          <MetricBadge label="d (Mesafe)" value={UniversalMetricSchema.ontologicalDistance.current} color="text-purple-400" />
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[650px]">
        
        {/* Left Column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Panel title="Agnostic Pattern Monitor" icon={Terminal}>
            <div className="bg-black/50 border border-white/5 p-3 rounded h-48 overflow-y-auto custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className={`mb-2 ${i === 0 ? 'text-blue-400' : 'text-slate-500 opacity-80'}`}>
                  {log}
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Universal Life Alg. Synthesizer" icon={Cpu}>
            <div className="space-y-4">
              <div className="border-l-2 border-purple-500 pl-3">
                <p className="text-[10px] text-slate-500 uppercase mb-1 font-bold">Makro-Skala (Astro)</p>
                <p className="text-purple-300 font-bold">∇²Φ = 4πGρ</p>
                <p className="text-[9px] text-slate-600 mt-1 uppercase">Kütleçekimsel Yoğunluk Dağılımı</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-3">
                <p className="text-[10px] text-slate-500 uppercase mb-1 font-bold">Mikro-Skala (Bio)</p>
                <p className="text-emerald-300 font-bold">∂C/∂t = D∇²C - kC</p>
                <p className="text-[9px] text-slate-600 mt-1 uppercase">Reaksiyon-Difüzyon Kinetiği</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded shadow-inner">
                <p className="text-[9px] text-blue-400 text-center uppercase font-black tracking-tighter">İzomorfik Eşdeğerlik</p>
                <p className="text-center font-bold text-blue-200 mt-1 italic tracking-widest">L(G_A) ≅ L(G_B)</p>
              </div>
            </div>
          </Panel>
        </div>

        {/* Center Column */}
        <div className="lg:col-span-6 flex flex-col border border-white/10 rounded-xl overflow-hidden relative bg-[#030305] shadow-2xl">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded border border-white/5 backdrop-blur-sm">
            <Network size={14} className="text-blue-500" />
            <span className="uppercase text-[10px] text-slate-300 tracking-widest font-black">Manifold Aligner</span>
          </div>
          
          <div className="absolute top-4 right-4 z-10 text-right pointer-events-none">
            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-tighter">Astro Dim: R^N</p>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter">Bio Dim: R^N</p>
            <p className="text-[10px] text-blue-400 mt-1 font-black italic">Align = {(alignmentPhase * 100).toFixed(1)}%</p>
          </div>

          <canvas ref={canvasRef} className="flex-1 w-full h-full min-h-[300px]" />

          <div className="h-1 w-full bg-white/5">
            <div 
              className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300" 
              style={{ width: `${Math.min(100, alignmentPhase * 100)}%` }}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Panel title="Structural Alignment Score" icon={GitMerge}>
            <div className="h-48">
              <Radar 
                data={structuralAlignmentData}
                options={{
                  scales: { r: { grid: { color: 'rgba(255,255,255,0.1)' }, angleLines: { color: 'rgba(255,255,255,0.1)' }, ticks: { display: false }, pointLabels: { color: '#94a3b8', font: { size: 9, family: 'monospace' } } } },
                  plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10, family: 'monospace' }, boxWidth: 10 } } },
                  maintainAspectRatio: false
                }}
              />
            </div>
          </Panel>

          <Panel title="Cross-Disciplinary Entropy" icon={Activity}>
            <div className="h-32 mb-2">
              <Line 
                data={entropyTransferData}
                options={{
                  scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 8 } } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 8 } } } },
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] px-2 pt-2 border-t border-white/5">
              <span className="text-slate-500 font-bold uppercase tracking-tighter">Bilgi Akış Hızı</span>
              <span className="text-blue-400 font-black italic">14.2 MB/s</span>
            </div>
          </Panel>
        </div>
      </div>

      {/* Footer Cards */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <DataCard title="Data Diversity (Dv)" value={UniversalMetricSchema.dataDiversity.current} unit={UniversalMetricSchema.dataDiversity.unit} />
        <DataCard title="Comp. Complexity" value={UniversalMetricSchema.computationalComplexity.current} unit={UniversalMetricSchema.computationalComplexity.unit} />
        <DataCard title="Predicted Edges" value={UniversalMetricSchema.predictedNewLinks.current} unit={UniversalMetricSchema.predictedNewLinks.unit} />
        <DataCard title="Stability Index" value={UniversalMetricSchema.systemStabilityIndex.current} unit={UniversalMetricSchema.systemStabilityIndex.unit} />
      </div>

      <footer className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-600 gap-8">
        <div className="flex gap-12">
           <span>Engine: UNIVERSAL_ISO_v2.5.0</span>
           <span className="flex items-center gap-2 text-blue-500/80 italic">
             <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" /> 
             Isomorphism Monitor Operational
           </span>
        </div>
        <div className="text-right">
          ORIGIN: KAPLAN_HALI_YIKAMA_PRECISION_DEPT | MİMAR: ÖMER KAPLAN
        </div>
      </footer>
    </div>
  );
}

// UI Helpers
const Panel = ({ title, icon: Icon, children }) => (
  <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 flex-1 flex flex-col shadow-lg backdrop-blur-md">
    <h3 className="text-[10px] uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 font-black border-b border-white/5 pb-2">
      {Icon && <Icon size={14} className="text-blue-400" />} {title}
    </h3>
    <div className="flex-1 flex flex-col justify-center">
      {children}
    </div>
  </div>
);

const MetricBadge = ({ label, value, color }) => (
  <div className="text-right">
    <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-bold">{label}</p>
    <p className={`text-xl font-black italic tracking-tighter ${color}`}>{value}</p>
  </div>
);

const DataCard = ({ title, value, unit }) => (
  <div className="bg-white/[0.01] border border-white/5 rounded-lg p-4 flex justify-between items-center hover:bg-white/[0.03] transition-colors shadow-inner">
    <span className="text-[10px] uppercase text-slate-500 tracking-widest font-black">{title}</span>
    <div className="text-right">
      <span className="text-sm font-black text-white mr-1 italic">{value}</span>
      <span className="text-[9px] text-slate-600 font-bold">{unit}</span>
    </div>
  </div>
);
