"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -50,
    filter: "blur(10px)",
  },
};

export function SectionTransition({ 
  children, 
  id, 
  className = "", 
  delay = 0,
  direction = "up" 
}: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  // Adjust variants based on direction
  const directionVariants = {
    ...variants,
    hidden: {
      ...variants.hidden,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    },
    visible: {
      ...variants.visible,
      x: 0,
      y: 0,
    },
    exit: {
      ...variants.exit,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
    },
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={directionVariants}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        stagger: 0.1,
      }}
      style={{
        transformPerspective: "1000px",
      }}
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
