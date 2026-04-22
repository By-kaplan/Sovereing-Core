<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data:; connect-src 'none';">
    <title>NEFER-OS | 1.0.0-OMEGA | 36. HÜCRE (PROTOCOL HIJACK)</title>
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
            --hijack: #facc15; /* 36. Hücre Rengi: Gasp Sarısı */
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
            border-left: 4px solid var(--hijack);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--hijack); letter-spacing: 3px; font-weight: 800; }
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
        .cell.hijack-active { background: var(--hijack); box-shadow: 0 0 15px var(--hijack); animation: scan-line 2s linear infinite; }
        .cell.deadlock-active { background: var(--dead-lock); box-shadow: 0 0 15px var(--dead-lock); }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }

        @keyframes scan-line { 0% { filter: brightness(1); } 50% { filter: brightness(1.8); } 100% { filter: brightness(1); } }
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
            height: 460px;
            background: #000;
            border: 1px solid var(--border);
            position: relative;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 120px 120px 1fr;
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
        .log-entry.deadlock { border-left-color: var(--dead-lock); color: var(--dead-lock); }
        .log-entry.hijack { border-left-color: var(--hijack); color: var(--hijack); font-weight: bold; }

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
        .btn.active-op-hijack { border-color: var(--hijack); background: #854d0e; color: white; }

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
            <h1>NEFER-OS // PROTOCOL_HIJACKING</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">36. HÜCRE: PROTOKOL GASPI VE GERÇEKLİK MANİPÜLASYONU</div>
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
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--morph); z-index:5;">MUTATION_CORE</div>
                    <canvas id="morph-canvas"></canvas>
                </div>
                
                <div class="viz-box" style="grid-column: span 2;">
                    <div style="position:absolute; top:5px; left:10px; font-size:0.4rem; color:var(--hijack); z-index:5;">TRAFFIC_INTERCEPTOR_SW</div>
                    <canvas id="hijack-canvas"></canvas>
                    <div id="hijack-hud" class="hud-text" style="color: var(--hijack);">INTERCEPTED: 0 | REALITY_STATUS: DISTORTED</div>
                </div>
            </div>
            <div class="log-panel" id="sys-log"></div>
        </div>

        <aside class="tools-panel">
            <button class="btn" onclick="DeadLockEngine.toggle()">
                <span>35: ASYNC DEAD-LOCK ENCLOSURE</span>
                <span>DURUM</span>
            </button>
            <button class="btn" id="hijack-toggle" onclick="HijackEngine.toggle()">
                <span>36: PROTOCOL HIJACKING (SW)</span>
                <span id="hijack-status">KAPALI</span>
            </button>
            <button class="btn" onclick="Kernel.sequenceBoot()" style="margin-top: 10px;">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <div style="margin-top: auto; font-size: 0.55rem; color: var(--text-dim); border-top: 1px solid var(--border); padding-top: 10px;">
                HÜCRE 36: Service Worker üzerinden HTTP/S trafiğini ele geçirerek içeriği manipüle eder.
            </div>
        </aside>
    </div>

    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>36. HÜCRE: PROTOCOL HIJACKING VIA SERVICE WORKERS</b> - Gerçeklik Gaspı</p>
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
                for(let i=1; i<=36; i++) {
                    if([1, 24, 28, 29, 30, 31, 32, 33, 34, 35, 36].includes(i)) continue;
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 20));
                    this.updateCell(i, "active");
                }
            }
        };

        const HijackEngine = {
            active: false,
            loop: null,
            interceptCount: 0,
            targets: ["google.com", "update.service", "admin-panel.internal", "bank-secure.net"],
            
            toggle() {
                this.active = !this.active;
                const btn = document.getElementById('hijack-toggle');
                const hud = document.getElementById('hijack-hud');
                
                if(this.active) {
                    btn.classList.add('active-op-hijack');
                    document.getElementById('hijack-status').textContent = "GASP EDİLDİ";
                    Kernel.updateCell(36, "hijack-active");
                    Kernel.log("PROTOKOL GASPI AKTİF: SERVICE WORKER TRAFİĞİ DİNLİYOR.", "hijack");
                    this.startViz();
                } else {
                    btn.classList.remove('active-op-hijack');
                    document.getElementById('hijack-status').textContent = "KAPALI";
                    Kernel.updateCell(36, "active");
                    cancelAnimationFrame(this.loop);
                    this.interceptCount = 0;
                    hud.textContent = "INTERCEPTED: 0 | REALITY_STATUS: NORMAL";
                    Kernel.log("Protokol gaspı sonlandırıldı.", "sys");
                }
            },

            startViz() {
                const c = document.getElementById('hijack-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    
                    if(Math.random() > 0.95) {
                        this.interceptCount++;
                        const t = this.targets[Math.floor(Math.random() * this.targets.length)];
                        Kernel.log(`Gasp: ${t} isteği yakalandı. Sahte yanıt servis ediliyor.`, "hijack");
                        if(t === "update.service") Kernel.log(`Enjeksiyon: Polimorfik Yük (Op 28) güncel paket olarak gömüldü.`, "hijack");
                    }
                    
                    document.getElementById('hijack-hud').textContent = `INTERCEPTED: ${this.interceptCount} | REALITY_STATUS: DISTORTED`;

                    // Veri akışı çizgileri
                    ctx.strokeStyle = "var(--hijack)";
                    ctx.lineWidth = 1;
                    const y = (Date.now() / 10) % c.height;
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(c.width, y);
                    ctx.stroke();

                    // Paket görselleştirme
                    for(let i=0; i<5; i++) {
                        ctx.fillStyle = Math.random() > 0.5 ? "var(--hijack)" : "var(--hazard)";
                        ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 3, 3);
                    }

                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const DeadLockEngine = {
            active: false, loop: null,
            toggle() {
                this.active = !this.active;
                Kernel.updateCell(35, this.active ? "deadlock-active" : "active");
                if(this.active) this.start();
            },
            start() {
                const c = document.getElementById('deadlock-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2,6,23,0.4)";
                    ctx.fillRect(0,0,c.width,c.height);
                    ctx.strokeStyle = "var(--dead-lock)";
                    for(let i=0; i<5; i++) ctx.strokeRect(Math.random()*c.width, Math.random()*c.height, 10, 10);
                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const ShadowEngine = {
            active: false, loop: null,
            toggle() {
                this.active = !this.active;
                Kernel.updateCell(34, this.active ? "shadow-active" : "active");
                if(this.active) this.start();
            },
            start() {
                const c = document.getElementById('shadow-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2,6,23,0.4)";
                    ctx.fillRect(0,0,c.width,c.height);
                    ctx.strokeStyle = "var(--shadow-dom)";
                    const y = (Date.now()/5) % c.height;
                    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(c.width, y); ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const BombEngine = {
            active: false, loop: null, targetTime: new Date("2026-05-01T00:00:00").getTime(),
            toggle() {
                this.active = !this.active;
                Kernel.updateCell(33, this.active ? "bomb-active" : "active");
                if(this.active) this.start();
            },
            start() {
                const c = document.getElementById('bomb-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    if(!this.active) return;
                    ctx.fillStyle = "rgba(2,6,23,0.4)";
                    ctx.fillRect(0,0,c.width,c.height);
                    ctx.strokeStyle = "var(--time-bomb)";
                    ctx.beginPath(); ctx.arc(c.width/2, c.height/2, (Math.sin(Date.now()/100)*10)+30, 0, Math.PI*2); ctx.stroke();
                    this.loop = requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const HeapEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('heap-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                    ctx.fillRect(0, 0, c.width, c.height);
                    for(let i=0; i<15; i++) {
                        ctx.fillStyle = "rgba(30, 41, 59, 0.5)";
                        ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 10, 10);
                    }
                    requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const NeuralEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('neural-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.2)";
                    ctx.fillRect(0,0,c.width,c.height);
                    for(let i=0; i<100; i++) {
                        ctx.fillStyle = "rgba(192, 132, 252, 0.2)";
                        ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 1, 1);
                    }
                    requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const DNSEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('dns-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.2)";
                    ctx.fillRect(0,0,c.width,c.height);
                    ctx.fillStyle = "var(--dns-exfil)";
                    ctx.beginPath();
                    ctx.arc(Math.random()*c.width, c.height - (Date.now()/20 % c.height), 2, 0, Math.PI*2);
                    ctx.fill();
                    requestAnimationFrame(draw);
                };
                draw();
            }
        };

        const WSEngine = {
            active: false, loop: null,
            start() {
                const c = document.getElementById('ws-canvas');
                const ctx = c.getContext('2d');
                c.width = c.offsetWidth; c.height = c.offsetHeight;
                const draw = () => {
                    ctx.fillStyle = "rgba(2,6,23,0.2)";
                    ctx.fillRect(0,0,c.width,c.height);
                    ctx.strokeStyle = "var(--ws-flood)";
                    ctx.beginPath();
                    ctx.moveTo(Math.random()*c.width, 0); ctx.lineTo(Math.random()*c.width, c.height);
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
                    this.gen++;
                    const hash = "0x" + Math.random().toString(16).slice(2, 10).toUpperCase();
                    requestAnimationFrame(draw);
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

        window.DNSEngine = DNSEngine;
        window.WSEngine = WSEngine;
        window.MorphEngine = MorphEngine;
        window.NeuralEngine = NeuralEngine;
        window.HeapEngine = HeapEngine;
        window.BombEngine = BombEngine;
        window.ShadowEngine = ShadowEngine;
        window.DeadLockEngine = DeadLockEngine;
        window.HijackEngine = HijackEngine;
        window.Kernel = Kernel;
        window.onload = () => {
            Kernel.init();
            JitterEngine.start();
            DNSEngine.start();
            WSEngine.start();
            NeuralEngine.start();
            MorphEngine.start();
            HeapEngine.start();
        };
    </script>
</body>
</html>
