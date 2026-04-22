<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 50. HÜCRE (FEEDBACK LOOP)</title>
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
            --feedback-loop: #e11d48; /* 50. Hücre Rengi: Döngü Kırmızısı */
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
            border-left: 4px solid var(--feedback-loop);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--feedback-loop); letter-spacing: 3px; font-weight: 800; }
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
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes loop-flicker { 0% { opacity: 1; } 50% { opacity: 0.1; } 100% { opacity: 1; } }
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
            grid-template-rows: repeat(18, 35px) 1fr;
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
        .log-entry.loop { border-left-color: var(--feedback-loop); color: var(--feedback-loop); font-weight: bold; }

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
        .btn.active-op-loop { border-color: var(--feedback-loop); background: #881337; color: white; }

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
            <h1>NEFER-OS // INFINITE_FEEDBACK_LOOP_INJECTION</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">50. HÜCRE: SONSUZ GERİ BESLEME DÖNGÜSÜ VE LOG TAŞKINLIĞI</div>
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
                <!-- Üst Sıralar: Mevcut Vizüalizasyonlar -->
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
                
                <!-- 50. Hücre: Feedback Loop Vizüalizasyonu -->
                <div class="viz-box" style="grid-column: span 6; grid-row: span 4;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--feedback-loop); z-index:5;">LOG_RECURSION_STORM_GENERATOR</div>
                    <canvas id="loop-canvas"></canvas>
                    <div id="loop-hud" class="hud-text" style="color: var(--feedback-loop);">LOG_SIZE: 0B | ERROR_DEPTH: 0 | DISK_STATE: NOMINAL</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" id="loop-toggle" onclick="FeedbackLoopEngine.toggle()">
                <span>50: INFINITE FEEDBACK LOOP INJECTION</span>
                <span id="loop-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 50: Hata loglama mekanizmalarını rekürsif bir döngüye sokarak disk alanını tüketir.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>50. HÜCRE: INFINITE FEEDBACK LOOP INJECTION</b> - Log Taşkınlığı Protokolü</p>
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
                this.log("Kernel aktif. Log Taşkınlığı (Feedback Loop) modülü mühürlendi.", "boot");
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
                for(let i=1; i<=50; i++) {
                    if([1, 24, 50].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 10));
                    this.updateCell(i, "active");
                }
            }
        };

        const FeedbackLoopEngine = {
            active: false,
            loop: null,
            logSize: 0,
            depth: 0,
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('loop-toggle');
                const hud = document.getElementById('loop-hud');
                const statusText = document.getElementById('loop-status');
                
                if(this.active) {
                    if(btn) btn.classList.add('active-op-loop');
                    if(statusText) statusText.textContent = "TAŞIYOR";
                    Kernel.updateCell(50, "feedback-active");
                    Kernel.log("SONSUZ DÖNGÜ AKTİF: REKÜRSİF HATA ENJEKSİYONU BAŞLATILDI.", "loop");
                    this.start();
                } else {
                    if(btn) btn.classList.remove('active-op-loop');
                    if(statusText) statusText.textContent = "KAPALI";
                    Kernel.updateCell(50, "active");
                    cancelAnimationFrame(this.loop);
                    this.logSize = 0;
                    this.depth = 0;
                    if(hud) hud.textContent = "LOG_SIZE: 0B | ERROR_DEPTH: 0 | DISK_STATE: NOMINAL";
                    Kernel.log("Log taşkınlık protokolü sonlandırıldı.", "sys");
                }
            },

            start() {
                const c = document.getElementById('loop-canvas');
                if(!c) return;
                const ctx = c.getContext('2d');
                if(!ctx) return;
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                
                const draw = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    this.logSize += Math.random() * 1024 * 1024 * 50; // Sahte log artışı
                    this.depth += 1;
                    
                    const sizeStr = this.logSize > 1024*1024*1024 
                        ? (this.logSize/(1024*1024*1024)).toFixed(2) + " GB"
                        : (this.logSize/(1024*1024)).toFixed(2) + " MB";
                    
                    const hud = document.getElementById('loop-hud');
                    if(hud) hud.textContent = `LOG_SIZE: ${sizeStr} | ERROR_DEPTH: ${this.depth} | DISK_STATE: FULL_WARNING`;

                    // Döngü Vizüalizasyonu
                    ctx.strokeStyle = "var(--feedback-loop)";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    const centerX = c.width / 2;
                    const centerY = c.height / 2;
                    const r = (Math.sin(Date.now() / 100) * 50) + 100;
                    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                    ctx.stroke();

                    // Sahte Hata Mesajları
                    ctx.fillStyle = "rgba(225, 29, 72, 0.5)";
                    for(let i=0; i<10; i++) {
                        ctx.fillText(`ERROR_RECURSION_0x${Math.random().toString(16).slice(2,8)}`, Math.random()*c.width, Math.random()*c.height);
                    }

                    if(Math.random() > 0.98) {
                        Kernel.log(`Feedback: onerror() manipüle edildi. Yeni log katmanı fırlatıldı.`, "loop");
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        // Arka Plan Motorları (Hataları önlemek için güvenlikli başlatma)
        const initStaticCanvas = (id, color) => {
            const c = document.getElementById(id);
            if(!c) return;
            const ctx = c.getContext('2d');
            if(!ctx) return;
            c.width = c.offsetWidth; c.height = c.offsetHeight;
            ctx.fillStyle = "rgba(15, 23, 42, 0.4)";
            ctx.fillRect(0,0,c.width,c.height);
        };

        window.FeedbackLoopEngine = FeedbackLoopEngine;
        window.Kernel = Kernel;
        
        window.onload = () => {
            Kernel.init();
            const canvases = ['ws-canvas', 'jitter-canvas', 'dns-canvas', 'neural-canvas', 'heap-canvas', 'bomb-canvas', 'shadow-canvas', 'deadlock-canvas', 'hijack-canvas', 'jit-canvas', 'stegano-canvas', 'mutation-canvas', 'heuristic-canvas', 'cascade-canvas', 'bitrot-canvas', 'labyrinth-canvas', 'collision-canvas', 'neural-poison-canvas', 'bgp-canvas', 'hardware-canvas', 'audio-canvas', 'morph-canvas', 'bus-canvas'];
            canvases.forEach(id => initStaticCanvas(id));
        };
    </script>
</body>
</html>
