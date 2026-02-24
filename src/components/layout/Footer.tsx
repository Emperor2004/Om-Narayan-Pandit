import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[0.7rem] text-[var(--muted)]">
          Designed &amp; Built by{" "}
          <span className="text-accent font-bold">Om Narayan Pandit</span> · 2025
        </p>
        <div className="flex items-center gap-6">
          {[
            { href: "https://github.com/omnarayanpandit", label: "GitHub" },
            { href: "https://linkedin.com/in/omnarayanpandit", label: "LinkedIn" },
            { href: "https://twitter.com/omnarayanpandit", label: "Twitter" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.7rem] text-[var(--muted)] hover:text-[var(--accent2)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <p className="font-mono text-[0.7rem] text-[var(--muted)]">
          Made with curiosity &amp; caffeine ☕
        </p>
      </div>
    </footer>
  );
}
