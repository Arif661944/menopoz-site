import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { BirthChecklist } from "@/components/birth-checklist";
import { HubHero, SectionHeading, TopicGrid } from "@/components/decor";
import { ForumThreadRow } from "@/components/forum-bits";
import { MedicalDisclaimer } from "@/components/notices";
import { articles, forumPosts } from "@/lib/content";
import { birthTopics } from "@/lib/content/hubs";

export const metadata = {
  title: "Doğuma Hazırlık",
  description: "Doğum belirtileri, doğum yöntemleri, doğum planı ve hastane çantası.",
};

export default function BirthPage() {
  const related = articles.filter((article) => article.category === "Doğum");
  const threads = forumPosts.filter((post) => post.category === "doguma-hazirlik");

  return (
    <>
      <HubHero
        eyebrow="Doğuma hazırlık"
        title={
          <>
            Tek doğru doğum yok; <em>güvenlik ve net bilgi var.</em>
          </>
        }
        description="Belirtiler, yöntemler, korku ve pratik hazırlık. Son haftalarda aklına takılanlar için sakin bir rehber."
      >
        <a
          href="#hazirlik"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-plum"
        >
          Hazırlık listesine git <ArrowRight className="size-4" />
        </a>
      </HubHero>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <section className="py-20">
          <SectionHeading eyebrow="Konular" title={<>Doğum hakkında <em>merak edilenler</em></>} />
          <TopicGrid items={birthTopics} className="mt-10" />
        </section>

        <section id="hazirlik" className="scroll-mt-40 pb-20">
          <BirthChecklist />
        </section>

        <section className="pb-20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading eyebrow="Forumdan" title={<>Doğuma hazırlananlar <em>konuşuyor</em></>} />
            <Link href="/forum/doguma-hazirlik" className="text-sm font-medium text-rose hover:underline">
              Tüm konular
            </Link>
          </div>
          <div className="mt-8 space-y-3">
            {threads.map((post) => (
              <ForumThreadRow key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="pb-16">
          <SectionHeading eyebrow="Okuma listesi" title="Doğum yazıları" />
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
