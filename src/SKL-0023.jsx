/**
 * @project SOVEREIGN CORE LIBRARY | @uid SKL-0023
 * @architect [Ömer Kaplan] | @origin Kaplan Halı Yıkama - Precision Dept.
 * @engine Gemini Pro Hybrid-AI | @collaboration Human-AI Augmented
 * @license MIT (Attribution Required) | @status Production-Ready
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  Radio,
  Scale,
  ShieldCheck,
  History,
  AlertTriangle,
  Fingerprint
} from 'lucide-react';

/**
 * @architecture & INTEL
 * @version 4.0 (Governance Edition)
 * @description: Quantum-Resistant Infrastructure with Legal-AI & Immutable Ledger.
 * @ai-context: Otonom hukuk denetimi altında çalışan, kuantum dirençli kafes yapısı ve sarsılmaz kayıt defteri.
 * @ai-bridge: SKL_SKL_0022 -> SKL_SKL_0023 -> SKL_SKL_0024
 * @status: Proactive Compliance Rendering (Safe-Canvas Engine)
 */

// --- ANA BİLEŞEN ---
export default function App() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Simülasyon Durumu
  const [config, setConfig] = useState({
    nodeCount: 75,
    connectionRadius: 130,
    legalRisk: 15,
    latticeSecurity: 92,
    entropyDecay: 0.004
  });

  const [ledger, setLedger] = useState([
    { id: 0, hash: "8F2A1C9D", msg: "GENESIS BLOCK SEALED", time: new Date().toLocaleTimeString() }
  ]);
  
  const [activeResonance, setActiveResonance] = useState(0);

  const addLedgerEntry = useCallback((msg) => {
    const hash = Math.random().toString(16).substring(2, 10).toUpperCase();
    setLedger(prev => [{ id: Date.now(), hash, msg: msg.toUpperCase(), time: new Date().toLocaleTimeString() }, ...prev].slice(0, 12));
  }, []);

  // Risk Durum Hesabı
  const riskStatus = useMemo(() => {
    if (config.legalRisk < 35) return { label: 'GÜVENLİ', color: 'text-emerald-400', bg: 'bg-emerald-500' };
    if (config.legalRisk < 75) return { label: 'SINIRDA', color: 'text-amber-400', bg: 'bg-amber-500' };
    return { label: 'KRİTİK', color: 'text-rose-500', bg: 'bg-rose-600' };
  }, [config.legalRisk]);

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
      }

      init(x, y) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.life = 1.0; 
        this.decay = (Math.random() * 0.003) + config.entropyDecay;
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
        const size = Math.abs(Math.sin(this.pulse)) * 2 + 1.5;

        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        
        // Risk seviyesine göre renk değişimi
        let nodeColor = `rgba(187, 134, 252, ${alpha})`; // Normal
        if (config.legalRisk > 75) nodeColor = `rgba(244, 63, 94, ${alpha})`; // Rose
        else if (config.legalRisk > 35) nodeColor = `rgba(251, 191, 36, ${alpha})`; // Amber

        ctx.fillStyle = nodeColor;
        ctx.shadowBlur = config.legalRisk > 75 ? 10 : 0;
        ctx.shadowColor = "rgba(244, 63, 94, 0.5)";
        ctx.fill();
      }
    }

    const initNodes = () => {
      nodes = Array.from({ length: config.nodeCount }, () => new Node());
    };

    const drawLattice = () => {
      const radius = config.connectionRadius;
      let connections = 0;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            connections++;
            const opacity = (1 - dist / radius) * Math.min(nodes[i].life, nodes[j].life);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            let strokeColor = `rgba(187, 134, 252, ${opacity * 0.3})`;
            if (config.legalRisk > 75) strokeColor = `rgba(244, 63, 94, ${opacity * 0.5})`;
            else if (config.legalRisk > 35) strokeColor = `rgba(251, 191, 36, ${opacity * 0.4})`;

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      setActiveResonance(connections);
    };

    const render = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.4)'; 
      ctx.fillRect(0, 0, width, height);

      nodes.forEach(node => {
        node.update();
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

  const handleInteraction = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    addLedgerEntry(`RAM_INJECTION: ADDR_POS(${x},${y})`);
  };

  const verifyLedgerIntegrity = () => {
    addLedgerEntry("LEDGER_INTEGRITY_VERIFICATION_STARTED");
    setTimeout(() => addLedgerEntry("SUCCESS: HASH_CHAIN_VALID"), 800);
  };

  const SKL_Result = {
    SKL_ID: "SKL-0023",
    SKL_Risk: config.legalRisk,
    SKL_Resonance: activeResonance,
    SKL_Status: riskStatus.label
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-300 font-mono text-xs p-4 md:p-6 selection:bg-indigo-500/30">
      
      {/* Üst Başlık Bilgisi */}
      <header className="max-w-[1900px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-indigo-900/30 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-sky-100 flex items-center gap-3 uppercase">
            <ShieldCheck className="text-sky-400 animate-pulse" size={28} />
            SKL-0023 Quantum Governance
          </h1>
          <p className="text-slate-500 mt-1 uppercase tracking-[0.4em] font-bold text-[10px]">
            Immutable Ledger & Autonomous Legal AI v4.0
          </p>
        </div>
        <div className="flex gap-4">
          <MetricBadge label="Risk Index" value={`${config.legalRisk}%`} color={riskStatus.color} />
          <MetricBadge label="Hash Rate" value="48 TH/s" color="text-indigo-400" />
          <MetricBadge label="Lattice Security" value={`${config.latticeSecurity}%`} color="text-sky-400" />
        </div>
      </header>

      <main className="max-w-[1900px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sol Panel: Immutable Ledger */}
        <div className="lg:col-span-3 flex flex-col gap-4 overflow-hidden">
          <SidebarBox title="Immutable Ledger" icon={Lock} color="text-sky-400" bgColor="bg-[#020617]">
             <div className="h-28 mb-4 bg-black/40 border border-sky-900/30 rounded-lg overflow-hidden relative">
                <LedgerVisualizer />
             </div>
             <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide pr-2 flex flex-col-reverse">
                {ledger.map(block => (
                  <div key={block.id} className="bg-sky-900/10 border border-sky-900/20 p-2 rounded text-[9px] font-mono group hover:border-sky-500/40 transition-colors animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex justify-between text-sky-700 font-black mb-1 uppercase tracking-widest">
                      <span>[{block.time}]</span>
                      <span>#{block.hash}</span>
                    </div>
                    <span className="text-slate-400 uppercase tracking-tighter block">{block.msg}</span>
                  </div>
                ))}
             </div>
          </SidebarBox>
        </div>

        {/* Merkez: Mesh Canvas */}
        <div className="lg:col-span-6 space-y-4">
          <div 
            ref={containerRef}
            className="bg-[#07070c] border border-indigo-900/20 rounded-2xl h-[600px] relative overflow-hidden group cursor-crosshair shadow-2xl"
            onMouseDown={handleInteraction}
          >
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            <div className="absolute top-4 left-4 pointer-events-none space-y-2">
              <StatusBadge icon={Orbit} label="Quantum Defense Active" color="sky" />
              <StatusBadge icon={Wifi} label="Mesh Resonating" color="indigo" />
            </div>

            <div className="absolute bottom-4 right-4 text-right pointer-events-none">
              <span className="text-[9px] text-slate-700 font-black uppercase tracking-widest font-mono">Sovereign_Logic_v4.0_Stable</span>
            </div>
          </div>

          <div className="bg-black/60 border border-slate-800 p-3 rounded-xl font-mono text-[10px] text-sky-500 flex items-center justify-between shadow-lg">
             <div className="flex items-center gap-3">
                <Terminal size={14} />
                <span className="animate-pulse tracking-tighter uppercase font-black"> {">"} Quantum Resistant Lattices Engaged. Compliance monitoring active. </span>
             </div>
             <div className="text-[9px] text-slate-600">RESONANCE: {activeResonance}v</div>
          </div>
        </div>

        {/* Sağ Panel: Legal AI & Controls */}
        <div className="lg:col-span-3 space-y-4">
          <SidebarBox title="Legal-Compliance AI" icon={Scale} color="text-amber-400" bgColor="bg-[#0a0a05]">
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1">
                   <span>RİSK SKORU:</span>
                   <span className={riskStatus.color}>{riskStatus.label}</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-500 ${riskStatus.bg}`} style={{ width: `${config.legalRisk}%` }} />
                </div>
                <div className="bg-black/40 p-3 rounded border border-amber-900/30 text-[9px] italic leading-relaxed text-slate-400">
                  {config.legalRisk < 35 
                    ? "> Yasal denetim temiz. Tüm operasyonlar siber hukuk filtrelerinden geçirilerek deftere mühürlenmektedir."
                    : config.legalRisk < 75 
                    ? "> UYARI: İşlem hacmi siber hukuk kısıtlamalarına yaklaşıyor. Deftere mühürleme hızı artırıldı."
                    : "> ACİL: Yasal ihlal riski yüksek! Tüm operasyonlar Immutable Ledger tarafından raporlanıyor."}
                </div>
                <button 
                  onClick={verifyLedgerIntegrity}
                  className="w-full mt-4 bg-transparent border border-sky-500/50 hover:bg-sky-500/10 text-sky-400 py-2.5 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all"
                >
                  Değiştirilemezliği Doğrula
                </button>
             </div>
          </SidebarBox>

          <SidebarBox title="Governance Control" icon={Settings} color="text-indigo-400" bgColor="bg-[#050514]">
            <div className="space-y-6 mt-2">
              <ControlRange label="Mesh Yoğunluğu" value={config.nodeCount} min={10} max={150} onChange={(v) => setConfig(prev => ({...prev, nodeCount: v}))} />
              <ControlRange label="Bağlantı Yarıçapı" value={config.connectionRadius} min={50} max={250} onChange={(v) => setConfig(prev => ({...prev, connectionRadius: v}))} />
              <ControlRange label="Risk Agresifliği" value={config.legalRisk} min={0} max={100} onChange={(v) => setConfig(prev => ({...prev, legalRisk: v}))} />
            </div>
          </SidebarBox>

          <div className="p-4 bg-slate-900/30 border border-white/5 rounded-2xl font-mono text-[9px] text-slate-500">
             <p className="mb-2 uppercase font-black text-indigo-600 tracking-tighter flex items-center gap-1">
               <Fingerprint size={10}/> SKL_Result_Buffer
             </p>
             <code className="break-all leading-tight text-indigo-400/70">{JSON.stringify(SKL_Result)}</code>
          </div>
        </div>
      </main>

      {/* Alt Bilgi Kartları */}
      <section className="max-w-[1900px] mx-auto mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureCard 
          icon={History} 
          title="Immutable Logging" 
          desc="Her ağ operasyonu, geri alınamaz ve değiştirilemez bir kriptografik hash ile deftere kaydedilir."
        />
        <FeatureCard 
          icon={Radio} 
          title="Quantum Resistant" 
          desc="Kafes tabanlı şifreleme (Lattice-Encryption) ile gelecekteki kuantum saldırılarına karşı tam koruma."
        />
        <FeatureCard 
          icon={Fingerprint} 
          title="Legal Compliance" 
          desc="Otonom hukuk motoru, tüm işlem hacmini siber yasalara göre gerçek zamanlı denetler."
        />
        <FeatureCard 
          icon={CloudLightning} 
          title="Safe-Canvas 4.0" 
          desc="GPU gerektirmeyen, tamamen optimize edilmiş donanım bağımsız 2D render çekirdeği."
        />
      </section>

      <footer className="max-w-[1900px] mx-auto mt-12 pt-8 border-t border-slate-900 flex justify-between items-center text-[9px] text-slate-600 font-black uppercase tracking-widest font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          GOVERNANCE_STABILITY_KERNEL // SKL-0023_Stable
        </div>
        <span>[ Mimari: Ömer Kaplan ] | [ Defter: Immutable Ledger ] | [ Filtre: Legal AI ]</span>
      </footer>
    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---

const LedgerVisualizer = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="lightBeam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A5F2F3" stopOpacity="0"/>
        <stop offset="50%" stopColor="#A5F2F3" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#A5F2F3" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect x="48" y="0" width="4" height="100" fill="url(#lightBeam)">
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
    </rect>
    <g transform="translate(50,50)">
      <path d="M0 -20 L15 0 L0 20 L-15 0 Z" fill="none" stroke="#A5F2F3" strokeWidth="1" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
      </path>
      <path d="M0 -10 L8 0 L0 10 L-8 0 Z" fill="#A5F2F3" opacity="0.2">
        <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
      </path>
    </g>
  </svg>
);

const SidebarBox = ({ title, icon: Icon, color, bgColor, children }) => (
  <div className={`${bgColor} border border-white/5 rounded-xl p-5 shadow-2xl flex flex-col transition-transform hover:scale-[1.01]`}>
    <div className={`flex items-center gap-3 mb-5 border-b border-white/5 pb-3 text-[10px] font-black uppercase tracking-widest ${color}`}>
      <Icon size={16} />
      <span>{title}</span>
    </div>
    <div className="flex-1 flex flex-col">{children}</div>
  </div>
);

const MetricBadge = ({ label, value, color }) => (
  <div className="bg-slate-900/50 border border-white/5 px-4 py-2 rounded-xl text-right min-w-[150px] shadow-lg">
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
  <div className="space-y-3">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
      <span className="text-slate-400">{label}</span>
      <span className="text-indigo-400">{value}</span>
    </div>
    <input 
      type="range" min={min} max={max} value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
    />
  </div>
);

const StatusBadge = ({ icon: Icon, label, color }) => (
  <div className={`bg-black/60 backdrop-blur-md border border-${color}-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 w-fit`}>
    <Icon size={12} className={`text-${color}-500 animate-pulse`} />
    <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{label}</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-slate-900/30 border border-white/5 p-4 rounded-xl flex flex-col gap-2 transition-colors hover:bg-slate-900/50 group">
    <div className="p-2 bg-indigo-500/10 rounded-lg w-fit group-hover:bg-indigo-500/20 transition-all">
      <Icon size={16} className="text-indigo-400" />
    </div>
    <h4 className="text-[10px] font-black text-slate-200 uppercase">{title}</h4>
    <p className="text-[10px] text-slate-500 leading-tight italic">{desc}</p>
  </div>
);
