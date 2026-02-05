# Requirements: Tab

**Defined:** 2026-02-05
**Core Value:** Visibility into "quiet" expenses — seeing the numbers clearly is enough to drive action

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Authentication

- [ ] **AUTH-01**: User can sign up with email and password
- [ ] **AUTH-02**: User session persists across browser refresh
- [ ] **AUTH-03**: User can log out from any page

### IOUs

- [ ] **IOU-01**: User can quick-add IOU (amount + who) in under 3 taps
- [ ] **IOU-02**: User can add optional details (what for, date, category)
- [ ] **IOU-03**: User can view IOUs grouped by direction (owed to me / I owe)
- [ ] **IOU-04**: User sees net balance summary
- [ ] **IOU-05**: User can mark IOU as settled
- [ ] **IOU-06**: User can view settlement history
- [ ] **IOU-07**: System sends automatic reminders at 7 days, 15 days, and 1 month

### Subscriptions

- [ ] **SUB-01**: User can add subscription (name, amount, cycle, renewal date)
- [ ] **SUB-02**: User can edit subscription details
- [ ] **SUB-03**: User can delete subscription
- [ ] **SUB-04**: User can view subscription list with next renewal date
- [ ] **SUB-05**: System suggests common subscription names (Netflix, Spotify, etc.)

### Dashboard

- [ ] **DASH-01**: Dashboard shows monthly burn rate as headline number
- [ ] **DASH-02**: Dashboard shows net IOU balance
- [ ] **DASH-03**: Dashboard shows subscription count and monthly total
- [ ] **DASH-04**: Dashboard shows recent activity (IOUs and settlements)

### Analytics

- [ ] **ANLY-01**: User can select any past month to analyze
- [ ] **ANLY-02**: User sees category breakdown chart (pie/donut)
- [ ] **ANLY-03**: User sees top expenses ranked list
- [ ] **ANLY-04**: Categories apply to both IOUs and subscriptions
- [ ] **ANLY-05**: System suggests categories based on names, user confirms

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Notifications

- **NOTF-01**: Monthly email digest of outstanding IOUs
- **NOTF-02**: Email alerts for upcoming subscription renewals
- **NOTF-03**: Push notifications for reminders

### Enhancements

- **ENH-01**: Splitwise data import
- **ENH-02**: Bank/card sync for subscription detection
- **ENH-03**: Month-over-month spending trend chart
- **ENH-04**: Price change detection for subscriptions
- **ENH-05**: Data export (CSV)
- **ENH-06**: PWA / offline support

### Multi-User

- **MULT-01**: Shared IOUs between Tab users
- **MULT-02**: Household/group concept
- **MULT-03**: Settlement simplification algorithm

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Bank/card auto-sync | Complex, expensive ($0.25-0.50/user/month), regulatory burden — validate manual-first |
| Payment processing | Venmo/PayPal already own this; don't compete |
| Push notifications | In-app + email reminders sufficient for v1 |
| Multi-currency | Adds complexity for small initial market |
| Replacing Splitwise | Tab complements group splitting, doesn't replace it |
| Full budgeting system | Different problem space, competing with Mint/YNAB |
| Gamification (badges, streaks) | Finance anxiety + gamification = poor UX |
| Social feeds/comments | Unclear value, adds complexity |
| Investment tracking | Different problem space entirely |
| Receipt scanning | Nice-to-have, not core value |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | TBD | Pending |
| AUTH-02 | TBD | Pending |
| AUTH-03 | TBD | Pending |
| IOU-01 | TBD | Pending |
| IOU-02 | TBD | Pending |
| IOU-03 | TBD | Pending |
| IOU-04 | TBD | Pending |
| IOU-05 | TBD | Pending |
| IOU-06 | TBD | Pending |
| IOU-07 | TBD | Pending |
| SUB-01 | TBD | Pending |
| SUB-02 | TBD | Pending |
| SUB-03 | TBD | Pending |
| SUB-04 | TBD | Pending |
| SUB-05 | TBD | Pending |
| DASH-01 | TBD | Pending |
| DASH-02 | TBD | Pending |
| DASH-03 | TBD | Pending |
| DASH-04 | TBD | Pending |
| ANLY-01 | TBD | Pending |
| ANLY-02 | TBD | Pending |
| ANLY-03 | TBD | Pending |
| ANLY-04 | TBD | Pending |
| ANLY-05 | TBD | Pending |

**Coverage:**
- v1 requirements: 24 total
- Mapped to phases: 0 (pending roadmap)
- Unmapped: 24

---
*Requirements defined: 2026-02-05*
*Last updated: 2026-02-05 after initial definition*
