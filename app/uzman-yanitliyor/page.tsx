import Link from "next/link";
import { ArrowUpRight, Stethoscope } from "lucide-react";
import { HubHero } from "@/components/decor";
import { MedicalDisclaimer } from "@/components/notices";
import { DOCTOR_NAME, DOCTOR_TITLE } from "@/lib/brand";
import { questions } from "@/lib/content";

export const metadata = {
  title: "Uzman Yanıtlıyor",
};

export default function ExpertAnswersPage() {
  const expert = questions.filter((question) => question.isExpertAnswer);

  return (
    <>
      <HubHero
        eyebrow="Uzman yanıtlıyor"
        title={
          <>
            Topluluk yorumlarından <em>ayrı duran</em> hekim yanıtları.
          </>
        }
        description={`${DOCTOR_NAME}, ${DOCTOR_TITLE}, ve görevli hekimlerin eğitim yanıtları. “Uzman yanıtı” rozeti yalnızca hekim imzalı yanıtlarda kullanılır.`}
      />
      <div className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
        <ul className="grid gap-5 md:grid-cols-2">
          {expert.map((question) => (
            <li key={question.slug}>
              <Link
                href={`/soru-cevap/${question.slug}`}
                className="group flex h-full flex-col rounded-[2rem] border border-border/70 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-plum px-3 py-1 text-xs font-medium text-white">
                  <Stethoscope className="size-3.5 text-peach" /> Uzman yanıtı
                </span>
                <h2 className="font-heading mt-5 text-2xl leading-snug text-plum group-hover:text-rose">
                  {question.title}
                </h2>
                <p className="mt-3 line-clamp-4 leading-relaxed text-muted-foreground">{question.answer}</p>
                <div className="mt-auto flex items-center justify-between pt-6 text-sm">
                  <span className="font-medium text-plum">{question.answeringProfessional}</span>
                  <ArrowUpRight className="size-5 text-plum/30 transition-all group-hover:rotate-45 group-hover:text-rose" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 rounded-3xl bg-butter/70 p-5 text-sm leading-relaxed text-plum">
          Yanıtlar genel eğitim içindir; kişiye özel tedavi planı değildir.
        </p>
        <div className="mt-6">
          <MedicalDisclaimer />
        </div>
      </div>
    </>
  );
}
