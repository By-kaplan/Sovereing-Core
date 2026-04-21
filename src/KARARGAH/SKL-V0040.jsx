/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / NLP-LOGIC
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v2.5.0-NLP (Semantic Verified)
 * @credits   : React, Chart.js, Lucide Icons, Tailwind CSS.
 * @license   : MIT | Mühendislik mühürü korunmak şartıyla serbest kullanım.
 * @note      : İstatistiksel dil dağılımı ve latent uzay (semantic space) simülatörü.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Binary, Cpu, Activity, Network, Layers, Database, 
  Terminal, Search, Target, TrendingUp, BarChart3, 
  ShieldCheck, Zap, Hash
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Tooltip, 
  Legend, 
  Filler, 
  RadialLinearScale, 
  BarElement, 
  BarController
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.js bileşenlerinin kaydı
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  RadialLinearScale, 
  BarElement, 
  BarController,
  Tooltip, 
  Legend, 
  Filler
);

/**
 * Teknik metriklerin ve veri yapılarının tanımı.
 */
const NLPMetricSchema = {
  d_model: 512,
  vocab_size: 50257,
  max_sequence_length: 2048,
  token_count: 14520,
  perplexity: 18.4,
  latency_ms: 42,
  confidence_interval: 0.95,
  zipfs_law_constant: 1.1
};

/**
 * Tokenizasyon, embedding ve benzerlik hesaplama motoru.
 */
const nlpLogicEngine = {
  tokenize: (text) => {
    return text.toLowerCase().split(/\s+/).map((word, idx) => ({
      id: 1000 + idx,
      token: word,
      prob: Math.random() * 0.1
    }));
  },
  cosineSimilarity: (v1, v2) => {
    const dot = v1.reduce((acc, val, i) => acc + val * v2[i], 0);
    const mag1 = Math.sqrt(v1.reduce((acc, val) => acc + val * val, 0));
    const mag2 = Math.sqrt(v2.reduce((acc, val) => acc + val * val, 0));
    return dot / (mag1 * mag2);
  },
  calculatePerplexity: (probabilities) => {
    const entropy = -probabilities.reduce((acc, p) => acc + p * Math.log2(p), 0);
    return Math.pow(2, entropy);
  }
};

/**
 * WebGL kullanmadan 2D Canvas üzerinden 3D izdüşüm sağlayan vektör uzayı motoru.
 */
const SemanticSpaceVisualizer = ({ clusters }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let angleX = 0;
    let angleY = 0;

    const points = [];
    clusters.forEach(cluster => {
      for (let i = 0; i < 60; i++) {
        points.push({
          x: (Math.random() - 0.5) * 100 + cluster.center[0] * 4,
          y: (Math.random() - 0.5) * 100 + cluster.center[1] * 4,
          z: (Math.random() - 0.5) * 100 + cluster.center[2] * 4,
          color: cluster.color,
          label: cluster.name
        });
      }
    });

    const render = () => {
      if (!containerRef.current) return;
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);
      angleX += 0.003;
      angleY += 0.005;

      const focalLength = 500;
      const centerX = w / 2;
      const centerY = h / 2;

      const projected = points.map(p => {
        let x = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
        let z = p.x * Math.sin(angleY) + p.z * Math.cos(angleY);
        let y = p.y * Math.cos(angleX) - z * Math.sin(angleX);
        let finalZ = p.y * Math.sin(angleX) + z * Math.cos(angleX);

        const scale = focalLength / (focalLength + finalZ + 200);
        return {
          px: x * scale + centerX,
          py: y * scale + centerY,
          pz: finalZ,
          color: p.color,
          size: scale * 2.5
        };
      });

      projected.sort((a, b) => b.pz - a.pz).forEach(p => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, Math.max(0.2, (p.pz + 200) / 400));
        ctx.fill();
      });

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, [clusters]);

  return (
    <div ref={containerRef} className="relative w-full h-[450px] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-inner">
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-800 p-4 rounded-xl backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">Çok Boyutlu Latent Uzay İzdüşümü</span>
        </div>
        <div className="space-y-2">
          {clusters.map((c, i) => (
            <div key={i} className="flex items-center gap-3 text-[9px] font-bold">
              <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]" style={{ backgroundColor: c.color }} />
              <span className="text-slate-400 font-mono uppercase tracking-tighter">{c.name} Kümesi</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Ana Uygulama Bileşeni
 */
export default function App() {
  const clusters = useMemo(() => [
    { name: 'Gıda/Besin', center: [10, 15, -5], color: '#10b981' },
    { name: 'Bilişim/Donanım', center: [-20, -10, 15], color: '#6366f1' },
    { name: 'Hukuk/Siyaset', center: [15, -15, 10], color: '#f59e0b' },
    { name: 'Soyut Kavramlar', center: [0, 25, -20], color: '#f43f5e' }
  ], []);

  const zipfData = {
    labels: Array.from({ length: 20 }, (_, i) => `Rank ${i + 1}`),
    datasets: [{
      label: "Zipf Yasası Dağılımı",
      data: Array.from({ length: 20 }, (_, i) => 100 / Math.pow(i + 1, NLPMetricSchema.zipfs_law_constant)),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 0
    }]
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-400 font-mono text-[12px] p-4 md:p-8 selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Başlık ve Metrikler */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-6 border-r border-slate-800/50 pr-8">
            <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/20 text-white">
              <Network size={28} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">NLP-LOGIC ENGINE</h1>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-2">v2.5 PRECISION SEMANTIC</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full md:w-auto px-6">
            <MetricBox icon={<Layers size={14}/>} label="d_model" value={String(NLPMetricSchema.d_model)} unit="dim" />
            <MetricBox icon={<Hash size={14}/>} label="Tokens" value="14.5k" color="text-indigo-400" />
            <MetricBox icon={<Target size={14}/>} label="PPL" value={String(NLPMetricSchema.perplexity)} unit="skor" />
            <MetricBox icon={<Zap size={14}/>} label="Gecikme" value="42ms" color="text-emerald-400" />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          
          {/* Sol Panel: Analitikler */}
          <section className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
              <h3 className="flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px] mb-8 tracking-[0.2em] italic">
                <Binary size={16} /> Tokenizasyon ve Kodlama
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
                  <span className="text-slate-500 text-[9px] uppercase font-black tracking-widest block mb-2 opacity-60">Girdi Akışı</span>
                  <p className="text-indigo-200 text-sm italic font-bold tracking-tight">"Kral sarayda oturuyor."</p>
                </div>
                <div className="flex items-center justify-center py-2">
                  <TrendingUp className="text-slate-800 rotate-90" size={20} />
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-[10px] space-y-3 shadow-inner">
                  <span className="text-slate-500 text-[9px] uppercase font-black tracking-widest block mb-1 opacity-60">BPE Parçacıkları</span>
                  <div className="flex flex-wrap gap-2">
                    {['Kr', 'al', ' saray', 'da', ' ot', 'ur', 'uyor', '.'].map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-lg font-black italic">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
              <h3 className="flex items-center gap-3 text-emerald-400 font-black uppercase text-[10px] mb-6 tracking-[0.2em] italic">
                <Activity size={16} /> Olasılık Dağılımı (Zipf)
              </h3>
              <div className="h-[220px] w-full">
                <Line 
                  data={zipfData} 
                  options={{ 
                    maintainAspectRatio: false, 
                    scales: { 
                      y: { display: false }, 
                      x: { grid: { color: '#1e293b', borderDash: [2, 2] }, ticks: { color: '#475569', font: { size: 9, family: 'monospace' } } } 
                    },
                    plugins: { legend: { display: false } }
                  }} 
                />
              </div>
              <div className="mt-6 p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                <div className="flex justify-between items-center mb-2 font-black italic">
                  <span className="text-[9px] uppercase text-slate-500 tracking-widest">Uyum Testi</span>
                  <span className="text-emerald-500 text-[10px]">%99.2 Doğruluk</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-emerald-500 w-[99%] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
              </div>
            </div>
          </section>

          {/* Orta Panel: Semantik Uzay */}
          <section className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-slate-900/40 p-3 rounded-[2.5rem] border border-slate-800/50 overflow-hidden relative shadow-2xl">
              <div className="absolute top-8 left-8 z-10 bg-slate-950/40 p-4 rounded-2xl backdrop-blur-md border border-slate-800/50">
                <h2 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">Gizli Uzay Simülasyonu</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mt-2">Anlamsal Yakınlık Haritası (Latent Space)</p>
              </div>
              <SemanticSpaceVisualizer clusters={clusters} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
                <h3 className="flex items-center gap-3 text-amber-500 font-black uppercase text-[10px] mb-6 tracking-[0.2em] italic">
                  <Target size={16} /> Vektör Matematiği Doğrulaması
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-[12px] font-black italic p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                    <span className="text-slate-400">"Kral" - "Erkek" + "Kadın"</span>
                    <span className="text-slate-600 font-mono">→</span>
                    <span className="text-amber-500 uppercase tracking-tighter">"Kraliçe"</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[9px] uppercase text-slate-500 font-black tracking-widest italic">
                      <span>Kosinüs Benzerliği</span>
                      <span className="text-white">0.987</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700">
                      <div className="w-[98%] h-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)] transition-all duration-1000" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
                <h3 className="flex items-center gap-3 text-blue-400 font-black uppercase text-[10px] mb-6 tracking-[0.2em] italic">
                  <Terminal size={16} /> Bağlamsal İşlem Kayıtları
                </h3>
                <div className="bg-black/40 p-6 rounded-2xl border border-slate-800 font-mono text-[9px] h-[120px] overflow-y-auto space-y-2 scrollbar-hide shadow-inner leading-relaxed">
                  <div className="text-emerald-500 font-bold">[BILGI] d_model=512 tensörü yüklendi...</div>
                  <div className="text-slate-500 font-bold">[HAZIR] Softmax normalizasyonu uygulanıyor.</div>
                  <div className="text-slate-500 font-bold">[ISLEM] Koşullu olasılıklar hesaplanıyor.</div>
                  <div className="text-amber-500 font-bold">[UYARI] OOV token seyrekleşmesi saptandı.</div>
                  <div className="text-indigo-400 font-bold">[BİTTİ] 42ms içerisinde yakınsama sağlandı.</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Alt Panel: Sistem Durumu */}
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-900/20 p-8 rounded-[2rem] border border-slate-800/30 border-dashed mb-12">
          <FooterStatItem icon={<ShieldCheck size={20} className="text-emerald-500" />} label="Sentaktik Doğruluk" value="%97.8" desc="Cümle yapısal doğruluğu." />
          <FooterStatItem icon={<Database size={20} className="text-indigo-500" />} label="Sözlük Kapsamı" value="%99.1" desc="Sözlük kapsama oranı." />
          <FooterStatItem icon={<BarChart3 size={20} className="text-amber-500" />} label="Semantik Tutarlılık" value="0.942" desc="Anlamsal tutarlılık skoru." />
        </footer>
      </div>
    </div>
  );
}

/**
 * Metrik Kutusu Bileşeni
 */
function MetricBox({ icon, label, value, unit = "", color = "text-slate-200" }) {
  return (
    <div className="bg-slate-950/50 border border-slate-800 px-5 py-3 rounded-2xl flex items-center gap-4 shadow-lg hover:border-indigo-500/30 transition-all transition-colors">
      <div className="p-2 bg-slate-900 rounded-lg text-slate-500 shadow-inner">
        {icon}
      </div>
      <div>
        <div className="text-[8px] text-slate-600 uppercase font-black tracking-[0.2em] mb-1">{label}</div>
        <div className={`text-xs font-black italic ${color}`}>
          {value}<span className="text-[9px] text-slate-700 ml-1 uppercase font-bold tracking-tighter">{unit}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Footer Stat Bileşeni
 */
function FooterStatItem({ icon, label, value, desc }) {
  return (
    <div className="flex items-center gap-5 p-2">
      <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-800/50 shadow-inner">{icon}</div>
      <div>
        <div className="flex items-center gap-3">
          <p className="text-white font-black uppercase text-[10px] tracking-widest">{label}</p>
          <p className="text-indigo-400 font-black text-[10px] tracking-widest italic">{value}</p>
        </div>
        <p className="text-slate-500 text-[9px] mt-1 font-bold italic opacity-70 uppercase tracking-tight">{desc}</p>
      </div>
    </div>
  );
}
