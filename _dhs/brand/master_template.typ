// Talkalisker Master Report Template v1.0.0
// Adaptive Branding (Dark/Light)

#let talkalisker-report(
  title: "Deliverable",
  client: "Client Name",
  date: none,
  theme: "dark", // "dark" or "light"
  body
) = {
  // Color Tokens
  let bg-color = if theme == "dark" { rgb("#111111") } else { rgb("#FAF8F5") }
  let text-primary = if theme == "dark" { white } else { rgb("#2C2A28") }
  let text-secondary = if theme == "dark" { rgb("#A1A1A1") } else { rgb("#6F6B66") }
  let accent = rgb("#B85A44") // Terracotta
  let prefix-color = rgb("#FF3B30") // Vibrant Red

  // Configure Page
  set page(
    fill: bg-color,
    margin: (x: 2.5cm, y: 3cm),
    header: [
      #set text(font: ("Outfit", "Arial", "sans"), size: 9pt, fill: text-secondary)
      #grid(
        columns: (1fr, auto),
        [TalKalisker / #title],
        [#client -- #date]
      )
      #v(0.2cm)
      #line(length: 100%, stroke: 0.5pt + text-secondary.transparentize(80%))
    ],
    footer: [
      #set text(font: ("Outfit", "Arial", "sans"), size: 9pt, fill: text-secondary)
      #line(length: 100%, stroke: 0.5pt + text-secondary.transparentize(80%))
      #v(0.2cm)
      #grid(
        columns: (1fr, auto),
        [© 2026 Talkalisker],
        context counter(page).display()
      )
    ]
  )

  // Configure Text
  set text(font: ("Outfit", "Arial", "sans"), fill: text-primary, size: 11pt)
  show heading: set text(fill: text-primary)
  
  // Custom Styles
  show heading.where(level: 1): it => [
    #v(1cm)
    #text(font: ("JetBrains Mono", "Courier New", "mono"), size: 10pt, fill: prefix-color)[0#it.level. /#it.body]
    #v(0.2cm)
    #line(length: 100%, stroke: 1pt + accent)
    #v(0.5cm)
  ]

  // Title Page
  context {
    if counter(page).at(here()).first() == 1 {
      // Logic for title page
    }
  }

  // Improved Title Page Logic
  v(3cm)
  align(center)[
    #box(
      stroke: 1pt + accent.transparentize(70%),
      radius: 8pt,
      inset: 16pt,
      fill: if theme == "dark" { text-primary.transparentize(95%) } else { white }
    )[
      #image("logo.jpg", width: 3cm)
    ]
    #v(1cm)
    #text(font: ("Outfit", "Arial", "sans"), weight: 700, size: 12pt, fill: accent)[TalKalisker Developer]
  ]

  v(4cm)
  text(size: 38pt, weight: 800, fill: text-primary)[#title]
  v(0.5cm)
  text(font: ("JetBrains Mono", "Courier New", "mono"), size: 16pt, fill: accent)[\/\/ #client]
  
  v(1fr)
  text(size: 10pt, fill: text-secondary)[
    Prepared by Tal Kalisker \
    #date
  ]
  pagebreak()

  body
}

// UI Components
#let finding(title, severity: "Low", description) = {
  let sev-color = if severity == "High" { rgb("#FF3B30") } else if severity == "Medium" { orange } else { rgb("#6B8E23") }
  
  rect(
    width: 100%,
    fill: if severity == "High" { sev-color.transparentize(90%) } else { none },
    stroke: 0.5pt + if severity == "High" { sev-color } else { gray.transparentize(50%) },
    radius: 4pt,
    inset: 12pt
  )[
    #grid(
      columns: (1fr, auto),
      text(weight: 700, size: 12pt)[#title],
      text(font: ("JetBrains Mono", "Courier New", "mono"), fill: sev-color, weight: 700)[[#severity]]
    )
    #v(0.3cm)
    #set text(size: 10pt)
    #description
  ]
}
