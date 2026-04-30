---
title: "Hadassah Shoulder Unit — Digital Patient Experience Audit"
client: "Hadassah Shoulder Unit"
project: "UX Audit & Patient Flow Optimization"
date: 2026-04-28
languages: '["en", "he"]'
confidential: true
type: "Audit.UX"
---

:::en
# 01. /executive_summary

The Hadassah Shoulder Unit operates Israel's most clinically advanced orthopedic shoulder practice. Their digital presence has not kept pace. The current site is organized around institutional logic — staff directories, surgical technique listings, clinical knowledge bases — presented in the sequence that makes sense to a department administrator, not to a person in pain searching for an answer at 11pm.

The cost of this inversion is measurable. A patient navigating the current experience must pass through **8 distinct content layers** before reaching any appointment booking mechanism. Research across healthcare digital products indicates approximately **70% of patients abandon** symptom-driven navigation flows that require more than 3 decision steps before surfacing an actionable next step. Simultaneously, the absence of dedicated pathology landing pages suppresses Google ranking for the high-value "pain queries" patients actually search — ceding organic acquisition to less clinically capable competitors who happen to answer the digital question faster.

This audit defines the complete transformation blueprint: restructure the experience around three patient intents (diagnose, prepare, recover), compress the conversion path from 8 steps to 3, shift brand voice from institutional authority to authoritative empathy, and implement clinical safety nets that make the digital experience as responsible as the clinical one. The output is a patient who arrives at Hadassah already trusting the unit, already informed, and already oriented toward action.

# 02. /performance_baseline

*Quantitative baseline. All scores assessed against the primary patient journey: arriving with a shoulder symptom and converting to a booked appointment.*

- **Metric:** Visual Design | **Value:** 6/10 | **Trend:** - (Professional and credible, but sterile — no interactive elements, no patient orientation in the visual language)
- **Metric:** Usability Score | **Value:** 4/10 | **Trend:** - (8-step friction path before reaching any CTA; critical conversion actions buried beneath institutional content)
- **Metric:** Accessibility Score | **Value:** 7/10 | **Trend:** - (Screen reader labels present, contrast meets WCAG AA baseline — foundation is sound, parity with interactive elements needed)

# 03. /key_findings

*Ordered by business impact. Each finding is a patient-experience risk with a direct revenue consequence.*

- **Finding:** Delayed Conversion Funnel | **Severity:** Critical
The friction path from site entry to the first booking CTA spans 8 sequential content layers: 1. Staff info → 2. Pathologies → 3. Surgeries → 4. FAQ → 5. More pathologies → 6. Patient knowledge hub → 7. Rehab knowledge hub → 8. CTA (buried). Research across healthcare digital products shows ~70% patient abandonment in flows requiring more than 3 steps before surfacing a booking action. The unit is operating an 8-step funnel in a 3-step world.
**Recommendation:** Implement a persistent, globally-accessible "Book Appointment" CTA across all navigation stages. Redesign the hero area to surface the patient's first decision — not the unit's organizational structure.

- **Finding:** Information Architecture & Cognitive Load | **Severity:** High
The page presents a single long-scroll experience with static lists of dozens of pathologies organized by anatomical terminology unknown to the average patient. A patient arriving with "shoulder pain that wakes them at night" has no pathway to match their symptom to their condition — they encounter "Rotator Cuff Tendinitis / SLAP Lesion / Glenohumeral Osteoarthritis" without any semantic bridge. Hick's Law: decision time increases logarithmically with the number of simultaneous choices. The current IA maximizes this friction. The absence of dedicated pathology landing pages also suppresses Google ranking for high-value pain queries.
**Recommendation:** Implement a 3-intent entry flow (Diagnose / Pre-Op / Post-Op). Decentralize content to dedicated pathology pages. Expose one question at a time via Progressive Disclosure.

- **Finding:** Complex Medical Jargon | **Severity:** Medium
The site uses clinical nomenclature as its primary patient-facing language — "LHB," "Glenohumeral Osteoarthritis," "SLAP Lesion" — without a semantic bridge to the patient's vocabulary. A patient searching for "shoulder pain when lifting" reading "subacromial impingement secondary to rotator cuff tendinosis" faces a comprehension wall that erodes trust and accelerates abandonment. The terminology mapping in Appendix A demonstrates the gap at scale.
**Recommendation:** Apply symptom language as headings throughout all patient-facing copy. Clinical terminology belongs in secondary text and tooltips. See Appendix A for the complete mapping.

- **Finding:** Visual Hierarchy & Button Contrast | **Severity:** Low
Secondary CTAs ("Prepare for Surgery") fail minimum contrast requirements. Body typography is set below the 16px minimum recommended for the older demographic that represents a significant portion of the shoulder unit's patient base. The current button styling does not leverage the brand's primary blue for differentiation.
**Recommendation:** Apply the UI specification defined in the Strategic Decisions section: primary brand blue for all CTA buttons, 16–18px body text minimum, 48–56px touch targets throughout.

- **Finding:** RTL Layout Inconsistency | **Severity:** Low
Graphic elements — bullet points, directional arrows, iconography — remain in LTR orientation within an RTL Hebrew context. Hebrew-language patients experience visual incongruence at every decorated list item and navigation arrow, subtly signaling that the Hebrew experience was retrofitted rather than designed.
**Recommendation:** Audit and flip all directional graphic elements for RTL alignment. Verify icon sets support RTL context natively rather than through CSS mirroring.

# 04. /industry_benchmarks

*Three institutions that have solved versions of the same problem. These are implementation models, not aspirational references.*

- **Benchmark:** Cleveland Clinic | **Metric:** 40% reduction in phone coordination time
By standardizing front-end triage to two decision elements — primary joint and primary condition — and integrating directly into MyChart, Cleveland Clinic eliminated staff-mediated patient routing. The automated flow connects patients to the correct specialist, location, and imaging requirements before any human contact. This is the target state for Hadassah's interactive navigation: a patient who self-triages digitally and arrives at the booking step already correctly classified.

- **Benchmark:** Hospital for Special Surgery (HSS) | **Metric:** Multi-axis taxonomy across joint, sport, age group, and affected side
HSS's patient library is organized along four simultaneous classification axes. Critically, their post-operative rehabilitation guides are side-dependent — acknowledging that recovering from right-shoulder surgery has different logistical and practical implications than left-shoulder recovery (sling use, driving, dominant-arm considerations). This is the model for Hadassah's pathology page architecture and post-operative rehabilitation content structure.

- **Benchmark:** Mayo Clinic | **Metric:** Symptom-to-triage in 3 steps or fewer with embedded safety nets
Mayo Clinic's digital navigation begins with anatomical location, proceeds to symptom character (onset, pattern, radiation), and embeds validated pain scales at each decision point. Crucially, the flow contains emergency detection: if a patient's symptom profile matches acute trauma or post-operative danger signs, the flow stops and routes immediately to urgent care — functioning as a digital safety net, not merely an information source. This is the model for Hadassah's Quick Exit mechanism.

# 05. /brand_dna

*The voice and personality shift matters as much as the structural one. Clinical authority without empathy sends patients to Google instead of Hadassah.*

- **Decision:** Brand Promise | **Impact:** High
"Return to smooth motion and pain-free life." Every patient-facing touchpoint — headline, CTA label, section introduction — should orient toward this promise. The patient arrived because they are in pain and want not to be. Speak directly to that.

- **Decision:** Market Positioning | **Impact:** High
"The elite unit — Israel's most experienced and advanced shoulder practice." This is earned through surgical volume, procedural complexity, and research output. The site should reflect it without announcing it. Evidence over assertion: team photography, specific procedure counts, and named technology callouts communicate authority far more credibly than adjective-heavy institutional copy.

- **Decision:** Tone of Voice — Authoritative but Empathetic | **Impact:** High
Current tone: institutional authority addressing a patient as a medical case. Target tone: clinical confidence speaking to a person. The shift is not toward casual language — it is toward language that acknowledges the patient's fear, information gap, and desire to act.
Micro-copy transformations: "Click here to book" → "Let's start your recovery" / "Information about surgeries" → "What should I expect on surgery day?" / "Rehabilitation Guidelines" → "Your recovery timeline — week by week" / "Book Appointment" → "Reserve your consultation."

- **Decision:** Semantic Jargon Protocol | **Impact:** Medium
The rule: patient language in headings and CTAs, clinical terminology in secondary text and tooltips. "My shoulder is stiff and stuck" is the heading. "Adhesive Capsulitis (Frozen Shoulder)" is the bracketed clinical reference beneath it. Search engines index both terms. Patients identify with the first. Clinicians are reassured by the second. Both goals are served simultaneously.

# 06. /strategic_decisions

*Architectural and technical directives for the build team. These are prerequisites to the UX improvements — the foundation, not the finish.*

- **Decision:** UI Specification Implementation | **Impact:** High
Apply as non-negotiable baseline: 8px grid system (all margins and paddings in 8px multiples), 1200px maximum container width, 16–18px body typography using Heebo or Assistant for optimal Hebrew/Latin bilingual rendering at this scale, 48–56px CTA button height for comfortable touch targets, 8–12px border radius across all interactive elements.

- **Decision:** SEO Content Decentralization | **Impact:** High
Each pathology requires its own dedicated landing page. Optimize every page around two query types: "pain queries" ("shoulder pain at night," "sharp pain when lifting") for top-of-funnel acquisition, and "solution queries" ("rotator cuff repair surgery Hadassah," "shoulder replacement Jerusalem") for bottom-of-funnel conversion. Use clean URL slugs: `/shoulder/frozen-shoulder`, `/shoulder/rotator-cuff-repair`. Embed FAQ-structured meta descriptions to capture Google Rich Snippets.

- **Decision:** Interactive Navigation — Intent-Driven with Progressive Disclosure | **Impact:** High
Implement the 3-intent entry: Diagnose / Pre-Op / Post-Op. Apply Progressive Disclosure — one question per step, never multiple simultaneously. This directly applies Hick's Law: binary or limited-choice decisions at each step compress decision time and prevent abandonment. The complete 3-level navigation flow is defined in Appendix B.

- **Decision:** Safety & Error Handling — Clinical Quick Exit | **Impact:** Critical
The interactive flow must include a detection layer for acute emergency symptoms: visible deformity or inability to move after trauma → immediate redirect to urgent orthopedic care; post-operative danger signs (fever, massive swelling, severe unresponsive pain) → immediate routing to the surgical team. A persistent human contact button (phone / live chat) must be visible at every stage of the digital flow — functioning as both a clinical safety net and a trust signal for anxious patients.

# 07. /action_plan

*Prioritized tasks. High-priority items address Critical and High findings directly.*

- **Action:** Implement persistent CTA + Quick Exit mechanism | **Owner:** Dev Team | **Status:** Pending
"Book Appointment" must appear in fixed navigation at every scroll position. Quick Exit detection layer must fire before any auto-routing continues when acute symptom indicators are present.

- **Action:** Redesign hero area with patient-first structure | **Owner:** UX Architect | **Status:** Pending
Search bar, patient-intent tagline ("Let's bring smooth motion back to your shoulder"), and immediate primary CTA above the fold. Remove institutional biography from above-the-fold real estate.

- **Action:** Build intent-driven interactive navigation (3-step flow) | **Owner:** Dev Team | **Status:** Pending
Implement the full Level 1 → Level 2 → Level 3 navigation architecture per Appendix B. One question exposed per step. Progressive Disclosure pattern throughout.

- **Action:** Decentralize content to dedicated pathology landing pages | **Owner:** Content Team | **Status:** Pending
Build individual landing pages for each pathology per Appendix C architecture. Each page follows the structure defined in the Pathology Page Architecture section.

- **Action:** Restructure trust signals — team below clinical solutions | **Owner:** Design Team | **Status:** Pending
Staff photography and biography move below the clinical solution content. The clinical value (what we treat, how we treat it) leads; the human context (who we are) supports and reinforces.

- **Action:** Implement collapsible content structure for dense reference material | **Owner:** Dev Team | **Status:** Pending
Pre-operative checklist (Appendix D) and post-operative recovery timeline (Appendix E) implemented as accordion components or tabbed panels. Reduces page scroll length and delivers content at the appropriate sequential moment.

- **Action:** Apply terminology mapping via tooltips throughout patient-facing copy | **Owner:** Content Team | **Status:** Pending
All clinical terms in patient-facing text receive inline tooltips using the terminology mapping in Appendix A. Heebo/Assistant font stack to be specified in the component library.

# 08. /implementation_roadmap

*Three delivery phases sequenced by impact-to-effort ratio: high-value quick wins first, structural infrastructure second, advanced interactive features third.*

```timeline
Phase: Phase 1 — Quick Wins | Period: Week 1–2
- Rewrite patient-facing copy — Empathetic tone shift throughout all existing text
- Deploy persistent CTA — "Reserve your consultation" fixed at every scroll position
- Apply UI specification — Brand blue, 16px minimum type, 48px touch targets, 8px grid
- Restructure trust signals — Team photography moves below clinical solution content

Phase: Phase 2 — Infrastructure | Period: Month 1–2
- Build 5 pathology landing pages — Frozen shoulder, rotator cuff, instability, osteoarthritis, impingement
- Implement SEO metadata — URL restructure, meta descriptions, Rich Snippets markup
- Build accordion components — Pre-op checklist and rehab timeline as collapsible panels
- Internal link architecture — Cross-links between pathology pages, rehab guides, and FAQ

Phase: Phase 3 — Advanced UX | Period: Month 3+
- Interactive navigation system — 3-intent flow (Diagnose / Pre-Op / Post-Op) with Progressive Disclosure
- Quick Exit detection layer — Acute symptom identification and emergency routing
- Physician explainer videos — Procedure videos embedded on pathology and pre-op pages
- Side-dependent rehabilitation — Left/right shoulder content variants per HSS model
```

# 09. /pathology_page_architecture

*The structure every pathology landing page must follow. Consistent architecture enables Google to understand content relationships and patients to build a transferable mental model across all pathology pages.*

```pagezone
Zone: Hero Section | Type: Hero
Large-print headline in symptom language: "My shoulder is stiff and stuck." Clinical term beneath in smaller text: "(Frozen Shoulder — Adhesive Capsulitis)." One-sentence TL;DR. Primary "Reserve your consultation" CTA visible without scrolling.

Zone: Symptom & Diagnosis Panel | Type: Content
Visual symptom list using anatomical icons. Diagnosis timeline ("How long has this been happening?") and distinguishing signs separating this condition from clinically adjacent ones. Designed for scanning, not reading.

Zone: Treatment Path Selector | Type: Content
Two distinct visual tracks: Conservative Care (PT, injections, expected timeline) and Surgical Intervention (procedure name, what's involved, recovery preview). Visually separated so patients self-select the relevant path without reading both.

Zone: Recovery Timeline | Type: Content
Week-by-week recovery phases adapted from Appendix E. Accordion or interactive component. Includes when to contact the surgical team — an embedded safety net within the timeline itself.

Zone: Related Pathologies & Internal Links | Type: Navigation
3–4 related conditions with brief differentiators ("This is not Frozen Shoulder if..."). Internal links to pathology pages, rehabilitation guides, and condition-specific FAQ. Builds site link equity and patient understanding simultaneously.

Zone: Pathology-Specific FAQ | Type: FAQ
5–7 condition-specific questions structured for Google Featured Snippets. Answers written in first-person patient voice. Closes the information loop before the patient feels compelled to search elsewhere.
```

# 10. /main_page_architecture

*The homepage is the unit's front door. Every zone must serve one of three intents — diagnose, prepare, recover — and convert anxiety into a booked consultation.*

```pagezone
Zone: Hero | Type: Hero
Patient-language headline: "Shoulder Pain? We specialize in exactly this." Hadassah Shoulder Unit name + hospital affiliation as secondary trust anchor. One-sentence unit description. Single primary CTA: "Reserve a Consultation" — visible above the fold on all devices.

Zone: Intent Selector | Type: Navigation
Three large, equal-weight buttons matching the three patient intents from Appendix B: "I have shoulder pain or an injury." / "I'm scheduled for shoulder surgery." / "I'm recovering from shoulder surgery." Each routes to the relevant diagnostic or pre/post-op flow. No other navigation competes with these three paths at this level.

Zone: Why the Hadassah Shoulder Unit | Type: Social Proof
3–4 trust metrics: annual procedure volume, years of unit operation, technology in use (robotic-assisted surgery, 3D imaging), international patient ratio. Hadassah brand halo. Kept scannable — no dense prose. Subtext: "You are in specialized hands."

Zone: Condition Navigator | Type: Navigation
Grid of 6–8 most common shoulder conditions using patient-language card labels ("My shoulder is stiff and stuck" → Frozen Shoulder). Each card links to the corresponding pathology page. Dual-language label: patient symptom headline + clinical term in smaller text. Entry point for the majority of self-diagnosing visitors.

Zone: Patient Journey | Type: Content
Three-step visual: Consultation → Diagnosis & Plan → Treatment or Surgery. Reduces the anxiety of the unknown. Each step has a one-sentence description and an estimated timeframe. Positions the unit as a guided process, not a hospital department.

Zone: Team Introduction | Type: Social Proof
2–3 key surgeon profiles. Name, title, subspecialty, one trust-building credential. Photo. Links to full bio page. Converts an institutional brand ("Hadassah") into human faces patients feel they are choosing, not being assigned.

Zone: Patient Testimonials | Type: Social Proof
3 outcome-focused patient quotes. Format: condition treated → outcome achieved → time to recovery. Attributed with first name and condition only (privacy-compliant). Placed after team — reinforces the faces with results.

Zone: Consultation CTA | Type: CTA
Full-width conversion zone. "Reserve your consultation — response within one business day." Phone number + contact form side by side. Brief reassurance copy: no-obligation, first consultation format, insurance note. Final answer to "what do I do next?"
```

# 11. /appendices

### Appendix A: Terminology Mapping — Bridging the Semantic Gap

*Rule: Patient language in headings and CTAs. Clinical term in secondary text or tooltip.*

| Clinical Diagnosis | Patient-Friendly Symptom Description | Clinical Rationale |
|---|---|---|
| Adhesive Capsulitis (Frozen Shoulder) | "My shoulder is stiff, tight, and stuck." | Profound difficulty in basic daily activities due to capsular contracture. |
| Rotator Cuff Tear / Tendinitis | "A dull ache and weakness when I lift my arm." | Worsens significantly when lifting to the side; severe night pain is the key distinguishing feature. |
| SLAP Lesion / Labral Tear | "My shoulder 'catches', 'pops', or feels like it will slip out." | Distinct 'click' and instability sensation, especially in throwing or overhead motions. |
| Glenohumeral Osteoarthritis | "A constant grinding pain that worsened over months or years." | Gradual motion loss accompanied by a distinct grinding or 'crunch' at the joint. |
| AC Joint Separation | "A visible bump on top of my shoulder after a fall." | Highly localized pain at the top of the shoulder following acute trauma. |
| Proximal Biceps Tendon Tear | "Pain in the front of my arm, or a sudden visible bulge." | Anterior shoulder pain specifically when gripping or flexing against resistance. |
| Cervical Radiculopathy | "A sharp, shooting pain, numbness, or tingling going down my arm to my hand." | Pain originating from the cervical spine radiating beyond the shoulder — not a shoulder joint pathology. |

### Appendix B: Interactive Navigation Flow (Intent-Driven — 3 Levels)

**Level 1: User Intent Identification**
*"Welcome to the Hadassah Shoulder Unit. How can we help you today?"*

| # | Button Label | Destination |
|---|---|---|
| 1 | I have shoulder pain, discomfort, or injury. | → Diagnosis Flow (Level 2A) |
| 2 | I am scheduled for shoulder surgery soon. | → Pre-Op Flow (Level 2B) |
| 3 | I am recovering from recent shoulder surgery. | → Post-Op Flow (Level 2C) |

**Level 2A: Diagnosis Flow**
*"What best describes how your shoulder problem started or feels?"*

| # | Problem Description | Clinical Classification |
|---|---|---|
| 1 | It happened suddenly (fall, impact, or sports injury). | Acute Trauma (Fracture, Dislocation) |
| 2 | My shoulder feels loose, slips out, or catches. | Instability / Labral Tear |
| 3 | My shoulder is stiff and barely moves. | Frozen Shoulder / Osteoarthritis |
| 4 | A dull ache that worsened over time, or wakes me at night. | Soft Tissue Pathology (Rotator Cuff / Bursitis) |

**Level 2B: Pre-Operative Flow**
*"How can we help you prepare for your upcoming surgery?"*

| # | Topic | Guidance |
|---|---|---|
| 1 | What should I do the day before and day of surgery? | Fasting rules, arrival times, clothing and jewelry guidelines. |
| 2 | Medical clearances and pre-op tests. | Blood tests, EKG, and primary care physician approval forms. |
| 3 | Which medications should I stop taking? | NSAIDs, blood thinners, and supplements — stop 7–14 days before surgery. |
| 4 | Watch home preparation videos. | Instructional video for shoulder replacement / arthroscopy preparation. |

**Level 2C: Post-Operative Flow**
*"To give you the right guidance, how many weeks have passed since your surgery?"*

| # | Recovery Timeline | Protocol Focus |
|---|---|---|
| 1 | Weeks 1–4 (Protection and initial healing) | Wound care, pain management, strict sling protocol, passive motion only. |
| 2 | Weeks 4–8 (Early motion) | Active-assisted exercises, sling weaning, return to light activities. |
| 3 | Weeks 8–12 (Strengthening) | Resistance band exercises, rotator cuff strength, scapular control. |
| 4 | Months 3–6 (Advanced strengthening) | Heavy lifting, sports, and demanding physical activity protocols. |
| 5 | I have an urgent concern about my recovery. | Immediate contact info for the surgical team (fever, swelling, severe pain). |

**Level 3A: Triage Detail — After selecting "It happened suddenly"**
*"What is the most prominent symptom right now?"*

| # | Symptom | Clinical Classification | Recommended Action |
|---|---|---|---|
| 1 | Visible bump on top of my shoulder. | AC joint separation / Clavicle fracture. | Route to urgent orthopedic care / trauma appointment. |
| 2 | Severe pain, cannot lift arm at all. | Acute massive rotator cuff tear / Dislocation. | Route to acute evaluation and imaging. |
| 3 | Bulge in upper arm muscle and front-of-arm pain. | Proximal biceps tendon tear. | Biceps tear information + specialist appointment booking. |

**Level 3A: After selecting "My shoulder feels loose or unstable"**
*"What exactly do you feel?"*

| # | Symptom | Clinical Classification | Recommended Action |
|---|---|---|---|
| 1 | Shoulder popped completely out of place. | Glenohumeral dislocation. | Route to instability clinic. |
| 2 | Deep 'clicks' or catching inside when moving. | Labral tear / SLAP lesion. | Sports medicine and arthroscopy consultation. |

**Level 3A: After selecting "My shoulder is stiff and barely moves"**
*"Is the stiffness accompanied by grinding, or only a 'frozen' feeling?"*

| # | Symptom | Clinical Classification | Recommended Action |
|---|---|---|---|
| 1 | Frozen and locked, especially when dressing. | Adhesive Capsulitis (Frozen Shoulder). | Non-surgical care and physical therapy referral. |
| 2 | Stiff, but also grinds when I move it. | Osteoarthritis. | Joint replacement center referral. |

**Level 3A: After selecting "A dull ache that worsened over time"**
*"When does the pain bother you most?"*

| # | Symptom | Clinical Classification | Recommended Action |
|---|---|---|---|
| 1 | Wakes me at night, especially on the affected side. | Rotator cuff tendinitis / tear. | Rotator cuff resources + ultrasound / MRI referral. |
| 2 | Hurts when lifting overhead or carrying objects. | Impingement syndrome / Bursitis. | Conservative care, injection therapy, and physiotherapy. |
| 3 | Sharp shooting pain, tingling or numbness down the arm to the hand. | Cervical Radiculopathy. | Note: pain may originate from the spine, not the shoulder. Spine evaluation referral. |

### Appendix C: Pathology Landing Pages — Content Architecture

| Pathology (Page Title) | Pathology Explanation Card | Conservative Treatment | Surgical Treatment |
|---|---|---|---|
| Frozen Shoulder (Adhesive Capsulitis) | "Stiff, tight, and stuck. Profound motion loss in daily activities due to capsular contracture." | Intensive PT and glenohumeral injections to reduce inflammation. | Arthroscopic Capsular Release for cases resistant to conservative care. |
| Rotator Cuff Tear | "Dull ache and arm weakness, often with severe night pain." | Anti-inflammatory treatment, subacromial injections, stabilizing muscle PT. | Arthroscopic Rotator Cuff Repair or Reverse Shoulder Replacement for massive tears. |
| Instability / Labral Tear | "Shoulder 'catches', 'pops', or feels loose when lifting or throwing." | Dynamic rotator cuff strengthening and scapular control to prevent recurrence. | Arthroscopic Bankart Repair or Latarjet procedure for cases with bone loss. |
| Glenohumeral Osteoarthritis | "Constant grinding pain worsened over months or years. Progressive motion loss." | Pain management, injections, and load-free motion preservation. | Anatomic or Reverse Total Shoulder Arthroplasty (TSA). |
| Impingement Syndrome | "Pain when lifting overhead. Inflamed tendons under the acromion." | Rest from overhead activity, steroid/PRP injections, mechanical correction PT. | Arthroscopic Acromioplasty to widen the subacromial space. |

### Appendix D: Pre-Operative Checklist

| Category | Patient Instructions | Clinical Goal |
|---|---|---|
| Medication Management | Stop blood thinners (Coumadin) and NSAIDs 7–14 days before surgery. | Prevent excessive bleeding and anesthesia interactions. |
| Medical Clearances | Submit blood tests, EKG, and cardiologist approval within 30 days of surgery. | Confirm patient is physiologically fit for surgical stress. |
| Day Before Instructions | Fasting (no solids after midnight), clear liquids only, antibacterial scrub. | Prevent pulmonary aspiration and reduce surgical site infection risk. |
| Day of Surgery | Complete removal of jewelry and piercings, loose clothing, precise arrival time. | Ensure physical safety and easy post-operative dressing. |

### Appendix E: Post-Operative Recovery Timeline

| Recovery Phase | Phase Purpose | Digital Content & Rehab Protocol |
|---|---|---|
| Weeks 1–4 | Protection and initial healing | Wound care, pain management, strict sling protocol, passive motion only. Infection sign identification. |
| Weeks 4–8 | Early motion and sling weaning | Active-assisted motion tutorials, safe sling weaning, gradual return to light daily activities (driving). |
| Weeks 8–12 | Active strengthening | Resistance band instructions, rotator cuff strengthening, scapular stabilization exercises. |
| Months 3–6 | Advanced strengthening and return to sport | Protocols for heavy lifting, demanding physical work, and competitive sports. Long-term joint maintenance guidance. |

### Appendix F: Technical Specifications for Development

**F.1 — UI Specifications**

| Component | Value / Specification | UX Rationale |
|---|---|---|
| Body Typography | 16–18px (minimum) | Heebo or Assistant font for optimal readability for older demographics. |
| CTA Buttons | 48–56px height | Primary brand blue; 8–12px border radius for a modern, accessible appearance. |
| Grid System | 8px Base Grid | All margins and paddings in multiples of 8px for visual consistency. |

**F.2 — Architecture & Functional Requirements**

| Feature | System Requirement | Clinical / UX Logic |
|---|---|---|
| Interactive Navigation | Progressive Disclosure pattern | One question exposed per step — minimizes decision fatigue per Hick's Law. |
| Quick Exit Mechanism | Prominent emergency alert layer | Identifies acute symptoms and routes immediately to urgent care (Safety Net). |
| Content Structure | Accordions and Tabs | Reduces scroll length and organizes content by recovery phase. |

**F.3 — Content Strategy & SEO**

| Area | Implementation Guideline | Goal |
|---|---|---|
| Pathology Decentralization | Dedicated landing page per condition | Improve Google ranking for specific queries like "shoulder tear surgery." |
| Tone of Voice | Symptom language leads; clinical term supports | Bridge the semantic gap and reduce patient anxiety. |
| Micro-copy | Action-oriented, empathetic labels | Drive meaningful engagement ("Let's start your recovery"). |
| URL Structure | `/shoulder/[condition-slug]` | Clean, indexable URLs for each pathology page. |
| Meta Descriptions | FAQ-structured for Rich Snippets | Capture "People also ask" positions in Google search results. |
:::

:::he
# 01. /תקציר_מנהלים

יחידת הכתף בהדסה מפעילה את השירות האורתופדי המתקדם ביותר קלינית בישראל — ובכל זאת, מטופלים שנתקלים באתר היחידה לראשונה מוצאים את עצמם מול חוויה שנבנתה לפי הלוגיקה הפנימית של המחלקה, לא לפי הצרכים שלהם. האתר מציג ספרייה מוסדית: רשימות כוח אדם, מיון ניתוחים לפי טכניקה, מרכז ידע קליני — בסדר שהגיוני למנהל מחלקה, לא לאדם שחש כאב ב-11 בלילה ומחפש תשובה.

המחיר של היפוך זה מדיד. מטופל הגולש באתר הנוכחי חייב לעבור **8 שכבות תוכן** לפני שמגיע לכפתור קביעת תור. מחקרים על מוצרים דיגיטליים בתחום הבריאות מצביעים על **~70% נטישה** בזרימות הדורשות יותר מ-3 צעדים לפני שמציגות פעולה ברת-ביצוע. במקביל, היעדר עמודי נחיתה ייעודיים לפתולוגיות מדכא את הדירוג בגוגל לשאילתות הכאב בעלות הערך הגבוה — ומעניק את הרכישה האורגנית למוסדות פחות מתקדמים קלינית שמשיבים על השאלה הדיגיטלית מהר יותר.

ביקורת זו מגדירה את תוכנית השינוי המלאה: ארגון מחדש של החוויה סביב שלוש כוונות מטופל (אבחון, הכנה, שיקום), קיצור נתיב ההמרה מ-8 צעדים ל-3, מעבר טון המותג מסמכות מוסדית לסמכותיות אמפתית, ויישום רשתות ביטחון קליניות. התוצאה: מטופל שמגיע להדסה כשהוא כבר סומך על היחידה, כבר מעודכן, וכבר מוכן לפעולה.

# 02. /מדדי_ביצועים_בסיסיים

*קו בסיס כמותי. כל הציונים הוערכו מול מסע המטופל העיקרי: הגעה עם סימפטום בכתף והמרה לתור.*

- **מדד:** עיצוב ויזואלי | **ערך:** 6/10 | **מגמה:** - (מקצועי ואמין, אך סטרילי — אין אלמנטים אינטראקטיביים, אין אוריינטציה ויזואלית ממוקדת מטופל)
- **מדד:** שימושיות (UX) | **ערך:** 4/10 | **מגמה:** - (נתיב חיכוך של 8 שלבים לפני ה-CTA; פעולות המרה קריטיות קבורות תחת תוכן מוסדי)
- **מדד:** נגישות (a11y) | **ערך:** 7/10 | **מגמה:** - (תוויות לקוראי מסך קיימות, ניגודיות עומדת בתקן WCAG AA — הבסיס טוב)

# 03. /ממצאים_עיקריים

*הממצאים מסודרים לפי השפעה עסקית. כל ממצא הוא סיכון לחוויית מטופל עם השלכה ישירה על הכנסות.*

- **ממצא:** עיכוב קריטי במשפך ההמרה | **חומרה:** קריטית
נתיב החיכוך מכניסה לאתר ועד לכפתור קביעת התור הראשון כולל 8 שכבות: 1. מידע על הצוות → 2. פתולוגיות → 3. ניתוחים → 4. שאלות נפוצות → 5. עוד פתולוגיות → 6. מרכז ידע למטופל → 7. מרכז ידע למשקם → 8. CTA קבור בתחתית. מחקרים מצביעים על ~70% נטישה בזרימות הדורשות יותר מ-3 צעדים. היחידה מפעילה משפך של 8 צעדים בעולם של 3.
**המלצה:** הטמעת CTA "קביעת תור" קבוע וגלובלי בכל שלב בניווט. עיצוב מחדש של אזור ה-Hero לחשיפת הכוונה הראשונה של המטופל.

- **ממצא:** עומס קוגניטיבי וארכיטקטורת מידע | **חומרה:** גבוהה
האתר מציג מגילת גלילה אחת עם רשימות סטטיות של עשרות פתולוגיות לפי טרמינולוגיה אנטומית שאינה מוכרת למטופל הממוצע. מטופל שמגיע עם "כאב בכתף שמעיר בלילה" לא מוצא נתיב לאבחון עצמי. חוק היק: זמן ההחלטה גדל לוגריתמית עם מספר האפשרויות המוצגות בו-זמנית. היעדר עמודי נחיתה ייעודיים פוגע גם בדירוג גוגל לשאילתות הכאב בעלות הערך הגבוה.
**המלצה:** יישום זרימת כניסה ב-3 כוונות (אבחון / טרום-ניתוח / לאחר-ניתוח). ביזור תוכן לעמודי פתולוגיה ייעודיים. חשיפת שאלה אחת בכל שלב.

- **ממצא:** ז'רגון רפואי מורכב | **חומרה:** בינונית
האתר משתמש בנומנקלטורה קלינית כשפה עיקרית מול מטופלים — "LHB", "אוסטאוארתריטיס גלנוהומרלי", "נגע SLAP" — ללא גישור לאוצר המילים של המטופל. מטופל שמחפש "כאב בכתף בהרמת יד" ומוצא "תסמונת צביטה תת-אקרומיאלית" עומד בפני חומת הבנה שמאיצה נטישה. מיפוי הטרמינולוגיה בנספח א' מדגים את הפער בקנה מידה.
**המלצה:** שפת הסימפטום בכותרות לאורך כל הטקסט הפונה למטופל. מונח קליני בטקסט המשני ו-Tooltips. ראה נספח א' למיפוי המלא.

- **ממצא:** היררכיה ויזואלית וניגודיות כפתורים | **חומרה:** נמוכה
כפתורי CTA משניים אינם עומדים בדרישות ניגודיות מינימליות. גודל הטיפוגרפיה נמוך מהמינימום המומלץ של 16px עבור קהל מבוגר.
**המלצה:** החלת מפרט ה-UI: כחול מותג מרכזי לכל כפתורי CTA, גודל טקסט 16–18px מינימום, גובה אזור מגע 48–56px.

- **ממצא:** עקביות RTL בפריסה | **חומרה:** נמוכה
אלמנטים גרפיים — תבליטים, חצים כיווניים, איקוניות — נשארים בכיוון LTR בתוך הקשר RTL עברי. קוראים בעברית חווים אי-עקביות ויזואלית שמאותתת שהחוויה בעברית נוספה בדיעבד, לא תוכננה מלכתחילה.
**המלצה:** בדיקה והיפוך של כל האלמנטים הגרפיים הכיווניים ליישור RTL מלא.

# 04. /מידודים_תעשייתיים

*שלושה מוסדות שפתרו גרסאות שונות של אותה בעיה. אלה מודלי יישום, לא הפניות שאפתניות.*

- **מידוד:** Cleveland Clinic | **תובנה:** קיצור של 40% בזמן תיאום טלפוני
על ידי סטנדרטיזציה של ה-Triage הקדמי לשני אלמנטי החלטה — המפרק הראשי והמצב הראשי — ושילוב ישיר ב-MyChart, הקליניקה ביטלה את הצורך בניתוב מטופל באמצעות צוות. המערכת האוטומטית מחברת מטופלים לרופא הנכון, המיקום הנכון, ודרישות הדימות הנכונות עוד לפני כל יצירת קשר אנושית. זוהי מצב היעד לזרימת הניווט האינטראקטיבי של הדסה.

- **מידוד:** Hospital for Special Surgery (HSS) | **תובנה:** טקסונומיה רב-ממדית לפי מפרק, ספורט, גיל וצד מנותח
ספריית המטופלים של HSS מאורגנת לאורך ארבעה צירי סיווג בו-זמניים. באופן קריטי, מדריכי השיקום לאחר ניתוח הם תלויי-צד — מכירים בכך שהתאוששות מניתוח כתף ימין שונה מהתאוששות מניתוח שמאל מבחינה לוגיסטית ומעשית. זהו המודל לאדריכלות עמודי הפתולוגיה ומבנה תוכן השיקום של הדסה.

- **מידוד:** Mayo Clinic | **תובנה:** ניווט מסימפטום לאבחון ב-3 צעדים עם רשתות ביטחון מוטמעות
הניווט הדיגיטלי של Mayo מתחיל במיקום האנטומי, ממשיך לאופי הסימפטום, ומשלב סולמות כאב מאומתים בכל נקודת החלטה. באופן קריטי, הזרימה מכילה גילוי חירום מוטמע: אם פרופיל הסימפטום תואם לטראומה חריפה או לסימני סכנה לאחר ניתוח — הזרימה נעצרת ומפנה מיידית לטיפול דחוף. זהו המודל למנגנון ה-Quick Exit של הדסה.

# 05. /זהות_מותג_וטון

*מעבר הטון חשוב לא פחות מהמעבר המבני. סמכות קלינית ללא אמפתיה מניעה מטופלים לגוגל במקום להדסה.*

- **החלטה:** הבטחת המותג | **השפעה:** גבוהה
"חזרה לתנועה חלקה ולחיים ללא כאב." כל נקודת מגע פונה למטופל — כותרת, תווית CTA, פתיח סעיף — צריכה להתכוון להבטחה זו. המטופל הגיע כי הוא כואב ורוצה להפסיק לכאוב. פנו לזה ישירות.

- **החלטה:** מיצוב בשוק | **השפעה:** גבוהה
"הסיירת המובחרת — המרכז המנוסה והמתקדם ביותר לכתף בישראל." זה הישג שהושג דרך נפח ניתוחי, מורכבות פרוצדורות ותפוקת מחקר. האתר צריך לשקף זאת מבלי להכריז על כך. ראיות על-פני טענות: תמונות צוות, מספרי פרוצדורות ואזכורי טכנולוגיה ספציפיים מעבירים סמכות בצורה אמינה יותר משפה עמוסת שמות תואר.

- **החלטה:** מעבר טון — סמכותי אך אמפתי | **השפעה:** גבוהה
טון נוכחי: סמכות מוסדית הפונה למטופל כמקרה רפואי. טון יעד: ביטחון קליני הפונה לאדם. השינוי אינו לעבר שפה מזדמנת — הוא לעבר שפה שמכירה בפחד של המטופל, בפער המידע שלו, וברצונו לפעול.
דוגמאות מיקרו-קופי: "לחץ כאן לזימון תור" ← "בוא.י נתחיל בתהליך ההחלמה שלך" / "מידע על ניתוחים" ← "מה עלי לצפות ביום הניתוח?" / "הנחיות שיקום" ← "ציר הזמן שלך להחלמה — שבוע אחר שבוע."

- **החלטה:** פרוטוקול ז'רגון סמנטי | **השפעה:** בינונית
הכלל: שפת המטופל בכותרות וב-CTAs, טרמינולוגיה קלינית בטקסט המשני וב-Tooltips. "הכתף שלי נוקשה ותקועה" היא הכותרת. "קפסוליטיס דביקה (כתף קפואה)" היא ההפניה הקלינית בסוגריים מתחתיה. מנועי חיפוש מאנדקסים את שניהם. מטופלים מזדהים עם הראשון. רופאים מתאשרים עם השני.

# 06. /החלטות_אסטרטגיות

*הנחיות ארכיטקטוניות וטכניות לצוות הבנייה. אלה תנאי מוקדם לשיפורי ה-UX — הבסיס, לא הסיומת.*

- **החלטה:** יישום מפרט UI | **השפעה:** גבוהה
להחיל כקו בסיס: מערכת ריווח 8px (כל מרווחים בכפולות של 8px), רוחב מיכל מקסימלי 1200px, טיפוגרפיה 16–18px (Heebo או Assistant לרינדור אופטימלי עברי/לטיני דו-לשוני), גובה כפתור CTA 48–56px לנוחות מגע, רדיוס פינות 8–12px בכל האלמנטים האינטראקטיביים.

- **החלטה:** ביזור תוכן SEO | **השפעה:** גבוהה
כל פתולוגיה דורשת עמוד נחיתה ייעודי. אופטימיזציה לשני סוגי שאילתות: "שאילתות כאב" ("כאב בכתף בלילה", "דקירות בכתף בהרמת יד") לרכישת מטופלים בתחילת המשפך, ו"שאילתות פתרון" ("ניתוח תיקון קרע בכתף הדסה", "החלפת כתף ירושלים") להמרה בתחתית המשפך. URL נקי: `/shoulder/כתף-קפואה`. תיאורי מטא מובנים כשאלות נפוצות ל-Rich Snippets בגוגל.

- **החלטה:** ניווט אינטראקטיבי ממוקד-כוונה עם Progressive Disclosure | **השפעה:** גבוהה
יישום 3-כוונות כניסה: אבחון / טרום-ניתוח / לאחר-ניתוח. חשיפת שאלה אחת בכל צעד, לעולם לא מספר אפשרויות בו-זמנית. יישום ישיר של חוק היק. הזרימה המלאה מוגדרת בנספח ב'.

- **החלטה:** ניהול חירום ויציאה מהירה — Quick Exit קליני | **השפעה:** קריטית
זרימת הניווט חייבת לכלול שכבת גילוי לסימפטומים חריפים: דפורמציה נראית לעין או חוסר יכולת תנועה לאחר טראומה ← הפניה מיידית לטיפול אורתופדי דחוף; סימני סכנה לאחר ניתוח (חום, נפיחות מאסיבית, כאב חמור שאינו מגיב) ← ניתוב מיידי לצוות המנתח. כפתור קשר אנושי קבוע (טלפון / צ'אט חי) חייב להיות גלוי בכל שלב של הזרימה הדיגיטלית.

# 07. /תוכנית_פעולה

*משימות מתועדפות. פריטי עדיפות גבוהה מטפלים בממצאים קריטיים וגבוהים ישירות.*

- **פעולה:** הטמעת CTA קבוע ומנגנון Quick Exit | **אחראי:** צוות פיתוח | **סטטוס:** ממתין
"קביעת תור" חייב להופיע בניווט קבוע בכל מיקום גלילה. שכבת גילוי Quick Exit חייבת לפעול לפני המשך כל ניתוב אוטומטי כאשר מזוהים מחווני סימפטום חריף.

- **פעולה:** עיצוב מחדש של אזור ה-Hero | **אחראי:** ארכיטקט UX | **סטטוס:** ממתין
שורת חיפוש, סלוגן ממוקד מטופל ("בוא.י נחזיר תנועה חלקה לכתף שלך"), ו-CTA ראשי מעל הקפל. הסרת ביוגרפיה מוסדית מהנדל"ן מעל הקפל.

- **פעולה:** בניית ניווט אינטראקטיבי ממוקד-כוונה | **אחראי:** צוות פיתוח | **סטטוס:** ממתין
יישום ארכיטקטורת ניווט Level 1 → Level 2 → Level 3 לפי נספח ב'. שאלה אחת חשופה בכל שלב.

- **פעולה:** ביזור תוכן לעמודי נחיתה ייעודיים | **אחראי:** צוות תוכן | **סטטוס:** ממתין
בניית עמוד נחיתה ייעודי לכל פתולוגיה לפי ארכיטקטורת נספח ג'.

- **פעולה:** ארגון מחדש של אותות אמון | **אחראי:** צוות עיצוב | **סטטוס:** ממתין
צילומי צוות וביוגרפיה מועברים מתחת לתוכן הפתרון הקליני. הערך הקליני מוביל; ההקשר האנושי תומך ומחזק.

- **פעולה:** יישום מבנה תוכן מתקפל לחומר עיון | **אחראי:** צוות פיתוח | **סטטוס:** ממתין
צ'קליסט טרום-ניתוח (נספח ד') וציר זמן שיקום (נספח ה') יוטמעו כרכיבי אקורדיון או לשוניות. מצמצם אורך גלילה ומספק תוכן ברגע הסקוונציאלי הנכון.

- **פעולה:** הנגשת ז'רגון רפואי באמצעות Tooltips | **אחראי:** צוות תוכן | **סטטוס:** ממתין
כל המונחים הקליניים בטקסט הפונה למטופל יקבלו Tooltips לפי מיפוי הטרמינולוגיה בנספח א'.

# 08. /מפת_דרכים_ליישום

*שלושה שלבי אספקה. ממוינים לפי יחס השפעה-מאמץ.*

```timeline
Phase: שלב א — Quick Wins | Period: שבועיים
- שכתוב תוכן פונה למטופל — מעבר לטון אמפתי לאורך כל הטקסט הקיים
- CTA קבוע — "קבע ייעוץ" קבוע בכל מיקום גלילה
- החלת מפרט UI — כחול מותג, 16px מינימום, אזורי מגע 48px, מערכת 8px
- ארגון מחדש של אותות אמון — צילומי צוות מועברים מתחת לתוכן הקליני

Phase: שלב ב — תשתיות | Period: חודש 1–2
- 5 עמודי פתולוגיה — כתף קפואה, שרוול מסובב, חוסר יציבות, שחיקת סחוס, תסמונת צביטה
- יישום מטא-דאטה SEO — מבנה URL מחדש, תיאורי מטא, Rich Snippets
- רכיבי אקורדיון — צ'קליסט טרום-ניתוח וציר שיקום כרכיבים מתקפלים
- ארכיטקטורת קישורים פנימיים — קישורים בין עמודי פתולוגיה, מדריכי שיקום ו-FAQ

Phase: שלב ג — UX מתקדם | Period: חודש 3+
- מערכת ניווט אינטראקטיבית — זרימה ב-3 כוונות עם Progressive Disclosure
- שכבת Quick Exit — זיהוי סימפטומים חריפים וניתוב חירום
- סרטוני הסבר רופאים — שילוב סרטונים בעמודי פתולוגיה וטרום-ניתוח
- שיקום תלוי-צד — גרסאות כתף ימין/שמאל לפי מודל HSS
```

# 09. /ארכיטקטורת_עמוד_פתולוגיה

*המבנה שכל עמוד פתולוגיה חייב לעקוב אחריו. עקביות ארכיטקטורה מאפשרת לגוגל להבין את קשר התוכן ולמטופלים לבנות מודל מנטלי שמועבר מעמוד לעמוד.*

```pagezone
Zone: סקציית Hero | Type: Hero
כותרת גדולה בשפת הסימפטום: "הכתף שלי נוקשה ותקועה." מונח קליני בגופן קטן מתחת: "(כתף קפואה — קפסוליטיס דביקה)." סיכום TL;DR במשפט אחד. CTA ראשי "שריינו התייעצות" גלוי ללא גלילה.

Zone: פאנל סימפטומים ואבחון | Type: Content
רשימת סימפטומים חזותית עם איקוניות אנטומיות. ציר זמן האבחון ("כמה זמן זה קורה?") וסימנים מבדילים מפתולוגיות סמוכות. מעוצב לסריקה, לא לקריאה.

Zone: בורר נתיב טיפולי | Type: Content
שני מסלולים ויזואליים נפרדים: טיפול שמרני (פיזיותרפיה, הזרקות, ציר זמן) וניתוח (שם הפרוצדורה, מה כרוך בה, תצוגה מקדימה של ההתאוששות). מובדלים ויזואלית כדי שמטופלים יבחרו נתיב רלוונטי מבלי לקרוא את שניהם.

Zone: ציר זמן שיקום | Type: Content
שלבי שיקום שבוע-אחר-שבוע מנספח ה'. אינטראקטיבי או מבוסס אקורדיון. כולל מתי לפנות לצוות המנתח — רשת ביטחון מוטמעת בתוך ציר הזמן עצמו.

Zone: פתולוגיות קשורות וקישורים פנימיים | Type: Navigation
3–4 מצבים קשורים עם מבדלים קצרים ("זה לא כתף קפואה אם..."). קישורים פנימיים לעמודי פתולוגיה, מדריכי שיקום ו-FAQ ייעודי. בונה הון קישורים ומבנה קוגניטיבי למטופל בו-זמנית.

Zone: FAQ ספציפי לפתולוגיה | Type: FAQ
5–7 שאלות ספציפיות לפתולוגיה מובנות ל-Featured Snippets של גוגל. תשובות בגוף ראשון. סוגר את מעגל המידע לפני שהמטופל מרגיש שעליו לחפש במקום אחר.
```

# 10. /ארכיטקטורת_עמוד_ראשי

*דף הבית הוא דלת הכניסה של היחידה. כל אזור חייב לשרת אחת משלוש כוונות — אבחון, הכנה, התאוששות — ולהמיר חרדת מטופל לפגישת ייעוץ מוזמנת.*

```pagezone
Zone: Hero | Type: Hero
כותרת בשפת המטופל: "כאב בכתף? זה בדיוק מה שאנחנו מתמחים בו." שם יחידת הכתף של הדסה + שיוך לבית החולים כעוגן אמון משני. תיאור יחידה במשפט אחד. CTA ראשי יחיד: "שריינו ייעוץ" — גלוי מעל הקפל בכל המכשירים.

Zone: בורר כוונות | Type: Navigation
שלושה כפתורים גדולים שווי משקל המתאימים לשלוש כוונות המטופל מנספח ב: "יש לי כאב בכתף או פציעה." / "אני עתיד לעבור ניתוח כתף." / "אני מתאושש מניתוח כתף." כל אחד מנתב לזרימה הרלוונטית. אין ניווט אחר מתחרה בשלושה נתיבים אלה.

Zone: למה יחידת כתף הדסה | Type: Social Proof
3–4 מדדי אמון: נפח פרוצדורות שנתי, שנות פעילות היחידה, טכנולוגיה בשימוש (ניתוח בסיוע רובוט, הדמיה תלת-ממדית), שיעור מטופלים בינלאומיים. מותג הדסה כגב. סריקה בלבד — ללא טקסט צפוף. תת-טקסט: "אתה בידיים מתמחות."

Zone: נווט פתולוגיות | Type: Navigation
רשת של 6–8 מצבי כתף נפוצים עם תוויות כרטיס בשפת המטופל ("הכתף שלי נוקשה ותקועה" ← כתף קפואה). כל כרטיס מקשר לעמוד הפתולוגיה המתאים. תווית דו-שפתית: כותרת סימפטום בגדול + מונח קליני קטן. נקודת כניסה לרוב המבקרים שמאבחנים עצמם.

Zone: מסע המטופל | Type: Content
שלושה שלבים ויזואליים: ייעוץ ← אבחנה ותכנון ← טיפול או ניתוח. מפחית חרדת הלא נודע. לכל שלב תיאור במשפט אחד ופרק זמן משוער. ממצב את היחידה כתהליך מלווה, לא כמחלקה בבית חולים.

Zone: היכרות עם הצוות | Type: Social Proof
2–3 פרופילי מנתח מרכזיים. שם, תואר, תת-התמחות, אישור אמון אחד. תמונה. קישור לדף ביוגרפיה מלא. הופך מותג מוסדי ("הדסה") לפנים אנושיות שמטופלים מרגישים שהם בוחרים, לא מוקצים אליהם.

Zone: המלצות מטופלים | Type: Social Proof
3 ציטוטי מטופלים ממוקדי תוצאה. פורמט: מצב שטופל ← תוצאה שהושגה ← זמן התאוששות. מיוחס בשם פרטי ומצב בלבד (עמיד בפרטיות). ממוקם אחרי הצוות — מחזק פנים עם תוצאות.

Zone: CTA לייעוץ | Type: CTA
אזור המרה ברוחב מלא. "שריינו את הייעוץ שלכם — מענה תוך יום עסקים אחד." מספר טלפון + טופס יצירת קשר זה לצד זה. טקסט הרגעה קצר: ללא התחייבות, פורמט ייעוץ ראשוני, הערת ביטוח. תשובה סופית לשאלה "מה אני עושה עכשיו?"
```

# 11. /נספחים

### נספח א: מיפוי טרמינולוגיה — גישור הפער הסמנטי

*הכלל: שפת המטופל בכותרות וב-CTAs. מונח קליני בטקסט משני או ב-Tooltip.*

| אבחנה קלינית | תיאור סימפטום ידידותי למטופל | רציונל קליני |
|---|---|---|
| קפסוליטיס דביקה (כתף קפואה) | "הכתף שלי נוקשה, הדוקה ותקועה." | קושי עמוק בפעילויות יומיומיות עקב כיווץ קפסולרי. |
| קרע בשרוול המסובב / דלקת גידים | "כאב עמום וחולשה כשאני מרים/ה את היד." | מחמיר בהרמת יד הצידה; כאב לילי עז הוא הסימן המבדיל המרכזי. |
| נגע SLAP / קרע לברום | "הכתף שלי 'נתפסת', 'קופצת' או מרגישה כאילו היא עומדת להחליק." | תחושת 'קליק' ברורה וחוסר יציבות, במיוחד בתנועות זריקה או מעל הראש. |
| אוסטאוארתריטיס גלנוהומרלי | "כאב חורק ומתמיד שהחמיר במשך חודשים או שנים." | אובדן תנועה הדרגתי המלווה בתחושת חריקה מובהקת במפרק. |
| הפרדת מפרק AC | "יש לי בליטה נראית לעין בחלק העליון של הכתף לאחר נפילה." | כאב ממוקד לחלק העליון של הכתף לאחר טראומה חריפה. |
| קרע / דלקת בגיד הביספס המקורב | "כאב בקדמת הזרוע, או בליטה נראית לעין פתאומית." | כאב קדמי בכתף בעת אחיזה או כפיפת שריר כנגד התנגדות. |
| רדיקולופתיה צווארית | "כאב חד, נימול או עקצוץ היורד מהזרוע לכף היד." | כאב שמקורו בעמוד השדרה הצווארי — לא פתולוגיה במפרק הכתף. |

### נספח ב: זרימת הניווט האינטראקטיבי (ממוקד-כוונה — 3 רמות)

**שלב 1: זיהוי כוונת המשתמש**
*"ברוכים הבאים ליחידת הכתף של הדסה. כיצד נוכל לסייע לך היום?"*

| # | תווית הכפתור | יעד |
|---|---|---|
| 1 | אני סובל/ת מכאב, אי-נוחות או פציעה בכתף. | → זרימת אבחון (שלב 2א) |
| 2 | אני מתוכנן/ת לניתוח כתף בקרוב. | → זרימת טרום-ניתוח (שלב 2ב) |
| 3 | אני מחלים/ה מניתוח כתף שנעשה לאחרונה. | → זרימת לאחר-ניתוח (שלב 2ג) |

**שלב 2א: זרימת אבחון**
*"מה הכי מתאר איך הבעיה בכתף התחילה או איך היא מרגישה?"*

| # | תיאור הבעיה | סיווג קליני |
|---|---|---|
| 1 | זה קרה בפתאומיות (נפילה, מכה, פציעת ספורט). | פגיעת טראומה (שבר, פריקה חריפה) |
| 2 | הכתף שלי מרגישה רופפת, מחליקה ממקומה, או נתפסת. | חוסר יציבות / קרע לברום |
| 3 | הכתף שלי נוקשה ובקושי ניתן להזיז אותה. | כתף קפואה / אוסטאוארתריטיס |
| 4 | כאב עמום שהחמיר עם הזמן, או מעיר בלילה. | פתולוגיית רקמה רכה (שרוול מסובב / בורסיטיס) |

**שלב 2ב: זרימת טרום-ניתוח**
*"כיצד נוכל לסייע לך להתכונן לניתוח הקרוב?"*

| # | נושא | הנחיה |
|---|---|---|
| 1 | מה עלי לעשות יום לפני וביום הניתוח? | כללי צום, זמני הגעה, הנחיות לבוש ותכשיטים. |
| 2 | אישורים רפואיים ובדיקות טרום-ניתוחיות. | הפניה לבדיקות דם, א.ק.ג. וטפסי אישור רופא מטפל. |
| 3 | אילו תרופות עלי להפסיק ליטול? | הפסקת NSAIDs, מדללי דם ותוספים 7–14 ימים לפני הניתוח. |
| 4 | צפייה בסרטוני הדרכה להכנת הבית. | הפניה לווידאו הדרכה לקראת ניתוח החלפת כתף / ארתרוסקופיה. |

**שלב 2ג: זרימת לאחר-ניתוח**
*"כדי לתת לך את ההנחיות הנכונות, כמה שבועות חלפו מאז הניתוח?"*

| # | ציר זמן | פוקוס פרוטוקול |
|---|---|---|
| 1 | שבועות 1–4 (הגנה וריפוי ראשוני) | טיפול בפצע, ניהול כאב, פרוטוקול מתלה מחמיר, תנועה פסיבית בלבד. |
| 2 | שבועות 4–8 (תנועה מוקדמת) | תרגילי תנועה אקטיבית-בסיוע, גמילה מהמתלה, חזרה לפעילויות קלות. |
| 3 | שבועות 8–12 (חיזוק) | תרגילי רצועות התנגדות, כוח השרוול המסובב, שליטה בשכמה. |
| 4 | חודשים 3–6 (חיזוק מתקדם) | פרוטוקולים לחזרה להרמת משקלים, ספורט ופעילות תובענית. |
| 5 | חשש דחוף לגבי ההתאוששות שלי. | מידע ליצירת קשר מיידי עם הצוות המנתח (חום, נפיחות, כאב חמור). |

**שלב 3א: מיון ספציפי — לאחר בחירת 'זה קרה בפתאומיות'**

| # | תיאור הסימפטום | אבחון קליני | פעולה מומלצת |
|---|---|---|---|
| 1 | יש לי בליטה נראית לעין בראש הכתף. | הפרדת מפרק AC / שבר בעצם הבריח. | הפניה לטיפול אורתופדי דחוף. |
| 2 | כאב חמור ואיני יכול/ה להרים את היד. | קרע מאסיבי חד / פריקה. | הפניה להערכה חריפה ודימות. |
| 3 | בליטה בשריר הזרוע וכאב מקדימה. | קרע גיד הביספס המקורב. | הפניה למידע וזימון תור למומחה. |

**שלב 3א: לאחר בחירת 'הכתף שלי מרגישה רופפת'**

| # | תיאור הסימפטום | אבחון קליני | פעולה מומלצת |
|---|---|---|---|
| 1 | הכתף שלי יצאה לגמרי מהמקום. | פריקה גלנוהומרלית. | הפניה למרפאת חוסר יציבות. |
| 2 | 'קליקים' או תפיסה עמוקה בפנים. | קרע לברום / נגע SLAP. | ייעוץ רפואת ספורט וארתרוסקופיה. |

**שלב 3א: לאחר בחירת 'הכתף שלי נוקשה ובקושי ניתן להזיז אותה'**

| # | תיאור הסימפטום | אבחון קליני | פעולה מומלצת |
|---|---|---|---|
| 1 | קפואה ונעולה, במיוחד בהתלבשות. | קפסוליטיס דביקה (כתף קפואה). | הפניה לטיפול לא-ניתוחי ופיזיותרפיה. |
| 2 | נוקשה, אבל גם חורקת כשמזיזים. | אוסטאוארתריטיס. | הפניה למרכז החלפות מפרקים. |

**שלב 3א: לאחר בחירת 'כאב עמום שהחמיר עם הזמן'**

| # | תיאור הסימפטום | אבחון קליני | פעולה מומלצת |
|---|---|---|---|
| 1 | מעיר בלילה, במיוחד כשישנים על הצד. | דלקת / קרע בשרוול המסובב. | הפניה למשאבי השרוול המסובב וזימון לאולטרסאונד/MRI. |
| 2 | כואב בהרמת יד מעל הראש. | תסמונת צביטה / בורסיטיס. | הפניה לטיפול שמרני, הזרקות ופיזיותרפיה. |
| 3 | כאב חד, נימול או עקצוץ יורד לכף היד. | רדיקולופתיה צווארית. | יידוע: הכאב עשוי לנבוע מעמוד השדרה. הפניה להערכת עמוד שדרה. |

### נספח ג: ארכיטקטורת עמודי פתולוגיה

| פתולוגיה | הסבר קליני | טיפול שמרני | טיפול ניתוחי |
|---|---|---|---|
| כתף קפואה (Adhesive Capsulitis) | "נוקשה, הדוקה ותקועה. חוסר תנועה עמוק עקב כיווץ קפסולרי." | פיזיותרפיה אינטנסיבית והזרקות למפרק. | שחרור ארתרוסקופי של הקפסולה למקרים עמידים. |
| קרע בשרוול המסובב | "כאב עמום וחולשה בהרמת יד, לעתים עם כאב לילי עז." | טיפול נוגד דלקת, הזרקות תת-אקרומיאליות, פיזיותרפיה. | תיקון ארתרוסקופי או החלפת כתף הפוכה לקרעים מאסיביים. |
| חוסר יציבות / קרע לברום | "הכתף 'נתפסת', 'קופצת' או מרגישה רופפת." | חיזוק דינמי ושיפור שליטה בשכמה. | תיקון Bankart ארתרוסקופי או ניתוח Latarjet לחסר עצם. |
| שחיקת סחוס (Osteoarthritis) | "כאב חורק ומתמיד שהחמיר. אובדן תנועה הדרגתי." | ניהול כאב, הזרקות, שימור טווח תנועה. | החלפת מפרק כתף (אנטומית או הפוכה). |
| תסמונת צביטה (Impingement) | "כאב בהרמת יד מעל הראש. דלקת גידים מתחת לעצם השיא." | מנוחה, הזרקות סטרואידים/PRP, פיזיותרפיה. | Acromioplasty ארתרוסקופי להרחבת המרווח. |

### נספח ד: צ'קליסט הכנה לניתוח

| קטגוריה | הנחיות למטופל | יעד קליני |
|---|---|---|
| ניהול תרופות | הפסקת מדללי דם ו-NSAIDs 7–14 ימים לפני הניתוח. | מניעת דימום יתר ואינטראקציות עם הרדמה. |
| אישורים ובדיקות | בדיקות דם, א.ק.ג. ואישור קרדיולוג (ב-30 יום שלפני). | ודא כשירות רפואית לעמוד בעומס הניתוחי. |
| יום לפני הניתוח | צום (ללא מוצקים לאחר חצות), נוזלים צלולים בלבד, קרצוף אנטי-בקטריאלי. | מניעת שאיפה ריאתית והפחתת זיהומי אתר ניתוח. |
| יום הניתוח | הסרת תכשיטים ופירסינג, לבוש רפוי, זמני הגעה מדויקים. | הבטחת בטיחות פיזית ונוחות לאחר הניתוח. |

### נספח ה: ציר זמן שיקום כרונולוגי

| שלב | ייעוד | תוכן דיגיטלי ופרוטוקול |
|---|---|---|
| שבועות 1–4 | ריפוי ראשוני והגנה | טיפול בפצע, ניהול כאב, פרוטוקול מתלה, תנועה פסיבית. זיהוי סימני זיהום. |
| שבועות 4–8 | תנועה מוקדמת | סרטוני תרגילי תנועה אקטיבית-בסיוע, גמילה בטוחה מהמתלה, חזרה לפעילויות יומיומיות קלות. |
| שבועות 8–12 | חיזוק אקטיבי | תרגילי רצועות התנגדות, בניית כוח לשרוול המסובב, שיפור יציבות השכמה. |
| חודשים 3–6 | חיזוק מתקדם וחזרה לפעילות | פרוטוקולים להרמת משקלים, עבודה פיזית תובענית וספורט. תחזוקה ארוכת טווח. |

### נספח ו: מפרט טכני לצוות הפיתוח

**ו.1 מפרט UI**

| רכיב | ערך/מפרט | יישום |
|---|---|---|
| טיפוגרפיה | 16–18px גוף טקסט | גופן Heebo או Assistant לקריאות עבור קהל מבוגר. |
| כפתורי CTA | 48–56px גובה | כחול מותג מרכזי; רדיוס 8–12px. |
| מערכת ריוח | 8px Grid | כל מרווחים בכפולות של 8px. |

**ו.2 הנחיות ארכיטקטורה ופונקציונליות**

| פונקציונליות | דרישת מערכת | לוגיקה |
|---|---|---|
| ניווט אינטראקטיבי | Progressive Disclosure | שאלה אחת בכל שלב — מינימיזציה של עומס קוגניטיבי (חוק היק). |
| מנגנון Quick Exit | התראת חירום בולטת | זיהוי סימפטומים חריפים והפניה מיידית למיון. |
| מבנה תכנים | Accordions ו-Tabs | צמצום אורך גלילה ומיון מידע לפי שלבי שיקום. |

**ו.3 אסטרטגיית תוכן ו-SEO**

| תחום | הנחיית ביצוע | מטרה |
|---|---|---|
| ביזור פתולוגיות | עמוד נחיתה נפרד לכל מחלה | שיפור דירוג גוגל לשאילתות ספציפיות. |
| טון דיבור | שפת סימפטום קודמת לשפה רפואית | גישור הפער הסמנטי. |
| מיקרו-קופי | תוויות מוכוונות-פעולה ואמפתיות | "בוא.י נתחיל בהחלמה". |
| מבנה URL | `/shoulder/[שם-פתולוגיה]` | URL נקי ואינדקסאבילי. |
| תיאורי מטא | שאלות נפוצות ל-Rich Snippets | כיבוש מיקומי "אנשים שואלים גם" בגוגל. |
:::
