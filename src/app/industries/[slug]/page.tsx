import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { industriesData } from "@/data/industries";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateStaticParams() {
  return industriesData.map((ind) => ({
    slug: ind.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const industry = industriesData.find((ind) => ind.slug === params.slug);
  if (!industry) return {};

  const config = getSiteConfig(getServerRuntimeConfig());
  const pageUrl = `${config.siteUrl}/industries/${industry.slug}`;
  const title = `AI Receptionist for ${industry.name} | ${config.name} Voice Automation`;
  const description = `Automate phone answering, emergency triage, and appointment booking for ${industry.name.toLowerCase()} with custom AI voice agents. Compatible with ${industry.systemsConnected.slice(0, 3).join(", ")}.`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      siteName: config.name,
      images: [
        {
          url: "/icon.svg",
          width: 512,
          height: 512,
          alt: `${industry.name} AI Receptionist Automation`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/icon.svg"],
    },
  };
}

export default function IndustryPage({ params }: Props) {
  const siteConfig = getSiteConfig(getServerRuntimeConfig());
  const industry = industriesData.find((ind) => ind.slug === params.slug);

  if (!industry) {
    notFound();
  }

  const pageUrl = `${siteConfig.siteUrl}/industries/${industry.slug}`;

  // Industry-Specific Schema.org JSON-LD
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
            "name": "Industries",
            "item": `${siteConfig.siteUrl}/#industries`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": industry.name,
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        "name": `AI Receptionist & Phone Automation for ${industry.name}`,
        "serviceType": "AI Voice Agent Front-Desk Automation",
        "description": industry.subheadline,
        "provider": {
          "@type": "Organization",
          "name": "ZTechAI",
          "url": siteConfig.siteUrl,
        },
        "areaServed": {
          "@type": "Country",
          "name": "United States",
        },
        "availableChannel": {
          "@type": "ServiceChannel",
          "servicePhone": {
            "@type": "ContactPoint",
            "telephone": siteConfig.phone,
            "contactType": "sales",
          },
        },
      },
    ],
  };

  return (
    <div className="pt-28 pb-20 space-y-24 bg-background">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{industry.badge}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          {industry.headline}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          {industry.subheadline}
        </p>
      </section>

      {/* Pain Points vs Solutions */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pain points */}
          <div className="rounded-3xl border border-rose-500/20 bg-card-bg p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="font-display text-xl font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Common Operational Bottlenecks in {industry.shortTitle}</span>
            </h2>
            <ul className="space-y-3 pt-2">
              {industry.painPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted font-medium">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI capabilities */}
          <div className="rounded-3xl border border-brand-500/30 bg-card-bg p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="font-display text-xl font-bold text-brand-600 dark:text-brand-400 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>How ZTechAI Automates Your Front Desk</span>
            </h2>
            <ul className="space-y-3 pt-2">
              {industry.aiCapabilities.map((cap, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Simulated Live Call Transcript */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border">
            <h3 className="font-display text-lg font-bold text-foreground">
              Live Phone Call Simulation
            </h3>
            <span className="rounded bg-brand-500/10 px-2 py-0.5 text-xs font-mono font-bold text-brand-600 dark:text-brand-400">
              Natural Voice Latency &lt;500ms
            </span>
          </div>

          <div className="space-y-4">
            {industry.sampleTranscript.map((turn, idx) => (
              <div key={idx} className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <span
                    className={`font-bold shrink-0 ${
                      turn.speaker === "Caller" ? "text-accent-600 dark:text-accent-400" : "text-brand-600 dark:text-brand-400"
                    }`}
                  >
                    {turn.speaker}:
                  </span>
                  <p className="text-foreground leading-relaxed font-medium">&quot;{turn.text}&quot;</p>
                </div>
                {turn.action && (
                  <div className="ml-6 inline-flex items-center gap-1.5 rounded bg-brand-500/10 px-2.5 py-1 text-[11px] font-mono text-brand-700 dark:text-brand-300 border border-brand-500/20 font-semibold">
                    <Sparkles className="h-3 w-3" />
                    <span>{turn.action}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step Progression */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            End-to-End {industry.shortTitle} Workflow Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industry.workflowStages.map((stage) => (
            <div
              key={stage.step}
              className="rounded-2xl border border-surface-border bg-card-bg p-5 space-y-2 shadow-sm"
            >
              <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">STAGE {stage.step}</span>
              <h3 className="font-display text-sm font-bold text-foreground">{stage.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed font-normal">{stage.description}</p>
              <div className="pt-2">
                <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-mono text-text-muted font-medium">
                  Target: {stage.systemTarget}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Systems */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-2xl border border-surface-border bg-surface-muted p-6">
          <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-2">
            Directly Compatible with {industry.shortTitle} Software
          </p>
          <p className="font-mono text-sm sm:text-base font-bold text-foreground">
            {industry.systemsConnected.join(" • ")}
          </p>
        </div>
      </section>

      {/* Lead Capture Form */}
      <LeadCaptureForm />

      {/* Industry FAQs */}
      <FaqSection />
    </div>
  );
}
