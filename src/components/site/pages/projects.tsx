"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, CalendarDays, Expand } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/site";
import { PageBanner, Reveal } from "../shared";

export function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof PROJECTS[number] | null>(null);
  const shown = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <>
      <PageBanner title="Our Projects" crumb="Projects" image="/images/project-3.jpg" />

      <section className="bg-fog py-20 lg:py-24">
        <div className="container-site">
          <Reveal className="flex flex-col items-center gap-8">
            <h2 className="max-w-2xl text-center font-heading text-3xl font-bold leading-tight text-navy-800 sm:text-4xl">
              Work you can drive past and point at
            </h2>
            <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project filter">
              {PROJECT_CATEGORIES.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={`px-6 py-2.5 font-heading text-[0.92rem] font-semibold uppercase tracking-wider transition-colors ${
                    filter === c
                      ? "bg-navy-800 text-white"
                      : "bg-white text-navy-700 hover:bg-navy-100"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((p) => (
                <motion.article
                  layout
                  key={p.title}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                  className="group relative cursor-pointer overflow-hidden bg-white shadow-sm hover:shadow-xl"
                  onClick={() => setSelected(p)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="aspect-[380/317] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-navy-950/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-navy-900">
                        <Expand className="h-6 w-6" />
                      </span>
                    </div>
                    <span className="absolute left-4 top-4 bg-brand-500 px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-navy-900">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-brand-600" /> {p.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-brand-600" /> {p.year}
                      </span>
                    </div>
                    <h3 className="mt-2.5 font-heading text-xl font-semibold leading-snug text-navy-800 group-hover:text-brand-600">
                      {p.title}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto bg-white shadow-2xl"
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-navy-900/80 text-white transition-colors hover:bg-brand-500 hover:text-navy-900"
            >
              ✕
            </button>
            <img src={selected.image} alt={selected.title} className="aspect-video w-full object-cover" />
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                <span className="bg-navy-100 px-3 py-1 font-semibold text-navy-800">{selected.category}</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-brand-600" /> {selected.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-brand-600" /> {selected.year}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-3xl font-bold text-navy-800">{selected.title}</h3>
              <p className="mt-4 leading-relaxed text-slate-500">{selected.text}</p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
