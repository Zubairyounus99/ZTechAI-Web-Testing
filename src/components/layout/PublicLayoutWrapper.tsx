"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileStickyCTA } from "./MobileStickyCTA";

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <MobileStickyCTA />
      <Footer />
    </>
  );
}
