// Financial News Ingestion & Real-Time Radar Engine

window.FeedEngine = {
    // Ingest custom financial topic or URL
    ingestCustomTopic(topic, category = "banking_fd") {
        const id = `story-${Date.now().toString(36)}`;
        
        // Dynamic AI Aligned Template for instant preview
        const newStory = {
            id: id,
            category: category,
            categoryLabel: this.getCategoryLabel(category),
            title: topic,
            sources: [
                { name: "Live Financial Scanner", time: "Just now", url: "#" },
                { name: "PIB / Regulatory Bulletin", time: "2 mins ago", url: "#" }
            ],
            sourceCount: 2,
            trendingScore: 92,
            timestamp: new Date().toISOString(),
            status: "Ready for Alignment",
            rawSummary: `वित्तीय बाजार और नियामकों से प्राप्त ताज़ा जानकारी के अनुसार: ${topic}। इस पर विशेषज्ञों और आम जनता की नजर बनी हुई है।`,
            alignedData: {
                headlines: [
                    `${topic}: जानिए आपके पैसों और बैंक खाते पर क्या होगा सीधा असर`,
                    `बड़ा वित्तीय अपडेट: ${topic} से जुड़े 3 सबसे जरूरी नियम`,
                    `(Recommended) ${topic} 2026: आम जनता और निवेशकों के लिए महत्वपूर्ण दिशानिर्देश`
                ],
                pocketImpact: "इस नए फैसले से सीधे तौर पर आपकी मासिक बचत, रिटर्न और वित्तीय योजना पर असर पड़ेगा। समय पर नियमों का पालन करने से किसी भी नुकसान या पेनल्टी से बचा जा सकता है।",
                coreFacts: [
                    `${topic} से जुड़े आधिकारिक दिशानिर्देश जारी।`,
                    "लागू होने की समय सीमा और पात्रता शर्तें तय की गईं।",
                    "बैंक और वित्तीय संस्थानों को नए नियमों का अनुपालन सुनिश्चित करने का निर्देश।"
                ],
                comparisonTable: [
                    { param: "विषय (Topic)", current: topic.slice(0, 25) + "...", previous: "सामान्य", impact: "नया नियम लागू" },
                    { param: "प्रभाव का दायरा", current: "राष्ट्रीय स्तर पर", previous: "सीमित", impact: "व्यापक लाभ" }
                ],
                tags: ["Financial Update", "PaisaKhabar", "Policy Impact", "Banking News", "Investment"],
                seoSlug: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60),
                metaDescription: `${topic} से जुड़ी सभी बड़ी जानकारियां, नियम और आम आदमी की जेब पर पड़ने वाले असर का पूरा विश्लेषण।`,
                reelScript: {
                    hook: `क्या आप जानते हैं कि ${topic} का आपकी जेब पर क्या असर होगा?`,
                    body: `इस नए अपडेट से सभी निवेशकों और आम नागरिकों के लिए नए नियम तय किए गए हैं। पूरी जानकारी समझें और किसी भी वित्तीय नुकसान से बचें!`,
                    cta: "पूरी रिपोर्ट और एनालिसिस के लिए PaisaKhabar.in पर जाएं!"
                },
                whatsappSummary: `⚡ *FINANCIAL FLASH UPDATE:*\n\n📌 *${topic}*\n\n1. नया आधिकारिक अपडेट जारी।\n2. आम जनता और निवेशकों पर सीधा प्रभाव।\n3. नियमों का पालन करना अनिवार्य।\n\n👉 पढ़ें पूरा विश्लेषण: PaisaKhabar.in`
            }
        };

        window.newsStore.addCustomStory(newStory);
        return newStory;
    },

    getCategoryLabel(cat) {
        const map = {
            banking_fd: "🏦 Banking & FDs",
            pension_epfo: "🏛️ EPFO & EPS-95",
            stock_market: "📈 Stocks & IPOs",
            gold_commodities: "🪙 Gold & Silver",
            tax_itr: "💰 Income Tax & ITR",
            govt_schemes: "🇮🇳 Govt Schemes"
        };
        return map[cat] || "💼 Financial News";
    },

    // Refresh simulation: updates market pulse numbers with real-looking micro-ticks
    refreshMarketPulse() {
        const store = window.newsStore;
        const state = store.getState();
        const mp = state.marketPulse;

        // Subtle random fluctuations
        const niftyNum = 25180 + (Math.random() * 15 - 7);
        mp.nifty50.value = niftyNum.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
        const goldNum = 76400 + Math.floor(Math.random() * 150 - 50);
        mp.gold24k.value = `₹${goldNum.toLocaleString('en-IN')}/10g`;

        store.saveState();
    }
};
