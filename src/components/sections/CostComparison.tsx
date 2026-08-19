import React from "react";
import { Check, X, Users, Sparkles } from "lucide-react";

interface ComparisonRow {
  factor: string;
  traditional: string;
  aiAgent: string;
  isAiAdvantage: boolean;
}

const COMPARISONS: ComparisonRow[] = [
  {
    factor: "Operating Hours",
    traditional: "8 Hours/Day (9:00 AM – 5:00 PM)",
    aiAgent: "24/7/365 Continuous Availability",
    isAiAdvantage: true,
  },
  {
    factor: "Simultaneous Call Capacity",
    traditional: "1 Call at a time (overflow goes to voicemail)",
    aiAgent: "Unlimited concurrent conversations with 0 hold time",
    isAiAdvantage: true,
  },
  {
    factor: "Speed to Answer",
    traditional: "Varies (3–8 rings or missed if busy)",
    aiAgent: "Instant pickup on Ring 1 (<500ms)",
    isAiAdvantage: true,
  },
  {
    factor: "Payroll Taxes & Benefits",
    traditional: "FICA, Medicare, Health Insurance, 401(k), Worker's Comp",
    aiAgent: "$0 Payroll taxes, benefits, or insurance overhead",
    isAiAdvantage: true,
  },
  {
    factor: "Sick Days & Vacations",
    traditional: "15–25 paid days off per year creating coverage gaps",
    aiAgent: "Zero downtime or scheduled leave",
    isAiAdvantage: true,
  },
  {
    factor: "Training & Script Adherence",
    traditional: "Weeks of onboarding; variable phone compliance",
    aiAgent: "Trained in 5 days; follows verified business rules 100%",
    isAiAdvantage: true,
  },
  {
    factor: "Turnover Risk",
    traditional: "High front-desk turnover requiring continuous hiring",
    aiAgent: "Permanent digital infrastructure that gets smarter over time",
    isAiAdvantage: true,
  },
  {
    factor: "In-Person Physical Tasks",
    traditional: "Performs chairside assistance, physical repairs, & greeting",
    aiAgent: "Escalates complex cases to human staff when physical touch needed",
    isAiAdvantage: false,
  },
];

export function CostComparison() {
  return (
    <section id="comparison" className="py-24 sm:py-32 relative bg-surface-muted/30 border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Operational Economics</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            AI Agent vs. <span className="text-brand-500 dark:text-brand-400">Adding Another Employee</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Compare the operational realities of hiring additional administrative headcount versus deploying an automated AI voice agent layer.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-surface-border bg-card-bg shadow-2xl">
          <div className="grid grid-cols-12 border-b border-surface-border bg-surface-muted p-4 sm:p-6 text-xs sm:text-sm font-bold">
            <div className="col-span-4 text-text-muted uppercase tracking-wider">Operational Factor</div>
            <div className="col-span-4 text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>Traditional Hiring</span>
            </div>
            <div className="col-span-4 text-brand-600 dark:text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>ZTechAI Agent</span>
            </div>
          </div>

          <div className="divide-y divide-surface-border">
            {COMPARISONS.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-4 sm:p-5 text-xs sm:text-sm items-center hover:bg-surface-muted/50 transition-colors"
              >
                <div className="col-span-4 font-bold text-foreground pr-2">
                  {row.factor}
                </div>
                <div className="col-span-4 text-text-muted pr-2 flex items-start gap-1.5 font-medium">
                  <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{row.traditional}</span>
                </div>
                <div className="col-span-4 font-semibold text-foreground flex items-start gap-1.5">
                  <Check className="h-4 w-4 text-brand-500 dark:text-brand-400 shrink-0 mt-0.5" />
                  <span>{row.aiAgent}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-muted/60 p-4 sm:p-5 border-t border-surface-border text-center text-xs text-text-muted font-medium">
            ZTechAI does not replace specialized physical craftsmanship. It protects your human team from repetitive phone interruption.
          </div>
        </div>
      </div>
    </section>
  );
}
