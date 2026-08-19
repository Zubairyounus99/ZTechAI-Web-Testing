import { NextResponse } from "next/server";
import { sendLeadWebhook } from "@/lib/webhook";
import { sendLeadNotification } from "@/lib/email";

// In-memory sliding-window IP rate limiter
const ipRequestCounts = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string, limit: number = 10, windowMs: number = 600000): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || record.expiresAt < now) {
    ipRequestCounts.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";

    if (!checkRateLimit(ip, 12, 600000)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before submitting again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      name,
      businessName,
      email,
      phone,
      industry,
      website,
      automationGoals,
      automationNeed,
      honeypot,
    } = body;

    // Spam honeypot trap
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Request received." }, { status: 200 });
    }

    // Required fields validation
    if (!name || !businessName || !email || !phone || !industry) {
      return NextResponse.json(
        { error: "Missing required fields. Please complete all required information." },
        { status: 400 }
      );
    }

    // Input sanitization & field length validation
    const cleanName = String(name).trim().slice(0, 100);
    const cleanBusiness = String(businessName).trim().slice(0, 120);
    const cleanEmail = String(email).trim().toLowerCase().slice(0, 120);
    const cleanPhone = String(phone).trim().slice(0, 50);
    const cleanIndustry = String(industry).trim().slice(0, 80);
    const cleanWebsite = website ? String(website).trim().slice(0, 200) : "";
    const cleanAutomation = (automationNeed || automationGoals) ? String(automationNeed || automationGoals).trim().slice(0, 2000) : "";
    const submittedAt = new Date().toISOString();
    const sourceUrl = req.headers.get("referer") || "https://ztechai.us";

    // Standard RFC 5322 compatible email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid business email address." },
        { status: 400 }
      );
    }

    // 1. Dynamic Webhook Dispatch (dispatches only if LEAD_WEBHOOK_URL is configured in .env)
    const webhookResult = await sendLeadWebhook({
      name: cleanName,
      businessName: cleanBusiness,
      email: cleanEmail,
      phone: cleanPhone,
      industry: cleanIndustry,
      website: cleanWebsite,
      automationNeed: cleanAutomation,
      submittedAt,
      source: "ztechai_voice_website",
      sourceUrl,
      ip,
    });

    // 2. Secondary Dispatch: Optional direct SMTP email if configured
    try {
      await sendLeadNotification({
        name: cleanName,
        businessName: cleanBusiness,
        email: cleanEmail,
        phone: cleanPhone,
        industry: cleanIndustry,
        website: cleanWebsite,
        automationNeed: cleanAutomation,
        sourceUrl,
        submittedAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
      });
    } catch (smtpErr) {
      console.warn("SMTP notification attempt notice:", smtpErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your AI opportunity request has been received. Our team will review your business workflow and prepare your custom AI blueprint.",
        webhookDispatched: !webhookResult.skipped && webhookResult.success,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Contact API processing error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again or book a discovery call directly." },
      { status: 500 }
    );
  }
}
