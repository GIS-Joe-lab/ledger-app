---
version: 1
slug: "src-ledgerapp-jsx"
primary_target: "src/LedgerApp.jsx"
related_targets: ["src/styles.css","src/components/Sidebar.jsx","src/components/MonthHeader.jsx","src/components/OverviewView.jsx","src/components/IncomeView.jsx","src/components/ExpenseView.jsx","src/components/EntryTable.jsx","src/components/DonutChart.jsx","src/components/EntryModal.jsx","src/components/MortgageModal.jsx","src/components/BankModal.jsx"]
---

# Surface brief — Ledger app shell (Overview / Income / Expenses)

Scope: the whole authenticated app — sidebar, month header, the three views, and the entry / bank / mortgage modals.
Visitor mode: Operate. One person doing the month's household money at home, phone or laptop, a few times a month.
Job: know this month's net position and where the money went in seconds; add or adjust entries; model a mortgage precisely.
Constraints: React 18 class components, Vite, plain CSS + inline styles, Firebase Spark tier, local-first then Firestore sync. Behaviour, copy, data model, and workflow are frozen — look only. Must be tuned for iPhone 14 Pro Max (430pt) and iPad Pro (834 / 1194pt) as well as desktop.
Memorable moment: adding an entry — the new register line rules its hairline in left-to-right while the title and amount settle onto the baseline (opacity + 3px rise). The tallies deliberately do NOT count up: a numeric ticker reads too kinetic for this calm paper world; totals just update.
Unresolved: exact muted category swatch values (derive from the current OKLCH palette, desaturated toward paper); whether iPad landscape keeps a persistent sidebar (default: yes above 1024pt).

## Direction contract

THESIS: Ledger is a household account book kept monthly. The surface leads with what's left and where it went, never a transaction feed. It refuses the fintech dashboard: no elevated cards on white, no decorative hero donut, no candy category chips.

OWN-WORLD: Warm recycled-paper ground (#f4f1e8) across the whole surface. Two inks — indigo #2f3a56 for text and structure, vermilion #b0533a for outflow, negatives and key marks (~15%); graphite #6b6659 secondary. Every row sits on a visible pale baseline rule. Headings, tallies and the net figure in Spectral; UI text in Hanken Grotesk; all money tabular-nums. Categories are small muted ink swatches, never fills. Hairline rules only — no shadows, radius <=4px.

STORY: Open Overview, read "what's left" and a one-line plain-language summary, scan the biggest fixed costs and the ranked category breakdown, know your position. To see or change a transaction, tap into Income or Expenses; detail and editing live there, never on Overview.

FIRST VIEWPORT: Paper ground. Top: kicker "September 2026", then "What's left" as a large Spectral figure hanging from a rule — the one reserved emphasis — with Money in / Money out beneath. Then "Where it went": an ink ring plus a ranked, tappable category list; then fixed costs (mortgage first) as amounts only; then one reading sentence. "Add entry" is a quiet ruled button at the foot. No transaction rows here.

FORM: The kakeibo household account book (Hani Motoko, 1904). Ranked #1 of 7 grounded directions; built as the roll's IMPECCABLE'S PICK. Seed key 2dbd8d75. Adapted at the owner's request to overview-first with progressive disclosure.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
