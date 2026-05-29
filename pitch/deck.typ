// OakReader — EF Pitch Deck
// Design language inspired by Dia browser (diabrowser.com)
// Compile: typst compile deck.typ deck.pdf

#set page(
  width: 33.867cm,
  height: 19.05cm,
  margin: (x: 3.8cm, y: 2cm),
  fill: white,
  background: image("shader-bg.png", width: 100%, height: 100%, fit: "stretch"),
  footer: context {
    let num = counter(page).get().first()
    if num > 1 {
      align(right, text(font: "Exposure VAR Exposure", size: 11pt, fill: rgb("#AAAAAA"), str(num)))
    }
  },
)

#set text(
  font: ("SF Pro Display", "Helvetica Neue", "Inter", "system-ui", "sans-serif"),
  fill: rgb("#1A1A1A"),
  size: 18pt,
  weight: "regular",
)

#set heading(numbering: none)
#show heading: set text(font: "Exposure VAR Exposure")

#set par(spacing: 0.5em)

// ─── Design tokens ───

#let accent = rgb("#0358F7")
#let muted  = rgb("#808080")
#let subtle = rgb("#B0B0B0")
#let border = rgb("#E8E8E8")
#let fill-card = rgb("#F7F7F7")
#let bg = white

// ─── Reusable components ───

#let slide-title(body) = {
  text(font: "Exposure VAR Exposure", size: 44pt, weight: "bold", tracking: -0.02em, body)
  v(0.3cm)
}

#let subtitle(body) = {
  text(size: 18pt, fill: muted, weight: "regular", body)
}

#let accent-text(body) = {
  text(fill: accent, weight: "semibold", body)
}

#let tag(body) = {
  box(
    fill: accent.lighten(88%),
    radius: 6pt,
    inset: (x: 10pt, y: 5pt),
    text(size: 12pt, fill: accent, weight: "semibold", tracking: 0.06em, upper(body)),
  )
}

#let bullet(body) = {
  grid(
    columns: (0.5cm, 1fr),
    gutter: 0.3cm,
    align(center + horizon, circle(radius: 3pt, fill: accent)),
    body,
  )
}

#let stat-card(number, label) = {
  box(
    width: 100%,
    fill: fill-card,
    radius: 12pt,
    inset: (x: 20pt, y: 24pt),
    stroke: 0.5pt + border,
  )[
    #align(center)[
      #text(size: 36pt, weight: "bold", fill: accent, tracking: -0.02em, number)\
      #v(0.2cm)
      #text(size: 13pt, fill: muted, weight: "medium", label)
    ]
  ]
}

#let flow-step(label, desc) = {
  box(
    width: 100%,
    fill: fill-card,
    radius: 12pt,
    inset: (x: 16pt, y: 20pt),
    stroke: 0.5pt + border,
  )[
    #align(center)[
      #text(size: 12pt, fill: accent, weight: "semibold", tracking: 0.06em, upper(label))
      #v(0.3cm)
      #text(size: 16pt, fill: rgb("#555555"), desc)
    ]
  ]
}

#let flow-arrow = align(center + horizon, text(size: 22pt, fill: subtle, sym.arrow.r))

// Comparison table helper
#let cmp-header(col1, col2) = {
  grid(
    columns: (1fr, 0.7fr, 0.7fr),
    gutter: 0.4cm,
    align: (left, center, center),
    [],
    text(size: 13pt, fill: muted, weight: "semibold", tracking: 0.04em, upper(col1)),
    text(size: 13pt, fill: accent, weight: "semibold", tracking: 0.04em, upper(col2)),
  )
}

#let cmp-row(feature, notebooklm, oakreader) = {
  grid(
    columns: (1fr, 0.7fr, 0.7fr),
    gutter: 0.4cm,
    align: (left, center, center),
    text(size: 16pt, weight: "medium", feature),
    text(size: 16pt, fill: muted, notebooklm),
    text(size: 16pt, fill: accent, weight: "semibold", oakreader),
  )
}

// ═══════════════════════════════════════
// SLIDE 1 — Cover
// ═══════════════════════════════════════

#align(center + horizon)[
  #tag[Entrepreneurs First]
  #v(1.6cm)
  #text(font: "Exposure VAR Exposure", size: 72pt, weight: "bold", tracking: -0.03em)[OakReader]
  #v(0.8cm)
  #text(size: 26pt, fill: rgb("#555555"), weight: "light")[
    The #accent-text[NotebookLM] that should exist.
  ]
  #v(0.6cm)
  #text(size: 18pt, fill: muted)[
    Your AI library for thinking, research, and writing.
  ]
]

// ═══════════════════════════════════════
// SLIDE 2 — Problem
// ═══════════════════════════════════════

#pagebreak()

#slide-title[NotebookLM proved the category.]

#text(size: 22pt, fill: rgb("#555555"), weight: "light")[
  Google showed the world that #accent-text[AI + your documents] is magic. \
  But they also showed everything that's wrong with it.
]

#v(0.8cm)

#bullet[Locked to Gemini — you can't choose your model.]
#v(0.25cm)
#bullet[Cloud-only — your data lives on Google's servers.]
#v(0.25cm)
#bullet[Limited formats — no EPUB, no browser capture, no real workflow.]
#v(0.25cm)
#bullet[No API, no extensibility — a walled garden with no exits.]

#v(0.8cm)

#line(length: 100%, stroke: 0.5pt + border)

#v(0.4cm)

#subtitle[NotebookLM is a demo of the future. OakReader is the product.]

// ═══════════════════════════════════════
// SLIDE 3 — Solution
// ═══════════════════════════════════════

#pagebreak()

#slide-title[OakReader: NotebookLM, done right.]

#text(size: 22pt, fill: rgb("#555555"), weight: "light")[
  A #accent-text[Thinking Partner] that turns your documents \
  into structured knowledge #accent-text[any AI] can reason over.
]

#v(1cm)

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 1.2cm,
  box(
    width: 100%,
    fill: fill-card,
    radius: 12pt,
    inset: (x: 24pt, y: 28pt),
    stroke: 0.5pt + border,
  )[
    #align(center)[
      #text(size: 13pt, fill: accent, weight: "semibold", tracking: 0.06em)[LOCAL-FIRST]
      #v(0.4cm)
      #text(size: 16pt, fill: muted)[Your data never leaves \
      your device. Period.]
    ]
  ],
  box(
    width: 100%,
    fill: fill-card,
    radius: 12pt,
    inset: (x: 24pt, y: 28pt),
    stroke: 0.5pt + border,
  )[
    #align(center)[
      #text(size: 13pt, fill: accent, weight: "semibold", tracking: 0.06em)[MODEL-AGNOSTIC]
      #v(0.4cm)
      #text(size: 16pt, fill: muted)[20+ providers. Use the \
      best model for each task.]
    ]
  ],
  box(
    width: 100%,
    fill: fill-card,
    radius: 12pt,
    inset: (x: 24pt, y: 28pt),
    stroke: 0.5pt + border,
  )[
    #align(center)[
      #text(size: 13pt, fill: accent, weight: "semibold", tracking: 0.06em)[EXTENSIBLE]
      #v(0.4cm)
      #text(size: 16pt, fill: muted)[Skills, plugins, browser \
      extension. Open by design.]
    ]
  ],
)

// ═══════════════════════════════════════
// SLIDE 4 — Product Screenshot
// ═══════════════════════════════════════

#pagebreak()

#align(center)[
  #text(font: "Exposure VAR Exposure", size: 44pt, weight: "bold", tracking: -0.02em)[Your AI Library]
  #v(0.2cm)
  #text(size: 18pt, fill: muted)[Collect, organize, and reason over everything you read.]
]

#v(0.6cm)

#align(center)[
  #block(
    clip: true,
    radius: 10pt,
    image("oakreader-screenshot.png", width: 85%),
  )
]

// ═══════════════════════════════════════
// SLIDE 5 — AI Chat
// ═══════════════════════════════════════

#pagebreak()

#align(center)[
  #text(font: "Exposure VAR Exposure", size: 44pt, weight: "bold", tracking: -0.02em)[Ask, Don't Search]
  #v(0.2cm)
  #text(size: 18pt, fill: muted)[AI chat across your entire library — powered by any model you choose.]
]

#v(0.6cm)

#align(center)[
  #block(
    clip: true,
    radius: 10pt,
    image("oakreader-chat.png", width: 85%),
  )
]

// ═══════════════════════════════════════
// SLIDE 6 — Multi-format
// ═══════════════════════════════════════

#pagebreak()

#align(center)[
  #text(font: "Exposure VAR Exposure", size: 44pt, weight: "bold", tracking: -0.02em)[Every Format, One Library]
  #v(0.2cm)
  #text(size: 18pt, fill: muted)[PDFs, web clips, videos, and more — all organized with collections and tags.]
]

#v(0.6cm)

#align(center)[
  #block(
    clip: true,
    radius: 10pt,
    image("oakreader-videos.png", width: 85%),
  )
]

// ═══════════════════════════════════════
// SLIDE 7 — Head-to-head
// ═══════════════════════════════════════

#pagebreak()

#slide-title[Head to Head]

#v(0.2cm)

#cmp-header[NotebookLM][OakReader]

#v(0.2cm)
#line(length: 100%, stroke: 0.5pt + border)
#v(0.2cm)

#cmp-row[AI Models][Gemini only][20+ providers]
#v(0.15cm)
#line(length: 100%, stroke: 0.3pt + border)
#v(0.15cm)
#cmp-row[Data privacy][Google Cloud][Local-first]
#v(0.15cm)
#line(length: 100%, stroke: 0.3pt + border)
#v(0.15cm)
#cmp-row[Formats][PDF, Docs, Web][PDF, EPUB, Web, Video]
#v(0.15cm)
#line(length: 100%, stroke: 0.3pt + border)
#v(0.15cm)
#cmp-row[Voice][Audio Overview][Live voice agent]
#v(0.15cm)
#line(length: 100%, stroke: 0.3pt + border)
#v(0.15cm)
#cmp-row[Extensibility][None][Skills + browser ext.]
#v(0.15cm)
#line(length: 100%, stroke: 0.3pt + border)
#v(0.15cm)
#cmp-row[Platform][Web only][Native macOS/iOS]

// ═══════════════════════════════════════
// SLIDE 5 — How It Works
// ═══════════════════════════════════════

#pagebreak()

#slide-title[How It Works]

#v(1cm)

#grid(
  columns: (1fr, auto, 1fr, auto, 1fr, auto, 1fr),
  align: center + horizon,
  gutter: 0.4cm,
  flow-step[Ingest][PDF / Web \ EPUB / Video],
  flow-arrow,
  flow-step[Structure][Context \ Engine],
  flow-arrow,
  flow-step[Reason][20+ LLMs \ Your choice],
  flow-arrow,
  flow-step[Act][Insights \ & Actions],
)

#v(1.4cm)

#align(center)[
  #line(length: 40%, stroke: 0.5pt + border)
  #v(0.5cm)
  #text(size: 17pt, fill: muted)[
    One unified context layer between your knowledge and any AI model.
  ]
]

// ═══════════════════════════════════════
// SLIDE 6 — Why Now
// ═══════════════════════════════════════

#pagebreak()

#slide-title[Why Now]

#text(size: 22pt, fill: rgb("#555555"), weight: "light")[
  NotebookLM has #accent-text[100M+ users]. Google proved the demand.
]

#v(0.5cm)

#text(size: 18pt, fill: muted)[But users are already hitting the walls:]

#v(0.5cm)

#bullet[Researchers need model choice — Gemini isn't always best.]
#v(0.25cm)
#bullet[Enterprises can't send sensitive docs to Google Cloud.]
#v(0.25cm)
#bullet[Power users need extensibility — not a locked-down web app.]

#v(0.8cm)

#line(length: 100%, stroke: 0.5pt + border)

#v(0.4cm)

#subtitle[The market is educated and frustrated. They know what they want — they just can't get it from Google.]

// ═══════════════════════════════════════
// SLIDE 7 — Market
// ═══════════════════════════════════════

#pagebreak()

#slide-title[Market]

#v(0.6cm)

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 1.4cm,
  stat-card[\$120B][TAM — Knowledge Management],
  stat-card[\$18B][SAM — AI-Augmented Reading],
  stat-card[\$800M][SOM — Power Readers & Researchers],
)

#v(1.2cm)

#align(center)[
  #text(size: 17pt, fill: muted)[
    NotebookLM proved the category. Notion (#accent-text[\$10B]) proved knowledge workers pay. \
    OakReader sits at the intersection — #accent-text[AI reasoning + your documents + model freedom].
  ]
]

// ═══════════════════════════════════════
// SLIDE 8 — Traction
// ═══════════════════════════════════════

#pagebreak()

#slide-title[Traction]

#v(0.5cm)

#grid(
  columns: (1fr, 1fr, 1fr, 1fr),
  gutter: 1cm,
  stat-card[298][Swift Files],
  stat-card[20+][AI Providers],
  stat-card[~10d][Build Time],
  stat-card[1][Builder],
)

#v(1cm)

#bullet[Full native macOS/iOS app — production-quality, not a prototype.]
#v(0.3cm)
#bullet[Architecture designed for cloud sync from day one.]
#v(0.3cm)
#bullet[Browser extension with WebSocket JSON-RPC bridge — shipped.]

#v(0.8cm)

#line(length: 100%, stroke: 0.5pt + border)

#v(0.4cm)

#subtitle[Speed is the signal. This is week two.]

// ═══════════════════════════════════════
// SLIDE 9 — Why Me
// ═══════════════════════════════════════

#pagebreak()

#slide-title[Why Me]

#v(0.2cm)

#bullet[#accent-text[Solo full-stack builder] — Swift, AI/ML, Web, systems architecture.]
#v(0.3cm)
#bullet[#accent-text[Extreme execution speed] — 298 files in ~10 days, shipping daily.]
#v(0.3cm)
#bullet[#accent-text[Deep domain expertise] — studied every competitor: Zotero, NotebookLM, Readwise, Notion, Pocket, Omnivore.]
#v(0.3cm)
#bullet[#accent-text[User zero] — I built this because I needed it. Every design decision comes from real pain.]
#v(0.3cm)
#bullet[#accent-text[Technical moat] — native performance, local-first architecture, model-agnostic design that ages well.]

#v(0.8cm)

#line(length: 100%, stroke: 0.5pt + border)

#v(0.4cm)

#subtitle[I don't just understand the problem. I've already built the solution.]

// ═══════════════════════════════════════
// SLIDE 10 — Ask
// ═══════════════════════════════════════

#pagebreak()

#align(center + horizon)[
  #tag[The Ask]
  #v(1.2cm)
  #text(font: "Exposure VAR Exposure", size: 44pt, weight: "bold", tracking: -0.02em)[
    Applying to #text(fill: accent)[Entrepreneurs First].
  ]
  #v(1cm)
  #text(size: 20pt, fill: muted, weight: "light")[
    Looking for a cofounder to scale this vision. \
    The product exists. The market is proven. \
    Now it's time to build the company.
  ]
  #v(2cm)
  #text(size: 15pt, fill: subtle)[
    yuanjiwei · github.com/nicka · OakReader
  ]
]
