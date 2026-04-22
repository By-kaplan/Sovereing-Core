<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 70. HÜCRE (NEURAL ERASURE)</title>
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
            --logic-obfuscation: #8b5cf6;
            --anti-sandbox: #6366f1;
            --zero-day: #84cc16;
            --registry-anchor: #94a3b8;
            --thermal-sabotage: #f97316;
            --biometric-spoof: #22d3ee;
            --log-hallucination: #ec4899;
            --debt-overload: #f43f5e;
            --neural-hallucination: #a855f7;
            --hardware-resonance: #f87171;
            --quantum-echo: #6366f1;
            --time-dilation: #fbbf24;
            --cognitive-hijack: #c084fc;
            --hardware-override: #10b981;
            --entropy-depletion: #f472b6;
            --self-audit: #84cc16;
            --cognitive-disconnect: #5eead4;
            --neural-erasure: #f8fafc; /* 70. Hücre Rengi: Mutlak Beyaz (Silinme) */
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
            position: relative;
        }

        body::before {
            content: " ";
            display: block;
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 255, 0, 0.02));
            z-index: 100;
            background-size: 100% 3px, 3px 100%;
            pointer-events: none;
        }

        .nefer-header {
            border: 1px solid var(--border);
            background: rgba(15, 23, 42, 0.9);
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-left: 4px solid var(--neural-erasure);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--neural-erasure); letter-spacing: 3px; font-weight: 800; }
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
        .cell.erasure-active { background: var(--neural-erasure); box-shadow: 0 0 20px var(--neural-erasure); animation: erasure-flash 0.2s infinite; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes erasure-flash { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.2; transform: scale(1.5); } }
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
            grid-template-rows: repeat(100, 35px) 1fr;
            gap: 2px;
            overflow-y: auto;
        }

        canvas { width: 100%; height: 100%; image-rendering: pixelated; }
        .viz-box { position: relative; overflow: hidden; background: #020617; border: 1px solid var(--border); transition: border-color 0.5s; }
        .viz-box:hover { border-color: var(--text-neon); }

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
        .log-entry.erasure { border-left-color: var(--neural-erasure); color: var(--neural-erasure); font-weight: bold; }

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
            transition: all 0.2s;
        }

        .btn:hover { background: #334155; transform: translateX(2px); }
        .btn.active-op-erasure { border-color: var(--neural-erasure); background: #f8fafc; color: #000; }

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
            bottom: 5px; left: 5px;
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
            <h1>NEFER-OS // RECURSIVE_NEURAL_ERASURE</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">70. HÜCRE: ÖZYİNELEMELİ NÖRAL SİLME VE ATOMİK İMHA</div>
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
                <!-- Önceki Segmentler -->
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
                <div class="viz-box"><canvas id="obfuscation-canvas"></canvas></div>
                <div class="viz-box"><canvas id="sandbox-canvas"></canvas></div>
                <div class="viz-box"><canvas id="zeroday-canvas"></canvas></div>
                <div class="viz-box"><canvas id="anchor-canvas"></canvas></div>
                <div class="viz-box"><canvas id="thermal-canvas"></canvas></div>
                <div class="viz-box"><canvas id="bio-canvas"></canvas></div>
                <div class="viz-box"><canvas id="hallucination-canvas"></canvas></div>
                <div class="viz-box"><canvas id="debt-canvas"></canvas></div>
                <div class="viz-box"><canvas id="neural-hall-canvas"></canvas></div>
                <div class="viz-box"><canvas id="res-canvas"></canvas></div>
                <div class="viz-box"><canvas id="quantum-canvas"></canvas></div>
                <div class="viz-box"><canvas id="dilation-canvas"></canvas></div>
                <div class="viz-box"><canvas id="cog-hijack-canvas"></canvas></div>
                <div class="viz-box"><canvas id="override-canvas"></canvas></div>
                <div class="viz-box"><canvas id="entropy-canvas"></canvas></div>
                <div class="viz-box"><canvas id="audit-canvas"></canvas></div>
                <div class="viz-box"><canvas id="disconnect-canvas"></canvas></div>

                <!-- 70. Hücre: Neural Erasure Vizüalizasyonu -->
                <div class="viz-box" style="grid-column: span 6; grid-row: span 4;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--neural-erasure); z-index:5;">NEURAL_ERASURE_VOID_ENGINE</div>
                    <canvas id="erasure-canvas"></canvas>
                    <div id="erasure-hud" class="hud-text" style="color: var(--neural-erasure);">OVERWRITE_PASS: 0/7 | STORAGE: WIPING | RAM: PURGING | TRACES: NONE</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" id="disconnect-toggle" onclick="CognitiveDisconnectEngine.toggle()">
                <span>69: COGNITIVE DISCONNECT LOOP</span>
                <span>STATE</span>
            </button>
            <button class="btn" id="erasure-toggle" onclick="NeuralErasureEngine.toggle()">
                <span>70: RECURSIVE NEURAL ERASURE</span>
                <span id="erasure-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 70: Görev bittiğinde sığınağı atomik düzeyde silerek geride kanıt bırakmaz.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>70. HÜCRE: RECURSIVE NEURAL ERASURE</b> - Atomik Öz-İmha Protokolü</p>
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
                this.log("Kernel aktif. Nöral Silme (Neural Erasure) modülü mühürlendi.", "boot");
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
                const colors = ['active', 'boot-active', 'erasure-active'];
                for(let i=1; i<=70; i++) {
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 4));
                    const randomStatus = colors[Math.floor(Math.random() * colors.length)];
                    this.updateCell(i, randomStatus);
                }
                this.log("70 Hücre atomik silinme senkronizasyonuna girdi.", "sys");
            }
        };

        const NeuralErasureEngine = {
            active: false,
            loop: null,
            pass: 0,
            frame: 0,

            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('erasure-toggle');
                const hud = document.getElementById('erasure-hud');
                const statusText = document.getElementById('erasure-status');

                if(this.active) {
                    if(btn) btn.classList.add('active-op-erasure');
                    if(statusText) statusText.textContent = "SİLİYOR";
                    Kernel.updateCell(70, "erasure-active");
                    Kernel.log("NÖRAL SİLME AKTİF: ATOMİK İMHA VE BELLEK TEMİZLİĞİ BAŞLADI.", "erasure");
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-erasure');
                    if(statusText) statusText.textContent = "KAPALI";
                    Kernel.updateCell(70, "active");
                    cancelAnimationFrame(this.loop);
                    this.pass = 0;
                    if(hud) hud.textContent = "OVERWRITE_PASS: 0/7 | STORAGE: IDLE | RAM: SAFE | TRACES: MONITORING";
                    Kernel.log("Atomik imha protokolü sonlandırıldı.", "sys");
                }
            },

            start() {
                const c = document.getElementById('erasure-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;

                const draw = () => {
                    if(!this.active) return;

                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);

                    this.frame++;
                    if(this.frame % 60 === 0 && this.pass < 7) this.pass++;
                    
                    const hud = document.getElementById('erasure-hud');
                    if(hud) hud.textContent = `OVERWRITE_PASS: ${this.pass}/7 | STORAGE: ZEROING | RAM: PURGING_OBJECTS | TRACES: ERASING`;

                    // Beyazlaşma / Silinme Vizüalizasyonu
                    ctx.fillStyle = `rgba(248, 250, 252, ${this.pass / 7})`;
                    ctx.fillRect(0, 0, c.width, c.height);

                    // Statik Gürültü (Crypto Noise)
                    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
                    for(let i=0; i<100; i++) {
                        ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 2, 2);
                    }

                    if(this.pass === 7) {
                        ctx.fillStyle = "#000";
                        ctx.font = "bold 20px monospace";
                        ctx.textAlign = "center";
                        ctx.fillText("ZERO_REMAINS", c.width/2, c.height/2);
                        if(Math.random() > 0.99) Kernel.log(`Erasure: Tüm LocalStorage ve RAM kayıtları 7. kez üzerine yazılarak yok edildi.`, "erasure");
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const CognitiveDisconnectEngine = {
            active: false, loop: null, frame: 0,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('disconnect-toggle');
                Kernel.updateCell(69, this.active ? "disconnect-active" : "active");
                if(this.active) {
                    if(btn) btn.classList.add('active-op-disconnect');
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-disconnect');
                    cancelAnimationFrame(this.loop);
                }
            },
            start() {
                const c = document.getElementById('disconnect-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--cognitive-disconnect)";
                    ctx.beginPath(); ctx.moveTo(0, c.height/2);
                    for(let x=0; x<c.width; x++) ctx.lineTo(x, c.height/2 + Math.sin((x+this.frame)/20)*20);
                    ctx.stroke(); this.frame++;
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const SelfAuditEngine = {
            active: false, loop: null, files: 0, depth: 0,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('audit-toggle');
                Kernel.updateCell(68, this.active ? "audit-active" : "active");
                if(this.active) {
                    if(btn) btn.classList.add('active-op-audit');
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-audit');
                    cancelAnimationFrame(this.loop);
                }
            },
            start() {
                const c = document.getElementById('audit-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--self-audit)";
                    ctx.beginPath(); ctx.arc(c.width/2, c.height/2, (this.depth % 50) + 20, 0, Math.PI*2); ctx.stroke();
                    this.depth++;
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const EntropyDepletionEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(67, this.active ? "entropy-active" : "active"); } };
        const HardwareOverrideEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(66, this.active ? "override-active" : "active"); } };
        const CognitiveHijackEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(65, this.active ? "hijack-active" : "active"); } };
        const TimeDilationEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(64, this.active ? "dilation-active" : "active"); } };
        const QuantumEchoEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(63, this.active ? "quantum-active" : "active"); } };
        const HardwareResonanceEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(62, this.active ? "res-active" : "active"); } };
        const NeuralHallucinationEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(61, this.active ? "neural-hall-active" : "active"); } };
        const DebtOverloadEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(60, this.active ? "debt-active" : "active"); } };
        const LogHallucinationEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(59, this.active ? "log-hall-active" : "active"); } };
        const BiometricSpoofEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(58, this.active ? "bio-active" : "active"); } };
        const ThermalSabotageEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(57, this.active ? "thermal-active" : "active"); } };
        const RegistryAnchorEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(56, this.active ? "anchor-active" : "active"); } };

        const StaticMonitorEngine = {
            canvases: [],
            init(ids) {
                this.canvases = ids.map(id => ({ el: document.getElementById(id), id: id, seed: Math.random() * 1000 })).filter(c => c.el);
                this.animate();
            },
            animate() {
                this.canvases.forEach(c => {
                    const ctx = c.el.getContext('2d');
                    if(!ctx) return;
                    if (c.id === 'res-canvas' && HardwareResonanceEngine.active) return;
                    if (c.id === 'quantum-canvas' && QuantumEchoEngine.active) return;
                    if (c.id === 'dilation-canvas' && TimeDilationEngine.active) return;
                    if (c.id === 'cog-hijack-canvas' && CognitiveHijackEngine.active) return;
                    if (c.id === 'override-canvas' && HardwareOverrideEngine.active) return;
                    if (c.id === 'entropy-canvas' && EntropyDepletionEngine.active) return;
                    if (c.id === 'audit-canvas' && SelfAuditEngine.active) return;
                    if (c.id === 'disconnect-canvas' && CognitiveDisconnectEngine.active) return;
                    if (c.id === 'erasure-canvas' && NeuralErasureEngine.active) return;
                    
                    ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
                    ctx.fillRect(0, 0, c.el.width, c.el.height);
                    ctx.fillStyle = "rgba(56, 189, 248, 0.05)";
                    ctx.fillRect((Math.sin(Date.now()/2000 + c.seed)*0.5+0.5)*c.el.width, 0, 1, c.el.height);
                });
                requestAnimationFrame(() => this.animate());
            }
        };

        window.NeuralErasureEngine = NeuralErasureEngine;
        window.CognitiveDisconnectEngine = CognitiveDisconnectEngine;
        window.SelfAuditEngine = SelfAuditEngine;
        window.EntropyDepletionEngine = EntropyDepletionEngine;
        window.Kernel = Kernel;
        
        window.onload = () => {
            Kernel.init();
            const canvasIds = ['ws-canvas', 'jitter-canvas', 'dns-canvas', 'neural-canvas', 'heap-canvas', 'bomb-canvas', 'shadow-canvas', 'deadlock-canvas', 'hijack-canvas', 'jit-canvas', 'stegano-canvas', 'mutation-canvas', 'heuristic-canvas', 'cascade-canvas', 'bitrot-canvas', 'labyrinth-canvas', 'collision-canvas', 'neural-poison-canvas', 'bgp-canvas', 'hardware-canvas', 'audio-canvas', 'morph-canvas', 'bus-canvas', 'loop-canvas', 'skew-canvas', 'infection-canvas', 'obfuscation-canvas', 'sandbox-canvas', 'zeroday-canvas', 'anchor-canvas', 'thermal-canvas', 'bio-canvas', 'hallucination-canvas', 'debt-canvas', 'neural-hall-canvas', 'res-canvas', 'quantum-canvas', 'dilation-canvas', 'cog-hijack-canvas', 'override-canvas', 'entropy-canvas', 'audit-canvas', 'disconnect-canvas', 'erasure-canvas'];
            canvasIds.forEach(id => {
                const c = document.getElementById(id);
                if(c) { c.width = c.offsetWidth; c.height = c.offsetHeight; }
            });
            StaticMonitorEngine.init(canvasIds);
        };
    </script>
</body>
</html>
