/**
 * SOVEREIGN CORE LIBRARY
 * @project: SIM-TO-REAL REALITY GAP LOGIC
 * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version: v4.0.0-ROBUST-CONTROL
 * @note: [PLUG-AND-PLAY]: Sıfır bağımlılık, Saf SVG/JS/Canvas mimarisi.
 * @description: Domain Randomization, 3D Trajectory Deviation ve Kontrol Torku Analizi.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- SOVEREIGN SVG ASSETS (Manual Vector Icons) ---
const Icons = {
  Crosshair: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
  ),
  Settings2: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
  ),
  Activity: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
  Cpu: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
  ),
  Database: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  ),
  WifiOff: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/></svg>
  ),
  Move3d: ({ size = 28, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M5 3v16h16"/><path d="m5 19 6-6"/><path d="m2 6 3-3 3 3"/><path d="m18 16 3 3-3 3"/></svg>
  ),
  AlertTriangle: ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  Zap: ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  )
};

// --- CHART COMPONENT (Sovereign Line Engine) ---
const SovereignLineChart = ({ idealData, realData, color }) => {
  const maxVal = 30;
  const minVal = -30;
  const range = maxVal - minVal;

  const getPoints = (data) => {
    return data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - minVal) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid Lines */}
      <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="0.5" />
      
      {/* Ideal Path */}
      <polyline points={getPoints(idealData)} fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />
      
      {/* Real Path */}
      <path d={`M 0,100 ${getPoints(realData)} L 100,100 Z`} fill="url(#chartGrad)" />
      <polyline points={getPoints(realData)} fill="none" stroke={color} strokeWidth="1.2" />
    </svg>
  );
};

// --- 3D Trajectory Deviation Visualizer (Canvas 3D Projection) ---
const TrajectoryDeviationVisualizer = ({ noiseLevel, latency, drFriction }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;

    const historyLength = 100;
    const simPath = [];
    const realPath = [];

    const draw = () => {
      time += 0.03;
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const idealX = Math.sin(time * 0.8) * 150;
      const idealY = Math.cos(time * 1.2) * 80;
      const idealZ = Math.sin(time * 0.5) * 100;

      const simPx = centerX + idealX - (idealZ * 0.3);
      const simPy = centerY + idealY + (idealZ * 0.2);

      simPath.push({ x: simPx, y: simPy });
      if (simPath.length > historyLength) simPath.shift();

      const delayedTime = time - (latency * 0.005);
      const rawRealX = Math.sin(delayedTime * 0.8) * 150;
      const rawRealY = Math.cos(delayedTime * 1.2) * 80;
      const rawRealZ = Math.sin(delayedTime * 0.5) * 100;

      const frictionDamping = 1 - (drFriction * 0.1);
      const noiseX = (Math.random() - 0.5) * noiseLevel * 40;
      const noiseY = (Math.random() - 0.5) * noiseLevel * 40;

      const realPx = centerX + (rawRealX * frictionDamping) - (rawRealZ * 0.3) + noiseX;
      const realPy = centerY + (rawRealY * frictionDamping) + (rawRealZ * 0.2) + noiseY;

      realPath.push({ x: realPx, y: realPy, simRefX: simPx, simRefY: simPy });
      if (realPath.length > historyLength) realPath.shift();

      ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
      ctx.lineWidth = 1;
      for(let i = -200; i <= 200; i+=40) {
        ctx.beginPath();
        ctx.moveTo(centerX + i - 100, centerY + 100 + (i*0.2));
        ctx.lineTo(centerX + i + 100, centerY - 100 + (i*0.2));
        ctx.stroke();
      }

      ctx.beginPath();
      for(let i=0; i<simPath.length; i++) {
        const pt = simPath[i];
        if (i===0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      for(let i=0; i<realPath.length; i++) {
        const pt = realPath[i];
        if (i===0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = noiseLevel > 0.6 ? '#ef4444' : '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.lineWidth = 0.5;
      for(let i=0; i<realPath.length; i+=5) {
        const pt = realPath[i];
        ctx.beginPath();
        ctx.moveTo(pt.simRefX, pt.simRefY);
        ctx.lineTo(pt.x, pt.y);
        const dist = Math.hypot(pt.x - pt.simRefX, pt.y - pt.simRefY);
        ctx.strokeStyle = dist > 20 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)';
        ctx.stroke();
      }

      const lastSim = simPath[simPath.length-1];
      if (lastSim) {
        ctx.beginPath(); ctx.arc(lastSim.x, lastSim.y, 4, 0, Math.PI*2);
        ctx.fillStyle = '#60a5fa'; ctx.fill();
      }

      const lastReal = realPath[realPath.length-1];
      if (lastReal) {
        ctx.beginPath(); ctx.arc(lastReal.x, lastReal.y, 5, 0, Math.PI*2);
        ctx.fillStyle = noiseLevel > 0.6 ? '#ef4444' : '#fbbf24';
        ctx.fill();
        ctx.shadowBlur = 10; ctx.shadowColor = ctx.fillStyle;
      }
      ctx.shadowBlur = 0;
      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [noiseLevel, latency, drFriction]);

  return <canvas ref={canvasRef} width={600} height={350} className="w-full h-full object-contain" />;
};

// --- Main Application Component ---
export default function App() {
  const [sensorNoise, setSensorNoise] = useState(0.3);
  const [latencyMs, setLatencyMs] = useState(12);
  const [drFriction, setDrFriction] = useState(0.5);
  
  const idealTorque = useMemo(() => Array.from({length: 40}, (_, i) => Math.sin(i * 0.2) * 20), []);
  const realTorque = useMemo(() => Array.from({length: 40}, (_, i) => {
    const base = Math.sin(i * 0.2) * 20;
    const disturbance = (Math.random() - 0.5) * (sensorNoise * 15);
    const phaseShift = Math.sin((i - (latencyMs/10)) * 0.2) * 20;
    return phaseShift + disturbance;
  }), [sensorNoise, latencyMs]);

  const gapPercent = (sensorNoise * 45) + (latencyMs * 1.5);
  const isGapCritical = gapPercent > 50;

  return (
    <div className="min-h-screen bg-[#050508] text-slate-300 font-mono text-xs p-6 selection:bg-emerald-500/30">
      
      {/* Header Segment */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-emerald-900/40 pb-4 mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3 tracking-tighter">
            <Icons.Move3d className="text-emerald-500" />
            SIM-TO-REAL <span className="text-emerald-500">LOGIC</span>
          </h1>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[10px] flex items-center gap-2">
            Domain Randomization & Robust Kinematics Transfer
            <span className="flex h-2 w-2 relative ml-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isGapCritical ? 'bg-red-400' : 'bg-emerald-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isGapCritical ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
            </span>
          </p>
        </div>
        <div className="flex gap-6">
          <MetricBadge label="Reality Gap" value={gapPercent.toFixed(1)} unit="%" color={isGapCritical ? "text-red-400" : "text-amber-400"} />
          <MetricBadge label="Control Freq" value="500" unit="Hz" color="text-emerald-400" />
          <MetricBadge label="Lyapunov" value="STABLE" unit="" color="text-indigo-400" />
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Domain Randomization & Noise */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Panel title="Domain Randomization (DR)" icon={Icons.Settings2}>
            <div className="flex-1 flex flex-col justify-center gap-5">
              <div>
                <div className="flex justify-between text-[10px] uppercase text-slate-400 mb-2">
                  <span>Friction Coefficient (μ ± σ)</span>
                  <span className="text-emerald-400 font-bold">{drFriction.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.05"
                  value={drFriction}
                  onChange={(e) => setDrFriction(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
              <div className="space-y-2 text-[10px]">
                 <DataRow label="Link Mass Variance" value="2.4 ± 0.3 kg" />
                 <DataRow label="Inertia Tensor Matrix" value="Randomized" highlight />
              </div>
            </div>
          </Panel>

          <Panel title="Sensor / Actuator Noise" icon={Icons.WifiOff}>
            <div className="flex-1 flex flex-col justify-center gap-5">
              <div>
                <div className="flex justify-between text-[10px] uppercase text-slate-400 mb-2">
                  <span>Stochastic Sensor Noise</span>
                  <span className={sensorNoise > 0.6 ? "text-red-400 font-bold" : "text-amber-400 font-bold"}>{(sensorNoise*100).toFixed(0)}%</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.05"
                  value={sensorNoise}
                  onChange={(e) => setSensorNoise(parseFloat(e.target.value))}
                  className={`w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer ${sensorNoise > 0.6 ? 'accent-red-500' : 'accent-amber-500'}`}
                />
              </div>
              <div>
                <div className="flex justify-between text-[10px] uppercase text-slate-400 mb-2">
                  <span>Actuator Latency (ms)</span>
                  <span className="text-emerald-400 font-bold">{latencyMs} ms</span>
                </div>
                <input 
                  type="range" min="0" max="50" step="1"
                  value={latencyMs}
                  onChange={(e) => setLatencyMs(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </Panel>
        </div>

        {/* Center Column: 3D Visualization */}
        <div className="lg:col-span-6 flex flex-col bg-[#080b0c] border border-emerald-900/30 rounded-xl overflow-hidden relative min-h-[350px]">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
            <div className="flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded border border-emerald-900/50 backdrop-blur-md w-fit">
              <Icons.Crosshair className="text-emerald-400" />
              <span className="uppercase text-[10px] text-slate-300 tracking-widest">Kinematic Trajectory Tracking</span>
            </div>
            <span className="text-[9px] text-slate-500 ml-1">
              Blue: Ideal Sim State | <span className={isGapCritical ? 'text-red-400' : 'text-amber-500'}>Real Hardware State</span>
            </span>
          </div>

          <TrajectoryDeviationVisualizer noiseLevel={sensorNoise} latency={latencyMs} drFriction={drFriction} />
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
             <div className="bg-black/60 backdrop-blur px-3 py-2 rounded border border-white/5 text-[9px] text-slate-400">
               <p>Model: 6-DoF Manipulator</p>
               <p>Physics Engine: MuJoCo Differentiable</p>
             </div>
             {isGapCritical && (
                <div className="flex items-center gap-2 bg-red-900/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded text-[10px] animate-pulse">
                  <Icons.AlertTriangle size={12} />
                  DIVERGENCE DETECTED
                </div>
             )}
          </div>
        </div>

        {/* Right Column: Control Theory & System ID */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Panel title="System Identification" icon={Icons.Database}>
             <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-2 text-[9px] mb-3">
                   <div className="bg-slate-900/50 p-2 rounded text-center border border-white/5">
                     <p className="text-slate-500 mb-1">Damping Coef</p>
                     <p className="text-emerald-400 font-bold">12.4 N·s/m</p>
                   </div>
                   <div className="bg-slate-900/50 p-2 rounded text-center border border-white/5">
                     <p className="text-slate-500 mb-1">Inertial Error</p>
                     <p className="text-amber-400 font-bold">± 4.2%</p>
                   </div>
                </div>
                <div className="space-y-2 mt-auto text-[10px]">
                   <div className="flex justify-between items-center">
                     <span className="text-slate-400">MSE Optimization</span>
                     <span className="text-white font-mono">Gradient Desc.</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-slate-400">Calibration State</span>
                     <span className="text-emerald-400 font-mono">Converged</span>
                   </div>
                </div>
             </div>
          </Panel>

          <Panel title="Robust Control Logic" icon={Icons.Cpu}>
             <div className="flex flex-col gap-3 h-full justify-center">
                <div className={`p-3 border rounded text-center transition-colors ${isGapCritical ? 'bg-red-950/20 border-red-900/40 text-red-400' : 'bg-emerald-950/20 border-emerald-900/30 text-emerald-400'}`}>
                   <span className="text-[9px] uppercase block mb-1">PID + MPC Effort</span>
                   <span className="text-sm font-bold text-white">τ_max = 48.5 N·m</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-relaxed text-justify">
                  Beklenmedik dış kuvvetlere (Disturbances) ve {latencyMs}ms aktüatör gecikmesine karşı Lyapunov kararlılık sınırları içerisinde telafi torku uygulanmaktadır.
                </p>
             </div>
          </Panel>
        </div>
      </div>

      {/* Bottom Chart: Torque & Control Response */}
      <div className="mt-6 bg-[#080b0c] border border-emerald-900/30 rounded-xl p-4 h-[220px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Icons.Activity size={14} /> Control Loop Disturbance Tracking (N·m)
          </h3>
          <span className="text-[9px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Sampling: 500 Hz</span>
        </div>
        <div className="h-[140px] relative">
          <SovereignLineChart 
            idealData={idealTorque} 
            realData={realTorque} 
            color={sensorNoise > 0.6 ? '#ef4444' : '#f59e0b'} 
          />
          <div className="absolute top-0 right-0 flex gap-4 text-[9px]">
            <span className="flex items-center gap-1 text-blue-400"><div className="w-2 h-0.5 bg-blue-400 border border-blue-400 border-dashed"></div> IDEAL</span>
            <span className="flex items-center gap-1 text-amber-500"><div className="w-2 h-0.5 bg-amber-500"></div> REAL</span>
          </div>
        </div>
      </div>

    </div>
  );
}

// --- UI Helper Components ---
const Panel = ({ title, icon: Icon, children }) => (
  <div className="bg-slate-900/20 border border-emerald-900/30 rounded-xl p-4 flex-1 flex flex-col">
    <div className="flex items-center gap-2 border-b border-emerald-900/30 pb-2 mb-4">
      <Icon className="text-emerald-600" />
      <h2 className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">{title}</h2>
    </div>
    <div className="flex-1 flex flex-col">{children}</div>
  </div>
);

const MetricBadge = ({ label, value, unit, color }) => (
  <div className="text-right">
    <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">{label}</p>
    <div className="flex items-baseline justify-end gap-1">
      <span className={`text-xl font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-slate-600 font-mono">{unit}</span>
    </div>
  </div>
);

const DataRow = ({ label, value, highlight }) => (
  <div className="flex justify-between border-b border-white/5 pb-1 mb-1">
    <span className="text-slate-500">{label}</span>
    <span className={`font-mono ${highlight ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>{value}</span>
  </div>
);
