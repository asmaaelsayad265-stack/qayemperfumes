import BrandHeader from "../BrandHeader";
import BrandFooter from "../BrandFooter";
import FloatingWhatsApp from "../FloatingWhatsApp";

export default function PublicShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg0 text-text luxury-grain">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top,rgba(200,162,74,0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent_20%,transparent_80%,rgba(0,0,0,0.18))]" />
      <a href="#main-content" className="skip-link">
        تخطي إلى المحتوى
      </a>
      <BrandHeader />

      <div className="relative pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_50%_0%,rgba(200,162,74,0.18),transparent_60%)]" />
        <main id="main-content" className="relative mx-auto w-full max-w-6xl px-4 py-6 min-h-[60vh]">
          {children}
        </main>
      </div>

      <FloatingWhatsApp />
      <BrandFooter />
    </div>
  );
}

