import React, { useState } from "react";
import { 
  Compass, 
  Brain, 
  Code, 
  Cpu, 
  Rocket, 
  Activity, 
  Sparkles 
} from "lucide-react";
import { PROCESS_STEPS } from "../constants/copywriting";

// Dynamic icon resolver for steps
const StepIconResolver = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Compass":
      return <Compass className={className} />;
    case "Brain":
      return <Brain className={className} />;
    case "Code":
      return <Code className={className} />;
    case "Cpu":
      return <Cpu className={className} />;
    case "Rocket":
      return <Rocket className={className} />;
    case "Activity":
      return <Activity className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export default function Process() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      id="process"
      className="relative bg-cream text-matteblack py-28 md:py-36 overflow-hidden border-t border-gold/10"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-radial from-gold/5 via-transparent to-transparent blur-[80px]" />
        <div className="absolute bottom-[30%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-radial from-champagne/8 via-transparent to-transparent blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold font-mono text-[9px] font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3 h-3 text-gold animate-pulse" />
            <span>OUR WORKFLOW</span>
          </div>
          <h2 className="font-sans text-[32px] sm:text-[46px] md:text-[54px] font-light leading-[1.1] tracking-tight text-matteblack max-w-3xl select-none">
            Every Intelligent System Starts <br />
            With A <span className="font-serif italic font-normal text-gold">Thoughtful Process.</span>
          </h2>
          <p className="font-sans text-[15px] text-neutral-500 font-medium max-w-xl mt-4">
            We don't just write scripts or assemble templates. We engineer durable, end-to-end bespoke AI intelligence structures.
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Subtle connecting layout background wire (Desktop only) */}
          <div className="hidden lg:block absolute top-[28%] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-gold/5 via-gold/20 to-gold/5 z-0" />

          {PROCESS_STEPS.map((step) => {
            const isHovered = hoveredStep === step.step;
            return (
              <div
                key={step.step}
                onMouseEnter={() => setHoveredStep(step.step)}
                onMouseLeave={() => setHoveredStep(null)}
                className="shine-effect group relative bg-white/45 backdrop-blur-xl border border-gold/15 hover:border-gold/35 hover:bg-matteblack-light/95 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 shadow-lg shadow-matteblack/[0.01] hover:shadow-gold/10 z-10 flex flex-col justify-between overflow-hidden cursor-default"
              >
                {/* Glossy light-beam sweep overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                
                {/* Golden ambient hover glow */}
                <div className="absolute inset-0 bg-radial from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div>
                  {/* Step Indicator & Duration */}
                  <div className="relative z-10 flex items-center justify-between mb-8">
                    <span className="font-mono text-4xl font-extrabold text-gold/45 group-hover:text-gold group-hover:scale-105 transition-all duration-500">
                      0{step.step}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-neutral-400 tracking-wider bg-white/60 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/10 px-3 py-1 rounded-full border border-neutral-200/50 transition-colors duration-300">
                      {step.duration}
                    </span>
                  </div>

                  {/* Icon Card Shield */}
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-gold/10 border border-gold/15 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-matteblack group-hover:rotate-6 transition-all duration-500 mb-6 shadow-inner">
                    <StepIconResolver name={step.iconName} className="w-5 h-5 stroke-[1.5px]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="relative z-10 font-sans font-bold text-[18px] text-matteblack tracking-tight mb-3 group-hover:text-champagne transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="relative z-10 font-sans text-[13.5px] text-neutral-500 group-hover:text-neutral-400 font-medium leading-relaxed mb-6 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Completion Metric Footer */}
                <div className="relative z-10 border-t border-neutral-200/50 group-hover:border-white/10 pt-4 flex items-center justify-between transition-colors duration-300">
                  <span className="font-mono text-[8px] font-bold text-neutral-400 tracking-widest uppercase">
                    STAGE STATUS
                  </span>
                  <span className="font-sans font-extrabold text-[10px] text-gold uppercase tracking-wider">
                    {step.step === 6 ? "continuous optimization" : "milestone verified"}
                  </span>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
