<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data:; connect-src 'none';">
    <title>NEFER-OS | 1.0.0-OMEGA | 43. HÜCRE (BIT-ROT)</title>
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
            --bit-rot: #d97706; /* 43. Hücre Rengi: Pas Turuncusu */
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
            border-left: 4px solid var(--bit-rot);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--bit-rot); letter-spacing: 3px; font-weight: 800; }
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
        .cell.cascade-active { background: var(--dead-lock-cascade); box-shadow: 0 0 15px var(--dead-lock-cascade); animation: cascade-blink 0.4s infinite step-end; }
        .cell.bitrot-active { background: var(--bit-rot); box-shadow: 0 0 15px var(--bit-rot); animation: rot-flicker 0.8s infinite; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes rot-flicker { 0% { opacity: 1; filter: sepia(0); } 50% { opacity: 0.3; filter: sepia(1) saturate(5); } 100% { opacity: 1; filter: sepia(0); } }
        @keyframes cascade-blink { 0% { opacity: 1; } 50% { opacity: 0.2; } }
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
            height: 600px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(7, 65px) 1fr;
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
        .log-entry.cascade { border-left-color: var(--dead-lock-cascade); color: var(--dead-lock-cascade); }
        .log-entry.bitrot { border-left-color: var(--bit-rot); color: var(--bit-rot); font-weight: bold; }

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
        .btn.active-op-cascade { border-color: var(--dead-lock-cascade); background: #312e81; color: white; }
        .btn.active-op-bitrot { border-color: var(--bit-rot); background: #78350f; color: white; }

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
            <h1>NEFER-OS // BIT_ROT_SIMULATION</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">43. HÜCRE: BELLEK-EŞLEMELİ BİT ÇÜRÜMESİ VE SESSİZ SABOTAJ</div>
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
                
                <div class="viz-box" style="grid-column: span 3;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--bit-rot); z-index:5;">MEMORY_CORRUPTION_MAP</div>
                    <canvas id="bitrot-canvas"></canvas>
                    <div id="bitrot-hud" class="hud-text" style="color: var(--bit-rot);">FLIPPED_BITS: 0 | CORRUPTION: 0.0% | STATE: STABLE</div>
                </div>
                
                <div class="viz-box" style="grid-column: span 2; height: 120px;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--audio-exfil); z-index:5;">AUDIO_EXFIL_FSK</div>
                    <canvas id="audio-canvas"></canvas>
                </div>

                <div class="viz-box" style="grid-column: span 4; height: 120px;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--morph); z-index:5;">MUTATION_CORE</div>
                    <canvas id="morph-canvas"></canvas>
                    <div id="morph-hud" class="hud-text" style="color: var(--morph);">HASH: 0x0 | SIG: EVADING</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="CascadeEngine.toggle()">
                <span>42: DISTRIBUTED DEAD-LOCK CASCADE</span>
                <span>DURUM</span>
            </button>
            <button class="btn" id="bitrot-toggle" onclick="BitRotEngine.toggle()">
                <span>43: MEMORY-MAPPED BIT-ROT</span>
                <span id="bitrot-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 43: Analiz motorunun bellek bloklarındaki bitleri sessizce bozarak yanlış sonuç üretir.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>43. HÜCRE: MEMORY-MAPPED BIT-ROT SIMULATION</b> - Dijital Pas Protokolü</p>
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
                for(let i=1; i<=43; i++) {
                    if([1, 24, 42, 43].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 20));
                    this.updateCell(i, "active");
                }
            }
        };

        const BitRotEngine = {
            active: false,
            loop: null,
            flipCount: 0,
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('bitrot-toggle');
                const hud = document.getElementById('bitrot-hud');
                
                if(this.active) {
                    btn.classList.add('active-op-bitrot');
                    document.getElementById('bitrot-status').textContent = "ÇÜRÜTÜYOR";
                    Kernel.updateCell(43, "bitrot-active");
                    Kernel.log("BİT ÇÜRÜMESİ AKTİF: BELLEK BLOKLARINA DİJİTAL PAS ENJEKTE EDİLİYOR.", "bitrot");
                    this.startViz();
                } else {
                    btn.classList.remove('active-op-bitrot');
                    document.getElementById('bitrot-status').textContent = "KAPALI";
                    Kernel.updateCell(43, "active");
                    cancelAnimationFrame(this.loop);
                    this.flipCount = 0;
                    hud.textContent = "FLIPPED_BITS: 0 | CORRUPTION: 0.0% | STATE: STABLE";
                    Kernel.log("Bit çürümesi simülasyonu durduruldu.", "sys");
                }
            },

            startViz() {
                const c = document.getElementById('bitrot-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                
                const draw = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    this.flipCount += Math.floor(Math.random() * 5);
                    const corruption = (this.flipCount / 10000).toFixed(4);
                    document.getElementById('bitrot-hud').textContent = `FLIPPED_BITS: ${this.flipCount} | CORRUPTION: ${corruption}% | STATE: ROT`;

                    // Bellek matrisi vizüalizasyonu
                    const rows = 10;
                    const cols = 20;
                    const cellW = c.width / cols;
                    const cellH = c.height / rows;

                    for(let r=0; r<rows; r++) {
                        for(let col=0; col<cols; col++) {
                            const isCorrupt = Math.random() < (corruption / 10);
                            ctx.fillStyle = isCorrupt ? "var(--bit-rot)" : "rgba(30, 41, 59, 0.3)";
                            ctx.fillRect(col * cellW + 1, r * cellH + 1, cellW - 2, cellH - 2);
                            
                            if(isCorrupt && Math.random() > 0.95) {
                                ctx.fillStyle = "#fff";
                                ctx.fillText(Math.random() > 0.5 ? "1" : "0", col * cellW + 5, r * cellH + 15);
                            }
                        }
                    }

                    if(Math.random() > 0.99) {
                        Kernel.log(`Bit-Rot: 0x${Math.floor(Math.random()*0xFFFF).toString(16).toUpperCase()} adresinde Atomics.xor (0->1) sapması oluşturuldu.`, "bitrot");
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const CascadeEngine = {
            active: false, loop: null,
            toggle() {
                this.active = !this.active;
                Kernel.updateCell(42, this.active ? "cascade-active" : "active");
                if(this.active) this.start();
            },
            start() {
                const c = document.getElementById('cascade-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--dead-lock-cascade)";
                    ctx.beginPath(); ctx.arc(c.width/2, c.height/2, 30, 0, Math.PI*2); ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const HeuristicEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('heuristic-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.fillStyle = "rgba(129, 140, 248, 0.2)";
                    for(let i=0; i<10; i++) ctx.fillRect(i*20, c.height - (Math.random()*20+5), 15, 20);
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const MutationKeyEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('mutation-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--mutation-key)";
                    ctx.beginPath();
                    for(let i=0; i<c.width; i+=5) ctx.lineTo(i, (c.height/2) + Math.sin(i/10 + Date.now()/100)*10);
                    ctx.stroke();
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const SteganoEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('stegano-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
                    for(let i=0; i<30; i++) {
                        ctx.fillStyle = `rgba(74, 222, 128, ${Math.random()*0.1})`;
                        ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 1, 1);
                    }
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const JITEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('jit-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.1)"; ctx.fillRect(0,0,c.width,c.height);
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const AudioExfilEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('audio-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.4)"; ctx.fillRect(0,0,c.width,c.height);
                    ctx.strokeStyle = "var(--audio-exfil)";
                    ctx.beginPath();
                    for(let x=0; x<c.width; x++) ctx.lineTo(x, (c.height/2) + Math.sin(x/5 + Date.now()/50)*15);
                    ctx.stroke();
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const HijackEngine = {
            active: false, start() {
                const c = document.getElementById('hijack-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.1)"; ctx.fillRect(0,0,c.width,c.height);
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const DeadLockEngine = {
            active: false, start() {
                const c = document.getElementById('deadlock-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.1)"; ctx.fillRect(0,0,c.width,c.height);
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const ShadowEngine = {
            active: false, start() {
                const c = document.getElementById('shadow-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.1)"; ctx.fillRect(0,0,c.width,c.height);
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const BombEngine = {
            active: false, start() {
                const c = document.getElementById('bomb-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.1)"; ctx.fillRect(0,0,c.width,c.height);
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const MorphEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('morph-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    const hash = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase();
                    document.getElementById('morph-hud').textContent = `HASH: ${hash} | SIG: EVADING`;
                    requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const JitterEngine = {
            active: false, start() {
                const c = document.getElementById('jitter-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.1)"; ctx.fillRect(0,0,c.width,c.height);
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const DNSEngine = {
            active: false, start() {
                const c = document.getElementById('dns-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.1)"; ctx.fillRect(0,0,c.width,c.height);
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const WSEngine = {
            active: false, start() {
                const c = document.getElementById('ws-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.1)"; ctx.fillRect(0,0,c.width,c.height);
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const NeuralEngine = {
            active: false, start() {
                const c = document.getElementById('neural-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.1)"; ctx.fillRect(0,0,c.width,c.height);
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        const HeapEngine = {
            active: false, start() {
                const c = document.getElementById('heap-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.1)"; ctx.fillRect(0,0,c.width,c.height);
                    requestAnimationFrame(draw);
                }; draw();
            }
        };

        window.BitRotEngine = BitRotEngine;
        window.CascadeEngine = CascadeEngine;
        window.HeuristicEngine = HeuristicEngine;
        window.MutationKeyEngine = MutationKeyEngine;
        window.SteganoEngine = SteganoEngine;
        window.Kernel = Kernel;
        window.onload = () => {
            Kernel.init();
            WSEngine.start();
            JitterEngine.start();
            DNSEngine.start();
            NeuralEngine.start();
            HeapEngine.start();
            BombEngine.start();
            ShadowEngine.start();
            DeadLockEngine.start();
            HijackEngine.start();
            MorphEngine.start();
            JITEngine.start();
            AudioExfilEngine.start();
            SteganoEngine.start();
            HeuristicEngine.start();
            MutationKeyEngine.start();
        };
    </script>
</body>
</html>
