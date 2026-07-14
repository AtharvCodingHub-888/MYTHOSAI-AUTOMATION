import React from "react";
import { 
  PhoneCall, 
  Bot, 
  GitMerge, 
  Globe, 
  LayoutDashboard, 
  Database, 
  Check, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { SERVICES_LIST } from "../constants/copywriting";

// Resolve string representation of icon names to Lucide icon components
const IconResolver = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "PhoneCall":
      return <PhoneCall className={className} />;
    case "Bot":
      return <Bot className={className} />;
    case "GitMerge":
      return <GitMerge className={className} />;
    case "Globe":
      return <Globe className={className} />;
    case "LayoutDashboard":
      return <LayoutDashboard className={className} />;
    case "Database":
      return <Database className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export default function Services() {
  return (
    <section
      id="solutions"
      className="relative bg-matteblack text-white py-28 md:py-36 overflow-hidden"
    >
      {/* Background Gradients and Stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-radial from-gold/8 via-transparent to-transparent blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-radial from-champagne/5 via-transparent to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gold font-mono text-[9px] font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>SOLUTIONS</span>
          </div>
          <h2 className="font-display text-[32px] sm:text-[46px] md:text-[56px] font-extrabold leading-[1.1] tracking-tight text-white max-w-3xl">
            Everything Needed To Build An <br />
            <span className="font-serif italic font-normal text-gold">Intelligent Business.</span>
          </h2>
        </div>

        {/* Services Bento/Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="shine-effect group relative bg-matteblack-light/40 border border-white/5 hover:border-gold/30 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between shadow-2xl hover:shadow-gold/5"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute inset-0 bg-radial from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div>
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold/10 group-hover:border-gold/20 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                    <IconResolver name={service.iconName} className="w-5 h-5 stroke-[1.5px]" />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-neutral-400 tracking-widest uppercase px-2.5 py-1 bg-white/5 border border-white/5 rounded-full">
                    {service.badge}
                  </span>
                </div>

                {/* Title & Slogan */}
                <h3 className="font-display font-extrabold text-[20px] text-white tracking-tight mb-2 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-sans text-[13px] text-neutral-400 font-medium leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <ul className="space-y-3.5 mb-8">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[12.5px] text-neutral-400 font-medium">
                      <div className="w-4 h-4 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3px]" />
                      </div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link */}
              <div className="border-t border-white/5 pt-6 mt-2 flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold text-neutral-500 tracking-widest uppercase">
                  ENTERPRISE CAPABLE
                </span>
                <span className="flex items-center gap-1.5 font-sans font-semibold text-[11px] text-gold group-hover:text-white transition-colors cursor-pointer">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
