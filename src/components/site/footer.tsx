"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { BRAND, NAV_LINKS, SERVICES } from "@/lib/site";
import { useNav } from "./nav-context";
import { Logo } from "./logo";

export function Footer() {
  const { navigate } = useNav();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const go = (p: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(p as never);
  };

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-navy-950 text-white/75">
      {/* Main footer */}
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.1fr] lg:py-20">
        {/* Brand column */}
        <div>
          <button onClick={go("home")} aria-label="VoltEdge home">
            <Logo variant="light" />
          </button>
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">
            A family run electrical contractor serving Columbus and the surrounding
            suburbs since {BRAND.founded}. Licensed, insured, and on call around the
            clock for the moments that cannot wait until morning.
          </p>
          <ul className="mt-6 space-y-3 text-[0.95rem]">
            <li>
              <a href={BRAND.phoneHref} className="flex items-center gap-3 transition-colors hover:text-brand-400">
                <Phone className="h-4 w-4 shrink-0 text-brand-500" />
                {BRAND.phone}
              </a>
            </li>
            <li>
              <a href={BRAND.emailHref} className="flex items-center gap-3 transition-colors hover:text-brand-400">
                <Mail className="h-4 w-4 shrink-0 text-brand-500" />
                {BRAND.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              {BRAND.address}
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-heading text-lg font-semibold uppercase tracking-wider text-white">
            Explore
          </h4>
          <span className="mt-2 block h-0.5 w-9 bg-brand-500" />
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {NAV_LINKS.map((link) => (
              <li key={link.page}>
                <button
                  onClick={() => navigate(link.page as never)}
                  className="transition-all hover:translate-x-1 hover:text-brand-400"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading text-lg font-semibold uppercase tracking-wider text-white">
            Services
          </h4>
          <span className="mt-2 block h-0.5 w-9 bg-brand-500" />
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <button
                  onClick={go("services")}
                  className="transition-all hover:translate-x-1 hover:text-brand-400"
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-heading text-lg font-semibold uppercase tracking-wider text-white">
            Stay in the Loop
          </h4>
          <span className="mt-2 block h-0.5 w-9 bg-brand-500" />
          <p className="mt-5 text-[0.95rem] leading-relaxed">
            Seasonal safety reminders and the odd coupon. About one email a month,
            never more.
          </p>
          <form onSubmit={onSubscribe} className="mt-5">
            <div className="flex overflow-hidden rounded-sm bg-white/10 ring-1 ring-white/15 transition focus-within:ring-brand-500">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="shrink-0 bg-brand-500 px-4 text-navy-900 transition-colors hover:bg-brand-400"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {subscribed && (
              <p className="mt-3 text-sm text-brand-400">
                You are on the list. Talk soon.
              </p>
            )}
          </form>
          <div className="mt-6 flex items-center gap-2">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Social link"
                className="rounded-sm bg-white/8 p-2.5 text-white/60 ring-1 ring-white/10 transition-colors hover:bg-brand-500 hover:text-navy-900"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-[0.88rem] text-white/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p>
            <a
              href="https://m-webcraftstudio.space-z.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/70 transition-colors hover:text-brand-400"
            >
              Designed By M-Webcraft Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
