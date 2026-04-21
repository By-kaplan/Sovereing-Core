/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / TRANSFER-LOGIC
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v2.0.0-TRANSFER (Knowledge Verified)
 * @credits   : React, Chart.js, Lucide Icons, Tailwind CSS.
 * @license   : MIT | Kimlik mührü korunmak şartıyla serbest kullanım.
 * @note      : Model adaptasyon ve bilgi mirası analiz sistemi.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Layers, 
  Unlock, 
  Lock, 
  Zap, 
  Database, 
  ArrowRightLeft, 
  BarChart3, 
  Activity, 
  Cpu, 
  ShieldAlert,
  GitMerge,
  Network
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadarController,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- 1. TransferMetricSchema.js (JSON Veri Şeması) ---
const TRANSFER_METRICS = {
  model_types: ["ViT-Base", "ResNet-101", "BERT-Large", "EfficientNet-B7"],
  data_efficiency_factor: (frozen_ratio) => (1 + frozen_ratio * 1.5).toFixed(2),
  memory_saving: (frozen_params) => (frozen_params * 4 / 1024 / 1024).toFixed(2) // MB cinsinden
};

// --- 2. transferLogicEngine.js (Çekirdek Algoritma) ---
const transferLogicEngine = {
  calculateEfficiency: (params) => {
    const { frozenLayers, totalLayers, domainSimilarity, learningRate } = params;
    const frozenRatio = frozenLayers / totalLayers;
    
    // Bilgi Mirası Verimlilik Skoru (Knowledge Inheritance Efficiency)
    const inheritanceScore = (domainSimilarity * (1 - Math.pow(learningRate, 0.5)) * 100).toFixed(2);
    
    // Adaptasyon Doğruluğu (Adaptation Accuracy Estimation)
    const adaptationAccuracy = (domainSimilarity * 0.9 + (1 - frozenRatio) * 0.1).toFixed(2);
    
    // Yakınsama Hızı Artışı (Convergence Acceleration)
    const convergenceBoost = (frozenRatio * 5 + domainSimilarity * 2).toFixed(1);

    return {
      inheritanceScore,
      adaptationAccuracy,
      convergenceBoost,
      driftRisk: (learningRate * (1 - domainSimilarity) * 100).toFixed(2)
    };
  },

  generateDriftData: (layers) => {
    return Array.from({ length: layers }, (_, i) => ({
      layer: `Layer ${i + 1}`,
      drift: Math.random() * (i / layers) * 0.1 // Derin katmanlarda drift daha yüksek
    }));
  }
};

// --- 3. WeightMigrationVisualizer (Layer Hierarchy Simulation) ---
const LayerHierarchyVisualizer = ({ frozenLayers, totalLayers }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const layerHeight = 30;
      const spacing = 10;
      const startY = 50;

      for (let i = 0; i < totalLayers; i++) {
        const isFrozen = i < frozenLayers;
        const y = startY + i * (layerHeight + spacing);
        const x = 50 + Math.sin(time / 1000 + i * 0.5) * 5;

        // Katman Kutusu
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(x, y, 200, layerHeight, 4);
        } else {
            ctx.rect(x, y, 200, layerHeight);
        }
        ctx.fillStyle = isFrozen ? 'rgba(30, 41, 59, 0.8)' : 'rgba(14, 165, 233, 0.2)';
        ctx.strokeStyle = isFrozen ? 'rgba(71, 85, 105, 0.5)' : 'rgba(14, 165, 233, 0.8)';
        ctx.lineWidth = isFrozen ? 1 : 2;
        ctx.fill();
        ctx.stroke();

        // Katman İkonu/Yazısı
        ctx.fillStyle = isFrozen ? '#64748b' : '#0ea5e9';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(isFrozen ? `L${i+1} [FROZEN]` : `L${i+1} [TRAINABLE]`, x + 10, y + 18);

        if (isFrozen) {
           ctx.fillStyle = 'rgba(71, 85, 105, 0.5)';
           ctx.fillText('🔒', x + 175, y + 18);
        } else {
           // Gradyan Akışı Simülasyonu
           const flowX = x + 175 + Math.sin(time/200) * 2;
           ctx.fillStyle = '#0ea5e9';
           ctx.beginPath();
           ctx.arc(flowX, y + 15, 3, 0, Math.PI * 2);
           ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [frozenLayers, totalLayers]);

  return (
    <div className="flex justify-center p-4 bg-slate-950/50 rounded-2xl border border-white/5 h-full min-h-[500px]">
      <canvas ref={canvasRef} width={300} height={500} className="w-full h-auto" />
    </div>
  );
};

// --- ANA DASHBOARD ---
export default function App() {
  const [params, setParams] = useState({
    frozenLayers: 8,
    totalLayers: 12,
    domainSimilarity: 0.85,
    learningRate: 0.001
  });

  const report = useMemo(() => transferLogicEngine.calculateEfficiency(params), [params]);
  const driftData = useMemo(() => transferLogicEngine.generateDriftData(params.totalLayers), [params.totalLayers]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-6 font-mono text-sm overflow-x-hidden">
      {/* Üst Header */}
      <header className="mb-8 border-b border-white/5 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-white text-xl font-black tracking-tighter flex items-center gap-2 uppercase">
            <ArrowRightLeft className="text-cyan-400" size={24} /> Transfer-Logic <span className="text-slate-500 text-sm">v2.0</span>
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest leading-none">Model Adaptasyon ve Bilgi Mirası Analiz Sistemi</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3 shadow-inner">
            <div className="text-right">
              <p className="text-[9px] text-slate-500 uppercase font-bold">Hesaplama Tasarrufu</p>
              <p className="text-sm font-black text-green-400">%{ (params.frozenLayers / params.totalLayers * 100).toFixed(1) }</p>
            </div>
            <Zap size={18} className="text-green-400" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        
        {/* SOL PANEL: Konfigürasyon */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
            <h3 className="text-xs font-bold text-white mb-6 uppercase flex items-center gap-2">
              <Layers size={14} className="text-cyan-400" /> Adaptasyon Stratejisi
            </h3>
            
            <div className="space-y-6">
              <InputRange label="Dondurulmuş Katmanlar" val={params.frozenLayers} min={0} max={params.totalLayers} 
                onChange={v => setParams({...params, frozenLayers: v})} />
              <InputRange label="Alan Benzerliği (Domain)" val={params.domainSimilarity} min={0.1} max={1} step={0.05}
                onChange={v => setParams({...params, domainSimilarity: v})} />
              <InputRange label="İnce Ayar Hızı (LR)" val={params.learningRate} min={0.0001} max={0.01} step={0.0001}
                onChange={v => setParams({...params, learningRate: v})} />
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
              <MetricRow label="Dondurulmuş Parametre %" value={`${(params.frozenLayers / params.totalLayers * 100).toFixed(1)}%`} />
              <MetricRow label="Eğitilebilir Katman" value={params.totalLayers - params.frozenLayers} />
              <MetricRow label="Bilgi Mirası Skoru" value={report.inheritanceScore} />
            </div>
          </div>

          <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-5 shadow-lg shadow-red-900/10">
            <h3 className="text-[10px] font-black text-red-400 uppercase mb-3 flex items-center gap-2">
              <ShieldAlert size={12} /> Katastrofik Unutma Riski
            </h3>
            <div className="flex items-end gap-2">
               <span className="text-2xl font-black text-white">{report.driftRisk}%</span>
               <span className="text-[9px] text-slate-500 mb-1">Maksimum Tolerans: %15</span>
            </div>
            <p className="text-[10px] mt-2 text-slate-400 leading-tight italic">
              Yüksek öğrenme hızı ve düşük alan benzerliği, kaynak modelin genel özniteliklerini tahrip edebilir.
            </p>
          </div>
        </div>

        {/* ORTA PANEL: Katman Hiyerarşisi ve Drift */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 shadow-xl">
              <h3 className="text-xs font-bold text-white mb-4 uppercase flex items-center gap-2">
                <Network size={14} className="text-cyan-400" /> Katman Hiyerarşisi
              </h3>
              <LayerHierarchyVisualizer frozenLayers={params.frozenLayers} totalLayers={params.totalLayers} />
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 shadow-xl">
                <h3 className="text-xs font-bold text-white mb-4 uppercase flex items-center gap-2">
                  <BarChart3 size={14} className="text-cyan-400" /> Yakınsama Analizi
                </h3>
                <div className="h-48">
                  <Line 
                    data={{
                      labels: ['1k', '2k', '5k', '10k', '20k'],
                      datasets: [
                        {
                          label: 'Transfer Learning',
                          data: [0.6, 0.85, 0.92, 0.95, 0.96],
                          borderColor: '#0ea5e9',
                          backgroundColor: 'rgba(14, 165, 233, 0.1)',
                          fill: true,
                          tension: 0.4
                        },
                        {
                          label: 'From Scratch',
                          data: [0.1, 0.3, 0.55, 0.75, 0.88],
                          borderColor: '#475569',
                          borderDash: [5, 5],
                          tension: 0.4
                        }
                      ]
                    }}
                    options={chartOptions}
                  />
                </div>
              </div>

              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 shadow-xl">
                <h3 className="text-xs font-bold text-white mb-4 uppercase flex items-center gap-2">
                  <Activity size={14} className="text-orange-400" /> Layer-wise Weight Drift
                </h3>
                <div className="h-48">
                  <Bar 
                    data={{
                      labels: driftData.map(d => d.layer),
                      datasets: [{
                        label: 'Drift Katsayısı',
                        data: driftData.map(d => d.drift),
                        backgroundColor: (ctx) => {
                          const idx = ctx.dataIndex;
                          return idx < params.frozenLayers ? '#1e293b' : '#f97316';
                        }
                      }]
                    }}
                    options={chartOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ PANEL: Raporlama */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-white mb-6 uppercase flex items-center gap-2 tracking-tighter font-black">
              <GitMerge size={14} className="text-cyan-400" /> Transfer Verimliliği
            </h3>
            <div className="space-y-4">
              <MetricItem label="Bilgi Mirası" value={`${report.inheritanceScore}/100`} color="text-cyan-400" />
              <MetricItem label="Adaptasyon Hızı" value={`x${report.convergenceBoost}`} color="text-green-400" />
              <MetricItem label="Doğruluk Potansiyeli" value={`%${report.adaptationAccuracy}`} color="text-white" />
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-black mb-2 tracking-widest">Öneri</p>
                <div className="bg-black/30 p-3 rounded-lg border border-white/5 text-[11px] leading-relaxed italic">
                  {params.domainSimilarity > 0.7 
                    ? "Yüksek benzerlik: Katmanların %70'ini dondurarak 'Feature Extraction' modunu koruyun."
                    : "Düşük benzerlik: Daha fazla katmanı çözerek (Unfreezing) 'Fine-Tuning' derinliğini artırın."}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Database size={14} /> Kaynak Bilgi Havuzu
            </h3>
            <div className="space-y-3 shadow-inner p-3 rounded-xl bg-black/20">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 uppercase font-bold">KAYNAK MODEL</span>
                <span className="text-white font-black italic">ViT-L/14 (ImageNet)</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 uppercase font-bold">HEDEF GÖREV</span>
                <span className="text-white font-black italic">Medikal Görüntüleme</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border border-white/10 rounded-2xl p-6 shadow-2xl group transition-all hover:scale-[1.02]">
             <div className="flex justify-between items-start mb-4">
                <Cpu className="text-cyan-400" size={24} />
                <Zap size={16} className="text-yellow-400 animate-pulse" />
             </div>
             <h4 className="text-white font-black text-sm mb-1 uppercase tracking-tighter">Knowledge Distillation</h4>
             <p className="text-[11px] text-slate-400 leading-tight mb-4">
               Öğretmen modelin yumuşatılmış Softmax çıktılarını (Soft Targets) hedef alan öğrenci model optimizasyonu aktif.
             </p>
             <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase rounded-lg transition-all border border-white/10 shadow-lg">
               KATMANLARI ÇÖZ (UNFREEZE)
             </button>
          </div>
        </div>

      </div>
      
      <footer className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">
        <span>© 2024 TRANSFER-LOGIC // NEURAL KNOWLEDGE MIGRATION</span>
        <div className="flex gap-4">
          <span>Mode: Differential Learning Rates</span>
          <span>Strategy: Layer-wise Freezing</span>
        </div>
      </footer>
    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---

const InputRange = ({ label, val, min, max, step = 1, onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
      <span className="text-slate-500">{label}</span>
      <span className="text-cyan-400 italic">{val}</span>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={val}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
    />
  </div>
);

const MetricRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-white/5 py-1">
    <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{label}</span>
    <span className="text-xs font-black text-white font-mono italic">{value}</span>
  </div>
);

const MetricItem = ({ label, value, color = "text-white" }) => (
  <div className="flex justify-between py-1 border-b border-white/5 last:border-0 items-center">
    <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">{label}</span>
    <span className={`text-[11px] font-black italic font-mono ${color}`}>{value}</span>
  </div>
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { display: false },
    tooltip: {
      backgroundColor: '#020617',
      titleFont: { size: 10, family: 'monospace' },
      bodyFont: { size: 10, family: 'monospace' },
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      displayColors: false
    }
  },
  scales: {
    y: { 
      grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false }, 
      ticks: { color: '#475569', font: { size: 8 } } 
    },
    x: { 
      grid: { display: false }, 
      ticks: { color: '#475569', font: { size: 8 } } 
    }
  }
};
