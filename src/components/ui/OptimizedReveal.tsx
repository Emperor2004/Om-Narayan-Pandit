"use client";

import { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

// Memoized reveal component with Intersection Observer optimization
export const OptimizedReveal = memo(({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  className = "",
  direction = "up"
}: RevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Optimized intersection observer setup
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once revealed, disconnect observer to save resources
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Memoized animation variants based on direction
  const getVariants = useCallback(() => {
    const variants = {
      up: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      },
      down: {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0 },
      },
      left: {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 },
      },
      right: {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 },
      },
    };
    return variants[direction];
  }, [direction]);

  const variants = getVariants();

  return (
    <div ref={elementRef} className={className}>
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
});

OptimizedReveal.displayName = "OptimizedReveal";
