# Om Narayan Pandit Portfolio

A personal AI/ML portfolio built with Next.js 14, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Framer Motion, and Resend.

## Features

- Immersive portfolio homepage with hero, stats, about, projects, research, blog, education, and contact sections
- 3D and motion effects through Three.js, React Three Fiber, and Framer Motion
- Dark/light theme toggle with `next-themes`
- Project, publication, blog, skills, achievement, timeline, and stats content sourced from `src/data/index.ts`
- Dedicated blog listing page at `/blog`
- Contact form with validation, rate limiting, input sanitization, Resend notification email, and auto-reply
- Read-only JSON API endpoints for projects, publications, and blog posts
- Static PDFs served from `public/assets`, including CV and patent publication files

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Three.js, `@react-three/fiber`, `@react-three/drei`
- Framer Motion
- Lucide React
- Resend
- Vitest and Playwright

## Project Structure

```text
src/
  app/
    page.tsx
    blog/page.tsx
    api/
      blog/route.ts
      contact/route.ts
      projects/route.ts
      publications/route.ts
  components/
    effects/
    layout/
    sections/
    ui/
  data/index.ts
  hooks/
  lib/
  types/
public/
  assets/
    cv/
    patents/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```dotenv
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
EMAIL_TO=your.email@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run type-check
npm run test
npm run test:e2e
```

## Deployment

The app is ready for Vercel deployment. Push the repository to GitHub, import it in Vercel, and add the required environment variables:

```text
RESEND_API_KEY
EMAIL_TO
NEXT_PUBLIC_SITE_URL
```
