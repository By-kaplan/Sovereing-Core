/**
 * @project SOVEREIGN CORE LIBRARY | @uid SKL-0022
 * @architect [Ömer Kaplan] | @origin Kaplan Halı Yıkama - Precision Dept.
 * @engine Gemini Pro Hybrid-AI | @collaboration Human-AI Augmented
 * @license MIT (Attribution Required) | @status Production-Ready
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Zap, 
  Activity, 
  Cpu, 
  ShieldAlert, 
  Layers, 
  Settings, 
  Terminal, 
  Database,
  CloudLightning,
  RefreshCcw,
  Lock,
  Atom,
  TrendingUp,
  BrainCircuit,
  Orbit,
  Component,
  Wifi,
  Radio
} from 'lucide-react';

/**
 * @architecture & INTEL
 * @version 3.0 (Singularity Edition)
 * @description: Cognitive Lattice & Entropy Inversion Infrastructure.
 * @ai-context: Bilişsel kafes yapısı üzerinden sistem entropisini "Zırhlı Singularity" noktalarına dönüştüren nöral ağ.
 * @ai-bridge: SKL_SKL_0021 -> SKL_SKL_0022 -> SKL_SKL_0023
 * @status: Proactive Neural Rendering (Safe-Canvas Engine)
 */

// --- ANA BİLEŞEN ---
export default function App() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Simülasyon Durumu
  const [config, setConfig] = useState({
    nodeCount: 100,
    neuralSync: 50,
    entropyAbsorption: 60,
    singularityThreshold: 85,
    latticeRadius: 150
  });

  const [ledger, setLedger] = useState([
    { id: 0, msg: "NEURAL SINGULARITY PROTOCOL INITIATED", time: new Date().toLocaleTimeString() }
  ]);
  
  const [singularityCount, setSingularityCount] = useState(0);

  const addLedgerEntry = useCallback((msg) => {
    setLedger(prev => [{ id: Date.now(), msg: msg, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 8));
  }, []);

  // Animasyon ve Mantık Motoru
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
        this.isSingularity = false;
        this.charge = 0;
      }

      init(x, y) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.life = 1.0; 
        this.decay = (Math.random() * 0.002) + 0.001;
        this.pulse = Math.random() * Math.PI * 2;
        this.isSingularity = false;
        this.charge = 0;
      }

      update(syncLevel, absorptionRate) {
        // Nöral Senkronizasyon (Jitter Effect)
        const jitter = syncLevel / 150;
        this.x += this.vx + (Math.random() - 0.5) * jitter * 8;
        this.y += this.vy + (Math.random() - 0.5) * jitter * 8;

        // Entropi Absorpsiyonu
        this.life -= this.decay * (1 - absorptionRate / 200);
        this.pulse += 0.04;
        this.charge += (absorptionRate / 5000);

        // Singularity Dönüşümü
        if (this.charge > config.singularityThreshold / 100 && !this.isSingularity) {
          this.isSingularity = true;
          this.life = 2.0; // Singularity noktaları daha uzun ömürlüdür
        }

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (this.life <= 0) {
          this.init();
        }
      }

      draw() {
        const alpha = Math.min(1, this.life);
        const size = this.isSingularity ? 5 : 2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        
        if (this.isSingularity) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#ffffff";
          // Singularity Halkası
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(this.x, this.y, size * 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.4})`;
          ctx.lineWidth = 1;
        } else {
          ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`; // Violet
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        if (this.isSingularity) ctx.stroke();
      }
    }

    const initNodes = () => {
      nodes = Array.from({ length: config.nodeCount }, () => new Node());
    };

    const drawLattice = () => {
      const radius = config.latticeRadius;
      let singularities = 0;

      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].isSingularity) singularities++;
        
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            const opacity = (1 - dist / radius) * Math.min(nodes[i].life, nodes[j].life);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            let strokeColor = `rgba(168, 85, 247, ${opacity * 0.25})`;
            if (nodes[i].isSingularity || nodes[j].isSingularity) {
              strokeColor = `rgba(0, 255, 255, ${opacity * 0.6})`;
              ctx.lineWidth = 0.8;
            } else {
              ctx.lineWidth = 0.4;
            }

            ctx.strokeStyle = strokeColor;
            ctx.stroke();
          }
        }
      }
      setSingularityCount(singularities);
    };

    const render = () => {
      ctx.fillStyle = 'rgba(5, 5, 10, 0.35)'; // Phosphor persistence
      ctx.fillRect(0, 0, width, height);

      nodes.forEach(node => {
        node.update(config.neuralSync, config.entropyAbsorption);
        node.draw();
      });

      drawLattice();
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
  }, [config]);

  const handleInteraction = () => {
    addLedgerEntry("COGNITIVE_RESONANCE_DETECTED");
  };

  const SKL_Result = {
    SKL_ID: "SKL-0022",
    SKL_Nodes: config.nodeCount,
    SKL_Singularities: singularityCount,
    SKL_Status: "SINGULARITY_REACHED"
  };

  return (
    <div className="min-h-screen bg-[#030308] text-slate-300 font-mono text-xs p-4 md:p-6 selection:bg-cyan-500/30">
      
      {/* Üst Başlık Bilgisi */}
      <header className="max-w-[1900px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-cyan-900/30 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-3 uppercase">
            <BrainCircuit className="text-cyan-400 animate-pulse" size={28} />
            SKL-0022 Neural Singularity
          </h1>
          <p className="text-slate-500 mt-1 uppercase tracking-[0.4em] font-bold text-[10px]">
            Cognitive Lattice & Entropy Inversion Kernel v3.0
          </p>
        </div>
        <div className="flex gap-4">
          <MetricBadge label="Neural Sync" value={`%${config.neuralSync}`} color="text-violet-400" />
          <MetricBadge label="Singularities" value={singularityCount} color="text-cyan-400" />
          <MetricBadge label="Absorption" value={`%${config.entropyAbsorption}`} color="text-emerald-400" />
        </div>
      </header>

      <main className="max-w-[1900px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sol Kontrol Paneli */}
        <div className="lg:col-span-3 space-y-4">
          <SidebarBox title="Neural Configuration" icon={Settings} color="text-violet-500" bgColor="bg-[#0a0514]">
            <div className="space-y-6 mt-2">
              <ControlRange label="Ağ Yoğunluğu" value={config.nodeCount} min={10} max={200} onChange={(v) => setConfig(prev => ({...prev, nodeCount: v}))} />
              <ControlRange label="Senkronizasyon" value={config.neuralSync} min={1} max={100} onChange={(v) => setConfig(prev => ({...prev, neuralSync: v}))} />
              <ControlRange label="Entropi Emilimi" value={config.entropyAbsorption} min={1} max={100} onChange={(v) => setConfig(prev => ({...prev, entropyAbsorption: v}))} />
              <ControlRange label="Kafes Yarıçapı" value={config.latticeRadius} min={50} max={300} onChange={(v) => setConfig(prev => ({...prev, latticeRadius: v}))} />
            </div>
          </SidebarBox>

          <SidebarBox title="Entropy Inversion" icon={TrendingUp} color="text-emerald-400" bgColor="bg-[#05140a]">
             <div className="space-y-3">
                <StatLine label="İnversiyon Modu" value="PROACTIVE" color="text-emerald-400" />
                <StatLine label="Kayıp Oranı" value="%0.0002" />
                <StatLine label="Kararlılık" value="MAXIMUM" color="text-cyan-400" />
                <div className="mt-4 p-2 bg-black/40 rounded border border-emerald-900/30 text-[9px] italic leading-tight">
                  {">"} Entropi, yapısal zırhlanmaya dönüştürülerek ağın "sönümsüz" olması sağlanıyor.
                </div>
             </div>
          </SidebarBox>
        </div>

        {/* Merkez Ana Sahne */}
        <div className="lg:col-span-6 space-y-4">
          <div 
            ref={containerRef}
            className="bg-[#050508] border border-cyan-900/20 rounded-2xl h-[650px] relative overflow-hidden group cursor-crosshair shadow-[0_0_50px_rgba(0,0,0,1)]"
            onMouseDown={handleInteraction}
          >
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            <div className="absolute top-4 left-4 pointer-events-none space-y-2">
              <StatusBadge icon={Orbit} label="Neural Singularity Active" color="cyan" />
              <StatusBadge icon={Wifi} label="Cognitive Lattice Synced" color="violet" />
            </div>

            <div className="absolute bottom-4 right-4 text-right pointer-events-none">
              <span className="text-[9px] text-slate-700 font-black uppercase tracking-widest font-mono">Precision_Engine_v3.0_SKL_Stable</span>
            </div>
          </div>

          <div className="bg-black/50 border border-slate-800 p-3 rounded-xl font-mono text-[10px] text-cyan-500 flex items-center gap-3 shadow-lg">
             <Terminal size={14} />
             <span className="animate-pulse tracking-tighter"> {">"} COGNITIVE LATTICE STABILIZED. ALL SYSTEMS NOMINAL. </span>
          </div>
        </div>

        {/* Sağ Bilgi Paneli */}
        <div className="lg:col-span-3 space-y-4">
          <SidebarBox title="Immutable Ledger" icon={Lock} color="text-cyan-400" bgColor="bg-[#050a14]">
             <div className="space-y-2 max-h-[250px] overflow-y-auto scrollbar-hide pr-2 flex flex-col-reverse">
                {ledger.map(block => (
                  <div key={block.id} className="bg-cyan-950/10 border border-cyan-900/20 p-2 rounded text-[9px] font-mono group hover:border-cyan-500/40 transition-colors">
                    <span className="text-cyan-700 block mb-0.5">[{block.time}]</span>
                    <span className="text-slate-400 uppercase tracking-tighter">{block.msg}</span>
                  </div>
                ))}
             </div>
          </SidebarBox>

          <SidebarBox title="Singularity Stats" icon={Atom} color="text-white" bgColor="bg-[#0a0a10]">
            <StatLine label="Aktif Singularity" value={singularityCount} color="text-white" />
            <StatLine label="Kafes Yoğunluğu" value={`${(config.nodeCount / 2).toFixed(1)} unit`} />
            <div className="mt-4 space-y-2">
               <div className="flex justify-between text-[8px] uppercase font-black text-slate-500"><span>Yük Durumu</span><span>{(singularityCount * 2.5).toFixed(0)}%</span></div>
               <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 transition-all duration-1000" style={{ width: `${Math.min(100, singularityCount * 2.5)}%` }} />
               </div>
            </div>
          </SidebarBox>

          <div className="p-4 bg-slate-900/30 border border-white/5 rounded-2xl font-mono text-[9px] text-slate-500">
             <p className="mb-2 uppercase font-black text-cyan-600 tracking-tighter flex items-center gap-1">
               <Database size={10}/> SKL_Result_Buffer
             </p>
             <code className="break-all leading-tight text-cyan-400/70">{JSON.stringify(SKL_Result)}</code>
          </div>
        </div>
      </main>

      {/* Alt Bilgi Kartları */}
      <section className="max-w-[1900px] mx-auto mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureCard 
          icon={Radio} 
          title="Cognitive Lattice" 
          desc="Düğümler arası bağlantılar, veri akışına göre dinamik olarak güçlenir."
        />
        <FeatureCard 
          icon={Cpu} 
          title="Safe-Render v3" 
          desc="Saf 2D Canvas motoru ile donanım kısıtlaması olmadan yüksek yoğunluklu nöral ağ projeksiyonu."
        />
        <FeatureCard 
          icon={Zap} 
          title="Entropy Inversion" 
          desc="Sistemdeki düzensizliği emerek düğümleri kalıcı 'Singularity' noktalarına dönüştürür."
        />
        <FeatureCard 
          icon={Component} 
          title="Modular Kernel" 
          desc="SKL serisinin tüm modülleriyle tam uyumlu, otonom çalışan nöral çekirdek."
        />
      </section>

      <footer className="max-w-[1900px] mx-auto mt-12 pt-8 border-t border-slate-900 flex justify-between items-center text-[9px] text-slate-600 font-black uppercase tracking-widest font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          NEURAL_STABILITY_CORE // SKL-0022_Stable
        </div>
        <span>[ Mimari: Ömer Kaplan ] | [ Çekirdek: Neural Singularity ] | [ Protokol: Kaplan Logic ]</span>
      </footer>
    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---

const SidebarBox = ({ title, icon: Icon, color, bgColor, children }) => (
  <div className={`${bgColor} border border-white/5 rounded-xl p-4 shadow-2xl flex flex-col transition-transform hover:scale-[1.01]`}>
    <div className={`flex items-center gap-2 mb-4 border-b border-white/5 pb-2 text-[10px] font-black uppercase tracking-widest ${color}`}>
      <Icon size={14} />
      <span>{title}</span>
    </div>
    {children}
  </div>
);

const MetricBadge = ({ label, value, color }) => (
  <div className="bg-slate-900/50 border border-white/5 px-4 py-2 rounded-xl text-right min-w-[140px] shadow-lg">
    <p className="text-[8px] text-slate-500 uppercase font-black mb-1">{label}</p>
    <p className={`text-lg font-black tracking-tighter ${color}`}>{value}</p>
  </div>
);

const StatLine = ({ label, value, color = "text-slate-400" }) => (
  <div className="flex justify-between items-center text-[10px] py-1 border-b border-white/5 font-bold tracking-tighter uppercase">
    <span className="text-slate-500">{label}:</span>
    <span className={color}>{value}</span>
  </div>
);

const ControlRange = ({ label, value, min, max, onChange }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
      <span className="text-slate-400">{label}</span>
      <span className="text-cyan-400">{value}</span>
    </div>
    <input 
      type="range" min={min} max={max} value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
    />
  </div>
);

const StatusBadge = ({ icon: Icon, label, color }) => (
  <div className={`bg-black/60 backdrop-blur-md border border-${color}-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 w-fit`}>
    <Icon size={12} className={`text-${color}-500 ${color === 'emerald' ? '' : 'animate-pulse'}`} />
    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{label}</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-slate-900/30 border border-white/5 p-4 rounded-xl flex flex-col gap-2 transition-colors hover:bg-slate-900/50">
    <div className="p-2 bg-cyan-500/10 rounded-lg w-fit">
      <Icon size={16} className="text-cyan-400" />
    </div>
    <h4 className="text-[10px] font-black text-slate-200 uppercase">{title}</h4>
    <p className="text-[10px] text-slate-500 leading-tight italic">{desc}</p>
  </div>
);
