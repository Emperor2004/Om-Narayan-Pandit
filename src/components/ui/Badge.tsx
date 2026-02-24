import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "cyan" | "pink" | "muted" | "success";
  className?: string;
}

export function Badge({ children, variant = "accent", className }: BadgeProps) {
  const variants = {
    accent: "text-accent border-accent/30 bg-accent/10",
    cyan: "text-cyan-glow border-cyan-glow/30 bg-cyan-glow/10",
    pink: "text-pink-glow border-pink-glow/30 bg-pink-glow/10",
    muted: "text-[var(--muted)] border-[var(--border)] bg-white/5",
    success: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  };

  return (
    <span
      className={cn(
        "inline-block font-mono text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface TechPillProps {
  label: string;
  variant?: "default" | "hot";
}

export function TechPill({ label, variant = "default" }: TechPillProps) {
  return (
    <span
      className={cn(
        "font-mono text-[0.65rem] px-2 py-0.5 rounded-[4px] border transition-colors",
        variant === "default"
          ? "bg-cyan-glow/7 text-cyan-glow border-cyan-glow/15"
          : "bg-pink-glow/7 text-pink-glow border-pink-glow/15"
      )}
    >
      {label}
    </span>
  );
}
