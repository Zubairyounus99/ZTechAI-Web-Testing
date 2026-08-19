import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Radio, Home, Sparkles, Phone, Calendar } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 bg-background">
      <div className="relative max-w-2xl w-full text-center space-y-8">
        {/* Glow ambient background */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-64 w-64 rounded-full bg-brand-500/15 blur-3xl" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-mono font-bold text-rose-500 dark:text-rose-400">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          <span>TRANSMISSION CODE 404 • SIGNAL LOST</span>
        </div>

        {/* Main Title & Copy */}
        <div className="space-y-4">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground">
            404 <span className="text-brand-500 dark:text-brand-400">Signal Lost.</span>
          </h1>
          <p className="text-base sm:text-lg text-text-muted max-w-lg mx-auto leading-relaxed">
            The page or frequency you were looking for has moved, expired, or does not exist on the {siteConfig.name} network.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-brand-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/ai-voice-agents"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-card-bg hover:bg-surface-elevated px-6 py-3 text-xs font-semibold text-foreground transition-all hover:border-brand-500/40"
          >
            <Sparkles className="h-4 w-4 text-brand-500" />
            <span>Explore AI Voice Agents</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-brand-500/30 bg-brand-500/10 hover:bg-brand-500/20 px-6 py-3 text-xs font-semibold text-brand-500 dark:text-brand-400 transition-all"
          >
            <Calendar className="h-4 w-4" />
            <span>Book a 15-Minute Demo</span>
          </Link>
        </div>

        {/* Quick Diagnostic Footer */}
        {siteConfig.phone && (
          <div className="pt-6 border-t border-surface-border text-xs font-mono text-text-muted">
            Need immediate support? Call our team directly at{" "}
            <a href={`tel:${siteConfig.phoneTel}`} className="text-brand-500 font-bold hover:underline">
              {siteConfig.phoneFormatted}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
