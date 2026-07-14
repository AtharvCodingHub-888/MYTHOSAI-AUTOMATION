import React from "react";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-matteblack text-white pt-20 pb-10 border-t border-white/5 overflow-hidden">
      {/* Background soft bottom glow */}
      <div className="absolute bottom-0 inset-x-0 h-[100px] bg-gradient-to-t from-gold/5 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5 items-start">
          
          {/* Logo & Description Column (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div 
              onClick={handleScrollToTop}
              className="flex items-center gap-2.5 cursor-pointer group mb-6"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-gold to-champagne flex items-center justify-center shadow-md shadow-gold/10 overflow-hidden">
                <span className="font-display font-black text-matteblack text-md">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold tracking-widest text-xs text-white group-hover:text-gold transition-colors">
                  MYTHOS AI
                </span>
                <span className="font-mono text-[8px] text-gold tracking-tight leading-none">AUTOMATION</span>
              </div>
            </div>
            
            <p className="font-sans text-[13px] text-neutral-400 font-medium leading-relaxed max-w-sm">
              We design and engineer bespoke enterprise-grade Artificial Intelligence systems that automate operations, enhance customer communication, and accelerate commercial growth.
            </p>
          </div>

          {/* Solutions Column (3 Columns) */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="font-mono text-[9px] font-bold text-gold tracking-widest uppercase mb-5">
              INTELLECT WORKSPACES
            </h4>
            <ul className="space-y-3 font-sans text-xs font-semibold text-neutral-400">
              <li><a href="#solutions" className="hover:text-gold transition-colors">AI Voice Receptionists</a></li>
              <li><a href="#solutions" className="hover:text-gold transition-colors">Custom LLM Agents</a></li>
              <li><a href="#solutions" className="hover:text-gold transition-colors">n8n Workflow Automation</a></li>
              <li><a href="#solutions" className="hover:text-gold transition-colors">Premium Web Architecture</a></li>
              <li><a href="#solutions" className="hover:text-gold transition-colors">Enterprise DB / Supabase</a></li>
            </ul>
          </div>

          {/* Socials & Connectivity Column (2 Columns) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="font-mono text-[9px] font-bold text-gold tracking-widest uppercase mb-5">
              CONNECTIVITY
            </h4>
            <ul className="space-y-3 font-sans text-xs font-semibold text-neutral-400">
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">LinkedIn</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Instagram</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">GitHub Repository</a></li>
              <li><a href="mailto:kingstarx87@gmail.com" className="hover:text-gold transition-colors">Email Dispatch</a></li>
            </ul>
          </div>

          {/* Legal / Scheduling (2 Columns) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="font-mono text-[9px] font-bold text-gold tracking-widest uppercase mb-5">
              RESOURCES
            </h4>
            <ul className="space-y-3 font-sans text-xs font-semibold text-neutral-400">
              <li><a href="#contact" className="hover:text-gold transition-colors">Book Discovery</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Meeting Calendar</a></li>
              <li><span className="hover:text-gold transition-colors cursor-pointer">Privacy Protocol</span></li>
              <li><span className="hover:text-gold transition-colors cursor-pointer">Terms of System</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Section */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] font-bold text-neutral-500">
          <p>© {currentYear} MYTHOS AI AUTOMATION STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <span>VERSION: v1.0 ATLAS</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>MADE WITH PRECISION BY</span>
              <span className="text-gold">MYTHOS LABS</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
