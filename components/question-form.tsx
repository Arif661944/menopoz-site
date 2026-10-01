"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { moderateText } from "@/lib/moderation";

const categories = [
  "Gebelik",
  "Doğum",
  "Doğum Sonrası",
  "Menopoz",
  "Jinekoloji",
  "Hormonal Sağlık",
];

const ages = ["Belirtmek istemiyorum", "18–29", "30–39", "40–49", "50–59", "60+"];

export function QuestionForm() {
  const [anonymous, setAnonymous] = useState(true);
  const [consent, setConsent] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl bg-secondary p-6">
        <h2 className="font-heading text-2xl">Sorunuz alındı</h2>
        <p className="mt-2 text-sm leading-relaxed">
          Moderasyon ve tıbbi uygunluk kontrolünden sonra yayınlanabilir. Bu
          akış acil bakım yerine geçmez. Acil şikâyetiniz varsa 112’yi arayın.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!consent) {
          setWarnings(["Göndermeden önce onay kutusunu işaretleyin."]);
          return;
        }
        const text = `${data.get("title") ?? ""} ${data.get("body") ?? ""}`;
        const result = moderateText(text);
        if (!result.ok) {
          setWarnings(result.warnings);
          return;
        }
        setWarnings([]);
        setSubmitted(true);
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="title">Soru başlığı</Label>
        <Input id="title" name="title" required maxLength={140} placeholder="Örn. Menopozda gece terlemeleri normal midir?" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">Sorunuz</Label>
        <Textarea
          id="body"
          name="body"
          required
          rows={6}
          placeholder="Genel bir sağlık sorusu yazın. Tanı, tahlil sonucu veya ilaç dozunu paylaşmayın."
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <select
            id="category"
            name="category"
            required
            className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Yaş aralığı (isteğe bağlı)</Label>
          <select
            id="age"
            name="age"
            className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            {ages.map((age) => (
              <option key={age}>{age}</option>
            ))}
          </select>
        </div>
      </div>
      <label className="flex items-start gap-2 text-sm">
        <Checkbox
          checked={anonymous}
          onCheckedChange={(value) => setAnonymous(Boolean(value))}
        />
        <span>
          <strong>Anonim soru.</strong> Adınız yayınlanmaz. Hassas konularda bunu
          öneririz.
        </span>
      </label>
      {anonymous ? null : (
        <div className="space-y-2">
          <Label htmlFor="name">Görünen ad</Label>
          <Input id="name" name="name" maxLength={40} />
        </div>
      )}
      <div className="rounded-xl bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
        <p className="font-medium text-foreground">Gizlilik uyarısı</p>
        <p className="mt-1">
          Telefon, adres, kimlik bilgisi, tahlil fotoğrafı veya özel tıbbi kayıt
          paylaşmayın. Paylaştığınız metin moderasyon sonrası herkese açık
          olabilir.
        </p>
      </div>
      <label className="flex items-start gap-2 text-sm">
        <Checkbox
          checked={consent}
          onCheckedChange={(value) => setConsent(Boolean(value))}
        />
        <span>
          Bu sorunun tıbbi tavsiye yerine geçmediğini, acil durumda 112’yi
          aramam gerektiğini ve gizlilik uyarısını okuduğumu onaylıyorum.
        </span>
      </label>
      {warnings.length > 0 ? (
        <ul className="space-y-1 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      ) : null}
      <Button type="submit" size="lg">
        Soruyu gönder
      </Button>
    </form>
  );
}
