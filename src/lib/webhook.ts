export interface LeadWebhookPayload {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  industry: string;
  website?: string;
  automationNeed?: string;
  submittedAt: string;
  source: string;
  sourceUrl?: string;
  ip?: string;
}

/**
 * Dispatches the form submission data via HTTP POST to the configured LEAD_WEBHOOK_URL.
 * If no LEAD_WEBHOOK_URL is configured, skips dispatch gracefully without error.
 */
export async function sendLeadWebhook(
  payload: LeadWebhookPayload
): Promise<{ success: boolean; skipped?: boolean; error?: string }> {
  const rawUrl = process.env.LEAD_WEBHOOK_URL || process.env.WEBHOOK_URL;
  const webhookUrl = rawUrl ? rawUrl.trim() : "";

  // If no webhook URL is configured, gracefully skip without sending any network request
  if (!webhookUrl) {
    console.info("ℹ️ LEAD_WEBHOOK_URL is not configured. Skipping webhook dispatch.");
    return { success: true, skipped: true };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "ZTechAI-Website/1.0",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`⚠️ Webhook returned status ${response.status} from ${webhookUrl}`);
      return {
        success: false,
        error: `Webhook returned HTTP status ${response.status}`,
      };
    }

    console.info(`✅ Successfully dispatched lead to Webhook: ${webhookUrl} for ${payload.businessName}`);
    return { success: true, skipped: false };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Network error";
    console.error(`❌ Failed to dispatch lead HTTP request to webhook (${webhookUrl}):`, errorMsg);
    return {
      success: false,
      error: errorMsg,
    };
  }
}
