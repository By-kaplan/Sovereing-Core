<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 05. HÜCRE (BIOMETRIC NOISE)</title>
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
            border-left: 4px solid var(--biometric);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--biometric); letter-spacing: 3px; font-weight: 800; }
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
            grid-template-columns: 1fr 1fr 1fr 1fr;
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
        .log-entry.biometric { border-left-color: var(--biometric); color: var(--biometric); }

        .tools-panel {
            background: var(--panel-bg);
            border: 1px solid var(--border);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            overflow-y: auto;
        }

        .btn {
            background: #1e293b;
            border: 1px solid var(--border);
            color: var(--text-neon);
            padding: 8px;
            font-size: 0.6rem;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .btn.active-op-biometric { border-color: var(--biometric); background: #064e3b; color: white; }

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
    </style>
</head>
<body>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // BIOMETRIC_NOISE</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">05. HÜCRE: BİYOMETRİK KİMLİK MASKESİ</div>
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
                <div class="viz-box" id="biometric-viz">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--biometric); background:rgba(0,0,0,0.8); z-index:5;">HASH_COLLISION_GEN</div>
                    <canvas id="biometric-canvas"></canvas>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" id="optic-toggle" onclick="OpticEngine.toggle()"><span>02: OPTIC PARALYSIS</span></button>
            <button class="btn" id="entropy-toggle" onclick="EntropicEngine.toggle()"><span>03: ENTROPIC BACKFIRE</span></button>
            <button class="btn" id="signal-toggle" onclick="SignalEngine.toggle()"><span>04: SIGNAL ECHO</span></button>
            <button class="btn" id="biometric-toggle" onclick="BiometricEngine.toggle()">
                <span>05: BIOMETRIC NOISE</span>
                <span id="biometric-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>05. HÜCRE: BIOMETRIC NOISE</b> - Kimlik Koruma Operasyonu</p>
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
                this.log("Kernel aktif. Hücre 05 operasyonel.", "sys");
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
                    if([2,3,4,5].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 10));
                    this.updateCell(i, "active");
                }
            }
        };

        const OpticEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(2, this.active ? "optic-active" : "active"); } };
        const EntropicEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(3, this.active ? "entropy-active" : "active"); } };
        const SignalEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(4, this.active ? "signal-active" : "active"); } };

        const BiometricEngine = {
            active: false,
            loop: null,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('biometric-toggle');
                const canvas = document.getElementById('biometric-canvas');
                const ctx = canvas.getContext('2d');
                if(this.active) {
                    btn.classList.add('active-op-biometric');
                    document.getElementById('biometric-status').textContent = "AKTİF";
                    Kernel.updateCell(5, "biometric-active");
                    Kernel.log("BİYOMETRİK MASKELENME BAŞLADI.", "biometric");
                    this.start(canvas, ctx);
                } else {
                    btn.classList.remove('active-op-biometric');
                    document.getElementById('biometric-status').textContent = "KAPALI";
                    Kernel.updateCell(5, "active");
                    cancelAnimationFrame(this.loop);
                    ctx.clearRect(0,0,canvas.width, canvas.height);
                }
            },
            start(c, ctx) {
                const draw = () => {
                    if(!this.active) return;
                    const idata = ctx.createImageData(c.width, c.height);
                    for (let i = 0; i < idata.data.length; i += 4) {
                        const n = Math.random() * 255;
                        idata.data[i] = n; idata.data[i+1] = n; idata.data[i+2] = n; idata.data[i+3] = 30;
                    }
                    ctx.putImageData(idata, 0, 0);
                    if(Math.random() > 0.98) Kernel.log(`Hash Collision: 0x${Math.random().toString(16).slice(2,10)}`, "biometric");
                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        window.onload = () => {
            Kernel.init();
            const bc = document.getElementById('biometric-canvas');
            bc.width = bc.offsetWidth; bc.height = bc.offsetHeight;
        };
    </script>
</body>
</html>
