import React from "react";
import { siteConfig } from "@/config/site";
import { Linkedin, Youtube, Instagram, Facebook, MessageCircle } from "lucide-react";

export function FooterSocialLinks() {
  const { socialLinks } = siteConfig;

  const profiles = [
    {
      platform: "linkedin",
      name: "LinkedIn",
      url: socialLinks.linkedin,
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      platform: "youtube",
      name: "YouTube",
      url: socialLinks.youtube,
      icon: <Youtube className="h-4 w-4" />,
    },
    {
      platform: "facebook",
      name: "Facebook",
      url: socialLinks.facebook,
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      platform: "instagram",
      name: "Instagram",
      url: socialLinks.instagram,
      icon: <Instagram className="h-4 w-4" />,
    },
    {
      platform: "whatsapp",
      name: "WhatsApp",
      url: socialLinks.whatsapp,
      icon: <MessageCircle className="h-4 w-4" />,
    },
  ];

  // Filter only profiles that have non-empty URLs configured in .env
  const activeProfiles = profiles.filter((item) => Boolean(item.url && item.url.trim()));

  if (activeProfiles.length === 0) return null;

  return (
    <div className="pt-2 flex items-center gap-3">
      {activeProfiles.map((soc) => (
        <a
          key={soc.platform}
          href={soc.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visit ${siteConfig.name} on ${soc.name}`}
          aria-label={`Visit ${siteConfig.name} on ${soc.name}`}
          className="p-2 rounded-xl border border-surface-border bg-surface-muted text-text-muted hover:text-brand-500 hover:border-brand-500/30 transition-all hover:scale-105"
        >
          {soc.icon}
        </a>
      ))}
    </div>
  );
}
