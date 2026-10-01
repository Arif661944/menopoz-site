export const pregnancyWeeks = Array.from({ length: 40 }, (_, index) => {
  const week = index + 1;
  const trimester = week <= 13 ? 1 : week <= 27 ? 2 : 3;

  const highlights: Record<number, string> = {
    1: "Takvimde gebelik, son adetin ilk gününden sayılır. Henüz döllenme olmayabilir.",
    2: "Ovulasyon ve döllenme bu dönemde gerçekleşebilir.",
    3: "Döllenmiş yumurta rahim içine yerleşmeye başlar.",
    4: "Adet gecikmesi ve ev testi gündeme gelebilir.",
    5: "Yorgunluk ve göğüs hassasiyeti artabilir.",
    6: "Bulantı başlayabilir. Şiddetli ağrı ve kanamada acile gidin.",
    8: "İlk hekim kontrolü ve gebelik kesesinin değerlendirilmesi sık planlanır.",
    10: "Koku hassasiyeti ve sık idrara çıkma görülebilir.",
    12: "Birçok kadında ilk trimester taramaları konuşulur.",
    13: "Birinci trimester sonuna yaklaşılır; enerji biraz artabilir.",
    16: "Bebek hareketleri ilerleyen haftalarda hissedilebilir.",
    18: "Ayrıntılı ultrason zamanı hekiminizle planlanır.",
    20: "Gebeliğin ortası: vücut değişimleri daha görünür olabilir.",
    24: "Şeker tarama testleri bu döneme denk gelebilir.",
    28: "Üçüncü trimester başlar. Doğuma hazırlık konuşmaları artar.",
    32: "Bebek hareketlerini tanımak ve azalınca haber vermek önemlidir.",
    36: "Hastane çantası ve doğum planı gözden geçirilebilir.",
    37: "Erken dönem term kabul edilen aralığa girilir; hekiminiz takvimi kişiselleştirir.",
    38: "Kasılmalar düzensiz olabilir. Su gelmesi veya kanamada başvurun.",
    39: "Doğum belirtilerini hekiminizin tarifine göre izleyin.",
    40: "Tahmini doğum haftasıdır. Her gebelik bu haftada doğumla bitmez.",
  };

  return {
    week,
    trimester,
    title: `${week}. hafta`,
    summary:
      highlights[week] ??
      (trimester === 1
        ? "İlk trimesterde bulantı, yorgunluk ve erken kontroller öne çıkar."
        : trimester === 2
          ? "İkinci trimesterde büyüme, hareket ve ara taramalar konuşulur."
          : "Üçüncü trimesterde doğuma hazırlık ve uyarı işaretleri öne çıkar."),
  };
});

export const pregnancyHub = {
  oncesi: [
    { title: "Gebelik planlaması", href: "/yazilar/gebelik-oncesi-hazirlik" },
    { title: "Gebelik öncesi kontroller", href: "/yazilar/gebelik-oncesi-hazirlik" },
    { title: "Folik asit", href: "/yazilar/gebelik-oncesi-hazirlik" },
    { title: "Beslenme", href: "/yazilar/gebelikte-beslenme" },
    { title: "Aşılar", href: "/yazilar/gebelik-oncesi-hazirlik" },
    { title: "İlaçlar hakkında bilinmesi gerekenler", href: "/yazilar/gebelik-oncesi-hazirlik" },
    { title: "PKOS ve gebelik planı", href: "/yazilar/pkos" },
    { title: "Kimyasal gebelik", href: "/yazilar/kimyasal-gebelik" },
  ],
  t1: [
    { title: "İlk haftalar", href: "/yazilar/gebelik-belirtileri" },
    { title: "Gebelik belirtileri", href: "/yazilar/gebelik-belirtileri" },
    { title: "İlk kontroller", href: "/yazilar/gebelik-oncesi-hazirlik" },
    { title: "Bulantı", href: "/yazilar/gebelikte-mide-bulantisi" },
    { title: "Yorgunluk", href: "/yazilar/gebelik-belirtileri" },
    { title: "Beslenme", href: "/yazilar/gebelikte-beslenme" },
    { title: "Dış gebelik belirtileri", href: "/yazilar/dis-gebelik" },
  ],
  t2: [
    { title: "Bebeğin gelişimi", href: "/gebelik#haftalar" },
    { title: "Anne vücudundaki değişiklikler", href: "/yazilar/gebelikte-beslenme" },
    { title: "Kontroller", href: "/yazilar/gebelikte-ne-zaman-doktora" },
    { title: "Beslenme", href: "/yazilar/gebelikte-beslenme" },
    { title: "Gebelik şekeri testi", href: "/yazilar/gebelik-sekeri" },
    { title: "Günlük yaşam", href: "/forum/gebelik-deneyimleri" },
  ],
  t3: [
    { title: "Preeklampsi ve tansiyon", href: "/yazilar/preeklampsi" },
    { title: "Erken doğum belirtileri", href: "/yazilar/erken-dogum" },
    { title: "Doğuma hazırlık", href: "/dogum" },
    { title: "Doğum belirtileri", href: "/yazilar/dogum-belirtileri" },
    { title: "Hastane çantası", href: "/yazilar/hastane-cantasi" },
    { title: "Doğum planı", href: "/yazilar/dogum-plani" },
    { title: "Sık sorulan sorular", href: "/soru-cevap?kategori=Gebelik" },
  ],
};
