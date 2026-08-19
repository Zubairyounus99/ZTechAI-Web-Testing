import React from "react";
import {
  PhoneCall,
  UserCheck,
  CalendarCheck,
  CalendarX,
  HelpCircle,
  Bell,
  Clock,
  Send,
  RotateCw,
  PhoneOutgoing,
  PhoneForwarded,
  Database,
  Sparkles,
} from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon: React.ElementType;
  tag: string;
}

const CAPABILITIES: Capability[] = [
  {
    title: "Answer Calls",
    description: "Handle incoming customer calls naturally, without robotic pauses or rigid dial menus.",
    icon: PhoneCall,
    tag: "Core Inbound",
  },
  {
    title: "Qualify Leads",
    description: "Ask the right qualifying questions (property ownership, timeline, budget, problem severity).",
    icon: UserCheck,
    tag: "Triage",
  },
  {
    title: "Book Appointments",
    description: "Connect with live calendars and lock appointments based on provider and buffer rules.",
    icon: CalendarCheck,
    tag: "Scheduling",
  },
  {
    title: "Reschedule & Cancel",
    description: "Autonomously process routine appointment changes, freeing slots for other clients.",
    icon: CalendarX,
    tag: "Calendar Ops",
  },
  {
    title: "Customer Support FAQs",
    description: "Answer approved business questions regarding hours, directions, service areas, and policies.",
    icon: HelpCircle,
    tag: "Knowledge Base",
  },
  {
    title: "Instant Notifications",
    description: "Send automated SMS and email confirmations with appointment details and directions.",
    icon: Bell,
    tag: "Multi-Channel",
  },
  {
    title: "Automated Reminders",
    description: "Send 24-hour and 2-hour visit reminders via voice or SMS to slash costly no-show rates.",
    icon: Clock,
    tag: "Retention",
  },
  {
    title: "Lead Follow-Up",
    description: "Automatically re-engage callers who inquired about quotes but did not book on the initial call.",
    icon: Send,
    tag: "Conversion",
  },
  {
    title: "Lead Reactivation",
    description: "Reach out to past customers due for seasonal maintenance, cleanings, or annual inspections.",
    icon: RotateCw,
    tag: "Revenue Growth",
  },
  {
    title: "Outbound Calling",
    description: "Automate approved outbound calling workflows for service updates and schedule confirmations.",
    icon: PhoneOutgoing,
    tag: "Approved Ops",
  },
  {
    title: "Human Live Transfer",
    description: "Warm-transfer urgent emergencies or complex custom requests to your human team instantly.",
    icon: PhoneForwarded,
    tag: "Safety Net",
  },
  {
    title: "Direct CRM Updates",
    description: "Log structured call summaries, caller intent tags, and audio transcripts directly into your CRM.",
    icon: Database,
    tag: "System Sync",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 sm:py-32 relative bg-surface-muted/30 border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Comprehensive Operational Arsenal</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            One AI Agent. Hundreds of Conversations.{" "}
            <span className="text-brand-500 dark:text-brand-400">Zero Coffee Breaks.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            From first greeting to calendar sync and human escalation, our custom agents execute your complete phone communication playbook flawlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-surface-border bg-card-bg p-5 transition-all duration-300 hover:border-brand-500/40 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 dark:text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-mono font-semibold text-text-muted">
                      {cap.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-foreground mb-1.5">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    {cap.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
