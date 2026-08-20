import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import { ConfigProvider } from "@/components/providers/ConfigProvider";
import {
  getServerRuntimeConfig,
  getSiteConfig,
} from "@/config/site";
import Script from "next/script";
import "./globals.css";

// Enforce dynamic server-side rendering for real-time environment variable hydration
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const viewport: Viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const runtimeEnv = getServerRuntimeConfig();
  const siteConfig = getSiteConfig(runtimeEnv);

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: `${siteConfig.name} — Custom AI Voice Agents for US Businesses`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      "AI voice agents",
      "AI receptionist",
      "AI answering service",
      "custom AI voice agent",
      "AI appointment booking",
      "AI lead qualification",
      "voice AI for local business",
      "AI voice agent US businesses",
      "24/7 AI call answering",
    ],
    authors: [{ name: `${siteConfig.name} Team` }],
    creator: `${siteConfig.name} Inc.`,
    publisher: `${siteConfig.name} Inc.`,
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.siteUrl,
      title: `${siteConfig.name} — Custom AI Voice Agents for US Businesses`,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Custom AI Voice Agents for US Businesses`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — Custom AI Voice Agents for US Businesses`,
      description: siteConfig.description,
      images: [`${siteConfig.siteUrl}/og-image.png`],
      creator: "@ztechai",
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
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-icon.png" }],
    },
    verification: siteConfig.analytics.gscVerification
      ? {
          google: siteConfig.analytics.gscVerification,
        }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Live server-evaluated configuration on every request
  const runtimeEnv = getServerRuntimeConfig();
  const siteConfig = getSiteConfig(runtimeEnv);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.siteUrl}/#organization`,
        "name": siteConfig.name,
        "legalName": siteConfig.legalName,
        "url": siteConfig.siteUrl,
        "logo": `${siteConfig.siteUrl}/icon.svg`,
        "description": siteConfig.description,
        "email": siteConfig.email,
        "telephone": siteConfig.phone,
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": siteConfig.phone,
            "contactType": "customer service",
            "email": siteConfig.email,
            "areaServed": "US",
            "availableLanguage": ["English", "Spanish"],
          },
        ],
        "sameAs": Object.values(siteConfig.socialLinks).filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        "url": siteConfig.siteUrl,
        "name": siteConfig.name,
        "publisher": {
          "@id": `${siteConfig.siteUrl}/#organization`,
        },
        "inLanguage": "en-US",
      },
      {
        "@type": "Service",
        "@id": `${siteConfig.siteUrl}/#service`,
        "name": "Custom AI Voice Agent & Receptionist Development",
        "provider": {
          "@id": `${siteConfig.siteUrl}/#organization`,
        },
        "areaServed": {
          "@type": "Country",
          "name": "United States",
        },
        "description":
          "Custom conversational AI voice agents configured for US businesses to handle inbound reception, qualification, appointment booking, and customer follow-up.",
      },
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Non-blocking asynchronous Google Fonts with fallback display */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics 4 - Loaded with lazyOnload to maximize Mobile PageSpeed & eliminate TBT */}
        {runtimeEnv.gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${runtimeEnv.gaId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${runtimeEnv.gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        ) : null}

        {/* Server Runtime Environment Injection */}
        <script
          id="app-runtime-env"
          dangerouslySetInnerHTML={{
            __html: `window.__APP_ENV__ = ${JSON.stringify(runtimeEnv)};`,
          }}
        />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
        <ConfigProvider initialRuntimeEnv={runtimeEnv}>
          <ThemeProvider>
            <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
