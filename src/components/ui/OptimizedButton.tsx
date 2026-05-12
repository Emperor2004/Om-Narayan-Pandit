"use client";

import { forwardRef, useState, useRef, useCallback, memo, Ref } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
}

// Memoized ripple effect component
const Ripple = memo(({ x, y, id }: { x: number; y: number; id: number }) => (
  <motion.span
    className="absolute bg-white/30 rounded-full pointer-events-none"
    style={{
      left: x - 10,
      top: y - 10,
      width: 20,
      height: 20,
    }}
    initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: 4, opacity: 0 }}
    transition={{ duration: 0.6 }}
  />
));

Ripple.displayName = "Ripple";

// Memoized button component
export const OptimizedButton = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, loading, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const magneticRef = useRef({ x: 0, y: 0 });

    // Memoized base classes
    const baseClasses = "inline-flex items-center justify-center gap-2 font-poppins font-bold rounded-lg transition-all duration-200 cursor-none disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";

    // Memoized variant classes
    const variantClasses = {
      primary: "bg-accent text-white hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0",
      ghost: "bg-transparent text-[var(--text)] border border-[var(--border)] hover:-translate-y-0.5 hover:border-cyan-glow hover:bg-cyan-glow/5",
      danger: "bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30",
      outline: "bg-transparent text-accent border border-accent/40 hover:bg-accent/10 hover:-translate-y-0.5",
    };

    // Memoized size classes
    const sizeClasses = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-5 py-2.5",
      lg: "text-base px-6 py-3",
    };

    // Memoized combined classes
    const combinedClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    // Optimized magnetic effect
    const updateMagneticPosition = useCallback(() => {
      if (!buttonRef.current || !isHovered) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      magneticRef.current = {
        x: (centerX - window.innerWidth / 2) * 0.02,
        y: (centerY - window.innerHeight / 2) * 0.02,
      };
    }, [isHovered]);

    // Memoized click handler
    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { x, y, id: Date.now() };

      setRipples(prev => [...prev, newRipple]);

      // Clean up ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);

      onClick?.(e);
    }, [onClick]);

    // Optimized hover handlers
    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    // Magnetic effect animation
    const magneticStyle = isHovered ? {
      transform: `translate(${magneticRef.current.x}px, ${magneticRef.current.y}px)`,
    } : {};

    return (
      <motion.button
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={combinedClasses}
        style={magneticStyle}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={loading}
        {...props}
      >
        {ripples.map(ripple => (
          <Ripple key={ripple.id} x={ripple.x} y={ripple.y} id={ripple.id} />
        ))}
        
        {loading ? (
          <motion.div
            className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          children
        )}
      </motion.button>
    );
  }
));

OptimizedButton.displayName = "OptimizedButton";
