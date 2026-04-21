#import "brand/master_template.typ": talkalisker-report, finding

#show: talkalisker-report.with(
  title: "UX Audit Report",
  client: "Hadassah Shoulder Unit",
  date: "April 20, 2026",
  theme: "light"
)

= Executive Summary
We have completed a comprehensive review of the Hadassah Shoulder Unit website. The primary goal was to simplify the patient journey from symptom discovery to appointment booking.

= Navigation Strategy
The current navigation is overly clinical. We recommend a "Symptom-First" approach to reduce friction for elderly patients.

#finding(
  "Information Overload on Homepage",
  severity: "High",
  [The homepage contains 14 different CTAs, leading to decision paralysis. We recommend reducing this to 3 primary paths.]
)
