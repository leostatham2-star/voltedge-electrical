"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlugZap, Wrench, ShieldCheck, Cctv, GitCommitVertical, Lightbulb,
  Award, BadgeCheck, Clock, BadgeDollarSign, ArrowRight, Quote,
  PhoneCall, CalendarCheck, CheckCircle2, Loader2,
} from "lucide-react";
import {
  WELCOME_TABS, SERVICES, PROJECTS, WHY_US, TESTIMONIALS, STATS, POSTS, PARTNERS, BRAND,
} from "@/lib/site";
import { Reveal, SectionHeading, BoltBullet } from "./shared";
import { useNav } from "./nav-context";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  PlugZap, Wrench, ShieldCheck, Cctv, GitCommitVertical, Lightbulb,
  Award, BadgeCheck, Clock, BadgeDollarSign,
};

/* ---------------- Welcome / about strip with tabs ---------------- */

export function WelcomeSection() {
  const [tab, setTab] = useState(WELCOME_TABS[0].id);
  const active = WELCOME_TABS.find((t) => t.id === tab)!;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative">
            <img
              src={active.image}
              alt={active.title}
              className="aspect-[4/3.4] w-full rounded-sm object-cover shadow-2xl shadow-navy-900/15"
            />
            <div className="absolute -bottom-7 -right-4 hidden bg-navy-800 px-8 py-6 text-white shadow-xl sm:block lg:-right-8">
              <p className="font-heading text-5xl font-bold leading-none text-brand-500">
                {new Date().getFullYear() - BRAND.founded}
              </p>
              <p className="mt-1.5 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Years on the job
              </p>
            </div>
            <span className="absolute -left-4 -top-4 h-24 w-24 border-4 border-brand-500 lg:-left-8" />
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Welcome to VoltEdge"
            title="The electrician Columbus calls first"
            text="We are a family run shop out of a garage on Foundry Avenue. Sixteen years later we run six crews, but the rules have not changed. Show up on time, quote it straight, and leave every panel cleaner than you found it."
          />
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Service areas">
              {WELCOME_TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-5 py-2.5 font-heading text-[0.95rem] font-semibold uppercase tracking-wider transition-colors ${
                    tab === t.id
                      ? "bg-navy-800 text-white"
                      : "bg-fog text-navy-700 hover:bg-navy-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="mt-7"
              >
                <h3 className="font-heading text-xl font-semibold text-navy-800">{active.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-500">{active.text}</p>
                <ul className="mt-5 space-y-2.5">
                  {active.bullets.map((b) => (
                    <BoltBullet key={b}>{b}</BoltBullet>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 24/7 CTA strip ---------------- */

export function CtaStrip() {
  const { navigate } = useNav();
  return (
    <section className="relative overflow-hidden bg-brand-500">
      <div className="container-site relative flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
        <div>
          <p className="font-heading text-2xl font-bold leading-tight text-navy-900 sm:text-[1.8rem]">
            On call 24/7 and quick to respond when you need us most.
          </p>
          <p className="mt-1.5 text-navy-900/70">
            Nights, weekends, holidays. A real electrician always answers.
          </p>
        </div>
        <button
          onClick={() => navigate("contact" as never)}
          className="group inline-flex shrink-0 items-center gap-2.5 bg-navy-900 px-8 py-4 font-heading text-base font-semibold uppercase tracking-wider text-white transition-all hover:bg-navy-800"
        >
          Request Service
          <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

/* ---------------- Services grid ---------------- */

export function ServicesGrid() {
  const { navigate } = useNav();
  return (
    <section className="bg-fog py-20 lg:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="What We Offer"
          title="Electrical work, covered end to end"
          text="Six crews, one standard. Every service below is handled by our own licensed electricians, never subcontracted out."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.slug} delay={i * 0.07}>
                <button
                  onClick={() => navigate("services" as never)}
                  className="group relative flex h-full w-full flex-col bg-white p-8 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10"
                >
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-500 transition-transform duration-300 group-hover:scale-x-100" />
                  <span className="flex h-14 w-14 items-center justify-center bg-navy-100 text-navy-800 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-navy-900">
                    {Icon && <Icon className="h-7 w-7" />}
                  </span>
                  <h3 className="mt-6 font-heading text-[1.35rem] font-semibold text-navy-800">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-slate-500">
                    {s.short}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-navy-800 transition-colors group-hover:text-brand-600">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Appointment form ---------------- */

function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "appointment" }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full bg-white px-4 py-3.5 text-[0.95rem] text-navy-900 ring-1 ring-white/15 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500";

  if (status === "done") {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center bg-navy-800 p-10 text-center">
        <CheckCircle2 className="h-16 w-16 text-brand-500" />
        <h3 className="mt-6 font-heading text-3xl font-bold text-white">Request received</h3>
        <p className="mt-3 max-w-sm text-white/70">
          Thanks for reaching out. A coordinator will call you back within one business
          hour to lock in a time.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 font-heading text-sm font-semibold uppercase tracking-wider text-brand-400 hover:text-brand-500"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="bg-navy-800 p-8 lg:p-10">
      <h3 className="font-heading text-3xl font-bold text-white">Appointment Form</h3>
      <p className="mt-2 text-[0.95rem] text-white/60">
        Tell us what is going on and we will call back within one business hour.
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" aria-label="Your name" className={inputCls} />
        <input name="phone" placeholder="Phone number" aria-label="Phone number" className={inputCls} />
        <input name="email" type="email" required placeholder="Email address" aria-label="Email address" className={inputCls} />
        <select name="service" aria-label="Service needed" defaultValue="" className={`${inputCls} text-slate-400`}>
          <option value="" disabled>Service needed</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Emergency repair">Emergency repair</option>
          <option value="Something else">Something else</option>
        </select>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="What can we help you with?"
          aria-label="Message"
          className={`${inputCls} sm:col-span-2`}
        />
      </div>
      {status === "error" && (
        <p className="mt-4 text-sm text-brand-400">
          Something went wrong sending that. Please try again or call us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2.5 bg-brand-500 px-8 py-4 font-heading text-base font-semibold uppercase tracking-wider text-navy-900 transition-colors hover:bg-brand-400 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4.5 w-4.5 animate-spin" /> Sending
          </>
        ) : (
          <>
            <CalendarCheck className="h-4.5 w-4.5" /> Book the Visit
          </>
        )}
      </button>
    </form>
  );
}

/* ---------------- Projects + appointment ---------------- */

export function ProjectsSection() {
  const { navigate } = useNav();
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Recent Work"
            title="Projects we are proud to sign"
          />
          <Reveal delay={0.1}>
            <button
              onClick={() => navigate("projects" as never)}
              className="group inline-flex items-center gap-2 border-b-2 border-brand-500 pb-1 font-heading text-sm font-semibold uppercase tracking-wider text-navy-800 transition-colors hover:text-brand-600"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.slice(0, 3).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <button
                onClick={() => navigate("projects" as never)}
                className="group block w-full overflow-hidden text-left"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="aspect-[380/317] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 bg-navy-900/85 px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-brand-400 backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>
                <div className="border border-t-0 border-slate-100 p-6 transition-colors group-hover:bg-fog">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {p.location} · {p.year}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-navy-800 group-hover:text-brand-600">
                    {p.title}
                  </h3>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="grid overflow-hidden shadow-2xl shadow-navy-900/10 lg:grid-cols-2">
            <div className="relative min-h-[320px]">
              <img
                src="/images/service-banner.jpg"
                alt="VoltEdge electrician at work"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-navy-900/20" />
              <div className="absolute bottom-8 left-8 right-8 bg-navy-900/85 p-6 backdrop-blur-sm">
                <p className="font-heading text-xl font-semibold leading-snug text-white">
                  Same week scheduling on most repairs. Evening and weekend slots
                  available.
                </p>
              </div>
            </div>
            <AppointmentForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Why choose us ---------------- */

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #FFB200 1.5px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="container-site relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <SectionHeading
            align="left"
            light
            eyebrow="Why Choose Us"
            title="Sixteen years of doing the simple things right"
            text="Any electrician can promise quality. We would rather show you the license number, the insurance certificate, and the list of neighbors who answered the phone when you asked about us."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {WHY_US.map((w, i) => {
              const Icon = ICONS[w.icon];
              return (
                <Reveal key={w.title} delay={i * 0.08}>
                  <div className="group h-full border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:border-brand-500/50 hover:bg-white/[0.07]">
                    <span className="flex h-12 w-12 items-center justify-center bg-brand-500/15 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-navy-900">
                      {Icon && <Icon className="h-6 w-6" />}
                    </span>
                    <h3 className="mt-5 font-heading text-xl font-semibold text-white">{w.title}</h3>
                    <p className="mt-2.5 text-[0.93rem] leading-relaxed text-white/60">{w.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, [index]);

  const t = TESTIMONIALS[index];

  return (
    <section className="bg-fog py-20 lg:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="Straight from the neighbors"
        />
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="relative bg-white p-8 shadow-xl shadow-navy-900/5 sm:p-12">
            <Quote className="absolute -top-6 left-8 h-12 w-12 rounded-sm bg-brand-500 p-2.5 text-navy-900" />
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="text-lg leading-relaxed text-slate-600">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-brand-500/60"
                  />
                  <div>
                    <p className="font-heading text-lg font-semibold text-navy-800">{t.name}</p>
                    <p className="text-sm text-slate-400">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            <div className="mt-8 flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Review ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-brand-500" : "w-3 bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Stats counters ---------------- */

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-heading text-5xl font-bold text-white lg:text-6xl">
      {value.toLocaleString()}
      <span className="text-brand-500">{suffix}</span>
    </span>
  );
}

export function StatsBand() {
  return (
    <section className="relative overflow-hidden py-16">
      <img src="/images/cta-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-navy-950/85" />
      <div className="container-site relative">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center font-heading text-2xl font-semibold leading-snug text-white sm:text-[1.7rem]">
            Serving Columbus homeowners and businesses with honest work and fair
            prices since {BRAND.founded}.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <Counter target={s.value} suffix={s.suffix} />
              <p className="mt-2 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Emergency banner ---------------- */

export function EmergencyBanner() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16">
      <img src="/images/cta-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-900/40" />
      <div className="container-site relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <Reveal className="flex items-start gap-6">
          <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-500 sm:flex">
            <PhoneCall className="h-7 w-7 text-navy-900" />
          </span>
          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              Power out? Panel humming? Call us any hour.
            </h2>
            <p className="mt-2 max-w-lg text-white/65">
              Burning smell, sparking outlet, half the house dark. Those get a truck
              rolling right away, day or night.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <a
            href={BRAND.emergencyHref}
            className="group inline-flex items-center gap-4 bg-brand-500 px-8 py-5 transition-all hover:bg-brand-400 hover:shadow-2xl hover:shadow-brand-500/20"
          >
            <PhoneCall className="h-6 w-6 text-navy-900" />
            <span>
              <span className="block font-heading text-xs font-semibold uppercase tracking-[0.2em] text-navy-900/70">
                24/7 Emergency Line
              </span>
              <span className="block font-heading text-2xl font-bold text-navy-900">
                {BRAND.emergency}
              </span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Latest news ---------------- */

export function LatestNews() {
  const { navigate } = useNav();
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading align="left" eyebrow="From the Blog" title="Notes from the field" />
          <Reveal delay={0.1}>
            <button
              onClick={() => navigate("blog" as never)}
              className="group inline-flex items-center gap-2 border-b-2 border-brand-500 pb-1 font-heading text-sm font-semibold uppercase tracking-wider text-navy-800 transition-colors hover:text-brand-600"
            >
              More Articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <button
                onClick={() => navigate("blog" as never, p.slug)}
                className="group block w-full text-left"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="aspect-[370/250] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute bottom-0 left-0 bg-brand-500 px-4 py-2 font-heading text-xs font-semibold uppercase tracking-wider text-navy-900">
                    {p.readTime}
                  </span>
                </div>
                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-slate-400">
                  {p.date}
                </p>
                <h3 className="mt-2 font-heading text-[1.3rem] font-semibold leading-snug text-navy-800 transition-colors group-hover:text-brand-600">
                  {p.title}
                </h3>
                <p className="mt-2.5 line-clamp-2 text-[0.95rem] leading-relaxed text-slate-500">
                  {p.excerpt}
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Partners strip ---------------- */

export function PartnersStrip() {
  return (
    <section className="border-t border-slate-100 bg-fog py-12">
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
  );
}
