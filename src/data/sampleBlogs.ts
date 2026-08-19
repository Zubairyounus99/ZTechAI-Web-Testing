export interface SamplePost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  status: "PUBLISHED" | "DRAFT" | "SCHEDULED" | "ARCHIVED";
  category: { name: string; slug: string };
  author: { displayName: string; username: string };
  readingTime: number;
  isFeatured: boolean;
  hasToc: boolean;
  keyTakeaways: string[];
  faqData: { question: string; answer: string }[];
  tags: { name: string; slug: string }[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export const sampleCategories = [
  { id: "cat-1", name: "Healthcare & Dental", slug: "healthcare-dental", description: "Front-desk call triage, HIPAA-compliant patient intake, and dental calendar booking." },
  { id: "cat-2", name: "Home Services & Trades", slug: "home-services", description: "Emergency after-hours dispatching, job quoting, and ServiceTitan/Jobber call automation." },
  { id: "cat-3", name: "ROI & Economics", slug: "roi-economics", description: "Operational calculations comparing traditional answering services with sub-second AI voice agents." },
  { id: "cat-4", name: "Integrations & Tech", slug: "integrations-tech", description: "Bi-directional telephony, CRM webhook synchronization, and live calendar locking." },
];

export const sampleTags = [
  { id: "tag-1", name: "dental", slug: "dental" },
  { id: "tag-2", name: "receptionist", slug: "receptionist" },
  { id: "tag-3", name: "hvac", slug: "hvac" },
  { id: "tag-4", name: "emergency-triage", slug: "emergency-triage" },
  { id: "tag-5", name: "appointment-booking", slug: "appointment-booking" },
  { id: "tag-6", name: "roi-calculator", slug: "roi-calculator" },
];

export const samplePosts: SamplePost[] = [
  {
    id: "post-1",
    title: "How Dental Clinics Eliminate Missed Calls and Secure 25+ New Patients Monthly",
    slug: "how-dental-clinics-eliminate-missed-calls",
    excerpt: "Discover how multi-location dental practices deploy 24/7 conversational AI voice receptionists to answer calls on ring 1, triage dental emergencies, and lock confirmed chair appointments.",
    content: `
      <h2>The Hidden Cost of Front-Desk Call Overload</h2>
      <p>In high-volume dental practices, front-desk staff juggle checking in arriving patients, verifying insurance eligibility, and collecting co-pays. During peak morning hours (8:30 AM to 11:30 AM), up to <strong>35% of incoming calls roll over to voicemail</strong>.</p>
      <p>Studies show that over 80% of patients seeking a new dentist will hang up and call the next provider on Google rather than leaving a voicemail message. That represents thousands of dollars in lost lifetime patient value every single week.</p>

      <h2>How 24/7 AI Voice Receptionists Solve the Bottleneck</h2>
      <p>ZTechAI voice agents operate as a high-speed digital front-desk layer that answers every single call on ring 1 with sub-500ms conversational latency.</p>
      <ul>
        <li><strong>Patient Qualification</strong>: Determines whether the caller is an existing patient or new patient, identifies chief complaint (e.g. crown pain, cleaning, whitening), and captures insurance provider details.</li>
        <li><strong>Live Chair Scheduling</strong>: Queries practice management software (Dentrix, Eaglesoft, OpenDental, Curve) in real time to offer available appointment slots and lock bookings.</li>
        <li><strong>Emergency Call Triage</strong>: Immediately recognizes acute dental trauma, severe facial swelling, or severe pain and performs a warm transfer to the on-call doctor.</li>
      </ul>

      <h2>Real-World Operational Results</h2>
      <p>A 3-chair practice in Orlando, FL deployed ZTechAI's Voice Receptionist. Within the first 60 days:</p>
      <ul>
        <li>Missed call rate decreased from 31% to <strong>0%</strong>.</li>
        <li>After-hours bookings generated <strong>28 additional new patient appointments</strong> per month.</li>
        <li>Front-desk team saved 14 hours per week previously spent returning voicemails.</li>
      </ul>
    `,
    featuredImage: "/icon.svg",
    status: "PUBLISHED",
    category: sampleCategories[0],
    author: { displayName: "ZTechAI Clinical Solutions Team", username: "ztechadmin" },
    readingTime: 4,
    isFeatured: true,
    hasToc: true,
    keyTakeaways: [
      "35% of dental inquiries roll to voicemail during peak hours without dedicated voice AI coverage.",
      "80% of new patients hang up when sent to voicemail, costing clinics over $12,000/mo in lost chair time.",
      "ZTechAI answers on ring 1, syncs with PMS calendars in real time, and triages clinical emergencies.",
    ],
    faqData: [
      {
        question: "Does the voice agent integrate with our existing practice management system?",
        answer: "Yes, ZTechAI integrates bi-directionally with Dentrix, Eaglesoft, OpenDental, Curve Dental, and Google Calendar via direct APIs and webhooks.",
      },
      {
        question: "What happens if a caller has a true medical or dental emergency?",
        answer: "The agent identifies acute emergency criteria and immediately initiates an instant warm transfer to your on-call clinician's mobile line.",
      },
    ],
    tags: [sampleTags[0], sampleTags[1], sampleTags[4]],
    publishedAt: "2026-08-15T09:00:00.000Z",
    createdAt: "2026-08-15T08:30:00.000Z",
    updatedAt: "2026-08-15T09:00:00.000Z",
  },
  {
    id: "post-2",
    title: "HVAC & Plumbing Dispatching: Automating After-Hours Emergency Call Triage",
    slug: "hvac-plumbing-after-hours-emergency-dispatching",
    excerpt: "Learn how commercial and residential trade contractors capture urgent water heater leaks, AC outages, and pipe bursts 24/7 without paying $3,000/mo for manual answering services.",
    content: `
      <h2>The Problem with Traditional Answering Services</h2>
      <p>Most HVAC and plumbing contractors rely on third-party overseas call centers for after-hours coverage. These answering services frequently misspell customer addresses, fail to quote diagnostic fees, and wake up on-call technicians for non-emergency routine maintenance calls.</p>

      <h2>Intelligent AI Voice Triage for Trade Contractors</h2>
      <p>ZTechAI custom voice agents are custom-configured with your exact company pricing, service zones, and emergency dispatch rules:</p>
      <ul>
        <li><strong>Zone & Zip Code Verification</strong>: Verifies that the caller is within your active service territory before booking.</li>
        <li><strong>Diagnostic Fee Authorization</strong>: Clearly communicates after-hours emergency diagnostic fees and collects customer consent before dispatch.</li>
        <li><strong>Direct CRM Integration</strong>: Instantly creates new job records in ServiceTitan, Housecall Pro, or Jobber, attaching audio transcripts and customer notes.</li>
      </ul>
    `,
    featuredImage: "/icon.svg",
    status: "PUBLISHED",
    category: sampleCategories[1],
    author: { displayName: "ZTechAI Trades Engineering", username: "ztechadmin" },
    readingTime: 3,
    isFeatured: false,
    hasToc: true,
    keyTakeaways: [
      "Eliminate $2,500-$4,000/mo in answering service fees with 100% accurate AI dispatching.",
      "Automatically collects customer consent for emergency diagnostic fees before waking technicians.",
      "Pushes complete call audio, notes, and customer address directly into ServiceTitan or Jobber.",
    ],
    faqData: [
      {
        question: "Can the AI quote our standard diagnostic fee?",
        answer: "Yes, the agent is configured to state your exact dispatch rate and confirm caller agreement before booking the emergency job.",
      },
    ],
    tags: [sampleTags[2], sampleTags[3], sampleTags[4]],
    publishedAt: "2026-08-16T11:00:00.000Z",
    createdAt: "2026-08-16T10:00:00.000Z",
    updatedAt: "2026-08-16T11:00:00.000Z",
  },
  {
    id: "post-3",
    title: "The Economics of AI Receptionists vs Traditional Staffing in 2026",
    slug: "economics-of-ai-receptionists-vs-traditional-staffing",
    excerpt: "A transparent financial breakdown comparing the total cost of ownership of full-time receptionists, offshore call centers, and custom AI voice automation.",
    content: `
      <h2>Front-Desk Cost Breakdown in 2026</h2>
      <p>Hiring a full-time in-house receptionist in the United States costs an average of <strong>$45,000 to $58,000 per year</strong> once taxes, healthcare benefits, paid time off, and training are included. Despite this investment, a single receptionist can only answer one call at a time and covers only 40 out of 168 hours in a week.</p>

      <h2>Comparison Table: Coverage & ROI</h2>
      <table class="w-full border border-surface-border text-xs">
        <thead>
          <tr class="bg-surface-muted">
            <th class="p-2.5 text-left font-bold">Metric</th>
            <th class="p-2.5 text-left font-bold">In-House Receptionist</th>
            <th class="p-2.5 text-left font-bold">Call Center Agency</th>
            <th class="p-2.5 text-left font-bold">ZTechAI Voice Agent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-2.5 border-t border-surface-border font-bold">Weekly Coverage</td>
            <td class="p-2.5 border-t border-surface-border">40 Hours</td>
            <td class="p-2.5 border-t border-surface-border">168 Hours</td>
            <td class="p-2.5 border-t border-surface-border text-brand-500 font-bold">168 Hours (24/7/365)</td>
          </tr>
          <tr>
            <td class="p-2.5 border-t border-surface-border font-bold">Concurrent Calls</td>
            <td class="p-2.5 border-t border-surface-border">1 Line</td>
            <td class="p-2.5 border-t border-surface-border">Limited / Queued</td>
            <td class="p-2.5 border-t border-surface-border text-brand-500 font-bold">Unlimited Simultaneous</td>
          </tr>
          <tr>
            <td class="p-2.5 border-t border-surface-border font-bold">Annual Cost</td>
            <td class="p-2.5 border-t border-surface-border">$45,000 - $60,000+</td>
            <td class="p-2.5 border-t border-surface-border">$24,000 - $36,000</td>
            <td class="p-2.5 border-t border-surface-border text-emerald-500 font-bold">Fraction of Staffing Cost</td>
          </tr>
        </tbody>
      </table>
    `,
    featuredImage: "/icon.svg",
    status: "PUBLISHED",
    category: sampleCategories[2],
    author: { displayName: "ZTechAI Strategy Team", username: "ztechadmin" },
    readingTime: 3,
    isFeatured: false,
    hasToc: true,
    keyTakeaways: [
      "In-house receptionists cover only 24% of the hours in a week and handle only 1 call at a time.",
      "ZTechAI handles unlimited simultaneous calls 24/7 with zero hold times and zero overtime payroll.",
    ],
    faqData: [],
    tags: [sampleTags[1], sampleTags[5]],
    publishedAt: "2026-08-17T14:00:00.000Z",
    createdAt: "2026-08-17T13:00:00.000Z",
    updatedAt: "2026-08-17T14:00:00.000Z",
  },
];
