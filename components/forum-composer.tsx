"use client";

import { useState } from "react";
import { CheckCircle2, EyeOff, ShieldCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { forumCategories } from "@/lib/content/forum";
import type { ForumCategory } from "@/lib/content/types";
import { moderateText } from "@/lib/moderation";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-2xl border border-border bg-cream/60 px-4 py-3 text-plum outline-none transition-shadow placeholder:text-plum/40 focus:border-rose/50 focus:ring-4 focus:ring-rose/10";

export function ForumComposer({
  mode = "thread",
  defaultCategory,
  className,
}: {
  mode?: "thread" | "reply";
  defaultCategory?: ForumCategory;
  className?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(true);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const isThread = mode === "thread";

  if (submitted) {
    return (
      <div className={cn("flex items-start gap-4 rounded-[2rem] bg-sage p-6 text-plum", className)} role="status">
        <CheckCircle2 className="mt-0.5 size-6 shrink-0" />
        <div>
          <p className="font-heading text-xl">Teşekkürler, paylaşımın moderasyon kuyruğuna alındı.</p>
          <p className="mt-1 text-sm text-plum/75">
            Yayınlanması otomatik değildir. Moderatörlerimiz topluluk kurallarına uygunluğunu kontrol eder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className={cn("rounded-[2rem] border border-border/70 bg-white p-6 shadow-soft md:p-8", className)}
      onSubmit={(event) => {
        event.preventDefault();
        if (!consent) {
          setConsentError(true);
          return;
        }
        const data = new FormData(event.currentTarget);
        const result = moderateText(`${data.get("title") ?? ""} ${data.get("body") ?? ""}`);
        if (!result.ok) {
          setWarnings(result.warnings);
          return;
        }
        setSubmitted(true);
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-rose uppercase">
            {isThread ? "Yeni konu" : "Yanıt yaz"}
          </p>
          <h2 className="font-heading mt-2 text-2xl text-plum md:text-3xl">
            {isThread ? "Deneyimini paylaş, soru sor" : "Bu sohbete katıl"}
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/60 px-3 py-1 text-xs text-plum">
          <ShieldCheck className="size-3.5" /> Yayından önce denetlenir
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        {isThread ? (
          <>
            <div className="grid gap-4 md:grid-cols-[1fr_0.6fr]">
              <label className="grid gap-2 text-sm font-medium text-plum">
                Kategori
                <select name="category" defaultValue={defaultCategory ?? forumCategories[1].slug} className={fieldClass}>
                  {forumCategories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium text-plum">
                Dönemin <span className="font-normal text-muted-foreground">(isteğe bağlı)</span>
                <input name="stage" placeholder="Örn. 24. hafta" className={fieldClass} />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium text-plum">
              Başlık
              <input name="title" required maxLength={120} placeholder="Konunu kısaca anlat" className={fieldClass} />
            </label>
          </>
        ) : null}
        <label className="grid gap-2 text-sm font-medium text-plum">
          {isThread ? "Metin" : "Yanıtın"}
          <textarea
            name="body"
            required
            rows={isThread ? 6 : 4}
            placeholder={
              isThread
                ? "Neler yaşıyorsun? Deneyimini paylaş. İlaç veya doz önerisi istemek yerine hekimine danış."
                : "Kendi deneyimini paylaş. Tanı koymaktan ve ilaç önermekten kaçın."
            }
            className={cn(fieldClass, "resize-y")}
          />
        </label>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <label
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm transition-colors",
            anonymous ? "border-plum bg-plum text-white" : "border-border text-plum",
          )}
        >
          <Checkbox
            checked={anonymous}
            onCheckedChange={(value) => setAnonymous(value === true)}
            className={anonymous ? "border-white" : undefined}
          />
          <EyeOff className="size-4" />
          <span>
            <span className="block font-medium">Anonim paylaş</span>
            <span className={cn("text-xs", anonymous ? "text-white/70" : "text-muted-foreground")}>
              Adın yerine “Anonim üye” görünür.
            </span>
          </span>
        </label>
        <label
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm text-plum",
            consentError && !consent ? "border-destructive" : "border-border",
          )}
        >
          <Checkbox
            checked={consent}
            onCheckedChange={(value) => {
              setConsent(value === true);
              setConsentError(false);
            }}
            className="mt-0.5"
          />
          <span>
            Paylaşımımın tıbbi tavsiye olmadığını, kişisel iletişim bilgisi içermediğini ve{" "}
            <a href="/topluluk-kurallari" className="text-rose underline-offset-2 hover:underline">
              topluluk kurallarına
            </a>{" "}
            uyduğunu onaylıyorum.
          </span>
        </label>
      </div>

      {consentError && !consent ? (
        <p className="mt-3 text-sm text-destructive">Göndermeden önce onay kutusunu işaretleyin.</p>
      ) : null}
      {warnings.length > 0 ? (
        <ul className="mt-4 space-y-1 rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">Acil bir durumda forum yerine 112’yi arayın.</p>
        <button
          type="submit"
          className="inline-flex h-12 items-center rounded-full bg-rose px-7 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          {isThread ? "Konuyu gönder" : "Yanıtı gönder"}
        </button>
      </div>
    </form>
  );
}
