export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8" aria-busy>
      <div className="h-9 w-48 animate-pulse rounded-lg bg-plum/5" />
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-2xl bg-plum/5" />
        <div className="h-80 animate-pulse rounded-2xl bg-plum/5" />
      </div>
    </div>
  );
}
