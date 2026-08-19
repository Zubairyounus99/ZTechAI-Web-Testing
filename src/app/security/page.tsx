import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { TrustSecurity } from "@/components/sections/TrustSecurity";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Security, Privacy & Data Architecture — ZTechAI",
  description:
    "Learn about ZTechAI's security standards, customer data ownership, encryption protocols, deterministic guardrails, and retention policies.",
  alternates: { canonical: `${siteConfig.siteUrl}/security` },
  openGraph: {
    title: "Security, Privacy & Data Architecture — ZTechAI",
    description:
      "Enterprise security standards, TLS 1.3 encryption, zero model training on customer data, and deterministic guardrails.",
    url: `${siteConfig.siteUrl}/security`,
    type: "website",
  },
};

export default function SecurityPage() {
  const pageUrl = `${siteConfig.siteUrl}/security`;

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
            "name": "Security & Architecture",
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

      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Security & Data Governance</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Enterprise-Grade Security &{" "}
          <span className="text-brand-500 dark:text-brand-400">100% Data Ownership.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          We build conversational AI voice agents with strict data governance, zero public AI model training on customer audio, and deterministic guardrails.
        </p>
      </section>

      <TrustSecurity />
      <LeadCaptureForm />
    </div>
  );
}
