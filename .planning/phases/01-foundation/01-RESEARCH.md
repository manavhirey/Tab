# Phase 1: Foundation - Research

**Researched:** 2026-02-05
**Domain:** Next.js 16 + Supabase + shadcn/ui + Tailwind v4 Setup
**Confidence:** HIGH

## Summary

Phase 1 establishes the project infrastructure with a mobile-first UI shell. The research focuses on exact setup commands, configuration patterns, and implementation specifics for the decided stack (Next.js 16, Supabase, shadcn/ui, Tailwind v4).

The standard approach for this foundation phase is:
1. Create Next.js 16 project with App Router, TypeScript, and Tailwind v4
2. Initialize shadcn/ui for component system
3. Set up Supabase project and configure server-side auth
4. Build mobile layout shell with header and bottom navigation
5. Deploy to Vercel with proper environment configuration

**Primary recommendation:** Use `npx create-next-app@latest --yes` for defaults, then layer in Supabase SSR auth and shadcn/ui. Mobile layout uses App Router nested layouts with fixed bottom navigation.

## Standard Stack

The stack is already decided in project research. This section documents exact versions and setup.

### Core Framework

| Library | Version | Purpose | Setup Command |
|---------|---------|---------|---------------|
| Next.js | 16.x | Full-stack React framework | `npx create-next-app@latest --yes` |
| React | 19.x | UI library (bundled with Next.js 16) | Included |
| TypeScript | 5.x | Type safety | Default with `--yes` flag |
| Tailwind CSS | 4.x | Styling | Default with `--yes` flag |

### Backend Services

| Library | Version | Purpose | Setup Command |
|---------|---------|---------|---------------|
| @supabase/supabase-js | latest | Supabase client | `npm install @supabase/supabase-js` |
| @supabase/ssr | latest | Server-side auth | `npm install @supabase/ssr` |

### UI Components

| Library | Version | Purpose | Setup Command |
|---------|---------|---------|---------------|
| shadcn/ui | latest | Component system | `npx shadcn@latest init` |
| Lucide React | latest | Icons | Included with shadcn/ui |
| tw-animate-css | latest | Animations | Included with shadcn/ui |

### Utilities

| Library | Version | Purpose | Setup Command |
|---------|---------|---------|---------------|
| clsx | latest | Conditional classes | `npm install clsx` |
| tailwind-merge | latest | Merge Tailwind classes | `npm install tailwind-merge` |

**Complete Installation Sequence:**

```bash
# Step 1: Create Next.js project with defaults
npx create-next-app@latest tab --yes

cd tab

# Step 2: Install Supabase packages
npm install @supabase/supabase-js @supabase/ssr

# Step 3: Initialize shadcn/ui (handles clsx, tailwind-merge, lucide-react)
npx shadcn@latest init

# Step 4: Add base components
npx shadcn@latest add button card input dialog
```

## Architecture Patterns

### Recommended Project Structure

Based on Next.js 16 defaults with App Router and src directory:

```
tab/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout (html, body, providers)
│   │   ├── page.tsx              # Landing/home page
│   │   ├── globals.css           # Tailwind v4 + theme variables
│   │   ├── (auth)/               # Route group: public auth pages
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── layout.tsx        # Auth layout (no nav)
│   │   └── (app)/                # Route group: authenticated app
│   │       ├── layout.tsx        # App layout (with mobile nav)
│   │       ├── dashboard/page.tsx
│   │       └── ...
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── dialog.tsx
│   │   └── layout/               # Layout components
│   │       ├── header.tsx
│   │       ├── bottom-nav.tsx
│   │       └── mobile-shell.tsx
│   └── lib/
│       ├── supabase/
│       │   ├── client.ts         # Browser client
│       │   └── server.ts         # Server client
│       └── utils.ts              # cn() helper
├── middleware.ts                 # Supabase auth middleware
├── .env.local                    # Environment variables
├── next.config.ts                # Next.js config
├── components.json               # shadcn/ui config
└── package.json
```

### Pattern 1: Tailwind v4 CSS-First Configuration

**What:** Tailwind v4 uses CSS-first configuration instead of tailwind.config.js
**When to use:** Always in new projects with Tailwind v4

**globals.css structure:**

```css
@import "tailwindcss";
@import "tw-animate-css";

/* CSS Variables for shadcn/ui theming */
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(0 0% 3.9%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(0 0% 3.9%);
  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(0 0% 3.9%);
  --primary: hsl(0 0% 9%);
  --primary-foreground: hsl(0 0% 98%);
  --secondary: hsl(0 0% 96.1%);
  --secondary-foreground: hsl(0 0% 9%);
  --muted: hsl(0 0% 96.1%);
  --muted-foreground: hsl(0 0% 45.1%);
  --accent: hsl(0 0% 96.1%);
  --accent-foreground: hsl(0 0% 9%);
  --destructive: hsl(0 84.2% 60.2%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(0 0% 89.8%);
  --input: hsl(0 0% 89.8%);
  --ring: hsl(0 0% 3.9%);
  --radius: 0.5rem;
}

.dark {
  --background: hsl(0 0% 3.9%);
  --foreground: hsl(0 0% 98%);
  /* ... dark mode variables */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

### Pattern 2: Supabase SSR Client Setup

**What:** Create browser and server Supabase clients using @supabase/ssr
**When to use:** Always for auth in Next.js App Router

**Browser Client (lib/supabase/client.ts):**

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
```

**Server Client (lib/supabase/server.ts):**

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Can be ignored if middleware is refreshing tokens
          }
        },
      },
    }
  )
}
```

### Pattern 3: Auth Middleware

**What:** Middleware to refresh expired auth tokens and protect routes
**When to use:** Always with Supabase Auth in Next.js

**middleware.ts (project root or src/):**

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session (important for server components)
  const { data: { user } } = await supabase.auth.getUser()

  // Optional: Redirect unauthenticated users
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/register') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    request.nextUrl.pathname !== '/'
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### Pattern 4: Mobile-First Layout Shell

**What:** Fixed header + scrollable content + fixed bottom navigation
**When to use:** Mobile-first apps with tab navigation

**App Layout (app/(app)/layout.tsx):**

```typescript
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-auto pb-16">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
```

**Header Component (components/layout/header.tsx):**

```typescript
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <span className="font-semibold">Tab</span>
      </div>
    </header>
  )
}
```

**Bottom Navigation (components/layout/bottom-nav.tsx):**

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, CreditCard, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/ious', label: 'IOUs', icon: Users },
  { href: '/subscriptions', label: 'Subs', icon: CreditCard },
  { href: '/analytics', label: 'Stats', icon: BarChart3 },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 text-xs',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

### Anti-Patterns to Avoid

- **Using tailwind.config.js with Tailwind v4:** v4 uses CSS-first configuration with `@theme` directive
- **Using @supabase/auth-helpers-nextjs:** Deprecated. Use @supabase/ssr instead
- **Individual cookie methods (get, set, remove):** Use getAll() and setAll() only
- **Placing middleware in src/app:** Middleware must be at project root or src/ (not src/app/)
- **Hardcoding Supabase URLs:** Always use environment variables

## Don't Hand-Roll

Problems that have existing solutions in the stack:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation | Custom validation logic | Zod + React Hook Form | Type-safe, handles edge cases |
| Conditional classes | String concatenation | cn() from shadcn/ui | Handles conflicts properly |
| Modal/Dialog | Custom portal + backdrop | shadcn/ui Dialog | Accessibility, animations |
| Button variants | Custom classes per button | shadcn/ui Button | Consistent sizing, loading states |
| Auth session refresh | Manual token refresh | Supabase middleware | Handles edge cases |
| Route protection | Custom auth checks | Middleware pattern | Consistent, single source of truth |

**Key insight:** The shadcn/ui + Supabase combination handles most UI and auth concerns. Focus on business logic, not infrastructure.

## Common Pitfalls

### Pitfall 1: Supabase Client Mismatch

**What goes wrong:** Using wrong client in wrong context (browser client in server component, or vice versa)
**Why it happens:** Confusion between client.ts and server.ts utilities
**How to avoid:**
- Server Components, Server Actions, Route Handlers -> use `createClient()` from server.ts
- Client Components ('use client') -> use `createClient()` from client.ts
**Warning signs:** "Cannot read cookies" errors, auth state not persisting

### Pitfall 2: Middleware Path Conflicts

**What goes wrong:** Middleware blocks static assets or API routes
**Why it happens:** Matcher pattern too broad
**How to avoid:** Use the documented matcher that excludes static files:
```typescript
matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
```
**Warning signs:** Static images not loading, API routes blocked

### Pitfall 3: Tailwind v4 Configuration Confusion

**What goes wrong:** Trying to use tailwind.config.js patterns with v4
**Why it happens:** Outdated tutorials, habit from v3
**How to avoid:** All configuration in globals.css using @theme directive
**Warning signs:** Custom colors not working, "unknown at-rule" warnings

### Pitfall 4: shadcn/ui Component Import Paths

**What goes wrong:** Components not found after adding
**Why it happens:** Wrong import path or components.json misconfiguration
**How to avoid:** Check components.json for configured path (usually @/components/ui)
**Warning signs:** "Module not found" errors after `npx shadcn add`

### Pitfall 5: Mobile Layout Scroll Issues

**What goes wrong:** Content hidden behind fixed bottom nav, or double scrollbars
**Why it happens:** Not accounting for fixed element heights
**How to avoid:** Add `pb-16` (padding-bottom) to main content area
**Warning signs:** Last list item cut off, content unreachable

## Code Examples

### Complete Root Layout

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tab - Track IOUs & Subscriptions',
  description: 'Simple expense visibility for personal finance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

### Utils Helper (cn function)

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Environment Variables Template

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js | @theme in CSS | Tailwind v4 (2025) | All config in CSS |
| @tailwind directives | @import "tailwindcss" | Tailwind v4 | Single import |
| @supabase/auth-helpers-nextjs | @supabase/ssr | 2024 | Different API |
| Individual cookie methods | getAll/setAll | @supabase/ssr | Required pattern |
| forwardRef in components | Direct function + data-slot | shadcn/ui 2025 | React 19 compatible |
| tailwindcss-animate | tw-animate-css | shadcn/ui 2025 | Plugin deprecation |

**Deprecated/outdated:**
- @tailwind base/components/utilities directives - replaced by single @import
- tailwind.config.js theme configuration - replaced by @theme CSS block
- @supabase/auth-helpers-nextjs - fully replaced by @supabase/ssr

## Vercel Deployment

### Deployment Steps

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Deploy (automatic with every push)

### Environment Variables in Vercel

```bash
# Using Vercel CLI
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

### Production Checklist

- [ ] Environment variables set in Vercel dashboard
- [ ] Supabase project URL matches production (not local)
- [ ] Auth callback URLs configured in Supabase for production domain
- [ ] No localhost URLs in production env vars

## Open Questions

Things that couldn't be fully resolved:

1. **Supabase Publishable Key vs Anon Key**
   - What we know: Documentation mentions both `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `anon` key
   - What's unclear: Whether they are the same or different
   - Recommendation: Use the anon key from Supabase dashboard, naming it consistently

2. **shadcn/ui Tailwind v4 Full Compatibility**
   - What we know: CLI supports Tailwind v4 initialization
   - What's unclear: Whether all component variants work perfectly
   - Recommendation: Test each component after adding, watch for CSS issues

## Sources

### Primary (HIGH confidence)
- [Next.js Installation Documentation](https://nextjs.org/docs/app/getting-started/installation) - Project setup
- [shadcn/ui Next.js Installation](https://ui.shadcn.com/docs/installation/next) - Component setup
- [shadcn/ui Tailwind v4 Guide](https://ui.shadcn.com/docs/tailwind-v4) - v4 configuration
- [Supabase SSR Client Documentation](https://supabase.com/docs/guides/auth/server-side/creating-a-client) - Auth setup
- [Supabase Next.js Server-Side Auth](https://supabase.com/docs/guides/auth/server-side/nextjs) - Middleware pattern
- [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) - CSS-first configuration

### Secondary (MEDIUM confidence)
- [Next.js App Router Layouts](https://nextjs.org/docs/app/getting-started/layouts-and-pages) - Layout patterns
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables) - Deployment config
- [Next.js Project Structure Guide 2026](https://www.codebydeep.com/blog/next-js-folder-structure-best-practices-for-scalable-applications-2026-guide) - Folder organization

### Project-Level Research Referenced
- `.planning/research/STACK.md` - Technology decisions
- `.planning/research/ARCHITECTURE.md` - Folder structure, patterns
- `.planning/research/PITFALLS.md` - Domain-specific warnings

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Verified with official documentation
- Architecture patterns: HIGH - Based on official Next.js and Supabase docs
- Code examples: HIGH - Taken directly from official documentation
- Deployment: MEDIUM - Standard Vercel flow, no project-specific testing

**Research date:** 2026-02-05
**Valid until:** 2026-03-05 (30 days - stable stack)
