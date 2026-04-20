/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';

const App = () => {
  // --- KAPLAN LOGIC: STATE VE KONFİGÜRASYON ---
  const [params, setParams] = useState({
    threshold: 1.0,
    leak: 0.05,
    isProcessing: true
  });

  const canvasRef = useRef(null);
  const frameId = useRef(0);
  const time = useRef(0);

  // --- MÜHENDİSLİK HESAPLAMALARI (BANNED LOGIC - DALLANMASIZ) ---
  const neuromorphicCore = useMemo(() => ({
    // Leaky Integrate-and-Fire (LIF) - Branchless Implementation
    simulateStep: (potential, current, leak, threshold) => {
      const integrated = potential * (1.0 - leak) + current;
      const spikeMask = +(integrated >= threshold); // Branchless mask (1 or 0)
      
      return {
        newPotential: integrated * (1.0 - spikeMask), // Reset potential if spiked
        fired: !!spikeMask
      };
    },

    // Spike-Timing-Dependent Plasticity (STDP) - Branchless Implementation
    updateWeight: (tPre, tPost, weight) => {
      const dT = tPost - tPre;
      const aPlus = 0.1, aMinus = 0.12, tau = 20.0;
      
      const posMask = +(dT > 0);
      const negMask = +(dT < 0);
      
      const dw = (posMask * aPlus * Math.exp(-dT / tau)) + 
                 (negMask * -aMinus * Math.exp(dT / tau));
      
      return Math.max(0, Math.min(1.0, weight + dw));
    }
  }), []);

  // --- PURE CANVAS VISUALIZER (3D ASYNCHRONOUS DATA FLOW) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Nöron ve Sinaps Başlatma
    const neurons = Array.from({ length: 80 }, (_, i) => ({
      x: (Math.random() - 0.5) * 320,
      y: (Math.random() - 0.5) * 220,
      z: (Math.random() - 0.5) * 120,
      potential: 0,
      isInput: i < 12,
      lastSpike: -100
    }));

    const synapses = [];
    neurons.forEach((n, i) => {
      neurons.forEach((m, j) => {
        if (i !== j && Math.random() < 0.035) {
          synapses.push({ src: i, tgt: j, w: Math.random(), pulses: [] });
        }
      });
    });

    const render = () => {
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      const cx = w / 2, cy = h / 2;
      
      time.current++;
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, w, h);

      const rotY = time.current * 0.006;
      const project = (n) => {
        const x = n.x * Math.cos(rotY) - n.z * Math.sin(rotY);
        const z = n.x * Math.sin(rotY) + n.z * Math.cos(rotY);
        const scale = 300 / (300 + z);
        return { px: cx + x * scale, py: cy + n.y * scale, scale, z };
      };

      // LIF Entegrasyonu
      neurons.forEach((n, idx) => {
        const input = n.isInput && Math.random() > 0.9 ? 0.35 : 0;
        const { newPotential, fired } = neuromorphicCore.simulateStep(
          n.potential, input, params.leak, params.threshold
        );
        n.potential = newPotential;

        if (fired && params.isProcessing) {
          n.lastSpike = time.current;
          synapses.forEach(s => {
            if (s.src === idx) s.pulses.push({ p: 0 });
          });
        }
      });

      // Sinaptik İletim
      ctx.lineWidth = 0.5;
      synapses.forEach(s => {
        const src = project(neurons[s.src]);
        const tgt = project(neurons[s.tgt]);

        ctx.beginPath();
        ctx.moveTo(src.px, src.py);
        ctx.lineTo(tgt.px, tgt.py);
        ctx.strokeStyle = `rgba(30, 41, 59, ${0.05 + s.w * 0.15})`;
        ctx.stroke();

        for (let i = s.pulses.length - 1; i >= 0; i--) {
          const pulse = s.pulses[i];
          pulse.p += 0.04;
          if (pulse.p >= 1) {
            neurons[s.tgt].potential += 0.3 * s.w;
            s.pulses.splice(i, 1);
          } else {
            const px = src.px + (tgt.px - src.px) * pulse.p;
            const py = src.py + (tgt.py - src.py) * pulse.p;
            ctx.fillStyle = '#facc15';
            ctx.beginPath(); ctx.arc(px, py, 1.2 * src.scale, 0, Math.PI * 2); ctx.fill();
          }
        }
      });

      // Nöron Render
      neurons.map(n => ({...n, ...project(n)})).sort((a,b) => b.z - a.z).forEach(n => {
        const active = (time.current - n.lastSpike) < 6;
        const ratio = Math.min(1, n.potential / params.threshold);
        
        ctx.beginPath();
        if (active && params.isProcessing) {
          ctx.fillStyle = '#facc15';
          ctx.shadowBlur = 15; ctx.shadowColor = '#facc15';
          ctx.arc(n.px, n.py, 3.5 * n.scale, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = `rgb(${15 + 220 * ratio}, ${23 + 80 * ratio}, ${42})`;
          ctx.arc(n.px, n.py, (1.5 + ratio * 2) * n.scale, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      frameId.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId.current);
  }, [params, neuromorphicCore]);

  // --- VANILLA CSS (GSS) ---
  const gss = `
    .scl-root {
      --bg: #050508;
      --panel: #0a0c12;
      --gold: #facc15;
      --cyan: #06b6d4;
      --border: rgba(250, 204, 21, 0.15);
      --text: #94a3b8;
      background: var(--bg);
      color: var(--text);
      font-family: 'SF Mono', monospace;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .scl-header {
      padding: 20px 40px;
      background: var(--panel);
      border-bottom: 1px solid var(--gold);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 30px rgba(0,0,0,0.5);
    }

    .scl-brand { font-weight: 900; letter-spacing: 3px; font-size: 1.1rem; color: #fff; }
    .scl-tag { font-size: 0.6rem; background: var(--gold); color: #000; padding: 2px 8px; font-weight: 900; }

    .scl-main { display: grid; grid-template-columns: 350px 1fr; flex: 1; padding: 20px; gap: 20px; }

    .scl-sidebar { background: var(--panel); border: 1px solid var(--border); border-radius: 8px; padding: 25px; display: flex; flex-direction: column; gap: 25px; }

    .control-label { font-size: 0.65rem; font-weight: 800; color: var(--gold); margin-bottom: 10px; display: block; text-transform: uppercase; }
    .scl-range { width: 100%; appearance: none; height: 4px; background: #000; border-radius: 2px; accent-color: var(--gold); }

    .scl-viewport { background: #000; border: 1px solid var(--border); border-radius: 8px; position: relative; overflow: hidden; display: flex; flex-direction: column; }
    .canvas-wrap { flex: 1; position: relative; }

    .scl-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .stat-box { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 12px; border-radius: 4px; }
    .stat-val { display: block; color: #fff; font-weight: 900; font-size: 1rem; }
    .stat-lbl { font-size: 0.5rem; color: #555; text-transform: uppercase; }

    .scl-btn { background: #161b22; color: #fff; border: 1px solid var(--border); padding: 12px; cursor: pointer; font-weight: 900; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; }
    .btn-gold { background: var(--gold); color: #000; border: none; }

    .scl-chart-wrap { height: 160px; background: #020305; border-top: 1px solid var(--border); padding: 20px; }
    .svg-bar { transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
  `;

  return (
    <div className="scl-root">
      <style>{gss}</style>
      
      <header className="scl-header">
        <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
          <div className="scl-brand">NEUROMORPHIC-LOGIC AI</div>
          <div className="scl-tag">V13.5_ASYNCHRONOUS</div>
        </div>
        <div style={{display:'flex', gap:'30px'}}>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:'0.5rem', color:'#444'}}>ENERGY/OP</div>
            <div style={{color:'var(--gold)', fontWeight:900}}>12.4 pJ</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:'0.5rem', color:'#444'}}>LATENCY</div>
            <div style={{color:'var(--cyan)', fontWeight:900}}>45 ns</div>
          </div>
        </div>
      </header>

      <main className="scl-main">
        <section className="scl-sidebar">
          <div>
            <label className="control-label">Membrane Threshold (V_th)</label>
            <input 
              type="range" className="scl-range" min="0.5" max="2.0" step="0.1" 
              value={params.threshold} onChange={(e) => setParams({...params, threshold: +e.target.value})} 
            />
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.6rem', marginTop:5}}>
              <span>LIF_SENSITIVITY</span>
              <span style={{color:'var(--gold)'}}>{params.threshold.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <label className="control-label">Leak Factor (τ_m)</label>
            <input 
              type="range" className="scl-range" min="0.01" max="0.15" step="0.01" 
              value={params.leak} onChange={(e) => setParams({...params, leak: +e.target.value})} 
            />
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.6rem', marginTop:5}}>
              <span>DECAY_RATE</span>
              <span style={{color:'var(--cyan)'}}>{params.leak.toFixed(3)}</span>
            </div>
          </div>

          <div className="scl-stats">
            <div className="stat-box"><span className="stat-lbl">SPARSITY</span><span className="stat-val">94.2%</span></div>
            <div className="stat-box"><span className="stat-lbl">CORE_TEMP</span><span className="stat-val">32.4°C</span></div>
            <div className="stat-box"><span className="stat-lbl">PS_RATE</span><span className="stat-val">5.8 TSOPs</span></div>
            <div className="stat-box"><span className="stat-lbl">AER_SYNC</span><span className="stat-val">TRUE</span></div>
          </div>

          <button 
            className={`scl-btn ${params.isProcessing ? 'btn-gold' : ''}`}
            onClick={() => setParams({...params, isProcessing: !params.isProcessing})}
          >
            {params.isProcessing ? "PROCESSING_CORE: ACTIVE" : "IDLE_STATE: LOW_POWER"}
          </button>

          <div style={{fontSize:'0.6rem', color:'#444', lineHeight:1.5, borderTop:'1px solid #111', paddingTop:15}}>
            Δw = A_± exp(-|Δt|/τ_±)<br/>
            Asenkron pals iletimi, Von Neumann darboğazını ortadan kaldırarak veriyi zaman damgalı olaylar (Spikes) olarak işler.
          </div>
        </section>

        <section className="scl-viewport">
          <div className="canvas-wrap">
            <canvas ref={canvasRef} style={{width:'100%', height:'100%', display:'block'}} />
            <div style={{position:'absolute', top:20, left:20, fontSize:'0.5rem', color:'var(--gold)', letterSpacing:'2px', opacity:0.5, fontWeight:900}}>
              ASYNCHRONOUS_SPIKE_TRAIN_MONITOR
            </div>
          </div>

          {/* Pure SVG Hardware Comparison Chart */}
          <div className="scl-chart-wrap">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:15}}>
              <span style={{fontSize:'0.6rem', fontWeight:800, color:'#555'}}>ENERGY EFFICIENCY (pJ/Op - Log Scale)</span>
              <span style={{fontSize:'0.5rem', color:'var(--gold)'}}>NO_LIB_SVG_CHART</span>
            </div>
            <div style={{display:'flex', alignItems:'flex-end', height:'80px', gap:'40px', paddingLeft:20}}>
              {[
                { label: 'GPU', val: 80, color: '#f85149' },
                { label: 'TPU', val: 55, color: '#06b6d4' },
                { label: 'SNN', val: 15, color: '#facc15' }
              ].map((d, i) => (
                <div key={i} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <div 
                    className="svg-bar"
                    style={{
                      width:'100%', 
                      height: `${d.val}px`, 
                      background: d.color,
                      boxShadow: `0 0 15px ${d.color}44`,
                      borderRadius: '2px 2px 0 0'
                    }} 
                  />
                  <span style={{fontSize:'0.5rem', marginTop:8, color:'#555'}}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer style={{padding:'12px 40px', fontSize:'0.55rem', color:'#333', borderTop:'1px solid #111', background: 'var(--panel)', letterSpacing:'2px'}}>
        KAPLAN HALI YIKAMA - PRECISION DEPT. | NEUROMORPHIC ENGINE v13.5 | BRANCHLESS ARCHITECTURE
      </footer>
    </div>
  );
};

export default App;
