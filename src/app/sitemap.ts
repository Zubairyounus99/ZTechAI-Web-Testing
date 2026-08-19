import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { industriesData } from "@/data/industries";
import { blogPosts } from "@/data/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;
  const currentDate = new Date().toISOString();

  // 1. Core public marketing pages
  const coreRoutes = [
    "",
    "/ai-voice-agents",
    "/ai-receptionist",
    "/ai-appointment-booking",
    "/ai-lead-qualification",
    "/ai-customer-support",
    "/how-it-works",
    "/integrations",
    "/case-studies",
    "/pricing",
    "/about",
    "/contact",
    "/faq",
    "/security",
    "/privacy",
    "/terms",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/ai-") ? 0.9 : 0.8,
  }));

  // 2. Verified Industry Blueprint Pages
  const industryRoutes = industriesData.map((ind) => ({
    url: `${baseUrl}/industries/${ind.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 3. Automated Blog Article URLs
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.datePublished).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...coreRoutes, ...industryRoutes, ...blogRoutes];
}
