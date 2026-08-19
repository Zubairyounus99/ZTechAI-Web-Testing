"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useConfig } from "@/components/providers/ConfigProvider";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CalModal } from "@/components/ui/CalModal";
import { trackEvent } from "@/lib/analytics";
import { Menu, X, Phone, ArrowRight, Sparkles, Calendar } from "lucide-react";

export function Navbar() {
  const { phoneTel, phoneFormatted, phone, primaryCtaText, navLinks } = useConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookDemo = () => {
    trackEvent("cta_book_demo", { source: "navbar" });
    setCalOpen(true);
  };

  const handleTalkToAi = () => {
    trackEvent("cta_talk_to_ai", { source: "navbar" });
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#demo";
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-surface-border bg-surface/90 backdrop-blur-xl py-3 shadow-lg shadow-black/5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-surface-border bg-surface-muted/70 px-4 py-1.5 backdrop-blur-md shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-text-muted transition-colors hover:text-foreground hover:bg-surface-elevated"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs & Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={handleTalkToAi}
              className="inline-flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-muted px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:border-brand-500/40 hover:bg-surface-elevated"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-500 dark:text-brand-400" />
              <span>Talk to AI</span>
            </button>

            <button
              onClick={handleBookDemo}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02] hover:shadow-brand-500/40 active:scale-[0.98]"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>{primaryCtaText}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl border border-surface-border bg-surface-muted p-2 text-text-muted transition-colors hover:text-foreground"
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-surface/98 backdrop-blur-2xl lg:hidden pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="pb-3 border-b border-surface-border">
              <p className="text-xs uppercase tracking-wider text-text-muted font-bold">Navigation</p>
            </div>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-semibold text-foreground py-1.5"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-text-muted" />
                </Link>
              ))}
            </nav>

            {phone && (
              <div className="pt-4 border-t border-surface-border space-y-3">
                <a
                  href={`tel:${phoneTel}`}
                  className="flex items-center gap-3 text-sm font-semibold text-foreground hover:text-brand-500 py-1"
                >
                  <Phone className="h-4 w-4 text-brand-500 dark:text-brand-400" />
                  <span>{phoneFormatted}</span>
                </a>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-6 border-t border-surface-border">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleTalkToAi();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-muted py-3 text-sm font-semibold text-foreground"
            >
              <Sparkles className="h-4 w-4 text-brand-500 dark:text-brand-400" />
              <span>Talk to Our AI</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleBookDemo();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25"
            >
              <Calendar className="h-4 w-4" />
              <span>{primaryCtaText}</span>
            </button>
          </div>
        </div>
      )}

      {/* Cal.com Booking Modal */}
      <CalModal isOpen={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
