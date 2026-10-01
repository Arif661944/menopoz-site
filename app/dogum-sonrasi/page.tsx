import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { HubHero, SectionHeading, TopicGrid } from "@/components/decor";
import { ForumThreadRow } from "@/components/forum-bits";
import { EmergencyCard, MedicalDisclaimer } from "@/components/notices";
import { articles, forumPosts } from "@/lib/content";
import { postpartumTopics } from "@/lib/content/hubs";

export const metadata = {
  title: "Lohusalık ve Doğum Sonrası",
  description: "Lohusalık, emzirme, doğum sonrası kanama ve ruhsal değişimler.",
};

const firstWeeks = [
  { label: "İlk günler", text: "Kanama, ağrı ve dinlenme. Destek iste, ziyaretleri sınırla." },
  { label: "1–2. hafta", text: "Emzirme düzeni oturmaya başlar. Duygu dalgalanmaları sık görülür." },
  { label: "3–6. hafta", text: "Beden toparlanır. İki haftayı aşan keyifsizliği hekimine söyle." },
  { label: "6. hafta+", text: "Doğum sonrası kontrol, pelvik sağlık ve kendine dönüş." },
];

export default function PostpartumPage() {
  const related = articles.filter((article) => article.category === "Doğum Sonrası");
  const threads = forumPosts.filter((post) => post.category === "lohusalik-emzirme");

  return (
    <>
      <HubHero
        eyebrow="Lohusalık"
        title={
          <>
            Bebek kucağında; <em>sen de yeniden doğuyorsun.</em>
          </>
        }
        description="Lohusalık yalnızca bebek bakımı değildir. Beden, uyku, süt ve ruh hali birlikte toparlanır."
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <section className="py-20">
          <SectionHeading eyebrow="İlk haftalar" title={<>Adım adım <em>toparlanma</em></>} />
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {firstWeeks.map((item, index) => (
              <li key={item.label} className="relative rounded-[2rem] border border-border/70 bg-white p-6">
                <span className="font-heading flex size-10 items-center justify-center rounded-full bg-sage text-plum">
                  {index + 1}
                </span>
                <p className="font-heading mt-5 text-2xl text-plum">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">
            Genel bir çerçevedir; her doğum sonrası süreç farklı ilerler.
          </p>
        </section>

        <section className="pb-20">
          <SectionHeading eyebrow="Konular" title="Lohusalıkta merak edilenler" />
          <TopicGrid items={postpartumTopics} className="mt-10" />
        </section>

        <section className="pb-20">
          <EmergencyCard />
        </section>

        <section className="pb-20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading eyebrow="Forumdan" title={<>Yeni anneler <em>konuşuyor</em></>} />
            <Link href="/forum/lohusalik-emzirme" className="text-sm font-medium text-rose hover:underline">
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
          <SectionHeading eyebrow="Okuma listesi" title="Doğum sonrası yazıları" />
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
