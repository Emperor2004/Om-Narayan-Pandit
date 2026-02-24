import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechPill } from "@/components/ui/Badge";
import { blogPosts } from "@/data";
import { formatDate } from "@/lib/utils";

export function BlogSection() {
  const published = blogPosts.filter((p) => p.published).slice(0, 3);

  return (
    <section id="blog" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              label="04 · Blog"
              title={<>Writing &amp; <span className="gradient-text-cyan">thoughts</span></>}
              className="mb-0"
            />
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 font-mono text-[0.75rem] text-[var(--muted)] hover:text-[var(--accent2)] transition-colors cursor-none"
            >
              All posts <ArrowRight size={12} />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {published.map((post, i) => (
            <Reveal key={post.id} delay={i * 80}>
              <Link href={`/blog/${post.slug}`} className="cursor-none">
                <div className="group h-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:-translate-y-2 hover:border-accent/35 hover:shadow-glow-sm transition-all duration-300">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[0.65rem] text-[var(--muted)]">
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[0.65rem] text-[var(--muted)]">
                      <Clock size={9} /> {post.readTime} min read
                    </span>
                  </div>

                  <h3 className="font-syne font-bold text-base leading-snug mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <TechPill key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-[0.8rem] text-[var(--muted)] hover:text-[var(--accent2)] transition-colors cursor-none"
            >
              All posts <ArrowRight size={12} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
