import React from "react";
import { Metadata } from "next";
import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { Capabilities } from "@/components/sections/Capabilities";
import { WorkflowVisualizer } from "@/components/sections/WorkflowVisualizer";
import { Integrations } from "@/components/sections/Integrations";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { CalendarCheck } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig(getServerRuntimeConfig());
  return {
    title: `AI Appointment Booking & Scheduling Over the Phone | ${config.name}`,
    description:
      `Automate inbound appointment booking with conversational AI. Real-time calendar lookup, zero double-bookings, automated SMS confirmations, and direct CRM sync.`,
    alternates: { canonical: `${config.siteUrl}/ai-appointment-booking` },
    openGraph: {
      title: `AI Appointment Booking & Scheduling Over the Phone | ${config.name}`,
      description:
        "Turn phone calls into confirmed calendar bookings 24/7. Real-time calendar verification and instant SMS follow-ups.",
      url: `${config.siteUrl}/ai-appointment-booking`,
      type: "website",
    },
  };
}

export default function AiAppointmentBookingPage() {
  const siteConfig = getSiteConfig(getServerRuntimeConfig());
  const pageUrl = `${siteConfig.siteUrl}/ai-appointment-booking`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.siteUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "AI Appointment Booking",
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        "name": "Automated Phone Appointment Scheduling",
        "serviceType": "Telephony Calendar Automation",
        "provider": {
          "@type": "Organization",
          "name": "ZTechAI",
          "url": siteConfig.siteUrl,
        },
        "description":
          "AI voice agents checking calendar availability in real time and locking customer bookings directly over phone calls.",
        "areaServed": {
          "@type": "Country",
          "name": "United States",
        },
      },
    ],
  };

  return (
    <div className="pt-28 pb-20 space-y-24 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
          <CalendarCheck className="h-3.5 w-3.5" />
          <span>Real-Time Calendar Telephony</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Turn Telephone Calls Into{" "}
          <span className="text-brand-500 dark:text-brand-400">Locked Calendar Bookings.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-normal">
          No phone tag, voicemail delays, or double-booking. The AI voice agent reads live schedule availability, negotiates convenient times, and locks appointments with instant SMS confirmations.
        </p>
      </section>

      <Capabilities />
      <WorkflowVisualizer />
      <Integrations />
      <LeadCaptureForm />
      <FaqSection />
      <FinalCta />
    </div>
  );
}
