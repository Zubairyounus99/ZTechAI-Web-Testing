export interface ExampleWorkflow {
  id: string;
  industry: string;
  badge: string;
  title: string;
  objective: string;
  operationalChallenge: string;
  solutionArchitecture: string;
  stepByStepFlow: {
    stage: string;
    action: string;
    details: string;
    system: string;
  }[];
  outcomes: string[];
}

export const exampleWorkflowsData: ExampleWorkflow[] = [
  {
    id: "dental-workflow",
    industry: "Dental Practice",
    badge: "Example Implementation",
    title: "After-Hours Emergency & New Patient Receptionist",
    objective: "Eliminate lost new-patient cleaning calls and triage emergency toothache cases after 5:00 PM.",
    operationalChallenge:
      "A 3-dentist suburban dental practice was losing 20-30 after-hours calls per week to voicemail. Callers rarely left messages and instead booked with nearby clinics that answered immediately.",
    solutionArchitecture:
      "A customized ZTechAI voice agent connected to conditional call forwarding, operatory scheduling rules, and SMS gateway with emergency on-call triage protocols.",
    stepByStepFlow: [
      {
        stage: "01. Call Inbound (8:45 PM)",
        action: "AI answers within 1 ring",
        details: "Greets patient warmly with practice name and asks how it can help today.",
        system: "VoIP Telephony",
      },
      {
        stage: "02. Intent Triage",
        action: "Determines Chief Complaint",
        details: "Identifies caller is experiencing severe molar pain after a broken crown.",
        system: "Intent Classifier",
      },
      {
        stage: "03. Calendar Match",
        action: "Checks Open Operatories",
        details: "Evaluates tomorrow's emergency cushion slots and offers 8:30 AM or 11:15 AM.",
        system: "Dental Calendar Sync",
      },
      {
        stage: "04. Booking & Dispatch",
        action: "Locks Slot & Sends SMS",
        details: "Books the 8:30 AM slot and sends SMS with driving directions and digital health history form.",
        system: "Twilio SMS Engine",
      },
      {
        stage: "05. Practice Record Sync",
        action: "PMS & Staff Summary",
        details: "Generates structured clinical notes in the front-desk inbox for morning review.",
        system: "Practice PMS / Email",
      },
    ],
    outcomes: [
      "Zero after-hours emergency calls lost to voicemail.",
      "Front-desk staff starts each morning with confirmed intake details ready in advance.",
      "Emergency patients received immediate reassurance and digital intake links.",
    ],
  },
  {
    id: "hvac-workflow",
    industry: "HVAC Contractor",
    badge: "Example Implementation",
    title: "Summer Heatwave Dispatch & Quote Qualification",
    objective: "Capture 100% of emergency no-cool calls during peak seasonal surges without hiring temporary call-center staff.",
    operationalChallenge:
      "During a 95°F heatwave, dispatch phones were overwhelmed with 80+ simultaneous calls. Dispatches were delayed, and frustrated homeowners called competitor shops.",
    solutionArchitecture:
      "ZTechAI multi-line voice agent handling concurrent calls, quoting standard diagnostic dispatch fees, assigning geographic zones, and alerting on-call technicians.",
    stepByStepFlow: [
      {
        stage: "01. Inbound Surge",
        action: "Handles 15 Simultaneous Calls",
        details: "Every caller receives an immediate, crystal-clear greeting without hold music.",
        system: "Scalable Telephony",
      },
      {
        stage: "02. Diagnostic Intake",
        action: "Captures System Specs",
        details: "Collects unit age, outdoor fan status, property address, and diagnostic fee approval.",
        system: "Qualification Engine",
      },
      {
        stage: "03. Territory Route Check",
        action: "Evaluates Tech Proximity",
        details: "Matches caller's zip code against active technician service zones.",
        system: "ServiceTitan / Jobber",
      },
      {
        stage: "04. Dispatch Alert",
        action: "Pushes Tech Ticket",
        details: "Dispatches high-priority emergency job ticket to the closest available field tech.",
        system: "Mobile Tech Alert",
      },
      {
        stage: "05. Customer Notification",
        action: "Sends Arrival Tracking",
        details: "Texts homeowner a 2-hour arrival window confirmation and dispatch contact info.",
        system: "SMS Confirmation",
      },
    ],
    outcomes: [
      "No missed emergency calls despite extreme call volume spikes.",
      "100% upfront diagnostic fee agreement before technician dispatch.",
      "Field technicians received complete address notes and unit details automatically.",
    ],
  },
  {
    id: "plumbing-workflow",
    industry: "Plumbing Specialist",
    badge: "Example Implementation",
    title: "24/7 Water Leak & Drain Emergency Triage",
    objective: "Provide instant live phone guidance for active water leaks and schedule emergency repair windows.",
    operationalChallenge:
      "Plumbers working underneath sinks or in crawlspaces could not answer incoming calls, losing high-value repiping and water heater replacements.",
    solutionArchitecture:
      "ZTechAI agent that provides immediate water shutoff instructions to prevent damage, qualifies job scope, and books on-site inspection windows.",
    stepByStepFlow: [
      {
        stage: "01. Emergency Call",
        action: "Immediate Voice Pickup",
        details: "Greets caller and immediately checks if water is actively overflowing.",
        system: "Voice AI Layer",
      },
      {
        stage: "02. Safety Guidance",
        action: "Main Valve Shutoff Tip",
        details: "Guides caller calmly on how to shut off main valve while tech is on route.",
        system: "Knowledge Base",
      },
      {
        stage: "03. Schedule Inspection",
        action: "Locks Available Window",
        details: "Books the 1:00 PM - 3:00 PM dispatch slot in contractor calendar.",
        system: "Housecall Pro Sync",
      },
      {
        stage: "04. Field CRM Sync",
        action: "Creates Customer Profile",
        details: "Records phone number, street address, and water heater model details.",
        system: "Plumbing CRM",
      },
    ],
    outcomes: [
      "Immediate customer relief with active leak mitigation advice.",
      "Plumbers remained focused on physical repairs without answering distracting phone calls.",
      "Accurate property data logged directly into scheduling software.",
    ],
  },
];
