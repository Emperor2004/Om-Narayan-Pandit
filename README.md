# Om Narayan Pandit — Portfolio

A full-stack, production-grade personal portfolio built with **Next.js 14** + **TypeScript**. Features dynamic animations, a blog, admin panel, and contact form.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Email**: Resend API
- **Theme**: next-themes (Dark/Light toggle)
- **Deployment**: Vercel (free tier)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout + fonts + SEO metadata
│   ├── globals.css               # Global styles + CSS variables + animations
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   └── [slug]/page.tsx       # Individual blog post page
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard (login + CRUD)
│   └── api/
│       ├── contact/route.ts      # Contact form API (Resend email)
│       ├── projects/route.ts     # Projects CRUD API
│       ├── publications/route.ts # Publications CRUD API
│       └── blog/route.ts         # Blog posts CRUD API
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Responsive navbar + theme toggle
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx       # Animated hero + typewriter effect
│   │   ├── StatsBar.tsx          # Animated counters
│   │   ├── AboutSection.tsx      # Bio + skill tags
│   │   ├── ProjectsSection.tsx   # Project cards with mouse glow
│   │   ├── PublicationsSection.tsx
│   │   ├── BlogSection.tsx       # Blog post previews
│   │   ├── EducationSection.tsx  # Timeline + achievements grid
│   │   └── ContactSection.tsx    # Contact form
│   ├── ui/
│   │   ├── Button.tsx            # Button + LinkButton variants
│   │   ├── Badge.tsx             # Badge + TechPill
│   │   ├── SectionHeader.tsx     # Consistent section headers
│   │   └── Reveal.tsx            # Scroll-reveal animation wrapper
│   └── effects/
│       ├── NeuralCanvas.tsx      # Interactive particle/node canvas
│       ├── CustomCursor.tsx      # Custom cursor + trail effect
│       └── ScrollProgress.tsx    # Scroll progress bar at top
├── data/
│   └── index.ts                  # All content — projects, publications, blog, skills
├── hooks/
│   └── index.ts                  # useScrollReveal, useCounter, useCardMouseGlow, etc.
├── lib/
│   └── utils.ts                  # cn(), formatDate, statusConfig, etc.
└── types/
    └── index.ts                  # All TypeScript interfaces
```

## ⚡ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root of the project:

```dotenv
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
EMAIL_TO=your.email@gmail.com
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

**Getting your Resend API key:**
1. Sign up free at [resend.com](https://resend.com)
2. Dashboard → API Keys → Create Key
3. Paste it into `.env.local`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Admin Panel** → [http://localhost:3000/admin](http://localhost:3000/admin)

## ✏️ Customizing Your Content

All personal content lives in **`src/data/index.ts`**. Edit it directly:

| Export | What it controls |
|---|---|
| `projects[]` | Your project cards |
| `publications[]` | Research papers |
| `blogPosts[]` | Blog articles (Markdown supported) |
| `achievements[]` | Achievements grid |
| `timeline[]` | Education & experience |
| `skillCategories[]` | Skills cloud |
| `stats[]` | Hero stats numbers |

Or use the **Admin Panel** at `/admin` for live editing without touching code.

## 🌐 Deploying to Vercel

### Option A — Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option B — GitHub (recommended)
1. Push your project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → Import Project → Select your repo
3. Add environment variables in **Settings → Environment Variables**
4. Deploy ✅

**Environment variables to add in Vercel dashboard:**
```
RESEND_API_KEY
EMAIL_TO
ADMIN_PASSWORD
NEXT_PUBLIC_SITE_URL
```

## 🔐 Admin Panel

Access at `/admin` using your `ADMIN_PASSWORD`.

| Feature | Description |
|---|---|
| Projects | Add, edit, delete project cards |
| Publications | Manage research papers and status |
| Blog | Write, edit, publish/unpublish posts |

> **Note**: The API uses an in-memory store — data resets on server restart. For permanent persistence, replace the in-memory arrays in the API routes with a real database. Recommended: **Supabase** (free PostgreSQL) or **PlanetScale**.

## 📧 Contact Form

Powered by **Resend** (free tier: 100 emails/day).

- Sends a notification email to you when someone submits the form
- Sends an auto-reply to the person who contacted you

## 🎨 Customization Tips

- **Your info**: Edit `src/data/index.ts`
- **Colors**: Change CSS variables in `src/app/globals.css` under `:root`
- **Fonts**: Swap fonts in `src/app/layout.tsx` (uses `next/font/google`)
- **Sections**: Each section is a standalone component in `src/components/sections/`
- **Social links**: Update hrefs in `src/components/sections/ContactSection.tsx` and `src/components/layout/Footer.tsx`

---

Built with ☕ by **Om Narayan Pandit**