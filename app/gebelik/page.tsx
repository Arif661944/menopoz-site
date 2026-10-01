import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { HubHero, SectionHeading, TopicGrid } from "@/components/decor";
import { ForumThreadRow } from "@/components/forum-bits";
import { MedicalDisclaimer } from "@/components/notices";
import { PregnancyTimeline } from "@/components/pregnancy-timeline";
import { articles, forumPosts } from "@/lib/content";
import { pregnancyHub } from "@/lib/content/pregnancy";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Gebelik Rehberi",
  description: "Gebelik öncesinden 40. haftaya kadar anlaşılır gebelik bilgileri.",
};

const trimesters = [
  { id: "trimester-1", title: "1. Trimester", weeks: "1–13. hafta", tone: "bg-blush", items: pregnancyHub.t1 },
  { id: "trimester-2", title: "2. Trimester", weeks: "14–27. hafta", tone: "bg-peach", items: pregnancyHub.t2 },
  { id: "trimester-3", title: "3. Trimester", weeks: "28–40. hafta", tone: "bg-sage", items: pregnancyHub.t3 },
];

export default function PregnancyPage() {
  const related = articles.filter((article) => article.category === "Gebelik");
  const threads = forumPosts.filter((post) => post.category === "gebelik-deneyimleri" && !post.pinned).slice(0, 3);

  return (
    <>
      <HubHero
        eyebrow="Gebelik rehberi"
        title={
          <>
            Planlamadan 40. haftaya, <em>sakin bir yol haritası.</em>
          </>
        }
        description="Kronolojik, abartısız ve anlaşılır. Her haftanın notu, her trimesterin öne çıkan konuları ve aynı dönemden geçen kadınların deneyimleri."
      >
        <div className="flex flex-wrap gap-2">
          {[{ id: "oncesi", title: "Gebelik öncesi" }, ...trimesters].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 transition-colors hover:bg-white/20"
            >
              {item.title}
            </a>
          ))}
          <a href="#haftalar" className="rounded-full bg-peach px-4 py-2 text-sm font-medium text-plum">
            Hafta hafta
          </a>
        </div>
      </HubHero>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <section id="oncesi" className="grid scroll-mt-40 gap-8 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grain relative overflow-hidden rounded-[2rem] bg-butter p-8">
            <Sprout className="relative z-10 size-8 text-plum" />
            <h2 className="font-heading relative z-10 mt-6 text-4xl text-plum">Gebelik öncesi</h2>
            <p className="relative z-10 mt-3 text-plum/75">
              Bebek planlıyorsan ilk adım bir hekim görüşmesi. Kullandığın ilaçları, aşılarını
              ve sorularını yanına al.
            </p>
            <Link
              href="/forum/bebek-planlayanlar"
              className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-medium text-plum hover:underline"
            >
              Bebek planlayanlar forumu <ArrowRight className="size-4" />
            </Link>
          </div>
          <TopicGrid items={pregnancyHub.oncesi} className="lg:grid-cols-2" />
        </section>

        <section className="pb-20">
          <SectionHeading eyebrow="Üç dönem" title={<>Trimester trimester <em>neler konuşulur?</em></>} />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {trimesters.map((trimester, index) => (
              <div
                key={trimester.id}
                id={trimester.id}
                className={cn("grain relative scroll-mt-40 overflow-hidden rounded-[2rem] p-7", trimester.tone)}
              >
                <span className="font-heading absolute -top-6 -right-2 z-0 text-[8rem] leading-none text-plum/10">
                  {index + 1}
                </span>
                <p className="relative z-10 text-xs font-medium tracking-[0.14em] text-plum/60 uppercase">
                  {trimester.weeks}
                </p>
                <h3 className="font-heading relative z-10 mt-2 text-3xl text-plum">{trimester.title}</h3>
                <ul className="relative z-10 mt-6 space-y-1">
                  {trimester.items.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between rounded-xl bg-white/60 px-4 py-2.5 text-sm text-plum transition-colors hover:bg-white"
                      >
                        {item.title}
                        <ArrowRight className="size-3.5 opacity-40" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mesh-cream py-20">
        <div className="mx-auto max-w-7xl scroll-mt-40 px-4 lg:px-8">
          <PregnancyTimeline />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <section className="py-20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading eyebrow="Forumdan" title={<>Hamile kadınlar <em>ne konuşuyor?</em></>} />
            <Link href="/forum/gebelik-deneyimleri" className="text-sm font-medium text-rose hover:underline">
              Tüm gebelik konuları
            </Link>
          </div>
          <div className="mt-8 space-y-3">
            {threads.map((post) => (
              <ForumThreadRow key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="pb-16">
          <SectionHeading eyebrow="Okuma listesi" title="Gebelik yazıları" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}
