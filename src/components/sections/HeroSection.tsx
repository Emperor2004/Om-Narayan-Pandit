"use client";

import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";

const PHRASES = ["AI Engineer", "ML Researcher", "RL Enthusiast", "Deep Learning Dev"];

export function HeroSection() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Typewriter
  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIdx]);

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-[350px] h-[350px] rounded-full bg-cyan-glow/7 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="animate-slide-up" style={{ animationFillMode: "both" }}>
            <div className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-accent uppercase tracking-widest mb-6 border border-accent/25 px-3 py-1.5 rounded-full bg-accent/5">
              ✦ B.Tech Student · AI/ML Engineer
            </div>

            <h1 className="font-syne font-extrabold leading-[1.0] tracking-tight mb-4">
              <span className="text-[clamp(2.8rem,5.5vw,4.8rem)] block text-[var(--text)]">
                Om Narayan
              </span>
              <span className="text-[clamp(2.8rem,5.5vw,4.8rem)] block gradient-text">
                Pandit
              </span>
            </h1>

            <p className="text-[var(--muted)] text-lg leading-relaxed mb-3 max-w-lg">
              Building intelligent systems at the intersection of{" "}
              <span className="text-[var(--text)] font-medium">Deep Learning</span>,{" "}
              <span className="text-[var(--text)] font-medium">Reinforcement Learning</span>, and{" "}
              <span className="text-[var(--text)] font-medium">Real-World AI</span>.
            </p>

            <div className="flex items-center gap-1 mb-8 h-7">
              <span className="font-mono text-sm text-accent">
                {displayed}
              </span>
              <span className="font-mono text-accent animate-pulse">|</span>
            </div>

            <div className="flex gap-4 flex-wrap">
              <LinkButton href="#projects" variant="primary" size="lg">
                View My Work →
              </LinkButton>
              <LinkButton href="#contact" variant="ghost" size="lg">
                Get In Touch
              </LinkButton>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center items-center">
            <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
              {/* Spinning ring */}
              <svg
                className="absolute inset-0 w-full h-full animate-spin-slow"
                viewBox="0 0 320 320"
                fill="none"
              >
                <circle cx="160" cy="160" r="150" stroke="rgba(99,102,241,0.2)" strokeWidth="1" strokeDasharray="6 6" />
                <circle cx="160" cy="160" r="138" stroke="rgba(34,211,238,0.1)" strokeWidth="1" />
                <circle cx="160" cy="10" r="6" fill="#6366f1" />
                <circle cx="310" cy="160" r="4" fill="#22d3ee" />
                <circle cx="160" cy="310" r="5" fill="#f472b6" />
                <circle cx="10" cy="160" r="3" fill="#6366f1" />
              </svg>

              {/* Inner */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] border-2 border-accent/25 flex items-center justify-center overflow-hidden">
                <span className="font-syne font-extrabold text-7xl text-accent" style={{ textShadow: "0 0 60px rgba(99,102,241,0.8)" }}>
                  ONP
                </span>
              </div>

              {/* Floating tags */}
              {[
                { label: "PyTorch", pos: "top-2 -right-6", delay: "0s" },
                { label: "RL Agent", pos: "top-1/4 -left-10", delay: "0.8s" },
                { label: "GANs", pos: "bottom-1/4 -right-8", delay: "1.6s" },
                { label: "NLP", pos: "bottom-2 -left-4", delay: "2.4s" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className={`absolute ${tag.pos} font-mono text-[0.65rem] bg-[var(--surface)]/90 border border-[var(--border)] px-2.5 py-1 rounded-full text-[var(--accent2)] whitespace-nowrap animate-float`}
                  style={{ animationDelay: tag.delay }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
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
