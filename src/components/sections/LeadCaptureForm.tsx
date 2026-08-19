"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { CalModal } from "@/components/ui/CalModal";
import { trackEvent } from "@/lib/analytics";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  Loader2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    industry: "Dental",
    website: "",
    automationGoals: "",
    honeypot: "", // Spam honeypot
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [calOpen, setCalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    trackEvent("contact_form_started", { industry: formData.industry });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          automationNeed: formData.automationGoals,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit at this time. Please try again.");
      }

      setStatus("success");
      trackEvent("contact_form_submitted", {
        industry: formData.industry,
        businessName: formData.businessName,
      });
    } catch (err: unknown) {
      setStatus("error");
      trackEvent("contact_form_failed", { error: err instanceof Error ? err.message : "submission_error" });
      setErrorMessage(
        err instanceof Error ? err.message : "We couldn't submit your request right now. Please try again or book a discovery call directly."
      );
    }
  };

  return (
    <section id="contact-form" className="py-24 sm:py-32 relative bg-surface-muted/30 border-t border-surface-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Fast Consultation & Blueprint</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Let&apos;s Build the Right AI Agent for <span className="text-brand-500 dark:text-brand-400">Your Business.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted">
            Tell us about your call volume and current phone bottlenecks. We will prepare a live demo configured for your specific workflow.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-10 shadow-2xl">
          {status === "success" ? (
            <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Your AI opportunity request has been received.
                </h3>
                <p className="text-sm text-text-muted leading-relaxed font-medium">
                  We&apos;ll review your business workflow and prepare the next step for your AI discovery blueprint.
                </p>
              </div>

              {/* Next Step Conversion Box */}
              <div className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-6 max-w-lg mx-auto space-y-3.5 text-left">
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>Want to explore your AI opportunity right now?</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Skip the email back-and-forth and lock a 15-minute slot directly with our engineering team to see your live prototype.
                </p>
                <button
                  onClick={() => {
                    trackEvent("booking_cta_clicked", { source: "form_success" });
                    setCalOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 via-brand-600 to-accent-600 py-3.5 px-4 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-brand-500/25 hover:scale-[1.02] transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Your 15-Minute AI Discovery</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <p className="text-[11px] text-center text-text-muted font-medium">
                  No upfront payment • No obligation • No high-pressure sales
                </p>
              </div>

              {siteConfig.phone && (
                <div className="pt-2">
                  <a
                    href={`tel:${siteConfig.phoneTel}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Prefer to speak immediately? Call {siteConfig.phoneFormatted}</span>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Spam Honeypot Field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="text-xs font-bold text-foreground">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Robert Vance"
                    className="w-full rounded-xl border border-surface-border bg-surface-muted px-4 py-3 text-xs text-foreground placeholder:text-text-muted focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Business Name */}
                <div className="space-y-1.5">
                  <label htmlFor="form-business" className="text-xs font-bold text-foreground">
                    Business Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="form-business"
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Vance Family Dental"
                    className="w-full rounded-xl border border-surface-border bg-surface-muted px-4 py-3 text-xs text-foreground placeholder:text-text-muted focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="text-xs font-bold text-foreground">
                    Business Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-surface-border bg-surface-muted px-4 py-3 text-xs text-foreground placeholder:text-text-muted focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="form-phone" className="text-xs font-bold text-foreground">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="form-phone"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(321) 499-8752"
                    className="w-full rounded-xl border border-surface-border bg-surface-muted px-4 py-3 text-xs text-foreground placeholder:text-text-muted focus:border-brand-500 focus:outline-none"
                  />
                </div>

                {/* Industry Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="form-industry" className="text-xs font-bold text-foreground">
                    Primary Industry <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="form-industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-surface-border bg-surface-muted px-4 py-3 text-xs text-foreground focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Dental">Dental Practice / Clinic</option>
                    <option value="Medical">Medical Clinic / Specialist</option>
                    <option value="HVAC">HVAC Services & Contracting</option>
                    <option value="Plumbing">Plumbing Specialist</option>
                    <option value="Roofing">Roofing Contractor</option>
                    <option value="Electrical">Electrical Contractor</option>
                    <option value="Landscaping">Landscaping & Lawn Care</option>
                    <option value="Real Estate">Real Estate Team / Brokerage</option>
                    <option value="Other Service">Other Appointment/Service Business</option>
                  </select>
                </div>

                {/* Website */}
                <div className="space-y-1.5">
                  <label htmlFor="form-website" className="text-xs font-bold text-foreground">
                    Website URL (Optional)
                  </label>
                  <input
                    id="form-website"
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourbusiness.com"
                    className="w-full rounded-xl border border-surface-border bg-surface-muted px-4 py-3 text-xs text-foreground placeholder:text-text-muted focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Automation Goals */}
              <div className="space-y-1.5">
                <label htmlFor="form-goals" className="text-xs font-bold text-foreground">
                  What would you like to automate? (e.g. after-hours calls, booking cleanings, dispatching technicians)
                </label>
                <textarea
                  id="form-goals"
                  name="automationGoals"
                  rows={3}
                  value={formData.automationGoals}
                  onChange={handleChange}
                  placeholder="Tell us about your current phone bottlenecks..."
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-4 py-3 text-xs text-foreground placeholder:text-text-muted focus:border-brand-500 focus:outline-none resize-none"
                />
              </div>

              {status === "error" && (
                <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 space-y-3 text-xs animate-in fade-in">
                  <div className="flex items-start gap-2.5 text-rose-700 dark:text-rose-300 font-medium">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 text-xs font-semibold"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Try Again</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border bg-card-bg px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-surface-elevated"
                    >
                      <Calendar className="h-3.5 w-3.5 text-brand-500" />
                      <span>Book Discovery Call</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 py-4 text-xs sm:text-sm font-semibold text-white shadow-xl shadow-brand-500/25 hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Request Custom AI Blueprint & Demo</span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-text-muted font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-500" />
                  <span>No upfront payment • No obligation • 100% confidential</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </section>
  );
}
