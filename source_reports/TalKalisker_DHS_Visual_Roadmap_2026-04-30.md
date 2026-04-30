---
title: "DHS Visual Improvements — Implementation Roadmap"
client: "TalKalisker"
project: "Internal Systems"
type: "Reference.Roadmap"
date: 2026-04-30
confidential: false
languages: '["en"]'
---

# 01. /overview

15 visual and UX improvements to the DHS portal shell, organized into 4 delivery phases. Sequenced by impact-to-effort ratio — the first phase alone transforms how every existing and future report feels to open.

All changes live in two files: `_dhs/brand/dashboard_shell.html` (CSS + JS) and `_dhs/scripts/publish.js` (output HTML structure). No source report files need changes. Every improvement applies automatically to all 6 published portals on next rebuild.

- **Metric:** Total improvements | **Value:** 15 | **Trend:** +15
- **Metric:** Files to modify | **Value:** 2 | **Trend:** Stable
- **Metric:** Reports affected | **Value:** All (6 current) | **Trend:** Auto-applies on rebuild
- **Metric:** Estimated total effort | **Value:** ~15 days | **Trend:** 4 phases

# 02. /phases

```timeline
Phase: Phase 1 — High-ROI Quick Wins | Period: Day 1–2
- Scroll spy on sidebar nav — IntersectionObserver highlights active section while reading
- Date rendered in report header — Already in meta; surface it below the client line
- Hero gradient band — Terracotta-to-transparent sweep behind the report header
- Finding card severity left border — Color-coded bar by severity, scannable without reading
- Reading progress bar — Thin terracotta line at top of page, fills as user scrolls

Phase: Phase 2 — Card System Upgrades | Period: Day 3–5
- Interactive action checkboxes — Click toggles Done/Pending in localStorage, no backend
- Language switch fade animation — 150ms opacity transition on incoming language block
- Language indicator pill — EN / עב pill shows current language next to the toggle button
- Confidential badge — Styled CONFIDENTIAL label in header for encrypted reports
- Section intro paragraph — First p per section rendered larger (1.2rem, lighter weight)

Phase: Phase 3 — Filtering & Interactivity | Period: Day 6–9
- Findings filter bar — All / Critical / High / Medium / Low above finding card groups
- Action items filter bar — All / Pending / Blocked / Done above action card groups
- Expandable appendix tables — Large tables start collapsed with "Show full table" toggle
- Pull quote treatment — Blockquotes styled with large terracotta quote mark, larger type

Phase: Phase 4 — Mobile, Bilingual & Print | Period: Day 10–15
- Mobile sidebar drawer — Hamburger → slide-in panel below 900px instead of stacking
- Swipe language switch — touchstart / touchend detects swipe, cycles languages on mobile
- Print one-pager mode — Print-only header with logo + client + date + confidential badge
- Section page-break control — page-break-before: always on major sections for clean PDF export
```

# 03. /phase_1_detail

*5 changes. Combined effect: every report feels intentional the moment it opens.*

* **Deliverable:** Scroll Spy — Active Nav Highlighting | **Details:** `dashboard_shell.html` JS
Create one `IntersectionObserver` targeting all `h1[id]` elements. On intersection, find the matching `a[href="#id"]` in `.sidebar-nav` and toggle `.active`. CSS `.nav-link.active` already has the accent color and right border — the state just never gets set. No layout changes required.

* **Deliverable:** Date in Report Header | **Details:** `dashboard_shell.html` Handlebars template
`{{date}}` is already in the meta tag. Add `<div class="report-date">// {{date}}</div>` below `.report-client` in the header markup. Style with the same mono font and accent color as the client line. One Handlebars token, one CSS rule.

* **Deliverable:** Hero Gradient Band | **Details:** `dashboard_shell.html` CSS
Add `::before` pseudo-element to `.report-header`. Absolute position, full width, height ~300px, `background: linear-gradient(135deg, rgba(184,90,68,0.06) 0%, transparent 70%)`. `pointer-events: none`. Zero layout impact — purely visual depth under the title.

* **Deliverable:** Finding Card Severity Left Border | **Details:** `dashboard_shell.html` CSS
`.finding-card` already has `.sev-critical`, `.sev-high`, `.sev-medium`, `.sev-low` classes on the inner `.severity` badge. Add `border-left: 3px solid` to `.finding-card` based on a data attribute, or add a wrapper class. Alternative: target `.finding-card:has(.sev-critical)` with `:has()` CSS — no HTML changes needed if browser support is acceptable (Chrome 105+, Safari 15.4+). Transforms scan time for multi-finding sections from "read every card" to "scan the left edge."

* **Deliverable:** Reading Progress Bar | **Details:** `dashboard_shell.html` CSS + JS
Add `<div id="progress-bar"></div>` at top of `<body>`. CSS: `position: fixed; top: 0; left: 0; height: 3px; background: var(--accent); width: 0%; z-index: 999; transition: width 0.1s`. JS `scroll` listener: `width = (scrollY / (documentHeight - viewportHeight)) * 100 + '%'`. ~8 lines.

# 04. /phase_2_detail

*5 changes. Makes the portal feel like a living document, not a static PDF.*

* **Deliverable:** Interactive Action Card Checkboxes | **Details:** `dashboard_shell.html` JS
Action cards already render a `.action-checkbox` div. Add `data-id` attribute (hash of task text) to each checkbox in `publish.js`. On click: toggle a `done` class, save `localStorage.setItem(id, 'done')`. On `DOMContentLoaded`: read localStorage and restore states. Client can tick off items as they execute. State survives page refresh. No server, no backend.

* **Deliverable:** Language Switch Fade Animation | **Details:** `dashboard_shell.html` CSS + JS
In `setLang()`, instead of instant `display: block/none`, add `.lang-fade-in` class to the incoming block, then remove it after 150ms. CSS: `.lang-fade-in { animation: langFade 150ms ease; } @keyframes langFade { from { opacity: 0; } to { opacity: 1; } }`. Outgoing block hides immediately; incoming block fades in.

* **Deliverable:** Language Indicator Pill | **Details:** `dashboard_shell.html` HTML + JS
Add `<span id="lang-indicator">EN</span>` next to the lang toggle button. Style as a small mono pill. In `setLang()`, update `textContent` to `lang.toUpperCase()` or `'עב'` for Hebrew. Always shows current language without hovering over the toggle.

* **Deliverable:** Confidential Badge in Header | **Details:** `dashboard_shell.html` Handlebars
Add `{{#if confidential}}<div class="confidential-badge">// CONFIDENTIAL</div>{{/if}}` to `.report-header`. CSS: mono font, small, accent-red color (`var(--accent-red)`), faint red background pill. Visible context for client that this is an encrypted deliverable.

* **Deliverable:** Section Intro Paragraph Style | **Details:** `dashboard_shell.html` CSS
`section > p:first-of-type { font-size: 1.15rem; font-weight: 300; color: var(--text-primary); line-height: 1.9; }`. No HTML changes. Applies automatically to every section's opening paragraph across all reports. Creates visual hierarchy between the intro sentence and the body content below it.

# 05. /phase_3_detail

*4 changes. Transforms multi-finding audits from walls of cards into filtered, navigable sets.*

* **Deliverable:** Findings Filter Bar | **Details:** `dashboard_shell.html` JS
After `DOMContentLoaded`, detect any section containing 3+ `.finding-card` elements. Inject a filter bar above that section: `All · Critical · High · Medium · Low`. On click: toggle `.hidden` on cards whose `.severity` badge class doesn't match the selected filter. CSS `.finding-card.hidden { display: none }`. Pure DOM — no changes to publish.js or source files.

* **Deliverable:** Action Items Filter Bar | **Details:** `dashboard_shell.html` JS
Same pattern as findings filter. Detect sections with 3+ `.action-card` elements. Filter options: `All · Pending · In Progress · Done · Blocked`. Match against `.action-status` text content. Inject filter bar above the group. Single shared utility function handles both filters.

* **Deliverable:** Expandable Appendix Tables | **Details:** `dashboard_shell.html` JS
On `DOMContentLoaded`, find all `<table>` elements with more than 8 rows. Wrap rows 5+ in a `<tbody class="table-overflow">` and hide it. Inject a `<tfoot>` button: "Show all N rows ↓". On click: toggle visibility, update button text. Keeps appendix tables scannable at first glance without losing any data.

* **Deliverable:** Pull Quote Treatment | **Details:** `dashboard_shell.html` CSS
`blockquote { position: relative; padding: 1.5rem 1.5rem 1.5rem 3rem; font-size: 1.2rem; font-weight: 300; color: var(--text-primary); border: none; }` + `blockquote::before { content: '"'; position: absolute; left: 0; top: -0.5rem; font-size: 4rem; color: var(--accent); opacity: 0.6; font-family: Georgia, serif; line-height: 1; }`. Transforms bland blockquotes into visible pull quotes.

# 06. /phase_4_detail

*4 changes. Mobile-first delivery and print-ready exports.*

* **Deliverable:** Mobile Sidebar Drawer | **Details:** `dashboard_shell.html` CSS + JS + HTML
Below 900px: replace the stacked sidebar with a hidden drawer. Add `<button id="nav-toggle">☰</button>` fixed to top-left. CSS: `.sidebar { transform: translateX(-100%); transition: transform 0.3s; position: fixed; z-index: 100; height: 100vh; }` + `.sidebar.open { transform: translateX(0) }`. Overlay `<div id="nav-overlay">` closes the drawer on tap outside. RTL: mirrors to right side.

* **Deliverable:** Swipe Language Switch | **Details:** `dashboard_shell.html` JS
In `DOMContentLoaded`, on touch devices: track `touchstart` X position and `touchend` X position on `document`. If delta > 60px and available languages > 1: swipe-left cycles forward, swipe-right cycles backward. Calls existing `toggleLang()`. ~15 lines. No libraries needed.

* **Deliverable:** Print One-Pager Header | **Details:** `dashboard_shell.html` CSS
Add a `<div class="print-header">` to the template with logo, client name, report title, date, and confidential badge — all hidden by default (`display: none`). `@media print { .print-header { display: block; margin-bottom: 2rem; border-bottom: 2px solid #000; } .sidebar { display: none; } }`. PDF output becomes self-contained — no logo, date, or client context currently survives print.

* **Deliverable:** Section Page-Break Control | **Details:** `dashboard_shell.html` CSS
`@media print { section { page-break-inside: avoid; } section + section { page-break-before: auto; } h1 { page-break-after: avoid; } .finding-card, .action-card, .timeline-node { page-break-inside: avoid; } }`. Prevents cards from splitting mid-content across printed pages. Finding cards already have this — extend it to all card types and section boundaries.

# 07. /implementation_notes

- **Decision:** Implement phases in order | **Impact:** High
Each phase is designed to be shippable independently. Phase 1 alone justifies a rebuild. Don't wait for Phase 4 to be complete to deploy Phase 1.

- **Decision:** All JS in dashboard_shell.html, no external files | **Impact:** Medium
DHS portals are self-contained single HTML files. Keep all enhancements inline. No additional script tags, no npm packages for runtime. The CryptoJS CDN is the only external dependency and it stays that way.

- **Decision:** CSS-first, JS only when CSS cannot do it | **Impact:** Medium
Scroll spy, progress bar, filters, drawer: JS required. Everything else (gradient, borders, typography, animations): pure CSS. Keeps the portal lightweight and functional without JavaScript where possible.

- **Decision:** Test in both dark and light themes before shipping each phase | **Impact:** High
Every color must use CSS variables. No hardcoded hex values in new code. Dark theme is the default and primary — light theme must not be an afterthought. Test the Hebrew RTL layout for Phase 1 and Phase 4 especially.
