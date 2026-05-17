# Om Narayan Pandit — AI/ML Engineer Portfolio

A stunning, production-grade personal portfolio built with **Next.js 14**, **TypeScript**, **Three.js**, and **React Three Fiber**. Features immersive 3D visualizations, dynamic animations, a blog, admin panel, and secure contact form — designed to impress recruiters and showcase AI/ML expertise.

## ✨ Features

- **Immersive 3D Experiences**: 
  - Interactive 3D name with depth effects and professional typography
  - Translucent animated background with floating elements
  - Dynamic text animations and smooth transitions
- **Advanced Hero Section**:
  - 3D name elevation effects without rotation
  - Playwrite Australia NSW font for elegant supporting text
  - Perfect screen centering and responsive design
  - Clean button interactions without mouse effects
- **Full-Stack Functionality**:
  - Secure contact form with Resend (email notifications & auto-replies)
  - Admin panel for content management (CRUD operations)
  - Blog with Markdown support
  - Dark/light theme toggle with next-themes
- **Modern Tech Stack**:
  - Next.js 14 (App Router) with TypeScript
  - Tailwind CSS + CSS Variables for styling
  - Framer Motion for smooth animations
  - Lucide icons for beautiful SVG icons
- **SEO Optimized**: Proper metadata, open graph tags, and semantic structure
- **Performance Optimized**: 60fps animations, optimized builds (724 kB)
- **Deployable**: Production-ready with zero build errors)

## 🎯 Portfolio Sections

### Hero Section
- **3D Name**: Professional depth effects without rotation
- **Typography**: Playwrite Australia NSW for supporting text
- **Animations**: Smooth translucent background effects
- **Centering**: Perfect screen alignment
- **Interactions**: Clean button hover effects

### Projects Section
- **6 AI/ML Projects**: Real-world applications
- **Project Cards**: Detailed descriptions and technologies
- **Categories**: Computer Vision, Deep Learning, Reinforcement Learning
- **Status**: All projects visible and functional

### Additional Sections
- **About**: Professional bio with skill highlights
- **Stats**: Animated achievement counters
- **Publications**: Research papers and academic work
- **Blog**: Technical articles and insights
- **Education**: Academic background and timeline
- **Contact**: Professional contact form

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **3D Graphics**: 
  - @react-three/fiber & @react-three/drei
  - Three.js
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion + CSS
- **Email**: Resend API
- **Theme**: next-themes (Dark/Light toggle)
- **Icons**: Lucide React
- **Deployment**: Vercel (free tier)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage with 3D Hero
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
│   │   ├── HeroSection.tsx       # 3D AI Brain + typewriter effect
│   │   ├── StatsBar.tsx          # Animated counters
│   │   ├── AboutSection.tsx      # Bio + 3D Skill Constellation
│   │   ├── ProjectsSection.tsx   # Project cards with 3D previews
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
│       ├── NeuralCanvas.tsx      # Interactive particle/node canvas (optimized)
│       ├── CustomCursor.tsx      # Custom cursor + trail effect (optimized)
│       ├── ScrollProgress.tsx    # Scroll progress bar at top (optimized)
│       ├── AIBrain.tsx           # 3D AI Brain visualization
│       ├── SkillConstellation.tsx # 3D Skill orbital visualization
│       └── ProjectShowcase.tsx   # 3D project preview component
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
| `projects[]` | Your project cards (with 3D previews) |
| `publications[]` | Research papers |
| `blogPosts[]` | Blog articles (Markdown supported) |
| `achievements[]` | Achievements grid |
| `timeline[]` | Education & experience |
| `skillCategories[]` | Skills cloud (used in 3D visualizations) |
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
| Projects | Add, edit, delete project cards (with 3D preview configuration) |
| Publications | Manage research papers and status |
| Blog | Write, edit, publish/unpublish posts |

> **Note**: The API uses an in-memory store — data resets on server restart. For permanent persistence, replace the in-memory arrays in the API routes with a real database. Recommended: **Supabase** (free PostgreSQL) or **PlanetScale**.

## 📧 Contact Form

Powered by **Resend** (free tier: 100 emails/day).

- Sends a notification email to you when someone submits the form
- Sends an auto-reply to the person who contacted you
- Includes input sanitization to prevent XSS attacks

## 🎨 Customization Tips

- **Your info**: Edit `src/data/index.ts`
- **Colors**: Change CSS variables in `src/app/globals.css` under `:root`
- **Fonts**: Swap fonts in `src/app/layout.tsx` (uses `next/font/google`)
- **Sections**: Each section is a standalone component in `src/components/sections/`
- **Social links**: Update hrefs in `src/components/sections/ContactSection.tsx` and `src/components/layout/Footer.tsx`
- **3D Effects**: Adjust parameters in `/src/components/effects/` files (AIBrain, SkillConstellation, ProjectShowcase) to customize visualizations

## 💡 Development Notes

### Performance Optimizations
- All 3D components load client-side only to prevent SSR errors
- NeuralCanvas: Reduced from 100 to 30 particles with visibility tracking
- CustomCursor: Throttled to 100ms updates with event delegation
- ScrollProgress: Throttled to 100ms updates with requestAnimationFrame
- Proper cleanup of event listeners and animations in all effects

### 3D Implementation Details
- Uses @react-three/fiber for React integration with Three.js
- @react-three/drei for helpful abstractions (OrbitControls, etc.)
- Skill-based visualizations extract proficiency from skillCategories
- Color coding by domain for instant visual recognition
- Interactive elements respond to user input (hover, click, scroll)

## 📱 Responsive Design
- Fully responsive across all device sizes
- 3D visualizations gracefully degrade on low-power devices
- Touch-friendly interactions where applicable
- Optimized for both dark and light themes

---

Built with ☕ by **Om Narayan Pandit** — showcasing AI/ML expertise through cutting-edge web technologies.