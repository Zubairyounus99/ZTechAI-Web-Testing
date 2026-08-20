"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useConfig } from "@/components/providers/ConfigProvider";
import { RefreshCw, Home, AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { phone, phoneTel, phoneFormatted, email } = useConfig();
  useEffect(() => {
    // Log non-sensitive error notice
    console.error("ZTechAI Application Notice:", error.message);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 bg-background">
      <div className="relative max-xl w-full text-center space-y-8">
        {/* Glow ambient background */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>SYSTEM NOTICE • RECOVERY AVAILABLE</span>
        </div>

        {/* Title & Description */}
        <div className="space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Something Unexpected Happened.
          </h1>
          <p className="text-base text-text-muted max-w-md mx-auto leading-relaxed">
            We experienced a brief hiccup while loading this resource. You can refresh the page or return safely to our homepage.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-brand-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-card-bg hover:bg-surface-elevated px-6 py-3 text-xs font-semibold text-foreground transition-all hover:border-brand-500/40"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* Quick Contact Help */}
        {(phone || email) && (
          <div className="pt-6 border-t border-surface-border text-xs text-text-muted">
            Need immediate assistance? Contact our team directly at{" "}
            {phone && (
              <a href={`tel:${phoneTel}`} className="text-brand-500 font-bold hover:underline">
                {phoneFormatted}
              </a>
            )}
            {phone && email && <span> or </span>}
            {email && (
              <a href={`mailto:${email}`} className="text-brand-500 font-bold hover:underline">
                {email}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
