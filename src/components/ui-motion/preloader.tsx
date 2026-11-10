"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { owner } from "@/data/portfolio";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Cinematic preloader — name reveal + progress counter + curtain lift.
 * Waits for window load (max 2.6s), then sweeps away.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const duration = reduced ? 250 : 1600;
    const start = performance.now();
    let raf = 0;
    let done = false;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out counter
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done) {
        done = true;
        // brief hold, then exit
        window.setTimeout(() => {
          setGone(true);
          onDone();
        }, reduced ? 50 : 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] bg-abyss flex flex-col items-center justify-center"
          exit={{ y: "-100%" }}
          transition={{ duration: reduced ? 0.15 : 0.9, ease: EASE }}
          aria-hidden
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: reduced ? 0.1 : 0.8, ease: EASE, delay: 0.1 }}
              className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-ink"
            >
              {owner.name}
            </motion.p>
          </div>
          <div className="overflow-hidden mt-1.5">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: reduced ? 0.1 : 0.8, ease: EASE, delay: 0.22 }}
              className="font-mono text-[11px] tracking-[0.3em] uppercase text-ink-faint"
            >
              Web — Shopify — eCommerce
            </motion.p>
          </div>

          <div className="absolute bottom-10 left-0 right-0 px-8 sm:px-14">
            <div className="flex items-end justify-between">
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-dim">
                Loading experience
              </span>
              <span className="font-display font-bold text-5xl sm:text-7xl text-ink tabular-nums leading-none">
                {progress}
                <span className="text-signal text-3xl sm:text-5xl">%</span>
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-line overflow-hidden">
              <motion.div
                className="h-full bg-signal origin-left"
                style={{ scaleX: progress / 100 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
