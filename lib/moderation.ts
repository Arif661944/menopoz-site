export type ModerationFlag =
  | "medical-misinformation"
  | "self-diagnosis"
  | "medication"
  | "dangerous-advice"
  | "harassment"
  | "spam"
  | "advertising"
  | "personal-information";

const patterns: { flag: ModerationFlag; regex: RegExp; message: string }[] = [
  {
    flag: "personal-information",
    regex:
      /(\+90|0)?\s*\d{3}\s*\d{3}\s*\d{2}\s*\d{2}|tc\s*kimlik|adresim|whatsapp|@gmail\.|@hotmail\./i,
    message:
      "Telefon, e-posta veya kimlik bilgisi paylaşmayın. Bu alanlar kamuya açık olabilir.",
  },
  {
    flag: "medication",
    regex:
      /\b(ilaç\s*öner|şu ilacı iç|doz|reçete|antibiyotik|östrojen hapı|progesteron hapı)\b/i,
    message:
      "İlaç, doz veya tedavi önerisi paylaşmayın. Bu tür kararlar yalnızca hekimle verilir.",
  },
  {
    flag: "dangerous-advice",
    regex:
      /\b(doktora gitme|hastaneye gitme|ameliyat olma|ilaçlarını bırak|kendi kendine tedavi)\b/i,
    message:
      "Tehlikeli tıbbi yönlendirme tespit edildi. Lütfen metni değiştirin.",
  },
  {
    flag: "self-diagnosis",
    regex: /\b(kesin tanın|kesinlikle menopozsun|kansersin|dış gebeliksin)\b/i,
    message: "Başkasına tanı koymayın. Deneyiminizi spekülasyon olmadan paylaşın.",
  },
  {
    flag: "advertising",
    regex: /\b(satın al|link bio|indirim kodu|şu ürünü alın|sponsor)\b/i,
    message: "Reklam ve ürün satışı bu toplulukta uygun değildir.",
  },
  {
    flag: "spam",
    regex: /(https?:\/\/\S+\s*){3,}/i,
    message: "Çok sayıda bağlantı spam olarak işaretlendi.",
  },
];

export function moderateText(text: string): { ok: boolean; warnings: string[] } {
  const warnings = patterns
    .filter((rule) => rule.regex.test(text))
    .map((rule) => rule.message);

  return { ok: warnings.length === 0, warnings };
}
