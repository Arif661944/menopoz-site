import { PageHero } from "@/components/decor";
import { DOCTOR_NAME, DOCTOR_TITLE, EDITORIAL_SUPPORT, PLATFORM_NAME } from "@/lib/brand";

export const metadata = { title: "Hakkımızda" };

const values = [
  { title: "Yargılamayan dil", text: "Her gebelik ve her annelik farklıdır.", tone: "bg-blush" },
  { title: "Kanıta yakın", text: "Kaynağı belli, abartısız eğitim içeriği.", tone: "bg-sage" },
  { title: "Güvenli topluluk", text: "Moderasyonlu, mahremiyete saygılı forum.", tone: "bg-peach" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title={
          <>
            Kadınların her döneminde <em>yanında</em> bir topluluk.
          </>
        }
      />
      <div className="mx-auto max-w-4xl px-4 py-14 lg:px-8">
        <div className="space-y-5 text-lg leading-relaxed text-plum/85">
          <p className="font-heading text-2xl leading-relaxed text-plum">
            {PLATFORM_NAME}, gebelik, lohusalık, kadın sağlığı ve menopoz dönemlerinde
            kadınların birbirine destek olduğu, deneyimlerini paylaştığı ve anlaşılır
            sağlık bilgisine ulaştığı bağımsız bir kadın platformudur.
          </p>
          <p>
            {DOCTOR_NAME} ({DOCTOR_TITLE}) platformun tıbbi editöryel otoritesidir. Bu site onun
            kişisel klinik veya randevu sayfası değildir.
          </p>
          <p>{EDITORIAL_SUPPORT}</p>
          <p>Topluluk paylaşımları deneyimdir, reçete değildir.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className={`grain relative overflow-hidden rounded-[2rem] p-6 text-plum ${value.tone}`}>
              <p className="font-heading relative z-10 text-2xl">{value.title}</p>
              <p className="relative z-10 mt-2 text-sm text-plum/75">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
