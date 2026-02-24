"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, loading, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-syne font-bold rounded-lg transition-all duration-200 cursor-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-accent text-white hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0",
      ghost:
        "bg-transparent text-[var(--text)] border border-[var(--border)] hover:-translate-y-0.5 hover:border-cyan-glow hover:bg-cyan-glow/5",
      danger:
        "bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30",
      outline:
        "bg-transparent text-accent border border-accent/40 hover:bg-accent/10 hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-5 py-2.5",
      lg: "text-base px-7 py-3.5",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// Link-styled button
interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function LinkButton({ variant = "primary", size = "md", className, children, ...props }: LinkButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-syne font-bold rounded-lg transition-all duration-200 cursor-none";

  const variants = {
    primary: "bg-accent text-white hover:-translate-y-0.5 hover:shadow-glow",
    ghost: "bg-transparent text-[var(--text)] border border-[var(--border)] hover:-translate-y-0.5 hover:border-cyan-glow hover:bg-cyan-glow/5",
    outline: "bg-transparent text-accent border border-accent/40 hover:bg-accent/10 hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3.5",
  };

  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}
