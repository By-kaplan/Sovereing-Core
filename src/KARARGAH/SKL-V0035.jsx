/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / WEIGHT-LOGIC & TEAM EQUITY
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v3.6.0-WEIGHT (Precision Verified)
 * @credits   : React, Recharts, Tailwind CSS.
 * @license   : MIT | Mühendislik mühürü korunmak şartıyla serbest kullanım.
 * @note      : Ağırlık matrislerinin evrimini ve regülarizasyon etkilerini analiz eden sinaptik protokol.
 */

import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell 
} from 'recharts';

/**
 * MANTIK MOTORU: weightLogicEngine.js
 * Ağırlık tensörlerini ve regülarizasyon etkilerini hesaplar.
 */
const weightLogicEngine = {
  initializeWeights: (size, method = 'Xavier') => {
    const std = method === 'Xavier' ? Math.sqrt(2 / (size + size)) : Math.sqrt(2 / size);
    return Array.from({ length: size }, () => (Math.random() * 2 - 1) * std);
  },
  applyRegularization: (weights, lambda, type = 'L2') => {
    if (type === 'L2') return weights.map(w => w * (1 - lambda));
    if (type === 'L1') return weights.map(w => {
      const absW = Math.abs(w);
      return absW < lambda ? 0 : w - lambda * Math.sign(w);
    });
    return weights;
  },
  getMetrics: (weights) => {
    const mu = weights.reduce((a, b) => a + b, 0) / weights.length;
    const l2Norm = Math.sqrt(weights.reduce((a, b) => a + b * b, 0));
    const sparsity = weights.filter(w => Math.abs(w) < 0.01).length / weights.length;
    return { mu, l2Norm, sparsity };
  }
};

/**
 * TAKIM VERİMLİLİK MOTORU: equityEngine.js
 */
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

const INITIAL_PROJECT_DATA = {
  appId: "ecc-weight-004",
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
  Network: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3m0 14v3M2 12h3m14 0h3m-15.5-6.5l2.1 2.1m9.8 9.8l2.1 2.1m-14 0l2.1-2.1m9.8-9.8l2.1-2.1"></path></svg>
};

export default function App() {
  const [activeTab, setActiveTab] = useState('WEIGHT');
  const [projectData] = useState(INITIAL_PROJECT_DATA);
  
  const metrics = useMemo(() => equityEngine.calculateMetrics(projectData.members), [projectData]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 selection:bg-blue-500/30">
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-3">
            <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"><Icons.Layers /></span>
            MÜHENDİS KONTROL MERKEZİ <span className="text-slate-500 font-mono text-sm tracking-normal font-medium ml-2">v3.6.0</span>
          </h1>
          <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest italic leading-none">Lineer Cebir ve Optimizasyon Teorisi</p>
        </div>
        
        <nav className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-2xl">
          {['EQUITY', 'WEIGHT'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-widest ${activeTab === tab ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]' : 'text-slate-500 hover:text-slate-200'}`}
            >
              {tab}-LOGIC
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto">
        {activeTab === 'EQUITY' && <EquityDashboard metrics={metrics} />}
        {activeTab === 'WEIGHT' && <WeightLogicModule />}
      </main>

      <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 text-slate-600 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold gap-4">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Sistem Durumu: Operasyonel</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Optimizasyon: Xavier Init</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Derleme: 10.04.2024.WEIGHT_FIX</span>
          <span className="text-slate-800">ORIGIN: KAPLAN_PRECISION</span>
        </div>
      </footer>
    </div>
  );
}

function EquityDashboard({ metrics }) {
  return (
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
              <Bar dataKey="contributionScore" name="Katkı %" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h3 className="text-xs font-black text-slate-400 uppercase mb-6 tracking-widest">Hesap Verebilirlik İzleyici</h3>
        <div className="space-y-3">
          {metrics.map(m => (
            <div key={m.id} className="group p-4 bg-slate-950/50 hover:bg-blue-600/10 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-all flex justify-between items-center font-mono">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mb-1">{String(m.name)}</div>
                <div className="text-[8px] text-slate-600 uppercase">Task: {m.tasks}</div>
              </div>
              <span className={`text-[10px] px-3 py-1 rounded-lg font-black italic ${Math.abs(parseFloat(m.imbalance)) > 15 ? 'bg-red-900/30 text-red-400 border border-red-500/20' : 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/20'}`}>
                {m.imbalance} Δ
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WeightLogicModule() {
  const [weights, setWeights] = useState(() => weightLogicEngine.initializeWeights(25, 'Xavier'));
  const [lambda, setLambda] = useState(0.01);
  const [pruningThreshold, setPruningThreshold] = useState(0.05);

  const stats = useMemo(() => weightLogicEngine.getMetrics(weights), [weights]);

  const applyOptimization = () => {
    setWeights(prev => {
      let next = weightLogicEngine.applyRegularization(prev, lambda, 'L2');
      return next.map(w => Math.abs(w) < pruningThreshold ? 0 : w);
    });
  };

  const resetWeights = () => setWeights(weightLogicEngine.initializeWeights(25, 'Xavier'));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-700">
      
      {/* Sinaptik Isı Haritası */}
      <section className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col h-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h2 className="text-sm font-black uppercase text-slate-400 flex items-center gap-3 tracking-widest">
            <Icons.Network /> {"Ağırlık Matrisi Evrimi ($W \\in \\mathbb{R}^{5 \\times 5}$)"}
          </h2>
          <div className="flex gap-2">
            <button onClick={resetWeights} className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-[9px] font-black uppercase transition-colors border border-slate-700">Sıfırla</button>
            <button onClick={applyOptimization} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-[9px] font-black uppercase shadow-lg shadow-blue-900/20 transition-all border border-blue-500">Optimizasyon</button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 max-w-sm mx-auto aspect-square p-8 bg-slate-950/80 rounded-3xl border border-slate-800 shadow-inner relative z-10">
          {weights.map((w, i) => (
            <div 
              key={i} 
              className="relative group flex items-center justify-center rounded-xl transition-all duration-500 border border-slate-800/50 overflow-hidden"
              style={{ 
                backgroundColor: w === 0 ? '#0f172a' : (w > 0 ? `rgba(59, 130, 246, ${Math.min(1, Math.abs(w) * 2.5)})` : `rgba(239, 68, 68, ${Math.min(1, Math.abs(w) * 2.5)})`),
                boxShadow: w === 0 ? 'none' : `inset 0 0 12px ${w > 0 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`
              }}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 text-[9px] font-mono z-10 transition-opacity pointer-events-none">
                <span className="text-slate-500">{`w(${Math.floor(i/5)},${i%5})`}</span>
                <span className="font-bold text-white">{w.toFixed(3)}</span>
              </div>
              {w === 0 && <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />}
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-950/50 p-8 rounded-3xl border border-slate-800/50 relative z-10">
           <div className="space-y-4">
             <div className="flex justify-between items-center">
               <label className="text-[10px] font-black uppercase text-slate-500 block tracking-widest">{"L2 Regülarizasyonu ($\\lambda$)"}</label>
               <span className="text-[10px] font-mono text-blue-400 font-bold">{lambda.toFixed(3)}</span>
             </div>
             <input type="range" min="0" max="0.1" step="0.001" value={lambda} onChange={e => setLambda(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500" />
           </div>
           <div className="space-y-4">
             <div className="flex justify-between items-center">
               <label className="text-[10px] font-black uppercase text-slate-500 block tracking-widest">Budama (Pruning) Eşiği</label>
               <span className="text-[10px] font-mono text-red-400 font-bold">{pruningThreshold.toFixed(3)}</span>
             </div>
             <input type="range" min="0" max="0.2" step="0.005" value={pruningThreshold} onChange={e => setPruningThreshold(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-500" />
           </div>
        </div>
      </section>

      {/* Dağılım ve Bağlantı Metrikleri */}
      <aside className="space-y-6">
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-black text-slate-400 uppercase mb-8 tracking-widest">Ağırlık Dağılımı</h3>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weights.map((w, i) => ({ id: i, val: w }))}>
                <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" vertical={false} />
                <XAxis hide />
                <YAxis hide domain={[-0.6, 0.6]} />
                <Bar dataKey="val">
                  {weights.map((w, index) => (
                    <Cell key={`cell-${index}`} fill={w === 0 ? '#334155' : (w > 0 ? '#3b82f6' : '#ef4444')} fillOpacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 text-center font-mono">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[9px] text-slate-500 uppercase mb-2 font-bold tracking-widest">{"Ortalama ($\\mu_w$)"}</div>
              <div className="text-xs text-blue-400 font-black italic">{stats.mu.toFixed(4)}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[9px] text-slate-500 uppercase mb-2 font-bold tracking-widest">{"L2 Normu ($||W||$)"}</div>
              <div className="text-xs text-purple-400 font-black italic">{stats.l2Norm.toFixed(3)}</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-black text-slate-400 uppercase mb-6 tracking-widest">Sistem Verimliliği</h3>
          <div className="space-y-6">
             <div className="flex justify-between items-center text-[10px] font-black italic">
                <span className="text-slate-500 uppercase tracking-widest">Bağlantı Seyrekliği:</span>
                <span className="font-mono text-blue-400">{(stats.sparsity * 100).toFixed(1)}%</span>
             </div>
             <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner border border-slate-700">
                <div className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out" style={{ width: `${stats.sparsity * 100}%` }} />
             </div>
             <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800/50 mt-4 group">
                <div className="text-[9px] text-slate-500 uppercase mb-2 font-bold tracking-widest group-hover:text-emerald-400 transition-colors italic">{"Öznitelik Hassasiyeti ($\\partial y / \\partial w$)"}</div>
                <div className="text-lg font-mono text-emerald-400 font-black tracking-tighter">{(stats.l2Norm * 0.824).toFixed(4)}</div>
             </div>
          </div>
        </div>
      </aside>

      {/* Şematik Rapor */}
      <section className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-5 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] italic text-slate-400">Sinaptik Ağırlık Raporu (v1.0.4)</h3>
           <div className="text-[9px] font-mono bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full border border-blue-800/30 uppercase font-black tracking-widest">Xavier Initialized</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-slate-800 text-center bg-slate-900/40 font-mono">
           {[
             { label: "Matris Boyutu", val: "5 x 5" },
             { label: "Maks. Ağırlık", val: Math.max(...weights).toFixed(3) },
             { label: "Min. Ağırlık", val: Math.min(...weights).toFixed(3) },
             { label: "Budanan Link", val: String(weights.filter(w => w === 0).length) },
             { label: "Ağ Entropisi", val: (1 - stats.sparsity).toFixed(3) }
           ].map((item, idx) => (
             <div key={idx} className="p-6 hover:bg-slate-800/30 transition-all cursor-default">
               <div className="text-[9px] text-slate-500 uppercase mb-2 font-bold tracking-tighter">{String(item.label)}</div>
               <div className="text-sm font-black italic text-slate-200">{String(item.val)}</div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
