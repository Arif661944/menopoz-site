import { ArticleCard } from "@/components/article-card";
import { HubHero, SectionHeading, TopicGrid } from "@/components/decor";
import { MedicalDisclaimer } from "@/components/notices";
import { SymptomExplorer } from "@/components/symptom-explorer";
import { articles } from "@/lib/content";
import { menopauseCategories } from "@/lib/content/hubs";

export const metadata = {
  title: "Menopoz",
  description: "Menopozu anlamak, vücudunuzu anlamakla başlar.",
};

export default function MenopausePage() {
  const related = articles.filter(
    (article) => article.category === "Menopoz" || article.category === "Cinsel Sağlık",
  );

  return (
    <>
      <HubHero
        eyebrow="Diğer dönemler"
        title={
          <>
            Menopozu anlamak, <em>vücudunu anlamakla başlar.</em>
          </>
        }
        description="Perimenopozdan sonraki yıllara kadar belirtiler, yaşam ve tedavi seçenekleri üzerine sakin bir kaynak."
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <section className="py-20">
          <SectionHeading eyebrow="Konular" title="Menopoz rehberi" />
          <TopicGrid items={menopauseCategories} className="mt-10 lg:grid-cols-4" />
        </section>

        <section id="belirtiler" className="scroll-mt-40 pb-20">
          <SymptomExplorer />
        </section>

        <section id="sonrasi" className="grain relative mb-20 overflow-hidden rounded-[2rem] bg-sky p-8 md:p-12">
          <h2 className="font-heading relative z-10 text-3xl text-plum md:text-4xl">Menopoz sonrası</h2>
          <p className="relative z-10 mt-3 max-w-2xl leading-relaxed text-plum/75">
            Kemik, kalp-damar, tarama ve günlük bakım uzun vadede öne çıkar. Belirtiler azalmış
            olsa da koruyucu sağlık devam eder.
          </p>
        </section>

        <section className="pb-16">
          <SectionHeading eyebrow="Okuma listesi" title="Menopoz yazıları" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 6).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}
