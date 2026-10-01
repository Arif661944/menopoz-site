import { Info, Phone, Users } from "lucide-react";
import { COMMUNITY_DISCLAIMER, EMERGENCY_COPY, MEDICAL_DISCLAIMER } from "@/lib/brand";

export function MedicalDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <aside className="flex gap-4 rounded-3xl border border-plum/10 bg-blush/50 p-5 text-plum md:p-6" role="note">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-rose">
        <Info className="size-5" />
      </span>
      <div className="space-y-1 text-sm leading-relaxed">
        <p className="font-heading text-base">Tıbbi uyarı</p>
        <p className="text-plum/75">{MEDICAL_DISCLAIMER}</p>
        {compact ? null : <p className="text-plum/75">{EMERGENCY_COPY}</p>}
      </div>
    </aside>
  );
}

export function CommunityNotice() {
  return (
    <p className="flex items-start gap-3 rounded-2xl bg-butter/70 px-4 py-3 text-sm leading-relaxed text-plum">
      <Users className="mt-0.5 size-4 shrink-0 text-rose" />
      <strong className="font-medium">{COMMUNITY_DISCLAIMER}</strong>
    </p>
  );
}

const emergencySigns = [
  "Şiddetli veya giderek artan kanama",
  "Nefes darlığı, göğüs ağrısı, bayılma",
  "Şiddetli baş ağrısı, görme bozukluğu, nöbet",
  "Tek taraflı bacak şişliği ve kızarıklık",
  "Ateş ve kötü kokulu akıntı",
  "Kendine veya bebeğe zarar verme düşüncesi",
];

export function EmergencyCard() {
  return (
    <section className="grain relative overflow-hidden rounded-[2rem] bg-[oklch(0.42_0.16_22)] p-8 text-white md:p-10">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15">
            <Phone className="size-5" />
          </span>
          <h2 className="font-heading mt-5 text-3xl leading-tight md:text-4xl">Acil durumlarda ne yapmalıyım?</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Bu platform tanı koymaz ve acil yardım sunmaz. Aşağıdakilerden biri varsa
            <strong className="text-white"> 112</strong>’yi arayın veya en yakın acil servise gidin.
          </p>
          <p className="mt-4 text-sm text-white/65">Şüphede kalırsanız beklemeyin. Acile gitmek abartı değildir.</p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {emergencySigns.map((sign) => (
            <li key={sign} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm ring-1 ring-white/15">
              <span className="size-2 shrink-0 rounded-full bg-peach" />
              {sign}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
