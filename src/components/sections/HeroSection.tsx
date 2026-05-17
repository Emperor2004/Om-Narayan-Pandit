"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Name3D } from "@/components/ui/Name3D";

export function HeroSection() {
  const [greeting, setGreeting] = useState("GOOD MORNING");
  const [mounted, setMounted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const rolePhrases = [
    "AI Solutions Builder",
    "Data Science Practitioner",
    "Machine Learning Researcher",
    "Deep Learning Architect",
    "Computer Vision Enthusiast",
    "Reinforcement Learning Explorer",
    "NLP & Generative AI Engineer"
  ];

  useEffect(() => {
    setMounted(true);
    
    const updateTimeBasedGreeting = () => {
      const hour = new Date().getHours();
      let greetingStr = "";
      
      if (hour >= 5 && hour < 12) {
        greetingStr = "GOOD MORNING";
      } else if (hour >= 12 && hour < 17) {
        greetingStr = "GOOD AFTERNOON";
      } else if (hour >= 17 && hour < 21) {
        greetingStr = "GOOD EVENING";
      } else {
        greetingStr = "GOOD NIGHT";
      }
      
      setGreeting(greetingStr);
    };

    updateTimeBasedGreeting();
    const interval = setInterval(updateTimeBasedGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const roleRotation = setInterval(() => {
      setRoleIndex((current) => (current + 1) % rolePhrases.length);
    }, 4500);

    return () => clearInterval(roleRotation);
  }, [rolePhrases.length]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden font-playwrite-au-tas">
      {/* Background is transparent to show global starry animation */}
      <div className="absolute inset-0 bg-transparent pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-12">
        
        {/* Top Badge */}
        <div className="mb-6 inline-block opacity-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow shadow-glow-cyan"></div>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] text-[var(--muted)] uppercase">
              ✦ {mounted ? greeting : "GOOD DAY"} · AI/ML ENGINEER
            </span>
          </div>
        </div>

        {/* Glowing Name */}
        <div className="mb-8 relative opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Name3D />
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-[var(--text)]/90 font-medium mb-6 leading-relaxed opacity-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          Building next-generation AI systems that <span className="text-accent-light">perceive, reason, learn,</span> and <span className="text-accent-light">adapt</span> to real world.
        </p>

        {/* Typewriter text / Role */}
        <div className="mb-10 text-accent-light text-lg sm:text-xl opacity-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <AnimatedText
            text={rolePhrases[roleIndex]}
            type="typewriter"
            speed={90}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <Link href="#projects" className="px-8 py-3.5 bg-accent hover:bg-accent-light text-white rounded-lg font-medium transition-all shadow-glow hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] flex items-center gap-2 group w-full sm:w-auto justify-center">
            View My Work
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link href="#contact" className="px-8 py-3.5 bg-transparent border border-white/10 hover:bg-white/5 text-[var(--text)] rounded-lg font-medium transition-all w-full sm:w-auto justify-center">
            Get In Touch
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        <span className="text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase opacity-50">
          SCROLL
        </span>
      </div>
    </section>
  );
}
