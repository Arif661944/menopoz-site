import Link from "next/link";
import { useId, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19" className="fill-plum" />
      <circle cx="23" cy="22" r="10.5" className="fill-rose" />
      <circle cx="25.5" cy="24.5" r="3.6" className="fill-butter" />
    </svg>
  );
}

export function Orbit({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden>
      <defs>
        <radialGradient id={`core-${id}`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="oklch(0.92 0.07 60)" />
          <stop offset="50%" stopColor="oklch(0.68 0.15 20)" />
          <stop offset="100%" stopColor="oklch(0.4 0.12 350)" />
        </radialGradient>
        <radialGradient id={`inner-${id}`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="oklch(0.98 0.03 90)" />
          <stop offset="100%" stopColor="oklch(0.9 0.07 70)" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="192" stroke="currentColor" strokeOpacity=".14" />
      <g
        style={{ transformOrigin: "200px 200px" }}
        className="animate-[spin_70s_linear_infinite] motion-reduce:animate-none"
      >
        <circle
          cx="200"
          cy="200"
          r="150"
          stroke="currentColor"
          strokeOpacity=".3"
          strokeDasharray="1 9"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle cx="350" cy="200" r="8" fill="oklch(0.94 0.07 95)" />
        <circle cx="94" cy="94" r="5" fill="oklch(0.86 0.05 150)" />
        <circle cx="200" cy="350" r="4" fill="oklch(0.91 0.045 20)" />
      </g>
      <circle cx="200" cy="200" r="108" fill={`url(#core-${id})`} />
      <circle cx="230" cy="224" r="38" fill={`url(#inner-${id})`} />
      <circle cx="242" cy="233" r="12" fill="oklch(0.62 0.15 18)" />
      <path
        d="M120 250c30 40 110 52 160 6"
        stroke="oklch(0.98 0.02 80)"
        strokeOpacity=".5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="grain mesh-cream relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full border border-plum/10" aria-hidden />
      <div className="pointer-events-none absolute -top-10 -right-10 size-52 rounded-full border border-plum/10" aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-8 px-4 py-14 md:flex-row md:items-end lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">{eyebrow}</p>
          <h1 className="font-heading mt-4 text-4xl leading-[1.05] text-balance text-plum md:text-6xl [&_em]:text-rose">
            {title}
          </h1>
          {description ? <p className="mt-5 max-w-xl text-lg leading-relaxed text-plum/70">{description}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        {aside}
      </div>
    </section>
  );
}

export function FilterPills({
  items,
}: {
  items: { label: string; href: string; active: boolean }[];
}) {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Kategori filtresi">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            item.active ? "bg-plum text-white" : "border border-border bg-white text-plum/75 hover:bg-blush",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function TopicGrid({
  items,
  className,
}: {
  items: { title: string; href: string }[];
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, index) => (
        <li key={item.title}>
          <Link
            href={item.href}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-white px-5 py-4 text-plum transition-all hover:-translate-y-0.5 hover:border-rose/40 hover:shadow-soft"
          >
            <span className="flex items-center gap-4">
              <span className="font-heading text-sm text-rose/60 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-medium">{item.title}</span>
            </span>
            <ArrowUpRight className="size-4 text-plum/30 transition-all group-hover:rotate-45 group-hover:text-rose" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">{eyebrow}</p>
      <h2 className="font-heading mt-3 text-3xl leading-tight text-plum md:text-5xl [&_em]:text-rose">
        {title}
      </h2>
      {description ? <p className="mt-3 max-w-xl text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function HubHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain mesh-plum relative overflow-hidden text-white">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase ring-1 ring-white/15">
            <span className="size-1.5 rounded-full bg-peach" />
            {eyebrow}
          </span>
          <h1 className="font-heading mt-6 max-w-3xl text-4xl leading-[1.05] text-balance md:text-6xl [&_em]:text-peach">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{description}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        <Orbit className="mx-auto hidden w-full max-w-sm text-white lg:block" />
      </div>
    </section>
  );
}
