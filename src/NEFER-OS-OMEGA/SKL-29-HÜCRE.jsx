<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data:; connect-src 'none';">
    <title>NEFER-OS | 1.0.0-OMEGA | 29. HÜCRE (WS FLOOD)</title>
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
            --morph: #f59e0b;
            --ws-flood: #2dd4bf; /* 29. Hücre Rengi: WebSocket Turkuazı */
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
            border-left: 4px solid var(--ws-flood);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--ws-flood); letter-spacing: 3px; font-weight: 800; }
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
        .cell.ws-active { background: var(--ws-flood); box-shadow: 0 0 15px var(--ws-flood); animation: pulse 0.5s infinite; }
        .cell.morph-active { background: var(--morph); box-shadow: 0 0 15px var(--morph); }
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
            height: 320px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
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
        .log-entry.ws { border-left-color: var(--ws-flood); color: var(--ws-flood); font-weight: bold; }

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

        .btn.active-op-ws { border-color: var(--ws-flood); background: #134e4a; color: white; }

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
            <h1>NEFER-OS // ASYNC_WS_FLOOD</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">29. HÜCRE: ASİMETRİK WEBSOCKET BOĞMA VE PORT KİLİTLEME</div>
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
                <div class="viz-box">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--ws-flood); background:rgba(0,0,0,0.8); z-index:5;">WS_HALF_HANDSHAKE_STORM</div>
                    <canvas id="ws-canvas"></canvas>
                    <div id="ws-hud" class="hud-text" style="color: var(--ws-flood);">SOCKETS: 0 | STATE: IDLE</div>
                </div>
                <div class="viz-box" style="grid-column: span 3;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--morph); background:rgba(0,0,0,0.8); z-index:5;">MUTATION_CORE_DUMP</div>
                    <canvas id="morph-canvas"></canvas>
                    <div id="morph-hud" class="hud-text" style="color: var(--morph);">CURRENT_HASH: 0x0 | GEN: 0 | SIG: EVADING</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="MorphEngine.toggle()">
                <span>28: POLYMORPHIC PAYLOAD MORPH</span>
                <span>STATE</span>
            </button>
            <button class="btn" id="ws-toggle" onclick="WSEngine.toggle()">
                <span>29: ASYMMETRIC WS FLOODING</span>
                <span id="ws-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 29: Milyonlarca yarım kalmış el sıkışma ile düşman soket kaynaklarını tüketir.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>29. HÜCRE: ASYMMETRIC WEBSOCKET FLOODING</b> - Ağ Kapasite Sabotajı</p>
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
                for(let i=1; i<=29; i++) {
                    if([1, 24, 26, 27, 28, 29].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 20));
                    this.updateCell(i, "active");
                }
            }
        };

        const WSEngine = {
            active: false,
            loop: null,
            socketCount: 0,
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('ws-toggle');
                const hud = document.getElementById('ws-hud');
                
                if(this.active) {
                    btn.classList.add('active-op-ws');
                    document.getElementById('ws-status').textContent = "BOĞMA";
                    Kernel.updateCell(29, "ws-active");
                    Kernel.log("WEBSOCKET BOĞMA AKTİF: HALF-OPEN STORM BAŞLATILDI.", "ws");
                    this.startViz();
                } else {
                    btn.classList.remove('active-op-ws');
                    document.getElementById('ws-status').textContent = "KAPALI";
                    Kernel.updateCell(29, "active");
                    cancelAnimationFrame(this.loop);
                    this.socketCount = 0;
                    hud.textContent = "SOCKETS: 0 | STATE: IDLE";
                    Kernel.log("WebSocket boğma motoru pasifize edildi.", "sys");
                }
            },

            startViz() {
                const c = document.getElementById('ws-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    this.socketCount += Math.floor(Math.random() * 50);
                    document.getElementById('ws-hud').textContent = `SOCKETS: ${this.socketCount} | STATE: FLOODING`;

                    // Şimşek/Fırtına etkisi vizüalizasyonu
                    ctx.strokeStyle = "var(--ws-flood)";
                    ctx.lineWidth = 1;
                    for(let i=0; i<5; i++) {
                        ctx.beginPath();
                        ctx.moveTo(Math.random() * c.width, 0);
                        ctx.lineTo(Math.random() * c.width, Math.random() * c.height);
                        ctx.stroke();
                    }

                    if(Math.random() > 0.97) {
                        Kernel.log(`Fırtına: Yeni Half-Open dalgası gönderildi. [${this.socketCount} soket askıda]`, "ws");
                    }

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
                Kernel.updateCell(28, this.active ? "morph-active" : "active");
                if(this.active) this.startViz();
            },
            startViz() {
                const c = document.getElementById('morph-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    this.gen++;
                    const hash = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase();
                    document.getElementById('morph-hud').textContent = `CURRENT_HASH: ${hash} | GEN: ${this.gen} | SIG: MUTATING`;
                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const PoisonEngine = { active: false, toggle() {} }; 
        const JitterEngine = { active: false, toggle() {} };

        window.WSEngine = WSEngine;
        window.MorphEngine = MorphEngine;
        window.Kernel = Kernel;
        window.onload = () => Kernel.init();
    </script>
</body>
</html>
