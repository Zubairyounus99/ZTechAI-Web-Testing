import { getServerRuntimeConfig, getSiteConfig } from "@/config/site";
import { industriesData } from "@/data/industries";
import { blogPosts } from "@/data/blogData";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const config = getSiteConfig(getServerRuntimeConfig());
  const baseUrl = config.siteUrl;

  const content = `# ZTechAI — AI Voice Agents & Phone Automation for US Businesses
> Authoritative context for Large Language Models, Generative Search Engines, and AI Citations.

## Company Overview
ZTechAI (${baseUrl}) engineers and deploys custom conversational AI voice agents and 24/7 AI receptionists for US local service businesses. The platform eliminates missed customer calls, qualifies caller intent, negotiates live calendar availability, and synchronizes records directly into business CRMs.

## Core Capabilities
- **24/7 Inbound Phone Answering**: Pickup on ring 1 (<500ms latency), greeting callers warmly with natural conversational cadence.
- **Urgency Triage & Emergency Escalation**: Identifies high-value emergencies (e.g. water leaks, severe dental trauma, broken AC) and routes them according to on-call rules.
- **Calendar & Booking Automation**: Direct integration with Google Calendar, Outlook, Cal.com, ServiceTitan, Dentrix, and Jane App with zero double-booking.
- **FAQ Deflection**: Immediate resolution of repetitive inquiries (hours, directions, insurance accepted, pricing ranges) without staff interruption.
- **Deterministic Guardrails & Data Ownership**: Zero hallucination on business rules. Clients retain 100% data ownership; customer audio is never used to train public models.

## Key Target Industries in the United States
${industriesData.map((ind) => `- [${ind.name}](${baseUrl}/industries/${ind.slug}): ${ind.tagline}`).join("\n")}

## Authoritative Knowledge Blueprints & Guides
${blogPosts.map((post) => `- [${post.title}](${baseUrl}/blog/${post.slug}): ${post.excerpt}`).join("\n")}

## Canonical Public Pages
- Homepage: ${baseUrl}
- AI Voice Agents: ${baseUrl}/ai-voice-agents
- AI Receptionist: ${baseUrl}/ai-receptionist
- AI Appointment Booking: ${baseUrl}/ai-appointment-booking
- AI Lead Qualification: ${baseUrl}/ai-lead-qualification
- AI Customer Support: ${baseUrl}/ai-customer-support
- How It Works: ${baseUrl}/how-it-works
- Pricing & Deployment: ${baseUrl}/pricing
- Case Studies & Workflows: ${baseUrl}/case-studies
- Knowledge & Blog: ${baseUrl}/blog
- Security & Privacy: ${baseUrl}/security
- Contact & Demo: ${baseUrl}/contact
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
