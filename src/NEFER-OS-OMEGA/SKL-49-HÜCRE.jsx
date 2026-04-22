<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 49. HÜCRE (BUS SATURATION)</title>
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
            --bit-rot: #d97706;
            --logic-labyrinth: #2dd4bf;
            --hardware-trigger: #fca5a5;
            --bgp-mirage: #a855f7;
            --data-collision: #fb923c;
            --neural-poison: #d946ef;
            --bus-saturation: #fbbf24; /* 49. Hücre Rengi: Amber/Bus */
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
            border-left: 4px solid var(--bus-saturation);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--bus-saturation); letter-spacing: 3px; font-weight: 800; }
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
        .cell.bgp-active { background: var(--bgp-mirage); box-shadow: 0 0 15px var(--bgp-mirage); }
        .cell.collision-active { background: var(--data-collision); box-shadow: 0 0 15px var(--data-collision); }
        .cell.neural-poison-active { background: var(--neural-poison); box-shadow: 0 0 15px var(--neural-poison); }
        .cell.bus-active { background: var(--bus-saturation); box-shadow: 0 0 15px var(--bus-saturation); animation: bus-jitter 0.05s infinite; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes bus-jitter { 0% { transform: translate(0); } 50% { transform: translate(2px, -1px); } 100% { transform: translate(0); } }
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
            grid-template-rows: repeat(16, 38px) 1fr;
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
        .log-entry.neural { border-left-color: var(--neural-poison); color: var(--neural-poison); }
        .log-entry.bus { border-left-color: var(--bus-saturation); color: var(--bus-saturation); font-weight: bold; }

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
        .btn.active-op-neural { border-color: var(--neural-poison); background: #701a75; color: white; }
        .btn.active-op-bus { border-color: var(--bus-saturation); background: #92400e; color: white; }

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
            <h1>NEFER-OS // PERIPHERAL_BUS_SATURATION</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">49. HÜCRE: ÇEVRESEL VERİ YOLU DOYGUNLUĞU VE DONANIM FELCİ</div>
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
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--bus-saturation); z-index:5;">SYSTEM_BUS_INTERRUPT_STORM</div>
                    <canvas id="bus-canvas"></canvas>
                    <div id="bus-hud" class="hud-text" style="color: var(--bus-saturation);">INTERRUPTS: 0 | I/O_DELAY: 0ms | STATE: IDLE</div>
                </div>

                <div class="viz-box" style="grid-column: span 3; grid-row: span 3;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--neural-poison); z-index:5;">AI_WEIGHT_POISONING_CORE</div>
                    <canvas id="neural-poison-canvas"></canvas>
                    <div id="neural-hud" class="hud-text" style="color: var(--neural-poison);">MODEL: ENEMY_AI_V4 | BIAS: +0.00 | STATE: LEARNING</div>
                </div>
                
                <div class="viz-box" style="grid-column: span 6; height: 80px;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--data-collision); z-index:5;">HASH_COLLISION_ENGINE</div>
                    <canvas id="collision-canvas"></canvas>
                </div>

                <div class="viz-box" style="grid-column: span 6; height: 80px;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--bgp-mirage); z-index:5;">BGP_ROUTING_MIRAGE_MAP</div>
                    <canvas id="bgp-canvas"></canvas>
                </div>

                <div class="viz-box" style="grid-column: span 6; height: 80px;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--hardware-trigger); z-index:5;">CACHE_SIDE_CHANNEL_ANALYSIS</div>
                    <canvas id="hardware-canvas"></canvas>
                </div>

                <div class="viz-box" style="grid-column: span 6; height: 80px;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--audio-exfil); z-index:5;">AUDIO_EXFIL_FSK</div>
                    <canvas id="audio-canvas"></canvas>
                </div>

                <div class="viz-box" style="grid-column: span 6; height: 80px;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--morph); z-index:5;">MUTATION_CORE</div>
                    <canvas id="morph-canvas"></canvas>
                    <div id="morph-hud" class="hud-text" style="color: var(--morph);">HASH: 0x0 | SIG: EVADING</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="NeuralPoisonEngine.toggle()">
                <span>48: NEURAL NETWORK WEIGHT POISONING</span>
                <span>STATE</span>
            </button>
            <button class="btn" id="bus-toggle" onclick="BusSaturationEngine.toggle()">
                <span>49: PERIPHERAL BUS SATURATION</span>
                <span id="bus-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 49: Donanım girişlerini (Klavye/Fare) interrupt fırtınasıyla felç eder.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>49. HÜCRE: PERIPHERAL BUS SATURATION</b> - Donanımsal Felç Protokolü</p>
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
                setInterval(() => { 
                    const clock = document.getElementById('clock');
                    if(clock) clock.textContent = new Date().toLocaleTimeString(); 
                }, 1000);
                this.log("Kernel aktif. Donanım Felç (Bus Saturation) modülü mühürlendi.", "boot");
            },
            setupGrid() {
                const grid = document.getElementById('cell-grid');
                if(!grid) return;
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
                if(!l) return;
                const e = document.createElement('div');
                e.className = `log-entry ${type}`;
                e.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
                l.appendChild(e);
                l.scrollTop = l.scrollHeight;
            },
            async sequenceBoot() {
                for(let i=1; i<=49; i++) {
                    if([1, 24, 48, 49].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 10));
                    this.updateCell(i, "active");
                }
            }
        };

        const BusSaturationEngine = {
            active: false,
            loop: null,
            interrupts: 0,
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('bus-toggle');
                const hud = document.getElementById('bus-hud');
                const statusText = document.getElementById('bus-status');
                
                if(this.active) {
                    if(btn) btn.classList.add('active-op-bus');
                    if(statusText) statusText.textContent = "FELÇ";
                    Kernel.updateCell(49, "bus-active");
                    Kernel.log("DONANIM FELCİ AKTİF: VERİYOLU KESME FIRTINASI TETİKLENDİ.", "bus");
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-bus');
                    if(statusText) statusText.textContent = "KAPALI";
                    Kernel.updateCell(49, "active");
                    cancelAnimationFrame(this.loop);
                    this.interrupts = 0;
                    if(hud) hud.textContent = "INTERRUPTS: 0 | I/O_DELAY: 0ms | STATE: IDLE";
                    Kernel.log("Veriyolu doygunluk protokolü pasifize edildi.", "sys");
                }
            },

            start() {
                const c = document.getElementById('bus-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                
                const draw = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    this.interrupts += Math.floor(Math.random() * 500000);
                    const delay = Math.min(2500, (this.interrupts / 1000000) * 10);
                    const hud = document.getElementById('bus-hud');
                    if(hud) hud.textContent = `INTERRUPTS: ${(this.interrupts/1000000).toFixed(1)}M | I/O_DELAY: ${delay.toFixed(1)}ms | STATE: SATURATED`;

                    // Interrupt Storm vizüalizasyonu
                    ctx.strokeStyle = "var(--bus-saturation)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    for(let i=0; i<c.width; i+=2) {
                        const h = Math.random() > 0.9 ? Math.random() * c.height : Math.random() * 5;
                        ctx.moveTo(i, c.height/2 - h);
                        ctx.lineTo(i, c.height/2 + h);
                    }
                    ctx.stroke();

                    if(Math.random() > 0.98) {
                        Kernel.log(`Bus Saturation: Hayalet USB-HID aygıtına ${(Math.random()*1000).toFixed(0)} sahte kesme gönderildi.`, "bus");
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const NeuralPoisonEngine = {
            active: false, loop: null, bias: 0,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('neural-toggle');
                if(btn) this.active ? btn.classList.add('active-op-neural') : btn.classList.remove('active-op-neural');
                Kernel.updateCell(48, this.active ? "neural-poison-active" : "active");
                if(this.active) this.start(); else cancelAnimationFrame(this.loop);
            },
            start() {
                const c = document.getElementById('neural-poison-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--neural-poison)";
                    ctx.beginPath();
                    const boundaryOffset = Math.sin(Date.now() / 1000) * 10;
                    ctx.moveTo(0, c.height/2 + boundaryOffset);
                    ctx.lineTo(c.width, c.height/2 + boundaryOffset);
                    ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const CollisionEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('collision-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(15, 23, 42, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.fillStyle = "var(--data-collision)";
                    for(let i=0; i<3; i++) ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 10, 8);
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const HardwareTriggerEngine = { 
            active: false, loop: null,
            start() {
                const c = document.getElementById('hardware-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(15, 23, 42, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.fillStyle = "var(--hardware-trigger)";
                    for(let i=0; i<3; i++) ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 10, 1);
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const BgpMirageEngine = { 
            active: false, loop: null,
            start() {
                const c = document.getElementById('bgp-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(15, 23, 42, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--bgp-mirage)";
                    ctx.beginPath(); ctx.moveTo(0, Math.random()*c.height); ctx.lineTo(c.width, Math.random()*c.height); ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const MorphEngine = {
            active: true, loop: null,
            start() {
                const c = document.getElementById('morph-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(15, 23, 42, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
                    const hash = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase();
                    const hud = document.getElementById('morph-hud');
                    if(hud) hud.textContent = `HASH: ${hash} | SIG: EVADING`;
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const AudioExfilEngine = {
            active: true, loop: null,
            start() {
                const c = document.getElementById('audio-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(15, 23, 42, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--audio-exfil)";
                    ctx.beginPath();
                    for(let x=0; x<c.width; x++) ctx.lineTo(x, (c.height/2) + Math.sin(x/5 + Date.now()/50)*10);
                    ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };
        
        window.BusSaturationEngine = BusSaturationEngine;
        window.NeuralPoisonEngine = NeuralPoisonEngine;
        window.Kernel = Kernel;
        
        window.onload = () => {
            Kernel.init();
            const canvases = ['ws-canvas', 'jitter-canvas', 'dns-canvas', 'neural-canvas', 'heap-canvas', 'bomb-canvas', 'shadow-canvas', 'deadlock-canvas', 'hijack-canvas', 'jit-canvas', 'stegano-canvas', 'mutation-canvas', 'heuristic-canvas', 'cascade-canvas', 'bitrot-canvas', 'labyrinth-canvas', 'collision-canvas', 'neural-poison-canvas', 'bgp-canvas', 'hardware-canvas', 'audio-canvas', 'morph-canvas', 'bus-canvas'];
            
            canvases.forEach(id => {
                const c = document.getElementById(id);
                if(c) {
                    const ctx = c.getContext('2d');
                    if(ctx) {
                        c.width = c.offsetWidth; c.height = c.offsetHeight;
                        ctx.fillStyle = "rgba(15, 23, 42, 0.5)";
                        ctx.fillRect(0,0,c.width,c.height);
                    }
                }
            });
            
            HardwareTriggerEngine.start();
            BgpMirageEngine.start();
            MorphEngine.start();
            AudioExfilEngine.start();
            CollisionEngine.start();
        };
    </script>
</body>
</html>
