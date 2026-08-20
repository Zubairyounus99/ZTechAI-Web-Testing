import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug } from "@/data/blogData";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FinalCta } from "@/components/sections/FinalCta";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Calculator,
  UserCheck,
} from "lucide-react";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateStaticParams() {
  return blogPosts.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  const config = getSiteConfig(getServerRuntimeConfig());
  const pageUrl = `${config.siteUrl}/blog/${post.slug}`;
  const title = `${post.title} | ${config.name}`;
  const description = post.excerpt;

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
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author.name],
      tags: post.tags,
      siteName: "ZTechAI",
      images: [
        {
          url: "/icon.svg",
          width: 512,
          height: 512,
          alt: post.title,
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

export default function BlogPostPage({ params }: Props) {
  const siteConfig = getSiteConfig(getServerRuntimeConfig());
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const pageUrl = `${siteConfig.siteUrl}/blog/${post.slug}`;

  // Related posts lookup
  const relatedPosts = post.relatedSlugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((p): p is typeof post => p !== undefined)
    .slice(0, 3);

  // Structured Data (BlogPosting, Breadcrumbs, FAQs)
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
            "item": `${siteConfig.siteUrl}/blog`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}/#article`,
        "mainEntityOfPage": pageUrl,
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.datePublished,
        "dateModified": post.dateModified,
        "author": {
          "@type": "Organization",
          "name": post.author.name,
          "url": siteConfig.siteUrl,
        },
        "publisher": {
          "@type": "Organization",
          "name": "ZTechAI",
          "url": siteConfig.siteUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${siteConfig.siteUrl}/icon.svg`,
          },
        },
        "keywords": post.tags.join(", "),
      },
      ...(post.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}/#faq`,
              "mainEntity": post.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <article className="pt-28 pb-20 space-y-16 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Container */}
      <header className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-text-muted">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 hover:text-brand-500 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to all articles</span>
          </Link>
          <span>/</span>
          <span className="text-brand-500 dark:text-brand-400 font-mono">
            {post.category}
          </span>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3 py-0.5 text-xs font-semibold text-brand-500 dark:text-brand-400">
              {post.category}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="h-3.5 w-3.5" />
              Published:{" "}
              {new Date(post.datePublished).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-text-muted leading-relaxed font-normal">
            {post.headline}
          </p>
        </div>

        {/* Author Byline */}
        <div className="pt-2 pb-4 border-b border-surface-border flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-500">
              <UserCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-foreground">{post.author.name}</p>
              <p className="text-[11px] text-text-muted">{post.author.role}</p>
            </div>
          </div>
          <span className="text-[11px] font-mono">
            Updated:{" "}
            {new Date(post.dateModified).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </header>

      {/* Key Takeaways Callout */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brand-500/30 bg-card-bg p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-500 dark:text-brand-400" />
            <h2 className="font-display text-lg font-bold text-foreground">
              Key Operational Takeaways
            </h2>
          </div>
          <ul className="space-y-2.5 pt-1">
            {post.keyTakeaways.map((takeaway, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground font-medium"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Step-by-Step Workflow Stages */}
      {post.workflowStages && post.workflowStages.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            Step-by-Step Implementation Workflow
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {post.workflowStages.map((stage) => (
              <div
                key={stage.step}
                className="rounded-2xl border border-surface-border bg-card-bg p-5 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-500 dark:text-brand-400">
                    STAGE {stage.step}
                  </span>
                  <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-mono text-text-muted">
                    Target: {stage.systemTarget}
                  </span>
                </div>
                <h3 className="font-display text-sm font-bold text-foreground">
                  {stage.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed font-normal">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Body Content Sections */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {post.sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
              {section.heading}
            </h2>

            {section.subheading && (
              <p className="text-sm font-semibold text-brand-500 dark:text-brand-400">
                {section.subheading}
              </p>
            )}

            <div className="space-y-4 text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {section.bulletPoints && (
              <ul className="space-y-2 pt-2">
                {section.bulletPoints.map((bp, bpIdx) => (
                  <li
                    key={bpIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground font-medium"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.table && (
              <div className="pt-4 overflow-x-auto">
                <table className="w-full border-collapse border border-surface-border text-left text-xs">
                  <thead>
                    <tr className="bg-surface-muted border-b border-surface-border font-bold text-foreground">
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3 border-r border-surface-border last:border-r-0">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-surface-border last:border-b-0 hover:bg-surface-muted/50">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 border-r border-surface-border last:border-r-0 text-text-muted font-medium">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Illustrative ROI Scenario */}
      {post.roiScenario && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-8 space-y-5 shadow-lg">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-accent-500" />
              <h2 className="font-display text-lg font-bold text-foreground">
                {post.roiScenario.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="rounded-2xl border border-surface-border bg-surface-muted p-3.5 space-y-1">
                <p className="text-[11px] text-text-muted font-medium">Monthly Calls</p>
                <p className="font-display text-lg font-extrabold text-foreground">
                  {post.roiScenario.callVolume.toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl border border-surface-border bg-surface-muted p-3.5 space-y-1">
                <p className="text-[11px] text-text-muted font-medium">Avg Duration</p>
                <p className="font-display text-lg font-extrabold text-foreground">
                  {post.roiScenario.avgCallDurationMins} mins
                </p>
              </div>
              <div className="rounded-2xl border border-surface-border bg-surface-muted p-3.5 space-y-1">
                <p className="text-[11px] text-text-muted font-medium">Missed Rate</p>
                <p className="font-display text-lg font-extrabold text-rose-500">
                  ~{post.roiScenario.missedCallRatePercent}%
                </p>
              </div>
              <div className="rounded-2xl border border-surface-border bg-surface-muted p-3.5 space-y-1">
                <p className="text-[11px] text-text-muted font-medium">Hours Saved</p>
                <p className="font-display text-lg font-extrabold text-emerald-500">
                  ~{post.roiScenario.staffHoursSavedMonthly} hrs/mo
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-foreground font-semibold">
              {post.roiScenario.estimatedOpportunitySummary}
            </p>

            <p className="text-[11px] text-text-muted font-mono leading-relaxed pt-2 border-t border-surface-border">
              Note: {post.roiScenario.methodologyNotes}
            </p>
          </div>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {post.faqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-500 dark:text-brand-400" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {post.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-surface-border bg-card-bg p-5 sm:p-6 space-y-2 shadow-sm"
              >
                <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Articles Cluster */}
      {relatedPosts.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 border-t border-surface-border space-y-6">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            Related Operational Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {relatedPosts.map((rel) => (
              <div
                key={rel.slug}
                className="flex flex-col justify-between rounded-2xl border border-surface-border bg-card-bg p-5 space-y-3 shadow-sm hover:border-brand-500/40 transition-all group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-brand-500 uppercase">
                    {rel.category}
                  </span>
                  <h3 className="font-display text-sm font-bold text-foreground group-hover:text-brand-500 transition-colors line-clamp-2">
                    <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-2 font-normal">
                    {rel.excerpt}
                  </p>
                </div>
                <Link
                  href={`/blog/${rel.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:translate-x-0.5 transition-transform pt-2"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lead Capture and Conversion CTAs */}
      <LeadCaptureForm />
      <FinalCta />
    </article>
  );
}
