const { JSDOM } = require('jsdom');

const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
    <div class="lang-block" lang="en" style="display: block;">
        <div class="signature-card">
            <div class="signature-role">Lead Strategist</div>
            <div class="signature-line"></div>
        </div>
    </div>
    <div class="lang-block" lang="he" style="display: none;">
        <div class="signature-card">
            <div class="signature-role">אסטרטג ראשי</div>
            <div class="signature-line"></div>
        </div>
    </div>
</body>
</html>
`);

const document = dom.window.document;

function testMatch(sigRole) {
    const allBlocks = document.querySelectorAll('.lang-block');
    let matchIndex = -1;

    allBlocks.forEach(block => {
        const cards = block.querySelectorAll('.signature-card');
        cards.forEach((card, idx) => {
            if (matchIndex !== -1) return;
            const roleEl = card.querySelector('.signature-role');
            
            // JSDOM doesn't implement offsetParent perfectly, so we emulate the logic manually:
            const isVisible = block.style.display !== 'none';
            // Wait, in real browser, if it's display: none, offsetParent is null
            // We'll just use textContent.trim() for both, because in this simple DOM, innerText == textContent.
            const cardRole = roleEl.textContent.trim();
            
            console.log(`Checking block '${block.getAttribute('lang')}' card ${idx}: cardRole='${cardRole}' against sigRole='${sigRole}'`);
            
            if (sigRole === cardRole || sigRole === 'unknown' || !sigRole) {
                matchIndex = idx;
            }
        });
    });
    
    return matchIndex;
}

console.log("Match for 'אסטרטג ראשי':", testMatch("אסטרטג ראשי"));
