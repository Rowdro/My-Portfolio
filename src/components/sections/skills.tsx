"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, MaskReveal } from "@/components/ui-motion/reveal";
import { SectionHeading } from "@/components/ui-motion/section-heading";
import { skills } from "@/data/portfolio";

const GROUPS = [skills.core, skills.platforms, skills.craft];

const NOTES: Record<string, string> = {
  HTML: "Semantic, accessible markup — the foundation of every build.",
  CSS: "Modern layouts, fluid type, and motion with intent.",
  JavaScript: "Interactive experiences, from micro-UI to app logic.",
  Python: "Backend logic, scripting and automation that supports the front of the stack.",
  MySQL: "Relational data — schemas, queries and clean modeling for dynamic sites.",
  "Responsive Web Development": "One codebase, every device — designed, not shrunk.",
  Shopify: "My home turf — themes, apps and storefronts that sell.",
  Liquid: "Deep theme-level control of every Shopify template.",
  WordPress: "Custom themes and clean, extensible architecture.",
  WooCommerce: "WordPress-powered commerce, done properly.",
  PHP: "Server-side logic, custom functionality and integrations.",
  "Three.js": "WebGL scenes and 3D moments that elevate a brand.",
  Git: "Disciplined versioning and clean collaboration.",
  Figma: "Where every pixel is decided before it's coded.",
  "Google Stitch": "AI-powered UI design — turning ideas into interface drafts, fast.",
};

export function Skills() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden" aria-label="Skills and technologies">
      <div className="absolute inset-0 glow-soft opacity-50 pointer-events-none" aria-hidden />
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          index="04"
          kicker="Toolkit"
          title="Skills & Technologies"
          description="The stack behind the work — platforms I build on daily and tools I keep sharpening. Hover any skill for the story."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* sticky note panel */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-32 rounded-2xl border border-line bg-surface p-7 min-h-[150px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28 }}
                  >
                    <p className="font-display font-bold text-xl text-signal">{active}</p>
                    <p className="mt-3 text-sm text-ink-dim leading-relaxed">{NOTES[active]}</p>
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-ink-faint leading-relaxed"
                  >
                    Hover a skill to see how I use it —
                    <br />
                    every tool earns its place in the stack.
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="mt-8 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-ink-faint">
                <span className="w-2 h-2 rounded-full bg-signal animate-pulse-dot" />
                Always learning, always shipping
              </div>
            </div>
          </div>

          {/* chips */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-10">
            {GROUPS.map((g, gi) => (
              <div key={g.label}>
                <MaskReveal>
                  <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-ink-faint mb-5">
                    <span className="text-signal mr-3">0{gi + 1}</span>
                    {g.label}
                  </p>
                </MaskReveal>
                <Reveal delay={0.05}>
                  <div className="flex flex-wrap gap-3">
                    {g.items.map((item) => (
                      <button
                        key={item}
                        onMouseEnter={() => setActive(item)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(item)}
                        onBlur={() => setActive(null)}
                        className="group rounded-full border border-line-strong bg-surface px-5 sm:px-6 py-3 text-sm sm:text-base font-medium text-ink transition-all duration-300 hover:border-signal hover:bg-signal hover:text-abyss hover:-translate-y-0.5"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
