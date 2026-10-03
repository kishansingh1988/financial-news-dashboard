// Central Reactive State Store for Financial News Intelligence & Alignment OS (v2.5)

(function () {
    const STORAGE_KEY = "PAISAKHABAR_NEWSROOM_STATE_V2";

    const DEFAULT_STATE = {
        activeCategory: "all",
        searchQuery: "",
        selectedStoryId: "story-01",
        activeStudioTab: "wordpress",
        
        marketPulse: {
            nifty50: { value: "25,182.40", change: "+98.30 (+0.39%)", trend: "up" },
            sensex: { value: "82,365.77", change: "+342.10 (+0.42%)", trend: "up" },
            bankNifty: { value: "51,640.25", change: "-45.10 (-0.09%)", trend: "down" },
            gold24k: { value: "₹76,450/10g", change: "+₹320 (+0.42%)", trend: "up" },
            silver1kg: { value: "₹91,200/kg", change: "+₹850 (+0.94%)", trend: "up" },
            usdInr: { value: "₹83.92", change: "-0.04 (-0.05%)", trend: "stable" },
            crudeBrent: { value: "$74.20/bbl", change: "-0.85 (-1.13%)", trend: "down" }
        },

        stories: [
            {
                id: "story-01",
                category: "pension_epfo",
                categoryLabel: "🏛️ Govt Employees & 8th CPC",
                title: "8वां वेतन आयोग: फिटमेंट फैक्टर 1.92x से 2.86x तक होने पर कितनी बढ़ेगी सैलरी? समझिए पूरा गणित",
                sources: [
                    { name: "Finance Ministry Memo", time: "14 mins ago", url: "#" },
                    { name: "Staff Side JCM Council", time: "22 mins ago", url: "#" },
                    { name: "Financial Express", time: "30 mins ago", url: "#" }
                ],
                sourceCount: 3,
                trendingScore: 99,
                timestamp: "2026-10-03T15:00:00Z",
                status: "Ready for Alignment",
                rawSummary: "केंद्र सरकार के 1.15 करोड़ से अधिक कर्मचारियों और पेंशनभोगियों के लिए 8वें वेतन आयोग (8th Central Pay Commission) के गठन की सुगबुगाहट तेज हो गई है। कर्मचारी यूनियनों (JCM) ने 1 जनवरी 2026 से नया वेतन आयोग लागू करने का ज्ञापन सौंपा है। मुख्य मांग फिटमेंट फैक्टर को 2.86x तय करने की है, जिससे न्यूनतम बेसिक सैलरी ₹18,000 से बढ़कर ₹51,480 तक पहुंच सकती है।",
                alignedData: {
                    hasTable: true,
                    headlines: [
                        "8वां वेतन आयोग: क्या ₹18,000 से बढ़कर ₹34,500 होगी बेसिक सैलरी? समझिए फिटमेंट फैक्टर का पूरा गणित",
                        "केंद्रीय कर्मचारियों और पेंशनर्स के लिए बड़ी खबर: 8वें वेतन आयोग में 1.92x से 2.86x फिटमेंट फैक्टर का असर",
                        "(Recommended) 8th Pay Commission 2026: सैलरी बढ़ोतरी से लेकर पेंशन रिवीजन तक, कर्मचारियों के लिए पूरा ब्योरा"
                    ],
                    pocketImpact: "8वें वेतन आयोग के लागू होते ही एंट्री-लेवल कर्मचारी की इन-हैंड सैलरी में कम से कम ₹16,500 से ₹33,000 प्रति माह तक की सीधी बढ़ोतरी होगी। वहीं रिटायर्ड कर्मचारियों की न्यूनतम पेंशन ₹9,000 से बढ़कर सीधे ₹17,250 से ₹25,740 प्रति माह हो जाएगी।",
                    coreFacts: [
                        "7वें वेतन आयोग का 10 वर्षीय कार्यकाल 31 दिसंबर 2025 को पूरा हो रहा है।",
                        "8वें वेतन आयोग की संभावित प्रभावी तिथि: 1 जनवरी 2026।",
                        "वर्तमान न्यूनतम बेसिक पे: ₹18,000 प्रति माह (7th CPC Fitment Factor 2.57x)।",
                        "प्रस्तावित न्यूनतम बेसिक पे: ₹34,560 (1.92x पर) या ₹51,480 (2.86x पर)।",
                        "देश के 49 लाख सेवारत केंद्रीय कर्मचारी और 68 लाख पेंशनर्स सीधे लाभान्वित होंगे।"
                    ],
                    deepAnalysis: "7वें वेतन आयोग में 2.57 फिटमेंट फैक्टर लागू किया गया था, जिससे न्यूनतम वेतन ₹7,000 से बढ़कर ₹18,000 हुआ था। पिछले 10 वर्षों में उपभोक्ता मूल्य सूचकांक (AICPI-IW) और महंगाई में 50% से अधिक की वृद्धि दर्ज की गई है। यदि सरकार 1.92x का मध्यम फिटमेंट फैक्टर भी स्वीकार करती है, तो वर्तमान ₹18,000 की बेसिक सैलरी ₹34,560 हो जाएगी। इसके अलावा, महंगाई भत्ता (DA) जो 50% पर शून्य (Merge) हो जाता है, वह नए वेतनमान में बेसिक पे में समाहित हो जाएगा।",
                    comparisonTable: [
                        { param: "न्यूनतम बेसिक सैलरी", current: "₹34,560 / ₹51,480 (प्रस्तावित)", previous: "₹18,000 (7th CPC)", impact: "+₹16,560 से +₹33,480" },
                        { param: "फिटमेंट फैक्टर (Multiplier)", current: "1.92x - 2.86x", previous: "2.57x", impact: "पे-मैट्रिक्स रीविजन" },
                        { param: "न्यूनतम पेंशन (50% Basic)", current: "₹17,280 / ₹25,740", previous: "₹9,000", impact: "पेंशनर्स को सीधी राहत" },
                        { param: "संभावित लागू तारीख", current: "1 जनवरी 2026", previous: "1 जनवरी 2016", impact: "10 वर्ष बाद संशोधन" }
                    ],
                    actionableTakeaway: "केंद्रीय कर्मचारियों को सलाह दी जाती है कि वे अपने GPF / NPS अंशदान और भविष्य के लोन की योजना वर्तमान वेतन संरचना पर ही बनाएं। आयोग के गठन के बाद रिपोर्ट तैयार होने में 12 से 18 महीने का समय लगता है, हालांकि एरियर 1 जनवरी 2026 से ही देय होगा।",
                    tags: ["8th Pay Commission", "Fitment Factor", "Central Govt Employees", "Pension Revision", "Basic Salary 2026"],
                    seoSlug: "8th-pay-commission-fitment-factor-salary-hike-calculation-pensioners-update",
                    metaDescription: "8th Pay Commission 2026: 8वें वेतन आयोग में फिटमेंट फैक्टर 1.92x से 2.86x होने पर केंद्रीय कर्मचारियों की सैलरी और पेंशन कितनी बढ़ेगी? समझिए पूरा गणित।",
                    reelScript: {
                        hook: "क्या 2026 में केंद्रीय कर्मचारियों की बेसिक सैलरी ₹18,000 से बढ़कर सीधे ₹34,500 होने वाली है?",
                        body: "8वें वेतन आयोग को लेकर कर्मचारी यूनियनों ने सरकार को औपचारिक ड्राफ्ट सौंप दिया है। अगर फिटमेंट फैक्टर 1.92x तय होता है, तो न्यूनतम बेसिक सैलरी ₹34,500 और न्यूनतम पेंशन ₹17,250 हो जाएगी। देश के 1 करोड़ 15 लाख कर्मचारियों और पेंशनर्स को इसका सीधा फायदा मिलेगा!",
                        cta: "वेतन आयोग की हर सटीक जानकारी के लिए PaisaKhabar को फॉलो करें!"
                    },
                    whatsappSummary: "🏛️ *8th Pay Commission: सैलरी और पेंशन पर बड़ा अपडेट*\n\n1. 1 जनवरी 2026 से 8वें वेतन आयोग के लागू होने का प्रस्ताव।\n2. फिटमेंट फैक्टर 1.92x से 2.86x के आधार पर बेसिक पे ₹34,560 से ₹51,480 तक संभावित।\n3. न्यूनतम पेंशन ₹9,000 से बढ़कर ₹17,280 होने की उम्मीद।\n\n👉 पूरा सैलरी गणित पढ़ें: PaisaKhabar.in"
                }
            },
            {
                id: "story-02",
                category: "stock_market",
                categoryLabel: "📈 Stock Market & SEBI",
                title: "SEBI F&O New Rules: वीकली एक्सपायरी पर लगा ब्रेक, लॉट साइज ₹15 लाख; जानिए छोटे ट्रेडर्स को कैसे होगा फायदा",
                sources: [
                    { name: "SEBI Circular", time: "25 mins ago", url: "#" },
                    { name: "LiveMint", time: "38 mins ago", url: "#" },
                    { name: "Economic Times", time: "45 mins ago", url: "#" }
                ],
                sourceCount: 3,
                trendingScore: 96,
                timestamp: "2026-10-03T14:15:00Z",
                status: "Ready for Alignment",
                rawSummary: "पूंजी बाजार नियामक सेबी (SEBI) ने फ्यूचर्स एंड ऑप्शंस (F&O) सेगमेंट में रिटेल निवेशकों की भारी पूंजी डूबने से बचाने के लिए 6 कड़े नियमों का नया फ्रेमवर्क जारी किया है। नए नियमों के तहत प्रति एक्सचेंज प्रति सप्ताह केवल 1 इंडेक्स वीकली एक्सपायरी की अनुमति होगी और डेरिवेटिव्स अनुबंध का न्यूनतम लॉट साइज ₹5 लाख से बढ़ाकर ₹15 लाख से ₹20 लाख के बीच तय किया गया है।",
                alignedData: {
                    hasTable: false, // NO FORCED TABLE HERE! Pure Deep Regulatory Explainer
                    headlines: [
                        "SEBI F&O New Rules: वीकली एक्सपायरी और लॉट साइज पर लगा बड़ा ब्रेक; छोटे ट्रेडर्स पर क्या होगा असर?",
                        "शेयर बाजार में वायदा कारोबार के बदले नियम: जानिए कैसे 93% रिटेल निवेशकों को नुकसान से बचाएगा सेबी",
                        "(Recommended) SEBI के 6 नए सख्त नियम: F&O ट्रेडिंग में ₹15 लाख का नया लॉट साइज और वीकली एक्सपायरी का सच"
                    ],
                    pocketImpact: "छोटे रिटेल ट्रेडर्स जो ₹5,000-₹10,000 की छोटी पूंजी लेकर 'हीरो या जीरो' ऑप्शंस एक्सपायरी में सट्टा लगाते थे, वे अब बाजार के इस भारी जोखिम से बचेंगे। लॉट साइज 3 गुना बड़ा होने से केवल पर्याप्त पूंजी और जोखिम प्रबंधन वाले गंभीर ट्रेडर ही प्रवेश कर सकेंगे।",
                    coreFacts: [
                        "न्यूनतम कॉन्ट्रैक्ट लॉट साइज ₹5 लाख से बढ़ाकर ₹15 लाख - ₹20 लाख किया गया।",
                        "प्रत्येक एक्सचेंज (NSE/BSE) पर सप्ताह में केवल 1 बेंचमार्क इंडेक्स वीकली एक्सपायरी की अनुमति (जैसे NSE पर केवल निफ्टी और BSE पर सेंसेक्स)।",
                        "एक्सपायरी के दिन टेल रिस्क कवर करने के लिए 2% एक्सट्रीम लॉस मार्जिन (ELM) अनिवार्य।",
                        "ऑप्शन बायर्स से अपफ्रंट प्रीमियम कलेक्शन 100% अनिवार्य किया गया।",
                        "कैलेंडर स्प्रेड मार्जिन बेनिफिट एक्सपायरी के दिन समाप्त रहेगा।"
                    ],
                    deepAnalysis: "सेबी की हालिया आधिकारिक रिपोर्ट के अनुसार, वित्तीय वर्ष 2022 से 2024 के बीच 93% व्यक्तिगत रिटेल ट्रेडर्स ने F&O ट्रेडिंग में औसतन ₹1.25 लाख प्रति व्यक्ति का भारी नुकसान उठाया है। देश के कुल ₹1.81 लाख करोड़ के इस नुकसान को रोकने के लिए सेबी ने यह संरचनात्मक सुधार किया है। एक्सपायरी के दिन 'जीरो-हीरो' के नाम पर होने वाली गैम्बलिंग अब समाप्त होगी क्योंकि हर दिन होने वाली एक्सपायरी (Bank Nifty, FinNifty, Midcap) अब हफ्ते में केवल 1 दिन ही सीमित रहेगी।",
                    comparisonTable: [], // Explicitly empty to test conditional rendering
                    actionableTakeaway: "यदि आप एक रिटेल निवेशक हैं, तो ऑप्शंस ट्रेडिंग के शॉर्ट-टर्म जुए से दूरी बनाकर मजबूत फंडामेंटल वाले शेयरों में SIP और लॉन्ग-टर्म म्यूचुअल फंड्स के माध्यम से वेल्थ क्रिएशन पर ध्यान दें।",
                    tags: ["SEBI F&O Rules", "Weekly Expiry", "Nifty Options", "Lot Size Hike", "Stock Market Trading"],
                    seoSlug: "sebi-fo-new-rules-lot-size-hike-weekly-expiry-retail-trader-impact",
                    metaDescription: "SEBI F&O New Rules: सेबी ने फ्यूचर्स एंड ऑप्शंस में लॉट साइज ₹15 लाख किया और वीकली एक्सपायरी सीमित की। जानिए 93% रिटेल ट्रेडर्स पर इसका क्या असर होगा।",
                    reelScript: {
                        hook: "अगर आप भी शेयर बाजार में ऑप्शंस ट्रेडिंग करते हैं, तो सेबी का यह नया नियम आपका लाखों का नुकसान बचा सकता है!",
                        body: "सेबी ने F&O में लॉट साइज को 3 गुना बड़ा करके ₹15 लाख कर दिया है और हर दिन होने वाली एक्सपायरी को बंद करके हफ्ते में केवल 1 दिन कर दिया है। सेबी की रिपोर्ट कहती है कि 93% लोग ऑप्शंस में अपना पैसा गंवाते हैं। अब यह जुआ बंद होगा!",
                        cta: "स्टॉक मार्केट के सही नियमों के लिए PaisaKhabar को फॉलो करें!"
                    },
                    whatsappSummary: "📈 *SEBI F&O ट्रेडिंग के 6 नए सख्त नियम:*\n\n1. लॉट साइज ₹5 लाख से बढ़कर ₹15-₹20 लाख हुआ।\n2. हफ्ते में केवल 1 इंडेक्स वीकली एक्सपायरी की अनुमति।\n3. 93% रिटेल निवेशकों को नुकसान से बचाने के लिए कड़ा कदम।\n\n👉 पूरा सेबी सर्कुलर समझें: PaisaKhabar.in"
                }
            },
            {
                id: "story-03",
                category: "banking_fd",
                categoryLabel: "🏦 Banking & FDs",
                title: "SBI Amrit Vrishti FD: 444 दिनों के लिए 7.75% ब्याज, जानिए ₹5 लाख जमा पर कितना मिलेगा फिक्स रिटर्न",
                sources: [
                    { name: "State Bank of India Notification", time: "1 hour ago", url: "#" },
                    { name: "LiveMint", time: "1 hour ago", url: "#" }
                ],
                sourceCount: 2,
                trendingScore: 92,
                timestamp: "2026-10-03T13:30:00Z",
                status: "Ready for Alignment",
                rawSummary: "देश के सबसे बड़े सरकारी बैंक स्टेट बैंक ऑफ इंडिया (SBI) ने अपनी लोकप्रिय स्पेशल टर्म डिपॉजिट स्कीम 'अमृत वृष्टि' (Amrit Vrishti 444 Days) में निवेश की अंतिम तिथि को बढ़ा दिया है। इस स्कीम में 444 दिनों की फिक्स्ड डिपॉजिट पर आम नागरिकों को 7.25% और वरिष्ठ नागरिकों को 7.75% प्रति वर्ष का गारंटीड ब्याज दिया जा रहा है।",
                alignedData: {
                    hasTable: true,
                    headlines: [
                        "SBI Amrit Vrishti FD: 444 दिनों के लिए 7.75% ब्याज, जानिए ₹5 लाख जमा करने पर कितना मिलेगा फिक्स मुनाफा",
                        "बैंक FD निवेशकों के लिए बड़ा मौका: SBI की अमृत वृष्टि में 444 दिनों के लिए निवेश की नई डेडलाइन",
                        "(Recommended) SBI अमृत वृष्टि फिक्स्ड डिपॉजिट: ₹1 लाख, ₹3 लाख और ₹5 लाख जमा पर कितना मिलेगा पक्का ब्याज"
                    ],
                    pocketImpact: "शेयर बाजार के उतार-चढ़ाव से दूर सुरक्षित और गारंटीड रिटर्न चाहने वाले मध्यम वर्ग और वरिष्ठ नागरिकों के लिए यह स्कीम सबसे मुफीद है। 444 दिनों के कार्यकाल में चक्रवृद्धि (Compounding) ब्याज के साथ आपका पैसा पूरी तरह सुरक्षित रहता है।",
                    coreFacts: [
                        "स्कीम का नाम: SBI अमृत वृष्टि (Amrit Vrishti Special FD)।",
                        "कार्यकाल: 444 दिन (1 वर्ष 2 महीने 19 दिन)।",
                        "ब्याज दर (आम नागरिक): 7.25% प्रति वर्ष।",
                        "ब्याज दर (वरिष्ठ नागरिक 60+): 7.75% प्रति वर्ष।",
                        "प्री-मैच्योर विड्रॉल और लोन/ओवरड्राफ्ट की सुविधा उपलब्ध।"
                    ],
                    deepAnalysis: "यदि एक वरिष्ठ नागरिक अमृत वृष्टि स्कीम में ₹5,00,000 जमा करते हैं, तो 444 दिनों के बाद 7.75% वार्षिक तिमाही चक्रवृद्धि ब्याज दर के हिसाब से कुल मेच्योरिटी राशि लगभग ₹5,49,150 होगी—यानी ₹49,150 का सीधा गारंटीड मुनाफा। वहीं आम नागरिकों को ₹5 लाख पर ₹45,800 का ब्याज मिलेगा। बैंक एफडी में ₹5 लाख तक की मूल व ब्याज राशि DICGC (RBI की सहायक कंपनी) के तहत 100% बीमित और सुरक्षित होती है।",
                    comparisonTable: [
                        { param: "₹1,00,000 जमा पर रिटर्न", current: "₹1,09,830 (Senior)", previous: "₹1,07,100", impact: "+₹9,830 ब्याज" },
                        { param: "₹3,00,000 जमा पर रिटर्न", current: "₹3,29,490 (Senior)", previous: "₹3,21,300", impact: "+₹29,490 ब्याज" },
                        { param: "₹5,00,000 जमा पर रिटर्न", current: "₹5,49,150 (Senior)", previous: "₹5,35,500", impact: "+₹49,150 ब्याज" }
                    ],
                    actionableTakeaway: "अगर आपके बचत खाते में ऐसा फंड पड़ा है जिसकी 1 साल तक जरूरत नहीं है, तो उसे 3% के सामान्य सेविंग्स पर रखने के बजाय अमृत वृष्टि FD में लॉक करें ताकि अतिरिक्त ब्याज का लाभ मिल सके।",
                    tags: ["SBI FD Rates", "Amrit Vrishti 444 Days", "Fixed Deposit 2026", "Senior Citizen Return", "Guaranteed Savings"],
                    seoSlug: "sbi-amrit-vrishti-444-days-fd-interest-rate-calculator-return",
                    metaDescription: "SBI Amrit Vrishti FD: स्टेट बैंक की अमृत वृष्टि स्कीम में 444 दिनों के लिए 7.75% ब्याज। जानिए ₹1 लाख से ₹5 लाख जमा पर कितना मिलेगा गारंटीड रिटर्न।",
                    reelScript: {
                        hook: "क्या आप जानते हैं कि SBI की 444 दिनों वाली FD में ₹5 लाख जमा करने पर कितना मुनाफा मिलता है?",
                        body: "SBI की अमृत वृष्टि स्कीम में आम जनता को 7.25% और सीनियर सिटीजन्स को 7.75% का गारंटीड ब्याज मिल रहा है। ₹5 लाख जमा करने पर वरिष्ठ नागरिकों को 444 दिनों में लगभग ₹49,150 का पक्का ब्याज मिलेगा। और सबसे बड़ी बात—आपका पैसा सरकारी गारंटी के साथ 100% सुरक्षित है!",
                        cta: "पूरी कैलकुलेटर टेबल देखने के लिए PaisaKhabar.in पर जाएं!"
                    },
                    whatsappSummary: "🏦 *SBI अमृत वृष्टि स्पेशल FD (444 Days):*\n\n1. आम नागरिकों को 7.25% और वरिष्ठ नागरिकों को 7.75% ब्याज।\n2. ₹5 लाख जमा पर ₹49,150 का पक्का मुनाफा।\n3. लोन और ऑनलाइन YONO से खोलने की सुविधा।\n\n👉 पूरा कैलकुलेटर देखें: PaisaKhabar.in"
                }
            }
        ],

        publishedDrafts: [
            {
                id: "pub-01",
                storyId: "story-01",
                title: "8th Pay Commission: फिटमेंट फैक्टर 1.92x से 2.86x पर सैलरी बढ़ोतरी",
                publishedAt: "2026-10-03T15:00:00Z",
                platform: "WordPress & Telegram",
                status: "Live 🟢"
            }
        ]
    };

    class NewsStore {
        constructor() {
            this.state = this.loadState();
            this.listeners = [];
        }

        loadState() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    return JSON.parse(stored);
                }
            } catch (e) {
                console.warn("Store load error:", e);
            }
            return JSON.parse(JSON.stringify(DEFAULT_STATE));
        }

        saveState() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
            } catch (e) {
                console.warn("Store save error:", e);
            }
            this.notify();
        }

        subscribe(listener) {
            this.listeners.push(listener);
            return () => {
                this.listeners = this.listeners.filter(l => l !== listener);
            };
        }

        notify() {
            this.listeners.forEach(fn => fn(this.state));
        }

        getState() {
            return this.state;
        }

        setCategory(cat) {
            this.state.activeCategory = cat;
            this.saveState();
        }

        setSearchQuery(q) {
            this.state.searchQuery = q;
            this.notify();
        }

        selectStory(id) {
            this.state.selectedStoryId = id;
            this.saveState();
        }

        getSelectedStory() {
            return this.state.stories.find(s => s.id === this.state.selectedStoryId) || this.state.stories[0];
        }

        setStudioTab(tab) {
            this.state.activeStudioTab = tab;
            this.saveState();
        }

        addCustomStory(story) {
            this.state.stories.unshift(story);
            this.state.selectedStoryId = story.id;
            this.saveState();
        }

        updateAlignedData(storyId, alignedData) {
            const story = this.state.stories.find(s => s.id === storyId);
            if (story) {
                story.alignedData = { ...story.alignedData, ...alignedData };
                this.saveState();
            }
        }

        recordPublishedDraft(record) {
            this.state.publishedDrafts.unshift(record);
            this.saveState();
        }
    }

    window.newsStore = new NewsStore();
})();
