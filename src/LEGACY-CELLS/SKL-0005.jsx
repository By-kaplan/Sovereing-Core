/**
 * @project SOVEREIGN CORE LIBRARY | @uid SKL-0005
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
  AlertCircle
} from 'lucide-react';

/**
 * @architecture & INTEL
 * @version 1.0 (Sensory-Cognitive Core)
 * @description: Mesh, Legal, Ledger, Cognitive & Senses Entegrasyonu.
 * @ai-context: Fiziksel vektörleri siber tehdit parametrelerine dönüştüren hibrit altyapı.
 * @ai-bridge: SKL_Core -> SKL_SKL_0005 -> SKL_SKL_0006
 * @status: Proactive Sensory Mapping (Safe-Canvas Engine)
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
    connectionRadius: 120
  });

  const [ledger, setLedger] = useState([
    { id: 0, msg: "SYSTEM INITIALIZED: ALL HYBRID MODULES ONLINE", time: new Date().toLocaleTimeString() }
  ]);
  
  const [vibrationVal, setVibrationVal] = useState("NOMINAL");

  const addLedgerEntry = useCallback((msg) => {
    setLedger(prev => [{ id: Date.now(), msg: msg.toUpperCase(), time: new Date().toLocaleTimeString() }, ...prev].slice(0, 10));
  }, []);

  // Risk Durum Analizi
  const riskStatus = useMemo(() => {
    if (config.legalRisk < 30) return { label: 'GÜVENLİ', color: 'text-emerald-400', bg: 'bg-emerald-500', advice: 'Sistem stabil. Bilişsel odak yüksek.' };
    if (config.legalRisk < 70) return { label: 'SINIRDA', color: 'text-amber-400', bg: 'bg-amber-500', advice: 'Dikkat: İşlem hacmi yasal eşiklere yaklaşıyor.' };
    return { label: 'KRİTİK', color: 'text-rose-500', bg: 'bg-rose-600', advice: 'Acil: Yasal ihlal riski! Tüm işlemler mühürleniyor.' };
  }, [config.legalRisk]);

  // Animasyon Motoru
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
        // Sıcaklık hızı (entropiyi) doğrudan etkiler
        const speedMultiplier = 1 + (config.envTemp - 22) * 0.06;
        this.vx = (Math.random() - 0.5) * 1.3 * speedMultiplier;
        this.vy = (Math.random() - 0.5) * 1.3 * speedMultiplier;
        this.life = 1.0; 
        this.decay = (Math.random() * 0.004) + 0.002;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        // EM Parazit (Jitter) etkisi
        const jitter = config.emNoise / 150;
        this.x += this.vx + (Math.random() - 0.5) * jitter * 12;
        this.y += this.vy + (Math.random() - 0.5) * jitter * 12;
        
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
        const size = Math.abs(Math.sin(this.pulse)) * 2 + 1;

        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        
        let color = `rgba(187, 134, 252, ${alpha})`; // Purple
        if (config.fatigueLevel > 70) color = `rgba(192, 192, 192, ${alpha})`; // Silver fatigue
        else if (config.envTemp > 38) color = `rgba(184, 115, 51, ${alpha})`; // Copper heat
        
        ctx.fillStyle = color;
        ctx.fill();
      }
    }

    const initNodes = () => {
      nodes = Array.from({ length: config.nodeCount }, () => new Node());
    };

    const drawLines = () => {
      const radius = config.connectionRadius;
      const skipProb = config.fatigueLevel / 200; // Yorgunluk arttıkça bağlantı verimi düşer

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
            else if (config.envTemp > 35) strokeColor = `rgba(184, 115, 51, ${opacity * 0.5})`;

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.fillStyle = 'rgba(12, 12, 15, 0.45)'; 
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

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config]);

  // Etkileşimler
  const handleCanvasInteraction = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    addLedgerEntry(`SENSORY_TOUCH: ADDR_REF(${x})`);
    if (config.emNoise > 75) setVibrationVal("ANOMALOUS");
    else setVibrationVal("NOMINAL");
  };

  const SKL_Result = {
    SKL_ID: "SKL-0005",
    SKL_Temp: `${config.envTemp}°C`,
    SKL_Focus: `${100 - config.fatigueLevel}%`,
    SKL_Status: riskStatus.label
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-300 font-mono text-xs p-4 md:p-6 selection:bg-purple-500/20">
      
      {/* HEADER */}
      <header className="max-w-[1700px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-sky-100 flex items-center gap-3 uppercase">
            <Orbit className="text-violet-500 animate-pulse" size={28} />
            SKL-0005 Omni-Sensory
          </h1>
          <p className="text-slate-500 mt-1 uppercase tracking-[0.4em] font-bold text-[10px]">
            Analog Bridge & Cognitive Infrastructure
          </p>
        </div>
        <div className="flex gap-4">
          <MetricBadge label="Bilişsel Odak" value={`${100 - config.fatigueLevel}%`} color="text-sky-400" />
          <MetricBadge label="Ortam Isısı" value={`${config.envTemp}°C`} color="text-orange-400" />
          <MetricBadge label="Risk Endeksi" value={riskStatus.label} color={riskStatus.color} />
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: LEDGER */}
        <div className="lg:col-span-3 space-y-4">
          <SidebarBox title="Immutable Ledger" icon={Lock} color="text-sky-400" bgColor="bg-slate-900/40">
             <div className="flex-1 space-y-2 overflow-y-auto max-h-[350px] scrollbar-hide pr-2 flex flex-col-reverse">
                {ledger.map(entry => (
                  <div key={entry.id} className="bg-slate-950/50 border border-white/5 p-2 rounded text-[9px] group hover:border-violet-500/30 transition-colors">
                    <span className="text-violet-700 block mb-0.5 font-black">[{entry.time}]</span>
                    <span className="text-slate-400 uppercase tracking-tighter">{entry.msg}</span>
                  </div>
                ))}
             </div>
          </SidebarBox>

          <SidebarBox title="Legal-Compliance" icon={Scale} color="text-amber-400" bgColor="bg-[#0f0f0a]">
             <div className="space-y-4">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-500 ${riskStatus.bg}`} style={{ width: `${config.legalRisk}%` }} />
                </div>
                <div className="bg-black/40 p-3 rounded border border-white/5 text-[9px] italic leading-relaxed text-slate-500">
                   {`> ${riskStatus.advice}`}
                </div>
             </div>
          </SidebarBox>
        </div>

        {/* CENTER: MESH STAGE */}
        <div className="lg:col-span-6 space-y-4">
          <div 
            ref={containerRef}
            className="bg-[#050508] border border-white/5 rounded-2xl h-[550px] relative overflow-hidden group cursor-crosshair shadow-2xl"
            onMouseDown={handleCanvasInteraction}
          >
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            <div className="absolute top-4 left-4 pointer-events-none space-y-2">
              <StatusBadge icon={Thermometer} label={`Termal Vektör: ${config.envTemp}°C`} color="orange" />
              <StatusBadge icon={Wifi} label={`EM Shield: ${100 - config.emNoise}%`} color="violet" />
            </div>

            <div className="absolute bottom-4 right-4 text-right pointer-events-none">
              <span className="text-[9px] text-slate-700 font-black uppercase tracking-widest font-mono">SKL_SENSORY_KERNEL_V1</span>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-white/5 p-3 rounded-xl font-mono text-[10px] text-emerald-500 flex items-center gap-3">
             <Terminal size={14} />
             <span className="animate-pulse tracking-tighter uppercase font-black"> {">"} ANALOG-SENSORY BRIDGE ONLINE. PHYSICAL VECTORS MONITORED. </span>
          </div>
        </div>

        {/* RIGHT: SENSORY & COGNITIVE */}
        <div className="lg:col-span-3 space-y-4">
          <SidebarBox title="Analog Senses" icon={Waves} color="text-orange-500" bgColor="bg-[#14100a]">
             <div className="h-32 mb-4 bg-black/50 border border-orange-900/20 rounded-lg overflow-hidden flex items-center justify-center">
                <FingerprintSVG />
             </div>
             <StatLine label="Vibration (Vib)" value={vibrationVal} color={vibrationVal === "ANOMALOUS" ? "text-rose-500" : "text-emerald-400"} />
             <StatLine label="EM Parazit" value={config.emNoise > 60 ? "MODERATE" : "LOW"} />
             <StatLine label="Hava Akışı" value="STABIL" />
          </SidebarBox>

          <SidebarBox title="Cognitive Sync" icon={BrainCircuit} color="text-sky-400" bgColor="bg-[#0a0f14]">
             <StatLine label="Bilişsel Odak" value={`${100 - config.fatigueLevel}%`} />
             <p className="text-[9px] text-slate-500 mt-2 italic border-t border-white/5 pt-2">
                Sistem biyolojik ritminizle senkronize çalışarak veri entropisini dengeler.
             </p>
          </SidebarBox>

          <div className="p-4 bg-slate-900/30 border border-white/5 rounded-2xl font-mono text-[9px] text-slate-500">
             <p className="mb-2 uppercase font-black text-violet-600 tracking-tighter flex items-center gap-1">
               <Fingerprint size={10}/> SKL_Result_Buffer
             </p>
             <code className="break-all leading-tight text-violet-400/60">{JSON.stringify(SKL_Result)}</code>
          </div>
        </div>
      </main>

      {/* CONTROLS */}
      <section className="max-w-[1700px] mx-auto mt-12 bg-slate-900/20 border border-white/5 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-5 gap-6">
        <ControlRange label="Mesh Yoğunluğu" value={config.nodeCount} min={10} max={150} onChange={(v) => setConfig(p => ({...p, nodeCount: v}))} />
        <ControlRange label="Legal Risk" value={config.legalRisk} min={0} max={100} onChange={(v) => setConfig(p => ({...p, legalRisk: v}))} />
        <ControlRange label="Bilişsel Stres" value={config.fatigueLevel} min={0} max={100} onChange={(v) => setConfig(p => ({...p, fatigueLevel: v}))} />
        <ControlRange label="Ortam Isısı" value={config.envTemp} min={15} max={45} onChange={(v) => setConfig(p => ({...p, envTemp: v}))} />
        <ControlRange label="EM Parazit" value={config.emNoise} min={0} max={100} onChange={(v) => setConfig(p => ({...p, emNoise: v}))} />
      </section>

      <footer className="max-w-[1700px] mx-auto mt-12 pt-8 border-t border-slate-900 flex justify-between items-center text-[9px] text-slate-700 font-black uppercase tracking-widest font-mono">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          SENSORY_CORE_V1 // SKL-0005_Stable
        </div>
        <span>[ Mimari: Ömer Kaplan ] | [ Mühür: Bakır & Füme ] | [ Analiz: Precision Dept ]</span>
      </footer>
    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---

const FingerprintSVG = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-70">
    <path d="M30 70 Q50 20 70 70" fill="none" stroke="#B87333" strokeWidth="2" opacity="0.4"/>
    <path d="M35 75 Q50 30 65 75" fill="none" stroke="#B87333" strokeWidth="1" opacity="0.6"/>
    <path d="M25 65 Q50 10 75 65" fill="none" stroke="#B87333" strokeWidth="1" opacity="0.2"/>
    <path d="M50 30 V10 H70" fill="none" stroke="#B87333" strokeWidth="1.5">
       <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="2s" repeatCount="indefinite" />
    </path>
    <circle cx="50" cy="50" r="10" fill="rgba(184, 115, 51, 0.4)">
       <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const SidebarBox = ({ title, icon: Icon, color, bgColor, children }) => (
  <div className={`${bgColor} border border-white/5 rounded-xl p-4 shadow-xl flex flex-col transition-all hover:border-white/10`}>
    <div className={`flex items-center gap-3 mb-4 border-b border-white/5 pb-2 text-[10px] font-black uppercase tracking-widest ${color}`}>
      <Icon size={14} />
      <span>{title}</span>
    </div>
    <div className="flex-1 flex flex-col">{children}</div>
  </div>
);

const MetricBadge = ({ label, value, color }) => (
  <div className="bg-slate-900/50 border border-white/5 px-4 py-2 rounded-xl text-right min-w-[140px]">
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
      <span className="text-violet-400">{value}</span>
    </div>
    <input 
      type="range" min={min} max={max} value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500" 
    />
  </div>
);

const StatusBadge = ({ icon: Icon, label, color }) => (
  <div className={`bg-black/70 backdrop-blur-md border border-${color}-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 w-fit`}>
    <Icon size={12} className={`text-${color}-500 animate-pulse`} />
    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{label}</span>
  </div>
);
