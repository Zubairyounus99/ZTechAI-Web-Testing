"use client";

import React, { useState, useEffect } from "react";
import { useConfig } from "@/components/providers/ConfigProvider";
import { CalModal } from "@/components/ui/CalModal";
import { AudioWaveform } from "@/components/ui/AudioWaveform";
import { trackEvent } from "@/lib/analytics";
import {
  Calendar,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  CalendarCheck,
  Building2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Volume2,
} from "lucide-react";

export function Hero() {
  const { primaryCtaText, secondaryCtaText, trustStatement, subheadline } = useConfig();
  const [calOpen, setCalOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Cinematic animated progression through the Hero Call-to-CRM pipeline
  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleBookDemo = () => {
    trackEvent("cta_book_demo", { source: "hero_primary" });
    setCalOpen(true);
  };

  const handleTalkToAi = () => {
    trackEvent("cta_talk_to_ai", { source: "hero_secondary" });
    const demoEl = document.getElementById("demo");
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden flex items-center bg-background">
      {/* Background ambient lighting */}
      <div className="ambient-glow ambient-glow-teal top-1/4 -left-48 h-96 w-96" />
      <div className="ambient-glow ambient-glow-blue top-1/3 -right-48 h-96 w-96" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-muted px-4 py-1.5 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-xs font-semibold text-text-muted">
                {trustStatement}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Turn Every Customer Call{" "}
              <span className="bg-gradient-to-r from-brand-500 via-teal-400 to-accent-600 dark:from-brand-400 dark:via-teal-300 dark:to-accent-400 bg-clip-text text-transparent">
                Into an Opportunity.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {subheadline}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={handleBookDemo}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-500 via-brand-600 to-accent-600 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.02] hover:shadow-brand-500/40 active:scale-[0.98]"
                >
                  <Calendar className="h-5 w-5" />
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handleTalkToAi}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl border border-surface-border bg-surface-muted px-6 py-4 text-base font-semibold text-foreground backdrop-blur-md transition-all hover:border-brand-500/40 hover:bg-surface-elevated"
                >
                  <Sparkles className="h-5 w-5 text-brand-500 dark:text-brand-400" />
                  <span>{secondaryCtaText}</span>
                </button>
              </div>
              <p className="text-xs text-text-muted font-medium flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-500" />
                <span>No upfront payment • No obligation • 15-minute discovery</span>
              </p>
            </div>

            {/* Quick Proof Points */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-surface-border max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="font-display text-xl sm:text-2xl font-bold text-foreground">24/7/365</p>
                <p className="text-xs text-text-muted font-medium">Instant Phone Pickup</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-bold text-foreground">0 Sec</p>
                <p className="text-xs text-text-muted font-medium">Customer Hold Time</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-bold text-foreground">100%</p>
                <p className="text-xs text-text-muted font-medium">Direct Calendar Sync</p>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Interactive Call-to-Action Simulation */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl border border-surface-border bg-card-bg p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
              {/* Card Header Status */}
              <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Live Call Engine Active
                  </span>
                </div>
                <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                  US Local Business Pipeline
                </span>
              </div>

              {/* Dynamic Call Flow Scene */}
              <div className="my-5 space-y-4">
                {/* Caller & AI Wave */}
                <div className="rounded-2xl border border-surface-border bg-surface-muted p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-500/15 text-accent-600 dark:text-accent-400">
                        <PhoneCall className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">Incoming Inbound Call</p>
                        <p className="text-[10px] text-text-muted">Caller: (312) 840-9182 • 8:47 PM</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">
                      Ring 1 • Connected
                    </span>
                  </div>

                  <AudioWaveform isActive={true} variant="teal" className="h-8" />
                </div>

                {/* Real-Time Transcript & Intent */}
                <div className="rounded-2xl border border-surface-border bg-surface-elevated p-3.5 text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-accent-600 dark:text-accent-400 shrink-0">Caller:</span>
                    <p className="text-text-muted font-medium">
                      &quot;Hi, our AC unit stopped working and it&apos;s 90 degrees inside. Can someone come out today?&quot;
                    </p>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-surface-border/40">
                    <span className="font-bold text-brand-600 dark:text-brand-400 shrink-0">ZTechAI:</span>
                    <p className="text-foreground font-medium">
                      &quot;I understand that&apos;s an urgent emergency. We have an opening between 2:00 PM and 4:00 PM today. Would you like me to reserve that technician for you?&quot;
                    </p>
                  </div>
                </div>

                {/* Pipeline State Cards */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div
                    className={`rounded-xl border p-2.5 transition-all ${
                      stepIndex >= 1
                        ? "border-brand-500/40 bg-brand-500/10 text-brand-700 dark:text-brand-300 font-semibold"
                        : "border-surface-border bg-surface-muted text-text-muted opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-500 dark:text-brand-400" />
                      <span className="text-[11px] font-bold">Intent Detected</span>
                    </div>
                    <p className="text-[10px] mt-1 truncate">Emergency Diagnostic Dispatch</p>
                  </div>

                  <div
                    className={`rounded-xl border p-2.5 transition-all ${
                      stepIndex >= 2
                        ? "border-accent-500/40 bg-accent-500/10 text-accent-700 dark:text-accent-300 font-semibold"
                        : "border-surface-border bg-surface-muted text-text-muted opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <CalendarCheck className="h-3.5 w-3.5 text-accent-500 dark:text-accent-400" />
                      <span className="text-[11px] font-bold">Calendar Locked</span>
                    </div>
                    <p className="text-[10px] mt-1 truncate">Today 2:00 PM • Tech Mike</p>
                  </div>
                </div>
              </div>

              {/* Bottom Result Pill */}
              <div className="flex items-center justify-between rounded-xl bg-surface-muted border border-brand-500/25 px-3.5 py-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-brand-500 dark:text-brand-400" />
                  <span className="font-semibold text-foreground">CRM & Dispatch Updated</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  + Confirmed Booking
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </section>
  );
}
