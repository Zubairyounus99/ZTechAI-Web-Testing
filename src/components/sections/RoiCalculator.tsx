"use client";

import React, { useState, useMemo } from "react";
import { siteConfig } from "@/config/site";
import { CALCULATOR_CONFIG } from "@/data/calculatorConfig";
import { calculateROI, CalculatorInputs } from "@/lib/calculator";
import { CalModal } from "@/components/ui/CalModal";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Users,
  Clock,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

export function RoiCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyCalls: CALCULATOR_CONFIG.DEFAULTS.monthlyCalls,
    averageCallDuration: CALCULATOR_CONFIG.DEFAULTS.averageCallDuration,
    employees: CALCULATOR_CONFIG.DEFAULTS.employees,
    employeeCost: CALCULATOR_CONFIG.DEFAULTS.employeeCost,
  });

  const [calOpen, setCalOpen] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Compute pure calculation results in real-time
  const result = useMemo(() => {
    return calculateROI(inputs);
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyRecommendedStaffing = () => {
    setInputs((prev) => ({
      ...prev,
      employees: result.recommendedEmployees,
    }));
    trackEvent("roi_calculator_complete", {
      appliedRecommended: true,
      recommendedEmployees: result.recommendedEmployees,
      savings: result.recommendedSavings,
    });
  };

  const handleBookDemo = () => {
    trackEvent("cta_book_demo", {
      source: "roi_calculator",
      monthlySavings: result.enteredSavings,
      savingsPercentage: result.enteredSavingsPercentage,
    });
    setCalOpen(true);
  };

  const handleTalkToAi = () => {
    trackEvent("cta_talk_to_ai", { source: "roi_calculator" });
    const demoEl = document.getElementById("demo");
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Comparison bar visual width computation (clamped between 5% and 100%)
  const maxCostForBar = Math.max(
    result.enteredTraditionalCost,
    result.recommendedTraditionalCost,
    result.aiMonthlyCost,
    100
  );
  const traditionalBarWidth = Math.min(100, Math.max(10, (result.enteredTraditionalCost / maxCostForBar) * 100));
  const aiBarWidth = Math.min(100, Math.max(8, (result.aiMonthlyCost / maxCostForBar) * 100));

  return (
    <section id="calculator" className="py-24 sm:py-32 relative bg-surface border-y border-surface-border overflow-hidden">
      {/* Background ambient glow */}
      <div className="ambient-glow ambient-glow-teal top-1/2 -right-48 h-80 w-80" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <Calculator className="h-3.5 w-3.5" />
            <span>Interactive Operational & Labor Model</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Calculate Your Estimated{" "}
            <span className="text-brand-500 dark:text-brand-400">Monthly Savings.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Compare the economics of traditional full-time phone staff against ZTechAI&apos;s intelligent, automated AI voice layer.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 rounded-3xl border border-surface-border bg-surface-muted/60 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <span className="font-display text-sm font-bold text-foreground">
                1. Your Business Call Assumptions
              </span>
              <span className="text-[11px] font-mono text-text-muted">
                Real-Time Calculation
              </span>
            </div>

            {/* Input 1: Monthly Calls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <PhoneCall className="h-4 w-4 text-brand-500 dark:text-brand-400" />
                  <span>Monthly Inbound/Outbound Calls</span>
                </span>
                <span className="font-mono font-bold text-brand-500 dark:text-brand-400 text-sm sm:text-base">
                  {formatNumber(inputs.monthlyCalls)} calls / mo
                </span>
              </div>
              <input
                type="range"
                min={CALCULATOR_CONFIG.BOUNDS.minCalls}
                max={15000}
                step={50}
                value={inputs.monthlyCalls}
                onChange={(e) => handleInputChange("monthlyCalls", Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-surface-elevated accent-brand-500 cursor-pointer"
                aria-label="Monthly Inbound/Outbound Calls"
              />
              <div className="flex justify-between text-[10px] text-text-muted font-mono">
                <span>50 calls</span>
                <span>5,000</span>
                <span>15,000+ calls</span>
              </div>
            </div>

            {/* Input 2: Average Call Duration */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-accent-500 dark:text-accent-400" />
                  <span>Average Call Duration</span>
                </span>
                <span className="font-mono font-bold text-accent-500 dark:text-accent-400 text-sm sm:text-base">
                  {inputs.averageCallDuration} minutes
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                step={0.5}
                value={inputs.averageCallDuration}
                onChange={(e) => handleInputChange("averageCallDuration", Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-surface-elevated accent-accent-500 cursor-pointer"
                aria-label="Average Call Duration in Minutes"
              />
              <div className="flex justify-between text-[10px] text-text-muted font-mono">
                <span>1 min (Brief triage)</span>
                <span>5 min (Standard appointment)</span>
                <span>15 min (Complex)</span>
              </div>
            </div>

            {/* Input 3: Number of Employees Handling Calls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Current Staff Dedicated to Phone / Front Desk</span>
                </span>
                <span className="font-mono font-bold text-foreground text-sm sm:text-base">
                  {inputs.employees} {inputs.employees === 1 ? "Employee" : "Employees"}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={inputs.employees}
                onChange={(e) => handleInputChange("employees", Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-surface-elevated accent-emerald-500 cursor-pointer"
                aria-label="Number of Employees Handling Calls"
              />
              <div className="flex justify-between text-[10px] text-text-muted font-mono">
                <span>1 employee</span>
                <span>10 employees</span>
                <span>20+ employees</span>
              </div>
            </div>

            {/* Input 4: Average Monthly Employee Cost */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Average Monthly Cost per Employee (Salary + Burden)</span>
                </span>
                <span className="font-mono font-bold text-emerald-500 dark:text-emerald-400 text-sm sm:text-base">
                  {formatCurrency(inputs.employeeCost)} / mo
                </span>
              </div>
              <input
                type="range"
                min={1500}
                max={10000}
                step={250}
                value={inputs.employeeCost}
                onChange={(e) => handleInputChange("employeeCost", Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-surface-elevated accent-emerald-500 cursor-pointer"
                aria-label="Average Monthly Cost per Employee"
              />
              <div className="flex justify-between text-[10px] text-text-muted font-mono">
                <span>$1,500/mo</span>
                <span>$4,000/mo ($24/hr with taxes)</span>
                <span>$10,000/mo</span>
              </div>
            </div>

            {/* Capacity Warning Banner (Only shown when understaffed) */}
            {result.isUnderstaffed && (
              <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 dark:bg-amber-950/20 p-4 space-y-2.5 animate-in fade-in">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-display text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-300">
                      Your current staffing level may not realistically support this call volume.
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      At <strong>{formatNumber(result.monthlyMinutes)} total minutes/month</strong>, handling this workload realistically requires approximately <strong>{result.recommendedEmployees} full-time employees</strong> (accounting for breaks, admin duties, and human availability). You entered <strong>{inputs.employees}</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-amber-500/20">
                  <span className="text-[11px] font-medium text-text-muted">
                    Realistic Staffing Comparison: <strong>{result.recommendedEmployees} employees</strong>
                  </span>
                  <button
                    onClick={handleApplyRecommendedStaffing}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 px-3.5 py-1.5 text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Apply Recommended Staffing ({result.recommendedEmployees})</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Mathematical Results Card */}
          <div className="lg:col-span-5 rounded-3xl border border-brand-500/30 bg-card-bg p-6 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-brand-400">
                  Estimated Monthly Savings
                </span>
                <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-mono font-bold text-brand-500 dark:text-brand-400">
                  Automated AI Voice Model
                </span>
              </div>

              {/* Main Monthly Savings Hero Figure */}
              <div className="my-5 space-y-1 text-center sm:text-left">
                <p className="text-xs text-text-muted">Net Monthly Labor Savings</p>
                <div className="flex flex-wrap items-baseline gap-2 justify-center sm:justify-start">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                    {formatCurrency(result.enteredSavings)}
                  </span>
                  <span className="text-sm font-semibold text-text-muted">/ month</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 text-xs font-bold mt-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>{result.enteredSavingsPercentage}% Estimated Cost Reduction</span>
                </div>
              </div>

              {/* Visual Cost Comparison Bars */}
              <div className="space-y-3 pt-3 pb-4 border-t border-surface-border">
                {/* Traditional Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-text-muted">Traditional Staff ({inputs.employees} {inputs.employees === 1 ? "emp" : "emps"}):</span>
                    <span className="font-mono text-foreground">{formatCurrency(result.enteredTraditionalCost)}/mo</span>
                  </div>
                  <div className="h-3 rounded-full bg-surface-elevated overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-400 dark:bg-slate-600 transition-all duration-300"
                      style={{ width: `${traditionalBarWidth}%` }}
                    />
                  </div>
                </div>

                {/* AI Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-brand-500 dark:text-brand-400">ZTechAI Voice Agent ({formatNumber(result.monthlyMinutes)} min):</span>
                    <span className="font-mono text-brand-500 dark:text-brand-400 font-bold">{formatCurrency(result.aiMonthlyCost)}/mo</span>
                  </div>
                  <div className="h-3 rounded-full bg-surface-elevated overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all duration-300"
                      style={{ width: `${aiBarWidth}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Workload Breakdown Chips */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="rounded-xl border border-surface-border bg-surface-muted/60 p-2.5 text-center">
                  <p className="text-[10px] text-text-muted">Monthly Call Minutes</p>
                  <p className="font-display text-sm font-bold text-foreground mt-0.5">
                    {formatNumber(result.monthlyMinutes)} min
                  </p>
                </div>
                <div className="rounded-xl border border-surface-border bg-surface-muted/60 p-2.5 text-center">
                  <p className="text-[10px] text-text-muted">Annualized Savings</p>
                  <p className="font-display text-sm font-bold text-foreground mt-0.5">
                    {formatCurrency(result.annualizedSavings)}/yr
                  </p>
                </div>
              </div>

              {/* Low / Non-Standard Savings Explanation if applicable */}
              {result.isLowSavings && (
                <div className="mt-3 rounded-xl border border-surface-border bg-surface-muted/40 p-3 text-xs text-text-muted">
                  <p>
                    Your current assumptions produce a modest labor cost difference. Adjusting staffing levels to match true workload capacity may produce a more realistic comparison.
                  </p>
                </div>
              )}
            </div>

            {/* CTAs & Next Steps */}
            <div className="space-y-3 pt-4 border-t border-surface-border">
              <div className="text-center sm:text-left space-y-1">
                <p className="font-display text-sm font-bold text-foreground">
                  Want to See What This Could Look Like in Your Business?
                </p>
                <p className="text-xs text-text-muted">
                  These are illustrative estimates. A 15-minute discovery call will map your exact workflows.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  onClick={handleBookDemo}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 py-3.5 px-4 text-xs sm:text-sm font-semibold text-white shadow-xl shadow-brand-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{siteConfig.primaryCtaText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={handleTalkToAi}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-surface-border bg-surface-muted py-3 px-3.5 text-xs font-semibold text-foreground hover:border-brand-500/40 hover:bg-surface-elevated transition-all"
                >
                  <Sparkles className="h-3.5 w-3.5 text-brand-500 dark:text-brand-400" />
                  <span>Talk to AI</span>
                </button>
              </div>
              <p className="text-[11px] text-center text-text-muted font-medium pt-1">
                No upfront payment • No obligation • 15-minute discovery
              </p>
            </div>
          </div>
        </div>

        {/* Expandable Transparency Section */}
        <div className="mt-10 max-w-3xl mx-auto rounded-2xl border border-surface-border bg-surface-muted/40 overflow-hidden">
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="w-full flex items-center justify-between p-4 text-xs font-semibold text-text-muted hover:text-foreground transition-colors focus:outline-none"
            aria-expanded={showHowItWorks}
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-brand-500 dark:text-brand-400" />
              <span>How is this calculated? (Transparent Formulas & Assumptions)</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                showHowItWorks ? "rotate-180 text-brand-500" : ""
              }`}
            />
          </button>

          {showHowItWorks && (
            <div className="p-5 pt-1 text-xs text-text-muted leading-relaxed border-t border-surface-border space-y-3 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="font-bold text-foreground">1. AI Voice Layer Calculation:</p>
                  <p className="font-mono text-[11px] text-brand-600 dark:text-brand-300">
                    Monthly Call Minutes × Optimized Automated Telephony Rate
                  </p>
                  <p className="text-[11px]">
                    Example: {formatNumber(inputs.monthlyCalls)} calls × {inputs.averageCallDuration} minutes = {formatNumber(result.monthlyMinutes)} total minutes &rarr; {formatCurrency(result.aiMonthlyCost)}/mo estimated automated usage.
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-foreground">2. Traditional Labor Cost:</p>
                  <p className="font-mono text-[11px] text-accent-600 dark:text-accent-300">
                    Number of Employees × Average Monthly Cost
                  </p>
                  <p className="text-[11px]">
                    Example: {inputs.employees} {inputs.employees === 1 ? "employee" : "employees"} × {formatCurrency(inputs.employeeCost)} = {formatCurrency(result.enteredTraditionalCost)}/mo.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-border/60">
                <p className="font-bold text-foreground">3. Capacity Benchmark:</p>
                <p className="text-[11px]">
                  Assumes a realistic full-time employee handles up to ~5,000 live phone minutes per month (~4 hours/day of talk time with remaining time dedicated to breaks, wrap-up notes, and administrative tasks).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </section>
  );
}
