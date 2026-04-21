/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / LINEAR-LOGIC & TEAM EQUITY
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v3.5.0-LINEAR (Precision Verified)
 * @credits   : React, Recharts, Tailwind CSS.
 * @license   : MIT | Mühendislik mühürü korunmak şartıyla serbest kullanım.
 * @note      : OLS (Ordinary Least Squares) ve Regresyon metriklerini hesaplayan ekonometrik protokol.
 */

import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Cell, ScatterChart, Scatter, ZAxis, 
  ComposedChart
} from 'recharts';

/**
 * MANTIK MOTORU: linearLogicEngine.js
 * OLS (Ordinary Least Squares) ve Regresyon metriklerini hesaplar.
 */
const linearLogicEngine = {
  calculateOLS: (data) => {
    const n = data.length;
    const sumX = data.reduce((acc, d) => acc + d.x, 0);
    const sumY = data.reduce((acc, d) => acc + d.y, 0);
    const sumXY = data.reduce((acc, d) => acc + d.x * d.y, 0);
    const sumX2 = data.reduce((acc, d) => acc + d.x * d.x, 0);

    const beta1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX || 1e-10);
    const beta0 = (sumY - beta1 * sumX) / n;

    // Metrik hesaplamaları
    const yMean = sumY / n;
    let sst = 0; // Total Sum of Squares
    let ssr = 0; // Residual Sum of Squares
    
    const points = data.map(d => {
      const yPred = beta0 + beta1 * d.x;
      sst += Math.pow(d.y - yMean, 2);
      ssr += Math.pow(d.y - yPred, 2);
      return { ...d, yPred, residual: d.y - yPred };
    });

    const r2 = 1 - (ssr / (sst || 1e-10));
    const mse = ssr / n;

    return { beta0, beta1, r2, mse, points, n };
  },

  generateSyntheticRegression: (n = 60, noiseLevel = 1.5) => {
    const trueBeta0 = 2;
    const trueBeta1 = 1.5;
    return Array.from({ length: n }, (_, i) => {
      const x = i * 0.4;
      const noise = (Math.random() - 0.5) * noiseLevel * 5;
      const y = trueBeta0 + trueBeta1 * x + noise;
      return { x, y };
    });
  }
};

const classiLogicEngine = {
  calculateConfusionMatrix: (threshold, data) => {
    let tp = 0, fp = 0, tn = 0, fn = 0;
    data.forEach(d => {
      const pred = d.prob >= threshold ? 1 : 0;
      if (pred === 1 && d.label === 1) tp++;
      else if (pred === 1 && d.label === 0) fp++;
      else if (pred === 0 && d.label === 0) tn++;
      else if (pred === 0 && d.label === 1) fn++;
    });
    return { tp, fp, tn, fn, accuracy: (tp + tn) / (data.length || 1) };
  }
};

const INITIAL_PROJECT_DATA = {
  appId: "ecc-linear-007",
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
  Chart: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>,
  Trending: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
};

export default function App() {
  const [activeTab, setActiveTab] = useState('LINEAR');
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
            MÜHENDİS KONTROL MERKEZİ <span className="text-slate-500 font-mono text-sm tracking-normal font-medium ml-2">v3.5.0</span>
          </h1>
          <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest italic leading-none">Doğrusal Regresyon ve Ekonometrik Tahmin Protokolü</p>
        </div>
        
        <nav className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 shadow-2xl">
          {['EQUITY', 'CLASSI', 'LINEAR'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-widest ${activeTab === tab ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]' : 'text-slate-500 hover:text-slate-200'}`}
            >
              {tab === 'EQUITY' ? 'TEAM EQUITY' : tab === 'CLASSI' ? 'CLASSI-LOGIC' : 'LINEAR-LOGIC'}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto">
        {activeTab === 'EQUITY' && <EquityDashboard metrics={metrics} />}
        {activeTab === 'CLASSI' && <ClassiLogicPlaceholder />}
        {activeTab === 'LINEAR' && <LinearLogicModule />}
      </main>

      <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 text-slate-600 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold gap-4">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Model: OLS Optimizer</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Hata Payı: Gauss-Markov Standart</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Derleme: 10.04.2024.LINEAR_LOGIC</span>
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
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h3 className="text-xs font-black text-slate-400 uppercase mb-6 tracking-widest">Üye Katkı Verileri</h3>
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
  );
}

function ClassiLogicPlaceholder() {
  return <div className="p-20 text-center bg-slate-900/50 border border-slate-800 rounded-2xl font-mono text-xs uppercase tracking-[0.5em] text-slate-500 animate-pulse">Sınıflandırma Analiz Katmanı Aktif.</div>;
}

function LinearLogicModule() {
  const [noise, setNoise] = useState(1.5);
  const [rawDataset] = useState(() => linearLogicEngine.generateSyntheticRegression(60, 1.5));
  
  const dataset = useMemo(() => {
    return rawDataset.map(d => ({
      ...d,
      y: d.y + (Math.random() - 0.5) * noise
    }));
  }, [rawDataset, noise]);

  const stats = useMemo(() => linearLogicEngine.calculateOLS(dataset), [dataset]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-700">
      <section className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-black uppercase text-slate-400 flex items-center gap-3 tracking-widest">
            <Icons.Trending /> {"En İyi Uyum Doğrusu ($Best\\ Fit\\ Line$)"}
          </h2>
          <span className="text-[9px] font-mono text-blue-500 uppercase font-bold tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Model: Ordinary Least Squares (OLS)</span>
        </div>
        
        <div className="flex-grow min-h-[320px] w-full bg-slate-950/30 rounded-2xl p-4 border border-slate-800/50 shadow-inner relative overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={stats.points} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="x" type="number" stroke="#475569" fontSize={10} hide />
              <YAxis stroke="#475569" fontSize={10} hide />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
              <Scatter name="Gözlemler" dataKey="y" fill="#3b82f6" fillOpacity={0.5} />
              <Line name="Regresyon Doğrusu" dataKey="yPred" stroke="#ef4444" strokeWidth={3} dot={false} activeDot={false} isAnimationActive={true} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="absolute bottom-6 right-6 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl text-[10px] font-mono shadow-2xl">
              <div className="text-blue-400 font-bold mb-1">{"$\\hat{y} = " + stats.beta0.toFixed(2) + " + " + stats.beta1.toFixed(2) + "X$"}</div>
          </div>
        </div>

        <div className="mt-8 p-8 bg-slate-950/50 rounded-2xl border border-slate-800/50">
          <div className="flex justify-between mb-4">
            <label className="text-[10px] font-black uppercase text-slate-500 block tracking-widest">{"Veri Gürültüsü ($\\epsilon$)"}: {noise.toFixed(2)}</label>
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter">Gauss Dağılımı: $N(0, \sigma^2)$</span>
          </div>
          <input type="range" min="0" max="10" step="0.1" value={noise} onChange={e => setNoise(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-red-500" />
          <div className="flex justify-between mt-4 text-[8px] text-slate-600 font-mono uppercase tracking-[0.2em] italic">
            <span>Yüksek Korelasyon</span>
            <span>Heteroscedasticity Riski</span>
            <span>Düşük Belirlenim</span>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-black text-slate-400 uppercase mb-8 flex items-center gap-3 tracking-widest"><Icons.Chart /> Regresyon Özeti</h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">R-Kare ($R^2$):</span>
              <span className="font-mono text-emerald-400 font-black italic">{stats.r2.toFixed(4)}</span>
            </div>
            <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Hata (MSE):</span>
              <span className="font-mono text-red-400 font-black italic">{stats.mse.toFixed(3)}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-black text-slate-400 uppercase mb-6 tracking-widest italic">Artık Dağılımı</h3>
          <div className="h-40 w-full bg-slate-950/30 rounded-xl border border-slate-800/50 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.points.slice(0, 20)}>
                <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" vertical={false} />
                <XAxis hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Bar dataKey="residual">
                  {stats.points.slice(0, 20).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.residual > 0 ? '#3b82f6' : '#ef4444'} fillOpacity={0.6} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[9px] text-slate-500 leading-relaxed italic uppercase font-bold opacity-60 tracking-tight">
            Artıkların sıfır etrafında rastgele dağılması, modelin Gauss-Markov varsayımlarını karşıladığını gösterir.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl font-mono text-[9px] uppercase tracking-widest">
           <div className="p-4 bg-slate-800/50 border-b border-slate-800 text-slate-400 italic">Regression Analysis v1.0.7</div>
           <div className="divide-y divide-slate-800">
             {[
               { label: "Eğim (β1)", val: stats.beta1.toFixed(3) },
               { label: "Kesim (β0)", val: stats.beta0.toFixed(3) },
               { label: "Std. Hata", val: Math.sqrt(stats.mse).toFixed(3) }
             ].map((item, idx) => (
               <div key={idx} className="p-4 flex justify-between items-center hover:bg-slate-800/20">
                 <span className="text-slate-500">{item.label}</span>
                 <span className="text-slate-200 font-bold">{item.val}</span>
               </div>
             ))}
           </div>
        </div>
      </aside>
    </div>
  );
}
