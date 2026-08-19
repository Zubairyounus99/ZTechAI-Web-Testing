"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { CalModal } from "@/components/ui/CalModal";
import { trackEvent } from "@/lib/analytics";
import { Calendar, Sparkles } from "lucide-react";

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [calOpen, setCalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past initial hero (350px)
      setIsVisible(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookDemo = () => {
    trackEvent("cta_book_demo", { source: "mobile_sticky_bar" });
    setCalOpen(true);
  };

  const handleTalkToAi = () => {
    trackEvent("cta_talk_to_ai", { source: "mobile_sticky_bar" });
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden border-t border-surface-border bg-surface/95 backdrop-blur-xl p-3 shadow-2xl transition-all animate-in slide-in-from-bottom-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleTalkToAi}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-surface-border bg-surface-muted py-2.5 text-xs font-semibold text-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-500 dark:text-brand-400" />
            <span>Talk to AI</span>
          </button>
          <button
            onClick={handleBookDemo}
            className="flex-[1.6] flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 py-2.5 text-xs font-semibold text-white shadow-lg shadow-brand-500/25"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book Discovery</span>
          </button>
        </div>
      </div>

      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
