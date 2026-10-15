"use client";

import { SERVICES, WELCOME_TABS, BRAND } from "@/lib/site";
import { PageBanner, SectionHeading, Reveal, BoltBullet } from "../shared";
import { useNav } from "../nav-context";
import { ArrowRight, PhoneCall } from "lucide-react";

export function ServicesPage() {
  const { navigate } = useNav();

  return (
    <>
      <PageBanner title="Our Services" crumb="Services" image="/images/service-banner.jpg" />

      {/* Category cards */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Residential, Commercial, Industrial"
            title="Three kinds of work, one crew standard"
            text="The same license covers all of it, but the crews and the gear are specialized. Pick the lane that fits your property."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {WELCOME_TABS.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <button
                  onClick={() => navigate("rfq" as never)}
                  className="group block w-full overflow-hidden text-left"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={t.image}
                      alt={t.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-heading text-2xl font-bold text-white">{t.label}</h3>
                      <p className="mt-1 text-sm text-white/70">{t.title}</p>
                    </div>
                  </div>
                  <div className="border border-t-0 border-slate-100 p-6 transition-colors group-hover:bg-fog">
                    <span className="inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-navy-800 group-hover:text-brand-600">
                      Get a Quote
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-brand-500">
        <div className="container-site flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
          <div>
            <p className="font-heading text-2xl font-bold leading-tight text-navy-900 sm:text-[1.8rem]">
              Not sure which service you need?
            </p>
            <p className="mt-1.5 text-navy-900/70">
              Describe the problem in plain words. We will point you the right way.
            </p>
          </div>
          <a
            href={BRAND.phoneHref}
            className="inline-flex shrink-0 items-center gap-3 bg-navy-900 px-8 py-4 font-heading text-base font-semibold uppercase tracking-wider text-white transition-colors hover:bg-navy-800"
          >
            <PhoneCall className="h-5 w-5 text-brand-500" />
            {BRAND.phone}
          </a>
        </div>
      </section>

      {/* Detailed services, alternating */}
      <section className="bg-fog py-20 lg:py-28">
        <div className="container-site space-y-20 lg:space-y-28">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug}>
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="aspect-[4/3] w-full rounded-sm object-cover shadow-2xl shadow-navy-900/10"
                  />
                  <span className="absolute -top-4 left-6 flex h-11 w-11 items-center justify-center bg-brand-500 font-heading text-lg font-bold text-navy-900 shadow-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <span className="eyebrow">Service {String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 font-heading text-3xl font-bold text-navy-800 sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-slate-500">{s.long}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <BoltBullet key={p}>{p}</BoltBullet>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate("contact" as never)}
                    className="group mt-7 inline-flex items-center gap-2.5 bg-navy-800 px-7 py-3.5 font-heading text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-500 hover:text-navy-900"
                  >
                    Book This Service
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
