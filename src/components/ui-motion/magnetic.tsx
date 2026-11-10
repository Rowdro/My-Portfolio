"use client";

import { useRef, useCallback, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/**
 * Magnetic wrapper — element subtly gravitates toward the cursor.
 * Disabled automatically on touch devices and for reduced motion.
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const isFinePointer = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isFinePointer()) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      x.set(relX * strength);
      y.set(relY * strength);
    },
    [strength, x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
