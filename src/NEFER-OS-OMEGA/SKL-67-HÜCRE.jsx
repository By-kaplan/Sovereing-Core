<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 67. HÜCRE (ENTROPY DEPLETION)</title>
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
            --entropy-depletion: #f472b6; /* 67. Hücre Rengi: Entropi Pembesi */
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
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
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
            border-left: 4px solid var(--entropy-depletion);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--entropy-depletion); letter-spacing: 3px; font-weight: 800; }
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
        .cell.entropy-active { background: var(--entropy-depletion); box-shadow: 0 0 15px var(--entropy-depletion); animation: drain-flicker 0.5s infinite linear; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes drain-flicker { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.9); filter: grayscale(1); } 100% { opacity: 1; transform: scale(1); } }
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
            grid-template-rows: repeat(88, 35px) 1fr;
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
        .log-entry.entropy { border-left-color: var(--entropy-depletion); color: var(--entropy-depletion); font-weight: bold; }

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
        .btn.active-op-entropy { border-color: var(--entropy-depletion); background: #831843; color: white; }

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
            <h1>NEFER-OS // ASYMMETRIC_ENTROPY_DEPLETION</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">67. HÜCRE: ASİMETRİK ENTROPİ TÜKETİMİ VE RNG SABOTAJI</div>
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
                <!-- Önceki Segmentler (Yüklenmiş varsayılır) -->
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

                <!-- 67. Hücre: Entropy Depletion Vizüalizasyonu -->
                <div class="viz-box" style="grid-column: span 6; grid-row: span 4;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--entropy-depletion); z-index:5;">ENTROPY_POOL_DRAIN_MONITOR</div>
                    <canvas id="entropy-canvas"></canvas>
                    <div id="entropy-hud" class="hud-text" style="color: var(--entropy-depletion);">POOL: 100% | RNG_QUALITY: CRYPTO_SECURE | STATE: MONITORING</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" id="override-toggle" onclick="HardwareOverrideEngine.toggle()">
                <span>66: HARDWARE OBEDIENCE OVERRIDE</span>
                <span>STATE</span>
            </button>
            <button class="btn" id="entropy-toggle" onclick="EntropyDepletionEngine.toggle()">
                <span>67: ASYMMETRIC ENTROPY DEPLETION</span>
                <span id="entropy-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 67: İşletim sistemi entropi havuzunu kurutarak şifrelemeyi zayıflatır.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>67. HÜCRE: ASYMMETRIC ENTROPY DEPLETION</b> - RNG Sabotaj Protokolü</p>
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
                this.log("Kernel aktif. Entropi Tüketimi (Entropy Depletion) modülü mühürlendi.", "boot");
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
                const colors = ['active', 'boot-active', 'entropy-active'];
                for(let i=1; i<=67; i++) {
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 4));
                    const randomStatus = colors[Math.floor(Math.random() * colors.length)];
                    this.updateCell(i, randomStatus);
                }
                this.log("67 Hücre asimetrik entropi senkronizasyonuna girdi.", "sys");
            }
        };

        const EntropyDepletionEngine = {
            active: false,
            loop: null,
            poolLevel: 100,
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('entropy-toggle');
                const hud = document.getElementById('entropy-hud');
                const statusText = document.getElementById('entropy-status');

                if(this.active) {
                    if(btn) btn.classList.add('active-op-entropy');
                    if(statusText) statusText.textContent = "TÜKETİYOR";
                    Kernel.updateCell(67, "entropy-active");
                    Kernel.log("ENTROPİ TÜKETİMİ AKTİF: RNG KAYNAKLARI KURUTULUYOR.", "entropy");
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-entropy');
                    if(statusText) statusText.textContent = "KAPALI";
                    Kernel.updateCell(67, "active");
                    cancelAnimationFrame(this.loop);
                    this.poolLevel = 100;
                    if(hud) hud.textContent = "POOL: 100% | RNG_QUALITY: CRYPTO_SECURE | STATE: MONITORING";
                    Kernel.log("Entropi sabotaj protokolü durduruldu.", "sys");
                }
            },

            start() {
                const c = document.getElementById('entropy-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;

                const draw = () => {
                    if(!this.active) return;

                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);

                    if(this.poolLevel > 0.01) this.poolLevel -= 0.15;
                    const quality = this.poolLevel > 15 ? "PREDICTABLE_PSEUDO" : "CONSTANT_ZERO";
                    const hud = document.getElementById('entropy-hud');
                    if(hud) hud.textContent = `POOL: ${this.poolLevel.toFixed(2)}% | RNG_QUALITY: ${quality} | STATE: DEPLETING`;

                    // Havuz Vizüalizasyonu
                    ctx.fillStyle = "rgba(244, 114, 182, 0.1)";
                    ctx.fillRect(0, c.height * (1 - this.poolLevel/100), c.width, c.height);

                    // Entropi Gürültüsü (Noise -> Order dönüşümü)
                    const noiseDensity = this.poolLevel / 2;
                    for(let i=0; i < noiseDensity; i++) {
                        ctx.fillStyle = "var(--entropy-depletion)";
                        ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 1, 1);
                    }

                    // Sabit değerler (0x000...)
                    if(this.poolLevel < 10) {
                        ctx.fillStyle = "var(--hazard)";
                        ctx.font = "8px monospace";
                        ctx.fillText("0x0000000000000000", Math.random()*c.width, Math.random()*c.height);
                    }

                    if(Math.random() > 0.99) {
                        Kernel.log(`Entropy: /dev/random havuzu boşaldı. Sistem PRNG fallback moduna geçti.`, "entropy");
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const HardwareOverrideEngine = {
            active: false, loop: null, interceptCount: 0,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('override-toggle');
                Kernel.updateCell(66, this.active ? "override-active" : "active");
                if(this.active) {
                    if(btn) btn.classList.add('active-op-override');
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-override');
                    cancelAnimationFrame(this.loop);
                }
            },
            start() {
                const c = document.getElementById('override-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--hardware-override)";
                    ctx.beginPath(); ctx.moveTo(0, c.height/2); ctx.lineTo(c.width, c.height/2); ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

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
                    
                    ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
                    ctx.fillRect(0, 0, c.el.width, c.el.height);
                    ctx.fillStyle = "rgba(56, 189, 248, 0.05)";
                    ctx.fillRect((Math.sin(Date.now()/2000 + c.seed)*0.5+0.5)*c.el.width, 0, 1, c.el.height);
                });
                requestAnimationFrame(() => this.animate());
            }
        };

        window.EntropyDepletionEngine = EntropyDepletionEngine;
        window.HardwareOverrideEngine = HardwareOverrideEngine;
        window.Kernel = Kernel;
        
        window.onload = () => {
            Kernel.init();
            const canvasIds = ['ws-canvas', 'jitter-canvas', 'dns-canvas', 'neural-canvas', 'heap-canvas', 'bomb-canvas', 'shadow-canvas', 'deadlock-canvas', 'hijack-canvas', 'jit-canvas', 'stegano-canvas', 'mutation-canvas', 'heuristic-canvas', 'cascade-canvas', 'bitrot-canvas', 'labyrinth-canvas', 'collision-canvas', 'neural-poison-canvas', 'bgp-canvas', 'hardware-canvas', 'audio-canvas', 'morph-canvas', 'bus-canvas', 'loop-canvas', 'skew-canvas', 'infection-canvas', 'obfuscation-canvas', 'sandbox-canvas', 'zeroday-canvas', 'anchor-canvas', 'thermal-canvas', 'bio-canvas', 'hallucination-canvas', 'debt-canvas', 'neural-hall-canvas', 'res-canvas', 'quantum-canvas', 'dilation-canvas', 'cog-hijack-canvas', 'override-canvas', 'entropy-canvas'];
            canvasIds.forEach(id => {
                const c = document.getElementById(id);
                if(c) { c.width = c.offsetWidth; c.height = c.offsetHeight; }
            });
            StaticMonitorEngine.init(canvasIds);
        };
    </script>
</body>
</html>
