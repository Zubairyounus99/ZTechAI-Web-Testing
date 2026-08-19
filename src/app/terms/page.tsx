import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | ZTechAI",
  description: "ZTechAI Terms of Service and Master Service Agreement guidelines.",
  alternates: { canonical: `${siteConfig.siteUrl}/terms` },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 bg-background">
      <div className="space-y-4 mb-10 pb-6 border-b border-surface-border">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground">
          Terms & Conditions
        </h1>
        <p className="text-xs font-mono text-text-muted">
          Last Updated: August 2026 • ZTechAI Inc.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing this website ({siteConfig.domain}) or engaging ZTechAI Inc. (&quot;ZTechAI&quot;) for custom AI voice agent engineering, system integration, and managed operational services, you agree to be bound by these Terms & Conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">2. Services & Scope</h2>
          <p>
            ZTechAI provides custom software engineering, voice prompt architecture, telephony routing integration, calendar synchronization, and managed AI voice infrastructure. All specific deployment deliverables, service-level targets, and configuration parameters are governed by individual client Statement of Work (SOW) agreements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">3. Appropriate Use & Telephony Compliance</h2>
          <p>
            You agree to use ZTechAI voice agents strictly in compliance with applicable federal, state, and local laws, including TCPA, FCC telecommunication regulations, and caller ID transparency rules. Voice agents may only be deployed on authorized phone lines and approved business contact lists.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">4. System Limitations & Human Escalation</h2>
          <p>
            While ZTechAI voice agents are engineered with strict deterministic guardrails to prevent hallucination, artificial intelligence systems can experience unexpected inputs. The client is responsible for establishing appropriate human warm-transfer protocols and monitoring call summaries. ZTechAI voice agents do not provide licensed medical, legal, or emergency 911 dispatch services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">5. Intellectual Property & Ownership</h2>
          <p>
            ZTechAI retains all right, title, and interest in its proprietary conversational engines, orchestration frameworks, and system architectures. The client retains all right, title, and interest in its proprietary business data, customer records, and customized knowledge base materials.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">6. Contact Information</h2>
          <p>
            For questions regarding these Terms, please contact:
            {siteConfig.email && (
              <>
                <br />
                Email: <a href={`mailto:${siteConfig.email}`} className="text-brand-600 dark:text-brand-400 font-bold">{siteConfig.email}</a>
              </>
            )}
            {siteConfig.phone && (
              <>
                <br />
                Phone: <a href={`tel:${siteConfig.phoneTel}`} className="text-brand-600 dark:text-brand-400 font-bold">{siteConfig.phoneFormatted}</a>
              </>
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
