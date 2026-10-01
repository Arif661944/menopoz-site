import { ArticleCard } from "@/components/article-card";
import { FilterPills, PageHero } from "@/components/decor";
import { articles } from "@/lib/content";
import type { ArticleCategory } from "@/lib/content/types";

const categories: Array<ArticleCategory | "Tümü"> = [
  "Tümü",
  "Gebelik",
  "Doğum",
  "Doğum Sonrası",
  "Adet Döngüsü",
  "Jinekoloji",
  "Hormonal Sağlık",
  "Cinsel Sağlık",
  "Koruyucu Sağlık",
  "Menopoz",
];

export const metadata = {
  title: "Yazılar",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const filtered = kategori ? articles.filter((article) => article.category === kategori) : articles;

  return (
    <>
      <PageHero
        eyebrow="Bilgi bankası"
        title={
          <>
            Okuması kolay, <em>kaynağı belli</em> yazılar.
          </>
        }
        description="Okuma süresi, kategori ve kaynaklarla editöryel bilgi bankası."
        aside={
          <p className="font-heading text-7xl text-plum/15 md:text-9xl" aria-hidden>
            {filtered.length}
          </p>
        }
      />
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <FilterPills
          items={categories.map((category) => ({
            label: category,
            href: category === "Tümü" ? "/yazilar" : `/yazilar?kategori=${encodeURIComponent(category)}`,
            active: category === "Tümü" ? !kategori : kategori === category,
          }))}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}
