/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- PURE SVG ICONS (SCL STANDART) ---
const Icons = {
  Layers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Activity: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Zap: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Cpu: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>,
  Binary: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><path d="M7 7h1v10H7zM11 7h1v10h-1zM15 7h1v10h-1z"/></svg>,
  Box: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  Career: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Shield: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Alert: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>,
  Brain: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54z"/></svg>,
  Network: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1-1v3M12 12V8"/></svg>,
  Target: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Database: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>,
  Heart: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
};

// --- 3D COGNITIVE MANIFOLD VISUALIZER (CANVAS ENGINE) ---
const CognitiveManifoldVisualizer = ({ gFactor }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;

    const domains = [
      { color: '#06b6d4', baseRadius: 100, angleOffset: 0, label: 'MATH' },
      { color: '#8b5cf6', baseRadius: 100, angleOffset: Math.PI / 2, label: 'LANG' },
      { color: '#10b981', baseRadius: 100, angleOffset: Math.PI, label: 'SPATIAL' },
      { color: '#f59e0b', baseRadius: 100, angleOffset: Math.PI * 1.5, label: 'SOCIAL' }
    ];

    const particles = [];
    for (let i = 0; i < 180; i++) {
      particles.push({
        domain: i % 4,
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
        speed: Math.random() * 0.02 + 0.005
      });
    }

    const draw = () => {
      time += 0.015;
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const rotY = time * 0.4;
      const rotX = Math.sin(time * 0.15) * 0.2;
      const manifoldCompression = 1.0 - (gFactor * 0.85);

      const project = (x, y, z) => {
        const px = x * Math.cos(rotY) - z * Math.sin(rotY);
        const pz = x * Math.sin(rotY) + z * Math.cos(rotY);
        const py = y * Math.cos(rotX) - pz * Math.sin(rotX);
        const scale = 250 / (250 + pz);
        return { x: cx + px * scale, y: cy + py * scale, scale, z: pz };
      };

      // Draw Center Core
      ctx.beginPath();
      ctx.arc(cx, cy, 10 * gFactor * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${gFactor * 0.6})`;
      ctx.shadowBlur = 20 * gFactor;
      ctx.shadowColor = '#ffffff';
      ctx.fill();
      ctx.shadowBlur = 0;

      const domainCenters = domains.map(d => {
        const currentRadius = d.baseRadius * manifoldCompression;
        const dx = Math.cos(d.angleOffset + time * 0.15) * currentRadius;
        const dz = Math.sin(d.angleOffset + time * 0.15) * currentRadius;
        return project(dx, (Math.sin(time + d.angleOffset) * 25 * manifoldCompression), dz);
      });

      // Connections
      ctx.lineWidth = 0.5;
      domainCenters.forEach((dc, i) => {
        ctx.beginPath();
        ctx.moveTo(dc.x, dc.y);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = `rgba(255, 255, 255, ${gFactor * 0.25})`;
        ctx.stroke();
      });

      // Particles
      particles.forEach(p => {
        const dc = domainCenters[p.domain];
        const pull = gFactor * 0.85;
        const lx = p.x * 30 * manifoldCompression;
        const ly = p.y * 30 * manifoldCompression;
        const gx = dc.x + lx * (1 - pull) + (cx - dc.x) * pull * Math.abs(p.x);
        const gy = dc.y + ly * (1 - pull) + (cy - dc.y) * pull * Math.abs(p.y);

        ctx.beginPath();
        ctx.arc(gx, gy, 1.2 * dc.scale, 0, Math.PI * 2);
        ctx.fillStyle = domains[p.domain].color;
        ctx.globalAlpha = 0.4 + (gFactor * 0.5);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        p.x = p.x * Math.cos(p.speed) - p.z * Math.sin(p.speed);
        p.z = p.x * Math.sin(p.speed) + p.z * Math.cos(p.speed);
      });

      domainCenters.forEach((dc, i) => {
        ctx.fillStyle = domains[i].color;
        ctx.font = "8px 'SF Mono'";
        ctx.fillText(domains[i].label, dc.x + 8, dc.y - 8);
      });

      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [gFactor]);

  return <canvas ref={canvasRef} width={600} height={350} className="w-full h-full object-contain bg-transparent" />;
};

// --- RELATIONAL FIELD VISUALIZER (ATTACHMENT V13.5 ENGINE) ---
const RelationalFieldVisualizer = ({ config, stressActive }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    const nodes = Array.from({ length: 20 }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 350,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }));

    const draw = () => {
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, w, h);

      // Secure Base Circle
      const secureRadius = 60 + (config.consistency * 120);
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, secureRadius);
      grad.addColorStop(0, 'rgba(34, 197, 94, 0.15)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, secureRadius, 0, Math.PI * 2);
      ctx.fill();

      // Node Physics (Banned Logic / Branchless)
      const pullForce = (config.proximity * 0.12) - (config.rejection * 0.05);
      const stressMultiplier = 1 + (stressActive * 3);
      
      nodes.forEach((node, i) => {
        const dx = cx - node.x;
        const dy = cy - node.y;
        const dist = Math.hypot(dx, dy);
        
        const force = (pullForce * stressMultiplier);
        node.vx += (dx / dist) * force;
        node.vy += (dy / dist) * force;
        node.vx *= 0.95;
        node.vy *= 0.95;
        node.x += node.vx;
        node.y += node.vy;

        // Draw Vector Link
        if (i % 3 === 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + (1 - config.rejection) * 0.1})`;
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = dist < secureRadius ? '#22c55e' : (stressActive ? '#f85149' : '#e5e4e2');
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [config, stressActive]);

  return <canvas ref={canvasRef} className="w-full h-full bg-transparent" />;
};

const App = () => {
  const [activeTab, setActiveTab] = useState('ACTIVATION');
  const [selectedFunc, setSelectedFunc] = useState('ReLU');
  const [range, setRange] = useState(5);
  const [overfitEpoch, setOverfitEpoch] = useState(60);
  const [overfitConfig, setOverfitConfig] = useState({ complexity: 5, lambda: 0.1, noise: 0.5 });
  const [agiGFactor, setAgiGFactor] = useState(0.2);
  const [computeBudget, setComputeBudget] = useState(1);
  const [attachConfig, setAttachConfig] = useState({ consistency: 0.85, proximity: 0.60, rejection: 0.30 });
  const [stressActive, setStressActive] = useState(0);

  // --- ATTACHMENT LOGIC ENGINE (V13.5 BRANCHLESS) ---
  const attachResult = useMemo(() => {
    const { consistency, proximity, rejection } = attachConfig;
    const stressMask = -( (stressActive | 0) );
    
    const pResp = consistency * (1 - (rejection * 0.25));
    const secureScore = Math.max(0, Math.min(1.0, pResp * (1 - rejection)));
    const anxiousScore = Math.max(0, Math.min(1.0, (1 - consistency) * proximity * 1.6));
    const avoidantScore = Math.max(0, Math.min(1.0, (1 - pResp) * (1 - proximity)));
    
    const stability = (secureScore * 0.8) + ((1 - anxiousScore) * 0.2);
    const autonomy = (secureScore * 0.7) + (avoidantScore * 0.5);
    
    const baseRecovery = 120 - (secureScore * 90);
    const recoveryVal = ( (baseRecovery + anxiousScore * 240) & stressMask ) | ( baseRecovery & ~stressMask );
    
    return { pResp, secureScore, anxiousScore, avoidantScore, stability, autonomy, recoveryVal };
  }, [attachConfig, stressActive]);

  // --- AGI LOGIC ENGINE ---
  const agiResult = useMemo(() => {
    const inDistAcc = 0.95;
    const algComplexity = 2.0;
    const oodPerformance = inDistAcc * Math.exp(-algComplexity * (1.0 - (agiGFactor * 0.85)));
    const system2Acc = computeBudget <= 1 
      ? oodPerformance 
      : Math.min(0.99, oodPerformance + (0.4 * Math.log2(computeBudget) * (1 - oodPerformance)));
    
    const chartPoints = [
      { l: 'In-Dist', v: inDistAcc * 100 },
      { l: 'Near-OOD', v: (inDistAcc * 0.8 + agiGFactor * 20) },
      { l: 'Far-OOD', v: system2Acc * 100 },
      { l: 'Novel', v: (system2Acc * 50 + agiGFactor * 50) }
    ];

    return { oodPerformance, system2Acc, chartPoints, isAGI: agiGFactor >= 0.8 };
  }, [agiGFactor, computeBudget]);

  // --- KAPLAN LOGIC: BRANCHLESS ACTIVATION CORE ---
  const activationCore = useMemo(() => ({
    ReLU: {
      fn: (x) => Math.max(0, x),
      deriv: (x) => +(x > 0),
      desc: "Negatif girdileri sıfırlayarak seyreklik sağlar.",
      range: "[0, ∞)", cost: "Low", zero: "No"
    },
    Sigmoid: {
      fn: (x) => 1 / (1 + Math.exp(-x)),
      deriv: (x) => { const s = 1 / (1 + Math.exp(-x)); return s * (1 - s); },
      desc: "Sinyali [0,1] aralığına sıkıştırır. Doygunluk riski yüksektir.",
      range: "[0, 1]", cost: "High", zero: "No"
    },
    Tanh: {
      fn: (x) => Math.tanh(x),
      deriv: (x) => 1 - Math.pow(Math.tanh(x), 2),
      desc: "Sıfır merkezli çıktı üretir, öğrenmeyi stabilize eder.",
      range: "[-1, 1]", cost: "High", zero: "Yes"
    },
    LeakyReLU: {
      fn: (x) => (+(x > 0) * x) + (+(x <= 0) * 0.01 * x),
      deriv: (x) => (+(x > 0) * 1) + (+(x <= 0) * 0.01),
      desc: "Negatif bölgede küçük bir eğim bırakarak ölümü engeller.",
      range: "(-∞, ∞)", cost: "Mid", zero: "Partial"
    }
  }), []);

  // --- OVERFIT LOGIC ENGINE ---
  const overfitResult = useMemo(() => {
    const { complexity, lambda, noise } = overfitConfig;
    const learningCurve = [];
    const overfitPt = Math.max(20, Math.floor(100 - (complexity * 5)));
    for (let i = 0; i <= overfitEpoch; i++) {
      const trainLoss = (100 / (i + 5)) + (Math.random() * 0.5);
      const overfitMask = +(i >= overfitPt);
      const normalVal = (110 / (i + 5)) + (Math.random() * 1.5) + (noise * 2);
      const gapFactor = (i - overfitPt) * (complexity * 0.05) / (lambda + 0.1);
      const overfitVal = (110 / (overfitPt + 5)) + gapFactor + (Math.random() * 2);
      const valLoss = (1 - overfitMask) * normalVal + overfitMask * overfitVal;
      learningCurve.push({ t: i, train: trainLoss, val: valLoss, gap: Math.abs(valLoss - trainLoss) });
    }
    const curr = learningCurve[learningCurve.length - 1];
    return { learningCurve, gap: curr.gap.toFixed(3), integrity: Math.max(0, 100 - (curr.gap * 5)).toFixed(1), variance: (curr.gap * complexity * 2).toFixed(1), overfitPt };
  }, [overfitConfig, overfitEpoch]);

  const chartData = useMemo(() => {
    const points = [];
    const core = activationCore[selectedFunc];
    for (let x = -range; x <= range; x += (range * 2 / 50)) {
      points.push({ x, y: core.fn(x), dy: core.deriv(x) });
    }
    return points;
  }, [selectedFunc, range, activationCore]);

  const metrics = useMemo(() => {
    const grads = chartData.map(d => d.dy);
    const saturation = (grads.filter(g => Math.abs(g) < 0.01).length / chartData.length) * 100;
    const avgGrad = grads.reduce((a, b) => a + b, 0) / grads.length;
    return { saturation, avgGrad, stability: (100 - saturation * 0.7).toFixed(1) };
  }, [chartData]);

  // --- VANILLA CSS (GSS) ---
  const gss = `
    .scl-root {
      --bg: #010204; --panel: #0a0c10; --gold: #facc15; --blue: #3b82f6; --emerald: #10b981; --red: #f85149; --purple: #8b5cf6; --cyan: #06b6d4;
      --border: rgba(255, 255, 255, 0.05); --text: #c9d1d9; --text-dim: #484f58;
      background: var(--bg); color: var(--text); font-family: 'SF Mono', monospace; min-height: 100vh; padding: 30px;
    }
    header { max-width: 1250px; margin: 0 auto 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 20px; }
    .scl-nav { display: flex; background: var(--panel); padding: 4px; border-radius: 8px; border: 1px solid var(--border); gap: 4px; }
    .scl-nav-btn { padding: 10px 14px; font-size: 9px; font-weight: 900; text-transform: uppercase; cursor: pointer; border: none; background: transparent; color: var(--text-dim); border-radius: 6px; transition: all 0.3s; }
    .scl-nav-btn.active { background: var(--blue); color: #fff; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); }
    .scl-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; max-width: 1250px; margin: 0 auto; }
    .scl-card { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 24px; position: relative; }
    .col-4 { grid-column: span 4; } .col-8 { grid-column: span 8; } .col-3 { grid-column: span 3; } .col-6 { grid-column: span 6; } .col-12 { grid-column: span 12; }
    .scl-label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: var(--gold); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
    .manifold-wrap { width: 100%; height: 350px; background: #000; border-radius: 8px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
    .scl-range { width: 100%; appearance: none; height: 4px; background: #161b22; border-radius: 2px; accent-color: var(--blue); cursor: pointer; }
    .stat-pill { background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 12px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .stat-val { font-size: 14px; font-weight: 900; color: #fff; }
    .stat-lbl { font-size: 8px; color: var(--text-dim); text-transform: uppercase; }
    .btn-stress { border: 1px solid var(--red); color: var(--red); background: rgba(248, 81, 73, 0.05); }
    .btn-stress.active { background: var(--red); color: #000; box-shadow: 0 0 15px var(--red); }
  `;

  return (
    <div className="scl-root">
      <style>{gss}</style>
      
      <header>
        <div>
          <h1 style={{fontSize:'22px', fontWeight:900, display:'flex', alignItems:'center', gap:'12px'}}>
            <span style={{color: activeTab === 'ATTACHMENT' ? 'var(--emerald)' : (agiResult.isAGI ? 'var(--emerald)' : 'var(--blue)')}}>
              {activeTab === 'ATTACHMENT' ? <Icons.Heart /> : <Icons.Brain />}
            </span>
            MÜHENDİS KONTROL MERKEZİ v4.8.0
          </h1>
          <div style={{fontSize:'9px', color:'var(--text-dim)', letterSpacing:'3px', textTransform:'uppercase', marginTop:'4px'}}>
            {activeTab === 'ATTACHMENT' ? 'Relational Internal Working Models & Strange Situation' : 'Precision Model Management & Cognitive Diagnostics'}
          </div>
        </div>
        <nav className="scl-nav">
          {['ACTIVATION', 'MODEL', 'OVERFIT', 'AGI', 'ATTACHMENT'].map(t => (
            <button key={t} className={`scl-nav-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </nav>
      </header>

      <main className="scl-grid">
        {activeTab === 'ATTACHMENT' && (
          <>
            <aside className="col-4 space-y-4" style={{display:'flex', flexDirection:'column', gap:'15px'}}>
              <div className="scl-card">
                <div className="scl-label"><Icons.Settings /> Relational Controls</div>
                <div className="space-y-6" style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                  <div>
                    <label className="stat-lbl">Consistency: {(attachConfig.consistency * 100).toFixed(0)}%</label>
                    <input type="range" className="scl-range" min="0" max="1" step="0.05" value={attachConfig.consistency} onChange={e => setAttachConfig({...attachConfig, consistency: +e.target.value})} />
                  </div>
                  <div>
                    <label className="stat-lbl">Proximity Drive: {(attachConfig.proximity * 100).toFixed(0)}%</label>
                    <input type="range" className="scl-range" min="0" max="1" step="0.05" value={attachConfig.proximity} onChange={e => setAttachConfig({...attachConfig, proximity: +e.target.value})} />
                  </div>
                  <div>
                    <label className="stat-lbl">Rejection Sens: {(attachConfig.rejection * 100).toFixed(0)}%</label>
                    <input type="range" className="scl-range" min="0" max="1" step="0.05" value={attachConfig.rejection} onChange={e => setAttachConfig({...attachConfig, rejection: +e.target.value})} style={{accentColor:'var(--red)'}} />
                  </div>
                </div>
              </div>

              <div className="scl-card">
                <div className="scl-label">Attachment Metrics</div>
                <div className="stat-pill"><span className="stat-lbl">Secure Zone</span><span className="stat-val" style={{color:'var(--emerald)'}}>%{(attachResult.secureScore * 100).toFixed(1)}</span></div>
                <div className="stat-pill" style={{marginTop:'10px'}}><span className="stat-lbl">Hiper-aktivasyon</span><span className="stat-val" style={{color:'var(--purple)'}}>%{(attachResult.anxiousScore * 100).toFixed(1)}</span></div>
                <div className="stat-pill" style={{marginTop:'10px'}}><span className="stat-lbl">Deaktivasyon</span><span className="stat-val" style={{color:'var(--cyan)'}}>%{(attachResult.avoidantScore * 100).toFixed(1)}</span></div>
              </div>

              <button 
                className={`scl-nav-btn btn-stress ${stressActive ? 'active' : ''}`}
                style={{width:'100%', padding:'15px'}}
                onClick={() => setStressActive(stressActive ^ 1)}
              >
                {stressActive ? 'REGULATING...' : 'STRANGE SITUATION (STRESS TEST)'}
              </button>
            </aside>

            <section className="col-8 space-y-4">
              <div className="manifold-wrap" style={{height:'350px'}}>
                <div style={{position:'absolute', top:15, left:15, zIndex:5, fontSize:'8px', color:'var(--emerald)', background:'rgba(0,0,0,0.7)', padding:'5px', border:'1px solid var(--border)'}}>
                  INTERNAL_WORKING_MODEL_FIELD_V13.5
                </div>
                <RelationalFieldVisualizer config={attachConfig} stressActive={stressActive} />
                <div style={{position:'absolute', bottom:15, right:15, fontSize:'8px', fontWeight:900, color: 'var(--blue)', background:'rgba(0,0,0,0.5)', padding:'5px'}}>
                   STABILITY: {attachResult.stability.toFixed(2)} | RECOVERY: {Math.round(attachResult.recoveryVal)}s
                </div>
              </div>

              <div className="scl-card" style={{padding:'20px'}}>
                <div className="scl-label" style={{margin:0, marginBottom:'15px'}}><Icons.Binary /> Hermetic Partition Monitor</div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(32, 1fr)', gap:'2px'}}>
                  {Array.from({length: 128}).map((_, i) => {
                    const rnd = Math.random();
                    const isSec = rnd < attachResult.secureScore;
                    const isAnx = !isSec && rnd < (attachResult.secureScore + attachResult.anxiousScore);
                    return (
                      <div 
                        key={i} 
                        style={{
                          aspectRatio:'1', 
                          background: isSec ? 'var(--emerald)' : (isAnx ? 'var(--purple)' : 'var(--cyan)'),
                          opacity: 0.6 + Math.random() * 0.4,
                          borderRadius:'1px'
                        }} 
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {/* MIRAS TABS: AGI / ACTIVATION / OVERFIT / MODEL */}
        {activeTab === 'AGI' && (
          <>
            <aside className="col-3 space-y-4" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              <div className="scl-card">
                <div className="scl-label"><Icons.Activity /> Cognitive Evolution</div>
                <div className="space-y-6" style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                   <div>
                    <label className="stat-lbl">g-Factor: {agiGFactor.toFixed(2)}</label>
                    <input type="range" className="scl-range" min="0.05" max="1.0" step="0.05" value={agiGFactor} onChange={e => setAgiGFactor(+e.target.value)} />
                   </div>
                   <div>
                    <label className="stat-lbl">Search Depth (S2): {computeBudget}x</label>
                    <input type="range" className="scl-range" min="1" max="64" value={computeBudget} onChange={e => setComputeBudget(+e.target.value)} />
                   </div>
                </div>
              </div>
              <div className="scl-card">
                <div className="scl-label">AGI Status</div>
                <div className="stat-pill"><span className="stat-lbl">Manifold</span><span className="stat-val" style={{fontSize:'10px'}}>{agiResult.isAGI ? 'SINGULAR' : 'FRAGMENTED'}</span></div>
                <div className="stat-pill" style={{marginTop:'10px'}}><span className="stat-lbl">Robustness</span><span className="stat-val" style={{color:'var(--blue)'}}>{(agiResult.system2Acc * 100).toFixed(1)}%</span></div>
              </div>
            </aside>
            <section className="col-6 space-y-4">
              <div className="manifold-wrap" style={{height:'350px'}}>
                <CognitiveManifoldVisualizer gFactor={agiGFactor} />
              </div>
              <div className="scl-card" style={{height:'180px', padding:0, overflow:'hidden'}}>
                <div style={{padding:'15px', borderBottom:'1px solid var(--border)'}}><div className="scl-label" style={{margin:0}}><Icons.Target /> OOD Performance Envelope</div></div>
                <div style={{height:'100px', position:'relative', padding:'10px 20px'}}>
                   <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <path d={`M 0 100 ${agiResult.chartPoints.map((p, i) => `L ${i * 133} ${100 - p.v}`).join(' ')}`} fill="none" stroke={agiResult.isAGI ? 'var(--emerald)' : 'var(--purple)'} strokeWidth="2" />
                      {agiResult.chartPoints.map((p, i) => <circle key={i} cx={i * 133} cy={100 - p.v} r="3" fill="#fff" />)}
                   </svg>
                </div>
              </div>
            </section>
            <aside className="col-3 space-y-4">
              <div className="scl-card"><div className="scl-label"><Icons.Database /> Efficiency Gap</div><div className="stat-pill"><span className="stat-lbl">Few-Shot</span><span className="stat-val" style={{fontSize:'11px', color:'var(--emerald)'}}>1:10^2</span></div></div>
            </aside>
          </>
        )}

        {activeTab === 'OVERFIT' && (
          <>
            <aside className="col-4 space-y-4">
              <div className="scl-card">
                <div className="scl-label"><Icons.Settings /> Kapasite Denetimi</div>
                <div><label className="stat-lbl">Epok: {overfitEpoch}</label><input type="range" className="scl-range" min="10" max="150" value={overfitEpoch} onChange={e => setOverfitEpoch(+e.target.value)} /></div>
              </div>
              <div className="scl-card"><div className="scl-label">Genelleme Analizi</div><div className="stat-pill"><span className="stat-lbl">Bütünlük</span><span className="stat-val" style={{color: overfitResult.integrity > 70 ? 'var(--emerald)' : 'var(--red)'}}>{overfitResult.integrity}%</span></div></div>
            </aside>
            <section className="col-8 space-y-4">
              <div className="manifold-wrap">
                <svg width="100%" height="100%" viewBox="0 0 400 300" className="manifold-svg">
                  <path d={`M 40 ${260 - overfitResult.learningCurve[0].train * 2} ${overfitResult.learningCurve.map((p, i) => `L ${40 + (i/overfitEpoch)*320} ${260 - p.train * 2}`).join(' ')}`} fill="none" stroke="var(--emerald)" strokeWidth="2" />
                  <path d={`M 40 ${260 - overfitResult.learningCurve[0].val * 2} ${overfitResult.learningCurve.map((p, i) => `L ${40 + (i/overfitEpoch)*320} ${260 - p.val * 2}`).join(' ')}`} fill="none" stroke="var(--red)" strokeWidth="2" />
                </svg>
              </div>
            </section>
          </>
        )}

        {activeTab === 'ACTIVATION' && (
          <>
            <aside className="col-4 space-y-4">
              <div className="scl-card">
                <div className="scl-label"><Icons.Layers /> Fonksiyon Karakterizasyonu</div>
                {Object.keys(activationCore).map(key => (
                  <button key={key} className={`func-btn ${selectedFunc === key ? 'active' : ''}`} style={{width:'100%', padding:'10px', fontSize:'10px', border:'1px solid var(--border)', background:'#111', color:'#888', textAlign:'left', marginBottom:'5px', borderRadius:'6px'}} onClick={() => setSelectedFunc(key)}>{key}</button>
                ))}
              </div>
            </aside>
            <section className="col-8 space-y-4">
              <div className="manifold-wrap">
                <svg width="400" height="300" viewBox="0 0 200 150" className="manifold-svg">
                  <path d={`M 20 120 Q 100 ${120 - metrics.avgGrad * 100} 180 120`} stroke="var(--blue)" strokeWidth="4" fill="none" />
                </svg>
              </div>
            </section>
          </>
        )}

        {activeTab === 'MODEL' && (
          <div className="col-12 scl-card">
            <div className="scl-label"><Icons.Box /> Faz Uzayı Analizi</div>
            <div className="manifold-wrap" style={{height:'400px'}}>
              <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                <line x1="0" y1="100" x2="400" y2="100" stroke="#111" strokeWidth="1" />
                <text x="200" y="110" textAnchor="middle" fill="#222" fontSize="10" fontWeight="900">STATE_SPACE_ENGINE_ACTIVE</text>
              </svg>
            </div>
          </div>
        )}
      </main>

      <footer style={{maxWidth:'1250px', margin:'40px auto 0', display:'flex', justifyContent:'space-between', fontSize:'9px', color:'var(--text-dim)', textTransform:'uppercase', letterSpacing:'3px', borderTop:'1px solid var(--border)', paddingTop:'20px'}}>
        <div>Engine: {activeTab === 'ATTACHMENT' ? 'Attach_Logic_v13.5_Hermetic' : 'AGI_Logic_v1.0'} // Logic: Branchless</div>
        <div>KAPLAN HALI YIKAMA - PRECISION DEPT. | SOVEREIGN CORE v4.8.0</div>
      </footer>
    </div>
  );
};

export default App;
