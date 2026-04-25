"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DocumentMeta, AuraColor } from "@/lib/types";

const AURA_VAR: Record<AuraColor, string> = {
  resume: "var(--aura-resume)",
  transcript: "var(--aura-transcript)",
  project: "var(--aura-project)",
  essay: "var(--aura-essay)",
  certification: "var(--aura-certification)",
};

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface CarouselProps {
  items: DocumentMeta[];
  onOpen: (item: DocumentMeta) => void;
  autoAdvance?: boolean;
  pauseMs?: number;
  transitionMs?: number;
  showScrubber?: boolean;
}

export default function Carousel({
  items,
  onOpen,
  autoAdvance = true,
  pauseMs = 2800,
  transitionMs = 1100,
  showScrubber = true,
}: CarouselProps) {
  const n = items.length;
  const [pos, setPos] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const targetRef = useRef(0);
  const animRef = useRef(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wheelAccum = useRef(0);
  const wheelCooldown = useRef(0);

  useEffect(() => {
    if (paused || scrubbing || !autoAdvance || n <= 1) return;
    let cancelled = false;
    let pauseTimer: ReturnType<typeof setTimeout>;
    let rafId = 0;

    function scheduleNext() {
      pauseTimer = setTimeout(() => {
        if (cancelled) return;
        const from = targetRef.current;
        const to = from + 1;
        const start = performance.now();
        const dur = transitionMs;
        function tick(now: number) {
          if (cancelled) return;
          const t = Math.min(1, (now - start) / dur);
          const eased = easeInOutCubic(t);
          setPos((((from + (to - from) * eased) % n) + n) % n);
          if (t < 1) {
            rafId = requestAnimationFrame(tick);
          } else {
            targetRef.current = to % n;
            setPos(targetRef.current);
            scheduleNext();
          }
        }
        rafId = requestAnimationFrame(tick);
      }, pauseMs);
    }
    scheduleNext();

    return () => {
      cancelled = true;
      clearTimeout(pauseTimer);
      cancelAnimationFrame(rafId);
    };
  }, [paused, scrubbing, autoAdvance, pauseMs, transitionMs, n]);

  function jumpTo(i: number) {
    cancelAnimationFrame(animRef.current);
    const from = pos;
    const to = i;
    const diff = (((to - from) % n) + n) % n;
    const signed = diff > n / 2 ? diff - n : diff;
    const end = from + signed;
    const start = performance.now();
    const dur = 700;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / dur);
      const eased = easeInOutCubic(t);
      setPos((((from + (end - from) * eased) % n) + n) % n);
      if (t < 1) animRef.current = requestAnimationFrame(tick);
      else {
        targetRef.current = i;
        setPos(i);
      }
    }
    animRef.current = requestAnimationFrame(tick);
  }

  function stepBy(delta: number) {
    if (!delta) return;
    cancelAnimationFrame(animRef.current);
    const from = pos;
    const end = from + delta;
    const start = performance.now();
    const dur = Math.min(1100, 520 + Math.abs(delta) * 220);
    function tick(now: number) {
      const t = Math.min(1, (now - start) / dur);
      const eased = easeInOutCubic(t);
      setPos((((from + (end - from) * eased) % n) + n) % n);
      if (t < 1) animRef.current = requestAnimationFrame(tick);
      else {
        const landed = ((Math.round(end) % n) + n) % n;
        targetRef.current = landed;
        setPos(landed);
      }
    }
    animRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      const ax = Math.abs(e.deltaX);
      const ay = Math.abs(e.deltaY);
      // Only hijack on strong horizontal dominance or explicit shift+wheel.
      // Vertical scroll always passes through to the page.
      const horizontalIntent = (ax > ay * 2 && ax > 8) || e.shiftKey;
      if (!horizontalIntent) return;
      const delta = e.shiftKey ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 1) return;
      e.preventDefault();
      wheelAccum.current += delta;
      const THRESH = 55;
      const now = performance.now();
      if (now < wheelCooldown.current) return;
      if (Math.abs(wheelAccum.current) >= THRESH) {
        const steps =
          Math.sign(wheelAccum.current) *
          Math.min(3, Math.floor(Math.abs(wheelAccum.current) / THRESH));
        wheelAccum.current = 0;
        wheelCooldown.current = now + 260;
        stepBy(steps);
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [pos, n]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let startX: number | null = null;
    let accum = 0;
    const STEP_PX = 140;

    function onDown(e: PointerEvent) {
      startX = e.clientX;
      accum = 0;
    }
    function onMove(e: PointerEvent) {
      if (startX == null) return;
      accum = e.clientX - startX;
    }
    function onUp() {
      if (startX == null) return;
      const steps = -Math.round(accum / STEP_PX);
      startX = null;
      if (steps) stepBy(steps);
    }
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [pos, n]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!paused) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        stepBy(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepBy(-1);
      } else if (e.key === "Enter" || e.key === " ") {
        const centerIdx = Math.round(pos) % n;
        onOpen(items[centerIdx]);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paused, pos, n, items, onOpen]);

  function relOf(i: number) {
    let r = i - pos;
    if (r > n / 2) r -= n;
    if (r < -n / 2) r += n;
    return r;
  }

  function transformFor(rel: number) {
    const absR = Math.abs(rel);
    const x = rel * 260;
    const z = -absR * 220;
    const rotY = -rel * 22;
    const scale = 1 - Math.min(absR, 1.6) * 0.26;
    let opacity: number;
    if (absR <= 1) opacity = 1 - absR * 0.35;
    else opacity = Math.max(0, 0.65 - (absR - 1) * 1.3);
    const blur = Math.min(absR * 2.5, 8);
    return { x, z, rotY, scale, opacity, blur };
  }

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        height: 520,
        perspective: 1400,
        perspectiveOrigin: "50% 50%",
        outline: "none",
        touchAction: "pan-y",
        cursor: "grab",
      }}
      aria-roledescription="carousel"
      aria-label="Featured reference materials"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((m, i) => {
          const rel = relOf(i);
          if (Math.abs(rel) > 1.8) return null;
          const t = transformFor(rel);
          const isCenter = Math.abs(rel) < 0.5;
          return (
            <div
              key={m.id}
              onClick={() => {
                if (isCenter) onOpen(m);
                else jumpTo(i);
              }}
              style={{
                position: "absolute",
                width: 320,
                height: 400,
                transform: `translate3d(${t.x}px, 0, ${t.z}px) rotateY(${t.rotY}deg) scale(${t.scale})`,
                opacity: t.opacity,
                filter: `blur(${t.blur}px)`,
                transition: "none",
                cursor: "pointer",
                transformStyle: "preserve-3d",
                zIndex: isCenter ? 3 : 2 - Math.abs(Math.round(rel)),
              }}
              aria-current={isCenter ? "true" : undefined}
            >
              <OvalCard item={m} active={isCenter} />
            </div>
          );
        })}
      </div>

      {/* Left/Right fog curtains */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "22%",
          background:
            "linear-gradient(90deg, rgba(10,6,32,0.95) 0%, rgba(10,6,32,0.7) 40%, rgba(10,6,32,0) 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          pointerEvents: "none",
          zIndex: 4,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "22%",
          background:
            "linear-gradient(270deg, rgba(10,6,32,0.95) 0%, rgba(10,6,32,0.7) 40%, rgba(10,6,32,0) 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          pointerEvents: "none",
          zIndex: 4,
        }}
      />

      {/* Rune dots */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 14,
          zIndex: 5,
        }}
      >
        {items.map((m, i) => {
          const activeDot = Math.round(pos) % n === i;
          return (
            <button
              key={m.id}
              onClick={() => jumpTo(i)}
              aria-label={`Show ${m.title}`}
              style={{
                width: activeDot ? 28 : 8,
                height: 8,
                borderRadius: 9999,
                background: activeDot
                  ? "linear-gradient(90deg, var(--aura), var(--aura-bright))"
                  : "rgba(196, 181, 253, 0.25)",
                border: 0,
                padding: 0,
                cursor: "pointer",
                transition:
                  "width 600ms var(--ease-mystic), background 400ms",
                boxShadow: activeDot ? "0 0 12px var(--aura-soft)" : "none",
              }}
            />
          );
        })}
      </div>

      {showScrubber && n > 1 && (
        <Scrubber
          pos={pos}
          n={n}
          items={items}
          onScrubStart={() => {
            cancelAnimationFrame(animRef.current);
            setScrubbing(true);
          }}
          onScrub={(p) => setPos(p)}
          onScrubEnd={(landed) => {
            targetRef.current = landed;
            setPos(landed);
            setScrubbing(false);
          }}
        />
      )}
    </div>
  );
}

function Scrubber({
  pos,
  n,
  items,
  onScrubStart,
  onScrub,
  onScrubEnd,
}: {
  pos: number;
  n: number;
  items: DocumentMeta[];
  onScrubStart: () => void;
  onScrub: (p: number) => void;
  onScrubEnd: (landed: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const progress = n > 1 ? pos / (n - 1) : 0;
  const pct = Math.max(0, Math.min(1, progress)) * 100;

  function posFromClientX(clientX: number) {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const x = clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    return ratio * (n - 1);
  }

  function onDown(e: React.PointerEvent) {
    e.preventDefault();
    setDragging(true);
    onScrubStart();
    const p = posFromClientX(e.clientX);
    onScrub(p);

    function onMove(ev: PointerEvent) {
      onScrub(posFromClientX(ev.clientX));
    }
    function onUp(ev: PointerEvent) {
      const p2 = posFromClientX(ev.clientX);
      const landed = Math.max(0, Math.min(n - 1, Math.round(p2)));
      onScrubEnd(landed);
      setDragging(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  const currentLabel = items[Math.round(pos) % n]?.title ?? "";

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: -78,
        transform: "translateX(-50%)",
        width: "min(420px, 60%)",
        zIndex: 6,
        userSelect: "none",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontSize: 15,
          fontStyle: "italic",
          color: "var(--fg-moon)",
          letterSpacing: "0.02em",
          marginBottom: 10,
          transition: "color 200ms",
          textShadow: "0 0 12px rgba(167,139,250,0.35)",
          minHeight: 22,
        }}
      >
        {currentLabel}
      </div>

      <div
        ref={trackRef}
        onPointerDown={onDown}
        style={{
          position: "relative",
          height: 40,
          display: "flex",
          alignItems: "center",
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: 2,
            transform: "translateY(-50%)",
            background:
              "linear-gradient(90deg, rgba(196,181,253,0.08), rgba(196,181,253,0.35), rgba(196,181,253,0.08))",
            borderRadius: 9999,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            height: 2,
            width: `${pct}%`,
            transform: "translateY(-50%)",
            background:
              "linear-gradient(90deg, var(--aura-deep), var(--aura), var(--aura-bright))",
            borderRadius: 9999,
            boxShadow: "0 0 12px rgba(167,139,250,0.6)",
            pointerEvents: "none",
          }}
        />

        {items.map((it, i) => {
          const tPct = (i / (n - 1)) * 100;
          const reached = i <= pos + 0.001;
          return (
            <div
              key={it.id}
              style={{
                position: "absolute",
                left: `${tPct}%`,
                top: "50%",
                width: 6,
                height: 6,
                transform: "translate(-50%, -50%)",
                borderRadius: 9999,
                background: reached
                  ? "var(--aura-bright)"
                  : "rgba(196,181,253,0.25)",
                boxShadow: reached ? "0 0 10px var(--aura)" : "none",
                transition: "background 200ms, box-shadow 200ms",
                pointerEvents: "none",
              }}
            />
          );
        })}

        <div
          style={{
            position: "absolute",
            left: `${pct}%`,
            top: "50%",
            transform: `translate(-50%, -50%) scale(${dragging ? 1.18 : 1})`,
            width: 22,
            height: 22,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at 30% 30%, #ffffff 0%, var(--aura-bright) 40%, var(--aura-deep) 100%)",
            border: "1px solid rgba(255,255,255,0.55)",
            boxShadow: dragging
              ? "0 0 0 6px rgba(167,139,250,0.22), 0 0 28px rgba(167,139,250,0.75)"
              : "0 0 0 3px rgba(167,139,250,0.18), 0 0 18px rgba(167,139,250,0.55)",
            transition:
              "box-shadow 200ms, transform 160ms cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

function OvalCard({ item, active }: { item: DocumentMeta; active: boolean }) {
  const aura = AURA_VAR[item.aura];
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 160,
        background:
          "linear-gradient(180deg, rgba(36,23,87,0.55) 0%, rgba(18,10,53,0.85) 100%)",
        border: "1px solid rgba(196, 181, 253, 0.28)",
        boxShadow: active
          ? `0 0 0 1px rgba(196,181,253,0.35), 0 0 60px 4px ${aura}55, 0 30px 80px rgba(0,0,0,0.6)`
          : "0 0 30px rgba(167,139,250,0.2), 0 20px 50px rgba(0,0,0,0.5)",
        overflow: "hidden",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          overflow: "hidden",
        }}
      >
        {item.imagePath ? (
          <Image
            src={item.imagePath}
            alt=""
            fill
            sizes="320px"
            style={{
              objectFit: "cover",
              filter: "saturate(0.82) contrast(1.05) brightness(0.72)",
            }}
            priority={active}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `radial-gradient(circle at 30% 20%, ${aura}55, transparent 60%), radial-gradient(circle at 70% 70%, #2b1963 0%, #0a0620 100%)`,
            }}
          />
        )}
        {/* tint overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, ${aura}22 0%, transparent 30%, rgba(10,6,32,0.3) 55%, rgba(10,6,32,0.95) 100%)`,
          }}
        />
        {/* inner mist */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(196,181,253,0.12) 0%, transparent 55%)",
          }}
        />
        {/* fog plate behind text */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "48%",
            background:
              "linear-gradient(180deg, rgba(10,6,32,0) 0%, rgba(10,6,32,0.55) 30%, rgba(10,6,32,0.85) 65%, rgba(18,10,53,0.95) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            boxShadow:
              "inset 0 0 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(196,181,253,0.18)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 42,
          left: 32,
          right: 32,
          textAlign: "center",
          color: "var(--fg-star)",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: "0.01em",
            lineHeight: 1.1,
            textShadow: `0 0 24px ${aura}aa, 0 2px 10px rgba(0,0,0,0.9)`,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 12.5,
            color: "var(--fg-moon)",
            lineHeight: 1.5,
            fontWeight: 300,
            letterSpacing: "0.01em",
            textShadow: "0 1px 6px rgba(0,0,0,0.95)",
          }}
        >
          {item.description}
        </div>
      </div>

      {active && <Particles aura={aura} />}
    </div>
  );
}

function Particles({ aura }: { aura: string }) {
  const parts = Array.from({ length: 10 }, (_, i) => i);
  return (
    <>
      {parts.map((i) => (
        <span
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            left: `${(i * 37) % 100}%`,
            top: `${((i * 53) % 90) + 5}%`,
            width: 3,
            height: 3,
            borderRadius: 9999,
            background: aura,
            boxShadow: `0 0 8px ${aura}`,
            animation: `float ${4 + (i % 5)}s ease-in-out ${i * 0.3}s infinite alternate`,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}
