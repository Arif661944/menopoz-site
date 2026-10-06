import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Figtree, Fraunces } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EDITORIAL_SUPPORT, PLATFORM_NAME } from "@/lib/brand";
import "./globals.css";

const sans = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
});

const heading = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: {
    default: `${PLATFORM_NAME} — Kadın sağlığı, gebelik ve menopoz topluluğu`,
    template: `%s | ${PLATFORM_NAME}`,
  },
  description:
    "Kadınlar Arasında; gebelikten menopoza, kadın sağlığının her evresinde deneyim paylaşabileceğin, güvenli ve moderasyonlu kadın topluluğu ve bilgi platformu.",
  applicationName: PLATFORM_NAME,
};

export const viewport: Viewport = {
  themeColor: "#3b1a2a",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${sans.variable} ${heading.variable} ${sans.className} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <TooltipProvider>
          <a
            href="#icerik"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
          >
            İçeriğe geç
          </a>
          <SiteHeader />
          <main id="icerik" className="flex-1">
            {children}
          </main>
          <p className="sr-only">{EDITORIAL_SUPPORT}</p>
          <SiteFooter />
        </TooltipProvider>
      </body>
    </html>
  );
}
