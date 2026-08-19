"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  BrainCircuit,
  CalendarCheck,
  PhoneForwarded,
  Send,
  Database,
  ArrowDown,
  Layers,
} from "lucide-react";

export function WorkflowVisualizer() {
  const [selectedBranch, setSelectedBranch] = useState<"book" | "transfer" | "followup">("book");

  return (
    <section className="py-24 sm:py-32 relative bg-surface border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <Layers className="h-3.5 w-3.5" />
            <span>Operational Data Pipeline</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Call → Understand → Act → <span className="text-brand-500 dark:text-brand-400">Sync.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            See how an incoming voice call seamlessly branches into intelligent qualification, autonomous execution, and instant business tool synchronization.
          </p>
        </div>

        {/* Workflow Diagram Card */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-10 shadow-2xl">
          {/* Top Stages */}
          <div className="space-y-4">
            {/* Stage 1: Customer Inbound */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-surface-border bg-surface-muted p-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/15 text-accent-600 dark:text-accent-400">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">Stage 01 • Inbound Call</p>
                  <p className="text-sm font-bold text-foreground">Customer Dials Your Business Line</p>
                </div>
              </div>
              <span className="text-xs font-mono bg-surface-elevated px-3 py-1 rounded-full text-text-muted font-medium">
                Conditional Forwarding / SIP Trunk
              </span>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center">
              <ArrowDown className="h-5 w-5 text-brand-500 dark:text-brand-400 animate-bounce" />
            </div>

            {/* Stage 2: AI Voice Engine */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-brand-500/40 bg-brand-500/10 p-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">Stage 02 • ZTechAI Agent</p>
                  <p className="text-sm font-bold text-foreground">Answers Instantly • Classifies Intent • Qualifies Request</p>
                </div>
              </div>
              <span className="text-xs font-mono text-brand-700 dark:text-brand-300 bg-brand-500/15 px-3 py-1 rounded-full border border-brand-500/30 font-bold">
                &lt;500ms Conversational Latency
              </span>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center">
              <ArrowDown className="h-5 w-5 text-brand-500 dark:text-brand-400" />
            </div>

            {/* Stage 3: Autonomous Branching Decision Matrix */}
            <div className="space-y-3">
              <p className="text-center text-xs font-bold uppercase tracking-wider text-text-muted">
                Stage 03 • Action Execution Engine (Select branch to preview)
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedBranch("book")}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    selectedBranch === "book"
                      ? "border-emerald-500 bg-emerald-500/10 text-foreground ring-2 ring-emerald-500/30 shadow-md"
                      : "border-surface-border bg-surface-muted text-text-muted hover:border-surface-border hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarCheck className="h-4 w-4 text-emerald-500" />
                    <span className="font-display text-sm font-bold text-foreground">Book Slot</span>
                  </div>
                  <p className="text-xs text-text-muted font-medium">
                    Checks live operatory/tech availability and locks appointment.
                  </p>
                </button>

                <button
                  onClick={() => setSelectedBranch("transfer")}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    selectedBranch === "transfer"
                      ? "border-accent-500 bg-accent-500/10 text-foreground ring-2 ring-accent-500/30 shadow-md"
                      : "border-surface-border bg-surface-muted text-text-muted hover:border-surface-border hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <PhoneForwarded className="h-4 w-4 text-accent-500" />
                    <span className="font-display text-sm font-bold text-foreground">Human Transfer</span>
                  </div>
                  <p className="text-xs text-text-muted font-medium">
                    Live bridges urgent clinical or custom escalations to staff.
                  </p>
                </button>

                <button
                  onClick={() => setSelectedBranch("followup")}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    selectedBranch === "followup"
                      ? "border-purple-500 bg-purple-500/10 text-foreground ring-2 ring-purple-500/30 shadow-md"
                      : "border-surface-border bg-surface-muted text-text-muted hover:border-surface-border hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Send className="h-4 w-4 text-purple-500" />
                    <span className="font-display text-sm font-bold text-foreground">Follow-Up / SMS</span>
                  </div>
                  <p className="text-xs text-text-muted font-medium">
                    Sends quote links, directions, or scheduled reminder sequences.
                  </p>
                </button>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center">
              <ArrowDown className="h-5 w-5 text-brand-500 dark:text-brand-400" />
            </div>

            {/* Stage 4: Downstream Business Synchronization */}
            <div className="rounded-2xl border border-surface-border bg-surface-muted p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-brand-500 dark:text-brand-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Stage 04 • Business System Integration
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">100% Real-Time Sync</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="rounded-xl bg-surface-elevated p-2.5 text-center">
                  <p className="font-bold text-foreground">CRM / PMS</p>
                  <p className="text-[10px] text-text-muted">ServiceTitan, Dentrix</p>
                </div>
                <div className="rounded-xl bg-surface-elevated p-2.5 text-center">
                  <p className="font-bold text-foreground">Calendar</p>
                  <p className="text-[10px] text-text-muted">Google, Outlook, Cal</p>
                </div>
                <div className="rounded-xl bg-surface-elevated p-2.5 text-center">
                  <p className="font-bold text-foreground">SMS Engine</p>
                  <p className="text-[10px] text-text-muted">Twilio, 2-Way Text</p>
                </div>
                <div className="rounded-xl bg-surface-elevated p-2.5 text-center">
                  <p className="font-bold text-foreground">Staff Inbox</p>
                  <p className="text-[10px] text-text-muted">Instant Email Alert</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
