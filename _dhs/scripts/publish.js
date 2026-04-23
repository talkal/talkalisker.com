const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const MarkdownIt = require('markdown-it');
const Handlebars = require('handlebars');
const CryptoJS = require("crypto-js");

/**
 * Talkalisker DHS Publisher v3.0.0
 * AST-Based Markdown to HTML Pipeline
 */

const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
});

// Custom rendering for images to add classes and captions

md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const srcIndex = token.attrIndex('src');
    const src = token.attrs[srcIndex][1];
    const alt = token.content;

    // Output dir is passed via env
    const outputDir = env.outputDir;
    const assetName = path.basename(src);
    const vaultAssetPath = path.join(__dirname, '../assets', assetName);
    const targetAssetDir = path.join(outputDir, 'assets');
    const targetAssetPath = path.join(targetAssetDir, assetName);

    if (fs.existsSync(vaultAssetPath)) {
        if (!fs.existsSync(targetAssetDir)) fs.mkdirSync(targetAssetDir, { recursive: true });
        fs.copyFileSync(vaultAssetPath, targetAssetPath);
        return `<div style="text-align:center;"><img src="assets/${assetName}" alt="${alt}" class="evidence-img"><div class="img-caption">// figure: ${alt}</div></div>`;
    }
    return `[Missing Asset: ${src}]`;
};

// We intercept regular expressions in the markdown string *before* AST parsing 
// to handle our custom syntax blocks (Finding cards, Proposal cards, Language blocks).
// A more advanced approach would be writing custom markdown-it plugins, 
// but preprocessing the structured text blocks into HTML before parsing is robust enough.

function parseMarkdownContent(markdownContent, outputDir) {
    let processed = markdownContent
        // Proposal Cards
        .replace(/^\- \*\*Name:\*\* (.*?) \| \*\*Slogan:\*\* (.*?) \| \*\*Level:\*\* (.*$)\n([\s\S]*?)(?=\n- |\n# |$)/gm, (match, name, slogan, level, desc) => {
            return `\n<div class="proposal-card">
    <div class="proposal-badge">${level}</div>
    <div class="proposal-name">${name}</div>
    <div class="proposal-slogan">${slogan}</div>
    <div class="proposal-desc">${md.render(desc.trim())}</div>
</div>\n`;
        })
        // Finding Cards
        .replace(/^\- \*\*Finding:\*\* (.*?) \| \*\*Severity:\*\* (.*$)\n([\s\S]*?)(?=\n- |\n# |$)/gm, (match, title, sev, desc) => {
            const sevClass = sev.toLowerCase().trim();
            return `\n<div class="finding-card">
    <div class="finding-meta"><strong>${title}</strong><span class="severity sev-${sevClass}">${sev}</span></div>
    <div class="finding-desc">${md.render(desc.trim())}</div>
</div>\n`;
        })
        // Decision Cards (Meeting Summaries)
        .replace(/^\- \*\*Decision:\*\* (.*?) \| \*\*Impact:\*\* (.*$)\n([\s\S]*?)(?=\n- |\n# |$)/gm, (match, title, impact, desc) => {
            return `\n<div class="decision-card">
    <div class="decision-meta"><span>Strategic Decision</span><span style="color:var(--accent);">${impact} Impact</span></div>
    <div class="decision-title">${title}</div>
    <div class="decision-desc">${md.render(desc.trim())}</div>
</div>\n`;
        })
        // Action Items (Meeting Summaries)
        .replace(/^\- \*\*Action:\*\* (.*?) \| \*\*Owner:\*\* (.*?) \| \*\*Status:\*\* (.*$)/gm, (match, task, owner, status) => {
            const statusClass = status.toLowerCase().trim();
            const checkedAttr = statusClass === 'done' ? 'style="background:var(--accent);"' : '';
            return `\n<div class="action-card">
    <div class="action-info">
        <div class="action-checkbox" ${checkedAttr}></div>
        <div class="action-title">${task}</div>
        <div class="action-owner">${owner}</div>
    </div>
    <div class="action-status status-${statusClass}">${status}</div>
</div>\n`;
        })
        // Metric Cards (Monthly Retainer)
        .replace(/^\- \*\*Metric:\*\* (.*?) \| \*\*Value:\*\* (.*?) \| \*\*Trend:\*\* (.*$)/gm, (match, metric, value, trend) => {
            const trendClass = trend.includes('+') ? 'trend-up' : (trend.includes('-') ? 'trend-down' : 'trend-neutral');
            return `\n<div class="metric-card">
    <div class="metric-title">${metric}</div>
    <div class="metric-value">${value}</div>
    <div class="metric-trend ${trendClass}">${trend}</div>
</div>\n`;
        })
        // Ranking Cards (SEO Report)
        .replace(/^\- \*\*Keyword:\*\* (.*?) \| \*\*Rank:\*\* (.*?) \| \*\*Change:\*\* (.*$)/gm, (match, keyword, rank, change) => {
            const changeClass = change.includes('+') ? 'trend-up' : (change.includes('-') ? 'trend-down' : 'trend-neutral');
            return `\n<div class="ranking-card">
    <div class="ranking-keyword">${keyword}</div>
    <div class="ranking-stats">
        <div class="ranking-position">#${rank}</div>
        <div class="ranking-change ${changeClass}">${change}</div>
    </div>
</div>\n`;
        })
        // Color Swatches (Project Handoff)
        .replace(/^\- \*\*Color:\*\* (.*?) \| \*\*Hex:\*\* (.*?) \| \*\*Usage:\*\* (.*$)/gm, (match, color, hex, usage) => {
            return `\n<div class="swatch-card">
    <div class="swatch-color" style="background:${hex};"></div>
    <div class="swatch-info">
        <div class="swatch-name">${color}</div>
        <div class="swatch-hex">${hex}</div>
        <div class="swatch-usage">${usage}</div>
    </div>
</div>\n`;
        });

    // Add CSS IDs to headings for navigation
    processed = processed.replace(/^# (.*\/(\w+).*$)/gm, '<h1 id="$2">$1</h1>');

    return md.render(processed, { outputDir });
}

function generateMasterIndex(baseDir) {
    const clientsDir = path.join(baseDir, 'clients');
    if (!fs.existsSync(clientsDir)) return;

    const groupedReports = {}; 
    
    fs.readdirSync(clientsDir).forEach(dir => {
        const indexPath = path.join(clientsDir, dir, 'index.html');
        if (fs.existsSync(indexPath) && dir !== 'index.html') {
            const html = fs.readFileSync(indexPath, 'utf8');
            const isConfidential = html.includes('name="confidential" content="true"');
            if (isConfidential) return;

            const client = html.match(/name="client" content="(.*?)"/)?.[1] || dir;
            const project = html.match(/name="project" content="(.*?)"/)?.[1] || client;
            const rawDate = html.match(/name="date" content="(.*?)"/)?.[1] || "";
            // Normalize date to YYYY-MM-DD regardless of input format
            const dateObj = new Date(rawDate);
            const date = !isNaN(dateObj.getTime()) ? dateObj.toISOString().split('T')[0] : rawDate;
            const title = html.match(/<title>(.*?) \|/)?.[1] || "Audit Report";
            const type = html.match(/name="type" content="(.*?)"/)?.[1] || "Audit";

            if (!groupedReports[project]) groupedReports[project] = [];
            groupedReports[project].push({ dir, client, date, title, type });
        }
    });

    Object.keys(groupedReports).forEach(p => {
        groupedReports[p].sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    // We can also use Handlebars for the index eventually, but string literal is fine here
    const masterPassword = "kalisker123"; // Tal's master password
    
    let htmlContent = `
        <div class="logo">
            <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 3.8l7.2 14.2H4.8L12 5.8z"/>
            </svg>
            TalKalisker Master Index
        </div>

        <div class="section-badge">Client Deliverables Dashboard</div>
        
        <div class="group-container">
            ${Object.keys(groupedReports).sort().map(client => `
            <div class="client-group">
                <h2 class="client-name">${client.toUpperCase()}</h2>
                <div class="reports-list">
                    ${groupedReports[client].map(r => `
                    <a href="${r.dir}/" class="report-row">
                        <div class="report-meta">
                            <span class="report-type">${r.type}</span>
                            <span class="report-date">${r.date}</span>
                        </div>
                        <div class="report-title">${r.title}</div>
                    </a>
                    `).join('')}
                </div>
            </div>
            `).join('')}
        </div>
    `;

    const encryptedContent = CryptoJS.AES.encrypt(htmlContent, masterPassword).toString();

    let indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DHS Master Index</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Outfit:wght@600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
    <style>
        body { background: #111; color: #fff; font-family: 'Outfit', sans-serif; padding: 4rem 10%; }
        .project-section { margin-bottom: 5rem; }
        .project-header { font-family: 'JetBrains Mono'; color: #B85A44; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem; font-size: 0.9rem; letter-spacing: 0.1em; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
        .card { background: #1A1A1A; border: 1px solid rgba(255,255,255,0.05); padding: 2rem; border-radius: 12px; text-decoration: none; color: inherit; transition: border-color 0.3s, transform 0.2s; }
        .card:hover { border-color: #B85A44; transform: translateY(-4px); }
        .card-label { font-family: 'JetBrains Mono'; font-size: 0.7rem; color: #B85A44; margin-bottom: 0.5rem; text-transform: uppercase; }
        .card-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.2; }
        .card-meta { font-family: 'JetBrains Mono'; font-size: 0.8rem; color: rgba(255,255,255,0.4); display: flex; justify-content: space-between; }
    </style>
</head>
<body>
    <div id="lock-screen" class="container" style="text-align: center; margin-top: 100px;">
        <svg class="icon" style="color:var(--accent); margin-bottom:20px;" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.8l7.2 14.2H4.8L12 5.8z"/></svg>
        <h2 style="margin-bottom:10px;">Master Archive</h2>
        <p style="color:var(--text-secondary); margin-bottom: 20px;">Restricted access. Authentication required.</p>
        <input type="password" id="auth-key" placeholder="Enter master key..." style="width: 100%; max-width:300px; padding: 1rem; border-radius: 8px; border: 1px solid var(--border); background: var(--bg); color: var(--text); margin-bottom: 1rem; font-family: var(--font-mono);">
        <div>
            <button onclick="attemptDecrypt()" style="width: 100%; max-width:300px; padding: 1rem; border-radius: 8px; border: none; background: var(--accent); color: white; font-weight: 700; cursor: pointer;">Decrypt Archive</button>
        </div>
        <div id="auth-error" style="color: #ff4a4a; margin-top: 1rem; display: none; font-size: 0.8rem; font-family: var(--font-mono);">ERROR: Invalid master key.</div>
    </div>

    <div id="decrypted-content" class="container" style="display: none;"></div>

    <script id="encrypted-payload" type="application/json">"${encryptedContent}"</script>
    <script>
        function attemptDecrypt() {
            const key = document.getElementById('auth-key').value;
            const payloadRaw = document.getElementById('encrypted-payload').textContent;
            const ciphertext = payloadRaw.slice(1, -1);
            
            try {
                const bytes = CryptoJS.AES.decrypt(ciphertext, key);
                const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
                if (!decryptedStr) throw new Error("Decryption returned empty");
                
                document.getElementById('lock-screen').style.display = 'none';
                document.getElementById('decrypted-content').innerHTML = decryptedStr;
                document.getElementById('decrypted-content').style.display = 'block';
            } catch (e) {
                document.getElementById('auth-error').style.display = 'block';
                document.getElementById('auth-key').value = '';
            }
        }
    </script>
</body>
</html>`;

    fs.writeFileSync(path.join(clientsDir, 'index.html'), indexHtml);
    console.log("Master Index rebuilt successfully (v3.0).");
}

function publish(markdownPath, outputDir) {
    const fileContent = fs.readFileSync(markdownPath, 'utf8');
    
    // Use proper front-matter parser
    const parsed = fm(fileContent);
    const metadata = parsed.attributes;
    const bodyMarkdown = parsed.body;

    const shellPath = path.join(__dirname, '../brand/dashboard_shell.html');
    const shellSource = fs.readFileSync(shellPath, 'utf8');
    const template = Handlebars.compile(shellSource);

    // Bilingual Parsing
    let parseLangs = metadata.languages;
    let langs = [];
    if (typeof parseLangs === 'string') {
        langs = parseLangs.replace(/[\[\]'"]/g, '').split(',').map(l => l.trim()).filter(l => l);
    } else if (Array.isArray(parseLangs)) {
        langs = parseLangs;
    } else {
        langs = ['en'];
    }

    const contentMap = {
        content_en: "", nav_en: "",
        content_es: "", nav_es: "",
        content_he: "", nav_he: ""
    };

    langs.forEach(l => {
        let langMd = bodyMarkdown;
        const marker = new RegExp(`:::${l}([\\s\\S]*?):::`, 'g');
        const matches = [...bodyMarkdown.matchAll(marker)];
        if (matches.length > 0) {
            langMd = matches.map(m => m[1].trim()).join('\n\n');
        }

        // Extract headings for dynamic sidebar navigation
        const navItems = [];
        const headingRegex = /^# (.*\/(\w+).*$)/gm;
        let match;
        while ((match = headingRegex.exec(langMd)) !== null) {
            navItems.push(`<a href="#${match[2]}" class="nav-link">${match[1]}</a>`);
        }
        contentMap[`nav_${l}`] = navItems.join('\n            ');
        contentMap[`content_${l}`] = parseMarkdownContent(langMd, outputDir);
    });

    const payload = {
        content_en: contentMap.content_en, nav_en: contentMap.nav_en,
        content_es: contentMap.content_es, nav_es: contentMap.nav_es,
        content_he: contentMap.content_he, nav_he: contentMap.nav_he
    };

    const isProtected = !!metadata.password;
    const encryptedPayload = isProtected 
        ? CryptoJS.AES.encrypt(JSON.stringify(payload), metadata.password.toString()).toString()
        : null;

    const templateData = {
        title: metadata.title || "Audit",
        client: metadata.client || "Client",
        project: metadata.project || metadata.client,
        type: metadata.type || "Draft",
        date: metadata.date || new Date().toISOString().split('T')[0],
        confidential: metadata.confidential || false,
        languages: JSON.stringify(langs),
        isProtected,
        encryptedPayload,
        ...contentMap
    };

    const html = template(templateData);

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    
    console.log(`Successfully published report to ${outputDir}`);
    generateMasterIndex(path.join(outputDir, '../../'));
}

// Export for reuse by delete_report.js
module.exports = { generateMasterIndex };

const args = process.argv.slice(2);
if (args.length >= 2) publish(args[0], args[1]);
else if (require.main === module) console.error("Usage: node publish.js [input_path] [output_dir]");
