import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Cpu, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  currentView: "marketing" | "dashboard";
  onViewChange: (view: "marketing" | "dashboard") => void;
  activeSection?: string;
}

export default function Navbar({ currentView, onViewChange, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Solutions", href: "#solutions" },
    { label: "Projects", href: "#projects" },
    { label: "Ecosystem", href: "#ecosystem" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isMarketing = currentView === "marketing";

  // Ultra-premium frosted glass layout - with soft blur and complete transparency
  const headerBg = isMarketing
    ? ""
    : scrolled
      ? "backdrop-blur-[32px] shadow-2xl"
      : "backdrop-blur-[32px] shadow-lg";

  const logoTextColor = "text-white";

  return (
    <header
      className={`fixed top-[16px] sm:top-[26px] left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full flex items-center ${headerBg} ${
        isMarketing 
          ? "w-[calc(100%-16px)] xs:w-[calc(100%-24px)] md:w-[calc(100%-48px)] xl:w-[min(1380px,92%)] h-[60px] sm:h-[72px] lg:h-[78px]" 
          : "w-[calc(100%-32px)] md:w-[calc(100%-64px)] h-[60px] sm:h-[72px]"
      }`}
      style={{
        maxWidth: "1380px",
        background: scrolled 
          ? "rgba(255, 255, 255, 0.01)" 
          : "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(32px)",
        border: "none",
        boxShadow: scrolled 
          ? "0 25px 80px rgba(0, 0, 0, 0.25)" 
          : "0 18px 60px rgba(0, 0, 0, 0.12)"
      }}
    >
      <div className="w-full px-3 sm:px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleScrollTo("home")}
          className="flex items-center gap-2.5 sm:gap-4 cursor-pointer group animate-fade-in transition-all duration-300"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#8F6523] via-[#C99744] to-[#F7E2B8] flex items-center justify-center shadow-lg shadow-[#C99744]/15 overflow-hidden border border-[#F7E2B8]/30 group-hover:shadow-[#C99744]/30 group-hover:scale-105 transition-all duration-300 shrink-0">
            <span className="font-sans font-black text-[#1B1B1B] text-[18px] sm:text-[21px] select-none">M</span>
            <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span 
              style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800 }}
              className="tracking-[0.12em] text-[10px] xs:text-[12px] sm:text-[14px] lg:text-[15px] transition-all duration-300 text-[#F7E2B8] drop-shadow-[0_0_8px_rgba(247,226,184,0.45)] group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(247,226,184,0.85)]"
            >
              MYTHOS AI
            </span>
            <span 
              style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}
              className="text-[6px] xs:text-[7px] sm:text-[8px] text-[#C99744] tracking-[0.22em] uppercase leading-none drop-shadow-[0_0_5px_rgba(201,151,68,0.3)] group-hover:text-[#F7E2B8] transition-colors duration-300"
            >
              AUTOMATION
            </span>
          </div>
        </div>

        {/* Desktop Menu - Hide when in Dashboard view (on desktop) */}
        {isMarketing && (
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
            {menuItems.map((item) => {
              const elementId = item.href.substring(1);
              const isActive = activeSection === elementId;
              return (
                <button
                  key={item.label}
                  onClick={() => handleScrollTo(elementId)}
                  className="group/nav relative font-medium transition-all duration-400 py-1.5 cursor-pointer text-[15px]"
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    color: isActive ? "#E6BE6C" : "rgba(255,255,255,0.78)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#FFF";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.78)";
                  }}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#E6BE6C] rounded-full transition-all duration-400 ease-out ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover/nav:w-full group-hover/nav:opacity-100"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        )}

        {/* OS Toggle and CTA */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 shrink-0">
          {/* OS Switcher Button (Elegant Dark Champagne Glass design matching Hero) */}
          <button
            onClick={() => onViewChange(currentView === "marketing" ? "dashboard" : "marketing")}
            className={`group relative flex items-center gap-1 sm:gap-2 lg:gap-3.5 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 rounded-full border text-[8px] sm:text-[10px] lg:text-[12px] font-mono font-bold tracking-[0.08em] sm:tracking-[0.1em] lg:tracking-[0.18em] transition-all duration-400 overflow-hidden cursor-pointer shrink-0 ${
              isMarketing
                ? "bg-gradient-to-tr from-[#1A1105] via-[#120B03] to-[#24180A] border-[#C8A15A]/45 text-[#E6BE6C] shadow-[0_4px_20px_rgba(0,0,0,0.35),_inset_0_1px_1px_rgba(255,255,255,0.08)] hover:border-[#F7E6B0] hover:text-white hover:shadow-[0_0_25px_rgba(224,188,119,0.45)] hover:scale-105"
                : "border-[#C8A15A]/40 text-[#DCC7A5] hover:border-[#C8A15A] hover:bg-[#C8A15A] hover:text-[#1C1C1C]"
            }`}
          >
            {/* Glossy light sweep overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
              <div className="light-sweep opacity-70 group-hover:opacity-100" style={{ animation: "sweep 2.5s infinite ease-in-out" }} />
            </div>
            
            {currentView === "marketing" ? (
              <>
                <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-[#E6BE6C] group-hover:text-white transition-colors duration-300" />
                <span className="relative z-10">LAUNCH OS</span>
              </>
            ) : (
              <>
                <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-[#C8A15A] animate-spin-slow" />
                <span className="relative z-10">EXIT OS</span>
              </>
            )}
          </button>

          {/* Book Call CTA (Desktop AND Mobile, responsive labels matching Hero) */}
          <button
            onClick={() => handleScrollTo("contact")}
            className={`flex items-center gap-1 sm:gap-1.5 font-sans font-bold text-[8px] sm:text-[9px] lg:text-[11px] tracking-wider lg:tracking-widest uppercase px-3 sm:px-4 lg:px-5.5 py-1.5 sm:py-2 lg:py-2.5 rounded-full transition-all duration-400 cursor-pointer shrink-0 ${
              isMarketing
                ? "bg-[#111110] border border-[#C8A15A]/25 hover:border-[#C8A15A]/60 text-[#C8A15A] hover:text-white shadow-[0_8px_25px_rgba(28,28,28,0.2),_0_0_15px_rgba(200,161,90,0.12)] hover:shadow-[0_12px_32px_rgba(197,160,89,0.22)]"
                : "bg-gradient-to-r from-[#C8A15A] to-[#DCC7A5] hover:from-[#DCC7A5] hover:to-[#C8A15A] text-[#1C1C1C] shadow-lg shadow-gold/15 hover:shadow-gold/25"
            }`}
          >
            <span className="hidden md:inline-block">Book Discovery Call</span>
            <span className="hidden sm:inline-block md:hidden">Book Call</span>
            <span className="inline-block sm:hidden text-[8px]">Book</span>
            <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 stroke-[2.5px] text-[#C8A15A]" />
          </button>

          {/* Mobile & Tablet Hamburger Menu Trigger */}
          {isMarketing && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden flex items-center justify-center p-2 sm:p-2.5 rounded-full border transition-all duration-300 cursor-pointer shrink-0 ${
                mobileMenuOpen 
                  ? "bg-[#C8A15A] border-[#C8A15A] text-white" 
                  : "border-white/15 hover:border-[#C8A15A]/40 text-white/90"
              }`}
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile & Tablet Full Screen Backdrop & Premium Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && isMarketing && (
          <>
            {/* Fullscreen Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[40] bg-neutral-950/50 backdrop-blur-[16px] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Premium Navigation Drawer Container */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.5)",
              }}
              className="absolute top-[92px] left-4 right-4 p-8 rounded-[32px] lg:hidden flex flex-col gap-6 bg-[#FAF8F5]/96 backdrop-blur-3xl border border-white/40 z-[50] pointer-events-auto text-left"
            >
              {/* Header Label inside Menu */}
              <div className="flex items-center justify-between border-b border-[#C8A15A]/15 pb-4">
                <span className="font-sans font-black text-neutral-800 text-[11px] tracking-[0.25em] uppercase">
                  SYSTEM DIRECTORY
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#A8751D] font-bold uppercase">
                  MYTHOS AI
                </span>
              </div>

              {/* Touch-Friendly Menu Link Actions (>= 48px target heights) */}
              <div className="flex flex-col gap-1.5">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleScrollTo(item.href.substring(1))}
                      className={`w-full text-left font-sans text-[15px] font-bold tracking-wide py-3 px-5 rounded-2xl transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isActive 
                          ? "bg-[#C8A15A]/10 text-[#A8751D] border-l-4 border-[#C8A15A]" 
                          : "text-neutral-700 hover:text-[#A8751D] hover:bg-black/5"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#C8A15A]" />}
                    </button>
                  );
                })}
              </div>

              <div className="h-px bg-[#C8A15A]/15 my-1" />

              {/* Bottom Quick CTAs inside Menu drawer */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onViewChange(currentView === "marketing" ? "dashboard" : "marketing");
                  }}
                  className="w-full flex items-center justify-center gap-2.5 font-mono font-bold tracking-[0.15em] text-xs uppercase py-4 rounded-xl bg-neutral-950 hover:bg-black text-[#F7E2B8] shadow-md border border-white/10 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <Terminal className="w-4 h-4 text-[#C8A15A]" />
                  <span>LAUNCH OS PORTAL</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleScrollTo("contact");
                  }}
                  className="w-full flex items-center justify-center gap-2 font-sans font-bold tracking-widest text-xs uppercase py-4 rounded-xl shadow-lg bg-gradient-to-r from-[#C8A15A] via-[#E6BE6C] to-[#C8A15A] text-neutral-950 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <span>Book Discovery Call</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5px]" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
