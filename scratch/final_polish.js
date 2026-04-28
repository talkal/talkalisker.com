const fs = require('fs');
let text = fs.readFileSync('c:/Users/talka/Desktop/talkalisker.com/scratch/original_audit.md', 'utf8');

// 1. Fix Implementation Roadmap (English)
text = text.replace(/# 06\. \/implementation_roadmap\n\n- \*\*Phase 1: (.*?)\*\* (.*)\n- \*\*Phase 2: (.*?)\*\* (.*)\n- \*\*Phase 3: (.*?)\*\* (.*)/g,
`# 06. /action_plan

*Developer-ready handoff tasks for immediate execution.*

- **Action:** Phase 1: $1 | **Owner:** Agency | **Status:** Pending
$2
- **Action:** Phase 2: $3 | **Owner:** Agency | **Status:** Pending
$4
- **Action:** Phase 3: $5 | **Owner:** Agency | **Status:** Pending
$6`);

// 2. Fix Implementation Roadmap (Hebrew)
text = text.replace(/# 06\. \/מפת_דרכים_ליישום\n\n- \*\*שלב א': (.*?)\*\* (.*)\n- \*\*שלב ב': (.*?)\*\* (.*)\n- \*\*שלב ג': (.*?)\*\* (.*)/g,
`# 06. /תוכנית_פעולה

*משימות מוכנות להעברה לצוות הפיתוח לביצוע מיידי.*

- **פעולה:** שלב א': $1 | **אחראי:** סוכנות | **סטטוס:** ממתין
$2
- **פעולה:** שלב ב': $3 | **אחראי:** סוכנות | **סטטוס:** ממתין
$4
- **פעולה:** שלב ג': $5 | **אחראי:** סוכנות | **סטטוס:** ממתין
$6`);

// 3. Ensure a blank line before every table START, but NOT between rows
// We identify a table start as a line starting with | followed by a separator line starting with | ---
// But it's easier to just ensure there's a newline before any | that isn't preceded by a |
let lines = text.split('\n');
let processedLines = [];
for (let i = 0; i < lines.length; i++) {
    let current = lines[i];
    let prev = i > 0 ? lines[i-1] : "";
    
    if (current.trim().startsWith('|') && !prev.trim().startsWith('|') && prev.trim() !== "") {
        processedLines.push(""); // Add blank line before table
    }
    processedLines.push(current);
}
text = processedLines.join('\n');

fs.writeFileSync('c:/Users/talka/Desktop/talkalisker.com/source_reports/Hadassah_UX_Audit_2026-04-28.md', text);
console.log('Final polish complete.');
