<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 03. HÜCRE (ENTROPIC BACKFIRE)</title>
    <style>
        /* --- NEFER-OS CORE STYLES --- */
        :root {
            --bg-deep: #020617;
            --panel-bg: #0f172a;
            --text-neon: #38bdf8;
            --text-dim: #64748b;
            --hazard: #ef4444;
            --safety: #10b981;
            --warning: #f59e0b;
            --optic: #fbbf24; 
            --entropy: #8b5cf6; /* 03. Hücre Rengi: Entropik Mor */
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

        /* --- HEADER --- */
        .nefer-header {
            border: 1px solid var(--border);
            background: rgba(15, 23, 42, 0.9);
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-left: 4px solid var(--entropy);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--entropy); letter-spacing: 3px; font-weight: 800; }
        .meta-info { font-size: 0.7rem; color: var(--text-dim); text-align: right; }

        /* --- 92-HÜCRELİ MATRİS --- */
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
        .cell.optic-active { background: var(--optic); box-shadow: 0 0 12px var(--optic); }
        .cell.entropy-active { background: var(--entropy); box-shadow: 0 0 12px var(--entropy); }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

        /* --- KONSOL VE VIZ KONTEYNER --- */
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
            height: 200px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            overflow: hidden;
            display: flex;
            gap: 2px;
        }

        canvas { width: 50%; height: 100%; image-rendering: pixelated; border-right: 1px solid var(--border); }
        .fractal-overlay { width: 50%; height: 100%; position: relative; overflow: hidden; background: #020617; }

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
        .log-entry.optic { border-left-color: var(--optic); color: var(--optic); }
        .log-entry.entropy { border-left-color: var(--entropy); color: var(--entropy); }

        /* --- KONTROL PANELİ --- */
        .tools-panel {
            background: var(--panel-bg);
            border: 1px solid var(--border);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .btn {
            background: #1e293b;
            border: 1px solid var(--border);
            color: var(--text-neon);
            padding: 12px;
            font-size: 0.7rem;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .btn.active-op-optic { border-color: var(--optic); background: #451a03; color: white; }
        .btn.active-op-entropy { border-color: var(--entropy); background: #2e1065; color: white; }

        /* --- FOOTER --- */
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
    </style>
</head>
<body>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // ENTROPIC_BACKFIRE</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">03. HÜCRE: MANTIKSAL LABİRENT VE İŞLEMCİ TÜKETİMİ</div>
        </div>
        <div class="meta-info">
            <div id="clock">00:00:00</div>
            <div>ARCHITECT: ÖMER KAPLAN</div>
        </div>
    </header>

    <div class="cell-grid" id="cell-grid"></div>

    <div class="console-container">
        <div class="main-display">
            <!-- VIZ ALANI -->
            <div class="viz-view">
                <canvas id="optic-canvas"></canvas>
                <div class="fractal-overlay" id="entropy-viz">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.5rem; color:var(--entropy); background:rgba(0,0,0,0.8); padding:2px 5px; border:1px solid var(--entropy);">RECURSIVE_TRAP_ACTIVE</div>
                    <svg width="100%" height="100%" id="entropy-svg"></svg>
                </div>
            </div>

            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" id="optic-toggle" onclick="OpticEngine.toggle()">
                <span>02. HÜCRE: OPTIC PARALYSIS</span>
                <span id="optic-status">KAPALI</span>
            </button>

            <button class="btn" id="entropy-toggle" onclick="EntropicEngine.toggle()">
                <span>03. HÜCRE: ENTROPIC BACKFIRE</span>
                <span id="entropy-status">KAPALI</span>
            </button>

            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            
            <div style="margin-top: auto; font-size: 0.6rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 03: Düşman botlarını sonsuz özyinelemeli Proxy döngülerine hapseder.
            </div>
        </aside>
    </div>

    <!-- PROTOKOL FOOTER -->
    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>03. HÜCRE: ENTROPIC BACKFIRE</b> - Mantıksal Labirent</p>
            <p>Architect: Ömer Kaplan | Organization: Kaplan Precision Dept.</p>
        </div>
        <div class="flag-box">
            <svg width="120" height="80" viewBox="0 0 150 100">
                <defs><mask id="m"><rect width="150" height="100" fill="white"/><circle cx="61.25" cy="50" r="20" fill="black"/></mask></defs>
                <circle cx="50" cy="50" r="25" fill="#ef4444" mask="url(#m)"/><path d="M95,50 L86.18,52.86 L88.54,43.82 L81.18,37.14 L90.41,36.55 L95,28 L99.59,36.55 L108.82,37.14 L101.46,43.82 L103.82,52.86 Z" fill="#ef4444" transform="rotate(-18, 95, 40) translate(0, 5)"/></svg>
        </div>
    </footer>

    <script>
        /* --- KERNEL CORE (HÜCRE 01) --- */
        const Kernel = {
            startTime: Date.now(),
            init() {
                this.setupGrid();
                this.updateCell(1, "active");
                setInterval(() => {
                    document.getElementById('clock').textContent = new Date().toLocaleTimeString();
                }, 1000);
                this.log("Kernel aktif. Hücre 03 (Entropic Backfire) modülü hazır.", "sys");
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
                this.log("Sıralı önyükleme başlatılıyor...", "sys");
                for(let i=2; i<=92; i++) {
                    if(i === 2 || i === 3) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 20));
                    this.updateCell(i, "active");
                }
                this.log("Sığınak 92 hücre bütünlüğü onaylandı.", "sys");
            }
        };

        /* --- OPTIC ENGINE (HÜCRE 02) --- */
        const OpticEngine = {
            active: false,
            loop: null,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('optic-toggle');
                const canvas = document.getElementById('optic-canvas');
                if(this.active) {
                    btn.classList.add('active-op-optic');
                    document.getElementById('optic-status').textContent = "AKTİF";
                    Kernel.updateCell(2, "optic-active");
                    Kernel.log("OPTİK SİNİR FELCİ BAŞLATILDI.", "optic");
                    this.start(canvas);
                } else {
                    btn.classList.remove('active-op-optic');
                    document.getElementById('optic-status').textContent = "KAPALI";
                    Kernel.updateCell(2, "active");
                    this.stop(canvas);
                }
            },
            start(c) {
                const ctx = c.getContext('2d');
                const step = () => {
                    if(!this.active) return;
                    const idata = ctx.createImageData(c.width, c.height);
                    const buf = new Uint32Array(idata.data.buffer);
                    for(let i=0; i<buf.length; i++) buf[i] = Math.random() > 0.98 ? 0xFFFBBE24 : (Math.random() * 0xFF111111) | 0xFF000000;
                    ctx.putImageData(idata, 0, 0);
                    this.loop = requestAnimationFrame(step);
                };
                step();
            },
            stop(c) {
                cancelAnimationFrame(this.loop);
                c.getContext('2d').clearRect(0,0,c.width,c.height);
            }
        };

        /* --- ENTROPIC ENGINE (HÜCRE 03) --- */
        const EntropicEngine = {
            active: false,
            trapCount: 0,
            
            // Operasyonun kalbi: Sonsuz özyinelemeli Proxy nesnesi
            createTrap() {
                const handler = {
                    get: (target, prop) => {
                        this.trapCount++;
                        if (this.active) {
                            Kernel.log(`Düşman Bot Algılandı: Derinlik ${this.trapCount}`, "entropy");
                            // Her erişimde kendini kopyalayan ve derinleşen yapı
                            return new Proxy({}, handler);
                        }
                        return target[prop];
                    }
                };
                return new Proxy({}, handler);
            },

            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('entropy-toggle');
                const status = document.getElementById('entropy-status');
                const svg = document.getElementById('entropy-svg');
                
                if(this.active) {
                    btn.classList.add('active-op-entropy');
                    status.textContent = "AKTİF";
                    Kernel.updateCell(3, "entropy-active");
                    Kernel.log("ENTROPİK KARŞI PATLAMA AKTİF EDİLDİ.", "entropy");
                    
                    // Yem sunucusu/objesi oluşturuluyor
                    window.NEFER_DATA_VAULT = this.createTrap();
                    this.visualize();
                } else {
                    btn.classList.remove('active-op-entropy');
                    status.textContent = "KAPALI";
                    Kernel.updateCell(3, "active");
                    Kernel.log("Entropik döngü durduruldu.", "sys");
                    delete window.NEFER_DATA_VAULT;
                    svg.innerHTML = '';
                    this.trapCount = 0;
                }
            },

            visualize() {
                if(!this.active) return;
                const svg = document.getElementById('entropy-svg');
                const drawFractal = (x, y, size, depth) => {
                    if(depth <= 0 || !this.active) return;
                    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    rect.setAttribute("x", x); rect.setAttribute("y", y);
                    rect.setAttribute("width", size); rect.setAttribute("height", size);
                    rect.setAttribute("fill", "none");
                    rect.setAttribute("stroke", "var(--entropy)");
                    rect.setAttribute("stroke-width", "0.5");
                    rect.setAttribute("opacity", depth / 5);
                    svg.appendChild(rect);
                    
                    setTimeout(() => {
                        drawFractal(x + size/4, y + size/4, size/2, depth - 1);
                    }, 200);
                };
                drawFractal(10, 10, 150, 10);
            }
        };

        window.onload = () => {
            Kernel.init();
            const c = document.getElementById('optic-canvas');
            c.width = c.offsetWidth; c.height = c.offsetHeight;
        };
    </script>
</body>
</html>
