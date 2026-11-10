"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const maskParent: Variants = {
  hidden: {},
  show: {},
};

const maskChild: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1.0, ease: EASE } },
};

/**
 * Masked line reveal — text slides up from behind an overflow mask.
 * IMPORTANT: whileInView lives on the OUTER (unclipped) element; the inner
 * mask child animates via variant propagation. Observing the clipped inner
 * element directly would never trigger IntersectionObserver.
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
  innerClassName,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  innerClassName?: string;
  as?: "div" | "span";
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as === "span" ? motion.span : motion.div;
    return (
      <Tag
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
      >
        {children}
      </Tag>
    );
  }

  const Tag = as === "span" ? motion.span : motion.div;
  return (
    <Tag
      className={className}
      style={as === "span" ? { display: "inline-block" } : undefined}
      variants={maskParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      <div className="overflow-hidden">
        <motion.div
          className={innerClassName}
          variants={{
            hidden: { y: "115%" },
            show: { y: 0, transition: { duration: 1.0, delay, ease: EASE } },
          }}
        >
          {children}
        </motion.div>
      </div>
    </Tag>
  );
}

/** Scroll-triggered soft reveal — rise + de-blur. */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: reduced ? 0.3 : 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container for lists of Reveal-style items. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function StaggerGroup({
  children,
  className,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : staggerParent}
      initial={reduced ? "hidden" : "hidden"}
      whileInView={reduced ? { opacity: 1 } : "show"}
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced)
    return (
      <motion.div variants={undefined} className={className}>
        {children}
      </motion.div>
    );
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}
