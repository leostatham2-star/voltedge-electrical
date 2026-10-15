"use client";

import { useRef, useState } from "react";
import {
  Phone,
  Mail,
  FileText,
  ClipboardCheck,
  Search,
  CheckCircle2,
  Loader2,
  Send,
  BadgeDollarSign,
  Clock,
  PencilRuler,
} from "lucide-react";
import { BRAND, SERVICES, mailtoLead } from "@/lib/site";
import { PageBanner, SectionHeading, Reveal, BoltBullet } from "../shared";
import { useNav } from "../nav-context";

const QUOTE_STEPS = [
  {
    icon: FileText,
    title: "Tell us about the job",
    text: "Fill out the quote form with the details you have. Photos or plans are welcome later by email.",
  },
  {
    icon: Search,
    title: "We review and walk the site",
    text: "A coordinator calls to confirm details. Bigger jobs get a free on-site visit, usually within two business days.",
  },
  {
    icon: ClipboardCheck,
    title: "You get a written quote",
    text: "A fixed, itemized price in plain language. Valid for 30 days, no obligation, no fine print games.",
  },
];

const QUOTE_PROMISES = [
  "Free written quotes on any job over 250 dollars",
  "The quoted price is the invoice price, guaranteed",
  "Permits and inspections included in every quote",
  "Quotes honored for 30 days, no expiry tricks",
];

function RfqForm() {
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
        body: JSON.stringify({ ...data, source: "rfq" }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      formRef.current?.reset();
    } catch {
      mailtoLead(data, "rfq");
      setStatus("mailto");
    }
  };

  const inputCls =
    "w-full bg-white px-4 py-3.5 text-[0.95rem] text-navy-900 ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500";

  if (status === "done") {
    return (
      <div className="flex min-h-[560px] flex-col items-center justify-center bg-white p-10 text-center shadow-lg lg:h-full">
        <CheckCircle2 className="h-16 w-16 text-brand-500" />
        <h3 className="mt-6 font-heading text-3xl font-bold text-navy-800">Quote request received</h3>
        <p className="mt-3 max-w-md text-slate-500">
          Thanks for the details. A coordinator will confirm we have everything, and
          your written quote lands within two business days. Something urgent in the
          meantime? The office line is {BRAND.phone}.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 font-heading text-sm font-semibold uppercase tracking-wider text-brand-600 hover:text-brand-500"
        >
          Request another quote
        </button>
      </div>
    );
  }

  if (status === "mailto") {
    return (
      <div className="flex min-h-[560px] flex-col items-center justify-center bg-white p-10 text-center shadow-lg lg:h-full">
        <Mail className="h-16 w-16 text-brand-500" />
        <h3 className="mt-6 font-heading text-3xl font-bold text-navy-800">
          Your email app is opening
        </h3>
        <p className="mt-3 max-w-md text-slate-500">
          Your quote request is drafted as an email to {BRAND.email} with all the job
          details filled in. Hit send and our estimating team takes it from there.
          Prefer to talk? Call {BRAND.phone}.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 font-heading text-sm font-semibold uppercase tracking-wider text-brand-600 hover:text-brand-500"
        >
          Write a new request
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="bg-white p-8 shadow-lg lg:p-10">
      <h3 className="font-heading text-2xl font-bold text-navy-800">Request for Quote</h3>
      <p className="mt-2 text-[0.95rem] text-slate-500">
        The more you tell us, the sharper the number. Every field with a star helps,
        only the starred ones are required.
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name *" aria-label="Your name" className={inputCls} />
        <input name="phone" required placeholder="Phone number *" aria-label="Phone number" className={inputCls} />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address *"
          aria-label="Email address"
          className={`${inputCls} sm:col-span-2`}
        />
        <select name="propertyType" aria-label="Property type" defaultValue="" required className={`${inputCls} text-slate-400`}>
          <option value="" disabled>Property type *</option>
          <option value="Residential home">Residential home</option>
          <option value="Rental or multi-family">Rental or multi-family</option>
          <option value="Commercial property">Commercial property</option>
          <option value="Industrial facility">Industrial facility</option>
          <option value="New construction or remodel">New construction or remodel</option>
        </select>
        <input
          name="zipCode"
          placeholder="Property ZIP code"
          aria-label="Property ZIP code"
          inputMode="numeric"
          pattern="[0-9\- ]{3,10}"
          title="ZIP code, for example 43215"
          className={inputCls}
        />
        <select name="service" aria-label="Service needed" defaultValue="" required className={`${inputCls} text-slate-400`}>
          <option value="" disabled>Service needed *</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Emergency repair">Emergency repair</option>
          <option value="EV charger installation">EV charger installation</option>
          <option value="Something else">Something else</option>
        </select>
        <select name="timeline" aria-label="Timeline" defaultValue="" required className={`${inputCls} text-slate-400`}>
          <option value="" disabled>Timeline *</option>
          <option value="As soon as possible">As soon as possible</option>
          <option value="Within 1 to 2 weeks">Within 1 to 2 weeks</option>
          <option value="Within 1 to 2 months">Within 1 to 2 months</option>
          <option value="Just planning and budgeting">Just planning and budgeting</option>
        </select>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Describe the job * — what needs doing, the age of the building, rooms or areas involved, and anything you already know (panel brand, amp service, previous quotes)"
          aria-label="Job description"
          className={`${inputCls} sm:col-span-2`}
        />
      </div>
      {status === "error" && (
        <p className="mt-4 text-sm text-red-500">
          That did not go through. Try again, or call the office at {BRAND.phone}.
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
            <Send className="h-4.5 w-4.5" /> Send Quote Request
          </>
        )}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        We use your details only to prepare the quote and schedule the visit. No
        lists, no spam, no sharing with third parties.
      </p>
    </form>
  );
}

export function RfqPage() {
  const { navigate } = useNav();

  return (
    <>
      <PageBanner title="Request a Quote" crumb="Request a Quote" image="/images/cta-bg.jpg" />

      {/* Steps + form */}
      <section className="bg-fog py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Request for Quote"
            title="A written price before anyone touches a wire"
            text="Tell us what you are planning and our estimating team puts a fixed, itemized quote together. No sales visits you did not ask for, no teaser numbers that grow later."
          />

          <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_1.15fr]">
            {/* Left: how it works + promises + contact */}
            <div className="space-y-6">
              <Reveal>
                <div className="space-y-5">
                  {QUOTE_STEPS.map((s, i) => (
                    <div key={s.title} className="group flex gap-5 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center bg-navy-800 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-navy-900">
                        <s.icon className="h-5.5 w-5.5" />
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 font-heading text-[0.65rem] font-bold text-navy-900">
                          {i + 1}
                        </span>
                      </span>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-navy-800">{s.title}</h3>
                        <p className="mt-1.5 text-[0.93rem] leading-relaxed text-slate-500">{s.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="bg-navy-800 p-7">
                  <h3 className="flex items-center gap-2.5 font-heading text-lg font-semibold text-white">
                    <BadgeDollarSign className="h-5 w-5 text-brand-500" />
                    What every quote includes
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {QUOTE_PROMISES.map((p) => (
                      <BoltBullet key={p}>
                        <span className="text-white/75">{p}</span>
                      </BoltBullet>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href={BRAND.phoneHref}
                    className="group flex items-center gap-4 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-navy-800 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-navy-900">
                      <Phone className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-heading text-sm font-semibold uppercase tracking-wider text-navy-800">
                        Call the Office
                      </span>
                      <span className="block text-sm text-slate-400">{BRAND.phone}</span>
                    </span>
                  </a>
                  <a
                    href={BRAND.emailHref}
                    className="group flex items-center gap-4 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-navy-800 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-navy-900">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-heading text-sm font-semibold uppercase tracking-wider text-navy-800">
                        Email Plans or Photos
                      </span>
                      <span className="block break-all text-sm text-slate-400">{BRAND.email}</span>
                    </span>
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-500">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  Standard quotes go out within two business days. Emergency repairs do
                  not wait for quotes — call the 24/7 line and we roll a truck.
                </p>
              </Reveal>
            </div>

            {/* Right: the form */}
            <Reveal delay={0.06}>
              <RfqForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cross-links strip */}
      <section className="bg-navy-900">
        <div className="container-site flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <p className="font-heading text-xl font-bold leading-snug text-white sm:text-2xl">
            Not quoting yet? Browse the work first.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("projects" as never)}
              className="inline-flex items-center gap-2 border border-white/25 px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-brand-500 hover:text-brand-400"
            >
              <PencilRuler className="h-4 w-4" />
              See Recent Projects
            </button>
            <button
              onClick={() => navigate("contact" as never)}
              className="inline-flex items-center gap-2 bg-brand-500 px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wider text-navy-900 transition-colors hover:bg-brand-400"
            >
              General Contact Page
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
