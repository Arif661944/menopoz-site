import { articles } from "./articles";
import { forumCategories, forumPosts } from "./forum";
import { questions } from "./questions";
import { topics } from "./topics";
import type { Article, ForumCategoryMeta, ForumPost, Question, SearchItem } from "./types";

export { articles } from "./articles";
export { forumCategories, forumPosts, lastActivity } from "./forum";
export { questions } from "./questions";
export { topics } from "./topics";

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getQuestion(slug: string): Question | undefined {
  return questions.find((question) => question.slug === slug);
}

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}

export function getForumCategory(slug: string): ForumCategoryMeta | undefined {
  return forumCategories.find((category) => category.slug === slug);
}

export function relatedArticles(slugs: string[]): Article[] {
  return slugs
    .map((slug) => getArticle(slug))
    .filter((article): article is Article => Boolean(article));
}

export function featuredArticles(): Article[] {
  return articles.filter((article) => article.featured);
}

export function trendingQuestions(): Question[] {
  return questions.slice(0, 5);
}

export function buildSearchIndex(): SearchItem[] {
  const articleItems: SearchItem[] = articles.map((article) => ({
    id: `article:${article.slug}`,
    kind: "article",
    title: article.title,
    excerpt: article.excerpt,
    href: `/yazilar/${article.slug}`,
    category: article.category,
    keywords: [...article.tags, article.category, article.title],
  }));

  const qaItems: SearchItem[] = questions.map((question) => ({
    id: `qa:${question.slug}`,
    kind: "qa",
    title: question.title,
    excerpt: question.body,
    href: `/soru-cevap/${question.slug}`,
    category: question.category,
    keywords: [question.category, question.title, question.body],
  }));

  const faqItems: SearchItem[] = questions.map((question) => ({
    id: `faq:${question.slug}`,
    kind: "faq",
    title: question.title,
    excerpt: question.answer.slice(0, 180),
    href: `/soru-cevap/${question.slug}`,
    category: question.category,
    keywords: [question.category, "sss", "sık sorulan"],
  }));

  const forumItems: SearchItem[] = forumPosts.map((post) => ({
    id: `forum:${post.slug}`,
    kind: "forum",
    title: post.title,
    excerpt: post.body,
    href: `/forum/${post.category}/${post.slug}`,
    category: getForumCategory(post.category)?.title ?? "Forum",
    keywords: [...post.tags, post.title, post.body],
  }));

  const topicItems: SearchItem[] = topics.map((topic) => ({
    id: `topic:${topic.slug}`,
    kind: "topic",
    title: topic.title,
    excerpt: topic.description,
    href: topic.href,
    category: topic.stage,
    keywords: topic.keywords,
  }));

  return [...articleItems, ...qaItems, ...faqItems, ...forumItems, ...topicItems];
}
