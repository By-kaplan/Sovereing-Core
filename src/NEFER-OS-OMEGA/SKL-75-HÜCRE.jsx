<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 75. HÜCRE (PHYSICAL VAULT)</title>
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
            --neural-erasure: #f8fafc;
            --final-reset: #450a0a;
            --tabula-rasa: #ffffff;
            --hardware-trust: #94a3b8;
            --mesh-grid: #2dd4bf;
            --physical-vault: #fb7185; /* 75. Hücre Rengi: Kasa Gül Kurusu */
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
            border-left: 4px solid var(--physical-vault);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--physical-vault); letter-spacing: 3px; font-weight: 800; }
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
        .cell.reset-active { background: var(--final-reset); box-shadow: 0 0 25px var(--final-reset); }
        .cell.rasa-active { background: var(--tabula-rasa); box-shadow: 0 0 30px var(--tabula-rasa); }
        .cell.trust-active { background: var(--hardware-trust); box-shadow: 0 0 15px var(--hardware-trust); }
        .cell.mesh-active { background: var(--mesh-grid); box-shadow: 0 0 15px var(--mesh-grid); }
        .cell.vault-active { background: var(--physical-vault); box-shadow: 0 0 15px var(--physical-vault); animation: vault-glow 2s infinite alternate; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes vault-glow { 0% { opacity: 0.7; transform: scale(1); } 100% { opacity: 1; transform: scale(1.1); filter: hue-rotate(10deg); } }
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
            grid-template-rows: repeat(120, 35px) 1fr;
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
        .log-entry.vault { border-left-color: var(--physical-vault); color: var(--physical-vault); font-weight: bold; background: rgba(251, 113, 133, 0.1); }

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
        .btn.active-op-vault { border-color: var(--physical-vault); background: #881337; color: white; border-width: 2px; }

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

        #rasa-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: white;
            z-index: 10000;
            display: none;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: black;
            font-family: monospace;
            text-align: center;
        }
    </style>
</head>
<body>

    <div id="rasa-overlay">
        <h1 style="font-size: 3.5rem; letter-spacing: 15px;">TABULA RASA</h1>
        <p style="font-size: 1.2rem; margin-top: 20px; font-weight: bold;">NEFER-NET: INITIALIZED // ALFA & OMEGA</p>
    </div>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // ENTROPY_BASED_PHYSICAL_VAULT</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">75. HÜCRE: ENTROPİ TABANLI FİZİKSEL KASA VE ÇEVRESEL KİLİT</div>
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
                <div class="viz-box"><canvas id="erasure-canvas"></canvas></div>
                <div class="viz-box"><canvas id="reset-canvas"></canvas></div>
                <div class="viz-box"><canvas id="rasa-canvas"></canvas></div>
                <div class="viz-box"><canvas id="trust-canvas"></canvas></div>
                <div class="viz-box"><canvas id="mesh-canvas"></canvas></div>

                <!-- 75. Hücre: Physical Vault Vizüalizasyonu -->
                <div class="viz-box" style="grid-column: span 6; grid-row: span 4;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--physical-vault); z-index:5;">ENVIRONMENTAL_ENTROPY_VAULT_SENSOR</div>
                    <canvas id="vault-canvas"></canvas>
                    <div id="vault-hud" class="hud-text" style="color: var(--physical-vault);">FINGERPRINT: ANALYZING | TEMP: 22.1°C | LIGHT: 312lx | STATE: LOCKED</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" id="mesh-toggle" onclick="MeshGridEngine.toggle()">
                <span>74: AIR-GAP MESH-GRID</span>
                <span>STATE</span>
            </button>
            <button class="btn" id="vault-toggle" onclick="PhysicalVaultEngine.toggle()">
                <span>75: ENTROPY-BASED PHYSICAL VAULT</span>
                <span id="vault-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 75: Veriyi sadece belirli fiziksel çevre koşulları altında açılan kasalarda saklar.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>75. HÜCRE: ENTROPY-BASED PHYSICAL VAULT</b> - Fiziksel Kasa Protokolü</p>
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
                this.log("Kernel aktif. Entropi Tabanlı Fiziksel Kasa (Vault) modülü hazır.", "boot");
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
                const colors = ['active', 'boot-active', 'vault-active'];
                for(let i=1; i<=75; i++) {
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 2));
                    const randomStatus = colors[Math.floor(Math.random() * colors.length)];
                    this.updateCell(i, randomStatus);
                }
                this.log("75 Hücre fiziksel kasa senkronizasyonuna hazır.", "sys");
            }
        };

        const PhysicalVaultEngine = {
            active: false,
            loop: null,
            temp: 22.0,
            light: 300,
            noise: 0,
            match: 0,

            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('vault-toggle');
                const statusText = document.getElementById('vault-status');
                const hud = document.getElementById('vault-hud');

                if(this.active) {
                    if(btn) btn.classList.add('active-op-vault');
                    if(statusText) statusText.textContent = "İZLİYOR";
                    Kernel.updateCell(75, "vault-active");
                    Kernel.log("FİZİKSEL KASA AKTİF: ÇEVRESEL ENTROPİ ANALİZ EDİLİYOR.", "vault");
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-vault');
                    if(statusText) statusText.textContent = "KAPALI";
                    Kernel.updateCell(75, "active");
                    cancelAnimationFrame(this.loop);
                    if(hud) hud.textContent = "FINGERPRINT: IDLE | TEMP: --°C | LIGHT: --lx | STATE: LOCKED";
                    Kernel.log("Fiziksel kasa protokolü askıya alındı.", "sys");
                }
            },

            start() {
                const c = document.getElementById('vault-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;

                const draw = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);

                    // Çevresel Veri Simülasyonu
                    this.temp += (Math.random() - 0.5) * 0.1;
                    this.light += (Math.random() - 0.5) * 5;
                    this.match = Math.abs(Math.sin(Date.now() / 5000) * 100);

                    const hud = document.getElementById('vault-hud');
                    const state = this.match > 95 ? "ACCESS_GRANTED" : "LOCKED";
                    if(hud) {
                        hud.textContent = `FINGERPRINT: ${this.match.toFixed(1)}% | TEMP: ${this.temp.toFixed(2)}°C | LIGHT: ${Math.floor(this.light)}lx | STATE: ${state}`;
                        hud.style.color = state === "ACCESS_GRANTED" ? "var(--safety)" : "var(--physical-vault)";
                    }

                    // Kasa Kilidi Görselleştirmesi
                    const centerX = c.width / 2;
                    const centerY = c.height / 2;
                    
                    ctx.strokeStyle = state === "ACCESS_GRANTED" ? "var(--safety)" : "var(--physical-vault)";
                    ctx.lineWidth = 4;
                    
                    // Döner Kilit Çarkı
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
                    ctx.stroke();
                    
                    ctx.save();
                    ctx.translate(centerX, centerY);
                    ctx.rotate(Date.now() / 1000);
                    ctx.beginPath();
                    ctx.moveTo(0, -60);
                    ctx.lineTo(0, -40);
                    ctx.stroke();
                    ctx.restore();

                    // "Dijital Parmak İzi" Gürültüsü
                    for(let i=0; i<50; i++) {
                        const alpha = Math.random() * 0.5;
                        ctx.fillStyle = `rgba(251, 113, 133, ${alpha})`;
                        ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 2, 2);
                    }

                    if(state === "ACCESS_GRANTED" && Math.random() > 0.99) {
                        Kernel.log("PhysicalVault: Çevresel parmak izi eşleşti. Kritik veri deşifre edildi.", "vault");
                    }

                    // Hareket Algılama Simülasyonu (Zorunlu İmha Bağlantısı)
                    if(Math.random() > 0.999) {
                        Kernel.log("DANGER: Beklenmedik ivme algılandı! 70. Hücre (Neural Erasure) tetikleniyor...", "sys");
                        if(window.NeuralErasureEngine) window.NeuralErasureEngine.toggle();
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const MeshGridEngine = {
            active: false, loop: null, nodes: [],
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('mesh-toggle');
                Kernel.updateCell(74, this.active ? "mesh-active" : "active");
                if(this.active) { if(btn) btn.classList.add('active-op-mesh'); this.start(); } else { if(btn) btn.classList.remove('active-op-mesh'); cancelAnimationFrame(this.loop); }
            },
            start() {
                const c = document.getElementById('mesh-canvas'); if(!c) return;
                const ctx = c.getContext('2d'); c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--mesh-grid)"; ctx.beginPath(); ctx.arc(c.width/2, c.height/2, 30, 0, Math.PI*2); ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const HardwareTrustEngine = {
            active: false, loop: null, integrity: 0,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('trust-toggle');
                Kernel.updateCell(73, this.active ? "trust-active" : "active");
                if(this.active) { if(btn) btn.classList.add('active-op-trust'); this.start(); } else { if(btn) btn.classList.remove('active-op-trust'); cancelAnimationFrame(this.loop); }
            },
            start() {
                const c = document.getElementById('trust-canvas'); if(!c) return;
                const ctx = c.getContext('2d'); c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--hardware-trust)"; ctx.strokeRect(c.width/2-20, c.height/2-20, 40, 40);
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const TabulaRasaEngine = {
            active: false, intensity: 0, loop: null,
            toggle() { if(this.active) return; this.active = true; document.getElementById('rasa-toggle').classList.add('active-op-rasa'); this.start(); },
            start() {
                const c = document.getElementById('rasa-canvas'); const ctx = c.getContext('2d'); c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    this.intensity += 0.005; ctx.fillStyle = `rgba(255, 255, 255, ${this.intensity})`; ctx.fillRect(0, 0, c.width, c.height);
                    if(this.intensity < 1) this.loop = requestAnimationFrame(draw); else document.getElementById('rasa-overlay').style.display = 'flex';
                }; draw();
            }
        };

        const GreatResetEngine = {
            active: false, countdown: 10, loop: null,
            toggle() { if(this.active) return; this.active = true; this.start(); },
            start() {
                const c = document.getElementById('reset-canvas'); const ctx = c.getContext('2d'); c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "black"; ctx.fillRect(0,0,c.width,c.height);
                    if(this.countdown > 0) { this.countdown -= 0.016; this.loop = requestAnimationFrame(draw); }
                }; draw();
            }
        };

        const NeuralErasureEngine = { active: false, loop: null, pass: 0, toggle() { this.active = !this.active; if(this.active) this.start(); }, start() { const c = document.getElementById('erasure-canvas'); const ctx = c.getContext('2d'); c.width = c.offsetWidth; c.height = c.offsetHeight; const draw = () => { if(!this.active) return; ctx.fillStyle = `rgba(255, 255, 255, ${this.pass/7})`; ctx.fillRect(0,0,c.width,c.height); requestAnimationFrame(draw); }; draw(); } };
        const CognitiveDisconnectEngine = { active: false, toggle() { this.active = !this.active; if(this.active) this.start(); }, start() { const c = document.getElementById('disconnect-canvas'); const ctx = c.getContext('2d'); c.width = c.offsetWidth; c.height = c.offsetHeight; const draw = () => { if(!this.active) return; requestAnimationFrame(draw); }; draw(); } };
        const SelfAuditEngine = { active: false, toggle() { this.active = !this.active; if(this.active) this.start(); }, start() { const c = document.getElementById('audit-canvas'); const ctx = c.getContext('2d'); c.width = c.offsetWidth; c.height = c.offsetHeight; const draw = () => { if(!this.active) return; requestAnimationFrame(draw); }; draw(); } };
        const EntropyDepletionEngine = { active: false, toggle() { this.active = !this.active; if(this.active) this.start(); }, start() { const c = document.getElementById('entropy-canvas'); const ctx = c.getContext('2d'); c.width = c.offsetWidth; c.height = c.offsetHeight; const draw = () => { if(!this.active) return; requestAnimationFrame(draw); }; draw(); } };

        const StaticMonitorEngine = {
            canvases: [],
            init(ids) { this.canvases = ids.map(id => ({ el: document.getElementById(id), id: id, seed: Math.random() * 1000 })).filter(c => c.el); this.animate(); },
            animate() {
                this.canvases.forEach(c => {
                    const ctx = c.el.getContext('2d'); if(!ctx) return;
                    if (c.id === 'trust-canvas' && HardwareTrustEngine.active) return;
                    if (c.id === 'mesh-canvas' && MeshGridEngine.active) return;
                    if (c.id === 'vault-canvas' && PhysicalVaultEngine.active) return;
                    ctx.fillStyle = "rgba(15, 23, 42, 0.1)"; ctx.fillRect(0, 0, c.el.width, c.el.height);
                    ctx.fillStyle = "rgba(56, 189, 248, 0.05)"; ctx.fillRect((Math.sin(Date.now()/2000 + c.seed)*0.5+0.5)*c.el.width, 0, 1, c.el.height);
                });
                requestAnimationFrame(() => this.animate());
            }
        };

        window.PhysicalVaultEngine = PhysicalVaultEngine;
        window.MeshGridEngine = MeshGridEngine;
        window.HardwareTrustEngine = HardwareTrustEngine;
        window.TabulaRasaEngine = TabulaRasaEngine;
        window.GreatResetEngine = GreatResetEngine;
        window.NeuralErasureEngine = NeuralErasureEngine;
        window.Kernel = Kernel;
        
        window.onload = () => {
            Kernel.init();
            const canvasIds = ['ws-canvas', 'jitter-canvas', 'dns-canvas', 'neural-canvas', 'heap-canvas', 'bomb-canvas', 'shadow-canvas', 'deadlock-canvas', 'hijack-canvas', 'jit-canvas', 'stegano-canvas', 'mutation-canvas', 'heuristic-canvas', 'cascade-canvas', 'bitrot-canvas', 'labyrinth-canvas', 'collision-canvas', 'neural-poison-canvas', 'bgp-canvas', 'hardware-canvas', 'audio-canvas', 'morph-canvas', 'bus-canvas', 'loop-canvas', 'skew-canvas', 'infection-canvas', 'obfuscation-canvas', 'sandbox-canvas', 'zeroday-canvas', 'anchor-canvas', 'thermal-canvas', 'bio-canvas', 'hallucination-canvas', 'debt-canvas', 'neural-hall-canvas', 'res-canvas', 'quantum-canvas', 'dilation-canvas', 'cog-hijack-canvas', 'override-canvas', 'entropy-canvas', 'audit-canvas', 'disconnect-canvas', 'erasure-canvas', 'reset-canvas', 'rasa-canvas', 'trust-canvas', 'mesh-canvas', 'vault-canvas'];
            canvasIds.forEach(id => { const c = document.getElementById(id); if(c) { c.width = c.offsetWidth; c.height = c.offsetHeight; } });
            StaticMonitorEngine.init(canvasIds);
        };
    </script>
</body>
</html>
