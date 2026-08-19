// ==========================================================
// ZTechAI — Central Dynamic Runtime Configuration Layer
// Real-time evaluation across Server (SSR) and Client (Hydration)
// ==========================================================

export interface SiteConfig {
  name: string;
  legalName: string;
  domain: string;
  siteUrl: string;
  description: string;
  email: string;
  phone: string;
  phoneFormatted: string;
  phoneTel: string;
  calBookingUrl: string;
  calEmbedUrl: string;
  aiDemoUrl: string;
  tagline: string;
  headline: string;
  subheadline: string;
  trustStatement: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  socialLinks: {
    linkedin: string;
    youtube: string;
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
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

/**
 * Normalizes any phone string into a clean, RFC-compliant tel: link.
 * Example: "+1 (321) 499-87777" -> "+132149987777"
 */
export function normalizeTel(phone: string): string {
  if (!phone || typeof phone !== "string") return "";
  const trimmed = phone.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  return hasPlus ? `+${digits}` : digits;
}

// Safely retrieve live runtime environment variables from Window (client) or Process (server)
export function getRuntimeEnv(key: string, fallback: string = ""): string {
  if (typeof window !== "undefined") {
    const winEnv = (window as unknown as { __APP_ENV__?: Record<string, string> }).__APP_ENV__;
    if (winEnv && typeof winEnv[key] === "string" && winEnv[key].trim().length > 0) {
      return winEnv[key].trim();
    }
  }
  const procVal = process.env[key];
  if (typeof procVal === "string" && procVal.trim().length > 0) {
    return procVal.trim();
  }
  return fallback;
}

export function getLiveConfig(): SiteConfig {
  const name = getRuntimeEnv("NEXT_PUBLIC_SITE_NAME", "ZTechAI");
  const siteUrl = getRuntimeEnv("NEXT_PUBLIC_SITE_URL", "https://ztechai.us");
  const email = getRuntimeEnv("NEXT_PUBLIC_CONTACT_EMAIL", "admin@ztechai.us");
  const phone = getRuntimeEnv("NEXT_PUBLIC_CONTACT_PHONE", "+1 (321) 499-87777");

  const bookingUrl =
    getRuntimeEnv("NEXT_PUBLIC_CAL_BOOKING_URL") ||
    getRuntimeEnv("NEXT_PUBLIC_CALCOM_URL") ||
    "https://cal.com/zubair-younus-4tlv0b/ai-voice-agent";

  // If booking URL changed, compute embed URL dynamically
  const slug = bookingUrl
    .replace(/^https?:\/\/(app\.)?cal\.com\//, "")
    .replace(/\?.*$/, "")
    .trim();

  const embedUrl =
    getRuntimeEnv("NEXT_PUBLIC_CAL_EMBED_URL") ||
    `https://app.cal.com/${slug || "zubair-younus-4tlv0b/ai-voice-agent"}?embed=true&theme=dark&layout=month_view`;

  const rawCost = getRuntimeEnv("NEXT_PUBLIC_AI_COST_PER_MINUTE", getRuntimeEnv("AI_COST_PER_MINUTE", "0.30"));
  const parsedCost = Number(rawCost);
  const aiCostPerMinute = isNaN(parsedCost) || parsedCost <= 0 ? 0.30 : parsedCost;

  return {
    name,
    legalName: `${name} Inc.`,
    domain: "ztechai.us",
    siteUrl,
    description: getRuntimeEnv(
      "NEXT_PUBLIC_SITE_DESCRIPTION",
      "ZTechAI helps US businesses automate repetitive customer communication and operational tasks with custom AI voice agents that work 24/7."
    ),
    email,
    phone,
    phoneFormatted: phone,
    phoneTel: normalizeTel(phone),
    calBookingUrl: bookingUrl,
    calEmbedUrl: embedUrl,
    aiDemoUrl: getRuntimeEnv("NEXT_PUBLIC_AI_DEMO_URL", ""),
    tagline: "Custom AI Voice Agents for US Businesses",
    headline: "Turn Every Customer Call Into an Opportunity.",
    subheadline:
      "Custom AI voice agents that answer calls, qualify leads, book appointments, send reminders, follow up with customers, and keep your business available 24/7 — without adding another employee.",
    trustStatement: "Built for US businesses that depend on calls, customers, and appointments.",
    primaryCtaText: "Book Your 15-Minute AI Discovery",
    secondaryCtaText: "Talk to Our AI",
    socialLinks: {
      linkedin: getRuntimeEnv("NEXT_PUBLIC_LINKEDIN_URL", "https://linkedin.com/company/ztechai"),
      youtube: getRuntimeEnv("NEXT_PUBLIC_YOUTUBE_URL", ""),
      facebook: getRuntimeEnv("NEXT_PUBLIC_FACEBOOK_URL", ""),
      instagram: getRuntimeEnv("NEXT_PUBLIC_INSTAGRAM_URL", ""),
      whatsapp: getRuntimeEnv("NEXT_PUBLIC_WHATSAPP_URL", ""),
    },
    calculator: {
      aiCostPerMinute,
      maxProductiveMinutesPerEmployeePerMonth: 5000,
    },
    analytics: {
      gaId: getRuntimeEnv("NEXT_PUBLIC_GA_ID", "G-H57HRPFNJ9"),
      gscVerification: getRuntimeEnv("NEXT_PUBLIC_GSC_VERIFICATION", ""),
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

// Plain serializable singleton for initial rendering
export const siteConfig: SiteConfig = getLiveConfig();

export default siteConfig;
