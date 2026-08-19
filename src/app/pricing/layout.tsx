import { Metadata } from "next";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig(getServerRuntimeConfig());
  return {
    title: `AI Voice Agent Pricing & Custom Deployment Economics | ${config.name}`,
    description:
      `Explore transparent pricing economics for custom AI voice agents and 24/7 receptionists. Learn how setup engineering and predictable usage scale with your call volume.`,
    alternates: { canonical: `${config.siteUrl}/pricing` },
    openGraph: {
      title: `AI Voice Agent Pricing & Custom Deployment | ${config.name}`,
      description:
        "Understand the economics of custom AI voice agents vs hiring full-time reception staff.",
      url: `${config.siteUrl}/pricing`,
      type: "website",
    },
  };
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const siteConfig = getSiteConfig(getServerRuntimeConfig());
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
