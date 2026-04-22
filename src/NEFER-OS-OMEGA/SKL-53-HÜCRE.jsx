<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 53. HÜCRE (LOGIC OBFUSCATION)</title>
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
            --bus-saturation: #fbbf24;
            --feedback-loop: #e11d48;
            --clock-skew: #06b6d4;
            --infection-vector: #4ade80;
            --logic-obfuscation: #8b5cf6; /* 53. Hücre Rengi: Karartma Moru */
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
            border-left: 4px solid var(--logic-obfuscation);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--logic-obfuscation); letter-spacing: 3px; font-weight: 800; }
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
        .cell.feedback-active { background: var(--feedback-loop); box-shadow: 0 0 15px var(--feedback-loop); animation: loop-flicker 0.2s infinite; }
        .cell.clock-skew-active { background: var(--clock-skew); box-shadow: 0 0 15px var(--clock-skew); }
        .cell.infection-active { background: var(--infection-vector); box-shadow: 0 0 15px var(--infection-vector); animation: infection-spread 1.5s infinite; }
        .cell.obfuscation-active { background: var(--logic-obfuscation); box-shadow: 0 0 15px var(--logic-obfuscation); animation: logic-glitch 0.3s infinite; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes logic-glitch { 0% { opacity: 1; transform: skew(0); } 33% { opacity: 0.8; transform: skew(10deg); } 66% { opacity: 0.9; transform: skew(-10deg); } 100% { opacity: 1; transform: skew(0); } }
        @keyframes infection-spread { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
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
            grid-template-rows: repeat(30, 35px) 1fr;
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
        .log-entry.obfuscation { border-left-color: var(--logic-obfuscation); color: var(--logic-obfuscation); font-weight: bold; }

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
        .btn.active-op-obfuscation { border-color: var(--logic-obfuscation); background: #4c1d95; color: white; }

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
            <h1>NEFER-OS // ENCRYPTED_LOGIC_OBFUSCATION</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">53. HÜCRE: ŞİFRELİ MANTIK KARARTMA VE RUNTIME DEŞİFRE</div>
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
                <div class="viz-box"><canvas id="collision-canvas"></canvas></div>
                <div class="viz-box"><canvas id="neural-poison-canvas"></canvas></div>
                <div class="viz-box"><canvas id="bgp-canvas"></canvas></div>
                <div class="viz-box"><canvas id="hardware-canvas"></canvas></div>
                <div class="viz-box"><canvas id="audio-canvas"></canvas></div>
                <div class="viz-box"><canvas id="morph-canvas"></canvas></div>
                <div class="viz-box"><canvas id="bus-canvas"></canvas></div>
                <div class="viz-box"><canvas id="loop-canvas"></canvas></div>
                <div class="viz-box"><canvas id="skew-canvas"></canvas></div>
                <div class="viz-box"><canvas id="infection-canvas"></canvas></div>

                <!-- 53. Hücre: Logic Obfuscation Vizüalizasyonu -->
                <div class="viz-box" style="grid-column: span 6; grid-row: span 4;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--logic-obfuscation); z-index:5;">ENCRYPTED_RUNTIME_DECODER</div>
                    <canvas id="obfuscation-canvas"></canvas>
                    <div id="obfuscation-hud" class="hud-text" style="color: var(--logic-obfuscation);">BYTECODE: ENCRYPTED | AES-GCM: ACTIVE | STATE: LOCKED</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" id="infection-toggle" onclick="InfectionEngine.toggle()">
                <span>52: CROSS-PLATFORM INFECTION VECTOR</span>
                <span>STATE</span>
            </button>
            <button class="btn" id="obfuscation-toggle" onclick="ObfuscationEngine.toggle()">
                <span>53: ENCRYPTED LOGIC OBFUSCATION</span>
                <span id="obfuscation-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 53: Kod mantığını şifreli byte-code bloklarına dönüştürür, statik analizi imkansız kılar.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>53. HÜCRE: ENCRYPTED LOGIC OBFUSCATION</b> - Anti-Analiz Katmanı</p>
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
                this.log("Kernel aktif. Mantık Karartma (Logic Obfuscation) modülü hazır.", "boot");
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
                for(let i=1; i<=53; i++) {
                    if([1, 24, 52, 53].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 10));
                    this.updateCell(i, "active");
                }
            }
        };

        const ObfuscationEngine = {
            active: false,
            loop: null,
            entropy: 0,
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('obfuscation-toggle');
                const hud = document.getElementById('obfuscation-hud');
                const statusText = document.getElementById('obfuscation-status');
                
                if(this.active) {
                    if(btn) btn.classList.add('active-op-obfuscation');
                    if(statusText) statusText.textContent = "ŞİFRELENDİ";
                    Kernel.updateCell(53, "obfuscation-active");
                    Kernel.log("MANTIK KARARTMA AKTİF: KOD BLOĞU AES-GCM İLE MÜHÜRLENDİ.", "obfuscation");
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-obfuscation');
                    if(statusText) statusText.textContent = "KAPALI";
                    Kernel.updateCell(53, "active");
                    cancelAnimationFrame(this.loop);
                    if(hud) hud.textContent = "BYTECODE: ENCRYPTED | AES-GCM: ACTIVE | STATE: LOCKED";
                    Kernel.log("Şifreli mantık katmanı çözüldü (Analize açık).", "sys");
                }
            },

            start() {
                const c = document.getElementById('obfuscation-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                
                const draw = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    this.entropy = Math.random().toString(36).substring(2, 15);
                    const hud = document.getElementById('obfuscation-hud');
                    if(hud) hud.textContent = `BYTECODE: ${this.entropy.toUpperCase()} | IV: ${Math.random().toString(16).slice(2, 10)} | STATE: RUNTIME_DECRYPT`;

                    // Karartma Vizüalizasyonu (Matrix-like encrypted stream)
                    ctx.fillStyle = "var(--logic-obfuscation)";
                    ctx.font = "8px monospace";
                    for(let i=0; i<30; i++) {
                        const txt = Math.random().toString(36).substring(2, 10);
                        ctx.fillText(txt, Math.random()*c.width, Math.random()*c.height);
                    }

                    // "Dead-End" fonksiyon dallanmaları
                    ctx.strokeStyle = "rgba(139, 92, 246, 0.2)";
                    ctx.beginPath();
                    for(let i=0; i<5; i++) {
                        ctx.moveTo(Math.random()*c.width, Math.random()*c.height);
                        ctx.lineTo(Math.random()*c.width, Math.random()*c.height);
                    }
                    ctx.stroke();

                    if(Math.random() > 0.985) {
                        Kernel.log(`Obfuscation: 0x${Math.random().toString(16).slice(2,6)} bloğu dinamik olarak bellek üzerinde yürütüldü.`, "obfuscation");
                        Kernel.log(`Dead-End: Sahte mantık yolu 'trap_01' analizciden gizlendi.`, "obfuscation");
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const InfectionEngine = {
            active: false, loop: null, infectedFiles: 0, devices: 0,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('infection-toggle');
                const hud = document.getElementById('infection-hud');
                const statusText = document.getElementById('infection-status');
                if(this.active) {
                    if(btn) btn.classList.add('active-op-infection');
                    if(statusText) statusText.textContent = "YAYILIYOR";
                    Kernel.updateCell(52, "infection-active");
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-infection');
                    if(statusText) statusText.textContent = "KAPALI";
                    Kernel.updateCell(52, "active");
                    cancelAnimationFrame(this.loop);
                }
            },
            start() {
                const c = document.getElementById('infection-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.fillStyle = "var(--infection-vector)";
                    for(let i=0; i<10; i++) ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 2, 2);
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const ClockSkewEngine = {
            active: false, loop: null, offset: 0,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('skew-toggle');
                Kernel.updateCell(51, this.active ? "clock-skew-active" : "active");
                if(this.active) this.start(); else cancelAnimationFrame(this.loop);
            },
            start() {
                const c = document.getElementById('skew-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--clock-skew)";
                    ctx.beginPath(); ctx.arc(c.width/2, c.height/2, 50, 0, Math.PI*2); ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const FeedbackLoopEngine = {
            active: false, loop: null,
            toggle() {
                this.active = !this.active;
                Kernel.updateCell(50, this.active ? "feedback-active" : "active");
                if(this.active) this.start(); else cancelAnimationFrame(this.loop);
            },
            start() {
                const c = document.getElementById('loop-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--feedback-loop)";
                    ctx.beginPath(); ctx.arc(c.width/2, c.height/2, 40, 0, Math.PI*2); ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const initStaticCanvas = (id) => {
            const c = document.getElementById(id);
            if(!c) return;
            const ctx = c.getContext('2d');
            if(!ctx) return;
            c.width = c.offsetWidth; c.height = c.offsetHeight;
            ctx.fillStyle = "rgba(15, 23, 42, 0.4)";
            ctx.fillRect(0,0,c.width,c.height);
        };

        window.ObfuscationEngine = ObfuscationEngine;
        window.InfectionEngine = InfectionEngine;
        window.ClockSkewEngine = ClockSkewEngine;
        window.FeedbackLoopEngine = FeedbackLoopEngine;
        window.Kernel = Kernel;
        
        window.onload = () => {
            Kernel.init();
            const canvases = ['ws-canvas', 'jitter-canvas', 'dns-canvas', 'neural-canvas', 'heap-canvas', 'bomb-canvas', 'shadow-canvas', 'deadlock-canvas', 'hijack-canvas', 'jit-canvas', 'stegano-canvas', 'mutation-canvas', 'heuristic-canvas', 'cascade-canvas', 'bitrot-canvas', 'labyrinth-canvas', 'collision-canvas', 'neural-poison-canvas', 'bgp-canvas', 'hardware-canvas', 'audio-canvas', 'morph-canvas', 'bus-canvas', 'loop-canvas', 'skew-canvas', 'infection-canvas', 'obfuscation-canvas'];
            canvases.forEach(id => initStaticCanvas(id));
        };
    </script>
</body>
</html>
