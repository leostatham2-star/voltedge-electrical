"use client";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="1" y="1" width="46" height="46" rx="10" fill="#13233F" />
      <rect x="1" y="1" width="46" height="46" rx="10" fill="none" stroke="#FFB200" strokeOpacity="0.25" strokeWidth="1.5" />
      <path d="M27.5 8 L15 27 h7.5 L20.5 40 L33 21 h-7.5 Z" fill="#FFB200" />
    </svg>
  );
}

export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const nameColor = variant === "dark" ? "text-navy-800" : "text-white";
  const subColor = variant === "dark" ? "text-navy-600" : "text-white/60";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-heading text-[1.45rem] font-bold tracking-wide ${nameColor}`}>
          VOLT<span className="text-brand-500">EDGE</span>
        </span>
        <span className={`font-heading text-[0.62rem] font-semibold uppercase tracking-[0.34em] ${subColor}`}>
          Electrical Services
        </span>
      </span>
    </span>
  );
}
