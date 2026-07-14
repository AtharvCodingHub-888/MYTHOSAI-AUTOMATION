import React, { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Sparkles, MessageSquare, Code, Settings, Share2, Database, Zap } from "lucide-react";

interface NodeItem {
  name: string;
  category: "AI" | "Automation" | "Database" | "Frontend";
  description: string;
  icon: any;
  color: string;
}

const ECOSYSTEM_NODES: NodeItem[] = [
  {
    name: "OpenAI API",
    category: "AI",
    description: "Powers advanced logical reasoning, reasoning tasks, and custom agents.",
    icon: MessageSquare,
    color: "#10a37f",
  },
  {
    name: "Google Gemini",
    category: "AI",
    description: "Handles heavy multimodal understanding, document scanning, and real-time search grounding.",
    icon: Sparkles,
    color: "#38bdf8",
  },
  {
    name: "Vapi",
    category: "AI",
    description: "Powers low-latency, real-time voice streaming pipelines for receptionists.",
    icon: Zap,
    color: "#f59e0b",
  },
  {
    name: "ElevenLabs",
    category: "AI",
    description: "Synthesizes ultra-realistic, natural voice inflections and multilingual speech cloning.",
    icon: Share2,
    color: "#ec4899",
  },
  {
    name: "n8n Automation",
    category: "Automation",
    description: "The pipeline brain connecting databases, forms, calendars, and CRM APIs seamlessly.",
    icon: Settings,
    color: "#f97316",
  },
  {
    name: "Supabase DB",
    category: "Database",
    description: "Secure, real-time cloud data storage, vector search databases, and user auth.",
    icon: Database,
    color: "#22c55e",
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "Bridges the user experience with server-side speed and premium typography.",
    icon: Code,
    color: "#000000",
  },
  {
    name: "Twilio Gateway",
    category: "Automation",
    description: "Handles cellular telecom carrier bridges, routing calls safely to Vapi webhooks.",
    icon: Cpu,
    color: "#ef4444",
  },
];

export default function Ecosystem() {
  const [activeNode, setActiveNode] = useState<NodeItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="ecosystem"
      className="relative bg-cream text-matteblack py-28 md:py-36 overflow-hidden border-y border-gold/10"
    >
      {/* Background Grid & Blurs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-radial from-gold/5 via-transparent to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold font-mono text-[9px] font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>AI ECOSYSTEM</span>
          </div>
          <h2 className="font-sans text-[32px] sm:text-[46px] md:text-[54px] font-light leading-[1.1] tracking-tight text-matteblack max-w-3xl">
            One Connected Architecture. <br />
            <span className="font-serif italic font-normal text-gold">Infinite Possibilities.</span>
          </h2>
          <p className="font-sans text-[15px] text-neutral-500 font-medium max-w-xl mt-4">
            We architect and bundle best-of-class frameworks directly into your operational systems. Hover nodes to inspect triggers.
          </p>
        </div>

        {/* ORBITAL AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* SVG & HTML Interactive Diagram (7 Columns) */}
          <div className="lg:col-span-7 flex items-center justify-center relative w-full aspect-square max-w-[500px] mx-auto">
            
            {/* Orbital Rings - Variable speeds */}
            <div className="absolute w-[86%] h-[86%] rounded-full border border-dashed border-gold/20" style={{ animation: "spin 35s linear infinite" }} />
            <div className="absolute w-[56%] h-[56%] rounded-full border border-dashed border-gold/15" style={{ animation: "spin 18s linear infinite", animationDirection: "reverse" }} />

            {/* SVG Laser Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="laser-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C5A059" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#E8D8B8" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              {ECOSYSTEM_NODES.map((_, idx) => {
                const angle = (idx * 2 * Math.PI) / ECOSYSTEM_NODES.length;
                const radius = 43; // percentage
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                const isHovered = hoveredIndex === idx;

                return (
                  <line
                    key={idx}
                    x1="50%"
                    y1="50%"
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke={isHovered ? "url(#laser-grad)" : "rgba(197, 160, 89, 0.12)"}
                    strokeWidth={isHovered ? "2" : "1"}
                    strokeDasharray={isHovered ? "" : "3 3"}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* CENTER ORB: MYTHOS AI */}
            <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-gold to-champagne shadow-2xl shadow-gold/25 flex flex-col items-center justify-center p-4 border border-white/60 z-20 hover:scale-105 transition-transform duration-500 cursor-default select-none">
              <span className="font-sans font-extrabold text-matteblack text-[16px] tracking-widest text-center leading-none">MYTHOS</span>
              <span className="font-mono text-[9px] text-matteblack/70 font-extrabold tracking-widest mt-1">AI</span>
            </div>

            {/* Orbiting Tech Nodes */}
            {ECOSYSTEM_NODES.map((node, idx) => {
              const angle = (idx * 2 * Math.PI) / ECOSYSTEM_NODES.length;
              const radius = 43; // percentage radius
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              const NodeIcon = node.icon;
              const isHovered = hoveredIndex === idx;

              return (
                <motion.div
                  key={node.name}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    setActiveNode(node);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setActiveNode(null);
                  }}
                  onClick={() => {
                    if (activeNode?.name === node.name) {
                      setHoveredIndex(null);
                      setActiveNode(null);
                    } else {
                      setHoveredIndex(idx);
                      setActiveNode(node);
                    }
                  }}
                  whileHover={{ scale: 1.18 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`absolute w-14 h-14 rounded-full flex items-center justify-center z-10 cursor-pointer shadow-lg select-none transition-colors duration-300 ${
                    isHovered
                      ? "bg-white border-2 text-matteblack shadow-gold/20"
                      : "bg-cream border text-neutral-500 border-gold/25"
                  }`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                    borderColor: isHovered ? node.color : "rgba(197, 160, 89, 0.25)",
                    color: isHovered ? node.color : "inherit",
                  }}
                >
                  <NodeIcon className="w-5.5 h-5.5 stroke-[1.5px]" />
                  
                  {/* Golden particle flash effect on hover */}
                  {isHovered && (
                    <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping pointer-events-none" />
                  )}
                </motion.div>
              );
            })}

          </div>

          {/* TELEMETRY READOUT INFO BOX (5 Columns) */}
          <div className="lg:col-span-5 h-[340px] flex flex-col justify-center">
            <div className="bg-white/60 backdrop-blur-md border border-gold/15 rounded-3xl p-8 shadow-xl shadow-matteblack/[0.01] h-full flex flex-col justify-between">
              
              {activeNode ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <span className="font-mono text-[9px] font-bold text-neutral-400 tracking-widest uppercase block mb-1">
                    ACTIVE DIRECT CONNECTOR:
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md text-white"
                      style={{ backgroundColor: activeNode.color }}
                    >
                      <activeNode.icon className="w-5 h-5 stroke-[2px]" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-lg text-matteblack">{activeNode.name}</h3>
                      <span className="font-mono text-[9px] font-semibold text-gold tracking-widest uppercase bg-gold/10 px-2 py-0.5 rounded-full border border-gold/10">
                        {activeNode.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="font-sans text-[14.5px] text-neutral-600 leading-relaxed font-medium">
                    {activeNode.description}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center my-auto">
                  <div className="w-12 h-12 rounded-2xl bg-gold/5 border border-gold/15 flex items-center justify-center text-gold animate-bounce mb-4">
                    <Cpu className="w-5 h-5 stroke-[1.5px]" />
                  </div>
                  <h3 className="font-sans font-bold text-[15px] text-matteblack mb-2">Inspect Ecosystem Integrations</h3>
                  <p className="font-sans text-[12px] text-neutral-400 font-medium max-w-xs">
                    Hover over any of the outer orbiting tech components to read their implementation parameters in real time.
                  </p>
                </div>
              )}

              {/* Box status bar footer */}
              <div className="border-t border-matteblack/5 pt-4 mt-6 flex items-center justify-between font-mono text-[9px] font-bold text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <span>INTEGRATION: ACTIVE</span>
                </span>
                <span>SECURE DISCOVERY GATEWAY</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
