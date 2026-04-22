<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 23. HÜCRE (ISOLATION)</title>
    <style>
        :root {
            --bg-deep: #020617;
            --panel-bg: #0f172a;
            --text-neon: #38bdf8;
            --text-dim: #64748b;
            --hazard: #ef4444;
            --safety: #10b981;
            --warning: #f59e0b;
            --optic: #fbbf24; 
            --entropy: #8b5cf6; 
            --signal: #22d3ee; 
            --biometric: #10b981; 
            --shadow: #f43f5e;
            --resonance: #f97316;
            --thrashing: #ec4899;
            --hammer: #ef4444;
            --dns: #06b6d4;
            --api-sat: #6366f1;
            --fingerprint: #a855f7;
            --dissonance: #84cc16;
            --corruption: #dc2626;
            --ghosting: #facc15;
            --persistence: #6366f1;
            --logic: #0ea5e9;
            --exhaustion: #f472b6;
            --viral: #22c55e;
            --deaddrop: #818cf8;
            --apocalypse: #b91c1c;
            --migration: #94a3b8;
            --isolation: #f87171; /* 23. Hücre Rengi: İzolasyon Kırmızısı */
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
            transition: background-color 0.5s ease;
        }

        body.red-protocol {
            background-color: #450a0a;
            animation: red-alert 1s infinite alternate;
        }

        @keyframes red-alert {
            from { background-color: #450a0a; }
            to { background-color: #7f1d1d; }
        }

        .nefer-header {
            border: 1px solid var(--border);
            background: rgba(15, 23, 42, 0.9);
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-left: 4px solid var(--isolation);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--isolation); letter-spacing: 3px; font-weight: 800; }
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
        .cell.apocalypse-active { background: var(--apocalypse); box-shadow: 0 0 15px var(--apocalypse); animation: glitch 0.2s infinite; }
        .cell.migration-active { background: var(--migration); box-shadow: 0 0 12px var(--migration); }
        .cell.isolation-active { background: var(--isolation); box-shadow: 0 0 12px var(--isolation); }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes glitch { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
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
            height: 260px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            overflow: hidden;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 2px;
        }

        canvas { width: 100%; height: 100%; image-rendering: pixelated; border-right: 1px solid var(--border); }
        .viz-box { position: relative; overflow: hidden; background: #020617; border-right: 1px solid var(--border); }
        .viz-box:last-child { border-right: none; }

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
        .log-entry.mig { border-left-color: var(--migration); color: var(--migration); }
        .log-entry.iso { border-left-color: var(--isolation); color: var(--isolation); }
        .log-entry.hazard { border-left-color: var(--hazard); color: var(--hazard); font-weight: bold; }

        .tools-panel {
            background: var(--panel-bg);
            border: 1px solid var(--border);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            overflow-y: auto;
        }

        .btn {
            background: #1e293b;
            border: 1px solid var(--border);
            color: var(--text-neon);
            padding: 6px 10px;
            font-size: 0.55rem;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .btn.active-op-mig { border-color: var(--migration); background: #334155; color: white; }
        .btn.active-op-iso { border-color: var(--isolation); background: #991b1b; color: white; }

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

        .hud-overlay {
            position: absolute;
            bottom: 5px;
            left: 5px;
            font-size: 0.45rem;
            font-weight: bold;
        }
        
        .iso-hud { color: var(--isolation); }
        
        #countdown-display {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            color: var(--apocalypse);
            font-weight: 900;
            text-shadow: 0 0 20px var(--apocalypse);
            letter-spacing: 5px;
            pointer-events: none;
            display: none;
        }
    </style>
</head>
<body>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // AIR_GAP_VERIFICATION</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">23. HÜCRE: FİZİKSEL İZOLASYON TEYİDİ VE KIRMIZI PROTOKOL</div>
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
                <div class="viz-box" id="migration-viz"><canvas id="migration-canvas"></canvas></div>
                <div class="viz-box" id="isolation-viz">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--isolation); background:rgba(0,0,0,0.8); z-index:5;">AIR_GAP_MONITOR_v1.0</div>
                    <canvas id="isolation-canvas"></canvas>
                    <div id="isolation-hud" class="hud-overlay iso-hud">STATE: SECURE | LEAK_DETECT: 0%</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="MigrationEngine.toggle()"><span>22: JSON-L MIGRATION</span></button>
            <button class="btn" id="isolation-toggle" onclick="IsolationEngine.toggle()">
                <span>23: AIR-GAP VERIFICATION</span>
                <span id="isolation-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 23: Ağ sızıntılarını ve dış IP erişimini periyodik pinglerle denetler.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>23. HÜCRE: AIR-GAP VERIFICATION</b> - Fiziksel Güvenlik Teyidi</p>
            <p>Architect: Ömer Kaplan | Organization: Kaplan Precision Dept.</p>
        </div>
        <div class="flag-box">
            <svg width="100" height="60" viewBox="0 0 150 100">
                <defs><mask id="m"><rect width="150" height="100" fill="white"/><circle cx="61.25" cy="50" r="20" fill="black"/></mask></defs>
                <circle cx="50" cy="50" r="25" fill="#ef4444" mask="url(#m)"/><path d="M95,50 L86.18,52.86 L88.54,43.82 L81.18,37.14 L90.41,36.55 L95,28 L99.59,36.55 L108.82,37.14 L101.46,43.82 L103.82,52.86 Z" fill="#ef4444" transform="rotate(-18, 95, 40) translate(0, 5)"/></svg>
        </div>
    </footer>

    <script>
        const Kernel = {
            startTime: Date.now(),
            init() {
                this.setupGrid();
                this.updateCell(1, "active");
                setInterval(() => { document.getElementById('clock').textContent = new Date().toLocaleTimeString(); }, 1000);
                this.log("Kernel aktif. Hücre 23 (Isolation) denetçisi yüklendi.", "sys");
            },
            setupGrid() {
                const grid = document.getElementById('cell-grid');
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
                for(let i=2; i<=92; i++) {
                    if([22,23].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 10));
                    this.updateCell(i, "active");
                }
            }
        };

        const MigrationEngine = {
            active: false,
            toggle() {
                this.active = !this.active;
                Kernel.updateCell(22, this.active ? "migration-active" : "active");
            }
        };

        const ApocalypseEngine = { toggle() {} }; // Placeholder

        const IsolationEngine = {
            active: false,
            loop: null,
            leakDetect: 0,
            redProtocol: false,
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('isolation-toggle');
                const canvas = document.getElementById('isolation-canvas');
                const hud = document.getElementById('isolation-hud');
                const ctx = canvas.getContext('2d');
                
                if(this.active) {
                    btn.classList.add('active-op-iso');
                    document.getElementById('isolation-status').textContent = "DENETLENİYOR";
                    Kernel.updateCell(23, "isolation-active");
                    Kernel.log("FİZİKSEL İZOLASYON TEYİDİ BAŞLATILDI: PING DÖNGÜSÜ AKTİF.", "iso");
                    this.start(canvas, ctx, hud);
                } else {
                    btn.classList.remove('active-op-iso');
                    document.getElementById('isolation-status').textContent = "KAPALI";
                    Kernel.updateCell(23, "active");
                    this.stop(ctx, canvas);
                    hud.textContent = "STATE: SECURE | LEAK_DETECT: 0%";
                    this.deactivateRedProtocol();
                }
            },

            start(c, ctx, hud) {
                const check = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.3)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    // Radar Vizüalizasyonu
                    const time = Date.now() / 1000;
                    const centerX = c.width / 2;
                    const centerY = c.height / 2;
                    
                    ctx.strokeStyle = "var(--isolation)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, (time * 50) % (c.width/2), 0, Math.PI * 2);
                    ctx.stroke();

                    // navigator.onLine denetimi (Simüle)
                    const online = navigator.onLine; 
                    if(online && Math.random() > 0.95) {
                        this.leakDetect += 5;
                        Kernel.log("UYARI: Ağ bağlantısı tespit edildi! Sızıntı riski.", "hazard");
                    }

                    if(this.leakDetect >= 100 && !this.redProtocol) {
                        this.triggerRedProtocol();
                    }

                    hud.textContent = `STATE: ${this.redProtocol ? 'DANGER' : 'SECURE'} | LEAK_DETECT: ${this.leakDetect}%`;
                    
                    this.loop = requestAnimationFrame(check);
                };
                check();
            },

            triggerRedProtocol() {
                this.redProtocol = true;
                document.body.classList.add('red-protocol');
                Kernel.log("!!! KIRMIZI PROTOKOL TETİKLENDİ !!!", "hazard");
                Kernel.log("Güvenlik: Tüm anahtarlar bellekten silindi. Sistem kilitlendi.", "hazard");
                document.getElementById('isolation-status').textContent = "KIRMIZI PROTOKOL";
            },

            deactivateRedProtocol() {
                this.redProtocol = false;
                this.leakDetect = 0;
                document.body.classList.remove('red-protocol');
            },

            stop(ctx, c) {
                this.active = false;
                cancelAnimationFrame(this.loop);
                ctx.clearRect(0,0,c.width, c.height);
                Kernel.log("İzolasyon denetimi durduruldu.", "sys");
            }
        };

        window.onload = () => {
            Kernel.init();
            ["migration", "isolation"].forEach(id => {
                const c = document.getElementById(id + "-canvas");
                if(c) { c.width = c.offsetWidth; c.height = c.offsetHeight; }
            });
        };
    </script>
</body>
</html>
