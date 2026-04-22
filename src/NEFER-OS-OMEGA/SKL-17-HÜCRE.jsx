<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 17. HÜCRE (LOGIC INJECTION)</title>
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
            --logic: #0ea5e9; /* 17. Hücre Rengi: Mantık Mavisi */
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
            border-left: 4px solid var(--logic);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--logic); letter-spacing: 3px; font-weight: 800; }
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
        .cell.persistence-active { background: var(--persistence); box-shadow: 0 0 12px var(--persistence); }
        .cell.logic-active { background: var(--logic); box-shadow: 0 0 12px var(--logic); }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

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
            height: 240px;
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
        .log-entry.persist { border-left-color: var(--persistence); color: var(--persistence); }
        .log-entry.logic { border-left-color: var(--logic); color: var(--logic); }

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

        .btn.active-op-persist { border-color: var(--persistence); background: #312e81; color: white; }
        .btn.active-op-logic { border-color: var(--logic); background: #0c4a6e; color: white; }

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

        .logic-hud {
            position: absolute;
            bottom: 5px;
            left: 5px;
            font-size: 0.45rem;
            color: var(--logic);
            font-weight: bold;
        }
    </style>
</head>
<body>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // LOGIC_INJECTION</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">17. HÜCRE: ÇAPRAZ KAYNAK MANTIK ENJEKSİYONU</div>
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
                <div class="viz-box" id="persist-viz"><canvas id="persist-canvas"></canvas></div>
                <div class="viz-box" id="logic-viz">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--logic); background:rgba(0,0,0,0.8); z-index:5;">PROTOTYPE_POLLUTION_MONITOR</div>
                    <canvas id="logic-canvas"></canvas>
                    <div id="logic-hud" class="logic-hud">HOOK_STATE: IDLE | TARGET: 3rd_PARTY_LIBS</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="PersistenceEngine.toggle()"><span>16: ZERO-KNOWLEDGE PERSISTENCE</span></button>
            <button class="btn" id="logic-toggle" onclick="LogicEngine.toggle()">
                <span>17: CROSS-ORIGIN LOGIC INJECTION</span>
                <span id="logic-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 17: Güvenilir üçüncü taraf kütüphaneleri (Analytics/Fonts) truva atına dönüştürür.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>17. HÜCRE: CROSS-ORIGIN LOGIC INJECTION</b> - Aracı Sabotajı</p>
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
                this.log("Kernel aktif. Hücre 17 (Logic Injection) kancaları hazır.", "sys");
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
                    if([16,17].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 10));
                    this.updateCell(i, "active");
                }
            }
        };

        const PersistenceEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(16, this.active ? "persistence-active" : "active"); } };

        const LogicEngine = {
            active: false,
            loop: null,
            interceptCount: 0,
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('logic-toggle');
                const canvas = document.getElementById('logic-canvas');
                const hud = document.getElementById('logic-hud');
                const ctx = canvas.getContext('2d');
                
                if(this.active) {
                    btn.classList.add('active-op-logic');
                    document.getElementById('logic-status').textContent = "AKTİF";
                    Kernel.updateCell(17, "logic-active");
                    Kernel.log("MANTIK ENJEKSİYONU AKTİF: PROTOTİP KİNCİLERİ YERLEŞTİRİLİYOR.", "logic");
                    this.start(canvas, ctx, hud);
                } else {
                    btn.classList.remove('active-op-logic');
                    document.getElementById('logic-status').textContent = "KAPALI";
                    Kernel.updateCell(17, "active");
                    this.stop(ctx, canvas);
                    hud.textContent = "HOOK_STATE: IDLE | TARGET: 3rd_PARTY_LIBS";
                }
            },

            start(c, ctx, hud) {
                const draw = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    // Veri akışı vizüalizasyonu: Kanca (Hook) sembolleri
                    for(let i=0; i<8; i++) {
                        const x = (Date.now() / 10 + i * 40) % c.width;
                        const y = Math.sin(x / 20) * 10 + c.height / 2;
                        
                        ctx.fillStyle = "var(--logic)";
                        ctx.fillRect(x, y, 4, 1);
                        
                        // Kanca noktası
                        if(Math.random() > 0.95) {
                            ctx.beginPath();
                            ctx.arc(x, y, 2, 0, Math.PI * 2);
                            ctx.fill();
                            this.interceptCount++;
                        }
                    }

                    if(Math.random() > 0.99) {
                        const targets = ["GA_Analytics.push", "Typekit.load", "AdSense.init"];
                        const t = targets[Math.floor(Math.random() * targets.length)];
                        Kernel.log(`Hooked: ${t}() ele geçirildi. Payload enjekte edildi.`, "logic");
                    }

                    hud.textContent = `HOOKS_ACTIVE: ${this.interceptCount % 256} | INJECTED: 0x${(Date.now()%0xFFFF).toString(16)}`;
                    
                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            },

            stop(ctx, c) {
                this.active = false;
                this.interceptCount = 0;
                cancelAnimationFrame(this.loop);
                ctx.clearRect(0,0,c.width, c.height);
                Kernel.log("Mantık kancaları temizlendi. Üçüncü taraf servisler normale döndü.", "sys");
            }
        };

        window.onload = () => {
            Kernel.init();
            ["logic", "persist"].forEach(id => {
                const c = document.getElementById(id + "-canvas");
                if(c) { c.width = c.offsetWidth; c.height = c.offsetHeight; }
            });
        };
    </script>
</body>
</html>
