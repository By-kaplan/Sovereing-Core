/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / EVOLUTION-LOGIC
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v3.0.0-EVOLUTION (Native 2D Verified)
 * @credits   : React, Chart.js, Lucide Icons, Tailwind CSS.
 * @license   : MIT | Kimlik mührü korunmak şartıyla serbest kullanım.
 * @note      : Donanım dostu 2D Canvas tabanlı evrimsel büyüme monitörü.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  GitBranch, 
  Cpu, 
  Activity, 
  Zap, 
  Layers, 
  Database, 
  ShieldCheck, 
  Maximize2, 
  TrendingUp, 
  RefreshCw, 
  Search, 
  AlertCircle 
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

/**
 * EVRİMSEL MANTIK MOTORU
 * Sistem büyüme metriklerini ve IQ ölçeklemesini hesaplar.
 */
const evolutionLogicEngine = {
  calculateGamma: (recursionDepth, codeEfficiency) => {
    const gamma = (Math.pow(recursionDepth, 2) * codeEfficiency) / Math.log(Date.now() % 1000 + 2);
    return parseFloat(gamma.toFixed(4));
  },
  generateExpansionMatrix: (currentNodes, entropy) => {
    const expansionRate = (currentNodes * 0.15) * (1 + entropy);
    const pruningRate = currentNodes * 0.05;
    return {
      newNodes: Math.floor(expansionRate),
      prunedNodes: Math.floor(pruningRate),
      netGrowth: Math.floor(expansionRate - pruningRate)
    };
  },
  calculateEntropyGradient: (dataVolume, stability) => {
    const entropy = Math.max(0.1, 1 - (stability / 100));
    return dataVolume * Math.pow(entropy, 1.5);
  },
  generateGrowthReport: (stats) => {
    const { depth, efficiency, nodes, stability, dataRate } = stats;
    const gamma = evolutionLogicEngine.calculateGamma(depth, efficiency);
    const matrix = evolutionLogicEngine.generateExpansionMatrix(nodes, (100 - stability) / 100);
    const iqScaling = (Math.log2(nodes) * (efficiency / 10)).toFixed(2);
    return {
      protocol_status: "AKTİF",
      metrics: {
        recursive_coefficient_gamma: gamma,
        architectural_expansion_nodes: matrix.netGrowth,
        evolutionary_iq_scaling: parseFloat(iqScaling),
        entropy_gradient_index: evolutionLogicEngine.calculateEntropyGradient(dataRate, stability).toFixed(2)
      },
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * DONANIM DOSTU 2D CANVAS MOTORU
 * WebGL hatalarını önlemek için standart 2D Context tabanlı görselleştirme.
 */
const Canvas2DFractal = ({ growthRate, nodes }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let frameId;

    const initParticles = () => {
      const count = Math.min(Math.floor(nodes / 8), 200);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2 + 0.5,
        hue: 220 + Math.random() * 40
      }));
    };

    const draw = () => {
      if (!canvas) return;
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        initParticles();
      }
      
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((p, idx) => {
        p.x = (p.x + p.vx * (growthRate + 0.4) + canvas.width) % canvas.width;
        p.y = (p.y + p.vy * (growthRate + 0.4) + canvas.height) % canvas.height;
        
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, 0.8)`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (idx % 12 === 0) {
            const nextP = particlesRef.current[(idx + 1) % particlesRef.current.length];
            ctx.beginPath();
            ctx.strokeStyle = `hsla(230, 70%, 50%, 0.08)`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextP.x, nextP.y);
            ctx.stroke();
        }
      });

      frameId = requestAnimationFrame(draw);
    };

    initParticles();
    draw();
    return () => cancelAnimationFrame(frameId);
  }, [growthRate, nodes]);

  return <canvas ref={canvasRef} className="w-full h-full block bg-[#050505]" />;
};

/**
 * ANA KONTROL PANELİ
 */
export default function App() {
  const [metrics, setMetrics] = useState({
    gamma: 0.842,
    stability: 94.2,
    integrationRate: 1240,
    mutationGain: 12.4,
    nodes: 1024,
    depth: 42,
    efficiency: 88,
    iq: 142.5
  });

  const [history, setHistory] = useState({ iq: [], time: [] });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const report = evolutionLogicEngine.generateGrowthReport({
          depth: prev.depth,
          efficiency: prev.efficiency,
          nodes: prev.nodes,
          stability: prev.stability,
          dataRate: prev.integrationRate
        });

        return {
          ...prev,
          gamma: report.metrics.recursive_coefficient_gamma,
          nodes: prev.nodes + report.metrics.architectural_expansion_nodes,
          iq: report.metrics.evolutionary_iq_scaling,
          mutationGain: prev.mutationGain + (Math.random() * 0.2 - 0.05),
          integrationRate: 1200 + Math.random() * 500
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHistory(prev => ({
      iq: [...prev.iq, metrics.iq].slice(-20),
      time: [...prev.time, new Date().toLocaleTimeString()].slice(-20)
    }));
  }, [metrics.iq]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-8 overflow-hidden selection:bg-indigo-500/30">
      {/* Üst Bar */}
      <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <RefreshCw className="text-indigo-500" size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-widest text-white uppercase italic leading-none">
              Evolution-Logic <span className="text-indigo-500">AI</span>
            </h1>
          </div>
          <p className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase">
            Sistem: Donanım_Güvenli_Mod // Mod: 2D_Stabil_Görselleştirme
          </p>
        </div>
        
        <div className="flex gap-8 text-right">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Evrimsel IQ</p>
            <p className="text-3xl font-black text-white italic">{(metrics.iq * 10).toFixed(1)}</p>
          </div>
          <div className="w-px h-10 bg-white/10 self-center" />
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Düğüm Sayısı</p>
            <p className="text-3xl font-black text-indigo-500 italic">{metrics.nodes.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 h-[calc(100vh-200px)]">
        {/* Sol Panel: Metrikler */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <MetricCard 
            icon={<Layers size={16} />} 
            label="Özyineleme Katsayısı (Γ)" 
            value={metrics.gamma} 
            unit="coeff"
            color="text-indigo-400"
          />
          <MetricCard 
            icon={<ShieldCheck size={16} />} 
            label="Sistem Kararlılığı" 
            value={metrics.stability} 
            unit="%"
            color="text-emerald-400"
          />
          <MetricCard 
            icon={<Zap size={16} />} 
            label="Aktif Mutasyon Kazancı" 
            value={metrics.mutationGain.toFixed(2)} 
            unit="dB"
            color="text-amber-400"
          />
          
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex-1 flex flex-col gap-4 shadow-xl">
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 italic">
               <Search size={14} className="text-indigo-400" /> Kaynak Analizi
             </h3>
             <div className="space-y-3 font-mono text-[11px]">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-600">GPU Bağlamı:</span>
                  <span className="text-amber-500 font-bold">DEVRE_DIŞI</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-600">Canvas 2D:</span>
                  <span className="text-emerald-400 font-bold">AKTİF</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-600">Hata Filtresi:</span>
                  <span className="text-indigo-400 font-bold">TAM_BLOKE</span>
                </div>
             </div>
          </div>
        </div>

        {/* Orta Panel: Ana Görselleştirme */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <div className="relative flex-1 bg-[#050505] border border-white/5 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/5">
            <div className="absolute top-6 left-6 z-10 pointer-events-none bg-black/40 p-3 rounded-lg backdrop-blur-md border border-white/5">
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.4em] mb-1">Nöral Genişleme Manifoldu</h2>
              <p className="text-[10px] text-slate-500 font-mono tracking-widest italic">Core_Visualizer_V3_Native.sys</p>
            </div>
            
            <Canvas2DFractal growthRate={metrics.gamma} nodes={metrics.nodes} />

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/5 flex gap-8">
                 <div>
                   <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter mb-1 font-mono">Büyüme Ufku</p>
                   <p className="text-sm font-black text-white italic leading-none">+{(metrics.gamma * 2).toFixed(1)}ly</p>
                 </div>
                 <div>
                   <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter mb-1 font-mono">Entropi Gradyanı</p>
                   <p className="text-sm font-black text-white italic leading-none">{(1 - metrics.stability/100).toFixed(3)}</p>
                 </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[9px] font-mono text-indigo-400 animate-pulse uppercase italic font-black">Safe_Render: Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Panel: Analiz */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl shadow-lg">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 italic">
              <TrendingUp size={14} className="text-indigo-400" /> Performans İzleme
            </h3>
            <div className="h-40">
              <Line 
                data={{
                  labels: history.time,
                  datasets: [{
                    label: 'IQ',
                    data: history.iq,
                    borderColor: '#6366f1',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(99, 102, 241, 0.05)'
                  }]
                }}
                options={{
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                  maintainAspectRatio: false
                }}
              />
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex-1 flex flex-col shadow-lg">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 italic border-b border-white/5 pb-2">
              <ShieldCheck size={14} className="text-emerald-400" /> Bütünlük Günlüğü
            </h3>
            <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
              <LogEntry status="TAMAM" label="WebGL Bypass" time="0.01ms" />
              <LogEntry status="AKTİF" label="2D Buffer Sync" time="0.4ms" />
              <LogEntry status="TAMAM" label="Logic Consistency" time="0.8ms" />
              <LogEntry status="BİLGİ" label="No WebGL Detected" time="--" />
              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] mb-2 font-mono">
                  <span className="text-slate-600 uppercase italic font-bold">Güvenlik Skoru:</span>
                  <span className="text-white font-black italic">100.0%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 flex justify-between items-center text-[9px] font-mono text-neutral-700 border-t border-neutral-900 pt-6 uppercase tracking-[0.3em] italic font-bold">
        <div className="flex gap-10">
          <span>&copy; 2026 EVOLUTION-LOGIC_LABS</span>
          <span>GPU: NO_FALLBACK_NECESSARY</span>
          <span className="text-indigo-900">RENDER_MODE: NATIVE_CANVAS</span>
        </div>
        <div className="flex gap-4 items-center">
          <AlertCircle size={10} className="text-amber-900" />
          <span>SİSTEM_GÜVENLİ</span>
        </div>
      </footer>
    </div>
  );
}

const MetricCard = ({ icon, label, value, unit, color }) => (
  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl group transition-all duration-500 hover:bg-white/[0.04] shadow-md">
    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 italic">
      <span className={color}>{icon}</span> {label}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-black text-white italic tracking-tighter leading-none">{value}</span>
      <span className="text-[10px] font-mono text-slate-600 uppercase font-black">{unit}</span>
    </div>
  </div>
);

const LogEntry = ({ status, label, time }) => (
  <div className="flex items-center justify-between font-mono text-[9px] border-b border-white/5 pb-2 group hover:bg-white/[0.01] transition-colors mb-2">
    <div className="flex items-center gap-2">
      <span className={
        status === 'TAMAM' ? 'text-emerald-500' : 
        status === 'AKTİF' ? 'text-indigo-500' : 'text-amber-500'
      }>[{status}]</span>
      <span className="text-slate-400 uppercase tracking-tighter font-bold">{label}</span>
    </div>
    <span className="text-slate-600 italic font-mono">{time}</span>
  </div>
);
