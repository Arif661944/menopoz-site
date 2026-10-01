import { EyeOff, ShieldCheck, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/decor";
import { MedicalDisclaimer } from "@/components/notices";
import { QuestionForm } from "@/components/question-form";

export const metadata = {
  title: "Soru Sor",
};

const steps = [
  { icon: EyeOff, title: "Anonim sor", text: "Adını paylaşmak zorunda değilsin." },
  { icon: ShieldCheck, title: "Moderasyon", text: "Kişisel bilgi ve acil durumlar ayıklanır." },
  { icon: Stethoscope, title: "Yanıt", text: "Editöryel ekip ya da uzman eğitim yanıtı yazar." },
];

export default function AskPage() {
  return (
    <>
      <PageHero
        eyebrow="Soru sor"
        title={
          <>
            Aklına takılanı <em>çekinmeden</em> sor.
          </>
        }
        description="Genel bir kadın sağlığı sorusu yaz. Bu form acil yardım veya randevu kanalı değildir."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft md:p-8">
          <QuestionForm />
        </div>
        <aside className="space-y-3 lg:sticky lg:top-40 lg:self-start">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-4 rounded-3xl bg-cream p-5 ring-1 ring-border">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-blush text-plum">
                <step.icon className="size-5" />
              </span>
              <div>
                <p className="font-heading text-lg text-plum">
                  <span className="text-rose">{index + 1}.</span> {step.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
              </div>
            </div>
          ))}
          <MedicalDisclaimer />
        </aside>
      </div>
    </>
  );
}
