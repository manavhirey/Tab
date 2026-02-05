# Project Research Summary

**Project:** Tab - Personal Finance / Expense Tracking App
**Domain:** Mobile-first personal finance (IOU tracking + subscription management)
**Researched:** 2026-02-05
**Confidence:** HIGH

## Executive Summary

Tab is a mobile-first personal finance app focused on "hidden expenses" — the money that quietly leaks through IOUs and recurring subscriptions. The research reveals a mature but fragmented market where no single competitor owns this combined niche. Splitwise dominates group expense splitting but lacks subscription tracking; Rocket Money excels at subscription management but ignores IOUs. Tab's positioning of "surfacing hidden expenses" is unique and defensible.

The recommended technical approach centers on Next.js 16 with Supabase for rapid development and built-in authentication. The architecture follows feature-driven modular design with clear separation between IOUs, subscriptions, and dashboard aggregation. This stack optimizes for developer velocity while maintaining type safety and mobile responsiveness — critical for a solo/small team tackling a mobile-first product.

The primary risk is execution friction: 40% of finance app users abandon after first use due to cumbersome data entry. Success hinges on ruthless simplification — adding an IOU must take under 5 seconds and 3 taps maximum. Secondary risks include notification overload (causing uninstalls) and social awkwardness from aggressive IOU reminders. The research identifies clear mitigation strategies for each critical pitfall, with specific guidance on what to build when.

## Key Findings

### Recommended Stack

**Next.js 16 full-stack with Supabase backend** is the optimal foundation. This combination provides built-in authentication, database with Row Level Security, real-time capabilities, and excellent developer experience — all essential for a personal finance app where data security and user isolation are paramount.

**Core technologies:**
- **Next.js 16 (App Router)**: Server components for fast initial load, built-in layouts for mobile navigation, excellent mobile optimization
- **Supabase**: All-in-one PostgreSQL + authentication + real-time, eliminates need for separate auth service, free tier generous for MVP
- **shadcn/ui + Tailwind CSS v4**: Copy-paste components with full control, mobile-first by default, 8x faster builds with v4
- **TanStack Query + Zustand**: Handles server state (IOUs, subscriptions) vs client state (modals, filters) elegantly, minimal boilerplate
- **Recharts**: Simple React-native charting for financial dashboards, composable API perfect for burn rate and category breakdown visualizations
- **React Hook Form + Zod**: Type-safe form validation critical for financial data entry, minimal re-renders for performance

**Critical version requirements:**
- Next.js 16.1.6+ (App Router with React Server Components)
- Tailwind CSS v4.1.18+ (CSS-first configuration)
- Supabase JS client 2.95.1+

**What NOT to use:**
- MongoDB/Firebase (relational data fits PostgreSQL better, ACID compliance critical for finance)
- Redux Toolkit (overkill for this scope)
- Bank sync for MVP (expensive $0.25-0.50/user/month, complex regulatory concerns, validate manual-first)

### Expected Features

**Must have (table stakes):**
- Quick-add IOU (< 5 taps) — users expect Splitwise-level entry speed
- Contact-based tracking — natural mental model of "who owes me"
- Balance summary — net amount owed/owing at glance
- Manual subscription entry — name, amount, cycle, renewal date
- Upcoming renewals view — "what's due soon" is core value
- Email/password auth — baseline security expectation
- Mobile-responsive design — 60%+ traffic will be mobile
- Dashboard with monthly burn rate — combines IOUs + subscriptions (unique positioning)

**Should have (differentiators):**
- "Hidden expense" framing — emotional hook, no competitor owns this positioning
- Subscription detection hints — smart suggestions reduce manual entry friction
- Renewal calendar — visual timeline of upcoming charges
- Price increase detection — alert when subscription cost changes (high value, rarely done well)
- IOU payment reminders with tone control — "gentle" vs "direct" to preserve relationships
- Month-over-month comparison — moves from tracking to insights

**Defer (v2+):**
- Bank account sync — complex, expensive, regulatory burden; validate manual-first
- Payment processing — Venmo/PayPal already own this; don't compete
- Investment tracking — different problem space entirely
- Receipt scanning — nice-to-have, not core value
- Multi-currency support — adds complexity for small initial market

**Anti-features (explicitly avoid):**
- Full budgeting system — scope creep, competing with Mint/YNAB
- Gamification (badges, streaks) — finance anxiety + gamification = poor UX
- Aggressive push notifications — 64% uninstall apps with 5+ weekly notifications
- Social feeds/comments — unclear value, adds complexity
- Dark patterns for premium — destroys trust in finance context

### Architecture Approach

**Feature-driven modular structure with Next.js App Router.** Each feature (IOUs, subscriptions, dashboard, analytics) owns its components, hooks, services, and types. The App Router provides built-in layouts for mobile navigation and route grouping for authenticated vs public sections.

**Major components:**
1. **IOU Feature** — Manages IOUs (create, edit, settle, remind), owns IOU pages and forms, communicates with database via Prisma
2. **Subscription Feature** — Tracks recurring expenses (CRUD, renewal dates), owns subscription pages and renewal alerts, calculates next billing cycles
3. **Dashboard Feature** — Aggregates burn rate, totals, charts from IOU and Subscription services; no data passing, each sub-component fetches own data via TanStack Query
4. **Analytics Feature** — Computes trends, breakdowns, visualizations; depends on history data from IOUs and subscriptions
5. **Auth Feature** — User registration, login, session management via Supabase Auth

**Critical architectural patterns:**
- **TanStack Query for server state** (IOUs, subscriptions) with caching and optimistic updates
- **Zustand for client state** (modals, filters, UI preferences) — lightweight, no boilerplate
- **Prisma singleton** to avoid connection exhaustion (or use Supabase client directly)
- **Server-side validation with Zod** on all API routes
- **No Prisma in client components** — security risk, use API routes/server actions only

**Data flow:** User action → React component → TanStack Query mutation → API route → Zod validation → Service layer (business logic) → Database (Supabase/Prisma) → PostgreSQL → Cache invalidation → UI refresh

**Folder structure:** `/src/features/[feature]/` contains `components/`, `hooks/`, `services/`, `types/` for each feature. Shared UI primitives in `/src/components/ui/`, global utilities in `/src/lib/`.

### Critical Pitfalls

1. **Manual entry friction kills adoption** — 40% abandon apps after first use due to tedious data entry. Prevention: IOU quick-add must complete in under 5 seconds, 3 taps maximum; smart defaults (recent friends, common amounts); optional fields collapsed by default. Critical for Phase 1.

2. **Overcomplicated dashboard overwhelms users** — Cluttered interfaces are #1 reason budgeting apps lose users. Finance already feels overwhelming; complex layouts amplify stress. Prevention: Limit dashboard to 3 key numbers (monthly burn rate, IOU balance, subscription total); one primary metric with large typography; charts are drill-down, not dashboard-level. Critical for Phase 3.

3. **Poor category accuracy destroys trust** — ML categorization achieves only 60-70% accuracy out of the box. Wrong categories make analytics meaningless. Prevention: Start simple with user-selected categories on entry, learn from choices; don't auto-categorize until you have user data; show confidence levels on suggestions. Affects Phase 2 and Phase 4.

4. **Notification overload causes uninstalls** — 64% delete apps sending 5+ notifications per week. Prevention: Start with ONE notification type (IOU reminder, user-initiated); never auto-enable; global budget of 2-3 notifications per week total across all features. Establish restraint in Phase 1.

5. **IOU social dynamics create awkwardness** — Aggressive auto-reminders make users "that person" who pesters friends about money. Users stop logging IOUs to avoid awkward situations. Prevention: Reminders 100% manual, user-initiated; show preview of what friend sees; offer tone options ("gentle nudge" vs "payment due"); settlement feels like favor, not demand. Critical for Phase 1.

6. **Stale/incorrect data kills trust instantly** — Nothing kills trust like wrong numbers or mismatched totals across views. Prevention: Always show "as of [timestamp]"; server is source of truth; renewal date calculation must be bulletproof (test Feb 28, leap years); totals must match sum of parts exactly. Infrastructure decision in Phase 1 affecting all phases.

## Implications for Roadmap

Based on research, suggested phase structure prioritizes proving core value before adding sophistication. Dependencies and pitfall avoidance drive the sequencing.

### Phase 1: Foundation & Core IOU

**Rationale:** Everything depends on authentication and IOU tracking is core value #1. IOU feature must be frictionless to avoid the #1 pitfall (manual entry abandonment). Building auth and IOUs together validates the hardest UX challenge early.

**Delivers:**
- Next.js 16 project setup with TypeScript, Tailwind v4
- PostgreSQL database via Supabase
- Email/password authentication (Supabase Auth)
- IOU quick-add form (< 5 seconds, < 3 taps)
- IOU list view (grouped by direction: owed to me vs I owe)
- Balance summary (net amounts)
- Settle IOU action
- Base UI components (Button, Card, Input, Modal from shadcn/ui)
- Mobile layout shell (Header, BottomNav)

**Addresses:**
- Table stakes: Quick-add IOU, contact-based tracking, balance summary, auth, mobile-responsive
- Critical pitfall #1: Manual entry friction (design for speed from day one)
- Critical pitfall #4: Notification restraint (reminders user-initiated only)
- Critical pitfall #5: Social awkwardness (manual, user-controlled reminders)
- Critical pitfall #6: Data accuracy (server as source of truth)

**Architecture components:** Auth feature, IOU feature (components, hooks, services), shared UI primitives, Database schema with User and IOU models

**Research flags:** SKIP phase research — IOU tracking is well-documented, Supabase has excellent Next.js examples, standard patterns established.

---

### Phase 2: Subscription Tracking

**Rationale:** Subscriptions are core value #2 and independent of IOUs (can build in parallel conceptually, but sequentially makes sense to learn from Phase 1). Subscription feature must work before dashboard can aggregate. Manual entry avoids pitfall #9 (over-promising smart detection).

**Delivers:**
- Manual subscription entry form (name, amount, cycle, start date)
- Subscription list view (with next renewal date)
- Edit/delete subscription
- Category assignment (pre-defined categories, user-selected)
- Basic renewal date calculation
- Mark as active/cancelled

**Addresses:**
- Table stakes: Manual subscription entry, upcoming renewals view, category assignment
- Differentiator: Subscription detection hints (suggest common subscriptions like Netflix, Spotify)
- Critical pitfall #3: Category accuracy (user-selected, not auto-assigned; learn from choices)
- Critical pitfall #6: Renewal date calculation bulletproof (test edge cases)
- Moderate pitfall #9: Over-promising smart detection (manual-first, suggestions second)

**Architecture components:** Subscription feature (components, hooks, services), Database schema extension (Subscription model), category suggestion utility (rules-based, not ML)

**Research flags:** SKIP phase research — subscription tracking is standard, renewal calculation logic is straightforward, category lists are well-established.

---

### Phase 3: Unified Dashboard

**Rationale:** With IOUs and subscriptions built, dashboard aggregates both to deliver unique value prop ("hidden expenses"). Dashboard design addresses critical pitfall #2 (avoiding overwhelm). Must prove combined value before adding analytics complexity.

**Delivers:**
- Dashboard page combining IOUs + subscriptions
- Monthly burn rate card (subscription total + open IOUs normalized)
- IOU balance widget (owed to me vs I owe)
- Subscription total widget (monthly recurring spend)
- Quick action buttons (add IOU, add subscription)
- Upcoming renewals preview (next 7 days)
- Recent IOUs preview

**Addresses:**
- Table stakes: Dashboard with monthly burn rate, unified view
- Differentiator: IOU + subscription unified view (unique positioning)
- Critical pitfall #2: Dashboard overwhelm (limit to 3 key numbers, clear hierarchy)
- Critical pitfall #6: Data accuracy (totals match sum of parts, show timestamps)

**Architecture components:** Dashboard feature (aggregation logic), reuse IOU and Subscription services, no prop drilling (each widget fetches own data via TanStack Query)

**Research flags:** SKIP phase research — dashboard aggregation is straightforward math, visualization patterns are standard.

---

### Phase 4: Analytics & Insights

**Rationale:** Analytics requires 2+ weeks of user data to be meaningful (dependency on time). Charts without actionability are pitfall #10. This phase moves from tracking to insights, enabling behavior change.

**Delivers:**
- Category breakdown chart (pie or treemap)
- Month-over-month comparison (spending trends)
- Top expenses view (highlight biggest leaks)
- Subscription price change detection
- "Forgot about this?" alerts for unused subscriptions

**Addresses:**
- Differentiators: Month-over-month comparison, price increase detection, "forgot about this" alerts
- Moderate pitfall #10: Charts that don't enable action (every chart answers question, highlights anomalies, provides action paths)
- Critical pitfall #3: Category accuracy (analytics only as good as categories, test user-corrected data)

**Architecture components:** Analytics feature (trend calculations, anomaly detection), Recharts components (PieChart, LineChart, AreaChart), analytics service with business logic

**Research flags:** CONSIDER phase research — price change detection patterns may need research; most anomaly detection logic is straightforward comparisons.

---

### Phase 5: Reminders & Notifications

**Rationale:** Deferred until core is solid to avoid feature creep (pitfall #7). Notification strategy must be disciplined to avoid pitfall #4 (overload). Builds on Phase 1 IOU manual reminders with more sophistication.

**Delivers:**
- Time-based IOU reminders (user-scheduled)
- Subscription renewal alerts (batched weekly digest)
- Tone control for IOU reminders (gentle vs direct)
- Notification preferences panel
- Global notification frequency cap (2-3 per week max)

**Addresses:**
- Critical pitfall #4: Notification overload (budget enforcement, batching, user control)
- Critical pitfall #5: Social dynamics (tone control, preview before send)
- Differentiator: IOU reminder tone control (preserves relationships)

**Architecture components:** Reminder model in database, notification service (schedule, send, batch), notification preferences in user settings

**Research flags:** CONSIDER phase research — notification timing/batching algorithms may benefit from research; tone generation could use templates research.

---

### Phase 6: Polish & Preparation for Multi-User

**Rationale:** Core product complete, now prepare for scale and shared expense scenarios. Multi-user IOUs are complex (simplification algorithms, permissions, settlement flows) and should be last.

**Delivers:**
- Data export (CSV)
- Improved onboarding flow
- Offline support (PWA with Serwist)
- Database schema for shared IOUs
- Group/household concept
- Settlement simplification algorithm (minimize transactions)

**Addresses:**
- Minor pitfall #12: No data export (builds trust, reduces lock-in anxiety)
- Moderate pitfall #8: Complex setup friction (onboarding iteration)
- Table stakes: Offline tolerance, PWA installable
- Future requirement: Multi-user preparation

**Architecture components:** Export service, PWA configuration (@serwist/next), shared IOU models, settlement algorithm service

**Research flags:** RECOMMEND phase research — settlement simplification algorithms are complex (graph theory, minimize transactions); multi-user permissions need research.

---

### Phase Ordering Rationale

**Dependency-driven:** Auth → IOUs → Subscriptions → Dashboard → Analytics (requires data history) → Reminders → Multi-user. Each phase builds on previous, enabling rapid iteration with working product at each stage.

**Risk mitigation:** Phase 1 tackles the hardest UX challenge (frictionless entry) immediately. If manual entry doesn't work, no point building the rest. Phase 2 keeps it simple (no AI promises). Phase 3 proves unique value (combined view). Phase 4+ adds sophistication only after core is validated.

**Pitfall sequencing:** Critical pitfalls (#1, #2, #4, #5, #6) are addressed in Phases 1-3 when architecture decisions are made. Moderate pitfalls addressed in later phases. Establishes disciplined patterns early (notification restraint, data accuracy, simplicity) that inform all future work.

**Feature grouping:** IOUs and subscriptions are independent features (could theoretically parallelize), but sequential allows learning from Phase 1 to inform Phase 2. Dashboard naturally follows as aggregator. Analytics requires history. Reminders build on notification restraint. Multi-user is explicitly deferred per requirements.

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 5 (Reminders):** Notification timing/batching algorithms, tone generation templates, delivery reliability patterns
- **Phase 6 (Multi-user):** Settlement simplification algorithms (graph-based, minimize transactions), shared expense permissions, conflict resolution for offline edits

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Foundation & IOUs):** Well-documented, Supabase has official Next.js examples, IOU CRUD is standard
- **Phase 2 (Subscriptions):** Subscription tracking patterns are established, renewal calculation is straightforward
- **Phase 3 (Dashboard):** Aggregation logic is simple math, dashboard patterns are well-established
- **Phase 4 (Analytics):** Charting with Recharts is well-documented, trend calculations are standard (though price detection may need light research)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified via npm, official Next.js and Supabase docs confirm maturity; Tailwind v4 release confirmed; shadcn/ui is industry standard 2025 |
| Features | HIGH | Multiple competitors validate table stakes (Splitwise for IOUs, Rocket Money for subscriptions); user research from CNBC, NerdWallet confirms expectations; anti-features well-documented in failure analyses |
| Architecture | HIGH | Official Next.js App Router structure, Prisma/Supabase patterns documented, TanStack Query + Zustand combination is community consensus; feature-driven modules proven at scale |
| Pitfalls | HIGH | Backed by Splitwise user complaints (Trustpilot), abandonment stats from industry studies (Moldstud, Reteno), UX failures documented (Eleken, Netguru); categorization accuracy from BBVA AI research; notification fatigue from mobile app studies |

**Overall confidence:** HIGH

Research is comprehensive with cross-referenced sources. Stack recommendations verified with official documentation and current versions. Feature landscape mapped from competitor analysis and user expectations research. Architectural patterns drawn from official Next.js and Supabase/Prisma guidance. Pitfalls identified from documented failures, user complaints, and industry studies on finance app abandonment.

### Gaps to Address

**Bank sync decision:** Research recommends manual-first, but user tolerance for manual entry is an assumption. Validate with early users. If manual proves friction, bank sync research (Plaid, Teller, Finicity) will be needed. Defer bank sync to post-MVP unless early feedback demands it.

**Category suggestion implementation:** Research identifies ML categorization as risky (60-70% accuracy), recommends rules-based. But rules-based suggestion patterns need to be developed. Start with common subscription names (Netflix, Spotify, Hulu) as low-hanging fruit. IOU categorization may need light research in Phase 2.

**Subscription price change detection:** Mentioned as high-value differentiator, but implementation patterns not researched. Phase 4 planning should research: how to detect price changes reliably, how other apps handle this, notification strategy for changes.

**Settlement simplification algorithm (multi-user):** Phase 6 flagged for research. Graph-based algorithms to minimize transactions in group IOUs are complex. Research during Phase 6 planning, not before.

**Offline sync conflict resolution:** PWA capability planned for Phase 6. Research identified offline-first challenges. Need to research: optimistic locking, conflict resolution UI, queue management for writes.

**Tone control for reminders:** Phase 5 feature. How to generate/select reminder messages that feel personal but not aggressive? May need template research or user testing to calibrate tone.

## Sources

### Primary (HIGH confidence)
- Next.js Official Documentation (v16.1.6 confirmed) — framework patterns, App Router structure
- Supabase Documentation — authentication, database, real-time patterns
- Prisma Documentation with Next.js — ORM patterns, connection pooling
- shadcn/ui Documentation — component library patterns
- TanStack Query Documentation — server state management patterns
- Recharts Documentation — chart component APIs

### Secondary (MEDIUM confidence)
- [What Next.js Tech Stack to Try in 2025](https://www.wisp.blog/blog/what-nextjs-tech-stack-to-try-in-2025-a-developers-guide-to-modern-web-development) — stack recommendations
- [State Management in 2025](https://dev.to/saswatapal/do-you-need-state-management-in-2025-react-context-vs-zustand-vs-jotai-vs-redux-1ho) — Zustand vs Redux analysis
- [Best React Chart Libraries 2025](https://blog.logrocket.com/best-react-chart-libraries-2025/) — Recharts comparison
- [Next.js Architecture in 2026](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) — folder structure patterns
- [System Design of Splitwise Backend](https://www.geeksforgeeks.org/system-design/system-design-of-backend-for-expense-sharing-apps-like-splitwise/) — IOU architecture patterns

### Domain Research (HIGH confidence)
- [CNBC Select: Best Expense Tracker Apps 2026](https://www.cnbc.com/select/best-expense-tracker-apps/) — user expectations
- [NerdWallet: Best Budget Apps 2026](https://www.nerdwallet.com/finance/learn/best-budget-apps) — table stakes features
- [Splitwise Trustpilot Reviews](https://www.trustpilot.com/review/splitwise.com) — user complaints (reminders, setup friction)
- [Rocket Money Review](https://robberger.com/rocket-money-review/) — subscription tracking expectations

### UX & Pitfalls (HIGH confidence)
- [Moldstud: Creating Seamless User Journey in Budgeting Apps](https://moldstud.com/articles/p-creating-a-seamless-user-journey-in-budgeting-applications-best-ux-practices) — 40% abandonment stat
- [Reteno: Push Notification Best Practices 2026](https://reteno.com/blog/push-notification-best-practices-ultimate-guide-for-2026) — 64% uninstall stat
- [Eleken: Budget App Design](https://www.eleken.co/blog-posts/budget-app-design) — cluttered dashboard issue
- [Netguru: Mistakes in Creating Finance Apps](https://www.netguru.com/blog/mistakes-in-creating-finance-app) — feature creep warning
- [BBVA AI Factory: How AI Classifies Expenses](https://www.bbvaaifactory.com/money-talks-how-ai-helps-us-classify-our-expenses-and-income/) — 60-70% accuracy for ML categorization
- [F9 Finance: Dashboard Design Best Practices](https://www.f9finance.com/dashboard-design-best-practices/) — stale data kills trust

---

*Research completed: 2026-02-05*
*Ready for roadmap: YES*
