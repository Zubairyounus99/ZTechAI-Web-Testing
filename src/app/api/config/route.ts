import { NextResponse } from "next/server";
import { getLiveConfig, validateRuntimeConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = getLiveConfig();
  const validation = validateRuntimeConfig(config);

  return NextResponse.json(
    {
      status: "online",
      timestamp: new Date().toISOString(),
      validation,
      runtimeEnvironment: {
        siteName: config.name,
        siteUrl: config.siteUrl,
        contactEmail: config.email,
        contactPhone: config.phone,
        phoneTel: config.phoneTel,
        calBookingUrl: config.calBookingUrl,
        calEmbedUrl: config.calEmbedUrl,
        aiCostPerMinute: config.calculator.aiCostPerMinute,
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
