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
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-50";

  const styles =
    variant === "primary"
      ? "bg-gold text-black shadow-luxury"
      : "border border-gold/40 bg-transparent text-text";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}

