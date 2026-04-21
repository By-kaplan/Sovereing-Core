/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / BACKPROP-LOGIC & TEAM EQUITY
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v4.2.0-BACKPROP (Precision Verified)
 * @credits   : React, Recharts, Tailwind CSS.
 * @license   : MIT | Mühendislik mühürü korunmak şartıyla serbest kullanım.
 * @note      : Diferansiyel zincir kuralı ve gradyan akışını analiz eden autograd simülatörü.
 */

import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

// --- ICONS (SVG Implementation) ---
const Icons = {
  GitMerge: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 6v12"/><polyline points="10 12 7 15 4 12"/><path d="M17 18V6"/><polyline points="14 12 17 9 20 12"/></svg>,
  Activity: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Target: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Zap: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Alert: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Scale: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg>,
  Layers: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Database: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>
};

// --- LOGIC ENGINE ---

const calculateBackpropAnalysis = (config) => {
  const { layerCount, learningRate, initialLoss } = config;
  const layersArray = Array.from({ length: layerCount });
  
  const analysis = layersArray.map((_, idx) => {
    const depth = layersArray.length - idx;
    const vanishingCoeff = Math.pow(0.85, depth); 
    const gradientNormValue = vanishingCoeff * (1 + Math.random() * 0.15);
    const deltaValue = initialLoss * vanishingCoeff;
    const weightUpdateValue = deltaValue * learningRate; 
    
    return {
      id: `L${idx + 1}`,
      gradientNorm: gradientNormValue,
      delta: deltaValue,
      updateDelta: weightUpdateValue,
      sensitivity: vanishingCoeff * 100,
      status: gradientNormValue < 0.05 ? 'Vanishing' : gradientNormValue > 5 ? 'Exploding' : 'Stable'
    };
  }).reverse(); 

  const efficiency = (analysis[analysis.length - 1].gradientNorm / analysis[0].gradientNorm) * 100;

  return { analysis, efficiency };
};

const equityEngine = {
  calculateMetrics: (members) => {
    const totalWeight = members.reduce((acc, m) => acc + m.difficultySum, 0);
    const avgWeight = totalWeight / (members.length || 1);
    return members.map(m => ({
      ...m,
      contributionScore: (((m.difficultySum / (totalWeight || 1) * 0.5) + (m.peerScore / 100 * 0.3) + (m.tasks / 40 * 0.2)) * 100).toFixed(2),
      imbalance: (m.difficultySum - avgWeight).toFixed(2)
    })).sort((a, b) => parseFloat(b.contributionScore) - parseFloat(a.contributionScore));
  }
};

// --- DATA ---

const INITIAL_PROJECT_DATA = {
  members: [
    { id: "U1", name: "Mimar_01", tasks: 8, difficultySum: 45, timeSpent: 120, peerScore: 92 },
    { id: "U2", name: "Geliştirici_02", tasks: 12, difficultySum: 78, timeSpent: 210, peerScore: 88 },
    { id: "U3", name: "Analist_03", tasks: 5, difficultySum: 20, timeSpent: 60, peerScore: 75 },
    { id: "U4", name: "Tester_04", tasks: 10, difficultySum: 55, timeSpent: 150, peerScore: 95 }
  ]
};

// --- UI COMPONENTS ---

const GradientBackflowVisualizer = ({ analysis, isAnimating }) => {
  return (
    <div className="w-full h-[400px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-8 shadow-2xl">
      <div className="absolute inset-0 opacity-5 font-mono text-[8px] overflow-hidden select-none pointer-events-none leading-tight">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            {Array.from({ length: 50 }).map(() => Math.random().toString(16).slice(2, 6)).join(' ')}
          </div>
        ))}
      </div>

      <div className="flex flex-row-reverse items-center gap-4 relative z-10 w-full justify-between max-w-4xl">
        {analysis.map((layer, idx) => (
          <React.Fragment key={layer.id}>
            <div className="relative flex flex-col items-center group">
              <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 shadow-lg
                ${layer.status === 'Vanishing' ? 'border-rose-500/40 bg-rose-500/10' : 'border-cyan-500/40 bg-cyan-500/10 shadow-cyan-500/10'}
              `}>
                <Icons.Layers className={`w-7 h-7 ${layer.status === 'Vanishing' ? 'text-rose-400' : 'text-cyan-400'}`} />
              </div>
              
              <div className="absolute -top-12 text-[10px] font-mono text-slate-500 whitespace-nowrap bg-slate-950 px-2 py-1 rounded border border-slate-800">
                {String(layer.id)} | δ: {layer.delta.toFixed(3)}
              </div>
              
              <div className="mt-4 w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className={`h-full transition-all duration-1000 ${layer.status === 'Vanishing' ? 'bg-rose-500' : 'bg-cyan-500'}`}
                  style={{ width: `${Math.max(10, layer.sensitivity)}%` }} 
                />
              </div>
            </div>

            {idx < analysis.length - 1 && (
              <div className="flex-1 h-0.5 bg-slate-800 relative">
                {isAnimating && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-l from-transparent via-cyan-400 to-transparent w-full animate-backflow"
                    style={{ animationDelay: `${idx * 0.3}s` }}
                  />
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="absolute bottom-6 right-8 text-[10px] font-mono text-rose-500 flex items-center gap-2 font-black uppercase tracking-widest">
        <Icons.Target className="w-3 h-3" /> Loss Origin
      </div>
      <div className="absolute bottom-6 left-8 text-[10px] font-mono text-cyan-500 flex items-center gap-2 font-black uppercase tracking-widest">
        Param Update Final <Icons.Zap className="w-3 h-3" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes backflowPulse {
          0% { transform: translateX(100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        .animate-backflow {
          animation: backflowPulse 2.5s infinite linear;
        }
      `}} />
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('BACKPROP');
  const [isAnimating, setIsAnimating] = useState(true);
  const [config, setConfig] = useState({
    layerCount: 5,
    learningRate: 0.01,
    initialLoss: 0.85
  });

  const [projectData] = useState(INITIAL_PROJECT_DATA);
  const equityMetrics = useMemo(() => equityEngine.calculateMetrics(projectData.members), [projectData]);

  const { analysis, efficiency } = useMemo(() => {
    return calculateBackpropAnalysis(config);
  }, [config]);

  const chartData = useMemo(() => {
    return [...analysis].reverse().map(entry => ({
      name: entry.id,
      norm: entry.gradientNorm,
      delta: entry.delta
    }));
  }, [analysis]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 selection:bg-cyan-500/30">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-4">
            <span className="text-cyan-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]"><Icons.GitMerge className="w-8 h-8 rotate-180" /></span>
            MÜHENDİS KONTROL MERKEZİ <span className="text-slate-500 font-mono text-sm tracking-normal font-medium ml-2">v4.2.0</span>
          </h1>
          <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest italic leading-none">Diferansiyel Autograd & Zincir Kuralı Simülatörü</p>
        </div>
        
        <nav className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-2xl">
          {['EQUITY', 'BACKPROP'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-widest ${activeTab === tab ? 'bg-cyan-600 text-white shadow-[0_4px_12px_rgba(8,145,178,0.3)]' : 'text-slate-500 hover:text-slate-200'}`}
            >
              {tab === 'EQUITY' ? 'TEAM EQUITY' : 'BACKPROP LOGIC'}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        {activeTab === 'EQUITY' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <section className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-black uppercase text-slate-400 flex items-center gap-3 tracking-widest"><Icons.Activity className="w-5 h-5" /> İş Yükü Varyans Analizi</h2>
                <div className="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-tighter font-bold italic">Metric: Difficulty Sum</div>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={equityMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={10} fontStyle="italic" />
                    <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
                    <Bar dataKey="difficultySum" name="Yük" fill="#0891b2" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-xs font-black text-slate-400 uppercase mb-6 tracking-widest italic">Hesap Verebilirlik Matrisi</h3>
              <div className="space-y-4">
                {equityMetrics.map(m => (
                  <div key={m.id} className="group p-4 bg-slate-950/50 hover:bg-cyan-600/10 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-all flex justify-between items-center font-mono">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mb-1">{String(m.name)}</div>
                      <div className="text-[8px] text-slate-600 uppercase italic">Imbalance: {m.imbalance} Δ</div>
                    </div>
                    <span className="text-cyan-400 font-black text-sm italic">{m.contributionScore}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Controls */}
              <aside className="lg:col-span-4 space-y-6">
                <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xs font-black mb-8 text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                    <Icons.Activity className="w-5 h-5 text-cyan-400" /> Parametre Kontrolü
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Ağ Derinliği (L)</label>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold italic">{String(config.layerCount)} Katman</span>
                      </div>
                      <input 
                        type="range" min="3" max="8" step="1"
                        value={config.layerCount}
                        onChange={(e) => setConfig(prev => ({ ...prev, layerCount: parseInt(e.target.value) }))}
                        className="w-full accent-cyan-500 bg-slate-800 h-1 rounded-full appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Öğrenme Hızı ($\eta$)</label>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold italic">{String(config.learningRate)}</span>
                      </div>
                      <input 
                        type="range" min="0.001" max="0.1" step="0.005"
                        value={config.learningRate}
                        onChange={(e) => setConfig(prev => ({ ...prev, learningRate: parseFloat(e.target.value) }))}
                        className="w-full accent-cyan-500 bg-slate-800 h-1 rounded-full appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex justify-between text-[10px] font-black italic">
                        <span className="text-slate-500 uppercase tracking-widest">Efficiency Index:</span>
                        <span className={`font-mono ${efficiency > 50 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {efficiency.toFixed(2)}%
                        </span>
                      </div>
                      <button 
                        onClick={() => setIsAnimating(!isAnimating)}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-slate-700 active:scale-95"
                      >
                        {isAnimating ? 'Stream: Active' : 'Stream: Paused'}
                      </button>
                    </div>
                  </div>
                </section>

                <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-xl">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase mb-6 tracking-widest italic">Gradyan Norm Dağılımı</h4>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorNorm" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                        />
                        <Area type="monotone" dataKey="norm" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorNorm)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </section>
              </aside>

              {/* Flow Visualizer */}
              <div className="lg:col-span-8 space-y-8">
                <GradientBackflowVisualizer analysis={analysis} isAnimating={isAnimating} />

                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-3 italic">
                      <Icons.Scale className="w-4 h-4 text-amber-500" /> Gradyan Dağıtım Matrisi (Autograd v4.2)
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-950 text-[9px] text-slate-500 uppercase font-black tracking-widest">
                        <tr>
                          <th className="px-8 py-4">Layer (l)</th>
                          <th className="px-8 py-4">Norm ($\|\nabla\|$)</th>
                          <th className="px-8 py-4">Error ($\delta$)</th>
                          <th className="px-8 py-4">Update ($\Delta w$)</th>
                          <th className="px-8 py-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono text-[11px] font-bold">
                        {analysis.map((entry) => (
                          <tr key={entry.id} className="hover:bg-cyan-500/5 transition-colors">
                            <td className="px-8 py-4 text-slate-400 italic">{String(entry.id)}</td>
                            <td className="px-8 py-4 text-cyan-400 tracking-tighter">{entry.gradientNorm.toFixed(5)}</td>
                            <td className="px-8 py-4 text-slate-300">{entry.delta.toFixed(5)}</td>
                            <td className="px-8 py-4 text-emerald-400">{entry.updateDelta.toFixed(7)}</td>
                            <td className="px-8 py-4 text-right">
                              <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase italic tracking-widest border shadow-sm
                                ${entry.status === 'Stable' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' : 'border-rose-500/30 text-rose-400 bg-rose-500/5'}
                              `}>
                                {String(entry.status)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Informational Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl shadow-xl hover:border-cyan-500/30 transition-all group">
                <div className="flex items-center gap-4 mb-4 text-cyan-400">
                  <Icons.Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Gradyan Sızıntısı</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed italic uppercase font-bold opacity-60">
                  {"Hatanın katmanlar boyunca geriye sızması, diferansiyel operatörlerin ($\\frac{\\partial \\mathcal{L}}{\\partial a}$) çarpımıyla gerçekleşir. Zincir kuralı, ağırlık düzeltme vektörünü belirler."}
                </p>
              </div>
              <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl shadow-xl hover:border-emerald-500/30 transition-all group">
                <div className="flex items-center gap-4 mb-4 text-emerald-400">
                  <Icons.Database className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Hata Atama Payı</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed italic uppercase font-bold opacity-60">
                  {"$\\delta^{(l)}$, katman $l$'deki nöronların toplam kayıp üzerindeki sorumluluğunu temsil eder. $\\delta$ ne kadar yüksekse, parametre güncelleme şiddeti ($\\Delta w$) o kadar artar."}
                </p>
              </div>
              <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl shadow-xl hover:border-amber-500/30 transition-all group">
                <div className="flex items-center gap-4 mb-4 text-amber-500">
                  <Icons.Alert className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Stabilite Analizi</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed italic uppercase font-bold opacity-60">
                  {"Gradyanların 0.1 ile 1.0 arasında kalması istenir. $\\delta < 0.05$ durumu \"Vanishing\" olarak işaretlenir ve öğrenme durma noktasına gelir."}
                </p>
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 flex justify-between items-center text-[9px] text-slate-600 font-mono uppercase font-black tracking-widest italic">
        <div className="flex gap-10">
          <span className="flex items-center gap-2">Engine: Autograd_v4.2</span>
          <span className="flex items-center gap-2">Mode: SVG_Flow_Visualizer</span>
          <span className="flex items-center gap-2">Status: Stable</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
          System Operational
        </div>
      </footer>
    </div>
  );
}
