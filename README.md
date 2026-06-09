# Sarwagyna School

> **Learn what your college forgot to teach you.**

The official web platform for [Sarwagyna School](https://school.sarwagyna.com) — an Indian edu-community offering free and low-cost sessions on startup reality, investment fundamentals, AI tools, and career readiness. Taught by founders and practitioners.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Database | Supabase (PostgreSQL + Storage) |
| Styling | Tailwind CSS — warm-cream design system |
| Auth | `jose` JWT (HS256, 7-day cookie) |
| Deployment | Vercel |

---

## Project Structure

```
app/
├── (public)/          # Public-facing pages
│   ├── page.tsx       # Home
│   ├── events/        # Events list + detail
│   ├── speakers/      # Speaker profiles
│   ├── community/     # Community page
│   ├── feedbacks/     # Student feedbacks + submit form
│   ├── partners/      # Partners
│   ├── about/         # About page
│   ├── contact/       # Contact form
│   └── verify/        # Certificate verification
├── (admin)/admin/     # Protected CMS
│   ├── events/        # Event management (CRUD)
│   ├── speakers/      # Speaker management
│   ├── certificates/  # Certificate issuance
│   ├── partners/      # Partner management
│   ├── community/     # Testimonial management
│   ├── contact/       # Contact submissions
│   ├── feedbacks/     # Feedback moderation (approve/feature)
│   ├── about/         # About page editor
│   └── settings/      # Site settings
└── (admin)/login/     # Admin login

components/
├── public/            # Public UI components
├── admin/             # Admin UI components
└── ui/                # Shared primitives (Button, Input, Toast…)

lib/
├── actions/           # Server actions (mutations per domain)
├── data/              # Read queries (public.ts, feedbacks.ts…)
├── supabase/          # client.ts (anon) + server.ts (service role)
└── auth.ts            # Session management
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_JWT_SECRET=your-secret-min-32-chars
```

### 3. Run database migrations

Open the Supabase SQL Editor and run the schema files in order. Key tables:

- `events`, `speakers`, `event_speakers`
- `partners`, `partner_applications`
- `certificates`
- `testimonials`
- `contact_submissions`
- `site_settings`
- `admin_users`
- `feedbacks`

### 4. Create an admin user

Insert a hashed password into `admin_users` directly in Supabase, or use the setup script if provided.

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site and [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

---

## Key Conventions

**Data fetching** — All public reads live in `lib/data/`. Server components call these directly. Mutations go through server actions in `lib/actions/`.

**Admin auth** — Middleware at `middleware.ts` verifies a JWT cookie (`admin_session`) on every `/admin/*` request. Login is at `/login`.

**Design system** — Tailwind tokens defined in `tailwind.config.ts` and `globals.css`. Core tokens: `--canvas` (warm cream `#fffefb`), `--ink` (coffee `#201515`), `--primary` (orange `#ff4f00`). Use `bg-canvas-soft`, `text-body`, `text-ink`, `rounded-pill`, `card`, `card-dark`, `eyebrow` utility classes.

**Image storage** — Supabase Storage bucket `school-assets`. Upload via `uploadFile()` in `lib/utils.ts`.

**ISR** — Public pages export `export const revalidate = 60` (or 120 for feedbacks). The admin layout sets `export const dynamic = 'force-dynamic'`.

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

## License

Proprietary — see [LICENSE](./LICENSE).  
Copyright © 2024–2025 Sarwagyna Private Limited. All rights reserved.
