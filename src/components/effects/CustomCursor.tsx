"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef<{ x: number; y: number; lastUpdate?: number }>({ x: 0, y: 0 });
  const visibilityRef = useRef<boolean>(true);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    // Disable custom cursor on admin page
    if (window.location.pathname.startsWith('/admin')) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      // Throttle mouse movement to reduce updates
      if (performance.now() - (pos.current.lastUpdate || 0) < 16) return; // ~60fps
      
      pos.current = { x: e.clientX, y: e.clientY, lastUpdate: performance.now() };
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Use requestAnimationFrame for smoother trail animation
      requestAnimationFrame(() => {
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
      });
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

    const onVisibilityChange = () => {
      visibilityRef.current = !document.hidden;
      if (!visibilityRef.current) {
        // Hide cursor when tab is not visible
        cursor.style.opacity = "0";
        trail.style.opacity = "0";
      } else {
        cursor.style.opacity = "1";
        trail.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Cache interactable elements and use event delegation
    const handleInteract = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("a, button, [data-cursor='pointer']")) {
        onEnterLink();
      }
    };

    const handleInteractLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("a, button, [data-cursor='pointer']")) {
        onLeaveLink();
      }
    };

    window.addEventListener("mouseover", handleInteract, true);
    window.addEventListener("mouseout", handleInteractLeave, true);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("mouseover", handleInteract, true);
      window.removeEventListener("mouseout", handleInteractLeave, true);
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
          transition: "width 0.1s, height 0.1s, background 0.1s",
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
          border: "1px solid rgba(99,102,241,0.3)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%,-50%)",
          transition: "left 0.08s ease-out, top 0.08s ease-out"
        }}
      />
    </>
  );
}
