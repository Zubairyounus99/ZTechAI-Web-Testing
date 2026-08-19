import React from "react";
import { Metadata } from "next";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { Integrations } from "@/components/sections/Integrations";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Layers } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig(getServerRuntimeConfig());
  return {
    title: `AI Voice Integrations — CRM, Practice Software & Calendars | ${config.name}`,
    description:
      `Connect ${config.name} voice agents with ServiceTitan, Jobber, Housecall Pro, Google Calendar, Outlook, Dentrix, HubSpot, Follow Up Boss, and Zapier with zero friction.`,
    alternates: { canonical: `${config.siteUrl}/integrations` },
    openGraph: {
      title: `AI Voice Integrations — CRM & Calendar Ecosystem | ${config.name}`,
      description:
        "Explore seamless integrations with your existing phone carriers, calendars, and CRM software.",
      url: `${config.siteUrl}/integrations`,
      type: "website",
    },
  };
}

export default function IntegrationsPage() {
  const siteConfig = getSiteConfig(getServerRuntimeConfig());
  const pageUrl = `${siteConfig.siteUrl}/integrations`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.siteUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Integrations",
            "item": pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="pt-28 pb-20 space-y-24 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
          <Layers className="h-3.5 w-3.5" />
          <span>Unified Compatibility</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Connected to Your <span className="text-brand-500 dark:text-brand-400">Business Systems.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          Zero friction. Keep your existing phone numbers, calendar software, and CRM while our AI handles the real-time phone communications layer.
        </p>
      </section>

      <Integrations />
      <LeadCaptureForm />
      <FaqSection />
      <FinalCta />
    </div>
  );
}
