"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNav } from "./nav-context";
import type { PageId } from "@/lib/site";

/** Scroll reveal wrapper with a subtle upward fade */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col gap-3 ${alignCls} ${align === "center" ? "mx-auto max-w-2xl" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className={`font-heading text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.6rem] ${
          light ? "text-white" : "text-navy-800"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`max-w-xl text-[1.02rem] leading-relaxed ${light ? "text-white/70" : "text-slate-500"}`}>
          {text}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Inner page title banner, like the reference theme */
export function PageBanner({
  title,
  crumb,
  image = "/images/service-banner.jpg",
}: {
  title: string;
  crumb: string;
  image?: string;
}) {
  const { navigate } = useNav();
  return (
    <section className="relative flex h-[300px] items-center overflow-hidden bg-navy-900 pt-16 sm:h-[340px]">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/75 to-navy-800/40" />
      <div className="container-site relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">{title}</h1>
          <nav className="mt-3 flex items-center gap-1.5 text-sm text-white/70" aria-label="Breadcrumb">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("home" as PageId);
              }}
              className="transition-colors hover:text-brand-400"
            >
              Home
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-brand-500" />
            <span className="text-brand-400">{crumb}</span>
          </nav>
        </motion.div>
      </div>
    </section>
  );
}

/** Amber bolt bullet used across lists */
export function BoltBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[0.98rem] leading-relaxed text-slate-600">
      <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0" fill="#FFB200" aria-hidden="true">
        <path d="M13 2 L4.5 14 H10.5 L9.5 22 L18.5 10 H12.5 Z" />
      </svg>
      <span>{children}</span>
    </li>
  );
}
