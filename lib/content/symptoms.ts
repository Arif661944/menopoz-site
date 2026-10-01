export type Symptom = {
  slug: string;
  title: string;
  summary: string;
  mayOccur: string;
  otherCauses: string;
  whenToSeekCare: string;
  articleSlug: string;
};

export const menopauseSymptoms: Symptom[] = [
  {
    slug: "sicak-basmasi",
    title: "Sıcak basması",
    summary: "Yüz, boyun veya göğüste ani sıcaklık, kızarma ve terleme.",
    mayOccur:
      "Bu belirti menopoz döneminde görülebilir. Östrojen değişimi vücudun ısı ayarını etkileyebilir.",
    otherCauses:
      "Ancak farklı nedenleri de olabilir: tiroit hastalıkları, bazı ilaçlar, enfeksiyon veya anksiyete.",
    whenToSeekCare:
      "Sık, gece uykusunu bölen veya günlük yaşamı bozan ataklarda hekiminizle konuşun. Açıklanamayan kilo kaybı veya çarpıntı varsa beklemeyin.",
    articleSlug: "sicak-basmasi-neden-olur",
  },
  {
    slug: "gece-terlemesi",
    title: "Gece terlemesi",
    summary: "Uykudan terleyerek uyanma, çarşaf değiştirme ihtiyacı.",
    mayOccur:
      "Bu belirti menopoz döneminde görülebilir. Gece ortaya çıkan sıcak basması sık anlatılır.",
    otherCauses:
      "Ancak farklı nedenleri de olabilir. Ateşle birlikteyse enfeksiyon da düşünülmelidir.",
    whenToSeekCare: "Ateş, kilo kaybı veya gündüz aşırı uyku hali varsa hekime başvurun.",
    articleSlug: "menopozda-uyku",
  },
  {
    slug: "uyku-problemleri",
    title: "Uyku problemleri",
    summary: "Uykuya dalamama, sık uyanma veya dinlenmeden kalkma.",
    mayOccur:
      "Bu belirti menopoz döneminde görülebilir. Gece terlemesi ve zihin yorgunluğu uykuyu bölebilir.",
    otherCauses:
      "Ancak farklı nedenleri de olabilir: uyku apnesi, depresyon, kafein veya ağrı.",
    whenToSeekCare:
      "Gündüz güvenliğinizi bozan uykusuzlukta profesyonel değerlendirme isteyin.",
    articleSlug: "menopozda-uyku",
  },
  {
    slug: "adet-duzensizlikleri",
    title: "Adet düzensizlikleri",
    summary: "Adetlerin sıklaşması, seyrelmesi veya yoğunluğunun değişmesi.",
    mayOccur:
      "Bu belirti menopoz döneminde görülebilir. Perimenopozda yumurtlama düzensizleşebilir.",
    otherCauses:
      "Ancak farklı nedenleri de olabilir: miyom, polip, tiroit veya kanama bozuklukları.",
    whenToSeekCare:
      "Çok yoğun kanama, adetler arası lekelenme veya menopoz sonrası kanama mutlaka değerlendirilmelidir.",
    articleSlug: "perimenopoz-nedir",
  },
  {
    slug: "vajinal-kuruluk",
    title: "Vajinal kuruluk",
    summary: "Kayganlık azalması, yanma veya ilişkide ağrı.",
    mayOccur:
      "Bu belirti menopoz döneminde görülebilir. Doku incelmesi östrojen azalmasıyla ilişkili olabilir.",
    otherCauses:
      "Ancak farklı nedenleri de olabilir: enfeksiyon, cilt hastalıkları veya bazı ilaçlar.",
    whenToSeekCare: "Kanama, kötü kokulu akıntı veya ateş varsa muayene gerekir.",
    articleSlug: "menopozda-cinsel-saglik",
  },
  {
    slug: "ruh-hali",
    title: "Ruh hali değişimleri",
    summary: "Sinirlilik, kaygı, içe kapanma veya ani duygu dalgalanması.",
    mayOccur:
      "Bu belirti menopoz döneminde görülebilir. Uyku kaybı ve hormonal dalgalanma katkı yapabilir.",
    otherCauses:
      "Ancak farklı nedenleri de olabilir. Depresyon ve anksiyete bozuklukları ayrıca ele alınır.",
    whenToSeekCare:
      "İki haftayı aşan çökkünlük, işlev kaybı veya kendine zarar düşüncesi acil destektir.",
    articleSlug: "menopozda-ruh-hali",
  },
  {
    slug: "konsantrasyon",
    title: "Konsantrasyon sorunları",
    summary: "Kelime bulamama, dalgınlık, ‘sis’ hissi.",
    mayOccur:
      "Bu belirti menopoz döneminde görülebilir. Uyku bölünmesi de zihni yorar.",
    otherCauses:
      "Ancak farklı nedenleri de olabilir: tiroit, B12 eksikliği, depresyon veya ilaç yan etkisi.",
    whenToSeekCare:
      "Hızlı ilerleyen unutkanlık, yön kaybı veya günlük işleri yapamama hekim değerlendirmesi ister.",
    articleSlug: "menopoz-nedir",
  },
  {
    slug: "cinsel-istek",
    title: "Cinsel istekte değişiklik",
    summary: "İstekte azalma veya ilişkide rahatsızlık.",
    mayOccur:
      "Bu belirti menopoz döneminde görülebilir. Ağrı, uyku ve ruh hali de isteği etkiler.",
    otherCauses:
      "Ancak farklı nedenleri de olabilir: ilişki dinamikleri, ilaçlar veya depresyon.",
    whenToSeekCare:
      "Ağrı, kanama veya ilişkiyi bırakacak kadar sıkıntı varsa konuşulabilir ve değerlendirilebilir.",
    articleSlug: "menopozda-cinsel-saglik",
  },
  {
    slug: "pelvik-belirtiler",
    title: "İdrar yolu / pelvik belirtiler",
    summary: "Sık idrara çıkma, kaçırma, yanma veya pelvik baskı.",
    mayOccur:
      "Bu belirti menopoz döneminde görülebilir. Pelvik doku ve idrar yolu da östrojenden etkilenir.",
    otherCauses:
      "Ancak farklı nedenleri de olabilir: idrar yolu enfeksiyonu, sarkma veya taş.",
    whenToSeekCare:
      "Ateş, yan ağrısı, kanlı idrar veya ani idrar yapamama acil değerlendirme gerektirir.",
    articleSlug: "pelvik-saglik",
  },
];
