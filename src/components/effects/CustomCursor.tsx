"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      setTimeout(() => {
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
      }, 80);
    };

    const onEnterLink = () => {
      if (!cursor) return;
      cursor.style.width = "24px";
      cursor.style.height = "24px";
      cursor.style.background = "var(--accent2)";
    };

    const onLeaveLink = () => {
      if (!cursor) return;
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursor.style.background = "var(--accent)";
    };

    window.addEventListener("mousemove", onMove);

    const interactables = document.querySelectorAll("a, button, [data-cursor='pointer']");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        id="custom-cursor"
        ref={cursorRef}
        style={{
          position: "fixed",
          width: 12,
          height: 12,
          background: "var(--accent)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%,-50%)",
          transition: "width 0.3s, height 0.3s, background 0.3s",
          mixBlendMode: "screen",
        }}
      />
      <div
        id="cursor-trail"
        ref={trailRef}
        style={{
          position: "fixed",
          width: 36,
          height: 36,
          border: "1px solid rgba(99,102,241,0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%,-50%)",
          transition: "left 0.12s ease-out, top 0.12s ease-out",
        }}
      />
    </>
  );
}
