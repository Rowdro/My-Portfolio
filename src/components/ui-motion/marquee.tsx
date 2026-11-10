"use client";

import { Asterisk } from "lucide-react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  outline?: boolean;
};

/**
 * Infinite kinetic marquee — duplicated track for a seamless loop,
 * edge-masked for a soft fade at the boundaries.
 */
export function Marquee({ items, reverse, className, itemClassName, outline }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)} aria-hidden>
      <div
        className={cn(
          "flex w-max items-center gap-8 sm:gap-12 whitespace-nowrap",
          reverse ? "animate-marquee-rev" : "animate-marquee"
        )}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-12">
            <span
              className={cn(
                "font-display font-bold uppercase tracking-tight text-3xl sm:text-5xl",
                outline ? "text-stroke" : "text-ink",
                itemClassName
              )}
            >
              {item}
            </span>
            <Asterisk className="w-6 h-6 sm:w-8 sm:h-8 text-signal shrink-0" strokeWidth={2.5} />
          </span>
        ))}
      </div>
    </div>
  );
}
