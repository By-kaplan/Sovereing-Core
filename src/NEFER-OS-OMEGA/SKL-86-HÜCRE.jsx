<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 86. HÜCRE (LOGIC GATE OVERRIDE)</title>
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
            --physical-vault: #fb7185;
            --energy-scavenging: #bef264;
            --counter-pulse: #facc15;
            --truth-chain: #c084fc;
            --circuitry-alchemist: #f59e0b;
            --invisible-logistics: #6366f1;
            --sovereign-os: #f8fafc;
            --ai-fog: #a78bfa;
            --global-sync: #0ea5e9;
            --neural-lattice: #ec4899;
            --infrastructure-parasitism: #4ade80;
            --logic-gate-override: #fef08a; /* 86. Hücre Rengi: Gasp Altını */
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
            border-left: 4px solid var(--logic-gate-override);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--logic-gate-override); letter-spacing: 3px; font-weight: 800; }
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
        .cell.vault-active { background: var(--physical-vault); box-shadow: 0 0 15px var(--physical-vault); }
        .cell.energy-active { background: var(--energy-scavenging); box-shadow: 0 0 15px var(--energy-scavenging); }
        .cell.pulse-active { background: var(--counter-pulse); box-shadow: 0 0 15px var(--counter-pulse); }
        .cell.truth-active { background: var(--truth-chain); box-shadow: 0 0 15px var(--truth-chain); }
        .cell.logi-active { background: var(--invisible-logistics); box-shadow: 0 0 15px var(--invisible-logistics); }
        .cell.sovereign-active { background: var(--sovereign-os); box-shadow: 0 0 15px var(--sovereign-os); }
        .cell.fog-active { background: var(--ai-fog); box-shadow: 0 0 15px var(--ai-fog); }
        .cell.sync-active { background: var(--global-sync); box-shadow: 0 0 15px var(--global-sync); }
        .cell.lattice-active { background: var(--neural-lattice); box-shadow: 0 0 15px var(--neural-lattice); }
        .cell.parasite-active { background: var(--infrastructure-parasitism); box-shadow: 0 0 15px var(--infrastructure-parasitism); }
        .cell.override-active { background: var(--logic-gate-override); box-shadow: 0 0 15px var(--logic-gate-override); animation: override-glitch 0.2s infinite alternate; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes override-glitch { 0% { transform: skewX(0deg); filter: brightness(1); } 100% { transform: skewX(5deg); filter: brightness(1.5); } }
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
            grid-template-rows: repeat(164, 35px) 1fr;
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
        .log-entry.parasite { border-left-color: var(--infrastructure-parasitism); color: var(--infrastructure-parasitism); }
        .log-entry.override { border-left-color: var(--logic-gate-override); color: var(--logic-gate-override); font-weight: bold; background: rgba(254, 240, 138, 0.1); }

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
        .btn.active-op-override { border-color: var(--logic-gate-override); background: #713f12; color: white; border-width: 2px; }

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
            <h1>NEFER-OS // LOGIC_GATE_OVERRIDING</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">86. HÜCRE: MANTIK KAPISI GASPI VE KERNEL SIZMA</div>
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
                <!-- Temsili segmentler -->
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
                <div class="viz-box"><canvas id="override-canvas-temp"></canvas></div>
                <div class="viz-box"><canvas id="entropy-canvas"></canvas></div>
                <div class="viz-box"><canvas id="audit-canvas"></canvas></div>
                <div class="viz-box"><canvas id="disconnect-canvas"></canvas></div>
                <div class="viz-box"><canvas id="erasure-canvas"></canvas></div>
                <div class="viz-box"><canvas id="reset-canvas"></canvas></div>
                <div class="viz-box"><canvas id="rasa-canvas"></canvas></div>
                <div class="viz-box"><canvas id="trust-canvas"></canvas></div>
                <div class="viz-box"><canvas id="mesh-canvas"></canvas></div>
                <div class="viz-box"><canvas id="vault-canvas"></canvas></div>
                <div class="viz-box"><canvas id="energy-canvas"></canvas></div>
                <div class="viz-box"><canvas id="pulse-canvas"></canvas></div>
                <div class="viz-box"><canvas id="truth-chain-canvas"></canvas></div>
                <div class="viz-box"><canvas id="alchemist-canvas"></canvas></div>
                <div class="viz-box"><canvas id="logistics-canvas"></canvas></div>
                <div class="viz-box"><canvas id="sovereign-canvas"></canvas></div>
                <div class="viz-box"><canvas id="fog-canvas"></canvas></div>
                <div class="viz-box"><canvas id="sync-canvas"></canvas></div>
                <div class="viz-box"><canvas id="lattice-canvas"></canvas></div>
                <div class="viz-box"><canvas id="parasite-canvas"></canvas></div>

                <!-- 86. Hücre: Logic Gate Override Vizüalizasyonu -->
                <div class="viz-box" style="grid-column: span 6; grid-row: span 4;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--logic-gate-override); z-index:5;">FPGA_LOGIC_GATE_OVERRIDER</div>
                    <canvas id="override-canvas"></canvas>
                    <div id="override-hud" class="hud-text" style="color: var(--logic-gate-override);">GATE: MANIPULATING | PRIORITY: 0 | QUEUE: INJECTING | STATE: GASPING</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" id="parasite-toggle" onclick="InfrastructureParasitismEngine.toggle()">
                <span>85: INFRASTRUCTURE PARASITISM</span>
                <span>STATE</span>
            </button>
            <button class="btn" id="override-toggle" onclick="LogicGateOverrideEngine.toggle()">
                <span>86: LOGIC GATE OVERRIDING</span>
                <span id="override-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 86: Düşman donanımındaki mantık kapılarını gasp ederek kernel seviyesinde sızma sağlar.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>86. HÜCRE: LOGIC GATE OVERRIDING</b> - Donanımsal Gasp Protokolü</p>
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
                this.log("Kernel aktif. Mantık Kapısı Gaspı (Logic Override) modülü mühürlendi.", "boot");
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
                const colors = ['active', 'boot-active', 'override-active'];
                for(let i=1; i<=86; i++) {
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 2));
                    const randomStatus = colors[Math.floor(Math.random() * colors.length)];
                    this.updateCell(i, randomStatus);
                }
                this.log("86 Hücre donanımsal gasp ve mantık manipülasyonu için senkronize.", "sys");
            }
        };

        const LogicGateOverrideEngine = {
            active: false,
            loop: null,
            gates: [],
            signals: [],

            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('override-toggle');
                const statusText = document.getElementById('override-status');
                const hud = document.getElementById('override-hud');

                if(this.active) {
                    if(btn) btn.classList.add('active-op-override');
                    if(statusText) statusText.textContent = "GASP_EDİLDİ";
                    Kernel.updateCell(86, "override-active");
                    Kernel.log("MANTIK KAPISI GASPI AKTİF: DÜŞMAN FPGA BİRİMLERİNE SIZILDI.", "override");
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-override');
                    if(statusText) statusText.textContent = "KAPALI";
                    Kernel.updateCell(86, "active");
                    cancelAnimationFrame(this.loop);
                    if(hud) hud.textContent = "GATE: IDLE | PRIORITY: -- | STATE: STANDBY";
                    Kernel.log("Mantık gaspı protokolü askıya alındı.", "sys");
                }
            },

            start() {
                const c = document.getElementById('override-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;

                this.gates = Array.from({length: 12}, () => ({
                    x: Math.random() * c.width,
                    y: Math.random() * c.height,
                    type: ['AND', 'OR', 'NOT', 'XOR'][Math.floor(Math.random()*4)],
                    state: 0
                }));

                const draw = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);

                    const hud = document.getElementById('override-hud');
                    if(hud) hud.textContent = `GATE: OVERRIDDEN | PRIORITY: 0 | QUEUE: INJECTING_BIT_${Math.random() > 0.5 ? '1' : '0'} | STATE: GASPING`;

                    // Mantık Kapıları ve Bağlantılar
                    ctx.lineWidth = 1;
                    this.gates.forEach((gate, idx) => {
                        gate.state = Math.random() > 0.1 ? 1 : 0; // Gasp sonucu sürekli 1'e zorlama simülasyonu
                        
                        // Kapı Kutusu
                        ctx.strokeStyle = gate.state ? "var(--logic-gate-override)" : "var(--hazard)";
                        ctx.strokeRect(gate.x - 15, gate.y - 10, 30, 20);
                        
                        // Tip Metni
                        ctx.fillStyle = gate.state ? "white" : "var(--text-dim)";
                        ctx.font = "8px monospace";
                        ctx.fillText(gate.type, gate.x - 10, gate.y + 4);
                        
                        // Sinyal Çizgileri
                        if(idx < this.gates.length - 1) {
                            const next = this.gates[idx + 1];
                            ctx.beginPath();
                            ctx.moveTo(gate.x + 15, gate.y);
                            ctx.lineTo(next.x - 15, next.y);
                            ctx.strokeStyle = gate.state ? "rgba(254, 240, 138, 0.3)" : "rgba(239, 68, 68, 0.1)";
                            ctx.stroke();
                        }
                        
                        // Durum Göstergesi
                        ctx.fillStyle = gate.state ? "var(--logic-gate-override)" : "var(--hazard)";
                        ctx.fillRect(gate.x + 10, gate.y - 15, 4, 4);
                    });

                    // Komut Kuyruğu Sızıntısı (Instruction Queue)
                    if(Math.random() > 0.9) {
                        this.signals.push({ x: 0, y: Math.random() * c.height, val: Math.random() > 0.5 ? 1 : 0 });
                    }

                    this.signals.forEach((s, i) => {
                        s.x += 4;
                        ctx.fillStyle = "var(--logic-gate-override)";
                        ctx.font = "6px monospace";
                        ctx.fillText(s.val, s.x, s.y);
                        if(s.x > c.width) this.signals.splice(i, 1);
                    });

                    if(Math.random() > 0.99) {
                        Kernel.log(`Override: Düşman "Erişim Reddedildi" sinyali donanımsal düzeyde "EVET"e dönüştürüldü.`, "override");
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const InfrastructureParasitismEngine = {
            active: false, loop: null, fieldStrength: 42.5, waves: [],
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('parasite-toggle');
                Kernel.updateCell(85, this.active ? "parasite-active" : "active");
                if(this.active) { if(btn) btn.classList.add('active-op-parasite'); this.start(); } else { if(btn) btn.classList.remove('active-op-parasite'); cancelAnimationFrame(this.loop); }
            },
            start() {
                const c = document.getElementById('parasite-canvas'); if(!c) return;
                const ctx = c.getContext('2d'); c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "rgba(74, 222, 128, 0.5)"; ctx.strokeRect(c.width/2-20, c.height/2-20, 40, 40);
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const NeuralLatticeEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(84, this.active ? "lattice-active" : "active"); } };
        const GlobalMeshSyncEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(83, this.active ? "sync-active" : "active"); } };
        const AICounterIntelligenceFogEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(82, this.active ? "fog-active" : "active"); } };
        const SovereignOSEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(81, this.active ? "sovereign-active" : "active"); } };
        const InvisibleLogisticsEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(80, this.active ? "logi-active" : "active"); } };
        const CircuitryAlchemistEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(79, this.active ? "alchemist-active" : "active"); } };
        const TruthChainEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(78, this.active ? "truth-active" : "active"); } };
        const CounterPulseEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(77, this.active ? "pulse-active" : "active"); } };
        const EnergyScavengingEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(76, this.active ? "energy-active" : "active"); } };
        const PhysicalVaultEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(75, this.active ? "vault-active" : "active"); } };
        const MeshGridEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(74, this.active ? "mesh-active" : "active"); } };
        const HardwareTrustEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(73, this.active ? "trust-active" : "active"); } };
        const TabulaRasaEngine = { active: false, toggle() { document.getElementById('rasa-overlay').style.display = 'flex'; } };
        const NeuralErasureEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(70, this.active ? "erasure-active" : "active"); } };

        const StaticMonitorEngine = {
            canvases: [],
            init(ids) { this.canvases = ids.map(id => ({ el: document.getElementById(id), id: id, seed: Math.random() * 1000 })).filter(c => c.el); this.animate(); },
            animate() {
                this.canvases.forEach(c_monitor => {
                    const ctx = c_monitor.el.getContext('2d'); if(!ctx) return;
                    if (c_monitor.id === 'override-canvas' && LogicGateOverrideEngine.active) return;
                    if (c_monitor.id === 'parasite-canvas' && InfrastructureParasitismEngine.active) return;
                    ctx.fillStyle = "rgba(15, 23, 42, 0.1)"; ctx.fillRect(0, 0, c_monitor.el.width, c_monitor.el.height);
                    ctx.fillStyle = "rgba(56, 189, 248, 0.05)"; ctx.fillRect((Math.sin(Date.now()/2000 + c_monitor.seed)*0.5+0.5)*c_monitor.el.width, 0, 1, c_monitor.el.height);
                });
                requestAnimationFrame(() => this.animate());
            }
        };

        window.LogicGateOverrideEngine = LogicGateOverrideEngine;
        window.InfrastructureParasitismEngine = InfrastructureParasitismEngine;
        window.NeuralLatticeEngine = NeuralLatticeEngine;
        window.GlobalMeshSyncEngine = GlobalMeshSyncEngine;
        window.AICounterIntelligenceFogEngine = AICounterIntelligenceFogEngine;
        window.SovereignOSEngine = SovereignOSEngine;
        window.InvisibleLogisticsEngine = InvisibleLogisticsEngine;
        window.CircuitryAlchemistEngine = CircuitryAlchemistEngine;
        window.TruthChainEngine = TruthChainEngine;
        window.CounterPulseEngine = CounterPulseEngine;
        window.EnergyScavengingEngine = EnergyScavengingEngine;
        window.PhysicalVaultEngine = PhysicalVaultEngine;
        window.MeshGridEngine = MeshGridEngine;
        window.HardwareTrustEngine = HardwareTrustEngine;
        window.TabulaRasaEngine = TabulaRasaEngine;
        window.Kernel = Kernel;
        window.NeuralErasureEngine = NeuralErasureEngine;
        
        window.onload = () => {
            Kernel.init();
            const canvasIds = ['ws-canvas', 'jitter-canvas', 'dns-canvas', 'neural-canvas', 'heap-canvas', 'bomb-canvas', 'shadow-canvas', 'deadlock-canvas', 'hijack-canvas', 'jit-canvas', 'stegano-canvas', 'mutation-canvas', 'heuristic-canvas', 'cascade-canvas', 'bitrot-canvas', 'labyrinth-canvas', 'collision-canvas', 'neural-poison-canvas', 'bgp-canvas', 'hardware-canvas', 'audio-canvas', 'morph-canvas', 'bus-canvas', 'loop-canvas', 'skew-canvas', 'infection-canvas', 'obfuscation-canvas', 'sandbox-canvas', 'zeroday-canvas', 'anchor-canvas', 'thermal-canvas', 'bio-canvas', 'hallucination-canvas', 'debt-canvas', 'neural-hall-canvas', 'res-canvas', 'quantum-canvas', 'dilation-canvas', 'cog-hijack-canvas', 'override-canvas-temp', 'entropy-canvas', 'audit-canvas', 'disconnect-canvas', 'erasure-canvas', 'reset-canvas', 'rasa-canvas', 'trust-canvas', 'mesh-canvas', 'vault-canvas', 'energy-canvas', 'pulse-canvas', 'truth-chain-canvas', 'alchemist-canvas', 'logistics-canvas', 'sovereign-canvas', 'fog-canvas', 'sync-canvas', 'lattice-canvas', 'parasite-canvas', 'override-canvas'];
            canvasIds.forEach(id => { const c = document.getElementById(id); if(c) { c.width = c.offsetWidth; c.height = c.offsetHeight; } });
            StaticMonitorEngine.init(canvasIds);
        };
    </script>
</body>
</html>
