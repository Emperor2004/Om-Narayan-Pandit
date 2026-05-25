# Om Narayan Pandit Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react&logoColor=white)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-skyblue?logo=tailwindcss)](https://tailwindcss.com/) [![Playwright](https://img.shields.io/badge/Playwright-1.48.0-purple?logo=playwright)](https://playwright.dev/)

A personal portfolio website built with **Next.js 16.2.6**, **React 19**, **TypeScript**, **Tailwind CSS**, **Three.js**, and **Framer Motion**.

## Overview

This repository contains a modern portfolio application that showcases:
- AI/ML projects, publications, blog posts, and resume assets
- Animated 3D visuals and motion interactions
- Dark/light theme support
- A contact form with email notifications via Resend
- Static JSON API endpoints for projects, publications, and blog posts

## Key Features

- Responsive portfolio landing page with hero, stats, about, projects, research, blog, education, and contact sections
- 3D canvas effects using `three`, `@react-three/fiber`, and `@react-three/drei`
- Smooth animations with `framer-motion`
- Contact form protections: validation, sanitization, and IP-based rate limiting
- Auto-reply email confirmation for contact submissions
- Blog listing page at `/blog`
- Static PDF assets served from `public/assets`

## Technology Stack

- `next` 16.2.6
- `react` 19.2.6
- `typescript`
- `tailwindcss`
- `three`, `@react-three/fiber`, `@react-three/drei`
- `framer-motion`
- `resend`
- `lucide-react`
- `vitest` for unit/component tests
- `playwright` for end-to-end tests
- `stryker` for mutation testing

## Repository Structure

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

## Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with the required secrets:

```dotenv
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
EMAIL_TO=your.email@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Start the development server:

```bash
npm run dev
```

4. Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` — start Next.js development server
- `npm run build` — compile production build
- `npm run start` — start production server locally
- `npm run lint` — run ESLint across the project
- `npm run type-check` — run TypeScript type checking
- `npm run test` — run Vitest unit tests
- `npm run test:coverage` — run tests with coverage
- `npm run test:watch` — run Vitest in watch mode
- `npm run test:ci` — CI-friendly Vitest run
- `npm run test:e2e` — run Playwright tests
- `npm run test:e2e:ui` — open Playwright test runner UI
- `npm run test:e2e:headed` — run Playwright in headed mode
- `npm run test:e2e:performance` — run performance-focused Playwright tests
- `npm run test:performance` — run coverage and performance tests
- `npm run test:mutation` — run Stryker mutation testing
- `npm run test:mutation:report` — run Stryker with HTML report output

## Environment Variables

Required environment variables:

- `RESEND_API_KEY` — API key for Resend email service
- `EMAIL_TO` — destination email for contact form submissions
- `NEXT_PUBLIC_SITE_URL` — site URL for environment-aware behavior

## Deployment

This project is ready to deploy on Vercel or any platform that supports Next.js App Router.

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add environment variables:
   - `RESEND_API_KEY`
   - `EMAIL_TO`
   - `NEXT_PUBLIC_SITE_URL`

## Notes

- The contact API uses an in-memory rate limiter (`src/lib/rateLimit.ts`). For scalable production deployments, replace it with a distributed store such as Redis.
- The README previously referenced Next.js 14; the actual codebase uses Next.js 16.2.6.
