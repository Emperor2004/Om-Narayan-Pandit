"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
  hue: number;
}

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const visibilityRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;
    const nodes: Node[] = [];
    const particles: Particle[] = [];
    let resizeTimeout: NodeJS.Timeout;

    function resize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        W = canvas!.width = window.innerWidth;
        H = canvas!.height = window.innerHeight;
      }, 250);
    }
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const onVisibilityChange = () => {
      visibilityRef.current = !document.hidden;
      if (!visibilityRef.current && animRef.current) {
        cancelAnimationFrame(animRef.current);
      } else if (visibilityRef.current) {
        draw();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Get seasonal theme based on month
    const getSeasonalColors = () => {
      const month = new Date().getMonth();
      const seasons = {
        winter: { primary: [99, 102, 241], secondary: [34, 211, 238] }, // Blue, Cyan
        spring: { primary: [34, 197, 94], secondary: [16, 185, 129] }, // Green, Emerald
        summer: { primary: [251, 146, 60], secondary: [245, 158, 11] }, // Yellow, Orange
        fall: { primary: [217, 70, 239], secondary: [251, 146, 60] }, // Purple, Yellow
      };
      
      if (month >= 2 && month <= 4) return seasons.spring;
      if (month >= 5 && month <= 7) return seasons.summer;
      if (month >= 8 && month <= 10) return seasons.fall;
      return seasons.winter;
    };

    const seasonalColors = getSeasonalColors();
    const [primaryR, primaryG, primaryB] = seasonalColors.primary;
    const [secondaryR, secondaryG, secondaryB] = seasonalColors.secondary;

    // Reduced number of particles for better performance
    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 1,
        alpha: Math.random() * 0.4 + 0.3,
      });
    }

    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 1 + 0.2,
        alpha: Math.random() * 0.3 + 0.2,
        hue: Math.random() > 0.5 ? secondaryG : primaryG,
      });
    }

    function draw() {
      // Exit early if not visible
      if (!visibilityRef.current) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // Optimized connections - only check nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) { // Reduced from 160
            const alpha = (1 - dist / 120) * 0.18; // Reduced opacity
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.lineWidth = 0.3; // Reduced width
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const mdist = Math.sqrt(dx * dx + dy * dy);
        const glow = mdist < 100 ? (1 - mdist / 100) * 0.6 : 0; // Reduced range

        if (glow > 0.1) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, (n.size + glow * 2) * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99,102,241,${glow * 0.02})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${n.alpha + glow * 0.4})`;
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      // Particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,70%,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < 0 || p.x > W) p.vx *= -1;
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
