---
client: "Hadassah Shoulder Unit"
project: "UX Audit & Patient Flow Optimization"
date: 2026-04-28
languages: '["en", "he"]'
confidential: true
type: "Technical UX Audit"
title: "Hadassah Patient Experience Digital Audit"
---

:::en
# 01. /executive_summary

This report comprehensively analyzes the current User Experience (UX/UI) of the Hadassah Shoulder Unit web page. The audit reveals a significant "conversion delay," where critical patient actions (appointment booking, searching) are buried under extensive institutional information. By restructuring the content into a logical patient journey—prioritizing symptom identification and calls to action—the site can significantly improve engagement rates and patient satisfaction.

The current digital experience acts as an institutional library rather than a clinic. Patients are required to read through institutional history before finding actionable symptom guides.

# 02. /performance_metrics

*Quantitative baseline for the audit.*

- **Metric:** Visual Design Score | **Value:** 6/10 | **Trend:** - (Professional but sterile; lacks interactive elements)
- **Metric:** Usability (UX) Score | **Value:** 4/10 | **Trend:** - (Problematic flow; critical CTA is delayed)
- **Metric:** Accessibility Score | **Value:** 7/10 | **Trend:** - (Good foundation, compliant contrast/labels)

# 03. /key_findings

*Detailed documentation of UX friction points and structural vulnerabilities.*

- **Finding:** Delayed Conversion Funnel | **Severity:** Critical
The current flow is severely delayed, leading to potential user abandonment before reaching the conversion point. The Friction Path is 8 steps deep: 1. Staff info -> 2. Pathologies -> 3. Surgeries -> 4. FAQ -> 5. More pathologies -> 6. Patient knowledge -> 7. Rehab knowledge -> 8. CTA (Booking).
**Recommendation:** Bring the primary CTA to the top and make it globally accessible.

- **Finding:** Information Architecture & Cognitive Load | **Severity:** High
The page is built as a long "scroll" presenting static lists of dozens of pathologies with no direct connection. The average patient arrives with a symptom, not a professional diagnosis.
**Recommendation:** Implement symptom-driven navigation and decentralize content to dedicated landing pages.

- **Finding:** Complex Medical Jargon | **Severity:** Medium
Use of overly technical terms (e.g., "LHB") without mediation for the general public.
**Recommendation:** Implement terminology mapping via Tooltips to replace complex medical terms with accessible language.

- **Finding:** Visual Hierarchy & Branding | **Severity:** Low
Lack of contrast in secondary buttons.
**Recommendation:** Use the primary brand blue for CTA buttons to increase prominence.

- **Finding:** RTL Consistency | **Severity:** Low
Graphic elements, bullets, and arrows need to correctly support right-to-left alignment.
**Recommendation:** Flip relevant graphic elements for RTL context.

# 04. /strategic_decisions

*High-level architectural directives and strategic benchmarks.*

- **Decision:** UI Benchmarks Implementation | **Impact:** High
Implement 8px Grid system, 1200px max container width, 16px-18px typography for readability by older demographics, 48px-56px CTA height for comfortable touch, and 8px-12px border radius.
- **Decision:** Voice & Tone Shift (Brand DNA) | **Impact:** High
Shift from purely authoritative to "Authoritative but Empathetic". We don't speak in condescending medical terms. We speak with confidence born of experience. Instead of "Click here to book", use "Let's start your recovery process".
- **Decision:** SEO Optimization via Decentralization | **Impact:** High
Optimize pathology pages around "Pain queries" (e.g., "shoulder pain at night") and "Solution queries" (e.g., "rotator cuff repair surgery Hadassah"). Use clean URLs and Rich Snippets in Meta Descriptions.
- **Decision:** Safety & Error Handling (Quick Exit) | **Impact:** Critical
Implement a mechanism to immediately stop the automated flow and direct the user to urgent care in cases of acute trauma (visible bulge, inability to move) or severe post-op danger signs (fever, massive swelling). Ensure a constant button for human contact (phone/chat) is always visible.
- **Decision:** Benchmarking Industry Leaders | **Impact:** High
Adopt Cleveland Clinic's standardized triage (reduce to 2 main elements), HSS's multifaceted taxonomy and side-dependent rehab guides, and Mayo Clinic's symptom-driven decision trees with safety nets.

# 05. /action_plan

*Prioritized recommendations and developer-ready handoff tasks.*

- **Action:** High Priority - Constant CTA & Quick Exit | **Owner:** Dev Team | **Status:** Pending
"Book Appointment" must be visible at every navigation stage. Implement Quick Exit for emergencies.
- **Action:** High Priority - Reorganize Hero Area | **Owner:** UX Architect | **Status:** Pending
Implement search bar, patient-focused slogan ("Let's bring smooth motion back to your shoulder"), and immediate CTA.
- **Action:** High Priority - Develop Interactive Navigation | **Owner:** Dev Team | **Status:** Pending
Implement the 3-step intent-driven flow directing patients to diagnosis, pre-op, and post-op.
- **Action:** High Priority - Decentralize Content | **Owner:** Content Team | **Status:** Pending
Break down the long page into dedicated pathology pages for SEO and IA.
- **Action:** High Priority - Build Trust | **Owner:** Design Team | **Status:** Pending
Move staff information below clinical solutions and integrate professional team photos.
- **Action:** Medium Priority - Foldable Critical Info | **Owner:** Dev Team | **Status:** Pending
Create tabs/accordions for pre-op checklist and chronological rehab timeline.
- **Action:** Medium Priority - Accessible Medical Jargon | **Owner:** Content Team | **Status:** Pending
Implement terminology mapping via tooltips.

# 06. /implementation_roadmap

- **Phase 1: Quick Wins (2 Weeks):** Reorder content, add CTAs, and upgrade texts to an empathetic tone.
- **Phase 2: Infrastructure (1-2 Months):** Build landing pages for pathologies and treatments.
- **Phase 3: Advanced UX (3+ Months):** Implement interactive navigation and integrate doctor explainer videos.

# 07. /appendices

### Terminology Mapping: Bridging the Semantic Gap

| Clinical Diagnosis / Pathology | Patient-Friendly Symptom | Clinical Rationale |

| --- | --- | --- |

| Adhesive Capsulitis (Frozen Shoulder) | "My shoulder is stiff, tight, and stuck." | Profound difficulty in basic daily activities due to capsular contracture. |

| Rotator Cuff Tear / Tendinitis | "A dull ache and weakness when I lift my arm." | Pain worsens significantly when lifting the arm to the side, severe night pain. |

| SLAP Lesion / Labral Tear | "My shoulder 'catches', 'pops', or feels like it will slip out." | Distinct 'click' and instability, especially in throwing motions. |

| Glenohumeral Osteoarthritis | "I have a constant grinding pain that worsened over months/years." | Gradual loss of motion accompanied by a distinct grinding or 'crunch'. |

| AC Joint Separation | "I have a visible bump on top of my shoulder after a fall." | Highly localized pain on top of the shoulder following acute trauma. |

| Proximal Biceps Tendon Tear | "I have pain in the front of my arm, or a sudden visible bulge." | Anterior shoulder pain specifically when gripping or flexing against resistance. |

| Cervical Radiculopathy | "I have a sharp, shooting pain, numbness, or tingling going down my arm." | Pain originating from the cervical spine radiating beyond the shoulder. |

### Appendix A: Interactive Navigation Flow (Intent-driven)
**Level 1: Identify User Intent**

| # | Button Label | Destination |

|---|---|---|

| 1 | I suffer from shoulder pain, discomfort, or injury. | Go to Diagnosis Flow (Level 2A) |

| 2 | I am scheduled for shoulder surgery soon. | Go to Pre-Op Flow (Level 2B) |

| 3 | I am recovering from a recent shoulder surgery. | Go to Post-Op Flow (Level 2C) |

**Level 2A: Diagnosis Flow**

| # | Problem Description | Clinical Classification (Backend Mapping) |

|---|---|---|

| 1 | It happened suddenly (fall, blow, or sports injury). | Trauma (Fracture, Acute Dislocation) |

| 2 | My shoulder feels loose, slips out, or catches. | Instability / Labral Tear |

| 3 | My shoulder is stiff and barely moves. | Frozen Shoulder / Osteoarthritis |

| 4 | I have a dull ache that worsened over time, or wakes me at night. | Soft Tissue Pathology (Rotator Cuff, Bursitis) |

**Level 2B: Pre-Operative Flow**

| # | Topic | Medical/Logistical Guideline |

|---|---|---|

| 1 | What should I do the day before and day of surgery? | Fasting rules, arrival times, clothing and jewelry guidelines. |

| 2 | Medical clearances and pre-op tests. | Referral for blood tests, EKG, and primary care physician approval. |

| 3 | What medications should I stop taking? | Discontinue NSAIDs, blood thinners, and supplements 7-14 days before surgery. |

| 4 | Watch home preparation tutorial videos. | Referral to instructional video for shoulder replacement/arthroscopy. |

**Level 2C: Post-Operative Flow**

| # | Recovery Timeline | Rehab Instructions and Protocol |

|---|---|---|

| 1 | Weeks 1 to 4 (Protection and initial healing) | Wound care, pain management, strict sling protocol, and passive motion only. |

| 2 | Weeks 4 to 8 (Early motion) | Active-assisted exercises, sling weaning, and return to light activities. |

| 3 | Weeks 8 to 12 (Strengthening phase) | Resistance band exercises, building muscle strength, and scapular control. |

| 4 | Months 3 to 6 (Advanced strengthening) | Protocols for heavy lifting, sports, and demanding physical activity. |

| 5 | Urgent concern regarding my recovery. | Immediate contact info for the surgical team (fever, swelling, severe pain). |

**Level 3A: Specific Triage and Clinical Diagnosis**
*(Exposed after selecting an option in Level 2A)*

*3A.1: After selecting 'It happened suddenly'*

| # | Symptom Description | Clinical Classification | Recommended Action |

|---|---|---|---|

| 1 | Visible bump on top of the shoulder. | AC joint separation / Clavicle fracture. | Referral to urgent ortho care/trauma appointment. |

| 2 | Severe pain, cannot lift arm at all. | Acute massive rotator cuff tear / Dislocation. | Referral for acute evaluation and imaging. |

| 3 | Bulge in upper arm muscle and front pain. | Proximal biceps tendon tear. | Info on biceps tear and specialist appointment. |

*3A.2: After selecting 'Shoulder feels loose'*

| # | Symptom Description | Clinical Classification | Recommended Action |

|---|---|---|---|

| 1 | Shoulder popped completely out of place. | Glenohumeral dislocation. | Referral to instability clinic. |

| 2 | Deep 'clicks' or catching inside when moving. | Labral tear / SLAP lesion. | Referral for sports medicine and arthroscopy consult. |

*3A.3: After selecting 'Stiff and barely moves'*

| # | Symptom Description | Clinical Classification | Recommended Action |

|---|---|---|---|

| 1 | Frozen and locked, especially when dressing. | Adhesive Capsulitis (Frozen Shoulder). | Referral to non-surgical care and physical therapy. |

| 2 | Stiff, but also grinds when I move it. | Osteoarthritis. | Referral to joint replacement center. |

*3A.4: After selecting 'Dull ache that worsened'*

| # | Symptom Description | Clinical Classification | Recommended Action |

|---|---|---|---|

| 1 | Wakes me at night, especially sleeping on the side. | Rotator cuff tendinitis / tear. | Rotator cuff resources and US/MRI referral. |

| 2 | Hurts when lifting overhead or lifting objects. | Impingement / Bursitis. | Conservative care, injections, and PT. |

| 3 | Sharp, shooting pain, tingling down the arm. | Cervical Radiculopathy. | Notify: Pain may originate from the spine. Referral to spine evaluation. |

### Appendix B: Concept Flow (Landing Page Diagram)
1. **Header:** Human & professional aspect – Hadassah doctors team photo, experience message, and CTA.
2. **The Flow:** Interactive "Diagnose Yourself" tool offering 3 smart symptom cards.
3. **Highlights:** Dedicated area for unique treatments and advanced tech (e.g., Reverse Shoulder Replacement) in styled cards.
4. **Utility Hub:** Foldable info area (accordions) including tutorials, rehab stages, and post-op instructions.
5. **FAQ:** Clean, modern design for common questions.
6. **Other Pages Menu:** Links to sub-pages (About Us, Pathologies, Rehab, Surgeries).

### Appendix C: Pathology Pages Flow

| Pathology (Page Title) | Pathology Explanation Card | Conservative Treatment Card | Surgical Treatment Card |

|---|---|---|---|

| Adhesive Capsulitis (Frozen Shoulder) | "Stiff, tight, stuck. Profound lack of motion in daily tasks due to capsular contracture." | Intensive PT and glenohumeral injections to reduce inflammation. | Arthroscopic Capsular Release for conservative-resistant cases. |

| Rotator Cuff Tear | "Dull ache and weakness when lifting the arm, severe night pain." | Anti-inflammatory treatment, subacromial injections, and stabilizing muscle PT. | Arthroscopic Rotator Cuff Repair or Reverse Shoulder Replacement for massive tears. |

| Instability / Labral Tear | "Shoulder 'catches', 'pops' or feels loose when lifting objects/throwing." | Dynamic rotator cuff strengthening and scapular control to prevent recurrent dislocations. | Arthroscopic Bankart Repair or Latarjet procedure for bone loss. |

| Osteoarthritis | "Constant grinding pain worsened over months/years. Gradual motion loss." | Pain management via meds, injections, and load-free motion preservation. | Anatomic or Reverse Total Shoulder Arthroplasty (TSA). |

| Impingement Syndrome | "Pain when lifting arm overhead. Caused by inflamed tendons under the acromion." | Rest from overhead activities, steroid/PRP injections, and mechanical correction PT. | Arthroscopic Acromioplasty to widen the subacromial space. |

### Appendix D: Pre-Operative Checklist

| Clinical/Logistical Category | Patient Instructions (UI Content) | Clinical/UX Goal |

|---|---|---|

| Medication Management | Stop blood thinners (Coumadin) and NSAIDs 7-14 days before surgery. | Prevent excessive bleeding and anesthesia interactions. |

| Clearances & Tests | Submit recent blood tests, EKG, and cardiologist approval (within 30 days). | Ensure patient is medically fit for surgical stress. |

| Day Before Instructions | Fasting (no solids after midnight), clear liquids only, antibacterial scrubbing. | Prevent pulmonary aspiration and reduce surgical site infections. |

| Day of Surgery | Complete removal of jewelry/piercings, wear loose clothing, exact arrival times. | Ensure physical safety and easy undressing post-op. |

### Appendix E: Post-Operative Timeline

| Recovery Timeline | Phase Purpose | Digital Content & Rehab Protocol |

|---|---|---|

| Weeks 1 to 4 | Initial healing and protection | Wound care, pain management, strict sling protocol, passive motion. Identifying infection signs. |

| Weeks 4 to 8 | Early motion and sling weaning | Active-assisted motion tutorials, safe sling weaning, return to light daily activities (driving). |

| Weeks 8 to 12 | Active strengthening | Resistance band instructions, building rotator cuff strength and stabilizing scapula. |

| Months 3 to 6 | Advanced strengthening / Return to sport | Protocols for heavy lifting, demanding physical work, and elite sports. Long-term joint maintenance. |

### Appendix F: Technical & Functional Specs
**F.1 UI Specifications**

| Component | Value/Spec | UX Rationale |

|---|---|---|

| Typography | 16px-18px (Body) | Assistant or Heebo font for optimal readability for older audiences. |

| CTA Buttons | 48px-56px height | Contrasting brand blue; 8px-12px border radius for modern look. |

| Grid System | 8px Grid System | All margins/paddings in multiples of 8px for consistency. |

**F.2 Architecture & Functional Guidelines**

| Functionality | System Requirement | Clinical/UX Logic |

|---|---|---|

| Interactive Navigation | Progressive Disclosure | Expose one question at a time to prevent cognitive overload (Hick's Law). |

| Quick Exit Mechanism | Prominent Emergency Alert | Identify acute symptoms and direct immediately to ER (Safety Net). |

| Content Structure | Accordions & Tabs | Reduce scrolling length and organize info by rehab stages. |

**F.3 Content Strategy & SEO**

| Domain | Execution Guideline | Goal |

|---|---|---|

| Pathology Decentralization | Separate landing page per disease | Improve Google ranking for specific queries like "shoulder tear". |

| Tone of Voice | Move from medical to symptom language | Bridge the semantic gap and reduce patient anxiety. |

| Micro-copy | Action-Oriented labels | Empathetic call to action (e.g., "Let's begin recovery"). |
:::

:::he
# 01. /תקציר_מנהלים

דוח זה מנתח באופן מקיף את חוויית המשתמש (UX/UI) הנוכחית של דף האינטרנט של יחידת הכתף בהדסה. הבדיקה מעלה "עיכוב המרה" משמעותי, שבו פעולות קריטיות של המטופל (זימון תור, חיפוש) קבורות תחת מידע מוסדי נרחב. על ידי סידור מחדש של התוכן למסע מטופל לוגי — תעדוף זיהוי הבעיה וקריאה לפעולה — האתר יכול לשפר משמעותית את שיעורי המעורבות ושביעות רצון המטופלים.

החוויה הדיגיטלית הנוכחית פועלת כספרייה מוסדית ולא כמרפאה נגישה. המטופלים נדרשים לקרוא היסטוריה מוסדית לפני שהם מגיעים למדריכי סימפטומים ישימים.

# 02. /מדדי_ביצועים

*קו בסיס כמותי עבור הביקורת.*

- **מדד:** עיצוב ויזואלי | **ערך:** 6/10 | **מגמה:** - (מקצועי אך סטרילי; חסרים אלמנטים אינטראקטיביים)
- **מדד:** שימושיות (UX) | **ערך:** 4/10 | **מגמה:** - (זרימה בעייתית; קריאה לפעולה מעוכבת קריטית)
- **מדד:** נגישות (a11y) | **ערך:** 7/10 | **מגמה:** - (בסיס טוב, תגיות לקוראי מסך וניגודיות תקינים)

# 03. /ממצאים_עיקריים

*תיעוד מפורט של נקודות חיכוך בחוויית המשתמש.*

- **ממצא:** עיכוב במפשך ההמרה | **חומרה:** קריטית
הזרימה הנוכחית מעוכבת מאוד, מה שמוביל לנטישה פוטנציאלית של המשתמש. נתיב החיכוך: 1. כוח אדם -> 2. פתולוגיות -> 3. ניתוחים -> 4. שאלות נפוצות -> 5. עוד פתולוגיות -> 6. מרכז ידע למטופל -> 7. מרכז ידע למשקם -> 8. קריאה לפעולה (קבורה בתחתית העמוד).
**המלצה:** הטמעת ה-CTA בחלקו העליון של הדף והפיכתו לנגיש מכל מקום.

- **ממצא:** עומס קוגניטיבי וארכיטקטורת מידע (IA) | **חומרה:** גבוהה
העמוד בנוי בתצורת "מגילה" המציגה רשימות סטטיות של עשרות פתולוגיות. המטופל הממוצע מגיע עם סימפטום ולא עם אבחנה מקצועית. בנוסף, חסרים עמודי נחיתה ייעודיים לכל פתולוגיה, מה שפוגע ב-SEO.
**המלצה:** יישום זרימה מבוססת-כוונה (Intent-driven) וביזור התוכן לעמודי נחיתה ייעודיים.

- **ממצא:** ז'רגון רפואי מורכב | **חומרה:** בינונית
שימוש במונחים טכניים (כמו "LHB") ללא תיווך לקהל הרחב.
**המלצה:** הנגשת ז'רגון רפואי באמצעות בועות מידע (Tooltips).

- **ממצא:** חוסר היררכיה חזותית וניגודיות | **חומרה:** נמוכה
חוסר ניגודיות בכפתורים משניים ("הכנה לניתוח"). טקסט אפור על לבן אינו עומד בתקן.
**המלצה:** שימוש בכחול המותג המרכזי לכפתורי CTA לשיפור בולטות ויזואלית.

- **ממצא:** עקביות תצוגת RTL | **חומרה:** נמוכה
יש לוודא שנקודות תבליט, חצים ואייקונים מיישרים קו עם הקשר של מימין-לשמאל.
**המלצה:** היפוך אלמנטים גרפיים רלוונטיים.

# 04. /החלטות_אסטרטגיות

*הנחיות ארכיטקטוניות ברמת-על מבוססות מחקר.*

- **החלטה:** יישום מפרט טכני מומלץ (UI Benchmarks) | **השפעה:** גבוהה
מערכת ריווח Grid 8px, רוחב מיכל 1200px, טיפוגרפיה 16px-18px לקריאות (במיוחד לקהל מבוגר), גובה כפתור CTA 48px-56px למגע נוח, ורדיוס פינות 8px-12px.
- **החלטה:** אסטרטגיית תוכן וטון דיבור (Brand DNA) | **השפעה:** גבוהה
מעבר מטון סמכותי בלבד לטון "סמכותי אך אמפתי". המיקרו-קופי ישתנה: במקום "לחץ כאן לזימון תור" -> "בוא.י נתחיל בתהליך ההחלמה שלך". במקום "מידע על ניתוחים" -> "מה עלי לצפות ביום הניתוח?".
- **החלטה:** SEO וביזור פתולוגיות | **השפעה:** גבוהה
אופטימיזציה סביב "שאילתות כאב" ("כאב בכתף בלילה") ו"שאילתות פתרון" ("ניתוח לתיקון קרע בכתף הדסה"). שימוש ב-Rich Snippets.
- **החלטה:** טיפול בחירום ויציאה מהירה (Quick Exit) | **השפעה:** קריטית
יישום מנגנון לעצירת הניווט האוטומטי והפניה לטיפול דחוף במקרי טראומה (שבר פתוח, דפורמציה) או סימני סכנה לאחר ניתוח (חום, נפיחות מאסיבית). חובה לשלב כפתור קבוע לשיחה אנושית ("רשת ביטחון").
- **החלטה:** השראה והשוואה למובילי שוק | **השפעה:** גבוהה
אימוץ הסטנדרטים של Cleveland Clinic (סטנדרטיזציה של מיון ל-2 אלמנטים), Hospital for Special Surgery (טקסונומיה מקיפה ומדריכי שיקום תלויים-צד), ו-Mayo Clinic (עצי החלטות מונעי-סימפטום).

# 05. /תוכנית_פעולה

*המלצות מתועדפות ומשימות מוכנות לפיתוח.*

- **פעולה:** עדיפות גבוהה - CTA קבוע ו-Quick Exit | **אחראי:** צוות פיתוח | **סטטוס:** ממתין
כפתור "קביעת תור" חייב להיות גלוי בכל שלב בניווט. הטמעת מנגנון יציאה מהירה לחירום.
- **פעולה:** עדיפות גבוהה - ארגון מחדש של אזור ה-Hero | **אחראי:** ארכיטקט UX | **סטטוס:** ממתין
הטמעת שורת חיפוש, סלוגן ממוקד מטופל ("בוא.י נחזיר תנועה חלקה לכתף שלך"), ו-CTA מיידי.
- **פעולה:** עדיפות גבוהה - פיתוח ניווט אינטראקטיבי | **אחראי:** צוות פיתוח | **סטטוס:** ממתין
יישום זרימת ניווט בת 3 שלבים (אבחון, טרום-ניתוח, לאחר-ניתוח).
- **פעולה:** עדיפות גבוהה - ביזור תוכן לעמודי נחיתה | **אחראי:** צוות תוכן | **סטטוס:** ממתין
פירוק הדף הארוך לעמודי פתולוגיות נפרדים לשיפור SEO.
- **פעולה:** עדיפות גבוהה - בניית אמון | **אחראי:** צוות עיצוב | **סטטוס:** ממתין
העברת מידע על הצוות מתחת לפתרונות הקליניים ושילוב צילומי צוות מקצועיים.
- **פעולה:** עדיפות בינונית - איגוד מידע קריטי מתקפל | **אחראי:** צוות פיתוח | **סטטוס:** ממתין
יצירת טאבים/אקורדיונים למידע: צ'קליסט טרום-ניתוח וציר זמן שיקום.
- **פעולה:** עדיפות בינונית - הנגשת ז'רגון רפואי | **אחראי:** צוות תוכן | **סטטוס:** ממתין
יישום מיפוי טרמינולוגיה באמצעות Tooltips.

# 06. /מפת_דרכים_ליישום

- **שלב א': Quick Wins (שבועיים):** שינוי סדר התוכן, הוספת כפתורי CTA ושדרוג טקסטים לטון אמפתי.
- **שלב ב': בניית תשתיות (1-2 חודשים):** הקמת עמודי נחיתה לפתולוגיות וטיפולים.
- **שלב ג': חוויית משתמש מתקדמת (3+ חודשים):** הטמעת הניווט האינטראקטיבי ושילוב סרטוני הסבר של רופאים.

# 07. /נספחים_ומיפוי_קליני

### מיפוי טרמינולוגיה: גישור הפער הסמנטי

| אבחנה קלינית / פתולוגיה | תיאור סימפטום ידידותי למטופל | רציונל קליני ותיאור מגבלה |

| --- | --- | --- |

| קפסוליטיס דביקה (כתף קפואה) | "הכתף שלי נוקשה, הדוקה ותקועה." | קושי עמוק בפעילויות יומיומיות בסיסיות עקב כיווץ קפסולרי. |

| קרע בשרוול המסובב / דלקת גידים | "כאב עמום וחולשה כשאני מרים/ה את היד." | כאב מחמיר משמעותית בהרמת יד הצידה, כאב לילי עז. |

| נגע SLAP / קרע לברום | "הכתף שלי 'נתפסת', 'קופצת' או מרגישה כאילו היא עומדת להחליק החוצה." | תחושת 'קליק' ברורה ותחושת חוסר יציבות, במיוחד בזריקה. |

| אוסטאוארתריטיס גלנוהומרלי | "יש לי כאב חורק ומתמיד שהחמיר במשך חודשים או שנים." | אובדן תנועה הדרגתי מתקדם מלווה בתחושת חריקה במפרק. |

| הפרדת מפרק AC | "יש לי בליטה נראית לעין בחלק העליון של הכתף לאחר נפילה." | כאב ממוקד מאוד לחלק העליון של הכתף לאחר טראומה. |

| קרע גיד הביספס המקורב | "יש לי כאב בקדמת הזרוע, או בליטה נראית לעין פתאומית." | כאב קדמי בכתף בעת אחיזה או כפיפת שריר היד נגד התנגדות. |

| רדיקולופתיה צווארית | "יש לי כאב חד ויורה, נימול או עקצוץ היורד מהזרוע לכף היד." | כאב שמקורו בעמוד השדרה הצווארי ומקרין מעבר לכתף. |

### נספח א: זרימת הניווט האינטראקטיבי
**שלב 1: זיהוי כוונת המשתמש**

| # | תווית הכפתור | יעד |

|---|---|---|

| 1 | אני סובל/ת מכאב, אי-נוחות או פציעה בכתף. | זרימת אבחון (שלב 2א) |

| 2 | אני מתוכנן/ת לניתוח כתף בקרוב. | זרימת טרום-ניתוח (שלב 2ב) |

| 3 | אני מחלים/ה מניתוח כתף שנעשה לאחרונה. | זרימת לאחר-ניתוח (שלב 2ג) |

**שלב 2א: זרימת אבחון**

| # | תיאור הבעיה | סיווג קליני |

|---|---|---|

| 1 | זה קרה בפתאומיות (נפילה, מכה, או פציעת ספורט). | פגיעת טראומה (שבר, פריקה חריפה) |

| 2 | הכתף שלי מרגישה רופפת, מחליקה ממקומה, או נתפסת. | חוסר יציבות / קרע לברום |

| 3 | הכתף שלי נוקשה ובקושי ניתן להזיז אותה. | כתף קפואה / אוסטאוארתריטיס |

| 4 | יש לי כאב עמום שהחמיר עם הזמן, או כאב שמעיר בלילה. | פתולוגיית רקמה רכה (קרע בשרוול המסובב) |

**שלב 2ב: זרימת טרום-ניתוח**

| # | נושא | הנחיה רפואית/לוגיסטית |

|---|---|---|

| 1 | מה עלי לעשות יום לפני וביום הניתוח? | כללי צום, זמני הגעה, הנחיות לבוש ותכשיטים. |

| 2 | אישורים רפואיים ובדיקות טרום-ניתוחיות. | הפניה לבדיקות דם, א.ק.ג. וטפסי אישור רופא מטפל. |

| 3 | אילו תרופות עלי להפסיק ליטול? | הפסקת NSAIDs, מדללי דם ותוספים 7-14 ימים לפני הניתוח. |

| 4 | צפייה בסרטוני הדרכה להכנת הבית. | הפניה לווידאו הדרכה לקראת ניתוח החלפת כתף/ארתרוסקופיה. |

**שלב 2ג: זרימת לאחר-ניתוח**

| # | ציר זמן התאוששות | הנחיות שיקום ופרוטוקול |

|---|---|---|

| 1 | שבועות 1 עד 4 (הגנה וריפוי ראשוני) | טיפול בפצע, ניהול כאב, שמירה על פרוטוקול מתלה מחמיר, ותנועה פסיבית בלבד. |

| 2 | שבועות 4 עד 8 (תנועה מוקדמת) | תרגילי תנועה אקטיבית-בסיוע, הנחיות לגמילה מהמתלה וחזרה לפעילויות קלות. |

| 3 | שבועות 8 עד 12 (שלב החיזוק) | תרגילי חיזוק עם רצועות התנגדות, בניית כוח שרירים ושיפור השליטה בשכמה. |

| 4 | חודשים 3 עד 6 (חיזוק מתקדם) | פרוטוקולים לחזרה להרמת משקלים, ספורט ופעילות פיזית תובענית. |

| 5 | חשש דחוף לגבי ההתאוששות שלי. | מידע ליצירת קשר מיידי עם הצוות המנתח (חום, נפיחות, כאב חמור). |

**שלב 3א: מיון ספציפי ואבחון קליני**
*(נחשף לאחר בחירת אחת האפשרויות בשלב 2א)*

*3א.1: לאחר בחירת 'זה קרה בפתאומיות'*

| # | תיאור הסימפטום | אבחון קליני (Backend Mapping) | פעולה מומלצת |

|---|---|---|---|

| 1 | יש לי בליטה נראית לעין בראש הכתף. | חשד: הפרדת מפרק AC / שבר בעצם הבריח. | הפניה לטיפול אורתופדי דחוף וזימון תור לטראומה. |

| 2 | כאב חמור ואיני יכול/ה להרים את היד כלל. | קרע מאסיבי חד בשרוול המסובב / פריקה. | הפניה להערכה חריפה והנחיות לדימות. |

| 3 | יש לי בליטה בשריר הזרוע העליונה וכאב מקדימה. | קרע בגיד הביספס המקורב. | הפניה למידע על קרע בביספס וזימון תור למומחה. |

*3א.2: לאחר בחירת 'הכתף שלי מרגישה רופפת'*

| # | תיאור הסימפטום | אבחון קליני (Backend Mapping) | פעולה מומלצת |

|---|---|---|---|

| 1 | הכתף שלי יצאה לגמרי מהמקום. | פריקה גלנוהומרלית. | הפניה למרפאת חוסר יציבות / טיפול לאחר פריקה. |

| 2 | אני מרגיש/ה 'קליקים' או תפיסה עמוקה בפנים כשאני מזיז/ה. | קרע לברום / נגע SLAP. | הפניה לייעוץ רפואת ספורט וארתרוסקופיה. |

*3א.3: לאחר בחירת 'הכתף שלי נוקשה ובקושי ניתן להזיז אותה'*

| # | תיאור הסימפטום | אבחון קליני (Backend Mapping) | פעולה מומלצת |

|---|---|---|---|

| 1 | היא מרגישה קפואה ונעולה לחלוטין, במיוחד בהתלבשות. | קפסוליטיס דביקה (כתף קפואה). | הפניה לטיפול לא-ניתוחי ופיזיותרפיה. |

| 2 | היא מרגישה נוקשה, אבל גם חורקת כשאני מזיז/ה אותה. | אוסטאוארתריטיס (שחיקת סחוס). | הפניה למרכז החלפות מפרקים וארתריטיס. |

*3א.4: לאחר בחירת 'יש לי כאב עמום שהחמיר עם הזמן'*

| # | תיאור הסימפטום | אבחון קליני (Backend Mapping) | פעולה מומלצת |

|---|---|---|---|

| 1 | הוא מעיר אותי בלילה, במיוחד כשאני ישן/ה על הצד. | דלקת / קרע בגיד של השרוול המסובב. | הפניה למשאבי השרוול המסובב וזימון תור לאולטרסאונד/MRI. |

| 2 | כואב לי כשאני מרים/ה מעל הראש או מרים/ה חפצים. | תסמונת צביטה (Impingement) / בורסיטיס. | הפניה לטיפול שמרני, הזרקות ופיזיותרפיה. |

| 3 | יש לי כאב חד, נימול או עקצוץ שיורד מהזרוע לכף היד. | רדיקולופתיה צווארית (כאב מופנה מהצוואר). | יידוע: הכאב עשוי לנבוע מעמוד השדרה. הפניה להערכת עמוד שדרה / עצב. |

### נספח ב: תרשים זרימת עמוד הנחיתה (Concept Flow)
1. **הדר (Header):** הצגת הפן האנושי והמקצועי – תמונת צוות רופאי הכתף של הדסה לצד מסר של ניסיון ומצוינות קלינית. עם CTA לזימון תור. 
2. **רכיב הניווט (The Flow):** כלי אינטראקטיבי "אבחן את עצמך" המציע 3 כרטיסיות סימפטומים חכמות המובילות את המשתמש ישירות לפתולוגיות הרלוונטיות ולדרכי הטיפול.
3. **דגשים טכנולוגיים (Highlights):** אזור המוקדש לטיפולים ייחודיים וטכנולוגיות מתקדמות (כגון החלפת כתף הפוכה) המוצגים בכרטיסיות מעוצבות.
4. **מרכז מידע (Utility Hub):** אזור מידע מתקפל (אקורדיונים) הכולל הדרכות, שלבי שיקום והנחיות לאחר ניתוח במבנה קריא ונגיש.
5. **שאלות ותשובות (FAQ):** סגירת מעגל המידע באמצעות מענה על שאלות נפוצות בעיצוב נקי ומודרני.
6. **תפריט העמודים האחרים:** פירוט וקישור לעמודי המשנה של היחידה: מי אנחנו, פתולוגיות, שיקום, ניתוחים וטיפולים.

### נספח ג: תרשים זרימת עמוד הפתולוגיות

| פתולוגיה (כותרת העמוד) | כרטיסיית הסבר על הפתולוגיה | כרטיסיית טיפול שמרני | כרטיסיית טיפול ניתוחי |

|---|---|---|---|

| כתף קפואה (Adhesive Capsulitis) | "הכתף שלי נוקשה, הדוקה ותקועה. חוסר תנועה עמוק בפעילויות יומיומיות עקב כיווץ קפסולרי." | פיזיותרפיה אינטנסיבית והזרקות למפרק הגלנוהומרלי להפחתת דלקת ושיפור טווח התנועה. | שחרור ארתרוסקופי של הקפסולה (Capsular Release) במקרים של עמידות לטיפול שמרני. |

| קרע בשרוול המסובב (Rotator Cuff Tear) | "כאב עמום וחולשה כשאני מרים/ה את היד, לעתים קרובות מלווה בכאב לילי עז." | טיפול נוגד דלקת, הזרקות תת-אקרומיאליות וחיזוק שרירים מייצבים בפיזיותרפיה. | תיקון ארתרוסקופי של הגידים הקרועים (Rotator Cuff Repair) או החלפת כתף הפוכה במקרים מאסיביים. |

| חוסר יציבות / פריקות (Labral/SLAP Tear) | "הכתף 'נתפסת', 'קופצת' או מרגישה כאילו היא עומדת להחליק החוצה. תחושת חוסר יציבות בעת הרמת חפצים או זריקה." | חיזוק דינמי של השרוול המסובב ושיפור השליטה בשכמה למניעת פריקות חוזרות. | תיקון ארתרוסקופי של הלברום (Bankart Repair) או ניתוח לטרז'ה (Latarjet) למקרים עם חסר עצם. |

| שחיקת סחוס (Osteoarthritis) | "כאב חורק ומתמיד שהחמיר במשך חודשים או שנים. אובדן תנועה הדרגתי המלווה בתחושת חריקה בתוך המפרק." | ניהול כאב באמצעות תרופות, הזרקות ושימור טווחי תנועה ללא עומס משמעותי. | ניתוחי החלפת מפרק הכתף (אנטומית או הפוכה - Reverse TSA) להשבת תפקוד מלא. |

| תסמונת צביטה (Impingement) | "כאב המופיע כאשר מרימים את היד מעל הראש או מבצעים פעולות חוזרות. נגרם מדלקת או צביטה בגידים מתחת לעצם השיא." | מנוחה מפעילות מעל הראש, הזרקות סטרואידים/PRP ופיזיותרפיה לתיקון מכניקת הכתף. | דיקומפרסיה ארתרוסקופית (Acromioplasty) להרחבת המרווח התת-אקרומיאלי. |

### נספח ד: צ'קליסט מלא להכנה לניתוח

| קטגוריה קלינית/לוגיסטית | הנחיות למטופל (UI Content) | יעד קליני/UX |

|---|---|---|

| ניהול תרופות | הפסקת מדללי דם (כמו קומדין) ותרופות נוגדות דלקת (NSAIDs) 7 עד 14 ימים לפני הניתוח. | מניעת דימום יתר במהלך הניתוח ואינטראקציות שליליות עם ההרדמה. |

| אישורים ובדיקות רפואיות | הפניה לבדיקות דם עדכניות, א.ק.ג. וטפסי אישור רופא מטפל/קרדיולוג (ב-30 הימים שקדמו לניתוח). | ודא שהמטופל כשיר רפואית לעמוד בעומס הפיזיולוגי של הניתוח. |

| הנחיות יום לפני | צום (ללא אוכל מוצק לאחר חצות), שתיית נוזלים צלולים בלבד, והוראות רחצה ייחודיות (קרצוף אנטי-בקטריאלי). | מניעת שאיפה ריאתית במהלך ההרדמה והפחתת זיהומי אתר ניתוח. |

| הנחיות יום הניתוח | הסרה מוחלטת של תכשיטים ופירסינג למניעת חוסר זרימת דם ונפיחות, לבוש רפוי, וזמני הגעה מדויקים. | הבטחת בטיחות פיזית ומעבר קל להלבשה/התפשטות לאחר הניתוח. |

### נספח ה: ציר זמן שיקום כרונולוגי

| ציר זמן התאוששות | ייעוד השלב | תוכן דיגיטלי ופרוטוקול שיקום |

|---|---|---|

| שבועות 1 עד 4 | שלב הריפוי וההגנה הראשוני | התמקדות בטיפול בפצע ניתוחי, ניהול כאב, הקפדה על פרוטוקול המתלה, ותרגילי תנועה פסיבית בלבד. מידע על זיהוי סימני זיהום. |

| שבועות 4 עד 8 | שלב התנועה המוקדמת והגמילה מהמתלה | סרטוני הדרכה לתרגילי תנועה אקטיבית-בסיוע, הנחיות לגמילה בטוחה מהמתלה, וחזרה הדרגתית לפעילויות יומיומיות קלות (כגון נהיגה). |

| שבועות 8 עד 12 | שלב החיזוק האקטיבי | הנחיות לתרגילי חיזוק עם רצועות התנגדות, בניית כוח לשרירים המסובבים ושיפור השליטה בשכמה וייצובה. |

| חודשים 3 עד 6 | חיזוק מתקדם וחזרה לספורט/עבודה | פרוטוקולים לחזרה להרמת משקלים כבדים, עבודה פיזית תובענית ופעילות ספורטיבית עילית. מידע על תחזוקה ארוכת טווח של המפרק. |

### נספח ו: הנחיות לבונה האתר (Technical Specs)
**ו.1 מפרט טכני ו-UI (מערכת חוקי עיצוב)**

| רכיב | ערך/מפרט | דגשי יישום (UX Rationale) |

|---|---|---|

| טיפוגרפיה | 16px-18px (Body) | שימוש בגופן Assistant או Heebo לקריאות אופטימלית לקהל מבוגר. |

| כפתורי CTA | 48px-56px גובה | צבע כחול מותג ניגודי; רדיוס פינות 8px-12px למראה מודרני. |

| מערכת ריוח | 8px Grid System | כל המרווחים (Margin/Padding) יהיו בכפולות של 8px לעקביות. |

**ו.2 הנחיות פונקציונליות וארכיטקטורה**

| פונקציונליות | דרישת מערכת | לוגיקה קלינית/UX |

|---|---|---|

| ניווט אינטראקטיבי | מנגנון Progressive Disclosure | חשיפת שאלה אחת בכל שלב למניעת עומס קוגניטיבי (Hick's Law). |

| מנגנון Quick Exit | התראת חירום בולטת | זיהוי סימפטומים חריפים והפניה מיידית למיון (Safety Net). |

| מבנה תכנים | Accordions & Tabs | צמצום אורך הדף (Scrolling) וארגון מידע לפי שלבי שיקום. |

**ו.3 אסטרטגיית תוכן ו-SEO**

| תחום | הנחיית ביצוע | מטרה |

|---|---|---|

| ביזור פתולוגיות | עמוד נחיתה נפרד לכל מחלה | שיפור דירוג בגוגל לשאילתות ספציפיות כמו "קרע בכתף". |

| טון דיבור | מעבר משפה רפואית לשפת סימפטום | גישור הפער הסמנטי והפחתת חרדת מטופל. |

| מיקרו-קופי | שימוש ב-Action Oriented labels | הנעה לפעולה אמפתית (למשל: "בוא נתחיל בהחלמה"). |
:::
