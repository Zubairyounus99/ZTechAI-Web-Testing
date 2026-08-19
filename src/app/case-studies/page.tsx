import React from "react";
import { Metadata } from "next";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { ExampleWorkflows } from "@/components/sections/ExampleWorkflows";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig(getServerRuntimeConfig());
  return {
    title: `AI Voice Agent Case Studies & Example Workflows | ${config.name}`,
    description:
      `Review detailed example implementations of ${config.name} custom voice agents across Dental Practices, HVAC Contractors, Plumbing Companies, and Local Service Businesses.`,
    alternates: { canonical: `${config.siteUrl}/case-studies` },
    openGraph: {
      title: `AI Voice Agent Case Studies & Example Workflows | ${config.name}`,
      description:
        "See step-by-step how custom voice architecture resolves phone bottlenecks and prevents lost revenue.",
      url: `${config.siteUrl}/case-studies`,
      type: "website",
    },
  };
}

export default function CaseStudiesPage() {
  const siteConfig = getSiteConfig(getServerRuntimeConfig());
  const pageUrl = `${siteConfig.siteUrl}/case-studies`;

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
            "name": "Example Workflows & Case Studies",
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

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Operational Logic & Implementations</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Real Operational Logic. <span className="text-brand-500 dark:text-brand-400">Zero Fluff.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          See step-by-step how our customized voice architecture resolves phone bottlenecks, prevents missed after-hours revenue, and simplifies daily business dispatch.
        </p>
      </section>

      <ExampleWorkflows />
      <LeadCaptureForm />
      <FaqSection />
      <FinalCta />
    </div>
  );
}
