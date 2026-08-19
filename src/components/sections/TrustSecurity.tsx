import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  UserCheck,
  FileCheck,
  EyeOff,
  Server,
} from "lucide-react";

interface TrustItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const TRUST_PILLARS: TrustItem[] = [
  {
    title: "100% Customer Data Ownership",
    description:
      "You retain full ownership of all customer conversation records, phone numbers, and transcripts. We never sell your data or use it to train public models.",
    icon: Lock,
  },
  {
    title: "Zero Hallucination Guardrails",
    description:
      "Our agents are strictly bounded by your verified business knowledge. If a question is outside its approved scope, it transfers to your team rather than guessing.",
    icon: ShieldCheck,
  },
  {
    title: "Instant Human Escalation",
    description:
      "Calls are seamlessly warm-transferred to on-call staff, triage nurses, or technicians whenever specific urgency triggers or caller requests are met.",
    icon: UserCheck,
  },
  {
    title: "Configurable Data Retention",
    description:
      "Set automated purge schedules for audio recordings and transcripts to comply with internal company data governance policies.",
    icon: EyeOff,
  },
  {
    title: "Encrypted Transport & Storage",
    description:
      "All voice streams, webhooks, and calendar API transactions utilize industry-standard TLS encryption in transit and AES-256 encryption at rest.",
    icon: Server,
  },
  {
    title: "Healthcare & Compliance Aware",
    description:
      "Deployments for dental and medical practices are architected with strict intake protocols, authorization boundaries, and clinical safeguards.",
    icon: FileCheck,
  },
];

export function TrustSecurity() {
  return (
    <section className="py-24 sm:py-32 relative bg-surface-muted/30 border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Enterprise Security & Trust</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Built for Businesses. <span className="text-brand-500 dark:text-brand-400">Designed for Reliability.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            We understand that your phone number is the frontline of your business reputation. Here is how we ensure reliability, privacy, and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-7 space-y-3 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 dark:text-brand-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Legal Link Callout */}
        <div className="mt-12 text-center text-xs text-text-muted font-medium">
          Read our comprehensive{" "}
          <Link href="/security" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
            Security Overview
          </Link>
          ,{" "}
          <Link href="/privacy" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
            Privacy Policy
          </Link>
          , and{" "}
          <Link href="/terms" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
            Terms of Service
          </Link>
          .
        </div>
      </div>
    </section>
  );
}
