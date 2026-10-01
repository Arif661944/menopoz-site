export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Yükleniyor">
      <div className="mesh-cream h-64 animate-pulse border-b border-border/60" />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-12 md:grid-cols-3 lg:px-8">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-56 animate-pulse rounded-[2rem] bg-blush/60" />
        ))}
      </div>
    </div>
  );
}
