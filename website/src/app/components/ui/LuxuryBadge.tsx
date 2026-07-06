type Props = {
  label: string;
  variant?: "best" | "limited" | "new" | "summer";
};

export default function LuxuryBadge({
  label,
  variant = "best",
}: Props) {
  const map: Record<string, string> = {
    best: "border-gold/25 bg-gold/10 text-gold",
    limited: "border-rose-400/25 bg-rose-400/10 text-rose-200",
    new: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
    summer: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  };

  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] " +
        (map[variant] ?? map.best)
      }
    >
      {label}
    </span>
  );
}

