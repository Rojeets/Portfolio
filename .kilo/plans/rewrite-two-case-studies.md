# Plan: Rewrite two blog posts as first-person case studies

## Goal
Rewrite `laravel-vs-django-vs-nodejs.json` and `payment-gateway-integration-nepal.json` from generic guides into first-person case studies drawn from real projects in the portfolio. Same JSON schema (slug, title, date, readTime, excerpt, tags, image, keywords, faq, sections). Same length or shorter.

## Constraint
Plan mode only — read-only until approved. No edits to source files yet.

## Evidence gathered (read-only)
- `src/data/portfolio.json` — real project records:
  - **Restaurant Management SaaS** (~line 804): Laravel, Filament, Laravel Reverb, Livewire, MySQL, Stripe. Multi-tenant. Multi-gateway payments: Khalti, eSewa, Stripe. Region-based gateway routing. Webhook reconciliation with idempotency keys. Integration problem: reconciling payments across three gateways with different webhook payloads and retry semantics. Solved with per-provider adapter + normalization layer + idempotency keys.
  - **Insurance Claim Platform** (~line 691): Django, DRF, Django Channels, Celery, React Native, PostgreSQL, Redis, Cohere Vision. 1000+ claims. AI room analysis reduced assessment from hours to minutes.
  - **E-commerce Multi-Vendor Platform** (~line 1146): Laravel, Filament, Reverb, React, MySQL. 50+ vendors.
  - **Home repair marketplace** (~line 915): Django DRF, React Native Expo, Stripe.
  - **R-Hackathon 2025** (~line 1401): Laravel + Next.js, WebSockets.
  - **git-stats npm package** (~line 1611): Node.js / npm.
- Existing blog JSONs read in full (both).

## Missing piece — needs user decision
No single portfolio project uses **Laravel + Django + Node.js together**. The rewrite brief demands one project that forced a multi-stack split. Options:
- **A)** Invent a composite "restaurant SaaS + insurance platform" framing — but brief says every claim must trace to a real project; composite risks the "never touched this project" test.
- **B)** Reframe post 1 around the **restaurant SaaS** as the multi-stack system: Laravel (SaaS core), Node/Next.js (customer-facing frontend + Reverb edge), Stripe/Khalti/eSewa (payments). Honest about what ran where.
- **C)** Ask user which real project to anchor on.

## Decision needed from user
Which anchor project for post 1, and whether composite framing is acceptable.

## Post 2 — payment gateway (strong evidence)
Anchor: **Restaurant Management SaaS**.
- Gateways actually integrated: Khalti, eSewa, Stripe. Why: Nepal restaurants need wallets (Khalti/eSewa); chains with international diners/orders use Stripe. Region-based routing.
- Real problem: reconciling payments across three gateways with different webhook payloads and retry semantics → risk of double-charge. Solved: per-provider adapter + normalization layer + idempotency keys on webhook endpoints.
- Real numbers: 50+ vendors (multi-vendor post), 1000+ claims (insurance — different project). For the restaurant SaaS, exact transaction volume/settlement delay not recorded in portfolio.json — need user input or omit.
- NRB/regulatory details: keep, frame as "what I had to account for on this project".

## Deliverables (after approval)
1. Rewrite `src/data/blog-posts/laravel-vs-django-vs-nodejs.json`
2. Rewrite `src/data/blog-posts/payment-gateway-integration-nepal.json`
3. Run lint/typecheck if project defines them (check package.json scripts).

## Hard rules to apply (from brief)
- No generic strengths/weaknesses bullet lists; no head-to-head table.
- Open with project + constraint, not framework definitions.
- Every framework claim traces to the anchor project.
- Close with lesson from the specific split, not "no best framework".
- Same length or shorter.