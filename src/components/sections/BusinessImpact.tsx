import React from "react";
import {
  Clock,
  Zap,
  TrendingUp,
  UserCheck,
  CheckCheck,
  Layers,
  ShieldCheck,
  PhoneForwarded,
} from "lucide-react";

interface ImpactCard {
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
}

const IMPACTS: ImpactCard[] = [
  {
    title: "24/7/365 Availability",
    badge: "Continuous Coverage",
    description:
      "Your phone lines never go dark. Whether it's 2:00 AM on Sunday or during an all-hands staff meeting, every incoming customer reaches a capable, intelligent agent.",
    icon: Clock,
  },
  {
    title: "Instant Zero-Hold Response",
    badge: "Speed to Lead",
    description:
      "Eliminate customer hold times and busy signals entirely. Callers are greeted immediately on ring one and guided straight toward booking or resolution.",
    icon: Zap,
  },
  {
    title: "Lower Operational Overhead",
    badge: "Labor Efficiency",
    description:
      "Handle high-volume phone spikes, seasonal quote rushes, and routine FAQ inquiries without incurring immediate hiring costs, overtime, or staffing headaches.",
    icon: TrendingUp,
  },
  {
    title: "100% Consistent Follow-Up",
    badge: "Lead Retention",
    description:
      "Every single caller receives the required follow-through: SMS confirmations, intake forms, calendar links, or appointment reminders without human forgetfulness.",
    icon: CheckCheck,
  },
  {
    title: "Fewer Missed Opportunities",
    badge: "Revenue Recovery",
    description:
      "High-intent callers who would otherwise call your local competitors when reaching voicemail are captured, qualified, and booked on the spot.",
    icon: PhoneForwarded,
  },
  {
    title: "Infinite Scale Without Headcount",
    badge: "Elastic Capacity",
    description:
      "Run marketing campaigns or withstand storm surges with confidence. Your AI workforce scales dynamically to handle dozens of concurrent callers without strain.",
    icon: Layers,
  },
];

export function BusinessImpact() {
  return (
    <section className="py-24 sm:py-32 relative bg-surface border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Operational & Financial Transformation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            What Happens When Your Business{" "}
            <span className="text-brand-500 dark:text-brand-400">Never Stops Answering?</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Transform your phone lines from a chaotic administrative bottleneck into your company&apos;s most reliable, high-converting asset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMPACTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 dark:text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-surface-border bg-surface-muted px-2.5 py-1 text-[11px] font-semibold text-text-muted">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-border flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400">
                  <span>Built-in operational safeguard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
