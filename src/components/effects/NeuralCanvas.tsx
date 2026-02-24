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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;
    const nodes: Node[] = [];
    const particles: Particle[] = [];

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    for (let i = 0; i < 65; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.7 - 0.2,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.35,
        hue: Math.random() > 0.5 ? 245 : 190,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const mdist = Math.sqrt(dx * dx + dy * dy);
        const glow = mdist < 130 ? (1 - mdist / 130) * 0.85 : 0;

        if (glow > 0.2) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, (n.size + glow * 3) * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99,102,241,${glow * 0.04})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size + glow * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${n.alpha + glow * 0.6})`;
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
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
