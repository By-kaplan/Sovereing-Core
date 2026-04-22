<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 16. HÜCRE (PERSISTENCE)</title>
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
            --persistence: #6366f1; /* 16. Hücre Rengi: Kalıcılık İndigosu */
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
            border-left: 4px solid var(--persistence);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--persistence); letter-spacing: 3px; font-weight: 800; }
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
        .cell.corruption-active { background: var(--corruption); box-shadow: 0 0 12px var(--corruption); }
        .cell.ghosting-active { background: var(--ghosting); box-shadow: 0 0 12px var(--ghosting); }
        .cell.persistence-active { background: var(--persistence); box-shadow: 0 0 12px var(--persistence); }
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
        .log-entry.ghost { border-left-color: var(--ghosting); color: var(--ghosting); }
        .log-entry.persist { border-left-color: var(--persistence); color: var(--persistence); }

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

        .btn.active-op-ghost { border-color: var(--ghosting); background: #713f12; color: white; }
        .btn.active-op-persist { border-color: var(--persistence); background: #312e81; color: white; }

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

        .persist-hud {
            position: absolute;
            bottom: 5px;
            left: 5px;
            font-size: 0.45rem;
            color: var(--persistence);
            font-weight: bold;
        }
    </style>
</head>
<body>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // ZERO_KNOWLEDGE_PERSISTENCE</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">16. HÜCRE: SIFIR-BİLGİ KALICILIĞI VE YENİDEN DOĞUŞ</div>
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
                <div class="viz-box" id="ghost-viz"><canvas id="ghost-canvas"></canvas></div>
                <div class="viz-box" id="persist-viz">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--persistence); background:rgba(0,0,0,0.8); z-index:5;">GHOSTWARE_REBIRTH_MATRIX</div>
                    <canvas id="persist-canvas"></canvas>
                    <div id="persist-hud" class="persist-hud">BACKUP_STATE: SECURE | RESURRECTION: READY</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="GhostEngine.toggle()"><span>15: ALGORITHMIC GHOSTING</span></button>
            <button class="btn" id="persist-toggle" onclick="PersistenceEngine.toggle()">
                <span>16: ZERO-KNOWLEDGE PERSISTENCE</span>
                <span id="persist-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 16: Service Workers ve CacheStorage ile silinemez hayalet varlık oluşturur.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>16. HÜCRE: ZERO-KNOWLEDGE PERSISTENCE</b> - Ghostware Kalıcılığı</p>
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
                this.log("Kernel aktif. Hücre 16 kalıcılık kalkanı yüklendi.", "sys");
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
                    if([14,15,16].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 10));
                    this.updateCell(i, "active");
                }
            }
        };

        const CorruptionEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(14, this.active ? "corruption-active" : "active"); } };
        const GhostEngine = { active: false, toggle() { this.active = !this.active; Kernel.updateCell(15, this.active ? "ghosting-active" : "active"); } };

        const PersistenceEngine = {
            active: false,
            loop: null,
            rebirthCycle: 0,
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('persist-toggle');
                const canvas = document.getElementById('persist-canvas');
                const hud = document.getElementById('persist-hud');
                const ctx = canvas.getContext('2d');
                
                if(this.active) {
                    btn.classList.add('active-op-persist');
                    document.getElementById('persist-status').textContent = "AKTİF";
                    Kernel.updateCell(16, "persistence-active");
                    Kernel.log("KALICILIK KALKANI AKTİF: HAYALET YAZILIM DÖNGÜSÜ BAŞLATILDI.", "persist");
                    this.start(canvas, ctx, hud);
                } else {
                    btn.classList.remove('active-op-persist');
                    document.getElementById('persist-status').textContent = "KAPALI";
                    Kernel.updateCell(16, "active");
                    this.stop(ctx, canvas);
                    hud.textContent = "BACKUP_STATE: SECURE | RESURRECTION: READY";
                }
            },

            start(c, ctx, hud) {
                const cycle = () => {
                    if(!this.active) return;
                    
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    // Resurrection Matrix Görselleştirmesi
                    const centerX = c.width / 2;
                    const centerY = c.height / 2;
                    const radius = 20 + Math.sin(Date.now() / 500) * 10;
                    
                    ctx.strokeStyle = "var(--persistence)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                    ctx.stroke();

                    // Sahte Blob parçacıkları
                    for(let i=0; i<10; i++) {
                        ctx.fillStyle = "var(--persistence)";
                        const angle = (Date.now() / 1000) + (i * Math.PI / 5);
                        const px = centerX + Math.cos(angle) * (radius + 20);
                        const py = centerY + Math.sin(angle) * (radius + 20);
                        ctx.fillRect(px, py, 2, 2);
                    }

                    if(Math.random() > 0.99) {
                        this.rebirthCycle++;
                        Kernel.log(`Kalıcılık: Şifreli Blob parçaları birleştirildi. [Döngü: ${this.rebirthCycle}]`, "persist");
                        Kernel.log(`Sistem: Yeniden Doğuş (Resurrection) protokolü saniyeler içinde tetiklenecek.`, "persist");
                    }

                    hud.textContent = `REBIRTH_CYCLE: ${this.rebirthCycle} | SHADOW_STORAGE: ACTIVE`;
                    
                    this.loop = requestAnimationFrame(cycle);
                };
                cycle();
            },

            stop(ctx, c) {
                this.active = false;
                this.rebirthCycle = 0;
                cancelAnimationFrame(this.loop);
                ctx.clearRect(0,0,c.width, c.height);
                Kernel.log("Kalıcılık kalkanı pasifize edildi. Hayalet izler temizlendi.", "sys");
            }
        };

        window.onload = () => {
            Kernel.init();
            ["ghost", "persist"].forEach(id => {
                const c = document.getElementById(id + "-canvas");
                if(c) { c.width = c.offsetWidth; c.height = c.offsetHeight; }
            });
        };
    </script>
</body>
</html>
