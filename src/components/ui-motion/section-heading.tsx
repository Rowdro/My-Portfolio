"use client";

import { MaskReveal, Reveal } from "./reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Signature section header — mono index chip, masked title reveal,
 * optional lead description.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 sm:mb-20",
        align === "center" && "flex flex-col items-center text-center",
        className
      )}
    >
      <Reveal y={16}>
        <span className="inline-flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[0.28em] uppercase text-ink-dim">
          <span className="inline-block w-2 h-2 rounded-full bg-signal" />
          {index} — {kicker}
        </span>
      </Reveal>
      <MaskReveal delay={0.08} className="mt-5">
        <h2 className="font-display font-bold uppercase tracking-tight leading-[0.95] text-5xl sm:text-6xl lg:text-7xl text-ink">
          {title}
        </h2>
      </MaskReveal>
      {description && (
        <Reveal delay={0.18} className={cn("mt-6 max-w-xl", align === "center" && "mx-auto")}>
          <p className="text-ink-dim text-base sm:text-lg leading-relaxed">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
