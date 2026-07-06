export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`luxury-card luxury-card-hover rounded-3xl border border-gold/15 p-4 ${className}`}>
      {children}
    </div>
  );
}

