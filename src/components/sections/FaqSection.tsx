"use client";

import React, { useState } from "react";
import { faqsData } from "@/data/faqs";
import { trackEvent } from "@/lib/analytics";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "General", "Capabilities", "Setup & Tech", "Pricing & Privacy"];

  const filteredFaqs =
    activeCategory === "All"
      ? faqsData
      : faqsData.filter((faq) => faq.category === activeCategory);

  const toggleFaq = (idx: number) => {
    const next = openIndex === idx ? null : idx;
    setOpenIndex(next);
    if (next !== null) {
      trackEvent("faq_opened", { question: filteredFaqs[idx].question });
    }
  };

  return (
    <section id="faq" className="py-24 sm:py-32 relative bg-surface border-y border-surface-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Clear, Honest Answers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Frequently Asked <span className="text-brand-500 dark:text-brand-400">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            Everything you need to know about how ZTechAI voice agents are built, tested, integrated, and deployed.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                    : "bg-surface-muted border border-surface-border text-text-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-surface-border bg-card-bg overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm sm:text-base font-bold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-text-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-500" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-surface-border animate-in fade-in duration-200 font-normal">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-mono font-semibold text-brand-600 dark:text-brand-400">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
