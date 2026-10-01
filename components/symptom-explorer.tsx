"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { menopauseSymptoms } from "@/lib/content/symptoms";
import { cn } from "@/lib/utils";

export function SymptomExplorer() {
  const [active, setActive] = useState(menopauseSymptoms[0].slug);
  const symptom = menopauseSymptoms.find((item) => item.slug === active) ?? menopauseSymptoms[0];

  return (
    <section className="grid gap-6 rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Belirti rehberi</p>
        <h2 className="font-heading mt-3 text-3xl text-plum md:text-4xl">Menopozda neler değişebilir?</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Bu bir eğitim aracıdır. Menopoz veya başka bir hastalık tanısı koymaz.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {menopauseSymptoms.map((item) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={item.slug === active}
              onClick={() => setActive(item.slug)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                item.slug === active ? "bg-plum text-white" : "bg-blush text-plum hover:bg-peach",
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <div className="grain mesh-plum relative overflow-hidden rounded-[1.75rem] p-8 text-white" aria-live="polite">
        <span className="relative z-10 rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/15">Eğitim notu</span>
        <h3 className="font-heading relative z-10 mt-5 text-3xl">{symptom.title}</h3>
        <div className="relative z-10 mt-4 space-y-3 text-sm leading-relaxed text-white/80">
          <p>{symptom.summary}</p>
          <p>{symptom.mayOccur}</p>
          <p>{symptom.otherCauses}</p>
          <p className="rounded-2xl bg-white/10 p-4 font-medium text-white ring-1 ring-white/15">
            {symptom.whenToSeekCare}
          </p>
        </div>
        <Link
          href={`/yazilar/${symptom.articleSlug}`}
          className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-medium text-peach hover:underline"
        >
          İlgili yazıyı oku <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
