"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/ui-motion/reveal";
import { SectionHeading } from "@/components/ui-motion/section-heading";
import { process } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Process() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="process" className="relative py-28 sm:py-36 lg:py-44" aria-label="My process">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          index="06"
          kicker="Workflow"
          title="My Process"
          description="Six steps, zero guesswork. A transparent workflow from first call to post-launch growth."
        />

        <StaggerGroup className="border-t border-line" amount={0.05}>
          {process.map((p, i) => (
            <StaggerItem key={p.step}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "group relative grid grid-cols-1 sm:grid-cols-[auto_1fr_1fr] items-baseline gap-x-8 gap-y-3 py-8 sm:py-10 border-b border-line transition-colors duration-500",
                  hovered !== null && hovered !== i && "opacity-45"
                )}
              >
                {/* hover wash */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-signal/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden
                />

                {/* number */}
                <motion.span
                  className="relative font-display font-bold text-5xl sm:text-6xl leading-none tracking-tight transition-colors duration-500 group-hover:text-signal"
                  animate={{ x: hovered === i ? 10 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {p.step}
                  <span className="text-ink-faint">.</span>
                </motion.span>

                {/* title */}
                <h3 className="relative font-display font-bold uppercase tracking-tight text-2xl sm:text-3xl text-ink group-hover:text-signal transition-colors duration-500">
                  {p.title}
                </h3>

                {/* text */}
                <p className="relative text-ink-dim text-[15px] sm:text-base leading-relaxed max-w-xl">
                  {p.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <p className="mt-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase text-ink-faint">
            <Asterisk className="w-4 h-4 text-signal shrink-0" aria-hidden />
            Every engagement is tailored — the process bends to the project, never the reverse.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
