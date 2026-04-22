<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data:; connect-src 'none';">
    <title>NEFER-OS | 1.0.0-OMEGA | 37. HÜCRE (AUDIO EXFIL)</title>
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
            --audio-exfil: #a3e635; /* 37. Hücre Rengi: Akustik Yeşil */
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
            border-left: 4px solid var(--audio-exfil);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--audio-exfil); letter-spacing: 3px; font-weight: 800; }
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
        .cell.audio-active { background: var(--audio-exfil); box-shadow: 0 0 15px var(--audio-exfil); animation: acoustic-ripple 1s infinite; }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes acoustic-ripple { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
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
            height: 480px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 100px 100px 100px 1fr;
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
        .log-entry.hijack { border-left-color: var(--hijack); color: var(--hijack); }
        .log-entry.audio { border-left-color: var(--audio-exfil); color: var(--audio-exfil); font-weight: bold; }

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
        .btn.active-op-audio { border-color: var(--audio-exfil); background: #3f6212; color: white; }

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
            <h1>NEFER-OS // AUDIO_EXFILTRATION</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">37. HÜCRE: GİZLİ SES-FREKANSI VERİ KAÇIRMA (ULTRASONİK TÜNEL)</div>
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
                
                <div class="viz-box" style="grid-column: span 2;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--hijack); z-index:5;">TRAFFIC_HIJACKER</div>
                    <canvas id="hijack-canvas"></canvas>
                </div>
                
                <div class="viz-box" style="grid-column: span 2;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--audio-exfil); z-index:5;">ULTRASONIC_TUNNEL_FSK</div>
                    <canvas id="audio-canvas"></canvas>
                    <div id="audio-hud" class="hud-text" style="color: var(--audio-exfil);">FREQ: 18.5kHz | BITRATE: 32bps | STATE: STANDBY</div>
                </div>

                <div class="viz-box" style="grid-column: span 4;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--morph); z-index:5;">MUTATION_CORE</div>
                    <canvas id="morph-canvas"></canvas>
                    <div id="morph-hud" class="hud-text" style="color: var(--morph);">CURRENT_HASH: 0x0 | SIG: EVADING</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="HijackEngine.toggle()">
                <span>36: PROTOCOL HIJACKING (SW)</span>
                <span>STATE</span>
            </button>
            <button class="btn" id="audio-toggle" onclick="AudioExfilEngine.toggle()">
                <span>37: AUDIO-FREQ EXFILTRATION</span>
                <span id="audio-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 37: İnterneti kesilmiş cihazlardan ultrasonik ses dalgalarıyla veri tahliye eder.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>37. HÜCRE: STEALTHY AUDIO-FREQUENCY EXFILTRATION</b> - Akustik Sızıntı Protokolü</p>
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
                for(let i=1; i<=37; i++) {
                    if([1, 24, 36, 37].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 20));
                    this.updateCell(i, "active");
                }
            }
        };

        const AudioExfilEngine = {
            active: false,
            loop: null,
            audioCtx: null,
            osc: null,
            bitIndex: 0,
            binaryData: "1011001010101101", // Simüle edilmiş şifreleme anahtarı
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('audio-toggle');
                const hud = document.getElementById('audio-hud');
                
                if(this.active) {
                    btn.classList.add('active-op-audio');
                    document.getElementById('audio-status').textContent = "YAYINDA";
                    Kernel.updateCell(37, "audio-active");
                    Kernel.log("AKUSTİK TÜNEL AKTİF: ULTRASONİK VERİ İLETİMİ BAŞLATILDI.", "audio");
                    this.startViz();
                    this.startAudio();
                } else {
                    btn.classList.remove('active-op-audio');
                    document.getElementById('audio-status').textContent = "KAPALI";
                    Kernel.updateCell(37, "active");
                    this.stopAudio();
                    cancelAnimationFrame(this.loop);
                    hud.textContent = "FREQ: 18.5kHz | BITRATE: 32bps | STATE: STANDBY";
                    Kernel.log("Ses frekans kaçırma protokolü durduruldu.", "sys");
                }
            },

            startAudio() {
                try {
                    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                } catch(e) {
                    Kernel.log("Hata: AudioContext başlatılamadı.", "hazard");
                }
            },

            stopAudio() {
                if(this.osc) {
                    this.osc.stop();
                    this.osc.disconnect();
                    this.osc = null;
                }
                if(this.audioCtx) {
                    this.audioCtx.close();
                    this.audioCtx = null;
                }
            },

            startViz() {
                const c = document.getElementById('audio-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    const bit = this.binaryData[this.bitIndex];
                    const freq = bit === '1' ? 19500 : 18500;
                    
                    document.getElementById('audio-hud').textContent = `BIT: ${bit} | FREQ: ${freq}Hz | STATE: BROADCASTING`;

                    // Spektrum dalgası görselleştirmesi
                    ctx.strokeStyle = "var(--audio-exfil)";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    for(let x=0; x<c.width; x++) {
                        const y = (c.height/2) + Math.sin(x / 5 + Date.now() / 50) * (bit === '1' ? 30 : 15);
                        if(x===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                    }
                    ctx.stroke();

                    // Veri paketleri (pikseller)
                    for(let i=0; i<10; i++) {
                        ctx.fillStyle = "rgba(163, 230, 53, 0.5)";
                        ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 2, 2);
                    }

                    if(Math.random() > 0.98) {
                        Kernel.log(`Akustik Paket: Bit_${this.bitIndex} modüle edildi. [F:${freq}Hz]`, "audio");
                        this.bitIndex = (this.bitIndex + 1) % this.binaryData.length;
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const HijackEngine = {
            active: false, loop: null,
            toggle() {
                this.active = !this.active;
                Kernel.updateCell(36, this.active ? "hijack-active" : "active");
                if(this.active) this.start();
            },
            start() {
                const c = document.getElementById('hijack-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2,6,23,0.4)";
                    ctx.fillRect(0,0,c.width,c.height);
                    ctx.strokeStyle = "var(--hijack)";
                    const y = (Date.now() / 10) % c.height;
                    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(c.width, y); ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const JitterEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('jitter-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.2)";
                    ctx.fillRect(0,0,c.width,c.height);
                    ctx.strokeStyle = "var(--jitter)";
                    ctx.beginPath();
                    for(let x=0; x<c.width; x+=5) ctx.lineTo(x, (c.height/2) + (Math.random()-0.5)*40);
                    ctx.stroke();
                    requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const MorphEngine = {
            active: false, loop: null, gen: 0,
            start() {
                const c = document.getElementById('morph-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    const hash = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase();
                    document.getElementById('morph-hud').textContent = `CURRENT_HASH: ${hash} | SIG: EVADING`;
                    requestAnimationFrame(draw);
                };
                draw();
            }
        };

        window.AudioExfilEngine = AudioExfilEngine;
        window.HijackEngine = HijackEngine;
        window.Kernel = Kernel;
        window.onload = () => {
            Kernel.init();
            JitterEngine.start();
            MorphEngine.start();
        };
    </script>
</body>
</html>
