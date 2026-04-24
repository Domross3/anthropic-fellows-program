"use client";

import { useEffect, useRef } from "react";

export default function Cosmos() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let stars: {
      x: number;
      y: number;
      r: number;
      tw: number;
      spd: number;
      drift: number;
      hue: "violet" | "white";
    }[] = [];
    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      const count = Math.floor((w * h) / 14000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 * dpr + 0.2,
        tw: Math.random() * Math.PI * 2,
        spd: Math.random() * 0.01 + 0.003,
        drift: Math.random() * 0.04 + 0.01,
        hue: Math.random() > 0.7 ? "violet" : "white",
      }));
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const g = ctx.createRadialGradient(
        w * 0.5,
        h * 0.55,
        0,
        w * 0.5,
        h * 0.55,
        Math.max(w, h) * 0.7
      );
      g.addColorStop(0, "rgba(61, 45, 107, 0.55)");
      g.addColorStop(0.5, "rgba(26, 17, 64, 0.35)");
      g.addColorStop(1, "rgba(5, 3, 15, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(
        w * 0.15,
        h * 0.2,
        0,
        w * 0.15,
        h * 0.2,
        Math.max(w, h) * 0.4
      );
      g2.addColorStop(0, "rgba(124, 92, 232, 0.25)");
      g2.addColorStop(1, "rgba(5, 3, 15, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        if (!reduceMotion) {
          s.tw += s.spd;
          s.y -= s.drift;
          if (s.y < -2) s.y = h + 2;
        }
        const alpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.tw));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle =
          s.hue === "violet"
            ? `rgba(196, 181, 253, ${alpha * 0.9})`
            : `rgba(244, 241, 255, ${alpha})`;
        ctx.fill();
        if (s.r > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167, 139, 250, ${alpha * 0.08})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
