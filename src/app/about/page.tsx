import React from "react";
import { Metadata } from "next";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { AiEmployeeConcept } from "@/components/sections/AiEmployeeConcept";
import { TrustSecurity } from "@/components/sections/TrustSecurity";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FinalCta } from "@/components/sections/FinalCta";
import { Building2, Target, Users, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig(getServerRuntimeConfig());
  return {
    title: `About ${config.name} — AI Voice Automation for US Businesses`,
    description:
      `Learn about ${config.name}'s mission to eliminate missed phone calls and empower US local service businesses with reliable custom AI voice agents and 24/7 receptionists.`,
    alternates: { canonical: `${config.siteUrl}/about` },
    openGraph: {
      title: `About ${config.name} — AI Voice Automation for US Businesses`,
      description:
        `Learn about ${config.name}'s mission to eliminate missed calls and empower local businesses with custom conversational AI.`,
      url: `${config.siteUrl}/about`,
      type: "website",
    },
  };
}

export default function AboutPage() {
  const siteConfig = getSiteConfig(getServerRuntimeConfig());
  const pageUrl = `${siteConfig.siteUrl}/about`;

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
            "name": "About ZTechAI",
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "AboutPage",
        "@id": `${pageUrl}/#aboutpage`,
        "url": pageUrl,
        "name": "About ZTechAI",
        "mainEntity": {
          "@type": "Organization",
          "name": "ZTechAI",
          "url": siteConfig.siteUrl,
          "description":
            "ZTechAI provides custom conversational AI voice agents and automated phone systems for US local businesses.",
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

      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
          <Building2 className="h-3.5 w-3.5" />
          <span>Our Mission & Principles</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Built for the Businesses That{" "}
          <span className="text-brand-500 dark:text-brand-400">Keep America Running.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          From family dental practices to 24/7 emergency plumbers, we believe no business owner should lose revenue simply because nobody was available to pick up the phone.
        </p>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-surface-border bg-card-bg p-8 space-y-3 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 dark:text-brand-400">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Results-Driven Engineering
            </h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
              We focus on tangible business outcomes: booked appointments, zero hold times, and automated CRM records. No theoretical fluff.
            </p>
          </div>

          <div className="rounded-3xl border border-surface-border bg-card-bg p-8 space-y-3 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Symbiotic Human & AI Ops
            </h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
              AI handles repetitive phone intake so your human team can focus on in-person clinical care, skilled trades, and client relationships.
            </p>
          </div>

          <div className="rounded-3xl border border-surface-border bg-card-bg p-8 space-y-3 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Trust & Transparency First
            </h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
              You retain 100% data ownership. We establish strict guardrails and clear human escalation paths for every single deployment.
            </p>
          </div>
        </div>
      </section>

      <AiEmployeeConcept />
      <TrustSecurity />
      <LeadCaptureForm />
      <FinalCta />
    </div>
  );
}
