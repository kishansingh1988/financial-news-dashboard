// Dynamic HTML5 Canvas Studio for 16:9 Editorial Banners & 1:1 Social Media Cards

window.CardCanvas = {
    // Render 16:9 Landscape Banner (1200x675)
    renderLandscapeBanner(canvasId, story) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = 1200;
        const h = 675;
        canvas.width = w;
        canvas.height = h;

        const d = story.alignedData;
        const headline = d.headlines[2] || d.headlines[0];
        const categoryLabel = story.categoryLabel || "FINANCIAL UPDATE";

        // 1. Background Gradient (Deep Navy to Slate)
        const bgGrad = ctx.createLinearGradient(0, 0, w, h);
        bgGrad.addColorStop(0, '#090d16');
        bgGrad.addColorStop(0.5, '#0f172a');
        bgGrad.addColorStop(1, '#1e1b4b');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // Subtle geometric grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 80) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y < h; y += 80) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // 2. Top Header Bar
        // Category Badge
        ctx.fillStyle = '#dc2626'; // Vivid Red Breaking Badge
        this.roundRect(ctx, 60, 50, 240, 42, 8);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.fillText('🔴 BREAKING UPDATE', 80, 77);

        // Category Tag
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        this.roundRect(ctx, 320, 50, 260, 42, 8);
        ctx.fill();
        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 16px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.fillText(categoryLabel, 340, 76);

        // PaisaKhabar Logo Branding
        ctx.fillStyle = '#fbbf24';
        ctx.font = '900 24px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('PAISA KHABAR', w - 60, 78);
        ctx.textAlign = 'left';

        // 3. Main Headline
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 42px "Plus Jakarta Sans", Arial, sans-serif';
        this.wrapText(ctx, headline, 60, 180, w - 120, 56, 3);

        // 4. Pocket Impact Highlight Box
        ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.lineWidth = 2;
        this.roundRect(ctx, 60, 390, w - 120, 160, 16);
        ctx.fill();
        ctx.stroke();

        // Pocket Impact Title
        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 22px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.fillText('💰 आम आदमी की जेब पर सीधा असर:', 90, 435);

        // Pocket Impact Body
        ctx.fillStyle = '#f1f5f9';
        ctx.font = '500 20px "Plus Jakarta Sans", Arial, sans-serif';
        this.wrapText(ctx, d.pocketImpact, 90, 475, w - 180, 30, 2);

        // 5. Bottom Verification Footer
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 16px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.fillText('⚡ Verified by PaisaKhabar Financial Desk • 100% Fact-Checked Analysis', 60, 615);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 16px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('www.paisakhabar.in', w - 60, 615);
        ctx.textAlign = 'left';
    },

    // Render 1:1 Square Card (1080x1080) for Instagram & Facebook
    renderSquareCard(canvasId, story) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const s = 1080;
        canvas.width = s;
        canvas.height = s;

        const d = story.alignedData;
        const headline = d.headlines[0];
        const categoryLabel = story.categoryLabel || "FINANCIAL NEWS";

        // Background
        const bgGrad = ctx.createLinearGradient(0, 0, s, s);
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(1, '#020617');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, s, s);

        // Top Header
        ctx.fillStyle = '#dc2626';
        this.roundRect(ctx, 60, 60, 260, 50, 10);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.fillText('🔴 BIG DECISION', 85, 93);

        ctx.fillStyle = '#fbbf24';
        ctx.font = '900 28px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('PAISAKHABAR', s - 60, 95);
        ctx.textAlign = 'left';

        // Headline
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px "Plus Jakarta Sans", Arial, sans-serif';
        this.wrapText(ctx, headline, 60, 190, s - 120, 60, 3);

        // 3 Key Takeaway Bullets
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1.5;
        this.roundRect(ctx, 60, 420, s - 120, 340, 20);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 24px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.fillText('📌 3 सबसे महत्वपूर्ण नियम व आंकड़े:', 90, 470);

        let curY = 525;
        (d.coreFacts.slice(0, 3)).forEach((fact, idx) => {
            ctx.fillStyle = '#38bdf8';
            ctx.font = 'bold 22px "Plus Jakarta Sans", Arial, sans-serif';
            ctx.fillText(`•`, 90, curY);

            ctx.fillStyle = '#f8fafc';
            ctx.font = '500 21px "Plus Jakarta Sans", Arial, sans-serif';
            this.wrapText(ctx, fact, 115, curY, s - 200, 32, 2);
            curY += 70;
        });

        // Bottom Pocket Impact Pill
        ctx.fillStyle = '#065f46';
        this.roundRect(ctx, 60, 800, s - 120, 170, 16);
        ctx.fill();

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 22px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.fillText('💰 जेब पर असर (Pocket Impact):', 90, 845);

        ctx.fillStyle = '#ffffff';
        ctx.font = '500 20px "Plus Jakarta Sans", Arial, sans-serif';
        this.wrapText(ctx, d.pocketImpact, 90, 885, s - 180, 28, 2);

        // Footer
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 18px "Plus Jakarta Sans", Arial, sans-serif';
        ctx.fillText('Like & Share • Follow @PaisaKhabar for Daily Smart Finance', 60, 1020);
    },

    downloadCanvas(canvasId, filename = "financial_post.png") {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    },

    // Helper: Rounded Rectangle
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    },

    // Helper: Text Wrap
    wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
        const words = text.split(' ');
        let line = '';
        let lineCount = 0;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                lineCount++;
                if (lineCount >= maxLines) {
                    ctx.fillText(line.trim() + '...', x, y);
                    return;
                }
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);
    }
};
