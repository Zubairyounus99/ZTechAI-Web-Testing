"use client";

import React, { useState } from "react";
import { industriesData, IndustryData } from "@/data/industries";
import { IndustryModal } from "@/components/ui/IndustryModal";
import { CalModal } from "@/components/ui/CalModal";
import {
  Stethoscope,
  HeartPulse,
  ThermometerSnowflake,
  Wrench,
  Home,
  Zap,
  Trees,
  Building2,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Stethoscope,
  HeartPulse,
  ThermometerSnowflake,
  Wrench,
  Home,
  Zap,
  Trees,
  Building2,
};

export function IndustryShowcase() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);

  const handleOpenModal = (industry: IndustryData) => {
    setSelectedIndustry(industry);
    setModalOpen(true);
  };

  return (
    <section id="industries" className="py-24 sm:py-32 relative bg-surface-muted/30 border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Tailored Industry Blueprints</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Built Around <span className="text-brand-500 dark:text-brand-400">Your Business.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            We don&apos;t build generic chatbots. We build deeply customized voice AI employees trained on the specific operational workflows, software, and terminology of your industry.
          </p>
        </div>

        {/* 8 Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industriesData.map((industry) => {
            const Icon = ICON_MAP[industry.icon] || Building2;
            return (
              <div
                key={industry.id}
                onClick={() => handleOpenModal(industry)}
                className="group cursor-pointer rounded-3xl border border-surface-border bg-card-bg p-6 transition-all duration-300 hover:border-brand-500/40 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 dark:text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold rounded bg-surface-muted px-2 py-0.5 text-text-muted">
                      {industry.shortTitle}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-1.5 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
                    {industry.name}
                  </h3>

                  <p className="text-xs text-text-muted leading-relaxed mb-4 font-normal">
                    {industry.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-border flex items-center justify-between text-xs font-bold text-brand-600 dark:text-brand-400">
                  <span>View Call Workflow</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-lg">
          <div>
            <h4 className="font-display text-lg font-bold text-foreground">
              Don&apos;t see your specific industry listed?
            </h4>
            <p className="text-xs text-text-muted mt-1 max-w-xl font-normal">
              If your business receives incoming phone calls, answers repetitive questions, qualifies customer requests, or schedules appointments, ZTechAI can automate it.
            </p>
          </div>
          <button
            onClick={() => setCalOpen(true)}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-surface-muted border border-surface-border px-6 py-3 text-xs font-bold text-foreground hover:border-brand-500 hover:text-brand-500 transition-all"
          >
            <span>See How It Works for My Business</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <IndustryModal
        industry={selectedIndustry}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </section>
  );
}
