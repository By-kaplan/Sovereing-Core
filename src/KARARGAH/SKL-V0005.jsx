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
  Career: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
};

const App = () => {
  const [activeTab, setActiveTab] = useState('ACTIVATION');
  const [selectedFunc, setSelectedFunc] = useState('ReLU');
  const [range, setRange] = useState(5);
  const [params, setParams] = useState({ k: 5.0, c: 0.5, abstraction: 50, timeStep: 0.1 });

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

  // --- CAREER MATCH ENGINE (BRANCHLESS IMPLEMENTATION) ---
  const careerData = useMemo(() => ({
    student: {
      gpa: 3.42, year: 3,
      skills: ["React", "Node.js", "SQL"],
      schedule: [
        { d: 1, h: 9 }, { d: 1, h: 10 }, { d: 1, h: 11 },
        { d: 3, h: 14 }, { d: 3, h: 15 },
        { d: 5, h: 10 }, { d: 5, h: 11 }
      ]
    },
    jobs: [
      { id: "j1", comp: "TechCorp", role: "Yazılım Stajyeri", minGpa: 3.0, minYear: 3, skills: ["React", "SQL"], loc: "Levent", sal: "12k" },
      { id: "j2", comp: "DataFlow", role: "Analist Asistanı", minGpa: 3.5, minYear: 2, skills: ["Python", "SQL"], loc: "Maslak", sal: "15k" }
    ]
  }), []);

  const processedJobs = useMemo(() => {
    return careerData.jobs.map(job => {
      // Branchless Conflict Calculation
      const conflicts = job.id === "j1" ? 0 : 2; // Simüle edilmiş; normalde array-filter-mask ile yapılır
      const conflictRatio = (conflicts / 4) * 100;
      
      // Branchless Eligibility Score
      const gpaMask = +(careerData.student.gpa >= job.minGpa);
      const yearMask = +(careerData.student.year >= job.minYear);
      const score = (gpaMask * 40) + (yearMask * 30) + 30; // 30 sabit yetenek (simüle)
      
      return { ...job, conflict: conflictRatio, eligibility: score };
    });
  }, [careerData]);

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
    const satCount = grads.filter(g => Math.abs(g) < 0.01).length;
    const saturation = (satCount / chartData.length) * 100;
    const avgGrad = grads.reduce((a, b) => a + b, 0) / grads.length;
    return { saturation, avgGrad, stability: (100 - saturation * 0.7).toFixed(1) };
  }, [chartData]);

  // --- VANILLA CSS (GSS) ---
  const gss = `
    .scl-root {
      --bg: #010204;
      --panel: #0a0c10;
      --gold: #facc15;
      --blue: #3b82f6;
      --emerald: #10b981;
      --red: #f85149;
      --border: rgba(255, 255, 255, 0.05);
      --text: #c9d1d9;
      --text-dim: #484f58;
      background: var(--bg);
      color: var(--text);
      font-family: 'SF Mono', 'Monaco', monospace;
      min-height: 100vh;
      padding: 30px;
    }

    header {
      max-width: 1250px;
      margin: 0 auto 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding-bottom: 20px;
    }

    .scl-nav { display: flex; background: var(--panel); padding: 4px; border-radius: 8px; border: 1px solid var(--border); }
    .scl-nav-btn {
      padding: 10px 18px; font-size: 10px; font-weight: 900; text-transform: uppercase; cursor: pointer;
      border: none; background: transparent; color: var(--text-dim); border-radius: 6px; transition: all 0.3s;
    }
    .scl-nav-btn.active { background: var(--blue); color: #fff; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); }

    .scl-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; max-width: 1250px; margin: 0 auto; }
    .scl-card { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 24px; }
    .col-4 { grid-column: span 4; }
    .col-8 { grid-column: span 8; }
    .col-12 { grid-column: span 12; }

    .scl-label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: var(--gold); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
    
    .manifold-wrap {
      width: 100%; height: 350px; background: #000; border-radius: 8px; border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;
    }

    .scl-range { width: 100%; appearance: none; height: 4px; background: #161b22; border-radius: 2px; accent-color: var(--blue); cursor: pointer; }

    .func-btn {
      width: 100%; padding: 12px; font-size: 10px; font-weight: 900; border-radius: 6px; border: 1px solid var(--border);
      background: #111; color: var(--text-dim); cursor: pointer; transition: all 0.2s; text-align: left; margin-bottom: 8px;
    }
    .func-btn.active { border-color: var(--blue); color: #fff; background: rgba(59, 130, 246, 0.1); }

    .stat-pill { background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 12px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .stat-val { font-size: 14px; font-weight: 900; color: #fff; }
    .stat-lbl { font-size: 8px; color: var(--text-dim); text-transform: uppercase; }

    /* Career Hub Specific Styles */
    .job-card { border-left: 4px solid var(--blue); margin-bottom: 15px; transition: transform 0.2s; }
    .job-card:hover { transform: translateX(5px); }
    .schedule-grid { display: grid; grid-template-columns: 40px repeat(7, 1fr); gap: 2px; }
    .time-slot { height: 12px; background: #050505; border-radius: 1px; border: 1px solid rgba(255,255,255,0.02); }
    .slot-busy { background: var(--red); opacity: 0.4; border-color: var(--red); }
  `;

  return (
    <div className="scl-root">
      <style>{gss}</style>
      
      <header>
        <div>
          <h1 style={{fontSize:'22px', fontWeight:900, display:'flex', alignItems:'center', gap:'12px'}}>
            <span style={{color:'var(--blue)'}}><Icons.Zap /></span>
            MÜHENDİS KONTROL MERKEZİ v4.0.0
          </h1>
          <div style={{fontSize:'9px', color:'var(--text-dim)', letterSpacing:'3px', textTransform:'uppercase', marginTop:'4px'}}>
            Advanced Logistics & Career Match Engine
          </div>
        </div>

        <nav className="scl-nav">
          {['ACTIVATION', 'MODEL', 'CAREER'].map(t => (
            <button 
              key={t} className={`scl-nav-btn ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t === 'ACTIVATION' ? 'ACTIVATION' : t === 'MODEL' ? 'STATE-SPACE' : 'CAREER-HUB'}
            </button>
          ))}
        </nav>
      </header>

      <main className="scl-grid">
        {activeTab === 'ACTIVATION' && (
          <>
            <aside className="col-4 space-y-4" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              <div className="scl-card">
                <div className="scl-label"><Icons.Layers /> Fonksiyon Karakterizasyonu</div>
                {Object.keys(activationCore).map(key => (
                  <button 
                    key={key} className={`func-btn ${selectedFunc === key ? 'active' : ''}`}
                    onClick={() => setSelectedFunc(key)}
                  >
                    {key}
                  </button>
                ))}
                <div style={{marginTop:'20px'}}>
                  <label className="stat-lbl" style={{display:'block', marginBottom:'8px'}}>Giriş Aralığı: ±{range}</label>
                  <input type="range" className="scl-range" min="1" max="10" value={range} onChange={e => setRange(+e.target.value)} />
                </div>
              </div>

              <div className="scl-card">
                <div className="scl-label">Doygunluk Monitörü</div>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                  <span className="stat-lbl">Gradyan Kaybı</span>
                  <span className="stat-val" style={{fontSize:'12px'}}>{metrics.saturation.toFixed(1)}%</span>
                </div>
                <div style={{height:'6px', background:'#000', borderRadius:'3px', overflow:'hidden'}}>
                  <div style={{height:'100%', background: metrics.saturation > 40 ? 'var(--red)' : 'var(--emerald)', width: `${metrics.saturation}%`, transition:'width 0.5s'}} />
                </div>
              </div>
            </aside>

            <section className="col-8 space-y-4" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              <div className="manifold-wrap">
                <svg width="400" height="300" viewBox="0 0 200 150" className="manifold-svg">
                  <defs>
                    <linearGradient id="glow" x1="0" y1="0" x2="100%" y2="0">
                      <stop offset="0%" stopColor="var(--blue)" stopOpacity="0" />
                      <stop offset="50%" stopColor="var(--blue)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--emerald)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {Array.from({length:10}).map((_, i) => (
                    <line key={i} x1={i*20} y1="0" x2={i*20} y2="150" stroke="#111" strokeWidth="0.5" />
                  ))}
                  <path 
                    d={`M 20 120 Q 100 ${120 - metrics.avgGrad * 100} 180 120`}
                    stroke="url(#glow)" strokeWidth="4" fill="none" strokeLinecap="round"
                  />
                  <circle cx="100" cy={120 - metrics.avgGrad * 100} r="3" fill="var(--gold)" />
                  <text x="100" y="140" textAnchor="middle" fill="#333" fontSize="5" fontWeight="900" letterSpacing="1">NON-LINEAR MANIFOLD PROJECTOR</text>
                </svg>
              </div>

              <div className="scl-card" style={{height:'320px', padding:0, display:'flex', flexDirection:'column'}}>
                <div style={{padding:'20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between'}}>
                   <div className="scl-label" style={{margin:0}}><Icons.Activity /> Diferansiyel Analiz</div>
                </div>
                <div style={{flex:1, position:'relative', padding:'20px'}}>
                  <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path d={`M 0 200 ${chartData.map((d, i) => `L ${(i/chartData.length)*400} ${200 - d.y * (100/range)}`).join(' ')} L 400 200 Z`} fill="rgba(59, 130, 246, 0.05)" />
                    <path d={`M 0 200 ${chartData.map((d, i) => `L ${(i/chartData.length)*400} ${200 - d.y * (100/range)}`).join(' ')}`} fill="none" stroke="var(--blue)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'CAREER' && (
          <>
            <section className="col-8 space-y-4">
              <div className="scl-label"><Icons.Career /> Algoritmik Eşleşen Pozisyonlar</div>
              {processedJobs.map(job => (
                <div key={job.id} className="scl-card job-card">
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'15px'}}>
                    <div>
                      <h3 style={{fontSize:'16px', fontWeight:900, color:'#fff'}}>{job.role}</h3>
                      <p style={{fontSize:'10px', color:'var(--blue)', fontWeight:800}}>{job.comp} • {job.loc}</p>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <span className="stat-lbl">Uyum Skoru</span>
                      <div style={{fontSize:'18px', fontWeight:900, color: job.eligibility > 80 ? 'var(--emerald)' : 'var(--gold)'}}>%{job.eligibility}</div>
                    </div>
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'10px'}}>
                    <div className="stat-pill"><span className="stat-lbl">Ücret</span><span className="stat-val" style={{fontSize:'11px'}}>₺{job.sal}</span></div>
                    <div className="stat-pill">
                      <span className="stat-lbl">Çakışma</span>
                      <span className="stat-val" style={{fontSize:'11px', color: job.conflict > 0 ? 'var(--red)' : 'var(--emerald)'}}>%{job.conflict}</span>
                    </div>
                    <button className="scl-nav-btn active" style={{fontSize:'9px'}}>Başvuruyu Başlat</button>
                  </div>
                </div>
              ))}
            </section>

            <aside className="col-4 space-y-4">
              <div className="scl-card">
                <div className="scl-label"><Icons.Activity /> Haftalık Zaman Matrisi</div>
                <div className="schedule-grid">
                  <div /> {['P','S','Ç','P','C','C','P'].map(d => <div key={d} className="stat-lbl" style={{textAlign:'center'}}>{d}</div>)}
                  {Array.from({length:8}).map((_, h) => (
                    <React.Fragment key={h}>
                      <div className="stat-lbl" style={{fontSize:'7px'}}>{h+9}:00</div>
                      {Array.from({length:7}).map((_, d) => {
                        const isBusy = careerData.student.schedule.some(s => s.d === d+1 && s.h === h+9);
                        return <div key={d} className={`time-slot ${isBusy ? 'slot-busy' : ''}`} />
                      })}
                    </React.Fragment>
                  ))}
                </div>
                <div style={{marginTop:'15px', padding:'10px', background:'rgba(255,255,255,0.02)', borderRadius:'6px'}}>
                  <div style={{fontSize:'8px', color:'var(--text-dim)', marginBottom:'5px'}}>LOJİSTİK TOLERANS</div>
                  <div style={{fontSize:'10px', fontWeight:900, color:'var(--blue)'}}>+80DK GÜVENLİ ARALIK</div>
                </div>
              </div>

              <div className="scl-card">
                <div className="scl-label"><Icons.Binary /> Yeterlilik Dağılımı</div>
                <div style={{display:'flex', justifyContent:'center', position:'relative'}}>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--blue)" strokeWidth="10" strokeDasharray="251" strokeDashoffset={251 - (251 * 0.7)} transform="rotate(-90 50 50)" />
                    <text x="50" y="55" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="900">GPA/SKILL</text>
                  </svg>
                </div>
                <div style={{marginTop:'15px'}} className="space-y-2">
                  <div className="stat-pill" style={{padding:'8px'}}><span className="stat-lbl">Zorunlu Staj</span><span className="stat-val" style={{fontSize:'9px', color:'var(--emerald)'}}>ONAYLI</span></div>
                  <div className="stat-pill" style={{padding:'8px'}}><span className="stat-lbl">Sigorta</span><span className="stat-val" style={{fontSize:'9px'}}>OKUL</span></div>
                </div>
              </div>
            </aside>
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
        <div>Engine: CareerMatch_v4.2 // Logic: Branchless</div>
        <div>KAPLAN HALI YIKAMA - PRECISION DEPT. | SOVEREIGN CORE v4.0.0</div>
      </footer>
    </div>
  );
};

export default App;
