"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Canvas with SSR disabled
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[var(--card)]/50 rounded-full" />,
});

// Dynamically import AIBrain with SSR disabled
const AIBrain = dynamic(() => import("@/components/effects/AIBrain").then((mod) => mod.AIBrain), {
  ssr: false,
  loading: () => null,
});

// Dynamically import AnimatedText with SSR disabled
const AnimatedText = dynamic(() => import("@/components/ui/AnimatedText").then((mod) => mod.AnimatedText), {
  ssr: false,
});

// Dynamically import LinkButton to avoid potential import issues
const LinkButton = dynamic(() => import("@/components/ui/Button").then((mod) => mod.LinkButton), {
  ssr: false,
});

// Dynamically import Name3D to avoid potential import issues
const Name3D = dynamic(() => import("@/components/ui/Name3D").then((mod) => mod.Name3D), {
  ssr: false,
});

const PHRASES = ["AI Engineer", "ML Researcher", "RL Enthusiast", "Deep Learning Dev"];

export function HeroSection() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  // Initialize greeting state to prevent hydration mismatch
  const [greeting, setGreeting] = useState(() => {
    // Server-side and client-side initialization
    if (typeof window !== 'undefined') {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return "Good morning";
      if (hour >= 12 && hour < 17) return "Good afternoon";
      if (hour >= 17 && hour < 21) return "Good evening";
      return "Good night";
    }
    return "Good morning"; // Default for SSR
  });

  // Force refresh to clear browser cache
  const [version, setVersion] = useState(() => {
    // Use a timestamp that changes every minute
    return Math.floor(Date.now() / 60000);
  });
  useEffect(() => {
    // Update version every minute to force cache refresh
    const interval = setInterval(() => {
      setVersion(Math.floor(Date.now() / 60000));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Get time-based greeting
  useEffect(() => {
    const updateTimeBasedGreeting = () => {
      const hour = new Date().getHours();
      let greeting = "";
      
      if (hour >= 5 && hour < 12) {
        greeting = "Good morning";
      } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon";
      } else if (hour >= 17 && hour < 21) {
        greeting = "Good evening";
      } else {
        greeting = "Good night";
      }
      
      setGreeting(greeting);
    };

    updateTimeBasedGreeting();
    const interval = setInterval(updateTimeBasedGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Cycle through phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
    }, 4000); // Change phrase every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden" data-version={version}>
      {/* Translucent animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent2/5 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent3/10 to-transparent animate-float" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent2/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '4s' }} />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 min-h-[60vh]">
        {/* Greeting badge - positioned above center */}
        <div className="absolute top-0 animate-slide-up" style={{ animationFillMode: "both" }}>
          <div className="inline-flex items-center gap-2 text-[0.72rem] text-accent uppercase tracking-widest border border-accent/25 px-3 py-1.5 rounded-full bg-accent/5" style={{ fontFamily: 'var(--font-playwrite-au)' }}>
            ✦ {greeting} · AI/ML Engineer
          </div>
        </div>

        {/* Main content - perfectly centered */}
        <div className="animate-slide-up" style={{ animationFillMode: "both" }}>
          <Name3D className="mb-6" />

          {/* Power statement */}
          <p className="text-[var(--text)] text-xl md:text-2xl leading-relaxed mb-6 font-medium" style={{ fontFamily: 'var(--font-playwrite-au)' }}>
            Building next-generation AI systems that{" "}
            <span className="text-accent font-bold">perceive</span>,{" "}
            <span className="text-accent font-bold">reason</span>,{" "}
            <span className="text-accent font-bold">learn</span>,{" "}
            and{" "}
            <span className="text-accent font-bold">adapt</span>{" "}
            to real world.
          </p>

          <div className="flex items-center justify-center gap-1 mb-6 h-7">
            <AnimatedText 
              text={PHRASES[phraseIdx]} 
              type="scramble" 
              speed={80}
              delay={500}
              className="text-sm text-accent" style={{ fontFamily: 'var(--font-playwrite-au)' }}
            />
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <LinkButton href="#projects" variant="primary" size="lg">
              View My Work →
            </LinkButton>
            <LinkButton href="#contact" variant="ghost" size="lg">
              Get In Touch
            </LinkButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="font-mono text-[0.65rem] text-[var(--muted)] tracking-widest uppercase">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--muted)] to-transparent" />
      </div>
    </section>
  );
}
