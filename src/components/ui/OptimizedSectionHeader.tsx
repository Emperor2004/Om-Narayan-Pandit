"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

// Memoized section header component to prevent unnecessary re-renders
export const OptimizedSectionHeader = memo(({ 
  label, 
  title, 
  subtitle, 
  centered = false, 
  className 
}: SectionHeaderProps) => {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <div
        className={cn(
          "flex items-center gap-3 font-mono text-[0.7rem] text-accent uppercase tracking-[0.15em] mb-3",
          centered && "justify-center"
        )}
      >
        {!centered && <span className="flex-none w-6 h-px bg-accent" />}
        {label}
      </div>
      <h2 className="font-poppins font-extrabold text-3xl md:text-4xl tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[var(--muted)] max-w-xl leading-relaxed" style={{ ...(centered && { margin: "0.75rem auto 0" }) }}>
          {subtitle}
        </p>
      )}
    </div>
  );
});

OptimizedSectionHeader.displayName = "OptimizedSectionHeader";
