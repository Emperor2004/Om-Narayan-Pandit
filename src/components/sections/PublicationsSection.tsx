import { FileText, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Badge, TechPill } from "@/components/ui/Badge";
import { publications } from "@/data";
import { statusConfig } from "@/lib/utils";
import type { PublicationStatus } from "@/types";

const statusVariantMap: Record<PublicationStatus, "success" | "cyan" | "accent" | "pink"> = {
  published: "success",
  "under-review": "cyan",
  "in-progress": "accent",
  "technical-report": "pink",
};

export function PublicationsSection() {
  return (
    <section id="publications" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeader
            label="03 · Research"
            title={<>Publications &amp; <span className="gradient-text-cyan">papers</span></>}
            subtitle="Research at the intersection of AI safety, explainability, and applied ML."
          />
        </Reveal>

        <div className="space-y-4">
          {publications.map((pub, i) => (
            <Reveal key={pub.id} delay={i * 80}>
              <div className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex gap-5 hover:border-accent/35 hover:translate-x-1 transition-all duration-300 cursor-none">
                {/* Year */}
                <div className="flex-none">
                  <span className="font-mono font-bold text-sm text-accent">{pub.year}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-syne font-bold text-base leading-snug mb-1 group-hover:text-accent transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-pink-glow/80 text-sm italic mb-2">{pub.venue}</p>
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
                    {pub.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {pub.tags.map((tag) => (
                      <TechPill key={tag} label={tag} />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant={statusVariantMap[pub.status]}>
                      {statusConfig[pub.status].label}
                    </Badge>

                    {pub.arxivUrl && (
                      <a
                        href={pub.arxivUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-mono text-[0.7rem] text-[var(--muted)] hover:text-[var(--accent2)] transition-colors cursor-none"
                      >
                        <ExternalLink size={10} /> arXiv
                      </a>
                    )}
                    {pub.pdfUrl && (
                      <a
                        href={pub.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-mono text-[0.7rem] text-[var(--muted)] hover:text-[var(--accent2)] transition-colors cursor-none"
                      >
                        <FileText size={10} /> PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
