import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  HeartHandshake,
  Luggage,
  MessageCircle,
  ShieldCheck,
  Sprout,
  Stethoscope,
} from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { Orbit } from "@/components/decor";
import { CategoryIcon, ForumThreadRow, InitialsAvatar } from "@/components/forum-bits";
import { MedicalDisclaimer } from "@/components/notices";
import { PregnancyTimeline } from "@/components/pregnancy-timeline";
import { SearchBar } from "@/components/search-bar";
import { TopicMarquee } from "@/components/topic-marquee";
import { DOCTOR_NAME, DOCTOR_TITLE, EDITORIAL_SUPPORT } from "@/lib/brand";
import { articles, forumCategories, forumPosts, lastActivity, questions } from "@/lib/content";
import { instagramAccount, socialPosts } from "@/lib/content/social";
import { menopauseSymptoms } from "@/lib/content/symptoms";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const journey = [
  {
    step: "01",
    title: "Bebek planlıyorum",
    text: "Gebelik öncesi kontroller, folik asit ve beklerken sabır.",
    href: "/gebelik#oncesi",
    icon: Sprout,
    tone: "bg-butter",
  },
  {
    step: "02",
    title: "Hamileyim",
    text: "Hafta hafta değişimler, bulantı, beslenme ve kontroller.",
    href: "/gebelik",
    icon: Baby,
    tone: "bg-blush",
  },
  {
    step: "03",
    title: "Doğum yaklaşıyor",
    text: "Doğum belirtileri, plan, hastane çantası ve korkular.",
    href: "/dogum",
    icon: Luggage,
    tone: "bg-peach",
  },
  {
    step: "04",
    title: "Bebeğim kucağımda",
    text: "Lohusalık, emzirme, kanama ve ruhsal toparlanma.",
    href: "/dogum-sonrasi",
    icon: HeartHandshake,
    tone: "bg-sage",
  },
];

const motherhoodCategories = new Set(["Gebelik", "Doğum", "Doğum Sonrası"]);

export default function HomePage() {
  const motherhoodArticles = articles.filter((article) => motherhoodCategories.has(article.category));
  const [leadArticle, ...restArticles] = motherhoodArticles;
  const menopauseArticles = articles.filter((article) => article.category === "Menopoz").slice(0, 4);
  const trending = questions.filter((question) => motherhoodCategories.has(question.category)).slice(0, 4);

  const threads = forumPosts
    .filter((post) => !post.pinned)
    .sort((a, b) => lastActivity(b).localeCompare(lastActivity(a)));
  const spotlight = threads.slice(0, 4);
  const heroThread = threads.find((post) => post.replies.length > 0);
  const totalReplies = forumPosts.reduce((sum, post) => sum + post.replies.length, 0);
  const unanswered = forumPosts.filter((post) => post.replies.length === 0).length;

  return (
    <>
      <section className="grain mesh-plum relative overflow-hidden text-white">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 pt-16 pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pt-24 lg:pb-32">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase ring-1 ring-white/15">
              <span className="size-1.5 animate-pulse rounded-full bg-peach" />
              Anne olma yolculuğu
            </span>
            <h1 className="font-heading mt-7 text-5xl leading-[0.98] text-balance md:text-7xl">
              Hamilelikten kucağına,{" "}
              <em className="text-peach">her haftana</em> eşlik eden bilgi.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
              Bebek planlayan, hamile olan ya da yeni doğum yapmış kadınlar için anlaşılır
              içerikler, hafta hafta gebelik rehberi ve birbirine destek olan bir anneler
              forumu.
            </p>
            <div className="mt-9 max-w-2xl">
              <SearchBar large tone="dark" />
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <Orbit className="w-full text-white" />

            <Link
              href="/gebelik#haftalar"
              className="absolute -top-2 -left-10 w-56 animate-float rounded-3xl bg-white p-5 text-plum shadow-2xl transition-transform hover:scale-105 motion-reduce:animate-none"
            >
              <p className="text-xs font-medium tracking-[0.14em] text-rose uppercase">Bu hafta</p>
              <p className="font-heading mt-2 text-4xl leading-none">
                20<span className="text-base">. hafta</span>
              </p>
              <p className="mt-2 text-sm leading-snug text-plum/70">Gebeliğin ortası. Değişimler daha görünür.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-rose">
                Haftanı seç <ArrowRight className="size-3" />
              </span>
            </Link>

            {heroThread ? (
              <Link
                href={`/forum/${heroThread.category}/${heroThread.slug}`}
                className="absolute -right-6 bottom-6 w-64 animate-float rounded-3xl bg-cream p-5 text-plum shadow-2xl transition-transform [animation-delay:-3s] hover:scale-105 motion-reduce:animate-none"
              >
                <div className="flex items-center gap-3">
                  <InitialsAvatar name={heroThread.author} anonymous={heroThread.anonymous} className="size-8 text-sm" />
                  <div className="text-xs">
                    <p className="font-medium">{heroThread.anonymous ? "Anonim üye" : heroThread.author}</p>
                    <p className="text-plum/60">Forumda · {heroThread.stage ?? "yeni konu"}</p>
                  </div>
                </div>
                <p className="font-heading mt-3 text-lg leading-snug">{heroThread.title}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-xs text-plum/60">
                  <MessageCircle className="size-3.5" /> {heroThread.replies.length} yanıt
                </p>
              </Link>
            ) : null}

            <div className="absolute bottom-16 -left-4 flex items-center gap-2 rounded-full bg-plum-soft/90 px-4 py-2 text-xs ring-1 ring-white/20 backdrop-blur">
              <ShieldCheck className="size-4 text-sage" />
              Moderasyonlu topluluk
            </div>
          </div>
        </div>

        <svg
          viewBox="0 0 1440 80"
          className="absolute inset-x-0 -bottom-px z-10 h-16 w-full text-butter"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 80V40C240 0 480 0 720 30s480 50 720 10v40z" fill="currentColor" />
        </svg>
      </section>

      <TopicMarquee />

      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Yolculuğun neresindesin?</p>
            <h2 className="font-heading mt-3 max-w-2xl text-4xl leading-tight text-plum md:text-5xl">
              Dört dönem, <em className="text-rose">tek bir rehber.</em>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Bulunduğun döneme dokun; ihtiyacın olan yazılar, sorular ve forum konuları bir arada.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {journey.map((item, index) => (
            <li key={item.step} className={cn(index % 2 === 1 && "lg:translate-y-10")}>
              <Link
                href={item.href}
                className={cn(
                  "grain group relative flex h-full min-h-80 flex-col overflow-hidden rounded-[2rem] p-7 text-plum transition-all duration-300 hover:-translate-y-1 hover:shadow-soft",
                  item.tone,
                )}
              >
                <span className="font-heading absolute -right-2 -bottom-8 z-0 text-[9rem] leading-none text-plum/10 transition-transform duration-500 group-hover:-translate-y-3">
                  {item.step}
                </span>
                <span className="relative z-10 flex size-12 items-center justify-center rounded-2xl bg-white/70">
                  <item.icon className="size-5" />
                </span>
                <h3 className="font-heading relative z-10 mt-auto text-3xl">{item.title}</h3>
                <p className="relative z-10 mt-3 text-sm leading-relaxed text-plum/75">{item.text}</p>
                <span className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  Keşfet
                  <span className="flex size-8 items-center justify-center rounded-full bg-plum text-white transition-transform group-hover:translate-x-1">
                    <ArrowRight className="size-4" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mesh-cream py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <PregnancyTimeline initialWeek={20} compact />
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-plum text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-40 lg:self-start">
              <p className="text-xs font-medium tracking-[0.18em] text-peach uppercase">Anneler forumu</p>
              <h2 className="font-heading mt-4 text-4xl leading-tight md:text-6xl">
                Aynı yoldan geçen <em className="text-peach">kadınlarla</em> konuş.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-white/70">
                Deneyimini paylaş, soru sor, dilersen anonim kal. Her paylaşım topluluk
                kurallarına göre denetlenir. Forum tıbbi tavsiye yerine geçmez.
              </p>

              <dl className="mt-10 grid grid-cols-3 gap-3">
                {[
                  { value: forumPosts.length, label: "konu" },
                  { value: totalReplies, label: "yanıt" },
                  { value: unanswered, label: "yanıt bekliyor" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <dt className="text-xs text-white/55">{stat.label}</dt>
                    <dd className="font-heading mt-1 text-3xl text-peach">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/forum"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-plum transition-transform hover:-translate-y-0.5"
                >
                  Foruma git <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href="/forum#yeni-konu"
                  className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-sm font-medium transition-colors hover:bg-white/10"
                >
                  Yeni konu aç
                </Link>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                {forumCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/forum/${category.slug}`}
                    className="flex shrink-0 items-center gap-2 rounded-full bg-white/[0.06] py-1.5 pr-4 pl-1.5 text-sm ring-1 ring-white/10 transition-colors hover:bg-white/15"
                  >
                    <CategoryIcon category={category} className="size-8 rounded-full" />
                    {category.title}
                  </Link>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {spotlight.map((post) => (
                  <ForumThreadRow key={post.slug} post={post} tone="dark" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[2rem] border border-border/70 bg-white p-8 md:p-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Soru & Cevap</p>
                <h2 className="font-heading mt-3 text-3xl text-plum md:text-4xl">Şu sıralar merak edilenler</h2>
              </div>
              <Link href="/soru-cevap" className="hidden text-sm font-medium text-rose hover:underline sm:block">
                Tüm sorular
              </Link>
            </div>
            <ol className="mt-8 divide-y divide-border">
              {trending.map((question, index) => (
                <li key={question.slug}>
                  <Link
                    href={`/soru-cevap/${question.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-5"
                  >
                    <span className="font-heading text-3xl text-rose/40 tabular-nums transition-colors group-hover:text-rose">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="font-heading block text-lg leading-snug text-plum">{question.title}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {question.category} · {formatDate(question.askedAt)}
                      </span>
                    </span>
                    <ArrowUpRight className="size-5 text-plum/30 transition-all group-hover:rotate-45 group-hover:text-rose" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="grain mesh-plum relative flex flex-col overflow-hidden rounded-[2rem] p-8 text-white md:p-10">
            <span className="relative z-10 flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <Stethoscope className="size-5 text-peach" />
            </span>
            <h2 className="font-heading relative z-10 mt-6 text-3xl leading-tight">
              Aklındaki soruyu <em className="text-peach">anonim</em> sor.
            </h2>
            <p className="relative z-10 mt-4 text-sm leading-relaxed text-white/70">
              Sorular editöryel ekip tarafından incelenir. Uzman yanıtları yalnızca gerçekten bir
              hekim tarafından yazıldığında “Uzman yanıtı” olarak işaretlenir.
            </p>
            <p className="relative z-10 mt-4 text-xs leading-relaxed text-white/50">
              {DOCTOR_NAME}, {DOCTOR_TITLE} · tıbbi editöryel otorite
            </p>
            <div className="relative z-10 mt-auto flex flex-col gap-2 pt-8">
              <Link
                href="/soru-sor"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white text-sm font-medium text-plum"
              >
                Soru sor <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/uzman-yanitliyor"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 text-sm font-medium hover:bg-white/10"
              >
                Uzman yanıtlarını gör
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Okuma köşesi</p>
            <h2 className="font-heading mt-3 text-4xl text-plum md:text-5xl">Anneler için seçtiklerimiz</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Okunma sayıları henüz yayınlanmıyor; seçki editöryel ekip tarafından hazırlanır.
            </p>
          </div>
          <Link href="/yazilar" className="inline-flex items-center gap-2 text-sm font-medium text-rose hover:underline">
            Tüm yazılar <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {leadArticle ? (
            <div className="lg:row-span-2">
              <ArticleCard article={leadArticle} size="large" />
            </div>
          ) : null}
          {restArticles.slice(0, 4).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 lg:px-8">
        <div className="grain mesh-plum relative overflow-hidden rounded-[2.5rem] p-8 text-white md:p-12">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-peach uppercase">Menopoz rehberi</p>
              <h2 className="font-heading mt-4 text-4xl leading-tight md:text-5xl">
                Hayatın bir sonraki evresine <em className="text-peach">hazırlıklı</em> gir.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-white/70">
                Perimenopozdan menopoz sonrasına; sıcak basmaları, uyku, ruh hali, kemik sağlığı ve
                tedavi seçenekleri üzerine sakin, anlaşılır bilgiler.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {menopauseSymptoms.slice(0, 6).map((symptom) => (
                  <Link
                    key={symptom.slug}
                    href="/menopoz#belirtiler"
                    className="rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/15 transition-colors hover:bg-white/20"
                  >
                    {symptom.title}
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/menopoz"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-plum transition-transform hover:-translate-y-0.5"
                >
                  Menopoz rehberi <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/forum/menopoz"
                  className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-sm font-medium hover:bg-white/10"
                >
                  Menopoz forumu
                </Link>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {menopauseArticles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/yazilar/${article.slug}`}
                    className="group flex h-full flex-col rounded-3xl bg-white/[0.07] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]"
                  >
                    <span className="text-xs text-white/50">{article.readingMinutes} dk okuma</span>
                    <span className="font-heading mt-2 text-lg leading-snug">{article.title}</span>
                    <ArrowUpRight className="mt-auto size-4 self-end text-white/40 transition-all group-hover:rotate-45 group-hover:text-peach" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="grid gap-4 rounded-[2rem] bg-blush p-6 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Sosyal medya</p>
            <h2 className="font-heading mt-3 text-3xl text-plum md:text-4xl">Kısa videodan derin yazıya</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-plum/70">
              {DOCTOR_NAME}’un Instagram paylaşımlarındaki konular, sitede ayrıntılı bir yazıya ve
              ilgili bir soruya bağlanır.
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
                <p className="font-heading mt-4 text-lg leading-snug text-plum">{post.title}</p>
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

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <Link
          href="/yapilacaklar"
          className="group grain mesh-cream relative flex flex-col justify-between gap-6 overflow-hidden rounded-[2rem] p-6 ring-1 ring-border md:flex-row md:items-center md:p-10"
        >
          <div className="relative z-10">
            <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Yapılacaklar</p>
            <h2 className="font-heading mt-3 text-3xl text-plum md:text-4xl">Yakında eklenecek araçlar</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-plum/70">
              Doğum tarihi hesaplayıcı, tekme sayacı, kasılma ölçer, menopoz belirti günlüğü ve
              daha fazlası. Planlanan her şeyi ve durumunu tek listede gör.
            </p>
          </div>
          <span className="relative z-10 inline-flex h-12 w-fit shrink-0 items-center gap-2 rounded-full bg-plum px-6 text-sm font-medium text-white transition-colors group-hover:bg-rose">
            Listeyi gör <ArrowRight className="size-4" />
          </span>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl space-y-4 px-4 lg:px-8">
        <p className="text-sm text-muted-foreground">
          {EDITORIAL_SUPPORT} {DOCTOR_NAME} bu platformun tıbbi editöryel otoritesidir; site
          kişisel klinik sayfası değildir.
        </p>
        <MedicalDisclaimer />
      </section>
    </>
  );
}
