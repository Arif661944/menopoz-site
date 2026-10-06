import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  Calendar,
  Flower2,
  HeartHandshake,
  MessageCircle,
  MessageCirclePlus,
  ShieldCheck,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { CategoryIcon, ForumThreadRow, InitialsAvatar } from "@/components/forum-bits";
import { MedicalDisclaimer } from "@/components/notices";
import { SearchBar } from "@/components/search-bar";
import { TopicMarquee } from "@/components/topic-marquee";
import { DOCTOR_NAME, EDITORIAL_SUPPORT, PLATFORM_NAME } from "@/lib/brand";
import { forumCategories, forumPosts, lastActivity } from "@/lib/content";
import { instagramAccount, socialPosts } from "@/lib/content/social";
import { cn } from "@/lib/utils";

const threeBlocks = [
  {
    key: "gebelik",
    title: "Gebelik",
    eyebrow: "01 · Hafta Hafta",
    description: "Bebek planlama, 1–40. hafta takibi, trimester rehberleri ve doğuma hazırlık.",
    href: "/gebelik",
    tone: "bg-blush",
    icon: Baby,
    features: ["Hafta hafta gebelik takvimi", "1, 2 ve 3. Trimester rehberleri", "Doğuma hazırlık & çantası"],
    badge: "Bebek & Doğum",
  },
  {
    key: "kadin-sagligi",
    title: "Kadın Sağlığı",
    eyebrow: "02 · Yaşam Boyu",
    description: "Adet döngüsü, jinekolojik kontroller, hormonal denge ve koruyucu sağlık.",
    href: "/kadin-sagligi",
    tone: "bg-butter",
    icon: Flower2,
    features: ["Adet döngüsü & yumurtlama", "Jinekoloji & smear takibi", "Hormonal ve koruyucu sağlık"],
    badge: "Sağlık & Beden",
  },
  {
    key: "menopoz",
    title: "Menopoz",
    eyebrow: "03 · Yeni Evre",
    description: "Perimenopoz, sıcak basmaları, uyku düzeni, kemik sağlığı ve belirti rehberi.",
    href: "/menopoz",
    tone: "bg-peach",
    icon: SunMedium,
    features: ["Belirti kaşifi & sıcak basması", "Perimenopoz geçişi", "Menopoz sonrası bakım"],
    badge: "Olgunluk & Yaşam",
  },
];

export default function HomePage() {
  const threads = forumPosts
    .filter((post) => !post.pinned)
    .sort((a, b) => lastActivity(b).localeCompare(lastActivity(a)));
  const spotlight = threads.slice(0, 5);
  const totalReplies = forumPosts.reduce((sum, post) => sum + post.replies.length, 0);
  const unanswered = forumPosts.filter((post) => post.replies.length === 0).length;

  return (
    <>
      {/* 1. HERO & FORUM (Site açıldığı gibi forum görünür) */}
      <section className="grain mesh-plum relative overflow-hidden text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-16 lg:px-8 lg:pt-14 lg:pb-24">
          {/* Üst karşılama & arama */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium tracking-[0.18em] uppercase ring-1 ring-white/15">
                <span className="size-1.5 animate-pulse rounded-full bg-peach" />
                {PLATFORM_NAME} · Kadın Topluluğu
              </span>
              <h1 className="font-heading mt-4 text-4xl leading-[1.05] text-balance md:text-6xl">
                Sor, paylaş, dinle: <em className="text-peach">Kadınlar Arasında.</em>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
                Gebelikten menopoza, kadın sağlığının her anında deneyimlerini paylaşabileceğin;
                yargısız, güvenli ve moderasyonlu kadın topluluğu.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/forum#yeni-konu"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-rose px-6 text-sm font-medium text-white shadow-lg shadow-rose/30 transition-transform hover:-translate-y-0.5"
              >
                <MessageCirclePlus className="size-4" />
                Yeni Konu Aç
              </Link>
              <Link
                href="/forum"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Tüm Forum <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 max-w-2xl">
            <SearchBar large tone="dark" />
          </div>

          {/* Forum Kategorileri Şerit */}
          <div className="mt-8 flex flex-wrap gap-2">
            {forumCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/forum/${category.slug}`}
                className="flex shrink-0 items-center gap-2 rounded-full bg-white/[0.08] py-1.5 pr-4 pl-1.5 text-xs font-medium ring-1 ring-white/10 transition-colors hover:bg-white/15 md:text-sm"
              >
                <CategoryIcon category={category} className="size-7 rounded-full md:size-8" />
                {category.title}
              </Link>
            ))}
          </div>

          {/* Forum Canlı Akış & İstatistikler */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Konular Listesi */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 text-xs text-white/60">
                <span className="font-medium tracking-wider uppercase">Son Hareket Gören Konular</span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-sage" /> Moderasyonlu topluluk
                </span>
              </div>
              {spotlight.map((post) => (
                <ForumThreadRow key={post.slug} post={post} tone="dark" />
              ))}
            </div>

            {/* Yan Bilgi Kartı */}
            <aside className="space-y-4">
              <div className="rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10">
                <p className="text-xs font-medium tracking-[0.16em] text-peach uppercase">Topluluk Durumu</p>
                <dl className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { value: forumPosts.length, label: "Konu" },
                    { value: totalReplies, label: "Yanıt" },
                    { value: unanswered, label: "Bekleyen" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-white/[0.05] p-3 text-center">
                      <dt className="text-[11px] text-white/55">{stat.label}</dt>
                      <dd className="font-heading mt-1 text-2xl text-peach">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-white/65">
                  Deneyimini anonim olarak paylaşabilirsin. Forum tıbbi teşhis ve reçete yerine geçmez.
                </p>
              </div>

              <div className="rounded-3xl bg-plum-soft/80 p-6 ring-1 ring-white/15">
                <div className="flex items-center gap-2 text-peach">
                  <Sparkles className="size-4" />
                  <span className="text-xs font-medium tracking-wider uppercase">Bilgi Bankası</span>
                </div>
                <h3 className="font-heading mt-2 text-xl text-white">Uzman & Editöryel Yazılar</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  Kadın sağlığı, gebelik ve menopoz üzerine hazırlanmış 40+ detaylı rehber ayrı bir sayfada seni bekliyor.
                </p>
                <Link
                  href="/yazilar"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-peach hover:underline"
                >
                  Tüm yazıları incele <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </div>

        <svg
          viewBox="0 0 1440 60"
          className="absolute inset-x-0 -bottom-px z-10 h-12 w-full text-cream"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 60V20C360 0 720 0 1080 30L1440 10V60z" fill="currentColor" />
        </svg>
      </section>

      <TopicMarquee />

      {/* 2. AŞAĞI KAYDIRILDIĞINDA: SOLDAN SAĞA 3 BLOK (GEBELİK, KADIN SAĞLIĞI, MENOPOZ) */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Keşfet & Öğren</p>
            <h2 className="font-heading mt-2 text-3xl leading-tight text-plum md:text-5xl">
              Kadının 3 Önemli Evresi
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted-foreground">
              İlgilendiğin döneme tıkla; o döneme özel rehberlere, hafta takibine ve detaylı başlıklara ulaş.
            </p>
          </div>
          <Link
            href="/yazilar"
            className="inline-flex items-center gap-2 text-sm font-medium text-rose hover:underline"
          >
            Yazılar kütüphanesine git <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* 3 Blok Grid: Gebelik | Kadın Sağlığı | Menopoz */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {threeBlocks.map((block) => (
            <Link
              key={block.key}
              href={block.href}
              className={cn(
                "grain group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-[2.5rem] p-8 text-plum transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
                block.tone,
              )}
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-white/80 shadow-sm transition-transform group-hover:scale-105">
                  <block.icon className="size-7 text-plum" />
                </span>
                <span className="rounded-full bg-plum/10 px-3 py-1 text-xs font-medium tracking-wide text-plum">
                  {block.badge}
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <p className="text-xs font-medium tracking-[0.16em] text-plum/60 uppercase">{block.eyebrow}</p>
                <h3 className="font-heading mt-2 text-3xl text-plum md:text-4xl">{block.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-plum/80">{block.description}</p>
              </div>

              <ul className="relative z-10 mt-6 space-y-2 border-t border-plum/15 pt-5 text-xs text-plum/85">
                {block.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-plum/60" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="relative z-10 mt-auto flex items-center justify-between pt-8">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-plum group-hover:text-rose">
                  Bölüme Git
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="flex size-10 items-center justify-center rounded-full bg-plum text-white transition-colors group-hover:bg-rose">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. YAZILAR & BİLGİ BANKASI KÖŞESİ (Ayrı sayfada olduğunu duyuran sade çağrı) */}
      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="rounded-[2.5rem] border border-border/70 bg-white p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Editöryel Kütüphane</p>
              <h2 className="font-heading mt-3 text-3xl text-plum md:text-4xl">
                Tüm yazılar ve rehberler <em className="text-rose">Yazılar sayfasında.</em>
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                Gebelik haftaları, doğum yöntemleri, lohusalık, perimenopoz, adet düzensizlikleri ve koruyucu sağlık üzerine hazırlanmış tüm makalelere kategorilere göre filtreleyerek ulaşabilirsin.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Gebelik", "Doğum", "Lohusalık", "Kadın Sağlığı", "Menopoz"].map((cat) => (
                  <Link
                    key={cat}
                    href={`/yazilar?kategori=${encodeURIComponent(cat === "Kadın Sağlığı" ? "Jinekoloji" : cat === "Lohusalık" ? "Doğum Sonrası" : cat)}`}
                    className="rounded-full bg-cream px-3.5 py-1.5 text-xs font-medium text-plum ring-1 ring-border transition-colors hover:bg-blush"
                  >
                    {cat} Yazıları
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Link
                href="/yazilar"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-plum px-8 text-base font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-rose"
              >
                Yazılar Sayfasına Git <ArrowRight className="size-5" />
              </Link>
              <p className="text-xs text-muted-foreground">40+ bilimsel ve editöryel kaynaklı makale</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOSYAL MEDYA (Dr. İsmail Aykut Instagram) */}
      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="grid gap-6 rounded-[2rem] bg-blush p-6 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Sosyal Medya</p>
            <h2 className="font-heading mt-3 text-3xl text-plum md:text-4xl">Kısa videodan derin yazıya</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-plum/70">
              {DOCTOR_NAME}’un Instagram paylaşımlarındaki konular, platformda ayrıntılı yazılara ve forum tartışmalarına bağlanır.
            </p>
            <a
              href={instagramAccount.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-plum px-5 text-sm font-medium text-white transition-colors hover:bg-rose"
            >
              {instagramAccount.handle} <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {socialPosts.map((post) => (
              <div key={post.title} className="flex flex-col rounded-3xl bg-white p-5">
                <span className="w-fit rounded-full bg-plum px-2.5 py-0.5 text-xs text-white">{post.platform}</span>
                <p className="font-heading mt-4 text-base leading-snug text-plum">{post.title}</p>
                <div className="mt-auto flex flex-col gap-1 pt-4 text-sm">
                  <Link href={post.href} className="font-medium text-rose hover:underline">
                    Yazıyı oku
                  </Link>
                  <Link href={post.relatedHref} className="text-plum/70 hover:underline">
                    İlgili konu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TIBBİ BİLGİLENDİRME & UYARI */}
      <section className="mx-auto max-w-7xl space-y-4 px-4 pb-12 lg:px-8">
        <p className="text-sm text-muted-foreground">
          {EDITORIAL_SUPPORT} {DOCTOR_NAME} bu platformun tıbbi editöryel otoritesidir; site
          kişisel klinik sayfası değildir.
        </p>
        <MedicalDisclaimer />
      </section>
    </>
  );
}
