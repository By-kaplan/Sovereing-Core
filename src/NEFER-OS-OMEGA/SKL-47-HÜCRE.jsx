<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 47. HÜCRE (DATA COLLISION)</title>
    <style>
        :root 
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
            --ws-flood: #2dd4bf;
            --dns-exfil: #3b82f6;
            --neural-jam: #c084fc;
            --heap-spray: #f472b6;
            --time-bomb: #f59e0b;
            --shadow-dom: #6366f1;
            --dead-lock: #f43f5e;
            --hijack: #facc15;
            --audio-exfil: #a3e635;
            --jit-exploit: #f87171;
            --stegano: #4ade80;
            --mutation-key: #ec4899;
            --heuristic-sabotage: #818cf8;
            --dead-lock-cascade: #4338ca;
            --bit-rot: #d97706;
            --logic-labyrinth: #2dd4bf;
            --hardware-trigger: #fca5a5;
            --bgp-mirage: #a855f7;
            --data-collision: #fb923c; /* 47. Hücre Rengi: Çarpışma Turuncusu */
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
            border-left: 4px solid var(--data-collision);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--data-collision); letter-spacing: 3px; font-weight: 800; }
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
        .cell.hardware-active { background: var(--hardware-trigger); box-shadow: 0 0 15px var(--hardware-trigger); animation: hw-vibrate 0.1s infinite; }
        .cell.bgp-active { background: var(--bgp-mirage); box-shadow: 0 0 15px var(--bgp-mirage); animation: mirage-shift 2s infinite ease-in-out; }
        .cell.collision-active { background: var(--data-collision); box-shadow: 0 0 15px var(--data-collision); animation: collision-vibrate 0.1s infinite; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes collision-vibrate { 0% { transform: scale(1); } 50% { transform: scale(1.2) rotate(5deg); } 100% { transform: scale(1); } }
        @keyframes mirage-shift { 0% { filter: hue-rotate(0deg); } 50% { filter: hue-rotate(90deg); transform: scale(1.2); } 100% { filter: hue-rotate(0deg); } }
        @keyframes hw-vibrate { 0% { transform: translate(0); } 25% { transform: translate(1px, 1px); } 50% { transform: translate(-1px, 0); } 75% { transform: translate(0, -1px); } 100% { transform: translate(0); } }
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
            height: 640px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(12, 45px) 1fr;
            gap: 2px;
            overflow-y: auto;
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
        .log-entry.hardware { border-left-color: var(--hardware-trigger); color: var(--hardware-trigger); font-weight: bold; }
        .log-entry.bgp { border-left-color: var(--bgp-mirage); color: var(--bgp-mirage); }
        .log-entry.collision { border-left-color: var(--data-collision); color: var(--data-collision); font-weight: bold; }

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
            width: 100%;
        }

        .btn:hover { background: #334155; }
        .btn.active-op-bgp { border-color: var(--bgp-mirage); background: #581c87; color: white; }
        .btn.active-op-collision { border-color: var(--data-collision); background: #7c2d12; color: white; }

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
            background: rgba(0,0,0,0.6);
            padding: 2px;
            z-index: 10;
        }
    </style>
</head>
<body>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // STRATEGIC_DATA_COLLISION</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">47. HÜCRE: STRATEJİK VERİ ÇARPIŞMASI VE HASH-INDEX SABOTAJI</div>
        </div>
        <div class="meta-info">
            <div id="clock">00:00:00</div>
            <div>ARCHITECT: ÖMER KAPLAN</div>
        </div>
    </header>

    <div class="cell-grid" id="cell-grid"></div>

    <div class="console-container">
        <div class="main-display">
            <div class="viz-view" id="viz-container">
                <div class="viz-box"><canvas id="ws-canvas"></canvas></div>
                <div class="viz-box"><canvas id="jitter-canvas"></canvas></div>
                <div class="viz-box"><canvas id="dns-canvas"></canvas></div>
                <div class="viz-box"><canvas id="neural-canvas"></canvas></div>
                <div class="viz-box"><canvas id="heap-canvas"></canvas></div>
                <div class="viz-box"><canvas id="bomb-canvas"></canvas></div>
                <div class="viz-box"><canvas id="shadow-canvas"></canvas></div>
                <div class="viz-box"><canvas id="deadlock-canvas"></canvas></div>
                <div class="viz-box"><canvas id="hijack-canvas"></canvas></div>
                <div class="viz-box"><canvas id="jit-canvas"></canvas></div>
                <div class="viz-box"><canvas id="stegano-canvas"></canvas></div>
                <div class="viz-box"><canvas id="mutation-canvas"></canvas></div>
                <div class="viz-box"><canvas id="heuristic-canvas"></canvas></div>
                <div class="viz-box"><canvas id="cascade-canvas"></canvas></div>
                <div class="viz-box"><canvas id="bitrot-canvas"></canvas></div>
                <div class="viz-box"><canvas id="labyrinth-canvas"></canvas></div>
                
                <div class="viz-box" style="grid-column: span 3; grid-row: span 3;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--bgp-mirage); z-index:5;">BGP_ROUTING_MIRAGE_MAP</div>
                    <canvas id="bgp-canvas"></canvas>
                </div>

                <div class="viz-box" style="grid-column: span 3; grid-row: span 3;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--data-collision); z-index:5;">HASH_COLLISION_ENGINE</div>
                    <canvas id="collision-canvas"></canvas>
                    <div id="collision-hud" class="hud-text" style="color: var(--data-collision);">BUCKETS: 0 | COMPLEXITY: O(1) | STATUS: READY</div>
                </div>
                
                <div class="viz-box" style="grid-column: span 6; height: 120px;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--hardware-trigger); z-index:5;">CACHE_SIDE_CHANNEL_ANALYSIS</div>
                    <canvas id="hardware-canvas"></canvas>
                </div>

                <div class="viz-box" style="grid-column: span 6; height: 100px;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--morph); z-index:5;">MUTATION_CORE</div>
                    <canvas id="morph-canvas"></canvas>
                    <div id="morph-hud" class="hud-text" style="color: var(--morph);">HASH: 0x0 | SIG: EVADING</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="BgpMirageEngine.toggle()">
                <span>46: BGP-ROUTE MIRAGE SIMULATION</span>
                <span>STATE</span>
            </button>
            <button class="btn" id="collision-toggle" onclick="CollisionEngine.toggle()">
                <span>47: STRATEGIC DATA COLLISION</span>
                <span id="collision-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 47: Hash çakışmaları yaratarak veri tabanı algoritmalarını O(n) karmaşıklığına zorlar ve sistemi kilitler.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>47. HÜCRE: STRATEGIC DATA COLLISION</b> - Veri Yapısı Sabotajı</p>
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
                this.log("Kernel aktif. Veri çakışma (Collision) modülü yüklendi.", "boot");
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
                for(let i=1; i<=47; i++) {
                    if([1, 24, 46, 47].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 15));
                    this.updateCell(i, "active");
                }
            }
        };

        const CollisionEngine = {
            active: false,
            loop: null,
            buckets: 0,
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('collision-toggle');
                const hud = document.getElementById('collision-hud');
                
                if(this.active) {
                    btn.classList.add('active-op-collision');
                    document.getElementById('collision-status').textContent = "ÇARPIŞIYOR";
                    Kernel.updateCell(47, "collision-active");
                    Kernel.log("STRATEJİK ÇARPIŞMA AKTİF: HASH TABLOLARI ZEHİRLENİYOR.", "collision");
                    this.startViz();
                } else {
                    btn.classList.remove('active-op-collision');
                    document.getElementById('collision-status').textContent = "KAPALI";
                    Kernel.updateCell(47, "active");
                    cancelAnimationFrame(this.loop);
                    this.buckets = 0;
                    hud.textContent = "BUCKETS: 0 | COMPLEXITY: O(1) | STATUS: READY";
                    Kernel.log("Çarpışma saldırısı durduruldu.", "sys");
                }
            },

            startViz() {
                const c = document.getElementById('collision-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                
                const draw = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    this.buckets += 1;
                    const complexity = this.buckets > 50 ? "O(n)" : "O(1)";
                    const fill = Math.min(100, (this.buckets / 200) * 100).toFixed(1);
                    
                    document.getElementById('collision-hud').textContent = 
                        `BUCKETS: ${this.buckets} | LOAD: ${fill}% | COMP: ${complexity}`;

                    // Hash Bucket vizüalizasyonu
                    const cols = 10;
                    const cellW = c.width / cols;
                    const cellH = c.height / 5;

                    for(let i=0; i<this.buckets; i++) {
                        const col = i % cols;
                        const row = Math.floor(i / cols);
                        
                        // Çarpışma etkisi (Üst üste binen kareler)
                        ctx.fillStyle = `rgba(251, 146, 60, ${0.2 + (row * 0.1)})`;
                        ctx.fillRect(col * cellW + 2, 5 + (row * 5), cellW - 4, 15);
                        
                        if(row > 3) {
                            ctx.strokeStyle = "var(--hazard)";
                            ctx.strokeRect(col * cellW + 1, 4 + (row * 5), cellW - 2, 17);
                        }
                    }

                    if(Math.random() > 0.97) {
                        const hash = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase();
                        Kernel.log(`Collision: Hash_{${hash}} için çakışan anahtar enjekte edildi.`, "collision");
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const BgpMirageEngine = { 
            active: false, 
            loop: null,
            toggle() { 
                this.active = !this.active; 
                Kernel.updateCell(46, this.active ? "bgp-active" : "active"); 
                if(this.active) this.start();
                else cancelAnimationFrame(this.loop);
            },
            start() {
                const c = document.getElementById('bgp-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(15, 23, 42, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--bgp-mirage)";
                    ctx.beginPath(); ctx.moveTo(0, Math.random()*c.height); ctx.lineTo(c.width, Math.random()*c.height); ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const HardwareTriggerEngine = { 
            active: false, 
            loop: null,
            start() {
                const c = document.getElementById('hardware-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(15, 23, 42, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.fillStyle = "var(--hardware-trigger)";
                    for(let i=0; i<5; i++) ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 10, 2);
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const MorphEngine = {
            active: false,
            start() {
                const c = document.getElementById('morph-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(15, 23, 42, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
                    const hash = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase();
                    document.getElementById('morph-hud').textContent = `HASH: ${hash} | SIG: EVADING`;
                    requestAnimationFrame(draw);
                }; draw();
            }
        };
        
        window.CollisionEngine = CollisionEngine;
        window.BgpMirageEngine = BgpMirageEngine;
        window.Kernel = Kernel;
        window.onload = () => {
            Kernel.init();
            const canvases = ['ws-canvas', 'jitter-canvas', 'dns-canvas', 'neural-canvas', 'heap-canvas', 'bomb-canvas', 'shadow-canvas', 'deadlock-canvas', 'hijack-canvas', 'jit-canvas', 'stegano-canvas', 'mutation-canvas', 'heuristic-canvas', 'cascade-canvas', 'bitrot-canvas', 'labyrinth-canvas', 'audio-canvas', 'morph-canvas', 'hardware-canvas'];
            canvases.forEach(id => {
                const c = document.getElementById(id);
                if(c) {
                    const ctx = c.getContext('2d');
                    c.width = c.offsetWidth; c.height = c.offsetHeight;
                    ctx.fillStyle = "rgba(15, 23, 42, 0.5)";
                    ctx.fillRect(0,0,c.width,c.height);
                }
            });
            HardwareTriggerEngine.start();
            MorphEngine.start();
        };
    </script>
</body>
</html>
