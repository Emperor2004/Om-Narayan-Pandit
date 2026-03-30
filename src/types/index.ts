// ─── Project Types ───────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  type: string;
  tags: string[];
  featured: boolean;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  createdAt: string;
  status: "completed" | "ongoing" | "archived";
}

// ─── Publication Types ────────────────────────────────────────────────────────

export type PublicationStatus =
  | "published"
  | "under-review"
  | "in-progress"
  | "technical-report";

export interface Publication {
  id: string;
  title: string;
  venue: string;
  year: string;
  description: string;
  status: PublicationStatus;
  authors: string[];
  tags: string[];
  arxivUrl?: string;
  pdfUrl?: string;
}

// ─── Blog Types ───────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  url: string;
  content: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  published: boolean;
}

// ─── Contact Types ────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// ─── Skill Types ──────────────────────────────────────────────────────────────

export interface SkillCategory {
  name: string;
  skills: string[];
  color: "accent" | "cyan" | "pink";
}

// ─── Achievement Types ────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  year?: string;
}

// ─── Timeline Types ───────────────────────────────────────────────────────────

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  institution: string;
  description: string;
  badge?: string;
  type: "education" | "experience" | "achievement";
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  success: boolean;
}

// ─── Admin Types ──────────────────────────────────────────────────────────────

export type AdminSection = "projects" | "publications" | "blog";

export interface AdminLoginPayload {
  password: string;
}
