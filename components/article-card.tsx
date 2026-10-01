import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article, ArticleCategory } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const covers: Record<ArticleCategory, { bg: string; dot: string; ink: string }> = {
  Gebelik: { bg: "bg-blush", dot: "bg-rose", ink: "text-plum" },
  Doğum: { bg: "bg-peach", dot: "bg-plum", ink: "text-plum" },
  "Doğum Sonrası": { bg: "bg-sage", dot: "bg-plum-soft", ink: "text-plum" },
  Menopoz: { bg: "bg-plum", dot: "bg-peach", ink: "text-white" },
  "Adet Döngüsü": { bg: "bg-butter", dot: "bg-rose", ink: "text-plum" },
  "Hormonal Sağlık": { bg: "bg-sky", dot: "bg-plum", ink: "text-plum" },
  Jinekoloji: { bg: "bg-sky", dot: "bg-rose", ink: "text-plum" },
  "Cinsel Sağlık": { bg: "bg-blush", dot: "bg-plum", ink: "text-plum" },
  "Koruyucu Sağlık": { bg: "bg-sage", dot: "bg-rose", ink: "text-plum" },
};

export function ArticleCard({
  article,
  size = "default",
}: {
  article: Article;
  size?: "default" | "large";
}) {
  const cover = covers[article.category];
  const initial = article.title.charAt(0);

  return (
    <Link
      href={`/yazilar/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div
        className={cn(
          "grain relative overflow-hidden",
          cover.bg,
          size === "large" ? "h-64" : "h-40",
        )}
      >
        <span
          className={cn(
            "font-heading absolute -right-3 -bottom-10 z-10 leading-none opacity-25 transition-transform duration-500 group-hover:-translate-y-2",
            cover.ink,
            size === "large" ? "text-[14rem]" : "text-[10rem]",
          )}
          aria-hidden
        >
          {initial}
        </span>
        <span
          className={cn("absolute top-6 left-6 z-10 size-3 rounded-full", cover.dot)}
          aria-hidden
        />
        <span
          className={cn(
            "absolute top-6 left-12 z-10 h-3 w-16 rounded-full opacity-40",
            cover.dot,
          )}
          aria-hidden
        />
        <div className="absolute inset-x-6 bottom-5 z-10 flex items-center justify-between">
          <span
            className={cn(
              "rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-plum backdrop-blur",
            )}
          >
            {article.category}
          </span>
          <span className="flex size-9 items-center justify-center rounded-full bg-white/80 text-plum transition-transform group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3
          className={cn(
            "font-heading leading-snug text-balance",
            size === "large" ? "text-3xl" : "text-xl",
          )}
        >
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs text-muted-foreground">
          <span>{article.readingMinutes} dk okuma</span>
          <span className="text-right">
            {article.reviewStatus === "reviewed" && article.medicalReviewer
              ? `Değerlendiren: ${article.medicalReviewer}`
              : "Editöryel içerik · değerlendirme bekliyor"}
          </span>
        </div>
      </div>
    </Link>
  );
}
