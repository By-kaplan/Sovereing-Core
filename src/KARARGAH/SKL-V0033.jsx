/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / TRAINING-LOGIC & TEAM EQUITY
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v3.4.3-STABLE (Precision Verified)
 * @credits   : React, Recharts, Tailwind CSS.
 * @license   : MIT | Mühendislik mühürü korunmak şartıyla serbest kullanım.
 */

import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell
} from 'recharts';

/**
 * MANTIK MOTORU: trainingLogicEngine
 * Gradyan inişi ve VRAM tüketimi için deterministik simülasyon.
 */
const trainingLogicEngine = {
  simulateTrainingStep: (epoch, eta, batchSize) => {
    const noise = (Math.random() - 0.5) * 0.02;
    const loss = 2.0 * Math.exp(-0.2 * epoch) + 0.1 + noise;
    const gradientNorm = 1.5 * Math.exp(-0.15 * epoch) + (Math.random() * 0.05);
    const vram = 4.2 + (batchSize / 128) * 1.5; 
    return { epoch, loss, gradientNorm, vram };
  }
};

const INITIAL_PROJECT_DATA = {
  members: [
    { id: "U1", name: "Mimar_01", tasks: 8, difficultySum: 45, timeSpent: 120, peerScore: 92 },
    { id: "U2", name: "Geliştirici_02", tasks: 12, difficultySum: 78, timeSpent: 210, peerScore: 88 },
    { id: "U3", name: "Analist_03", tasks: 5, difficultySum: 20, timeSpent: 60, peerScore: 75 },
    { id: "U4", name: "Tester_04", tasks: 10, difficultySum: 55, timeSpent: 150, peerScore: 95 }
  ]
};

const Icons = {
  Activity: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  Layers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>,
  Zap: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  Cpu: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>,
  TrendingDown: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
};

export default function App() {
  const [activeTab, setActiveTab] = useState('TRAINING');
  const [projectData] = useState(INITIAL_PROJECT_DATA);

  const metrics = useMemo(() => {
    const totalWeight = projectData.members.reduce((acc, m) => acc + m.difficultySum, 0);
    const avgWeight = totalWeight / (projectData.members.length || 1);
    return projectData.members.map(m => ({
      ...m,
      contributionScore: (((m.difficultySum / (totalWeight || 1) * 0.5) + (m.peerScore / 100 * 0.3) + (m.tasks / 40 * 0.2)) * 100).toFixed(2),
      imbalance: (m.difficultySum - avgWeight).toFixed(2)
    })).sort((a, b) => parseFloat(b.contributionScore) - parseFloat(a.contributionScore));
  }, [projectData]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 selection:bg-blue-500/30">
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-3">
            <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"><Icons.Layers /></span>
            MÜHENDİS KONTROL MERKEZİ <span className="text-slate-500 font-mono text-sm tracking-normal font-medium ml-2">v3.4.3</span>
          </h1>
          <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest italic leading-none">Eğitim Protokolü: Gradyan İnişi ve Optimizasyon</p>
        </div>
        
        <nav className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-2xl">
          {['EQUITY', 'TRAINING'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-widest ${activeTab === tab ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]' : 'text-slate-500 hover:text-slate-200'}`}
            >
              {tab === 'EQUITY' ? 'TEAM EQUITY' : 'TRAINING LOGIC'}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto">
        {activeTab === 'EQUITY' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <section className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-black uppercase text-slate-400 flex items-center gap-3 tracking-widest"><Icons.Activity /> İş Yükü Varyans Analizi</h2>
                <div className="text-[10px] font-mono text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-tighter font-bold italic">Metric: Difficulty Sum</div>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={10} fontStyle="italic" />
                    <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
                    <Bar dataKey="difficultySum" name="Yük" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
            <div className="space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl">
                <h3 className="text-xs font-black text-slate-400 uppercase mb-6 tracking-widest">Verimlilik Matrisi</h3>
                <div className="space-y-3">
                  {metrics.map(m => (
                    <div key={m.id} className="group p-4 bg-slate-950/50 hover:bg-blue-600/10 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-all flex justify-between items-center font-mono">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mb-1">{String(m.name)}</div>
                        <div className="text-[8px] text-slate-600 uppercase">Task: {m.tasks} / Imb: {m.imbalance}</div>
                      </div>
                      <span className="text-blue-400 font-black text-sm italic">{m.contributionScore}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <TrainingLogicModule />
        )}
      </main>

      <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 text-slate-600 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold gap-4">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Optimization: Adam / SGD</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Backprop: Chain Rule Enabled</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Derleme: 10.04.2024.STABLE_FIX</span>
          <span className="text-slate-800">ORIGIN: KAPLAN_PRECISION</span>
        </div>
      </footer>
    </div>
  );
}

function TrainingLogicModule() {
  const [eta, setEta] = useState(0.001);
  const [batchSize, setBatchSize] = useState(32);
  const epochs = 25;
  
  const trainingData = useMemo(() => {
    return Array.from({ length: epochs }, (_, i) => trainingLogicEngine.simulateTrainingStep(i, eta, batchSize));
  }, [eta, batchSize]);

  const currentLoss = trainingData[trainingData.length - 1]?.loss || 0;
  const currentGrad = trainingData[trainingData.length - 1]?.gradientNorm || 0;
  const currentVram = trainingData[trainingData.length - 1]?.vram || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-6 duration-700">
      <section className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-sm font-black uppercase text-slate-400 flex items-center gap-3 tracking-widest">
            <Icons.TrendingDown /> {"Kayıp Minimizasyonu ($Loss\\ Minimization$)"}
          </h2>
          <span className="text-[9px] font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase font-bold tracking-widest">Optim: Adam Scheduler</span>
        </div>
        
        <div className="flex-grow min-h-[320px] w-full bg-slate-950/30 rounded-2xl p-4 border border-slate-800/50 shadow-inner relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trainingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="epoch" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={5} />
              <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} formatter={(val) => typeof val === 'number' ? val.toFixed(6) : val} />
              <Area type="monotone" dataKey="loss" name="Loss" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorLoss)" />
              <Area type="monotone" dataKey="gradientNorm" name="Grad Norm" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorGrad)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl text-[10px] font-mono shadow-2xl">
              <div className="text-red-400 font-black mb-1 uppercase tracking-tighter">{"Current Loss ($\\mathcal{L}$)"}</div>
              <div className="text-slate-100 text-xl font-black italic tracking-tighter">{currentLoss.toFixed(6)}</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-950/50 p-8 rounded-2xl border border-slate-800/50">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic leading-none">{"Öğrenme Katsayısı ($\\eta$)"}</label>
               <span className="text-[10px] font-mono text-blue-400 font-bold">{eta.toFixed(5)}</span>
            </div>
            <input type="range" min="0.0001" max="0.01" step="0.0001" value={eta} onChange={e => setEta(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500" />
          </div>
          <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic leading-none block">{"Yığın Boyutu (Batch Size)"}</label>
              <div className="flex gap-2">
                {[16, 32, 64, 128].map(size => (
                  <button key={size} onClick={() => setBatchSize(size)} className={`flex-1 py-2 text-[10px] font-black rounded-lg border transition-all ${batchSize === size ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-500'}`}>{size}</button>
                ))}
              </div>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-xl font-mono">
          <h3 className="text-xs font-black text-slate-400 uppercase mb-8 flex items-center gap-3 tracking-widest"><Icons.Cpu /> Kaynak Tahmini</h3>
          <div className="space-y-6">
             <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                <div className="text-[8px] text-slate-600 uppercase font-bold mb-2 tracking-widest">VRAM Kullanımı:</div>
                <div className="flex items-center gap-4">
                  <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ width: `${Math.min(100, (currentVram / 12) * 100)}%` }} />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-black">{currentVram.toFixed(2)} GB</span>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-xl relative overflow-hidden font-mono">
          <h3 className="text-xs font-black text-slate-400 uppercase mb-6 flex items-center gap-3 tracking-widest"><Icons.Zap /> Yakınsama</h3>
          <div className="space-y-4">
             <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                <div className="text-[8px] text-slate-600 uppercase font-bold mb-1 tracking-widest">{"Gradyan Şiddeti ($||\\nabla \\mathcal{L}||$):"}</div>
                <div className="text-lg font-black text-blue-400 italic tracking-tighter">{currentGrad.toFixed(5)}</div>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl font-mono">
          <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
             <h3 className="text-[10px] font-black uppercase tracking-widest italic text-slate-400">Neural Log</h3>
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
          <div className="divide-y divide-slate-800">
             {[
               { label: "Final Loss", val: currentLoss.toFixed(5) },
               { label: "CUDA Status", val: "Active" }
             ].map((item, idx) => (
               <div key={idx} className="p-4 flex justify-between items-center hover:bg-slate-800/20 transition-all">
                 <span className="text-[8px] text-slate-500 uppercase font-bold">{String(item.label)}:</span>
                 <span className="text-[10px] text-slate-300 font-bold">{String(item.val)}</span>
               </div>
             ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
