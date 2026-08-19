export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Capabilities" | "Setup & Tech" | "Pricing & Privacy";
}

export const faqsData: FAQItem[] = [
  {
    category: "General",
    question: "What is an AI voice agent?",
    answer:
      "An AI voice agent is an intelligent, conversational system designed specifically for phone calls. Unlike rigid interactive voice response (IVR) phone trees or basic text chatbots, a ZTechAI voice agent speaks naturally, understands context, responds in real-time without awkward pauses, answers customer questions, checks calendar availability, books appointments, and triggers operational actions directly inside your existing business tools.",
  },
  {
    category: "Capabilities",
    question: "What can the AI voice agent actually do during a call?",
    answer:
      "A ZTechAI agent can answer inbound calls instantly, qualify caller intent, book appointments on your calendar, reschedule or cancel existing slots, quote service fees, answer business FAQs (hours, address, services, pricing policies), collect property or insurance details, transfer urgent callers to human staff, send immediate SMS confirmations with links, and log structured data into your CRM.",
  },
  {
    category: "Setup & Tech",
    question: "Can it answer my existing business phone number?",
    answer:
      "Yes. You do not need to change your business phone number or replace your carrier. You simply set up conditional call forwarding (e.g. forward when busy, unanswered after 3 rings, or after business hours) or full forwarding from your current phone provider (such as RingCentral, Nextiva, Vonage, Verizon, AT&T, Google Voice, or standard landlines) to your dedicated ZTechAI line.",
  },
  {
    category: "Capabilities",
    question: "Can it book appointments directly into my existing calendar?",
    answer:
      "Yes. ZTechAI integrates directly with Google Calendar, Microsoft Outlook, Cal.com, Calendly, and industry-specific practice management & field service systems (such as Dentrix, Eaglesoft, ServiceTitan, Jobber, Housecall Pro, and Follow Up Boss). It adheres to your custom buffer times, provider schedules, and operatory/service zone constraints.",
  },
  {
    category: "Capabilities",
    question: "Can it reschedule and cancel appointments?",
    answer:
      "Yes. If a customer calls wishing to reschedule or cancel, the AI verifies their identity (such as confirming phone number and appointment details), checks available open slots in your system, updates the booking, and automatically frees the slot for other callers while updating your calendar and notifying your staff.",
  },
  {
    category: "Capabilities",
    question: "Can it transfer calls to my human team when needed?",
    answer:
      "Absolutely. Human escalation is a built-in safety architecture. If a caller requests to speak with a specific staff member, reports a critical medical/emergency situation, or has an edge-case inquiry outside the AI's approved knowledge base, the agent seamlessly warm-transfers or live-bridges the call to your front desk, on-call technician, or doctor.",
  },
  {
    category: "Capabilities",
    question: "Can it answer calls after business hours and on weekends?",
    answer:
      "Yes. ZTechAI operates 24/7/365. When homeowners call about a burst pipe at 9:00 PM, or a patient calls with a broken tooth on Sunday morning, the AI answers on the first ring, collects emergency details, schedules the earliest slot or dispatches on-call staff according to your weekend protocols.",
  },
  {
    category: "Capabilities",
    question: "Can it make outbound phone calls?",
    answer:
      "Yes, for approved operational workflows such as appointment reminders, pre-visit intake checks, service completion follow-ups, and past lead reactivation. Outbound agents are configured strictly in compliance with US telecommunication guidelines and your approved contact lists.",
  },
  {
    category: "Capabilities",
    question: "Can it send instant SMS reminders and follow-ups?",
    answer:
      "Yes. During or immediately after a call, the AI can trigger SMS text messages to the caller containing directions to your office, appointment calendar invites, links to upload intake forms or photos of equipment, and automated appointment reminders 24 hours prior to service.",
  },
  {
    category: "Capabilities",
    question: "Can it follow up with leads that didn't book initially?",
    answer:
      "Yes. If a caller inquires about a quote but needs to check with their spouse or schedule, the AI can be configured to send a polite follow-up text or place a courtesy follow-up call at an agreed-upon later time to secure the booking.",
  },
  {
    category: "Setup & Tech",
    question: "Can it update my CRM and practice software automatically?",
    answer:
      "Yes. Every call produces a structured summary, audio transcript (if enabled), caller intent classification, contact info, and custom field data that gets pushed instantly into your CRM via direct API integrations or webhooks.",
  },
  {
    category: "Setup & Tech",
    question: "Can I customize the AI's voice, tone, and personality?",
    answer:
      "Yes. We configure the voice, speaking cadence, tone (e.g. warm and empathetic for healthcare; energetic and efficient for home trades), vocabulary, and conversational style to seamlessly reflect your company's brand identity.",
  },
  {
    category: "Setup & Tech",
    question: "Can I train the AI on my specific business information and pricing?",
    answer:
      "Yes. During onboarding, we ingest your services list, FAQs, pricing guidelines, geographic service areas, staff roster, intake questions, and escalation rules. The AI answers solely from your verified business knowledge base.",
  },
  {
    category: "Capabilities",
    question: "What happens when the AI doesn't know the answer to a question?",
    answer:
      "The AI is programmed with strict guardrails to never invent answers, make false promises, or provide unauthorized legal or medical advice. If an inquiry falls outside its approved knowledge, it politely informs the caller, captures their question in detail, and offers to transfer them to a team member or have a manager call them back.",
  },
  {
    category: "Setup & Tech",
    question: "Can I review call recordings and transcripts?",
    answer:
      "Yes. You have access to a clean dashboard displaying real-time call logs, searchable text transcripts, extracted action items, and performance analytics, allowing your management team to audit conversations at any time.",
  },
  {
    category: "Setup & Tech",
    question: "How long does it take to deploy a custom AI agent?",
    answer:
      "Most standard deployments take between 5 to 10 business days. This includes business knowledge intake, voice configuration, workflow programming, calendar/CRM integration, rigorous end-to-end edge-case testing, and live call routing verification.",
  },
  {
    category: "General",
    question: "What types of businesses can use ZTechAI?",
    answer:
      "Any US business that relies heavily on incoming phone calls, customer inquiries, appointment scheduling, and lead follow-up. Our primary verticals include Dental Practices, Medical Clinics, HVAC Contractors, Plumbing Companies, Roofing Specialists, Electrical Contractors, Landscaping Companies, and Real Estate Teams.",
  },
  {
    category: "General",
    question: "Can I use ZTechAI for a dental or medical business?",
    answer:
      "Yes. We build custom healthcare voice agents designed with strict clinical triage rules, appointment intake workflows, and security guardrails tailored to the operational needs of dental and medical practices.",
  },
  {
    category: "General",
    question: "What happens during the 15-minute demo?",
    answer:
      "During the discovery call, we analyze your current call volume, missed-call patterns, and scheduling bottlenecks. We demonstrate a live interactive voice agent customized for your industry, show you how it integrates with your existing software, and outline a tailored deployment blueprint.",
  },
  {
    category: "Setup & Tech",
    question: "Is there a complicated technical setup required for my staff?",
    answer:
      "No. ZTechAI handles the entire engineering, prompt design, workflow testing, and system integration. Your staff does not need to learn complex new software—they simply receive confirmed appointments on their regular calendar and qualified leads in their regular CRM.",
  },
  {
    category: "Capabilities",
    question: "Can the AI handle multiple calls at the exact same time?",
    answer:
      "Yes. Unlike human staff who can only answer one call per line, a ZTechAI agent can handle dozens of simultaneous incoming calls concurrently with zero hold time or busy signals, preventing call drop-offs during marketing campaigns or seasonal surges.",
  },
  {
    category: "Pricing & Privacy",
    question: "How does pricing work?",
    answer:
      "Because every business has unique call volumes, workflows, and integration requirements, we don’t force you into cookie-cutter plans. Pricing is structured around a one-time custom engineering & integration setup plus a predictable monthly operational fee based on call volume and workflow complexity.",
  },
  {
    category: "Pricing & Privacy",
    question: "Can I start with one workflow (e.g. after-hours calls) and expand later?",
    answer:
      "Yes, many of our clients start by automating after-hours call answering and emergency booking, then expand to overflow answering during peak hours, and later activate outbound appointment reminders and lead reactivation.",
  },
  {
    category: "Pricing & Privacy",
    question: "Who owns my customer data and conversation transcripts?",
    answer:
      "You do. Your customer data, call recordings, and transcripts remain your exclusive property. We do not sell your data or use your private customer conversations to train public third-party models.",
  },
];
