---
title: "Digital Experience & UX Audit"
client: "[Client Name]"
project: "[Project Component, e.g., Onboarding Flow]"
type: "Audit.UX"
date: "YYYY-MM-DD"
confidential: false
languages: ["en"]
---

# 01. /executive_summary
**Objective:** Diagnose friction points within the current user journey and provide actionable recommendations to increase conversion rates.

Provide a high-level summary of the audit's findings. What is the current state of the platform? What are the immediate quick wins, and what requires a deeper architectural refactor? Frame the narrative around the *user's* pain points, not just technical flaws.

# 02. /methodology
Briefly explain how this audit was conducted:
*   **Heuristic Evaluation:** Assessed against Nielsen's 10 Usability Heuristics.
*   **Cognitive Walkthrough:** Simulated a core user journey (e.g., "Booking an appointment").
*   **Accessibility Scan:** WCAG 2.1 AA compliance check.

# 03. /critical_findings

- **Finding:** [e.g., Hidden Primary Call-to-Action] | **Severity:** High
Instead of a stationary "Book Now" button, users must navigate through a sub-menu to find the booking calendar, leading to a 40% drop-off rate on mobile.
**Recommendation:** Implement a sticky bottom-bar CTA for mobile viewports.

- **Finding:** [e.g., Jargon in Pricing Tiers] | **Severity:** Medium
Plans are labeled with internal terminology ("Beta-Tier X") rather than user-benefit terms ("Starter", "Pro"). This creates cognitive friction.
**Recommendation:** Rewrite pricing copy to focus on value-based differentiation.

- **Finding:** [e.g., Missing Hover States] | **Severity:** Low
Interactive cards do not provide visual feedback when hovered, reducing the perceived clickability of the interface.

# 04. /strategic_roadmap
Prioritized sequence for implementation:

1.  **Phase 1 (Quick Wins):** Copywriting tweaks and CSS hover states. (Days 1-3)
2.  **Phase 2 (Structural):** Implementing sticky mobile navigation. (Week 2)
3.  **Phase 3 (Exploratory):** A/B testing the new pricing tier names. (Week 3+)
