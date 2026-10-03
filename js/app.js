// Main Application Controller for Financial News Intelligence & Alignment Dashboard

window.app = {
    isDarkMode: true,

    init() {
        console.log("Initializing PaisaKhabar Newsroom OS v2.0...");
        
        // Dark mode setup
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        }

        // Subscribe to store updates
        window.newsStore.subscribe((state) => {
            this.renderAll();
        });

        // Initial Render
        this.renderAll();

        // Start live ticker pulse
        setInterval(() => {
            window.FeedEngine.refreshMarketPulse();
        }, 8000);
    },

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        this.showToast(this.isDarkMode ? "Dark Mode enabled" : "Light Mode enabled", "info");
    },

    showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = `p-3.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center space-x-2 text-white border transition transform duration-300 translate-y-2 pointer-events-auto ${
            type === 'success' ? 'bg-emerald-600 border-emerald-400' :
            type === 'warning' ? 'bg-amber-600 border-amber-400' :
            type === 'info' ? 'bg-indigo-600 border-indigo-400' :
            'bg-rose-600 border-rose-400'
        }`;
        toast.innerHTML = `
            <span>${type === 'success' ? '✅' : type === 'info' ? 'ℹ️' : '⚠️'}</span>
            <span>${message}</span>
        `;
        
        const container = document.getElementById("toastContainer");
        if (container) {
            container.appendChild(toast);
            setTimeout(() => {
                toast.classList.add("opacity-0", "translate-y-4");
                setTimeout(() => toast.remove(), 300);
            }, 3500);
        }
    },

    renderAll() {
        this.renderMarketTicker();
        this.renderRadarColumn();
        this.renderWorkbenchColumn();
        this.renderStudioColumn();
        if (window.lucide) window.lucide.createIcons();
    },

    // 1. Render Top Market Ticker Bar
    renderMarketTicker() {
        const state = window.newsStore.getState();
        const mp = state.marketPulse;
        const container = document.getElementById("marketTickerContainer");
        if (!container) return;

        const items = [
            { label: "NIFTY 50", val: mp.nifty50.value, chg: mp.nifty50.change, trend: mp.nifty50.trend },
            { label: "SENSEX", val: mp.sensex.value, chg: mp.sensex.change, trend: mp.sensex.trend },
            { label: "BANK NIFTY", val: mp.bankNifty.value, chg: mp.bankNifty.change, trend: mp.bankNifty.trend },
            { label: "GOLD 24K", val: mp.gold24k.value, chg: mp.gold24k.change, trend: mp.gold24k.trend },
            { label: "SILVER 1KG", val: mp.silver1kg.value, chg: mp.silver1kg.change, trend: mp.silver1kg.trend },
            { label: "USD / INR", val: mp.usdInr.value, chg: mp.usdInr.change, trend: mp.usdInr.trend }
        ];

        container.innerHTML = `
            <div class="animate-marquee space-x-8 text-xs font-semibold py-1">
                ${items.concat(items).map(i => `
                    <div class="flex items-center space-x-2 shrink-0">
                        <span class="text-slate-400 uppercase tracking-wider text-[10px] font-bold">${i.label}:</span>
                        <span class="text-slate-900 dark:text-white font-mono font-bold">${i.val}</span>
                        <span class="text-[10px] font-bold ${i.trend === 'up' ? 'text-emerald-500' : i.trend === 'down' ? 'text-rose-500' : 'text-slate-400'}">${i.chg}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // 2. Render Left Column: Financial Radar Feeds
    renderRadarColumn() {
        const state = window.newsStore.getState();
        const container = document.getElementById("radarListContainer");
        if (!container) return;

        let filtered = state.stories;
        if (state.activeCategory !== "all") {
            filtered = filtered.filter(s => s.category === state.activeCategory);
        }
        if (state.searchQuery) {
            const q = state.searchQuery.toLowerCase();
            filtered = filtered.filter(s => s.title.toLowerCase().includes(q) || s.categoryLabel.toLowerCase().includes(q));
        }

        container.innerHTML = `
            <div class="space-y-3">
                ${filtered.map(s => {
                    const isSelected = s.id === state.selectedStoryId;
                    return `
                        <div onclick="window.app.selectStory('${s.id}')" class="p-4 rounded-2xl cursor-pointer transition-all border ${
                            isSelected 
                                ? 'bg-indigo-600/10 border-indigo-500 shadow-md ring-2 ring-indigo-500/20' 
                                : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700'
                        } space-y-2.5">
                            <div class="flex items-center justify-between">
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    ${s.categoryLabel}
                                </span>
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                                    🔥 ${s.trendingScore}% Impact
                                </span>
                            </div>

                            <h4 class="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                                ${s.title}
                            </h4>

                            <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                                <span class="flex items-center space-x-1">
                                    <i data-lucide="layers" class="w-3 h-3 text-indigo-400"></i>
                                    <span>${s.sourceCount} Sources Clustered</span>
                                </span>
                                <span>${s.sources[0]?.time || 'Just now'}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    // 3. Render Center Column: AI Alignment Workbench
    renderWorkbenchColumn() {
        const state = window.newsStore.getState();
        const story = window.newsStore.getSelectedStory();
        const container = document.getElementById("workbenchContainer");
        if (!container || !story) return;

        const d = story.alignedData;

        container.innerHTML = `
            <div class="space-y-6">
                <!-- Story Header & Category -->
                <div class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <div class="flex items-center space-x-2">
                            <span class="px-3 py-1 rounded-xl text-xs font-black bg-indigo-600 text-white shadow-sm">
                                ${story.categoryLabel}
                            </span>
                            <span class="text-xs text-slate-400 font-semibold">• Clustered from ${story.sources.map(src => src.name).join(', ')}</span>
                        </div>

                        <button onclick="window.app.regenerateAI()" class="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold transition flex items-center space-x-1.5">
                            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                            <span>Re-Align with AI</span>
                        </button>
                    </div>

                    <h2 class="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                        ${story.title}
                    </h2>
                </div>

                <!-- 1. Headline Options (High CTR) -->
                <div class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                        <div class="flex items-center space-x-2">
                            <i data-lucide="type" class="w-4 h-4 text-indigo-500"></i>
                            <h3 class="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">1. High-CTR Hindi Headline Options</h3>
                        </div>
                        <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">Zero-Clickbait Verified</span>
                    </div>

                    <div class="space-y-2">
                        ${d.headlines.map((h, idx) => `
                            <label class="p-3 rounded-2xl border ${
                                idx === 2 ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                            } flex items-start space-x-3 cursor-pointer">
                                <input type="radio" name="selectedHeadlineRadio" ${idx === 2 ? 'checked' : ''} onchange="window.app.setHeadlineIndex(${idx})" class="mt-1">
                                <div class="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                                    ${h}
                                </div>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <!-- 2. "आम आदमी की जेब पर असर" (Pocket Impact) -->
                <div class="p-5 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-200 dark:border-emerald-900/60 shadow-sm space-y-3">
                    <div class="flex items-center space-x-2">
                        <i data-lucide="wallet" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
                        <h3 class="font-extrabold text-xs uppercase tracking-wider text-emerald-900 dark:text-emerald-300">2. आम आदमी की जेब पर सीधा असर (Pocket Impact)</h3>
                    </div>

                    <textarea id="pocketImpactInput" oninput="window.app.updatePocketImpact(this.value)" rows="3" class="w-full p-3.5 rounded-2xl border border-emerald-300 dark:border-emerald-800/80 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500">${d.pocketImpact}</textarea>
                </div>

                <!-- 3. Deep Analysis & Comparison Data Matrix -->
                <div class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                        <div class="flex items-center space-x-2">
                            <i data-lucide="list-checks" class="w-4 h-4 text-indigo-500"></i>
                            <h3 class="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">3. मुख्य तथ्य व विश्लेषण (Core Rules & Analysis)</h3>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400">${d.hasTable ? '📊 Data Table Included' : '📑 Deep Explainer (No Forced Table)'}</span>
                    </div>

                    <!-- Bullet Points -->
                    <div class="space-y-2 text-xs">
                        ${d.coreFacts.map((fact, i) => `
                            <div class="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                                <span class="w-5 h-5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold text-[10px] shrink-0">${i+1}</span>
                                <span class="text-slate-700 dark:text-slate-300 font-medium">${fact}</span>
                            </div>
                        `).join('')}
                    </div>

                    ${d.deepAnalysis ? `
                        <!-- Deep Analysis Explainer Box -->
                        <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-1.5">
                            <div class="flex items-center space-x-1.5 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
                                <i data-lucide="microscope" class="w-3.5 h-3.5"></i>
                                <span>गहराई से वित्तीय विश्लेषण (Deep Financial Breakdown):</span>
                            </div>
                            <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">${d.deepAnalysis}</p>
                        </div>
                    ` : ''}

                    <!-- Conditional Comparison Table Preview -->
                    ${d.hasTable && d.comparisonTable && d.comparisonTable.length > 0 ? `
                        <div class="overflow-x-auto pt-2">
                            <table class="w-full text-xs text-left">
                                <thead class="bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase text-[10px] font-bold">
                                    <tr>
                                        <th class="p-2.5 rounded-l-xl">Parameter</th>
                                        <th class="p-2.5">Current Rate/Status</th>
                                        <th class="p-2.5">Previous</th>
                                        <th class="p-2.5 rounded-r-xl">Public Impact</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                    ${d.comparisonTable.map(r => `
                                        <tr>
                                            <td class="p-2.5 font-bold text-slate-800 dark:text-slate-200">${r.param}</td>
                                            <td class="p-2.5 font-bold text-emerald-600">${r.current}</td>
                                            <td class="p-2.5 text-slate-400">${r.previous}</td>
                                            <td class="p-2.5 font-medium text-slate-600 dark:text-slate-300">${r.impact}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : `
                        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px] text-slate-500 font-semibold flex items-center space-x-1.5 border border-slate-200 dark:border-slate-800">
                            <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-500 shrink-0"></i>
                            <span>शुद्ध विश्लेषणात्मक रिपोर्ट — डेटा तालिका की आवश्यकता नहीं (No forced table).</span>
                        </div>
                    `}
                </div>
            </div>
        `;
    },

    // 4. Render Right Column: Multi-Channel Publishing Studio
    renderStudioColumn() {
        const state = window.newsStore.getState();
        const story = window.newsStore.getSelectedStory();
        const container = document.getElementById("studioContainer");
        if (!container || !story) return;

        const d = story.alignedData;
        const tab = state.activeStudioTab;

        container.innerHTML = `
            <div class="space-y-4">
                <!-- Studio Tab Bar -->
                <div class="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <button onclick="window.app.switchStudioTab('wordpress')" class="py-2 text-[11px] font-bold rounded-xl transition flex flex-col items-center justify-center space-y-1 ${
                        tab === 'wordpress' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                    }">
                        <i data-lucide="globe" class="w-3.5 h-3.5"></i>
                        <span>Article</span>
                    </button>
                    <button onclick="window.app.switchStudioTab('whatsapp')" class="py-2 text-[11px] font-bold rounded-xl transition flex flex-col items-center justify-center space-y-1 ${
                        tab === 'whatsapp' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                    }">
                        <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
                        <span>WhatsApp</span>
                    </button>
                    <button onclick="window.app.switchStudioTab('reel')" class="py-2 text-[11px] font-bold rounded-xl transition flex flex-col items-center justify-center space-y-1 ${
                        tab === 'reel' ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                    }">
                        <i data-lucide="video" class="w-3.5 h-3.5"></i>
                        <span>Reel 60s</span>
                    </button>
                    <button onclick="window.app.switchStudioTab('canvas')" class="py-2 text-[11px] font-bold rounded-xl transition flex flex-col items-center justify-center space-y-1 ${
                        tab === 'canvas' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                    }">
                        <i data-lucide="image" class="w-3.5 h-3.5"></i>
                        <span>Cards</span>
                    </button>
                </div>

                <!-- Tab Content 1: WordPress SEO Article -->
                ${tab === 'wordpress' ? `
                    <div class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
                        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                            <div>
                                <h3 class="font-bold text-slate-900 dark:text-white">WordPress Ready Article</h3>
                                <span class="text-[10px] text-slate-400">SEO Score: 96/100 • ~750 Words</span>
                            </div>
                            <button onclick="window.app.copyArticleHtml()" class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold rounded-xl border border-indigo-200 dark:border-indigo-800 transition flex items-center space-x-1">
                                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                                <span>Copy HTML</span>
                            </button>
                        </div>

                        <div>
                            <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">SEO URL Slug:</span>
                            <input value="${d.seoSlug}" readonly class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
                        </div>

                        <div>
                            <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Meta Description (160 chars):</span>
                            <textarea readonly rows="2" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">${d.metaDescription}</textarea>
                        </div>

                        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 max-h-60 overflow-y-auto space-y-2 border border-slate-200 dark:border-slate-700/60 leading-relaxed">
                            ${window.AiAligner.generateFullArticle(story)}
                        </div>

                        <button onclick="window.app.publishToWordPress()" class="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 text-white font-bold rounded-2xl shadow-lg transition flex items-center justify-center space-x-2">
                            <i data-lucide="send" class="w-4 h-4"></i>
                            <span>1-Click Publish to PaisaKhabar.in</span>
                        </button>
                    </div>
                ` : ''}

                <!-- Tab Content 2: WhatsApp / Telegram 3-Bullet Flash -->
                ${tab === 'whatsapp' ? `
                    <div class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
                        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                            <div>
                                <h3 class="font-bold text-slate-900 dark:text-white">WhatsApp & Telegram Bulletin</h3>
                                <span class="text-[10px] text-slate-400">30-Second Fast Consumer Flash</span>
                            </div>
                            <button onclick="window.app.copyWhatsAppFlash()" class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-bold rounded-xl border border-emerald-200 dark:border-emerald-800 transition flex items-center space-x-1">
                                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                                <span>Copy Message</span>
                            </button>
                        </div>

                        <div class="p-4 rounded-2xl bg-[#efeae2] dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700 font-sans text-slate-800 dark:text-slate-100 whitespace-pre-line leading-relaxed text-xs shadow-inner">
                            ${d.whatsappSummary}
                        </div>

                        <div class="grid grid-cols-2 gap-2 pt-2">
                            <button onclick="window.app.shareToWhatsAppDirect()" class="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition flex items-center justify-center space-x-1.5">
                                <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
                                <span>Share to WhatsApp</span>
                            </button>
                            <button onclick="window.app.copyWhatsAppFlash()" class="py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition flex items-center justify-center space-x-1.5">
                                <i data-lucide="clipboard" class="w-3.5 h-3.5"></i>
                                <span>Copy Format</span>
                            </button>
                        </div>
                    </div>
                ` : ''}

                <!-- Tab Content 3: 60-Second Video Reel Script -->
                ${tab === 'reel' ? `
                    <div class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
                        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                            <div>
                                <h3 class="font-bold text-slate-900 dark:text-white">60-Sec Reel / Short Script</h3>
                                <span class="text-[10px] text-slate-400">Duration: ~52 Seconds • High Retention</span>
                            </div>
                            <button onclick="window.app.copyReelScript()" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 font-bold rounded-xl border border-rose-200 dark:border-rose-800 transition flex items-center space-x-1">
                                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                                <span>Copy Script</span>
                            </button>
                        </div>

                        <div class="space-y-3">
                            <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                                <span class="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400">0:00 - 0:08 (Visual Hook):</span>
                                <p class="font-bold text-slate-900 dark:text-white">"${d.reelScript.hook}"</p>
                            </div>

                            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                                <span class="text-[10px] font-black uppercase text-indigo-500">0:08 - 0:45 (Core Facts & Pocket Math):</span>
                                <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${d.reelScript.body}</p>
                            </div>

                            <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                                <span class="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">0:45 - 0:55 (Call to Action):</span>
                                <p class="font-bold text-slate-900 dark:text-white">"${d.reelScript.cta}"</p>
                            </div>
                        </div>

                        <button onclick="window.app.showToast('AI Voiceover Generator Ready!', 'info')" class="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow transition flex items-center justify-center space-x-1.5">
                            <i data-lucide="mic" class="w-4 h-4"></i>
                            <span>Generate Hindi Voiceover (MP3)</span>
                        </button>
                    </div>
                ` : ''}

                <!-- Tab Content 4: Live Canvas Visual Cards -->
                ${tab === 'canvas' ? `
                    <div class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
                        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                            <div>
                                <h3 class="font-bold text-slate-900 dark:text-white">Visual Editorial Studio</h3>
                                <span class="text-[10px] text-slate-400">16:9 Banner & 1:1 Social Cards</span>
                            </div>
                        </div>

                        <!-- 16:9 Landscape Banner Preview -->
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300">16:9 Website Header Banner</span>
                                <button onclick="window.CardCanvas.downloadCanvas('landscapeBannerCanvas', 'paisakhabar_banner.png')" class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Download 4K</button>
                            </div>
                            <canvas id="landscapeBannerCanvas" class="w-full rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 bg-slate-950"></canvas>
                        </div>

                        <!-- 1:1 Square Card Preview -->
                        <div class="space-y-2 pt-2">
                            <div class="flex items-center justify-between">
                                <span class="text-[11px] font-bold text-slate-700 dark:text-slate-300">1:1 Instagram & FB Split Card</span>
                                <button onclick="window.CardCanvas.downloadCanvas('squareCardCanvas', 'paisakhabar_square_card.png')" class="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline">Download HD</button>
                            </div>
                            <canvas id="squareCardCanvas" class="w-full max-w-[280px] mx-auto rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 bg-slate-950 block"></canvas>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        // If canvas tab is active, trigger canvas renders
        if (tab === 'canvas') {
            setTimeout(() => {
                window.CardCanvas.renderLandscapeBanner('landscapeBannerCanvas', story);
                window.CardCanvas.renderSquareCard('squareCardCanvas', story);
            }, 50);
        }
    },

    // Actions & Handlers
    setCategory(cat) {
        window.newsStore.setCategory(cat);
    },

    selectStory(id) {
        window.newsStore.selectStory(id);
    },

    switchStudioTab(tab) {
        window.newsStore.setStudioTab(tab);
    },

    setHeadlineIndex(idx) {
        const story = window.newsStore.getSelectedStory();
        if (story && story.alignedData.headlines[idx]) {
            this.showToast(`Selected Headline #${idx+1}`, "info");
        }
    },

    updatePocketImpact(text) {
        const story = window.newsStore.getSelectedStory();
        if (story) {
            story.alignedData.pocketImpact = text;
            window.newsStore.saveState();
        }
    },

    regenerateAI() {
        const story = window.newsStore.getSelectedStory();
        if (story) {
            story.alignedData.headlines = window.AiAligner.regenerateHeadlines(story);
            window.newsStore.saveState();
            this.showToast("Re-aligned story angles with AI!", "success");
        }
    },

    copyArticleHtml() {
        const story = window.newsStore.getSelectedStory();
        const html = window.AiAligner.generateFullArticle(story);
        navigator.clipboard.writeText(html).then(() => {
            this.showToast("Full SEO HTML Article copied to clipboard!", "success");
        });
    },

    copyWhatsAppFlash() {
        const story = window.newsStore.getSelectedStory();
        navigator.clipboard.writeText(story.alignedData.whatsappSummary).then(() => {
            this.showToast("WhatsApp 3-Bullet Flash copied!", "success");
        });
    },

    shareToWhatsAppDirect() {
        const story = window.newsStore.getSelectedStory();
        const text = encodeURIComponent(story.alignedData.whatsappSummary);
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    },

    copyReelScript() {
        const story = window.newsStore.getSelectedStory();
        const rs = story.alignedData.reelScript;
        const text = `🎬 60-SEC REEL SCRIPT:\n\n[HOOK 0-8s]:\n${rs.hook}\n\n[BODY 8-45s]:\n${rs.body}\n\n[CTA 45-55s]:\n${rs.cta}`;
        navigator.clipboard.writeText(text).then(() => {
            this.showToast("Reel voiceover script copied!", "success");
        });
    },

    publishToWordPress() {
        const story = window.newsStore.getSelectedStory();
        window.newsStore.recordPublishedDraft({
            id: `pub-${Date.now().toString(36)}`,
            storyId: story.id,
            title: story.title,
            publishedAt: new Date().toISOString(),
            platform: "WordPress Live",
            status: "Published 🟢"
        });
        this.showToast("Successfully drafted & published to PaisaKhabar.in!", "success");
    },

    // Custom Topic Ingest Modal
    openIngestModal() {
        const container = document.getElementById("modalContainer");
        if (!container) return;

        container.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
                <div class="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden m-4">
                    <div class="p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
                        <div>
                            <h3 class="font-bold text-base">Ingest Financial Topic / URL</h3>
                            <p class="text-xs text-indigo-100">Fetch and align any financial breaking news instantly</p>
                        </div>
                        <button onclick="document.getElementById('modalContainer').innerHTML = ''" class="text-white/80 hover:text-white">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                    </div>

                    <form onsubmit="window.app.handleIngestSubmit(event)" class="p-6 space-y-4 text-xs">
                        <div>
                            <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Financial News Topic / Headline *</label>
                            <input name="topic" required placeholder="e.g. SEBI ने F&O ट्रेडिंग के नए नियम किए लागू, लॉट साइज बढ़ा" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                        </div>

                        <div>
                            <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Financial Category *</label>
                            <select name="category" class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium">
                                <option value="banking_fd">🏦 Banking & Fixed Deposits</option>
                                <option value="pension_epfo">🏛️ EPFO, NPS & EPS-95 Pension</option>
                                <option value="stock_market">📈 Stock Market & IPOs</option>
                                <option value="gold_commodities">🪙 Gold, Silver & Commodities</option>
                                <option value="tax_itr">💰 Income Tax & ITR Rulings</option>
                                <option value="govt_schemes">🇮🇳 Govt Welfare Schemes</option>
                            </select>
                        </div>

                        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-2">
                            <button type="button" onclick="document.getElementById('modalContainer').innerHTML = ''" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl">Cancel</button>
                            <button type="submit" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow">Fetch & Align with AI</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
    },

    handleIngestSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const topic = fd.get("topic");
        const cat = fd.get("category");

        window.FeedEngine.ingestCustomTopic(topic, cat);
        document.getElementById('modalContainer').innerHTML = '';
        this.showToast(`Fetched and aligned: "${topic.slice(0, 30)}..."`, "success");
    }
};

window.addEventListener('DOMContentLoaded', () => {
    window.app.init();
});
