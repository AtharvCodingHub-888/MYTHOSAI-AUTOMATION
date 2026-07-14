import React, { useState, useEffect } from "react";
import { SUCCESS_METRICS } from "../constants/copywriting";

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
    const duration = 2200; // ms
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

export default function MetricsBar() {
  return (
    <div 
      className="w-full py-14 px-6 md:px-12 relative z-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F8F3EA 0%, #F3EBDD 100%)",
      }}
    >
      {/* Decorative premium ambient shadow light source - extremely subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[100px] bg-[#E7D2A5]/10 rounded-full filter blur-[90px] pointer-events-none" />

      <div className="relative" style={{ width: "min(1320px, calc(100% - 64px))", margin: "0 auto" }}>
        {/* Luxury champagne glass card holding the metrics with very subtle floating shadow */}
        <div 
          className="w-full rounded-[32px] bg-[rgba(255,248,235,0.42)] backdrop-blur-[24px] border border-[#D6B06A]/35 py-10 md:py-14 px-6 md:px-12 shadow-[0_12px_32px_rgba(188,150,70,0.05),_0_2px_10px_rgba(0,0,0,0.01),_inset_0_1px_2px_rgba(255,255,255,0.8)] hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(188,150,70,0.08),_inset_0_1px_3px_rgba(255,255,255,0.85)] transition-all duration-500 ease-out overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(255,248,235,0.42) 0%, rgba(255,253,248,0.22) 100%)",
          }}
        >
          {/* Animated shimmering light effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
              transform: "translateX(-100%)",
              animation: "shimmer 2.5s infinite",
            }}
          />
          
          <style>{`
            @keyframes shimmer {
              100% {
                transform: translateX(100%);
              }
            }
          `}</style>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 text-center relative z-10">
            {SUCCESS_METRICS.map((metric, idx) => (
              <div
                key={metric.label}
                className={`flex flex-col items-center justify-center py-6 lg:py-0 px-2 lg:px-4 ${
                  // On mobile/tablet (1 column stacked), first 3 items get bottom border
                  idx < 3 ? "border-b lg:border-b-0 border-[#D9B970]/25 pb-6 lg:pb-0" : ""
                } ${
                  // On desktop (4 columns), first 3 items get right border
                  idx < 3 ? "lg:border-r border-[#D9B970]/25" : ""
                }`}
              >
                {/* Metric Value: Animated 54px Counter with deep, authoritative champagne gold styling */}
                <span className="font-sans font-extrabold text-[34px] sm:text-[42px] lg:text-[54px] leading-none tracking-tight mb-2 select-none">
                  <span className="bg-gradient-to-r from-[#8F641A] via-[#B5893D] to-[#8F641A] bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.65)] font-black">
                    <AnimatedCounter value={metric.value} />
                  </span>
                </span>
                
                {/* Metric Label: High contrast editorial label */}
                <span className="font-mono text-[9.5px] sm:text-[11px] font-bold text-[#5B4632] tracking-[0.16em] uppercase">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
