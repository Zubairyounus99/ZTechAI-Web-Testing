import React from "react";
import Link from "next/link";
import { useConfig } from "@/components/providers/ConfigProvider";
import { Logo } from "@/components/ui/Logo";
import { Mail, Phone, Shield } from "lucide-react";
import { FooterSocialLinks } from "./FooterSocialLinks";

export function Footer() {
  const { email, phone, phoneTel, phoneFormatted, name } = useConfig();

  return (
    <footer className="border-t border-surface-border bg-card-bg text-foreground relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand & Direct Contact */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
              Custom AI voice agents engineered for US local businesses. Never lose a customer, lead, or appointment because nobody was available to answer the phone.
            </p>

            <div className="pt-2 space-y-2 text-sm">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 text-text-muted hover:text-brand-500 transition-colors font-medium"
                >
                  <Mail className="h-4 w-4 text-brand-500 dark:text-brand-400" />
                  <span>{email}</span>
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phoneTel}`}
                  className="flex items-center gap-2.5 text-text-muted hover:text-brand-500 transition-colors font-medium"
                >
                  <Phone className="h-4 w-4 text-brand-500 dark:text-brand-400" />
                  <span>{phoneFormatted}</span>
                </a>
              )}
            </div>

            {/* Dynamic Social Links */}
            <FooterSocialLinks />

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-muted px-3 py-1 text-xs text-text-muted">
                <Shield className="h-3.5 w-3.5 text-brand-500 dark:text-brand-400" />
                <span>Encrypted & Privacy-First Architecture</span>
              </div>
            </div>
          </div>

          {/* 1. SOLUTIONS Column */}
          <div>
            <h4 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/ai-voice-agents" className="text-text-muted hover:text-foreground transition-colors">
                  AI Voice Agents
                </Link>
              </li>
              <li>
                <Link href="/ai-receptionist" className="text-text-muted hover:text-foreground transition-colors">
                  AI Receptionist
                </Link>
              </li>
              <li>
                <Link href="/ai-appointment-booking" className="text-text-muted hover:text-foreground transition-colors">
                  AI Appointment Booking
                </Link>
              </li>
              <li>
                <Link href="/ai-lead-qualification" className="text-text-muted hover:text-foreground transition-colors">
                  Lead Qualification
                </Link>
              </li>
              <li>
                <Link href="/ai-customer-support" className="text-text-muted hover:text-foreground transition-colors">
                  AI Customer Support
                </Link>
              </li>
              <li>
                <Link href="/#capabilities" className="text-text-muted hover:text-foreground transition-colors">
                  Customer Follow-Up
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. INDUSTRIES Column */}
          <div>
            <h4 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Industries
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/industries/dental" className="text-text-muted hover:text-foreground transition-colors">
                  Dental Practices
                </Link>
              </li>
              <li>
                <Link href="/industries/medical" className="text-text-muted hover:text-foreground transition-colors">
                  Medical Clinics
                </Link>
              </li>
              <li>
                <Link href="/industries/hvac" className="text-text-muted hover:text-foreground transition-colors">
                  HVAC Services
                </Link>
              </li>
              <li>
                <Link href="/industries/plumbing" className="text-text-muted hover:text-foreground transition-colors">
                  Plumbing Companies
                </Link>
              </li>
              <li>
                <Link href="/industries/roofing" className="text-text-muted hover:text-foreground transition-colors">
                  Roofing Contractors
                </Link>
              </li>
              <li>
                <Link href="/industries/electrical" className="text-text-muted hover:text-foreground transition-colors">
                  Electrical Contractors
                </Link>
              </li>
              <li>
                <Link href="/industries/landscaping" className="text-text-muted hover:text-foreground transition-colors">
                  Landscaping & Lawn
                </Link>
              </li>
              <li>
                <Link href="/industries/real-estate" className="text-text-muted hover:text-foreground transition-colors">
                  Real Estate Agencies
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. COMPANY Column */}
          <div>
            <h4 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-text-muted hover:text-foreground transition-colors">
                  About ZTechAI
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-text-muted hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-text-muted hover:text-foreground transition-colors">
                  Example Workflows
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-text-muted hover:text-foreground transition-colors">
                  Pricing & Deployment
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-muted hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. RESOURCES & LEGAL Column */}
          <div>
            <h4 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Resources & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/blog" className="text-text-muted hover:text-foreground transition-colors">
                  Knowledge & Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-muted hover:text-foreground transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-text-muted hover:text-foreground transition-colors">
                  Security & Trust Architecture
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="text-text-muted hover:text-foreground transition-colors">
                  Integration Ecosystem
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-muted hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-muted hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} {name} Inc. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Designed for US businesses that depend on calls, customers, and appointments.
          </p>
        </div>
      </div>
    </footer>
  );
}
