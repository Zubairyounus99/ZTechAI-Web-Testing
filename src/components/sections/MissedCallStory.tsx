"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { CalModal } from "@/components/ui/CalModal";
import { trackEvent } from "@/lib/analytics";
import {
  PhoneMissed,
  PhoneCall,
  Clock,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export function MissedCallStory() {
  const [activeTab, setActiveTab] = useState<"without" | "with">("without");
  const [calOpen, setCalOpen] = useState(false);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-surface-muted/30 border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
            <Clock className="h-3.5 w-3.5" />
            <span>The Reality of Lost Calls</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Your Customers <span className="text-rose-600 dark:text-rose-400">Don&apos;t Call Back.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            When a homeowner or patient calls your business after hours or while your front desk is busy, they won&apos;t leave a voicemail. They immediately dial the next business on Google.
          </p>

          {/* Interactive Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex rounded-2xl border border-surface-border bg-card-bg p-1 shadow-sm">
              <button
                onClick={() => setActiveTab("without")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "without"
                    ? "bg-rose-600 text-white shadow-md"
                    : "text-text-muted hover:text-foreground"
                }`}
              >
                Without ZTechAI (Voicemail)
              </button>
              <button
                onClick={() => setActiveTab("with")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "with"
                    ? "bg-brand-500 text-white shadow-md"
                    : "text-text-muted hover:text-foreground"
                }`}
              >
                With ZTechAI (Instant Answer)
              </button>
            </div>
          </div>
        </div>

        {/* Narrative Flow Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: The Bleeding Status Quo */}
          <div
            className={`rounded-3xl border p-6 sm:p-8 transition-all cursor-pointer ${
              activeTab === "without"
                ? "border-rose-500/40 bg-card-bg shadow-2xl ring-2 ring-rose-500/20"
                : "border-surface-border bg-surface-muted/40 opacity-70 hover:opacity-100"
            }`}
            onClick={() => setActiveTab("without")}
          >
            <div className="flex items-center justify-between pb-6 border-b border-surface-border">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  The Status Quo
                </span>
                <h3 className="font-display text-xl font-bold text-foreground mt-1">
                  8:47 PM — Unanswered Call
                </h3>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <PhoneMissed className="h-5 w-5" />
              </div>
            </div>

            {/* Step Progression */}
            <div className="my-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-xs font-bold text-rose-600 dark:text-rose-400">
                  1
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Phone Rings 5 Times</p>
                  <p className="text-xs text-text-muted mt-0.5 font-medium">
                    Your office is closed or your staff is tied up assisting another customer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-xs font-bold text-rose-600 dark:text-rose-400">
                  2
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Sent to Standard Voicemail</p>
                  <p className="text-xs text-text-muted mt-0.5 font-medium">
                    &quot;Please leave a message and we will get back to you during regular business hours.&quot;
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-xs font-bold text-rose-600 dark:text-rose-400">
                  3
                </div>
                <div>
                  <p className="text-sm font-bold text-rose-600 dark:text-rose-400">Customer Dials Competitor</p>
                  <p className="text-xs text-text-muted mt-0.5 font-medium">
                    In urgent need of repair or emergency dental care, they immediately call the next provider.
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Consequence */}
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                  <TrendingDown className="h-4 w-4" />
                  Outcome
                </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-$1,200 Average Job Value</span>
              </div>
              <p className="text-xs text-text-muted mt-1.5 font-medium">
                Lost customer, lost appointment, and wasted marketing dollars on the original click.
              </p>
            </div>
          </div>

          {/* Card 2: The ZTechAI Automated Pipeline */}
          <div
            className={`rounded-3xl border p-6 sm:p-8 transition-all cursor-pointer ${
              activeTab === "with"
                ? "border-brand-500/40 bg-card-bg shadow-2xl ring-2 ring-brand-500/20"
                : "border-surface-border bg-surface-muted/40 opacity-70 hover:opacity-100"
            }`}
            onClick={() => setActiveTab("with")}
          >
            <div className="flex items-center justify-between pb-6 border-b border-surface-border">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  With ZTechAI Voice Agent
                </span>
                <h3 className="font-display text-xl font-bold text-foreground mt-1">
                  8:47 PM — Instant Conversion
                </h3>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 dark:text-brand-400">
                <PhoneCall className="h-5 w-5" />
              </div>
            </div>

            {/* Step Progression */}
            <div className="my-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-600 dark:text-brand-400">
                  1
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">AI Answers on Ring One</p>
                  <p className="text-xs text-text-muted mt-0.5 font-medium">
                    Greets customer naturally with your business name and identifies urgent need.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-400">
                  2
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Evaluates Calendar & Rules</p>
                  <p className="text-xs text-text-muted mt-0.5 font-medium">
                    Qualifies property/symptom, checks live technician/chair buffer, and locks confirmed time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-400">
                  3
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-600 dark:text-brand-300">Automated SMS Confirmation</p>
                  <p className="text-xs text-text-muted mt-0.5 font-medium">
                    Customer receives text with calendar invite, intake instructions, and arrival tracking.
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Consequence */}
            <div className="rounded-2xl border border-brand-500/20 bg-brand-500/10 p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  Outcome
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">Appointment Booked & Locked</span>
              </div>
              <p className="text-xs text-text-muted mt-1.5 font-medium">
                Business owner wakes up to confirmed jobs on the calendar and complete intake notes in the CRM.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              trackEvent("cta_book_demo", { source: "missed_call_story" });
              setCalOpen(true);
            }}
            className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-brand-500/25 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>Never Miss Another Opportunity — {siteConfig.primaryCtaText}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </section>
  );
}
