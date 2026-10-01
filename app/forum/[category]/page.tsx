import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PenLine } from "lucide-react";
import { CategoryIcon, ForumThreadRow } from "@/components/forum-bits";
import { ForumComposer } from "@/components/forum-composer";
import { CommunityNotice } from "@/components/notices";
import { forumCategories, forumPosts, getForumCategory, lastActivity } from "@/lib/content";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return forumCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = getForumCategory(category);
  return { title: meta ? `${meta.title} · Forum` : "Forum", description: meta?.description };
}

export default async function ForumCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = getForumCategory(category);
  if (!meta) notFound();

  const posts = forumPosts
    .filter((post) => post.category === meta.slug)
    .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || lastActivity(b).localeCompare(lastActivity(a)));
  const replyCount = posts.reduce((sum, post) => sum + post.replies.length, 0);

  return (
    <>
      <section className={cn("grain relative overflow-hidden", meta.tone)}>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
          <Link href="/forum" className="inline-flex items-center gap-1.5 text-sm font-medium text-plum/70 hover:text-plum">
            <ArrowLeft className="size-4" /> Forum
          </Link>
          <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="flex items-start gap-5">
              <CategoryIcon category={meta} className="size-16 rounded-3xl bg-white/70 [&_svg]:size-7" />
              <div>
                <h1 className="font-heading text-4xl leading-tight text-plum md:text-6xl">{meta.title}</h1>
                <p className="mt-3 max-w-xl text-plum/75">{meta.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-plum">
              <div>
                <p className="font-heading text-4xl">{posts.length}</p>
                <p className="text-xs text-plum/60">konu</p>
              </div>
              <div>
                <p className="font-heading text-4xl">{replyCount}</p>
                <p className="text-xs text-plum/60">yanıt</p>
              </div>
              <a
                href="#yeni-konu"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-plum px-6 text-sm font-medium text-white"
              >
                <PenLine className="size-4" /> Konu aç
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1fr_280px] lg:px-8">
        <div className="space-y-3">
          {posts.map((post) => (
            <ForumThreadRow key={post.slug} post={post} />
          ))}
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-10 text-center">
              <p className="font-heading text-xl text-plum">Bu kategoride henüz konu yok.</p>
              <a href="#yeni-konu" className="mt-2 inline-block text-sm text-rose hover:underline">
                İlk konuyu sen aç
              </a>
            </div>
          ) : null}
        </div>
        <aside className="space-y-3 lg:sticky lg:top-40 lg:self-start">
          <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Diğer kategoriler</p>
          {forumCategories
            .filter((item) => item.slug !== meta.slug)
            .map((item) => (
              <Link
                key={item.slug}
                href={`/forum/${item.slug}`}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white p-3 text-sm font-medium text-plum transition-colors hover:bg-blush"
              >
                <CategoryIcon category={item} className="size-9 rounded-xl" />
                {item.title}
              </Link>
            ))}
          <div className="pt-3">
            <CommunityNotice />
          </div>
        </aside>
      </div>

      <section id="yeni-konu" className="mx-auto max-w-4xl scroll-mt-32 px-4 lg:px-8">
        <ForumComposer defaultCategory={meta.slug} />
      </section>
    </>
  );
}
