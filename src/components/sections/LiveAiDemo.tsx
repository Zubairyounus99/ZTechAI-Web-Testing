"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { CalModal } from "@/components/ui/CalModal";
import { AudioWaveform } from "@/components/ui/AudioWaveform";
import { trackEvent } from "@/lib/analytics";
import {
  PhoneCall,
  PhoneOff,
  RotateCcw,
  Sparkles,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  industry: string;
  callerPrompt: string;
  aiResponse: string;
  intent: string;
  extractedDetails: { label: string; value: string }[];
  actionTaken: string;
}

const DEMO_SCENARIOS: Scenario[] = [
  {
    id: "dental",
    name: "Dental Practice",
    industry: "Healthcare",
    callerPrompt: "Hi, I broke a tooth eating lunch and I'm in a lot of pain. Can I get an emergency appointment today?",
    aiResponse:
      "I'm so sorry you're dealing with that pain. We can get you in with Dr. Vance for an emergency evaluation today at 3:15 PM or tomorrow at 9:00 AM. Which works best for you?",
    intent: "Urgent Dental Emergency • Triage Priority 1",
    extractedDetails: [
      { label: "Symptom", value: "Broken tooth with pain" },
      { label: "Patient Status", value: "New Patient" },
      { label: "Operatory Slot", value: "Today @ 3:15 PM" },
    ],
    actionTaken: "Operatory Booked • Pre-Intake SMS Link Dispatched",
  },
  {
    id: "hvac",
    name: "HVAC Contractor",
    industry: "Field Services",
    callerPrompt: "Hello, my air conditioner is blowing hot air and making a loud buzzing noise outside.",
    aiResponse:
      "I understand how important that is in this heat. Our diagnostic fee is $89, which is credited toward any repair. We have a technician in your area between 1:00 PM and 3:00 PM today. Would you like me to book that window?",
    intent: "AC No-Cool Breakdown • Priority Dispatch",
    extractedDetails: [
      { label: "Equipment", value: "Outdoor AC Condenser" },
      { label: "Diagnostic Fee", value: "$89 Accepted" },
      { label: "Arrival Window", value: "Today 1:00 - 3:00 PM" },
    ],
    actionTaken: "ServiceTitan Job Created • On-Call Tech Alerted",
  },
  {
    id: "plumbing",
    name: "Plumbing Specialist",
    industry: "Home Services",
    callerPrompt: "I have water leaking around my water heater in the garage. What should I do?",
    aiResponse:
      "Let's get that taken care of right away. If safe, turn the cold water valve clockwise on top of the tank to stop incoming water. We can have a licensed plumber at your home between 11:00 AM and 1:00 PM today. Does that work?",
    intent: "Water Heater Leak • Safety Guidance Given",
    extractedDetails: [
      { label: "Issue", value: "Tank Leak in Garage" },
      { label: "Safety Step", value: "Shutoff Valve Guided" },
      { label: "Dispatch Window", value: "Today 11:00 AM - 1:00 PM" },
    ],
    actionTaken: "Emergency Plumbing Ticket Dispatched",
  },
  {
    id: "realestate",
    name: "Real Estate Team",
    industry: "Property Services",
    callerPrompt: "Hi, I saw the sign for 420 Canterbury Court. Is it still available and can we tour it this weekend?",
    aiResponse:
      "Yes, 420 Canterbury Court is active and listed for $749,000 with 4 bedrooms. We have private showing slots this Saturday at 11:00 AM or Sunday at 2:00 PM. Which one would you prefer?",
    intent: "Listing Inquiry • Private Tour Request",
    extractedDetails: [
      { label: "Property", value: "420 Canterbury Court" },
      { label: "Buyer Status", value: "Unrepresented / Pre-Approved" },
      { label: "Tour Date", value: "Saturday @ 11:00 AM" },
    ],
    actionTaken: "Showing Scheduled • Agent Sarah Notified via Follow Up Boss",
  },
];

export function LiveAiDemo() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(DEMO_SCENARIOS[0]);
  const [isCalling, setIsCalling] = useState(false);
  const [activeStep, setActiveStep] = useState<"idle" | "listening" | "thinking" | "speaking" | "completed">("idle");
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [calOpen, setCalOpen] = useState(false);

  const startDemoCall = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setIsCalling(true);
    setActiveStep("listening");
    setTranscriptIndex(1);
    trackEvent("voice_demo_started", { scenario: scenario.id });

    // Step progression simulation
    setTimeout(() => {
      setActiveStep("thinking");
    }, 1800);

    setTimeout(() => {
      setActiveStep("speaking");
      setTranscriptIndex(2);
    }, 3200);

    setTimeout(() => {
      setActiveStep("completed");
      trackEvent("voice_demo_completed", { scenario: scenario.id });
    }, 6000);
  };

  const endCall = () => {
    setIsCalling(false);
    setActiveStep("idle");
    setTranscriptIndex(0);
  };

  const switchScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    if (isCalling) {
      endCall();
    }
    trackEvent("voice_demo_scenario_change", { scenario: scenario.id });
  };

  return (
    <section id="demo" className="relative py-24 sm:py-32 bg-surface-muted/40 border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Voice Demonstration</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Don&apos;t Take Our Word for It.{" "}
            <span className="text-brand-500 dark:text-brand-400">Talk to the AI Yourself.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Experience how naturally our voice agents handle live customer interruptions, understand urgency, verify calendars, and lock appointments in real-time.
          </p>
        </div>

        {/* Interactive Demo Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Industry Selector & Scenario Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 rounded-3xl border border-surface-border bg-card-bg p-6 shadow-xl">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                Select an Industry Scenario
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {DEMO_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => switchScenario(sc)}
                    className={`rounded-2xl border p-3 text-left transition-all ${
                      selectedScenario.id === sc.id
                        ? "border-brand-500 bg-brand-500/10 text-foreground shadow-md shadow-brand-500/10"
                        : "border-surface-border bg-surface-muted/70 text-text-muted hover:border-surface-border hover:text-foreground hover:bg-surface-elevated"
                    }`}
                  >
                    <p className="font-display text-sm font-bold text-foreground">{sc.name}</p>
                    <p className="text-[11px] text-text-muted">{sc.industry}</p>
                  </button>
                ))}
              </div>

              {/* Scenario Context Box */}
              <div className="rounded-2xl border border-surface-border bg-surface-muted/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Operational Intent</span>
                  <span className="text-[10px] rounded bg-accent-500/10 px-2 py-0.5 font-mono font-semibold text-accent-600 dark:text-accent-400">
                    Live Classification
                  </span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed font-medium">
                  {selectedScenario.intent}
                </p>

                <div className="pt-2 border-t border-surface-border space-y-1.5">
                  {selectedScenario.extractedDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">{detail.label}:</span>
                      <span className="font-semibold text-foreground">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Booking Pitch */}
            <div className="pt-4 border-t border-surface-border">
              <p className="text-xs text-text-muted mb-3 font-medium">
                Want to test this on your real business phone number?
              </p>
              <button
                onClick={() => setCalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 py-3 text-xs font-semibold text-white shadow-lg shadow-brand-500/20 hover:scale-[1.01]"
              >
                <Calendar className="h-4 w-4" />
                <span>Build a Custom Agent for My Business</span>
              </button>
            </div>
          </div>

          {/* Right: Simulated Voice Terminal */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-surface-border">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 dark:text-brand-400">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">ZTechAI Voice Agent</h3>
                  <p className="text-xs text-text-muted">
                    {isCalling
                      ? activeStep === "listening"
                        ? "Listening to customer..."
                        : activeStep === "thinking"
                        ? "Analyzing calendar & intent..."
                        : activeStep === "speaking"
                        ? "Responding naturally..."
                        : "Call workflow completed"
                      : "Ready to simulate"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`flex h-2.5 w-2.5 rounded-full ${
                    isCalling ? "bg-emerald-500 animate-pulse" : "bg-text-muted"
                  }`}
                />
                <span className="text-xs font-mono font-semibold text-text-muted uppercase">
                  {isCalling ? "Online" : "Standby"}
                </span>
              </div>
            </div>

            {/* Central Waveform & Live Dialogue Stream */}
            <div className="my-6 space-y-6">
              {/* Waveform visualizer */}
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-muted/70 border border-surface-border">
                <AudioWaveform
                  isActive={isCalling && (activeStep === "listening" || activeStep === "speaking")}
                  variant={activeStep === "speaking" ? "teal" : "blue"}
                  barCount={24}
                  className="h-16 w-full"
                />

                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-text-muted font-medium">
                  {activeStep === "idle" && <span>Click &quot;Start Demo Call&quot; to test conversation</span>}
                  {activeStep === "listening" && <span className="text-blue-500 font-semibold">● Customer speaking...</span>}
                  {activeStep === "thinking" && <span className="text-amber-500 font-semibold">● Evaluating business rules & calendar...</span>}
                  {activeStep === "speaking" && <span className="text-brand-500 dark:text-brand-400 font-semibold">● AI answering with voice synthesis...</span>}
                  {activeStep === "completed" && <span className="text-emerald-500 font-semibold">✓ Action completed • Ready to book demo</span>}
                </div>
              </div>

              {/* Dynamic Transcript Bubbles */}
              <div className="space-y-3">
                {transcriptIndex >= 1 && (
                  <div className="flex items-start gap-3 rounded-2xl border border-surface-border bg-surface-muted/80 p-3.5 text-xs animate-in fade-in">
                    <span className="font-bold text-accent-600 dark:text-accent-400 shrink-0">Caller:</span>
                    <p className="text-foreground leading-relaxed font-medium">
                      &quot;{selectedScenario.callerPrompt}&quot;
                    </p>
                  </div>
                )}

                {transcriptIndex >= 2 && (
                  <div className="flex items-start gap-3 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-3.5 text-xs animate-in fade-in">
                    <span className="font-bold text-brand-600 dark:text-brand-400 shrink-0">ZTechAI:</span>
                    <p className="text-foreground leading-relaxed font-medium">
                      &quot;{selectedScenario.aiResponse}&quot;
                    </p>
                  </div>
                )}

                {activeStep === "completed" && (
                  <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-2.5 text-xs text-emerald-700 dark:text-emerald-300">
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>{selectedScenario.actionTaken}</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold">0.4s Latency</span>
                  </div>
                )}
              </div>
            </div>

            {/* Terminal Controls Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-surface-border">
              {!isCalling ? (
                <button
                  onClick={() => startDemoCall(selectedScenario)}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-600 transition-all"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Start Demo Call ({selectedScenario.name})</span>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={endCall}
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-rose-700 transition-all"
                  >
                    <PhoneOff className="h-4 w-4" />
                    <span>End Call</span>
                  </button>

                  <button
                    onClick={() => startDemoCall(selectedScenario)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-muted px-3.5 py-2.5 text-xs font-semibold text-text-muted hover:text-foreground"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Replay</span>
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
                <span className="hidden sm:inline">Production Latency:</span>
                <span className="font-mono text-brand-600 dark:text-brand-400 font-bold">&lt;500ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </section>
  );
}
