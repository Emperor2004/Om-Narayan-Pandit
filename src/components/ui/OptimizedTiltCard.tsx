"use client";

import { useRef, useState, useCallback, memo, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

// Memoized tilt card component with optimized performance
export const OptimizedTiltCard = memo(({ 
  children, 
  className = "", 
  intensity = 15,
  glare = false 
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation values
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    // Set transform
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);

    // Update glare position
    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlarePosition({ x: glareX, y: glareY });
    }
  }, [intensity, glare]);

  // Reset transform on mouse leave
  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlarePosition({ x: 50, y: 50 });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setTransform("");
      setGlarePosition({ x: 50, y: 50 });
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative transition-transform duration-200 ease-out cursor-none",
        className
      )}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ zIndex: 10 }}
    >
      {children}
      
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />
      )}
    </motion.div>
  );
});

OptimizedTiltCard.displayName = "OptimizedTiltCard";
