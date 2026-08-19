// Analytics Abstraction Layer for ZTechAI
// Supports Google Analytics 4 (GA4), Meta Pixel, and custom webhooks.

export type AnalyticsEvent =
  | "cta_book_demo"
  | "cta_talk_to_ai"
  | "hero_cta_click"
  | "book_demo_click"
  | "booking_cta_clicked"
  | "booking_modal_opened"
  | "booking_modal_failed"
  | "booking_page_opened"
  | "calendar_open"
  | "calendar_booking"
  | "contact_form_started"
  | "contact_form_submitted"
  | "contact_form_failed"
  | "contact_submission"
  | "phone_click"
  | "email_click"
  | "lead_form_submit"
  | "roi_calculator_start"
  | "roi_calculator_used"
  | "roi_calculator_complete"
  | "industry_selected"
  | "ai_demo_open"
  | "ai_demo_start"
  | "ai_demo_complete"
  | "voice_demo_started"
  | "voice_demo_completed"
  | "voice_demo_scenario_change"
  | "outbound_click"
  | "faq_opened";

export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined") return;

  // Log in development for testing
  if (process.env.NODE_ENV === "development") {
    console.log(`[ZTechAI GA4 Event] ${event}`, properties);
  }

  // Google Analytics 4 (gtag)
  if (typeof (window as unknown as { gtag?: (type: string, name: string, params?: object) => void }).gtag === "function") {
    (window as unknown as { gtag: (type: string, name: string, params?: object) => void }).gtag("event", event, {
      ...properties,
      send_to: (window as unknown as { __APP_ENV__?: { gaId?: string } }).__APP_ENV__?.gaId,
    });
  }

  // Meta Pixel (fbq)
  if (typeof (window as unknown as { fbq?: (type: string, name: string, params?: object) => void }).fbq === "function") {
    (window as unknown as { fbq: (type: string, name: string, params?: object) => void }).fbq("trackCustom", event, properties);
  }
}
