"use client";

import { useScrollReveal, useCounter } from "@/hooks";
import { stats } from "@/data";

function StatItem({ value, label }: { value: string; label: string }) {
  const { ref, isVisible } = useScrollReveal();
  const numTarget = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[\d]/g, "");
  const count = useCounter(numTarget, 1500, isVisible);

  return (
    <div ref={ref} className="text-center">
      <div className="font-syne font-extrabold text-3xl md:text-4xl tracking-tight gradient-text">
        {isVisible ? `${count}${suffix}` : "0"}
      </div>
      <div className="font-mono text-[0.72rem] text-[var(--muted)] mt-1 tracking-wider">
        {label}
      </div>
    </div>
  );
}

export function StatsBar() {
  return (
    <div className="border-y border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <StatItem key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
