"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(true);

  /* Delayed entrance for a polished feel */
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  /* Auto-dismiss tooltip after 6 s */
  useEffect(() => {
    if (!visible || !tooltipOpen) return;
    const timer = setTimeout(() => setTooltipOpen(false), 6000);
    return () => clearTimeout(timer);
  }, [visible, tooltipOpen]);

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3 transition-all duration-700 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      {/* Tooltip bubble */}
      {tooltipOpen && (
        <div className="relative animate-fade-in-up rounded-2xl border border-gold/15 bg-bg1/95 px-4 py-2.5 shadow-luxury backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="whitespace-nowrap text-sm font-medium text-text">
              تواصل معنا عبر واتساب 💬
            </span>
            <button
              type="button"
              onClick={() => setTooltipOpen(false)}
              className="rounded-lg p-0.5 text-muted transition hover:text-text"
              aria-label="إغلاق التلميح"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-[5px] left-7 h-2.5 w-2.5 rotate-45 border-b border-r border-gold/15 bg-bg1/95" />
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href="https://wa.me/201063489799"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-[0_4px_20px_rgba(37,211,102,0.4)]"
        aria-label="تواصل معنا عبر واتساب — 201063489799+"
      >
        {/* Pulse ring */}
        <span className="whatsapp-ring pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/40" />
        <MessageCircle className="relative h-6 w-6" />
      </a>
    </div>
  );
}
