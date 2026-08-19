import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Capabilities } from "@/components/sections/Capabilities";
import { WorkflowVisualizer } from "@/components/sections/WorkflowVisualizer";
import { BusinessImpact } from "@/components/sections/BusinessImpact";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Inbound AI Lead Qualification & Caller Triage | ZTechAI",
  description:
    "Triage caller urgency, verify service areas, qualify project budgets, and route high-value leads directly to your top technicians or sales reps.",
  alternates: { canonical: `${siteConfig.siteUrl}/ai-lead-qualification` },
  openGraph: {
    title: "Inbound AI Lead Qualification & Caller Triage | ZTechAI",
    description:
      "Filter unqualified inquiries, verify service zip codes, and escalate priority emergencies automatically.",
    url: `${siteConfig.siteUrl}/ai-lead-qualification`,
    type: "website",
  },
};

export default function AiLeadQualificationPage() {
  const pageUrl = `${siteConfig.siteUrl}/ai-lead-qualification`;

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
            "name": "AI Lead Qualification",
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        "name": "AI Telephone Lead Qualification",
        "serviceType": "Inbound Sales & Emergency Triage Automation",
        "provider": {
          "@type": "Organization",
          "name": "ZTechAI",
          "url": siteConfig.siteUrl,
        },
        "description":
          "Screen inbound caller intent, service requirements, and budget parameters automatically before routing.",
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
          <Filter className="h-3.5 w-3.5" />
          <span>Automated Caller Triage</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Qualify Intent, Triage Urgency, and{" "}
          <span className="text-brand-500 dark:text-brand-400">Filter Low-Value Inquiries.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          Stop wasting expensive technician time on tire-kickers or out-of-area calls. Custom intake scripts verify zip codes, collect job descriptions, and route priority calls instantly.
        </p>
      </section>

      <Capabilities />
      <WorkflowVisualizer />
      <BusinessImpact />
      <LeadCaptureForm />
      <FaqSection />
      <FinalCta />
    </div>
  );
}
