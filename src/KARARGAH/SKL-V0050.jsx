/**
 * SOVEREIGN CORE LIBRARY - ENGINEER CONTROL CENTER
 * @project   : ECC / EQUITY-LOGIC
 * @architect : Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept.
 * @version   : v1.0.0-EQUITY (Contribution Verified)
 * @credits   : React (Core), Tailwind CSS.
 * @license   : MIT | Kimlik mührü korunmak şartıyla serbest kullanım.
 * @note      : İş yükü varyansı ve net katkı skorlarını hesaplayan denge motoru.
 */

import React, { useMemo, useState } from 'react';

/**
 * LOGIC: equityEngine
 * İş yükü varyansını ve net katkı skorlarını hesaplar.
 */
const equityEngine = {
  calculateMetrics: (tasks, members) => {
    if (!members.length) return { memberData: [], imbalanceAlert: false, efficiencyIndex: 0 };

    const memberData = members.map(member => {
      const assigned = tasks.filter(t => t.assignedTo === member.id);
      const completed = assigned.filter(t => t.status === 'done');
      
      const workload = assigned.reduce((acc, t) => acc + (t.difficulty * t.estimatedTime), 0);
      const contribution = completed.reduce((acc, t) => acc + (t.difficulty * 1.5), 0) + (member.peerScore * 2);

      return { ...member, workload, contribution, taskCount: assigned.length };
    });

    const avgWorkload = memberData.reduce((acc, m) => acc + m.workload, 0) / memberData.length;
    const variance = memberData.reduce((acc, m) => acc + Math.pow(m.workload - avgWorkload, 2), 0) / memberData.length;
    const sigma = Math.sqrt(variance);

    return {
      memberData,
      sigma: sigma.toFixed(2),
      avgWorkload: avgWorkload.toFixed(2),
      imbalanceAlert: sigma > (avgWorkload * 0.20), // %20 Eşik değeri
      efficiencyIndex: (1 - (sigma / (avgWorkload || 1))).toFixed(2)
    };
  }
};

// --- ÖRNEK VERİ SETİ ---
const INITIAL_TASKS = [
  { id: 1, assignedTo: 'M1', difficulty: 3, estimatedTime: 5, status: 'done' },
  { id: 2, assignedTo: 'M1', difficulty: 5, estimatedTime: 8, status: 'todo' },
  { id: 3, assignedTo: 'M2', difficulty: 2, estimatedTime: 3, status: 'done' },
  { id: 4, assignedTo: 'M3', difficulty: 8, estimatedTime: 12, status: 'done' },
  { id: 5, assignedTo: 'M3', difficulty: 4, estimatedTime: 6, status: 'done' },
];

const INITIAL_MEMBERS = [
  { id: 'M1', name: 'Alpha Scanner', peerScore: 85 },
  { id: 'M2', name: 'Beta Analyst', peerScore: 92 },
  { id: 'M3', name: 'Gamma Dev', peerScore: 78 },
];

/**
 * UI: ContributionDashboard
 */
export default function App() {
  const [tasks] = useState(INITIAL_TASKS);
  const [members] = useState(INITIAL_MEMBERS);

  const metrics = useMemo(() => equityEngine.calculateMetrics(tasks, members), [tasks, members]);

  // VEKTÖREL VARLIKLAR (SVG)
  const Icons = {
    Alert: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    Chart: () => (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/>
      </svg>
    ),
    Shield: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  };

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8 font-mono text-slate-300 selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* BAŞLIK VE SİSTEM SAĞLIĞI */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-2xl shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
              <h2 className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">EQUITY_CORE <span className="text-blue-500">v1.0</span></h2>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">İş Yükü Varyansı ve Katkı İzleme</p>
          </div>
          
          <div className="flex gap-8">
            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase font-black mb-1 tracking-tighter">Verimlilik Endeksi</div>
              <div className="text-3xl font-black text-emerald-500 tracking-tighter italic leading-none">
                %{Math.round(metrics.efficiencyIndex * 100)}
              </div>
            </div>
            <div className="text-right border-l border-white/10 pl-8">
              <div className="text-[10px] text-slate-500 uppercase font-black mb-1 tracking-tighter">Sistem $\sigma$</div>
              <div className="text-3xl font-black text-blue-400 tracking-tighter italic leading-none">
                {metrics.sigma}
              </div>
            </div>
          </div>
        </div>

        {/* HATA/UYARI PANELİ */}
        {metrics.imbalanceAlert && (
          <div className="flex items-center gap-4 p-4 bg-red-950/20 border border-red-500/30 rounded-xl text-red-400 shadow-lg animate-in slide-in-from-top duration-500">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Icons.Alert />
            </div>
            <div>
              <div className="text-sm font-black uppercase italic tracking-tight">Varyans Eşiği Aşıldı ($\sigma$ {' > '} %20)</div>
              <p className="text-[10px] opacity-70 font-bold uppercase tracking-tighter mt-0.5">İş yükü dağılımında kritik dengesizlik tespit edildi. Kaynak optimizasyonu önerilir.</p>
            </div>
          </div>
        )}

        {/* ÜYE KARTLARI GRİDİ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.memberData.map((member) => (
            <div key={member.id} className="group bg-slate-900/40 border border-white/5 p-5 rounded-2xl relative overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:bg-slate-900/60 shadow-xl">
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="text-sm font-black text-white mb-1 uppercase italic tracking-tighter">{member.name}</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
                    <Icons.Shield />
                    <span className="font-mono">ID: {member.id}</span>
                  </div>
                </div>
                <div className="bg-slate-800/80 px-2 py-1 rounded text-[10px] font-black text-blue-400 border border-white/5 italic">
                  PEER: {member.peerScore}
                </div>
              </div>

              {/* İLERLEME ÇUBUKLARI */}
              <div className="space-y-4 relative z-10">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">İş Yükü ({member.workload}u)</span>
                    <span className="text-slate-400 italic">%{Math.min(100, Math.round((member.workload / metrics.avgWorkload) * 50))}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-700 ease-out shadow-[0_0_8px_#3b82f6]"
                      style={{ width: `${Math.min(100, (member.workload / metrics.avgWorkload) * 50)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">Net Katkı</span>
                    <span className="text-emerald-500 italic">+{member.contribution}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_8px_#10b981]"
                      style={{ width: `${Math.min(100, member.contribution)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* İSTATİSTİK ÖZETİ */}
              <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-4 relative z-10">
                <div className="text-center">
                  <div className="text-[9px] text-slate-500 uppercase font-black tracking-tighter mb-1">Görevler</div>
                  <div className="text-lg font-black text-white italic leading-none">{member.taskCount}</div>
                </div>
                <div className="text-center border-l border-white/5">
                  <div className="text-[9px] text-slate-500 uppercase font-black tracking-tighter mb-1">Rol Skoru</div>
                  <div className="text-lg font-black text-white italic leading-none">{(member.contribution / (member.workload || 1)).toFixed(2)}</div>
                </div>
              </div>

              {/* ARKA PLAN DEKORATİF İKON */}
              <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity text-white pointer-events-none">
                <Icons.Chart />
              </div>
            </div>
          ))}
        </div>

        {/* DENETİM TABLOSU */}
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-white/5 bg-slate-900/50">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">Infrastructure_Audit_Logs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] leading-relaxed">
              <thead className="bg-slate-950/50 text-slate-500 uppercase font-black tracking-tighter">
                <tr>
                  <th className="px-6 py-4 border-b border-white/5">Dahili_Metrik</th>
                  <th className="px-6 py-4 border-b border-white/5">Değer</th>
                  <th className="px-6 py-4 border-b border-white/5 text-center">Uyumluluk_Durumu</th>
                  <th className="px-6 py-4 border-b border-white/5">Hesaplama_Metodu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-400 italic uppercase">Workload_Mean_μ</td>
                  <td className="px-6 py-4 text-white font-mono font-black italic">{metrics.avgWorkload} units</td>
                  <td className="px-6 py-4 text-center"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-black border border-emerald-500/20 rounded uppercase tracking-widest">VALID</span></td>
                  <td className="px-6 py-4 text-slate-600 italic font-bold">Aritmetik Agregasyon</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-400 italic uppercase">Asset_Integrity</td>
                  <td className="px-6 py-4 text-white font-mono font-black italic">100% SVG</td>
                  <td className="px-6 py-4 text-center"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-black border border-emerald-500/20 rounded uppercase tracking-widest">PASS</span></td>
                  <td className="px-6 py-4 text-slate-600 italic font-bold">Vektörel Dahili Enjeksiyon</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-red-400 italic uppercase tracking-tighter">Varyans_Limiti</td>
                  <td className="px-6 py-4 text-white font-mono font-black italic">20.00%</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 font-black text-[8px] border rounded uppercase tracking-widest ${metrics.imbalanceAlert ? 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                      {metrics.imbalanceAlert ? 'FAIL_THRESHOLD' : 'WITHIN_BOUNDS'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 italic font-bold">Sigma($\sigma$) Delta Hesaplama</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ALT BİLGİ */}
        <footer className="flex justify-between items-center pt-4 pb-8 border-t border-white/5">
          <span className="text-[9px] text-slate-700 uppercase font-black tracking-widest italic">
            Protocol_End // Statik_Render_Hazir
          </span>
          <div className="text-right text-[9px] font-black text-slate-700 uppercase tracking-widest italic">
            ORIGIN: KAPLAN_HALI_YIKAMA_PRECISION_DEPT | MİMAR: ÖMER KAPLAN
          </div>
        </footer>

      </div>
    </div>
  );
}
