import React from "react";
import { integrationsData } from "@/data/integrations";
import {
  Flame,
  Briefcase,
  Home,
  GitMerge,
  Users,
  Layers,
  Cloud,
  Smile,
  Calendar,
  CalendarDays,
  Clock,
  CalendarCheck,
  MessageSquare,
  PhoneCall,
  PhoneForwarded,
  Mail,
  Zap,
  Workflow,
  Code,
  FileSpreadsheet,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Flame,
  Briefcase,
  Home,
  GitMerge,
  Users,
  Layers,
  Cloud,
  Smile,
  Calendar,
  CalendarDays,
  Clock,
  CalendarCheck,
  MessageSquare,
  PhoneCall,
  PhoneForwarded,
  Mail,
  Zap,
  Workflow,
  Code,
  FileSpreadsheet,
};

export function Integrations() {
  const categories = [
    "CRM & Field Service",
    "Calendar & Scheduling",
    "Communication",
    "Automation & Ops",
  ] as const;

  return (
    <section id="integrations" className="py-24 sm:py-32 relative bg-surface-muted/30 border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <Workflow className="h-3.5 w-3.5" />
            <span>Seamless Ecosystem Interoperability</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Connects With Your <span className="text-brand-500 dark:text-brand-400">Existing Stack.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            You don&apos;t have to change the tools you already rely on. ZTechAI integrates directly with your existing phone system, calendar, and CRM.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => {
            const items = integrationsData.filter((item) => item.category === category);
            return (
              <div key={category} className="space-y-4">
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                  <span>{category}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {items.map((item) => {
                    const Icon = ICON_MAP[item.iconName] || Workflow;
                    return (
                      <div
                        key={item.name}
                        className="rounded-3xl border border-surface-border bg-card-bg p-5 transition-all hover:border-brand-500/40 hover:-translate-y-0.5 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 dark:text-brand-400">
                              <Icon className="h-5 w-5" />
                            </div>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                                item.status === "Supported"
                                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                                  : "bg-surface-muted text-text-muted border border-surface-border"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>

                          <h4 className="font-display text-sm font-bold text-foreground mb-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-text-muted leading-relaxed font-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
