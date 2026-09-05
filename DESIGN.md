---
name: Ledger
description: A household account book kept monthly — kakeibo read through Western letterpress.
colors:
  paper-bg: "#f4f1e8"
  surface-inset: "#efeae0"
  indigo-ink: "#2e3a54"
  graphite-ink: "#5c574a"
  faint-ink: "#635d4c"
  vermilion: "#9e4630"
  vermilion-hover: "#883a26"
  vermilion-soft: "#b26a52"
  danger: "#99271b"
  divider: "#dcd6c4"
  divider-strong: "#c4bca6"
  cat-indigo: "#3f4d70"
  cat-pine: "#3f5c4a"
  cat-ochre: "#8a6d3c"
  cat-plum: "#6b4b63"
  cat-rose: "#8a5750"
  cat-warmgray: "#726a58"
  cat-walnut: "#6f4a37"
  cat-teal: "#3d6066"
  cat-olive: "#6b6a3c"
  cat-steel: "#4a5a72"
  cat-terracotta: "#9a5a44"
  cat-sea: "#3f6b63"
  cat-rust: "#8a5636"
  cat-bluegray: "#556884"
  cat-moss: "#5c6b47"
  cat-fern: "#4f6b4e"
typography:
  display:
    fontFamily: "Spectral, Georgia, \"Times New Roman\", serif"
    fontSize: "40px"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.006em"
  headline:
    fontFamily: "Spectral, Georgia, \"Times New Roman\", serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.006em"
  title:
    fontFamily: "Spectral, Georgia, \"Times New Roman\", serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "0"
  subtitle:
    fontFamily: "Spectral, Georgia, \"Times New Roman\", serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0"
  figure:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(44px, 11vw, 68px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
  body:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, \"Segoe UI\", sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
  money:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "inherit"
    fontWeight: 600
    lineHeight: "inherit"
    letterSpacing: "normal"
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
rounded:
  sm: "2px"
  md: "3px"
  lg: "4px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "34px"
components:
  button-primary:
    backgroundColor: "{colors.indigo-ink}"
    textColor: "{colors.paper-bg}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "#26314a"
    textColor: "{colors.paper-bg}"
  button-primary-active:
    backgroundColor: "#1f293f"
    textColor: "{colors.paper-bg}"
  button-secondary:
    backgroundColor: "#f4f1e8"
    textColor: "{colors.indigo-ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  input:
    backgroundColor: "color-mix(in srgb, #ffffff 34%, #f4f1e8)"
    textColor: "{colors.indigo-ink}"
    rounded: "{rounded.md}"
    padding: "9px 12px"
    height: "40px"
  input-focus:
    backgroundColor: "color-mix(in srgb, #ffffff 34%, #f4f1e8)"
    textColor: "{colors.indigo-ink}"
  segmented-control:
    backgroundColor: "#f4f1e8"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.md}"
    padding: "9px 14px"
  segmented-control-selected:
    backgroundColor: "color-mix(in srgb, #2e3a54 9%, transparent)"
    textColor: "{colors.indigo-ink}"
  dialog:
    backgroundColor: "{colors.paper-bg}"
    textColor: "{colors.indigo-ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
    width: "min(440px, 100%)"
  register-row:
    backgroundColor: "transparent"
    textColor: "{colors.indigo-ink}"
    rounded: "0"
    padding: "12px 4px 11px"
---

# Design System: Ledger

## Overview

**Creative North Star: "The Kakeibo Ledger Page"**

Ledger is a Japanese household account book (kakeibo) set in Western letterpress. Every screen is one page of that book: a warm recycled-paper ground, two inks — indigo for structure and text, vermilion reserved for money leaving — and every line of type sitting on a visible hairline rule. There are no cards floating on white, no elevation, no gradients, no decorative chart. Depth is not simulated; boundaries are drawn as 1px rules the way a ruled ledger draws them. The page is quiet on purpose: the one loud thing is the net figure, set large in Spectral and hung from a double rule.

Density is generous and typographic. Content columns are narrow (Overview caps near 780px single-column, 1160px for the two-column spread; list views cap at 720px). Whitespace between sections is wide (the 34px top step), whitespace within a ledger block is tight (7–12px between ruled lines). Money is always tabular so columns of figures align to the digit. The serif (Spectral) carries headings, section titles, the ledger tallies and the net figure; the grotesque (Hanken Grotesk) carries every piece of UI chrome — nav, buttons, inputs, meta lines.

The system explicitly refuses the fintech dashboard: no elevated cards on white, no hero donut or ring chart (a flat proportion ruler replaced it everywhere), no saturated "candy" category chips. Category identity is carried only by a 9–10px muted-ink swatch, never a fill behind text. Motion is almost absent: exactly one authored moment (a new register line ruling its hairline in), and totals deliberately never count up.

**Key Characteristics:**
- Warm recycled-paper ground (#f4f1e8) on every surface; no white anywhere
- Two inks: indigo #2e3a54 for everything structural, vermilion #9e4630 for outflow only (~15% of any page)
- Hairline 1px rules carry every boundary; zero shadows, zero elevation
- Radius never exceeds 4px
- Spectral serif for headings, tallies and the net figure; Hanken Grotesk for UI
- All money set `tabular-nums lining-nums`
- One reserved emphasis per Overview: the net figure on a 4px double rule
- One authored motion moment (register rule-in); tallies never tick

## Colors

A two-ink letterpress palette on warm paper: structural indigo, a single reserved vermilion, graphite for secondary text, and a 16-strong set of muted printer's inks used only as tiny category swatches.

### Primary
- **Indigo Ink** (`#2e3a54`): The structural ink. All primary text, headings, the net figure, primary-button fill, input text, active nav label. This is the "black" of the system — everything load-bearing is indigo, not neutral gray.

### Secondary
- **Vermilion** (`#9e4630`): The reserved second ink. Money out / negatives / key marks only: the "Money out" figure, the outflow line, links, the "Add bank" action, caret, focus ring, `::selection` tint, hover wash on icon actions. Never a category colour, never a fill behind body text. Budgeted at roughly 15% of any surface.
- **Vermilion Hover** (`#883a26`) / **Vermilion Soft** (`#b26a52`): Hover state for links/accent; the soft tint is for larger or decorative vermilion use.
- **Danger** (`#99271b`): Destructive confirmation text/affordances only; distinct from the everyday vermilion.

### Neutral
- **Recycled-Paper Ground** (`#f4f1e8`): Every surface — app shell, sidebar, main column, dialogs, primary-button text colour. There is no lighter background.
- **Surface Inset** (`#efeae0`): A single step deeper than paper, for inset panels only (the mortgage-calculator readout panel). Not used for page regions.
- **Graphite Ink** (`#5c574a`): Secondary text — meta lines, field labels, section sub-labels, inactive nav, captions. Holds ≥5:1 on paper.
- **Faint Ink** (`#635d4c`): Placeholder and disabled text; the SVG chevron in selects. Holds ≥4.5:1 on paper.
- **Divider** (`#dcd6c4`): The baseline hairline — under every ledger line, register row, category row, and the Overview spread's gutter rule.
- **Divider Strong** (`#c4bca6`): Heavier 1px strokes — input/button/segmented borders, the proportion ruler's backing, scrollbar thumb, table header underline.

### Category Inks
Sixteen mid-value (L ~40–55%), low-chroma printer's inks, keyed to categories in `src/constants.js` (`PALETTE` / `CATEGORY_COLORS`). Used **only** as a 9–10px rounded swatch or as a segment of the proportion ruler — never as a fill behind text, never as a chip background. Representative members: `cat-indigo #3f4d70`, `cat-pine #3f5c4a`, `cat-ochre #8a6d3c`, `cat-plum #6b4b63`, `cat-teal #3d6066`, `cat-steel #4a5a72`, `cat-terracotta #9a5a44`, `cat-fern #4f6b4e`. **Mortgage = `cat-walnut #6f4a37`**, chosen to sit clearly apart from the reserved vermilion so the largest fixed cost never reads as an alert.

### Named Rules
**The Reserved-Ink Rule.** Vermilion (`#9e4630`) means one thing: money leaving, a negative, or a key mark. It never fills a shape behind text and never identifies a category. If more than ~15% of a screen is vermilion, something non-outflow has borrowed the ink — take it back.

**The No-White Rule.** Paper (`#f4f1e8`) is the lightest value in the system. Never introduce `#fff` or a cooler off-white as a surface; inset panels go one step *darker* to `#efeae0`.

**The Swatch-Not-Fill Rule.** Category colour appears only as a ≤10px mark. A category never gets a coloured background, pill, or text colour.

## Typography

**Display Font:** Spectral (Georgia, "Times New Roman", serif) — weights 300/400/500/600 + italic 400, loaded from Google Fonts.
**Body Font:** Hanken Grotesk (system-ui, -apple-system, "Segoe UI", sans-serif) — weights 400/500/600/700, loaded from Google Fonts.

**Character:** A transitional serif with real contrast set against a clean humanist grotesque. The serif does the "book" work — it appears wherever the ledger is speaking as a record (headings, section titles, tallies, the net figure). The grotesque does the "instrument" work — every control, label and meta string. The two never blur: no serif buttons, no grotesque headings above 17px.

### Hierarchy
- **Display** (Spectral 500, 40px, 1.15, `-0.006em`): `h1`. Rare — top-level page identity.
- **Headline** (Spectral 500, 28px, 1.15): `h2`, the mobile page title (shown at 20px ≤860px).
- **Title** (Spectral 500, 20px, 0 tracking): `h3`; Overview/section headings ("Where it went", "Fixed costs this month") ship at 18px.
- **Subtitle** (Spectral 500, 17px): `h4`; dialog titles run 22px, auth-card title 27px.
- **Figure** (Spectral 500, `clamp(44px, 11vw, 68px)`, `-0.02em`, tabular): the single reserved emphasis — "What's left". Drops to `clamp(40px, 13vw, 56px)` ≤860px.
- **Body** (Hanken Grotesk 400, 16px, 1.55): default UI text; reading sentence caps at ~52ch.
- **Label** (Hanken Grotesk 600, 12px, `0.04em`): `h6` and small overline-style labels in graphite; field labels are 13px 400 graphite.
- **Money** (weight 600, `font-variant-numeric: tabular-nums lining-nums`, `.tnum` / `.fig`): every currency value and any figure that stacks in a column, in either family.

### Named Rules
**The Two-Voice Rule.** Spectral is the ledger's voice (records, tallies, the net figure). Hanken Grotesk is the operator's voice (controls, labels, meta). A string belongs to exactly one voice; don't set a button or a meta line in the serif.

**The Tabular-Money Rule.** Every amount carries `tabular-nums lining-nums`. Figures that share a column must align on the decimal.

## Layout

**Shell.** Fixed-width sidebar (268px expanded / 72px collapsed) with a 1px right divider, beside a fluid main column. Main column padding: 24px (≤1180px and ≤860px use 16px horizontal). The shell stacks to a column below 860px and the sidebar becomes a fixed slide-in drawer (`min(300px, 84vw)`, `translateX(-100%)` → `0` on `.is-mobile-open`, 0.2s ease) over a `#2a2620` 40% backdrop.

**Overview — the monthly spread.** Single column (`max-width: 780px`) below 1000px. At ≥1000px it becomes a two-column CSS grid, `max-width: 1160px`, columns `minmax(0,0.95fr) minmax(0,1.05fr)`, grid-areas `"sum where" / "fixed where"`. The right ("where it went") column carries a 1px left divider and `clamp(24px, 4vw, 60px)` inner padding — that rule *is* the gutter of the spread. Column gap `clamp(28px, 4.5vw, 72px)`; row gap 34px.

**List views** (Income / Expenses): flex column, `max-width: 720px`, 24px gap; breakdown blocks cap at 520px.

**Month header.** Desktop: single flex row, right-aligned, page title pushed left with `margin-right: auto`, then the month stepper, then the earner segmented control. ≤860px it becomes a grid `"title month" / "seg seg"` — stepper top-right, earner filter full-width below, its options `flex: 1 1 0`.

**Spacing rhythm.** Six-step scale: 4 / 8 / 12 / 16 / 24 / 34 (`--space-1,2,3,4,6,8` — there is deliberately no step 5 or 7). Wide gaps (34) separate major sections; tight gaps (7–12px vertical padding) sit between ruled lines inside a ledger block.

**Breakpoints observed:** 560px (meta separators collapse from pipes to dots), 720px (list "Add" button goes inline), 860px (mobile drawer + stacked header + smaller net figure), 861–1180px (reduced main padding), 1000px (Overview single-column → spread).

**Tuning targets:** iPhone 14 Pro Max (430), iPad Pro (834 / 1024); persistent sidebar above 1024.

## Elevation & Depth

**No shadows anywhere.** `--shadow-sm/md/lg` are all `none`, and `.elev-sm/.elev-md/.elev-lg` are explicitly forced to `box-shadow: none`. There is no z-axis in this system. Boundaries are drawn, not lifted: a 1px `--color-divider` hairline under every line, a 1px `--color-divider-strong` stroke around inputs and buttons, a 1px `--color-text` border on dialogs, and a single tonal step (`#efeae0`) for the one inset panel. Modals sit on a `#2a2620` ~46% wash with a hard 1px indigo border and no shadow.

### Named Rules
**The Drawn-Boundary Rule.** Every edge in the system is a 1px rule or a 1px border. If a surface needs to feel separate, give it a hairline or step it one tone darker — never a shadow, never a blur.

## Shapes

Near-square. Radius tokens are `2px` (`sm`), `3px` (`md`), `4px` (`lg`) and nothing is ever rounder than 4px. Buttons, inputs, selects, segmented controls, cards and dialogs use 3–4px; category swatches and tags use 2px. Register rows and ledger lines have square corners (radius 0) — they are ruled lines, not containers. Borders are the primary form device: 1px, in `--color-divider` for baselines and `--color-divider-strong` for interactive strokes. The one non-rectangular motif is the radio `.dot` (a 16px circle with a 4px inset ring when checked). Icons are a consistent stroke set: 24-viewBox, `stroke: currentColor`, `fill: none`, stroke-width 1.6–2, round caps — the select chevron is an inline SVG in the same language.

## Components

### Buttons
- **Shape:** 3px radius (`--radius-md`); min-height 40px; Hanken Grotesk 500, 14.5px; 8px×16px padding; icon+label gap 7px.
- **Primary** (`.btn-primary`): a stamped ink block — solid `#2e3a54` fill, same-colour border, paper text. Hover `#26314a`, active `#1f293f`. `.btn-block` adds full width. Used for "Add expense / Add income".
- **Secondary** (`.btn-secondary`): transparent fill, 1px `--color-divider-strong` border, indigo text. Hover/active are 6% / 11% indigo washes. Used for "Sign out", dialog cancel.
- **Ghost** (`.btn-ghost`): borderless, vermilion text, tight inline padding, vermilion wash on hover. (Defined; reserve for inline accent actions.)
- **Icon** (`.btn-icon`): 40×40 square, 3px radius. Month steppers and mobile-nav toggle are bespoke 34–38px squares in the same idiom (1px `--color-divider-strong`, transparent fill, graphite icon).
- **Focus:** global `:focus-visible` — 2px `--color-accent` outline, 2px offset (inset -2px on segmented options and rows).

### Chips / Tags
- **Style** (`.tag`): 12.5px, 3px×9px padding, 2px radius, 1px `--color-divider-strong` border, indigo text, transparent fill (`.tag-neutral`). `.tag-accent` / `.tag-outline` swap border and text to vermilion. Tags are outlined, never filled. Used for the bank list in the bank dialog.

### Cards / Containers
- **Corner style:** 3px radius (`.card`).
- **Background:** `--color-surface` `#efeae0` (the only place this tone appears).
- **Shadow strategy:** none — see Elevation & Depth. A 1px `--color-divider` border is the entire boundary.
- **Border:** 1px `--color-divider`.
- **Internal padding:** 16px (`--space-4`); flex column, 8px gap.
- **Usage:** inset readout panels only (mortgage calculator). App regions are not carded — they are ruled directly on the paper.

### Inputs / Fields
- **Style** (`.input`): full-width, min-height 40px, 9px×12px padding, 15px indigo text, 3px radius. Fill is a barely-there warm off-paper (`color-mix(#ffffff 34%, --color-bg)`), 1px `--color-divider-strong` border. Caret is vermilion.
- **Focus:** border shifts to vermilion (`--color-accent`); no glow, no shadow, native outline suppressed.
- **Hover:** border shifts to graphite.
- **Select** (`select.input`): native appearance stripped, inline-SVG chevron (14px, graphite `#5c574a`, matching the icon set) at right 12px, 36px right padding.
- **Placeholder / disabled:** `--color-ink-faint`; disabled buttons drop to 0.4 opacity.
- **Radio** (`.radio .dot`): 16px circle, 1.5px `--color-divider-strong` border; checked = vermilion fill with a 4px inset paper ring; hover border → vermilion.

### Segmented control (`.seg` / `.seg-opt`)
The earner filter (Me / Wife / Both). A single 1px `--color-divider-strong` rounded (3px) enclosure with 1px internal dividers between options; no gaps, `overflow: hidden`. Options: 9px×14px, 14px, graphite text. Selected option = 9% indigo wash + indigo text + weight 500. Hover (unselected) = 5% indigo wash. ≤860px the options flex to equal width and span the header's full row.

### Navigation (Sidebar)
Vertical list, Hanken Grotesk 15px, 10px×12px rows, 3px radius, 2px between items. Default graphite; active = indigo text, weight 600, 9% indigo wash. Icons are 18px stroke glyphs from the shared set. Brand lockup: "Ledger" in Spectral 22px with a 12.5px graphite "Household account book" sub-line. Collapsible to 72px (icon-only, centered, `title` tooltips) via a 28px chevron button; a `.hr` hairline separates nav from the vermilion "Add bank" action; footer pins email + a secondary "Sign out". ≤860px: fixed slide-in drawer, opened from the header menu toggle.

### Dialogs (`.dialog`)
`min(440px, 100%)` wide, 24px padding, 4px radius, paper `#f4f1e8` fill, **1px solid `--color-text` border, no shadow**, on a `#2a2620` ~46% backdrop. Title in Spectral 22px; body 15px graphite; actions right-aligned with 8px gap. `.auth-card` is the same object with wider padding (34/24) and 44px controls.

### The Net Figure (`.ov-net-fig`) — signature
The one reserved emphasis on Overview. Spectral 500, `clamp(44px, 11vw, 68px)`, `-0.02em`, tabular figures, hanging from a **4px `double` bottom rule** in `currentColor` with 8px padding-below, left-aligned. Preceded by a 13.5px graphite label ("What's left in September 2026"). Nothing else on the page competes at this size.

### The Proportion Ruler (`.ov-bar` / `.ov-bar-seg`) — signature
`SpendBar.jsx`. A 10px-tall flex strip on a `--color-divider-strong` backing, 2px radius, `overflow: hidden`, 1px gaps between segments. One segment per category, `flex-grow` = share of total, `background` = the category ink; `min-width: 2px` so tiny shares stay visible. Renders only with ≥2 categories. This replaced a ring/donut chart everywhere — it reads as a measure, not a decoration.

### The Register (`.reg` / `.reg-row`) — signature
The entry list in Income / Expenses. Each row is a ruled line, not a card: flex-wrap, baseline-aligned, 12px/11px vertical padding, 1px `--color-divider` bottom rule, square corners. Line 1 = title (`.reg-title`, weight 500, flex-grows) + amount (`.reg-amount`, Hanken 600, tabular, no-wrap). Line 2 = `.reg-meta`, graphite 12.5px, plain-text fragments (category swatch + name, bank, payer, frequency, date) separated by 1px vertical pipes — which collapse to 2px round dots ≤560px. The whole row is the click target to open the entry; per-row edit/delete icons sit inline (`.reg-actions`, graphite, vermilion wash on hover). Hover = 4% indigo wash.

**Memorable moment:** a newly added row gets `.is-new` and runs two keyframes once. `rule-in` (0.55s ease-out) draws the vermilion hairline left-to-right along the row's bottom edge then retracts to zero height; `settle-in` (0.5s cubic-bezier(0.16,1,0.3,1)) fades the title and amount up from `opacity 0` / `translateY(3px)`. Totals and tallies **do not** animate — no count-up.

## Do's and Don'ts

### Do:
- **Do** put every surface on paper `#f4f1e8`; step to `#efeae0` only for a genuine inset panel.
- **Do** carry all boundaries with 1px rules — `--color-divider` for baselines, `--color-divider-strong` for interactive strokes.
- **Do** set headings, section titles, tallies and the net figure in Spectral; set every control, label and meta line in Hanken Grotesk.
- **Do** give every amount `font-variant-numeric: tabular-nums lining-nums` (`.tnum` / `.fig`).
- **Do** keep vermilion to money-out / negatives / key marks and roughly 15% of any screen (**The Reserved-Ink Rule**).
- **Do** show category identity as a ≤10px swatch or a ruler segment only.
- **Do** keep radius at 2–4px; use square corners for ruled lines.
- **Do** honour `prefers-reduced-motion` — all animation/transition durations collapse to ~0.
- **Do** keep the register rule-in as the only authored motion; let totals just update.

### Don't:
- **Don't** introduce `#fff` or a cool off-white anywhere (**The No-White Rule**).
- **Don't** add box-shadows, elevated cards, or blur — `--shadow-*` is `none` and `.elev-*` is forced flat (**The Drawn-Boundary Rule**).
- **Don't** fill a category colour behind text or turn it into a chip/pill (**The Swatch-Not-Fill Rule**).
- **Don't** use vermilion for emphasis that isn't outflow, or for a category.
- **Don't** round corners past 4px.
- **Don't** bring back a ring/donut chart; the proportion ruler is the only breakdown visual.
- **Don't** animate tallies or totals (no count-up), and don't add view/month-step transitions beyond plain swaps.
- **Don't** set UI chrome in the serif or headings above 17px in the grotesque.
- **Don't** put transaction detail or editing on Overview — it lives in Income / Expenses.
