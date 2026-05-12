"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data";

interface SkillBarProps {
  skill: string;
  proficiency: number;
  color: string;
  delay: number;
}

function SkillBar({ skill, proficiency, color, delay }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, [delay]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[var(--text)]">{skill}</span>
        <motion.span 
          className="text-xs font-mono text-[var(--accent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: delay * 0.1 }}
        >
          {Math.round(proficiency * 100)}%
        </motion.span>
      </div>
      
      <div className="relative h-2 bg-[var(--card)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ 
            width: isVisible ? `${proficiency * 100}%` : 0,
          }}
          transition={{ 
            duration: 1.2, 
            delay: delay * 0.1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        />
        
        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 20px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={{ 
            width: isVisible ? `${proficiency * 100}%` : 0,
          }}
          transition={{ 
            duration: 1.2, 
            delay: delay * 0.1 + 0.2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        />
      </div>
    </div>
  );
}

interface SkillCategoryProps {
  category: typeof skillCategories[0];
  index: number;
}

function SkillCategory({ category, index }: SkillCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-8"
    >
      <motion.div
        className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 cursor-pointer hover:border-[var(--accent)] transition-all"
        whileHover={{ scale: 1.02, borderColor: "var(--accent)" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-poppins font-bold text-lg text-[var(--text)]">
            {category.name}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[var(--muted)]"
          >
            ▼
          </motion.div>
        </div>
        
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isExpanded ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-2">
            {category.skills.map((skill, skillIndex) => {
              // Assign proficiency based on skill and category
              let proficiency = 0.7;
              let color = "var(--accent)";
              
              if (category.name === "ML / DL Frameworks") {
                proficiency = ["TensorFlow", "PyTorch"].includes(skill) ? 0.9 : 0.7;
                color = "#6366f1";
              } else if (category.name === "Computer Vision & NLP") {
                proficiency = ["OpenCV", "Transformers"].includes(skill) ? 0.85 : 0.75;
                color = "#22d3ee";
              } else if (category.name === "Reinforcement Learning") {
                proficiency = ["Stable Baselines", "Gymnasium"].includes(skill) ? 0.8 : 0.7;
                color = "#f472b6";
              } else if (category.name === "Languages & Tools") {
                proficiency = ["Python", "Docker", "Git"].includes(skill) ? 0.95 : 0.8;
                color = "#10b981";
              } else if (category.name === "Data & Visualization") {
                proficiency = ["Matplotlib", "Plotly"].includes(skill) ? 0.8 : 0.7;
                color = "#8b5cf6";
              } else if (category.name === "Research & Gen AI") {
                proficiency = ["Research Papers", "LLMs"].includes(skill) ? 0.8 : 0.6;
                color = "#f59e0b";
              }

              return (
                <SkillBar
                  key={skill}
                  skill={skill}
                  proficiency={proficiency}
                  color={color}
                  delay={skillIndex}
                />
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function SkillsVisualization() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-poppins font-bold text-3xl mb-4">
          Technical <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
          Proficiency across various technologies and frameworks, 
          visualized through interactive progress indicators.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <SkillCategory key={category.name} category={category} index={index} />
        ))}
      </div>
    </div>
  );
}
