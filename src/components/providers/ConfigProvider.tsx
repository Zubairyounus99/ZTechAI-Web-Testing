"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SiteConfig, getLiveConfig } from "@/config/site";

export interface ConfigContextType {
  config: SiteConfig;
  email: string;
  phone: string;
  phoneFormatted: string;
  phoneTel: string;
  calBookingUrl: string;
  calEmbedUrl: string;
  aiCostPerMinute: number;
  socialLinks: SiteConfig["socialLinks"];
  name: string;
  siteUrl: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  navLinks: SiteConfig["navLinks"];
  footerLinks: SiteConfig["footerLinks"];
  tagline: string;
  trustStatement: string;
}

const ConfigContext = createContext<ConfigContextType | null>(null);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(() => getLiveConfig());

  useEffect(() => {
    // Re-evaluate live configuration on client mount after window.__APP_ENV__ script execution
    const live = getLiveConfig();
    if (live && live.calculator) {
      setConfig(live);
    }
  }, []);

  const safeConfig = config && config.calculator ? config : getLiveConfig();

  const value: ConfigContextType = {
    config: safeConfig,
    email: safeConfig.email || "admin@ztechai.us",
    phone: safeConfig.phone || "+1 (321) 499-87777",
    phoneFormatted: safeConfig.phoneFormatted || "+1 (321) 499-87777",
    phoneTel: safeConfig.phoneTel || "+132149987777",
    calBookingUrl: safeConfig.calBookingUrl || "https://cal.com/zubair-younus-4tlv0b/ai-voice-agent",
    calEmbedUrl: safeConfig.calEmbedUrl || "https://app.cal.com/zubair-younus-4tlv0b/ai-voice-agent?embed=true&theme=dark&layout=month_view",
    aiCostPerMinute: safeConfig.calculator?.aiCostPerMinute ?? 0.30,
    socialLinks: safeConfig.socialLinks || { linkedin: "", youtube: "", facebook: "", instagram: "", whatsapp: "" },
    name: safeConfig.name || "ZTechAI",
    siteUrl: safeConfig.siteUrl || "https://ztechai.us",
    primaryCtaText: safeConfig.primaryCtaText || "Book Your 15-Minute AI Discovery",
    secondaryCtaText: safeConfig.secondaryCtaText || "Talk to Our AI",
    navLinks: safeConfig.navLinks || [],
    footerLinks: safeConfig.footerLinks || { solutions: [], industries: [], company: [], resources: [], legal: [] },
    tagline: safeConfig.tagline || "Custom AI Voice Agents for US Businesses",
    trustStatement: safeConfig.trustStatement || "Built for US businesses that depend on calls, customers, and appointments.",
  };

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useConfig(): ConfigContextType {
  const context = useContext(ConfigContext);
  if (!context) {
    const live = getLiveConfig();
    return {
      config: live,
      email: live.email || "admin@ztechai.us",
      phone: live.phone || "+1 (321) 499-87777",
      phoneFormatted: live.phoneFormatted || "+1 (321) 499-87777",
      phoneTel: live.phoneTel || "+132149987777",
      calBookingUrl: live.calBookingUrl || "https://cal.com/zubair-younus-4tlv0b/ai-voice-agent",
      calEmbedUrl: live.calEmbedUrl || "https://app.cal.com/zubair-younus-4tlv0b/ai-voice-agent?embed=true&theme=dark&layout=month_view",
      aiCostPerMinute: live.calculator?.aiCostPerMinute ?? 0.30,
      socialLinks: live.socialLinks || { linkedin: "", youtube: "", facebook: "", instagram: "", whatsapp: "" },
      name: live.name || "ZTechAI",
      siteUrl: live.siteUrl || "https://ztechai.us",
      primaryCtaText: live.primaryCtaText || "Book Your 15-Minute AI Discovery",
      secondaryCtaText: live.secondaryCtaText || "Talk to Our AI",
      navLinks: live.navLinks || [],
      footerLinks: live.footerLinks || { solutions: [], industries: [], company: [], resources: [], legal: [] },
      tagline: live.tagline || "Custom AI Voice Agents for US Businesses",
      trustStatement: live.trustStatement || "Built for US businesses that depend on calls, customers, and appointments.",
    };
  }
  return context;
}
