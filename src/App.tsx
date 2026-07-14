import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Monitor, Smartphone, Sparkles, Check, Laptop } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MetricsBar from "./components/MetricsBar";
import About from "./components/About";
import Services from "./components/Services";
import Ecosystem from "./components/Ecosystem";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [currentView, setCurrentView] = useState<"marketing" | "dashboard">("marketing");
  const [activeSection, setActiveSection] = useState<string>("home");
  const [showStartupPage, setShowStartupPage] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [rememberChoice, setRememberChoice] = useState<boolean>(true);
  const [hasDismissedBefore, setHasDismissedBefore] = useState<boolean>(false);

  const simulateDesktop = () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute("content", "width=1280, initial-scale=0.35, maximum-scale=2.0, user-scalable=yes");
    }
    
    // Add an elegant little top bar indicating simulator is active
    if (!document.getElementById("desktop-simulation-banner")) {
      const banner = document.createElement("div");
      banner.id = "desktop-simulation-banner";
      banner.className = "fixed top-0 inset-x-0 bg-[#E6BE6C] text-black text-[10px] font-mono font-bold tracking-[0.22em] text-center py-2 z-[99999] shadow-md flex items-center justify-center gap-2";
      banner.innerHTML = `
        <span>DESKTOP VIEWPORT SIMULATOR ACTIVE (1280PX)</span>
        <button id="reset-desktop-sim-btn" class="underline ml-4 cursor-pointer font-black hover:text-white transition-colors">RESET</button>
      `;
      document.body.appendChild(banner);

      const resetBtn = document.getElementById("reset-desktop-sim-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          const vp = document.querySelector('meta[name="viewport"]');
          if (vp) {
            vp.setAttribute("content", "width=device-width, initial-scale=1.0");
          }
          const b = document.getElementById("desktop-simulation-banner");
          if (b) b.remove();
        });
      }
    }
  };

  // Load state and check preferences
  useEffect(() => {
    const dismissedUntil = localStorage.getItem("mythos-dismissed-until");
    const desktopSimPreferred = localStorage.getItem("mythos-desktop-sim-preferred");
    
    if (desktopSimPreferred === "true") {
      simulateDesktop();
    }

    if (dismissedUntil && Date.now() < Number(dismissedUntil)) {
      setHasDismissedBefore(true);
    }
  }, []);

  // Progress loader timer
  useEffect(() => {
    if (!showStartupPage) return;

    const isFastLoad = hasDismissedBefore;
    const stepTime = isFastLoad ? 20 : 45;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 14) + 6;
        return Math.min(prev + increment, 100);
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [showStartupPage, hasDismissedBefore]);

  // Handle auto-advance for desktop users or remembered choice
  useEffect(() => {
    if (progress === 100) {
      const isMobileOrTablet = window.innerWidth < 1280;
      if (!isMobileOrTablet) {
        const timer = setTimeout(() => {
          setShowStartupPage(false);
        }, 500);
        return () => clearTimeout(timer);
      } else if (hasDismissedBefore) {
        const preferredMode = localStorage.getItem("mythos-desktop-sim-preferred");
        if (preferredMode === "desktop") {
          simulateDesktop();
        }
        const timer = setTimeout(() => {
          setShowStartupPage(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [progress, hasDismissedBefore]);

  const handleEnterWebsite = (mode: "mobile" | "desktop") => {
    if (rememberChoice) {
      localStorage.setItem("mythos-dismissed-until", String(Date.now() + 30 * 24 * 60 * 60 * 1000));
      localStorage.setItem("mythos-desktop-sim-preferred", mode === "desktop" ? "true" : "false");
    }
    if (mode === "desktop") {
      simulateDesktop();
    }
    setShowStartupPage(false);
  };

  // Dynamically highlight active section on scroll
  useEffect(() => {
    if (currentView !== "marketing") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = ["home", "solutions", "projects", "ecosystem", "process", "contact"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentView]);

  const handleBookCall = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewChange = (view: "marketing" | "dashboard") => {
    setCurrentView(view);
    // Smooth transition reset to top when switching views
    window.scrollTo({ top: 0, behavior: "instant" as any });
  };

  return (
    <div className="bg-cream min-h-screen text-matteblack antialiased">
      {/* Universal Floating Luxury Navbar */}
      <Navbar
        currentView={currentView}
        onViewChange={handleViewChange}
        activeSection={activeSection}
      />

      {currentView === "marketing" ? (
        <div className="animate-in fade-in duration-700">
          {/* Main Cinematic Landing Page */}
          <Hero 
            onEnterOS={() => handleViewChange("dashboard")}
            onBookCall={handleBookCall}
          />
          <MetricsBar />
          <About />
          <Services />
          <Ecosystem />
          <Projects />
          <Process />
          <Contact />
          <Footer />
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-700">
          {/* Deep Dark Matte Black AI OS Command Center */}
          <Dashboard />
        </div>
      )}

      {/* Premium Luxury "My Thoughts" Startup Loading Page */}
      <AnimatePresence>
        {showStartupPage && (
          <motion.div
            key="startup-loading-page"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100000] flex flex-col items-center justify-between p-6 sm:p-12 overflow-y-auto select-none"
            style={{
              background: "linear-gradient(135deg, #FFFDF9 0%, #FAF6EB 50%, #F1EAE0 100%)",
            }}
          >
            {/* Elegant light background rays/glows */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#C8A15A]/5 filter blur-[100px] pointer-events-none" />

            {/* Top decorative element */}
            <div className="text-[10px] font-mono tracking-[0.3em] text-[#C99744] font-bold uppercase mt-4">
              SYSTEM INITIALIZATION
            </div>

            {/* Main Brand Logo & Title Centerpiece */}
            <div className="flex flex-col items-center gap-6 my-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#8F6523] via-[#C99744] to-[#F7E2B8] flex items-center justify-center shadow-xl shadow-[#C99744]/10 border border-[#F7E2B8]/40"
              >
                <span className="font-sans font-black text-neutral-900 text-[36px]">M</span>
                {/* Light reflection effect */}
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] animate-pulse" style={{ animationDuration: '3s' }} />
              </motion.div>

              <div className="text-center space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 900 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-[0.04em] uppercase drop-shadow-sm"
                >
                  Mythos AI
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-[11px] font-mono tracking-[0.4em] text-[#A8751D] font-bold uppercase"
                >
                  Automation
                </motion.p>
              </div>

              {/* Progress Bar & Loader */}
              <div className="flex flex-col items-center gap-3 w-64 mt-6">
                <div className="w-full h-[3px] bg-neutral-200/60 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8F6523] via-[#C99744] to-[#F7E2B8]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <div className="text-[10px] font-mono tracking-[0.2em] text-[#A8751D] font-bold uppercase">
                  {progress < 100 ? `LOADING CORE DATA [ ${progress}% ]` : "PORTAL SYSTEM READY"}
                </div>
              </div>

              {/* Desktop Mode Notification options on mobile/tablet */}
              <AnimatePresence>
                {progress === 100 && (window.innerWidth < 1280 && !hasDismissedBefore) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-6 flex flex-col items-center gap-5 w-full max-w-sm px-4"
                  >
                    <div className="text-center">
                      <p className="text-[11px] font-mono tracking-widest text-[#A8751D] uppercase font-bold mb-1">
                        Better Experience Available
                      </p>
                      <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mx-auto">
                        We recommend entering in Desktop Mode. Standard mobile is supported, but desktop simulator offers complete premium visuals.
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2.5 w-full">
                      <button
                        onClick={() => handleEnterWebsite("desktop")}
                        className="w-full flex items-center justify-center gap-2 font-mono font-bold text-xs tracking-wider uppercase py-4 rounded-xl shadow-lg shadow-gold/10 bg-gradient-to-r from-[#C8A15A] via-[#E6BE6C] to-[#C8A15A] text-neutral-950 cursor-pointer hover:shadow-xl hover:shadow-[#C8A15A]/25 transition-all duration-300 active:scale-[0.98]"
                      >
                        <Monitor className="w-4 h-4 stroke-[2px]" />
                        <span>Switch to Desktop Mode</span>
                      </button>

                      <button
                        onClick={() => handleEnterWebsite("mobile")}
                        className="w-full flex items-center justify-center gap-2 font-sans font-bold text-xs tracking-widest uppercase py-4 rounded-xl border border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 cursor-pointer transition-all duration-300 active:scale-[0.98]"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Continue on Mobile</span>
                      </button>
                    </div>

                    {/* Remember choice */}
                    <div 
                      onClick={() => setRememberChoice(!rememberChoice)}
                      className="flex items-center gap-2.5 cursor-pointer select-none group mt-1"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        rememberChoice 
                          ? "bg-[#C8A15A] border-[#C8A15A] text-white shadow-sm" 
                          : "border-neutral-300 bg-white group-hover:border-[#C8A15A]"
                      }`}>
                        {rememberChoice && <Check className="w-3 h-3 stroke-[3px]" />}
                      </div>
                      <span className="text-[10px] font-sans font-semibold text-neutral-500 group-hover:text-neutral-800 transition-colors">
                        Remember choice for 30 days
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Simple Enter Button for desktop or repeat visitors (who already dismissed warning) */}
              <AnimatePresence>
                {progress === 100 && (window.innerWidth >= 1280 || hasDismissedBefore) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8"
                  >
                    <button
                      onClick={() => handleEnterWebsite(localStorage.getItem("mythos-desktop-sim-preferred") === "true" ? "desktop" : "mobile")}
                      className="px-10 py-4 font-mono font-bold text-xs tracking-widest uppercase rounded-full shadow-lg shadow-gold/10 bg-gradient-to-r from-[#C8A15A] via-[#E6BE6C] to-[#C8A15A] text-neutral-950 hover:shadow-[#C8A15A]/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      ENTER PORTAL
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Brand Slogan */}
            <div className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 font-medium pb-2">
              © 2026 MYTHOS AUTOMATION LABS. ALL RIGHTS RESERVED.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
