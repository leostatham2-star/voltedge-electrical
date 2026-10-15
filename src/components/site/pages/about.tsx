"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BadgeDollarSign, ListChecks, Calculator } from "lucide-react";
import { TEAM, TESTIMONIALS, PARTNERS, BRAND } from "@/lib/site";
import { PageBanner, SectionHeading, Reveal, BoltBullet } from "../shared";

const FEATURES = [
  {
    icon: Clock,
    title: "On Time, Every Time",
    text: "We hold a two hour arrival window and we hit it. If a run goes long you get a call, not a no show. Time is the one thing we cannot quote more of later, so we plan for it up front.",
    points: ["Texts when the tech is on the way", "Evening and Saturday appointments", "Same week slots for most repairs"],
  },
  {
    icon: BadgeDollarSign,
    title: "Upfront Pricing",
    text: "Every job gets a written price before work starts, and the invoice matches it. When we find something unexpected mid job, we stop, explain it, and only continue once you say go.",
    points: ["Written fixed quotes", "No surprise line items", "Options at three price levels when they exist"],
  },
  {
    icon: ListChecks,
    title: "A Process You Can Follow",
    text: "Permits pulled before we start, photos of what is inside your walls, and labels on every breaker when we finish. You will always know what was done and why it was done that way.",
    points: ["Permits and inspections handled for you", "Photo reports on hidden work", "Breaker directories rewritten on every panel job"],
  },
  {
    icon: Calculator,
    title: "Free Estimates",
    text: "Planning jobs cost nothing to price out. A remodel, a service upgrade, a whole rewire. We walk it, measure it, and hand you a number with no obligation attached to it.",
    points: ["Free in person estimates", "Budget numbers for planning stages", "Honest advice on what can wait"],
  },
];

export function AboutPage() {
  const [feature, setFeature] = useState(0);
  const f = FEATURES[feature];

  return (
    <>
      <PageBanner title="About Us" crumb="About Us" image="/images/about-main.jpg" />

      {/* Story */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Started with one van and a stubborn streak"
            />
            <Reveal delay={0.1} className="mt-6 space-y-5 leading-relaxed text-slate-500">
              <p>
                Frank Holloway spent ten years as a journeyman for shops that booked
                four more jobs than they could honestly finish each day. Customers
                waited, work got rushed, and nobody felt good about it. In {BRAND.founded}
                {" "}he bought a used van, had the side painted, and started VoltEdge
                with one promise: fewer jobs a day, done properly.
              </p>
              <p>
                Sixteen years later there are six crews and a shop on Foundry Avenue,
                and the promise has not moved. We still schedule enough time to do the
                job right the first time. We still answer our own phones. And Frank
                still carries his meter on almost every call, mostly because he cannot
                help himself.
              </p>
              <p>
                Most of our work comes from repeat customers and their neighbors. In a
                trade with a shaky reputation, that repeat business is the thing we
                protect hardest.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-2.5">
                <BoltBullet>State of Ohio license EL.38291</BoltBullet>
                <BoltBullet>Fully insured and bonded up to two million</BoltBullet>
                <BoltBullet>Better Business Bureau A rating since 2014</BoltBullet>
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="relative">
            <img
              src="/images/about-main.jpg"
              alt="The VoltEdge Electrical team"
              className="aspect-[4/4.4] w-full rounded-sm object-cover shadow-2xl shadow-navy-900/15"
            />
            <div className="absolute -bottom-8 -left-4 hidden max-w-[260px] bg-brand-500 p-7 shadow-xl sm:block lg:-left-8">
              <p className="font-heading text-[1.15rem] font-semibold leading-snug text-navy-900">
                &ldquo;Do it right, or come back and do it over. Either way costs
                somebody. Guess who.&rdquo;
              </p>
              <p className="mt-3 font-heading text-sm font-semibold uppercase tracking-wider text-navy-900/70">
                Frank Holloway, Founder
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature tabs */}
      <section className="bg-fog py-20 lg:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="How We Work"
            title="Four habits that built this company"
            text="Nothing on this list is clever. All of it is rare enough that people remember."
          />
          <Reveal className="mt-12">
            <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Company practices">
              {FEATURES.map((item, i) => (
                <button
                  key={item.title}
                  role="tab"
                  aria-selected={feature === i}
                  onClick={() => setFeature(i)}
                  className={`px-6 py-3 font-heading text-[0.95rem] font-semibold uppercase tracking-wider transition-colors ${
                    feature === i
                      ? "bg-navy-800 text-white"
                      : "bg-white text-navy-700 hover:bg-navy-100"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="mx-auto mt-10 max-w-3xl bg-white p-8 shadow-lg shadow-navy-900/5 sm:p-10"
              >
                <span className="flex h-12 w-12 items-center justify-center bg-navy-100 text-navy-800">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-semibold text-navy-800">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-500">{f.text}</p>
                <ul className="mt-5 space-y-2.5">
                  {f.points.map((p) => (
                    <BoltBullet key={p}>{p}</BoltBullet>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Meet the Crew"
            title="The people who show up at your door"
            text="Sixteen electricians on staff. Here are the four you will hear about most."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.07}>
                <div className="group overflow-hidden bg-white">
                  <div className="relative overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="aspect-[3/3.5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="border border-t-0 border-slate-100 p-6">
                    <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                      {m.role}
                    </p>
                    <h3 className="mt-1.5 font-heading text-xl font-semibold text-navy-800">{m.name}</h3>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-slate-500">{m.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote from a customer */}
      <section className="relative overflow-hidden bg-navy-900 py-20">
        <div className="container-site relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="font-heading text-7xl leading-none text-brand-500">&ldquo;</span>
            <p className="-mt-4 font-heading text-2xl font-semibold leading-snug text-white sm:text-3xl">
              {TESTIMONIALS[0].quote}
            </p>
            <p className="mt-6 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">
              {TESTIMONIALS[0].name} · {TESTIMONIALS[0].role}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-slate-100 bg-white py-14">
        <div className="container-site">
          <Reveal className="flex flex-col items-center gap-7">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Trusted By Local Teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {PARTNERS.map((p) => (
                <span
                  key={p}
                  className="font-heading text-lg font-semibold uppercase tracking-wider text-navy-800/35 transition-colors hover:text-navy-800/70"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
