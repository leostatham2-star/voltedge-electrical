"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/site";
import { useNav } from "./nav-context";

const SLIDE_MS = 6500;

export function HeroSlider() {
  const { navigate } = useNav();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, SLIDE_MS);
    return () => clearInterval(t);
  }, [next, paused, index]);

  const slide = HERO_SLIDES[index];

  return (
    <section
      className="relative h-[92vh] min-h-[620px] w-full overflow-hidden bg-navy-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured highlights"
    >
      {/* Background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container-site relative flex h-full items-center pt-20">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={index}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-5 inline-flex items-center gap-3 border-l-4 border-brand-500 bg-white/5 py-1.5 pl-4 pr-6 backdrop-blur-sm"
              >
                <span className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-brand-400">
                  {slide.eyebrow}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="font-heading text-[2.6rem] font-bold leading-[1.04] text-white sm:text-6xl lg:text-[4.2rem]"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
              >
                {slide.text}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.46 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={() => navigate(slide.primaryCta.page as never)}
                  className="group inline-flex items-center gap-2.5 bg-brand-500 px-8 py-4 font-heading text-base font-semibold uppercase tracking-wider text-navy-900 transition-all hover:bg-brand-400 hover:shadow-xl hover:shadow-brand-500/25"
                >
                  {slide.primaryCta.label}
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigate(slide.secondaryCta.page as never)}
                  className="inline-flex items-center gap-2.5 border-2 border-white/25 px-8 py-[14px] font-heading text-base font-semibold uppercase tracking-wider text-white transition-colors hover:border-brand-500 hover:text-brand-400"
                >
                  {slide.secondaryCta.label}
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="container-site absolute inset-x-0 bottom-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Slides">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === index ? "w-10 bg-brand-500" : "w-4 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="rounded-full border border-white/20 p-3 text-white/80 transition-colors hover:border-brand-500 hover:text-brand-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="rounded-full border border-white/20 p-3 text-white/80 transition-colors hover:border-brand-500 hover:text-brand-400"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
