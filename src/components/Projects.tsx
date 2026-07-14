import React from "react";
import { Sparkles, ArrowUpRight, Heart, Home, BarChart2, MessageSquare, Shield } from "lucide-react";
import { FEATURED_PROJECTS } from "../constants/copywriting";

export default function Projects() {
  // Map specific colors and icons to projects for premium color glazing and high readability
  const projectStyles = [
    {
      glowClass: "shadow-emerald-500/10 border-emerald-500/20 hover:border-emerald-400 group-hover:shadow-emerald-500/20",
      badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      gradientText: "from-emerald-400 via-teal-300 to-green-500",
      icon: <Heart className="w-5 h-5 text-emerald-400 animate-pulse" />,
      accentColor: "#10b981"
    },
    {
      glowClass: "shadow-gold/10 border-gold/20 hover:border-gold group-hover:shadow-gold/25",
      badgeClass: "bg-gold/15 text-gold border-gold/30",
      gradientText: "from-amber-400 via-gold to-yellow-500",
      icon: <Home className="w-5 h-5 text-gold" />,
      accentColor: "#D4AF37"
    },
    {
      glowClass: "shadow-blue-500/10 border-blue-500/20 hover:border-blue-400 group-hover:shadow-blue-500/20",
      badgeClass: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      gradientText: "from-blue-400 via-cyan-300 to-indigo-500",
      icon: <BarChart2 className="w-5 h-5 text-blue-400" />,
      accentColor: "#3b82f6"
    },
    {
      glowClass: "shadow-violet-500/10 border-violet-500/20 hover:border-violet-400 group-hover:shadow-violet-500/20",
      badgeClass: "bg-violet-500/15 text-violet-300 border-violet-500/30",
      gradientText: "from-violet-400 via-fuchsia-300 to-pink-500",
      icon: <MessageSquare className="w-5 h-5 text-violet-400" />,
      accentColor: "#8b5cf6"
    }
  ];

  return (
    <section
      id="projects"
      className="relative bg-matteblack text-white py-28 md:py-36 overflow-hidden border-t border-white/5"
    >
      {/* Background high-contrast dramatic spotlight beams */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-radial from-gold/5 via-transparent to-transparent blur-[160px]" />
        <div className="absolute bottom-[10%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-radial from-violet-500/5 via-transparent to-transparent blur-[160px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gold font-mono text-[9px] font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>SELECTED ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-[32px] sm:text-[46px] md:text-[56px] font-extrabold leading-[1.1] tracking-tight text-white max-w-3xl">
            Bespoke Engineering. <br />
            <span className="font-serif italic font-normal text-gold">Stark Contrast & High Performance.</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[17px] text-neutral-400 max-w-2xl mt-6 font-medium leading-relaxed">
            Explorations in autonomous pipelines and cognitive user interfaces, rendered in rich high-contrast execution environments with custom visual styling.
          </p>
        </div>

        {/* Project Cards Stack - Stark Luxury Black Theme */}
        <div className="space-y-16 md:space-y-24">
          {FEATURED_PROJECTS.map((project, index) => {
            const style = projectStyles[index % projectStyles.length];

            return (
              <div
                key={project.id}
                className={`group relative rounded-3xl p-6 sm:p-12 transition-all duration-500 bg-[#0a0a0d] border hover:bg-[#0f0f14]/90 shadow-2xl flex flex-col lg:flex-row gap-10 items-stretch overflow-hidden ${style.glowClass}`}
              >
                {/* Background color glass glaze overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${style.accentColor} 0%, transparent 80%)`
                  }}
                />

                {/* Left Column: Project Summary info (7 Columns equivalent) */}
                <div className="flex-1 flex flex-col items-start text-left justify-between">
                  <div>
                    {/* Industry Indicator Badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 font-mono text-[9.5px] font-black tracking-widest uppercase px-4 py-2 rounded-full mb-6 border ${style.badgeClass}`}
                    >
                      {style.icon}
                      <span>{project.industry}</span>
                    </span>

                    {/* Project Title */}
                    <h3 className="font-display font-extrabold text-[24px] sm:text-[28px] text-white tracking-tight mb-3 group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Project Summary */}
                    <p className="font-sans text-[15px] sm:text-[16px] text-neutral-400 font-medium leading-relaxed mb-8 max-w-xl">
                      {project.summary}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-8">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg bg-white/5 text-neutral-300 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Case Study Link Action */}
                    <button
                      className="inline-flex items-center gap-1.5 font-sans font-semibold text-[11px] text-gold group-hover:text-white transition-colors border-b border-gold/20 hover:border-white pb-1 cursor-pointer"
                    >
                      <span>LAUNCH SYSTEM SCHEMATIC</span>
                      <ArrowUpRight className="w-4 h-4 text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Key Performance Metrics (5 Columns equivalent) */}
                <div className="w-full lg:w-[320px] flex flex-col justify-center gap-4">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl p-6 flex flex-col items-start justify-center transition-all duration-300 hover:scale-[1.03] bg-white/[0.02] border border-white/5 hover:border-gold/15 shadow-inner"
                    >
                      {/* Enriched metric value font sizing */}
                      <span className="font-display font-extrabold text-[28px] sm:text-[34px] text-gold mb-1 group-hover:scale-105 transition-all duration-300">
                        {metric.value}
                      </span>
                      <span className="font-mono text-[9px] font-extrabold tracking-wider uppercase text-neutral-400">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Decorative Side Glaze Accent Line */}
                <div
                  className="absolute top-0 right-0 w-[6px] h-full transition-all rounded-r-3xl"
                  style={{ backgroundColor: style.accentColor }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
