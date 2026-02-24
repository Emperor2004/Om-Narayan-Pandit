import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NeuralCanvas } from "@/components/effects/NeuralCanvas";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { TechPill } from "@/components/ui/Badge";
import { blogPosts } from "@/data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

// Simple markdown-to-HTML renderer for headings, lists, blockquotes
function renderMarkdown(content: string): string {
  return content
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("## ")) return `<h2>${block.slice(3)}</h2>`;
      if (block.startsWith("# ")) return `<h2>${block.slice(2)}</h2>`;
      if (block.startsWith("> ")) return `<blockquote>${block.slice(2)}</blockquote>`;
      if (block.includes("\n- ") || block.startsWith("- ")) {
        const items = block
          .split("\n")
          .filter((l) => l.startsWith("- "))
          .map((l) => `<li>${l.slice(2)}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/`(.*?)`/g, "<code>$1</code>")}</p>`;
    })
    .join("\n");
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug && p.published);
  if (!post) notFound();

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <NeuralCanvas />
      <Navbar />

      <main className="pt-28 pb-24 min-h-screen relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[0.75rem] text-[var(--muted)] hover:text-[var(--accent2)] transition-colors mb-10 cursor-none"
          >
            <ArrowLeft size={12} /> All posts
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1 font-mono text-[0.68rem] text-[var(--muted)]">
                <Calendar size={10} /> {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1 font-mono text-[0.68rem] text-[var(--muted)]">
                <Clock size={10} /> {post.readTime} min read
              </span>
            </div>
            <h1 className="font-syne font-extrabold text-3xl md:text-4xl tracking-tight leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-[var(--muted)] text-lg leading-relaxed mb-5">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => <TechPill key={tag} label={tag} />)}
            </div>
          </header>

          {/* Divider */}
          <div className="section-divider mb-10" />

          {/* Content */}
          <article
            className="prose-portfolio"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
