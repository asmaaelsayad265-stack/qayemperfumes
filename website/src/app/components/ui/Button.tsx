import type React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-50";

  const styles =
    variant === "primary"
      ? "border border-transparent bg-[linear-gradient(135deg,var(--gold),var(--gold-2))] text-black shadow-luxury hover:brightness-105"
      : "border border-gold/30 bg-bg1/35 text-text backdrop-blur-xl hover:border-gold/55 hover:bg-bg1/55";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}

