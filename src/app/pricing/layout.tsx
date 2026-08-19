import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "AI Voice Agent Pricing & Custom Deployment Economics | ZTechAI",
  description:
    "Explore transparent pricing economics for custom AI voice agents and 24/7 receptionists. Learn how setup engineering and predictable usage scale with your call volume.",
  alternates: { canonical: `${siteConfig.siteUrl}/pricing` },
  openGraph: {
    title: "AI Voice Agent Pricing & Custom Deployment | ZTechAI",
    description:
      "Understand the economics of custom AI voice agents vs hiring full-time reception staff.",
    url: `${siteConfig.siteUrl}/pricing`,
    type: "website",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const pageUrl = `${siteConfig.siteUrl}/pricing`;

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
            "name": "Pricing & Deployment",
            "item": pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
