const fs = require('fs');
let text = fs.readFileSync('c:/Users/talka/Desktop/talkalisker.com/scratch/original_audit.md', 'utf8');

// Replace English Implementation Roadmap with Action Cards (On-brand and sensible)
text = text.replace(/# 06\. \/implementation_roadmap\n\n- Phase 1: (.*?): (.*)\n- Phase 2: (.*?): (.*)\n- Phase 3: (.*?): (.*)/g,
`# 06. /action_plan

*Developer-ready handoff tasks for immediate execution.*

- **Action:** Phase 1: $1 | **Owner:** Agency | **Status:** Pending
$2
- **Action:** Phase 2: $3 | **Owner:** Agency | **Status:** Pending
$4
- **Action:** Phase 3: $5 | **Owner:** Agency | **Status:** Pending
$6`);

// Replace Hebrew Implementation Roadmap with Action Cards
text = text.replace(/# 06\. \/מפת_דרכים_ליישום\n\n- שלב א': (.*?): (.*)\n- שלב ב': (.*?): (.*)\n- שלב ג': (.*?): (.*)/g,
`# 06. /תוכנית_פעולה

*משימות מוכנות להעברה לצוות הפיתוח לביצוע מיידי.*

- **פעולה:** שלב א': $1 | **אחראי:** סוכנות | **סטטוס:** ממתין
$2
- **פעולה:** שלב ב': $3 | **אחראי:** סוכנות | **סטטוס:** ממתין
$4
- **פעולה:** שלב ג': $5 | **אחראי:** סוכנות | **סטטוס:** ממתין
$5`);

// Ensure there is a blank line before every table to ensure MarkdownIt parses them correctly
text = text.replace(/\n\|/g, '\n\n|');

fs.writeFileSync('c:/Users/talka/Desktop/talkalisker.com/source_reports/Hadassah_UX_Audit_2026-04-28.md', text);
console.log('Restoration to Table-based Appendices complete.');
