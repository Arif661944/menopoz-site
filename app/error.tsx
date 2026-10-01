"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-heading text-4xl">Bir şeyler ters gitti</h1>
      <p className="mt-3 text-muted-foreground">
        Sayfa yüklenirken bir sorun oluştu. Yeniden deneyebilirsiniz.
      </p>
      <Button className="mt-6" onClick={() => reset()}>
        Yeniden dene
      </Button>
    </div>
  );
}
