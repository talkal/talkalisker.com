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
| Clinical Diagnosis | Patient-Friendly Symptom | Clinical Rationale |
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

### Appendix D & E: Patient Checklists
**Pre-Operative Checklist:**
- Stop blood thinners (like Coumadin) and NSAIDs 7-14 days before surgery.
- Submit recent blood tests, EKG, and cardiologist approval (within 30 days).
- Fasting (no solid food after midnight), clear liquids only, and specific antibacterial scrubbing instructions.
- Complete removal of jewelry/piercings to prevent swelling, wear loose clothing.

**Post-Operative Timeline:**
- **Weeks 1-4:** Initial healing. Sling protocol, passive motion only, pain management, infection monitoring.
- **Weeks 4-8:** Early motion. Active-assisted exercises, weaning from sling, light daily activities (driving).
- **Weeks 8-12:** Active strengthening. Resistance bands, building rotator cuff strength, scapular control.
- **Months 3-6:** Advanced strengthening. Protocols for heavy lifting, demanding physical work, and elite sports.

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

### נספח ד' וה': צ'קליסטים למטופל
**צ'קליסט טרום-ניתוח:**
- הפסקת מדללי דם (כמו קומדין) ותרופות נוגדות דלקת (NSAIDs) 7-14 ימים לפני הניתוח.
- בדיקות דם עדכניות, א.ק.ג. וטפסי אישור רופא מטפל/קרדיולוג (ב-30 הימים שקדמו).
- צום (ללא אוכל מוצק לאחר חצות), שתיית נוזלים צלולים בלבד, והוראות רחצה ייחודיות.
- הסרה מוחלטת של תכשיטים ופירסינג ולבוש רפוי.

**ציר זמן שיקום כרונולוגי:**
- **שבועות 1-4:** שלב הריפוי וההגנה. טיפול בפצע, ניהול כאב, הקפדה על פרוטוקול מתלה, תנועה פסיבית בלבד.
- **שבועות 4-8:** תנועה מוקדמת. תנועה אקטיבית-בסיוע, גמילה מהמתלה וחזרה לפעילויות קלות.
- **שבועות 8-12:** חיזוק אקטיבי. רצועות התנגדות, בניית כוח שרירים ושליטה בשכמה.
- **חודשים 3-6:** חיזוק מתקדם. לחזרה לספורט, עבודה פיזית והרמת משקלים כבדים.
:::
