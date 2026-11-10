"use client";

import { Award, Briefcase } from "lucide-react";
import { StaggerGroup, StaggerItem, Reveal, MaskReveal } from "@/components/ui-motion/reveal";
import { SectionHeading } from "@/components/ui-motion/section-heading";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative py-28 sm:py-36 lg:py-44"
      aria-label="Experience and achievements"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* timeline */}
          <div className="lg:col-span-7">
            <SectionHeading index="05" kicker="Journey" title={experience.heading} />

            <div className="relative pl-8 sm:pl-10">
              {/* rail */}
              <span
                className="absolute left-[7px] top-2 bottom-2 w-px bg-line-strong"
                aria-hidden
              />
              <span
                className="absolute left-[7px] top-2 h-24 w-px bg-gradient-to-b from-signal to-transparent"
                aria-hidden
              />

              <StaggerGroup className="space-y-12">
                {experience.timeline.map((item, i) => (
                  <StaggerItem key={i} className="relative">
                    {/* node */}
                    <span
                      className="absolute -left-8 sm:-left-10 top-1.5 flex items-center justify-center w-4 h-4 translate-x-[0.5px]"
                      aria-hidden
                    >
                      <span className="absolute w-4 h-4 rounded-full bg-signal/20" />
                      <span className="relative w-2 h-2 rounded-full bg-signal" />
                    </span>

                    {item.period && (
                      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-signal">
                        {item.period}
                      </p>
                    )}
                    <h3 className="mt-2 font-display font-bold text-xl sm:text-2xl text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-ink-faint tracking-wide">{item.org}</p>
                    <p className="mt-3 text-ink-dim text-[15px] leading-relaxed max-w-xl">
                      {item.text}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>

          {/* achievements */}
          <div className="lg:col-span-5 lg:pt-[7.5rem]">
            <MaskReveal>
              <h3 className="font-display font-bold uppercase tracking-tight text-2xl sm:text-3xl text-ink">
                Achievements
              </h3>
            </MaskReveal>
            <Reveal delay={0.1}>
              <p className="mt-3 text-sm text-ink-faint leading-relaxed max-w-md">
                Real milestones from shipping production work — updated as new
                projects go live.
              </p>
            </Reveal>

            <StaggerGroup className="mt-8 space-y-4" amount={0.2}>
              {experience.achievements.map((a, i) => (
                <StaggerItem key={i}>
                  <div className="group flex items-center gap-5 rounded-2xl border border-line bg-surface p-5 sm:p-6 transition-colors duration-300 hover:border-signal/50 hover:bg-surface-2">
                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-2 border border-line text-signal shrink-0 transition-colors duration-300 group-hover:bg-signal group-hover:text-abyss">
                      <Award className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-lg text-ink leading-tight">
                        {a.title}
                      </h4>
                      <p className="mt-1 text-sm text-ink-dim truncate">{a.org}</p>
                    </div>
                    <span className="ml-auto font-mono text-xs text-ink-faint shrink-0">{a.year}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.15}>
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-dashed border-line-strong p-5">
                <Briefcase className="w-5 h-5 text-signal shrink-0" />
                <p className="min-w-0 text-sm text-ink-dim leading-relaxed">
                  Full history available on request — <span className="text-ink">connect with
                  me on LinkedIn</span> via the contact section below.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
