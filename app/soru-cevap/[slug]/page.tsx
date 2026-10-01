import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Stethoscope } from "lucide-react";
import { InitialsAvatar } from "@/components/forum-bits";
import { MedicalDisclaimer } from "@/components/notices";
import { ReportDialog } from "@/components/report-dialog";
import { getQuestion, questions, relatedArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return questions.map((question) => ({ slug: question.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const question = getQuestion(slug);
  if (!question) return { title: "Soru bulunamadı" };
  return { title: question.title, description: question.body };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = getQuestion(slug);
  if (!question) notFound();
  const related = relatedArticles(question.relatedArticleSlugs);
  const asker = question.anonymous ? "Anonim üye" : question.askedBy;

  return (
    <>
      <section className="grain mesh-cream relative overflow-hidden border-b border-border/60">
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-14 lg:px-8 lg:py-16">
          <Link href="/soru-cevap" className="inline-flex items-center gap-1.5 text-sm font-medium text-plum/70 hover:text-plum">
            <ArrowLeft className="size-4" /> Soru & Cevap
          </Link>
          <span className="mt-6 block w-fit rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-plum">
            {question.category}
          </span>
          <h1 className="font-heading mt-4 text-4xl leading-[1.08] text-balance text-plum md:text-5xl">
            {question.title}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <div className="flex gap-4">
          <InitialsAvatar name={asker} anonymous={question.anonymous} />
          <div className="flex-1 rounded-3xl rounded-tl-md border border-border/70 bg-white p-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-plum">{asker}</span> · {formatDate(question.askedAt)}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-plum">{question.body}</p>
          </div>
        </div>

        <section
          className={cn(
            "grain relative mt-6 overflow-hidden rounded-[2rem] p-8 md:ml-14",
            question.isExpertAnswer ? "mesh-plum text-white" : "bg-sage/60 text-plum",
          )}
        >
          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "flex size-10 items-center justify-center rounded-2xl",
                question.isExpertAnswer ? "bg-white/15" : "bg-white/70",
              )}
            >
              {question.isExpertAnswer ? <Stethoscope className="size-5 text-peach" /> : <BookOpen className="size-5" />}
            </span>
            <div>
              <p className="text-xs tracking-[0.14em] uppercase opacity-70">
                {question.isExpertAnswer ? "Uzman yanıtı" : "Eğitim yanıtı"}
              </p>
              <p className="font-medium">{question.answeringProfessional}</p>
            </div>
          </div>
          <p className="relative z-10 mt-5 text-lg leading-relaxed">{question.answer}</p>
          <p className="relative z-10 mt-5 text-xs opacity-60">
            Bu yanıt genel eğitim amaçlıdır; muayene, tahlil veya reçete yerine geçmez.
          </p>
        </section>

        <div className="mt-4 flex justify-end">
          <ReportDialog target={question.title} />
        </div>

        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-heading text-2xl text-plum">İlgili yazılar</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/yazilar/${article.slug}`}
                    className="block rounded-2xl border border-border/70 bg-white p-4 font-medium text-plum transition-colors hover:bg-blush"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-12">
          <MedicalDisclaimer compact />
        </div>
      </div>
    </>
  );
}
