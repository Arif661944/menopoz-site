"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { birthChecklist } from "@/lib/content/hubs";
import { cn } from "@/lib/utils";

export function BirthChecklist() {
  const [checked, setChecked] = useState<string[]>([]);
  const progress = Math.round((checked.length / birthChecklist.length) * 100);

  const toggle = (id: string) =>
    setChecked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  return (
    <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
      <div className="grain mesh-plum relative flex flex-col overflow-hidden rounded-[2rem] p-8 text-white">
        <p className="relative z-10 text-xs font-medium tracking-[0.18em] text-peach uppercase">Hazırlık listesi</p>
        <h2 className="font-heading relative z-10 mt-3 text-4xl leading-tight">Doğuma hazır mıyım?</h2>
        <p className="relative z-10 mt-4 text-sm leading-relaxed text-white/70">
          Eğitim amaçlı bir hazırlık hatırlatmasıdır; tıbbi değerlendirme veya tanı aracı
          değildir. Tamamlamak sizi “hazır” ilan etmez.
        </p>
        <div className="relative z-10 mt-auto pt-10">
          <div className="flex items-end gap-2">
            <span className="font-heading text-7xl leading-none text-peach tabular-nums">{checked.length}</span>
            <span className="pb-2 text-white/60">/ {birthChecklist.length} madde</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-peach to-rose transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-white/50">Bu sayı bir sağlık sonucu değildir.</p>
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {birthChecklist.map((item) => {
          const on = checked.includes(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(item.id)}
                className={cn(
                  "flex h-full w-full gap-4 rounded-3xl border p-5 text-left transition-all",
                  on ? "border-sage bg-sage text-plum" : "border-border/70 bg-white text-plum hover:border-rose/40",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    on ? "border-plum bg-plum text-white" : "border-plum/25",
                  )}
                >
                  {on ? <Check className="size-4" /> : null}
                </span>
                <span>
                  <span className="block font-medium">{item.title}</span>
                  <span className="mt-1 block text-sm text-plum/65">{item.detail}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
