import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WorkflowVisualizer } from "@/components/sections/WorkflowVisualizer";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works — AI Voice Agent Deployment & Implementation | ZTechAI",
  description:
    "Explore our 6-step engineering protocol: Knowledge intake, AI voice configuration, CRM/calendar integration, edge-case testing, launch, and continuous improvement.",
  alternates: { canonical: `${siteConfig.siteUrl}/how-it-works` },
  openGraph: {
    title: "How It Works — AI Voice Agent Deployment | ZTechAI",
    description:
      "See how ZTechAI deploys custom AI voice agents into your existing phone and calendar systems in 5 to 10 days.",
    url: `${siteConfig.siteUrl}/how-it-works`,
    type: "website",
  },
};

export default function HowItWorksPage() {
  const pageUrl = `${siteConfig.siteUrl}/how-it-works`;

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
            "name": "How It Works",
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${pageUrl}/#howto`,
        "name": "How to Deploy a Custom AI Voice Agent for Your Business",
        "description":
          "A 6-stage engineering roadmap from discovery call to live phone answering deployment.",
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
          <Workflow className="h-3.5 w-3.5" />
          <span>Proven 6-Stage Engineering Process</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          From Discovery Call to Live Answering in{" "}
          <span className="text-brand-500 dark:text-brand-400">5 to 10 Days.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          We do not hand you a blank dashboard and tell you to figure it out. We engineer, integrate, test, and maintain your AI phone agents as a managed service.
        </p>
      </section>

      <HowItWorks />
      <WorkflowVisualizer />
      <LeadCaptureForm />
      <FaqSection />
      <FinalCta />
    </div>
  );
}
