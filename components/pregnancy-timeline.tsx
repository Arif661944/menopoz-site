"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { pregnancyWeeks } from "@/lib/content/pregnancy";
import { cn } from "@/lib/utils";

const trimesterStyle = {
  1: {
    cell: "bg-blush",
    active: "bg-rose text-white",
    label: "1. trimester",
    range: "1–13",
    theme: "Uyum ve ilk kontroller",
  },
  2: {
    cell: "bg-peach",
    active: "bg-plum-soft text-white",
    label: "2. trimester",
    range: "14–27",
    theme: "Büyüme ve ilk kıpırtılar",
  },
  3: {
    cell: "bg-sage",
    active: "bg-plum text-white",
    label: "3. trimester",
    range: "28–40",
    theme: "Doğuma hazırlık",
  },
} as const;

export function PregnancyTimeline({
  initialWeek = 12,
  compact = false,
}: {
  initialWeek?: number;
  compact?: boolean;
}) {
  const [week, setWeek] = useState(initialWeek);
  const current = pregnancyWeeks.find((item) => item.week === week) ?? pregnancyWeeks[0];
  const trimester = current.trimester as 1 | 2 | 3;
  const progress = Math.round((week / 40) * 100);

  return (
    <section
      id={compact ? undefined : "haftalar"}
      className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft md:p-10"
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Hafta hafta gebelik</p>
          <h2 className="font-heading mt-3 text-3xl text-plum md:text-4xl">
            Kaçıncı haftadasın?
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Bir haftaya dokun, o haftanın eğitim notunu oku. Bu çizelge gebelik takibi
            veya ultrason yerine geçmez.
          </p>

          <div
            className="mt-8 grid grid-cols-8 gap-1.5 sm:grid-cols-10"
            role="listbox"
            aria-label="Gebelik haftası seç"
          >
            {pregnancyWeeks.map((item) => {
              const style = trimesterStyle[item.trimester as 1 | 2 | 3];
              const selected = item.week === week;
              return (
                <button
                  key={item.week}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => setWeek(item.week)}
                  className={cn(
                    "aspect-square rounded-xl text-xs font-medium text-plum tabular-nums transition-all hover:scale-110",
                    selected ? cn(style.active, "scale-110 shadow-lg") : style.cell,
                    item.week < week && !selected && "opacity-60",
                  )}
                >
                  {item.week}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
            {Object.values(trimesterStyle).map((style) => (
              <span key={style.label} className="flex items-center gap-2">
                <span className={cn("size-3 rounded", style.cell)} />
                {style.label} · {style.range}. hafta
              </span>
            ))}
          </div>
        </div>

        <div className="grain mesh-plum relative flex flex-col overflow-hidden rounded-[1.75rem] p-8 text-white">
          <div className="relative z-10 flex items-center justify-between">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/15">
              {trimesterStyle[trimester].label}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Önceki hafta"
                disabled={week === 1}
                onClick={() => setWeek((value) => Math.max(1, value - 1))}
                className="flex size-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-colors hover:bg-white/20 disabled:opacity-30"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Sonraki hafta"
                disabled={week === 40}
                onClick={() => setWeek((value) => Math.min(40, value + 1))}
                className="flex size-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-colors hover:bg-white/20 disabled:opacity-30"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="relative z-10 mt-8 flex items-end gap-4">
            <span className="font-heading text-8xl leading-none text-peach tabular-nums">{week}</span>
            <span className="pb-3 text-sm text-white/70">. hafta</span>
          </div>
          <h3 className="font-heading relative z-10 mt-4 text-2xl" aria-live="polite">
            {trimesterStyle[trimester].theme}
          </h3>
          <p className="relative z-10 mt-3 leading-relaxed text-white/80">{current.summary}</p>

          <div className="relative z-10 mt-auto pt-8">
            <div className="flex justify-between text-xs text-white/60">
              <span>Yolculuğun</span>
              <span>%{progress}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-peach to-rose transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
