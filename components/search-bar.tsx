import { ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const examples = [
  "Gebelikte mide bulantısı",
  "Doğum ne zaman başlar?",
  "Hastane çantası",
  "Emzirme",
  "Gebelikte beslenme",
  "Doğum sonrası kanama",
];

export function SearchBar({
  large = false,
  defaultValue = "",
  tone = "light",
}: {
  large?: boolean;
  defaultValue?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <form action="/ara" method="get" className="w-full">
      <label htmlFor="q" className="sr-only">
        Konu ara
      </label>
      <div
        className={cn(
          "flex items-center gap-2 rounded-full p-1.5 transition-shadow focus-within:ring-4",
          dark
            ? "bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] focus-within:ring-white/20"
            : "border border-border bg-white shadow-sm focus-within:ring-rose/15",
        )}
      >
        <Search className="ml-4 size-5 shrink-0 text-rose" />
        <input
          id="q"
          name="q"
          defaultValue={defaultValue}
          placeholder="Hamilelik, doğum, emzirme… ne merak ediyorsun?"
          className={cn(
            "min-w-0 flex-1 bg-transparent text-plum outline-none placeholder:text-plum/45",
            large ? "h-12 text-base md:text-lg" : "h-10 text-sm",
          )}
        />
        <button
          type="submit"
          className={cn(
            "inline-flex shrink-0 items-center gap-2 rounded-full bg-plum font-medium text-white transition-colors hover:bg-rose",
            large ? "h-12 px-6" : "h-10 px-5 text-sm",
          )}
        >
          Ara <ArrowRight className="size-4" />
        </button>
      </div>
      {large ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className={dark ? "text-white/60" : "text-muted-foreground"}>Sık arananlar:</span>
          {examples.map((example) => (
            <a
              key={example}
              href={`/ara?q=${encodeURIComponent(example)}`}
              className={cn(
                "rounded-full px-3 py-1 transition-colors",
                dark
                  ? "bg-white/10 text-white/85 ring-1 ring-white/15 hover:bg-white/20"
                  : "bg-blush text-plum hover:bg-peach",
              )}
            >
              {example}
            </a>
          ))}
        </div>
      ) : null}
    </form>
  );
}
