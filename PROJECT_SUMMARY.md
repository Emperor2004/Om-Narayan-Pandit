Based on my thorough analysis of the Next.js portfolio project, here's a comprehensive breakdown of all source files organized by directory structure:

## Root-Level Configuration Files

### [package.json](package.json)
**Purpose**: Project metadata and dependency management  
**Key Components**:
- **Scripts**: `dev` (development), `build`, `start`, `lint`, `type-check`
- **Core Dependencies**: Next.js 16, React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide icons
- **Key Libraries**: Resend (email), nodemailer, next-themes (dark mode), clsx, tailwind-merge
- **DevDependencies**: ESLint, PostCSS, TypeScript

### [tsconfig.json](tsconfig.json)
**Purpose**: TypeScript compiler configuration  
**Key Settings**:
- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler
- Includes Next.js plugin

### [tailwind.config.ts](tailwind.config.ts)
**Purpose**: Tailwind CSS customization and theming  
**Key Components**:
- **Custom Colors**: Accent (indigo), cyan-glow, pink-glow with light/dark variants
- **Custom Animations**: `spin-slow`, `float`, `slide-up`, `fade-in`, `shimmer`
- **Box Shadows**: Glow effects for accent, cyan, and general UI
- **Dark Mode**: Class-based implementation

### [next.config.js](next.config.js)
**Purpose**: Next.js application configuration  
**Key Features**:
- Image optimization for Unsplash and GitHub avatars
- Server-side package configuration for nodemailer

### [postcss.config.js](postcss.config.js)
**Purpose**: PostCSS processor configuration  
**Key Plugins**: Tailwind CSS, Autoprefixer

### [README.md](README.md)
**Purpose**: Project documentation with setup instructions, tech stack, and customization guide

---

## App Directory (src/app/)

### [layout.tsx](src/app/layout.tsx)
**Purpose**: Root layout wrapper for entire application  
**Key Components**:
- Imports Google Fonts (Syne, Space Mono, DM Sans)
- Configures SEO metadata with dynamic title template
- Wraps app with NextThemes provider for dark/light mode
- Sets up HTML suppressHydrationWarning

### [page.tsx](src/app/page.tsx)
**Purpose**: Homepage entry point  
**Key Components**: Orchestrates all section components in sequence:
- CustomCursor, ScrollProgress, NeuralCanvas (effects)
- Navbar, Footer (layout)
- HeroSection, StatsBar, AboutSection, ProjectsSection, PublicationsSection, BlogSection, EducationSection, ContactSection (content sections)

### [globals.css](src/app/globals.css)
**Purpose**: Global styles and CSS variables  
**Key Styles**:
- CSS variables for colors, fonts, spacing
- Custom cursor styling (hidden by default, visible on desktop)
- Noise overlay effect
- Scrollbar customization
- Section dividers
- Admin input/form styling
- Prose typography for markdown rendering

### [admin/page.tsx](src/app/admin/page.tsx)
**Purpose**: Admin dashboard for CRUD operations  
**Key Features**:
- Login form with password authentication
- Tabbed dashboard for Projects, Publications, and Blog Posts
- Create, Read, Update, Delete functionality
- Bearer token authentication
- Session storage for auth persistence
- Real-time form validation

### [blog/page.tsx](src/app/blog/page.tsx)
**Purpose**: Blog listing page  
**Key Features**:
- Displays all published blog posts
- Shows metadata: publication date, read time, tags
- Links to individual blog post pages
- Uses Reveal animation component
- Filters unpublished posts

### [blog/[slug]/page.tsx](src/app/blog/[slug]/page.tsx)
**Purpose**: Individual blog post rendering  
**Key Features**:
- Dynamic route with slug parameter
- Static generation via `generateStaticParams()`
- Markdown-to-HTML converter (headings, lists, blockquotes, code, emphasis)
- Displays post metadata (date, read time, tags)
- Back navigation to blog listing

---

## API Routes (src/app/api/)

### [api/blog/route.ts](src/app/api/blog/route.ts)
**Purpose**: CRUD API for blog posts  
**Methods**:
- **GET**: Retrieve all blog posts
- **POST**: Create new blog post (auth required)
- **PUT**: Update existing blog post (auth required)
- **DELETE**: Delete blog post by ID (auth required)
- Auto-calculates post slug and read time

### [api/contact/route.ts](src/app/api/contact/route.ts)
**Purpose**: Contact form submission handler  
**Features**:
- Email validation
- Sends notification to portfolio owner via Resend
- Auto-reply to sender
- HTML email templating
- Error handling and status responses

### [api/projects/route.ts](src/app/api/projects/route.ts)
**Purpose**: CRUD API for projects  
**Methods**:
- **GET**: Retrieve all projects
- **POST**: Create new project (auth required)
- **PUT**: Update project (auth required)
- **DELETE**: Remove project by ID (auth required)
- In-memory storage (note: not persistent between restarts)

### [api/publications/route.ts](src/app/api/publications/route.ts)
**Purpose**: CRUD API for publications/research papers  
**Methods**:
- **GET**: Retrieve all publications
- **POST**: Create publication (auth required)
- **PUT**: Update publication (auth required)
- **DELETE**: Remove publication by ID (auth required)

---

## Components Directory (src/components/)

### Layout Components

#### [layout/Navbar.tsx](src/components/layout/Navbar.tsx)
**Purpose**: Fixed navigation bar  
**Key Features**:
- Responsive design (collapsed menu on mobile)
- Theme toggle (dark/light mode)
- Smooth scroll behavior
- "Open to opportunities" badge
- Navigation links with smooth scroll to sections

#### [layout/Footer.tsx](src/components/layout/Footer.tsx)
**Purpose**: Site footer  
**Content**:
- Copyright attribution
- Social links (GitHub, LinkedIn, Twitter)
- Tagline ("Made with curiosity & caffeine")

### UI Components

#### [ui/Button.tsx](src/components/ui/Button.tsx)
**Purpose**: Reusable button component  
**Variants**: primary, ghost, danger, outline  
**Sizes**: sm, md, lg  
**Features**:
- Loading state with spinner
- Disabled state handling
- Smooth transitions and hover effects

#### [ui/Badge.tsx](src/components/ui/Badge.tsx)
**Purpose**: Status badges and tech pill tags  
**Badge Variants**: accent, cyan, pink, muted, success  
**TechPill Component**: Specialized tags for displaying technologies with cyan/pink emphasis

#### [ui/Reveal.tsx](src/components/ui/Reveal.tsx)
**Purpose**: Scroll reveal animation wrapper  
**Features**:
- Uses Intersection Observer for lazy reveal
- Configurable animation directions: up, left, right, none
- Delay staggering for sequential animations

#### [ui/SectionHeader.tsx](src/components/ui/SectionHeader.tsx)
**Purpose**: Consistent section headers throughout site  
**Features**:
- Numbered label with accent color
- Optional decorative line
- Title and subtitle support
- Centered layout option

### Section Components

#### [sections/HeroSection.tsx](src/components/sections/HeroSection.tsx)
**Purpose**: Landing hero with animated introduction  
**Key Features**:
- Typewriter effect cycling through phrases
- Animated avatar ring with floating tech tags
- Animated CTA buttons
- Scroll indicator animation
- Gradient background orbs

#### [sections/StatsBar.tsx](src/components/sections/StatsBar.tsx)
**Purpose**: Animated statistics counter bar  
**Features**:
- Uses `useCounter` hook for easing animations
- Displays on scroll visibility
- 4-column grid (responsive)

#### [sections/AboutSection.tsx](src/components/sections/AboutSection.tsx)
**Purpose**: Professional bio and skills showcase  
**Key Components**:
- Bio text with highlighted keywords
- Skill categories with color-coded sections
- Interactive skill tags with hover effects

#### [sections/ProjectsSection.tsx](src/components/sections/ProjectsSection.tsx)
**Purpose**: Portfolio projects showcase  
**Features**:
- Card-based grid layout (featured projects span 2 columns)
- Project metadata: type, title, description, tags
- GitHub and demo links
- Mouse glow effect on cards
- Reveal animations with stagger

#### [sections/PublicationsSection.tsx](src/components/sections/PublicationsSection.tsx)
**Purpose**: Research papers and publications display  
**Features**:
- Publication status badges (published, under-review, etc.)
- Links to arXiv and PDF
- Tags for research topics
- Year display

#### [sections/BlogSection.tsx](src/components/sections/BlogSection.tsx)
**Purpose**: Recent blog post preview  
**Features**:
- Shows first 3 published posts
- Post card with metadata (date, read time, tags)
- Link to full blog page
- "All posts" navigation

#### [sections/EducationSection.tsx](src/components/sections/EducationSection.tsx)
**Purpose**: Education timeline and achievements  
**Key Components**:
- Timeline section with animated dots and lines
- Achievement grid with icons and descriptions
- Responsive two-column layout

#### [sections/ContactSection.tsx](src/components/sections/ContactSection.tsx)
**Purpose**: Contact form and social links  
**Features**:
- Form validation and submission
- Success/error state indicators
- Social media links with icons
- CV download link
- Responsive layout (form left, socials right)

### Effects Components

#### [effects/CustomCursor.tsx](src/components/effects/CustomCursor.tsx)
**Purpose**: Custom cursor with trail effect  
**Features**:
- Tracks mouse position
- Expands on hover over interactive elements
- Trail element follows with slight delay
- Hidden on touch devices

#### [effects/ScrollProgress.tsx](src/components/effects/ScrollProgress.tsx)
**Purpose**: Top-of-page scroll progress bar  
**Features**:
- Gradient background (accent → cyan → pink)
- Real-time progress calculation
- 2px height bar

#### [effects/NeuralCanvas.tsx](src/components/effects/NeuralCanvas.tsx)
**Purpose**: Interactive particle/node animation canvas background  
**Key Features**:
- 65 nodes with physics simulation
- 35 colored particles (light cyan/pink)
- Node connections within distance threshold
- Mouse proximity glow effects
- Responsive to window resize
- Particle emission and bounce physics

---

## Utilities and Data (src/)

### [data/index.ts](src/data/index.ts)
**Purpose**: Centralized content database  
**Exports**:
- **projects**: 6 project objects with featured status
- **publications**: Research papers with status tracking
- **blogPosts**: Blog articles with content, tags, read time
- **skillCategories**: 6 skill groups (ML/DL, Vision/NLP, RL, Languages, Data, Research)
- **achievements**: 6 achievement items with icons
- **timeline**: Educational background timeline
- **stats**: Statistics for counter display

### [types/index.ts](src/types/index.ts)
**Purpose**: TypeScript type definitions  
**Key Types**:
- `Project`: Projects with metadata and links
- `Publication`: Research papers with status enum
- `BlogPost`: Blog articles with markdown content
- `ContactFormData`: Form submission payload
- `SkillCategory`: Grouped skills with colors
- `Achievement`: Achievement items with icons and years
- `TimelineItem`: Education/experience timeline entries
- `AdminSection`: Admin panel tabs
- `PublicationStatus`: Publication state enum

### [lib/utils.ts](src/lib/utils.ts)
**Purpose**: Utility functions  
**Key Functions**:
- `cn()`: Tailwind class merging (clsx + tailwind-merge)
- `formatDate()`: Long date format
- `formatDateShort()`: Short date format
- `slugify()`: URL-safe slug generation
- `readTime()`: Reading time calculator (words ÷ 200)
- `truncate()`: Text trimming with ellipsis
- `statusConfig`: Status styling configuration object

### [hooks/index.ts](src/hooks/index.ts)
**Purpose**: Custom React hooks  
**Hooks**:
- `useScrollReveal()`: Intersection Observer-based reveal animation
- `useMousePosition()`: Track mouse coordinates
- `useCardMouseGlow()`: Card mouse glow effect handler
- `useCounter()`: Animated number counter with easing
- `useMediaQuery()`: Responsive breakpoint detection
- `useLocalStorage()`: Persistent browser storage with SSR safety

---

## Summary

This portfolio is a **production-grade Next.js application** featuring:
- **Full-stack architecture** with API routes for CRUD operations
- **Sophisticated animations** (canvas, scroll reveal, typewriter, floating elements)
- **Authentication** for admin dashboard
- **Email integration** via Resend
- **Type-safe** with comprehensive TypeScript interfaces
- **Responsive design** with Tailwind CSS
- **Dark mode** support via next-themes
- **Performance optimized** with static generation and image optimization
- **Structured content management** (projects, publications, blog posts, education)
- **Custom hooks and utilities** for reusable logic

The project demonstrates modern Web development best practices with emphasis on UI/UX, performance, and maintainability.