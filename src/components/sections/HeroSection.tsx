"use client";

import { useEffect, useState } from "react";

// Fallback components that don't rely on complex imports
const FallbackButton = ({ children, className, ...props }: any) => (
  <button className={`${className || ''} px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors`} {...props}>
    {children}
  </button>
);

const FallbackLinkButton = ({ children, className, ...props }: any) => (
  <a className={`${className || ''} px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors inline-block`} {...props}>
    {children}
  </a>
);

const FallbackName3D = ({ className }: { className?: string }) => (
  <h1 className={`text-6xl md:text-8xl font-poppins font-bold bg-gradient-to-r from-[var(--cyan-glow)] to-[var(--purple-glow)] bg-clip-text text-transparent ${className || ''}`}>
    Om Narayan
  </h1>
);

const FallbackAnimatedText = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xl md:text-2xl text-[var(--text-muted)] font-playwrite-au">
    {children}
  </span>
);

const FallbackCanvas = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full flex items-center justify-center bg-[var(--card)]/50 rounded-full">
    {children}
  </div>
);

const FallbackAIBrain = () => null;

export function HeroSection() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [greeting, setGreeting] = useState("Good morning");
  const [version, setVersion] = useState(0);
  const [mounted, setMounted] = useState(false);

  const PHRASES = ["AI Engineer", "ML Researcher", "RL Enthusiast", "Deep Learning Dev"];

  useEffect(() => {
    setMounted(true);
    // Update version every minute
    const interval = setInterval(() => {
      setVersion(Math.floor(Date.now() / 60000));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
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
    const interval = setInterval(updateTimeBasedGreeting, 60000);
    return () => clearInterval(interval);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden" data-version={version}>
      {/* Neural Canvas Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--muted)] to-[var(--background)]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--cyan-glow)' }}></div>
      <div className="absolute top-40 right-32 w-3 h-3 rounded-full animate-pulse delay-75" style={{ backgroundColor: 'var(--purple-glow)' }}></div>
      <div className="absolute bottom-32 left-40 w-2 h-2 rounded-full animate-pulse delay-150" style={{ backgroundColor: 'var(--cyan-glow)' }}></div>
      <div className="absolute bottom-20 right-20 w-4 h-4 rounded-full animate-pulse delay-300" style={{ backgroundColor: 'var(--purple-glow)' }}></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Greeting Badge */}
        <div className="mb-8 inline-block">
          <div className="px-4 py-2 bg-[var(--muted)]/80 backdrop-blur-sm rounded-full border border-[var(--border)]/50">
            <span className="text-sm text-[var(--text-muted)] font-playwrite-au">
              {greeting}! 👋
            </span>
          </div>
        </div>

        {/* Name */}
        <div className="mb-6">
          <FallbackName3D />
        </div>

        {/* Power Statement */}
        <div className="mb-12">
          <FallbackAnimatedText>
            Building the future with {PHRASES[phraseIdx]}
          </FallbackAnimatedText>
        </div>

        {/* 3D Canvas Placeholder */}
        <div className="mb-12 flex justify-center">
          <FallbackCanvas>
            <div className="text-center">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-sm text-[var(--text-muted)]">AI-Powered Portfolio</div>
            </div>
          </FallbackCanvas>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <FallbackLinkButton href="#projects">
            View Projects
          </FallbackLinkButton>
          <FallbackButton>
            Download CV
          </FallbackButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-[var(--border)]/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[var(--border)]/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
