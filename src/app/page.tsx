"use client";

import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

import { Preloader } from "@/components/ui-motion/preloader";
import { CustomCursor } from "@/components/ui-motion/cursor";
import { Marquee } from "@/components/ui-motion/marquee";

import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

import { marqueeItems, owner, seo } from "@/data/portfolio";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();

  /* ── Lenis smooth scrolling (desktop, motion-safe only) ─────────── */
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    // expose for automated testing tooling
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // smooth-anchor integration
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.3 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduced]);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {/* structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: owner.name,
            jobTitle: owner.roles.join(", "),
            email: `mailto:${owner.email}`,
            description: seo.description,
            address: { "@type": "PostalAddress", addressCountry: "BD" },
            sameAs: owner.socials.map((s) => s.url),
          }),
        }}
      />

      {!loaded && <Preloader onDone={handleLoaded} />}
      <CustomCursor />
      <div className="grain" aria-hidden />

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero start={loaded} />

          {/* kinetic divider */}
          <div className="border-y border-line py-6 bg-surface/40" aria-hidden>
            <Marquee items={marqueeItems} />
          </div>

          <About />
          <Services />
          <Projects />
          <Skills />
          <Experience />
          <Process />
          <Testimonials />

          {/* reversed kinetic divider */}
          <div className="border-y border-line py-6 bg-surface/40" aria-hidden>
            <Marquee items={["Available for freelance", "Shopify Expert", "Let's collaborate", owner.availability.label]} reverse outline />
          </div>

          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
