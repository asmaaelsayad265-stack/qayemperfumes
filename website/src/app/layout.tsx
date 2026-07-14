import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qayem-perfumes.example";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "QAYEM Perfumes",
  category: "shopping",
  title: {
    default: "قَيَّم للعطور | QAYEM Perfumes",
    template: "%s | QAYEM Perfumes",
  },
  description: "عطور فاخرة بتجربة عربية راقية من قَيَّم للعطور.",
  keywords: [
    "QAYEM Perfumes",
    "قَيَّم للعطور",
    "luxury perfume",
    "عطور فاخرة",
    "perfume store",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "QAYEM Perfumes",
    title: "قَيَّم للعطور | QAYEM Perfumes",
    description: "عطور فاخرة بتجربة عربية راقية من قَيَّم للعطور.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/file.svg`,
        width: 1200,
        height: 630,
        alt: "QAYEM Perfumes luxury fragrance experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "قَيَّم للعطور | QAYEM Perfumes",
    description: "عطور فاخرة بتجربة عربية راقية من قَيَّم للعطور.",
    images: [`${siteUrl}/file.svg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },

};

export const viewport = {
  themeColor: "#050505",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QAYEM Perfumes",
  alternateName: "قَيَّم للعطور",
  url: siteUrl,
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg0 text-text">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}

