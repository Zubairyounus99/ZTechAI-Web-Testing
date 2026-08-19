import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ConfigProvider } from "@/components/providers/ConfigProvider";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07090e" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "ZTechAI — Custom AI Voice Agents & AI Receptionists for US Local Businesses",
    template: "%s | ZTechAI",
  },
  description:
    "Turn every customer call into an opportunity. Custom AI voice agents that answer calls on ring 1, qualify leads, book appointments, send SMS reminders, and provide 24/7 front-desk coverage for US businesses.",
  keywords: [
    "AI voice agents",
    "AI receptionist",
    "AI phone answering service",
    "AI appointment booking",
    "AI lead qualification",
    "AI voice agent for small business",
    "AI receptionist for dental",
    "AI answering service for HVAC",
    "plumbing AI dispatch",
    "roofing AI inspection booking",
    "real estate AI voice agent",
    "business phone automation",
    "24/7 AI call answering",
    "AI phone agent US",
  ],
  authors: [{ name: "ZTechAI Inc.", url: siteConfig.siteUrl }],
  creator: "ZTechAI Inc.",
  publisher: "ZTechAI Inc.",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    title: "ZTechAI — Custom AI Voice Agents & Phone Automation for US Businesses",
    description:
      "Deploy custom AI voice agents that answer calls instantly, qualify customer intent, lock calendar bookings, and sync with your business CRM 24/7.",
    siteName: "ZTechAI",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "ZTechAI Voice Platform Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ZTechAI — Custom AI Voice Agents & AI Receptionists",
    description:
      "Custom conversational voice agents for American businesses that answer on ring 1, book appointments, and capture every revenue opportunity.",
    images: ["/icon.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  verification: {
    google: siteConfig.analytics.gscVerification || undefined,
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US",
        },
        "sameAs": Object.values(siteConfig.socialLinks).filter(Boolean),
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": siteConfig.phone,
            "contactType": "customer service",
            "email": siteConfig.email,
            "areaServed": "US",
            "availableLanguage": "English",
          },
        ],
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

  const runtimeEnvPayload = {
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || "ZTechAI",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://ztechai.us",
    NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "",
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "admin@ztechai.us",
    NEXT_PUBLIC_CONTACT_PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+1 (321) 499-87777",
    NEXT_PUBLIC_CAL_BOOKING_URL:
      process.env.NEXT_PUBLIC_CAL_BOOKING_URL ||
      process.env.NEXT_PUBLIC_CALCOM_URL ||
      "https://cal.com/zubair-younus-4tlv0b/ai-voice-agent",
    NEXT_PUBLIC_CAL_EMBED_URL: process.env.NEXT_PUBLIC_CAL_EMBED_URL || "",
    NEXT_PUBLIC_AI_COST_PER_MINUTE:
      process.env.NEXT_PUBLIC_AI_COST_PER_MINUTE || process.env.AI_COST_PER_MINUTE || "0.30",
    NEXT_PUBLIC_LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/ztechai",
    NEXT_PUBLIC_YOUTUBE_URL: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
    NEXT_PUBLIC_FACEBOOK_URL: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    NEXT_PUBLIC_INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    NEXT_PUBLIC_WHATSAPP_URL: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || "G-H57HRPFNJ9",
    NEXT_PUBLIC_GSC_VERIFICATION: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Live Container Runtime Environment Injection for Dokploy */}
        <script
          id="app-runtime-env"
          dangerouslySetInnerHTML={{
            __html: `window.__APP_ENV__ = ${JSON.stringify(runtimeEnvPayload)};`,
          }}
        />

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H57HRPFNJ9"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-H57HRPFNJ9', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
        <ConfigProvider initialConfig={siteConfig}>
          <ThemeProvider>
            <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
