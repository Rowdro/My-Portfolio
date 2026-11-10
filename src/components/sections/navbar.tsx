"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui-motion/magnetic";
import { navigation, owner } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const EASE = [0.76, 0, 0.24, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 160 && !open);
  });

  // scroll-spy
  useEffect(() => {
    const ids = navigation.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE }}
        className={cn(
          "fixed top-0 inset-x-0 z-[80] transition-colors duration-500",
          scrolled && !open
            ? "bg-abyss/70 backdrop-blur-xl border-b border-line"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-[72px] flex items-center justify-between"
        >
          {/* brand */}
          <a href="#top" className="flex items-center gap-3 group" aria-label="Back to top">
            <span className="font-display font-bold text-lg tracking-tight text-ink">
              {owner.initials}
              <span className="text-signal">.</span>
            </span>
          </a>

          {/* desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navigation.slice(0, 6).map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "link-sweep font-mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-300",
                    active === item.href ? "text-signal" : "text-ink-dim hover:text-ink"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* right cluster */}
          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:block">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-signal text-abyss font-semibold text-sm px-5 py-2.5 transition-colors hover:bg-ink"
              >
                Let&apos;s Talk
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-line-strong text-ink hover:border-signal hover:text-signal transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[75] bg-abyss flex flex-col lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="absolute inset-0 glow-soft pointer-events-none" aria-hidden />
            <div className="flex-1 flex flex-col justify-center px-8 pt-20">
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}
                    className="border-b border-line"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-4"
                    >
                      <span className="font-display font-bold uppercase text-3xl sm:text-4xl text-ink group-hover:text-signal transition-colors">
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-ink-faint">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="px-8 pb-10 space-y-4"
            >
              <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-dim">
                <span className="w-2 h-2 rounded-full bg-signal animate-pulse-dot" />
                {owner.availability.label}
              </p>
              <a
                href={`mailto:${owner.email}`}
                className="block font-display font-bold text-xl text-ink"
              >
                {owner.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
