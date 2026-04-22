<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 02. HÜCRE (OPTIC NERVE)</title>
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
            --optic: #fbbf24; /* 02. Hücre Rengi: Optic Yellow */
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
            border-left: 4px solid var(--optic);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--optic); letter-spacing: 3px; font-weight: 800; }
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
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

        /* --- KONSOL VE OPTIC VIZ --- */
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

        .optic-viz-container {
            height: 200px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            overflow: hidden;
        }

        #optic-canvas {
            width: 100%;
            height: 100%;
            image-rendering: pixelated;
        }

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
        }

        .btn.active-op { border-color: var(--optic); background: #451a03; color: white; }

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
            <h1>NEFER-OS // OPTIC_NERVE</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">02. HÜCRE: OPTİK SİNİR FELCİ OPERASYONU</div>
        </div>
        <div class="meta-info">
            <div id="clock">00:00:00</div>
            <div>ARCHITECT: ÖMER KAPLAN</div>
        </div>
    </header>

    <!-- 92 HÜCRELİ MATRİS -->
    <div class="cell-grid" id="cell-grid"></div>

    <div class="console-container">
        <div class="main-display">
            <!-- GÖRSEL SABOTAJ VİZÜALİZASYONU -->
            <div class="optic-viz-container">
                <canvas id="optic-canvas"></canvas>
                <div style="position:absolute; top:10px; left:10px; font-size:0.55rem; color:var(--optic); background:rgba(0,0,0,0.8); padding:2px 5px; border:1px solid var(--optic);">AI_PARADOX_ENGINE v1.0</div>
            </div>

            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" id="optic-toggle" onclick="OpticEngine.toggle()">
                <span>OPERASYON: PARALYSIS</span>
                <span id="optic-status">KAPALI</span>
            </button>

            <button class="btn" onclick="Kernel.sequenceBoot()">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            
            <div style="margin-top: auto; font-size: 0.6rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 02: Düşman nesne tanıma (YOLO/TF) sistemlerini felç eden gürültü kalkanı.
            </div>
        </aside>
    </div>

    <!-- PROTOKOL FOOTER -->
    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>02. HÜCRE: OPTIC NERVE PARALYSIS</b> - Görüntü İşleme Sabotajı</p>
            <p>Architect: Ömer Kaplan | Organization: Kaplan Precision Dept.</p>
        </div>
        <div class="flag-box">
            <!-- MATEMATİKSEL AY YILDIZ (G=100) -->
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
                this.log("Kernel aktif. 02. Hücre (Optic Nerve) senkronizasyon hazır.", "sys");
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
                this.log("Sıralı hücre taraması başlatılıyor...", "sys");
                for(let i=2; i<=92; i++) {
                    if(i === 2) continue;
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
            canvas: null,
            ctx: null,

            toggle() {
                this.active = !this.active;
                this.canvas = document.getElementById('optic-canvas');
                this.ctx = this.canvas.getContext('2d');
                
                const btn = document.getElementById('optic-toggle');
                const status = document.getElementById('optic-status');
                
                if(this.active) {
                    btn.classList.add('active-op');
                    status.textContent = "AKTİF";
                    Kernel.updateCell(2, "optic-active");
                    Kernel.log("OPTİK SİNİR FELCİ BAŞLATILDI.", "optic");
                    this.start();
                } else {
                    btn.classList.remove('active-op');
                    status.textContent = "KAPALI";
                    Kernel.updateCell(2, "active");
                    Kernel.log("Optik motor güvenli moda alındı.", "sys");
                    this.stop();
                }
            },

            start() {
                const step = () => {
                    if(!this.active) return;
                    this.generateNoise();
                    this.loop = requestAnimationFrame(step);
                };
                step();
            },

            stop() {
                cancelAnimationFrame(this.loop);
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },

            generateNoise() {
                const w = this.canvas.width;
                const h = this.canvas.height;
                const imgData = this.ctx.createImageData(w, h);
                const buffer = new Uint32Array(imgData.data.buffer);
                
                // Matematiksel Gürültü: AI algoritmalarını paradoksa sokan desenler
                for (let i = 0; i < buffer.length; i++) {
                    const rand = Math.random();
                    if (rand > 0.97) {
                        // "Adversarial Patch" çekirdek pikselleri (Zıt renkler)
                        buffer[i] = 0xFFFBBE24; // Optic Yellow
                    } else if (rand > 0.94) {
                        buffer[i] = 0xFF0000FF; // Deep Red (Hazard)
                    } else {
                        // Yüksek frekanslı rastgele gürültü
                        const gray = (Math.random() * 50) | 0;
                        buffer[i] = (255 << 24) | (gray << 16) | (gray << 8) | gray;
                    }
                }
                
                this.ctx.putImageData(imgData, 0, 0);
                
                if (Math.random() > 0.95) {
                    Kernel.log(`Paradoks Enjeksiyonu: AI_DETECTION_TIMEOUT [Hücre 02]`, "optic");
                }
            }
        };

        window.onload = () => {
            Kernel.init();
            const c = document.getElementById('optic-canvas');
            c.width = c.offsetWidth / 2;
            c.height = c.offsetHeight / 2;
        };
    </script>
</body>
</html>
