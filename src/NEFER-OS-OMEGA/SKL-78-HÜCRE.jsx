<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 78. HÜCRE (TRUTH-CHAIN)</title>
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
            --truth-chain: #c084fc; /* 78. Hücre Rengi: Hakikat Moru */
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
            border-left: 4px solid var(--truth-chain);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--truth-chain); letter-spacing: 3px; font-weight: 800; }
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
        .cell.pulse-active { background: var(--counter-pulse); box-shadow: 0 0 15px var(--counter-pulse); animation: pulse-expand 1s infinite; }
        .cell.truth-active { background: var(--truth-chain); box-shadow: 0 0 15px var(--truth-chain); animation: chain-seal 2s infinite alternate; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes pulse-expand { 0% { box-shadow: 0 0 0px var(--counter-pulse); transform: scale(1); } 50% { box-shadow: 0 0 20px var(--counter-pulse); transform: scale(1.3); } 100% { box-shadow: 0 0 0px var(--counter-pulse); transform: scale(1); } }
        @keyframes chain-seal { 0% { transform: translateY(0); filter: brightness(1); } 100% { transform: translateY(-2px); filter: brightness(1.4); } }
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
            grid-template-rows: repeat(132, 35px) 1fr;
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
        .log-entry.pulse { border-left-color: var(--counter-pulse); color: var(--counter-pulse); font-weight: bold; }
        .log-entry.truth { border-left-color: var(--truth-chain); color: var(--truth-chain); font-weight: bold; background: rgba(192, 132, 252, 0.1); }

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
        .btn.active-op-pulse { border-color: var(--counter-pulse); background: #713f12; color: white; }
        .btn.active-op-truth { border-color: var(--truth-chain); background: #4c1d95; color: white; border-width: 2px; }

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
            <h1>NEFER-OS // DECENTRALIZED_TRUTH_CHAIN</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">78. HÜCRE: MERKEZİYETSİZ HAKİKAT-ZİNCİRİ VE KONSENSÜS</div>
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
                <div class="viz-box"><canvas id="vault-canvas"></canvas></div>
                <div class="viz-box"><canvas id="energy-canvas"></canvas></div>
                <div class="viz-box"><canvas id="pulse-canvas"></canvas></div>

                <!-- 78. Hücre: Truth Chain Vizüalizasyonu -->
                <div class="viz-box" style="grid-column: span 6; grid-row: span 4;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--truth-chain); z-index:5;">OFFLINE_ECDSA_TRUTH_LEDGER</div>
                    <canvas id="truth-canvas"></canvas>
                    <div id="truth-hud" class="hud-text" style="color: var(--truth-chain);">LEDGER: SYNCED | BLOCKS: 0 | CONSENSUS: 100% | STATE: MINTING</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" id="pulse-toggle" onclick="CounterPulseEngine.toggle()">
                <span>77: AUTONOMOUS COUNTER-PULSE DEFENSE</span>
                <span>STATE</span>
            </button>
            <button class="btn" id="truth-toggle" onclick="TruthChainEngine.toggle()">
                <span>78: DECENTRALIZED TRUTH-CHAIN</span>
                <span id="truth-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 78: Sığınaklar arası bilgi akışını kriptografik konsensüs ile mühürler.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>78. HÜCRE: TRUTH-CHAIN</b> - Hakikat Doğrulama Protokolü</p>
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
                this.log("Kernel aktif. Hakikat Zinciri (Truth-Chain) modülü mühürlendi.", "boot");
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
                const colors = ['active', 'boot-active', 'truth-active'];
                for(let i=1; i<=78; i++) {
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 2));
                    const randomStatus = colors[Math.floor(Math.random() * colors.length)];
                    this.updateCell(i, randomStatus);
                }
                this.log("78 Hücre hakikat mühürleme senkronizasyonuna girdi.", "sys");
            }
        };

        const TruthChainEngine = {
            active: false,
            loop: null,
            blocks: [],
            consensus: 100,

            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('truth-toggle');
                const statusText = document.getElementById('truth-status');
                const hud = document.getElementById('truth-hud');

                if(this.active) {
                    if(btn) btn.classList.add('active-op-truth');
                    if(statusText) statusText.textContent = "MÜHÜRLÜ";
                    Kernel.updateCell(78, "truth-active");
                    Kernel.log("HAKİKAT ZİNCİRİ AKTİF: ECDSA İMZALI BLOKLAR ÜRETİLİYOR.", "truth");
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-truth');
                    if(statusText) statusText.textContent = "KAPALI";
                    Kernel.updateCell(78, "active");
                    cancelAnimationFrame(this.loop);
                    if(hud) hud.textContent = "LEDGER: OFFLINE | BLOCKS: 0 | CONSENSUS: -- | STATE: STANDBY";
                    Kernel.log("Hakikat zinciri protokolü askıya alındı.", "sys");
                }
            },

            start() {
                const c = document.getElementById('truth-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;

                const draw = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);

                    const hud = document.getElementById('truth-hud');
                    
                    // Yeni Blok Üretimi
                    if(Math.random() > 0.99) {
                        const hash = Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('');
                        this.blocks.push({
                            id: this.blocks.length,
                            hash: `0x${hash}`,
                            time: Date.now(),
                            valid: Math.random() > 0.05 // %95 geçerli veri
                        });
                        if(this.blocks.length > 15) this.blocks.shift();
                        
                        const lastBlock = this.blocks[this.blocks.length-1];
                        if(!lastBlock.valid) {
                            Kernel.log(`TruthChain: ZEHRİ VERİ TESPİT EDİLDİ! Blok imhası başlatıldı.`, "hazard");
                            if(window.NeuralErasureEngine) window.NeuralErasureEngine.toggle();
                        } else {
                            Kernel.log(`TruthChain: Yeni blok mühürlendi (${lastBlock.hash}). Konsensüs sağlandı.`, "truth");
                        }
                    }

                    if(hud) hud.textContent = `LEDGER: SYNCED | BLOCKS: ${this.blocks.length} | CONSENSUS: ${this.consensus}% | STATE: VALIDATING`;

                    // Blok Görselleştirmesi
                    ctx.lineWidth = 2;
                    this.blocks.forEach((block, index) => {
                        const x = 50 + (index * 40);
                        const y = c.height / 2;
                        
                        // Bağlantı Hattı
                        if(index > 0) {
                            ctx.strokeStyle = "rgba(192, 132, 252, 0.3)";
                            ctx.beginPath();
                            ctx.moveTo(x - 40, y);
                            ctx.lineTo(x, y);
                            ctx.stroke();
                        }

                        // Blok Kutusu
                        ctx.strokeStyle = block.valid ? "var(--truth-chain)" : "var(--hazard)";
                        ctx.fillStyle = block.valid ? "rgba(192, 132, 252, 0.1)" : "rgba(239, 68, 68, 0.2)";
                        ctx.strokeRect(x - 15, y - 15, 30, 30);
                        ctx.fillRect(x - 15, y - 15, 30, 30);

                        // Hash Bilgisi
                        ctx.fillStyle = "white";
                        ctx.font = "6px monospace";
                        ctx.fillText(block.hash, x - 15, y + 25);
                        
                        // "Sealing" Efekti
                        if(index === this.blocks.length - 1) {
                            const pulse = (Math.sin(Date.now()/200)*0.5+0.5);
                            ctx.strokeStyle = `rgba(192, 132, 252, ${pulse})`;
                            ctx.strokeRect(x - 20, y - 20, 40, 40);
                        }
                    });

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const CounterPulseEngine = {
            active: false, loop: null, targets: [], pulses: [],
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('pulse-toggle');
                Kernel.updateCell(77, this.active ? "pulse-active" : "active");
                if(this.active) { if(btn) btn.classList.add('active-op-pulse'); this.start(); } else { if(btn) btn.classList.remove('active-op-pulse'); cancelAnimationFrame(this.loop); }
            },
            start() {
                const c = document.getElementById('pulse-canvas'); if(!c) return;
                const ctx = c.getContext('2d'); c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)"; ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeStyle = "var(--counter-pulse)"; ctx.beginPath(); ctx.arc(c.width/2, c.height/2, 50, 0, Math.PI*2); ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                }; draw();
            }
        };

        const EnergyScavengingEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(76, this.active ? "energy-active" : "active"); } };
        const PhysicalVaultEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(75, this.active ? "vault-active" : "active"); } };
        const MeshGridEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(74, this.active ? "mesh-active" : "active"); } };
        const HardwareTrustEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(73, this.active ? "trust-active" : "active"); } };
        const TabulaRasaEngine = { active: false, toggle() { document.getElementById('rasa-overlay').style.display = 'flex'; } };
        const GreatResetEngine = { active: false, toggle() { Kernel.log("RESET SEQUENCE", "reset"); } };
        const NeuralErasureEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(70, this.active ? "erasure-active" : "active"); } };

        const StaticMonitorEngine = {
            canvases: [],
            init(ids) { this.canvases = ids.map(id => ({ el: document.getElementById(id), id: id, seed: Math.random() * 1000 })).filter(c => c.el); this.animate(); },
            animate() {
                this.canvases.forEach(c => {
                    const ctx = c.el.getContext('2d'); if(!ctx) return;
                    if (c.id === 'pulse-canvas' && CounterPulseEngine.active) return;
                    if (c.id === 'truth-canvas' && TruthChainEngine.active) return;
                    ctx.fillStyle = "rgba(15, 23, 42, 0.1)"; ctx.fillRect(0, 0, c.el.width, c.el.height);
                    ctx.fillStyle = "rgba(56, 189, 248, 0.05)"; ctx.fillRect((Math.sin(Date.now()/2000 + c.seed)*0.5+0.5)*c.el.width, 0, 1, c.el.height);
                });
                requestAnimationFrame(() => this.animate());
            }
        };

        window.TruthChainEngine = TruthChainEngine;
        window.CounterPulseEngine = CounterPulseEngine;
        window.EnergyScavengingEngine = EnergyScavengingEngine;
        window.PhysicalVaultEngine = PhysicalVaultEngine;
        window.MeshGridEngine = MeshGridEngine;
        window.HardwareTrustEngine = HardwareTrustEngine;
        window.Kernel = Kernel;
        window.NeuralErasureEngine = NeuralErasureEngine;
        
        window.onload = () => {
            Kernel.init();
            const canvasIds = ['ws-canvas', 'jitter-canvas', 'dns-canvas', 'neural-canvas', 'heap-canvas', 'bomb-canvas', 'shadow-canvas', 'deadlock-canvas', 'hijack-canvas', 'jit-canvas', 'stegano-canvas', 'mutation-canvas', 'heuristic-canvas', 'cascade-canvas', 'bitrot-canvas', 'labyrinth-canvas', 'collision-canvas', 'neural-poison-canvas', 'bgp-canvas', 'hardware-canvas', 'audio-canvas', 'morph-canvas', 'bus-canvas', 'loop-canvas', 'skew-canvas', 'infection-canvas', 'obfuscation-canvas', 'sandbox-canvas', 'zeroday-canvas', 'anchor-canvas', 'thermal-canvas', 'bio-canvas', 'hallucination-canvas', 'debt-canvas', 'neural-hall-canvas', 'res-canvas', 'quantum-canvas', 'dilation-canvas', 'cog-hijack-canvas', 'override-canvas', 'entropy-canvas', 'audit-canvas', 'disconnect-canvas', 'erasure-canvas', 'reset-canvas', 'rasa-canvas', 'trust-canvas', 'mesh-canvas', 'vault-canvas', 'energy-canvas', 'pulse-canvas', 'truth-canvas'];
            canvasIds.forEach(id => { const c = document.getElementById(id); if(c) { c.width = c.offsetWidth; c.height = c.offsetHeight; } });
            StaticMonitorEngine.init(canvasIds);
        };
    </script>
</body>
</html>
