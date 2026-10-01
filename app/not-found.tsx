import Link from "next/link";
import { Orbit } from "@/components/decor";

export default function NotFound() {
  return (
    <section className="grain mesh-plum relative overflow-hidden text-white">
      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <Orbit className="w-48 text-white" />
        <h1 className="font-heading mt-8 text-5xl">Sayfa bulunamadı</h1>
        <p className="mt-4 text-white/70">Aradığınız içerik taşınmış veya henüz yayınlanmamış olabilir.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-medium text-plum">
            Ana sayfa
          </Link>
          <Link
            href="/ara"
            className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-sm font-medium hover:bg-white/10"
          >
            Konu ara
          </Link>
        </div>
      </div>
    </section>
  );
}
