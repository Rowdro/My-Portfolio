"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MessageCircle } from "lucide-react";
import { Magnetic } from "@/components/ui-motion/magnetic";
import { owner, hero } from "@/data/portfolio";
import { useIsDesktop } from "@/hooks/use-pointer";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

/** Pause the WebGL frameloop whenever the hero leaves the viewport. */
function useHeroVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** CSS-only fallback for mobile / reduced-motion — layered gradient orb. */
function OrbFallback() {
  return (
    <div className="relative w-full max-w-[520px] aspect-square" aria-hidden>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(240,238,230,0.16),rgba(205,251,78,0.10)_38%,rgba(55,226,162,0.06)_60%,transparent_75%)] blur-sm" />
      <div className="absolute inset-[14%] rounded-full border border-signal/40 animate-float" />
      <div className="absolute inset-[24%] rounded-full border border-mint/25" />
      <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(240,238,230,0.25),rgba(205,251,78,0.14)_45%,transparent_78%)] blur-md animate-float" style={{ animationDelay: "-2.4s" }} />
      <div className="absolute top-[12%] left-[16%] w-10 h-10 rounded-lg bg-signal/20 rotate-12 blur-[1px] animate-float" style={{ animationDelay: "-4.5s" }} />
      <div className="absolute bottom-[18%] right-[14%] w-7 h-7 rounded-full bg-mint/25 animate-float" style={{ animationDelay: "-1.2s" }} />
    </div>
  );
}

export function Hero({ start }: { start: boolean }) {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const show3D = isDesktop && !reduced;
  const { ref: sceneRef, visible: sceneVisible } = useHeroVisible();

  // entrance choreography offsets
  const d = useMemo(() => {
    const base = reduced ? 0 : 0.15;
    return { kicker: base, lines: base + 0.1, intro: base + 0.62, cta: base + 0.78, meta: base + 0.95 };
  }, [reduced]);

  const anim = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 34, filter: "blur(8px)" },
    animate: start ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: reduced ? 0.4 : 1.0, delay: start ? delay : 0, ease: EASE },
  });

  const lineAnim = (delay: number) => ({
    initial: { y: "112%" },
    animate: start && !reduced ? { y: 0 } : start ? { y: 0, opacity: 1 } : undefined,
    transition: { duration: reduced ? 0.4 : 1.05, delay: start ? delay : 0, ease: EASE },
  });

  return (
    <section id="top" className="relative min-h-svh flex flex-col overflow-hidden">
      {/* gradient lighting */}
      <div className="absolute inset-0 glow-signal pointer-events-none" aria-hidden />
      <div className="absolute top-0 right-0 w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(205,251,78,0.07),transparent_65%)] pointer-events-none" aria-hidden />

      {/* 3D / fallback visual */}
      <div ref={sceneRef} className="absolute inset-0 lg:left-[30%] pointer-events-none" aria-hidden>
        {show3D ? (
          <motion.div
            className="w-full h-full opacity-90"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={start ? { opacity: 0.9, scale: 1 } : undefined}
            transition={{ duration: 1.6, delay: 0.35, ease: EASE }}
          >
            <HeroScene paused={!sceneVisible} />
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-70">
            <OrbFallback />
          </div>
        )}
      </div>

      {/* content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-20 lg:pt-24">
        {/* availability + kicker */}
        <motion.div {...anim(d.kicker)} className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/60 backdrop-blur px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase text-ink">
            <span className="relative flex w-2 h-2">
              {owner.availability.open && (
                <span className="w-2 h-2 rounded-full bg-signal animate-pulse-dot" />
              )}
            </span>
            {owner.availability.label}
          </span>
        </motion.div>

        {/* headline */}
        <h1 className="mt-8 font-display font-bold uppercase tracking-tight leading-[0.98] text-[10.5vw] sm:text-[10vw] lg:text-[6.3vw]">
          <span className="block overflow-hidden pb-1">
            <motion.span className="block" {...lineAnim(d.lines)}>
              Building{" "}
              <span className="text-stroke">Digital</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span className="block" {...lineAnim(d.lines + 0.12)}>
              Experiences That{" "}
              <span className="text-signal">Move</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span className="block" {...lineAnim(d.lines + 0.24)}>
              Businesses Forward.
            </motion.span>
          </span>
        </h1>

        {/* intro + roles */}
        <motion.p
          {...anim(d.intro)}
          className="mt-8 max-w-md text-base sm:text-lg text-ink-dim leading-relaxed"
        >
          {owner.intro}
        </motion.p>
        <motion.div {...anim(d.intro + 0.08)} className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.22em] uppercase text-ink-faint">
          {owner.roles.map((r, i) => (
            <span key={r} className="inline-flex items-center gap-3">
              {i > 0 && <span className="text-signal">/</span>}
              {r}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div {...anim(d.cta)} className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
          <Magnetic>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-signal text-abyss font-semibold px-7 py-4 text-sm sm:text-base transition-colors duration-300 hover:bg-ink"
            >
              Explore My Work
              <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-line-strong text-ink font-semibold px-7 py-4 text-sm sm:text-base transition-all duration-300 hover:border-signal hover:text-signal"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              Let&apos;s Talk
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* bottom meta bar */}
      <motion.div
        {...anim(d.meta)}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 flex items-end justify-between"
      >
        <a href="#about" className="group flex items-center gap-3 text-ink-dim hover:text-signal transition-colors">
          <span className="flex items-center justify-center w-9 h-9 rounded-full border border-line-strong group-hover:border-signal transition-colors">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase">{hero.scrollHint}</span>
        </a>
        <div className="hidden md:block font-mono text-[11px] tracking-[0.25em] uppercase text-ink-faint text-right">
          <div>{owner.location}</div>
          <div className="mt-1 text-signal">{owner.availability.note}</div>
        </div>
      </motion.div>
    </section>
  );
}
