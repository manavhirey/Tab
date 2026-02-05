# Architecture Patterns

**Domain:** Personal finance / expense tracking (IOUs + subscriptions)
**Researched:** 2026-02-05
**Confidence:** HIGH (verified with official documentation)

## Recommended Architecture

Tab is a **mobile-first Next.js full-stack application** with a clean separation between data layer, business logic, and presentation. The architecture follows a **feature-driven modular structure** optimized for the Next.js App Router.

```
+------------------+     +------------------+     +------------------+
|   Presentation   |     |  Business Logic  |     |    Data Layer    |
|   (React + UI)   | --> |   (Services)     | --> |  (Prisma + DB)   |
+------------------+     +------------------+     +------------------+
        |                        |                        |
   Components              Use Cases              PostgreSQL
   Pages/Routes            Calculations           Schema/Models
   State (Zustand)         Validations            Migrations
   Charts (Recharts)       Transformations        Queries
```

### High-Level Component Diagram

```
                    +------------------------+
                    |      Next.js App       |
                    |    (App Router)        |
                    +------------------------+
                              |
        +---------------------+---------------------+
        |                     |                     |
+---------------+     +---------------+     +---------------+
|   Dashboard   |     |     IOUs      |     | Subscriptions |
|   Feature     |     |   Feature     |     |   Feature     |
+---------------+     +---------------+     +---------------+
        |                     |                     |
        +---------------------+---------------------+
                              |
                    +------------------------+
                    |    Shared Services     |
                    | - Auth (NextAuth)      |
                    | - Category Suggestion  |
                    | - Analytics Engine     |
                    +------------------------+
                              |
                    +------------------------+
                    |    Data Access Layer   |
                    |      (Prisma ORM)      |
                    +------------------------+
                              |
                    +------------------------+
                    |      PostgreSQL        |
                    +------------------------+
```

## Component Boundaries

| Component | Responsibility | Communicates With | Owns |
|-----------|---------------|-------------------|------|
| **Dashboard Feature** | Aggregates and displays burn rate, totals, charts | IOU Service, Subscription Service, Analytics | Dashboard pages, summary components |
| **IOU Feature** | Manages IOUs: create, edit, settle, remind | Database (Prisma), Notification Service | IOU pages, forms, list components |
| **Subscription Feature** | Tracks recurring expenses: CRUD, renewal dates | Database (Prisma), Category Service | Subscription pages, forms, renewal alerts |
| **Analytics Feature** | Computes trends, breakdowns, visualizations | IOU Service, Subscription Service | Chart components, analytics pages |
| **Auth Feature** | User registration, login, session management | NextAuth, Database | Auth pages, middleware |
| **Shared Services** | Cross-cutting: categories, notifications | All features | Utility functions, shared hooks |

## Folder Structure

Recommended structure following Next.js App Router best practices with feature-driven organization.

```
src/
├── app/                          # Next.js App Router (routing only)
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Landing/home page
│   ├── (auth)/                   # Route group: auth pages
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx            # Auth layout (no nav)
│   ├── (app)/                    # Route group: authenticated app
│   │   ├── layout.tsx            # App layout (with nav)
│   │   ├── dashboard/page.tsx
│   │   ├── ious/
│   │   │   ├── page.tsx          # IOU list
│   │   │   ├── new/page.tsx      # Create IOU
│   │   │   └── [id]/page.tsx     # IOU details
│   │   ├── subscriptions/
│   │   │   ├── page.tsx          # Subscription list
│   │   │   ├── new/page.tsx      # Add subscription
│   │   │   └── [id]/page.tsx     # Subscription details
│   │   └── analytics/page.tsx
│   └── api/                      # API routes
│       ├── auth/[...nextauth]/route.ts
│       ├── ious/route.ts
│       ├── ious/[id]/route.ts
│       ├── subscriptions/route.ts
│       └── analytics/route.ts
│
├── features/                     # Feature modules
│   ├── ious/
│   │   ├── components/           # IOU-specific components
│   │   │   ├── IouCard.tsx
│   │   │   ├── IouForm.tsx
│   │   │   ├── IouList.tsx
│   │   │   └── SettleModal.tsx
│   │   ├── hooks/
│   │   │   ├── useIous.ts        # TanStack Query hook
│   │   │   └── useSettlement.ts
│   │   ├── services/
│   │   │   └── iou.service.ts    # Business logic
│   │   └── types/
│   │       └── iou.types.ts
│   │
│   ├── subscriptions/
│   │   ├── components/
│   │   │   ├── SubscriptionCard.tsx
│   │   │   ├── SubscriptionForm.tsx
│   │   │   └── RenewalBadge.tsx
│   │   ├── hooks/
│   │   │   └── useSubscriptions.ts
│   │   ├── services/
│   │   │   └── subscription.service.ts
│   │   └── types/
│   │       └── subscription.types.ts
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── BurnRateCard.tsx
│   │   │   ├── SummaryStats.tsx
│   │   │   └── QuickActions.tsx
│   │   └── hooks/
│   │       └── useDashboardData.ts
│   │
│   ├── analytics/
│   │   ├── components/
│   │   │   ├── CategoryBreakdown.tsx
│   │   │   ├── TrendChart.tsx
│   │   │   └── TopExpenses.tsx
│   │   ├── hooks/
│   │   │   └── useAnalytics.ts
│   │   └── services/
│   │       └── analytics.service.ts
│   │
│   └── auth/
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   └── RegisterForm.tsx
│       └── hooks/
│           └── useAuth.ts
│
├── components/                   # Shared UI components
│   ├── ui/                       # Primitive components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/
│   │   ├── MobileNav.tsx
│   │   ├── Header.tsx
│   │   └── BottomNav.tsx
│   └── charts/
│       ├── PieChart.tsx
│       └── LineChart.tsx
│
├── lib/                          # Utilities and shared logic
│   ├── prisma.ts                 # Prisma client singleton
│   ├── auth.ts                   # NextAuth configuration
│   ├── utils.ts                  # General utilities
│   ├── api.ts                    # API client (fetch wrapper)
│   └── categories.ts             # Category suggestion logic
│
├── hooks/                        # Global hooks
│   └── useMediaQuery.ts
│
├── stores/                       # Zustand stores (client state)
│   ├── ui.store.ts               # Modals, toasts, UI state
│   └── filters.store.ts          # Active filters, sort preferences
│
├── types/                        # Shared TypeScript types
│   └── index.ts
│
└── styles/
    └── globals.css               # Tailwind + global styles

prisma/
├── schema.prisma                 # Database schema
└── migrations/                   # Database migrations
```

## Data Flow

### Read Flow (Dashboard Loading)

```
User opens Dashboard
        |
        v
+------------------+
| page.tsx (SSR)   |  Server component fetches initial data
+------------------+
        |
        v
+------------------+
| TanStack Query   |  useDashboardData() hook
| (useQuery)       |  - Caches response
+------------------+  - Auto-refetches on focus
        |
        v
+------------------+
| API Route        |  /api/analytics/dashboard
| (route.ts)       |  - Validates session
+------------------+  - Aggregates data
        |
        v
+------------------+
| Prisma Client    |  Queries PostgreSQL
+------------------+  - IOUs (grouped by status)
        |            - Subscriptions (with next renewal)
        v            - Analytics (burn rate calc)
+------------------+
|   PostgreSQL     |
+------------------+
```

### Write Flow (Add IOU)

```
User submits IOU form
        |
        v
+------------------+
| IouForm.tsx      |  React component
+------------------+  - Client-side validation (Zod)
        |            - Optimistic update
        v
+------------------+
| TanStack Query   |  useMutation()
| (useMutation)    |  - Handles loading state
+------------------+  - Rollback on error
        |
        v
+------------------+
| API Route        |  POST /api/ious
| (route.ts)       |  - Server validation
+------------------+  - Category suggestion
        |
        v
+------------------+
| iou.service.ts   |  Business logic
+------------------+  - Compute balances
        |            - Format data
        v
+------------------+
| Prisma Client    |  Insert to database
+------------------+
        |
        v
+------------------+
|   PostgreSQL     |
+------------------+
        |
        v
[Invalidate cache] --> Dashboard auto-refreshes
```

### State Management Strategy

```
+------------------------+     +------------------------+
|     Server State       |     |     Client State       |
|   (TanStack Query)     |     |      (Zustand)         |
+------------------------+     +------------------------+
| - IOUs list            |     | - Modal open/closed    |
| - Subscriptions list   |     | - Active filters       |
| - Analytics data       |     | - Sort preferences     |
| - User profile         |     | - Toast notifications  |
+------------------------+     +------------------------+
         |                              |
         |      Both consumed by        |
         +------------+-----------------+
                      |
                      v
              +---------------+
              |  React        |
              |  Components   |
              +---------------+
```

**Why this split:**
- **Server state (TanStack Query):** Data from API that needs caching, refetching, optimistic updates. This is ~80% of state in expense apps.
- **Client state (Zustand):** UI-only state that doesn't persist to server. Lightweight, no boilerplate.

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  passwordHash  String
  name          String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  ious          Iou[]          @relation("IouOwner")
  subscriptions Subscription[]
  categories    Category[]     // Custom user categories
}

model Iou {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation("IouOwner", fields: [userId], references: [id])

  personName  String    // Who owes/is owed
  amount      Decimal   @db.Decimal(10, 2)
  direction   Direction // OWED_TO_ME or I_OWE
  description String?
  category    String?

  status      IouStatus @default(PENDING)
  settledAt   DateTime?
  dueDate     DateTime?

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  reminders   Reminder[]

  @@index([userId, status])
  @@index([userId, direction])
}

enum Direction {
  OWED_TO_ME
  I_OWE
}

enum IouStatus {
  PENDING
  SETTLED
  CANCELLED
}

model Subscription {
  id            String          @id @default(cuid())
  userId        String
  user          User            @relation(fields: [userId], references: [id])

  name          String
  amount        Decimal         @db.Decimal(10, 2)
  cycle         BillingCycle    @default(MONTHLY)
  category      String?

  startDate     DateTime
  nextRenewal   DateTime        // Computed/updated on each cycle

  isActive      Boolean         @default(true)
  cancelledAt   DateTime?

  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  @@index([userId, isActive])
  @@index([userId, nextRenewal])
}

enum BillingCycle {
  WEEKLY
  MONTHLY
  QUARTERLY
  YEARLY
}

model Reminder {
  id        String   @id @default(cuid())
  iouId     String
  iou       Iou      @relation(fields: [iouId], references: [id], onDelete: Cascade)

  sendAt    DateTime
  sent      Boolean  @default(false)

  createdAt DateTime @default(now())
}

model Category {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  name      String
  color     String?  // For charts

  @@unique([userId, name])
}
```

## Patterns to Follow

### Pattern 1: Feature Module Structure

**What:** Group all code for a feature (components, hooks, services, types) in one directory.

**When:** Every feature. Always.

**Why:** Developers find all related code together. Adding a feature = adding a directory.

```typescript
// features/ious/hooks/useIous.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Iou, CreateIouInput } from '../types/iou.types';

export function useIous() {
  return useQuery({
    queryKey: ['ious'],
    queryFn: () => api.get<Iou[]>('/api/ious'),
  });
}

export function useCreateIou() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIouInput) => api.post('/api/ious', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ious'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
```

### Pattern 2: Prisma Client Singleton

**What:** Single Prisma instance to avoid connection exhaustion.

**When:** Always in Next.js.

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### Pattern 3: API Route with Validation

**What:** Validate input with Zod, handle errors consistently.

**When:** Every API route.

```typescript
// app/api/ious/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

const createIouSchema = z.object({
  personName: z.string().min(1).max(100),
  amount: z.number().positive(),
  direction: z.enum(['OWED_TO_ME', 'I_OWE']),
  description: z.string().max(500).optional(),
  category: z.string().max(50).optional(),
  dueDate: z.string().datetime().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = createIouSchema.parse(body);

    const iou = await prisma.iou.create({
      data: {
        ...data,
        userId: session.user.id,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });

    return NextResponse.json(iou, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

### Pattern 4: Optimistic Updates

**What:** Update UI immediately, rollback on error.

**When:** All mutations where UX matters (settling IOUs, adding items).

```typescript
// features/ious/hooks/useSettleIou.ts
export function useSettleIou() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (iouId: string) => api.post(`/api/ious/${iouId}/settle`),
    onMutate: async (iouId) => {
      await queryClient.cancelQueries({ queryKey: ['ious'] });

      const previous = queryClient.getQueryData(['ious']);

      queryClient.setQueryData(['ious'], (old: Iou[]) =>
        old.map(iou =>
          iou.id === iouId
            ? { ...iou, status: 'SETTLED', settledAt: new Date() }
            : iou
        )
      );

      return { previous };
    },
    onError: (err, iouId, context) => {
      queryClient.setQueryData(['ious'], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ious'] });
    },
  });
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Prisma in Client Components

**What:** Importing Prisma client in React components that run on client.

**Why bad:** Exposes database connection to browser. Security risk.

**Instead:** Always use Prisma only in:
- API routes (`app/api/**/route.ts`)
- Server components (with `'use server'` or in `page.tsx` without `'use client'`)
- Server actions

### Anti-Pattern 2: Prop Drilling Through Features

**What:** Passing data from Dashboard down through 5 levels of components.

**Why bad:** Couples components, hard to refactor.

**Instead:** Each feature fetches its own data via TanStack Query. Dashboard composes features, doesn't pass data.

```typescript
// BAD: Prop drilling
function Dashboard({ ious, subscriptions, analytics }) {
  return <IouSection ious={ious} />;
}

// GOOD: Feature fetches own data
function Dashboard() {
  return (
    <>
      <SummaryStats />  {/* Fetches own data */}
      <RecentIous />    {/* Fetches own data */}
      <UpcomingRenewals /> {/* Fetches own data */}
    </>
  );
}
```

### Anti-Pattern 3: Giant God Components

**What:** Single component handling form state, validation, API calls, and rendering.

**Why bad:** Impossible to test, hard to modify.

**Instead:** Separate concerns:
- Form component (presentation)
- Custom hook (state + mutations)
- Validation schema (Zod)

### Anti-Pattern 4: Business Logic in Components

**What:** Calculating burn rate, balance simplification inside React components.

**Why bad:** Can't unit test, duplicated across components.

**Instead:** Put in service files (`features/*/services/*.ts`), test independently.

```typescript
// features/analytics/services/analytics.service.ts
export function calculateMonthlyBurnRate(subscriptions: Subscription[]): number {
  return subscriptions
    .filter(s => s.isActive)
    .reduce((sum, s) => sum + normalizeToMonthly(s.amount, s.cycle), 0);
}

function normalizeToMonthly(amount: number, cycle: BillingCycle): number {
  switch (cycle) {
    case 'WEEKLY': return amount * 4.33;
    case 'MONTHLY': return amount;
    case 'QUARTERLY': return amount / 3;
    case 'YEARLY': return amount / 12;
  }
}
```

## Suggested Build Order

Based on component dependencies and the need for early validation:

### Phase 1: Foundation (Build First)

```
1. Project setup (Next.js, TypeScript, Tailwind)
2. Database setup (PostgreSQL, Prisma schema)
3. Auth feature (NextAuth with email/password)
4. Base UI components (Button, Card, Input, Modal)
5. Mobile layout (Header, BottomNav)
```

**Rationale:** Everything depends on these. Auth is needed to test user-scoped data. UI components needed by all features.

### Phase 2: Core Features (IOUs + Subscriptions)

```
6. IOU feature
   - List view
   - Create/edit form
   - Settle flow
   - (Reminders deferred to Phase 4)

7. Subscription feature
   - List view
   - Create/edit form
   - Renewal date display
```

**Rationale:** These are the two core data types. Build separately, they don't depend on each other. Both must work before dashboard aggregation.

### Phase 3: Dashboard + Basic Analytics

```
8. Dashboard feature
   - Burn rate card (depends on Subscriptions)
   - IOU balance summary (depends on IOUs)
   - Quick actions

9. Basic analytics
   - Category breakdown chart
   - Monthly totals
```

**Rationale:** Dashboard aggregates data from Phase 2. Analytics needs sufficient data to be meaningful.

### Phase 4: Enhancement Features

```
10. Smart category suggestions
11. IOU reminders
12. Month-over-month trends
13. Top expenses view
```

**Rationale:** Nice-to-haves that enhance but aren't core. Build after core is solid.

### Phase 5: Multi-User Preparation

```
14. Database schema for shared IOUs
15. Group/household concept
16. Settlement simplification algorithm
```

**Rationale:** Explicitly deferred per requirements ("single user initially but multi-user later").

## Dependency Graph

```
                    +---------------+
                    |   Foundation  |
                    | (Auth, DB,    |
                    |  UI, Layout)  |
                    +---------------+
                           |
           +---------------+---------------+
           |                               |
    +------v------+                 +------v------+
    |    IOUs     |                 | Subscriptions|
    |   Feature   |                 |   Feature    |
    +------+------+                 +------+------+
           |                               |
           +---------------+---------------+
                           |
                    +------v------+
                    |  Dashboard  |
                    |  (Aggregates)|
                    +------+------+
                           |
                    +------v------+
                    |  Analytics  |
                    | (Charts,    |
                    |  Trends)    |
                    +------+------+
                           |
                    +------v------+
                    | Enhancements|
                    | (Reminders, |
                    |  Categories)|
                    +------+------+
                           |
                    +------v------+
                    | Multi-User  |
                    | (Future)    |
                    +------+------+
```

## Scalability Considerations

| Concern | At 1 User (MVP) | At 100 Users | At 10K+ Users |
|---------|-----------------|--------------|---------------|
| **Database** | SQLite or Postgres | Postgres with connection pooling | Postgres + read replicas |
| **API** | Next.js API routes | Same (Vercel handles scaling) | Edge functions for read-heavy |
| **State** | TanStack Query | Same | Add Redis cache layer |
| **Analytics** | Compute on-demand | Cache aggregates | Pre-compute daily/weekly |
| **Images** | N/A initially | Vercel Image Optimization | CDN + optimization |

**Recommendation:** Start with Postgres from day one (via Neon, Supabase, or Vercel Postgres). SQLite limits future flexibility.

## Sources

**Official Documentation (HIGH confidence):**
- [Next.js App Router Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Prisma with Next.js Guide](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help)

**Architecture Patterns (MEDIUM confidence):**
- [System Design of Splitwise Backend](https://www.geeksforgeeks.org/system-design/system-design-of-backend-for-expense-sharing-apps-like-splitwise/)
- [Low-Level Design of Splitwise](https://medium.com/@interviewready/low-level-design-of-splitwise-f334c8f6ff77)
- [Next.js Architecture in 2026](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Next.js Folder Structure Best Practices 2026](https://www.codebydeep.com/blog/next-js-folder-structure-best-practices-for-scalable-applications-2026-guide)

**State Management (HIGH confidence):**
- [Zustand + React Query State Management](https://medium.com/@freeyeon96/zustand-react-query-new-state-management-7aad6090af56)
- [State Management in 2026](https://www.nucamp.co/blog/state-management-in-2026-redux-context-api-and-modern-patterns)
- [React Query as State Manager in Next.js](https://geekyants.com/blog/react-query-as-a-state-manager-in-nextjs-do-you-still-need-redux-or-zustand)

**Dashboard/Charts (MEDIUM confidence):**
- [ReactJS for Dashboards and Data Visualization](https://www.bacancytechnology.com/blog/reactjs-for-dashboards-and-data-visualization)
- [Best React Chart Libraries](https://www.usedatabrain.com/blog/react-chart-libraries)
