import React from "react";
import { Metadata } from "next";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { faqsData } from "@/data/faqs";
import { FaqSection } from "@/components/sections/FaqSection";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FinalCta } from "@/components/sections/FinalCta";
import { HelpCircle } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig(getServerRuntimeConfig());
  return {
    title: `Frequently Asked Questions — AI Voice Agents & Phone Automation | ${config.name}`,
    description:
      `Explore authoritative answers to 24+ common questions regarding AI voice agent capabilities, setup timelines, phone forwarding, calendar integrations, and pricing for US businesses.`,
    alternates: { canonical: `${config.siteUrl}/faq` },
    openGraph: {
      title: `Frequently Asked Questions — ${config.name} Voice Automation`,
      description:
        "Explore answers to 24+ common questions regarding AI voice agent capabilities, setup timelines, phone forwarding, calendar integrations, and pricing.",
      url: `${config.siteUrl}/faq`,
      type: "website",
    },
  };
}

export default function FaqPage() {
  // Generate valid FAQPage Schema.org JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="pt-28 pb-20 space-y-24 bg-background">
      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Knowledge & FAQ Resource</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Everything You Need to Know About{" "}
          <span className="text-brand-500 dark:text-brand-400">ZTechAI Agents.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          Detailed answers on voice technology, system integrations, call forwarding, and front-desk automation.
        </p>
      </section>

      <FaqSection />
      <LeadCaptureForm />
      <FinalCta />
    </div>
  );
}
