"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const reasons = [
  { id: "misinfo", label: "Tıbbi yanlış bilgi" },
  { id: "danger", label: "Potansiyel tehlikeli tıbbi tavsiye" },
  { id: "inappropriate", label: "Uygunsuz içerik" },
  { id: "harassment", label: "Taciz" },
  { id: "spam", label: "Spam veya reklam" },
  { id: "privacy", label: "Kişisel bilgi paylaşımı" },
];

export function ReportDialog({ target }: { target: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <Flag className="size-3.5" />
        Bildir
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>İçeriği bildir</DialogTitle>
          <DialogDescription>
            “{target}” için neden bildirdiğinizi seçin. Bildirimler yalnızca
            moderasyon ekibine gider.
          </DialogDescription>
        </DialogHeader>
        {sent ? (
          <p className="text-sm">Teşekkürler. Bildiriminiz incelemeye alındı.</p>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Neden</legend>
              {reasons.map((reason) => (
                <label key={reason.id} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="reason" value={reason.id} required />
                  {reason.label}
                </label>
              ))}
            </fieldset>
            <div className="space-y-2">
              <Label htmlFor="note">Ek not (isteğe bağlı)</Label>
              <Textarea id="note" name="note" rows={3} />
            </div>
            <Button type="submit">Bildirimi gönder</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
