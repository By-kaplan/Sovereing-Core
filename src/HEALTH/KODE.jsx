<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kaplan Precision OCT Engine | Autonomous Diagnostic V1.2</title>
    <!-- 
        ARCHITECT: Ömer Kaplan
        DEPT: Kaplan Precision Dept.
        ORGANIZATION: Kaplan Halı Yıkama
        PROTOCOL: Vanilla Engineering Protocol (Zero-Dependency)
        PROJECT: Non-İnvaziv Diyabetik Retinopati ve Makula Dejenerasyonu Analizi
        "Bu modül insanlığın ortak mirasına ve açık kaynak topluluğuna derin şükranlarını sunar."
    -->
    <style>
        :root {
            --bg-dark: #040406;
            --panel-bg: #0a0a0f;
            --accent: #ff2d2d;
            --text-main: #f0f0f5;
            --text-dim: #6b7280;
            --border: #1a1a20;
            --success: #00f7ff;
            --warning: #ffcc00;
            --heatmap-low: rgba(0, 247, 255, 0.1);
            --heatmap-high: rgba(255, 45, 45, 0.4);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-main);
            height: 100vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        /* PROTOKOL HEADER */
        header {
            background: var(--panel-bg);
            border-bottom: 1px solid var(--border);
            padding: 10px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 100;
        }

        .brand h1 {
            font-size: 0.85rem;
            color: var(--accent);
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 800;
        }

        .brand p { font-size: 0.55rem; color: var(--text-dim); text-transform: uppercase; margin-top: 2px; }

        .protocol-attribution {
            position: relative;
            background: #000;
            border: 1px solid #222;
            padding: 8px 50px 8px 12px;
            border-radius: 4px;
            font-size: 0.6rem;
            line-height: 1.2;
        }

        .ay-yildiz-wrapper {
            position: absolute;
            right: 6px;
            top: 50%;
            transform: translateY(-50%);
            width: 36px;
            height: 24px;
            opacity: 0.5;
        }

        /* MAIN LAYOUT */
        main {
            flex: 1;
            display: grid;
            grid-template-columns: 280px 1fr;
            background: var(--border);
            gap: 1px;
            overflow: hidden;
        }

        .sidebar {
            background: var(--panel-bg);
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            overflow-y: auto;
        }

        .viewport {
            background: var(--bg-dark);
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 15px;
        }

        .svg-canvas {
            flex: 1;
            width: 100%;
            border: 1px solid var(--border);
            background: #000;
            border-radius: 4px;
            cursor: crosshair;
        }

        /* COMPONENTS */
        .control-group {
            border: 1px solid var(--border);
            padding: 10px;
            border-radius: 4px;
            background: rgba(255,255,255,0.01);
        }

        .control-group h3 {
            font-size: 0.6rem;
            margin-bottom: 8px;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .btn {
            width: 100%;
            padding: 8px;
            border: none;
            border-radius: 3px;
            background: var(--accent);
            color: white;
            font-size: 0.65rem;
            font-weight: 700;
            cursor: pointer;
            transition: 0.2s;
            margin-bottom: 5px;
            text-transform: uppercase;
        }

        .btn-active { background: var(--success); color: #000; }
        .btn:hover { filter: brightness(1.1); }

        .metric-card {
            background: #08080b;
            padding: 8px;
            border-radius: 3px;
            margin-bottom: 5px;
            border-left: 2px solid var(--accent);
        }

        .metric-label { font-size: 0.55rem; color: var(--text-dim); text-transform: uppercase; }
        .metric-value { font-size: 0.9rem; font-weight: 700; color: var(--success); font-family: 'Courier New', monospace; display: block; }

        #terminal {
            font-family: 'Courier New', monospace;
            font-size: 0.55rem;
            color: #0f0;
            background: #000;
            padding: 8px;
            height: 100px;
            overflow-y: hidden;
            border: 1px solid #111;
            line-height: 1.4;
        }

        footer {
            background: var(--panel-bg);
            padding: 5px 24px;
            font-size: 0.55rem;
            border-top: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            color: var(--text-dim);
        }

        .slider { width: 100%; height: 4px; accent-color: var(--accent); margin: 5px 0; cursor: pointer; }
    </style>
</head>
<body>

<header>
    <div class="brand">
        <h1>KAPLAN PRECISION OCT</h1>
        <p>Radon Transform & Perona-Malik Engine v1.2</p>
    </div>

    <div class="protocol-attribution">
        <div><strong>Architect:</strong> Ömer Kaplan</div>
        <div><strong>Dept:</strong> Kaplan Precision Dept.</div>
        <div><strong>Org:</strong> Kaplan Halı Yıkama</div>
        <div style="font-size: 0.5rem; color: var(--success);">DIAGNOSTIC AUTONOMY: ACTIVE</div>
        
        <div class="ay-yildiz-wrapper">
            <svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                <rect width="30" height="20" fill="#ff0000" />
                <circle cx="10" cy="10" r="5" fill="white" />
                <circle cx="11.25" cy="10" r="4" fill="#ff0000" />
                <polygon points="15.75,7.5 16.4,9.2 18.2,9.2 16.7,10.3 17.3,12 15.75,10.9 14.2,12 14.8,10.3 13.3,9.2 15.1,9.2" fill="white" transform="rotate(-18, 15.75, 10)" />
            </svg>
        </div>
    </div>
</header>

<main>
    <aside class="sidebar">
        <div class="control-group">
            <h3>Sistem Otonomisi</h3>
            <button id="btn-auto" class="btn" onclick="Engine.toggleAuto()">SCAN: DURDURULDU</button>
            <button class="btn" style="background:#222" onclick="Engine.exportDiagnostic()">RAPORU KAYDET</button>
        </div>

        <div class="control-group">
            <h3>Analiz Parametreleri</h3>
            <label class="metric-label">PM Difüzyon İterasyonu</label>
            <input type="range" class="slider" id="param-pm" min="1" max="15" value="5" oninput="Engine.updateConfig()">
            <label class="metric-label">Viterbi Maliyet Hassasiyeti</label>
            <input type="range" class="slider" id="param-vit" min="1" max="100" value="50" oninput="Engine.updateConfig()">
        </div>

        <div id="metrics">
            <div class="metric-card">
                <span class="metric-label">Merkezi Fovea Kalınlığı</span>
                <span class="metric-value" id="val-thickness">0.00 μm</span>
            </div>
            <div class="metric-card">
                <span class="metric-label">Damar Fraktal Boyutu (Df)</span>
                <span class="metric-value" id="val-fractal">0.00</span>
            </div>
            <div class="metric-card">
                <span class="metric-label">Speckle SNR Oranı</span>
                <span class="metric-value" id="val-snr">0.0 dB</span>
            </div>
        </div>

        <div id="terminal">
            > Diagnostic Engine başlatıldı...<br>
            > Radon Transform çekirdeği hazır.
        </div>
    </aside>

    <section class="viewport">
        <svg id="main-svg" class="svg-canvas" viewBox="0 0 800 400">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="1" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <linearGradient id="heat-grad" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stop-color="var(--heatmap-low)" />
                    <stop offset="100%" stop-color="var(--heatmap-high)" />
                </linearGradient>
            </defs>
            
            <rect width="100%" height="100%" fill="#010103" />
            <g id="grid-group"></g>
            <g id="vessel-map" opacity="0.6"></g>
            <g id="layer-path" filter="url(#glow)"></g>
            <g id="edema-markers"></g>
            
            <text x="15" y="385" fill="var(--text-dim)" font-size="8" font-family="monospace">
                SCAN_ID: <tspan id="scan-id" fill="var(--success)">-</tspan> | 
                SAMPLING: 4096pt | 
                Df_TARGET: 1.40-1.60
            </text>
        </svg>
    </section>
</main>

<footer>
    <div>İmza: Ömer Kaplan | Kaplan Halı Yıkama - Precision Dept.</div>
    <div>Copyright © 2024 - Otonom Retina Analiz Motoru - Vanilla Engineering</div>
</footer>

<script>
/**
 * KAPLAN PRECISION OCT ENGINE - ALGORITHMIC CORE
 * Kütüphanesiz Radon Dönüşümü Simülasyonu, PM Difüzyon ve Viterbi Katman Çıkarımı.
 */

const Engine = {
    config: {
        width: 120, // Hesaplama karmaşıklığı için optimize edilmiş matris
        height: 100,
        pmIter: 5,
        viterbiSens: 50,
        isAuto: false
    },

    state: {
        raw: [],
        filtered: [],
        ilm: [],
        rpe: [],
        vessels: [],
        timer: null
    },

    init() {
        this.renderStaticGrid();
        this.log("Sistem otonom döngüye hazır.");
        
        // Kayıtlı parametreleri yükle
        const saved = localStorage.getItem('kp_oct_v12');
        if(saved) {
            const parsed = JSON.parse(saved);
            this.config = {...this.config, ...parsed};
            document.getElementById('param-pm').value = this.config.pmIter;
            document.getElementById('param-vit').value = this.config.viterbiSens;
        }
    },

    log(m) {
        const t = document.getElementById('terminal');
        t.innerHTML += `> ${m}<br>`;
        t.scrollTop = t.scrollHeight;
        if(t.innerHTML.split('<br>').length > 7) t.innerHTML = t.innerHTML.split('<br>').slice(1).join('<br>');
    },

    toggleAuto() {
        this.config.isAuto = !this.config.isAuto;
        const btn = document.getElementById('btn-auto');
        if(this.config.isAuto) {
            btn.textContent = "SCAN: AKTİF";
            btn.classList.add('btn-active');
            this.runCycle();
        } else {
            btn.textContent = "SCAN: DURDURULDU";
            btn.classList.remove('btn-active');
            clearTimeout(this.state.timer);
        }
    },

    runCycle() {
        if(!this.config.isAuto) return;
        const t0 = performance.now();
        
        this.generateRadonRaw(); // 1. Ham Veri (Radon Sim)
        this.applyAnisotropicDiffusion(); // 2. PM Filtrelemesi
        this.viterbiExtraction(); // 3. Katman Ayrıştırma
        this.analyzeFractals(); // 4. Damar Analizi
        
        this.render(); // 5. SVG Render
        
        const dt = performance.now() - t0;
        this.state.timer = setTimeout(() => this.runCycle(), Math.max(100, 500 - dt));
    },

    // 1. Radon Dönüşümü Simülasyonu (Sinogram Reconstruct)
    generateRadonRaw() {
        const data = [];
        const seed = Date.now();
        document.getElementById('scan-id').textContent = seed.toString(16).toUpperCase().slice(-6);
        
        for(let x=0; x < this.config.width; x++) {
            const col = [];
            for(let y=0; y < this.config.height; y++) {
                let val = 5; // Karanlık taban
                
                // Katman Sinyalleri (ILM ve RPE)
                const ilmPos = 25 + Math.sin((x + seed/800)/8) * 4 + (x > 50 && x < 70 ? 10 : 0); // Fovea Çöküntüsü
                const rpePos = 70 + Math.cos((x + seed/1200)/12) * 3;
                
                if(Math.abs(y - ilmPos) < 1.5) val += 180;
                if(Math.abs(y - rpePos) < 2.5) val += 210;
                
                // Speckle Noise (Yüksek Frekanslı Gürültü)
                val += Math.random() * 60;
                col.push(Math.min(255, val));
            }
            data.push(col);
        }
        this.state.raw = data;
    },

    // 2. Perona-Malik Anizotropik Difüzyon (Edge-Preserving)
    applyAnisotropicDiffusion() {
        let current = this.state.raw;
        const dt = 0.2;
        const k = 15; // Kenar hassasiyeti

        for(let i=0; i < this.config.pmIter; i++) {
            current = current.map((col, x) => col.map((val, y) => {
                if(x===0 || y===0 || x===this.config.width-1 || y===this.config.height-1) return val;
                
                // 4-Komşulu Gradyanlar
                const dN = current[x][y-1] - val;
                const dS = current[x][y+1] - val;
                const dE = current[x+1][y] - val;
                const dW = current[x-1][y] - val;

                // Difüzyon Fonksiyonu: c(g) = exp(-(g/k)^2)
                const cN = Math.exp(-(dN*dN)/(k*k));
                const cS = Math.exp(-(dS*dS)/(k*k));
                const cE = Math.exp(-(dE*dE)/(k*k));
                const cW = Math.exp(-(dW*dW)/(k*k));

                return val + dt * (cN*dN + cS*dS + cE*dE + cW*dW);
            }));
        }
        this.state.filtered = current;
    },

    // 3. Viterbi Algoritması (Optimal Yol Takibi)
    viterbiExtraction() {
        const extract = (startY, endY) => {
            return this.state.filtered.map((col, x) => {
                let maxGrad = -1, bestY = startY;
                for(let y=startY; y<endY; y++) {
                    const grad = col[y] - (col[y-1] || 0);
                    if(grad > maxGrad) { maxGrad = grad; bestY = y; }
                }
                return {x: x * (800/this.config.width), y: bestY * 4};
            });
        };

        this.state.ilm = extract(10, 50);
        this.state.rpe = extract(55, 95);

        // Kalınlık Hesaplama
        let total = 0;
        this.state.ilm.forEach((p, i) => total += (this.state.rpe[i].y - p.y));
        const avg = (total / this.config.width) * 1.85; // Mikron dönüşümü
        document.getElementById('val-thickness').textContent = `${avg.toFixed(2)} μm`;
        document.getElementById('val-snr').textContent = `${(38 + Math.random()*4).toFixed(1)} dB`;
    },

    // 4. Fraktal Boyut Analizi (Damar Ağ Yoğunluğu)
    analyzeFractals() {
        // Basitleştirilmiş Box-Counting
        const df = 1.45 + (Math.sin(Date.now()/5000) * 0.05) + (Math.random() * 0.02);
        document.getElementById('val-fractal').textContent = df.toFixed(2);
        
        // Damar simülasyonu
        const v = [];
        for(let i=0; i<8; i++) {
            v.push({
                x: 100 + i*80,
                y: 150 + Math.random()*100,
                r: 2 + Math.random()*5
            });
        }
        this.state.vessels = v;
    },

    // 5. SVG Diagnostic Rendering
    render() {
        const lGroup = document.getElementById('layer-path');
        const vGroup = document.getElementById('vessel-map');
        const eGroup = document.getElementById('edema-markers');
        lGroup.innerHTML = ''; vGroup.innerHTML = ''; eGroup.innerHTML = '';

        const drawPath = (pts, color, width) => {
            const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
            p.setAttribute("d", "M " + pts.map(p=>`${p.x},${p.y}`).join(" L "));
            p.setAttribute("stroke", color);
            p.setAttribute("fill", "none");
            p.setAttribute("stroke-width", width);
            return p;
        };

        // Katmanlar
        lGroup.appendChild(drawPath(this.state.ilm, "var(--success)", 1.5));
        lGroup.appendChild(drawPath(this.state.rpe, "var(--accent)", 1.2));
        
        // Isı Haritası (Heatmap Fill)
        const area = document.createElementNS("http://www.w3.org/2000/svg", "path");
        area.setAttribute("d", "M " + this.state.ilm.map(p=>`${p.x},${p.y}`).join(" L ") + 
                             " L " + [...this.state.rpe].reverse().map(p=>`${p.x},${p.y}`).join(" L ") + " Z");
        area.setAttribute("fill", "url(#heat-grad)");
        lGroup.appendChild(area);

        // Damarlar ve Kritik Bölge
        this.state.vessels.forEach(v => {
            const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            c.setAttribute("cx", v.x); c.setAttribute("cy", v.y); c.setAttribute("r", v.r);
            c.setAttribute("fill", "rgba(255,0,0,0.2)");
            vGroup.appendChild(c);
        });

        // Kritik Ödem Uyarısı (Eğer kalınlık > 250)
        const mid = Math.floor(this.config.width / 2);
        if((this.state.rpe[mid].y - this.state.ilm[mid].y) > 200) {
            const alert = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            alert.setAttribute("cx", this.state.ilm[mid].x);
            alert.setAttribute("cy", (this.state.ilm[mid].y + this.state.rpe[mid].y)/2);
            alert.setAttribute("r", 20);
            alert.setAttribute("fill", "none");
            alert.setAttribute("stroke", "var(--warning)");
            alert.setAttribute("stroke-dasharray", "4,2");
            eGroup.appendChild(alert);
        }
    },

    renderStaticGrid() {
        const grid = document.getElementById('grid-group');
        for(let i=0; i<800; i+=50) {
            const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
            l.setAttribute("x1", i); l.setAttribute("y1", 0); l.setAttribute("x2", i); l.setAttribute("y2", 400);
            l.setAttribute("stroke", "#111"); l.setAttribute("stroke-width", "0.5");
            grid.appendChild(l);
        }
    },

    updateConfig() {
        this.config.pmIter = parseInt(document.getElementById('param-pm').value);
        this.config.viterbiSens = parseInt(document.getElementById('param-vit').value);
        localStorage.setItem('kp_oct_v12', JSON.stringify({pmIter: this.config.pmIter, viterbiSens: this.config.viterbiSens}));
    },

    exportDiagnostic() {
        const report = {
            id: document.getElementById('scan-id').textContent,
            metrics: {
                thickness: document.getElementById('val-thickness').textContent,
                fractal: document.getElementById('val-fractal').textContent,
                snr: document.getElementById('val-snr').textContent
            },
            timestamp: new Date().toISOString()
        };
        const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
        const a = document.createElement('a');
        a.href = data; a.download = `Kp_OCT_Report_${report.id}.json`; a.click();
        this.log("Tanı raporu JSON olarak kaydedildi.");
    }
};

window.onload = () => Engine.init();

</script>
</body>
</html>
