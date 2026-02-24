"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[9997] transition-all duration-100"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(to right, #6366f1, #22d3ee, #f472b6)",
      }}
    />
  );
}
