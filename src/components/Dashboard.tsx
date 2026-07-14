import React, { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  Workflow, 
  Phone, 
  Database, 
  BarChart, 
  Folder, 
  Settings, 
  LayoutDashboard, 
  Search, 
  Bell, 
  Terminal, 
  Cpu, 
  Play, 
  Square, 
  Volume2, 
  Check, 
  X, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  Globe
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartBar,
  Bar
} from "recharts";

// Analytics Sample Data
const CALLS_DATA = [
  { time: "09:00", calls: 140, automations: 92 },
  { time: "10:00", calls: 210, automations: 165 },
  { time: "11:00", calls: 320, automations: 280 },
  { time: "12:00", calls: 280, automations: 240 },
  { time: "13:00", calls: 410, automations: 390 },
  { time: "14:00", calls: 520, automations: 485 },
  { time: "15:00", calls: 480, automations: 430 },
  { time: "16:00", calls: 610, automations: 590 },
  { time: "17:00", calls: 590, automations: 560 },
];

const COST_SAVINGS_DATA = [
  { month: "Jan", cost: 12000, savings: 28000 },
  { month: "Feb", cost: 9500, savings: 32000 },
  { month: "Mar", cost: 8400, savings: 38000 },
  { month: "Apr", cost: 6200, savings: 45000 },
  { month: "May", cost: 5100, savings: 52000 },
  { month: "Jun", cost: 4200, savings: 64000 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "research" | "voice" | "automation" | "analytics" | "projects">("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([
    "System Boot Completed",
    "Aether AI core online - 99.98% Health",
    "Call routed successfully to Vapi voice server",
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // AI Core Interactive states
  const [corePulses, setCorePulses] = useState<number>(0);
  const [cpuUsage, setCpuUsage] = useState(4.2);
  const [activeTokens, setActiveTokens] = useState(128);

  // Voice Console transcript simulation states
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceStep, setVoiceStep] = useState(0);
  const [transcripts, setTranscripts] = useState<{ sender: "mythos" | "customer"; text: string; time: string }[]>([
    { sender: "mythos", text: "Connecting to active voice stream...", time: "12:44:02" }
  ]);

  // AI Prompt testing playground state
  const [playgroundModel, setPlaygroundModel] = useState("gemini-2.5-flash");
  const [temperature, setTemperature] = useState(0.7);
  const [playgroundPrompt, setPlaygroundPrompt] = useState("");
  const [playgroundResponses, setPlaygroundResponses] = useState<{ role: "user" | "mythos"; text: string }[]>([
    { role: "mythos", text: "Hello! I am the MYTHOS system engine. Ask me anything about prompt schemas, n8n webhook nodes, voice latency tuning, or dashboard statistics." }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Dynamic values simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const delta = (Math.random() - 0.5) * 1.5;
        const newVal = Math.max(2.1, Math.min(18.5, prev + delta));
        return parseFloat(newVal.toFixed(1));
      });
      setActiveTokens(prev => {
        const delta = Math.floor((Math.random() - 0.5) * 20);
        return Math.max(42, Math.min(240, prev + delta));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Voice Transcript Streaming Simulation
  const simulatedDialog = [
    { sender: "mythos", text: "Welcome to Prime Dental Clinic. I am Mythos, your virtual receptionist. How can I help you book or reschedule today?" },
    { sender: "customer", text: "Hi, yes! I'd like to book a routing cleaning and checkup sometime this Wednesday morning if you have openings." },
    { sender: "mythos", text: "Let me check Wednesday morning availability. I see slots open at 9:00 AM, 10:30 AM, and 11:15 AM. Which works best for you?" },
    { sender: "customer", text: "Let's do 10:30 AM. That fits my schedule perfectly." },
    { sender: "mythos", text: "Perfect. 10:30 AM is reserved. Could you please state your first name and email to lock this slot in?" },
    { sender: "customer", text: "Sure, my name is Alex and my email is alex@gmail.com." },
    { sender: "mythos", text: "Thank you, Alex. I have logged your appointment for cleaning on Wednesday at 10:30 AM. A calendar invite has been dispatched to alex@gmail.com." },
  ];

  const toggleVoiceStream = () => {
    if (voiceActive) {
      setVoiceActive(false);
      setVoiceStep(0);
      setTranscripts([{ sender: "mythos", text: "Voice session terminated.", time: new Date().toLocaleTimeString() }]);
    } else {
      setVoiceActive(true);
      setVoiceStep(0);
      setTranscripts([{ sender: "mythos", text: "Initializing ultra-low latency voice bridge...", time: new Date().toLocaleTimeString() }]);
    }
  };

  useEffect(() => {
    if (!voiceActive) return;
    if (voiceStep >= simulatedDialog.length) {
      setVoiceActive(false);
      return;
    }

    const timer = setTimeout(() => {
      setTranscripts(prev => [
        ...prev,
        {
          sender: simulatedDialog[voiceStep].sender as "mythos" | "customer",
          text: simulatedDialog[voiceStep].text,
          time: new Date().toLocaleTimeString(),
        }
      ]);
      setVoiceStep(prev => prev + 1);
    }, 3200);

    return () => clearTimeout(timer);
  }, [voiceActive, voiceStep]);

  // AI prompt tester action
  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playgroundPrompt.trim() || isAiLoading) return;

    const userText = playgroundPrompt;
    setPlaygroundResponses(prev => [...prev, { role: "user", text: userText }]);
    setPlaygroundPrompt("");
    setIsAiLoading(true);

    // Simulate luxury AI response
    setTimeout(() => {
      let aiText = "I have catalogued your prompt request. This operation is compiled successfully under the standard Mythos schema.";
      const lower = userText.toLowerCase();

      if (lower.includes("voice") || lower.includes("latency") || lower.includes("receptionist")) {
        aiText = "### Mythos Voice AI Architecture\nWe achieve <150ms conversational latency through a pipelined WebSocket structure: \n1. **Twilio Telecom**: Bridges carrier lines straight to our Vapi Gateway.\n2. **Audio Streaming**: Decodes raw PCM audio packets to transcode into a live Groq transcription model.\n3. **Gemini Prompt Routing**: Checks the conversational context and returns streaming tool-calling parameters within 50ms.\n4. **ElevenLabs TTS**: Converts response tokens immediately back into high-fidelity emotional audio packets. All states are monitored 24/7 on this console.";
      } else if (lower.includes("n8n") || lower.includes("workflow") || lower.includes("automation")) {
        aiText = "### Workflow Pipeline Specs\nYour automations utilize standard modular trigger webhooks:\n* **Triggers**: CRM updates (HubSpot API), form fills, or incoming voice calls.\n* **Operations**: AI text qualification, PDF parsing via OCR models, and vector data logging.\n* **Destination nodes**: Supabase DB insertions, WhatsApp push messaging, and calendar locks. This system guarantees 100% execution accuracy under peak loads.";
      } else if (lower.includes("cost") || lower.includes("price") || lower.includes("save")) {
        aiText = "### Operational Savings Summary\nBased on active system telemetry, implementing Mythos AI receptionists reduces typical client staffing overhead by **65%**. Standard pricing ranges from $2,500/mo for scaling startups up to custom enterprise architectures, yielding a return on investment within the first 30 days of implementation.";
      } else {
        aiText = `### MYTHOS OS compiled response for: "${userText}"\nYour request has been parsed successfully using ${playgroundModel} at temperature ${temperature}. Our system is fully configured to handle complex autonomous pipelines. To wire this live trigger to your CRM or phone system, schedule a consultation in the Contact panel.`;
      }

      setPlaygroundResponses(prev => [...prev, { role: "mythos", text: aiText }]);
      setIsAiLoading(false);
    }, 1800);
  };

  return (
    <section className="relative min-h-screen bg-matteblack text-white flex flex-col justify-between overflow-hidden font-sans">
      {/* Dynamic Grid Overlay & ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-radial from-gold/4 via-transparent to-transparent blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-radial from-champagne/4 via-transparent to-transparent blur-[120px]" />
      </div>

      {/* DASHBOARD LAYOUT */}
      <div className="relative z-10 flex flex-1 pt-24 min-h-[calc(100vh-80px)]">
        
        {/* SIDEBAR NAVIGATION (Collapsible) */}
        <aside 
          className={`bg-matteblack-light/75 border-r border-white/5 backdrop-blur-xl transition-all duration-500 flex flex-col justify-between ${
            sidebarCollapsed ? "w-[80px]" : "w-[260px]"
          } hidden md:flex`}
        >
          <div className="p-4 flex flex-col gap-8">
            {/* Collapse indicator button */}
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <span className="font-mono text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
                  OPERATING PORTAL
                </span>
              )}
              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-gold" />
              </button>
            </div>

            {/* Sidebar nav items */}
            <nav className="flex flex-col gap-1.5">
              {[
                { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
                { id: "research", label: "AI Research Lab", icon: Bot },
                { id: "voice", label: "Voice Console", icon: Phone },
                { id: "automation", label: "Workflow Canvas", icon: Workflow },
                { id: "analytics", label: "System Analytics", icon: BarChart },
                { id: "projects", label: "Client Workspace", icon: Folder },
              ].map((item) => {
                const isActive = activeTab === item.id;
                const IconComp = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`flex items-center gap-3.5 p-3 rounded-xl transition-all duration-300 font-sans font-semibold text-xs tracking-wide cursor-pointer ${
                      isActive
                        ? "bg-gold text-matteblack shadow-lg shadow-gold/10"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <IconComp className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Status Footer */}
          {!sidebarCollapsed && (
            <div className="p-5 border-t border-white/5 bg-matteblack-card/40 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-neutral-500">AI AGENT CORE</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 font-mono text-[8px] font-bold">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                  <span>ONLINE</span>
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1">
                <div className="bg-gold h-1 rounded-full w-[99.98%]" />
              </div>
            </div>
          )}
        </aside>

        {/* CORE WORKSPACE CONTENT AREA */}
        <main className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto max-w-[1400px] mx-auto w-full">
          
          {/* TOP BREADCRUMB & NOTIFICATION PANEL */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center text-gold">
                <Cpu className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="font-display font-extrabold text-[15px] tracking-tight uppercase">
                  Mythos Operating Portal
                </h2>
                <span className="font-mono text-[10px] text-neutral-400">
                  Aether Core • Workspace L1_Live
                </span>
              </div>
            </div>

            {/* Notification and status */}
            <div className="flex items-center justify-end gap-3.5">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold" />
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-matteblack-light border border-white/10 rounded-2xl p-4 shadow-2xl z-30 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-200">
                    <h4 className="font-mono text-[9px] font-bold text-gold tracking-widest uppercase pb-2 border-b border-white/5">
                      LIVE SYSTEM LOGS
                    </h4>
                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto font-mono text-[9px] text-neutral-300">
                      {notifications.map((notif, idx) => (
                        <div key={idx} className="p-2 bg-white/5 rounded-lg flex gap-2">
                          <span className="text-gold">●</span>
                          <span>{notif}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* API and Health badges */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="font-mono text-[9px] text-neutral-300 font-bold">HEALTH: 99.98%</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC VIEW SWITCHER */}
          
          {/* 1. EXECUTIVE OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Bento Row 1: Interactive Core & Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Executive centerpiece Orb Neural sphere (7 Columns) */}
                <div className="lg:col-span-7 bg-matteblack-light/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden h-[460px]">
                  {/* Background radial highlight */}
                  <div className="absolute inset-0 bg-radial from-gold/10 via-transparent to-transparent opacity-40 pointer-events-none" />

                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <h3 className="font-display font-extrabold text-[16px] text-white">Neural Intelligence Core</h3>
                      <p className="font-sans text-[11px] text-neutral-400">Interact with the core model sphere to trigger particle emissions.</p>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-gold px-2 py-0.5 rounded-full border border-gold/10 bg-gold/10">
                      SYS_ORION_V1
                    </span>
                  </div>

                  {/* Centered animated core sphere */}
                  <div className="flex items-center justify-center my-auto relative z-10">
                    <button
                      onClick={() => {
                        setCorePulses(prev => prev + 1);
                        setCpuUsage(prev => Math.min(65, prev + 12));
                        setNotifications(prev => ["AI Core pulse registered", ...prev]);
                      }}
                      className="relative w-44 h-44 rounded-full bg-radial from-gold/15 to-matteblack border-2 border-gold/30 hover:border-gold shadow-2xl hover:shadow-gold/25 transition-all duration-500 flex items-center justify-center group cursor-pointer"
                    >
                      <div className="absolute inset-2 border border-dashed border-gold/20 rounded-full animate-spin-slow" />
                      <div className="absolute inset-6 border border-dashed border-gold/15 rounded-full animate-orbit-slow" style={{ animationDirection: "reverse" }} />
                      
                      {/* Innermost gold neural orb */}
                      <div className="w-16 h-16 rounded-full bg-gold/80 flex items-center justify-center text-matteblack shadow-lg shadow-gold/20 animate-pulse">
                        <Sparkles className="w-6 h-6 animate-spin-slow" />
                      </div>
                      
                      {/* Pulse scale rings */}
                      {corePulses > 0 && (
                        <span key={corePulses} className="absolute inset-0 border border-gold rounded-full animate-ping opacity-75" />
                      )}
                    </button>
                  </div>

                  {/* Telemetry bottom stats row */}
                  <div className="grid grid-cols-4 gap-4 border-t border-white/5 pt-5 relative z-10">
                    <div className="text-center">
                      <span className="font-mono text-[9px] text-neutral-400 uppercase block">CPU STABLE</span>
                      <span className="font-display font-black text-sm text-gold">{cpuUsage}%</span>
                    </div>
                    <div className="text-center border-l border-white/5">
                      <span className="font-mono text-[9px] text-neutral-400 uppercase block">ACTIVE TOKENS</span>
                      <span className="font-display font-black text-sm text-gold">{activeTokens}/s</span>
                    </div>
                    <div className="text-center border-l border-white/5">
                      <span className="font-mono text-[9px] text-neutral-400 uppercase block">LATENCY</span>
                      <span className="font-display font-black text-sm text-gold">42ms</span>
                    </div>
                    <div className="text-center border-l border-white/5">
                      <span className="font-mono text-[9px] text-neutral-400 uppercase block">CONNECTIONS</span>
                      <span className="font-display font-black text-sm text-gold">148 nodes</span>
                    </div>
                  </div>
                </div>

                {/* KPI Sidebar checklist widget (5 Columns) */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                  {/* KPI card 1 */}
                  <div className="bg-matteblack-light/40 border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-gold/25 transition-all">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-neutral-400 tracking-wider block mb-1">TOTAL VOICE CALLS TODAY</span>
                      <h4 className="font-display font-extrabold text-2xl text-white">18,392</h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center text-gold">
                      <Phone className="w-5 h-5 stroke-[1.5px]" />
                    </div>
                  </div>
                  {/* KPI card 2 */}
                  <div className="bg-matteblack-light/40 border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-gold/25 transition-all">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-neutral-400 tracking-wider block mb-1">ACTIVE RUNNING AUTOMATIONS</span>
                      <h4 className="font-display font-extrabold text-2xl text-white">148 pipelines</h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center text-gold">
                      <Workflow className="w-5 h-5 stroke-[1.5px]" />
                    </div>
                  </div>
                  {/* KPI card 3 */}
                  <div className="bg-matteblack-light/40 border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-gold/25 transition-all">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-neutral-400 tracking-wider block mb-1">TOTAL DATA CHANNELS SAVED</span>
                      <h4 className="font-display font-extrabold text-2xl text-white">65% cost delta</h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center text-gold">
                      <Database className="w-5 h-5 stroke-[1.5px]" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Real-time system analytics charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-matteblack-light/40 border border-white/5 rounded-3xl p-6 shadow-xl">
                  <h3 className="font-display font-extrabold text-sm text-white mb-6">Inbound Call Routing vs Automation</h3>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={CALLS_DATA}>
                        <defs>
                          <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#555563" fontSize={10} />
                        <YAxis stroke="#555563" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: "#131316", borderColor: "#333" }} />
                        <Area type="monotone" dataKey="calls" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorCalls)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-matteblack-light/40 border border-white/5 rounded-3xl p-6 shadow-xl">
                  <h3 className="font-display font-extrabold text-sm text-white mb-6">Financial Cumulative Savings</h3>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartBar data={COST_SAVINGS_DATA}>
                        <XAxis dataKey="month" stroke="#555563" fontSize={10} />
                        <YAxis stroke="#555563" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: "#131316", borderColor: "#333" }} />
                        <Bar dataKey="savings" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                      </RechartBar>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. AI RESEARCH LAB (PROMPT TESTER) */}
          {activeTab === "research" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-in fade-in duration-500">
              
              {/* Left Parameters Box (4 Columns) */}
              <div className="lg:col-span-4 bg-matteblack-light/40 border border-white/5 rounded-3xl p-6 flex flex-col gap-6">
                <div>
                  <h3 className="font-display font-extrabold text-[15px] text-white">Model Parameters</h3>
                  <p className="font-sans text-[11px] text-neutral-400">Configure prompt schemas for the live playground test.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-wider">SELECT ENGINE</label>
                  <select 
                    value={playgroundModel}
                    onChange={(e) => setPlaygroundModel(e.target.value)}
                    className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3 font-sans text-xs text-neutral-200 outline-none cursor-pointer focus:border-gold/50"
                  >
                    <option value="gemini-2.5-flash" className="bg-matteblack text-white">Gemini 2.5 Flash (low latency)</option>
                    <option value="gemini-2.5-pro" className="bg-matteblack text-white">Gemini 2.5 Pro (complex logic)</option>
                    <option value="gpt-4o" className="bg-matteblack text-white">GPT-4o (enterprise agents)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center font-mono text-[9px] font-bold text-neutral-400">
                    <span>TEMPERATURE</span>
                    <span className="text-gold">{temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-gold bg-white/5 h-1.5 rounded-full outline-none cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[8px] text-neutral-500">
                    <span>PRECISE</span>
                    <span>CREATIVE</span>
                  </div>
                </div>

                <div className="h-px bg-white/5 my-2" />

                {/* Preset tips helper box */}
                <div className="bg-gold/5 border border-gold/15 rounded-2xl p-4 space-y-2">
                  <span className="font-mono text-[9px] font-bold text-gold tracking-widest uppercase block">PROMPT RECIPES</span>
                  <p className="font-sans text-[10.5px] text-neutral-400 leading-relaxed font-medium">
                    Try typing: <br />
                    • <span className="text-gold italic font-bold">"Explain voice ai latency"</span> <br />
                    • <span className="text-gold italic font-bold">"What works with n8n?"</span> <br />
                    • <span className="text-gold italic font-bold">"How much can I save?"</span>
                  </p>
                </div>
              </div>

              {/* Chat Play area (8 Columns) */}
              <div className="lg:col-span-8 bg-matteblack-light/40 border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-[520px] shadow-xl">
                {/* Chat window viewport */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
                  {playgroundResponses.map((res, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[85%] ${
                        res.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                      }`}
                    >
                      <span className="font-mono text-[8px] text-neutral-500 font-bold uppercase mb-1">
                        {res.role === "user" ? "DEVELOPER DISPATCH" : "MYTHOS COMPILER"}
                      </span>
                      <div
                        className={`p-4 rounded-2xl text-xs font-sans font-medium leading-relaxed ${
                          res.role === "user"
                            ? "bg-gold text-matteblack rounded-tr-none font-semibold"
                            : "bg-white/5 text-neutral-200 border border-white/5 rounded-tl-none whitespace-pre-line"
                        }`}
                      >
                        {res.text}
                      </div>
                    </div>
                  ))}

                  {isAiLoading && (
                    <div className="flex flex-col items-start max-w-[85%]">
                      <span className="font-mono text-[8px] text-neutral-500 font-bold uppercase mb-1">MYTHOS THINKING</span>
                      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0s" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0.4s" }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Prompt field */}
                <form onSubmit={handleSendPrompt} className="flex gap-2.5 items-center">
                  <input
                    type="text"
                    value={playgroundPrompt}
                    onChange={(e) => setPlaygroundPrompt(e.target.value)}
                    placeholder="Enter prompt instruction to execute on the neural core..."
                    className="flex-1 h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-sans font-medium outline-none focus:border-gold/50"
                  />
                  <button
                    type="submit"
                    className="h-12 px-6 rounded-xl bg-gold hover:bg-champagne text-matteblack font-sans font-extrabold text-xs tracking-wider transition-all cursor-pointer shadow-lg shadow-gold/10"
                  >
                    SEND
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* 3. VOICE CONSOLE */}
          {activeTab === "voice" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-in fade-in duration-500">
              
              {/* Waveform visual control panel (5 Columns) */}
              <div className="lg:col-span-5 bg-matteblack-light/40 border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-[480px]">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Phone className="w-4 h-4 text-gold" />
                    <h3 className="font-display font-extrabold text-[15px] text-white">Live Voice Console</h3>
                  </div>
                  <p className="font-sans text-[11px] text-neutral-400">Stream physical call transcriptions straight to active database cells.</p>
                </div>

                {/* Active Dynamic Waveform */}
                <div className="flex flex-col items-center justify-center my-auto">
                  <div className="flex items-center gap-1.5 h-20 mb-8">
                    {[6, 12, 18, 24, 16, 28, 36, 12, 16, 44, 52, 28, 14, 20, 36, 12, 6].map((h, idx) => (
                      <span
                        key={idx}
                        className={`w-1.5 rounded-full bg-gold ${voiceActive ? "animate-pulse" : "opacity-30"}`}
                        style={{
                          height: voiceActive ? `${h}px` : "4px",
                          transition: "height 0.2s ease-in-out",
                          animationDelay: `${idx * 0.08}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Play stream trigger */}
                  <button
                    onClick={toggleVoiceStream}
                    className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-mono font-bold tracking-wider shadow-lg transition-all cursor-pointer ${
                      voiceActive
                        ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/10"
                        : "bg-gold hover:bg-champagne text-matteblack shadow-gold/10"
                    }`}
                  >
                    {voiceActive ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>TERMINATE STREAM</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>STREAM DEMO VOICE CALL</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Telemetry metadata status */}
                <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-5 font-mono text-[9px] text-neutral-400">
                  <div className="text-center">
                    <span>AUDIO STATUS</span>
                    <span className="block text-gold font-bold uppercase mt-1">{voiceActive ? "ACTIVE" : "IDLE"}</span>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <span>CODEC RATE</span>
                    <span className="block text-gold font-bold mt-1">G.711 / WebRTC</span>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <span>AVG LATENCY</span>
                    <span className="block text-gold font-bold mt-1">112ms</span>
                  </div>
                </div>
              </div>

              {/* Streaming Transcripts Log Viewport (7 Columns) */}
              <div className="lg:col-span-7 bg-matteblack-light/40 border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-[480px]">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <span className="font-mono text-[10px] font-bold text-neutral-400">CALL ID: RECP_L89201_LIVE</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gold/10 border border-gold/20 rounded-full text-gold font-mono text-[8px] font-bold">
                    <span>CONFIDENCE: 98.4%</span>
                  </span>
                </div>

                {/* Dialogue Viewport scroll */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                  {transcripts.map((t, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${
                        t.sender === "customer" ? "items-end" : "items-start"
                      } animate-in fade-in duration-300`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[8px] text-neutral-500 font-bold uppercase">
                          {t.sender === "customer" ? "CUSTOMER" : "MYTHOS VOICE"}
                        </span>
                        <span className="font-mono text-[8px] text-neutral-500">{t.time}</span>
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl text-xs font-sans font-medium leading-relaxed ${
                          t.sender === "customer"
                            ? "bg-white/5 border border-white/5 text-white rounded-tr-none"
                            : "bg-gold/10 border border-gold/10 text-gold rounded-tl-none"
                        }`}
                      >
                        {t.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Box footer detail indicator */}
                <div className="border-t border-white/5 pt-4 mt-4 flex justify-between font-mono text-[8px] text-neutral-500">
                  <span>SPEECH LANGUAGE: EN-US DETECTED</span>
                  <span>RECORDING ACTIVE • TELECOM COMPLIANT</span>
                </div>
              </div>

            </div>
          )}

          {/* 4. WORKFLOW PIPELINE CANVAS */}
          {activeTab === "automation" && (
            <div className="bg-matteblack-light/40 border border-white/5 rounded-3xl p-6 shadow-xl h-[520px] flex flex-col justify-between animate-in fade-in duration-500">
              
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Workflow className="w-4 h-4 text-gold" />
                    <h3 className="font-display font-extrabold text-[15px] text-white">Workflow Automation Canvas</h3>
                  </div>
                  <span className="font-mono text-[9px] font-bold text-neutral-400">n8n Bespoke Engine</span>
                </div>
                <p className="font-sans text-[11px] text-neutral-400">Visual mapping of continuous triggers executing operations on our Supabase cluster.</p>
              </div>

              {/* Graphical Representation Grid */}
              <div className="relative border border-white/5 bg-matteblack/60 rounded-2xl h-[340px] flex items-center justify-center overflow-hidden my-auto p-4">
                {/* Connector Laser Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="12%" y1="50%" x2="35%" y2="50%" stroke="#D4AF37" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
                  <line x1="35%" y1="50%" x2="65%" y2="30%" stroke="#D4AF37" strokeWidth="1" />
                  <line x1="35%" y1="50%" x2="65%" y2="70%" stroke="#D4AF37" strokeWidth="1" />
                  <line x1="65%" y1="30%" x2="88%" y2="50%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="65%" y1="70%" x2="88%" y2="50%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
                </svg>

                {/* Node 1: Customer Lead Trigger */}
                <div className="absolute left-[5%] top-[50%] -translate-y-1/2 bg-matteblack-light border border-white/10 p-3 rounded-xl flex flex-col items-center gap-1.5 text-center shadow-lg z-10 w-[95px] sm:w-[110px] hover:border-gold/30 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center text-gold font-mono text-xs font-bold">IN</div>
                  <span className="font-display font-extrabold text-[9px] text-white uppercase tracking-wider">Lead Inbound</span>
                  <span className="font-sans text-[7.5px] text-neutral-400">Forms / Phone</span>
                </div>

                {/* Node 2: Core Mythos AI Webhook Router */}
                <div className="absolute left-[30%] top-[50%] -translate-y-1/2 bg-matteblack-light border-2 border-gold/30 p-3.5 rounded-xl flex flex-col items-center gap-1.5 text-center shadow-2xl z-10 w-[105px] sm:w-[125px] hover:border-gold transition-all duration-300">
                  <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center text-matteblack"><Sparkles className="w-5 h-5 animate-spin-slow" /></div>
                  <span className="font-display font-black text-[9.5px] text-gold uppercase tracking-widest">Mythos Agent</span>
                  <span className="font-sans text-[7.5px] text-neutral-400">Prompt Router</span>
                </div>

                {/* Node 3A: CRM Sync (Top Right) */}
                <div className="absolute right-[25%] top-[20%] bg-matteblack-light border border-white/10 p-3 rounded-xl flex flex-col items-center gap-1.5 text-center shadow-lg z-10 w-[95px] sm:w-[110px] hover:border-gold/30 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300"><Database className="w-4 h-4" /></div>
                  <span className="font-display font-extrabold text-[9px] text-white uppercase tracking-wider">HubSpot CRM</span>
                  <span className="font-sans text-[7.5px] text-neutral-400">Record updated</span>
                </div>

                {/* Node 3B: Dispatch WhatsApp Alert (Bottom Right) */}
                <div className="absolute right-[25%] bottom-[15%] bg-matteblack-light border border-white/10 p-3 rounded-xl flex flex-col items-center gap-1.5 text-center shadow-lg z-10 w-[95px] sm:w-[110px] hover:border-gold/30 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300"><Phone className="w-4 h-4" /></div>
                  <span className="font-display font-extrabold text-[9px] text-white uppercase tracking-wider">WhatsApp API</span>
                  <span className="font-sans text-[7.5px] text-neutral-400">Lead Alert Sent</span>
                </div>

                {/* Node 4: Client Executive Dashboard */}
                <div className="absolute right-[3%] top-[50%] -translate-y-1/2 bg-matteblack-light border border-white/10 p-3 rounded-xl flex flex-col items-center gap-1.5 text-center shadow-lg z-10 w-[95px] sm:w-[110px] hover:border-gold/30 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center text-gold"><LayoutDashboard className="w-4 h-4" /></div>
                  <span className="font-display font-extrabold text-[9px] text-white uppercase tracking-wider">Aether OS</span>
                  <span className="font-sans text-[7.5px] text-neutral-400">KPI Telemetry</span>
                </div>
              </div>

              {/* Status bar footer detail */}
              <div className="border-t border-white/5 pt-4 flex items-center justify-between font-mono text-[9px] text-neutral-500">
                <span>EXECUTION RATE: 100% SUCCESFUL</span>
                <span>TOTAL DAILY RUNS: 1,480 PIPELINES</span>
              </div>

            </div>
          )}

          {/* 5. SYSTEM ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "DAILY ACTIVE AGENTS", value: "12", sub: "+3 active" },
                  { title: "AVERAGE RESPONSE SPEED", value: "42ms", sub: "L1 edge optimized" },
                  { title: "TOTAL AUTOMATIONS", value: "182,342", sub: "pipelines executed" },
                  { title: "RELIABILITY INDEX", value: "99.98%", sub: "carrier backed SLA" },
                ].map((stat) => (
                  <div key={stat.title} className="bg-matteblack-light/40 border border-white/5 rounded-2xl p-6">
                    <span className="font-mono text-[9px] font-bold text-neutral-400 tracking-wider block mb-1">{stat.title}</span>
                    <h4 className="font-display font-extrabold text-2xl text-gold mb-1">{stat.value}</h4>
                    <span className="font-mono text-[8px] text-neutral-500">{stat.sub}</span>
                  </div>
                ))}
              </div>

              {/* Detail historical analysis graphs */}
              <div className="bg-matteblack-light/40 border border-white/5 rounded-3xl p-8 shadow-xl">
                <h3 className="font-display font-extrabold text-sm text-white mb-6">Historical Resource Optimization</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CALLS_DATA}>
                      <XAxis dataKey="time" stroke="#555563" fontSize={10} />
                      <YAxis stroke="#555563" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: "#131316", borderColor: "#333" }} />
                      <Area type="monotone" dataKey="automations" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* 6. CLIENT PROJECTS WORKSPACE */}
          {activeTab === "projects" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-[16px] text-white">Client Deployments</h3>
                  <p className="font-sans text-[11px] text-neutral-400">Track milestones and direct server deployment states.</p>
                </div>
                <span className="font-mono text-[9px] font-bold text-gold px-2 py-0.5 rounded-full border border-gold/10 bg-gold/10">
                  3 ACTIVE SERVERS
                </span>
              </div>

              {/* Milestones and project cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Sigma6 AI Receptionist", status: "Running", progress: "100%", build: "Success" },
                  { name: "Dental AI Patient Assistant", status: "Development", progress: "75%", build: "Active" },
                  { name: "ELEARN ML Student Agent", status: "Production Ready", progress: "100%", build: "Success" },
                ].map((proj) => (
                  <div key={proj.name} className="bg-matteblack-light/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-[200px] hover:border-gold/25 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[9px] font-semibold text-neutral-400 px-2 py-0.5 bg-white/5 rounded border border-white/5">
                          {proj.status}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      </div>
                      <h4 className="font-display font-extrabold text-[15px] text-white tracking-tight mb-2">
                        {proj.name}
                      </h4>
                    </div>

                    <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-mono text-[8px] text-neutral-500">PIPELINE MILESTONE</span>
                        <span className="font-display font-black text-xs text-gold">{proj.progress} verified</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="font-mono text-[8px] text-neutral-500">BUILD RESULT</span>
                        <span className="font-display font-black text-xs text-green-400">{proj.build}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* DASHBOARD SYSTEM PORTAL SUB-FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-matteblack-light/45 py-4 px-10 text-center font-mono text-[9px] font-bold text-neutral-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>© {new Date().getFullYear()} MYTHOS AI OPERATING SYSTEM. ACCESS RESTRICTED.</span>
        <div className="flex items-center gap-4">
          <span>CODENAME: PROJECT ORION</span>
          <span>•</span>
          <span className="text-gold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
            <span>AI ENGINE SYNCHRONIZED</span>
          </span>
        </div>
      </footer>
    </section>
  );
}
