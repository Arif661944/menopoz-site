import Link from "next/link";
import { ArrowRight, Hash, PenLine, ShieldCheck } from "lucide-react";
import { Orbit } from "@/components/decor";
import { CategoryIcon, ForumThreadRow } from "@/components/forum-bits";
import { ForumComposer } from "@/components/forum-composer";
import { COMMUNITY_DISCLAIMER } from "@/lib/brand";
import { forumCategories, forumPosts, lastActivity } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Kadınlar Arasında Forumu",
  description: "Kadınların gebelik, lohusalık, kadın sağlığı ve menopozda deneyim paylaştığı güvenli ve moderasyonlu forum.",
};

const sorts = [
  { value: "yeni", label: "Son hareket" },
  { value: "yanitsiz", label: "Yanıt bekleyenler" },
  { value: "populer", label: "En çok yanıtlanan" },
] as const;

const rules = [
  "Deneyimini paylaş; başkasına tanı koyma.",
  "İlaç, doz veya tedavi önerisi yazma.",
  "Telefon, adres gibi kişisel bilgi paylaşma.",
  "Nazik ol: her yolculuk farklıdır.",
];

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ sirala?: string; etiket?: string }>;
}) {
  const { sirala = "yeni", etiket } = await searchParams;

  const pinned = forumPosts.filter((post) => post.pinned);
  let threads = forumPosts.filter((post) => !post.pinned);
  if (etiket) threads = threads.filter((post) => post.tags.includes(etiket));
  if (sirala === "yanitsiz") threads = threads.filter((post) => post.replies.length === 0);
  threads.sort((a, b) =>
    sirala === "populer"
      ? b.replies.length - a.replies.length
      : lastActivity(b).localeCompare(lastActivity(a)),
  );

  const tagCounts = new Map<string, number>();
  for (const post of forumPosts) {
    for (const tag of post.tags) tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  }
  const tags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]);
  const totalReplies = forumPosts.reduce((sum, post) => sum + post.replies.length, 0);
  const unanswered = forumPosts.filter((post) => post.replies.length === 0).length;

  const hrefWith = (next: { sirala?: string; etiket?: string }) => {
    const params = new URLSearchParams();
    const merged = { sirala, etiket, ...next };
    if (merged.sirala && merged.sirala !== "yeni") params.set("sirala", merged.sirala);
    if (merged.etiket) params.set("etiket", merged.etiket);
    const query = params.toString();
    return query ? `/forum?${query}#konular` : "/forum#konular";
  };

  return (
    <>
      <section className="grain mesh-plum relative overflow-hidden text-white">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase ring-1 ring-white/15">
              <ShieldCheck className="size-3.5 text-sage" /> Moderasyonlu topluluk
            </span>
            <h1 className="font-heading mt-6 text-5xl leading-[1] text-balance md:text-7xl">
              Anneler <em className="text-peach">arası.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Bebek planlarken, hamileyken ya da kucağında bebeğinle; deneyimini paylaş, sorunu
              sor, dilersen anonim kal.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#yeni-konu"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-plum transition-transform hover:-translate-y-0.5"
              >
                <PenLine className="size-4" /> Yeni konu aç
              </a>
              <Link
                href="/topluluk-kurallari"
                className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-sm font-medium hover:bg-white/10"
              >
                Topluluk kuralları
              </Link>
            </div>
            <dl className="mt-10 flex flex-wrap gap-8">
              {[
                { value: forumPosts.length, label: "konu" },
                { value: totalReplies, label: "yanıt" },
                { value: forumCategories.length, label: "kategori" },
                { value: unanswered, label: "yanıt bekliyor" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dd className="font-heading text-4xl text-peach">{stat.value}</dd>
                  <dt className="text-xs tracking-wide text-white/55">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <Orbit className="mx-auto hidden w-full max-w-xs text-white lg:block" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative z-20 -mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {forumCategories.map((category) => {
            const count = forumPosts.filter((post) => post.category === category.slug).length;
            return (
              <Link
                key={category.slug}
                href={`/forum/${category.slug}`}
                className="group flex flex-col rounded-3xl border border-border/70 bg-white p-5 shadow-soft transition-all hover:-translate-y-1"
              >
                <CategoryIcon category={category} />
                <h2 className="font-heading mt-4 text-lg leading-tight text-plum group-hover:text-rose">
                  {category.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
                <p className="mt-auto pt-3 text-xs font-medium text-plum/60">{count} konu</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="konular" className="mx-auto grid max-w-7xl scroll-mt-40 gap-10 px-4 py-16 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-heading text-3xl text-plum">
              {etiket ? (
                <>
                  <span className="text-rose">#</span>
                  {etiket}
                </>
              ) : (
                "Konular"
              )}
            </h2>
            <div className="flex gap-1 rounded-full border border-border bg-white p-1">
              {sorts.map((sort) => (
                <Link
                  key={sort.value}
                  href={hrefWith({ sirala: sort.value })}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    sirala === sort.value ? "bg-plum text-white" : "text-plum/70 hover:bg-blush",
                  )}
                >
                  {sort.label}
                </Link>
              ))}
            </div>
          </div>
          {etiket ? (
            <Link href={hrefWith({ etiket: "" })} className="mt-3 inline-block text-sm text-rose hover:underline">
              Etiket filtresini kaldır
            </Link>
          ) : null}

          <div className="mt-6 space-y-3">
            {sirala === "yeni" && !etiket
              ? pinned.map((post) => <ForumThreadRow key={post.slug} post={post} />)
              : null}
            {threads.map((post) => (
              <ForumThreadRow key={post.slug} post={post} />
            ))}
            {threads.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border p-10 text-center">
                <p className="font-heading text-xl text-plum">Bu filtrede konu yok.</p>
                <a href="#yeni-konu" className="mt-2 inline-block text-sm text-rose hover:underline">
                  İlk konuyu sen aç
                </a>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-40 lg:self-start">
          <div className="grain relative overflow-hidden rounded-[2rem] bg-plum p-6 text-white">
            <p className="relative z-10 text-xs font-medium tracking-[0.18em] text-peach uppercase">Kısaca kurallar</p>
            <ol className="relative z-10 mt-4 space-y-3 text-sm">
              {rules.map((rule, index) => (
                <li key={rule} className="flex gap-3">
                  <span className="font-heading text-peach">{index + 1}</span>
                  <span className="text-white/80">{rule}</span>
                </li>
              ))}
            </ol>
            <Link
              href="/topluluk-kurallari"
              className="relative z-10 mt-5 inline-flex items-center gap-1 text-sm font-medium text-peach hover:underline"
            >
              Tamamını oku <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-white p-6">
            <p className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-rose uppercase">
              <Hash className="size-3.5" /> Etiketler
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map(([tag, count]) => (
                <Link
                  key={tag}
                  href={hrefWith({ etiket: tag })}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs transition-colors",
                    etiket === tag ? "bg-rose text-white" : "bg-blush text-plum hover:bg-peach",
                  )}
                >
                  #{tag} <span className="opacity-60">{count}</span>
                </Link>
              ))}
            </div>
          </div>

          <p className="rounded-[2rem] bg-butter p-6 text-sm leading-relaxed text-plum/80">
            {COMMUNITY_DISCLAIMER} Acil bir durumda 112’yi arayın.
          </p>
        </aside>
      </section>

      <section id="yeni-konu" className="mx-auto max-w-4xl scroll-mt-32 px-4 lg:px-8">
        <ForumComposer />
      </section>
    </>
  );
}
