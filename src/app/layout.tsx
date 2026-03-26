import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

// ─── Site constants ───────────────────────────────────────────
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joaogabriel.vercel.app";
const siteTitle = "João Gabriel — Desenvolvedor Full-Stack";
const siteDescription =
  "Desenvolvedor Full-Stack com experiência em C#/.NET, Angular e SQL Server. Especializado em Java, Spring Boot 3 e TypeScript. Clean Architecture e boas práticas em cada entrega.";

// ─── JSON-LD Person schema ────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "João Gabriel Nascimento",
  jobTitle: "Desenvolvedor Full-Stack",
  url: siteUrl,
  email: "joaogabrielnb43@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Porto Alegre",
    addressRegion: "RS",
    addressCountry: "BR",
  },
  sameAs: [
    "https://github.com/joaogabriel43",
    "https://linkedin.com/in/joão-gabriel-borba",
  ],
  knowsAbout: [
    "Java",
    "Spring Boot",
    "C#",
    ".NET",
    "TypeScript",
    "Angular",
    "SQL Server",
    "PostgreSQL",
    "Clean Architecture",
    "REST API Design",
    "Docker",
    "Git",
  ],
};

// ─── Metadata ─────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | João Gabriel — Dev Full-Stack`,
  },
  description: siteDescription,
  keywords: [
    "Desenvolvedor Full-Stack",
    "Java",
    "Spring Boot",
    "C#",
    ".NET",
    "TypeScript",
    "Angular",
    "SQL Server",
    "Clean Architecture",
    "Porto Alegre",
    "Portfolio",
  ],
  authors: [{ name: "João Gabriel Nascimento" }],
  creator: "João Gabriel Nascimento",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: siteUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

// ─── Root Layout ──────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain bg-background text-foreground antialiased">
        {/* Skip to main content — accessible, visually hidden until focused */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-background focus:font-sans focus:text-sm focus:font-medium focus:rounded-sm"
        >
          Ir para o conteúdo principal
        </a>

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
