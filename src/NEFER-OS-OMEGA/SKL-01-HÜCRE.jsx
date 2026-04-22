<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | 1.0.0-OMEGA | 01. HÜCRE (KERNEL)</title>
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

        /* --- HEADER: KOMUTA MERKEZİ --- */
        .nefer-header {
            border: 1px solid var(--border);
            background: rgba(15, 23, 42, 0.9);
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-left: 4px solid var(--hazard);
        }

        .nefer-header h1 { font-size: 1.2rem; color: var(--hazard); letter-spacing: 3px; font-weight: 800; }
        .meta-info { font-size: 0.7rem; color: var(--text-dim); text-align: right; }

        /* --- 92-HÜCRELİ MATRİS GÖRSELLEŞTİRME --- */
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
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cell.active { background: var(--safety); box-shadow: 0 0 8px var(--safety); }
        .cell.loading { background: var(--warning); animation: pulse 1s infinite; }
        .cell.error { background: var(--hazard); }

        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

        /* --- ANA KONSOL (LOG SİSTEMİ) --- */
        .console-container {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 15px;
            overflow: hidden;
        }

        .main-log {
            background: var(--panel-bg);
            border: 1px solid var(--border);
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .log-entry { font-size: 0.75rem; border-left: 2px solid transparent; padding-left: 8px; line-height: 1.4; }
        .log-entry.kern { border-left-color: var(--text-neon); color: var(--text-neon); }
        .log-entry.sys { border-left-color: var(--warning); color: var(--warning); }
        .log-entry.data { border-left-color: var(--safety); color: var(--safety); }

        /* --- KONTROL VE DURUM PANELİ --- */
        .tools-panel {
            background: var(--panel-bg);
            border: 1px solid var(--border);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .stat-card {
            background: #020617;
            border: 1px solid var(--border);
            padding: 12px;
        }

        .stat-label { font-size: 0.6rem; color: var(--text-dim); text-transform: uppercase; margin-bottom: 4px; }
        .stat-value { font-size: 0.9rem; color: var(--safety); font-weight: bold; }

        .btn {
            background: #1e293b;
            border: 1px solid var(--border);
            color: var(--text-neon);
            padding: 12px;
            font-size: 0.7rem;
            font-weight: bold;
            text-align: left;
            transition: 0.2s;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
        }

        .btn:hover { background: var(--border); border-color: var(--text-neon); }

        /* --- PROTOKOL VE AY YILDIZ FOOTER --- */
        .protocol-footer {
            background: #020617;
            padding: 20px;
            border: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .attribution { font-size: 0.7rem; color: var(--text-dim); line-height: 1.4; }
        .attribution b { color: var(--hazard); }

        .flag-box { opacity: 0.7; }
    </style>
</head>
<body>

    <!-- NEFER-OS HEADER -->
    <header class="nefer-header">
        <div>
            <h1>NEFER-OS // OMEGA</h1>
            <div style="font-size: 0.6rem; color: var(--text-dim);">STRATEJİK SIĞINAK MİMARİSİ: 92 HÜCRE</div>
        </div>
        <div class="meta-info">
            <div id="clock">00:00:00</div>
            <div>ARCHITECT: ÖMER KAPLAN</div>
        </div>
    </header>

    <!-- 92 HÜCRELİ MATRİS (GRID) -->
    <div class="cell-grid" id="cell-grid"></div>

    <!-- ANA KONSOL -->
    <div class="console-container">
        <div class="main-log" id="sys-log">
            <!-- Sistem logları Kernel tarafından buraya enjekte edilir -->
        </div>

        <aside class="tools-panel">
            <div class="stat-card">
                <div class="stat-label">SİSTEM UPTIME</div>
                <div class="stat-value" id="uptime">0s</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">AKTİF HÜCRELER</div>
                <div class="stat-value" id="active-count">0 / 92</div>
            </div>

            <button class="btn" onclick="Kernel.sequenceBoot()">
                <span>SIRALI ÖNYÜKLEME (BOOT)</span>
                <span>▶</span>
            </button>
            <button class="btn" onclick="location.reload()">
                <span>SİSTEMİ YENİDEN BAŞLAT</span>
                <span>↻</span>
            </button>
            
            <div style="margin-top: auto; font-size: 0.6rem; color: var(--text-dim); border-top: 1px solid var(--border); pt: 10px;">
                MODÜL: 01. HÜCRE (KERNEL)<br>
                GÖREV: YAŞAM DÖNGÜSÜ YÖNETİMİ
            </div>
        </aside>
    </div>

    <!-- PROTOKOL FOOTER -->
    <footer class="protocol-footer">
        <div class="attribution">
            <p><b>01. HÜCRE: KERNEL</b> - Otonom Yaşam Döngüsü ve Olay Yönetimi</p>
            <p>Architect: Ömer Kaplan | Organization: Kaplan Precision Dept.</p>
            <p>Bu modül MIT Lisansı altındadır. "Kod Hakikattir."</p>
        </div>

        <div class="flag-box">
            <!-- PROTOKOL: MATEMATİKSEL AY YILDIZ (G=100) -->
            <svg width="120" height="80" viewBox="0 0 150 100">
                <defs>
                    <mask id="flagMask">
                        <rect width="150" height="100" fill="white" />
                        <circle cx="61.25" cy="50" r="20" fill="black" />
                    </mask>
                </defs>
                <circle cx="50" cy="50" r="25" fill="#ef4444" mask="url(#flagMask)" />
                <path d="M95,50 L86.18,52.86 L88.54,43.82 L81.18,37.14 L90.41,36.55 L95,28 L99.59,36.55 L108.82,37.14 L101.46,43.82 L103.82,52.86 Z" 
                      fill="#ef4444" transform="rotate(-18, 95, 40) translate(0, 5)" />
            </svg>
        </div>
    </footer>

    <script>
        /**
         * NEFER-OS: HÜCRE 01 - KERNEL (ÇEKİRDEK)
         * Görev: Sistem yaşam döngüsü, hücre kaydı, olay yönetimi (Event Bus).
         * 0 Bağımlılık (Zero-Dependency) Protokolü.
         */

        const Kernel = {
            startTime: Date.now(),
            cellRegistry: new Map(),
            
            init() {
                this.setupGrid();
                this.startClock();
                this.log("Kernel (Hücre 01) seviye 0 başlatıldı.", "kern");
                
                // Hücre 01 Aktivasyonu
                this.updateCell(1, "active", "CORE_KERNEL");
                
                // Kalp Atışı (Heartbeat)
                setInterval(() => this.heartbeat(), 1000);
            },

            // Olay Yönetimi (Event Bus)
            dispatch(event, detail) {
                window.dispatchEvent(new CustomEvent(`nefer:${event}`, { detail }));
            },

            listen(event, callback) {
                window.addEventListener(`nefer:${event}`, (e) => callback(e.detail));
            },

            // Loglama Sistemi
            log(msg, type = "sys") {
                const logEl = document.getElementById('sys-log');
                const entry = document.createElement('div');
                const time = new Date().toLocaleTimeString();
                entry.className = `log-entry ${type}`;
                entry.textContent = `[${time}] ${msg}`;
                logEl.appendChild(entry);
                logEl.scrollTop = logEl.scrollHeight;
            },

            // 92 Hücrelik Izgaranın İnşası
            setupGrid() {
                const grid = document.getElementById('cell-grid');
                grid.innerHTML = '';
                for(let i = 1; i <= 92; i++) {
                    const div = document.createElement('div');
                    div.className = 'cell';
                    div.id = `cell-${i}`;
                    div.title = `Hücre ${i}`;
                    grid.appendChild(div);
                }
            },

            // Hücre Durum Güncelleme
            updateCell(id, status, name = "") {
                const el = document.getElementById(`cell-${id}`);
                if(el) {
                    el.className = `cell ${status}`;
                    this.cellRegistry.set(id, { status, name });
                    this.refreshStats();
                }
            },

            refreshStats() {
                const active = Array.from(this.cellRegistry.values()).filter(v => v.status === 'active').length;
                document.getElementById('active-count').textContent = `${active} / 92`;
            },

            heartbeat() {
                const uptime = Math.floor((Date.now() - this.startTime) / 1000);
                document.getElementById('uptime').textContent = `${uptime}s`;
            },

            startClock() {
                setInterval(() => {
                    document.getElementById('clock').textContent = new Date().toLocaleTimeString();
                }, 1000);
            },

            // Boot Sequencer: Sıralı Hücre Aktivasyonu
            async sequenceBoot() {
                this.log("Sıralı önyükleme sekansı başlatıldı...", "kern");
                for(let i = 2; i <= 92; i++) {
                    this.updateCell(i, "loading");
                    await new Promise(r => setTimeout(r, 40));
                    this.updateCell(i, "active");
                }
                this.log("92 Hücre senkronize. Sığınak tam kapasite hazır.", "data");
            }
        };

        // Sistem Ateşleme
        window.onload = () => Kernel.init();
    </script>
</body>
</html>
