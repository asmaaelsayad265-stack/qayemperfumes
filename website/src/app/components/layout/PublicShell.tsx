import BrandHeader from "../BrandHeader";
import BrandFooter from "../BrandFooter";

export default function PublicShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg0 text-text">
      <a href="#main-content" className="skip-link">
        تخطي إلى المحتوى
      </a>
      <BrandHeader />

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_50%_0%,rgba(200,162,74,0.18),transparent_60%)]" />
        <main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-6">
          {children}
        </main>
      </div>

      <BrandFooter />
    </div>
  );
}

