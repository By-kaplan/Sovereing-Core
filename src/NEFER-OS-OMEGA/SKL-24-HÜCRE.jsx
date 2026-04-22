<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data:; connect-src 'none';">
    <title>NEFER-OS | 1.0.0-OMEGA | 24. HÜCRE (ETERNAL BOOTLOADER)</title>
    <style>
        :root {
            --bg-deep: #020617;
            --panel-bg: #0f172a;
            --text-neon: #38bdf8;
            --text-dim: #64748b;
            --hazard: #ef4444;
            --safety: #10b981;
            --warning: #f59e0b;
            --bootloader: #fdf2f8; /* 24. Hücre Rengi: Kristal Beyaz */
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
            border-left: 4px solid var(--bootloader);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--bootloader); letter-spacing: 3px; font-weight: 800; }
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
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

        .main-display {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 15px;
            overflow: hidden;
        }

        .boot-view {
            height: 300px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        canvas { width: 100%; height: 100%; image-rendering: pixelated; }

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
        .log-entry.boot { border-left-color: var(--bootloader); color: var(--bootloader); font-weight: bold; }

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
        
        .boot-hud {
            position: absolute;
            bottom: 5px;
            left: 5px;
            font-size: 0.5rem;
            color: var(--bootloader);
            font-weight: bold;
        }
    </style>
</head>
<body>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // ETERNAL_BOOTLOADER</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">24. HÜCRE: BAĞIMSIZ BAŞLATICI VE NİHAİ MÜHÜR</div>
        </div>
        <div class="meta-info">
            <div id="clock">00:00:00</div>
            <div>ARCHITECT: ÖMER KAPLAN</div>
        </div>
    </header>

    <div class="cell-grid" id="cell-grid"></div>

    <div class="main-display">
        <div class="boot-view">
            <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--bootloader); background:rgba(0,0,0,0.8); z-index:5;">UNIVERSAL_ES6_KERNEL_SYNC</div>
            <canvas id="boot-canvas"></canvas>
            <div id="boot-hud" class="boot-hud">BOOT_STATE: SEALED | CSP: REINFORCED</div>
        </div>
        <div class="log-panel" id="sys-log"></div>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>24. HÜCRE: ETERNAL BOOTLOADER</b> - Nihai Dosya Bütünlüğü</p>
            <p>Architect: Ömer Kaplan | Organization: Kaplan Precision Dept.</p>
        </div>
        <div class="flag-box">
            <svg width="100" height="60" viewBox="0 0 150 100">
                <defs><mask id="m"><rect width="150" height="100" fill="white"/><circle cx="61.25" cy="50" r="20" fill="black"/></mask></defs>
                <circle cx="50" cy="50" r="25" fill="#ef4444" mask="url(#m)"/><path d="M95,50 L86.18,52.86 L88.54,43.82 L81.18,37.14 L90.41,36.55 L95,28 L99.59,36.55 L108.82,37.14 L101.46,43.82 L103.82,52.86 Z" fill="#ef4444" transform="rotate(-18, 95, 40) translate(0, 5)"/></svg>
        </div>
    </footer>

    <script type="module">
        /* 24. HÜCRE: ES6 MODÜL YAPISI VE ÇEKİRDEK BAĞLANTISI */
        const Kernel = {
            startTime: Date.now(),
            init() {
                this.setupGrid();
                this.updateCell(1, "active");
                this.updateCell(24, "boot-active");
                setInterval(() => { document.getElementById('clock').textContent = new Date().toLocaleTimeString(); }, 1000);
                this.log("Kernel aktif. Eternal Bootloader mühürlendi.", "boot");
                this.log("Sistem yerel dosya sisteminden (file://) çalışmaya hazır.", "boot");
                this.startBootViz();
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
            startBootViz() {
                const c = document.getElementById('boot-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;

                const draw = () => {
                    ctx.fillStyle = "rgba(2, 6, 23, 0.2)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    // Kristal çekirdek vizüalizasyonu
                    const centerX = c.width / 2;
                    const centerY = c.height / 2;
                    ctx.strokeStyle = "var(--bootloader)";
                    ctx.lineWidth = 1;
                    
                    ctx.beginPath();
                    ctx.moveTo(centerX - 50, centerY);
                    ctx.lineTo(centerX, centerY - 50);
                    ctx.lineTo(centerX + 50, centerY);
                    ctx.lineTo(centerX, centerY + 50);
                    ctx.closePath();
                    ctx.stroke();

                    // Mühür halkaları
                    for(let i=0; i<3; i++) {
                        const r = 60 + Math.sin(Date.now() / 300 + i) * 10;
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                        ctx.setLineDash([5, 15]);
                        ctx.stroke();
                    }
                    requestAnimationFrame(draw);
                };
                draw();
            }
        };

        window.onload = () => Kernel.init();
    </script>
</body>
</html>
