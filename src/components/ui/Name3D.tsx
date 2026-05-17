"use client";

import { cn } from "@/lib/utils";

interface Name3DProps {
  className?: string;
}

export function Name3D({ className = "" }: Name3DProps) {
  return (
    <div className={cn("relative transition-all duration-500 ease-out hover:-translate-z-3 hover:scale-105 cursor-default group inline-block", className)}>
      {/* Blur shadow layer */}
      <h1 className="text-6xl md:text-8xl lg:text-[5.5rem] font-poppins font-black leading-tight absolute inset-0 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 bg-gradient-to-r from-cyan-glow via-accent-light to-pink-glow bg-clip-text text-transparent transform translate-z-4 pointer-events-none select-none">
        Om Narayan<br />Pandit
      </h1>
      {/* Crisp front layer */}
      <h1 className="text-6xl md:text-8xl lg:text-[5.5rem] font-poppins font-black leading-tight relative z-10 bg-gradient-to-r from-cyan-glow via-accent-light to-pink-glow bg-clip-text text-transparent">
        Om Narayan<br />Pandit
      </h1>
    </div>
  );
}