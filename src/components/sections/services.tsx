"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  Store,
  Palette,
  Globe,
  ShoppingCart,
  PenTool,
  Gauge,
  Wrench,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { StaggerGroup, StaggerItem, MaskReveal, Reveal } from "@/components/ui-motion/reveal";
import { SectionHeading } from "@/components/ui-motion/section-heading";
import { services } from "@/data/portfolio";

const ICONS: Record<string, LucideIcon> = {
  store: Store,
  palette: Palette,
  globe: Globe,
  cart: ShoppingCart,
  pen: PenTool,
  gauge: Gauge,
  wrench: Wrench,
};

/** Card with a cursor-tracking spotlight wash. */
function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden bg-surface border border-line rounded-2xl transition-colors duration-500 hover:border-signal/40 ${className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(205,251,78,0.08), transparent 65%)",
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36 lg:py-44" aria-label="Services">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <SectionHeading
            index="02"
            kicker="Services"
            title="What I Do"
            className="mb-0 lg:mb-0"
          />
          <Reveal delay={0.2} className="max-w-sm lg:pb-2">
            <p className="text-ink-dim text-sm sm:text-base leading-relaxed">
              From first sketch to post-launch care — a full-stack toolkit for brands that take
              their digital presence seriously.
            </p>
          </Reveal>
        </div>

        <StaggerGroup
          className="mt-14 sm:mt-20 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3"
          amount={0.08}
        >
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Store;
            return (
              <StaggerItem
                key={s.title}
                className={i === 0 ? "sm:col-span-2 xl:col-span-1" : undefined}
              >
                <SpotlightCard className="h-full p-6 sm:p-8">
                  {/* index + icon */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-ink-faint">
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-surface-2 border border-line text-signal transition-all duration-500 group-hover:bg-signal group-hover:text-abyss group-hover:border-signal">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                  </div>

                  <h3 className="mt-6 font-display font-bold text-xl sm:text-2xl text-ink leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-[15px] text-ink-dim leading-relaxed">
                    {s.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint transition-colors duration-300 group-hover:border-signal/30 group-hover:text-ink-dim"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-dim transition-colors hover:text-signal"
                    aria-label={`Discuss ${s.title}`}
                  >
                    Start a project
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </a>
                </SpotlightCard>
              </StaggerItem>
            );
          })}

          {/* CTA tile fills the 7th slot in the 3-col grid */}
          <StaggerItem className="hidden xl:block">
            <a
              href="#contact"
              className="group flex h-full min-h-[300px] flex-col justify-between rounded-2xl border border-dashed border-line-strong bg-transparent p-8 transition-colors duration-500 hover:border-signal hover:bg-signal/[0.04]"
            >
              <span className="font-mono text-xs text-ink-faint">/08</span>
              <div>
                <h3 className="font-display font-bold text-2xl text-ink leading-tight group-hover:text-signal transition-colors">
                  Something
                  <br />
                  else in mind?
                </h3>
                <p className="mt-3 text-sm text-ink-dim leading-relaxed">
                  If it lives on the web, I can help you build it. Tell me about your idea.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-signal">
                  Let&apos;s talk
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
