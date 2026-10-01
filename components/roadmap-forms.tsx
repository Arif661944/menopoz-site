"use client";

import { useActionState, useEffect, useRef } from "react";
import { KeyRound, Plus } from "lucide-react";
import { addItem, login, type FormState } from "@/app/yapilacaklar/actions";

const fieldClass =
  "w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-plum outline-none transition-shadow placeholder:text-plum/40 focus:border-rose/50 focus:ring-4 focus:ring-rose/10";

export function RoadmapLoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});

  return (
    <form action={action} className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <label className="grid flex-1 gap-1.5 text-sm font-medium text-plum">
        <span className="sr-only">Düzenleme şifresi</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Düzenleme şifresi"
          className={fieldClass}
        />
        {state.error ? <span className="text-sm font-normal text-destructive">{state.error}</span> : null}
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-plum px-6 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        <KeyRound className="size-4" /> {pending ? "Kontrol ediliyor…" : "Giriş yap"}
      </button>
    </form>
  );
}

export function RoadmapAddForm({ areas }: { areas: readonly string[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(addItem, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={action}
      className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft md:p-8"
    >
      <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">Yeni madde</p>
      <h2 className="font-heading mt-2 text-2xl text-plum md:text-3xl">Listeye bir şey ekle</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_0.45fr]">
        <label className="grid gap-2 text-sm font-medium text-plum">
          Başlık
          <input name="title" required maxLength={140} placeholder="Örn. Emzirme günlüğü" className={fieldClass} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-plum">
          Alan
          <select name="area" defaultValue="Genel" className={fieldClass}>
            {areas.map((area) => (
              <option key={area}>{area}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-medium text-plum">
        Not <span className="font-normal text-muted-foreground">(isteğe bağlı)</span>
        <textarea name="note" rows={3} maxLength={600} placeholder="Ne yapmalı, neden önemli?" className={`${fieldClass} resize-y`} />
      </label>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="min-h-5 text-sm" role="status">
          {state.error ? <span className="text-destructive">{state.error}</span> : null}
          {state.ok ? <span className="text-plum/70">Eklendi.</span> : null}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-rose px-7 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          <Plus className="size-4" /> {pending ? "Ekleniyor…" : "Ekle"}
        </button>
      </div>
    </form>
  );
}
