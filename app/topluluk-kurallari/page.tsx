import { PageHero } from "@/components/decor";
import { COMMUNITY_DISCLAIMER } from "@/lib/brand";

export const metadata = { title: "Topluluk kuralları" };

const rules = [
  "İlaç, doz veya tedavi önermeyin.",
  "Başkasına tanı koymayın.",
  "Tehlikeli “doktora gitme” yönlendirmeleri yasaktır.",
  "Taciz, spam ve reklam kaldırılır.",
  "Telefon, adres ve kimlik paylaşmayın.",
  "Yanlış bilgi, uygunsuz içerik ve taciz bildirilebilir.",
];

export default function CommunityRulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Topluluk kuralları"
        title={
          <>
            Burası herkes için <em>güvenli</em> kalsın.
          </>
        }
        description={COMMUNITY_DISCLAIMER}
      />
      <div className="mx-auto max-w-4xl px-4 py-14 lg:px-8">
        <ol className="grid gap-3 md:grid-cols-2">
          {rules.map((rule, index) => (
            <li key={rule} className="flex items-start gap-4 rounded-3xl border border-border/70 bg-white p-5">
              <span className="font-heading flex size-10 shrink-0 items-center justify-center rounded-full bg-blush text-plum">
                {index + 1}
              </span>
              <span className="pt-2 text-plum">{rule}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 rounded-3xl bg-butter/70 p-5 text-sm leading-relaxed text-plum">
          Otomatik süzgeçler kişisel bilgi, ilaç önerisi, reklam ve tehlikeli tıbbi yönlendirmeleri
          yakalamaya çalışır. İnsan moderasyonu bunu tamamlar.
        </p>
      </div>
    </>
  );
}
