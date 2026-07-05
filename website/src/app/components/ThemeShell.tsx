import type React from "react";

export default function ThemeShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-bg0 text-text">{children}</div>;
}

