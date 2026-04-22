<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data:; connect-src 'none';">
    <title>NEFER-OS | 1.0.0-OMEGA | 28. HÜCRE (POLYMORPHIC MORPH)</title>
    <style>
        :root {
            --bg-deep: #020617;
            --panel-bg: #0f172a;
            --text-neon: #38bdf8;
            --text-dim: #64748b;
            --hazard: #ef4444;
            --safety: #10b981;
            --warning: #f59e0b;
            --bootloader: #fdf2f8;
            --decoy: #a78bfa;
            --poison: #bef264;
            --jitter: #fb7185;
            --morph: #f59e0b; /* 28. Hücre Rengi: Metamorfoz Kehribarı */
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
            border-left: 4px solid var(--morph);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--morph); letter-spacing: 3px; font-weight: 800; }
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
        .cell.boot-active { background: var(--bootloader); box-shadow: 0 0 15px var(--bootloader); }
        .cell.decoy-active { background: var(--decoy); box-shadow: 0 0 15px var(--decoy); }
        .cell.poison-active { background: var(--poison); box-shadow: 0 0 15px var(--poison); }
        .cell.jitter-active { background: var(--jitter); box-shadow: 0 0 15px var(--jitter); }
        .cell.morph-active { background: var(--morph); box-shadow: 0 0 15px var(--morph); animation: morph-pulse 0.5s infinite; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes morph-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); filter: contrast(1.5); } 100% { transform: scale(1); } }
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
            height: 320px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 2px;
        }

        canvas { width: 100%; height: 100%; image-rendering: pixelated; }
        .viz-box { position: relative; overflow: hidden; background: #020617; border: 1px solid var(--border); }

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
        .log-entry.morph { border-left-color: var(--morph); color: var(--morph); font-weight: bold; }

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
            text-align: left;
        }

        .btn.active-op-jitter { border-color: var(--jitter); background: #881337; color: white; }
        .btn.active-op-morph { border-color: var(--morph); background: #78350f; color: white; }

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
        
        .hud-text {
            position: absolute;
            bottom: 5px;
            left: 5px;
            font-size: 0.45rem;
            color: var(--text-neon);
            font-weight: bold;
        }
    </style>
</head>
<body>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // POLYMORPHIC_MORPH</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">28. HÜCRE: POLİMORFİK YÜK BAŞKALAŞIMI VE İMZA KARARTMASI</div>
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
                <div class="viz-box">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--poison); background:rgba(0,0,0,0.8); z-index:5;">POISON_ENGINE</div>
                    <canvas id="poison-canvas"></canvas>
                </div>
                <div class="viz-box">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--jitter); background:rgba(0,0,0,0.8); z-index:5;">QUANTUM_JITTER</div>
                    <canvas id="jitter-canvas"></canvas>
                </div>
                <div class="viz-box" style="grid-column: span 2;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--morph); background:rgba(0,0,0,0.8); z-index:5;">MUTATION_CORE_DUMP</div>
                    <canvas id="morph-canvas"></canvas>
                    <div id="morph-hud" class="hud-text" style="color: var(--morph);">CURRENT_HASH: 0x0 | GEN: 0 | SIG: EVADING</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="PoisonEngine.toggle()">
                <span>26: DATA EXFILTRATION POISONING</span>
                <span>STATE</span>
            </button>
            <button class="btn" onclick="JitterEngine.toggle()">
                <span>27: QUANTUM-INTERFERENCE JITTERING</span>
                <span>STATE</span>
            </button>
            <button class="btn" id="morph-toggle" onclick="MorphEngine.toggle()">
                <span>28: POLYMORPHIC PAYLOAD MORPH</span>
                <span id="morph-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 28: Kaynak kodunu saniyeler içinde mutasyona uğratarak imza tabanlı tespiti engeller.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>28. HÜCRE: POLYMORPHIC PAYLOAD METAMORPHOSIS</b> - İmza Karartması</p>
            <p>Architect: Ömer Kaplan | Organization: Kaplan Precision Dept.</p>
        </div>
        <div class="flag-box">
            <svg width="100" height="60" viewBox="0 0 150 100">
                <defs><mask id="m"><rect width="150" height="100" fill="white"/><circle cx="61.25" cy="50" r="20" fill="black"/></mask></defs>
                <circle cx="50" cy="50" r="25" fill="#ef4444" mask="url(#m)"/><path d="M95,50 L86.18,52.86 L88.54,43.82 L81.18,37.14 L90.41,36.55 L95,28 L99.59,36.55 L108.82,37.14 L101.46,43.82 L103.82,52.86 Z" fill="#ef4444" transform="rotate(-18, 95, 40) translate(0, 5)"/></svg>
        </div>
    </footer>

    <script type="module">
        const Kernel = {
            init() {
                this.setupGrid();
                this.updateCell(1, "active");
                this.updateCell(24, "boot-active");
                setInterval(() => { document.getElementById('clock').textContent = new Date().toLocaleTimeString(); }, 1000);
                this.log("Kernel aktif. Eternal Bootloader mühürlendi.", "boot");
            },
            setupGrid() {
                const grid = document.getElementById('cell-grid');
                grid.innerHTML = '';
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
                for(let i=1; i<=28; i++) {
                    if([1, 24, 26, 27, 28].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 20));
                    this.updateCell(i, "active");
                }
            }
        };

        const PoisonEngine = {
            active: false, loop: null,
            toggle() {
                this.active = !this.active;
                Kernel.updateCell(26, this.active ? "poison-active" : "active");
                if(this.active) this.start();
            },
            start() {
                const c = document.getElementById('poison-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2,6,23,0.2)";
                    ctx.fillRect(0,0,c.width,c.height);
                    ctx.strokeStyle = "var(--poison)";
                    ctx.beginPath();
                    ctx.moveTo(0, Math.random()*c.height);
                    ctx.lineTo(c.width, Math.random()*c.height);
                    ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const JitterEngine = {
            active: false, loop: null,
            toggle() {
                this.active = !this.active;
                Kernel.updateCell(27, this.active ? "jitter-active" : "active");
                if(this.active) this.start();
            },
            start() {
                const c = document.getElementById('jitter-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2,6,23,0.2)";
                    ctx.fillRect(0,0,c.width,c.height);
                    ctx.strokeStyle = "var(--jitter)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    for(let x=0; x<c.width; x+=5) {
                        const y = (c.height/2) + (Math.random() - 0.5) * 40;
                        if(x===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const MorphEngine = {
            active: false,
            loop: null,
            gen: 0,
            junkCode: ["_0x2a", "var _q=7", "if(false)", "return 0", "const _z=0xAF"],

            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('morph-toggle');
                const hud = document.getElementById('morph-hud');
                
                if(this.active) {
                    btn.classList.add('active-op-morph');
                    document.getElementById('morph-status').textContent = "MUTASYON";
                    Kernel.updateCell(28, "morph-active");
                    Kernel.log("POLİMORFİK MUTASYON AKTİF: KOD İMZALARI DEĞİŞTİRİLİYOR.", "morph");
                    this.startViz();
                } else {
                    btn.classList.remove('active-op-morph');
                    document.getElementById('morph-status').textContent = "KAPALI";
                    Kernel.updateCell(28, "active");
                    cancelAnimationFrame(this.loop);
                    hud.textContent = "CURRENT_HASH: 0x0 | GEN: 0 | SIG: EVADING";
                    Kernel.log("Metamorfoz motoru durduruldu.", "sys");
                }
            },

            startViz() {
                const c = document.getElementById('morph-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    if(Math.random() > 0.95) {
                        this.gen++;
                        const hash = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase();
                        document.getElementById('morph-hud').textContent = `CURRENT_HASH: ${hash} | GEN: ${this.gen} | SIG: MUTATING`;
                        Kernel.log(`Mutasyon [Gen ${this.gen}]: Kaynak kod yeniden mühürlendi. Yeni Hash: ${hash}`, "morph");
                    }

                    // Kod akışı animasyonu
                    ctx.fillStyle = "var(--morph)";
                    ctx.font = "8px monospace";
                    for(let i=0; i<10; i++) {
                        const code = this.junkCode[Math.floor(Math.random()*this.junkCode.length)];
                        ctx.fillText(code, Math.random()*c.width, Math.random()*c.height);
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        window.PoisonEngine = PoisonEngine;
        window.JitterEngine = JitterEngine;
        window.MorphEngine = MorphEngine;
        window.Kernel = Kernel;
        window.onload = () => Kernel.init();
    </script>
</body>
</html>
