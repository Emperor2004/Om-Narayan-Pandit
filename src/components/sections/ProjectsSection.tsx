"use client";

import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechPill } from "@/components/ui/Badge";
import { useCardMouseGlow } from "@/hooks";
import { projects } from "@/data";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, handleMouseMove } = useCardMouseGlow();
  const isFeatured = project.featured;

  return (
    <Reveal delay={index * 80} className={cn(isFeatured && "md:col-span-2")}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn(
          "card-glow group h-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6",
          "hover:-translate-y-2 hover:border-accent/40 hover:shadow-glow-sm transition-all duration-300",
          isFeatured && "border-accent/25 bg-gradient-to-br from-accent/5 to-[var(--card)]"
        )}
      >
        <div className="relative z-10 flex flex-col h-full">
          {/* Type */}
          <div className="flex items-center gap-2 font-mono text-[0.65rem] text-[var(--accent2)] uppercase tracking-wider mb-3">
            <span className="text-[0.5rem]">●</span>
            {project.type}
            {isFeatured && (
              <span className="ml-auto text-accent border border-accent/30 bg-accent/10 px-1.5 py-0.5 rounded text-[0.6rem]">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-syne font-bold text-lg leading-tight mb-3 group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <TechPill key={tag} label={tag} />
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[0.72rem] text-[var(--muted)] border border-[var(--border)] px-3 py-1.5 rounded-lg hover:text-[var(--accent2)] hover:border-[var(--accent2)] transition-all cursor-none"
              >
                <Github size={12} /> GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[0.72rem] text-[var(--muted)] border border-[var(--border)] px-3 py-1.5 rounded-lg hover:text-[var(--accent2)] hover:border-[var(--accent2)] transition-all cursor-none"
              >
                <ExternalLink size={12} /> Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader
            label="02 · Projects"
            title={<>Things I&apos;ve <span className="gradient-text-cyan">built</span></>}
            subtitle="A selection of projects spanning deep learning, RL, NLP, and applied AI."
          />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
