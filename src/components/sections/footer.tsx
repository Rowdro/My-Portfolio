"use client";

import { ArrowUp } from "lucide-react";
import { Magnetic } from "@/components/ui-motion/magnetic";
import { MaskReveal, Reveal } from "@/components/ui-motion/reveal";
import { owner, navigation } from "@/data/portfolio";

// Until a real email is configured, the giant CTA scrolls to the contact
// section instead of opening a mail client addressed to a placeholder.
const emailConfigured = !/example\.com/.test(owner.email);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line overflow-hidden" aria-label="Footer">
      <div className="absolute inset-0 glow-soft opacity-50 pointer-events-none" aria-hidden />

      {/* giant CTA */}
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-14 text-center">
        <Reveal y={16}>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-ink-faint">
            {owner.availability.label} — {owner.availability.note}
          </p>
        </Reveal>
        <MaskReveal className="mt-6">
          <a
            href={emailConfigured ? `mailto:${owner.email}` : "#contact"}
            className="group inline-block"
          >
            <span className="font-display font-bold uppercase tracking-tight leading-none text-[13vw] sm:text-[10vw] lg:text-[7.5rem] text-ink transition-colors duration-500 group-hover:text-signal">
              Let&apos;s Talk
              <span className="inline-block ml-4 align-top text-[0.5em] text-signal transition-transform duration-500 group-hover:rotate-45">
                ↗
              </span>
            </span>
          </a>
        </MaskReveal>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-line">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-lg text-ink">
              {owner.initials}<span className="text-signal">.</span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-faint">
              © {year} {owner.name} — All rights reserved
            </span>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navigation.slice(0, 5).map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="link-sweep font-mono text-[10px] tracking-[0.2em] uppercase text-ink-dim hover:text-signal transition-colors"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <Magnetic strength={0.3}>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-line-strong text-ink transition-colors hover:border-signal hover:bg-signal hover:text-abyss"
            >
              <ArrowUp className="w-5 h-5" />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
