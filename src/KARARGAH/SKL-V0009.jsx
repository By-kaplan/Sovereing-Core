import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Cell, ScatterChart, Scatter, ZAxis, 
  ComposedChart, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

/**
 * PROJE ŞEMASI VE BAŞLANGIÇ VERİLERİ
 */
const INITIAL_PROJECT_DATA = {
  appId: "ecc-predict-012-fixed",
  members: [
    { id: "U1", name: "Mimar_01", tasks: 8, difficultySum: 45, timeSpent: 120, peerScore: 92 },
    { id: "U2", name: "Geliştirici_02", tasks: 12, difficultySum: 78, timeSpent: 210, peerScore: 88 },
    { id: "U3", name: "Analist_03", tasks: 5, difficultySum: 20, timeSpent: 60, peerScore: 75 },
    { id: "U4", name: "Tester_04", tasks: 10, difficultySum: 55, timeSpent: 150, peerScore: 95 }
  ],
  tasks: [
    { id: "T1", title: "Predict-Logic Engine", weight: 22, status: "In-Progress", assignedTo: "U1", deadline: "2024-09-15" },
    { id: "T2", title: "Olasılık Kalibrasyonu", weight: 14, status: "In-Progress", assignedTo: "U2", deadline: "2024-09-20" },
    { id: "T3", title: "Bayesyen Belirsizlik", weight: 18, status: "Planned", assignedTo: "U1", deadline: "2024-10-05" }
  ]
};

/**
 * MANTIK MOTORU: predictLogicEngine.js
 */
const predictLogicEngine = {
  calibrateSoftmax: (logits, temperature = 1.0) => {
    const exponents = logits.map(z => Math.exp(z / temperature));
    const sum = exponents.reduce((a, b) => a + b, 0) || 1;
    return exponents.map(e => e / sum);
  },

  calculateEntropy: (probs) => {
    return -probs.reduce((h, p) => h + (p > 0 ? p * Math.log2(p) : 0), 0);
  },

  generateProbabilityCloud: (points = 40) => {
    return Array.from({ length: points }, (_, i) => {
      const x = (i / points) * 10;
      const mean = 5;
      const std = 1.2;
      const prob = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
      const uncertainty = Math.random() * 0.1;
      return { 
        x: x.toFixed(1), 
        prob, 
        upper: prob + uncertainty,
        lower: Math.max(0, prob - uncertainty)
      };
    });
  },

  estimateConfidence: (probs) => {
    const maxProb = Math.max(...probs);
    const entropy = predictLogicEngine.calculateEntropy(probs);
    const numClasses = probs.length || 1;
    return (maxProb * (1 - entropy / Math.log2(numClasses))) * 100;
  }
};

const errorLogicEngine = {
  calculateTradeoff: (complexity) => {
    const biasSq = 100 * Math.exp(-0.5 * complexity);
    const variance = 2 * Math.pow(complexity, 1.8);
    const noise = 15; 
    const totalError = biasSq + variance + noise;
    return { complexity: complexity.toFixed(1), biasSq, variance, noise, totalError };
  },
  generateTradeoffCurve: (points = 30) => Array.from({ length: points }, (_, i) => errorLogicEngine.calculateTradeoff((i / points) * 10))
};

const equityEngine = {
  calculateMetrics: (members) => {
    const totalWeight = members.reduce((acc, m) => acc + m.difficultySum, 0);
    const avgWeight = totalWeight / (members.length || 1);
    return members.map(m => ({
      ...m,
      contributionScore: (((m.difficultySum / (totalWeight || 1) * 0.5) + (m.peerScore / 100 * 0.3) + (m.tasks / 40 * 0.2)) * 100).toFixed(2),
      imbalance: (m.difficultySum - avgWeight).toFixed(2)
    })).sort((a, b) => b.contributionScore - a.contributionScore);
  }
};

/**
 * UI İKONLARI - Eksik Crosshair eklendi
 */
const Icons = {
  Activity: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  Layers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>,
  TrendingDown: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>,
  Zap: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  Eye: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  Crosshair: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
};

/**
 * ANA UYGULAMA
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('PREDICT');
  const [projectData] = useState(INITIAL_PROJECT_DATA);
  const metrics = useMemo(() => equityEngine.calculateMetrics(projectData.members), [projectData]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-blue-500"><Icons.Layers /></span>
            MÜHENDİS KONTROL MERKEZİ v3.3
          </h1>
          <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest italic tracking-tighter uppercase">Kararlılık Protokolü: Hata Düzeltme v3.3</p>
        </div>
        
        <nav className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 shadow-inner overflow-x-auto">
          {['EQUITY', 'ERROR', 'PREDICT'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-[10px] font-bold transition-all whitespace-nowrap uppercase ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab}-LOGIC
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto">
        {activeTab === 'EQUITY' && <EquityDashboard metrics={metrics} />}
        {activeTab === 'ERROR' && <ErrorLogicModule />}
        {activeTab === 'PREDICT' && <PredictLogicModule />}
      </main>

      <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 text-slate-600 flex justify-between items-center text-[9px] uppercase tracking-widest">
        <div className="flex gap-4">
          <span>Stochastic Inference Engine</span>
          <span>Status: Verified</span>
        </div>
        <span>Derleme: 10.04.2024.PREDICT_FIX</span>
      </footer>
    </div>
  );
}

function EquityDashboard({ metrics }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-sm font-bold uppercase text-slate-400 mb-6 flex items-center gap-2"><Icons.Activity /> İş Yükü Varyans Analizi</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
              <Bar dataKey="difficultySum" name="Yük" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">Verimlilik</h3>
        {metrics.map(m => (
          <div key={m.id} className="mb-2 p-2 bg-slate-950 rounded border border-slate-800 flex justify-between text-[10px] font-mono">
            <span className="text-slate-400">{m.name}</span>
            <span className="text-blue-400">{m.contributionScore}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorLogicModule() {
  const [complexity, setComplexity] = useState(4.2);
  const tradeoffCurve = useMemo(() => errorLogicEngine.generateTradeoffCurve(40), []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-500">
      <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-sm font-bold uppercase text-slate-400 mb-6">Bias-Variance Tradeoff</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tradeoffCurve}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="complexity" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
              <Line type="monotone" dataKey="totalError" name="Total Error" stroke="#10b981" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="biasSq" name="Bias^2" stroke="#3b82f6" strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="variance" name="Variance" stroke="#ef4444" strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

/**
 * PREDICT-LOGIC AI MODÜLÜ
 */
function PredictLogicModule() {
  const [temperature, setTemperature] = useState(1.0);
  const [logits] = useState([2.5, 1.2, 0.5, 3.8, 0.1]); 
  
  const probabilities = useMemo(() => predictLogicEngine.calibrateSoftmax(logits, temperature), [logits, temperature]);
  const entropy = useMemo(() => predictLogicEngine.calculateEntropy(probabilities), [probabilities]);
  const confidence = useMemo(() => predictLogicEngine.estimateConfidence(probabilities), [probabilities, entropy]);
  const distributionCloud = useMemo(() => predictLogicEngine.generateProbabilityCloud(50), []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Olasılık Dağılım Görselleştirici */}
      <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold uppercase text-slate-400 flex items-center gap-2">
            <Icons.Eye /> {'Tahmin Yoğunluğu ($PDF\\ -\\ Olasılık\\ Yoğunluğu$)'}
          </h2>
          <span className="text-[9px] font-mono text-blue-500 uppercase font-bold tracking-tighter tracking-widest">Çıkarım Modu: Bayesyen</span>
        </div>
        
        <div className="h-80 w-full bg-slate-950/50 rounded-lg p-2 border border-slate-800 shadow-inner relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={distributionCloud} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="x" stroke="#64748b" fontSize={10} hide />
              <YAxis stroke="#64748b" fontSize={10} hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', fontSize: '10px' }}
                formatter={(val) => typeof val === 'number' ? val.toFixed(4) : val}
              />
              <Area type="monotone" dataKey="prob" name="Olasılık" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProb)" />
              {/* Belirsizlik Bandı - String keyler ile güvenli hale getirildi */}
              <Line type="monotone" dataKey="upper" stroke="#64748b" strokeDasharray="3 3" dot={false} strokeWidth={1} />
              <Line type="monotone" dataKey="lower" stroke="#64748b" strokeDasharray="3 3" dot={false} strokeWidth={1} />
            </AreaChart>
          </ResponsiveContainer>

          <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 p-3 rounded text-[10px] font-mono shadow-2xl">
             <div className="text-blue-400 font-bold mb-1">STOCHASTIC INFERENCE</div>
             <div className="text-slate-500">Entropi: {entropy.toFixed(4)} bits</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-950/50 p-6 rounded-xl border border-slate-800/50">
          <div>
            <div className="flex justify-between items-center mb-4">
               <label className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Softmax Sıcaklığı ($T$): {temperature.toFixed(2)}</label>
               <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${temperature < 0.5 ? 'bg-emerald-900/40 text-emerald-400' : temperature > 1.5 ? 'bg-orange-900/40 text-orange-400' : 'bg-blue-900/40 text-blue-400'}`}>
                 {temperature < 0.5 ? 'Confident' : temperature > 1.5 ? 'Uniform' : 'Calibrated'}
               </span>
            </div>
            <input 
              type="range" min="0.1" max="5" step="0.1" value={temperature} 
              onChange={e => setTemperature(parseFloat(e.target.value))} 
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
            />
          </div>
          <div className="flex flex-col justify-center">
             <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold mb-1">Tahmin Güveni:</div>
             <div className="flex items-center gap-3">
               <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${confidence}%` }} />
               </div>
               <span className="text-[11px] font-mono font-bold text-blue-400">{confidence.toFixed(1)}%</span>
             </div>
          </div>
        </div>
      </section>

      {/* Tahmin Kararlılık Dashboard */}
      <aside className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-6 flex items-center gap-2"><Icons.Zap /> Sınıf Olasılıkları</h3>
          <div className="space-y-3">
             {probabilities.map((p, i) => (
               <div key={i} className="p-2 bg-slate-950 rounded border border-slate-800">
                 <div className="flex justify-between text-[9px] uppercase font-bold mb-1">
                   <span className="text-slate-500">Sınıf {i+1}</span>
                   <span className="text-blue-400">{(p * 100).toFixed(1)}%</span>
                 </div>
                 <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${p * 100}%` }} />
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2"><Icons.Crosshair /> Belirsizlik Ayrışımı</h3>
          <div className="space-y-4 font-mono">
             <div className="p-3 bg-slate-950/50 rounded border border-slate-800/50">
                <div className="text-[8px] text-slate-500 uppercase font-bold mb-1">Epistemik (Veri):</div>
                <div className="text-xs text-orange-400">{(entropy * 0.42).toFixed(4)} bits</div>
             </div>
             <div className="p-3 bg-slate-950/50 rounded border border-slate-800/50">
                <div className="text-[8px] text-slate-500 uppercase font-bold mb-1">Aleatorik (Gürültü):</div>
                <div className="text-xs text-blue-400">{(entropy * 0.58).toFixed(4)} bits</div>
             </div>
          </div>
        </div>
      </aside>

      {/* Tahmin Raporu Paneli */}
      <section className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
           <h3 className="text-xs font-bold uppercase tracking-wider">Tahmin Analiz Raporu (v1.2.1)</h3>
           <div className="flex gap-2">
             <span className="text-[9px] font-mono bg-blue-900/30 text-blue-400 px-3 py-1 rounded border border-blue-800/30 font-bold uppercase tracking-tighter">Confidence Index: High</span>
             <span className="text-[9px] font-mono bg-purple-900/30 text-purple-400 px-3 py-1 rounded border border-purple-800/30 font-bold uppercase tracking-tighter">Calibration: MAP</span>
           </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 divide-x divide-slate-800 text-center bg-slate-900/40 font-mono">
           {[
             { label: "Güven Skoru", val: confidence.toFixed(2) + "%" },
             { label: "Top Entropi", val: entropy.toFixed(3) },
             { label: "Varyans (σ²)", val: "0.024" },
             { label: "Örneklem (n)", val: "512" },
             { label: "Eşik (p-value)", val: "0.004" },
             { label: "Belirsizlik", val: (entropy > 1.5 ? 'CRITICAL' : 'STABLE') }
           ].map((item, idx) => (
             <div key={idx} className="p-5 hover:bg-slate-800/20 transition-all cursor-default">
               <div className="text-[9px] text-slate-500 uppercase mb-1 font-bold tracking-tighter">{item.label}</div>
               <div className="text-sm font-bold text-slate-200">{item.val}</div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
