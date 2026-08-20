export interface IndustryData {
  id: string;
  slug: string;
  name: string;
  shortTitle: string;
  badge: string;
  tagline: string;
  headline: string;
  subheadline: string;
  icon: string;
  painPoints: string[];
  keyWorkflows: string[];
  aiCapabilities: string[];
  sampleTranscript: {
    speaker: "Caller" | "AI Agent";
    text: string;
    action?: string;
  }[];
  workflowStages: {
    step: string;
    title: string;
    description: string;
    systemTarget: string;
  }[];
  systemsConnected: string[];
}

export const industriesData: IndustryData[] = [
  {
    id: "dental",
    slug: "dental",
    name: "Dental Practices & Clinics",
    shortTitle: "Dental",
    badge: "Healthcare & Practice Management",
    tagline: "Never let an emergency patient or new cleaning inquiry go to voicemail.",
    headline: "Custom AI Receptionist for Modern Dental Practices",
    subheadline:
      "Handle incoming new patient bookings, insurance queries, hygiene recall scheduling, and after-hours tooth emergencies automatically with direct calendar & practice management sync.",
    icon: "Stethoscope",
    painPoints: [
      "Front desk staff cannot answer calls while checking in patients and verifying insurance.",
      "Emergency patients call after 5:00 PM and immediately dial a competitor if sent to voicemail.",
      "Hygiene schedule gaps due to last-minute cancellations without instant recall automation.",
      "High front-desk turnover requiring continuous retraining on phone scripts.",
    ],
    keyWorkflows: [
      "New Patient Intake & Triage",
      "Cleaning & Hygiene Scheduling",
      "After-Hours Emergency Protocol",
      "Automated Appointment Reminders & Confirmations",
      "Pre-Visit Questionnaire SMS Dispatch",
    ],
    aiCapabilities: [
      "Distinguishes between new patient cleanings and urgent toothache emergencies.",
      "Checks provider calendar rules in real-time according to operatory chair availability.",
      "Collects insurance carrier, group number, and patient date of birth securely.",
      "Sends instant SMS directions, intake forms, and calendar invites.",
      "Escalates urgent trauma/swelling cases to the on-call doctor protocol immediately.",
    ],
    sampleTranscript: [
      {
        speaker: "Caller",
        text: "Hi, I have a sharp tooth pain that started an hour ago and I need to see someone today if possible.",
      },
      {
        speaker: "AI Agent",
        text: "I’m sorry you’re dealing with that pain. I can help get you seen right away. Are you a new patient with our practice, or have you visited us before?",
      },
      {
        speaker: "Caller",
        text: "I'm a new patient. I live right down the street on Elm.",
      },
      {
        speaker: "AI Agent",
        text: "Understood. Dr. Vance has an emergency evaluation opening today at 3:15 PM or tomorrow morning at 9:00 AM. Which one works better for you?",
        action: "Checked Open Operatory Calendar",
      },
      {
        speaker: "Caller",
        text: "Today at 3:15 PM is perfect.",
      },
      {
        speaker: "AI Agent",
        text: "You're scheduled for 3:15 PM today with Dr. Vance. I just sent a text with our location and a fast online intake form so you won't have to wait. What is your full legal name?",
        action: "Booked Slot • SMS Confirmation Sent • Practice System Updated",
      },
    ],
    workflowStages: [
      {
        step: "01",
        title: "Call Inbound & Symptom Triage",
        description: "Patient calls; AI instantly answers on ring one, greets them warmly, and classifies urgency.",
        systemTarget: "Telecom Switch",
      },
      {
        step: "02",
        title: "Availability & Rule Verification",
        description: "Checks operatories, chair buffers, and provider preferences in real-time.",
        systemTarget: "Dental Calendar",
      },
      {
        step: "03",
        title: "Slot Booking & Notification",
        description: "Books the confirmed time and locks the appointment with SMS confirmation.",
        systemTarget: "SMS Gateway",
      },
      {
        step: "04",
        title: "Practice Management Sync",
        description: "Logs patient contact details, chief complaint, and intake notes into the clinical schedule.",
        systemTarget: "Practice PMS / CRM",
      },
    ],
    systemsConnected: ["Dentrix", "Eaglesoft", "Open Dental", "Google Calendar", "Twilio SMS"],
  },
  {
    id: "medical",
    slug: "medical",
    name: "Medical Clinics & Specialists",
    shortTitle: "Medical",
    badge: "Clinical Operations",
    tagline: "Streamline patient scheduling, prescription inquiries, and clinic routing 24/7.",
    headline: "Intelligent Patient Communication for Medical Clinics",
    subheadline:
      "Automate appointment requests, routine inquiries, clinic directions, and triage routing with custom guardrails and human staff escalation protocols.",
    icon: "HeartPulse",
    painPoints: [
      "Excessive phone hold times frustrating patients and burning out clinic administrative staff.",
      "High volume of repetitive calls asking for clinic hours, referral rules, or test result status.",
      "Patients missing appointments due to inadequate multi-touch reminder workflows.",
      "Need for strict adherence to clinic-specific clinical triage and escalation scripts.",
    ],
    keyWorkflows: [
      "Specialist Consultation Scheduling",
      "Referral & Insurance Pre-Check",
      "Automated Multi-Touch Visit Reminders",
      "Office FAQ & Direction Guidance",
      "Staff Urgent Call Routing",
    ],
    aiCapabilities: [
      "Routes calls based on specialty, provider rules, and location.",
      "Answers common questions regarding location, parking, and documentation requirements.",
      "Never provides unapproved medical diagnoses or clinical advice.",
      "Transfers acute clinical symptoms immediately to triage nurses or emergency dispatch.",
      "Logs structured conversation transcripts and notes directly for clinic review.",
    ],
    sampleTranscript: [
      {
        speaker: "Caller",
        text: "Hello, I received a referral from my primary care doctor for Dr. Reynolds and wanted to schedule a consultation.",
      },
      {
        speaker: "AI Agent",
        text: "Thank you for reaching out to Valley Specialty Clinic. We'd be glad to schedule that consultation with Dr. Reynolds. Do you have your referral paperwork ready?",
      },
      {
        speaker: "Caller",
        text: "Yes, I have the referral slip right here.",
      },
      {
        speaker: "AI Agent",
        text: "Wonderful. Dr. Reynolds has consultation slots next Tuesday at 10:30 AM or Thursday at 2:00 PM. Would either of those fit your schedule?",
        action: "Queried Clinic Scheduling API",
      },
      {
        speaker: "Caller",
        text: "Tuesday at 10:30 AM works great.",
      },
      {
        speaker: "AI Agent",
        text: "You are confirmed for Tuesday at 10:30 AM. I'm texting you the clinic address, parking instructions, and a link to upload your referral slip. Have a great day!",
        action: "Appointment Scheduled • Upload Link Dispatched",
      },
    ],
    workflowStages: [
      {
        step: "01",
        title: "Intake & Specialty Identification",
        description: "Identifies whether the caller is a new referral, follow-up patient, or general inquiry.",
        systemTarget: "Telephony Layer",
      },
      {
        step: "02",
        title: "Provider Constraint Validation",
        description: "Checks doctor scheduling rules, buffer times, and clinic guidelines.",
        systemTarget: "Clinic Scheduling Engine",
      },
      {
        step: "03",
        title: "Appointment Booking",
        description: "Books the verified slot and delivers pre-visit instructions by SMS.",
        systemTarget: "SMS / Email Engine",
      },
      {
        step: "04",
        title: "EMR / Admin Log",
        description: "Produces a clean structured summary for front office medical assistants.",
        systemTarget: "Clinic EMR / CRM",
      },
    ],
    systemsConnected: ["AthenaHealth", "Kareo", "DrChrono", "Google Workspace", "HIPAA-grade SMS"],
  },
  {
    id: "hvac",
    slug: "hvac",
    name: "HVAC Services & Contractors",
    shortTitle: "HVAC",
    badge: "Field Services",
    tagline: "Capture every furnace breakdown and AC emergency call before your competition does.",
    headline: "24/7 AI Dispatcher & Booking Agent for HVAC Contractors",
    subheadline:
      "Qualify homeowner AC and heating emergencies, quote diagnostic fees, dispatch technicians, and schedule routine seasonal tune-ups automatically.",
    icon: "ThermometerSnowflake",
    painPoints: [
      "AC breakdown calls flood in during peak summer heatwaves when dispatchers are already tied up.",
      "Homeowners whose AC stopped working will call 3 competitors until someone answers live.",
      "Technicians interrupted while on a roof or in an attic to answer simple booking calls.",
      "No automated after-hours qualification of high-value system replacement inquiries.",
    ],
    keyWorkflows: [
      "Emergency No-Cool / No-Heat Triage",
      "Diagnostic Fee & Service Window Booking",
      "System Replacement Lead Qualification",
      "Seasonal Maintenance Agreement Booking",
      "Technician On-The-Way Dispatch SMS",
    ],
    aiCapabilities: [
      "Asks crucial diagnostic questions: system age, noises, thermostat status, unit location.",
      "Communicates service call diagnostic fees clearly and secures homeowner commitment.",
      "Assigns geographic territory zones and matches available technician time windows.",
      "Triggers instant high-priority text alerts to on-call technicians for emergency calls.",
      "Logs full customer address, unit type, and issue description into Field Service CRM.",
    ],
    sampleTranscript: [
      {
        speaker: "Caller",
        text: "Hi! My AC unit outside is making a grinding noise and blowing warm air. It's 88 degrees inside.",
      },
      {
        speaker: "AI Agent",
        text: "I understand how urgent that is in this heat. We have technicians available in your area today. May I get your street address so I can check immediate arrival windows?",
      },
      {
        speaker: "Caller",
        text: "Sure, it's 4122 Oakridge Lane, North Hills.",
      },
      {
        speaker: "AI Agent",
        text: "Thank you. Our diagnostic fee for emergency evaluation is $89, which is credited toward any repair. We can have a technician at Oakridge Lane between 1:00 PM and 3:00 PM today. Does that work for you?",
        action: "Geographic Service Territory Matched",
      },
      {
        speaker: "Caller",
        text: "Yes, please send them as soon as possible.",
      },
      {
        speaker: "AI Agent",
        text: "You're all set. Technician Mike has been assigned to your 1:00 to 3:00 PM window today. I just sent a confirmation text with tracking and will notify you when he is on his way.",
        action: "Job Created in ServiceTitan • Dispatch Notified",
      },
    ],
    workflowStages: [
      {
        step: "01",
        title: "Emergency Intake",
        description: "Answers within 2 seconds; captures unit symptoms, equipment age, and address.",
        systemTarget: "Voice AI Gateway",
      },
      {
        step: "02",
        title: "Zone & Capacity Match",
        description: "Checks dispatch board for territory capacity and technician proximity.",
        systemTarget: "Dispatch Board",
      },
      {
        step: "03",
        title: "Fee Agreement & Booking",
        description: "Quotes dispatch fees transparently and locks homeowner confirmation.",
        systemTarget: "Service Titan / Housecall Pro",
      },
      {
        step: "04",
        title: "Automated Dispatch Alert",
        description: "Pushes job ticket to field tech mobile app and texts homeowner tracking link.",
        systemTarget: "SMS / Mobile App",
      },
    ],
    systemsConnected: ["ServiceTitan", "Housecall Pro", "Jobber", "FieldEdge", "Google Calendar"],
  },
  {
    id: "plumbing",
    slug: "plumbing",
    name: "Plumbing Companies",
    shortTitle: "Plumbing",
    badge: "Emergency Trade Services",
    tagline: "Turn frantic burst-pipe and drain emergency calls into high-ticket dispatched jobs.",
    headline: "AI Voice Agents for Plumbing & Drain Specialists",
    subheadline:
      "Answer water leak, drain backup, and water heater replacement calls 24 hours a day, 7 days a week, booking dispatch windows instantly.",
    icon: "Wrench",
    painPoints: [
      "Burst pipe and flooded basement emergencies happen at night when the shop is closed.",
      "Callers in crisis will not leave a voicemail; they immediately call the next Google result.",
      "High cost of 24/7 call centers that don't know your pricing, service area, or plumbers' schedules.",
      "Unqualified leads wasting tech travel time on minor jobs outside your profitable territory.",
    ],
    keyWorkflows: [
      "Emergency Water Leak & Backup Triage",
      "Water Heater Replacement Estimate Booking",
      "Main Sewer Line Inspection Scheduling",
      "Commercial vs. Residential Qualification",
      "Emergency Shutoff Instruction Guidance",
    ],
    aiCapabilities: [
      "Guides caller through emergency main water shutoff valve location if active flooding is reported.",
      "Collects exact home address, property type, and severity of leak or blockage.",
      "Quotes standard dispatch trip fees and confirms homeowner authorization.",
      "Integrates with Jobber, Housecall Pro, and ServiceTitan to schedule jobs directly.",
      "Sends SMS confirmation with photo of the assigned technician when available.",
    ],
    sampleTranscript: [
      {
        speaker: "Caller",
        text: "I have water leaking from my water heater all over the garage floor right now!",
      },
      {
        speaker: "AI Agent",
        text: "Let’s get that resolved immediately. If safe, please turn the cold water shutoff valve on top of the tank clockwise to stop incoming water. Are you in a single family home?",
        action: "Guided Emergency Safety Step",
      },
      {
        speaker: "Caller",
        text: "Okay, I turned the valve off. Yes, single family home in Westlake.",
      },
      {
        speaker: "AI Agent",
        text: "Great job. We have our senior plumbing tech in Westlake right now. We can have him arrive between 11:00 AM and 1:00 PM today to inspect and replace the tank if needed. Would that work?",
        action: "Checked Plumber Schedule Matrix",
      },
      {
        speaker: "Caller",
        text: "Yes, please send him over.",
      },
      {
        speaker: "AI Agent",
        text: "Done. Your Westlake dispatch is booked for 11:00 AM to 1:00 PM today. A confirmation SMS is on its way to your phone with technician arrival tracking.",
        action: "Dispatched Job Ticket • Alerted On-Call Plumber",
      },
    ],
    workflowStages: [
      {
        step: "01",
        title: "Immediate Triage & Safety",
        description: "Captures leak emergency, provides water shutoff guidance, and verifies address.",
        systemTarget: "AI Voice Engine",
      },
      {
        step: "02",
        title: "Territory & Plumber Dispatch",
        description: "Checks real-time job queues for closest available plumbing specialist.",
        systemTarget: "Jobber / Housecall Pro",
      },
      {
        step: "03",
        title: "Ticket Creation",
        description: "Creates rich job ticket with homeowner notes, issue category, and photos.",
        systemTarget: "Field CRM",
      },
      {
        step: "04",
        title: "Multi-Channel Confirmation",
        description: "Texts arrival window, fee confirmation, and plumber credentials.",
        systemTarget: "Twilio SMS",
      },
    ],
    systemsConnected: ["Jobber", "Housecall Pro", "ServiceTitan", "Twilio", "QuickBooks Online"],
  },
  {
    id: "roofing",
    slug: "roofing",
    name: "Roofing & Exterior Contractors",
    shortTitle: "Roofing",
    badge: "High-Ticket Construction",
    tagline: "Capture storm damage inspections and replacement estimates with zero friction.",
    headline: "AI Lead Capture & Inspection Booking for Roofing Contractors",
    subheadline:
      "Qualify hail damage, active roof leaks, and replacement inquiries instantly, booking estimator inspection slots directly into your sales team's calendar.",
    icon: "Home",
    painPoints: [
      "Post-storm call surges overwhelm office phone lines with hundreds of inbound inquiries in 48 hours.",
      "Estimators spending hours calling homeowners back instead of conducting on-site roof inspections.",
      "Inability to filter out renters or callers outside your geographic service radius.",
      "Losing multi-thousand-dollar insurance claim jobs to competitors who pick up the phone immediately.",
    ],
    keyWorkflows: [
      "Post-Storm Damage Inspection Booking",
      "Full Roof Replacement Estimate Qualification",
      "Active Leak Emergency Escalation",
      "Insurance Claim Documentation Intake",
      "Estimator Calendar Route Optimization",
    ],
    aiCapabilities: [
      "Verifies caller is the deeded property owner before scheduling free inspections.",
      "Collects roof age, material type (architectural shingle, metal, tile), and storm damage date.",
      "Qualifies insurance involvement (e.g., adjuster assigned or claim already filed).",
      "Books inspection appointments synced to specific estimator territory clusters.",
      "Pushes lead data and property address directly into AccuLynx, JobNimbus, or HubSpot.",
    ],
    sampleTranscript: [
      {
        speaker: "Caller",
        text: "Hi, we had hail last night and several shingles blew off my roof. I want to get someone out for an inspection.",
      },
      {
        speaker: "AI Agent",
        text: "We can certainly help inspect that storm damage for you. Are you the homeowner at the property?",
      },
      {
        speaker: "Caller",
        text: "Yes, I am the owner.",
      },
      {
        speaker: "AI Agent",
        text: "Great. What is your property address, and have you already contacted your homeowner insurance company?",
      },
      {
        speaker: "Caller",
        text: "It's 882 Pine Valley Drive. I haven't called insurance yet; wanted your inspection first.",
      },
      {
        speaker: "AI Agent",
        text: "Smart move. Our senior inspector for Pine Valley has openings tomorrow at 10:00 AM or 2:00 PM to perform a complimentary drone and photo inspection. Which time works best?",
        action: "Queried Roofing Estimator Route",
      },
      {
        speaker: "Caller",
        text: "Tomorrow at 10:00 AM works great.",
      },
      {
        speaker: "AI Agent",
        text: "You are confirmed for tomorrow at 10:00 AM. I have sent you a text with your inspector’s details and a guide on what to expect. We look forward to helping you!",
        action: "Lead Created in JobNimbus • Calendar Invite Dispatched",
      },
    ],
    workflowStages: [
      {
        step: "01",
        title: "Ownership & Damage Intake",
        description: "Identifies property ownership, damage type, and urgency.",
        systemTarget: "Voice AI Inbound",
      },
      {
        step: "02",
        title: "Estimator Route Match",
        description: "Matches zip code to assigned roofing estimator's geographic route.",
        systemTarget: "Sales Calendar Engine",
      },
      {
        step: "03",
        title: "Inspection Booking",
        description: "Locks the date/time slot and sends email/SMS invite with inspection checklist.",
        systemTarget: "CRM & Calendar",
      },
      {
        step: "04",
        title: "Pipeline Sync",
        description: "Creates high-priority opportunity ticket in roofing CRM with transcript notes.",
        systemTarget: "AccuLynx / JobNimbus / HubSpot",
      },
    ],
    systemsConnected: ["AccuLynx", "JobNimbus", "HubSpot", "Zapier", "Google Calendar"],
  },
  {
    id: "electrical",
    slug: "electrical",
    name: "Electrical Contractors",
    shortTitle: "Electrical",
    badge: "Trade Services",
    tagline: "Book panel upgrades, EV charger installs, and emergency power outages effortlessly.",
    headline: "Automated Voice Dispatch for Electrical Contractors",
    subheadline:
      "From tripping breakers to EV charger quotes and whole-home generator installations, handle every customer inquiry with professional precision 24/7.",
    icon: "Zap",
    painPoints: [
      "Electricians working on live circuits or ladders cannot answer customer calls safely.",
      "High volume of repetitive questions on EV charger incentives, panel upgrade costs, and permits.",
      "Emergency power loss calls missed after 5:00 PM and on weekends.",
      "Unqualified tire-kickers seeking free over-the-phone troubleshooting without paying diagnostic fees.",
    ],
    keyWorkflows: [
      "EV Charger Installation Quote Booking",
      "Main Electrical Panel Upgrade Intake",
      "Power Outage / Sparking Emergency Triage",
      "Commercial Lighting & Maintenance Scheduling",
      "Permit & Inspection Status Updates",
    ],
    aiCapabilities: [
      "Gathers panel amperage (100A, 200A), brand, and EV model before scheduling quotes.",
      "Prioritizes active burning odors, sparks, or partial power drops for immediate on-call transfer.",
      "Quotes diagnostic troubleshooting rates clearly to filter serious inquiries.",
      "Integrates with FieldPulse, Housecall Pro, and ServiceTitan.",
      "Sends SMS photo upload links for customer breaker panel diagnostics.",
    ],
    sampleTranscript: [
      {
        speaker: "Caller",
        text: "Hi, I just purchased a Tesla and need an electrician to install a Level 2 wall connector in my garage.",
      },
      {
        speaker: "AI Agent",
        text: "Congratulations on the new Tesla! We install Level 2 chargers weekly. Is your electrical panel located in the garage or on an exterior wall?",
      },
      {
        speaker: "Caller",
        text: "It's on the exterior wall on the opposite side of the garage.",
      },
      {
        speaker: "AI Agent",
        text: "Got it. We can schedule a master electrician to assess your panel capacity and provide a fixed quote. We have slots this Thursday at 1:00 PM or Friday at 9:00 AM. Which works best?",
        action: "Checked Electrical Schedule",
      },
      {
        speaker: "Caller",
        text: "Thursday at 1:00 PM works for me.",
      },
      {
        speaker: "AI Agent",
        text: "Perfect, Thursday at 1:00 PM is booked. I've texted you a confirmation and a link where you can upload a photo of your electrical panel to speed up your quote.",
        action: "Job Booked in FieldPulse • Photo Link Sent",
      },
    ],
    workflowStages: [
      {
        step: "01",
        title: "Service Qualification",
        description: "Captures job requirements (EV charger, panel upgrade, repair) and panel specs.",
        systemTarget: "AI Voice Bot",
      },
      {
        step: "02",
        title: "Schedule Slot Matching",
        description: "Identifies licensed electrician availability according to travel buffers.",
        systemTarget: "Field Service Engine",
      },
      {
        step: "03",
        title: "Photo Diagnostic Request",
        description: "Texts homeowner a secure link to upload panel photos ahead of visit.",
        systemTarget: "SMS Gateway",
      },
      {
        step: "04",
        title: "System Synchronization",
        description: "Syncs customer address, EV charger model, and notes into contractor CRM.",
        systemTarget: "Housecall Pro / FieldPulse",
      },
    ],
    systemsConnected: ["FieldPulse", "Housecall Pro", "Jobber", "QuickBooks", "Twilio"],
  },
  {
    id: "landscaping",
    slug: "landscaping",
    name: "Landscaping & Lawn Care",
    shortTitle: "Landscaping",
    badge: "Outdoor & Property Maintenance",
    tagline: "Turn spring quote rushes and seasonal property maintenance calls into paying clients.",
    headline: "AI Receptionist for Landscaping & Lawn Care Companies",
    subheadline:
      "Automate mowing quotes, hardscaping consultations, spring cleanups, and irrigation service scheduling without spending hours at the phone desk.",
    icon: "Trees",
    painPoints: [
      "Lawn crew leaders operating mowers and heavy equipment cannot hear or answer phone calls.",
      "Massive seasonal influx of spring quote requests resulting in lost business if not answered immediately.",
      "Difficulty gathering property lot size, turf conditions, and service frequency over phone tag.",
      "Wasted travel time driving out to properties that fall outside your minimum service requirements.",
    ],
    keyWorkflows: [
      "Lawn Care & Mowing Estimate Qualification",
      "Hardscape / Patio Project Consultation Booking",
      "Irrigation & Sprinkler Repair Dispatch",
      "Commercial Property Grounds Maintenance Intake",
      "Automated Weather Rescheduling Notifications",
    ],
    aiCapabilities: [
      "Captures property address, approximate lawn square footage, and desired service frequency.",
      "Filters inquiries against company minimum ticket size (e.g. minimum monthly spend).",
      "Schedules on-site estimator consultations with automatic driving route grouping.",
      "Sends SMS reminders and automated weather delay updates to entire customer lists.",
      "Integrates with Jobber, LMN, and SingleOps.",
    ],
    sampleTranscript: [
      {
        speaker: "Caller",
        text: "Hi, I need weekly lawn mowing and edging for my property starting this month.",
      },
      {
        speaker: "AI Agent",
        text: "We’d love to help keep your lawn looking sharp! What is the property address so I can verify our route schedule?",
      },
      {
        speaker: "Caller",
        text: "It's 714 Meadowbrook Drive in Highland Park.",
      },
      {
        speaker: "AI Agent",
        text: "Great news, Highland Park is on our Tuesday route. Is your backyard fenced, and roughly how large is the property?",
      },
      {
        speaker: "Caller",
        text: "Yes, fenced backyard, about a quarter acre lot.",
      },
      {
        speaker: "AI Agent",
        text: "Awesome. Our estimator can swing by tomorrow between 2:00 PM and 4:00 PM to finalize your measurement and leave your custom quote. You don't even need to be home. Should I book that?",
        action: "Queried Route Optimization Matrix",
      },
      {
        speaker: "Caller",
        text: "Yes, that's super convenient.",
      },
      {
        speaker: "AI Agent",
        text: "You're all set! I’ve sent a confirmation text with your estimator's contact information. We look forward to servicing your lawn.",
        action: "Estimate Scheduled in Jobber • Route Updated",
      },
    ],
    workflowStages: [
      {
        step: "01",
        title: "Route & Service Verification",
        description: "Captures customer address and cross-references existing neighborhood routes.",
        systemTarget: "Routing Engine",
      },
      {
        step: "02",
        title: "Scope & Requirement Intake",
        description: "Collects acreage, fence access, dog presence, and service frequency details.",
        systemTarget: "AI Voice Bot",
      },
      {
        step: "03",
        title: "Estimate Slot Booking",
        description: "Books estimator drive-by slot or phone consultation automatically.",
        systemTarget: "Jobber / SingleOps",
      },
      {
        step: "04",
        title: "Confirmation & CRM Sync",
        description: "Updates CRM with full property dimensions and texts homeowner confirmation.",
        systemTarget: "SMS & CRM",
      },
    ],
    systemsConnected: ["Jobber", "SingleOps", "LMN", "Google Maps API", "Twilio"],
  },
  {
    id: "real-estate",
    slug: "real-estate",
    name: "Real Estate Brokerages & Teams",
    shortTitle: "Real Estate",
    badge: "Property & Brokerage Services",
    tagline: "Qualify home buyers, sellers, and tour requests 24/7 without missing a high-value lead.",
    headline: "AI Voice Agents for Real Estate Agents & Brokerages",
    subheadline:
      "Answer yard sign calls, qualify buyer pre-approvals, schedule property showing tours, and instantly route hot seller inquiries directly to top-producing agents.",
    icon: "Building2",
    painPoints: [
      "Yard sign and Zillow/Realtor leads call at odd hours and move to another listing if not answered in 60 seconds.",
      "Agents in showings or closings missing high-value home seller listing inquiries.",
      "Hours spent qualifying unqualified buyers who lack mortgage pre-approval letters.",
      "Weak lead follow-up systems allowing past open house attendees to go cold.",
    ],
    keyWorkflows: [
      "Yard Sign & Listing Information Hotline",
      "Buyer Pre-Approval & Timeline Qualification",
      "Private Property Showing Tour Booking",
      "Home Valuation & Seller Lead Capture",
      "Agent Live Call Routing for High-Value Leads",
    ],
    aiCapabilities: [
      "Recognizes specific MLS listing numbers or street addresses and provides accurate specs and pricing.",
      "Qualifies buyer readiness: pre-approved lender status, target move timeline, and budget.",
      "Coordinates showing appointments against listing agent showing calendar instructions.",
      "Transfers hot seller leads immediately to the designated listing agent's mobile phone.",
      "Syncs conversation transcripts and lead tags into Follow Up Boss, KVCore, or HubSpot.",
    ],
    sampleTranscript: [
      {
        speaker: "Caller",
        text: "Hi, I'm parked in front of 420 Canterbury Court and saw your sign. Can you tell me the asking price and how many bedrooms it has?",
      },
      {
        speaker: "AI Agent",
        text: "Hello! 420 Canterbury Court is a 4-bedroom, 3.5-bath home listed at $749,000 with a newly renovated kitchen and a three-car garage. Are you currently working with a buyer's agent?",
        action: "Queried Active MLS Data",
      },
      {
        speaker: "Caller",
        text: "No, I'm not working with an agent yet. My wife and I love the neighborhood.",
      },
      {
        speaker: "AI Agent",
        text: "It’s a fantastic neighborhood! We have private showing appointments available tomorrow at 4:30 PM or Saturday at 11:00 AM. Would you like to tour the home in person?",
      },
      {
        speaker: "Caller",
        text: "Saturday at 11:00 AM would be perfect for both of us.",
      },
      {
        speaker: "AI Agent",
        text: "You are scheduled for Saturday at 11:00 AM with our lead specialist Sarah. I just texted you the complete property brochure, floor plan, and showing confirmation. What is your best email?",
        action: "Showing Booked in Follow Up Boss • Agent Sarah Notified",
      },
    ],
    workflowStages: [
      {
        step: "01",
        title: "Listing Match & Information",
        description: "Matches property address or MLS ID and delivers accurate home highlights.",
        systemTarget: "MLS / Listing Database",
      },
      {
        step: "02",
        title: "Buyer / Seller Qualification",
        description: "Determines representation status, timeline, budget, and readiness.",
        systemTarget: "AI Voice Bot",
      },
      {
        step: "03",
        title: "Private Tour Scheduling",
        description: "Books showing slot directly into agent calendar with MLS lockbox sync.",
        systemTarget: "ShowingTime / Google Calendar",
      },
      {
        step: "04",
        title: "CRM Pipeline Sync",
        description: "Creates lead with audio transcript, buyer tags, and sends digital brochure via SMS.",
        systemTarget: "Follow Up Boss / KVCore",
      },
    ],
    systemsConnected: ["Follow Up Boss", "KVCore", "ShowingTime", "HubSpot", "Twilio"],
  },
];
