import { BadgeCheck, FileClock } from "lucide-react";
import type { Article } from "@/lib/content/types";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function MedicalReviewPanel({ article }: { article: Article }) {
  const reviewed = article.reviewStatus === "reviewed" && article.medicalReviewer;
  const Icon = reviewed ? BadgeCheck : FileClock;

  const facts = [
    { label: "Yazar", value: article.author },
    { label: "Tıbbi değerlendirici", value: article.medicalReviewer ?? "Henüz eklenmedi" },
    { label: "Yayın tarihi", value: formatDate(article.publishedAt) },
    {
      label: "Son gözden geçirme",
      value: article.lastReviewedAt ? formatDate(article.lastReviewedAt) : "Değerlendirme bekleniyor",
    },
  ];

  return (
    <aside className="rounded-3xl border border-border/70 bg-white p-6" aria-label="Tıbbi içerik bilgisi">
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-2xl",
            reviewed ? "bg-sage text-plum" : "bg-butter text-plum",
          )}
        >
          <Icon className="size-5" />
        </span>
        <div>
          <p className="font-heading text-lg text-plum">Tıbbi içerik</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {reviewed
              ? `Bu içerik ${article.medicalReviewer} tarafından tıbbi açıdan değerlendirilmiştir.`
              : "Bu içerik eğitim amaçlı editöryel bir yazıdır. Henüz bir hekim tarafından tıbbi değerlendirmeden geçmemiştir. Kişiye özel tavsiye yerine geçmez."}
          </p>
        </div>
      </div>
      <dl className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-xs text-muted-foreground">{fact.label}</dt>
            <dd className="mt-0.5 text-sm font-medium text-plum">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
