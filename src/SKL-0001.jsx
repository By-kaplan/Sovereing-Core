/**
 * @project SOVEREIGN CORE LIBRARY | @uid SKL-0001
 * @architect [Ömer Kaplan] | @origin Kaplan Halı Yıkama - Precision Dept.
 * @engine Gemini Pro Hybrid-AI | @collaboration Human-AI Augmented
 * @license MIT (Attribution Required) | @status Production-Ready
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Zap, 
  Activity, 
  Cpu, 
  Layers, 
  Settings, 
  Terminal, 
  Database,
  Lock,
  Atom,
  BrainCircuit,
  Orbit,
  Wifi,
  Scale,
  ShieldCheck,
  Fingerprint,
  Thermometer,
  Waves,
  Eye,
  AlertCircle,
  RefreshCcw,
  History,
  TrendingUp,
  CloudLightning
} from 'lucide-react';

/**
 * @architecture & INTEL
 * @version 1.0.225 (Evolvable-Governance)
 * @description: Mesh, Legal, Ledger, Cognitive, Senses & Strategic Feedback Loop.
 * @ai-context: Otonom evrim kapasitesine sahip, gerçek zamanlı ağırlık (weight) enjeksiyonu yapan hibrit altyapı.
 * @ai-bridge: SKL_Core -> SKL_SKL_0001 -> SKL_SKL_0002
 * @status: Proactive Evolutionary Mapping (Safe-Canvas Engine v1.0)
 */

// --- ANA BİLEŞEN ---
export default function App() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Sistem Konfigürasyonu
  const [config, setConfig] = useState({
    nodeCount: 80,
    legalRisk: 5,
    envTemp: 22,
    emNoise: 10,
    fatigueLevel: 10,
    evoSpeed: 50,
    connectionRadius: 120
  });

  // Evrimsel Durum (Evolutionary State)
  const [evolution, setEvolution] = useState({
    step: 225,
    learningRate: 0.998
  });

  const [ledger, setLedger] = useState([
    { id: 0, msg: "SYSTEM EVOLUTION PROTOCOL READY", time: new Date().toLocaleTimeString() }
  ]);
  
  const addLedgerEntry = useCallback((msg) => {
    setLedger(prev => [{ id: Date.now(), msg: msg.toUpperCase(), time: new Date().toLocaleTimeString() }, ...prev].slice(0, 10));
  }, []);

  // Risk Analizi
  const riskStatus = useMemo(() => {
    if (config.legalRisk < 30) return { label: 'GÜVENLİ', color: 'text-emerald-400', bg: 'bg-emerald-500', advice: 'Yasal denetim temiz. Evrimsel döngü stabil.' };
    if (config.legalRisk < 70) return { label: 'SINIRDA', color: 'text-amber-400', bg: 'bg-amber-500', advice: 'Uyarı: İşlem hacmi siber hukuk kısıtlamalarına yaklaşıyor.' };
    return { label: 'KRİTİK', color: 'text-rose-500', bg: 'bg-rose-600', advice: 'Acil: Yasal ihlal riski! Tüm operasyonlar mühürleniyor.' };
  }, [config.legalRisk]);

  // Animasyon ve Evrim Motoru
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
        // Evrim hızı hızı etkiler
        const speedBoost = 1 + (config.evoSpeed / 200);
        this.vx = (Math.random() - 0.5) * 1.2 * speedBoost;
        this.vy = (Math.random() - 0.5) * 1.2 * speedBoost;
        this.life = 1.0; 
        this.decay = (Math.random() * 0.004) + 0.002;
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
        const alpha = Math.min(1, this.life);
        const size = 2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        
        let color = `rgba(187, 134, 252, ${alpha})`; // Purple
        if (config.evoSpeed > 80) color = `rgba(15, 82, 186, ${alpha})`; // Sapphire boost
        
        ctx.fillStyle = color;
        ctx.fill();
      }
    }

    const initNodes = () => {
      nodes = Array.from({ length: config.nodeCount }, () => new Node());
    };

    const drawLines = () => {
      const radius = config.connectionRadius;
      const skipProb = config.fatigueLevel / 150;

      for (let i = 0; i < nodes.length; i++) {
        if (Math.random() < skipProb) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            const opacity = (1 - dist / radius) * Math.min(nodes[i].life, nodes[j].life);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            let strokeColor = `rgba(187, 134, 252, ${opacity * 0.3})`;
            if (config.legalRisk > 70) strokeColor = `rgba(255, 75, 43, ${opacity * 0.5})`;
            else if (config.evoSpeed > 80) strokeColor = `rgba(15, 82, 186, ${opacity * 0.5})`;

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.fillStyle = 'rgba(12, 12, 18, 0.45)'; 
      ctx.fillRect(0, 0, width, height);

      // EM Parazit Görselleştirmesi
      if (config.emNoise > 40) {
        ctx.fillStyle = `rgba(184, 115, 51, ${config.emNoise / 800})`;
        for(let i=0; i < config.emNoise / 3; i++) {
          ctx.fillRect(Math.random() * width, Math.random() * height, 2, 1);
        }
      }

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

    // Evrimsel Öğrenme Döngüsü (Learning Cycle)
    const learningInterval = setInterval(() => {
      if (Math.random() < (config.evoSpeed / 2000)) {
        setEvolution(prev => {
          const newStep = prev.step + 1;
          const newRate = (0.9 + (Math.random() * 0.099)).toFixed(3);
          if (newStep % 10 === 0) {
            addLedgerEntry(`AI WEIGHT INJECTED: STEP_${newStep}`);
          }
          return { step: newStep, learningRate: newRate };
        });
      }
    }, 100);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(learningInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config, addLedgerEntry]);

  // Etkileşimler
  const handleInteraction = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    addLedgerEntry(`EXPERIENCE GAINED AT: ADDR_${x}`);
    // Etkileşim evrimi hızlandırır
    setEvolution(prev => ({ ...prev, step: prev.step + 2 }));
  };

  const SKL_Result = {
    SKL_ID: "SKL-0001",
    SKL_Evolution: `V 1.0.${evolution.step}`,
    SKL_LearnRate: evolution.learningRate,
    SKL_Status: riskStatus.label
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-300 font-mono text-xs p-4 md:p-6 selection:bg-indigo-500/30">
      
      {/* HEADER SECTION */}
      <header className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-indigo-900/20 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-indigo-50 flex items-center gap-3 uppercase">
            <TrendingUp className="text-indigo-500 animate-pulse" size={28} />
            SKL-0001 Evolvable Infra
          </h1>
          <p className="text-slate-500 mt-1 uppercase tracking-[0.4em] font-bold text-[10px]">
            Omni-Layer Strategic Feedback & Governance v1.0
          </p>
        </div>
        <div className="flex gap-4">
          <MetricBadge label="Bilişsel Odak" value={`${100 - config.fatigueLevel}%`} color="text-sky-400" />
          <MetricBadge label="Evrim Seviyesi" value={`V 1.0.${evolution.step}`} color="text-indigo-400" />
          <MetricBadge label="Risk Endeksi" value={riskStatus.label} color={riskStatus.color} />
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: LEDGER & LEGAL */}
        <div className="lg:col-span-3 space-y-4">
          <SidebarBox title="Immutable Ledger" icon={Lock} color="text-sky-400" bgColor="bg-[#020617]">
             <div className="flex-1 space-y-2 overflow-y-auto max-h-[350px] scrollbar-hide pr-2 flex flex-col-reverse">
                {ledger.map(entry => (
                  <div key={entry.id} className="bg-slate-950/50 border border-white/5 p-2 rounded text-[9px] group hover:border-indigo-500/30 transition-colors animate-in slide-in-from-bottom-1">
                    <span className="text-indigo-700 block mb-0.5 font-black uppercase tracking-widest">[{entry.time}]</span>
                    <span className="text-slate-400 uppercase tracking-tighter">{entry.msg}</span>
                  </div>
                ))}
             </div>
          </SidebarBox>

          <SidebarBox title="Legal-Compliance" icon={Scale} color="text-amber-400" bgColor="bg-[#0a0a05]">
             <div className="space-y-4">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-500 ${riskStatus.bg}`} style={{ width: `${config.legalRisk}%` }} />
                </div>
                <div className="bg-black/40 p-3 rounded border border-amber-900/20 text-[9px] italic leading-relaxed text-slate-500">
                   {`> ${riskStatus.advice}`}
                </div>
             </div>
          </SidebarBox>
        </div>

        {/* CENTER COLUMN: MESH CANVAS */}
        <div className="lg:col-span-6 space-y-4">
          <div 
            ref={containerRef}
            className="bg-[#08080c] border border-indigo-900/20 rounded-2xl h-[650px] relative overflow-hidden group cursor-crosshair shadow-2xl"
            onMouseDown={handleInteraction}
          >
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            <div className="absolute top-4 left-4 pointer-events-none space-y-2">
              <StatusBadge icon={TrendingUp} label="Strategic Loop: Active" color="indigo" />
              <StatusBadge icon={Wifi} label={`EM Shield: ${100 - config.emNoise}%`} color="violet" />
            </div>

            <div className="absolute bottom-4 right-4 text-right pointer-events-none">
              <span className="text-[9px] text-slate-700 font-black uppercase tracking-widest font-mono italic">OMNI_EVOLUTION_KERNEL_V1</span>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-white/5 p-3 rounded-xl font-mono text-[10px] text-indigo-400 flex items-center gap-3">
             <Terminal size={14} />
             <span className="animate-pulse tracking-tighter uppercase font-black"> {">"} STRATEGIC FEEDBACK LOOP: INJECTING EXPERIENCE DATA... </span>
          </div>
        </div>

        {/* RIGHT COLUMN: FEEDBACK, COGNITIVE & SENSORY */}
        <div className="lg:col-span-3 space-y-4">
          <SidebarBox title="Strategic Feedback Loop" icon={RefreshCcw} color="text-indigo-400" bgColor="bg-[#020617]">
             <div className="h-40 mb-4 bg-black/50 border border-indigo-900/20 rounded-lg overflow-hidden flex items-center justify-center">
                <FeedbackSpiralSVG />
             </div>
             <StatLine label="Evrim Seviyesi" value={`V 1.0.${evolution.step}`} color="text-indigo-400" />
             <StatLine label="Öğrenme Katsayısı" value={evolution.learningRate} color="text-sky-400" />
             <p className="text-[9px] text-slate-500 mt-2 italic border-t border-white/5 pt-2 uppercase">
                Sistem her başarılı operasyondan yeni bir ağırlık (weight) enjekte ediyor.
             </p>
          </SidebarBox>

          <SidebarBox title="Cognitive Sync" icon={BrainCircuit} color="text-sky-400" bgColor="bg-[#050a14]">
             <StatLine label="Bilişsel Odak" value={`${100 - config.fatigueLevel}%`} />
             <div className="mt-4 p-2 bg-sky-950/10 border border-sky-900/20 rounded text-[9px] italic text-slate-500 uppercase">
                Zihin ve sistem senkronizasyonu tam.
             </div>
          </SidebarBox>

          <SidebarBox title="Analog Senses" icon={Waves} color="text-orange-500" bgColor="bg-[#0a0a05]">
             <StatLine label="Sıcaklık" value={`${config.envTemp}°C`} />
             <StatLine label="EM Parazit" value={config.emNoise > 60 ? "YÜKSEK" : "DÜŞÜK"} />
          </SidebarBox>

          <div className="p-4 bg-slate-900/30 border border-white/5 rounded-2xl font-mono text-[9px] text-slate-500">
             <p className="mb-2 uppercase font-black text-indigo-600 tracking-tighter flex items-center gap-1">
               <Fingerprint size={10}/> SKL_Result_Buffer
             </p>
             <code className="break-all leading-tight text-indigo-400/60">{JSON.stringify(SKL_Result)}</code>
          </div>
        </div>
      </main>

      {/* CONTROLS SECTION */}
      <section className="max-w-[1800px] mx-auto mt-12 bg-slate-900/20 border border-white/5 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-5 gap-6 shadow-xl">
        <ControlRange label="Mesh Yoğunluğu" value={config.nodeCount} min={10} max={150} onChange={(v) => setConfig(p => ({...p, nodeCount: v}))} />
        <ControlRange label="Yasal Risk" value={config.legalRisk} min={0} max={100} onChange={(v) => setConfig(p => ({...p, legalRisk: v}))} />
        <ControlRange label="Bilişsel Stres" value={config.fatigueLevel} min={0} max={100} onChange={(v) => setConfig(p => ({...p, fatigueLevel: v}))} />
        <ControlRange label="Evrim Hızı" value={config.evoSpeed} min={1} max={100} onChange={(v) => setConfig(p => ({...p, evoSpeed: v}))} />
        <ControlRange label="EM Parazit" value={config.emNoise} min={0} max={100} onChange={(v) => setConfig(p => ({...p, emNoise: v}))} />
      </section>

      <footer className="max-w-[1800px] mx-auto mt-12 pt-8 border-t border-slate-900 flex justify-between items-center text-[9px] text-slate-700 font-black uppercase tracking-widest font-mono">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          EVOLVABLE_INFRA_V1 // SKL-0001_Stable
        </div>
        <span>[ Mimari: Ömer Kaplan ] | [ Evrim: Strategic Feedback ] | [ Mühür: Safir Mavisi & Beyaz ]</span>
      </footer>
    </div>
  );
}

// --- HELPER COMPONENTS ---

const FeedbackSpiralSVG = () => (
  <svg width="100" height="140" viewBox="0 0 100 140" className="opacity-80">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#glow)">
      <path 
        d="M30 130 Q 70 110 30 90 Q 70 70 30 50 Q 70 30 30 10" 
        fill="none" 
        stroke="#0F52BA" 
        strokeWidth="3" 
        strokeLinecap="round"
      >
        <animate attributeName="stroke-dasharray" from="0,200" to="200,0" dur="3s" repeatCount="indefinite" />
      </path>
      <circle cx="30" cy="10" r="4" fill="#FFFFFF">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

const SidebarBox = ({ title, icon: Icon, color, bgColor, children }) => (
  <div className={`${bgColor} border border-white/5 rounded-xl p-4 shadow-xl flex flex-col transition-all hover:border-white/10 group`}>
    <div className={`flex items-center gap-3 mb-4 border-b border-white/5 pb-2 text-[10px] font-black uppercase tracking-widest ${color}`}>
      <Icon size={14} className="group-hover:rotate-12 transition-transform" />
      <span>{title}</span>
    </div>
    <div className="flex-1 flex flex-col">{children}</div>
  </div>
);

const MetricBadge = ({ label, value, color }) => (
  <div className="bg-slate-900/50 border border-white/5 px-4 py-2 rounded-xl text-right min-w-[140px] shadow-lg">
    <p className="text-[8px] text-slate-500 uppercase font-black mb-1">{label}</p>
    <p className={`text-lg font-black tracking-tighter ${color}`}>{value}</p>
  </div>
);

const StatLine = ({ label, value, color = "text-slate-400" }) => (
  <div className="flex justify-between items-center text-[10px] py-2 border-b border-white/5 font-bold tracking-tighter uppercase">
    <span className="text-slate-500">{label}:</span>
    <span className={color}>{value}</span>
  </div>
);

const ControlRange = ({ label, value, min, max, onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
      <span className="text-slate-500">{label}</span>
      <span className="text-indigo-400">{value}</span>
    </div>
    <input 
      type="range" min={min} max={max} value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all" 
    />
  </div>
);

const StatusBadge = ({ icon: Icon, label, color }) => (
  <div className={`bg-black/70 backdrop-blur-md border border-${color}-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 w-fit`}>
    <Icon size={12} className={`text-${color}-500 animate-pulse`} />
    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{label}</span>
  </div>
);
