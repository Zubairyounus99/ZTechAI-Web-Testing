"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { X, ExternalLink, Calendar, ShieldCheck, Clock, RefreshCw, AlertCircle, Sparkles, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

interface CalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalModal({ isOpen, onClose }: CalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [iframeState, setIframeState] = useState<"loading" | "loaded" | "error" | "unavailable">("loading");
  const [retryCount, setRetryCount] = useState(0);

  // Compute clean calLink slug and full URL from dynamic environment configuration
  const { bookingUrl, embedUrl, isConfigured } = useMemo(() => {
    const envBooking = process.env.NEXT_PUBLIC_CAL_BOOKING_URL || process.env.NEXT_PUBLIC_CALCOM_URL;
    const envEmbed = process.env.NEXT_PUBLIC_CAL_EMBED_URL;

    const rawBooking = (envBooking || siteConfig.calBookingUrl || "").trim();
    const rawEmbed = (envEmbed || siteConfig.calEmbedUrl || "").trim();

    if (!rawBooking && !rawEmbed) {
      return { bookingUrl: "", embedUrl: "", isConfigured: false };
    }

    let calculatedBooking = rawBooking;
    let calculatedEmbed = rawEmbed;

    if (!calculatedBooking && calculatedEmbed) {
      calculatedBooking = calculatedEmbed.replace(/app\.cal\.com/, "cal.com").replace(/\?.*$/, "");
    }

    if (!calculatedEmbed && calculatedBooking) {
      const slug = calculatedBooking
        .replace(/^https?:\/\/(app\.)?cal\.com\//, "")
        .replace(/\?.*$/, "")
        .trim();
      calculatedEmbed = `https://app.cal.com/${slug}?embed=true&theme=dark&layout=month_view`;
    } else if (calculatedBooking && calculatedEmbed.includes("ztechai/discovery") && !calculatedBooking.includes("ztechai/discovery")) {
      const slug = calculatedBooking
        .replace(/^https?:\/\/(app\.)?cal\.com\//, "")
        .replace(/\?.*$/, "")
        .trim();
      calculatedEmbed = `https://app.cal.com/${slug}?embed=true&theme=dark&layout=month_view`;
    }

    const embedWithRetry = calculatedEmbed.includes("?")
      ? `${calculatedEmbed}&t=${retryCount}`
      : `${calculatedEmbed}?t=${retryCount}`;

    return {
      bookingUrl: calculatedBooking,
      embedUrl: embedWithRetry,
      isConfigured: true,
    };
  }, [retryCount]);

  // Reset loading state when opened
  useEffect(() => {
    if (isOpen) {
      if (!isConfigured) {
        setIframeState("unavailable");
        return;
      }

      setIframeState("loading");
      document.body.style.overflow = "hidden";
      trackEvent("booking_modal_opened", { bookingUrl });

      // Fallback timeout: if iframe doesn't fire onLoad within 12 seconds, present error/fallback
      const timer = setTimeout(() => {
        setIframeState((prev) => (prev === "loading" ? "error" : prev));
      }, 12000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, isConfigured, bookingUrl, retryCount]);

  // Keyboard Escape support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleRetry = () => {
    setIframeState("loading");
    setRetryCount((prev) => prev + 1);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cal-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="relative z-10 flex h-full max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-surface-border bg-card-bg text-foreground shadow-2xl transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border px-4 sm:px-6 py-3.5 bg-surface/95 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 dark:text-brand-400">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <h3 id="cal-modal-title" className="font-display text-sm sm:text-base font-bold text-foreground">
                Book a 15-Minute AI Discovery Call
              </h3>
              <p className="text-[11px] sm:text-xs text-text-muted">
                See how a custom AI voice agent will handle real phone calls and bookings for your business.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-text-muted transition-colors hover:bg-surface-elevated hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Close booking modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Benefits Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 border-b border-surface-border bg-surface-muted/60 px-4 sm:px-6 py-2 text-xs text-text-muted shrink-0">
          <div className="flex items-center gap-1.5 font-semibold text-[11px] sm:text-xs">
            <Clock className="h-3.5 w-3.5 text-brand-500 dark:text-brand-400 shrink-0" />
            <span>15-min focused discovery</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-[11px] sm:text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>No upfront payment</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-[11px] sm:text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-accent-500 shrink-0" />
            <span>No high-pressure sales</span>
          </div>
          <div className="flex items-center justify-start sm:justify-end shrink-0">
            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-brand-500 dark:text-brand-400 hover:underline transition-colors"
              >
                <span>Open in new tab</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* Calendar Body Area */}
        <div className="relative flex-1 w-full min-h-[480px] sm:min-h-[560px] bg-card-bg overflow-hidden flex items-center justify-center">
          {/* Missing Configuration Fallback */}
          {iframeState === "unavailable" && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card-bg px-4 py-8 space-y-5 text-center">
              <div className="h-12 w-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="space-y-1 max-w-md">
                <h4 className="font-display text-base font-bold text-foreground">
                  Online Scheduling Temporarily Unavailable
                </h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Please reach out to our engineering team directly by phone or email to schedule your 15-minute AI discovery call.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {siteConfig.phone && (
                  <a
                    href={`tel:${siteConfig.phoneTel}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-brand-500/25 transition-all"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call {siteConfig.phoneFormatted}</span>
                  </a>
                )}
                {siteConfig.email && (
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface-elevated transition-all"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email {siteConfig.email}</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Loading State Overlay */}
          {iframeState === "loading" && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card-bg px-4 py-8 space-y-5 text-center">
              {/* Premium Animated AI Signal Indicator */}
              <div className="relative flex items-center justify-center">
                <div className="h-16 w-16 rounded-2xl border border-brand-500/40 bg-brand-500/10 flex items-center justify-center shadow-lg shadow-brand-500/10">
                  <Sparkles className="h-8 w-8 text-brand-500 dark:text-brand-400 animate-pulse" />
                </div>
                <div className="absolute -inset-2 rounded-2xl border border-brand-500/20 animate-ping pointer-events-none opacity-40" />
              </div>

              <div className="space-y-2 max-w-sm">
                <h4 className="font-display text-base font-bold text-foreground">
                  Preparing your meeting calendar...
                </h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Just a moment while we load live available time slots with our engineering team.
                </p>
              </div>

              {/* Minimal Skeleton Grid */}
              <div className="w-full max-w-md grid grid-cols-3 gap-2 pt-2 opacity-60">
                <div className="h-8 rounded-lg bg-surface-muted animate-pulse" />
                <div className="h-8 rounded-lg bg-surface-muted animate-pulse" />
                <div className="h-8 rounded-lg bg-surface-muted animate-pulse" />
              </div>
            </div>
          )}

          {/* Error Fallback State */}
          {iframeState === "error" && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card-bg px-4 py-8 space-y-4 text-center">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1 max-w-md">
                <h4 className="font-display text-base font-bold text-foreground">
                  Calendar Embed Taking Longer Than Expected
                </h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  You can retry loading the calendar or open our direct scheduling page in a new window.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface-elevated transition-all"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Retry Embed</span>
                </button>
                {bookingUrl && (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-brand-500/25 transition-all"
                  >
                    <span>Open Direct Scheduling</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Embedded Cal.com Iframe */}
          {isConfigured && embedUrl && (
            <iframe
              key={embedUrl}
              src={embedUrl}
              onLoad={() => setIframeState("loaded")}
              onError={() => setIframeState("error")}
              title="Book an AI discovery session with ZTechAI"
              className={`w-full h-full border-0 min-h-[480px] sm:min-h-[560px] transition-opacity duration-300 ${
                iframeState === "loaded" ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              allow="camera; microphone; autoplay; encrypted-media; fullscreen"
            />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-surface-border bg-surface/98 px-5 sm:px-7 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <p className="text-[11px] sm:text-xs text-text-muted font-medium text-center sm:text-left">
            You are not committing to anything by booking this call. Your first step is simply to discover where AI could improve your business.
          </p>

          {bookingUrl && (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-brand-500 dark:text-brand-400 hover:underline transition-colors shrink-0"
            >
              <span>Open in new tab</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
