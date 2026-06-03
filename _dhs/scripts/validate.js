const fs = require('fs');
const path = require('path');

/**
 * DHS Syntax Validator
 * Verifies markdown reports follow DHS syntax specifications, flagging plain text lists
 * and malformed card headers within language blocks to prevent layout issues.
 */

const sourceDir = path.join(__dirname, '../../source_reports');
const targetArg = process.argv[2];

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

let totalErrors = 0;

files.forEach(file => {
    const filePath = path.join(sourceDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    
    let currentLang = null;
    let errors = [];
    
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
    
    const cardTriggersRegex = new RegExp(`^[-*] \\*\\*(?:${cardTriggers.join('|')}):\\*\\*`);

    lines.forEach((line, idx) => {
        const lineNum = idx + 1;
        const trimmed = line.trim();
        
        // Language Block Markers
        const langMatch = trimmed.match(/^:::(\w+)$/);
        if (langMatch) {
            currentLang = langMatch[1];
            return;
        }
        if (trimmed === ':::') {
            currentLang = null;
            return;
        }
        
        // Checks inside language blocks
        if (currentLang) {
            // Check for list items
            const isList = trimmed.startsWith('- ') || trimmed.startsWith('* ');
            if (isList) {
                // Verify if it is a card
                const isCard = cardTriggersRegex.test(trimmed);
                if (!isCard) {
                    errors.push(`Line ${lineNum}: Plain text list item detected inside ':::${currentLang}' block. Convert to a valid DHS card or standard paragraph.`);
                    return;
                }
                
                // Verify card syntax structure (check for separating pipes where expected)
                if (trimmed.includes('**') && !trimmed.includes('|')) {
                    // Signatures don't always require pipes, but others usually do
                    const isSignature = trimmed.includes('חתימה') || trimmed.includes('Signature') || trimmed.includes('Firma');
                    if (!isSignature) {
                        errors.push(`Line ${lineNum}: Card header may be missing field separation pipes ('|').`);
                    }
                }
            }
        }
    });

    if (currentLang !== null) {
        errors.push(`EOF: Unclosed language block ':::${currentLang}'. Missing matching ':::' marker.`);
    }

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
