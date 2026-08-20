"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import {
  SiteConfig,
  RuntimeEnv,
  getSiteConfig,
  getClientRuntimeConfig,
} from "@/config/site";

export interface ConfigContextType extends RuntimeEnv {
  config: SiteConfig;
  phoneFormatted: string;
  phoneTel: string;
  email: string;
  phone: string;
  name: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  navLinks: SiteConfig["navLinks"];
  footerLinks: SiteConfig["footerLinks"];
  tagline: string;
  trustStatement: string;
  headline: string;
  subheadline: string;
  legalName: string;
}

const ConfigContext = createContext<ConfigContextType | null>(null);

export function ConfigProvider({
  initialRuntimeEnv,
  children,
}: {
  initialRuntimeEnv: RuntimeEnv;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const runtimeWindow = window as typeof window & { __APP_ENV__?: RuntimeEnv };
    runtimeWindow.__APP_ENV__ = initialRuntimeEnv;
  }, [initialRuntimeEnv]);

  // The server-rendered prop is serialized by the App Router; on the browser it
  // populates window.__APP_ENV__, our single public runtime configuration source.
  const value = useMemo<ConfigContextType>(() => {
    if (typeof window !== "undefined") {
      const runtimeWindow = window as typeof window & { __APP_ENV__?: RuntimeEnv };
      // App Router serializes initialRuntimeEnv in the server component payload.
      // Populate the browser's one public runtime source before reading it.
      runtimeWindow.__APP_ENV__ ??= initialRuntimeEnv;
    }
    const runtimeEnv = getClientRuntimeConfig(initialRuntimeEnv);
    const fullConfig = getSiteConfig(runtimeEnv);

    return {
      ...runtimeEnv,
      config: fullConfig,
      email: runtimeEnv.contactEmail,
      phone: runtimeEnv.contactPhone,
      phoneFormatted: runtimeEnv.contactPhone,
      phoneTel: fullConfig.phoneTel,
      name: runtimeEnv.siteName,
      legalName: fullConfig.legalName,
      tagline: fullConfig.tagline,
      headline: fullConfig.headline,
      subheadline: fullConfig.subheadline,
      trustStatement: fullConfig.trustStatement,
      primaryCtaText: fullConfig.primaryCtaText,
      secondaryCtaText: fullConfig.secondaryCtaText,
      navLinks: fullConfig.navLinks,
      footerLinks: fullConfig.footerLinks,
    };
  }, [initialRuntimeEnv]);

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useConfig(): ConfigContextType {
  const context = useContext(ConfigContext);
  if (!context) {
    const runtimeEnv = getClientRuntimeConfig();
    const fullConfig = getSiteConfig(runtimeEnv);
    return {
      ...runtimeEnv,
      config: fullConfig,
      email: runtimeEnv.contactEmail,
      phone: runtimeEnv.contactPhone,
      phoneFormatted: runtimeEnv.contactPhone,
      phoneTel: fullConfig.phoneTel,
      name: runtimeEnv.siteName,
      legalName: fullConfig.legalName,
      tagline: fullConfig.tagline,
      headline: fullConfig.headline,
      subheadline: fullConfig.subheadline,
      trustStatement: fullConfig.trustStatement,
      primaryCtaText: fullConfig.primaryCtaText,
      secondaryCtaText: fullConfig.secondaryCtaText,
      navLinks: fullConfig.navLinks,
      footerLinks: fullConfig.footerLinks,
    };
  }
  return context;
}
