import type { Metadata } from "next";
import { connection } from "next/server";
import { Check, CircleDashed, LogOut, Loader, Trash2 } from "lucide-react";
import { PageHero } from "@/components/decor";
import { RoadmapAddForm, RoadmapLoginForm } from "@/components/roadmap-forms";
import { formatDate } from "@/lib/format";
import {
  isRoadmapStorageReady,
  readRoadmap,
  roadmapAreas,
  type RoadmapItem,
  type RoadmapStatus,
} from "@/lib/roadmap";
import { isRoadmapEditor, isRoadmapPasswordSet } from "@/lib/roadmap-auth";
import { cn } from "@/lib/utils";
import { logout, removeItem, setStatus } from "./actions";

export const metadata: Metadata = {
  title: "Yapılacaklar",
  description: "Platforma eklenmesi planlanan araçlar ve özellikler.",
  robots: { index: false },
};

const columns: { status: RoadmapStatus; title: string; tone: string; icon: typeof Check }[] = [
  { status: "bekliyor", title: "Bekliyor", tone: "bg-blush", icon: CircleDashed },
  { status: "yapiliyor", title: "Yapılıyor", tone: "bg-butter", icon: Loader },
  { status: "tamamlandi", title: "Tamamlandı", tone: "bg-sage", icon: Check },
];

export default async function RoadmapPage() {
  await connection();
  const [items, editor] = await Promise.all([readRoadmap(), isRoadmapEditor()]);
  const storageReady = isRoadmapStorageReady();
  const passwordSet = isRoadmapPasswordSet();
  const done = items.filter((item) => item.status === "tamamlandi").length;

  return (
    <>
      <PageHero
        eyebrow="Yapılacaklar"
        title={
          <>
            Platforma <em>eklenecekler</em> listesi.
          </>
        }
        description="Gebelik, doğum ve menopoz için planlanan araçlar. Durumlar güncellendikçe bu sayfa değişir."
        aside={
          <div className="rounded-[2rem] bg-white/70 p-6 text-plum ring-1 ring-border">
            <p className="font-heading text-5xl">
              {done}
              <span className="text-2xl text-plum/40"> / {items.length}</span>
            </p>
            <p className="mt-1 text-sm text-plum/60">madde tamamlandı</p>
          </div>
        }
      />

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-14 lg:px-8">
        {!storageReady || !passwordSet ? (
          <p className="rounded-3xl bg-butter/70 p-5 text-sm leading-relaxed text-plum">
            {`Düzenleme henüz açık değil: ${[
              !storageReady && "depolama bağlanmadı",
              !passwordSet && "düzenleme şifresi tanımlanmadı",
            ]
              .filter(Boolean)
              .join(", ")}. Aşağıdaki liste başlangıç listesidir.`}
          </p>
        ) : null}

        {editor ? (
          <div className="space-y-3">
            <RoadmapAddForm areas={roadmapAreas} />
            <form action={logout} className="flex justify-end">
              <button className="inline-flex items-center gap-1.5 text-sm text-plum/60 hover:text-plum">
                <LogOut className="size-4" /> Çıkış yap
              </button>
            </form>
          </div>
        ) : passwordSet ? (
          <div className="rounded-[2rem] border border-border/70 bg-white p-6 md:p-8">
            <p className="font-heading text-xl text-plum">Madde eklemek veya durum değiştirmek için giriş yap</p>
            <div className="mt-4 max-w-lg">
              <RoadmapLoginForm />
            </div>
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-3">
          {columns.map((column) => {
            const columnItems = items.filter((item) => item.status === column.status);
            return (
              <section key={column.status} className={cn("grain relative overflow-hidden rounded-[2rem] p-5", column.tone)}>
                <h2 className="relative z-10 flex items-center justify-between px-2 pt-1 text-plum">
                  <span className="font-heading inline-flex items-center gap-2 text-2xl">
                    <column.icon className="size-5" /> {column.title}
                  </span>
                  <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-sm">{columnItems.length}</span>
                </h2>
                <ul className="relative z-10 mt-5 space-y-3">
                  {columnItems.map((item) => (
                    <RoadmapCard key={item.id} item={item} editor={editor && storageReady} />
                  ))}
                  {columnItems.length === 0 ? (
                    <li className="rounded-2xl border border-dashed border-plum/20 p-5 text-center text-sm text-plum/50">
                      Bu sütunda madde yok.
                    </li>
                  ) : null}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

function RoadmapCard({ item, editor }: { item: RoadmapItem; editor: boolean }) {
  return (
    <li className="rounded-2xl bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs text-plum/70 ring-1 ring-border">{item.area}</span>
        <span className="text-xs text-plum/40">{formatDate(item.createdAt)}</span>
      </div>
      <h3 className={cn("font-heading mt-3 text-lg leading-snug text-plum", item.status === "tamamlandi" && "line-through decoration-plum/30")}>
        {item.title}
      </h3>
      {item.note ? <p className="mt-2 text-sm leading-relaxed text-plum/70">{item.note}</p> : null}
      {editor ? (
        <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-3">
          {columns
            .filter((column) => column.status !== item.status)
            .map((column) => (
              <form key={column.status} action={setStatus}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="status" value={column.status} />
                <button className="rounded-full bg-cream px-3 py-1 text-xs text-plum ring-1 ring-border hover:bg-blush">
                  {column.title}
                </button>
              </form>
            ))}
          <form action={removeItem} className="ml-auto">
            <input type="hidden" name="id" value={item.id} />
            <button aria-label={`${item.title} maddesini sil`} className="rounded-full p-1.5 text-plum/40 hover:bg-destructive/10 hover:text-destructive">
              <Trash2 className="size-4" />
            </button>
          </form>
        </div>
      ) : null}
    </li>
  );
}
