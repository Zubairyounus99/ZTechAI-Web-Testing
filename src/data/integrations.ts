export interface IntegrationItem {
  name: string;
  category: "CRM & Field Service" | "Calendar & Scheduling" | "Communication" | "Automation & Ops";
  description: string;
  status: "Supported" | "Coming Soon";
  iconName: string;
}

export const integrationsData: IntegrationItem[] = [
  // CRM & Field Service
  {
    name: "ServiceTitan",
    category: "CRM & Field Service",
    description: "Direct dispatch booking, customer profile match, and job ticket generation for HVAC & plumbing.",
    status: "Supported",
    iconName: "Flame",
  },
  {
    name: "Jobber",
    category: "CRM & Field Service",
    description: "Real-time client lookup, quote creation, and route schedule synchronization for home service trades.",
    status: "Supported",
    iconName: "Briefcase",
  },
  {
    name: "Housecall Pro",
    category: "CRM & Field Service",
    description: "Automated job booking, customer record updates, and arrival window coordination.",
    status: "Supported",
    iconName: "Home",
  },
  {
    name: "HubSpot CRM",
    category: "CRM & Field Service",
    description: "Contact creation, deal pipeline stage advancement, and call log activity timeline sync.",
    status: "Supported",
    iconName: "GitMerge",
  },
  {
    name: "Follow Up Boss",
    category: "CRM & Field Service",
    description: "Immediate lead ingestion, buyer/seller tag qualification, and live agent call transfers for real estate.",
    status: "Supported",
    iconName: "Users",
  },
  {
    name: "JobNimbus",
    category: "CRM & Field Service",
    description: "Storm damage inspection scheduling and contractor job tracking for roofing & exteriors.",
    status: "Supported",
    iconName: "Layers",
  },
  {
    name: "Salesforce",
    category: "CRM & Field Service",
    description: "Enterprise lead object creation, custom field mapping, and omnichannel activity history.",
    status: "Supported",
    iconName: "Cloud",
  },
  {
    name: "Dentrix PMS",
    category: "CRM & Field Service",
    description: "Operatory chair scheduling and patient chart matching for dental offices.",
    status: "Coming Soon",
    iconName: "Smile",
  },

  // Calendar & Scheduling
  {
    name: "Google Calendar",
    category: "Calendar & Scheduling",
    description: "Instant slot lookup, dual-buffer conflict protection, and automatic calendar invites.",
    status: "Supported",
    iconName: "Calendar",
  },
  {
    name: "Microsoft Outlook 365",
    category: "Calendar & Scheduling",
    description: "Enterprise Exchange and Outlook calendar sync with real-time meeting booking.",
    status: "Supported",
    iconName: "CalendarDays",
  },
  {
    name: "Cal.com",
    category: "Calendar & Scheduling",
    description: "Custom event type booking, time zone coordination, and automated reminder sequences.",
    status: "Supported",
    iconName: "Clock",
  },
  {
    name: "Calendly",
    category: "Calendar & Scheduling",
    description: "Round-robin team member routing, routing forms, and direct link generation.",
    status: "Supported",
    iconName: "CalendarCheck",
  },

  // Communication
  {
    name: "Twilio SMS",
    category: "Communication",
    description: "Two-way text messaging, calendar confirmation dispatch, and intake form links.",
    status: "Supported",
    iconName: "MessageSquare",
  },
  {
    name: "RingCentral",
    category: "Communication",
    description: "SIP trunking, smart conditional call forwarding, and direct PBX integration.",
    status: "Supported",
    iconName: "PhoneCall",
  },
  {
    name: "Nextiva & Vonage",
    category: "Communication",
    description: "Business VoIP call forwarding, simultaneous ring groups, and extension bridging.",
    status: "Supported",
    iconName: "PhoneForwarded",
  },
  {
    name: "SendGrid / Postmark",
    category: "Communication",
    description: "Transactional appointment emails, call transcript summaries, and staff alerts.",
    status: "Supported",
    iconName: "Mail",
  },

  // Automation & Ops
  {
    name: "Zapier",
    category: "Automation & Ops",
    description: "Connect call events to 5,000+ business applications with zero custom code.",
    status: "Supported",
    iconName: "Zap",
  },
  {
    name: "Make.com",
    category: "Automation & Ops",
    description: "Visual webhook workflows, multi-step data transformations, and custom branch logic.",
    status: "Supported",
    iconName: "Workflow",
  },
  {
    name: "Custom Webhooks & REST API",
    category: "Automation & Ops",
    description: "JSON payloads pushed securely to your private database or backend server in real-time.",
    status: "Supported",
    iconName: "Code",
  },
  {
    name: "QuickBooks Online",
    category: "Automation & Ops",
    description: "Invoice draft generation and customer balance check directly via voice.",
    status: "Coming Soon",
    iconName: "FileSpreadsheet",
  },
];
