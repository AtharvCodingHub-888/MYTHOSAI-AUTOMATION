import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Quote, 
  Cpu, 
  GitMerge, 
  Layers, 
  Zap
} from "lucide-react";
import { SUCCESS_METRICS } from "../constants/copywriting";

// Premium automated counter for metrics inside About
const AnimatedCounter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const target = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    
    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const duration = 2000; // ms
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(timer);
        setDisplayValue(value);
      } else {
        const isDecimal = value.includes(".");
        const currentStr = isDecimal ? start.toFixed(1) : Math.floor(start).toString();
        setDisplayValue(`${currentStr}${suffix}`);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue}</>;
};

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const pillars = [
    {
      icon: Cpu,
      title: "Cognitive Orchestration",
      description: "Directing next-generation large language models to handle reasoning, data extraction, and decision payloads with absolute precision."
    },
    {
      icon: GitMerge,
      title: "Bespoke Product Engineering",
      description: "Crafting robust, lightning-fast full-stack web architectures aligned with beautiful typography, micro-interactions, and visual harmony."
    },
    {
      icon: Layers,
      title: "Autonomous Operations",
      description: "Deploying self-healing workflow pipelines that securely integrate with your CRM, databases, scheduling slots, and notification rails."
    }
  ];

  return (
    <section
      id="about"
      className="relative bg-cream text-matteblack py-28 md:py-36 overflow-hidden border-t border-gold/15"
    >
      {/* PERFECT GRID ALIGNMENT: Cream Architectural Lines & Intersecting Indicators */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft volumetric lighting and glows */}
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-radial from-white/65 via-champagne/10 to-transparent blur-[100px]" style={{ mixBlendMode: "overlay" }} />
        <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-radial from-gold/5 via-transparent to-transparent blur-[120px]" />

        {/* Vertical Alignments */}
        <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-neutral-200/30" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-neutral-200/30" />
        <div className="absolute left-[92%] top-0 bottom-0 w-[1px] bg-neutral-200/30" />

        {/* Horizontal Alignments */}
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-neutral-200/30" />
        <div className="absolute top-[80%] left-0 right-0 h-[1px] bg-neutral-200/30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold font-mono text-[9px] font-bold tracking-widest uppercase mb-6 shadow-md shadow-gold/5">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>INTELLIGENCE ARCHITECTURE</span>
          </div>
          <h2 className="font-sans text-[32px] sm:text-[46px] md:text-[54px] font-light leading-[1.1] tracking-tight text-matteblack max-w-4xl select-none">
            Engineering the Future of <br />
            <span className="font-serif italic font-normal text-gold">Intelligent Business.</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-neutral-600 max-w-xl mt-6 font-medium leading-relaxed">
            Mythos AI designs intelligent digital ecosystems that combine advanced intelligence, 
            workflow automation, premium software engineering, and bespoke user experiences into 
            one cohesive enterprise platform.
          </p>
        </div>

        {/* Dynamic Uptime / Success Metrics Row */}
        <div className="w-full mb-16 md:mb-20 border-t border-b border-[#C8A15A]/25 bg-white/40 backdrop-blur-md py-8 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-lg shadow-matteblack/[0.01]">
          {SUCCESS_METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={`flex flex-col items-center justify-center ${
                idx < 3 ? "border-r border-[#C8A15A]/20" : ""
              } px-4`}
            >
              <span className="font-sans font-black text-[28px] sm:text-[36px] leading-none tracking-tight mb-2 hover:scale-103 transition-transform duration-300">
                <span className="bg-gradient-to-r from-[#8E6B34] via-[#DCC7A5] to-[#B68B3A] bg-clip-text text-transparent">
                  <AnimatedCounter value={metric.value} />
                </span>
              </span>
              <span className="font-mono text-[9px] font-black text-[#8E6B34]/90 tracking-widest uppercase">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Dual Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-stretch">
          
          {/* LEFT PANEL: Editorial Core Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            <div className="relative bg-white/45 backdrop-blur-xl border border-gold/15 rounded-3xl p-8 sm:p-10 shadow-xl shadow-matteblack/[0.01] flex flex-col justify-between hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-radial from-champagne/15 to-transparent blur-[40px] pointer-events-none" />
              
              <div>
                <span className="font-mono text-[9px] font-bold text-gold tracking-widest uppercase block mb-6">
                  OUR STRUCTURAL METRICS
                </span>
                <h3 className="font-sans text-2xl font-light text-matteblack mb-8 leading-snug">
                  Unifying cognitive frameworks into <br />
                  <span className="font-bold">a singular operational model.</span>
                </h3>

                <div className="space-y-6">
                  {pillars.map((pillar, idx) => {
                    const PillarIcon = pillar.icon;
                    return (
                      <div 
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 border border-transparent hover:border-gold/10 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-115 transition-transform duration-300 shrink-0">
                          <PillarIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-[14px] text-matteblack group-hover:text-gold transition-colors duration-300">
                            {pillar.title}
                          </h4>
                          <p className="font-sans text-[13px] text-neutral-500 mt-1 leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Luxurious Facets & Architectural Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* FACET CARD 1: Low-Latency Execution */}
            <div
              onMouseEnter={() => setHoveredCard("latency")}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative bg-white/45 backdrop-blur-xl border border-gold/10 hover:border-gold/30 rounded-3xl p-6.5 hover:-translate-y-1 transition-all duration-500 shadow-lg shadow-matteblack/[0.01] flex flex-col justify-between group overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-radial from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                  <Zap className="w-4 h-4 stroke-[2px]" />
                </div>
                <span className="font-mono text-[9px] font-bold text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
                  ULTRA-LOW LATENCY
                </span>
              </div>

              <div>
                <h3 className="font-sans font-bold text-[15px] text-matteblack mb-1.5 group-hover:text-gold transition-colors duration-300">
                  Sub-14ms Response Times
                </h3>
                <p className="font-sans text-[12.5px] text-neutral-500 font-medium leading-relaxed mb-4">
                  Bypass operational blockages with fast semantic matching, achieving response and decision workflows under 14ms consistently.
                </p>
                <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "94%" }}
                    transition={{ duration: 1.2, delay: 0.1 }}
                    className="h-full bg-gold rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* FACET CARD 2: Bespoke User Experience */}
            <div
              onMouseEnter={() => setHoveredCard("ux")}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative bg-white/45 backdrop-blur-xl border border-gold/10 hover:border-gold/30 rounded-3xl p-6.5 hover:-translate-y-1 transition-all duration-500 shadow-lg shadow-matteblack/[0.01] flex flex-col justify-between group overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-radial from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                  <Layers className="w-4 h-4 stroke-[2px]" />
                </div>
                <span className="font-mono text-[9px] font-bold text-neutral-400 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-full">
                  ELITE INTERACTIVE
                </span>
              </div>

              <div>
                <h3 className="font-sans font-bold text-[15px] text-matteblack mb-1.5 group-hover:text-gold transition-colors duration-300">
                  Bespoke User Interface
                </h3>
                <p className="font-sans text-[12.5px] text-neutral-500 font-medium leading-relaxed">
                  Crafting cinematic, responsive layouts that seamlessly align fluid micro-animations, high-end typography, and modular grid structure.
                </p>
              </div>
            </div>

            {/* Quiet Intelligence Quote Card */}
            <div className="relative bg-white/70 backdrop-blur-md border border-gold/15 rounded-3xl p-6.5 shadow-md shadow-matteblack/[0.01] flex flex-col justify-between overflow-hidden">
              <Quote className="absolute top-4 right-4 w-10 h-10 text-gold/10 stroke-[1.5px] pointer-events-none" />
              <p className="font-sans text-[13px] text-neutral-500 italic font-medium leading-relaxed mb-4">
                "We automate operational friction so your team can focus on pure creation."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center font-display font-black text-[10px] text-gold">
                  M
                </div>
                <div>
                  <p className="font-sans font-bold text-[11px] text-matteblack">Mythos Intelligence Lab</p>
                  <p className="font-mono text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Architects of Autonomy</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
