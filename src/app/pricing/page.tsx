"use client";

import React, { useState } from "react";
import { CalModal } from "@/components/ui/CalModal";
import { CostComparison } from "@/components/sections/CostComparison";
import { FaqSection } from "@/components/sections/FaqSection";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FinalCta } from "@/components/sections/FinalCta";
import { trackEvent } from "@/lib/analytics";
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function PricingPage() {
  const [calOpen, setCalOpen] = useState(false);

  const handleBook = () => {
    trackEvent("cta_book_demo", { source: "pricing_page" });
    setCalOpen(true);
  };

  return (
    <div className="pt-28 pb-20 space-y-24">
      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Tailored Architecture & Transparent Economics</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Let&apos;s Build the Right AI Agent for{" "}
          <span className="text-brand-500 dark:text-brand-400">Your Business.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
          Because every business operates with distinct call volumes, software tools, and triage rules, we do not force you into rigid, one-size-fits-all subscription plans.
        </p>
      </section>

      {/* Deployment Structure Card */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brand-500/40 bg-card-bg p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-surface-border">
            <div>
              <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-bold text-brand-600 dark:text-brand-400">
                Custom Production Deployment
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
                Turnkey Engineering & Managed Operations
              </h2>
            </div>
            <button
              onClick={handleBook}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 px-6 py-3.5 text-xs font-semibold text-white shadow-lg shadow-brand-500/25 hover:scale-[1.02] transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Discovery Call</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-display text-base font-bold text-foreground">
                Pricing is structured around 2 components:
              </h3>
              <div className="space-y-3">
                <div className="rounded-2xl border border-surface-border bg-surface-muted p-4">
                  <p className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">1. Initial Setup & Engineering</p>
                  <p className="text-sm font-bold text-foreground mt-1">Custom Knowledge & System Integration</p>
                  <p className="text-xs text-text-muted mt-1 font-normal">
                    Ingesting business rules, testing edge cases, custom prompt guardrails, and calendar/CRM webhook connections.
                  </p>
                </div>

                <div className="rounded-2xl border border-surface-border bg-surface-muted p-4">
                  <p className="text-xs font-bold text-accent-600 dark:text-accent-400 uppercase tracking-wider">2. Ongoing Operational Layer</p>
                  <p className="text-sm font-bold text-foreground mt-1">Predictable Usage & Continuous Optimization</p>
                  <p className="text-xs text-text-muted mt-1 font-normal">
                    Monthly phone line capacity, real-time voice latency infrastructure, transcript dashboards, and monthly prompt tuning.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-base font-bold text-foreground">
                What Influences Your Deployment Blueprint:
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-text-muted font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 dark:text-brand-400 shrink-0" />
                  <span>Monthly inbound/outbound call volume</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 dark:text-brand-400 shrink-0" />
                  <span>Complexity of appointment booking rules & buffer logic</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 dark:text-brand-400 shrink-0" />
                  <span>Number of connected software tools (CRM, PMS, SMS)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 dark:text-brand-400 shrink-0" />
                  <span>Number of dedicated phone lines or office locations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 dark:text-brand-400 shrink-0" />
                  <span>Specialized healthcare or multi-specialty triage rules</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CostComparison />
      <LeadCaptureForm />
      <FaqSection />
      <FinalCta />

      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </div>
  );
}
