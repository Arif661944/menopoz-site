import Link from "next/link";
import {
  Baby,
  Coffee,
  Flower2,
  HeartHandshake,
  Luggage,
  MessageCircle,
  Pin,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { getForumCategory, lastActivity } from "@/lib/content";
import type { ForumCategoryMeta, ForumPost } from "@/lib/content/types";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const forumIcons: Record<ForumCategoryMeta["icon"], LucideIcon> = {
  sprout: Sprout,
  baby: Baby,
  bag: Luggage,
  heart: HeartHandshake,
  flower: Flower2,
  coffee: Coffee,
};

const avatarTones = ["bg-blush", "bg-peach", "bg-sage", "bg-butter", "bg-sky"];

export function InitialsAvatar({
  name,
  anonymous,
  className,
}: {
  name: string;
  anonymous?: boolean;
  className?: string;
}) {
  const label = anonymous ? "?" : name.trim().charAt(0).toLocaleUpperCase("tr");
  const tone = anonymous
    ? "bg-plum text-white"
    : cn(avatarTones[name.length % avatarTones.length], "text-plum");

  return (
    <span
      className={cn(
        "font-heading inline-flex size-10 shrink-0 items-center justify-center rounded-full text-base ring-2 ring-white",
        tone,
        className,
      )}
      aria-hidden
    >
      {label}
    </span>
  );
}

export function CategoryIcon({
  category,
  className,
}: {
  category: ForumCategoryMeta;
  className?: string;
}) {
  const Icon = forumIcons[category.icon];
  return (
    <span
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-2xl text-plum",
        category.tone,
        className,
      )}
    >
      <Icon className="size-5" />
    </span>
  );
}

export function ForumThreadRow({
  post,
  tone = "light",
}: {
  post: ForumPost;
  tone?: "light" | "dark";
}) {
  const category = getForumCategory(post.category);
  const dark = tone === "dark";
  const repliers = post.replies.slice(0, 3);

  return (
    <Link
      href={`/forum/${post.category}/${post.slug}`}
      className={cn(
        "group grid gap-4 rounded-3xl p-5 transition-all md:grid-cols-[auto_1fr_auto] md:items-center md:p-6",
        dark
          ? "bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/[0.1]"
          : "border border-border/70 bg-white hover:-translate-y-0.5 hover:shadow-soft",
      )}
    >
      <InitialsAvatar name={post.author} anonymous={post.anonymous} className="size-12 text-lg" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {post.pinned ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose px-2 py-0.5 font-medium text-white">
              <Pin className="size-3" /> Sabit
            </span>
          ) : null}
          {category ? (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-medium",
                dark ? "bg-white/10 text-white/80" : cn(category.tone, "text-plum"),
              )}
            >
              {category.title}
            </span>
          ) : null}
          {post.stage ? (
            <span className={dark ? "text-peach" : "text-rose"}>{post.stage}</span>
          ) : null}
        </div>
        <h3
          className={cn(
            "font-heading mt-2 text-lg leading-snug text-balance md:text-xl",
            dark ? "text-white" : "text-plum group-hover:text-rose",
          )}
        >
          {post.title}
        </h3>
        <p className={cn("mt-1 line-clamp-1 text-sm", dark ? "text-white/60" : "text-muted-foreground")}>
          {post.anonymous ? "Anonim üye" : post.author} · {formatDate(post.createdAt)}
          {post.tags.length ? ` · #${post.tags.join(" #")}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-2">
        <div className="flex -space-x-2">
          {repliers.map((reply, index) => (
            <InitialsAvatar
              key={`${reply.author}-${index}`}
              name={reply.author}
              anonymous={reply.anonymous}
              className="size-7 text-xs"
            />
          ))}
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium",
            post.replies.length === 0 && !post.pinned
              ? dark
                ? "text-peach"
                : "text-rose"
              : dark
                ? "text-white/80"
                : "text-plum",
          )}
        >
          <MessageCircle className="size-4" />
          {post.pinned
            ? "Duyuru"
            : post.replies.length === 0
              ? "İlk yanıtı sen yaz"
              : `${post.replies.length} yanıt`}
        </span>
        <span className={cn("text-xs", dark ? "text-white/45" : "text-muted-foreground")}>
          Son hareket {formatDate(lastActivity(post))}
        </span>
      </div>
    </Link>
  );
}
