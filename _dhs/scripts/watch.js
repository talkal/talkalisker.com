const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * DHS Hot-Reloading Watcher
 * Watches source_reports/ for saves, validates syntax, and auto-builds single reports.
 */

const sourceDir = path.join(__dirname, '../../source_reports');
const validateScript = path.join(__dirname, 'validate.js');
const buildScript = path.join(__dirname, 'build_all.js');

if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`);
    process.exit(1);
}

console.log(`Watching for changes in: ${sourceDir}`);
console.log(`Auto-linting and hot-reloading enabled. Press Ctrl+C to stop.`);

const debounceTimers = new Map();

fs.watch(sourceDir, (eventType, filename) => {
    if (!filename || !filename.endsWith('.md')) return;
    
    // Debounce triggers (discard double OS events within 150ms)
    if (debounceTimers.has(filename)) {
        clearTimeout(debounceTimers.get(filename));
    }
    
    const timer = setTimeout(() => {
        debounceTimers.delete(filename);
        handleSave(filename);
    }, 150);
    
    debounceTimers.set(filename, timer);
});

function handleSave(filename) {
    console.log(`\n[SAVE] Detected change in: ${filename}`);
    
    // Step 1: Validate Syntax
    console.log(`[LINT] Validating ${filename}...`);
    try {
        execSync(`node "${validateScript}" "${filename}"`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`[FAIL] Syntax validation failed. Rebuild skipped. Correct the errors above.`);
        return;
    }
    
    // Step 2: Compile Single Report
    console.log(`[BUILD] Compiling ${filename}...`);
    try {
        execSync(`node "${buildScript}" "${filename}"`, { stdio: 'inherit' });
        console.log(`[SUCCESS] Hot-reload complete.`);
    } catch (e) {
        console.error(`[FAIL] Compilation failed.`);
    }
}
