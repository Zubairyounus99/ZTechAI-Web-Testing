import React from "react";
import { exampleWorkflowsData } from "@/data/workflows";
import {
  CheckCircle2,
  Layers,
} from "lucide-react";

export function ExampleWorkflows() {
  return (
    <section className="py-24 sm:py-32 relative bg-surface border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <Layers className="h-3.5 w-3.5" />
            <span>Real-World Implementations</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Example Workflows & <span className="text-brand-500 dark:text-brand-400">Operational Logic</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Explore how our custom voice architecture solves real bottlenecks for high-volume US local businesses.
          </p>
        </div>

        <div className="space-y-12">
          {exampleWorkflowsData.map((workflow) => (
            <div
              key={workflow.id}
              className="rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-10 shadow-xl"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-surface-border">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-full bg-brand-500/10 px-3 py-0.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
                      {workflow.industry}
                    </span>
                    <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[10px] font-mono font-semibold text-text-muted">
                      {workflow.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mt-2">
                    {workflow.title}
                  </h3>
                </div>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-5 space-y-2">
                  <h4 className="font-display text-sm font-bold text-rose-700 dark:text-rose-300">
                    The Operational Challenge
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    {workflow.operationalChallenge}
                  </p>
                </div>

                <div className="rounded-2xl border border-brand-500/20 bg-brand-500/10 p-5 space-y-2">
                  <h4 className="font-display text-sm font-bold text-brand-700 dark:text-brand-300">
                    The ZTechAI Solution
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    {workflow.solutionArchitecture}
                  </p>
                </div>
              </div>

              {/* Step Progression */}
              <div className="space-y-3 mb-6">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-text-muted">
                  End-to-End Workflow Stages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {workflow.stepByStepFlow.map((step, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-surface-border bg-surface-muted p-4 space-y-1.5"
                    >
                      <p className="text-[10px] font-mono text-brand-600 dark:text-brand-400 font-bold">{step.stage}</p>
                      <p className="text-xs font-bold text-foreground">{step.action}</p>
                      <p className="text-[11px] text-text-muted leading-snug font-normal">{step.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Outcomes */}
              <div className="pt-4 border-t border-surface-border">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {workflow.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
