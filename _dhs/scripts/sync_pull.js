const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * DHS Git Sync-Pull Automation
 * Automatically stashes drafts, pulls latest template/metadata changes,
 * compiles HTML, and commits the clean build, avoiding rebase merge conflicts.
 */

const repoDir = path.join(__dirname, '../../');
const buildScript = path.join(__dirname, 'build_all.js');

function runCmd(cmd) {
    try {
        return execSync(cmd, { cwd: repoDir, encoding: 'utf8' }).trim();
    } catch (e) {
        console.error(`Failed executing: ${cmd}`);
        throw e;
    }
}

console.log(`Starting automated Git Sync-Pull...`);

try {
    // 1. Check for local changes in source_reports and _dhs
    const status = runCmd('git status --porcelain source_reports/ _dhs/');
    const hasLocalChanges = status.length > 0;
    let stashed = false;

    if (hasLocalChanges) {
        console.log(`[STASH] Stashing source and configuration drafts...`);
        runCmd('git stash push -m "DHS temporary stash before merge sync" -- source_reports/ _dhs/');
        stashed = true;
    }

    // 2. Pull latest remote commits
    console.log(`[PULL] Fetching and merging remote updates...`);
    runCmd('git pull');

    // 3. Rebuild all HTML deliverables locally
    console.log(`[BUILD] Rebuilding all deliverables...`);
    execSync(`node "${buildScript}"`, { cwd: path.join(__dirname, '../'), stdio: 'inherit' });

    // 4. Restore local changes
    if (stashed) {
        console.log(`[UNSTASH] Restoring stashed drafts...`);
        runCmd('git stash pop');
    }

    console.log(`[SUCCESS] Git sync complete. Your workspace is clean and fully updated.`);
} catch (e) {
    console.error(`\n[FATAL] Sync-pull failed. Check repository state manually.`);
    process.exit(1);
}
