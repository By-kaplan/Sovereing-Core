<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 07. HÜCRE (HARDWARE RESONANCE)</title>
    <style>
        :root {
            --bg-deep: #020617;
            --panel-bg: #0f172a;
            --text-neon: #38bdf8;
            --text-dim: #64748b;
            --hazard: #ef4444;
            --safety: #10b981;
            --warning: #f59e0b;
            --optic: #fbbf24; 
            --entropy: #8b5cf6; 
            --signal: #22d3ee; 
            --biometric: #10b981; 
            --shadow: #f43f5e;
            --resonance: #f97316; /* 07. Hücre Rengi: Rezonans Turuncusu */
            --border: #1e293b;
            --cell-gap: 4px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; cursor: crosshair; }

        body {
            font-family: "Courier New", Courier, monospace;
            background-color: var(--bg-deep);
            color: var(--text-neon);
            padding: 15px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            gap: 15px;
            overflow: hidden;
        }

        .nefer-header {
            border: 1px solid var(--border);
            background: rgba(15, 23, 42, 0.9);
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-left: 4px solid var(--resonance);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--resonance); letter-spacing: 3px; font-weight: 800; }
        .meta-info { font-size: 0.7rem; color: var(--text-dim); text-align: right; }

        .cell-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(14px, 14px));
            gap: var(--cell-gap);
            background: var(--panel-bg);
            padding: 12px;
            border: 1px solid var(--border);
            justify-content: center;
        }

        .cell {
            width: 14px;
            height: 14px;
            background: #1e293b;
            border-radius: 1px;
            transition: all 0.3s ease;
        }

        .cell.active { background: var(--safety); box-shadow: 0 0 8px var(--safety); }
        .cell.optic-active { background: var(--optic); box-shadow: 0 0 12px var(--optic); }
        .cell.entropy-active { background: var(--entropy); box-shadow: 0 0 12px var(--entropy); }
        .cell.signal-active { background: var(--signal); box-shadow: 0 0 12px var(--signal); }
        .cell.biometric-active { background: var(--biometric); box-shadow: 0 0 12px var(--biometric); }
        .cell.shadow-active { background: var(--shadow); box-shadow: 0 0 12px var(--shadow); }
        .cell.resonance-active { background: var(--resonance); box-shadow: 0 0 12px var(--resonance); }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

        .console-container {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 15px;
            overflow: hidden;
        }

        .main-display {
            display: flex;
            flex-direction: column;
            gap: 15px;
            overflow: hidden;
        }

        .viz-view {
            height: 220px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            overflow: hidden;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 2px;
        }

        canvas { width: 100%; height: 100%; image-rendering: pixelated; border-right: 1px solid var(--border); }
        .viz-box { position: relative; overflow: hidden; background: #020617; border-right: 1px solid var(--border); }
        .viz-box:last-child { border-right: none; }

        .log-panel {
            flex: 1;
            background: var(--panel-bg);
            border: 1px solid var(--border);
            padding: 15px;
            overflow-y: auto;
            font-size: 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .log-entry { border-left: 2px solid transparent; padding-left: 8px; }
        .log-entry.sys { border-left-color: var(--warning); color: var(--warning); }
        .log-entry.resonance { border-left-color: var(--resonance); color: var(--resonance); }

        .tools-panel {
            background: var(--panel-bg);
            border: 1px solid var(--border);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            overflow-y: auto;
        }

        .btn {
            background: #1e293b;
            border: 1px solid var(--border);
            color: var(--text-neon);
            padding: 6px 10px;
            font-size: 0.55rem;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .btn.active-op-resonance { border-color: var(--resonance); background: #7c2d12; color: white; }

        .protocol-footer {
            background: #020617;
            padding: 20px;
            border: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .attribution { font-size: 0.7rem; color: var(--text-dim); }
        .flag-box { opacity: 0.7; }

        .thermal-hud {
            position: absolute;
            bottom: 5px;
            left: 5px;
            font-size: 0.45rem;
            color: var(--resonance);
            font-weight: bold;
        }
    </style>
</head>
<body>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // HARDWARE_RESONANCE</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">07. HÜCRE: DONANIMSAL REZONANS VE TERMAL YORGUNLUK</div>
        </div>
        <div class="meta-info">
            <div id="clock">00:00:00</div>
            <div>ARCHITECT: ÖMER KAPLAN</div>
        </div>
    </header>

    <div class="cell-grid" id="cell-grid"></div>

    <div class="console-container">
        <div class="main-display">
            <div class="viz-view">
                <div class="viz-box"><canvas id="optic-canvas"></canvas></div>
                <div class="viz-box" id="entropy-viz"><svg width="100%" height="100%" id="entropy-svg"></svg></div>
                <div class="viz-box" id="signal-viz"><svg width="100%" height="100%" id="signal-svg"></svg></div>
                <div class="viz-box" id="shadow-viz"><canvas id="shadow-canvas"></canvas></div>
                <div class="viz-box" id="resonance-viz">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--resonance); background:rgba(0,0,0,0.8); z-index:5;">THERMAL_OSCILLATION_ACTIVE</div>
                    <canvas id="resonance-canvas"></canvas>
                    <div id="thermal-hud" class="thermal-hud">CPU_LOAD: 0% | TEMP: STABLE</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="OpticEngine.toggle()"><span>02: OPTIC</span></button>
            <button class="btn" onclick="EntropicEngine.toggle()"><span>03: ENTROPY</span></button>
            <button class="btn" onclick="SignalEngine.toggle()"><span>04: SIGNAL</span></button>
            <button class="btn" onclick="BiometricEngine.toggle()"><span>05: BIOMETRIC</span></button>
            <button class="btn" onclick="ShadowEngine.toggle()"><span>06: SHADOW</span></button>
            <button class="btn" id="resonance-toggle" onclick="ResonanceEngine.toggle()">
                <span>07: HW RESONANCE</span>
                <span id="resonance-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>07. HÜCRE: HARDWARE RESONANCE FATIGUE</b> - Fiziksel Donanım Sabotajı</p>
            <p>Architect: Ömer Kaplan | Organization: Kaplan Precision Dept.</p>
        </div>
        <div class="flag-box">
            <svg width="100" height="60" viewBox="0 0 150 100">
                <defs><mask id="m"><rect width="150" height="100" fill="white"/><circle cx="61.25" cy="50" r="20" fill="black"/></mask></defs>
                <circle cx="50" cy="50" r="25" fill="#ef4444" mask="url(#m)"/><path d="M95,50 L86.18,52.86 L88.54,43.82 L81.18,37.14 L90.41,36.55 L95,28 L99.59,36.55 L108.82,37.14 L101.46,43.82 L103.82,52.86 Z" fill="#ef4444" transform="rotate(-18, 95, 40) translate(0, 5)"/></svg>
        </div>
    </footer>

    <script>
        const Kernel = {
            startTime: Date.now(),
            init() {
                this.setupGrid();
                this.updateCell(1, "active");
                setInterval(() => { document.getElementById('clock').textContent = new Date().toLocaleTimeString(); }, 1000);
                this.log("Kernel aktif. Hücre 07 operasyonel.", "sys");
            },
            setupGrid() {
                const grid = document.getElementById('cell-grid');
                for(let i=1; i<=92; i++) {
                    const d = document.createElement('div');
                    d.className = 'cell'; d.id = `cell-${i}`;
                    grid.appendChild(d);
                }
            },
            updateCell(id, status) {
                const el = document.getElementById(`cell-${id}`);
                if(el) el.className = `cell ${status}`;
            },
            log(msg, type = "sys") {
                const l = document.getElementById('sys-log');
                const e = document.createElement('div');
                e.className = `log-entry ${type}`;
                e.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
                l.appendChild(e);
                l.scrollTop = l.scrollHeight;
            },
            async sequenceBoot() {
                for(let i=2; i<=92; i++) {
                    if([2,3,4,5,6,7].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 10));
                    this.updateCell(i, "active");
                }
            }
        };

        const OpticEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(2, this.active ? "optic-active" : "active"); } };
        const EntropicEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(3, this.active ? "entropy-active" : "active"); } };
        const SignalEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(4, this.active ? "signal-active" : "active"); } };
        const BiometricEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(5, this.active ? "biometric-active" : "active"); } };
        const ShadowEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(6, this.active ? "shadow-active" : "active"); } };

        const ResonanceEngine = {
            active: false,
            workers: [],
            loop: null,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('resonance-toggle');
                const canvas = document.getElementById('resonance-canvas');
                const hud = document.getElementById('thermal-hud');
                const ctx = canvas.getContext('2d');
                
                if(this.active) {
                    btn.classList.add('active-op-resonance');
                    document.getElementById('resonance-status').textContent = "AKTİF";
                    Kernel.updateCell(7, "resonance-active");
                    Kernel.log("DONANIMSAL REZONANS AKTİF: TERMAL PARAZİT ENJEKTE EDİLİYOR.", "resonance");
                    this.start(canvas, ctx, hud);
                } else {
                    btn.classList.remove('active-op-resonance');
                    document.getElementById('resonance-status').textContent = "KAPALI";
                    Kernel.updateCell(7, "active");
                    this.stop(ctx, canvas);
                }
            },
            start(c, ctx, hud) {
                // Termal Salınım İşçisi (Inline Web Worker)
                const workerCode = `
                    onmessage = function(e) {
                        const sharedArray = e.data;
                        function oscillate() {
                            const start = Date.now();
                            // %100 Yük Fazı
                            while(Date.now() - start < 50) { Math.sqrt(Math.random()); }
                            // %0 Yük Fazı (Uyku)
                            setTimeout(oscillate, 50);
                        }
                        oscillate();
                    }
                `;
                const blob = new Blob([workerCode], {type: 'application/javascript'});
                const workerUrl = URL.createObjectURL(blob);

                for(let i=0; i<navigator.hardwareConcurrency || 4; i++) {
                    const w = new Worker(workerUrl);
                    w.postMessage("start");
                    this.workers.push(w);
                }

                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    const load = 50 + Math.sin(Date.now() / 100) * 50;
                    ctx.strokeStyle = "var(--resonance)";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(0, c.height - (load/100 * c.height));
                    ctx.lineTo(c.width, c.height - (load/100 * c.height));
                    ctx.stroke();

                    hud.textContent = `CPU_LOAD: ${Math.floor(load)}% | TEMP: CRITICAL_RES`;
                    
                    if(Math.random() > 0.97) Kernel.log(`Rezonans Piki: VRM Voltaj Dalgalanması Tespit Edildi.`, "resonance");
                    
                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            },
            stop(ctx, c) {
                this.workers.forEach(w => w.terminate());
                this.workers = [];
                cancelAnimationFrame(this.loop);
                ctx.clearRect(0,0,c.width, c.height);
                document.getElementById('thermal-hud').textContent = "CPU_LOAD: 0% | TEMP: STABLE";
            }
        };

        window.onload = () => {
            Kernel.init();
            const rc = document.getElementById('resonance-canvas');
            rc.width = rc.offsetWidth; rc.height = rc.offsetHeight;
        };
    </script>
</body>
</html>
