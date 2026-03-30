import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NeuralCanvas } from "@/components/effects/NeuralCanvas";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Reveal } from "@/components/ui/Reveal";
import { TechPill } from "@/components/ui/Badge";
import { blogPosts } from "@/data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on AI, machine learning, reinforcement learning, and research.",
};

export default function BlogPage() {
  const published = blogPosts.filter((p) => p.published);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <NeuralCanvas />
      <Navbar />

      <main className="pt-28 pb-24 min-h-screen relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[0.75rem] text-[var(--muted)] hover:text-[var(--accent2)] transition-colors mb-10 cursor-none"
            >
              <ArrowLeft size={12} /> Back home
            </Link>

            <div className="mb-12">
              <div className="font-mono text-[0.72rem] text-accent uppercase tracking-[0.15em] mb-3 flex items-center gap-3">
                <span className="w-6 h-px bg-accent" /> Writing
              </div>
              <h1 className="font-syne font-extrabold text-4xl tracking-tight mb-3">
                Blog &amp; <span className="gradient-text-cyan">Thoughts</span>
              </h1>
              <p className="text-[var(--muted)] leading-relaxed">
                Conceptual deep-dives, research notes, and tutorials on AI/ML topics.
              </p>
            </div>
          </Reveal>

          <div className="space-y-5">
            {published.map((post, i) => (
              <Reveal key={post.id} delay={i * 80}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-none"
                >
                  <div className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:border-accent/35 hover:-translate-x-1 hover:shadow-glow-sm transition-all duration-300">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="font-mono text-[0.65rem] text-[var(--muted)]">
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[0.65rem] text-[var(--muted)]">
                        <Clock size={9} /> {post.readTime} min read
                      </span>
                    </div>

                    <h2 className="font-syne font-bold text-xl mb-2 group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-[var(--muted)] leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <TechPill key={tag} label={tag} />
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
