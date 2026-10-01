export type LifeStage =
  | "gebelik"
  | "dogum"
  | "dogum-sonrasi"
  | "perimenopoz"
  | "menopoz"
  | "menopoz-sonrasi"
  | "kadin-sagligi";

export type ArticleCategory =
  | "Menopoz"
  | "Gebelik"
  | "Doğum"
  | "Doğum Sonrası"
  | "Adet Döngüsü"
  | "Hormonal Sağlık"
  | "Jinekoloji"
  | "Cinsel Sağlık"
  | "Koruyucu Sağlık";

export type QuestionCategory =
  | "Gebelik"
  | "Doğum"
  | "Doğum Sonrası"
  | "Menopoz"
  | "Jinekoloji"
  | "Hormonal Sağlık";

export type ForumCategory =
  | "bebek-planlayanlar"
  | "gebelik-deneyimleri"
  | "doguma-hazirlik"
  | "lohusalik-emzirme"
  | "anne-sagligi"
  | "menopoz"
  | "gunluk-yasam";

export type ForumCategoryMeta = {
  slug: ForumCategory;
  title: string;
  description: string;
  tone: string;
  icon: "sprout" | "baby" | "bag" | "heart" | "flower" | "sun" | "coffee";
};

export type ContentKind = "article" | "faq" | "qa" | "forum" | "topic";

export type ReviewStatus = "editorial" | "reviewed";

export type Reference = {
  title: string;
  source: string;
  url?: string;
  year?: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  tags: string[];
  relatedSlugs: string[];
  readingMinutes: number;
  publishedAt: string;
  lastReviewedAt?: string;
  author: string;
  medicalReviewer?: string;
  reviewStatus: ReviewStatus;
  body: string[];
  references: Reference[];
  featured?: boolean;
};

export type Question = {
  slug: string;
  title: string;
  body: string;
  category: QuestionCategory;
  askedAt: string;
  askedBy: string;
  anonymous: boolean;
  answer: string;
  answeringProfessional: string;
  isExpertAnswer: boolean;
  relatedArticleSlugs: string[];
};

export type ForumPost = {
  slug: string;
  category: ForumCategory;
  title: string;
  body: string;
  author: string;
  anonymous: boolean;
  createdAt: string;
  tags: string[];
  stage?: string;
  pinned?: boolean;
  replies: {
    author: string;
    anonymous: boolean;
    body: string;
    createdAt: string;
  }[];
};

export type Topic = {
  slug: string;
  title: string;
  description: string;
  href: string;
  stage: LifeStage;
  keywords: string[];
};

export type SearchItem = {
  id: string;
  kind: ContentKind;
  title: string;
  excerpt: string;
  href: string;
  category: string;
  keywords: string[];
};
