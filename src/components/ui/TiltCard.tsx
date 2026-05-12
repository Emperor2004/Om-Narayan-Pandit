"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  glare?: boolean;
}

export function TiltCard({ 
  children, 
  className = "", 
  intensity = 15,
  scale = 1.05,
  glare = true 
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glareStyle, setGlareStyle] = useState({});

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;

      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`);

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlareStyle({
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          opacity: "1",
        });
      }
    };

    const handleMouseLeave = () => {
      setTransform("perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)");
      setGlareStyle({ opacity: "0" });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity, scale, glare]);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "relative transition-all duration-200 ease-out transform-gpu",
        className
      )}
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={glareStyle}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
