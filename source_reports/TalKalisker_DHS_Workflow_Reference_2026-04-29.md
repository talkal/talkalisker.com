---
title: "DHS — Client Report Workflow Reference"
client: "TalKalisker"
project: "Internal Systems"
type: "Reference.Workflow"
date: 2026-04-29
confidential: false
languages: '["en"]'
---

# 01. /overview

The DHS (Deliverables System) turns an Obsidian markdown file into an encrypted, professional HTML portal — automatically, on every git push.

```
Obsidian .md  →  source_reports/  →  npm run build  →  clients/{slug}/  →  GitHub Pages
```

One source file. One command (or one push). Live in minutes.

- **Metric:** Reports Live | **Value:** 5 | **Trend:** +5
- **Metric:** Card Types | **Value:** 10 | **Trend:** +1 (Benchmark, Apr 2026)
- **Metric:** Languages | **Value:** 3 | **Trend:** Stable (EN / ES / HE)
- **Metric:** Build Trigger | **Value:** git push | **Trend:** Automated via CI

# 02. /how_to_create_a_report

* **Deliverable:** 1 — Write the source file | **Details:** New `.md` in `source_reports/`
Paste the frontmatter block from `/frontmatter_reference`. Fill `title`, `client`, `project`, `type`, `date`. Set `confidential: true` for encrypted reports. Set `languages: '["en", "he"]'` for bilingual. Write content below the closing `---`.

* **Deliverable:** 2 — Structure sections and cards | **Details:** DHS heading + card syntax
Every section: `# 01. /slug_name`. Slug becomes the sidebar nav link. Cards are inline — see `/card_reference`. Prose, tables, and images all work. Images go in `_dhs/assets/` first, then reference as `![Caption](filename.png)`.

* **Deliverable:** 3 — (Optional) Run the agent for complex source | **Details:** Raw Obsidian notes → structured DHS
When source is messy notes (callouts, wikilinks, unstructured bullets), use `_dhs/agents/dhs-report-publisher.md` as your instruction set. Agent handles classification, bilingual structuring, card mapping, and quality checks.

* **Deliverable:** 4 — Build the portal | **Details:** Local or automatic
**Local:** `cd _dhs && npm run build` — builds all reports, rebuilds master index.
**Auto:** Push to `main` — GitHub Actions runs the build and commits output.

* **Deliverable:** 5 — Access and share | **Details:** talkalisker.com/clients/
Master portal: `talkalisker.com/clients/` — password in `_dhs/clients.json` → `_master` key.
Individual report: `talkalisker.com/clients/{slug}/` — client password from same file.
Delete a report: `cd _dhs && node scripts/delete_report.js {slug}`

# 03. /frontmatter_reference

*Copy for every new report. Minimum required fields.*

```yaml
---
title: "Full Report Title"
client: "Client Name"        # must match _dhs/clients.json for encryption
project: "Project Name"
type: "Audit.UX"             # see types below
date: 2026-04-29
confidential: true           # true = AES-256 encrypted, client password required
languages: '["en"]'          # '["en","he"]' or '["en","es","he"]'
---
```

**Report types:** `Audit.UX` · `Audit.Technical` · `Audit.SEO` · `Proposal.Strategy` · `Proposal.Naming` · `Report.Monthly` · `Report.Handoff` · `Summary.Meeting` · `Reference.Workflow`

**Bilingual structure:**
```
:::en
English content here.
:::

:::he
תוכן בעברית כאן.
:::
```

# 04. /card_reference

*All 10 card types. Everything after the pipe `|` is the description body (next line).*

| Card | Syntax | Use For |
|---|---|---|
| Finding | `- **Finding:** Title \| **Severity:** High` | Audit issues (Critical / High / Medium / Low) |
| Proposal | `- **Name:** X \| **Slogan:** Y \| **Level:** Recommended` | Naming options, strategy alternatives |
| Decision | `- **Decision:** Title \| **Impact:** High` | Strategic choices, meeting outcomes |
| Action | `- **Action:** Task \| **Owner:** Name \| **Status:** Pending` | Tasks (Pending / In Progress / Done / Blocked) |
| Metric | `- **Metric:** Name \| **Value:** X \| **Trend:** +10%` | KPIs, performance data |
| Ranking | `- **Keyword:** Term \| **Rank:** 3 \| **Change:** +2` | SEO keyword positions |
| Swatch | `- **Color:** Name \| **Hex:** #B85A44 \| **Usage:** Primary` | Brand color documentation |
| Deliverable | `* **Deliverable:** Name \| **Details:** Subtitle` | Scope items, workflow steps (use `*` not `-`) |
| Signature | `- **Signature:** Full Name \| **Role:** Title` | Approval sign-off lines |
| Benchmark | `- **Benchmark:** Institution \| **Metric:** Key Stat` | Industry comparisons with evidence |

Add a description paragraph on the next line after any card — it renders inside the card.

**Hebrew equivalents:** `ממצא` · `מדד` · `החלטה` · `פעולה` · `תוצר` · `מידוד`

# 05. /new_card_protocol

When content doesn't fit any of the 10 cards, build a new one. Four files to touch:

- **Action:** Add regex to `_dhs/scripts/publish.js` | **Owner:** Tal | **Status:** Pending
Inside `parseMarkdownContent()`, before the Deliverable block. Pattern: `- **NewField:** value | **Secondary:** value` + description lines. Follow existing card regex structure.

- **Action:** Add CSS to `_dhs/brand/dashboard_shell.html` | **Owner:** Tal | **Status:** Pending
In the `<style>` block, after `.signature-card`. Use existing CSS variables only — `var(--bg-surface)`, `var(--accent)`, `var(--text-primary)`. No hardcoded colors.

- **Action:** Add example to matching template in `_dhs/templates/` | **Owner:** Tal | **Status:** Pending
Add syntax example with a comment explaining when to use it.

- **Action:** Register in `_dhs/agents/dhs-report-publisher.md` § Card Registry | **Owner:** Tal | **Status:** Pending
One row in the table: card name, primary field trigger, use case.

# 06. /quick_commands

```bash
# Build all reports
cd _dhs && npm run build

# Build one report
cd _dhs && node scripts/publish.js source_reports/Filename.md clients/output-slug/

# Delete a report + rebuild master index
cd _dhs && node scripts/delete_report.js report-slug-name

# Add new client password → edit clients.json, then rebuild
```

**Portals:**
- Master index: `talkalisker.com/clients/` → password: `_master` in `clients.json`
- Per-client: password = client name key in `clients.json`
- Override per-report: add `password: "custom"` to frontmatter
