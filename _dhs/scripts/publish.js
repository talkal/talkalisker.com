const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const MarkdownIt = require('markdown-it');
const Handlebars = require('handlebars');
const CryptoJS = require("crypto-js");

// Client password registry — single source of truth for all client passwords
const registryPath = path.join(__dirname, '../clients.json');
const clientRegistry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

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
        .replace(/^\- \*\*Name:\*\* (.*?) \| \*\*Slogan:\*\* (.*?) \| \*\*Level:\*\* (.*)\r?\n([\s\S]*?)(?=\r?\n\- \*\*Name:\*\*|\r?\n# |$)/gm, (match, name, slogan, level, desc) => {
            return `\n<div class="proposal-card">
    <div class="proposal-badge">${level}</div>
    <div class="proposal-name">${name}</div>
    <div class="proposal-slogan">${slogan}</div>
    <div class="proposal-desc">${md.render(desc.trim())}</div>
</div>\n`;
        })
        // Finding Cards
        .replace(/^\- \*\*Finding:\*\* (.*?) \| \*\*Severity:\*\* (.*)\r?\n([\s\S]*?)(?=\r?\n\- \*\*Finding:\*\*|\r?\n# |$)/gm, (match, title, sev, desc) => {
            const sevClass = sev.toLowerCase().trim();
            return `\n<div class="finding-card">
    <div class="finding-meta"><strong>${title}</strong><span class="severity sev-${sevClass}">${sev}</span></div>
    <div class="finding-desc">${md.render(desc.trim())}</div>
</div>\n`;
        })
        // Decision Cards (Meeting Summaries)
        .replace(/^\- \*\*Decision:\*\* (.*?) \| \*\*Impact:\*\* (.*)\r?\n([\s\S]*?)(?=\r?\n\- \*\*Decision:\*\*|\r?\n# |$)/gm, (match, title, impact, desc) => {
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
        })
        // Signature Cards
        .replace(/^\- \*\*Signature:\*\* (.*?) \| \*\*Role:\*\* (.*$)/gm, (match, name, role) => {
            return `\n<div class="signature-card">
    <div class="signature-line"></div>
    <div class="signature-name">${name}</div>
    <div class="signature-role">${role}</div>
</div>\n`;
        })
        // Deliverable Cards
        .replace(/^\* \*\*Deliverable:\*\* (.*?) \| \*\*Details:\*\* (.*)\r?\n([\s\S]*?)(?=\r?\n\* \*\*Deliverable:\*\*|\r?\n# |$)/gm, (match, title, subtitle, desc) => {
            const fullDetails = subtitle + "\n" + desc;
            return `\n<div class="deliverable-card">
    <div class="deliverable-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    </div>
    <div class="deliverable-body">
        <div class="deliverable-title">${title}</div>
        <div class="deliverable-details">${md.render(fullDetails.trim())}</div>
    </div>
</div>\n`;
        });

    // Add CSS IDs to headings for navigation
    processed = processed.replace(/^# (.*\/(\w+).*$)/gm, '<h1 id="$2">$1</h1>');
    return md.render(processed, { outputDir });
}

function generateNav(markdownContent) {
    const navItems = [];
    const headingRegex = /^# (.*\/(\w+).*$)/gm;
    let match;
    while ((match = headingRegex.exec(markdownContent)) !== null) {
        navItems.push(`<a href="#${match[2]}" class="nav-link">${match[1]}</a>`);
    }
    return navItems.join('\n            ');
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
    const masterPassword = clientRegistry._master || "kalisker123";
        let htmlContent = `
        <div class="header">
            <a href="https://talkalisker.com/developer-services" class="logo" style="text-decoration: none; color: inherit;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#B85A44"><path d="M12 2L2 22h20L12 2zm0 3.8l7.2 14.2H4.8L12 5.8z"/></svg>
                <span>TalKalisker</span>
            </a>
            <div class="subtitle">Client Deliverables Portal</div>
        </div>

        ${Object.keys(groupedReports).sort().map(project => `
        <section class="project-section">
            <div class="project-header">
                <span class="project-label">PROJECT</span>
                <span class="project-name">${project}</span>
            </div>
            <div class="grid">
                ${groupedReports[project].map(r => `
                <a href="${r.dir}/" class="card">
                    <div class="card-type">${r.type}</div>
                    <div class="card-title">${r.title}</div>
                    <div class="card-footer">
                        <span class="card-client">${r.client}</span>
                        <span class="card-date">${r.date}</span>
                    </div>
                </a>
                `).join('')}
            </div>
        </section>
        `).join('')}

        <footer class="index-footer">
            <span>talkalisker.com</span>
            <span>Deliverables System v3.0</span>
        </footer>
    `;

    const encryptedContent = CryptoJS.AES.encrypt(htmlContent, masterPassword).toString();

    let indexHtml = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Client Portal | TalKalisker</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
    <style>
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
            --bg-core: #0F0F0F;
            --bg-surface: #1A1A1A;
            --bg-elevated: #242424;
            --accent: #B85A44;
            --accent-glow: rgba(184, 90, 68, 0.15);
            --text-primary: #F5F0EB;
            --text-secondary: rgba(245, 240, 235, 0.45);
            --border-subtle: rgba(255,255,255, 0.06);
            --font-body: 'Outfit', sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
        }
        body {
            background: var(--bg-core);
            color: var(--text-primary);
            font-family: var(--font-body);
            min-height: 100vh;
            padding: 3rem 8%;
        }
        @media (max-width: 768px) { body { padding: 2rem 5%; } }

        /* Header */
        .header { margin-bottom: 4rem; }
        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.5rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 0.5rem;
        }
        .subtitle {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--text-secondary);
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        /* Project Sections */
        .project-section { margin-bottom: 4rem; }
        .project-header {
            display: flex;
            align-items: baseline;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-subtle);
        }
        .project-label {
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--accent);
            letter-spacing: 0.15em;
            text-transform: uppercase;
            flex-shrink: 0;
        }
        .project-name {
            font-size: 1.6rem;
            font-weight: 700;
            letter-spacing: -0.01em;
        }

        /* Card Grid */
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.25rem;
        }
        @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
        .card {
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: 12px;
            padding: 1.75rem;
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            transition: border-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
        }
        .card:hover {
            border-color: var(--accent);
            transform: translateY(-4px);
            box-shadow: 0 12px 40px var(--accent-glow);
        }
        .card-type {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            line-height: 1.3;
            flex-grow: 1;
        }
        .card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-secondary);
            padding-top: 0.75rem;
            border-top: 1px solid var(--border-subtle);
        }

        /* Footer */
        .index-footer {
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border-subtle);
            display: flex;
            justify-content: space-between;
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--text-secondary);
        }

        /* Lock Screen */
        .lock-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            text-align: center;
        }
        .lock-logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.3rem;
            font-weight: 800;
            margin-bottom: 2.5rem;
            opacity: 0.7;
        }
        .lock-badge {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--accent);
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }
        .lock-title {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        .lock-desc {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 2rem;
            max-width: 360px;
        }
        .lock-input {
            width: 100%;
            max-width: 340px;
            padding: 1rem 1.25rem;
            border-radius: 10px;
            border: 1px solid var(--border-subtle);
            background: var(--bg-surface);
            color: var(--text-primary);
            font-family: var(--font-mono);
            font-size: 0.9rem;
            margin-bottom: 1rem;
            text-align: center;
            transition: border-color 0.3s;
        }
        .lock-input:focus { outline: none; border-color: var(--accent); }
        .lock-btn {
            width: 100%;
            max-width: 340px;
            padding: 1rem;
            border-radius: 10px;
            border: none;
            background: var(--accent);
            color: white;
            font-family: var(--font-body);
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            transition: opacity 0.2s, transform 0.15s;
        }
        .lock-btn:hover { opacity: 0.9; transform: scale(1.01); }
        .lock-btn:active { transform: scale(0.98); }
        .lock-error {
            color: #E85D4A;
            margin-top: 1rem;
            display: none;
            font-size: 0.8rem;
            font-family: var(--font-mono);
        }
    </style>
</head>
<body>
    <div id="lock-screen" class="lock-container">
        <a href="https://talkalisker.com/developer-services" class="lock-logo" style="text-decoration: none; color: inherit;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#B85A44"><path d="M12 2L2 22h20L12 2zm0 3.8l7.2 14.2H4.8L12 5.8z"/></svg>
            <span>TalKalisker</span>
        </a>
        <div class="lock-badge">🔒 Restricted Access</div>
        <h1 class="lock-title">Client Portal</h1>
        <p class="lock-desc">Enter your master key to access the deliverables archive.</p>
        <input type="password" id="auth-key" class="lock-input" placeholder="Enter master key..." onkeydown="if(event.key==='Enter')attemptDecrypt()">
        <button onclick="attemptDecrypt()" class="lock-btn">Authenticate & Decrypt</button>
        <div id="auth-error" class="lock-error">ERROR: Invalid key. Verification failed.</div>
    </div>

    <div id="decrypted-content" style="display: none;"></div>

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

    const contentMap = {};

    // Initialize content strings for each language
    langs.forEach(l => {
        contentMap[`content_${l}`] = '';
    });

    // Parser for language blocks
    const lines = bodyMarkdown.split('\n');
    let currentLang = null; 
    
    lines.forEach(line => {
        const markerMatch = line.trim().match(/^:::(\w+)$/);
        if (markerMatch) {
            currentLang = markerMatch[1];
            return;
        }
        if (line.trim() === ':::') {
            currentLang = null;
            return;
        }

        if (currentLang) {
            if (langs.includes(currentLang)) {
                contentMap[`content_${currentLang}`] += line + '\n';
            }
        } else {
            // Shared content goes to all languages
            langs.forEach(l => {
                contentMap[`content_${l}`] += line + '\n';
            });
        }
    });

    // Render and build nav for each language
    langs.forEach(l => {
        const finalMd = contentMap[`content_${l}`].trim();
        contentMap[`content_${l}`] = parseMarkdownContent(finalMd, outputDir);
        contentMap[`nav_${l}`] = generateNav(finalMd);
    });

    const payload = {
        content_en: contentMap.content_en, nav_en: contentMap.nav_en,
        content_es: contentMap.content_es, nav_es: contentMap.nav_es,
        content_he: contentMap.content_he, nav_he: contentMap.nav_he
    };

    // Resolve password: per-report override > client registry > unprotected
    const clientName = metadata.client || '';
    const resolvedPassword = metadata.password 
        || clientRegistry[clientName] 
        || null;

    const isProtected = !!resolvedPassword;
    const encryptedPayload = isProtected 
        ? CryptoJS.AES.encrypt(JSON.stringify(payload), resolvedPassword.toString()).toString()
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
