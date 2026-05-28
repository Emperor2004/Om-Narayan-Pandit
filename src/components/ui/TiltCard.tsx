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
  intensity = 8,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});
  const [isResting, setIsResting] = useState(true);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Disable on touch devices
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;

      setIsResting(false);
      setTransform(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      );

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlareStyle({
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          opacity: 1,
        });
      }
    };

    const handleMouseLeave = () => {
      setIsResting(true);
      setTransform(
        `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
      );
      setGlareStyle({ opacity: 0 });
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
      className={cn("relative transform-gpu", className)}
      style={{
        transform,
        transformStyle: "preserve-3d",
        // Slow smooth return on mouse leave, snappy follow on mouse move
        transition: isResting
          ? "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
          : "transform 0.1s ease-out",
      }}
    >
      {/* Glare overlay */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-20"
          style={{
            ...glareStyle,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}