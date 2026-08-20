import React from "react";
import { Metadata } from "next";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { blogPosts, getAllBlogCategories } from "@/data/blogData";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FinalCta } from "@/components/sections/FinalCta";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig(getServerRuntimeConfig());
  return {
    title: `AI Voice Agents & Phone Automation Blog | ${config.name} Insights`,
    description:
      `Expert technical blueprints, industry workflows, and ROI analyses on AI voice agents, 24/7 receptionists, and telephone automation for US businesses.`,
    alternates: {
      canonical: `${config.siteUrl}/blog`,
    },
    openGraph: {
      title: `AI Voice Agents & Phone Automation Blog | ${config.name} Insights`,
      description:
        `Expert technical blueprints, industry workflows, and ROI analyses on AI voice agents and telephone automation for US businesses.`,
      url: `${config.siteUrl}/blog`,
      type: "website",
      siteName: config.name,
      images: [
        {
          url: "/icon.svg",
          width: 512,
          height: 512,
          alt: `${config.name} Blog & Knowledge Hub`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `AI Voice Agents & Phone Automation Blog | ${config.name} Insights`,
      description:
        `Blueprints and operational analyses on AI voice agents for American businesses.`,
      images: ["/icon.svg"],
    },
  };
}

export default function BlogIndexPage() {
  const siteConfig = getSiteConfig(getServerRuntimeConfig());
  const categories = getAllBlogCategories();
  const pageUrl = `${siteConfig.siteUrl}/blog`;

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
            "name": "Blog",
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}/#collection`,
        "url": pageUrl,
        "name": "ZTechAI Voice Automation & AI Agent Knowledge Hub",
        "description":
          "Authoritative guides and practical workflows on custom AI voice agents, phone automation, and digital employee systems for US service companies.",
        "publisher": {
          "@type": "Organization",
          "name": "ZTechAI",
          "url": siteConfig.siteUrl,
        },
      },
    ],
  };

  return (
    <div className="pt-28 pb-20 space-y-20 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Knowledge & Operational Blueprints</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Voice AI Blueprints for{" "}
          <span className="text-brand-500 dark:text-brand-400">American Businesses.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          Practical strategies, industry workflows, and economic models on automating customer phone communication, appointment booking, and emergency triage.
        </p>
      </section>

      {/* Interactive Blog Listing with Search & Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlogIndexClient initialPosts={blogPosts} categories={categories} />
      </section>

      <LeadCaptureForm />
      <FinalCta />
    </div>
  );
}
