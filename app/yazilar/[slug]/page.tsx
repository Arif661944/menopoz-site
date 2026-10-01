import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { MedicalReviewPanel } from "@/components/medical-review-panel";
import { MedicalDisclaimer } from "@/components/notices";
import { articles, getArticle, relatedArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Yazı bulunamadı" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = relatedArticles(article.relatedSlugs);
  const [lead, ...rest] = article.body;

  return (
    <article>
      <header className="grain mesh-cream relative overflow-hidden border-b border-border/60">
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-14 lg:px-8 lg:py-20">
          <Link
            href={`/yazilar?kategori=${encodeURIComponent(article.category)}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-plum/70 hover:text-plum"
          >
            <ArrowLeft className="size-4" /> {article.category}
          </Link>
          <h1 className="font-heading mt-6 text-4xl leading-[1.08] text-balance text-plum md:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-plum/70">{article.excerpt}</p>
          <p className="mt-6 flex flex-wrap items-center gap-4 text-sm text-plum/60">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" /> {article.readingMinutes} dk okuma
            </span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>{article.author}</span>
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 lg:grid-cols-[1fr_300px] lg:px-8">
        <div className="min-w-0">
          {lead ? (
            <p className="font-heading text-2xl leading-relaxed text-plum first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-rose">
              {lead}
            </p>
          ) : null}
          <div className="mt-8 space-y-6 text-lg leading-8 text-plum/85">
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <section className="mt-14 rounded-[2rem] bg-cream p-6 ring-1 ring-border md:p-8">
            <h2 className="font-heading text-2xl text-plum">Kaynaklar</h2>
            <ol className="mt-5 space-y-3 text-sm">
              {article.references.map((reference, index) => (
                <li key={`${reference.title}-${index}`} className="flex gap-4 rounded-2xl bg-white p-4">
                  <span className="font-heading text-rose">{index + 1}</span>
                  <span>
                    {reference.url ? (
                      <a href={reference.url} className="font-medium text-plum underline-offset-4 hover:underline" rel="noreferrer">
                        {reference.title}
                      </a>
                    ) : (
                      <span className="font-medium text-plum">{reference.title}</span>
                    )}
                    <span className="block text-muted-foreground">
                      {reference.source}
                      {reference.year ? `, ${reference.year}` : ""}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-40 lg:self-start">
          <MedicalReviewPanel article={article} />
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/ara?q=${encodeURIComponent(tag)}`}
                className="rounded-full bg-blush px-3 py-1 text-xs text-plum hover:bg-peach"
              >
                #{tag}
              </Link>
            ))}
          </div>
          <MedicalDisclaimer compact />
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pb-8 lg:px-8">
          <h2 className="font-heading text-3xl text-plum">İlgili yazılar</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.slice(0, 3).map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
