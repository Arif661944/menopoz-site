export const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/forum", label: "Forum" },
  { href: "/gebelik", label: "Gebelik" },
  { href: "/kadin-sagligi", label: "Kadın Sağlığı" },
  { href: "/menopoz", label: "Menopoz" },
  { href: "/dogum", label: "Doğum" },
  { href: "/dogum-sonrasi", label: "Lohusalık" },
  { href: "/yazilar", label: "Yazılar" },
] as const;

export const footerNav = {
  kesfet: [
    { href: "/gebelik", label: "Gebelik rehberi" },
    { href: "/kadin-sagligi", label: "Kadın sağlığı" },
    { href: "/menopoz", label: "Menopoz rehberi" },
    { href: "/dogum", label: "Doğuma hazırlık" },
    { href: "/dogum-sonrasi", label: "Lohusalık" },
    { href: "/yazilar", label: "Tüm yazılar" },
  ],
  topluluk: [
    { href: "/forum", label: "Forum" },
    { href: "/forum#yeni-konu", label: "Yeni konu aç" },
    { href: "/topluluk-kurallari", label: "Topluluk kuralları" },
  ],
  platform: [
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/gizlilik", label: "Gizlilik" },
    { href: "/tibbi-uyari", label: "Tıbbi uyarı" },
    { href: "/ara", label: "Konu ara" },
    { href: "/yapilacaklar", label: "Yapılacaklar" },
  ],
};
