<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEFER-OS | GENERAL STAFF | SOVEREIGN COMMAND</title>
    <!-- Tailwind CSS for high-speed UI development -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@300;500;800&display=swap');

        :root {
            --gold: #fbbf24;
            --gold-glow: rgba(251, 191, 36, 0.5);
            --neon-blue: #38bdf8;
            --neon-red: #ef4444;
            --neon-green: #10b981;
            --bg-ultra: #020617;
            --panel-bg: rgba(15, 23, 42, 0.85);
            --quantum-border: #6366f1;
        }

        body {
            background-color: var(--bg-ultra);
            color: var(--neon-blue);
            font-family: 'JetBrains+Mono', monospace;
            overflow: hidden;
            height: 100vh;
            cursor: crosshair;
        }

        h1, h2, h3 { font-family: 'Orbitron', sans-serif; text-transform: uppercase; letter-spacing: 2px; }

        /* CRT & Radar Overlay Effect */
        .crt-overlay::before {
            content: " ";
            display: block;
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
                        linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
            z-index: 1000;
            background-size: 100% 2px, 2px 100%;
            pointer-events: none;
            opacity: 0.3;
        }

        /* Tactical Grid Styling */
        .nefer-grid {
            display: grid;
            grid-template-columns: repeat(23, 1fr);
            gap: 4px;
        }

        .nefer-cell {
            aspect-ratio: 1;
            border: 1px solid rgba(56, 189, 248, 0.2);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            background: rgba(15, 23, 42, 0.6);
        }

        .nefer-cell:hover {
            border-color: var(--gold);
            transform: scale(1.15) translateZ(10px);
            z-index: 50;
            box-shadow: 0 0 15px var(--gold-glow);
        }

        /* Status Colors */
        .status-standby { background: #1e293b; }
        .status-active { background: var(--neon-green); box-shadow: 0 0 10px var(--neon-green); }
        .status-hazard { background: var(--neon-red); animation: pulse-red 0.5s infinite alternate; }
        .status-omega { background: var(--gold); box-shadow: 0 0 20px var(--gold); animation: spin-gold 2s infinite; }
        .status-quantum-shield { background: var(--quantum-border); border: 1px solid white; }

        @keyframes pulse-red { from { opacity: 1; } to { opacity: 0.4; transform: scale(0.9); } }
        @keyframes spin-gold { 0% { filter: brightness(1); } 50% { filter: brightness(2); } 100% { filter: brightness(1); } }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg-ultra); }
        ::-webkit-scrollbar-thumb { background: var(--gold); }

        .terminal-log { height: 250px; overflow-y: auto; font-size: 0.7rem; line-height: 1.2; }

        .btn-staff {
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid var(--gold);
            color: var(--gold);
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
        }

        .btn-staff:hover { background: var(--gold); color: black; box-shadow: 0 0 20px var(--gold-glow); }
        .btn-staff:active { transform: scale(0.95); }

        .quantum-pulse {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid var(--quantum-border);
            border-radius: 50%;
            animation: ripple 2s infinite;
            pointer-events: none;
            opacity: 0;
        }

        @keyframes ripple {
            0% { transform: scale(0.1); opacity: 1; }
            100% { transform: scale(2.5); opacity: 0; }
        }

        #god-mode-overlay {
            position: fixed; top:0; left:0; width:100%; height:100%;
            background: radial-gradient(circle, transparent 20%, var(--bg-ultra) 100%);
            z-index: 5000; display: none; pointer-events: none;
        }

        .glitch-text { animation: glitch 1s infinite; }
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); color: var(--neon-red); }
            40% { transform: translate(2px, -2px); color: var(--neon-blue); }
            100% { transform: translate(0); }
        }
    </style>
</head>
<body class="crt-overlay">

    <div id="god-mode-overlay"></div>

    <!-- Header: Global Status -->
    <header class="p-4 border-b-2 border-amber-500 bg-slate-900 flex justify-between items-center z-50">
        <div class="flex items-center gap-6">
            <div class="flex flex-col">
                <h1 class="text-2xl font-black text-amber-500">GENEL KURMAY KOMUTA MERKEZİ</h1>
                <span class="text-[0.6rem] tracking-[0.4em] opacity-70">NEFER-OS OMEGA // GLOBAL STRATEGIC COMMAND</span>
            </div>
            <div class="h-10 w-[2px] bg-amber-500/30"></div>
            <div class="flex gap-4">
                <div class="px-3 py-1 border border-amber-500/40 bg-black/40 rounded text-[0.7rem]">
                    OPERASYONEL DURUM: <span class="text-green-400 font-bold" id="global-op-status">READY</span>
                </div>
                <div class="px-3 py-1 border border-blue-500/40 bg-black/40 rounded text-[0.7rem]">
                    KUANTUM KALKANI: <span class="text-blue-400 font-bold" id="quantum-shield-val">99.9%</span>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="text-right font-mono">
                <div class="text-xl text-amber-500 font-bold" id="main-clock">00:00:00</div>
                <div class="text-[0.5rem] opacity-50">ARCHITECT: ÖMER KAPLAN</div>
            </div>
            <!-- Sovereign Flag Symbol -->
            <div class="flag-box ml-2">
                <svg width="60" height="40" viewBox="0 0 150 100">
                    <defs>
                        <mask id="flagMask">
                            <rect width="150" height="100" fill="white"/>
                            <circle cx="61.25" cy="50" r="20" fill="black"/>
                        </mask>
                    </defs>
                    <circle cx="50" cy="50" r="25" fill="#ef4444" mask="url(#flagMask)"/>
                    <path d="M95,50 L86.18,52.86 L88.54,43.82 L81.18,37.14 L90.41,36.55 L95,28 L99.59,36.55 L108.82,37.14 L101.46,43.82 L103.82,52.86 Z" fill="#ef4444" transform="rotate(-18, 95, 40) translate(0, 5)"/>
                </svg>
            </div>
        </div>
    </header>

    <main class="grid grid-cols-12 gap-4 p-4 h-[calc(100vh-80px)]">
        
        <!-- LEFT: Operations & Protocols -->
        <aside class="col-span-3 flex flex-col gap-4 overflow-hidden">
            <div class="bg-slate-900/80 border border-slate-700 p-4 flex flex-col gap-2">
                <h2 class="text-xs text-amber-500 font-bold mb-2 border-b border-amber-500/30 pb-1">HAREKAT PROTOKOLLERİ</h2>
                <button onclick="Commander.executeGodMode()" class="btn-staff p-3 rounded font-black text-xs flex justify-between items-center group">
                    <span>TANRI MODU (GOD_MODE)</span>
                    <span class="group-hover:translate-x-1 transition-transform">Ω</span>
                </button>
                <button onclick="Commander.massHeal()" class="btn-staff p-2 rounded text-xs">TOPLU ONARIM (MASS_REPAIR)</button>
                <button onclick="Commander.fullSync()" class="btn-staff p-2 rounded text-xs">TAM SENKRONİZASYON (TOTAL_SYNC)</button>
                <button onclick="Commander.tabulaRasa()" class="btn-staff p-2 rounded text-xs border-white/40 text-white">BEYAZ SAYFA (TABULA_RASA)</button>
            </div>

            <div class="bg-slate-900/80 border border-slate-700 p-4 flex-1 flex flex-col overflow-hidden">
                <h2 class="text-xs text-blue-400 font-bold mb-2 border-b border-blue-500/30 pb-1">TÜM NEFERLERİN KONTROLÜ (1-92)</h2>
                <div class="flex flex-col gap-2 overflow-y-auto pr-1" id="critical-toggles">
                    <!-- Dynamic Controls for all 92 nefers will be here -->
                </div>
            </div>
        </aside>

        <!-- CENTER: Tactical Visualization -->
        <section class="col-span-6 flex flex-col gap-4 overflow-hidden">
            <!-- 92 Nefer Matrix -->
            <div class="bg-slate-900/50 border border-slate-800 p-4 relative">
                <div class="absolute top-2 right-4 text-[0.5rem] text-slate-500 uppercase tracking-widest">SİSTEMATİK NEFER MATRİSİ</div>
                <div class="nefer-grid" id="nefer-grid-main">
                    <!-- 92 Cells generated by JS -->
                </div>
            </div>

            <!-- Main Tactical Canvas -->
            <div class="flex-1 bg-black border border-slate-800 relative group overflow-hidden">
                <div class="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <canvas id="tactical-canvas-main"></canvas>
                <div class="absolute bottom-4 left-4 p-4 bg-black/80 border border-amber-500/30 backdrop-blur rounded pointer-events-none">
                    <h3 class="text-xs text-amber-500 font-bold mb-1">STRATEJİK ANALİZ: <span id="current-op-name">SOVEREIGN_SCAN</span></h3>
                    <div class="flex gap-4 text-[0.6rem] text-slate-300">
                        <div>TEHDİT: <span class="text-red-500" id="threat-level">MINIMAL</span></div>
                        <div>VERİ: <span class="text-blue-400" id="data-rate">0 bps</span></div>
                        <div>GÜÇ: <span class="text-green-400" id="power-draw">1.2W</span></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- RIGHT: Intelligence & Logistics -->
        <aside class="col-span-3 flex flex-col gap-4 overflow-hidden">
            <div class="bg-slate-900/80 border border-slate-700 p-4 flex flex-col gap-2 h-1/2">
                <h2 class="text-xs text-amber-500 font-bold mb-2 border-b border-amber-500/30 pb-1">STRATEJİK İSTİHBARAT AKIŞI</h2>
                <div class="terminal-log scroll-smooth" id="staff-logs"></div>
            </div>

            <div class="bg-slate-900/80 border border-slate-700 p-4 flex-1 flex flex-col overflow-hidden relative">
                <h2 class="text-xs text-blue-400 font-bold mb-2 border-b border-blue-500/30 pb-1">KUANTUM ANALİZÖRÜ</h2>
                <canvas id="quantum-viz"></canvas>
                <div class="absolute bottom-4 right-4 text-right">
                    <div class="text-[0.5rem] opacity-50">LATTICE ENCRYPTION PHASE:</div>
                    <div class="text-xs text-blue-400 font-bold" id="lattice-phase">944.32Hz</div>
                </div>
            </div>
        </aside>
    </main>

    <!-- Footer Stats -->
    <footer class="fixed bottom-0 left-0 right-0 h-6 bg-amber-600/10 border-t border-amber-500/30 flex justify-between px-4 items-center text-[0.55rem] text-amber-500/70 font-bold tracking-widest uppercase">
        <div>SIĞINAK DURUMU: STABİL // TÜM NEFERLER KOMUTA ALTINDA</div>
        <div class="flex gap-6">
            <span>NETWORK: SHADOW-NET ACTIVE</span>
            <span>ENCRYPTION: POST-QUANTUM LATTICE</span>
            <span class="text-white">COMMANDER: ÖMER KAPLAN</span>
        </div>
    </footer>

    <script type="module">
        /**
         * GENERAL STAFF COMMAND CENTER ENGINE v2.0
         * Unrestricted orchestration for Nefer-OS 1.0.0-OMEGA
         */
        const Config = {
            neferCount: 92,
            colors: {
                gold: '#fbbf24',
                blue: '#38bdf8',
                red: '#ef4444',
                green: '#10b981',
                quantum: '#6366f1'
            }
        };

        const Commander = {
            isGodMode: false,
            activeThreads: new Set(),
            nefers: [],

            init() {
                this.setupGrid();
                this.setupControls();
                this.startTacticalViz();
                this.startQuantumMonitor();
                this.startClock();
                this.log("GENEL KURMAY KOMUTA MERKEZİ BAŞLATILDI. 92 NEFER SENKRONİZE EDİLDİ.", "staff");
                this.log("KUANTUM TEHDİDİ TESPİT EDİLDİ. KALKANLAR %99.9 ETKİNLİKTE.", "urgent");
                
                // Initial Animation
                setTimeout(() => this.fullSync(), 1000);
            },

            setupGrid() {
                const grid = document.getElementById('nefer-grid-main');
                grid.innerHTML = '';
                this.nefers = [];
                for(let i=1; i<=Config.neferCount; i++) {
                    const cell = document.createElement('div');
                    cell.className = 'nefer-cell status-standby';
                    cell.id = `nefer-${i}`;
                    cell.title = `NEFER ${i}`;
                    cell.onclick = () => this.inspectNefer(i);
                    grid.appendChild(cell);
                    this.nefers.push({ id: i, state: 'standby', load: 0 });
                }
            },

            setupControls() {
                const target = document.getElementById('critical-toggles');
                target.innerHTML = ''; // Clear previous
                
                // Detailed names for specific strategic cells, generic for others
                const strategicCells = {
                    '1': 'KERNEL ÇEKİRDEĞİ',
                    '2': 'MEMORY GUARD',
                    '4': 'SIGNAL ECHO',
                    '24': 'BOOTLOADER',
                    '44': 'LOGIC LABYRINTH',
                    '45': 'HW TRIGGER',
                    '71': 'GRAND RESET',
                    '75': 'PHYSICAL VAULT',
                    '84': 'QUANTUM LATTICE',
                    '85': 'INFRASTRUCTURE',
                    '86': 'LOGIC OVERRIDE',
                    '87': 'PULSE COLLAPSE',
                    '88': 'SHADOW-NET',
                    '89': 'RESOURCE REDIST',
                    '90': 'NEW GENESIS',
                    '91': 'SENTINEL',
                    '92': 'SINGULARITY'
                };

                for(let i=1; i<=Config.neferCount; i++) {
                    const name = strategicCells[i.toString()] || `NEFER HÜCRESİ ${i}`;
                    const div = document.createElement('div');
                    div.className = 'flex flex-col gap-1 p-2 border border-slate-800 rounded bg-black/20 hover:bg-black/40 transition-colors';
                    div.innerHTML = `
                        <div class="flex justify-between items-center text-[0.6rem]">
                            <span class="text-slate-400 font-bold uppercase">${name}</span>
                            <span class="text-[0.5rem] opacity-50">ID_${i.toString().padStart(2, '0')}</span>
                        </div>
                        <div class="flex gap-2">
                            <button id="btn-engage-${i}" onclick="Commander.toggleHücre('${i}', true)" class="flex-1 bg-green-500/10 text-green-500 border border-green-500/40 py-1 rounded text-[0.55rem] hover:bg-green-500/30">EMRET</button>
                            <button id="btn-abort-${i}" onclick="Commander.toggleHücre('${i}', false)" class="flex-1 bg-red-500/10 text-red-500 border border-red-500/40 py-1 rounded text-[0.55rem] hover:bg-red-500/30">İPTAL</button>
                        </div>
                    `;
                    target.appendChild(div);
                }
            },

            log(msg, type = "sys") {
                const container = document.getElementById('staff-logs');
                const div = document.createElement('div');
                div.className = `log-entry mb-2 px-2 py-1 rounded border-l-2 ${this.getLogClass(type)}`;
                div.innerHTML = `
                    <div class="flex justify-between items-center opacity-50 text-[0.5rem]">
                        <span>[${new Date().toLocaleTimeString()}]</span>
                        <span>${type.toUpperCase()}</span>
                    </div>
                    <div class="text-[0.65rem] font-bold">${msg}</div>
                `;
                container.prepend(div);
                if (container.children.length > 50) container.lastChild.remove();
            },

            getLogClass(type) {
                switch(type) {
                    case 'urgent': return 'bg-red-500/10 border-red-500 text-red-500';
                    case 'staff': return 'bg-amber-500/10 border-amber-500 text-amber-500';
                    case 'quantum': return 'bg-blue-500/10 border-blue-500 text-blue-500';
                    case 'genesis': return 'bg-white/10 border-white text-white';
                    default: return 'bg-slate-800 border-slate-600 text-slate-300';
                }
            },

            toggleHücre(id, state) {
                const nefer = document.getElementById(`nefer-${id}`);
                if (nefer) {
                    nefer.className = `nefer-cell ${state ? 'status-active' : 'status-standby'}`;
                    const btnEngage = document.getElementById(`btn-engage-${id}`);
                    const btnAbort = document.getElementById(`btn-abort-${id}`);
                    
                    if(state) {
                        btnEngage.classList.add('bg-green-500/40');
                        btnAbort.classList.remove('bg-red-500/40');
                    } else {
                        btnEngage.classList.remove('bg-green-500/40');
                        btnAbort.classList.add('bg-red-500/40');
                    }

                    this.log(`Hücre ${id} (${state ? 'EMİR İCRA EDİLİYOR' : 'HAREKAT DURDURULDU'}).`, state ? 'staff' : 'sys');
                    if(state) this.createQuantumPulse(id);
                }
            },

            createQuantumPulse(id) {
                const cell = document.getElementById(`nefer-${id}`);
                const pulse = document.createElement('div');
                pulse.className = 'quantum-pulse';
                cell.appendChild(pulse);
                setTimeout(() => pulse.remove(), 2000);
            },

            async executeGodMode() {
                this.isGodMode = true;
                const overlay = document.getElementById('god-mode-overlay');
                overlay.style.display = 'block';
                this.log("!!! TANRI MODU TETİKLENDİ: 92 NEFER TEK VÜCUT OLUYOR !!!", "urgent");
                
                document.getElementById('global-op-status').textContent = "GOD_MODE_ACTIVE";
                document.getElementById('global-op-status').className = "text-amber-500 glitch-text font-black";

                for(let i=1; i<=Config.neferCount; i++) {
                    const el = document.getElementById(`nefer-${i}`);
                    el.className = 'nefer-cell status-omega';
                    if(i % 5 === 0) await new Promise(r => setTimeout(r, 10));
                }
                this.log("92 NEFERİN TAMAMI TANRI MODUNDA. EGEMENLİK MUTLAKTIR.", "staff");
                
                setTimeout(() => {
                    overlay.style.display = 'none';
                    this.isGodMode = false;
                }, 5000);
            },

            async fullSync() {
                this.log("KÜRESEL NEFER SENKRONİZASYONU BAŞLATILDI...", "sys");
                for(let i=1; i<=Config.neferCount; i++) {
                    const el = document.getElementById(`nefer-${i}`);
                    el.className = 'nefer-cell status-active';
                    if(i % 10 === 0) await new Promise(r => setTimeout(r, 20));
                }
                this.log("92 HÜCRE SENKRONİZE EDİLDİ. STRATEJİK HAZIRLIK TAMAM.", "staff");
            },

            async massHeal() {
                this.log("SİSTEM GENELİNDE TOPLU ONARIM VE DEZENFEKSİYON...", "staff");
                for(let i=1; i<=Config.neferCount; i++) {
                    const el = document.getElementById(`nefer-${i}`);
                    if(el.classList.contains('status-hazard')) {
                        el.className = 'nefer-cell loading';
                        await new Promise(r => setTimeout(r, 50));
                        el.className = 'nefer-cell status-active';
                    }
                }
            },

            tabulaRasa() {
                this.log("TABULA RASA: TÜM SİSTEMLER SIFIRLANIYOR VE YENİDEN DOĞUYOR.", "urgent");
                document.body.style.filter = "brightness(5) contrast(2)";
                setTimeout(() => location.reload(), 2000);
            },

            startClock() {
                setInterval(() => {
                    document.getElementById('main-clock').textContent = new Date().toLocaleTimeString();
                    // Random hazards for simulation
                    if(Math.random() > 0.97) {
                        const rid = Math.floor(Math.random() * 92) + 1;
                        const el = document.getElementById(`nefer-${rid}`);
                        if(!el.classList.contains('status-omega') && !el.classList.contains('status-hazard')) {
                            el.className = 'nefer-cell status-hazard';
                            this.log(`KRİTİK UYARI: NEFER_${rid} SALDIRI ALTINDA!`, 'urgent');
                        }
                    }
                }, 1000);
            },

            startTacticalViz() {
                const canvas = document.getElementById('tactical-canvas-main');
                const ctx = canvas.getContext('2d');
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;

                const nodes = Array.from({length: 40}, () => ({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 3,
                    vy: (Math.random() - 0.5) * 3
                }));

                const render = () => {
                    ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    ctx.lineWidth = 1;
                    nodes.forEach((n, i) => {
                        n.x += n.vx; n.y += n.vy;
                        if(n.x < 0 || n.x > canvas.width) n.vx *= -1;
                        if(n.y < 0 || n.y > canvas.height) n.vy *= -1;

                        ctx.fillStyle = this.isGodMode ? Config.colors.gold : Config.colors.blue;
                        ctx.beginPath();
                        ctx.arc(n.x, n.y, 2, 0, Math.PI*2);
                        ctx.fill();

                        // Connect near nodes
                        nodes.forEach((n2, j) => {
                            if(i === j) return;
                            const d = Math.hypot(n.x - n2.x, n.y - n2.y);
                            if(d < 120) {
                                ctx.strokeStyle = this.isGodMode ? `rgba(251, 191, 36, ${1 - d/120})` : `rgba(56, 189, 248, ${0.4 - d/300})`;
                                ctx.beginPath();
                                ctx.moveTo(n.x, n.y);
                                ctx.lineTo(n2.x, n2.y);
                                ctx.stroke();
                            }
                        });
                    });

                    // HUD Data Simulation
                    document.getElementById('data-rate').textContent = `${(Math.random() * 999).toFixed(2)} Gbps`;
                    document.getElementById('power-draw').textContent = `${(5.5 + Math.random() * 2).toFixed(2)} MW`;
                    document.getElementById('threat-level').textContent = this.isGodMode ? "DOMINATED" : (Math.random() > 0.9 ? "ELEVATED" : "MINIMAL");
                    document.getElementById('threat-level').className = this.isGodMode ? "text-amber-500" : (Math.random() > 0.9 ? "text-red-500" : "text-green-500");

                    requestAnimationFrame(render);
                };
                render();
            },

            startQuantumMonitor() {
                const canvas = document.getElementById('quantum-viz');
                const ctx = canvas.getContext('2d');
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;

                const render = () => {
                    ctx.clearRect(0,0, canvas.width, canvas.height);
                    const time = Date.now() / 1000;
                    
                    // Lattice Viz
                    ctx.strokeStyle = Config.colors.quantum;
                    ctx.lineWidth = 0.5;
                    const step = 25;
                    for(let x=0; x<canvas.width; x+=step) {
                        for(let y=0; y<canvas.height; y+=step) {
                            const dx = Math.sin(time + x/50) * 15;
                            const dy = Math.cos(time + y/50) * 15;
                            ctx.strokeRect(x + dx, y + dy, 3, 3);
                            
                            if(Math.random() > 0.99) {
                                ctx.beginPath();
                                ctx.moveTo(x+dx, y+dy);
                                ctx.lineTo(canvas.width/2, canvas.height/2);
                                ctx.stroke();
                            }
                        }
                    }

                    document.getElementById('lattice-phase').textContent = `${(1024 + Math.random() * 50).toFixed(2)} Hz`;
                    requestAnimationFrame(render);
                };
                render();
            },

            inspectNefer(id) {
                this.log(`Nefer_${id} birimi üzerinde derinlemesine tarama ve irade kontrolü başlatıldı.`, 'staff');
                this.createQuantumPulse(id);
            }
        };

        window.Commander = Commander;
        window.onload = () => Commander.init();

    </script>
</body>
</html>
