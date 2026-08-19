import React from "react";
import {
  FileText,
  Cpu,
  Workflow,
  ShieldCheck,
  Rocket,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface Step {
  number: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "We Learn Your Business",
    badge: "Knowledge Intake",
    description:
      "You provide your services, pricing policies, FAQs, operating hours, operatory/service zone constraints, and escalation rules.",
    icon: FileText,
  },
  {
    number: "02",
    title: "We Build Your AI Agent",
    badge: "Custom Engineering",
    description:
      "We configure the exact tone, voice cadence, conversational logic, appointment qualification rules, and emergency protocols.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "We Connect Your Systems",
    badge: "API & Webhooks",
    description:
      "We integrate your existing phone lines, calendar (Google, Outlook, Cal), CRM, SMS gateways, and dispatch software.",
    icon: Workflow,
  },
  {
    number: "04",
    title: "We Rigorously Test Everything",
    badge: "Edge-Case QA",
    description:
      "We stress-test hundreds of simulated customer inquiries, complex accent variations, live transfers, cancellations, and fallback behaviors.",
    icon: ShieldCheck,
  },
  {
    number: "05",
    title: "Launch & Forwarding",
    badge: "Go-Live",
    description:
      "Activate simple conditional call forwarding or direct SIP routing. Your AI begins handling live customer calls seamlessly.",
    icon: Rocket,
  },
  {
    number: "06",
    title: "Analyze & Continuously Improve",
    badge: "Ongoing Optimization",
    description:
      "We review call analytics, refine prompt guardrails, and optimize conversion workflows so your agent gets sharper every month.",
    icon: TrendingUp,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative bg-surface border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Structured Deployment Protocol</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            From First Discovery to a{" "}
            <span className="text-brand-500 dark:text-brand-400">Fully Operational Agent.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Our white-glove engineering team handles the entire technical setup, testing, and integration in 5–10 business days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-7 transition-all duration-300 hover:border-brand-500/40 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-brand-600 dark:text-brand-400">
                      STEP {step.number}
                    </span>
                    <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[10px] font-mono font-semibold text-text-muted">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-border flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
                  <Icon className="h-4 w-4 text-brand-500" />
                  <span>Turnkey implementation</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
