<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 14. HÜCRE (RECURSIVE CORRUPTION)</title>
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
            --corruption: #dc2626; /* 14. Hücre Rengi: Kanser Kırmızısı */
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
            border-left: 4px solid var(--corruption);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--corruption); letter-spacing: 3px; font-weight: 800; }
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
        .cell.dissonance-active { background: var(--dissonance); box-shadow: 0 0 12px var(--dissonance); }
        .cell.corruption-active { background: var(--corruption); box-shadow: 0 0 12px var(--corruption); }
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
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
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
        .log-entry.diss { border-left-color: var(--dissonance); color: var(--dissonance); }
        .log-entry.corrupt { border-left-color: var(--corruption); color: var(--corruption); }

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

        .btn.active-op-diss { border-color: var(--dissonance); background: #14532d; color: white; }
        .btn.active-op-corrupt { border-color: var(--corruption); background: #7f1d1d; color: white; }

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

        .corrupt-hud {
            position: absolute;
            bottom: 5px;
            left: 5px;
            font-size: 0.45rem;
            color: var(--corruption);
            font-weight: bold;
        }
    </style>
</head>
<body>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // RECURSIVE_CORRUPTION</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">14. HÜCRE: ÖZYİNELEMELİ VERİ TAHRİBATI VE DİJİTAL KANSER</div>
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
                <div class="viz-box" id="diss-viz"><canvas id="diss-canvas"></canvas></div>
                <div class="viz-box" id="corrupt-viz">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--corruption); background:rgba(0,0,0,0.8); z-index:5;">DIGITAL_CANCER_SPREADING</div>
                    <canvas id="corrupt-canvas"></canvas>
                    <div id="corrupt-hud" class="corrupt-hud">INFECTED_NODES: 0 | RECURSION: STABLE</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="DissonanceEngine.toggle()"><span>13: COGNITIVE DISSONANCE</span></button>
            <button class="btn" id="corrupt-toggle" onclick="CorruptionEngine.toggle()">
                <span>14: RECURSIVE CORRUPTION</span>
                <span id="corrupt-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 14: Düşman veritabanlarını dairesel referanslarla (Logic Bomb) imha eder.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>14. HÜCRE: RECURSIVE DATA CORRUPTION</b> - Veri Tabanı Sabotajı</p>
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
                this.log("Kernel aktif. Hücre 14 veri imha katmanı hazır.", "sys");
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
                    if([13,14].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 10));
                    this.updateCell(i, "active");
                }
            }
        };

        const DissonanceEngine = {
            active: false,
            toggle() {
                this.active = !this.active;
                Kernel.updateCell(13, this.active ? "dissonance-active" : "active");
            }
        };

        const CorruptionEngine = {
            active: false,
            loop: null,
            infectedCount: 0,

            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('corrupt-toggle');
                const canvas = document.getElementById('corrupt-canvas');
                const hud = document.getElementById('corrupt-hud');
                const ctx = canvas.getContext('2d');
                
                if(this.active) {
                    btn.classList.add('active-op-corrupt');
                    document.getElementById('corrupt-status').textContent = "AKTİF";
                    Kernel.updateCell(14, "corruption-active");
                    Kernel.log("DİJİTAL KANSER BAŞLATILDI: DAİRESEL REFERANSLAR ENJEKTE EDİLİYOR.", "corrupt");
                    this.start(canvas, ctx, hud);
                } else {
                    btn.classList.remove('active-op-corrupt');
                    document.getElementById('corrupt-status').textContent = "KAPALI";
                    Kernel.updateCell(14, "active");
                    this.stop(ctx, canvas);
                    hud.textContent = "INFECTED_NODES: 0 | RECURSION: STABLE";
                }
            },

            start(c, ctx, hud) {
                const spread = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.1)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    // Kanser yayılım vizüalizasyonu
                    for(let i=0; i<3; i++) {
                        const x = Math.random() * c.width;
                        const y = Math.random() * c.height;
                        const size = Math.random() * 8;
                        
                        ctx.fillStyle = "var(--corruption)";
                        ctx.beginPath();
                        ctx.arc(x, y, size, 0, Math.PI * 2);
                        ctx.fill();
                        
                        this.infectedCount++;
                    }

                    if(Math.random() > 0.98) {
                        Kernel.log(`Tahribat: JSON_PARSE_LIMIT_EXCEEDED in Master_DB.`, "corrupt");
                        Kernel.log(`Kritik: Tip Karışıklığı (Type Confusion) saptandı.`, "corrupt");
                    }

                    hud.textContent = `INFECTED_NODES: ${this.infectedCount} | RECURSION: CRITICAL`;
                    
                    this.loop = requestAnimationFrame(spread);
                };
                spread();
            },

            stop(ctx, c) {
                this.active = false;
                this.infectedCount = 0;
                cancelAnimationFrame(this.loop);
                ctx.clearRect(0,0,c.width, c.height);
                Kernel.log("Kanser yayılımı durduruldu. Mantıksal bombalar pasifize edildi.", "sys");
            }
        };

        window.onload = () => {
            Kernel.init();
            ["diss", "corrupt"].forEach(id => {
                const c = document.getElementById(id + "-canvas");
                if(c) { c.width = c.offsetWidth; c.height = c.offsetHeight; }
            });
        };
    </script>
</body>
</html>
