const content = `* **Deliverable:** Brand Strategy & Naming | **Details:** Research and creative direction (Phase 1):
- Strategic naming research
- Brand identity & voice development
- 2 distinct brand directions for your strategic choice

* **Deliverable:** Full Brand Identity Kit | **Details:** Visual system and guidelines (Phase 2):
- Professional logo suite (primary, secondary, variations)
- Premium color palette & typography system
- Comprehensive brand guidelines document`;

const regex = /^\* \*\*Deliverable:\*\* (.*?) \| \*\*Details:\*\* (.*)\r?\n([\s\S]*?)(?=\r?\n\* \*\*Deliverable:\*\*|\r?\n# |$(?![\s\S]))/gm;

const processed = content.replace(regex, (match, title, subtitle, desc) => {
    console.log("--- MATCH ---");
    console.log("Title:", title);
    console.log("Subtitle:", subtitle);
    console.log("Desc:", "[" + desc + "]");
    return `\nCARD: ${title}\n`;
});

console.log("--- FINAL OUTPUT ---");
console.log(processed);


console.log("--- FINAL OUTPUT ---");
console.log(processed);
