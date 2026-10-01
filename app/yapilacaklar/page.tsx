import type { Metadata } from "next";
import { connection } from "next/server";
import { Check, LogOut, X } from "lucide-react";
import { RoadmapAddForm, RoadmapLoginForm } from "@/components/roadmap-forms";
import { isRoadmapStorageReady, readRoadmap, roadmapAreas, type RoadmapItem } from "@/lib/roadmap";
import { isRoadmapEditor, isRoadmapPasswordSet } from "@/lib/roadmap-auth";
import { cn } from "@/lib/utils";
import { logout, removeItem, setStatus } from "./actions";

export const metadata: Metadata = {
  title: "Yapılacaklar",
  robots: { index: false },
};

export default async function RoadmapPage() {
  await connection();
  const [items, isEditor] = await Promise.all([readRoadmap(), isRoadmapEditor()]);
  const editor = isEditor && isRoadmapStorageReady();
  const todo = items.filter((item) => item.status !== "tamamlandi");
  const done = items.filter((item) => item.status === "tamamlandi");

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-3xl text-plum">
          Yapılacaklar{" "}
          <span className="text-lg text-plum/40">
            {done.length}/{items.length}
          </span>
        </h1>
        {isEditor ? (
          <form action={logout}>
            <button className="inline-flex items-center gap-1.5 text-sm text-plum/50 hover:text-plum">
              <LogOut className="size-4" /> Çıkış
            </button>
          </form>
        ) : isRoadmapPasswordSet() ? (
          <RoadmapLoginForm />
        ) : null}
      </header>

      {editor ? (
        <div className="mt-4">
          <RoadmapAddForm areas={roadmapAreas} />
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <RoadmapList title="Yapılacak" items={todo} editor={editor} />
        <RoadmapList title="Yapıldı" items={done} editor={editor} />
      </div>
    </div>
  );
}

function RoadmapList({ title, items, editor }: { title: string; items: RoadmapItem[]; editor: boolean }) {
  return (
    <section className="rounded-2xl border border-border/70 bg-white">
      <h2 className="flex items-center justify-between border-b border-border/70 px-4 py-2.5 text-sm font-medium text-plum">
        {title}
        <span className="text-plum/40">{items.length}</span>
      </h2>
      {items.length === 0 ? (
        <p className="px-4 py-6 text-center text-sm text-plum/40">Boş</p>
      ) : (
        <ul className="divide-y divide-border/60">
          {items.map((item) => (
            <RoadmapRow key={item.id} item={item} editor={editor} />
          ))}
        </ul>
      )}
    </section>
  );
}

function RoadmapRow({ item, editor }: { item: RoadmapItem; editor: boolean }) {
  const isDone = item.status === "tamamlandi";
  const box = (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-md border",
        isDone ? "border-sage bg-sage text-plum" : "border-plum/25 bg-white",
      )}
    >
      {isDone ? <Check className="size-3.5" /> : null}
    </span>
  );

  return (
    <li className="group flex items-start gap-3 px-4 py-2.5">
      {editor ? (
        <form action={setStatus} className="pt-0.5">
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="status" value={isDone ? "bekliyor" : "tamamlandi"} />
          <button aria-label={isDone ? "Yapılacak olarak işaretle" : "Yapıldı olarak işaretle"} className="block">
            {box}
          </button>
        </form>
      ) : (
        <span className="pt-0.5">{box}</span>
      )}
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-medium text-plum", isDone && "text-plum/45 line-through")}>
          {item.title}
          <span className="ml-2 align-middle text-[11px] font-normal text-plum/40">{item.area}</span>
        </p>
        {item.note ? (
          <p className="truncate text-xs text-plum/55" title={item.note}>
            {item.note}
          </p>
        ) : null}
      </div>
      {editor ? (
        <form action={removeItem}>
          <input type="hidden" name="id" value={item.id} />
          <button
            aria-label={`${item.title} maddesini sil`}
            className="rounded-md p-1 text-plum/25 hover:bg-destructive/10 hover:text-destructive sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
          >
            <X className="size-4" />
          </button>
        </form>
      ) : null}
    </li>
  );
}
