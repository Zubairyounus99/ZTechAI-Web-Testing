import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Capabilities } from "@/components/sections/Capabilities";
import { WorkflowVisualizer } from "@/components/sections/WorkflowVisualizer";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Voice Agents for US Businesses | ZTechAI Phone Automation",
  description:
    "Deploy custom conversational AI voice agents that answer inbound calls on the first ring, qualify caller intent, book appointments on your calendar, and sync with your CRM 24/7.",
  alternates: { canonical: `${siteConfig.siteUrl}/ai-voice-agents` },
  openGraph: {
    title: "AI Voice Agents for US Businesses | ZTechAI Phone Automation",
    description:
      "Deploy custom conversational AI voice agents that answer calls on ring one, qualify leads, and schedule appointments 24/7.",
    url: `${siteConfig.siteUrl}/ai-voice-agents`,
    type: "website",
  },
};

export default function AiVoiceAgentsPage() {
  const pageUrl = `${siteConfig.siteUrl}/ai-voice-agents`;

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
            "name": "AI Voice Agents",
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        "name": "Custom AI Voice Agents",
        "serviceType": "Conversational Phone Automation",
        "provider": {
          "@type": "Organization",
          "name": "ZTechAI",
          "url": siteConfig.siteUrl,
        },
        "description":
          "Intelligent, low-latency AI voice agents configured for US businesses to answer customer calls, qualify leads, and book calendar appointments.",
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
          <PhoneCall className="h-3.5 w-3.5" />
          <span>Next-Generation Phone Automation</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Custom AI Voice Agents Built for{" "}
          <span className="text-brand-500 dark:text-brand-400">Real Business Operations.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          Not a basic text bot or rigid phone tree. A fully conversational voice employee that answers inbound calls on ring one, qualifies leads, schedules appointments, and sends confirmations 24/7.
        </p>
      </section>

      <Capabilities />
      <WorkflowVisualizer />
      <LeadCaptureForm />
      <FaqSection />
      <FinalCta />
    </div>
  );
}
