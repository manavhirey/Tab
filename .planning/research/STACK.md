# Technology Stack

**Project:** Tab - Personal Finance / Expense Tracking App
**Researched:** 2025-02-05
**Research Mode:** Ecosystem (Stack Dimension)

---

## Executive Summary

For a mobile-first personal finance web app with React/Next.js, the 2025 standard stack centers on:
- **Next.js 16 (App Router)** for the framework
- **Supabase** for database + auth (or Prisma + PostgreSQL for more control)
- **shadcn/ui + Tailwind CSS v4** for mobile-first UI
- **Zustand + TanStack Query** for state management
- **Recharts** for financial data visualization

This stack optimizes for: developer velocity, type safety, mobile responsiveness, and production-readiness.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Next.js** | 16.1.6 | Full-stack React framework | App Router with RSC, built-in optimizations, Vercel deployment synergy. Industry standard for React apps in 2025. | HIGH |
| **React** | 19.x | UI library | Bundled with Next.js 16. Server Components, improved Suspense, Actions. | HIGH |
| **TypeScript** | 5.x | Type safety | Non-negotiable for financial apps. Catches bugs at compile time. | HIGH |

**Rationale:** Next.js 16 is the clear winner for React apps in 2025. The App Router provides server components (faster initial load), built-in layouts (for mobile navigation), and route handlers (API endpoints). Financial apps benefit from SSR for SEO and fast perceived performance on mobile.

### Database & ORM

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Supabase** | 2.95.1 (JS client) | PostgreSQL + Auth + Realtime | All-in-one backend: managed Postgres, built-in auth, Row Level Security, real-time subscriptions. Perfect for solo/small team. | HIGH |
| **Prisma** | 7.3.0 | ORM (if needed) | Type-safe queries, excellent DX, great migrations. Use with Supabase's Postgres or standalone. | HIGH |

**Primary Recommendation: Supabase**

For Tab specifically, Supabase is the optimal choice because:
1. **Built-in auth** - Email/password auth is a core requirement; Supabase includes this
2. **Row Level Security** - Ensures users only see their own financial data
3. **Realtime** - IOU reminders and updates can push to connected clients
4. **Free tier** - Generous for MVPs (500MB database, 50K monthly active users)

**Alternative: Prisma + Neon/Vercel Postgres**

Choose this if:
- You want more ORM control and SQL flexibility
- You're already comfortable with Prisma
- You prefer separate auth (NextAuth/Clerk)

| Consideration | Supabase | Prisma + Neon |
|--------------|----------|---------------|
| Setup time | 10 minutes | 30+ minutes |
| Auth included | Yes | No (add NextAuth) |
| Type safety | Good (generated types) | Excellent (Prisma Client) |
| Vendor lock-in | Medium | Low |
| Cost at scale | $25/mo Pro | Pay per usage |

### Authentication

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Supabase Auth** | (bundled) | Primary auth | Included with Supabase. Email/password, social OAuth, MFA. Zero additional cost. | HIGH |

**Alternative Options:**

| Option | Version | When to Use | Why Not Default |
|--------|---------|-------------|-----------------|
| **NextAuth.js** | 4.24.13 | Self-hosted, full control | More setup, need separate DB |
| **Clerk** | 6.37.3 | Beautiful pre-built UI, fast MVP | $25/mo after 10K MAU, vendor lock-in |

**Recommendation:** Use Supabase Auth since you're already using Supabase for database. One vendor, one SDK, simpler architecture.

### UI Components & Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **shadcn/ui** | latest | Component system | Copy-paste components, full control, accessible by default (Radix primitives). Industry darling in 2025. | HIGH |
| **Tailwind CSS** | 4.1.18 | Styling | CSS-first config in v4, 8x faster builds, mobile-first utilities. | HIGH |
| **Radix UI** | (via shadcn) | Accessible primitives | Handles ARIA, keyboard nav, focus management. shadcn builds on this. | HIGH |
| **Lucide React** | 0.563.0 | Icons | Clean, consistent icons. Default for shadcn/ui. | HIGH |

**Why shadcn/ui over alternatives:**

| Library | Verdict | Reason |
|---------|---------|--------|
| **shadcn/ui** | USE | Full control, Tailwind-native, excellent mobile support, AI-friendly |
| MUI (Material UI) | AVOID | Opinionated Material Design doesn't fit mobile-first finance aesthetic |
| Chakra UI | CONSIDER | Good DX but less Tailwind-native than shadcn |
| Mantine | CONSIDER | Feature-rich but heavier bundle |

**Mobile-first note:** shadcn/ui components are responsive by default. Combine with Tailwind's mobile-first breakpoints (`sm:`, `md:`, `lg:`).

### State Management

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **TanStack Query** | 5.90.20 | Server state | Handles caching, background refetch, optimistic updates for API data. Standard for React data fetching. | HIGH |
| **Zustand** | 5.0.11 | Client state | Minimal boilerplate, tiny bundle (3KB), perfect for UI state (modals, filters, theme). | HIGH |

**Architecture:**
```
Server State (API data)     --> TanStack Query
- IOUs list
- Subscriptions
- User profile

Client State (UI state)     --> Zustand
- Modal open/closed
- Filter selections
- Theme preference
- Sidebar collapsed
```

**Why this combination:**

1. **TanStack Query** handles the hard parts: caching subscription data, refetching IOUs after settlement, background sync. Essential for financial apps where data freshness matters.

2. **Zustand** is simpler than Redux, smaller than MobX. For UI state in a finance app (filter by category, date range, etc.), it's perfect.

**What NOT to use:**

| Library | Why Avoid |
|---------|-----------|
| Redux Toolkit | Overkill for this scope. Boilerplate overhead not justified. |
| Jotai | Great for complex atomic state, but Tab doesn't need it |
| React Context alone | Fine for theme, but poor performance for frequently-changing state |

### Charts & Data Visualization

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Recharts** | 3.7.0 | Charts | React-native, composable, good docs. Best balance of ease + customization for finance dashboards. | HIGH |

**Alternatives considered:**

| Library | Verdict | Reason |
|---------|---------|--------|
| **Recharts** | USE | Simple API, great for pie/bar/line charts Tab needs |
| Chart.js | AVOID | Canvas-based, harder to customize, not React-native |
| Nivo | CONSIDER | More beautiful defaults but larger bundle, steeper learning curve |
| Victory | CONSIDER | Good but Recharts has better React integration |
| ApexCharts | CONSIDER | Better for candlestick/financial charts, but Tab doesn't need those |

**For Tab specifically:**
- Monthly burn rate --> Recharts `<BarChart>`
- Category breakdown --> Recharts `<PieChart>` or `<Treemap>`
- Month-over-month trends --> Recharts `<LineChart>` or `<AreaChart>`

### Form Handling & Validation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **React Hook Form** | 7.71.1 | Form state | Minimal re-renders, excellent performance, uncontrolled by default. | HIGH |
| **Zod** | 4.3.6 | Schema validation | Type inference, runtime validation, reusable schemas. Pairs perfectly with RHF. | HIGH |
| **@hookform/resolvers** | 5.2.2 | RHF + Zod bridge | Connects Zod schemas to React Hook Form. | HIGH |

**Why this combination:**
```typescript
// Define once, use everywhere
const iouSchema = z.object({
  personName: z.string().min(1, "Name required"),
  amount: z.number().positive("Amount must be positive"),
  direction: z.enum(["owed_to_me", "i_owe"]),
  dueDate: z.date().optional(),
});

type IOU = z.infer<typeof iouSchema>; // TypeScript type for free
```

Financial apps have many forms (add IOU, add subscription, settle debt). This stack ensures type-safe, validated inputs with minimal code.

### PWA & Mobile Experience

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **@serwist/next** | 9.5.4 | PWA / Service Worker | Successor to next-pwa, recommended by Next.js docs. Enables install prompt, offline caching. | HIGH |

**Mobile-first requirements for Tab:**
1. **Installable** - Users add to home screen
2. **Offline capable** - View cached IOUs/subscriptions when offline
3. **Fast** - Service worker caches assets

**Configuration approach:**
```javascript
// next.config.js
import withSerwist from "@serwist/next";

export default withSerwist({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
})({
  // Next.js config
});
```

### Utilities

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **date-fns** | 4.1.0 | Date manipulation | Tree-shakeable, immutable, for subscription renewal calculations | HIGH |
| **clsx** | 2.1.1 | Conditional classes | Tiny utility for conditional Tailwind classes | HIGH |
| **tailwind-merge** | 3.4.0 | Merge Tailwind classes | Prevents class conflicts in component variants | HIGH |

### Development Tools

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **ESLint** | 9.x | Linting | Catches errors, enforces consistency | HIGH |
| **Prettier** | 3.x | Formatting | Consistent code style | HIGH |
| **TypeScript** | 5.x | Type checking | Compile-time safety | HIGH |

---

## Alternatives NOT Recommended

### Database Alternatives

| Technology | Why NOT for Tab |
|------------|-----------------|
| **MongoDB** | Relational data (IOUs, users, subscriptions) fits Postgres better. Financial data benefits from ACID compliance. |
| **Firebase/Firestore** | Vendor lock-in, NoSQL less suited for relational finance data, pricing unpredictable at scale |
| **PlanetScale** | MySQL-based, Postgres ecosystem is stronger for Next.js |

### Framework Alternatives

| Technology | Why NOT for Tab |
|------------|-----------------|
| **Remix** | Good framework, but Next.js has stronger ecosystem, more resources, better Vercel integration |
| **Vite + React** | Loses SSR benefits, have to set up routing, no built-in API routes |
| **Create React App** | Deprecated. Do not use. |

### Auth Alternatives

| Technology | Why NOT for Tab |
|------------|-----------------|
| **Auth0** | Enterprise-focused, expensive for indie apps, complex setup |
| **Firebase Auth** | Ties you to Google ecosystem, less integrated with Postgres |
| **Custom JWT** | Security risk, reinventing solved problems |

---

## Complete Installation

```bash
# Create Next.js project
npx create-next-app@latest tab --typescript --tailwind --eslint --app --src-dir

cd tab

# Core dependencies
npm install @supabase/supabase-js @tanstack/react-query zustand

# UI components (shadcn/ui init)
npx shadcn@latest init

# Form handling
npm install react-hook-form zod @hookform/resolvers

# Charts
npm install recharts

# PWA
npm install @serwist/next

# Utilities
npm install date-fns clsx tailwind-merge lucide-react

# Dev dependencies
npm install -D @types/node
```

---

## Architecture Overview

```
tab/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes (login, signup)
│   │   ├── (dashboard)/        # Protected routes
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── ious/           # IOU management
│   │   │   ├── subscriptions/  # Subscription tracking
│   │   │   └── analytics/      # Charts & trends
│   │   ├── api/                # API routes (if needed beyond Supabase)
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   └── features/           # Feature-specific components
│   ├── lib/
│   │   ├── supabase/           # Supabase client setup
│   │   ├── hooks/              # Custom hooks
│   │   └── utils/              # Utilities (cn, formatCurrency, etc.)
│   ├── stores/                 # Zustand stores
│   └── types/                  # TypeScript types
├── public/
│   └── manifest.json           # PWA manifest
└── supabase/
    └── migrations/             # Database migrations
```

---

## Confidence Assessment

| Area | Confidence | Rationale |
|------|------------|-----------|
| Next.js 16 | HIGH | Verified version via npm, official docs confirm App Router maturity |
| Supabase | HIGH | Widely adopted, official Next.js examples, verified SDK version |
| shadcn/ui + Tailwind v4 | HIGH | Industry standard 2025, verified Tailwind v4 release |
| TanStack Query + Zustand | HIGH | Community consensus, verified versions, established patterns |
| Recharts | HIGH | Verified version, appropriate for Tab's charting needs |
| Prisma (alternative) | HIGH | Verified version, well-documented Supabase integration |
| Serwist | MEDIUM | Newer than next-pwa, but officially recommended by Next.js |

---

## Sources

### Official Documentation
- [Next.js Documentation](https://nextjs.org/docs) - Confirmed version 16.1.6
- [Tailwind CSS v4 Announcement](https://tailwindcss.com/blog/tailwindcss-v4)
- [Supabase Documentation](https://supabase.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Next.js PWA Guide](https://nextjs.org/docs/app/guides/progressive-web-apps)

### Ecosystem Research
- [What Next.js Tech Stack to Try in 2025](https://www.wisp.blog/blog/what-nextjs-tech-stack-to-try-in-2025-a-developers-guide-to-modern-web-development)
- [React UI Libraries in 2025](https://makersden.io/blog/react-ui-libs-2025-comparing-shadcn-radix-mantine-mui-chakra)
- [State Management in 2025](https://dev.to/saswatapal/do-you-need-state-management-in-2025-react-context-vs-zustand-vs-jotai-vs-redux-1ho)
- [Best React Chart Libraries 2025](https://blog.logrocket.com/best-react-chart-libraries-2025/)
- [Drizzle vs Prisma 2025](https://www.bytebase.com/blog/drizzle-vs-prisma/)
- [Supabase vs Neon Comparison](https://www.leanware.co/insights/supabase-vs-neon)
- [Authentication Guide for Next.js 2025](https://clerk.com/articles/complete-authentication-guide-for-nextjs-app-router)
- [Serwist - Next-PWA Successor](https://javascript.plainenglish.io/building-a-progressive-web-app-pwa-in-next-js-with-serwist-next-pwa-successor-94e05cb418d7)

### Version Verification
All versions verified via `npm view [package] version` on 2025-02-05.
