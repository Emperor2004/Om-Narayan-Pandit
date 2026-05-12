"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "avatar" | "project";
  lines?: number;
  width?: string;
  height?: string;
}

export function Skeleton({ 
  className = "", 
  variant = "text", 
  lines = 1,
  width,
  height 
}: SkeletonProps) {
  const base = "animate-pulse bg-[var(--border)] rounded";

  const variants = {
    text: "h-4 w-full",
    card: "h-32 w-full",
    avatar: "h-12 w-12 rounded-full",
    project: "h-48 w-full",
  };

  const customStyles = {
    width: width || undefined,
    height: height || undefined,
  };

  if (variant === "text") {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(base, "h-4")}
            style={{
              ...customStyles,
              width: i === lines - 1 ? "75%" : "100%", // Last line shorter
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={cn(
        base,
        variants[variant],
        className
      )}
      style={customStyles}
    />
  );
}

// Card skeleton with multiple elements
export function CardSkeleton() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="20%" height="6" />
      </div>
      
      {/* Title */}
      <Skeleton variant="text" height="6" />
      
      {/* Description */}
      <div className="space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" width="90%" />
      </div>
      
      {/* Tags */}
      <div className="flex gap-2">
        <Skeleton variant="text" width="60px" height="6" />
        <Skeleton variant="text" width="80px" height="6" />
        <Skeleton variant="text" width="70px" height="6" />
      </div>
      
      {/* Links */}
      <div className="flex gap-3 mt-6">
        <Skeleton variant="text" width="80px" height="8" />
        <Skeleton variant="text" width="60px" height="8" />
      </div>
    </div>
  );
}

// Project grid skeleton
export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
