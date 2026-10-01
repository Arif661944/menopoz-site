import { buildSearchIndex } from "./content";
import type { ContentKind, SearchItem } from "./content/types";

const KIND_WEIGHT: Record<ContentKind, number> = {
  topic: 5,
  article: 4,
  faq: 3,
  qa: 3,
  forum: 2,
};

function fold(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("İ", "i")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value: string): string[] {
  return fold(value)
    .split(" ")
    .filter((token) => token.length > 1);
}

export function searchContent(query: string, limit = 24): SearchItem[] {
  const needle = fold(query);
  if (!needle) return [];

  const queryTokens = tokens(query);
  const index = buildSearchIndex();

  return index
    .map((item) => {
      const haystack = fold(
        [item.title, item.excerpt, item.category, ...item.keywords].join(" "),
      );
      let score = 0;

      if (haystack.includes(needle)) score += 12;
      if (fold(item.title).includes(needle)) score += 10;

      for (const token of queryTokens) {
        if (fold(item.title).includes(token)) score += 6;
        if (haystack.includes(token)) score += 2;
      }

      if (score === 0) return null;
      return { item, score: score + KIND_WEIGHT[item.kind] };
    })
    .filter((entry): entry is { item: SearchItem; score: number } => Boolean(entry))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export const kindLabels: Record<ContentKind, string> = {
  article: "Yazı",
  faq: "Sık sorulan",
  qa: "Soru & Cevap",
  forum: "Forum",
  topic: "Konu",
};
