const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Talkalisker DHS - Build Automation
 * Compiles all markdown files in source_reports/ to the designated HTML portal.
 */

const sourceDir = path.join(__dirname, '../../source_reports');
const clientsDir = path.join(__dirname, '../../clients');
const publishScript = path.join(__dirname, 'publish.js');

if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`);
    process.exit(1);
}

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md'));

console.log(`Found ${files.length} reports to process.`);

files.forEach(file => {
    const inputPath = path.join(sourceDir, file);
    // Determine folder name: 'Hadassah_UX_Audit.md' -> 'hadassah-ux-audit'
    const folderName = file.replace('.md', '').toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
    const outputDir = path.join(clientsDir, folderName);
    
    console.log(`Processing: ${file} -> ${folderName}`);
    try {
        execSync(`node "${publishScript}" "${inputPath}" "${outputDir}"`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to build ${file}`);
    }
});

console.log('Build complete.');
