"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Clock, Facebook, Twitter, Instagram, Linkedin, Menu, X, ChevronRight } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/site";
import { useNav } from "./nav-context";
import { Logo } from "./logo";

export function Header() {
  const { page, navigate } = useNav();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const go = (p: string) => {
    setMobileOpen(false);
    navigate(p as never);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top info bar */}
      <div
        className={`hidden border-b border-white/10 bg-navy-950 text-white/85 transition-all duration-300 lg:block ${
          scrolled ? "h-0 overflow-hidden opacity-0" : "h-10 opacity-100"
        }`}
      >
        <div className="container-site flex h-10 items-center justify-between text-[0.82rem]">
          <div className="flex items-center gap-6">
            <a href={BRAND.emailHref} className="flex items-center gap-2 transition-colors hover:text-brand-400">
              <Mail className="h-3.5 w-3.5 text-brand-500" />
              {BRAND.email}
            </a>
            <a href={BRAND.phoneHref} className="flex items-center gap-2 transition-colors hover:text-brand-400">
              <Phone className="h-3.5 w-3.5 text-brand-500" />
              {BRAND.phone}
            </a>
            <span className="flex items-center gap-2 text-white/60">
              <Clock className="h-3.5 w-3.5 text-brand-500" />
              {BRAND.hours} · {BRAND.saturday}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Social link"
                className="rounded-sm p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-brand-400"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "bg-navy-900/95 shadow-lg shadow-navy-950/20 backdrop-blur" : "bg-navy-900"
        }`}
      >
        <div className="container-site flex h-[76px] items-center justify-between gap-4">
          <button onClick={() => go("home")} aria-label="VoltEdge Electrical home">
            <Logo variant="light" />
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = page === link.page || (page === "blogPost" && link.page === "blog");
              return (
                <button
                  key={link.page}
                  onClick={() => go(link.page)}
                  className={`relative px-3.5 py-2 text-[0.94rem] font-medium transition-colors ${
                    active ? "text-brand-400" : "text-white/85 hover:text-brand-400"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("rfq")}
              className="hidden items-center gap-2 bg-brand-500 px-6 py-3 font-heading text-[0.95rem] font-semibold uppercase tracking-wider text-navy-900 transition-all hover:bg-brand-400 hover:shadow-lg hover:shadow-brand-500/25 sm:inline-flex"
            >
              Request a Quote
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              className="rounded-md p-2 text-white lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[300px] max-w-[85vw] flex-col bg-navy-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <Logo variant="light" className="scale-90 origin-left" />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-md p-2 text-white/80 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => {
                const active = page === link.page || (page === "blogPost" && link.page === "blog");
                return (
                  <button
                    key={link.page}
                    onClick={() => go(link.page)}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-left font-heading text-lg font-semibold uppercase tracking-wide transition-colors ${
                      active ? "bg-brand-500/15 text-brand-400" : "text-white/85 hover:bg-white/5 hover:text-brand-400"
                    }`}
                  >
                    {link.label}
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </button>
                );
              })}
            </nav>
            <div className="mt-auto space-y-2 border-t border-white/10 p-4 text-sm text-white/70">
              <a href={BRAND.phoneHref} className="flex items-center gap-2.5 hover:text-brand-400">
                <Phone className="h-4 w-4 text-brand-500" /> {BRAND.phone}
              </a>
              <a href={BRAND.emailHref} className="flex items-center gap-2.5 hover:text-brand-400">
                <Mail className="h-4 w-4 text-brand-500" /> {BRAND.email}
              </a>
              <button
                onClick={() => go("rfq")}
                className="mt-3 w-full bg-brand-500 px-5 py-3 font-heading text-sm font-semibold uppercase tracking-wider text-navy-900"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
