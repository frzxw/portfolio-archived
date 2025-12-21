import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/theme/Providers";
import { portfolio } from "@/mock/portfolio";

// Optimized font loading - only load weights we actually use
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"], // Only needed weights
  adjustFontFallback: true, // Faster fallback rendering
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Not critical for LCP
  weight: ["400"],
  adjustFontFallback: true,
});

// Viewport configuration for mobile
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: `${portfolio.name} — ${portfolio.tagline}`,
    template: `%s — ${portfolio.name}`,
  },
  description:
    `${portfolio.tagline}. Computer Science undergraduate at Universitas Pendidikan Indonesia. Based in Indonesia; open to internships and recruiter outreach.`,
  applicationName: `${portfolio.name} Portfolio`,
  authors: [{ name: portfolio.name }],
  creator: portfolio.name,
  publisher: portfolio.name,
  category: "Technology",
  keywords: [
    portfolio.name,
    "Full-Stack Engineer",
    "Full Stack Developer",
    "Software Engineer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Bun",
    "NestJS",
    "Backend Engineer",
    "Frontend Engineer",
    "Web Developer",
    "Indonesia",
    "Bandung",
    "Universitas Pendidikan Indonesia",
    "UPI",
    "Computer Science Undergraduate",
    "Mahasiswa Ilmu Komputer",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: `${portfolio.name} — ${portfolio.tagline}`,
    description:
      `${portfolio.tagline}. Computer Science undergraduate at Universitas Pendidikan Indonesia.`,
    siteName: `${portfolio.name} Portfolio`,
    locale: "en_US",
    alternateLocale: ["id_ID"],
  },
  twitter: {
    card: "summary",
    title: `${portfolio.name} — ${portfolio.tagline}`,
    description:
      `${portfolio.tagline}. Computer Science undergraduate at Universitas Pendidikan Indonesia.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.name,
    jobTitle: portfolio.tagline,
    description:
      `${portfolio.tagline}. Computer Science undergraduate at Universitas Pendidikan Indonesia.`,
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Bun",
      "NestJS",
      "Web Development",
      "Backend Engineering",
      "Frontend Engineering",
      "API Design",
      "Software Engineering",
    ],
    inLanguage: ["en", "id"],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Universitas Pendidikan Indonesia",
        alternateName: "UPI",
      },
    ],
    address: {
      "@type": "Country",
      name: "Indonesia",
    },
    sameAs: portfolio.socials.map((s) => s.href),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${portfolio.name} Portfolio`,
    description:
      `${portfolio.tagline}. Computer Science undergraduate at Universitas Pendidikan Indonesia.`,
    inLanguage: ["en", "id"],
    publisher: {
      "@type": "Person",
      name: portfolio.name,
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Critical CSS for mobile LCP - inlined for faster first paint */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              h1{font-size:clamp(2.75rem,7vw,4.75rem);font-weight:700;letter-spacing:-0.03em}
              .app-shell{min-height:100svh}
              .centered{width:100%;max-width:880px;margin-inline:auto;padding-inline:clamp(1rem,3vw,1.5rem)}
            `,
          }}
        />

        {/* Inline theme script to prevent FOUC - runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme'),d=matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.dataset.theme=t||(d?'dark':'light')}catch{}`,
          }}
        />

        {/* Low-priority prefetch for 3D assets (loaded after LCP) */}
        <link rel="prefetch" href="/assets/tag.glb" as="fetch" crossOrigin="anonymous" />
        <link rel="prefetch" href="/assets/band.avif" as="image" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} app-shell`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
