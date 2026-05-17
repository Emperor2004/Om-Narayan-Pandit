"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Name3DProps {
  className?: string;
}

export function Name3D({ className = "" }: Name3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!nameRef.current) return;
      
      const rect = nameRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / 20;
      const y = (e.clientY - centerY) / 20;
      
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const element = nameRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const depth = isHovered ? 30 : 15;
  const scale = isHovered ? 1.05 : 1;

  return (
    <div
      ref={nameRef}
      className={cn(
        "relative inline-block cursor-none transition-transform duration-300 ease-out",
        className
      )}
      style={{
        transform: `perspective(1000px) translateZ(${depth}px) scale3d(${scale}, ${scale}, ${scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative">
        {/* Main name text */}
        <h1 className="font-poppins font-extrabold leading-[1.0] tracking-tight">
          <span 
            className="text-[clamp(2.8rem,5.5vw,4.8rem)] block gradient-text transition-all duration-300"
            style={{
              textShadow: isHovered 
                ? '0 10px 40px rgba(99, 102, 241, 0.4)' 
                : '0 5px 25px rgba(99, 102, 241, 0.2)',
              transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
            }}
          >
            Om Narayan
          </span>
          <span 
            className="text-[clamp(2.8rem,5.5vw,4.8rem)] block gradient-text transition-all duration-300"
            style={{
              textShadow: isHovered 
                ? '0 10px 40px rgba(246, 114, 230, 0.4)' 
                : '0 5px 25px rgba(246, 114, 230, 0.2)',
              transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
            }}
          >
            Pandit
          </span>
        </h1>

        {/* Enhanced glow effect overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered 
              ? 'radial-gradient(circle at center, transparent 0%, rgba(99, 102, 241, 0.15) 30%, rgba(99, 102, 241, 0.05) 60%, transparent 100%)'
              : 'radial-gradient(circle at center, transparent 0%, rgba(246, 114, 230, 0.08) 40%, rgba(246, 114, 230, 0.03) 70%, transparent 100%)',
            filter: 'blur(25px)',
            opacity: isHovered ? 1 : 0.7,
            transition: 'all 0.4s ease-in-out',
          }}
        />
      </div>
    </div>
  );
}