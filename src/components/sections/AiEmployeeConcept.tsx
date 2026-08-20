import React from "react";
import {
  Users,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export function AiEmployeeConcept() {
  return (
    <section className="py-24 sm:py-32 relative bg-surface border-y border-surface-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Conceptual Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
              <Users className="h-3.5 w-3.5" />
              <span>Digital Workforce Architecture</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Think of It as <span className="text-brand-500 dark:text-brand-400">Another Employee.</span>
            </h2>

            <p className="text-base sm:text-lg text-text-muted leading-relaxed">
              We do not believe in replacing human employees who build relationships and deliver expert physical care or craftsmanship.
            </p>

            <p className="text-base text-text-muted leading-relaxed font-normal">
              ZTechAI provides a <strong className="text-foreground font-semibold">digital workforce layer</strong> that absorbs all the chaotic, repetitive phone friction—answering questions, qualifying caller intent, and locking appointment slots—so your human staff can focus entirely on high-value in-person service.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="rounded-2xl border border-surface-border bg-surface-muted/60 p-4">
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-sm mb-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Always Available</span>
                </div>
                <p className="text-xs text-text-muted font-medium">
                  Works nights, weekends, and holidays without fatigue or sick days.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-muted/60 p-4">
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-sm mb-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Zero Multitasking Limit</span>
                </div>
                <p className="text-xs text-text-muted font-medium">
                  Answers 20 incoming calls at the exact same second during marketing surges.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-muted/60 p-4">
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-sm mb-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>100% Script Adherence</span>
                </div>
                <p className="text-xs text-text-muted font-medium">
                  Follows your verified pricing guidelines and business rules without deviation.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-muted/60 p-4">
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-sm mb-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Built-In Escalation</span>
                </div>
                <p className="text-xs text-text-muted font-medium">
                  Knows its boundaries and immediately transfers edge-cases to human team members.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Visual Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Role Breakdown
                </span>
                <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs text-brand-600 dark:text-brand-400 font-mono font-bold">
                  Symbiotic Operations
                </span>
              </div>

              <div className="my-6 space-y-4 text-xs">
                {/* AI Layer */}
                <div className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-4 space-y-2">
                  <p className="font-bold text-sm text-brand-700 dark:text-brand-300 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-brand-500 dark:text-brand-400" />
                    ZTechAI Voice Layer Handles:
                  </p>
                  <ul className="space-y-1.5 text-text-muted font-medium list-disc list-inside">
                    <li>24/7 First-ring phone pickup</li>
                    <li>Basic FAQs (hours, address, fees)</li>
                    <li>Emergency diagnostic triage</li>
                    <li>Calendar slot booking & buffers</li>
                    <li>Automated SMS confirmations & reminders</li>
                  </ul>
                </div>

                {/* Human Layer */}
                <div className="rounded-2xl border border-surface-border bg-surface-muted/60 p-4 space-y-2">
                  <p className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent-500" />
                    Your Human Team Focuses On:
                  </p>
                  <ul className="space-y-1.5 text-text-muted font-medium list-disc list-inside">
                    <li>Performing in-clinic patient procedures</li>
                    <li>Executing skilled trade repairs on-site</li>
                    <li>High-touch client relationship building</li>
                    <li>Complex commercial negotiations</li>
                    <li>Strategic business growth</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 text-center text-xs text-text-muted italic font-medium">
                &quot;AI handles the repetitive noise so people can do the work that actually requires human touch.&quot;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
