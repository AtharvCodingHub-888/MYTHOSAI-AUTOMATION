import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Bot, Cpu, GitMerge, PhoneCall } from "lucide-react";
import { BRAND_MISSION, SUCCESS_METRICS } from "../constants/copywriting";

const TECH_LOGOS: Record<string, React.ReactNode> = {
  OpenAI: (
    <svg className="w-[18px] h-[18px] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5-2.5-.5-5.5 2-7s5.5-.5 7 2" />
      <path d="M8 9C8 5.5 11 3 14.5 3S21 5.5 21 9" />
      <path d="M16 9c2 1.5 3 4.5 1.5 7s-4.5 3-7 1.5" />
      <path d="M16 15c1.5 2.5.5 5.5-2 7s-5.5.5-7-2" />
      <path d="M16 15c0 3.5-3 6-6.5 6S3 18.5 3 15" />
      <path d="M8 15c-2-1.5-3-4.5-1.5-7s4.5-3 7-1.5" />
    </svg>
  ),
  Gemini: (
    <svg className="w-[18px] h-[18px] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c.4 4 3.6 7.2 7.6 7.6-4 .4-7.2 3.6-7.6 7.6-.4-4-3.6-7.2-7.6-7.6 4-.4 7.2-3.6 7.6-7.6z" />
    </svg>
  ),
  Vapi: (
    <svg className="w-[18px] h-[18px] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),
  ElevenLabs: (
    <svg className="w-[18px] h-[18px] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="4" y1="9" y2="15" />
      <line x1="9" x2="9" y1="6" y2="18" />
      <line x1="14" x2="14" y1="4" y2="20" />
      <line x1="19" x2="19" y1="8" y2="16" />
    </svg>
  ),
  Supabase: (
    <svg className="w-[16px] h-[18px] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.4 2l-9.6 11.4c-.4.5-.1 1.2.5 1.2h7.7l-1.4 7.4c-.1.6.6 1 .1 1l9.6-11.4c.4-.5.1-1.2-.5-1.2h-7.7l1.4-7.4c.1-.6-.6-1-.1-1z" />
    </svg>
  )
};

interface HeroProps {
  onEnterOS: () => void;
  onBookCall: () => void;
}

// Ultra-premium automated counter for luxury metrics with custom bronze numbering
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

export default function Hero({ onEnterOS, onBookCall }: HeroProps) {
  // Track window width for real-time fluid scaling of the AI Core Globe centerpiece
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1440);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth >= 1280;
  const isTablet = windowWidth >= 768 && windowWidth < 1280;
  const isMobile = windowWidth < 768;

  const globeScale = isDesktop ? 1.08 : isTablet ? 1.08 * 0.85 : 1.08 * 0.72;

  // Parallax values utilizing Framer Motion's high-performance spring dynamics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 45, stiffness: 150, mass: 0.7 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - clientX) / window.innerWidth - 0.5;
    const y = (e.clientY - clientY) / window.innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // State to simulate real-time telemetry changes in the floating luxury panels
  const [activeNode, setActiveNode] = useState(0);
  const [pingRate, setPingRate] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
      setPingRate(Math.floor(Math.random() * 4) + 11); // 11-14ms
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen noise-bg bg-black text-white flex flex-col justify-between pt-36 pb-12 overflow-x-clip"
      style={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "clip",
      }}
    >
      <style>{`
        .hero-backdrop {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: url("https://res.cloudinary.com/yrsp7xdr/image/upload/v1784014872/6db04586-4f20-40d4-9d95-dbab5864faea_a64dae.png");
          background-size: cover;
          background-repeat: no-repeat;
          background-position: 72% center; /* Mobile default */
          pointer-events: none;
          user-select: none;
          opacity: 0.58;
          filter: contrast(0.88) brightness(0.88) saturate(0.88);
        }
        @media (min-width: 768px) {
          .hero-backdrop {
            background-position: 66% center; /* Tablet */
          }
        }
        @media (min-width: 1024px) {
          .hero-backdrop {
            background-position: 60% center; /* Laptop */
          }
        }
        @media (min-width: 1440px) {
          .hero-backdrop {
            background-position: 56% center; /* Large Monitor */
          }
        }
        @media (min-width: 1920px) {
          .hero-backdrop {
            background-position: center center; /* Desktop */
          }
        }
        
        @keyframes sweep {
          0% {
            transform: translateX(-150%) skewX(-12deg);
          }
          50% {
            transform: translateX(150%) skewX(-12deg);
          }
          100% {
            transform: translateX(150%) skewX(-12deg);
          }
        }
        
        @keyframes marqueeSlow {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marqueeSlow 20s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-80px) translateX(30px) scale(0.8);
            opacity: 0;
          }
        }
        .animate-float-particle {
          animation: floatParticle linear infinite;
        }
        
        .floating-card {
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center center;
        }
        
        /* Mobile floating card positions - Positioned beautifully around the core, with safety bounds */
        .card-automation {
          left: -4px;
          top: 64%;
          transform: scale(0.72) !important;
        }
        .card-dispatcher {
          right: -4px;
          top: -10px;
          transform: scale(0.72) !important;
        }
        .card-cognitive {
          right: -4px;
          bottom: -15px;
          transform: scale(0.72) !important;
        }

        /* Tablet floating card positions - Safe positive bounds within container */
        @media (min-width: 768px) {
          .card-automation {
            left: 4%;
            top: 62%;
            transform: scale(0.85) !important;
          }
          .card-dispatcher {
            right: 8%;
            top: 10%;
            transform: scale(0.85) !important;
          }
          .card-cognitive {
            right: 6%;
            bottom: 4%;
            transform: scale(0.85) !important;
          }
        }

        /* Desktop floating card positions - Safe positive bounds within container */
        @media (min-width: 1280px) {
          .card-automation {
            left: 1%;
            top: 62%;
            transform: scale(0.95) !important;
          }
          .card-dispatcher {
            right: 4%;
            top: 15%;
            transform: scale(0.95) !important;
          }
          .card-cognitive {
            right: 2%;
            bottom: 6%;
            transform: scale(0.95) !important;
          }
        }
      `}</style>

      {/* 1. Cinematic Architectural Background & Multi-Plane Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        
        {/* Layer 1: Handcrafted Cinematic Backdrop with responsive coverage & positioning */}
        <div className="hero-backdrop" />

        {/* High-intensity golden-champagne backlighting elements to make the Hero section extremely glowy */}
        {/* Large left-side gold champagne glow */}
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(224,188,119,0.18)_0%,rgba(197,160,89,0.05)_40%,transparent_70%)] filter blur-[95px] opacity-90 z-1 pointer-events-none" />
        {/* Massive right-side gold champagne glow */}
        <div className="absolute top-[25%] right-[10%] w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full bg-[radial-gradient(circle,rgba(230,191,112,0.22)_0%,rgba(164,106,36,0.06)_50%,transparent_70%)] filter blur-[110px] opacity-95 z-1 pointer-events-none animate-pulse-slow" />
        {/* Center subtle warm golden dawn highlight */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(247,226,184,0.15)_0%,transparent_75%)] filter blur-[90px] z-1 pointer-events-none" />

        {/* Fine luxury film grain overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.012] mix-blend-overlay z-2" />

        {/* Grid lines to align visual architecture */}
        <div className="absolute top-[28%] left-0 right-0 h-[1px] bg-[#C8A15A]/15 z-2" />
        <div className="absolute top-[72%] left-0 right-0 h-[1px] bg-[#C8A15A]/15 z-2" />
        <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-[#C8A15A]/12 z-2" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-[#C8A15A]/12 z-2" />
        <div className="absolute left-[92%] top-0 bottom-0 w-[1px] bg-[#C8A15A]/12 z-2" />

        {/* Grid intersect plus marks */}
        <div className="absolute top-[28%] left-[8%] -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] text-[#C8A15A]/35 font-semibold z-2">+</div>
        <div className="absolute top-[28%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] text-[#C8A15A]/35 font-semibold z-2">+</div>
        <div className="absolute top-[28%] left-[92%] -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] text-[#C8A15A]/35 font-semibold z-2">+</div>
        <div className="absolute top-[72%] left-[8%] -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] text-[#C8A15A]/35 font-semibold z-2">+</div>
        <div className="absolute top-[72%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] text-[#C8A15A]/35 font-semibold z-2">+</div>
        <div className="absolute top-[72%] left-[92%] -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] text-[#C8A15A]/35 font-semibold z-2">+</div>

        {/* Microscopic dust particles illuminated by sunlight */}
        <div className="absolute top-[20%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#C8A15A]/25 blur-[0.5px] animate-float z-2" style={{ animationDuration: "11s", animationDelay: "0s" }} />
        <div className="absolute top-[45%] left-[30%] w-2 h-2 rounded-full bg-[#DCC7A5]/40 blur-[1px] animate-float z-2" style={{ animationDuration: "13s", animationDelay: "1s" }} />
        <div className="absolute top-[32%] left-[45%] w-1 h-1 rounded-full bg-[#C8A15A]/20 blur-[0.2px] animate-float z-2" style={{ animationDuration: "16s", animationDelay: "3.5s" }} />
        <div className="absolute top-[65%] left-[16%] w-2.5 h-2.5 rounded-full bg-[#C8A15A]/12 blur-[1.5px] animate-float z-2" style={{ animationDuration: "10s", animationDelay: "1.5s" }} />
        <div className="absolute top-[24%] right-[30%] w-1.5 h-1.5 rounded-full bg-[#DCC7A5]/30 blur-[0.5px] animate-float z-2" style={{ animationDuration: "14s", animationDelay: "2s" }} />
        <div className="absolute top-[55%] right-[25%] w-2 h-2 rounded-full bg-[#C8A15A]/20 blur-[1px] animate-float z-2" style={{ animationDuration: "8s", animationDelay: "0.5s" }} />
      </div>

      {/* 2. Unified Composition Grid */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 xl:px-20 pt-[120px] md:pt-[130px] xl:pt-[140px] pb-[48px] grid grid-cols-1 xl:grid-cols-[45%_55%] gap-12 xl:gap-8 items-center min-h-screen my-auto">
        
        {/* LEFT COMPOSITION: Refined Editorial Typography & Luxurious Easing */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[620px] flex flex-col items-center text-center xl:items-start xl:text-left pt-2 lg:pr-6 z-10"
          style={{ y: -36 }}
        >
          {/* Company Name / Brand Glow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-[rgba(26,17,5,0.72)] border border-[rgba(224,188,119,0.55)] shadow-[0_0_20px_rgba(224,188,119,0.35),_inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md mb-8 hover:border-[rgba(224,188,119,0.9)] hover:shadow-[0_0_25px_rgba(224,188,119,0.55)] transition-all duration-500 group cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-[#E0BC77] animate-pulse shadow-[0_0_10px_#E0BC77]" />
            <span className="font-mono text-[11px] font-black tracking-[0.25em] text-[#E0BC77] uppercase select-none group-hover:text-white transition-colors duration-300">
              MYTHOS AI
            </span>
          </motion.div>

          {/* Headline: Premium Engraved Luxury Branding Aesthetic */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans select-none mb-[36px]"
          >
            {/* Uplifted, extra bold, glossy gradient 'Building' */}
            <span 
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: "1.0",
                background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 35%, #E2E8F0 65%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-[52px] md:text-[68px] xl:text-[84px] block opacity-98 transition-all duration-300 transform -translate-y-4 filter drop-shadow-[0_2px_15px_rgba(255,255,255,0.25)]"
            >
              Building
            </span>
            {/* Spaced, perfectly non-clipping 'Intelligent' where the lowercase 'g' displays perfectly */}
            <span 
              style={{
                fontFamily: '"Space Grotesk", "Geist", "Inter", sans-serif',
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: "1.25",
                background: "linear-gradient(135deg, #F7E6B0 0%, #E9D0A2 50%, #C89445 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="block mt-[-6px] mb-2 text-[52px] md:text-[70px] xl:text-[88px] pb-3 drop-shadow-[0_0_20px_rgba(233,208,162,0.3)]"
            >
              Intelligent
            </span>
            <span 
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 600,
                letterSpacing: "0.04em",
                lineHeight: "1.05",
                background: "linear-gradient(135deg, #FFF1D0 0%, #F4CE81 40%, #E6B55E 70%, #B8852B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 12px rgba(244, 206, 129, 0.35))",
              }}
              className="italic block mt-1 md:mt-1.5 text-[42px] md:text-[58px] xl:text-[72px]"
            >
              Business Systems
            </span>
          </motion.h1>

          {/* Effortless Editorial Paragraph with slightly darker, highly readable text */}
          <p 
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 400,
              lineHeight: "1.75",
              width: "100%",
              maxWidth: "560px",
            }}
            className="text-white/90 text-[17px] md:text-[20px] xl:text-[22px] mb-[42px] text-center xl:text-left"
          >
            {BRAND_MISSION}
          </p>

          {/* Action Hub - Handcrafted Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto mb-[52px] justify-center xl:justify-start"
          >
            {/* Primary Action: "Launch Mythos AI OS" (Elegant Glassmorphism with luxurious gold border and edge glow) */}
            <motion.button
              onClick={onEnterOS}
              whileHover={{ 
                scale: 1.03, 
                y: -4,
                background: "linear-gradient(135deg, rgba(247, 238, 219, 0.35) 0%, rgba(233, 208, 162, 0.18) 100%)",
                boxShadow: "0 20px 45px rgba(241,197,106,0.28), 0 0 15px rgba(241,197,106,0.2), inset 0 1px 3px rgba(255,255,255,0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                width: "235px",
                height: "64px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, rgba(247, 238, 219, 0.2) 0%, rgba(233, 208, 162, 0.08) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1.5px solid rgba(241, 197, 106, 0.5)",
                boxShadow: "0 14px 40px rgba(241,197,106,0.15), inset 0 1px 2px rgba(255,255,255,0.25)",
                color: "#FFF0D2",
              }}
              className="group relative flex items-center justify-center gap-2.5 font-sans font-semibold text-[15px] tracking-wide cursor-pointer overflow-hidden transition-all duration-[350ms]"
            >
              {/* Premium Light Sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]">
                <div 
                  className="absolute top-0 bottom-0 w-12 bg-white/45 blur-[3px]"
                  style={{
                    animation: "sweep 2s infinite ease-in-out",
                  }}
                />
              </div>
              
              <span className="relative z-10">Launch Mythos AI OS</span>
              <ArrowRight className="w-4 h-4 text-[#FFF0D2] group-hover:translate-x-1.5 transition-transform duration-300 ease-out relative z-10" />
            </motion.button>

            {/* Secondary Action: "Book Discovery Call" (Elegant Glassmorphism dark theme with gold accent) */}
            <motion.button
              onClick={onBookCall}
              whileHover={{ 
                scale: 1.03, 
                y: -4,
                background: "rgba(17, 17, 17, 0.65)",
                borderColor: "rgba(241, 197, 106, 0.65)",
                boxShadow: "0 20px 45px rgba(0,0,0,0.4), 0 0 20px rgba(241,197,106,0.25), inset 0 1px 2px rgba(255,255,255,0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                width: "280px",
                height: "64px",
                borderRadius: "999px",
                background: "rgba(17, 17, 17, 0.35)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(241, 197, 106, 0.3)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.08)",
                color: "#F1C56A",
              }}
              className="group relative flex items-center justify-center gap-2.5 font-sans font-semibold text-[15px] tracking-wide cursor-pointer overflow-hidden transition-all duration-[350ms]"
            >
              <div className="absolute inset-0 bg-radial from-[#F1C56A]/10 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-[350ms] pointer-events-none" />
              <span className="relative z-10">Book Discovery Call</span>
              <PhoneCall className="w-4 h-4 text-[#F1C56A] group-hover:translate-x-[6px] transition-all duration-300 relative z-10" />
            </motion.button>
          </motion.div>

          {/* Powered by Industry-Leading Technologies Section (Margin spacing: 52px to 44px) */}
          <div className="w-full relative mb-[44px] pl-1 flex flex-col items-center xl:items-start">
            <span 
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "18px",
                fontStyle: "italic",
                fontWeight: 600,
                letterSpacing: "0.05em",
                background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 40%, #E2E8F0 75%, #CBD5E1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 10px rgba(255, 255, 255, 0.25))"
              }}
              className="block mb-4 text-center xl:text-left"
            >
              Powered by Industry-Leading Technologies
            </span>
            
            <div className="relative w-full py-2 select-none">
              {/* Desktop Marquee Version */}
              <div className="hidden xl:flex overflow-hidden relative w-full">
                <div className="animate-marquee-slow flex items-center gap-[22px]">
                  {/* 3 identical sets of badges to ensure seamless looping at any viewport width */}
                  {[...Array(3)].flatMap((_, setIdx) => 
                    ["OpenAI", "Gemini", "Vapi", "ElevenLabs", "Supabase"].map((tech, idx) => (
                      <motion.div
                        key={`${tech}-${setIdx}-${idx}-desktop`}
                        style={{
                          width: "170px",
                          height: "64px",
                          borderRadius: "16px",
                          background: "rgba(255, 255, 255, 0.15)",
                          backdropFilter: "blur(24px)",
                          borderColor: "rgba(255, 255, 255, 0.28)",
                          boxShadow: "0 8px 32px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.15)"
                        }}
                        className="inline-flex items-center justify-center gap-3 border transition-all duration-300 hover:border-white hover:bg-white/25 hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] hover:translate-y-[-6px] group cursor-default text-white"
                      >
                        <div className="text-white group-hover:text-white transition-colors duration-300">
                          {TECH_LOGOS[tech]}
                        </div>
                        <span className="font-sans font-semibold text-[18px] tracking-wide transition-colors duration-300">
                          {tech}
                        </span>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              {/* Tablet Wrapped Version */}
              <div className="hidden md:flex xl:hidden flex-wrap items-center justify-center gap-4 w-full">
                {["OpenAI", "Gemini", "Vapi", "ElevenLabs", "Supabase"].map((tech, idx) => (
                  <motion.div
                    key={`${tech}-${idx}-tablet`}
                    style={{
                      width: "150px",
                      height: "56px",
                      borderRadius: "14px",
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(24px)",
                      borderColor: "rgba(255, 255, 255, 0.28)",
                      boxShadow: "0 8px 32px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.15)"
                    }}
                    className="inline-flex items-center justify-center gap-2 border transition-all duration-300 hover:border-white hover:bg-white/25 hover:shadow-[0_0_25px_rgba(255,255,255,0.45)] group cursor-default text-white"
                  >
                    <div className="text-white">
                      {TECH_LOGOS[tech]}
                    </div>
                    <span className="font-sans font-semibold text-[15px] tracking-wide">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Horizontal Scroll Row Version */}
              <div className="flex md:hidden overflow-x-auto scrollbar-none flex-nowrap items-center gap-4 w-full px-2 pb-2">
                {["OpenAI", "Gemini", "Vapi", "ElevenLabs", "Supabase"].map((tech, idx) => (
                  <motion.div
                    key={`${tech}-${idx}-mobile`}
                    style={{
                      width: "135px",
                      height: "50px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(24px)",
                      borderColor: "rgba(255, 255, 255, 0.28)",
                      boxShadow: "0 8px 32px rgba(255, 255, 255, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.15)"
                    }}
                    className="inline-flex items-center justify-center gap-2 border flex-shrink-0 text-white"
                  >
                    <div className="text-white">
                      {TECH_LOGOS[tech]}
                    </div>
                    <span className="font-sans font-semibold text-[13px] tracking-wide">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COMPOSITION: Exhibition AI Core Centerpiece & Orbiting Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex items-center justify-center transition-all duration-300 min-h-[400px] sm:min-h-[500px] lg:min-h-[560px]"
        >
          {/* THE AI CORE GLASS GLOBE */}
          <motion.div 
            onClick={onEnterOS}
            style={{
              x: parallaxX,
              y: parallaxY,
              transformStyle: "preserve-3d",
              perspective: "1200px",
              scale: globeScale
            }}
            animate={{
              y: [1, 0, 1], // Microscopic subtle breathing to keep pedestal perfectly grounded
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-[310px] h-[310px] xs:w-[340px] xs:h-[340px] sm:w-[430px] sm:h-[430px] lg:w-[490px] lg:h-[490px] flex items-center justify-center z-20 cursor-pointer group rounded-full mt-6 xl:mt-16 translate-y-0 xl:translate-y-[-96px] xl:translate-x-[8px]"
          >
             {/* Brilliant warm golden glowing radial light behind the AI Core */}
            <div className="absolute w-[440px] h-[440px] rounded-full bg-[#C8A15A]/18 filter blur-[95px] -z-10 pointer-events-none" />

            {/* Soft contact shadow directly below the pedestal */}
            <div 
              className="absolute pointer-events-none z-10 rounded-full"
              style={{
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%) scale-x-95",
                width: "260px",
                height: "16px",
                backgroundColor: "rgba(0, 0, 0, 0.22)",
                filter: "blur(28px)",
              }}
            />

            {/* Outer Sphere with gorgeous transparent glass gold frame, high-contrast borders, and luxury lighting */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#F1C56A]/75 bg-gradient-to-b from-[rgba(26,17,5,0.72)] via-[rgba(65,47,20,0.35)] to-[rgba(241,197,106,0.18)] backdrop-blur-[24px] shadow-[0_35px_85px_rgba(241,197,106,0.32),_0_0_60px_rgba(241,197,106,0.22),_inset_0_2px_22px_rgba(255,243,212,0.55)]">
              
              {/* Slow-spinning orbital track SVGs with brilliant gold gradient glow */}
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_35s_linear_infinite]">
                <svg className="w-4/5 h-4/5 opacity-95" viewBox="0 0 200 200" fill="none">
                  {/* Orbital tracks with gold-silver-bronze gradient glow */}
                  <circle cx="100" cy="100" r="75" stroke="url(#gold-glow-grad)" strokeWidth="0.8" strokeDasharray="5 7" />
                  <circle cx="100" cy="100" r="55" stroke="url(#gold-glow-grad)" strokeWidth="1.4" />
                  
                  {/* Central Core Nodes (Radiant Gold) */}
                  <circle cx="100" cy="100" r="16" fill="url(#gold-radial-grad)" className="animate-pulse" />
                  
                  {/* Orbiting particles/nodes */}
                  <circle cx="155" cy="100" r="5" fill="#F7E6B0" />
                  <circle cx="45" cy="100" r="4" fill="#C5A059" />
                  <circle cx="100" cy="45" r="6" fill="#FFFFFF" className="animate-pulse" />
                  
                  <defs>
                    <linearGradient id="gold-glow-grad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#F7E6B0" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#E6BF70" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#C89445" stopOpacity="0.95" />
                    </linearGradient>
                    <radialGradient id="gold-radial-grad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="70%" stopColor="#E6BF70" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Sparkling Stars inside the globe (Elegant 4-point twinkling gold sparkles) */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Sparkle 1 */}
                <motion.svg 
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.6, 1.4, 0.6], rotate: [0, 90, 180] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[20%] left-[24%] w-7 h-7 text-[#FFE18B] drop-shadow-[0_0_14px_rgba(241,197,106,1)]"
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </motion.svg>
                
                {/* Sparkle 2 */}
                <motion.svg 
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1.3, 0.5], rotate: [45, 135, 225] }}
                  transition={{ duration: 2.2, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-[22%] right-[22%] w-6.5 h-6.5 text-[#FFD066] drop-shadow-[0_0_12px_rgba(241,197,106,1)]"
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </motion.svg>

                {/* Sparkle 3 */}
                <motion.svg 
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1.5, 0.5], rotate: [-20, 70, 160] }}
                  transition={{ duration: 1.5, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[58%] left-[16%] w-6 h-6 text-[#FFF5DF] drop-shadow-[0_0_16px_rgba(255,245,223,1)]"
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </motion.svg>

                {/* Sparkle 4 */}
                <motion.svg 
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.6, 1.2, 0.6], rotate: [15, 105, 195] }}
                  transition={{ duration: 2.0, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[30%] right-[30%] w-5.5 h-5.5 text-[#FFD066] drop-shadow-[0_0_10px_rgba(241,197,106,0.95)]"
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </motion.svg>

                {/* Extra Sparkle 5 */}
                <motion.svg 
                  animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.4, 1.1, 0.4], rotate: [60, 150, 240] }}
                  transition={{ duration: 1.7, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-[35%] left-[28%] w-5.5 h-5.5 text-[#FFF2CC] drop-shadow-[0_0_10px_rgba(241,197,106,0.9)]"
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </motion.svg>

                {/* Extra Sparkle 6 */}
                <motion.svg 
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.4, 1.3, 0.4], rotate: [-45, 45, 135] }}
                  transition={{ duration: 1.9, delay: 1.1, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[45%] right-[18%] w-5 h-5 text-[#FFE08C] drop-shadow-[0_0_12px_rgba(241,197,106,1)]"
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </motion.svg>
              </div>

              {/* Mythos AI Brand Centerpiece Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none select-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.95, 1, 0.95], scale: 1 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <span 
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      letterSpacing: "0.08em",
                      background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 25%, #E2E8F0 45%, #FFFFFF 55%, #CBD5E1 75%, #FFFFFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 2px 18px rgba(255, 255, 255, 0.65)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.35))",
                    }}
                    className="italic text-[26px] sm:text-[34px] font-bold text-center"
                  >
                    MYTHOS AI
                  </span>
                </motion.div>
              </div>

              {/* Holographic gold lens reflection */}
              <div className="absolute inset-0 bg-radial from-transparent via-[#F1C56A]/25 to-transparent mix-blend-color-dodge opacity-85 pointer-events-none rounded-full" />

              {/* Upper-left high-contrast luxury lens flare */}
              <div className="absolute top-[8%] left-[12%] w-[100px] h-[40px] bg-white/35 rounded-full transform -rotate-[35deg] filter blur-[1px] pointer-events-none" />
              
              {/* Bottom-right gold backlight reflection */}
              <div className="absolute bottom-[8%] right-[10%] w-[120px] h-[50px] bg-[#F1C56A]/15 rounded-full transform rotate-[45deg] filter blur-[4px] pointer-events-none" />

              {/* Bezel boundary overlay */}
              <div className="absolute inset-0.5 rounded-full border border-white/15 pointer-events-none" />
            </div>
          </motion.div>

          {/* Sibling absolute floating cards to avoid being cropped */}
          {/* Automation Hub */}
          <motion.div
            className="floating-card card-automation absolute rounded-2xl p-4 shadow-[0_18px_50px_rgba(0,0,0,0.12)] flex items-center gap-3 z-30 pointer-events-none select-none transition-all duration-500 ease-out hover:translate-y-[-14px] hover:shadow-[0_25px_60px_rgba(224,188,119,0.25)]"
            style={{
              background: "rgba(255,248,235,0.72)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#B9893D]/10 flex items-center justify-center border border-[#D6B06A]/20">
              <GitMerge className="w-4 h-4 text-[#8F6523]" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-[13px] tracking-wide text-[#1B1B1B]">Automation Hub</h4>
              <p className="font-mono text-[9px] text-[#8F6523]/80 uppercase tracking-wider font-bold">Connected Systems</p>
            </div>
          </motion.div>

          {/* Agent Dispatcher */}
          <motion.div
            className="floating-card card-dispatcher absolute rounded-2xl p-4 shadow-[0_18px_50px_rgba(0,0,0,0.12)] flex items-center gap-3 z-30 pointer-events-none select-none transition-all duration-500 ease-out hover:translate-y-[-14px] hover:shadow-[0_25px_60px_rgba(224,188,119,0.25)]"
            style={{
              background: "rgba(255,248,235,0.72)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 8,
              delay: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#B9893D]/10 flex items-center justify-center border border-[#D6B06A]/20">
              <Bot className="w-4 h-4 text-[#8F6523]" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-[13px] tracking-wide text-[#1B1B1B]">Agent Dispatcher</h4>
              <p className="font-mono text-[9px] text-[#8F6523]/80 uppercase tracking-wider font-bold">Autonomous Swarms</p>
            </div>
          </motion.div>

          {/* Cognitive Decision */}
          <motion.div
            className="floating-card card-cognitive absolute rounded-2xl p-4 shadow-[0_18px_50px_rgba(0,0,0,0.12)] flex items-center gap-3 z-30 pointer-events-none select-none transition-all duration-500 ease-out hover:translate-y-[-14px] hover:shadow-[0_25px_60px_rgba(224,188,119,0.25)]"
            style={{
              background: "rgba(255,248,235,0.72)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 8,
              delay: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#B9893D]/10 flex items-center justify-center border border-[#D6B06A]/20">
              <Cpu className="w-4 h-4 text-[#8F6523]" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-[13px] tracking-wide text-[#1B1B1B]">Cognitive Decision</h4>
              <p className="font-mono text-[9px] text-[#8F6523]/80 uppercase tracking-wider font-bold">Reasoning Matrix</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
