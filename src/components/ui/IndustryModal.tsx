"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { IndustryData } from "@/data/industries";
import { CalModal } from "@/components/ui/CalModal";
import { trackEvent } from "@/lib/analytics";
import {
  X,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface IndustryModalProps {
  industry: IndustryData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IndustryModal({ industry, isOpen, onClose }: IndustryModalProps) {
  const [calOpen, setCalOpen] = React.useState(false);

  useEffect(() => {
    if (isOpen && industry) {
      document.body.style.overflow = "hidden";
      trackEvent("industry_selected", { industry: industry.slug });
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, industry]);

  if (!isOpen || !industry) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Dialog Content */}
        <div className="relative z-10 my-8 w-full max-w-3xl rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-8 text-foreground shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-surface-border">
            <div>
              <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-400">
                {industry.badge}
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground mt-2">
                {industry.name}
              </h3>
              <p className="text-sm text-text-muted mt-1">{industry.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
              aria-label="Close industry modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Dialogue Demonstration */}
          <div className="my-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Live Call Conversation Sample
              </p>
              <Link
                href={`/industries/${industry.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 dark:text-brand-400 hover:underline"
              >
                <span>Full Blueprint Page</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            <div className="rounded-2xl border border-surface-border bg-surface-muted/60 p-4 space-y-3">
              {industry.sampleTranscript.map((line, idx) => (
                <div key={idx} className="space-y-1 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`font-bold shrink-0 ${
                        line.speaker === "Caller"
                          ? "text-accent-600 dark:text-accent-400"
                          : "text-brand-600 dark:text-brand-400"
                      }`}
                    >
                      {line.speaker}:
                    </span>
                    <p className="text-foreground leading-relaxed font-medium">&quot;{line.text}&quot;</p>
                  </div>
                  {line.action && (
                    <div className="ml-6 inline-flex items-center gap-1.5 rounded bg-brand-500/10 px-2.5 py-0.5 text-[11px] font-mono text-brand-600 dark:text-brand-300 border border-brand-500/20">
                      <Sparkles className="h-3 w-3" />
                      <span>{line.action}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connected Workflows */}
          <div className="space-y-3 mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Key Automated Workflows
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {industry.keyWorkflows.map((workflow, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-xl border border-surface-border bg-surface-muted/50 p-2.5 text-xs text-foreground font-medium"
                >
                  <CheckCircle2 className="h-4 w-4 text-brand-500 dark:text-brand-400 shrink-0" />
                  <span>{workflow}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Systems Connected */}
          <div className="mb-6 rounded-xl border border-surface-border bg-surface-muted/40 p-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted font-medium">Verified Integrations:</span>
              <span className="font-mono text-foreground font-bold">
                {industry.systemsConnected.join(" • ")}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-surface-border">
            <Link
              href={`/industries/${industry.slug}`}
              onClick={onClose}
              className="text-xs font-semibold text-brand-500 dark:text-brand-400 hover:underline text-center sm:text-left"
            >
              View Full {industry.shortTitle} Case Study &amp; Integration Blueprint →
            </Link>
            <button
              onClick={() => {
                onClose();
                setCalOpen(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-brand-500/20 hover:scale-[1.02] transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Book a {industry.shortTitle} Demo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
