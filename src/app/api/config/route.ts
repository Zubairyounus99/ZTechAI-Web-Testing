import { NextResponse } from "next/server";
import { getServerRuntimeConfig, validateRuntimeConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = getServerRuntimeConfig();
  const validation = validateRuntimeConfig(config);

  return NextResponse.json(
    {
      status: "online",
      timestamp: new Date().toISOString(),
      validation,
      runtimeEnvironment: {
        siteName: config.siteName,
        siteUrl: config.siteUrl,
        contactEmail: config.contactEmail,
        contactPhone: config.contactPhone,
        phoneTel: config.contactPhone.replace(/\D/g, ""),
        calBookingUrl: config.calBookingUrl,
        calEmbedUrl: config.calEmbedUrl,
        aiCostPerMinute: config.aiCostPerMinute,
        gaId: config.gaId,
        socialLinks: config.socialLinks,
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
}
