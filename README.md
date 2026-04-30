<p align="center">
  <strong>◆ NOVA ASTRO</strong><br>
  <em>Space Tourism Agency — Web Platform</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?logo=python" alt="Python" />
</p>

---

## About

**Nova Astro** is a fullstack web platform for a fictional space tourism agency. Users can browse a catalog of space expeditions, view mission specifications, explore the fleet and crew training program, and book a seat — all through a responsive interface backed by a REST API.

**Built for:** *Digital Wind* web development competition (Цифровой ветер)
**Purpose:** Portfolio project for university applications

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 (App Router) | SSR, file-based routing, built-in API proxy, font optimization, standalone builds |
| **UI** | React 19 + TypeScript | Component architecture, type safety, IDE autocompletion |
| **Styling** | Tailwind CSS 4 | Utility-first, purged production CSS, design consistency |
| **Animations** | Framer Motion | Declarative animations, `AnimatePresence` for mount/unmount transitions, `whileInView` for scroll |
| **UI Primitives** | shadcn/ui + @base-ui/react | Accessible headless components (Button, Badge, Dialog) with CVA variants |
| **Backend** | FastAPI (Python 3.11) | Async ASGI, Pydantic validation, auto-generated OpenAPI docs |
| **Validation** | Pydantic v2 | 13 data models with type checking, range constraints, email validation |
| **Server** | Uvicorn | ASGI server with hot reload |
| **Package Manager** | Poetry | Deterministic builds via `poetry.lock`, PEP 621 compliant |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND  (Next.js)                      │
│                                                             │
│  page.tsx ──→ Preloader                                     │
│           ──→ Navbar                                        │
│           ──→ Hero ──────→ fetchStats()  ──┐                │
│           ──→ Tours ─────→ fetchTours()  ──┤  lib/api.ts    │
│           ──→ Fleet                        │  request<T>()  │
│           ──→ Training                     │                │
│           ──→ About                        │                │
│           ──→ Footer                       │                │
│           ──→ BookingModal → createBooking()                │
└────────────────────────────────────────────┼────────────────┘
                                             │
                       /api/v1/*  (proxy via next.config.ts)
                                             │
┌────────────────────────────────────────────▼────────────────┐
│                    BACKEND  (FastAPI)                        │
│                                                              │
│  main.py ────→ services.py ────→ storage.py                  │
│  (routes)      (business logic)   (in-memory data)           │
│       │                                                      │
│       └──→ schemas.py (Pydantic models)                      │
└──────────────────────────────────────────────────────────────┘
```

### Backend — Three-Layer Architecture

| Layer | File | Responsibility |
|-------|------|---------------|
| **Routing** | `main.py` | HTTP endpoints, CORS, error handlers |
| **Business Logic** | `app/services.py` | Tour filtering, booking management, route builder (greedy algorithm) |
| **Storage** | `app/storage.py` | In-memory dictionaries (`TOURS`, `BOOKINGS`, `ROUTE_MODULES`) |

### Frontend — 9 Components

| Component | Role |
|-----------|------|
| `Preloader` | Loading animation (SVG ring, progress bar, status lines) |
| `Navbar` | Navigation with scroll effect, mobile burger menu |
| `Hero` | HUD panel with live API data, SVG trajectory diagram, news ticker |
| `Tours` | Mission catalog with API data, launch countdown, seat status |
| `Fleet` | 4 vessels with SVG blueprints, floating animation |
| `Training` | 4 training phases with descriptions and durations |
| `About` | Agency info, statistics, SVG operations topology |
| `Footer` | Contacts, uptime timer, coordinates |
| `BookingModal` | Spec view / booking form → `POST /api/v1/bookings` |

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/v1/tours` | List tours (filters: price, duration, difficulty, search) |
| `GET` | `/api/v1/tours/{id}` | Single tour |
| `POST` | `/api/v1/routes/custom` | Generate custom route (greedy algorithm) |
| `POST` | `/api/v1/bookings` | Create booking (validates seats, email, count) |
| `GET` | `/api/v1/bookings` | List bookings |
| `GET` | `/api/v1/bookings/{id}` | Single booking |
| `PATCH` | `/api/v1/bookings/{id}/status` | Update booking status |
| `POST` | `/api/v1/bookings/{id}/cancel` | Cancel booking (idempotent, restores seats) |
| `GET` | `/api/v1/stats` | Aggregated agency statistics |

All errors follow a unified format: `{ "error": { "code", "message", "details" } }`

Interactive API docs available at `http://localhost:8000/docs` (Swagger UI).

---

## Design System

**Visual style:** Mission Control HUD — dark theme with angular markers, monospace data readouts, glowing accents.

| Token | Value | Purpose |
|-------|-------|---------|
| `--void` | `#05070d` | Primary background |
| `--panel` | `#0d1424` | Card/panel background |
| `--accent` | `oklch(0.70 0.18 295)` | Accent violet |
| `--ink` | `#e7ecf5` | Primary text |
| `--ink-dim` | `#8b97b3` | Secondary text |

**Typography:** Space Grotesk (headings) → Inter (body) → JetBrains Mono (HUD/technical data)

**Animations (12):** pulse-dot, ticker, orbit-spin, preloader-rotate, scanline, twinkle, glow-breathe, float-y, section-scan, count-reveal, hover-lift, preloader-scanline

**All diagrams** (trajectories, vessel blueprints, ops topology) are hand-crafted inline SVGs styled with project CSS variables — no charting libraries.

---

## Responsive Design

- **Desktop** (`md:+`): multi-column grids (3–4 cols), full navbar, trajectory diagram
- **Mobile** (`<768px`): single column, burger menu with `AnimatePresence`, trajectory hidden
- **Fluid typography:** `clamp(44px, 6.8vw, 96px)` for headings
- **Graceful degradation:** site renders with static fallback data when backend is unavailable

---

## Project Structure

```
├── main.py                    # FastAPI entry point, routes, CORS, error handling
├── app/
│   ├── schemas.py             # Pydantic models (Tour, Booking, AgencyStats, etc.)
│   ├── services.py            # Business logic (filtering, booking, route builder)
│   └── storage.py             # In-memory data store
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout, fonts, global CSS
│   ├── page.tsx               # Main page, preloader → sections → modal
│   └── globals.css            # Design tokens, animations, Tailwind
├── components/
│   ├── nova/                  # 9 business components
│   └── ui/                    # shadcn/ui primitives (Button, Badge, Dialog)
├── lib/
│   ├── api.ts                 # API client (fetchTours, fetchStats, createBooking)
│   └── utils.ts               # cn() = clsx + tailwind-merge
├── next.config.ts             # Standalone build, API proxy rewrites
├── pyproject.toml             # Poetry dependencies
├── package.json               # npm dependencies
└── Procfile                   # PaaS deployment command
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+

### Backend

```bash
pip install fastapi uvicorn pydantic[email]
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The frontend proxies `/api/*` requests to the backend via `next.config.ts` rewrites.

---

## Key Engineering Decisions

| Decision | Rationale |
|----------|-----------|
| **FastAPI over Flask/Django** | Async, built-in validation, auto Swagger; Django's ORM/admin unnecessary |
| **In-memory storage** | No external dependencies for a competition project; replaceable by swapping `storage.py` |
| **Lifting State Up** | `bookingTarget` in root `page.tsx` — no Redux/Zustand needed for a single-page app |
| **Inline SVG** | Scalable, styled with CSS vars, no D3/Chart.js dependency |
| **Greedy algorithm** for route builder | 6 modules — simple and sufficient vs dynamic programming overhead |
| **`oklch()` colors** | Perceptually uniform — same lightness across violet, gold, and red accents |
| **Standalone build** | `output: "standalone"` reduces deploy size from ~200 MB to ~30 MB |
| **Unified error format** | Three global handlers ensure frontend always gets `error.message` |

---

## Authors

| Contributor         | Role                                            | GitHub                                       |
| ---------------------| -------------------------------------------------| ----------------------------------------------|
| **Saveliy Golubev** | Backend (FastAPI, Pydantic, API design)         | [@NovaCode37](https://github.com/NovaCode37) |
| **XenonZeon**       | Frontend (Next.js, React, Tailwind, animations) | [@XenonZeon](https://github.com/XenonZeon)   |

Competition: **Цифровой ветер** — Web Development category
