"use client";

import { Quote, ArrowUpRight } from "lucide-react";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/ui-motion/reveal";
import { SectionHeading } from "@/components/ui-motion/section-heading";
import { Magnetic } from "@/components/ui-motion/magnetic";
import { testimonials, owner } from "@/data/portfolio";

/**
 * Testimonials — renders real client cards from the data file.
 * While `items` is empty, one honest "references on request" card is shown
 * instead of fabricated quotes (nothing on this site is invented).
 */
export function Testimonials() {
  const hasItems = testimonials.items.length > 0;

  return (
    <section
      id="testimonials"
      className="relative py-28 sm:py-36 lg:py-44 overflow-hidden"
      aria-label="Testimonials"
    >
      <div className="absolute inset-0 glow-soft opacity-40 pointer-events-none" aria-hidden />
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          index="07"
          kicker="Testimonials"
          title={testimonials.heading}
          description="The work speaks first — references from completed projects are available on request."
        />

        {hasItems ? (
          <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-3" amount={0.15}>
            {testimonials.items.map((t, i) => (
              <StaggerItem key={i}>
                <figure className="group relative h-full flex flex-col rounded-2xl border border-line bg-surface p-7 sm:p-8 transition-all duration-500 hover:border-signal/40 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-20px_rgba(205,251,78,0.12)]">
                  <Quote
                    className="w-8 h-8 text-signal/60 group-hover:text-signal transition-colors duration-500"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <blockquote className="mt-5 flex-1 text-ink-dim text-[15px] leading-relaxed">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-7 pt-6 border-t border-line flex items-center gap-4">
                    <span
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-surface-2 border border-line font-display font-bold text-sm text-signal"
                      aria-hidden
                    >
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div>
                      <p className="font-semibold text-ink text-sm">{t.name}</p>
                      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-faint mt-0.5">
                        {t.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          /* Honest empty-state — no invented quotes, an invitation instead. */
          <Reveal>
            <figure className="group relative rounded-2xl border border-line bg-surface p-8 sm:p-12 transition-colors duration-500 hover:border-signal/40">
              <Quote
                className="w-9 h-9 text-signal/60 group-hover:text-signal transition-colors duration-500"
                strokeWidth={1.5}
                aria-hidden
              />
              <blockquote className="mt-6 max-w-3xl text-ink-dim text-lg sm:text-xl leading-relaxed">
                I&apos;m early in my freelance journey, so this wall stays honest rather
                than padded. References from my completed work are available on
                request — and your project could be the first story featured here.
              </blockquote>
              <figcaption className="mt-8 pt-7 border-t border-line flex flex-wrap items-center gap-5">
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-2 border border-line font-display font-bold text-sm text-signal"
                  aria-hidden
                >
                  {owner.initials}
                </span>
                <div className="mr-auto">
                  <p className="font-semibold text-ink">{owner.name}</p>
                  <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-faint mt-0.5">
                    Web &amp; Shopify Developer
                  </p>
                </div>
                <Magnetic>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 rounded-full bg-signal text-abyss font-semibold text-sm px-6 py-3 transition-colors hover:bg-ink"
                  >
                    Start the first story
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Magnetic>
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>
    </section>
  );
}
