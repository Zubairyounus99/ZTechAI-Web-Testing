// ==========================================================
// ZTechAI — Enterprise Runtime Configuration Engine
// Pure Separation of Server (process.env) and Client (window.__APP_ENV__)
// ==========================================================

export interface RuntimeEnv {
  siteName: string;
  siteUrl: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  calBookingUrl: string;
  calEmbedUrl: string;
  aiCostPerMinute: number;
  gaId: string;
  gscVerification: string;
  socialLinks: {
    linkedin: string;
    youtube: string;
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
}

export interface SiteConfig extends RuntimeEnv {
  legalName: string;
  domain: string;
  email: string;
  phone: string;
  phoneFormatted: string;
  phoneTel: string;
  name: string;
  description: string;
  tagline: string;
  headline: string;
  subheadline: string;
  trustStatement: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  calculator: {
    aiCostPerMinute: number;
    maxProductiveMinutesPerEmployeePerMonth: number;
  };
  analytics: {
    gaId: string;
    gscVerification: string;
  };
  navLinks: { label: string; href: string; badge?: string }[];
  footerLinks: {
    solutions: { label: string; href: string }[];
    industries: { label: string; href: string }[];
    company: { label: string; href: string }[];
    resources: { label: string; href: string }[];
    legal: { label: string; href: string }[];
  };
}

export interface ConfigValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
}

/**
 * Isolated Development Defaults
 * Used ONLY when variables are completely absent in local development.
 * In production, validateRuntimeConfig() will warn if any required setting is missing.
 */
export const DEVELOPMENT_DEFAULTS: RuntimeEnv = {
  siteName: "ZTechAI",
  siteUrl: "https://ztechai.us",
  siteDescription:
    "ZTechAI helps US businesses automate repetitive customer communication and operational tasks with custom AI voice agents that work 24/7.",
  contactEmail: "info@ztechai.us",
  contactPhone: "+1 (321) 499-8752",
  calBookingUrl: "https://cal.com/ztechai/discovery",
  calEmbedUrl: "",
  aiCostPerMinute: 0.20,
  gaId: "",
  gscVerification: "",
  socialLinks: {
    linkedin: "https://linkedin.com/company/ztechai",
    youtube: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
  },
};

/**
 * Business configuration is intentionally absent in production when Dokploy has
 * not supplied it.  Falling back to an old real phone number, calendar, or
 * price would make a bad deployment look healthy and is exactly the stale
 * configuration failure this module is designed to prevent.
 */
function defaultsForCurrentEnvironment(): RuntimeEnv {
  if (process.env.NODE_ENV !== "production") return DEVELOPMENT_DEFAULTS;

  return {
    ...DEVELOPMENT_DEFAULTS,
    contactEmail: "",
    contactPhone: "",
    calBookingUrl: "",
    calEmbedUrl: "",
    aiCostPerMinute: 0,
    gaId: "",
  };
}

/**
 * Normalizes any phone string into a clean RFC-compliant tel: link.
 */
export function normalizeTel(phone: string): string {
  if (!phone || typeof phone !== "string") return "";
  const trimmed = phone.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  return hasPlus ? `+${digits}` : digits;
}

/**
 * Dynamically computes a Cal.com embed URL from a booking URL if embed URL is empty
 */
export function deriveCalEmbedUrl(bookingUrl: string, customEmbedUrl: string = ""): string {
  if (customEmbedUrl && customEmbedUrl.trim().length > 0) {
    return customEmbedUrl.trim();
  }
  if (!bookingUrl || bookingUrl.trim().length === 0) {
    return "";
  }
  const slug = bookingUrl
    .trim()
    .replace(/^https?:\/\/(app\.)?cal\.com\//, "")
    .replace(/\?.*$/, "")
    .trim();
  return slug ? `https://app.cal.com/${slug}?embed=true&theme=dark&layout=month_view` : "";
}

/**
 * Server-only runtime configuration reader
 * Evaluates live process.env on every call (never cached across requests)
 */
export function getServerRuntimeConfig(): RuntimeEnv {
  // Do not use process.env.NEXT_PUBLIC_* property access here. Next.js replaces
  // statically analyzable public keys at build time, even in server modules.
  // Bracket lookup preserves the current container environment at request time.
  const read = (name: string) => process.env[name]?.trim();
  const defaults = defaultsForCurrentEnvironment();

  const bookingUrl =
    read("NEXT_PUBLIC_CAL_BOOKING_URL") ||
    read("CAL_BOOKING_URL") ||
    read("NEXT_PUBLIC_CALCOM_URL") ||
    defaults.calBookingUrl;

  const embedUrl =
    read("NEXT_PUBLIC_CAL_EMBED_URL") ||
    read("CAL_EMBED_URL") ||
    deriveCalEmbedUrl(bookingUrl, defaults.calEmbedUrl);

  const rawCost = read("NEXT_PUBLIC_AI_COST_PER_MINUTE") || read("AI_COST_PER_MINUTE");
  const parsedCost = Number(rawCost);
  const aiCostPerMinute = !isNaN(parsedCost) && parsedCost > 0 ? parsedCost : defaults.aiCostPerMinute;

  return {
    siteName: read("NEXT_PUBLIC_SITE_NAME") || read("SITE_NAME") || defaults.siteName,
    siteUrl: read("NEXT_PUBLIC_SITE_URL") || read("SITE_URL") || defaults.siteUrl,
    siteDescription:
      read("NEXT_PUBLIC_SITE_DESCRIPTION") ||
      read("SITE_DESCRIPTION") ||
      defaults.siteDescription,
    contactEmail: read("NEXT_PUBLIC_CONTACT_EMAIL") || read("CONTACT_EMAIL") || defaults.contactEmail,
    contactPhone: read("NEXT_PUBLIC_CONTACT_PHONE") || read("CONTACT_PHONE") || defaults.contactPhone,
    calBookingUrl: bookingUrl,
    calEmbedUrl: embedUrl,
    aiCostPerMinute,
    gaId: read("NEXT_PUBLIC_GA_ID") || read("GA_ID") || "",
    gscVerification: read("NEXT_PUBLIC_GSC_VERIFICATION") || read("GSC_VERIFICATION") || "",
    socialLinks: {
      linkedin:
        read("NEXT_PUBLIC_LINKEDIN_URL") !== undefined
          ? read("NEXT_PUBLIC_LINKEDIN_URL") || ""
          : defaults.socialLinks.linkedin,
      youtube: read("NEXT_PUBLIC_YOUTUBE_URL") || "",
      facebook: read("NEXT_PUBLIC_FACEBOOK_URL") || "",
      instagram: read("NEXT_PUBLIC_INSTAGRAM_URL") || "",
      whatsapp: read("NEXT_PUBLIC_WHATSAPP_URL") || "",
    },
  };
}

/**
 * Client-only runtime configuration reader
 * Synchronously reads window.__APP_ENV__ populated by the server layout
 */
export function getClientRuntimeConfig(fallback?: RuntimeEnv): RuntimeEnv {
  if (typeof window !== "undefined") {
    const winEnv = (window as unknown as { __APP_ENV__?: Partial<RuntimeEnv> }).__APP_ENV__;
    if (winEnv && typeof winEnv === "object") {
      const defaults = fallback || DEVELOPMENT_DEFAULTS;
      const bookingUrl = winEnv.calBookingUrl || defaults.calBookingUrl;
      const embedUrl = winEnv.calEmbedUrl || deriveCalEmbedUrl(bookingUrl, "");
      const parsedCost = Number(winEnv.aiCostPerMinute);
      const aiCostPerMinute = !isNaN(parsedCost) && parsedCost > 0 ? parsedCost : defaults.aiCostPerMinute;

      return {
        siteName: winEnv.siteName || defaults.siteName,
        siteUrl: winEnv.siteUrl || defaults.siteUrl,
        siteDescription: winEnv.siteDescription || defaults.siteDescription,
        contactEmail: winEnv.contactEmail || defaults.contactEmail,
        contactPhone: winEnv.contactPhone || defaults.contactPhone,
        calBookingUrl: bookingUrl,
        calEmbedUrl: embedUrl,
        aiCostPerMinute,
        gaId: winEnv.gaId || "",
        gscVerification: winEnv.gscVerification || "",
        socialLinks: {
          linkedin: winEnv.socialLinks?.linkedin ?? defaults.socialLinks.linkedin,
          youtube: winEnv.socialLinks?.youtube ?? "",
          facebook: winEnv.socialLinks?.facebook ?? "",
          instagram: winEnv.socialLinks?.instagram ?? "",
          whatsapp: winEnv.socialLinks?.whatsapp ?? "",
        },
      };
    }
  }
  return fallback || DEVELOPMENT_DEFAULTS;
}

/**
 * Environment-aware runtime configuration getter
 */
export function getRuntimeConfig(): RuntimeEnv {
  if (typeof window !== "undefined") {
    return getClientRuntimeConfig();
  }
  return getServerRuntimeConfig();
}

export const getRuntimeEnv = getRuntimeConfig;

/**
 * Converts a RuntimeEnv into the complete, structured SiteConfig
 */
export function getSiteConfig(env: RuntimeEnv = getRuntimeConfig()): SiteConfig {
  const phone = env.contactPhone;
  const phoneTel = normalizeTel(phone);
  const email = env.contactEmail;
  const name = env.siteName;

  return {
    ...env,
    name,
    legalName: `${name} Inc.`,
    domain: env.siteUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, ""),
    email,
    phone,
    phoneFormatted: phone,
    phoneTel,
    description: env.siteDescription,
    tagline: "Custom AI Voice Agents for US Businesses",
    headline: "Turn Every Customer Call Into an Opportunity.",
    subheadline:
      "Custom AI voice agents that answer calls, qualify leads, book appointments, send reminders, follow up with customers, and keep your business available 24/7 — without adding another employee.",
    trustStatement: "Built for US businesses that depend on calls, customers, and appointments.",
    primaryCtaText: "Book Your 15-Minute AI Discovery",
    secondaryCtaText: "Talk to Our AI",
    calculator: {
      aiCostPerMinute: env.aiCostPerMinute,
      maxProductiveMinutesPerEmployeePerMonth: 5000,
    },
    analytics: {
      gaId: env.gaId,
      gscVerification: env.gscVerification,
    },
    navLinks: [
      { label: "Solutions", href: "/#capabilities" },
      { label: "Industries", href: "/#industries" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "ROI Calculator", href: "/#calculator" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/#faq" },
    ],
    footerLinks: {
      solutions: [
        { label: "AI Voice Agents", href: "/ai-voice-agents" },
        { label: "AI Receptionist", href: "/ai-receptionist" },
        { label: "AI Appointment Booking", href: "/ai-appointment-booking" },
        { label: "Lead Qualification", href: "/ai-lead-qualification" },
        { label: "AI Customer Support", href: "/ai-customer-support" },
        { label: "Customer Follow-Up", href: "/#capabilities" },
      ],
      industries: [
        { label: "Dental Practices", href: "/industries/dental" },
        { label: "Medical Clinics", href: "/industries/medical" },
        { label: "HVAC Services", href: "/industries/hvac" },
        { label: "Plumbing Companies", href: "/industries/plumbing" },
        { label: "Roofing Contractors", href: "/industries/roofing" },
        { label: "Electrical Contractors", href: "/industries/electrical" },
        { label: "Landscaping & Lawn", href: "/industries/landscaping" },
        { label: "Real Estate Agencies", href: "/industries/real-estate" },
      ],
      company: [
        { label: "About ZTechAI", href: "/about" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Example Workflows", href: "/case-studies" },
        { label: "Pricing & Deployment", href: "/pricing" },
        { label: "Contact Us", href: "/contact" },
      ],
      resources: [
        { label: "Knowledge & Blog", href: "/blog" },
        { label: "Frequently Asked Questions", href: "/faq" },
        { label: "Security & Trust Architecture", href: "/security" },
        { label: "Integration Ecosystem", href: "/integrations" },
      ],
      legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Security Policy", href: "/security" },
      ],
    },
  };
}

/**
 * Validates configuration health at runtime
 */
export function validateRuntimeConfig(env: RuntimeEnv = getRuntimeConfig()): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check email
  if (!env.contactEmail || !env.contactEmail.includes("@")) {
    errors.push(`Invalid or missing contactEmail: "${env.contactEmail}"`);
  }

  // Check phone
  if (!env.contactPhone || env.contactPhone.replace(/\D/g, "").length < 7) {
    errors.push(`Invalid or missing contactPhone: "${env.contactPhone}"`);
  }

  // Check Cal.com booking URL
  if (!env.calBookingUrl || !env.calBookingUrl.startsWith("http")) {
    errors.push(`Invalid calBookingUrl: "${env.calBookingUrl}"`);
  } else if (!env.calBookingUrl.includes("cal.com")) {
    warnings.push(`calBookingUrl does not use cal.com domain: "${env.calBookingUrl}"`);
  }

  // Check AI Cost per minute
  if (typeof env.aiCostPerMinute !== "number" || isNaN(env.aiCostPerMinute) || env.aiCostPerMinute <= 0) {
    errors.push(`Invalid aiCostPerMinute: must be a positive number, got "${env.aiCostPerMinute}"`);
  }

  // Check Site URL
  if (!env.siteUrl || !env.siteUrl.startsWith("http")) {
    errors.push(`Invalid siteUrl: "${env.siteUrl}"`);
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * Dynamic Proxy getter that evaluates live runtime configuration on every access
 */
export const siteConfig: SiteConfig = new Proxy({} as SiteConfig, {
  get(_target, prop: string) {
    const live = getSiteConfig(getRuntimeConfig());
    return (live as unknown as Record<string, unknown>)[prop];
  },
});

export default siteConfig;
