"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal, MaskReveal, StaggerGroup, StaggerItem } from "@/components/ui-motion/reveal";
import { SectionHeading } from "@/components/ui-motion/section-heading";
import { about } from "@/data/portfolio";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // gentle parallax on the portrait
  const imgY = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-36 lg:py-44"
      aria-label="About me"
    >
      <div className="absolute inset-0 glow-soft pointer-events-none opacity-60" aria-hidden />
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading index="01" kicker="About" title={about.heading} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* portrait card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <figure className="group relative">
                <div
                  className="absolute -inset-3 rounded-2xl border border-line-strong rotate-[1.5deg] group-hover:rotate-[0.8deg] transition-transform duration-700"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-2xl border border-line bg-surface aspect-[4/4.4]">
                  <motion.div
                    className="absolute inset-[-8%]"
                    style={reduced ? undefined : { y: imgY }}
                  >
                    <Image
                      src={about.image}
                      alt={about.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover scale-[1.08] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.14]"
                      priority={false}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" aria-hidden />
                </div>
                <figcaption className="mt-4 flex items-center justify-between font-mono text-[11px] tracking-[0.22em] uppercase text-ink-faint">
                  <span>Fig. 01 — The Craft</span>
                  <span className="text-signal">◈ Digital Experience</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* editorial copy */}
          <div className="lg:col-span-7">
            <MaskReveal>
              <p className="font-display font-semibold text-2xl sm:text-3xl lg:text-[2.1rem] leading-snug text-ink">
                {about.lead}
              </p>
            </MaskReveal>

            <div className="mt-8 space-y-6 max-w-2xl">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.06 * i}>
                  <p className="text-ink-dim leading-relaxed text-base sm:text-[17px]">{p}</p>
                </Reveal>
              ))}
            </div>

            {/* principles grid */}
            <StaggerGroup className="mt-12 grid sm:grid-cols-2 gap-px bg-line rounded-2xl overflow-hidden border border-line">
              {about.principles.map((pr, i) => (
                <StaggerItem key={pr.title} className="bg-surface p-6 sm:p-7 hover:bg-surface-2 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-signal mt-1">0{i + 1}</span>
                    <div>
                      <h3 className="font-display font-bold text-lg text-ink">{pr.title}</h3>
                      <p className="mt-1.5 text-sm text-ink-dim leading-relaxed">{pr.text}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
