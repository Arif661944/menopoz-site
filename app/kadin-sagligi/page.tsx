import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { PageHero, SectionHeading } from "@/components/decor";
import { MedicalDisclaimer } from "@/components/notices";
import { SearchBar } from "@/components/search-bar";
import { articles } from "@/lib/content";
import type { ArticleCategory } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const categories: { name: ArticleCategory; text: string; tone: string }[] = [
  { name: "Adet Döngüsü", text: "Döngünü tanımak, düzeni ve değişimleri anlamak.", tone: "bg-butter" },
  { name: "Jinekoloji", text: "Kontroller, smear ve sık görülen şikâyetler.", tone: "bg-sky" },
  { name: "Koruyucu Sağlık", text: "Taramalar, aşılar ve gündelik bakım.", tone: "bg-sage" },
  { name: "Hormonal Sağlık", text: "Hormonların enerji, cilt ve ruh haline etkisi.", tone: "bg-peach" },
  { name: "Cinsel Sağlık", text: "Doğum sonrası ve her dönemde cinsel sağlık.", tone: "bg-blush" },
];

export const metadata = {
  title: "Kadın Sağlığı",
};

export default function WomensHealthPage() {
  const names = new Set<string>(categories.map((category) => category.name));
  const list = articles.filter((article) => names.has(article.category));

  return (
    <>
      <PageHero
        eyebrow="Kadın sağlığı"
        title={
          <>
            Anne olurken <em>kendini de unutma.</em>
          </>
        }
        description="Adet döngüsünden koruyucu bakıma, jinekolojiden hormonal sağlığa aranabilir bir kütüphane."
      >
        <div className="max-w-2xl">
          <SearchBar />
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <section className="grid gap-3 py-16 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const count = articles.filter((article) => article.category === category.name).length;
            return (
              <Link
                key={category.name}
                href={`/yazilar?kategori=${encodeURIComponent(category.name)}`}
                className={cn(
                  "grain relative flex min-h-52 flex-col overflow-hidden rounded-[2rem] p-6 text-plum transition-transform hover:-translate-y-1",
                  category.tone,
                )}
              >
                <span className="font-heading relative z-10 text-sm text-plum/50">{count} yazı</span>
                <span className="font-heading relative z-10 mt-auto text-2xl leading-tight">{category.name}</span>
                <span className="relative z-10 mt-2 text-sm text-plum/70">{category.text}</span>
              </Link>
            );
          })}
        </section>

        <section className="pb-16">
          <SectionHeading eyebrow="Okuma listesi" title="Kadın sağlığı yazıları" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}
