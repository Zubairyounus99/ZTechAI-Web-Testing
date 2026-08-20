import React from "react";
import { Hero } from "@/components/sections/Hero";
import { LiveAiDemo } from "@/components/sections/LiveAiDemo";
import { MissedCallStory } from "@/components/sections/MissedCallStory";
import { BusinessImpact } from "@/components/sections/BusinessImpact";
import { Capabilities } from "@/components/sections/Capabilities";
import { WorkflowVisualizer } from "@/components/sections/WorkflowVisualizer";
import { AiEmployeeConcept } from "@/components/sections/AiEmployeeConcept";
import { IndustryShowcase } from "@/components/sections/IndustryShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Integrations } from "@/components/sections/Integrations";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { ExploreJourney } from "@/components/sections/ExploreJourney";
import { CostComparison } from "@/components/sections/CostComparison";
import { ExampleWorkflows } from "@/components/sections/ExampleWorkflows";
import { TrustSecurity } from "@/components/sections/TrustSecurity";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Interactive Voice AI Demo */}
      <LiveAiDemo />

      {/* 3. The 8:47 PM Missed Call Story */}
      <MissedCallStory />

      {/* 4. Business Impact Metrics */}
      <BusinessImpact />

      {/* 5. 12 Core Capabilities */}
      <Capabilities />

      {/* 6. Visual Data Pipeline */}
      <WorkflowVisualizer />

      {/* 7. AI Employee Concept & Transparency */}
      <AiEmployeeConcept />

      {/* 8. Industry Blueprints & Modal Demos */}
      <IndustryShowcase />

      {/* 9. How It Works Step-by-Step */}
      <HowItWorks />

      {/* 10. Ecosystem Integrations */}
      <Integrations />

      {/* 11. Dynamic ROI Opportunity Calculator */}
      <RoiCalculator />

      {/* 12. Low-Risk 3-Stage AI Discovery Journey */}
      <ExploreJourney />

      {/* 13. Labor & Cost Comparison Matrix */}
      <CostComparison />

      {/* 14. Example Implementation Workflows */}
      <ExampleWorkflows />

      {/* 15. Enterprise Trust & Security */}
      <TrustSecurity />

      {/* 16. Featured Knowledge Hub & Operational Blueprints */}
      <BlogPreviewSection />

      {/* 17. Comprehensive FAQs */}
      <FaqSection />

      {/* 18. Blueprint Request & Lead Capture Form */}
      <LeadCaptureForm />

      {/* 19. Final Dramatic CTA */}
      <FinalCta />
    </div>
  );
}
