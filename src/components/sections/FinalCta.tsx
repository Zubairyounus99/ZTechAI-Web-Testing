"use client";

import React, { useState } from "react";
import { useConfig } from "@/components/providers/ConfigProvider";
import { CalModal } from "@/components/ui/CalModal";
import { trackEvent } from "@/lib/analytics";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
} from "lucide-react";

export function FinalCta() {
  const { email, phone, phoneTel, phoneFormatted, primaryCtaText, secondaryCtaText } = useConfig();
  const [calOpen, setCalOpen] = useState(false);

  const handleBookDemo = () => {
    trackEvent("cta_book_demo", { source: "final_cta" });
    setCalOpen(true);
  };

  const handleTalkToAi = () => {
    trackEvent("cta_talk_to_ai", { source: "final_cta" });
    const demoEl = document.getElementById("demo");
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#demo";
    }
  };

  return (
    <section className="py-24 sm:py-32 relative bg-surface border-t border-surface-border overflow-hidden">
      {/* Background ambient light */}
      <div className="ambient-glow ambient-glow-teal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 opacity-30" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Zero Risk • 15-Minute Engineering Discovery</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
          Ready to Stop Missing Customer Calls and Start Automating?
        </h2>

        <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
          Book a 15-minute discovery session with our technical team. We&apos;ll evaluate your current call volume, map your ideal operational workflow, and show you exactly what a custom voice AI employee would sound like for your business.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleBookDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-500 via-brand-600 to-accent-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-500/25 hover:scale-[1.02] hover:shadow-brand-500/40 active:scale-[0.98] transition-all"
            >
              <Calendar className="h-5 w-5" />
              <span>{primaryCtaText}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={handleTalkToAi}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-muted px-7 py-4 text-base font-semibold text-foreground hover:border-brand-500/40 hover:bg-surface-elevated transition-all"
            >
              <Sparkles className="h-5 w-5 text-brand-500 dark:text-brand-400" />
              <span>{secondaryCtaText}</span>
            </button>
          </div>
          <p className="text-xs text-text-muted font-medium">
            No upfront payment • No obligation • 15-minute discovery
          </p>
        </div>

        {/* Direct Contacts */}
        <div className="pt-8 border-t border-surface-border flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-text-muted font-medium">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
            >
              <Mail className="h-4 w-4 text-brand-500 dark:text-brand-400" />
              <span>{email}</span>
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phoneTel}`}
              className="flex items-center gap-2 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
            >
              <Phone className="h-4 w-4 text-brand-500 dark:text-brand-400" />
              <span>{phoneFormatted}</span>
            </a>
          )}
        </div>
      </div>

      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </section>
  );
}
