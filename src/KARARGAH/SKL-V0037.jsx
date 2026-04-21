/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / CNN-LOGIC
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v3.0.0-CNN (Spatial Verified)
 * @credits   : React, Recharts, Tailwind CSS.
 * @license   : MIT | Mühendislik mühürü korunmak şartıyla serbest kullanım.
 * @note      : Mekansal tensör işleme ve CNN hiperparametre simülatörü.
 */

import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Layers, Cpu, Box, Activity, Database, GitBranch, 
  Filter, Binary, Maximize, AlertCircle, ChevronRight, Zap
} from 'lucide-react';

// --- LOGIC: cnnLogicEngine.js ---

/**
 * CNN Metriklerini hesaplayan deterministik motor.
 * Formül: O = ((W - f + 2P) / S) + 1
 */
const calculateCNNMetrics = (config) => {
  const { W, f, S, P, K, C_in } = config;
  const O = Math.floor((W - f + 2 * P) / S) + 1;
  const params = (f * f * C_in + 1) * K;
  const flops = O * O * K * f * f * C_in;
  const receptiveField = f;
  const compressionRatio = 1 - (Math.pow(O, 2) / Math.pow(W, 2));

  return { O, params, flops, receptiveField, compressionRatio };
};

// --- UI: SVG Tensor Visualization ---

const TensorVisualizer = ({ config, metrics }) => {
  // İzometrik projeksiyon katsayıları
  const isoTransform = "rotateX(60deg) rotateZ(-45deg)";
  
  return (
    <div className="w-full h-[500px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-12 shadow-inner">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="flex items-center gap-16 relative z-10 scale-75 md:scale-100">
        
        {/* Input Tensor Volume */}
        <div className="relative group">
          <div className="text-[10px] text-blue-400 font-mono absolute -top-12 left-0 uppercase tracking-widest font-black italic">
            Input Tensor ({config.W}x{config.W}x{config.C_in})
          </div>
          <div 
            className="relative border-2 border-blue-500/40 bg-blue-500/5 shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500"
            style={{ 
              width: `${config.W * 4}px`, 
              height: `${config.W * 4}px`, 
              transform: isoTransform,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Kernel Shadow (Animated Sliding Window) */}
            <div 
              className="absolute border border-rose-500 bg-rose-500/20 animate-pulse"
              style={{
                width: `${config.f * 4}px`,
                height: `${config.f * 4}px`,
                animation: 'kernelSlide 4s infinite linear'
              }}
            />
          </div>
        </div>

        {/* Projection Lines (SVG) */}
        <div className="w-32 h-1 relative">
           <svg className="absolute inset-0 w-full h-24 -top-12 overflow-visible">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                  <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.4 }} />
                </linearGradient>
              </defs>
              <path d="M0,12 L128,48" stroke="url(#grad1)" strokeWidth="1" fill="none" strokeDasharray="4 2" />
              <path d="M0,12 L128,-24" stroke="url(#grad1)" strokeWidth="1" fill="none" strokeDasharray="4 2" />
           </svg>
        </div>

        {/* Output Feature Map Volume */}
        <div className="relative group">
          <div className="text-[10px] text-emerald-400 font-mono absolute -top-12 left-0 uppercase tracking-widest font-black italic">
            Feature Map ({metrics.O}x{metrics.O}x{config.K})
          </div>
          <div 
            className="relative border-2 border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
            style={{ 
              width: `${metrics.O * 4}px`, 
              height: `${metrics.O * 4}px`, 
              transform: isoTransform,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Activation Pulse */}
            <div className="absolute inset-0 bg-emerald-400/10 animate-pulse" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kernelSlide {
          0% { transform: translate(0, 0); }
          25% { transform: translate(calc(100% * ${config.W/config.f - 1}), 0); }
          50% { transform: translate(calc(100% * ${config.W/config.f - 1}), calc(100% * ${config.W/config.f - 1})); }
          75% { transform: translate(0, calc(100% * ${config.W/config.f - 1})); }
          100% { transform: translate(0, 0); }
        }
      `}} />
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('spatial');
  const [config, setConfig] = useState({
    W: 32, f: 3, S: 1, P: 1, K: 32, C_in: 3
  });

  const metrics = useMemo(() => calculateCNNMetrics(config), [config]);

  const featureHierarchy = [
    { level: "L1: Kenar Seçicilik", score: 92, desc: "Gabor filtreleri benzeri gradyan tespiti." },
    { level: "L2: Doku Analizi", score: 78, desc: "Tekrarlayan desenlerin tensör eşleşmesi." },
    { level: "L3: Parça Bütünlüğü", score: 64, desc: "Semantik obje parçalarının birleşimi." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      
      {/* Engineering Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase flex items-center">
              CNN-Logic AI <span className="text-slate-500 font-mono text-sm ml-3 italic">v3.0</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none">Spatial Tensor Processing Unit / Simulation</p>
          </div>
        </div>
        
        <nav className="flex p-1 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl">
          <button 
            onClick={() => setActiveTab('spatial')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all text-[10px] font-black uppercase tracking-widest ${activeTab === 'spatial' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Maximize className="w-4 h-4" /> Mekansal Geometri
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all text-[10px] font-black uppercase tracking-widest ${activeTab === 'stats' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Activity className="w-4 h-4" /> Operasyonel Veri
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Section */}
          <aside className="lg:col-span-4 space-y-6">
            <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <h3 className="text-[10px] font-black mb-6 text-slate-500 uppercase tracking-[0.2em] flex items-center gap-3 italic">
                <Filter className="w-4 h-4 text-indigo-400" /> Hiperparametre Seti
              </h3>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic leading-none">Giriş Boyutu ($W$)</label>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold">{config.W}px</span>
                  </div>
                  <input 
                    type="range" min="16" max="64" step="8"
                    value={config.W}
                    onChange={(e) => setConfig({...config, W: parseInt(e.target.value)})}
                    className="w-full accent-indigo-500 bg-slate-800 h-1 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2 italic">Çekirdek ($f$)</label>
                    <select 
                      value={config.f}
                      onChange={(e) => setConfig({...config, f: parseInt(e.target.value)})}
                      className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-[11px] font-black font-mono outline-none focus:border-indigo-500 transition-colors"
                    >
                      {[1, 3, 5, 7].map(v => <option key={v} value={v}>{v}x{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2 italic">Adım ($S$)</label>
                    <select 
                      value={config.S}
                      onChange={(e) => setConfig({...config, S: parseInt(e.target.value)})}
                      className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-[11px] font-black font-mono outline-none focus:border-indigo-500 transition-colors"
                    >
                      {[1, 2, 4].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2 italic">Filtre ($K$)</label>
                    <input 
                      type="number" value={config.K}
                      onChange={(e) => setConfig({...config, K: parseInt(e.target.value)})}
                      className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-[11px] font-black font-mono outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2 italic">Padding ($P$)</label>
                    <input 
                      type="number" value={config.P}
                      onChange={(e) => setConfig({...config, P: parseInt(e.target.value)})}
                      className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-[11px] font-black font-mono outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <h3 className="text-[10px] font-black mb-6 text-slate-500 uppercase tracking-[0.2em] italic">Performans Özeti</h3>
              <div className="space-y-4 font-mono">
                <div className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800/50 group hover:border-indigo-500/30 transition-all">
                  <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Parametre</span>
                  <span className="text-xs text-indigo-400 font-black italic">{(metrics.params / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800/50 group hover:border-emerald-500/30 transition-all">
                  <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest">FLOPs (M)</span>
                  <span className="text-xs text-emerald-400 font-black italic">{(metrics.flops / 1e6).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800/50 group hover:border-amber-500/30 transition-all">
                  <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Sıkıştırma</span>
                  <span className="text-xs text-amber-400 font-black italic">{(metrics.compressionRatio * 100).toFixed(1)}%</span>
                </div>
              </div>
            </section>
          </aside>

          {/* Visualization Section */}
          <div className="lg:col-span-8 space-y-6">
            <TensorVisualizer config={config} metrics={metrics} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-2xl">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-6 flex items-center gap-3 tracking-[0.2em] italic">
                  <Binary className="w-4 h-4 text-blue-400" /> Öznitelik Hiyerarşisi
                </h4>
                <div className="space-y-4">
                  {featureHierarchy.map((item, i) => (
                    <div key={i} className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 group hover:border-indigo-500/50 transition-all">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] font-black text-slate-300 uppercase tracking-tighter italic">{item.level}</span>
                        <span className="text-[10px] font-mono text-indigo-400 font-black">{item.score}%</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-bold italic opacity-70 uppercase tracking-tight">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-2xl h-[340px]">
                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-8 flex items-center gap-3 tracking-[0.2em] italic">
                  <Activity className="w-4 h-4 text-emerald-400" /> Gradyan Akış Analizi
                </h4>
                <ResponsiveContainer width="100%" height="75%">
                  <AreaChart data={[
                    { l: 'L1', v: 40 }, { l: 'L2', v: 75 }, { l: 'L3', v: 55 }, { l: 'L4', v: 90 }, { l: 'L5', v: 60 }
                  ]}>
                    <defs>
                      <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="l" tick={{fontSize: 10, fill: '#475569'}} axisLine={false} />
                    <YAxis hide />
                    <Area type="monotone" dataKey="v" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specification Panels */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
          <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl shadow-xl hover:border-indigo-500/30 transition-all group">
            <div className="flex items-center gap-4 mb-5 text-indigo-400">
              <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Reseptif Alan</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed italic uppercase font-bold opacity-60">
              Tekil bir nöronun giriş görüntüsü üzerinde kapsadığı teorik alan <strong>{metrics.receptiveField}x{metrics.receptiveField}</strong> pikseldir. Derinlik arttıkça bu alan eksponansiyel genişler.
            </p>
          </div>
          <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl shadow-xl hover:border-emerald-500/30 transition-all group">
            <div className="flex items-center gap-4 mb-5 text-emerald-400">
              <Database className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Bellek Yerleşimi</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed italic uppercase font-bold opacity-60">
              Öznitelik haritası için gereken statik RAM: <strong>{((metrics.O * metrics.O * config.K * 4) / 1024).toFixed(2)} KB</strong>. Bu değer gömülü sistemler için optimize edilmiştir.
            </p>
          </div>
          <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl shadow-xl hover:border-amber-500/30 transition-all group">
            <div className="flex items-center gap-4 mb-5 text-amber-400">
              <AlertCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Gradyan Kararlılığı</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed italic uppercase font-bold opacity-60">
              Stride={config.S} kullanımı sinyal seyreltmesine (Downsampling) yol açar. Bilgi kaybını önlemek için Pooling öncesi aktivasyon yoğunluğu denetlenmelidir.
            </p>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 flex justify-between items-center text-[9px] text-slate-600 font-mono uppercase font-black tracking-widest italic">
        <div className="flex gap-10">
          <span>WEBGL: DISABLED (SVG-ONLY)</span>
          <span>DOM NODES: ~740</span>
          <span>PRECISION: FP32</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          CORE_PROTOCOL_ACTIVE_V3.0
        </div>
      </footer>
    </div>
  );
}
