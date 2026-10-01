"use client";

import { useActionState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { addItem, login, type FormState } from "@/app/yapilacaklar/actions";

const fieldClass =
  "h-10 rounded-xl border border-border bg-white px-3 text-sm text-plum outline-none placeholder:text-plum/40 focus:border-rose/50 focus:ring-2 focus:ring-rose/15";

export function RoadmapLoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});

  return (
    <form action={action} className="flex items-center gap-2">
      {state.error ? <span className="text-sm text-destructive">{state.error}</span> : null}
      <input
        name="password"
        type="password"
        required
        autoComplete="current-password"
        placeholder="Şifre"
        aria-label="Düzenleme şifresi"
        className={`${fieldClass} w-36`}
      />
      <button
        type="submit"
        disabled={pending}
        className="h-10 rounded-xl bg-plum px-4 text-sm font-medium text-white hover:bg-rose disabled:opacity-60"
      >
        {pending ? "…" : "Giriş"}
      </button>
    </form>
  );
}

export function RoadmapAddForm({ areas }: { areas: readonly string[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(addItem, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      formRef.current?.querySelector<HTMLInputElement>("input[name=title]")?.focus();
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto_auto]">
      <input name="title" required maxLength={140} placeholder="Yeni madde" aria-label="Başlık" className={fieldClass} />
      <input name="note" maxLength={600} placeholder="Not (isteğe bağlı)" aria-label="Not" className={fieldClass} />
      <select name="area" defaultValue="Genel" aria-label="Alan" className={fieldClass}>
        {areas.map((area) => (
          <option key={area}>{area}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-rose px-4 text-sm font-medium text-white hover:bg-plum disabled:opacity-60"
      >
        <Plus className="size-4" /> Ekle
      </button>
      {state.error ? <p className="text-sm text-destructive sm:col-span-4">{state.error}</p> : null}
    </form>
  );
}
