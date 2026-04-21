const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const MarkdownIt = require('markdown-it');
const Handlebars = require('handlebars');

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
const defaultRender = md.renderer.rules.image || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};

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
            const date = html.match(/name="date" content="(.*?)"/)?.[1] || "";
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
    let indexHtml = `<!DOCTYPE html><html lang="en" data-theme="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Client Portal | Talkalisker</title><link rel="stylesheet" href="../css/styles.css"><link rel="stylesheet" href="../css/services.css"><style>
        body { background: #111; color: #fff; font-family: 'Outfit', sans-serif; padding: 4rem 10%; }
        .project-section { margin-bottom: 5rem; }
        .project-header { font-family: 'JetBrains Mono'; color: #B85A44; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem; font-size: 0.9rem; letter-spacing: 0.1em; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
        .card { background: #1A1A1A; border: 1px solid rgba(255,255,255,0.05); padding: 2rem; border-radius: 12px; text-decoration: none; color: inherit; transition: border-color 0.3s, transform 0.2s; }
        .card:hover { border-color: #B85A44; transform: translateY(-4px); }
        .card-label { font-family: 'JetBrains Mono'; font-size: 0.7rem; color: #B85A44; margin-bottom: 0.5rem; text-transform: uppercase; }
        .card-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.2; }
        .card-meta { font-family: 'JetBrains Mono'; font-size: 0.8rem; color: rgba(255,255,255,0.4); display: flex; justify-content: space-between; }
    </style></head><body>
        <div style="font-family: 'JetBrains Mono'; color: #666; margin-bottom: 0.5rem;">// talkalisker: access_granted</div>
        <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 4rem 0;">Client Deliverables</h1>
        ${Object.keys(groupedReports).map(project => `
            <div class="project-section">
                <div class="project-header">FOLDER: /${project.toLowerCase().replace(/\s+/g, '_')}</div>
                <div class="grid">
                    ${groupedReports[project].map(r => `
                        <a href="${r.dir}/" class="card">
                            <div class="card-label">${r.type}</div>
                            <div class="card-title">${r.title}</div>
                            <div class="card-meta"><span>${r.client}</span><span>${r.date}</span></div>
                        </a>
                    `).join('')}
                </div>
            </div>
        `).join('')}
    </body></html>`;

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
        content_en: "",
        content_es: "",
        content_he: ""
    };

    langs.forEach(l => {
        let langMd = bodyMarkdown;
        const marker = new RegExp(`:::${l}([\\s\\S]*?):::`, 'g');
        const matches = [...bodyMarkdown.matchAll(marker)];
        if (matches.length > 0) {
            langMd = matches.map(m => m[1].trim()).join('\n\n');
        }
        contentMap[`content_${l}`] = parseMarkdownContent(langMd, outputDir);
    });

    const templateData = {
        title: metadata.title || "Audit",
        client: metadata.client || "Client",
        project: metadata.project || metadata.client,
        type: metadata.type || "Draft",
        date: metadata.date || new Date().toISOString().split('T')[0],
        confidential: metadata.confidential || false,
        languages: JSON.stringify(langs),
        ...contentMap
    };

    const html = template(templateData);

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    
    console.log(`Successfully published report to ${outputDir}`);
    generateMasterIndex(path.join(outputDir, '../../'));
}

const args = process.argv.slice(2);
if (args.length >= 2) publish(args[0], args[1]);
else console.error("Usage: node publish.js [input_path] [output_dir]");
