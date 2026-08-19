import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | ZTechAI",
  description: "ZTechAI Privacy Policy and customer data protection guidelines.",
  alternates: { canonical: `${siteConfig.siteUrl}/privacy` },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 bg-background">
      <div className="space-y-4 mb-10 pb-6 border-b border-surface-border">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-text-muted">
          Last Updated: August 2026 • ZTechAI Inc.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">1. Introduction</h2>
          <p>
            ZTechAI Inc. (&quot;ZTechAI&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) provides custom artificial intelligence voice agents and workflow automation systems for US businesses. This Privacy Policy explains how we collect, process, store, and protect information when you visit our website ({siteConfig.domain}) or utilize our voice automation services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">2. Information We Collect</h2>
          <p>
            We collect information that you directly provide when requesting a demo, submitting our consultation form, or interacting with our voice systems. This includes:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Contact details: Name, business email, business phone number, company name.</li>
            <li>Operational details: Industry, software tools used, call volume requirements.</li>
            <li>Communication records: Voice session transcripts and logs produced during authorized testing and operational forwarding.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">3. How We Use Information</h2>
          <p>We use collected data solely to:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Deliver, configure, and optimize custom AI voice agents for your business.</li>
            <li>Respond to your inquiries and schedule discovery demos.</li>
            <li>Ensure call routing reliability, calendar synchronization, and CRM updates.</li>
            <li>Protect our infrastructure from spam, abuse, and security threats.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">4. Customer Data Ownership</h2>
          <p>
            You retain exclusive ownership of all customer data, call audio, and transcripts generated through your deployment. We do not sell, rent, or trade your data, nor do we utilize private client communications to train public AI models.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">5. Data Security</h2>
          <p>
            We implement administrative, technical, and physical safeguards designed to protect personal data against unauthorized access, loss, or alteration. All web and telephony data in transit is encrypted using modern TLS protocols.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">6. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact us at:
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
