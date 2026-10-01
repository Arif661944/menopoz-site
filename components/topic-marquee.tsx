import Link from "next/link";

const items = [
  { label: "Gebelik belirtileri", href: "/yazilar/gebelik-belirtileri" },
  { label: "Mide bulantısı", href: "/yazilar/gebelikte-mide-bulantisi" },
  { label: "Gebelikte beslenme", href: "/yazilar/gebelikte-beslenme" },
  { label: "Doğum planı", href: "/yazilar/dogum-plani" },
  { label: "Hastane çantası", href: "/yazilar/hastane-cantasi" },
  { label: "Vajinal doğum & sezaryen", href: "/yazilar/vajinal-dogum-ve-sezaryen" },
  { label: "Gebelik şekeri", href: "/yazilar/gebelik-sekeri" },
  { label: "Preeklampsi", href: "/yazilar/preeklampsi" },
  { label: "PKOS", href: "/yazilar/pkos" },
  { label: "Doğum korkusu", href: "/yazilar/dogum-korkusu" },
  { label: "Emzirme", href: "/yazilar/emzirme" },
  { label: "Lohusalık", href: "/yazilar/lohusalik-nedir" },
  { label: "Pelvik sağlık", href: "/yazilar/pelvik-saglik" },
];

export function TopicMarquee() {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-plum/10 bg-butter py-4">
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((item, index) => (
          <Link
            key={`${item.label}-${index}`}
            href={item.href}
            tabIndex={index >= items.length ? -1 : undefined}
            aria-hidden={index >= items.length ? true : undefined}
            className="font-heading flex items-center gap-3 rounded-full px-4 py-1 text-xl whitespace-nowrap text-plum italic transition-colors hover:text-rose"
          >
            <span className="size-2 rounded-full bg-rose not-italic" aria-hidden />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
