"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type CursorState = "default" | "link" | "view";

/**
 * Custom cursor — an instant dot plus a lagging ring.
 * Expands over links/buttons; morphs into a filled "View" disc over
 * elements marked with [data-cursor="view"]. Desktop (fine pointer) only,
 * skipped entirely for users who prefer reduced motion.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-cursor="view"]')) setState("view");
      else if (t.closest('a, button, [role="button"], input, textarea, select, [data-cursor="link"]'))
        setState("link");
      else setState("default");
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [reduced, x, y]);

  if (!visible) return null;

  return (
    <>
      {/* lagging ring / view disc */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[95] pointer-events-none"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          animate={{
            width: state === "view" ? 84 : state === "link" ? 52 : 36,
            height: state === "view" ? 84 : state === "link" ? 52 : 36,
            backgroundColor:
              state === "view" ? "rgba(205,251,78,0.95)" : "rgba(205,251,78,0)",
            borderColor:
              state === "view" ? "rgba(205,251,78,0)" : "rgba(240,238,230,0.35)",
          }}
          style={{ borderWidth: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <span
            className={`font-mono text-[11px] tracking-[0.14em] text-abyss select-none transition-opacity duration-150 ${
              state === "view" ? "opacity-100" : "opacity-0"
            }`}
          >
            VIEW
          </span>
        </motion.div>
      </motion.div>

      {/* instant dot */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[96] pointer-events-none"
        style={{ x, y, opacity: visible && state !== "view" ? 1 : 0 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-signal -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </>
  );
}
