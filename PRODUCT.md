# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A single person (the owner/developer) tracking their own personal finances. Sign-in is single-user (email/password via Firebase Auth); there is no sharing of a ledger across multiple accounts. The "earner" field on entries (Me / partner name / Both) lets that one user attribute income and expenses within a household, and split shared items — it is a categorization tool, not multi-user access.

## Product Purpose

A personal monthly income/expense ledger. The user enters income and expense entries (one-time or recurring), organizes them by category and bank account, and reviews monthly totals and category breakdowns. It exists to replace ad hoc spreadsheet tracking with structured entry and visual (donut chart) breakdowns of where money comes from and goes each month.

Success means the user can, at a glance, see net income/expense for a given month, understand spending by category, and plan large recurring costs (mortgage) accurately.

## Positioning

Combines everyday ledger tracking (categorized income/expense entries with recurrence rules, bank-account tagging, per-earner split) with a built-in mortgage calculator (loan amount, rate, term, insurance, property tax, extra payment → monthly principal/interest/total) that feeds directly into an expense entry. The mortgage modeling is the differentiated piece — most simple ledger/budget tools don't compute a full monthly mortgage payment inline when logging that expense.

## Operating Context

- Monthly-first workflow: the app centers on navigating month-to-month (Overview / Income / Expenses views) rather than a flat all-time transaction list.
- Entries can be one-time or recurring (weekly, bi-weekly, monthly, bi-monthly, quarterly, yearly), optionally with an end date, and optionally auto-pay with a specific pay date.
- Entries are tagged with a bank account (user-managed list) and an earner (Me / a named other / Both), the latter driving a 50/50 split when viewing a single earner's filtered totals.
- Data is read instantly from `localStorage` on load, then reconciled with a live Firestore subscription scoped to `users/{uid}` — local-first read, cloud sync in the background.

## Capabilities and Constraints

- Firebase free tier (Spark plan) only — no paid backend services; keep Firestore usage within free-tier limits.
- Single-user data model by design: Firestore rules scope all data to `users/{uid}`; not built for sharing one ledger across multiple accounts/logins.
- No bank/API integrations (no Plaid or similar) — all entries are manual.
- Mortgage calculator currently computes monthly payment (principal, interest, insurance, property tax, extra payment) for a single existing or planned mortgage and applies it as a recurring expense.
- Planned — second-property acquisition model: a tool to evaluate buying an additional property. Inputs are the purchase price, down payment, and a new mortgage (rate, term, insurance, property tax), offset by expected rental income; the output is the net monthly cost of taking on that property. It reuses the existing mortgage math and, like the current calculator, is meant to feed a recurring expense entry. Detailed field list and UI are not yet fixed.

## Evidence on Hand

No specific financial data, testimonials, or case studies apply — this is a single-user personal tool, not a marketing surface. The existing implementation (categories, recurrence rules, mortgage math in `src/utils/mortgage.js`, category color palette in `src/constants.js`) is the current source of truth for what's already built.

## Product Principles

- Local-first, cloud-synced: the UI never blocks on network; Firestore sync reconciles quietly in the background.
- Manual entry over integrations: the user explicitly wants a simple, non-connected ledger, not aggregated bank feeds.
- Monthly granularity is the primary lens for both entry and review, not a running all-time list.
- Recurring costs (especially mortgage) deserve first-class modeling, not just a flat recurring amount.
- Single-user scope: features should serve one person's household finances, not multi-account collaboration.
