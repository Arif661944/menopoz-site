import Link from "next/link";
import { ArrowUpRight, MessageCirclePlus, Stethoscope } from "lucide-react";
import { FilterPills, PageHero } from "@/components/decor";
import { CommunityNotice } from "@/components/notices";
import { questions } from "@/lib/content";
import type { QuestionCategory } from "@/lib/content/types";
import { formatDate } from "@/lib/format";

const categories: Array<QuestionCategory | "Tümü"> = [
  "Tümü",
  "Gebelik",
  "Doğum",
  "Doğum Sonrası",
  "Jinekoloji",
  "Hormonal Sağlık",
  "Menopoz",
];

export const metadata = {
  title: "Soru & Cevap",
};

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const filtered = kategori ? questions.filter((question) => question.category === kategori) : questions;

  return (
    <>
      <PageHero
        eyebrow="Soru & Cevap"
        title={
          <>
            Sorduğun her soru <em>bir başkasının da sorusu.</em>
          </>
        }
        description="Genel kadın sağlığı soruları ve eğitim amaçlı yanıtlar. Acil bir şikâyetin varsa 112’yi ara."
      >
        <Link
          href="/soru-sor"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-rose px-6 text-sm font-medium text-white"
        >
          <MessageCirclePlus className="size-4" /> Anonim soru sor
        </Link>
      </PageHero>

      <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
        <FilterPills
          items={categories.map((category) => ({
            label: category,
            href: category === "Tümü" ? "/soru-cevap" : `/soru-cevap?kategori=${encodeURIComponent(category)}`,
            active: category === "Tümü" ? !kategori : kategori === category,
          }))}
        />
        <div className="mt-6">
          <CommunityNotice />
        </div>
        <ul className="mt-8 space-y-3">
          {filtered.map((question) => (
            <li key={question.slug}>
              <Link
                href={`/soru-cevap/${question.slug}`}
                className="group grid gap-4 rounded-3xl border border-border/70 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft md:grid-cols-[1fr_auto] md:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-blush px-2.5 py-0.5 font-medium text-plum">{question.category}</span>
                    {question.isExpertAnswer ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-plum px-2.5 py-0.5 font-medium text-white">
                        <Stethoscope className="size-3" /> Uzman yanıtı
                      </span>
                    ) : (
                      <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">
                        Eğitim yanıtı
                      </span>
                    )}
                    <span className="text-muted-foreground">{formatDate(question.askedAt)}</span>
                  </div>
                  <h2 className="font-heading mt-3 text-xl leading-snug text-plum group-hover:text-rose">
                    {question.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{question.body}</p>
                </div>
                <ArrowUpRight className="hidden size-6 text-plum/25 transition-all group-hover:rotate-45 group-hover:text-rose md:block" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
