const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

/**
 * DHS Syntax Validator (AST-Based)
 * Verifies markdown reports follow DHS syntax specifications using markdown-it token streams.
 * Flags plain text lists and malformed card headers within language blocks.
 */

const sourceDir = path.join(__dirname, '../../source_reports');
const targetArg = process.argv[2];

// Legacy files to exclude from full suite validation (still validated if explicitly targeted)
const ignoredFiles = new Set([
    'Guillermo_Project_Proposal_2026-04-27.md',
    'Guillermo_Project_Proposal_2026-05-21.md',
    'Hadassah_UX_Audit_2026-04-28.md'
]);

let files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md'));

if (targetArg) {
    const baseName = path.basename(targetArg);
    if (files.includes(baseName)) {
        files = [baseName];
    } else {
        console.error(`Error: File not found: ${baseName}`);
        process.exit(1);
    }
}

const md = new MarkdownIt();
let totalErrors = 0;

files.forEach(file => {
    const baseName = path.basename(file);
    if (!targetArg && ignoredFiles.has(baseName)) {
        console.log(`[SKIP] ${file} (legacy report ignored)`);
        return;
    }

    const filePath = path.join(sourceDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const lines = content.split(/\r?\n/);
    let currentLang = null;
    let openLangLineNum = null;
    
    const langLines = {};
    const langLineNums = {};
    
    // Pre-initialize standard languages
    const activeLangs = ['en', 'es', 'he'];
    activeLangs.forEach(l => {
        langLines[l] = [];
        langLineNums[l] = [];
    });

    let errors = [];

    lines.forEach((line, idx) => {
        const lineNum = idx + 1;
        const trimmed = line.trim();
        
        const markerMatch = trimmed.match(/^:::(\w+)$/);
        if (markerMatch) {
            currentLang = markerMatch[1];
            openLangLineNum = lineNum;
            if (!langLines[currentLang]) {
                langLines[currentLang] = [];
                langLineNums[currentLang] = [];
            }
            return;
        }
        if (trimmed === ':::') {
            currentLang = null;
            openLangLineNum = null;
            return;
        }

        if (currentLang) {
            langLines[currentLang].push(line);
            langLineNums[currentLang].push(lineNum);
        }
    });

    if (currentLang !== null) {
        errors.push(`Line ${openLangLineNum}: Unclosed language block ':::${currentLang}'. Missing matching ':::' marker.`);
    }

    // Valid card triggers inside language blocks
    const cardTriggers = [
        'Finding', 'Hallazgo', 'ממצא',
        'Name', 'Nombre', 'שם',
        'Decision', 'Decisión', 'החלטה',
        'Action', 'Acción', 'פעולה',
        'Metric', 'Métrica', 'מדד',
        'Keyword', 'Palabra clave', 'מילת מפתח',
        'Color', 'צבע',
        'Benchmark', 'מידוד',
        'Signature', 'Firma', 'חתימה',
        'Deliverable', 'Entregable', 'תוצר'
    ];
    
    const cardTriggersRegex = new RegExp(`^[-*]?\\s*\\*\\*(?:${cardTriggers.join('|')}):\\*\\*`);

    // Validate each language buffer using markdown-it AST
    Object.keys(langLines).forEach(lang => {
        const buffer = langLines[lang].join('\n');
        if (!buffer) return;
        
        const tokens = md.parse(buffer, {});
        let checkingListItem = false;
        let checkLineNum = 1;
        
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            
            if (token.type === 'list_item_open') {
                checkingListItem = true;
                if (token.map) {
                    const bufferLineIdx = token.map[0];
                    checkLineNum = langLineNums[lang][bufferLineIdx] || 1;
                }
            } else if (token.type === 'list_item_close') {
                checkingListItem = false;
            } else if (checkingListItem && token.type === 'inline') {
                const textContent = token.content.trim();
                const isCard = cardTriggersRegex.test(textContent);
                if (!isCard) {
                    errors.push(`Line ${checkLineNum}: Plain text list item detected inside ':::${lang}' block. Convert to a valid DHS card or standard paragraph.`);
                } else {
                    // Check if card header is missing separating pipes
                    if (textContent.includes('**') && !textContent.includes('|')) {
                        const isSignature = textContent.includes('חתימה') || textContent.includes('Signature') || textContent.includes('Firma');
                        if (!isSignature) {
                            errors.push(`Line ${checkLineNum}: Card header may be missing field separation pipes ('|').`);
                        }
                    }
                }
                checkingListItem = false;
            }
        }
    });

    if (errors.length > 0) {
        console.error(`\n[FAIL] ${file} - Found ${errors.length} syntax issues:`);
        errors.forEach(err => console.error(`  --> ${err}`));
        totalErrors += errors.length;
    } else {
        console.log(`[PASS] ${file}`);
    }
});

if (totalErrors > 0) {
    console.error(`\nValidation complete: ${totalErrors} errors found.`);
    process.exit(1);
} else {
    console.log(`\nValidation complete: All reports clean.`);
    process.exit(0);
}
