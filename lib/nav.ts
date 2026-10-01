export const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/gebelik", label: "Gebelik" },
  { href: "/dogum", label: "Doğum" },
  { href: "/dogum-sonrasi", label: "Lohusalık" },
  { href: "/kadin-sagligi", label: "Kadın Sağlığı" },
  { href: "/soru-cevap", label: "Soru & Cevap" },
  { href: "/forum", label: "Forum" },
  { href: "/yazilar", label: "Yazılar" },
] as const;

export const footerNav = {
  kesfet: [
    { href: "/gebelik#oncesi", label: "Bebek planlama" },
    { href: "/gebelik", label: "Gebelik rehberi" },
    { href: "/gebelik#haftalar", label: "Hafta hafta gebelik" },
    { href: "/dogum", label: "Doğuma hazırlık" },
    { href: "/dogum-sonrasi", label: "Lohusalık" },
    { href: "/menopoz", label: "Diğer dönemler: Menopoz" },
  ],
  topluluk: [
    { href: "/forum", label: "Forum" },
    { href: "/forum#yeni-konu", label: "Yeni konu aç" },
    { href: "/soru-cevap", label: "Soru & Cevap" },
    { href: "/uzman-yanitliyor", label: "Uzman yanıtlıyor" },
    { href: "/topluluk-kurallari", label: "Topluluk kuralları" },
  ],
  platform: [
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/gizlilik", label: "Gizlilik" },
    { href: "/tibbi-uyari", label: "Tıbbi uyarı" },
    { href: "/ara", label: "Konu ara" },
  ],
};
