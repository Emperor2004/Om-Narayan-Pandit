import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function readTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export const statusConfig = {
  "under-review": { label: "Under Review", class: "text-cyan-glow border-cyan-glow/30 bg-cyan-glow/10" },
  "in-progress": { label: "In Progress", class: "text-accent border-accent/30 bg-accent/10" },
  published: { label: "Published", class: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" },
  "technical-report": { label: "Technical Report", class: "text-pink-glow border-pink-glow/30 bg-pink-glow/10" },
  completed: { label: "Completed", class: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" },
  ongoing: { label: "Ongoing", class: "text-accent border-accent/30 bg-accent/10" },
  archived: { label: "Archived", class: "text-slate-400 border-slate-600 bg-slate-800/50" },
} as const;
