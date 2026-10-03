// Financial News AI Alignment Engine (v2.5 Professional Editorial Edition)
// Core Editorial Principles:
// 1. Zero Artificial Boilerplate (Strictly authentic, high-impact Hindi financial journalism)
// 2. Clear Natural Tone without generic phrases
// 3. Conditional Data Tables (Only when numeric comparisons exist)
// 4. Deep Financial Math and Actionable Public Impact

window.AiAligner = {
    // Generate full SEO Long-Form Article in Hindi for WordPress
    generateFullArticle(story) {
        const d = story.alignedData;
        const selectedHeadline = d.headlines[2] || d.headlines[0];

        // Conditional Table Rendering: Only when comparisonTable is explicitly provided and meaningful
        let tableSection = "";
        if (d.hasTable && d.comparisonTable && d.comparisonTable.length > 0) {
            tableSection = `
                <h3 style="color: #0f172a; margin-top: 25px;">📊 आंकड़े और दरों की सीधी तुलना:</h3>
                <div style="overflow-x: auto; margin: 15px 0 25px 0;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
                        <thead>
                            <tr style="background-color: #0f172a; color: #ffffff;">
                                <th style="padding: 12px; border: 1px solid #334155;">पहलू (Category)</th>
                                <th style="padding: 12px; border: 1px solid #334155;">वर्तमान नियम / दर</th>
                                <th style="padding: 12px; border: 1px solid #334155;">पुरानी स्थिति</th>
                                <th style="padding: 12px; border: 1px solid #334155;">आपकी जेब पर सीधा प्रभाव</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${d.comparisonTable.map((row, idx) => `
                                <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
                                    <td style="padding: 11px; border: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">${row.param}</td>
                                    <td style="padding: 11px; border: 1px solid #e2e8f0; color: #059669; font-weight: bold;">${row.current}</td>
                                    <td style="padding: 11px; border: 1px solid #e2e8f0; color: #64748b;">${row.previous}</td>
                                    <td style="padding: 11px; border: 1px solid #e2e8f0; color: #334155; font-weight: 500;">${row.impact}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // Deep Analysis Section
        const deepAnalysisHtml = d.deepAnalysis ? `
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #1e1b4b; font-size: 17px;">🔍 गहराई से विश्लेषण (Deep Financial Breakdown):</h3>
                <p style="color: #334155; line-height: 1.7; font-size: 14.5px;">${d.deepAnalysis}</p>
            </div>
        ` : '';

        return `
            <h2>${selectedHeadline}</h2>

            <p><strong>नई दिल्ली (PaisaKhabar Desk):</strong> ${story.rawSummary}</p>

            <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 18px; margin: 22px 0; border-radius: 8px;">
                <h3 style="margin: 0 0 8px 0; color: #065f46; font-size: 16px;">💰 आम आदमी की जेब पर क्या होगा सीधा असर?</h3>
                <p style="margin: 0; color: #047857; font-size: 14.5px; line-height: 1.65; font-weight: 500;">${d.pocketImpact}</p>
            </div>

            <h3 style="color: #0f172a; margin-top: 25px;">📌 इस बड़े फैसले के मुख्य बिंदु:</h3>
            <ul style="line-height: 1.8; font-size: 14.5px; color: #1e293b;">
                ${d.coreFacts.map(fact => `<li><strong>${fact}</strong></li>`).join('')}
            </ul>

            ${deepAnalysisHtml}

            ${tableSection}

            <h3 style="color: #0f172a; margin-top: 25px;">🎯 PaisaKhabar की सलाह (Actionable Takeaway):</h3>
            <p style="line-height: 1.7; font-size: 14.5px; color: #334155;">
                ${d.actionableTakeaway || 'किसी भी बड़े वित्तीय नियम या दर में बदलाव के बाद अपनी मासिक बचत, लोन पोर्टफोलियो और टैक्स देनदारी की समीक्षा अवश्य करें। नियमों की सही जानकारी ही आपको पेनल्टी से बचाती है और बेहतर रिटर्न दिलाती है।'}
            </p>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            <p style="font-size: 12px; color: #64748b; font-style: italic; line-height: 1.5;">
                <strong>डिस्क्लेमर:</strong> यह रिपोर्ट सार्वजनिक अधिसूचनाओं और वित्तीय नियामकों के आधिकारिक दस्तावेजों पर आधारित है। किसी भी वित्तीय निर्णय या शेयर बाजार निवेश से पूर्व अपने प्रमाणित वित्तीय सलाहकार (SEBI Registered Advisor) से परामर्श जरूर लें।
            </p>
        `;
    },

    // Natural Headline Generator (Zero AI Cliché)
    regenerateHeadlines(story) {
        const cat = story.category;
        const title = story.title;

        if (cat === "pension_epfo" || title.includes("वेतन आयोग") || title.includes("Pay Commission")) {
            return [
                "8वां वेतन आयोग: क्या ₹18,000 से बढ़कर ₹34,500 होगी बेसिक सैलरी? समझिए फिटमेंट फैक्टर का पूरा गणित",
                "केंद्रीय कर्मचारियों और पेंशनर्स के लिए बड़ी खबर: 8वें वेतन आयोग की सिफारिशों पर 3 बड़े अपडेट",
                "(Recommended) 8th Pay Commission 2026: सैलरी बढ़ोतरी से लेकर पेंशन रिवीजन तक, कर्मचारियों के लिए पूरा ब्योरा"
            ];
        } else if (cat === "stock_market" || title.includes("SEBI") || title.includes("F&O")) {
            return [
                "SEBI F&O New Rules: अब वीकली एक्सपायरी और लॉट साइज पर लगा बड़ा ब्रेक; छोटे ट्रेडर्स पर क्या होगा असर?",
                "शेयर बाजार में वायदा कारोबार के बदले नियम: जानिए कैसे 93% रिटेल निवेशकों को नुकसान से बचाएगा सेबी",
                "(Recommended) SEBI के 6 नए सख्त नियम: F&O ट्रेडिंग में ₹15 लाख का नया लॉट साइज और वीकली एक्सपायरी का सच"
            ];
        } else if (cat === "banking_fd") {
            return [
                "SBI Amrit Vrishti FD: 444 दिनों के लिए 7.75% ब्याज, जानिए ₹5 लाख जमा करने पर कितना मिलेगा फिक्स मुनाफा",
                "बैंक FD निवेशकों के लिए बड़ा मौका: क्या घटेंगी ब्याज दरें? जानिए किन 3 बैंकों में मिल रहा है 8% से ऊपर रिटर्न",
                "(Recommended) बैंक फिक्स्ड डिपॉजिट 2026: सीनियर सिटीजन और आम जनता के लिए सबसे ज्यादा ब्याज देने वाली 4 स्कीमें"
            ];
        } else if (cat === "tax_itr") {
            return [
                "शादी में मिले कैश शगुन और गहनों पर Income Tax का नया फैसला: जानिए ITAT ने क्यों दी टैक्स में पूरी छूट",
                "रिश्तेदारों से मिले नकद उपहार पर आयकर नोटिस? 3 दस्तावेजों के बिना फंस सकते हैं आप",
                "(Recommended) शादी में कैश गिफ्ट और गहने: इनकम टैक्स असेसमेंट से बचने के लिए जरूर संभालें ये 3 पक्के सबूत"
            ];
        }

        return [
            `${title.split(':')[0] || title}: जानिए आपकी बचत और मासिक बजट पर क्या होगा सीधा असर`,
            `नया वित्तीय नियम लागू: जानिए आम जनता और निवेशकों के लिए क्या बदलेगा`,
            `(Recommended) ${title.slice(0, 48)}... पूरी डिटेल और जरूरी नियम`
        ];
    }
};
