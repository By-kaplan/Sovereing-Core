/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';

const App = () => {
  // --- KAPLAN LOGIC: STATE VE KONFİGÜRASYON ---
  const [config, setConfig] = useState({
    age: 24,
    stimuli: 0.75,
    isLocked: false,
    criticalMode: false
  });
  
  const [metrics, setMetrics] = useState({
    vocab: 0,
    mlu: 0,
    myelin: 0,
    latency: 0,
    syntax: 0
  });

  const [logs, setLogs] = useState(["V13.5: Hermetik katman mühürlendi."]);
  const canvasRef = useRef(null);
  const frameId = useRef(0);
  const cycle = useRef(0);

  // --- MÜHENDİSLİK HESAPLAMALARI (DALLANMASIZ / BRANCHLESS LOGIC) ---
  const calculatedMetrics = useMemo(() => {
    const { age, stimuli, criticalMode } = config;
    
    // Maskeleme Mantığı: criticalMode ? 1.95 : 1.15
    // JS'de true=1, false=0 kuralı üzerinden dallanmasız katsayı hesabı:
    const modeMask = (+criticalMode); 
    const plastisiteKatsayisi = 1.15 + (modeMask * 0.80);
    
    const spurtEtkisi = Math.exp(-(Math.pow(age - 22, 2) / 45));
    
    // Dil Edinim Diferansiyel Denklemleri (SCL Standart)
    const vocabBase = Math.pow(age, 2.15) * (stimuli + 0.35);
    const vocabFinal = Math.floor(vocabBase * plastisiteKatsayisi * (1 + (spurtEtkisi * 0.7)));
    
    const mlu = Math.max(1.0, (age / 11.2) * (stimuli * 1.35));
    const myelin = Math.min(1.0, (age / 60) * 0.99);
    const latency = 150 - (myelin * 120);
    const syntax = (mlu * 0.65) + (myelin * 0.35);

    return { vocab: vocabFinal, mlu, myelin, latency, syntax };
  }, [config]);

  useEffect(() => {
    setMetrics(calculatedMetrics);
  }, [calculatedMetrics]);

  // --- PURE CANVAS RENDERING (ULTRA-MODERN NEURAL FLOW) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const renderLoop = () => {
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      
      // Kilitli değilse bile arka planda hafif bir akış devam eder (Modernize edilmiş görsel)
      const speedMultiplier = config.isLocked ? 1.0 : 0.15;
      cycle.current += 0.4 * speedMultiplier;

      ctx.clearRect(0, 0, w, h);

      // Scanline Efekti (Digital-Grid)
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.03)';
      ctx.lineWidth = 1;
      for(let i = 0; i < w; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }
      for(let j = 0; j < h; j += 30) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
      }

      const nodeL = { x: w * 0.28, y: h * 0.48 }; // Broca
      const nodeR = { x: w * 0.72, y: h * 0.52 }; // Wernicke
      const myelin = calculatedMetrics.myelin;

      // Arcuate Fasciculus (Gelişmiş Beyaz Madde Yolu)
      const gradient = ctx.createLinearGradient(nodeR.x, nodeR.y, nodeL.x, nodeL.y);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
      gradient.addColorStop(0.5, `rgba(250, 204, 21, ${0.1 + myelin * 0.6})`);
      gradient.addColorStop(1, 'rgba(248, 81, 73, 0.2)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5 + myelin * 8;
      ctx.setLineDash([20, 10]);
      ctx.lineDashOffset = -cycle.current * 1.5;
      
      ctx.beginPath();
      ctx.moveTo(nodeR.x, nodeR.y);
      ctx.bezierCurveTo(w * 0.55, h * 0.05, w * 0.45, h * 0.05, nodeL.x, nodeL.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Partikül Akışı (Neural Spikes)
      const particleCount = Math.floor(5 + myelin * 15);
      for (let i = 0; i < particleCount; i++) {
        const t = ((cycle.current + i * (300 / particleCount)) % 300) / 300;
        const cx = Math.pow(1-t,3)*nodeR.x + 3*Math.pow(1-t,2)*t*(w*0.55) + 3*(1-t)*Math.pow(t,2)*(w*0.45) + Math.pow(t,3)*nodeL.x;
        const cy = Math.pow(1-t,3)*nodeR.y + 3*Math.pow(1-t,2)*t*(h*0.05) + 3*(1-t)*Math.pow(t,2)*(h*0.05) + Math.pow(t,3)*nodeL.y;

        ctx.fillStyle = i % 2 === 0 ? '#facc15' : '#06b6d4';
        ctx.shadowBlur = config.isLocked ? 15 : 2;
        ctx.shadowColor = ctx.fillStyle;
        
        ctx.beginPath();
        ctx.arc(cx, cy, 1.2 + myelin * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Bölge Işımaları (GSS Entegrasyonu)
      const drawGlow = (x, y, color, r, intensity) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, color.replace('1)', `${intensity})`));
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      };

      const pulse = 1 + Math.sin(cycle.current * 0.05) * 0.1;
      drawGlow(nodeL.x, nodeL.y, 'rgba(248, 81, 73, 1)', (45 + myelin * 35) * pulse, 0.25);
      drawGlow(nodeR.x, nodeR.y, 'rgba(6, 182, 212, 1)', (50 + myelin * 30) * pulse, 0.25);

      frameId.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => cancelAnimationFrame(frameId.current);
  }, [config.isLocked, calculatedMetrics]);

  const addLog = (msg) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString('tr-TR')}] ${msg}`, ...prev.slice(0, 12)]);
  };

  // --- VANILLA CSS (GSS) - MODERNIZED INDUSTRIAL DESIGN ---
  const gss = `
    .scl-root {
      --bg-darker: #010204;
      --bg-surface: #0a0c10;
      --gold: #facc15;
      --cyan: #06b6d4;
      --red: #f85149;
      --border-soft: rgba(255, 255, 255, 0.04);
      --border-hard: rgba(255, 255, 255, 0.1);
      --text-dim: #8b949e;
      --text-bright: #c9d1d9;
      
      background: var(--bg-darker);
      color: var(--text-bright);
      font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .scl-header {
      background: var(--bg-surface);
      padding: 18px 40px;
      border-bottom: 1px solid var(--gold);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      z-index: 20;
    }

    .scl-brand { 
      font-weight: 900; 
      letter-spacing: 4px; 
      font-size: 1.2rem; 
      color: #fff;
      text-shadow: 0 0 10px var(--gold);
    }
    
    .scl-status-tag { 
      background: rgba(250, 204, 21, 0.1); 
      color: var(--gold); 
      padding: 4px 12px; 
      font-size: 0.65rem; 
      font-weight: 800; 
      border: 1px solid var(--gold);
      border-radius: 4px;
      text-transform: uppercase;
    }

    .scl-main { 
      display: grid; 
      grid-template-columns: 380px 1fr; 
      flex: 1; 
      padding: 20px; 
      gap: 20px; 
    }

    .scl-sidebar {
      background: var(--bg-surface);
      border: 1px solid var(--border-hard);
      padding: 25px;
      display: flex;
      flex-direction: column;
      gap: 25px;
      border-radius: 8px;
    }

    .scl-control-group label {
      display: block;
      color: var(--text-dim);
      font-size: 0.7rem;
      font-weight: 700;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .scl-range {
      width: 100%;
      height: 6px;
      background: #000;
      appearance: none;
      border-radius: 3px;
      accent-color: var(--gold);
      cursor: pointer;
    }

    .scl-stats-grid { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 12px; 
    }
    
    .scl-stat-box { 
      background: rgba(255,255,255,0.01); 
      border: 1px solid var(--border-soft);
      padding: 12px; 
      border-radius: 6px;
      transition: all 0.3s;
    }
    .scl-stat-box:hover { background: rgba(255,255,255,0.03); border-color: var(--gold); }
    
    .scl-stat-label { font-size: 0.55rem; color: var(--text-dim); display: block; margin-bottom: 4px; }
    .scl-stat-value { font-size: 0.95rem; font-weight: 800; color: #fff; display: block; }

    .scl-viewport {
      background: #000;
      border: 1px solid var(--border-hard);
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      position: relative;
      box-shadow: inset 0 0 50px rgba(0,0,0,1);
    }

    .scl-canvas-container { flex: 1; position: relative; }

    .scl-memory-grid {
      height: 160px;
      background: #020305;
      border-top: 1px solid var(--border-hard);
      padding: 15px;
      display: grid;
      grid-template-columns: repeat(32, 1fr);
      gap: 3px;
    }

    .scl-bit { 
      aspect-ratio: 1; 
      background: #111; 
      border-radius: 1px; 
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
    }
    .scl-bit-active { background: var(--cyan); box-shadow: 0 0 8px var(--cyan); }
    .scl-bit-alert { background: var(--red); box-shadow: 0 0 8px var(--red); }

    .scl-action-btn {
      padding: 14px;
      background: #161b22;
      color: #fff;
      border: 1px solid var(--border-hard);
      cursor: pointer;
      font-weight: 900;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      transition: all 0.3s;
      border-radius: 4px;
    }
    
    .scl-action-btn-primary { 
      background: var(--gold); 
      color: #000; 
      border: none; 
      box-shadow: 0 0 20px rgba(250, 204, 21, 0.2);
    }
    .scl-action-btn:hover { border-color: var(--gold); transform: translateY(-1px); }

    .scl-log-terminal {
      background: rgba(0,0,0,0.4);
      height: 140px;
      padding: 15px;
      font-size: 0.65rem;
      color: var(--gold);
      overflow-y: hidden;
      border-top: 1px solid var(--border-hard);
      line-height: 1.8;
      border-radius: 0 0 8px 8px;
    }
    
    .scl-logo-watermark {
      position: absolute;
      bottom: 20px;
      right: 20px;
      opacity: 0.15;
      pointer-events: none;
    }
  `;

  return (
    <div className="scl-root">
      <style>{gss}</style>
      
      <header className="scl-header">
        <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
          <div className="scl-brand">HERMETIC LINGU-LOGIC</div>
          <div className="scl-status-tag">BANNED_LOGIC v13.5</div>
        </div>
        <div style={{display:'flex', gap:'30px'}}>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:'0.6rem', color:'var(--text-dim)', letterSpacing:'1px'}}>SÖZCÜK_HAZİNESİ</div>
            <div style={{color:'var(--cyan)', fontWeight:900, fontSize:'1.1rem'}}>{metrics.vocab}n</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:'0.6rem', color:'var(--text-dim)', letterSpacing:'1px'}}>MLU_İNDEKSİ</div>
            <div style={{color:'var(--red)', fontWeight:900, fontSize:'1.1rem'}}>{metrics.mlu.toFixed(2)}</div>
          </div>
        </div>
      </header>

      <main className="scl-main">
        <section className="scl-sidebar">
          <div className="scl-control-group">
            <label>Kronolojik Gelişim ({config.age} Ay)</label>
            <input 
              type="range" className="scl-range" min="6" max="60" value={config.age} 
              onChange={(e) => setConfig({...config, age: parseInt(e.target.value)})}
            />
          </div>

          <div className="scl-control-group">
            <label>Uyaran Yoğunluğu (Stimuli: %{Math.round(config.stimuli * 100)})</label>
            <input 
              type="range" className="scl-range" min="0" max="100" value={config.stimuli * 100} 
              onChange={(e) => setConfig({...config, stimuli: e.target.value / 100})}
            />
          </div>

          <div className="scl-stats-grid">
            <div className="scl-stat-box">
              <span className="scl-stat-label">EDİNİM_HIZI</span>
              <span className="scl-value-text">{(metrics.vocab / config.age / 30).toFixed(2)} n/g</span>
            </div>
            <div className="scl-stat-box">
              <span className="scl-stat-label">SENTAKS_SKORU</span>
              <span className="scl-value-text">{metrics.syntax.toFixed(2)}</span>
            </div>
            <div className="scl-stat-box">
              <span className="scl-stat-label">İLETİM_GECİKMESİ</span>
              <span className="scl-value-text">{Math.round(metrics.latency)} ms</span>
            </div>
            <div className="scl-stat-box">
              <span className="scl-stat-label">GELİŞİM_PENCERESİ</span>
              <span className="scl-value-text" style={{color: config.age < 36 ? 'var(--gold)' : '#fff'}}>
                {/* Dallanmasız string seçimi JS seviyesinde basitleştirilmiştir */}
                {config.age < 36 ? "KRİTİK" : "STABİL"}
              </span>
            </div>
          </div>

          <button 
            className={`scl-action-btn ${config.isLocked ? '' : 'scl-action-btn-primary'}`}
            onClick={() => {
              setConfig({...config, isLocked: !config.isLocked});
              addLog(config.isLocked ? "SİSTEM BOŞTA - AKIŞ ASKIYA ALINDI" : "ANALİZ KİLİTLENDİ - DİNAMİK TAKİP AKTİF");
            }}
          >
            {config.isLocked ? "MÜHÜRÜ ÇÖZ" : "HERMETİK ANALİZİ KİLİTLE"}
          </button>

          <button 
            className="scl-action-btn" 
            style={{
              borderColor: config.criticalMode ? 'var(--red)' : 'var(--border-hard)', 
              color: config.criticalMode ? 'var(--red)' : '#fff'
            }}
            onClick={() => {
              setConfig({...config, criticalMode: !config.criticalMode});
              addLog(config.criticalMode ? "STABİL FAZA GEÇİLDİ" : "KRİTİK DÖNEM SİMÜLASYONU AKTİF");
            }}
          >
            {config.criticalMode ? "KRİTİK MOD: AKTİF" : "KRİTİK MOD: PASİF"}
          </button>

          <div className="scl-log-terminal">
            {logs.map((msg, i) => <div key={i} style={{opacity: 1 - (i * 0.08)}}>{msg}</div>)}
          </div>
        </section>

        <section className="scl-viewport">
          <div className="scl-canvas-container">
            <canvas ref={canvasRef} style={{width:'100%', height:'100%', display:'block'}} />
            <div style={{position:'absolute', top:25, left:25, fontSize:'0.55rem', color:'var(--gold)', letterSpacing:'2px', opacity:0.4, fontWeight:900}}>
              NEURAL_LANGUAGE_FLOW_MONITOR v13.5
            </div>
            <div className="scl-logo-watermark">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="40" stroke="var(--gold)" strokeWidth="0.5" />
                <path d="M50 10V90M10 50H90" stroke="var(--gold)" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

          <div className="scl-memory-grid">
            {Array.from({length: 256}).map((_, i) => (
              <div 
                key={i} 
                className={`scl-bit ${config.isLocked && Math.random() > 0.88 ? (i % 7 === 0 ? 'scl-bit-alert' : 'scl-bit-active') : ''}`}
                style={{opacity: config.isLocked ? 1 : 0.1}}
              />
            ))}
          </div>
        </section>
      </main>

      <footer style={{padding:'15px 40px', fontSize:'0.6rem', color:'#444', borderTop:'1px solid #111', letterSpacing:'2px', background: 'var(--bg-surface)'}}>
        KAPLAN HALI YIKAMA - PRECISION DEPT. | SOVEREIGN CORE LIBRARY | NO_LIB PURE ARCHITECTURE | 2024
      </footer>
    </div>
  );
};

export default App;
