import React from "react";
import { Metadata } from "next";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { MissedCallStory } from "@/components/sections/MissedCallStory";
import { BusinessImpact } from "@/components/sections/BusinessImpact";
import { Capabilities } from "@/components/sections/Capabilities";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Bot } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig(getServerRuntimeConfig());
  return {
    title: `24/7 AI Receptionist for Local Businesses | ${config.name}`,
    description:
      `Never miss another customer call. ${config.name}'s 24/7 AI receptionist answers on ring 1, screens urgent requests, books appointments, and syncs notes to your CRM.`,
    alternates: { canonical: `${config.siteUrl}/ai-receptionist` },
    openGraph: {
      title: `24/7 AI Receptionist for Local Businesses | ${config.name}`,
      description:
        "24/7 front-desk coverage. Instant call answering, appointment booking, and CRM logging without hiring more staff.",
      url: `${config.siteUrl}/ai-receptionist`,
      type: "website",
    },
  };
}

export default function AiReceptionistPage() {
  const siteConfig = getSiteConfig(getServerRuntimeConfig());
  const pageUrl = `${siteConfig.siteUrl}/ai-receptionist`;

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
            "name": "AI Receptionist",
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        "name": "24/7 AI Front-Desk Receptionist",
        "serviceType": "Telephony Customer Service Automation",
        "provider": {
          "@type": "Organization",
          "name": "ZTechAI",
          "url": siteConfig.siteUrl,
        },
        "description":
          "24/7 automated telephone reception answering on ring 1, triaging urgent calls, and scheduling customer bookings.",
        "areaServed": {
          "@type": "Country",
          "name": "United States",
        },
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
          <Bot className="h-3.5 w-3.5" />
          <span>24/7 Front-Desk Coverage</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          An AI Receptionist That{" "}
          <span className="text-brand-500 dark:text-brand-400">Never Sleeps, Steps Out, or Misses a Ring.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          Give every customer immediate attention day or night. Handle peak morning rushes, after-hours emergencies, and lunch-break overflow with conversational ease.
        </p>
      </section>

      <MissedCallStory />
      <BusinessImpact />
      <Capabilities />
      <LeadCaptureForm />
      <FaqSection />
      <FinalCta />
    </div>
  );
}
