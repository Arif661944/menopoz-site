import { PageHero } from "@/components/decor";

export const metadata = { title: "Gizlilik" };

const points = [
  "Hassas sağlık konularında mahremiyet esastır. Telefon, adres, kimlik, tahlil görüntüsü veya özel tıbbi kayıt paylaşmanızı istemeyiz.",
  "Anonim soru ve anonim paylaşım seçenekleri vardır. Profil bilgisi varsayılan olarak ayrıntılı sağlık öyküsü içermez.",
  "Soru ve forum metinleri moderasyon sonrası herkese açık olabilir. Göndermeden önce kişisel verileri silin.",
  "Acil bir durumda bu siteye yazmak yerine 112’yi arayın.",
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Gizlilik" title={<>Mahremiyetin <em>önceliğimiz.</em></>} />
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
