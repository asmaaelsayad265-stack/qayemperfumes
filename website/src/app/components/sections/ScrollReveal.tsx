"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("reveal--in");
          }
        }
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

