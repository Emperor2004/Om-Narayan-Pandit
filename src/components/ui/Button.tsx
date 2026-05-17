"use client";

import { forwardRef, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  loading?: boolean;
}

// Ripple effect component
const Ripple = ({ x, y, id }: { x: number; y: number; id: number }) => (
  <span
    className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
    style={{
      left: x - 10,
      top: y - 10,
      width: 20,
      height: 20,
      animation: 'ripple 0.6s ease-out',
    }}
    key={id}
  />
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, loading, onClick, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const base =
      "inline-flex items-center justify-center gap-2 font-poppins font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none";

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

    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={loading}
        onClick={handleClick}
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

export function LinkButton({ variant = "primary", size = "md", className, children, onClick, ...props }: LinkButtonProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const base =
    "inline-flex items-center justify-center gap-2 font-poppins font-bold rounded-lg transition-all duration-200";

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
  };

  return (
    <a 
      ref={linkRef}
      className={cn(base, variants[variant], sizes[size], className)} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
