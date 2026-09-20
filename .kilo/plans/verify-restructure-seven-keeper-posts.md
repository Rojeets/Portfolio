# Plan: Verify and restructure seven keeper posts

## Goal
Audit all seven blog posts against the five-item case-study bar, rewrite only posts that fail, then re-audit rewritten output before any live update. Do not publish or deploy during this work.

## Sources and data model
- Read current content from `src/data/blog-posts/*.json`.
- Read post metadata from `src/data/portfolio.json` under `blog.items`.
- Keep content schema: `slug`, `sections[]` with paragraph, heading, list, table, code, and divider blocks.
- Keep metadata schema: `slug`, `title`, `date`, `readTime`, `excerpt`, `tags`, `image`, `keywords`, `faq`.
- If a rewrite changes title, excerpt, tags, image, keywords, or FAQ, update matching metadata in `portfolio.json` as well as the content JSON.
- Preserve valid JSON and existing project conventions. No source edits until plan approval.

## Phase 1: literal bar audit
For each post, evaluate all five items independently:
1. Opens with a real project or situation, not a definition or market overview.
2. Names something specific actually built, decided, or integrated.
3. States something that went wrong, was hard, or surprised the author.
4. Contains no paragraph generic enough for verbatim competitor reuse.
5. Closes with this project's outcome or lesson, not generic advice or a sales pitch.

Produce one result per post: `PASS` or `FAIL`, failed item numbers, and one-line missing evidence. Quote the shortest decisive text where useful. Do not rewrite during this phase.

Important scope decision: user describes five posts as already working and two as needing rewriting, but the literal bar may expose generic openings, generic closings, or reusable paragraphs in more than two files. Audit must remain independent of that assumption. Before editing, confirm whether the five-post scope is a hard lock or whether every literal FAIL must enter Phase 2.

## Current read-only findings to validate during execution
- `ssh-key-authentication-case-study.json`: specific key-auth work and Ubuntu socket gotcha exist, but generic security explanations and final sales CTA need bar review.
- `git-stats-npm-package.json`: specific package and split-platform problem exist; obstacle, competitor-unique wording, and project-specific closing need bar review.
- `realworld-impact-projects.json`: multiple named projects and outcomes exist, but opening, explicit difficulty, reusable production-language, and final generic principles need bar review.
- `server-monitoring-tool-uptime-monitoring.json`: specific Go tool exists; current opening, comparison tables, generic impact claims, and install CTA need bar review.
- `ai-referee-football-player-tracking.json`: specific pipeline exists; explicit obstacle, competitor-unique wording, and project-specific closing need bar review.
- `laravel-vs-django-vs-nodejs.json`: generic comparison essay with strengths/weaknesses lists and head-to-head table; likely fails all five items.
- `payment-gateway-integration-nepal.json`: generic gateway guide with comparison table, generic mistakes, and sales CTA; likely fails all five items.

## Phase 2: rewrite only confirmed FAILs
For each confirmed FAIL:
1. Anchor the rewrite to one named real project from `portfolio.json` or user-supplied project evidence.
2. Open with the project situation and real constraint.
3. State what was built, decided, or integrated and why that constraint drove it.
4. Include one concrete difficulty, failure, surprise, or tradeoff from that project.
5. Preserve only sections that directly trace to the project. Remove comparison tables, checklists, and strengths/weaknesses lists that could describe another team's work.
6. Close with the actual project outcome or lesson. Remove generic advice and sales CTAs unless explicitly tied to the project.
7. Keep output same length or shorter than original.
8. Do not invent missing project facts. Record exact missing evidence instead.
9. Keep JSON valid and preserve schema. Update matching metadata only when content changes require it.

## Project evidence available now
- Restaurant Management SaaS: Laravel, Filament, Reverb, Livewire, MySQL, Stripe; Khalti/eSewa/Stripe gateway adapters, region routing, webhook reconciliation, retries, idempotency; problem: differing webhook payloads and retry semantics; result: production for multiple restaurant chains, daily orders, reconciled payments.
- Insurance Claim Platform: Django, DRF, Channels, Celery, React Native, PostgreSQL, Redis, Cohere Vision; 1000+ claims; assessment time reduced from hours to minutes; async AI/PDF pipeline.
- E-commerce Multi-Vendor Platform: Laravel, Filament, Reverb, React, MySQL; 50+ vendors; queued invoicing saves dozens of bookkeeping hours monthly.
- Server Uptime Monitoring: Go tool with multi-site checks, Slack alerts, Prometheus metrics; problem: alert fatigue and false positives; state-transition alerts and configurable retries; 99.9%+ target uptime.
- AI Referee: YOLOv5, SORT, SSIM, pitch mapping, Flask dashboard; occlusion and similar jerseys cause tracking/classification errors; 30+ FPS target in project record.
- Git heatmap package: GitHub and GitLab contribution merge; no explicit obstacle or outcome metric beyond portfolio use in current evidence.
- SSH post: key authentication, drop-in config, port/socket change, second-terminal test; Ubuntu socket behavior is explicit gotcha; no project name or measured outcome in current evidence.

## Confirmed decisions
- Scope lock: audit all seven, rewrite only the two named failing posts: `laravel-vs-django-vs-nodejs.json` and `payment-gateway-integration-nepal.json`.
- Framework post anchor: use a multi-project decision essay based on documented projects. Keep every framework claim tied to a named project; flag if singular case-study bar remains unsatisfied.
- Payment post anchor: narrow to Restaurant Management SaaS and documented Khalti, eSewa, and Stripe integration. Remove unsupported ConnectIPS, FonePay, and PayPal claims from body and metadata.

## Phase 2: rewrite only the two confirmed FAILs
For each confirmed FAIL:
For each rewrite:
- Re-run all five bar items.
- Confirm every previously failed item now passes.
- Confirm previously passing items remain intact.
- Check opening, project-specific decisions, obstacle, unique wording, and closing.
- Scan for newly introduced generic claims, unsupported gateways/frameworks, comparison tables, checklists, and sales copy.
- Compare length against original; reject if longer.
- Validate JSON parse and TypeScript/build checks available from `package.json` (`npm run build`; no separate lint/typecheck script currently defined).
- Report `READY TO PUBLISH` or exact remaining blockers.

## Delivery boundary
- No live site update, deployment, commit, or push.
- After approval, edit only confirmed FAIL content JSONs and any matching metadata records.
- Run validation, then return audit, rewrite summary, re-audit status, and blockers.
