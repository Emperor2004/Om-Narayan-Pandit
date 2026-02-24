# Om Narayan Pandit — Portfolio

A full-stack, production-grade personal portfolio built with **Next.js 14** + **TypeScript**. Features dynamic animations, a blog, admin panel, and contact form.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: CSS + Custom Hooks (Framer Motion ready)
- **Email**: Nodemailer (Gmail)
- **Theme**: next-themes (Dark/Light toggle)
- **Deployment**: Vercel (free tier)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout + fonts + theme
│   ├── globals.css               # Global styles + CSS variables
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Blog post detail
│   ├── admin/
│   │   └── page.tsx              # Admin panel (login + CRUD)
│   └── api/
│       ├── contact/route.ts      # Contact form email API
│       ├── projects/route.ts     # Projects CRUD API
│       ├── publications/route.ts # Publications CRUD API
│       └── blog/route.ts         # Blog posts CRUD API
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Responsive nav + theme toggle
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx       # Animated hero + typewriter
│   │   ├── StatsBar.tsx          # Animated counters
│   │   ├── AboutSection.tsx      # Bio + skill tags
│   │   ├── ProjectsSection.tsx   # Project cards with glow
│   │   ├── PublicationsSection.tsx
│   │   ├── BlogSection.tsx       # Blog post previews
│   │   ├── EducationSection.tsx  # Timeline + achievements
│   │   └── ContactSection.tsx    # Contact form
│   ├── ui/
│   │   ├── Button.tsx            # Button + LinkButton
│   │   ├── Badge.tsx             # Badge + TechPill
│   │   ├── SectionHeader.tsx     # Consistent section headers
│   │   └── Reveal.tsx            # Scroll-reveal wrapper
│   └── effects/
│       ├── NeuralCanvas.tsx      # Particle/node canvas
│       ├── CustomCursor.tsx      # Custom cursor + trail
│       └── ScrollProgress.tsx    # Scroll progress bar
├── data/
│   └── index.ts                  # All content (projects, pubs, blog, etc.)
├── hooks/
│   └── index.ts                  # useScrollReveal, useCounter, etc.
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

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
EMAIL_FROM=your.gmail@gmail.com
EMAIL_TO=your.gmail@gmail.com
EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   # Gmail App Password
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=random_32_char_string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Getting a Gmail App Password:**
1. Go to myaccount.google.com → Security → 2-Step Verification
2. Scroll down → App passwords → Generate one for "Mail"

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📝 Customizing Content

All your personal content is in **`src/data/index.ts`**:
- `projects[]` — Edit/add your projects
- `publications[]` — Add your papers
- `blogPosts[]` — Write blog posts (Markdown supported)
- `achievements[]` — Update your achievements
- `timeline[]` — Edit your education/experience
- `stats[]` — Update stats numbers

Or use the **Admin Panel** at `/admin` for live editing.

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or just push to GitHub and connect at vercel.com
```

**Add Environment Variables in Vercel Dashboard:**
Settings → Environment Variables → Add all keys from `.env.local`

### Custom Domain (Free)
Vercel provides `your-project.vercel.app` for free.
For a custom domain, add it in Vercel Dashboard → Domains.

## 🔐 Admin Panel

Access at `/admin` with your `ADMIN_PASSWORD`.

Features:
- ✅ Add/Edit/Delete Projects
- ✅ Add/Edit/Delete Publications
- ✅ Write/Edit/Delete Blog Posts (Markdown)
- ✅ Toggle post published/draft status

> **Note**: The in-memory store resets on server restart. For production persistence, replace the API routes' in-memory arrays with a real database. Recommended: **Supabase** (free PostgreSQL) or **Prisma + SQLite**.

## 🎨 Customization

- **Colors**: Edit CSS variables in `globals.css` (`:root`)
- **Fonts**: Change in `app/layout.tsx` (next/font/google)
- **Animations**: Modify `tailwind.config.ts` keyframes
- **Sections**: Each section is a standalone component in `src/components/sections/`

## 📧 Contact Form

Uses **Nodemailer + Gmail**. Sends:
1. Email to you with the message
2. Auto-reply to the sender

For production, consider **Resend** or **SendGrid** for better deliverability.

---

Built with ☕ by **Om Narayan Pandit**
