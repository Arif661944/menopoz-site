"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCirclePlus, Phone, Search } from "lucide-react";
import { LogoMark } from "@/components/decor";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PLATFORM_NAME } from "@/lib/brand";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-plum text-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs lg:px-8">
          <p className="flex items-center gap-2">
            <Phone className="size-3.5 text-peach" />
            <span>
              Acil bir durumda <strong className="text-white">112</strong>’yi arayın. Bu
              platform acil tıbbi yardım sunmaz.
            </span>
          </p>
          <Link href="/tibbi-uyari" className="hidden underline-offset-4 hover:text-white hover:underline sm:block">
            Tıbbi uyarı
          </Link>
        </div>
      </div>

      <div className="border-b border-border/60 bg-cream/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <LogoMark className="size-10 shrink-0" />
            <span className="min-w-0">
              <span className="font-heading block truncate text-lg leading-tight text-plum md:text-xl">
                {PLATFORM_NAME}
              </span>
              <span className="block text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                Kadın Topluluğu & Bilgi
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 rounded-full border border-border/70 bg-white/70 p-1 shadow-sm xl:flex"
            aria-label="Ana menü"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors",
                  isActive(pathname, item.href)
                    ? "bg-plum text-white"
                    : "text-plum/70 hover:bg-blush hover:text-plum",
                )}
              >
                {item.label}
                {item.href === "/forum" ? (
                  <span className="absolute top-1 right-1 size-1.5 rounded-full bg-rose" aria-hidden />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/ara"
              aria-label="Konu ara"
              className="hidden size-10 items-center justify-center rounded-full border border-border bg-white/70 text-plum transition-colors hover:bg-blush sm:flex"
            >
              <Search className="size-4" />
            </Link>
            <Link
              href="/forum#yeni-konu"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-rose px-4 text-sm font-medium text-white shadow-[0_10px_30px_-12px] shadow-rose transition-transform hover:-translate-y-0.5"
            >
              <MessageCirclePlus className="size-4" />
              <span className="hidden sm:inline">Konu Aç</span>
            </Link>
            <Sheet>
              <SheetTrigger
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white/70 text-plum xl:hidden"
                aria-label="Menüyü aç"
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-cream">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 font-heading text-plum">
                    <LogoMark className="size-7" />
                    {PLATFORM_NAME}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4 pb-6" aria-label="Mobil menü">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-base",
                        isActive(pathname, item.href)
                          ? "bg-plum text-white"
                          : "text-plum hover:bg-blush",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link href="/ara" className="rounded-2xl px-4 py-2.5 text-base text-plum hover:bg-blush">
                    Konu Ara
                  </Link>
                  <Link
                    href="/forum#yeni-konu"
                    className="mt-2 rounded-2xl bg-rose px-4 py-3 text-center text-base font-medium text-white"
                  >
                    Yeni Konu Aç
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
