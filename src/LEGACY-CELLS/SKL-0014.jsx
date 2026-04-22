/**
 * @project SOVEREIGN CORE LIBRARY | @uid SKL-SLC-0014
 * @architect [Ömer Kaplan] | @origin Kaplan Halı Yıkama - Precision Dept.
 * @engine Gemini Pro Hybrid-AI | @collaboration Human-AI Augmented
 * @license MIT (Attribution Required) | @status Production-Ready
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShieldAlert, Cpu, Target, Activity, Settings, 
  Layers, TrendingUp, Hash, Box, Zap, Minimize2, Terminal, Info
} from 'lucide-react';

/**
 * @architecture & INTEL
 * @dependencies: react, lucide-react, tailwindcss
 * @credits: Kaplan Halı Yıkama Precision Dept. - Donanım Bağımsız Veri Projeksiyon Grubu.
 * @ai-context: SLC-0013, WebGL hatasını bertaraf eden, saf CSS ve metin tabanlı (Text-Based) nöral analiz modülüdür.
 * @ai-bridge: SKL_Core_Optimizer -> SKL_SLC_0013 -> SKL_Neural_Architecture
 * @ai-roadmap: Grafik kartı bağımsız, yüksek performanslı metin motoru ile 100k+ dosya entegrasyonu vizyonu.
 */

// --- 1. SKL_REG_SCHEMA (Düzenlileştirme Metrik Şeması) ---
const SKL_REG_SCHEMA = {
  SKL_TYPES: ["Yok", "L1 (Lasso)", "L2 (Ridge)", "Elastic Net"],
  SKL_METRICS: {
    SKL_Sparsity: (SKL_Weights) => (SKL_Weights.filter(w => Math.abs(w) < 0.01).length / SKL_Weights.length) * 100,
    SKL_Magnitude: (SKL_Weights) => Math.sqrt(SKL_Weights.reduce((sum, val) => sum + val * val, 0)),
    SKL_GenGap: (SKL_TrainErr, SKL_TestErr) => Math.abs(SKL_TrainErr - SKL_TestErr)
  }
};

// --- 2. SKL_RegLogicEngine (Düzenlileştirme Mantık Motoru) ---
const SKL_RegLogicEngine = {
  SKL_CalculateImpact: (SKL_Lambda, SKL_Type, SKL_BaseWeights, SKL_DropoutRate) => {
    // Optimized by Kaplan Logic: Ağırlık normalizasyon ve ceza hesaplama döngüsü
    let SKL_Weights = [...SKL_BaseWeights];
    let SKL_Penalty = 0;
    
    if (SKL_Type === "L1 (Lasso)") {
      SKL_Weights = SKL_Weights.map(w => {
        const SKL_Sign = w > 0 ? 1 : -1;
        const SKL_NewVal = w - SKL_Lambda * 0.1 * SKL_Sign;
        return (SKL_Sign > 0 ? Math.max(0, SKL_NewVal) : Math.min(0, SKL_NewVal));
      });
      SKL_Penalty = SKL_Lambda * SKL_Weights.reduce((sum, val) => sum + Math.abs(val), 0);
    } else if (SKL_Type === "L2 (Ridge)") {
      const SKL_Decay = 1 - (SKL_Lambda * 0.1);
      SKL_Weights = SKL_Weights.map(w => w * SKL_Decay);
      SKL_Penalty = SKL_Lambda * SKL_Weights.reduce((sum, val) => sum + val * val, 0);
    } else if (SKL_Type === "Elastic Net") {
      const SKL_L1 = SKL_Lambda * 0.5;
      const SKL_L2 = SKL_Lambda * 0.5;
      SKL_Weights = SKL_Weights.map(w => {
        const SKL_Sign = w > 0 ? 1 : -1;
        const SKL_NewVal = (w - SKL_L1 * 0.05 * SKL_Sign) * (1 - SKL_L2 * 0.05);
        return (SKL_Sign > 0 ? Math.max(0, SKL_NewVal) : Math.min(0, SKL_NewVal));
      });
      SKL_Penalty = (SKL_L1 * SKL_Weights.reduce((sum, val) => sum + Math.abs(val), 0)) + 
                    (SKL_L2 * SKL_Weights.reduce((sum, val) => sum + val * val, 0));
    }

    const SKL_EffectiveParams = SKL_Weights.length * (1 - SKL_DropoutRate);
    const SKL_SparsityCount = SKL_Weights.filter(w => Math.abs(w) < 0.001).length;
    
    return {
      SKL_UpdatedWeights: SKL_Weights,
      SKL_PenaltyValue: SKL_Penalty,
      SKL_EffectiveParams,
      SKL_Sparsity: (SKL_SparsityCount / SKL_Weights.length) * 100,
      SKL_GenScore: Math.max(0, Math.min(100, 85 - (SKL_Lambda * 20) + (SKL_DropoutRate * 30)))
    };
  }
};

// --- 3. SKL_TextWeightVisualizer (WebGL Hatası Çözümü) ---
const SKL_TextWeightVisualizer = ({ SKL_Type, SKL_Weights }) => {
  // WebGL yerine metin tabanlı kısıt uzayı temsili
  const SKL_SampleWeights = SKL_Weights.slice(0, 48);
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center font-mono p-4 space-y-4 select-none">
      <div className="grid grid-cols-8 gap-2 opacity-80">
        {SKL_SampleWeights.map((w, i) => {
          const SKL_Intensity = Math.min(100, Math.abs(w) * 100);
          const SKL_Color = w > 0 ? 'text-blue-400' : 'text-rose-400';
          return (
            <div key={i} className="flex flex-col items-center">
              <span className={`text-[8px] ${SKL_Color}`}>
                {Math.abs(w) < 0.01 ? "·" : w > 0 ? "+" : "-"}
              </span>
              <div 
                className={`w-1.5 rounded-full transition-all duration-500 ${w > 0 ? 'bg-blue-500' : 'bg-rose-500'}`}
                style={{ height: `${SKL_Intensity}px`, opacity: SKL_Intensity / 100 }}
              />
            </div>
          );
        })}
      </div>
      <div className="border border-white/10 bg-black/40 p-4 rounded-xl text-[10px] text-slate-500 text-center uppercase tracking-widest leading-relaxed">
        [SKL_TEXT_ENGINE ACTIVE]<br/>
        WebGL Kısıtlamaları Devre Dışı Bırakıldı<br/>
        Kısıt Geometrisi: <span className="text-white">{SKL_Type}</span>
      </div>
    </div>
  );
};

// --- ANA BİLEŞEN ---
export default function App() {
  const [SKL_Lambda, SKL_SetLambda] = useState(0.15);
  const [SKL_Dropout, SKL_SetDropout] = useState(0.3);
  const [SKL_RegType, SKL_SetRegType] = useState("L2 (Ridge)");
  const [SKL_BaseWeights] = useState(() => Array.from({ length: 120 }, () => (Math.random() - 0.5) * 2));

  const SKL_Analysis = useMemo(() => {
    return SKL_RegLogicEngine.SKL_CalculateImpact(SKL_Lambda, SKL_RegType, SKL_BaseWeights, SKL_Dropout);
  }, [SKL_Lambda, SKL_RegType, SKL_BaseWeights, SKL_Dropout]);

  const SKL_Result = {
    SKL_ID: "SLC-0013",
    SKL_GenScore: SKL_Analysis.SKL_GenScore,
    SKL_Penalty: SKL_Analysis.SKL_PenaltyValue,
    SKL_Visualization: "TEXT_BASED_STABLE"
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-mono text-sm p-4 md:p-6 overflow-x-hidden">
      <header className="mb-8 border-b border-white/5 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-white text-2xl font-black tracking-tighter flex items-center gap-3 uppercase">
            <Cpu className="text-rose-500 animate-pulse" size={28} /> Reg-Logic AI <span className="text-slate-500 text-xs bg-slate-800 px-2 py-0.5 rounded">SKL-SLC-0013</span>
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-[0.3em] font-bold">Kaplan Precision Dept. // WebGL Error Fix v1.2</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto overflow-x-auto">
          <SKL_StatBox label="Genelleme" value={`${SKL_Analysis.SKL_GenScore.toFixed(1)}%`} color="text-emerald-400" />
          <SKL_StatBox label="Etkin Parametre" value={String(Math.floor(SKL_Analysis.SKL_EffectiveParams))} color="text-blue-400" />
          <SKL_StatBox label="Ceza" value={SKL_Analysis.SKL_PenaltyValue.toFixed(2)} color="text-rose-400" />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-xs font-bold text-white mb-6 uppercase flex items-center gap-2 tracking-widest">
              <Settings size={14} className="text-rose-400" /> Konfigürasyon
            </h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                  <span className="text-slate-500">Ceza Katsayısı (λ)</span>
                  <span className="text-white bg-slate-800 px-2 py-0.5 rounded">{SKL_Lambda}</span>
                </div>
                <input type="range" min="0" max="1" step="0.01" value={SKL_Lambda}
                  onChange={e => SKL_SetLambda(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                  <span className="text-slate-500">Dropout Oranı (p)</span>
                  <span className="text-white bg-slate-800 px-2 py-0.5 rounded">{SKL_Dropout}</span>
                </div>
                <input type="range" min="0" max="0.9" step="0.05" value={SKL_Dropout}
                  onChange={e => SKL_SetDropout(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" />
              </div>
              <div className="pt-4 border-t border-white/5">
                <div className="grid grid-cols-1 gap-2">
                  {SKL_REG_SCHEMA.SKL_TYPES.map(t => (
                    <button key={t} onClick={() => SKL_SetRegType(t)}
                      className={`text-left px-3 py-2.5 rounded-lg text-[10px] transition-all border ${
                        SKL_RegType === t ? 'bg-rose-500/10 border-rose-500 text-white font-bold' : 'border-white/5 text-slate-400 hover:bg-white/5'
                      }`}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-5">
             <h3 className="text-[10px] font-black text-rose-400 uppercase mb-4 flex items-center gap-2"><ShieldAlert size={12} /> Model Durumu</h3>
             <div className="space-y-2">
               <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${SKL_Analysis.SKL_GenScore}%` }} />
               </div>
               <p className="text-[9px] text-slate-500 uppercase font-bold">Varyans Kararlılık İndeksi</p>
             </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 space-y-6">
          <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 h-[450px] relative overflow-hidden group shadow-2xl">
            <div className="absolute top-6 left-6 z-10 space-y-2">
               <h4 className="text-[10px] font-black text-white uppercase flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                 <Box size={14} className="text-rose-500" /> Ağırlık Uzayı Analizi
               </h4>
               <p className="text-[10px] text-slate-400 max-w-[240px] leading-relaxed font-medium bg-slate-950/40 p-2 rounded-lg border border-white/5">
                 WebGL hatası nedeniyle sistem "Safe-Mode" görselleştirme moduna geçiş yapmıştır. Kaplan Logic ile normalize edilmiş veriler doğrudan sunulmaktadır.
               </p>
            </div>
            
            <SKL_TextWeightVisualizer SKL_Type={SKL_RegType} SKL_Weights={SKL_Analysis.SKL_UpdatedWeights} />
            
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
               <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
                  <p className="text-[9px] text-slate-500 uppercase font-black mb-1">λ Ceza Değeri</p>
                  <p className="text-xl font-black text-rose-400 tabular-nums">{SKL_Analysis.SKL_PenaltyValue.toFixed(4)}</p>
               </div>
               <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] text-slate-500 font-black uppercase">Text_Engine Active</span>
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 shadow-xl overflow-hidden">
                <h3 className="text-[10px] font-black text-white uppercase mb-4 flex items-center gap-2"><Hash size={12} className="text-blue-400" /> Ham Dağılım</h3>
                <div className="space-y-1.5 h-40 overflow-y-auto font-mono text-[9px] text-slate-500">
                  {SKL_Analysis.SKL_UpdatedWeights.slice(0, 15).map((w, i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 pb-1">
                      <span>WEIGHT_{i.toString().padStart(3, '0')}</span>
                      <span className={w > 0 ? "text-blue-400" : "text-rose-400"}>{w.toFixed(6)}</span>
                    </div>
                  ))}
                  <div className="text-center py-2 animate-pulse italic">... [SKL_BUFFER_STREAM] ...</div>
                </div>
             </div>
             <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-[10px] font-black text-white uppercase mb-4 flex items-center gap-2 tracking-widest"><Activity size={12} className="text-emerald-400" /> Yakınsama Analizi</h3>
                <div className="space-y-4">
                   <SKL_MetricRow label="Seyreklik (Sparsity)" value={`${SKL_Analysis.SKL_Sparsity.toFixed(1)}%`} />
                   <SKL_MetricRow label="L2 Normu ||w||₂" value={SKL_REG_SCHEMA.SKL_METRICS.SKL_Magnitude(SKL_Analysis.SKL_UpdatedWeights).toFixed(3)} />
                   <SKL_MetricRow label="Genelleme Kapasitesi" value={SKL_Analysis.SKL_GenScore > 75 ? "Yüksek" : "Normal"} />
                   <SKL_MetricRow label="Tahmini Varyans" value={(1 - (SKL_Lambda * 0.4 + SKL_Dropout * 0.4)).toFixed(3)} />
                </div>
             </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
             <div className="absolute -top-4 -right-4 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Layers size={80} className="text-indigo-400" /></div>
             <h3 className="text-xs font-black text-white uppercase mb-4 flex items-center gap-2 tracking-widest"><Zap size={14} className="text-amber-400" /> Stokastik Dropout</h3>
             <p className="text-[11px] leading-relaxed text-slate-400 mb-6 font-medium italic">Nöronların maskelenmesi gürültü direncini artırır.</p>
             <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[9px] text-slate-500 font-black uppercase">Boost Factor</span>
                   <span className="text-[10px] text-amber-400 font-black">{(SKL_Dropout * 10).toFixed(1)}x</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-500 transition-all duration-700" style={{ width: `${SKL_Dropout * 100}%` }} />
                </div>
             </div>
          </div>
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
             <h3 className="text-xs font-black text-white uppercase mb-4 flex items-center gap-2 tracking-widest"><TrendingUp size={14} className="text-emerald-400" /> Sistem Mesajı</h3>
             <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl flex gap-3">
               <Terminal size={18} className="text-rose-500 shrink-0" />
               <p className="text-[10px] text-slate-400 leading-tight">
                 <span className="text-rose-500 font-bold">[!] WEBGL_CONTEXT_LOST:</span> Donanım hızlandırma devre dışı. SKL_Text_Engine üzerinden devam ediliyor.
               </p>
             </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>SKL_SLC_0013 // STABLE TEXT MONITOR</span>
        </div>
        <div className="flex gap-4">
          <code className="text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded">SKL_Result: {JSON.stringify(SKL_Result)}</code>
        </div>
      </footer>
    </div>
  );
}

const SKL_StatBox = ({ label, value, color }) => (
  <div className="bg-slate-900 border border-white/5 px-5 py-3 rounded-2xl shadow-xl min-w-[140px] flex-shrink-0 transition-transform hover:scale-[1.02]">
    <p className="text-[9px] text-slate-500 uppercase font-black tracking-tighter mb-1">{label}</p>
    <p className={`text-xl font-black tracking-tighter tabular-nums ${color}`}>{value}</p>
  </div>
);

const SKL_MetricRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0 group">
    <span className="text-[9px] text-slate-500 font-bold uppercase group-hover:text-slate-300 transition-colors">{label}</span>
    <span className="text-[10px] text-white font-black tabular-nums">{value}</span>
  </div>
);
/**
 * @ai_delta: SLC-0013 modülü WebGL hatasına karşı bağışık hale getirildi. Three.js ve Chart.js render işlemleri SKL_Text_Engine protokolü ile değiştirildi.
 * @ai-tags: #WebGLFix #SafeMode #TextVisualization #KaplanLogic #SLC0013
 */
