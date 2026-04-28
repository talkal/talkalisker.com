const fs = require('fs');
let text = fs.readFileSync('c:/Users/talka/Desktop/talkalisker.com/scratch/original_audit.md', 'utf8');

// Replace English Implementation Roadmap
text = text.replace(/# 06\. \/implementation_roadmap\n\n- Phase 1: (.*?): (.*)\n- Phase 2: (.*?): (.*)\n- Phase 3: (.*?): (.*)/g,
`# 06. /action_plan\n\n*Developer-ready handoff tasks for immediate execution.*\n\n- **Action:** Phase 1: $1 | **Owner:** Agency | **Status:** Pending\n$2\n- **Action:** Phase 2: $3 | **Owner:** Agency | **Status:** Pending\n$4\n- **Action:** Phase 3: $5 | **Owner:** Agency | **Status:** Pending\n$6`);

// Replace Hebrew Implementation Roadmap
text = text.replace(/# 06\. \/מפת_דרכים_ליישום\n\n- שלב 1: (.*?): (.*)\n- שלב 2: (.*?): (.*)\n- שלב 3: (.*?): (.*)/g,
`# 06. /תוכנית_פעולה\n\n*משימות מוכנות להעברה לצוות הפיתוח לביצוע מיידי.*\n\n- **פעולה:** שלב 1: $1 | **אחראי:** סוכנות | **סטטוס:** ממתין\n$2\n- **פעולה:** שלב 2: $3 | **אחראי:** סוכנות | **סטטוס:** ממתין\n$4\n- **פעולה:** שלב 3: $5 | **אחראי:** סוכנות | **סטטוס:** ממתין\n$6`);

// Function to convert tables into cards
function convertTablesToCards(content, lang) {
    let lines = content.split('\n');
    let inTable = false;
    let headers = [];
    let out = [];
    
    let isHebrew = lang === 'he';
    let deliverableKey = isHebrew ? 'תוצר' : 'Deliverable';
    let detailsKey = isHebrew ? 'פרטים' : 'Details';

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
            if (!inTable) {
                inTable = true;
                // Parse headers
                let rowText = line.trim().substring(1, line.trim().length - 1);
                headers = rowText.split('|').map(s => s.trim());
                continue; // Skip header line
            }
            if (line.includes('---')) {
                continue; // Skip separator line
            }
            // Parse row
            let rowText = line.trim().substring(1, line.trim().length - 1);
            let cells = rowText.split('|').map(s => s.trim());
            if (cells.length >= 2) {
                let col1 = cells[0];
                let col2 = cells[1];
                let col3 = cells.slice(2).join(' - ');
                out.push(`* **${deliverableKey}:** ${col1} | **${detailsKey}:** ${col2}\n${col3}\n`);
            } else if (cells.length === 1) {
                out.push(`* **${deliverableKey}:** ${cells[0]} | **${detailsKey}:** \n\n`);
            }
        } else {
            if (inTable) {
                inTable = false;
                // no extra push
            }
            out.push(line);
        }
    }
    return out.join('\n');
}

let enSplit = text.split(':::he');
let enText = convertTablesToCards(enSplit[0], 'en');
let heText = convertTablesToCards(':::he' + enSplit[1], 'he');

fs.writeFileSync('c:/Users/talka/Desktop/talkalisker.com/source_reports/Hadassah_UX_Audit_2026-04-28.md', enText + heText);
console.log('Conversion complete.');
