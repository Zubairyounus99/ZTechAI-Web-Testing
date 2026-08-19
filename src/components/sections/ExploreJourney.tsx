"use client";

import React, { useState } from "react";
import { CalModal } from "@/components/ui/CalModal";
import { trackEvent } from "@/lib/analytics";
import {
  Sparkles,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Search,
  Bot,
  Activity,
  CheckCircle2,
  PhoneCall,
  Clock,
} from "lucide-react";

export function ExploreJourney() {
  const [calOpen, setCalOpen] = useState(false);

  const handleBook = () => {
    trackEvent("booking_cta_clicked", { source: "explore_journey_section" });
    setCalOpen(true);
  };

  return (
    <section className="py-24 sm:py-32 relative bg-surface border-y border-surface-border overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow ambient-glow-teal top-1/2 left-1/3 h-96 w-96" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Risk-Free Operational Evaluation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Don&apos;t Guess What AI Could Do.{" "}
            <span className="text-brand-500 dark:text-brand-400">Explore It.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed font-normal">
            Start with a conversation. We&apos;ll identify the parts of your business that could be handled by an AI employee — from answering calls to booking, reminders, customer support, and follow-ups.
          </p>
        </div>

        {/* 3-Stage Low-Risk Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Explore */}
          <div className="group relative rounded-3xl border border-surface-border bg-card-bg p-7 sm:p-8 flex flex-col justify-between shadow-xl hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Stage 01
                </span>
                <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[11px] font-semibold text-text-muted">
                  Discovery Call
                </span>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                <Search className="h-6 w-6" />
              </div>

              <h3 className="font-display text-xl font-bold text-foreground">
                Explore Your AI Opportunity
              </h3>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                A 15-minute discovery call to identify where phone friction exists: repetitive FAQ questions, after-hours missed opportunities, lead qualification, and scheduling bottlenecks.
              </p>

              <ul className="space-y-2 pt-2 text-xs text-foreground font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>No upfront payment required</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>No obligation or high pressure</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Clear operational mapping</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Experience */}
          <div className="group relative rounded-3xl border border-brand-500/40 bg-card-bg p-7 sm:p-8 flex flex-col justify-between shadow-2xl ring-2 ring-brand-500/15 hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                  Stage 02
                </span>
                <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-[11px] font-bold text-brand-600 dark:text-brand-400">
                  Custom Prototype
                </span>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400 group-hover:bg-accent-600 group-hover:text-white transition-colors">
                <Bot className="h-6 w-6" />
              </div>

              <h3 className="font-display text-xl font-bold text-foreground">
                See Your AI Employee in Action
              </h3>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                Experience an AI voice agent prototype custom-configured around your real services, pricing parameters, business hours, and calendar rules before committing to deployment.
              </p>

              <ul className="space-y-2 pt-2 text-xs text-foreground font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                  <span>Live test on your real scenarios</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                  <span>Natural speech cadence & voice</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                  <span>Custom appointment triage</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Test */}
          <div className="group relative rounded-3xl border border-surface-border bg-card-bg p-7 sm:p-8 flex flex-col justify-between shadow-xl hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Stage 03
                </span>
                <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[11px] font-semibold text-text-muted">
                  Workflow Validation
                </span>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Activity className="h-6 w-6" />
              </div>

              <h3 className="font-display text-xl font-bold text-foreground">
                Test With Real Business Workflows
              </h3>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                Where appropriate and subject to suitability, evaluate the live voice agent with real-world workflows for a limited trial before making any long-term operational decision.
              </p>

              <ul className="space-y-2 pt-2 text-xs text-foreground font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Review actual call outcomes & logs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Analyze response quality & statistics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Make an informed data-driven choice</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="mt-14 max-w-3xl mx-auto rounded-3xl border border-surface-border bg-surface-muted/60 p-6 sm:p-8 text-center space-y-4 shadow-lg">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            Book Your Free 15-Minute AI Discovery
          </h3>
          <p className="text-xs sm:text-sm text-text-muted max-w-lg mx-auto font-normal">
            You don&apos;t have to guess or take our word for it. Discover where AI can streamline your phone operations first.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleBook}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 px-8 py-4 text-xs sm:text-sm font-semibold text-white shadow-xl shadow-brand-500/25 hover:scale-[1.02] transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Your 15-Minute AI Discovery</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-text-muted font-medium pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-500" />
            <span>No upfront payment • No obligation • No high-pressure sales</span>
          </div>
        </div>
      </div>

      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </section>
  );
}
