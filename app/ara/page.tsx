import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/decor";
import { SearchBar } from "@/components/search-bar";
import { kindLabels, searchContent } from "@/lib/search";

export const metadata = {
  title: "Konu ara",
};

const kindTone: Record<string, string> = {
  article: "bg-blush",
  qa: "bg-peach",
  faq: "bg-butter",
  forum: "bg-sage",
  topic: "bg-sky",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchContent(q);

  return (
    <>
      <PageHero
        eyebrow="Konu ara"
        title={
          <>
            Ne merak ediyorsan, <em>buradan başla.</em>
          </>
        }
        description="Yazılar, sorular, forum konuları ve rehberler aynı aramada toplanır."
      >
        <div className="max-w-2xl">
          <SearchBar large defaultValue={q} />
        </div>
      </PageHero>

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <p className="text-sm text-muted-foreground">
          {q ? (
            <>
              “<span className="font-medium text-plum">{q}</span>” için {results.length} sonuç
            </>
          ) : (
            "Aramaya bir konu yazarak başlayın."
          )}
        </p>
        <ul className="mt-6 space-y-3">
          {results.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group flex items-start justify-between gap-4 rounded-3xl border border-border/70 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`rounded-full px-2.5 py-0.5 font-medium text-plum ${kindTone[item.kind] ?? "bg-muted"}`}>
                      {kindLabels[item.kind]}
                    </span>
                    <span className="text-muted-foreground">{item.category}</span>
                  </div>
                  <h2 className="font-heading mt-2 text-xl text-plum group-hover:text-rose">{item.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-plum/25 transition-all group-hover:rotate-45 group-hover:text-rose" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
