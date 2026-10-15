"use client";

import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2, Loader2, Send, FileText, ArrowRight } from "lucide-react";
import { BRAND, FAQS, mailtoLead } from "@/lib/site";
import { PageBanner, SectionHeading, Reveal } from "../shared";
import { useNav } from "../nav-context";

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Call the Office",
    lines: [BRAND.phone, "Weekdays 7:30am to 5:30pm"],
    href: BRAND.phoneHref,
  },
  {
    icon: Mail,
    title: "Send an Email",
    lines: [BRAND.email, "Replies inside one business day"],
    href: BRAND.emailHref,
  },
  {
    icon: MapPin,
    title: "Stop By the Shop",
    lines: [BRAND.address, "Coffee is on if Frank is in"],
  },
  {
    icon: Clock,
    title: "Emergency Line",
    lines: [BRAND.emergency, "Nights, weekends, holidays"],
    href: BRAND.emergencyHref,
  },
];

function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "done" | "mailto" | "error"
  >("idle");
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
        body: JSON.stringify({ ...data, source: "contact" }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      formRef.current?.reset();
    } catch {
      mailtoLead(data, "contact");
      setStatus("mailto");
    }
  };

  const inputCls =
    "w-full bg-white px-4 py-3.5 text-[0.95rem] text-navy-900 ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500";

  if (status === "done") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center bg-white p-10 text-center shadow-lg">
        <CheckCircle2 className="h-16 w-16 text-brand-500" />
        <h3 className="mt-6 font-heading text-3xl font-bold text-navy-800">Message sent</h3>
        <p className="mt-3 max-w-sm text-slate-500">
          Thanks for writing. Someone from the office will get back to you inside one
          business day, usually much sooner.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 font-heading text-sm font-semibold uppercase tracking-wider text-brand-600 hover:text-brand-500"
        >
          Send another message
        </button>
      </div>
    );
  }

  if (status === "mailto") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center bg-white p-10 text-center shadow-lg">
        <Mail className="h-16 w-16 text-brand-500" />
        <h3 className="mt-6 font-heading text-3xl font-bold text-navy-800">
          Your email app is opening
        </h3>
        <p className="mt-3 max-w-sm text-slate-500">
          We put your message into a fresh email to {BRAND.email}. Just hit send
          and it lands in our inbox. Rather talk it through? The office line is
          {" "}{BRAND.phone}.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 font-heading text-sm font-semibold uppercase tracking-wider text-brand-600 hover:text-brand-500"
        >
          Write a new message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="bg-white p-8 shadow-lg lg:p-10">
      <h3 className="font-heading text-2xl font-bold text-navy-800">Send Us a Message</h3>
      <p className="mt-2 text-[0.95rem] text-slate-500">
        Fill this out and we will call or email you back within one business day.
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" aria-label="Your name" className={inputCls} />
        <input name="phone" placeholder="Phone number" aria-label="Phone number" className={inputCls} />
        <input name="email" type="email" required placeholder="Email address" aria-label="Email address" className={inputCls} />
        <input name="service" placeholder="Service interested in" aria-label="Service interested in" className={inputCls} />
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us a little about the job"
          aria-label="Message"
          className={`${inputCls} sm:col-span-2`}
        />
      </div>
      {status === "error" && (
        <p className="mt-4 text-sm text-red-500">
          That did not go through. Try again, or just call the office.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex items-center gap-2.5 bg-brand-500 px-8 py-4 font-heading text-base font-semibold uppercase tracking-wider text-navy-900 transition-colors hover:bg-brand-400 disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4.5 w-4.5 animate-spin" /> Sending
          </>
        ) : (
          <>
            <Send className="h-4.5 w-4.5" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}

export function ContactPage() {
  const { navigate } = useNav();
  return (
    <>
      <PageBanner title="Contact Us" crumb="Contact" image="/images/service-banner.jpg" />

      {/* Info cards */}
      <section className="bg-fog py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Get in Touch"
            title="Four ways to reach a real person"
            text="Call, email, walk in, or tap the emergency line at 2am. However you reach us, a licensed electrician is on the other end, not a call center."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_CARDS.map((c, i) => {
              const inner = (
                <>
                  <span className="flex h-13 w-13 items-center justify-center bg-navy-800 p-3.5 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-navy-900">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-semibold text-navy-800">{c.title}</h3>
                  <p className={`mt-2 font-medium text-navy-700 ${c.href ? "group-hover:underline" : ""}`}>
                    {c.lines[0]}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{c.lines[1]}</p>
                </>
              );
              return (
                <Reveal key={c.title} delay={i * 0.07}>
                  {c.href ? (
                    <a href={c.href} className="group block h-full bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                      {inner}
                    </a>
                  ) : (
                    <div className="group h-full bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* RFQ callout */}
      <section className="border-y border-slate-100 bg-white py-10">
        <div className="container-site flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-navy-800 text-brand-500">
              <FileText className="h-5.5 w-5.5" />
            </span>
            <div>
              <h2 className="font-heading text-xl font-bold text-navy-800 sm:text-2xl">
                Planning a bigger project?
              </h2>
              <p className="mt-1 max-w-xl text-[0.95rem] text-slate-500">
                Rewires, panel upgrades, buildouts, EV chargers. Skip the back and
                forth and get a written, fixed-price quote within two business days.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("rfq" as never)}
            className="group inline-flex shrink-0 items-center gap-2.5 bg-navy-900 px-8 py-4 font-heading text-base font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-500 hover:text-navy-900"
          >
            Request a Quote
            <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Form + map */}
      <section className="bg-white pb-20 lg:pb-28">
        <div className="container-site grid gap-8 lg:grid-cols-2">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1} className="min-h-[420px]">
            <div className="flex h-full flex-col overflow-hidden shadow-lg">
              <iframe
                title="VoltEdge Electrical location map"
                src="https://maps.google.com/maps?q=4128%20Foundry%20Ave%2C%20Columbus%2C%20OH%2043215&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-[330px] w-full flex-1 border-0"
                loading="lazy"
              />
              <div className="bg-navy-800 p-6">
                <p className="font-heading text-lg font-semibold text-white">
                  Serving all of Franklin County
                </p>
                <p className="mt-1.5 text-sm text-white/60">
                  Clintonville · Grandview · Upper Arlington · Bexley · Westerville ·
                  Dublin · Downtown and everywhere between.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-fog py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Common Questions"
            title="Things people ask before booking"
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="group bg-white shadow-sm transition-shadow open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-heading text-lg font-semibold text-navy-800 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-navy-100 font-body text-xl font-light text-navy-800 transition-all group-open:rotate-45 group-open:bg-brand-500">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-6 leading-relaxed text-slate-500">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
