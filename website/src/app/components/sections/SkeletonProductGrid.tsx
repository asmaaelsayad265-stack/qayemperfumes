export default function SkeletonProductGrid({
  count = 9,
}: {
  count?: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">

      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-3xl border border-gold/15 bg-surface/60 p-4"
        >
          <div className="aspect-[3/2] w-full rounded-2xl bg-bg1/40" />
          <div className="mt-3 h-4 w-2/3 rounded-full bg-bg1/40" />
          <div className="mt-2 h-3 w-1/3 rounded-full bg-bg1/40" />
          <div className="mt-4 h-10 w-full rounded-2xl bg-bg1/40" />
        </div>
      ))}
    </div>
  );
}

