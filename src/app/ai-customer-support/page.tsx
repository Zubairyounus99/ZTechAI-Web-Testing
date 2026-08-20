import React from "react";
import { Metadata } from "next";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { Capabilities } from "@/components/sections/Capabilities";
import { AiEmployeeConcept } from "@/components/sections/AiEmployeeConcept";
import { CostComparison } from "@/components/sections/CostComparison";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Headphones } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig(getServerRuntimeConfig());
  return {
    title: `AI Customer Support & FAQ Deflection over Phone | ${config.name}`,
    description:
      `Instantly deflect repetitive customer questions regarding business hours, pricing, policies, locations, and prep instructions with zero hold time.`,
    alternates: { canonical: `${config.siteUrl}/ai-customer-support` },
    openGraph: {
      title: `AI Customer Support & FAQ Deflection over Phone | ${config.name}`,
      description:
        "Instant answers to caller FAQs without human staff intervention. Free up your front desk for complex client care.",
      url: `${config.siteUrl}/ai-customer-support`,
      type: "website",
    },
  };
}

export default function AiCustomerSupportPage() {
  const siteConfig = getSiteConfig(getServerRuntimeConfig());
  const pageUrl = `${siteConfig.siteUrl}/ai-customer-support`;

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
            "name": "AI Customer Support",
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        "name": "AI Voice Customer Support & FAQ Deflection",
        "serviceType": "Conversational Telephony Support",
        "provider": {
          "@type": "Organization",
          "name": "ZTechAI",
          "url": siteConfig.siteUrl,
        },
        "description":
          "Instant voice answer deflection for repetitive customer questions, directions, policies, and hours.",
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
          <Headphones className="h-3.5 w-3.5" />
          <span>Zero-Hold Customer Care</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Instant Answers to Routine Questions.{" "}
          <span className="text-brand-500 dark:text-brand-400">Zero Hold Times.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          Over 60% of inbound business calls ask the exact same 10 questions: &apos;What are your hours?&apos;, &apos;Do you take my insurance?&apos;, &apos;What&apos;s the service fee?&apos;. Let conversational AI resolve them instantly.
        </p>
      </section>

      <Capabilities />
      <AiEmployeeConcept />
      <CostComparison />
      <LeadCaptureForm />
      <FaqSection />
      <FinalCta />
    </div>
  );
}
