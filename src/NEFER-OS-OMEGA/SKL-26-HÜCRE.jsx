<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data:; connect-src 'none';">
    <title>NEFER-OS | 1.0.0-OMEGA | 26. HÜCRE (DATA POISONING)</title>
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
            --poison: #bef264; /* 26. Hücre Rengi: Zehir Yeşili */
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
            border-left: 4px solid var(--poison);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--poison); letter-spacing: 3px; font-weight: 800; }
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
        .cell.poison-active { background: var(--poison); box-shadow: 0 0 15px var(--poison); animation: toxic-pulse 1.5s infinite; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes toxic-pulse { 0% { opacity: 1; filter: brightness(1); } 50% { opacity: 0.6; filter: brightness(1.5); } 100% { opacity: 1; filter: brightness(1); } }
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
            height: 300px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2px;
        }

        canvas { width: 100%; height: 100%; image-rendering: pixelated; }
        .viz-box { position: relative; overflow: hidden; background: #020617; border-right: 1px solid var(--border); }

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
        .log-entry.decoy { border-left-color: var(--decoy); color: var(--decoy); }
        .log-entry.poison { border-left-color: var(--poison); color: var(--poison); font-weight: bold; }

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

        .btn.active-op-decoy { border-color: var(--decoy); background: #4c1d95; color: white; }
        .btn.active-op-poison { border-color: var(--poison); background: #3f6212; color: white; }

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
            <h1>NEFER-OS // DATA_POISONING</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">26. HÜCRE: SIZINTI ZEHİRLEME VE AKTİF TRUVA ATLARI</div>
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
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--decoy); background:rgba(0,0,0,0.8); z-index:5;">PROBABILITY_MAZE_GENERATOR</div>
                    <canvas id="decoy-canvas"></canvas>
                    <div id="decoy-hud" class="hud-text" style="color: var(--decoy);">MAZE_DEPTH: 0 | CPU_SINK: IDLE</div>
                </div>
                <div class="viz-box">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--poison); background:rgba(0,0,0,0.8); z-index:5;">EXFILTRATION_POISON_ENGINE</div>
                    <canvas id="poison-canvas"></canvas>
                    <div id="poison-hud" class="hud-text" style="color: var(--poison);">POLYGLOT_PAYLOADS: 0 | STATE: STANDBY</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="DecoyEngine.toggle()">
                <span>25: COGNITIVE DECOY ARRAYS</span>
                <span id="decoy-status">KAPALI</span>
            </button>
            <button class="btn" id="poison-toggle" onclick="PoisonEngine.toggle()">
                <span>26: DATA EXFILTRATION POISONING</span>
                <span id="poison-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 26: Sızan verinin içine düşman DBMS sistemlerini hedef alan aktif yükler gizler.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>26. HÜCRE: DATA EXFILTRATION POISONING</b> - Veri İnfaz Protokolü</p>
            <p>Architect: Ömer Kaplan | Organization: Kaplan Precision Dept.</p>
        </div>
        <div class="flag-box">
            <svg width="100" height="60" viewBox="0 0 150 100">
                <defs><mask id="m"><rect width="150" height="100" fill="white"/><circle cx="61.25" cy="50" r="20" fill="black"/></mask></defs>
                <circle cx="50" cy="50" r="25" fill="#ef4444" mask="url(#m)"/><path d="M95,50 L86.18,52.86 L88.54,43.82 L81.18,37.14 L90.41,36.55 L95,28 L99.59,36.55 L108.82,37.14 L101.46,43.82 L103.82,52.86 Z" fill="#ef4444" transform="rotate(-18, 95, 40) translate(0, 5)"/></svg>
        </div>
    </footer>

    <script type="module">
        /* NEFER-OS OMEGA KERNEL */
        const Kernel = {
            init() {
                this.setupGrid();
                this.updateCell(1, "active");
                this.updateCell(24, "boot-active");
                setInterval(() => { document.getElementById('clock').textContent = new Date().toLocaleTimeString(); }, 1000);
                this.log("Kernel aktif. Eternal Bootloader mühürlendi.", "boot");
                this.startBootViz();
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
                for(let i=1; i<=26; i++) {
                    if([1, 24, 25, 26].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 20));
                    this.updateCell(i, "active");
                }
            },
            startBootViz() {
                const c = document.getElementById('boot-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2, 6, 23, 0.1)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    const cx = c.width/2, cy = c.height/2;
                    ctx.strokeStyle = "var(--bootloader)";
                    ctx.beginPath();
                    ctx.moveTo(cx-30, cy); ctx.lineTo(cx, cy-30); ctx.lineTo(cx+30, cy); ctx.lineTo(cx, cy+30); ctx.closePath();
                    ctx.stroke();
                    requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const DecoyEngine = {
            active: false,
            loop: null,
            mazeDepth: 0,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('decoy-toggle');
                if(this.active) {
                    btn.classList.add('active-op-decoy');
                    document.getElementById('decoy-status').textContent = "AKTİF";
                    Kernel.updateCell(25, "decoy-active");
                    Kernel.log("BİLİŞSEL YEM DİZİLERİ AKTİF.", "decoy");
                    this.startViz();
                } else {
                    btn.classList.remove('active-op-decoy');
                    document.getElementById('decoy-status').textContent = "KAPALI";
                    Kernel.updateCell(25, "active");
                    cancelAnimationFrame(this.loop);
                }
            },
            startViz() {
                const c = document.getElementById('decoy-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    this.mazeDepth++;
                    document.getElementById('decoy-hud').textContent = `MAZE_DEPTH: ${this.mazeDepth} | CPU_SINK: MAX`;
                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const PoisonEngine = {
            active: false,
            loop: null,
            payloadCount: 0,

            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('poison-toggle');
                const hud = document.getElementById('poison-hud');
                
                if(this.active) {
                    btn.classList.add('active-op-poison');
                    document.getElementById('poison-status').textContent = "AKTİF";
                    Kernel.updateCell(26, "poison-active");
                    Kernel.log("SIZINTI ZEHİRLEME AKTİF: TRUVA YÜKLERİ ENJEKTE EDİLİYOR.", "poison");
                    this.startViz();
                } else {
                    btn.classList.remove('active-op-poison');
                    document.getElementById('poison-status').textContent = "KAPALI";
                    Kernel.updateCell(26, "active");
                    cancelAnimationFrame(this.loop);
                    hud.textContent = "POLYGLOT_PAYLOADS: 0 | STATE: STANDBY";
                    Kernel.log("Zehirleme motoru pasifize edildi.", "sys");
                }
            },

            startViz() {
                const c = document.getElementById('poison-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    this.payloadCount += 1;
                    document.getElementById('poison-hud').textContent = `POLYGLOT_PAYLOADS: ${this.payloadCount} | STATE: INJECTING`;

                    // "Zehirli" veri akışı vizüalizasyonu
                    ctx.strokeStyle = "var(--poison)";
                    ctx.lineWidth = 1;
                    for(let i = 0; i < 3; i++) {
                        const y = (Date.now() / 10 + i * 50) % c.height;
                        ctx.beginPath();
                        ctx.moveTo(0, y);
                        ctx.lineTo(c.width, y + Math.sin(Date.now()/200)*20);
                        ctx.stroke();
                    }

                    if(Math.random() > 0.98) {
                        const targets = ["PostgreSQL", "MongoDB", "Oracle", "MySQL"];
                        const t = targets[Math.floor(Math.random() * targets.length)];
                        Kernel.log(`Zehirli Paket Hazırlandı: ${t} için Polyglot Payload enjekte edildi.`, "poison");
                        Kernel.log(`Truva Atı Mühürlendi: Düşman analiz motoru tetiklendiğinde aktifleşecek.`, "poison");
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        window.DecoyEngine = DecoyEngine;
        window.PoisonEngine = PoisonEngine;
        window.Kernel = Kernel;
        window.onload = () => Kernel.init();
    </script>
</body>
</html>
