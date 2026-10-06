import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/decor";
import { COMMUNITY_DISCLAIMER, EDITORIAL_SUPPORT, EMERGENCY_COPY, PLATFORM_NAME } from "@/lib/brand";
import { instagramAccount } from "@/lib/content/social";
import { footerNav } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="grain mesh-plum relative mt-24 overflow-hidden text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 py-16 md:flex-row md:items-end">
          <h2 className="font-heading max-w-2xl text-4xl leading-[1.05] text-balance md:text-6xl">
            Merak ettiğin her şey için <em className="text-peach">yalnız değilsin.</em>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/forum"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-plum transition-transform hover:-translate-y-0.5"
            >
              Foruma katıl <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/forum#yeni-konu"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Yeni konu aç
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="size-10" />
              <p className="font-heading text-xl">{PLATFORM_NAME}</p>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Kadınlar Arasında; gebelik, kadın sağlığı ve menopoz dönemlerinde
              deneyim paylaşımı, güvenli forum ve anlaşılır bilgi platformu.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{EDITORIAL_SUPPORT}</p>
            <a
              href={instagramAccount.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 transition-colors hover:bg-white/20"
            >
              Instagram · {instagramAccount.handle} <ArrowUpRight className="size-3.5" />
            </a>
          </div>
          {Object.entries({
            Keşfet: footerNav.kesfet,
            Topluluk: footerNav.topluluk,
            Platform: footerNav.platform,
          }).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-medium tracking-[0.18em] text-peach uppercase">{title}</p>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 border-t border-white/10 py-6 text-xs leading-relaxed text-white/50">
          <p>{COMMUNITY_DISCLAIMER}</p>
          <p>{EMERGENCY_COPY}</p>
          <p>{PLATFORM_NAME}, bir klinik randevu sitesi veya kişisel hekim sayfası değildir.</p>
        </div>
      </div>
    </footer>
  );
}
