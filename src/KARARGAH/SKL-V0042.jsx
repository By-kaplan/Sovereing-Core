/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / EMBEDDING-LOGIC-2D
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v1.0.0-2D-VECTOR (Standard Engine)
 * @credits   : React, Chart.js, Lucide Icons, Tailwind CSS.
 * @license   : MIT | Kimlik mührü korunmak şartıyla serbest kullanım.
 * @note      : Saf Canvas 2D kullanılarak optimize edilmiş vektör uzayı görselleştirici.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Activity, 
  Layers, 
  Database, 
  Zap, 
  Target, 
  TrendingDown, 
  BarChart3,
  RefreshCcw,
  Binary,
  Search,
  Network,
  MousePointer2
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
  RadarController,
  RadialLinearScale,
  PolarAreaController
} from 'chart.js';
import { Line, Radar } from 'react-chartjs-2';

// Chart.js Bileşenlerini Kaydet
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler,
  RadarController,
  PolarAreaController
);

/**
 * 2D VEKTÖR UZAYI GÖRSELLEŞTİRİCİ
 * WebGL yerine saf Canvas 2D kullanır. Donanım dostudur.
 */
const VectorSpaceVisualizer = ({ clusters }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Boyut Ayarı
    const handleResize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Parçacık Sistemi Oluşturma
    const particles = [];
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
      const cluster = clusters[i % clusters.length];
      particles.push({
        // Küme merkezine yakın rastgele başlangıç
        x: (canvas.width / 2) + (cluster.center[0] * 2) + (Math.random() - 0.5) * 150,
        y: (canvas.height / 2) + (cluster.center[1] * 2) + (Math.random() - 0.5) * 150,
        baseX: (canvas.width / 2) + (cluster.center[0] * 2),
        baseY: (canvas.height / 2) + (cluster.center[1] * 2),
        color: cluster.color,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Arka plan ızgarası (isteğe bağlı estetik)
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.1)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Parçacıkları Çiz
      particles.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Sınır kontrolü (merkeze geri çekilme)
        const distFromBase = Math.sqrt((p.x - p.baseX)**2 + (p.y - p.baseY)**2);
        if (distFromBase > 100) {
          p.speedX += (p.baseX - p.x) * 0.001;
          p.speedY += (p.baseY - p.y) * 0.001;
        }

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Yakın parçacıklar arası ağ çizgileri
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.sqrt((p.x - p2.x)**2 + (p.y - p2.y)**2);
          if (dist < 40 && p.color === p2.color) {
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 40) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [clusters]);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-inner">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-4 right-4 flex flex-col gap-2">
         {clusters.map((c, i) => (
           <div key={i} className="flex items-center gap-2 bg-slate-950/50 px-3 py-1 rounded-full border border-slate-800 text-[10px] backdrop-blur-sm">
             <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }}></span>
             <span className="text-slate-400 font-medium uppercase tracking-tighter">{c.name}</span>
           </div>
         ))}
      </div>
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs border border-indigo-500/30">
          <Activity size={14} />
          <span>Canvas 2D Rendering Aktif</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [query, setQuery] = useState('Yapay zeka etiği ve gelecek stratejileri...');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dataPoints, setDataPoints] = useState([82, 85, 84, 88, 92, 91, 95]);

  const clusters = useMemo(() => [
    { name: 'Teknoloji', center: [100, -50], color: '#6366f1' },
    { name: 'Etik', center: [-120, -30], color: '#f43f5e' },
    { name: 'Gelecek', center: [40, 80], color: '#10b981' },
    { name: 'İnsanlık', center: [-80, 70], color: '#f59e0b' }
  ], []);

  const simulateProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setDataPoints([...dataPoints.slice(1), Math.floor(Math.random() * 20) + 75]);
      setIsProcessing(false);
    }, 1500);
  };

  const chartData = {
    labels: ['T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'Şimdi'],
    datasets: [{
      label: 'Confidence Score',
      data: dataPoints,
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
    }]
  };

  const radarData = {
    labels: ['Verimlilik', 'Anlamlandırma', 'Sözdizimi', 'Bağlam', 'Yoğunluk'],
    datasets: [{
      label: 'Analiz Profili',
      data: [85, 92, 78, 88, 95],
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: '#10b981',
      borderWidth: 2,
    }]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Üst Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg shadow-indigo-500/20">
              <Binary size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                EmbeddingLogic 2D
              </h1>
              <p className="text-slate-500 text-sm font-medium">Güvenli Mod: Standart Grafik Motoru</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-mono text-slate-300 tracking-tighter">GPU_ACCEL: DISABLED</span>
            </div>
            <button 
              onClick={simulateProcessing}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <RefreshCcw size={16} className={isProcessing ? 'animate-spin' : ''} />
              Analizi Başlat
            </button>
          </div>
        </header>

        {/* Ana İçerik */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 space-y-6">
            {/* Metin Giriş */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-indigo-400">
                <Search size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider">Metin İşleme Birimi</h2>
              </div>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none h-24 text-lg"
              />
            </div>

            {/* 2D Vektör Haritası */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center justify-between mb-4 text-emerald-400">
                <div className="flex items-center gap-2">
                  <Network size={18} />
                  <h2 className="text-sm font-bold uppercase tracking-wider">Semantik Vektör Haritası</h2>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[10px]">
                  <MousePointer2 size={12} />
                  Etkileşimli Canvas
                </div>
              </div>
              <VectorSpaceVisualizer clusters={clusters} />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Temel Veriler */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-amber-500 mb-2">
                  <Zap size={16} />
                  <span className="text-[10px] font-black uppercase">Vektör</span>
                </div>
                <div className="text-2xl font-bold">1536d</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-indigo-500 mb-2">
                  <Target size={16} />
                  <span className="text-[10px] font-black uppercase">Güven</span>
                </div>
                <div className="text-2xl font-bold">%94.2</div>
              </div>
            </div>

            {/* Radar Analiz */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                <BarChart3 size={18} />
                Nitelik Dağılımı
              </h2>
              <div className="h-[250px] flex items-center justify-center">
                <Radar 
                  data={radarData} 
                  options={{
                    scales: { r: { grid: { color: '#334155' }, pointLabels: { color: '#94a3b8' }, ticks: { display: false } } },
                    plugins: { legend: { display: false } }
                  }} 
                />
              </div>
            </div>

            {/* Yakınsama Çizelgesi */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                <TrendingDown size={18} />
                Zaman Serisi Analizi
              </h2>
              <div className="h-[120px]">
                <Line 
                  data={chartData} 
                  options={{
                    maintainAspectRatio: false,
                    scales: { x: { display: false }, y: { display: false } },
                    plugins: { legend: { display: false } }
                  }} 
                />
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <Cpu size={14} />
                  <span>CPU MODE: OPTIMIZED</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center py-6 border-t border-slate-900">
          <p className="text-slate-600 text-[10px] flex items-center justify-center gap-2 uppercase tracking-widest">
            <Database size={12} />
            Hatasız Grafik İşleme | 2D Canvas Engine v1.0
          </p>
        </footer>
      </div>
    </div>
  );
}
