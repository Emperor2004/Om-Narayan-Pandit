"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: "reveal" | "scramble" | "typewriter";
  delay?: number;
  speed?: number;
  style?: React.CSSProperties;
}

export function AnimatedText({ 
  text, 
  className = "", 
  type = "reveal", 
  delay = 0,
  speed = 50,
  style = {}
}: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (type === "reveal") {
      // Letter-by-letter reveal animation
      let currentIndex = 0;
      const timeout = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            setIsComplete(true);
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
        }, speed);
      }, delay);

      return () => {
        clearTimeout(timeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else if (type === "scramble") {
      // Scramble effect
      const chars = "!<>-_\\/[]{}—=+*?#$%&@";
      let iterations = 0;
      const maxIterations = 10;
      
      const timeout = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          if (iterations < maxIterations) {
            let scrambled = "";
            for (let i = 0; i < text.length; i++) {
              if (i <= iterations) {
                scrambled += text[i];
              } else {
                scrambled += chars[Math.floor(Math.random() * chars.length)];
              }
            }
            setDisplayedText(scrambled);
            iterations++;
          } else {
            setDisplayedText(text);
            setIsComplete(true);
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
        }, speed);
      }, delay);

      return () => {
        clearTimeout(timeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      // Typewriter effect (simpler version)
      setDisplayedText(text);
      setIsComplete(true);
    }
  }, [text, type, delay, speed]);

  return (
    <span className={cn(className, "inline-block")} style={{
      animation: type === "scramble" && !isComplete ? "pulse 1s infinite" : undefined,
      ...style,
    }}>
      {displayedText.split("").map((char, index) => (
        <span
          key={index}
          className={cn(
            "inline-block",
            type === "reveal" && index >= displayedText.length - 1 && !isComplete
              ? "animate-pulse"
              : ""
          )}
          style={{
            animation: type === "reveal" && index < displayedText.length
              ? `letterReveal 0.3s ease-out ${index * 0.05}s both`
              : undefined,
            opacity: type === "scramble" && index >= displayedText.length - 1 && !isComplete ? 0.3 : 1,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      {type === "typewriter" && !isComplete && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
