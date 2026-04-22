<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 04. HÜCRE (SIGNAL ECHO)</title>
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
            --entropy: #8b5cf6; 
            --signal: #22d3ee; /* 04. Hücre Rengi: Sinyal Mavisi */
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
            border-left: 4px solid var(--signal);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--signal); letter-spacing: 3px; font-weight: 800; }
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
        .cell.signal-active { background: var(--signal); box-shadow: 0 0 12px var(--signal); }
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
            height: 220px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            overflow: hidden;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
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
        .log-entry.optic { border-left-color: var(--optic); color: var(--optic); }
        .log-entry.entropy { border-left-color: var(--entropy); color: var(--entropy); }
        .log-entry.signal { border-left-color: var(--signal); color: var(--signal); }

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
            padding: 10px;
            font-size: 0.65rem;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .btn.active-op-optic { border-color: var(--optic); background: #451a03; color: white; }
        .btn.active-op-entropy { border-color: var(--entropy); background: #2e1065; color: white; }
        .btn.active-op-signal { border-color: var(--signal); background: #083344; color: white; }

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

        .coordinate-hud {
            position: absolute;
            bottom: 5px;
            left: 5px;
            font-size: 0.5rem;
            color: var(--signal);
            pointer-events: none;
        }
    </style>
</head>
<body>

    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // SIGNAL_ECHO</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">04. HÜCRE: SİNYAL YANKI YÜKLEMESİ VE KONUM MASKESİ</div>
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
                <div class="viz-box"><canvas id="optic-canvas"></canvas></div>
                <div class="viz-box" id="entropy-viz">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--entropy); background:rgba(0,0,0,0.8); z-index:5;">RECURSIVE_TRAP</div>
                    <svg width="100%" height="100%" id="entropy-svg"></svg>
                </div>
                <div class="viz-box" id="signal-viz">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--signal); background:rgba(0,0,0,0.8); z-index:5;">ECHO_CLOUD_GEN</div>
                    <svg width="100%" height="100%" id="signal-svg"></svg>
                    <div id="coord-hud" class="coordinate-hud">LAT: -- | LON: --</div>
                </div>
            </div>

            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" id="optic-toggle" onclick="OpticEngine.toggle()">
                <span>02: OPTIC PARALYSIS</span>
                <span id="optic-status">KAPALI</span>
            </button>

            <button class="btn" id="entropy-toggle" onclick="EntropicEngine.toggle()">
                <span>03: ENTROPIC BACKFIRE</span>
                <span id="entropy-status">KAPALI</span>
            </button>

            <button class="btn" id="signal-toggle" onclick="SignalEngine.toggle()">
                <span>04: SIGNAL ECHO OVERLOAD</span>
                <span id="signal-status">KAPALI</span>
            </button>

            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            
            <div style="margin-top: auto; font-size: 0.6rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 04: IPS ve Takip sistemlerini sahte sinyal bulutu ile manipüle eder.
            </div>
        </aside>
    </div>

    <!-- PROTOKOL FOOTER -->
    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>04. HÜCRE: SIGNAL ECHO OVERLOAD</b> - Konum Sabotajı</p>
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
                this.log("Kernel aktif. Hücre 04 (Signal Echo) hazırlandı.", "sys");
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
                this.log("Boot sekansı başlatıldı...", "sys");
                for(let i=2; i<=92; i++) {
                    if([2,3,4].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 15));
                    this.updateCell(i, "active");
                }
                this.log("Sığınak bütünlüğü onaylandı. 92 Hücre operasyonel.", "sys");
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
            createTrap() {
                const handler = {
                    get: (target, prop) => {
                        this.trapCount++;
                        if (this.active) {
                            Kernel.log(`Bot Sızıntısı: Derinlik ${this.trapCount}`, "entropy");
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
                    window.NEFER_DATA_VAULT = this.createTrap();
                    this.visualize();
                } else {
                    btn.classList.remove('active-op-entropy');
                    status.textContent = "KAPALI";
                    Kernel.updateCell(3, "active");
                    delete window.NEFER_DATA_VAULT;
                    svg.innerHTML = '';
                    this.trapCount = 0;
                }
            },
            visualize() {
                if(!this.active) return;
                const svg = document.getElementById('entropy-svg');
                const draw = (x, y, s, d) => {
                    if(d <= 0 || !this.active) return;
                    const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", s); r.setAttribute("height", s);
                    r.setAttribute("fill", "none"); r.setAttribute("stroke", "var(--entropy)");
                    r.setAttribute("stroke-width", "0.5"); r.setAttribute("opacity", d/10);
                    svg.appendChild(r);
                    setTimeout(() => draw(x + s/4, y + s/4, s/2, d - 1), 150);
                };
                draw(5, 5, 60, 8);
            }
        };

        /* --- SIGNAL ENGINE (HÜCRE 04) --- */
        const SignalEngine = {
            active: false,
            interval: null,
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('signal-toggle');
                const status = document.getElementById('signal-status');
                const svg = document.getElementById('signal-svg');
                if(this.active) {
                    btn.classList.add('active-op-signal');
                    status.textContent = "AKTİF";
                    Kernel.updateCell(4, "signal-active");
                    Kernel.log("SİNYAL YANKI YÜKLEMESİ BAŞLATILDI.", "signal");
                    this.start();
                } else {
                    btn.classList.remove('active-op-signal');
                    status.textContent = "KAPALI";
                    Kernel.updateCell(4, "active");
                    Kernel.log("Sinyal kalkanı kapatıldı.", "sys");
                    clearInterval(this.interval);
                    svg.innerHTML = '';
                    document.getElementById('coord-hud').textContent = "LAT: -- | LON: --";
                }
            },
            start() {
                this.interval = setInterval(() => {
                    this.emitEcho();
                }, 400);
            },
            emitEcho() {
                const lat = (Math.random() * 180 - 90).toFixed(6);
                const lon = (Math.random() * 360 - 180).toFixed(6);
                document.getElementById('coord-hud').textContent = `LAT: ${lat} | LON: ${lon}`;
                
                const svg = document.getElementById('signal-svg');
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", `${x}%`);
                circle.setAttribute("cy", `${y}%`);
                circle.setAttribute("r", "2");
                circle.setAttribute("fill", "var(--signal)");
                circle.setAttribute("class", "pulse");
                
                svg.appendChild(circle);
                if(svg.childNodes.length > 20) svg.removeChild(svg.firstChild);
                
                Kernel.log(`Beacon Gönderildi: Echo_Node_${Math.floor(Math.random()*9999)} @ [${lat}, ${lon}]`, "signal");
                
                // Geolocation API Mock Simülasyonu
                if(navigator.geolocation) {
                    // Bu sadece içsel bir simülasyondur, gerçek API'yi ezmek tarayıcı kısıtlamalarına takılabilir.
                    // Nefer-OS mantığında bu veri akışı bir 'Beacon' olarak sisteme enjekte edilir.
                }
            }
        };

        window.onload = () => {
            Kernel.init();
            const c = document.getElementById('optic-canvas');
            c.width = c.parentElement.offsetWidth;
            c.height = c.parentElement.offsetHeight;
        };
    </script>
</body>
</html>
