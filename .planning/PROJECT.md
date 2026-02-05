# Tab

## What This Is

A mobile-first web app that surfaces hidden expenses — IOUs with friends and recurring subscriptions — so users can see where money quietly leaks and cut unnecessary costs. Built for personal use first, with a path to opening to other users.

## Core Value

Visibility into "quiet" expenses. Seeing the numbers clearly is enough to drive action — no fancy analysis needed, just honest totals.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] User can sign up and log in with email/password
- [ ] User can quick-add an IOU (amount + who) with optional details
- [ ] User can mark IOUs as settled and see settlement history
- [ ] User sees in-app reminders for unsettled IOUs
- [ ] User can add subscriptions (name, amount, cycle, renewal date)
- [ ] Tab suggests categories based on names, user confirms or changes
- [ ] Dashboard shows monthly burn rate as headline number
- [ ] Dashboard shows net IOU balance (owed minus owing)
- [ ] Dashboard shows subscription count and total
- [ ] Dashboard shows recent activity (IOUs and settlements)
- [ ] Analytics section with month-by-month view
- [ ] Analytics shows category breakdown (pie/donut chart)
- [ ] Analytics shows month-over-month spending trend
- [ ] Analytics shows top expenses ranked list

### Out of Scope

- Replacing Splitwise — Tab complements it for personal tracking, Splitwise handles group splits
- Push notifications — in-app reminders only for v1
- Bank/card auto-sync — manual entry for v1, potential future feature
- Real-time currency conversion — single currency assumed
- Shared IOUs with other Tab users — personal tracking only

## Context

**User workflow:** Log IOUs quickly when they happen (paid for friend's coffee), add subscriptions once and forget. Open Tab to see the burn rate — that visibility alone prompts action on unused subscriptions or forgotten debts.

**Splitwise relationship:** Many users already use Splitwise for group expense splitting. Tab doesn't compete — it handles personal tracking and the subscription angle that Splitwise doesn't cover. Future Splitwise import could pull personal balances.

**Category system:** Categories exist for analytics, not organization. Smart suggestions reduce friction — "Netflix" auto-suggests Entertainment, user taps to confirm. Categories power the breakdown charts in analytics.

## Constraints

- **Tech stack**: React/Next.js — mobile-first web app
- **Auth**: Email/password for v1 — simple, works everywhere
- **Platform**: Web first, responsive mobile design, native app potential later
- **Single user focus**: Build for one user initially, architecture should support multi-user

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Mobile-first web over native app | Ship faster, works everywhere, native can come later | — Pending |
| Email/password over OAuth | Simpler to implement, no third-party dependencies for v1 | — Pending |
| Smart category suggestions | Reduces friction while still enabling analytics | — Pending |
| In-app reminders over push | Simpler for v1, push can be added later | — Pending |
| Complement Splitwise, don't replace | Users already have group splitting solved, Tab solves different problem | — Pending |

---
*Last updated: 2025-02-05 after initialization*
