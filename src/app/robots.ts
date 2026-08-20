import { MetadataRoute } from "next";
import { getServerRuntimeConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getServerRuntimeConfig().siteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          // Anthropic / Claude Crawlers & Search Agents
          "ClaudeBot",
          "anthropic-ai",
          "Claude-Web",
          "Claude-SearchBot",
          "Claude-Search",
          "Claude",
          // OpenAI / ChatGPT / SearchGPT Crawlers
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          // Microsoft / Bing / Copilot
          "Bingbot",
          "msnbot",
          "BingPreview",
          // Google / Gemini
          "Googlebot",
          "Google-Extended",
          "GoogleOther",
          // Perplexity AI
          "PerplexityBot",
          "Perplexity",
          // Apple Intelligence & Siri
          "Applebot",
          "Applebot-Extended",
          // Meta AI
          "Meta-ExternalAgent",
          "FacebookBot",
          // Cohere & Open AI Crawlers
          "cohere-ai",
          "CCBot",
          "Bytespider",
          "Amazonbot",
          "Diffbot",
        ],
        allow: [
          "/",
          "/llms.txt",
          "/llms-full.txt",
          "/blog",
          "/blog/*",
          "/industries",
          "/industries/*",
          "/about",
          "/pricing",
          "/case-studies",
          "/faq",
          "/how-it-works",
          "/integrations",
          "/contact",
          "/security",
          "/privacy",
          "/terms",
        ],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
