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

export function ConfigProvider({
  initialConfig,
  children,
}: {
  initialConfig?: SiteConfig;
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<SiteConfig>(() => initialConfig || getLiveConfig());

  useEffect(() => {
    // Re-evaluate live configuration on client mount after window.__APP_ENV__ script execution
    const live = getLiveConfig();
    setConfig(live);
  }, []);

  const value: ConfigContextType = {
    config,
    email: config.email,
    phone: config.phone,
    phoneFormatted: config.phoneFormatted,
    phoneTel: config.phoneTel,
    calBookingUrl: config.calBookingUrl,
    calEmbedUrl: config.calEmbedUrl,
    aiCostPerMinute: config.calculator.aiCostPerMinute,
    socialLinks: config.socialLinks,
    name: config.name,
    siteUrl: config.siteUrl,
    primaryCtaText: config.primaryCtaText,
    secondaryCtaText: config.secondaryCtaText,
    navLinks: config.navLinks,
    footerLinks: config.footerLinks,
    tagline: config.tagline,
    trustStatement: config.trustStatement,
  };

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useConfig(): ConfigContextType {
  const context = useContext(ConfigContext);
  if (!context) {
    // Fallback if rendered outside provider
    const live = getLiveConfig();
    return {
      config: live,
      email: live.email,
      phone: live.phone,
      phoneFormatted: live.phoneFormatted,
      phoneTel: live.phoneTel,
      calBookingUrl: live.calBookingUrl,
      calEmbedUrl: live.calEmbedUrl,
      aiCostPerMinute: live.calculator.aiCostPerMinute,
      socialLinks: live.socialLinks,
      name: live.name,
      siteUrl: live.siteUrl,
      primaryCtaText: live.primaryCtaText,
      secondaryCtaText: live.secondaryCtaText,
      navLinks: live.navLinks,
      footerLinks: live.footerLinks,
      tagline: live.tagline,
      trustStatement: live.trustStatement,
    };
  }
  return context;
}
