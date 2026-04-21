const fs = require('fs');
const path = require('path');

/**
 * Talkalisker DHS Deletion Utility
 * Safely removes a report from the deployment folder and rebuilds the Master Index.
 */

// We need to import generateMasterIndex from publish.js or just re-implement simple version
// Re-implementing simplified index trigger for isolation
function triggerIndexRebuild(baseDir) {
    const publishPath = path.join(__dirname, 'publish.js');
    // We can't easily import from the current structure without exports, 
    // so we'll just run a "dummy" publish or call a function if we had it exported.
    // For now, I'll just include the generateMasterIndex logic here to be safe and fast.
    
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
    console.log("Master Index rebuilt successfully after deletion.");
}

function deleteReport(folderName) {
    const clientsDir = 'c:/Users/talka/Desktop/talkalisker.com/clients';
    const targetDir = path.join(clientsDir, folderName);

    if (fs.existsSync(targetDir)) {
        console.log(`Deleting report folder: ${folderName}...`);
        fs.rmSync(targetDir, { recursive: true, force: true });
        console.log("Deletion complete.");
        triggerIndexRebuild(path.join(__dirname, '../../talkalisker.com'));
    } else {
        console.error(`Report folder not found: ${folderName}`);
    }
}

const args = process.argv.slice(2);
if (args[0]) {
    deleteReport(args[0]);
} else {
    console.log("Usage: node delete_report.js [folder_name]");
}
