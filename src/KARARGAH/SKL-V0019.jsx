/**
 * SOVEREIGN CORE LIBRARY
 * @project: SOVEREIGN CORE LIBRARY  * @architect: Ömer Kaplan | @origin: Kaplan Halı Yıkama - Precision Dept. * @credits: Open-source ecosystem: React (Core Engine). * @note: [PLUG-AND-PLAY]: Bu modül bağımsız bir .jsx ünitesidir.
 * @license: MIT | Kimlik mührü korunmak şartıyla serbest kullanım.  * @description: Bu çalışma, yüksek mühendislik disiplini ve saf kod mimarisi ile üretilmiştir.
 */

import React, { useState, useMemo } from 'react';

// --- NUTRITION & COST ENGINE (VANILLA JS) ---
const NutritionEngine = {
  calculateMetrics: (ingredients, servingCount) => {
    const totalCost = ingredients.reduce((sum, ing) => sum + (ing.unitPrice * ing.amount), 0);
    const totalCalories = ingredients.reduce((sum, ing) => sum + (ing.caloriesPerUnit * ing.amount), 0);
    const costPerServing = totalCost / servingCount;
    const efficiency = totalCalories / totalCost; 

    return {
      costPerServing: costPerServing.toFixed(2),
      totalCalories: Math.round(totalCalories / servingCount),
      efficiency: efficiency.toFixed(1)
    };
  },
  calculateMatchRate: (required, pantry) => {
    const matchCount = required.filter(item => pantry.includes(item.name)).length;
    return Math.round((matchCount / required.length) * 10);
  }
};

const DATABASE = {
  pantry: ["Makarna", "Yumurta", "Salça", "Soğan", "Sıvı Yağ"],
  recipes: [
    {
      id: 1,
      name: "Öğrenci Usulü Tek Tencere Makarna",
      time: 15,
      servings: 2,
      ingredients: [
        { name: "Makarna", amount: 0.25, unitPrice: 20, caloriesPerUnit: 3500 },
        { name: "Salça", amount: 0.05, unitPrice: 80, caloriesPerUnit: 800 },
        { name: "Soğan", amount: 0.1, unitPrice: 15, caloriesPerUnit: 400 }
      ],
      macros: [
        { name: 'Prot', value: 12, color: '#6366f1' },
        { name: 'Karb', value: 75, color: '#10b981' },
        { name: 'Yağ', value: 13, color: '#f59e0b' }
      ]
    },
    {
      id: 2,
      name: "Tavuklu Sebze Sote",
      time: 25,
      servings: 2,
      ingredients: [
        { name: "Tavuk Göğsü", amount: 0.4, unitPrice: 180, caloriesPerUnit: 1650 },
        { name: "Biber", amount: 0.2, unitPrice: 40, caloriesPerUnit: 200 },
        { name: "Sıvı Yağ", amount: 0.02, unitPrice: 60, caloriesPerUnit: 8800 }
      ],
      macros: [
        { name: 'Prot', value: 45, color: '#6366f1' },
        { name: 'Karb', value: 10, color: '#10b981' },
        { name: 'Yağ', value: 45, color: '#f59e0b' }
      ]
    }
  ]
};

// --- PURE SVG ASSETS (Manual Vector Mastery) ---
const SovIcons = {
  Chef: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 13.8V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9.8a4 4 0 0 1-2 3.5v2.7a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.7a4 4 0 0 1-2-3.5z"/><path d="M9 13h6"/></svg>,
  Tag: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Flame: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.256 1.2-3.124A2.5 2.5 0 0 0 8.5 14.5z"/></svg>,
  Wallet: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
};

const MacroPie = ({ data }) => {
  let cumulativePercent = 0;
  return (
    <svg width="80" height="80" viewBox="0 0 32 32">
      {data.map((slice, i) => {
        const strokeDasharray = `${slice.value} 100`;
        const strokeDashoffset = -cumulativePercent;
        cumulativePercent += slice.value;
        return (
          <circle
            key={i}
            r="16" cx="16" cy="16"
            fill="none"
            stroke={slice.color}
            strokeWidth="32"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 16 16)"
          />
        );
      })}
      <circle r="10" cx="16" cy="16" fill="#0a0a0f" />
    </svg>
  );
};

const App = () => {
  const [activePantry, setActivePantry] = useState(DATABASE.pantry);

  // --- GSS (VANILLA CSS INTEGRITY) ---
  const gss = `
    .sov-root {
      background: #050508;
      color: #ccc;
      font-family: 'JetBrains Mono', monospace;
      min-height: 100vh;
      padding: 40px;
    }
    .sov-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #1a1a1f;
      padding-bottom: 25px;
      margin-bottom: 40px;
    }
    .sov-grid { display: grid; grid-template-columns: 1fr 350px; gap: 30px; }
    .sov-panel {
      background: #0a0a0f;
      border: 1px solid #1a1a1f;
      border-radius: 24px;
      padding: 24px;
      position: relative;
    }
    .sov-panel-title {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #555;
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
    }
    .sov-badge { font-size: 9px; font-weight: bold; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
    .sov-recipe-card {
      background: #0d0d12;
      border: 1px solid #1a1a1f;
      border-radius: 30px;
      padding: 30px;
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: 1fr 120px;
      gap: 20px;
      transition: 0.3s;
    }
    .sov-recipe-card:hover { border-color: #6366f1; transform: translateY(-2px); }
    .sov-stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
    .sov-stat-item { background: #050508; padding: 12px; border-radius: 12px; border: 1px solid #111; }
    .sov-stat-val { display: block; font-size: 14px; font-weight: bold; color: #fff; }
    .sov-stat-lbl { display: block; font-size: 8px; color: #444; text-transform: uppercase; }
    
    .sov-progress-bg { height: 4px; background: #111; border-radius: 2px; overflow: hidden; margin-top: 10px; }
    .sov-progress-fill { height: 100%; transition: 0.5s; }

    .sov-pantry-item {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: #111;
      border: 1px solid #1a1a1f;
      border-radius: 8px;
      font-size: 11px;
      margin-right: 8px;
      margin-bottom: 8px;
    }
    .sov-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }

    .sov-footer {
      margin-top: 60px;
      border-top: 1px solid #1a1a1f;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #333;
      font-weight: bold;
    }
  `;

  return (
    <div className="sov-root">
      {/* lgtm[js/html-injection] */}
      <style>{gss}</style>

      <header className="sov-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ color: '#6366f1' }}><SovIcons.Chef /></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '-1px', color: '#fff', fontStyle: 'italic' }}>STUDENT CHEF</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '2px' }}>Budget-Efficiency Engine v1.2</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '9px', color: '#555', textTransform: 'uppercase' }}>Sistem Durumu</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '11px', fontWeight: 'bold' }}>
             <div className="sov-dot" style={{ boxShadow: '0 0 10px #10b981' }}></div> STOK_STABİL
          </div>
        </div>
      </header>

      <main className="sov-grid">
        <section>
          <div className="sov-panel" style={{ marginBottom: '30px' }}>
            <div className="sov-panel-title">Dijital Kiler Envanteri</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {activePantry.map(item => (
                <div key={item} className="sov-pantry-item">
                  <div className="sov-dot"></div> {item}
                </div>
              ))}
              <div className="sov-pantry-item" style={{ borderStyle: 'dashed', color: '#444', cursor: 'pointer' }}>+ Yeni Ekle</div>
            </div>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#fff', fontStyle: 'italic', marginBottom: '20px', letterSpacing: '-1px' }}>Önerilen Seviyeler</h2>
          
          {DATABASE.recipes.map(recipe => {
            const metrics = NutritionEngine.calculateMetrics(recipe.ingredients, recipe.servings);
            const matchScore = NutritionEngine.calculateMatchRate(recipe.ingredients, activePantry);
            return (
              <div key={recipe.id} className="sov-recipe-card">
                <div>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <span className="sov-badge" style={{ background: matchScore > 7 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: matchScore > 7 ? '#10b981' : '#f59e0b' }}>
                      {matchScore > 7 ? 'Eksiksiz Yapılabilir' : 'Eksik Malzemeli'}
                    </span>
                    <span style={{ fontSize: '9px', color: '#444', fontWeight: 'bold' }}>#{recipe.id}</span>
                  </div>
                  <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{recipe.name}</h3>
                  
                  <div className="sov-stat-row">
                    <div className="sov-stat-item">
                      <span className="sov-stat-lbl">Maliyet/Por.</span>
                      <span className="sov-stat-val" style={{color: '#6366f1'}}>₺{metrics.costPerServing}</span>
                    </div>
                    <div className="sov-stat-item">
                      <span className="sov-stat-lbl">Hazırlama</span>
                      <span className="sov-stat-val">{recipe.time} DK</span>
                    </div>
                    <div className="sov-stat-item">
                      <span className="sov-stat-lbl">Enerji</span>
                      <span className="sov-stat-val">{metrics.totalCalories} KCAL</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 'bold', color: '#555' }}>
                      <span>Envanter Uyumu</span>
                      <span>{matchScore}/10</span>
                    </div>
                    <div className="sov-progress-bg">
                      <div className="sov-progress-fill" style={{ width: `${matchScore * 10}%`, background: matchScore > 7 ? '#10b981' : '#f59e0b' }}></div>
                    </div>
                  </div>
                </div>

                <div style={{ borderLeft: '1px solid #1a1a1f', paddingLeft: '20px', textAlign: 'center' }}>
                   <span style={{ fontSize: '8px', color: '#444', textTransform: 'uppercase', display: 'block', marginBottom: '15px' }}>Makro Dağılımı</span>
                   <MacroPie data={recipe.macros} />
                   <div style={{ marginTop: '15px' }}>
                     {recipe.macros.map(m => (
                       <div key={m.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', marginBottom: '4px' }}>
                         <span style={{ color: m.color }}>{m.name}</span>
                         <span style={{ fontWeight: 'bold' }}>%{m.value}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            );
          })}
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div className="sov-panel" style={{ background: '#6366f1', borderColor: '#6366f1' }}>
            <div className="sov-panel-title" style={{ color: 'rgba(255,255,255,0.6)' }}>Aylık Tasarruf Hedefi</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '15px 0' }}>
              <span style={{ fontSize: '32px', fontWeight: '900', color: '#fff', fontStyle: 'italic' }}>₺850</span>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>/ AY</span>
            </div>
            <div className="sov-progress-bg" style={{ background: 'rgba(255,255,255,0.2)', height: '8px' }}>
              <div className="sov-progress-fill" style={{ width: '75%', background: '#fff' }}></div>
            </div>
            <p style={{ margin: '15px 0 0 0', fontSize: '9px', fontWeight: 'bold', color: 'rgba(255,255,255,0.7)' }}>MARKET İNDİRİMLERİ: %12 AVANTAJ</p>
          </div>

          <div className="sov-panel">
            <div className="sov-panel-title">Akıllı Alışveriş Listesi</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: "Tavuk Göğsü (500g)", price: "₺84.50", old: "₺120", tag: "MARKET A - %30" },
                { name: "Biber (Sivri)", price: "₺8.00", old: "200G", tag: "STANDART FİYAT" }
              ].map((item, i) => (
                <div key={i} style={{ background: '#050508', border: '1px solid #111', padding: '12px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>{item.name}</span>
                    <span style={{ display: 'block', fontSize: '8px', color: '#6366f1', marginTop: '4px' }}>{item.tag}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{item.price}</span>
                    <span style={{ display: 'block', fontSize: '8px', color: '#333', textDecoration: i===0 ? 'line-through' : 'none' }}>{item.old}</span>
                  </div>
                </div>
              ))}
              <button style={{ width: '100%', background: '#1a1a1f', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>LİSTEYİ KOPYALA</button>
            </div>
          </div>
        </aside>
      </main>

      <footer className="sov-footer">
        <div style={{ display: 'flex', gap: '30px' }}>
          <span>ENGINE: BUDGET_EFFICIENCY_v1.2</span>
          <span>PROTOCOL: OPTIMIZED_STUDENT_LIFE</span>
        </div>
        <div>ARCHITECT: ÖMER KAPLAN | ORIGIN: KAPLAN HALI YIKAMA PRECISION DEPT</div>
      </footer>
    </div>
  );
};

export default App;
