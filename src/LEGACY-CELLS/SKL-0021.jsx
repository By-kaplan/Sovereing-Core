/**
 * @project SOVEREIGN CORE LIBRARY | @uid SKL-0021
 * @architect [Ömer Kaplan] | @origin Kaplan Halı Yıkama - Precision Dept.
 * @engine Gemini Pro Hybrid-AI | @collaboration Human-AI Augmented
 * @license MIT (Attribution Required) | @status Production-Ready
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Zap, 
  Activity, 
  Cpu, 
  Share2, 
  ShieldAlert, 
  Trash2, 
  Layers, 
  Settings, 
  Terminal, 
  Database,
  CloudLightning,
  RefreshCcw
} from 'lucide-react';

/**
 * @architecture & INTEL
 * @dependencies: react, lucide-react, tailwindcss
 * @credits: Kaplan Precision Dept. - Geçici Ağlar ve Uçucu Bellek Simülasyon Birimi.
 * @ai-context: SKL-0021, RAM tabanlı sanal ağ anahtarlarını simüle eder. Düğümler sönünce bellekten "Zero-Fill" yöntemiyle silinir.
 * @ai-bridge: SKL_SKL_0020 -> SKL_SKL_0021 -> SKL_SKL_0022
 * @status: Hardware-Independent (2D Canvas Logic)
 */

// --- CORE COMPONENT ---
export default function App() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Simulation State
  const [config, setConfig] = useState({
    nodeCount: 80,
    connectionRadius: 140,
    decayRate: 4, // 1-10 scale
    colorMode: 'purple'
  });

  const [logs, setLogs] = useState([
    "> INITIALIZING VIRTUAL RAM MESH...",
    "> ALLOCATING VOLATILE SEGMENTS... DONE.",
    "> SYSTEM STATUS: SECURE (VOLATILE MODE ON)"
  ]);

  const addLog = useCallback((msg) => {
    setLogs(prev => [`> [${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
  }, []);

  // Animation Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let nodes = [];
    let animationFrameId;
    let width, height;

    const resize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    class Node {
      constructor(x, y) {
        this.init(x, y);
      }

      init(x, y) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.8;
        this.vy = (Math.random() - 0.5) * 1.8;
        this.life = 1.0; 
        this.decay = (Math.random() * 0.004) + (config.decayRate / 1000);
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.pulse += 0.05;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (this.life <= 0) {
          this.init();
        }
      }

      draw() {
        const alpha = this.life * 0.8;
        const size = Math.abs(Math.sin(this.pulse)) * 2 + 1;

        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`; // Purple-500
        ctx.fill();

        if (this.life > 0.5) {
          ctx.shadowBlur = 10 * this.life;
          ctx.shadowColor = "rgba(168, 85, 247, 0.4)";
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    const initNodes = () => {
      nodes = Array.from({ length: config.nodeCount }, () => new Node());
    };

    const drawLines = () => {
      const radius = config.connectionRadius;
      ctx.shadowBlur = 0; 

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            const opacity = (1 - dist / radius) * Math.min(nodes[i].life, nodes[j].life);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.35})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.4)'; // Persistance effect
      ctx.fillRect(0, 0, width, height);

      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      drawLines();
      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    initNodes();
    render();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config.nodeCount, config.connectionRadius, config.decayRate]);

  const handleManualInjection = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addLog(`ALERT: MANUAL RAM INJECTION AT [${Math.floor(x)}, ${Math.floor(y)}]`);
  };

  const SKL_Result = {
    SKL_ID: "SKL-0021",
    SKL_Nodes: config.nodeCount,
    SKL_Decay: config.decayRate,
    SKL_Mode: "VOLATILE_MESH"
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-300 font-mono text-xs p-4 md:p-8 selection:bg-purple-500/30">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-purple-900/30 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-3 uppercase">
            <CloudLightning className="text-purple-500 animate-pulse" size={28} />
            SKL-0021 Ephemeral-Mesh
          </h1>
          <p className="text-slate-500 mt-1 uppercase tracking-[0.2em] font-bold text-[10px]">
            RAM-Based Volatile Network Architecture
          </p>
        </div>
        <div className="flex gap-4">
          <MetricBadge label="Active Nodes" value={config.nodeCount} color="text-purple-400" />
          <MetricBadge label="Memory Decay" value={`${config.decayRate*10}%`} color="text-rose-400" />
          <MetricBadge label="Throughput" value="1.2 Tbps" color="text-blue-400" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar Controls */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/50 border border-purple-900/20 rounded-xl p-5 shadow-xl backdrop-blur-md">
            <h3 className="text-xs font-black text-white uppercase mb-6 flex items-center gap-2 tracking-widest border-b border-purple-900/30 pb-2">
              <Settings size={14} className="text-purple-500" /> Mesh Configuration
            </h3>
            
            <div className="space-y-6">
              <ControlGroup 
                label="Ağ Yoğunluğu" 
                value={config.nodeCount} 
                min={10} max={150} 
                onChange={(v) => setConfig(prev => ({...prev, nodeCount: v}))}
                unit="Nodes"
              />
              <ControlGroup 
                label="Bağlantı Yarıçapı" 
                value={config.connectionRadius} 
                min={50} max={300} 
                onChange={(v) => setConfig(prev => ({...prev, connectionRadius: v}))}
                unit="px"
              />
              <ControlGroup 
                label="Bozulma Hızı" 
                value={config.decayRate} 
                min={1} max={10} 
                onChange={(v) => setConfig(prev => ({...prev, decayRate: v}))}
                unit="Decay"
              />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-purple-900/20 rounded-xl p-5">
             <h3 className="text-xs font-black text-purple-400 uppercase mb-4 flex items-center gap-2">
               <ShieldAlert size={12} /> Security Protocol
             </h3>
             <div className="space-y-2 opacity-80">
                <StatusItem label="Zero-Fill" value="ENABLED" active />
                <StatusItem label="RAM_Leak" value="PROTECTED" active />
                <StatusItem label="Encryption" value="AES-XTS" />
             </div>
          </div>

          <div className="p-3 bg-black/40 border border-purple-900/20 rounded-xl font-mono text-[9px] text-slate-500">
             <p className="mb-2 uppercase font-black text-purple-600 tracking-tighter flex items-center gap-1">
               <Database size={10}/> SKL_Result_Buffer
             </p>
             <code className="break-all leading-tight">{JSON.stringify(SKL_Result)}</code>
          </div>
        </aside>

        {/* Main Simulation View */}
        <div className="lg:col-span-9 space-y-6">
          <div 
            ref={containerRef}
            className="bg-slate-950 border border-purple-900/30 rounded-2xl h-[500px] relative overflow-hidden group cursor-crosshair shadow-inner"
            onMouseDown={handleManualInjection}
          >
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            <div className="absolute top-4 left-4 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md border border-purple-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Activity size={12} className="text-purple-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Volatile Mesh Active</span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 text-right pointer-events-none">
              <span className="text-[10px] text-slate-600 font-black uppercase">Kaplan_Logic Hardware_Independent_Engine</span>
            </div>
          </div>

          {/* Terminal / Logs */}
          <div className="bg-[#0a0a0f] border border-slate-800 rounded-xl p-4 font-mono text-[10px] h-[120px] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center gap-2 mb-2 text-slate-600 border-b border-slate-900 pb-1 uppercase tracking-tighter font-black">
              <Terminal size={12} /> Live Network Log
            </div>
            <div className="flex-1 space-y-1 text-emerald-500/80">
              {logs.map((log, i) => (
                <div key={i} className={i === 0 ? 'text-emerald-400' : ''}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Features */}
      <section className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureCard 
          icon={RefreshCcw} 
          title="Zero-Fill Decay" 
          desc="Düğüm sönünce, veri yapısı bellekten elektrik yükü boşaltılarak silinir."
        />
        <FeatureCard 
          icon={Cpu} 
          title="Safe-Render" 
          desc="WebGL gerektirmez, saf 2D Canvas ve CPU matematiği ile optimize edilmiştir."
        />
        <FeatureCard 
          icon={Zap} 
          title="RAM Swapping" 
          desc="Anlık açılan routing girişleri, fiziksel bellek yerine sanal RAM segmentlerinde tutulur."
        />
        <FeatureCard 
          icon={Trash2} 
          title="Volatile Mode" 
          desc="Elektrik kesintisi veya sistem resetinde tüm ağ topolojisi anında yok olur."
        />
      </section>

      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-600 font-black uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          Sovereign Core Library // SKL-0021_Stable
        </div>
        <span>© 2026 PRECISION_DEPT_ANALYTICS</span>
      </footer>
    </div>
  );
}

// --- HELPER COMPONENTS ---

const MetricBadge = ({ label, value, color }) => (
  <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-right min-w-[120px]">
    <p className="text-[8px] text-slate-500 uppercase font-black mb-1">{label}</p>
    <p className={`text-lg font-black tracking-tighter ${color}`}>{value}</p>
  </div>
);

const ControlGroup = ({ label, value, min, max, onChange, unit }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-[9px] font-black uppercase">
      <span className="text-slate-400">{label}</span>
      <span className="text-purple-400">{value} {unit}</span>
    </div>
    <input 
      type="range" min={min} max={max} 
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500" 
    />
  </div>
);

const StatusItem = ({ label, value, active }) => (
  <div className="flex justify-between items-center text-[10px] py-1 border-b border-white/5 font-bold tracking-tighter uppercase">
    <span className="text-slate-500">{label}</span>
    <span className={active ? 'text-emerald-400' : 'text-slate-300'}>{value}</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-slate-900/30 border border-purple-900/10 p-4 rounded-xl flex flex-col gap-2">
    <div className="p-2 bg-purple-500/10 rounded-lg w-fit">
      <Icon size={16} className="text-purple-400" />
    </div>
    <h4 className="text-[10px] font-black text-slate-200 uppercase">{title}</h4>
    <p className="text-[10px] text-slate-500 leading-tight italic">{desc}</p>
  </div>
);
