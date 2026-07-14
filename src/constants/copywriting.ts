import { ServiceItem, ProjectItem, ProcessStep, MetricCard } from "../types";

export const BRAND_NAME = "MYTHOS AI";
export const BRAND_TAGLINE = "Building Intelligent Systems.";
export const BRAND_MISSION =
  "We design AI-powered systems that automate operations, enhance customer experiences, and help businesses scale through intelligent software, voice AI, automation, and premium digital engineering.";

export const HERO_HEADLINE = {
  line1: "Building",
  line2: "Intelligent",
  line3: "Business Systems.",
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "ai-receptionists",
    title: "AI Receptionists",
    description: "Never Miss Another Customer Call.",
    badge: "Voice AI",
    details: [
      "24/7 multilingual calling (30+ languages)",
      "Zero hold time, instantaneous answers",
      "Direct Google Calendar / Cal.com booking",
      "Seamless call transferring & escalation logic",
    ],
    iconName: "PhoneCall",
  },
  {
    id: "ai-agents",
    title: "Custom AI Agents",
    description: "Digital Employees for Modern Businesses.",
    badge: "Core AI",
    details: [
      "Custom RAG (Retrieval-Augmented Generation)",
      "Multi-agent collaborative workflows",
      "Automated lead enrichment & qualification",
      "Intelligent reasoning & decision engines",
    ],
    iconName: "Bot",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "Automate Everything.",
    badge: "n8n / APIs",
    details: [
      "Custom n8n and Make pipeline architecture",
      "CRM sync (HubSpot, Salesforce, Zoho)",
      "Automated document processing & OCR",
      "Slack / WhatsApp team notification loops",
    ],
    iconName: "GitMerge",
  },
  {
    id: "premium-websites",
    title: "Premium Websites",
    description: "Designed to Inspire. Engineered to Perform.",
    badge: "Web Engineering",
    details: [
      "Vite + Next.js optimized loading",
      "Tailwind-crafted luxurious visual pacing",
      "Strict web accessibility (WCAG AA)",
      "SEO-first page performance (Lighthouse 100)",
    ],
    iconName: "Globe",
  },
  {
    id: "dashboards",
    title: "Dashboards & Analytics",
    description: "See Your Business in Real Time.",
    badge: "Intelligence",
    details: [
      "Real-time event logging & live telemetry",
      "Interactive data visualizations with Recharts",
      "Cost/savings projection calculators",
      "Custom executive command portals",
    ],
    iconName: "LayoutDashboard",
  },
  {
    id: "enterprise-integrations",
    title: "Enterprise Integrations",
    description: "One Connected Ecosystem.",
    badge: "Infrastructure",
    details: [
      "Twilio / WhatsApp Business official API Setup",
      "Supabase & PostgreSQL secure database design",
      "Secure OAuth user authentication flows",
      "Edge computing & rate-limited gateway proxying",
    ],
    iconName: "Database",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Discover",
    iconName: "Compass",
    description: "Understand your operational hurdles, core data workflows, customer touchpoints, and long-term automation objectives.",
    duration: "Week 1",
  },
  {
    step: 2,
    title: "Strategize",
    iconName: "Brain",
    description: "Design a comprehensive, secure system architecture mapping out AI agents, prompt protocols, RAG databases, and API integrations.",
    duration: "Week 2",
  },
  {
    step: 3,
    title: "Build",
    iconName: "Code",
    description: "Develop the premium frontend, robust backend logic, and autonomous pipelines using modern, clean, and strictly-typed architectures.",
    duration: "Weeks 3-6",
  },
  {
    step: 4,
    title: "AI Integration",
    iconName: "Cpu",
    description: "Implement custom voice models, advanced LLMs, and webhook automations, fine-tuning memory states and tool-calling triggers.",
    duration: "Weeks 7-8",
  },
  {
    step: 5,
    title: "Deploy",
    iconName: "Rocket",
    description: "Perform thorough cross-device QA, benchmark latency and performance, and launch production-grade systems with 24/7 logging.",
    duration: "Week 9",
  },
  {
    step: 6,
    title: "Optimize",
    iconName: "Activity",
    description: "Continuously refine model temperatures, workflow logic, and prompt schemas through live usage telemetry and conversion tracking.",
    duration: "Ongoing",
  },
];

export const SUCCESS_METRICS: MetricCard[] = [
  {
    value: "24/7",
    label: "AI Operations",
    iconName: "Clock",
  },
  {
    value: "99.9%",
    label: "System Reliability",
    iconName: "Shield",
  },
  {
    value: "65%",
    label: "Cost Reduction",
    iconName: "Percent",
  },
  {
    value: "10x",
    label: "Faster Workflows",
    iconName: "Zap",
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "healthcare-ai",
    title: "Healthcare AI Receptionist",
    summary:
      "Deploying a multilingual voice agent for a multi-location clinic, handling thousands of inbound bookings with zero queue latency and syncing records directly with electronic health registers.",
    industry: "Healthcare & Med-Tech",
    metrics: [
      { label: "Call Capacity Boost", value: "+350%" },
      { label: "Booking Speed", value: "<1s" },
      { label: "Operational Savings", value: "45%" },
    ],
    techStack: ["Vapi", "Gemini Pro", "n8n", "Twilio", "Supabase"],
    imageUrl: "healthcare_mockup",
  },
  {
    id: "luxury-real-estate",
    title: "Premium Real Estate Broker Agent",
    summary:
      "An autonomous customer agent that queries high-end properties via vector search, answers highly complex portfolio questions, and schedules VIP private physical viewings.",
    industry: "Luxury Real Estate",
    metrics: [
      { label: "Average Response Time", value: "12s" },
      { label: "Lead Capture Increase", value: "4.8x" },
      { label: "Customer Satisfaction", value: "98%" },
    ],
    techStack: ["OpenAI API", "Pinecone", "Vite.js", "Resend"],
    imageUrl: "real_estate_mockup",
  },
  {
    id: "supply-chain-dashboard",
    title: "Enterprise Operations Core",
    summary:
      "A real-time executive dashboard for global shipping supply chains, visualizing raw inventory levels, predicting material transit delays, and initiating automated restock purchasing orders.",
    industry: "Logistics & Manufacturing",
    metrics: [
      { label: "Data Pipeline Delay", value: "<50ms" },
      { label: "Automatic Re-orders", value: "100%" },
      { label: "Manual Error Reduction", value: "65%" },
    ],
    techStack: ["React", "D3.js", "PostgreSQL", "FastAPI"],
    imageUrl: "logistics_mockup",
  },
  {
    id: "autonomous-concierge",
    title: "Autonomous Restaurant Concierge",
    summary:
      "Voice and chat AI deployed across phone lines and WhatsApp to automate dinner bookings, capture specific dietary preferences, and process secure remote pre-payments.",
    industry: "Hospitality & Dining",
    metrics: [
      { label: "Hold Times Reduced", value: "100%" },
      { label: "Table Turn Improvement", value: "+80%" },
      { label: "Monthly Bookings Automated", value: "12k+" },
    ],
    techStack: ["ElevenLabs", "Twilio API", "Supabase", "Node.js"],
    imageUrl: "restaurant_mockup",
  },
];
