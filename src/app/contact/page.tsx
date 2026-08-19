import React from "react";
import { Metadata } from "next";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { Phone, Mail, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig(getServerRuntimeConfig());
  const phoneText = config.phoneFormatted ? ` or call ${config.phoneFormatted}` : "";
  return {
    title: `Contact ${config.name} — Schedule Your AI Voice Discovery Call`,
    description: `Get in touch with ${config.name}. Reach us at ${config.email}${phoneText} to discuss custom AI voice automation and 24/7 receptionists for your business.`,
    alternates: { canonical: `${config.siteUrl}/contact` },
    openGraph: {
      title: `Contact ${config.name} — Schedule Your Discovery Call`,
      description: `Connect with ${config.name} engineering team by phone or email to plan your custom AI voice agent.`,
      url: `${config.siteUrl}/contact`,
      type: "website",
    },
  };
}

export default function ContactPage() {
  const siteConfig = getSiteConfig(getServerRuntimeConfig());
  const pageUrl = `${siteConfig.siteUrl}/contact`;

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
            "name": "Contact Us",
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "ContactPage",
        "@id": `${pageUrl}/#contactpage`,
        "url": pageUrl,
        "name": "Contact ZTechAI",
        "mainEntity": {
          "@type": "Organization",
          "name": "ZTechAI",
          "telephone": siteConfig.phone,
          "email": siteConfig.email,
          "url": siteConfig.siteUrl,
        },
      },
    ],
  };

  return (
    <div className="pt-28 pb-20 space-y-16 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Direct Engineering Access</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Let&apos;s Build Your Custom{" "}
          <span className="text-brand-500 dark:text-brand-400">Voice AI Infrastructure.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          Speak directly with an AI telephony engineer. We audit your call volume, design your conversational intake logic, and demonstrate live voice prototypes.
        </p>

        {/* Quick Contact Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-text-muted">
          {siteConfig.phone && (
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="flex items-center gap-2 rounded-xl border border-surface-border bg-card-bg px-4 py-2.5 hover:border-brand-500/40 hover:text-foreground transition-all"
            >
              <Phone className="h-4 w-4 text-brand-500 dark:text-brand-400" />
              <span>Call us: {siteConfig.phoneFormatted}</span>
            </a>
          )}
          {siteConfig.email && (
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 rounded-xl border border-surface-border bg-card-bg px-4 py-2.5 hover:border-brand-500/40 hover:text-foreground transition-all"
            >
              <Mail className="h-4 w-4 text-brand-500 dark:text-brand-400" />
              <span>Email: {siteConfig.email}</span>
            </a>
          )}
        </div>
      </section>

      <LeadCaptureForm />
    </div>
  );
}
