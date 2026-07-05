export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-gold/15 bg-surface/70 p-4 ${className}`}>
      {children}
    </div>
  );
}

