'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import HeroSection with SSR disabled to prevent hydration errors
const HeroSection = dynamic(() => import("@/components/sections/HeroSection").then((mod) => mod.HeroSection), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[var(--muted)] font-mono text-sm">Loading...</p>
    </div>
  </div>,
});

export function DynamicHeroSection() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--muted)] font-mono text-sm">Loading...</p>
        </div>
      </div>
    }>
      <HeroSection />
    </Suspense>
  );
}
