import { PageHero } from "@/components/decor";
import { EMERGENCY_COPY, MEDICAL_DISCLAIMER } from "@/lib/brand";

export const metadata = { title: "Tıbbi uyarı" };

const points = [
  MEDICAL_DISCLAIMER,
  EMERGENCY_COPY,
  "Belirti tarayıcıları, kontrol listeleri ve hafta çizelgeleri eğitim araçlarıdır. Tanı koymaz, risk skoru üretmez, tedavi önermez.",
  "Henüz tıbbi değerlendirmeden geçmemiş yazılar açıkça işaretlenir. Değerlendirilmemiş içeriği “hekim onaylı” gibi sunmayız.",
];

export default function MedicalWarningPage() {
  return (
    <>
      <PageHero eyebrow="Tıbbi uyarı" title={<>Bilgi verir, <em>hekiminin yerini tutmaz.</em></>} />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-14 lg:px-8">
        {points.map((point) => (
          <p key={point} className="rounded-3xl border border-border/70 bg-white p-6 leading-relaxed text-plum/85">
            {point}
          </p>
        ))}
      </div>
    </>
  );
}
