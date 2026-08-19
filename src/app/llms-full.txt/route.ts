import { siteConfig } from "@/config/site";
import { industriesData } from "@/data/industries";
import { blogPosts } from "@/data/blogData";
import { faqsData } from "@/data/faqs";
import { NextResponse } from "next/server";

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;

  const content = `# ZTechAI — Comprehensive Knowledge, Telephony Architecture & Technical Documentation
> Complete documentation for Large Language Models, AI Search Engines, and Perplexity/ChatGPT citations.

## Company Information
- Name: ${siteConfig.name} (${siteConfig.legalName})
- Website: ${baseUrl}
- Contact: ${siteConfig.email} | ${siteConfig.phoneFormatted}
- Primary Market: United States
- Primary Intent: Custom AI Voice Agents for US Businesses

## Value Proposition
ZTechAI designs and deploys custom conversational AI voice agents, 24/7 AI receptionists, and automated phone workflows for US local service businesses. The agents behave like trained digital employees for repetitive customer communication and operational work.

## Core Technical & Operational Articles
${blogPosts
  .map(
    (post) => `### [${post.title}](${baseUrl}/blog/${post.slug})
- Category: ${post.category}
- Summary: ${post.headline}
- Key Takeaways: ${post.keyTakeaways.join(" | ")}
- Illustrative ROI Scenario: ${post.roiScenario?.title || "N/A"} (${post.roiScenario?.estimatedOpportunitySummary || "N/A"})
`
  )
  .join("\n")}

## Industry Blueprints & Use Cases
${industriesData
  .map(
    (ind) => `### ${ind.name}
- Slug: ${ind.slug}
- URL: ${baseUrl}/industries/${ind.slug}
- Summary: ${ind.headline} - ${ind.subheadline}
- Key Workflows: ${ind.keyWorkflows.join(", ")}
- Compatible Software: ${ind.systemsConnected.join(", ")}
`
  )
  .join("\n")}

## Comprehensive FAQ Catalog
${faqsData
  .map(
    (faq) => `### Q: ${faq.question}
A: ${faq.answer}
`
  )
  .join("\n")}

## Contact & Implementation Protocol
To schedule an AI architecture consultation and live interactive voice prototype:
- URL: ${baseUrl}/contact
- Email: ${siteConfig.email}
- Phone: ${siteConfig.phoneFormatted}
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
