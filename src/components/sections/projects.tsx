"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, FileText, X } from "lucide-react";
import { Reveal, MaskReveal } from "@/components/ui-motion/reveal";
import { SectionHeading } from "@/components/ui-motion/section-heading";
import { projects, type Project } from "@/data/portfolio";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** One project row — large media + editorial info, alternating layout. */
function ProjectRow({
  project,
  index,
  reversed,
  onCaseStudy,
  onPreview,
}: {
  project: Project;
  index: number;
  reversed: boolean;
  onCaseStudy: (p: Project) => void;
  onPreview: (p: Project) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <Reveal>
      <article
        ref={rowRef}
        className={cn(
          "group/grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-10 lg:py-14 border-b border-line",
          reversed && "lg:[direction:rtl]"
        )}
        aria-label={`Project: ${project.name}`}
      >
        {/* media */}
        <div className="lg:col-span-7 lg:[direction:ltr]">
          <div
            data-cursor="view"
            onClick={() => onCaseStudy(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onCaseStudy(project)}
            aria-label={`Open case study: ${project.name}`}
            className="relative overflow-hidden rounded-2xl border border-line bg-surface aspect-[16/10] cursor-pointer outline-offset-4"
          >
            <motion.div className="absolute inset-[-10%]" style={reduced ? undefined : { y: imgY }}>
              <Image
                src={project.image}
                alt={`${project.name} — ${project.category} (${project.platform})`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover scale-[1.02] transition-transform duration-[1300ms] ease-out group-hover/grid:scale-[1.09]"
              />
            </motion.div>
            {/* wash + platform chip */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-abyss/10 opacity-80 group-hover/grid:opacity-95 transition-opacity duration-700"
              aria-hidden
            />
            <span className="absolute top-4 left-4 rounded-full bg-abyss/60 backdrop-blur border border-line-strong px-3.5 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-ink">
              {project.platform}
            </span>
            <span className="absolute top-4 right-4 rounded-full bg-signal text-abyss px-3.5 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase font-medium opacity-0 translate-y-2 group-hover/grid:opacity-100 group-hover/grid:translate-y-0 transition-all duration-500">
              View Case Study
            </span>
          </div>
        </div>

        {/* info */}
        <div className="lg:col-span-5 lg:[direction:ltr]">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-signal">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-faint">
              {project.category}
              {project.year ? ` — ${project.year}` : ""}
            </span>
          </div>

          <h3 className="mt-3 font-display font-bold uppercase tracking-tight leading-none text-4xl sm:text-5xl lg:text-6xl text-ink group-hover/grid:text-signal transition-colors duration-500">
            {project.name}
          </h3>

          <p className="mt-5 text-ink-dim leading-relaxed text-base max-w-lg">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onCaseStudy(project)}
              className="inline-flex items-center gap-2.5 rounded-full bg-surface-2 border border-line-strong text-ink font-semibold text-sm px-6 py-3 transition-colors hover:border-signal hover:text-signal"
            >
              <FileText className="w-4 h-4" />
              Case Study
            </button>
            <button
              onClick={() => onPreview(project)}
              className="group/btn inline-flex items-center gap-2.5 rounded-full bg-signal text-abyss font-semibold text-sm px-6 py-3 transition-colors hover:bg-ink"
            >
              <ExternalLink className="w-4 h-4" />
              Live Preview
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { toast } = useToast();

  const handlePreview = (p: Project) => {
    if (p.liveUrl) {
      window.open(p.liveUrl, "_blank", "noopener,noreferrer");
    } else {
      toast({
        title: `${p.name} — public link coming soon`,
        description:
          "This project isn't publicly linked yet. Happy to walk you through it live — reach me via the contact section.",
      });
    }
  };

  return (
    <section id="work" className="relative py-28 sm:py-36 lg:py-44" aria-label="Featured projects">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          index="03"
          kicker="Selected Work"
          title="Featured Projects"
          description="Live web products plus a Chrome-extension suite — every card is real, working software. Click any cover for the case-study breakdown."
        />

        <div className="border-t border-line">
          {projects.map((p, i) => (
            <ProjectRow
              key={p.name}
              project={p}
              index={i}
              reversed={i % 2 === 1}
              onCaseStudy={setSelected}
              onPreview={handlePreview}
            />
          ))}
        </div>
      </div>

      {/* ── Case study modal ─────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${selected.name}`}
        >
          <button
            className="absolute inset-0 bg-abyss/85"
            aria-label="Close case study"
            onClick={() => setSelected(null)}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl border border-line-strong bg-[#141416] shadow-2xl"
          >
            <div className="relative aspect-[16/8] overflow-hidden">
              <Image
                src={selected.image}
                alt={`${selected.name} case study cover`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" aria-hidden />
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-abyss/70 backdrop-blur border border-line-strong text-ink hover:text-signal hover:border-signal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-10">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-signal">
                {selected.platform} — {selected.category}
              </p>
              <h3 className="mt-2 font-display font-bold uppercase text-4xl sm:text-5xl text-ink">
                {selected.name}
              </h3>
              <p className="mt-5 text-ink-dim leading-relaxed">{selected.description}</p>

              <h4 className="mt-8 font-mono text-[11px] tracking-[0.22em] uppercase text-ink-faint">
                Scope of work
              </h4>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {selected.tech.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 rounded-xl border border-line bg-abyss/40 px-4 py-3 text-sm text-ink"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setSelected(null);
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2.5 rounded-full bg-signal text-abyss font-semibold text-sm px-6 py-3 hover:bg-ink transition-colors"
                >
                  Discuss a similar project
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePreview(selected)}
                  className="inline-flex items-center gap-2.5 rounded-full border border-line-strong text-ink font-semibold text-sm px-6 py-3 hover:border-signal hover:text-signal transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
