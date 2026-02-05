# Roadmap: Tab

## Overview

Tab delivers visibility into "quiet" expenses through a mobile-first web app. The roadmap progresses from foundation through authentication, then builds out the two core features (IOUs and subscriptions) independently before unifying them in a dashboard. Analytics adds insight once data exists to analyze. Each phase delivers verifiable user value, with critical pitfalls (entry friction, dashboard overwhelm, notification overload) addressed at the earliest possible point.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3...): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Project scaffolding, database, and mobile UI shell
- [ ] **Phase 2: Authentication** - User accounts with email/password
- [ ] **Phase 3: Core IOUs** - Quick-add IOUs, viewing, and settlement
- [ ] **Phase 4: IOU Reminders** - Automatic reminder system with restraint
- [ ] **Phase 5: Subscriptions** - Add, edit, view recurring expenses
- [ ] **Phase 6: Dashboard** - Unified view of burn rate and balances
- [ ] **Phase 7: Analytics Core** - Category system and month selection
- [ ] **Phase 8: Analytics Visualization** - Charts and rankings

## Phase Details

### Phase 1: Foundation
**Goal**: Establish project infrastructure with mobile-first UI shell ready for feature development
**Depends on**: Nothing (first phase)
**Requirements**: None (infrastructure phase)
**Success Criteria** (what must be TRUE):
  1. Next.js 16 project runs locally with TypeScript and Tailwind v4
  2. PostgreSQL database is accessible via Supabase
  3. Mobile layout shell displays with header and bottom navigation
  4. Base UI components (Button, Card, Input, Modal) are available
  5. Project deploys to production environment
**Plans**: 4 plans

Plans:
- [ ] 01-01-PLAN.md — Next.js + shadcn/ui setup with base components
- [ ] 01-02-PLAN.md — Supabase client utilities and auth middleware
- [ ] 01-03-PLAN.md — Mobile layout shell (header + bottom nav)
- [ ] 01-04-PLAN.md — Vercel deployment and verification

### Phase 2: Authentication
**Goal**: Users can create accounts and maintain secure sessions
**Depends on**: Phase 1
**Requirements**: AUTH-01, AUTH-02, AUTH-03
**Success Criteria** (what must be TRUE):
  1. User can sign up with email and password
  2. User session persists after browser refresh
  3. User can log out from any page in the app
  4. Unauthenticated users are redirected to login
**Plans**: TBD

Plans:
- [ ] 02-01: TBD

### Phase 3: Core IOUs
**Goal**: Users can track who owes whom with frictionless entry (under 3 taps)
**Depends on**: Phase 2
**Requirements**: IOU-01, IOU-02, IOU-03, IOU-04, IOU-05, IOU-06
**Success Criteria** (what must be TRUE):
  1. User can add an IOU (amount + who) in under 3 taps
  2. User can add optional details (what for, date, category) to an IOU
  3. User can view IOUs grouped by direction (owed to me vs I owe)
  4. User sees net balance summary showing overall IOU position
  5. User can mark an IOU as settled
  6. User can view history of settled IOUs
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: IOU Reminders
**Goal**: Users receive timely in-app reminders for unsettled IOUs without notification overload
**Depends on**: Phase 3
**Requirements**: IOU-07
**Success Criteria** (what must be TRUE):
  1. System generates automatic reminders at 7 days, 15 days, and 1 month for unsettled IOUs
  2. User sees reminder indicators in-app (not push notifications)
  3. Reminders respect frequency limits to avoid overwhelm
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Subscriptions
**Goal**: Users can track recurring expenses with smart suggestions
**Depends on**: Phase 2
**Requirements**: SUB-01, SUB-02, SUB-03, SUB-04, SUB-05
**Success Criteria** (what must be TRUE):
  1. User can add a subscription with name, amount, cycle, and renewal date
  2. User can edit subscription details
  3. User can delete a subscription
  4. User can view subscription list showing next renewal dates
  5. System suggests common subscription names as user types
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

### Phase 6: Dashboard
**Goal**: Users see unified view of hidden expenses with 3 key numbers (burn rate, IOU balance, subscription total)
**Depends on**: Phase 3, Phase 5
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04
**Success Criteria** (what must be TRUE):
  1. Dashboard displays monthly burn rate as headline number
  2. Dashboard shows net IOU balance (owed vs owing)
  3. Dashboard shows subscription count and monthly total
  4. Dashboard shows recent activity (IOUs and settlements)
  5. Dashboard limits to 3 key numbers to avoid overwhelm
**Plans**: TBD

Plans:
- [ ] 06-01: TBD

### Phase 7: Analytics Core
**Goal**: Users can analyze expenses with category-based organization
**Depends on**: Phase 6
**Requirements**: ANLY-01, ANLY-04, ANLY-05
**Success Criteria** (what must be TRUE):
  1. User can select any past month to analyze
  2. Categories apply uniformly to both IOUs and subscriptions
  3. System suggests categories based on names (Netflix -> Entertainment)
  4. User can confirm or change suggested category
**Plans**: TBD

Plans:
- [ ] 07-01: TBD

### Phase 8: Analytics Visualization
**Goal**: Users gain insights through visual expense breakdowns
**Depends on**: Phase 7
**Requirements**: ANLY-02, ANLY-03
**Success Criteria** (what must be TRUE):
  1. User sees category breakdown as pie/donut chart
  2. User sees top expenses in ranked list
  3. Charts answer clear questions (where does money go, what are biggest expenses)
**Plans**: TBD

Plans:
- [ ] 08-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/4 | Planned | - |
| 2. Authentication | 0/TBD | Not started | - |
| 3. Core IOUs | 0/TBD | Not started | - |
| 4. IOU Reminders | 0/TBD | Not started | - |
| 5. Subscriptions | 0/TBD | Not started | - |
| 6. Dashboard | 0/TBD | Not started | - |
| 7. Analytics Core | 0/TBD | Not started | - |
| 8. Analytics Visualization | 0/TBD | Not started | - |

## Coverage

**Requirements Mapped:** 24/24 (100%)

| Category | Requirements | Phase |
|----------|--------------|-------|
| Authentication | AUTH-01, AUTH-02, AUTH-03 | Phase 2 |
| IOUs (Core) | IOU-01, IOU-02, IOU-03, IOU-04, IOU-05, IOU-06 | Phase 3 |
| IOUs (Reminders) | IOU-07 | Phase 4 |
| Subscriptions | SUB-01, SUB-02, SUB-03, SUB-04, SUB-05 | Phase 5 |
| Dashboard | DASH-01, DASH-02, DASH-03, DASH-04 | Phase 6 |
| Analytics (Core) | ANLY-01, ANLY-04, ANLY-05 | Phase 7 |
| Analytics (Viz) | ANLY-02, ANLY-03 | Phase 8 |

---
*Roadmap created: 2026-02-05*
*Depth: comprehensive (8 phases)*
*Phase 1 planned: 2026-02-05*
