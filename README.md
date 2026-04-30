# شامنا (Shamna) — Syrian Classifieds Marketplace

> **"Our Damascus"** — A web and mobile classifieds platform for the Syrian market where users can post listings to sell items, advertise services, or list rentals.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Hosting & Infrastructure](#hosting--infrastructure)
- [Monorepo Structure](#monorepo-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database & Migrations](#database--migrations)
- [Key Architectural Decisions](#key-architectural-decisions)
- [Development Status](#development-status)
- [Roadmap](#roadmap)

---

## Project Overview

Shamna is a Sahibinden/Craigslist-style classifieds platform built specifically for the Syrian market. Core features include:

- Phone number + OTP authentication (no email required)
- Post, browse, and search listings across categories
- Category-specific listing attributes via JSONB
- Arabic-first design with full RTL layout
- Image uploads per listing
- Mobile app (React Native) planned for phase 2
- Business/advertiser login planned for a later phase

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| **Backend API** | Python + FastAPI | Chosen for long-term ML integration (recommendations, fraud detection, price suggestions) |
| **ORM** | SQLAlchemy | |
| **DB Migrations** | Alembic | Run via GitHub Actions |
| **Web Frontend** | Next.js 14 + Tailwind CSS | App Router, Arabic/RTL from day one |
| **UI Components** | shadcn/ui | Copy-paste components, no lock-in |
| **Mobile** | React Native + Expo | Phase 2 |
| **Primary Database** | PostgreSQL (Supabase) | Free tier during dev, session pooler for IPv4 compatibility |
| **Search** | Meilisearch | Arabic full-text search — planned |
| **Cache / Queue** | Redis + BullMQ | Planned |
| **Object Storage** | Cloudflare R2 | Listing photo storage — planned |
| **Auth** | Custom JWT + OTP (phone-based) | Short-lived access tokens (15 min) + refresh tokens in httpOnly cookies (30 days) |
| **Package Manager (API)** | uv | Fast Python package manager, manages virtualenv |
| **Font** | IBM Plex Sans Arabic | Arabic-first, clean for marketplace UI |

---

## Hosting & Infrastructure

| Service | Provider | Purpose | Notes |
|---|---|---|---|
| **Web Frontend** | Vercel | Next.js hosting | Auto-deploy from GitHub |
| **Backend API** | Railway | FastAPI server | Migrate to Hetzner pre-launch |
| **Database** | Supabase | PostgreSQL | Use Session Pooler URL (IPv4 compatible). Free tier pauses after 1 week inactivity |
| **DNS / CDN** | Cloudflare | CDN + DNS management | Planned |
| **Image Storage** | Cloudflare R2 | Listing photos | Planned |
| **Search** | Meilisearch | To be hosted on Hetzner | Planned |

### Pre-launch migration plan
Before launch, migrate Railway → **Hetzner Cloud + Coolify** for full control and lower cost. Meilisearch and Redis will also be self-hosted there.

---

## Monorepo Structure

```
shamna/
├── apps/
│   ├── api/                  ← FastAPI backend
│   │   ├── alembic/          ← DB migrations
│   │   │   └── versions/
│   │   ├── app/
│   │   │   ├── core/         ← config, security (JWT)
│   │   │   ├── db/           ← SQLAlchemy session + base
│   │   │   ├── models/       ← SQLAlchemy models
│   │   │   ├── routers/      ← FastAPI route handlers
│   │   │   └── main.py       ← FastAPI app entry point
│   │   ├── alembic.ini
│   │   ├── Procfile          ← Railway start command
│   │   └── pyproject.toml    ← Python dependencies (managed by uv)
│   ├── web/                  ← Next.js frontend
│   │   ├── app/              ← App Router pages
│   │   │   ├── auth/         ← OTP login flow
│   │   │   ├── category/     ← Category listing pages
│   │   │   ├── listing/      ← Listing detail pages
│   │   │   └── post/         ← Multi-step post an ad form
│   │   ├── components/       ← Shared UI components
│   │   │   ├── post/         ← Post form step components
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── category-grid.tsx
│   │   │   ├── listing-card.tsx
│   │   │   ├── listing-list-card.tsx
│   │   │   ├── listing-gallery.tsx
│   │   │   ├── category-filters.tsx
│   │   │   ├── view-toggle.tsx
│   │   │   ├── phone-reveal.tsx
│   │   │   └── report-button.tsx
│   │   ├── lib/
│   │   │   └── api.ts        ← Central apiFetch helper
│   │   └── middleware.ts     ← Auth route protection
│   └── mobile/               ← React Native (stub, phase 2)
├── .github/
│   └── workflows/
│       └── migrate.yml       ← GitHub Action: runs Alembic migrations
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.13+
- `uv` (Python package manager)
- Railway CLI (`brew install railway`)

### Web Frontend

```bash
cd apps/web
npm install
npm run dev
# runs on http://localhost:3000
```

### Backend API

```bash
cd apps/api
uv sync                        # install dependencies into .venv
uv run uvicorn app.main:app --reload
# runs on http://localhost:8000
```

---

## Environment Variables

### `apps/api/.env`

```env
DATABASE_URL=postgresql://postgres.xxxx:PASSWORD@aws-1-eu-west-3.pooler.supabase.com:5432/postgres?sslmode=require
JWT_SECRET=your-generated-secret      # generate with: openssl rand -hex 32
OTP_DEV_BYPASS=1234                   # dev only — always accepts this code
```

### `apps/web/.env.local`

```env
NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app
```

### Railway (FastAPI service environment variables)

```
DATABASE_URL    → Supabase session pooler URL
JWT_SECRET      → same as above
OTP_DEV_BYPASS  → 1234 (remove before launch)
```

### GitHub Secrets (for migrations CI)

```
DATABASE_URL    → Supabase session pooler URL
```

> ⚠️ Never commit `.env` or `.env.local` to the repo. Both are in `.gitignore`.

---

## Database & Migrations

Database is hosted on **Supabase PostgreSQL**. Migrations are managed with **Alembic**.

### Running migrations locally

```bash
cd apps/api
uv run alembic upgrade head
```

### Creating a new migration

```bash
cd apps/api
uv run alembic revision -m "describe your change"
# then fill in upgrade() and downgrade() in the generated file
# then run: uv run alembic upgrade head
```

### CI migrations

Migrations also run automatically via GitHub Actions (`.github/workflows/migrate.yml`). Trigger manually from the **Actions** tab in GitHub when needed.

### Current tables

| Table | Description |
|---|---|
| `users` | Registered users (phone-based) |
| `otp_codes` | OTP codes for phone verification |
| `listings` | Classifieds listings — planned |

---

## Key Architectural Decisions

**Arabic-first:** `lang="ar"` and `dir="rtl"` set on the root HTML element. IBM Plex Sans Arabic as the primary font. All UI copy is in Arabic.

**Phone OTP auth:** No email/password. Users authenticate with Syrian phone numbers (+963). JWT access tokens (15 min) + refresh tokens in httpOnly cookies (30 days).

**JSONB for listing attributes:** Category-specific fields (e.g. car mileage, apartment size) stored in a PostgreSQL JSONB column rather than separate tables per category. Flexible from day one.

**`uv` for Python deps:** All Python packages managed exclusively through `uv`. Never use `pip install` directly in this project — use `uv add` instead.

**URL-based filters:** Category page filters (city, condition, price, sort) are stored in URL query params, making filtered views shareable and bookmarkable.

**Mock data pattern:** Frontend pages are built with `MOCK_*` constants at the top of each file. Replacing with real API calls is a single swap — `MOCK_LISTINGS` → `await apiFetch('/listings')`.

---

## Development Status

| Area | Status |
|---|---|
| Monorepo structure | ✅ Done |
| FastAPI skeleton + Railway deploy | ✅ Done |
| Supabase PostgreSQL connected | ✅ Done |
| Alembic migrations (users, otp_codes) | ✅ Done |
| OTP auth endpoints | ✅ Done |
| JWT access + refresh tokens | ✅ Done |
| Next.js app + Vercel deploy | ✅ Done |
| Arabic/RTL layout + font | ✅ Done |
| Navbar + footer shell | ✅ Done |
| Homepage (hero + categories + listings) | ✅ Done (mock data) |
| Category page + filters + view toggle | ✅ Done (mock data) |
| Listing detail page | ✅ Done (mock data) |
| Post an ad form (multi-step wizard) | ✅ Done (submit not wired) |
| Auth middleware (protected routes) | ✅ Done |
| Frontend auth flow (OTP UI) | ✅ Done + tested |
| Listings API endpoints | 🔄 Next |
| Image upload (Cloudflare R2) | ⏳ Planned |
| Wire frontend to real listings API | ⏳ Planned |
| User profile page | ⏳ Planned |
| Meilisearch integration | ⏳ Planned |
| Redis + BullMQ | ⏳ Planned |
| React Native mobile app | ⏳ Phase 2 |
| Image moderation pipeline | ⏳ Pre-launch |
| Business/advertiser login | ⏳ Later phase |

---

## Roadmap

### Phase 1 — Dev / Skeleton (current)
- [x] Auth flow
- [ ] Listings CRUD
- [ ] Image uploads
- [ ] Search

### Phase 2 — Pre-launch
- [ ] Migrate Railway → Hetzner + Coolify
- [ ] Self-host Meilisearch + Redis
- [ ] Image moderation pipeline
- [ ] Mobile app (React Native + Expo)

### Phase 3 — Launch & Growth
- [ ] Business/advertiser accounts
- [ ] ML features: recommendations, price suggestions, fraud detection
- [ ] Analytics dashboard