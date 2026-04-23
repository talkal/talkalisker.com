const fs = require('fs');
const path = require('path');
const { generateMasterIndex } = require('./publish');

/**
 * Talkalisker DHS Deletion Utility
 * Safely removes a report from the deployment folder and rebuilds the Master Index.
 * 
 * Usage: node delete_report.js <folder-name>
 * Example: node delete_report.js guillermo-naming-strategy
 */

function deleteReport(folderName) {
    const baseDir = path.join(__dirname, '../../');
    const clientsDir = path.join(baseDir, 'clients');
    const sourceDir = path.join(baseDir, 'source_reports');
    const targetDir = path.join(clientsDir, folderName);

    if (!fs.existsSync(targetDir)) {
        console.error(`Report folder not found: ${folderName}`);
        console.log('\nAvailable reports:');
        fs.readdirSync(clientsDir)
            .filter(d => fs.statSync(path.join(clientsDir, d)).isDirectory())
            .forEach(d => console.log(`  - ${d}`));
        process.exit(1);
    }

    // Delete compiled output
    console.log(`Deleting compiled output: clients/${folderName}/`);
    fs.rmSync(targetDir, { recursive: true, force: true });

    // Check if a matching source file exists and offer to delete it
    const possibleSource = fs.readdirSync(sourceDir).find(f => {
        const slug = f.replace('.md', '').toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
        return slug === folderName;
    });

    if (possibleSource) {
        console.log(`Deleting source file: source_reports/${possibleSource}`);
        fs.unlinkSync(path.join(sourceDir, possibleSource));
    }

    // Rebuild the Master Index
    generateMasterIndex(baseDir);
    console.log('Done. Report deleted and index rebuilt.');
}

const args = process.argv.slice(2);
if (args[0]) {
    deleteReport(args[0]);
} else {
    console.log('Usage: node delete_report.js <folder-name>');
    console.log('Example: node delete_report.js guillermo-naming-strategy');
}
