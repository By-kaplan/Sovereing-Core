/**
 * @project SOVEREIGN CORE LIBRARY | @uid SKL-0020
 * @architect [Ömer Kaplan] | @origin Kaplan Halı Yıkama - Precision Dept.
 * @engine Gemini Pro Hybrid-AI | @collaboration Human-AI Augmented
 * @license MIT (Attribution Required) | @status Production-Ready
 */

import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Legend, ScatterChart, Scatter, ZAxis, Cell, ReferenceLine
} from 'recharts';
import { 
  Zap, Activity, Target, Cpu, Binary, Layers, 
  Settings, TrendingUp, AlertTriangle, Info, RefreshCw, Box, 
  ShieldCheck, BarChart3, MoveRight, Gauge, FlaskConical, Navigation
} from 'lucide-react';

/**
 * @architecture & INTEL
 * @dependencies: react, recharts, lucide-react, tailwindcss
 * @credits: Kaplan Precision Dept. - Gradyan Optimizasyon ve Vektör Alanı Analizi Birimi.
 * @ai-context: SKL-0020, Gradyan İnişi (Gradient Descent) mekanizmalarını ve optimizasyon trajektörlerini analiz eden bir eğitim ve teşhis modülüdür.
 * @ai-bridge: SKL_SKL_0019 -> SKL_SKL_0020 -> SKL_SKL_0021
 * @status: Hardware-Independent (Pure SVG Isometric Projection)
 */

// --- LOGIC: gradientLogicEngine.js ---

/**
 * Gradyan İnişi ve Optimizasyon Trajektör Motoru
 * Fonksiyon: f(x, y) = 0.1 * (x^2 + y^2)
 */
const calculateGradientDynamics = (config) => {
  const { learningRate, momentum, optimizer, iterations, batchSize, beta1 = 0.9, beta2 = 0.999 } = config;
  
  const trajectory = [];
  let x = 8.0; 
  let y = 8.0;
  
  let m_x = 0, m_y = 0; 
  let v_x = 0, v_y = 0; 
  const eps = 1e-8;

  for (let t = 1; t <= iterations; t++) {
    // 1. Gradyan Hesaplama (f = 0.1 * (x^2 + y^2) => df/dx = 0.2x)
    let grad_x = 0.2 * x;
    let grad_y = 0.2 * y;

    // 2. Stokastik Gürültü (Batch Size simülasyonu)
    const noiseScale = 0.5 / Math.sqrt(batchSize || 1);
    grad_x += (Math.random() - 0.5) * noiseScale;
    grad_y += (Math.random() - 0.5) * noiseScale;

    const gradNorm = Math.sqrt(grad_x ** 2 + grad_y ** 2);

    // 3. Optimizasyon Adımı
    let step_x = 0, step_y = 0;

    switch (optimizer) {
      case 'SGD':
        step_x = learningRate * grad_x;
        step_y = learningRate * grad_y;
        break;
      case 'Momentum':
        m_x = momentum * m_x + learningRate * grad_x;
        m_y = momentum * m_y + learningRate * grad_y;
        step_x = m_x;
        step_y = m_y;
        break;
      case 'Adam':
        m_x = beta1 * m_x + (1 - beta1) * grad_x;
        m_y = beta1 * m_y + (1 - beta1) * grad_y;
        v_x = beta2 * v_x + (1 - beta2) * (grad_x ** 2);
        v_y = beta2 * v_y + (1 - beta2) * (grad_y ** 2);
        
        const m_hat_x = m_x / (1 - Math.pow(beta1, t));
        const m_hat_y = m_y / (1 - Math.pow(beta1, t));
        const v_hat_x = v_x / (1 - Math.pow(beta2, t));
        const v_hat_y = v_y / (1 - Math.pow(beta2, t));
        
        step_x = (learningRate * m_hat_x) / (Math.sqrt(v_hat_x) + eps);
        step_y = (learningRate * m_hat_y) / (Math.sqrt(v_hat_y) + eps);
        break;
      default:
        step_x = learningRate * grad_x;
        step_y = learningRate * grad_y;
    }

    x -= step_x;
    y -= step_y;

    const loss = 0.1 * (x ** 2 + y ** 2);

    if (loss > 5000 || isNaN(loss)) break;

    trajectory.push({
      iteration: t,
      x: parseFloat(x.toFixed(4)),
      y: parseFloat(y.toFixed(4)),
      loss: parseFloat(loss.toFixed(6)),
      gradNorm: parseFloat(gradNorm.toFixed(6)),
      stepSize: parseFloat(Math.sqrt(step_x**2 + step_y**2).toFixed(6))
    });
  }

  const convergenceSpeed = trajectory.length > 0 ? (100 / trajectory.length).toFixed(2) : "0.00";
  const finalGradNorm = trajectory.length > 0 ? trajectory[trajectory.length - 1].gradNorm : 0;
  
  return { trajectory, convergenceSpeed, finalGradNorm };
};

// --- UI: GradientDescentVisualizer (Pure SVG Isometric) ---

const GradientDescentVisualizer = ({ config, trajectory }) => {
  // İzometrik projeksiyon fonksiyonu (3D -> 2D)
  const project = (x, y, z) => {
    const scale = 12;
    const isoX = 200 + (x - y) * Math.cos(Math.PI / 6) * scale;
    const isoY = 180 - (z * scale) + (x + y) * Math.sin(Math.PI / 6) * scale;
    return { x: isoX, y: isoY };
  };

  // Hata yüzeyi (Izgara/Grid) çizgileri oluşturma
  const gridLines = useMemo(() => {
    const lines = [];
    const step = 2;
    for (let i = -10; i <= 10; i += step) {
      const lineX = [];
      const lineY = [];
      for (let j = -10; j <= 10; j += 0.5) {
        const zX = 0.1 * (i * i + j * j);
        const pX = project(i, j, zX);
        lineX.push(`${pX.x},${pX.y}`);

        const zY = 0.1 * (j * j + i * i);
        const pY = project(j, i, zY);
        lineY.push(`${pY.x},${pY.y}`);
      }
      lines.push(lineX.join(' '));
      lines.push(lineY.join(' '));
    }
    return lines;
  }, []);

  // Trajektör yolu çizimi
  const pathD = useMemo(() => {
    if (trajectory.length < 2) return "";
    return trajectory.map((p, i) => {
      const z = 0.1 * (p.x * p.x + p.y * p.y);
      const proj = project(p.x, p.y, z);
      return (i === 0 ? "M " : "L ") + `${proj.x},${proj.y}`;
    }).join(' ');
  }, [trajectory]);

  // Mevcut konum noktası
  const currentPoint = trajectory.length > 0 ? trajectory[trajectory.length - 1] : { x: 8, y: 8 };
  const currentZ = 0.1 * (currentPoint.x * currentPoint.x + currentPoint.y * currentPoint.y);
  const currentProj = project(currentPoint.x, currentPoint.y, currentZ);

  return (
    <div className="w-full h-[450px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      
      <svg width="100%" height="100%" viewBox="0 0 400 350" className="overflow-visible drop-shadow-2xl">
        {gridLines.map((d, i) => (
          <polyline key={i} points={d} fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.6" />
        ))}
        
        <path 
          d={pathD} 
          fill="none" 
          stroke="#6366f1" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className="animate-[draw_2s_ease-out_forwards]"
        />
        
        <circle cx={project(0,0,0).x} cy={project(0,0,0).y} r="5" fill="#10b981" className="animate-pulse" />
        <circle cx={project(0,0,0).x} cy={project(0,0,0).y} r="12" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="5;15;5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        
        <g transform={`translate(${currentProj.x}, ${currentProj.y})`}>
          <circle r="6" fill="#6366f1" stroke="#fff" strokeWidth="2" />
          <circle r="10" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="6;12;6" dur="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700">
        <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-black">
          {String(config.optimizer)} İzometrik Trajektör
        </span>
      </div>

      <div className="absolute bottom-4 right-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest bg-slate-950/50 px-2 py-1 rounded font-black">
        WebGL Gerekmez • Saf SVG Motoru
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function App() {
  const [config, setConfig] = useState({
    learningRate: 0.05,
    momentum: 0.9,
    optimizer: 'Adam',
    iterations: 100,
    batchSize: 32
  });

  const { trajectory, convergenceSpeed, finalGradNorm } = useMemo(() => {
    return calculateGradientDynamics(config);
  }, [config]);

  const stabilityStatus = useMemo(() => {
    if (finalGradNorm > 5) return { label: 'Diverjans', color: 'text-rose-500', icon: AlertTriangle };
    if (finalGradNorm < 0.001) return { label: 'Yakınsadı', color: 'text-emerald-400', icon: ShieldCheck };
    if (trajectory.length < 20) return { label: 'Durağan', color: 'text-amber-400', icon: Activity };
    return { label: 'Kararlı', color: 'text-indigo-400', icon: TrendingUp };
  }, [finalGradNorm, trajectory.length]);

  const StatusIcon = stabilityStatus.icon;

  const SKL_Result = {
    SKL_ID: "SKL-0020",
    SKL_Optimizer: config.optimizer,
    SKL_Convergence: convergenceSpeed,
    SKL_Status: stabilityStatus.label.toUpperCase()
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-slate-800 pb-8 font-mono">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20">
            <Navigation className="w-8 h-8 text-white rotate-180" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white uppercase tracking-tighter">SKL-0020 Gradient-Logic</h1>
            <p className="text-slate-500 text-xs font-mono italic uppercase tracking-widest">Trajektör Analizi & Optimizasyon Kernel v2.4</p>
          </div>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 flex items-center gap-3 min-w-[150px]">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none text-center">Gradyan</span>
                <span className="text-[8px] text-slate-600 font-black uppercase text-center mt-0.5">Normu (||∇||)</span>
              </div>
              <span className={`text-sm font-mono font-bold ${stabilityStatus.color}`}>
                {String(finalGradNorm.toFixed(4))}
              </span>
           </div>
           <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 flex items-center gap-3 min-w-[150px]">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none text-center">Yakınsama<br/>Hızı</span>
              <span className="text-sm font-mono font-bold text-blue-400">{String(convergenceSpeed)}%</span>
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <aside className="lg:col-span-4 space-y-6">
            <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xs font-black mb-6 text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Settings className="w-4 h-4 text-indigo-400" /> Optimizasyon Denetimi
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs text-slate-400 font-black uppercase tracking-tighter">Öğrenme Hızı (η)</label>
                    <span className="text-xs font-mono text-indigo-400 font-bold">{String(config.learningRate)}</span>
                  </div>
                  <input 
                    type="range" min="0.001" max="0.3" step="0.001"
                    value={config.learningRate}
                    onChange={(e) => setConfig({...config, learningRate: parseFloat(e.target.value)})}
                    className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-black uppercase tracking-tighter block mb-3">Optimizer Metodu</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['SGD', 'Momentum', 'Adam'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setConfig({...config, optimizer: opt})}
                        className={`px-2 py-1.5 rounded text-[10px] font-black uppercase border transition-all ${
                          config.optimizer === opt 
                          ? 'bg-indigo-600 border-indigo-400 text-white' 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500 uppercase font-black tracking-tighter">İterasyon Sayısı</span>
                    <span className="font-mono text-indigo-400 font-bold">{String(config.iterations)}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500 uppercase font-black tracking-tighter">Batch Boyutu</span>
                    <span className="font-mono text-slate-300 font-bold">{String(config.batchSize)} Örnek</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-indigo-400" /> Kararlılık Durumu
              </h4>
              <div className="flex items-center gap-4">
                 <div className={`p-2 rounded-lg bg-slate-800 ${stabilityStatus.color}`}>
                    <StatusIcon className="w-5 h-5" />
                 </div>
                 <div className="text-xs leading-relaxed text-slate-400 font-bold uppercase tracking-tighter">
                    {config.optimizer === 'SGD' && config.learningRate > 0.1 
                      ? "Gürültü tespiti! SGD salınım yapabilir." 
                      : stabilityStatus.label === 'Yakınsadı' 
                        ? "Optimal yakınsama sağlandı." 
                        : "Sistem aktif optimizasyon fazında."}
                 </div>
              </div>
            </section>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl font-mono text-[9px] uppercase tracking-widest text-slate-600">
              <p className="mb-2 border-b border-slate-800 pb-1">SKL_Result_Buffer</p>
              <code className="text-emerald-500 break-all">{JSON.stringify(SKL_Result)}</code>
            </div>
          </aside>

          <div className="lg:col-span-8 space-y-6">
            <GradientDescentVisualizer config={config} trajectory={trajectory} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-[320px]">
                <h4 className="text-xs font-black text-slate-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
                  <BarChart3 className="w-4 h-4 text-indigo-400" /> Kayıp Analizi
                </h4>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trajectory}>
                      <defs>
                        <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="iteration" tick={{fontSize: 10, fill: '#64748b', fontStyle: 'bold'}} />
                      <YAxis hide domain={[0, 'auto']} />
                      <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '10px'}} />
                      <Area type="monotone" name="Kayıp" dataKey="loss" stroke="#6366f1" fillOpacity={1} fill="url(#colorLoss)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-[320px]">
                <h4 className="text-xs font-black text-slate-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
                  <FlaskConical className="w-4 h-4 text-emerald-400" /> Gradyan Normu
                </h4>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trajectory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="iteration" tick={{fontSize: 10, fill: '#64748b'}} />
                      <YAxis hide />
                      <Tooltip contentStyle={{fontSize: '10px', backgroundColor: '#0f172a'}} />
                      <Line type="monotone" name="Gradyan Normu" dataKey="gradNorm" stroke="#10b981" strokeWidth={2} dot={false} />
                      <ReferenceLine y={0.1} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'Eşik', position: 'top', fill: '#f43f5e', fontSize: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3 mb-3 text-indigo-400">
              <MoveRight className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">Vektör Kalkülüsü</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic font-black uppercase tracking-tighter">
              Gradyan vektörü, hata yüzeyindeki en dik artış yönünü gösterir. Algoritma bu yönün tersine doğru ilerleyerek global minimuma ulaşır.
            </p>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3 mb-3 text-emerald-400">
              <RefreshCw className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">Adaptif Metodlar</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic font-black uppercase tracking-tighter">
              Adam optimizasyonu, gradyanın birinci ve ikinci momentlerini kullanarak öğrenme hızını dinamik bir şekilde kalibre eder.
            </p>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-3 mb-3 text-rose-400">
              <Binary className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">Kararlılık Denetimi</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic font-black uppercase tracking-tighter">
              Gradyan normu ||∇f|| değeri sıfıra yaklaştıkça sistem yerel veya küresel bir minimuma ulaşıldığını kesinleştirir.
            </p>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-600 font-mono uppercase tracking-widest font-black">
        <div className="flex gap-8">
          <span>Engine: SKL_Logic_v2.4</span>
          <span>Analiz: Isometric SVG Projection</span>
          <span>Durum: Operasyonel</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Neural Engine Stable
        </div>
      </footer>
    </div>
  );
}
