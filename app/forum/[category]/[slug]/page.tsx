import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Pin } from "lucide-react";
import { ForumThreadRow, InitialsAvatar } from "@/components/forum-bits";
import { ForumComposer } from "@/components/forum-composer";
import { CommunityNotice } from "@/components/notices";
import { ReportDialog } from "@/components/report-dialog";
import { forumPosts, getForumCategory, getForumPost } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return forumPosts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getForumPost(slug);
  return { title: post?.title ?? "Forum" };
}

export default async function ForumPostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = getForumPost(slug);
  if (!post || post.category !== category) notFound();
  const meta = getForumCategory(category);

  const related = forumPosts
    .filter((item) => item.slug !== post.slug && !item.pinned)
    .map((item) => ({
      item,
      score:
        (item.category === post.category ? 2 : 0) +
        item.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item);

  const authorName = post.anonymous ? "Anonim üye" : post.author;

  return (
    <>
      <section className={cn("grain relative overflow-hidden", meta?.tone ?? "bg-blush")}>
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
          <Link
            href={`/forum/${category}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-plum/70 hover:text-plum"
          >
            <ArrowLeft className="size-4" /> {meta?.title ?? "Forum"}
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            {post.pinned ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose px-2.5 py-1 font-medium text-white">
                <Pin className="size-3" /> Sabit konu
              </span>
            ) : null}
            {post.stage ? (
              <span className="rounded-full bg-white/70 px-2.5 py-1 font-medium text-rose">{post.stage}</span>
            ) : null}
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/forum?etiket=${encodeURIComponent(tag)}#konular`}
                className="rounded-full bg-white/50 px-2.5 py-1 text-plum hover:bg-white"
              >
                #{tag}
              </Link>
            ))}
          </div>
          <h1 className="font-heading mt-5 text-4xl leading-[1.08] text-balance text-plum md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-plum/70">
            <InitialsAvatar name={post.author} anonymous={post.anonymous} />
            <span>
              <span className="block font-medium text-plum">{authorName}</span>
              {formatDate(post.createdAt)} · {post.replies.length} yanıt
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <article className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft md:p-10">
          <p className="text-lg leading-relaxed text-plum md:text-xl">{post.body}</p>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">Paylaşım: {authorName}</span>
            <ReportDialog target={post.title} />
          </div>
        </article>

        <div className="mt-6">
          <CommunityNotice />
        </div>

        <section className="mt-12" aria-labelledby="yanitlar">
          <h2 id="yanitlar" className="font-heading flex items-center gap-3 text-3xl text-plum">
            <MessageCircle className="size-6 text-rose" />
            {post.replies.length > 0 ? `${post.replies.length} yanıt` : "Henüz yanıt yok"}
          </h2>
          {post.replies.length === 0 ? (
            <p className="mt-3 text-muted-foreground">Bu sohbete ilk katılan sen ol.</p>
          ) : (
            <ol className="relative mt-8 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-border">
              {post.replies.map((reply, index) => (
                <li key={`${reply.createdAt}-${index}`} className="relative flex gap-4">
                  <InitialsAvatar name={reply.author} anonymous={reply.anonymous} className="relative z-10" />
                  <div className="min-w-0 flex-1 rounded-3xl rounded-tl-md border border-border/70 bg-white p-5">
                    <p className="text-sm">
                      <span className="font-medium text-plum">{reply.anonymous ? "Anonim üye" : reply.author}</span>
                      <span className="text-muted-foreground"> · {formatDate(reply.createdAt)}</span>
                    </p>
                    <p className="mt-2 leading-relaxed text-plum/90">{reply.body}</p>
                    <div className="mt-3 flex justify-end">
                      <ReportDialog target={`${post.title} yanıtı`} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>

        <div className="mt-12">
          <ForumComposer mode="reply" />
        </div>

        {related.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-heading text-2xl text-plum">Benzer konular</h2>
            <div className="mt-5 space-y-3">
              {related.map((item) => (
                <ForumThreadRow key={item.slug} post={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
