import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Calendar, CheckCircle2, MessageSquare, ShieldCheck } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    date: "",
    requirements: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    // Required fields check
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitError("Please fill in all required fields marked with *");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          honeypot,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || data.error || "Form submission failed.");
      }

      setSubmittedName(formData.name);
      setIsSubmitted(true);
      
      // Automatically clear the form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        date: "",
        requirements: "",
      });
      setHoneypot("");
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError("Unable to submit your request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-matteblack text-white py-28 md:py-36 overflow-hidden border-t border-blue-500/20"
    >
      {/* Background soft blurs with shrinking/pulsing animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Animate-shrink large gradient circles */}
        <motion.div
          animate={{
            scale: [1, 0.8, 0.95, 0.82, 1],
            opacity: [0.12, 0.04, 0.1, 0.05, 0.12],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[15%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-radial from-blue-500/20 via-transparent to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [0.85, 1.05, 0.9, 1.08, 0.85],
            opacity: [0.1, 0.18, 0.08, 0.15, 0.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[5%] left-[5%] w-[50vw] h-[50vw] rounded-full bg-radial from-blue-600/15 via-transparent to-transparent blur-[100px]"
        />
        
        {/* Subtle slow shrinking thin vector rings inside the black section background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
          <motion.div 
            animate={{ scale: [1, 0.85, 1.02, 0.9, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-[600px] h-[600px] rounded-full border border-blue-500/30"
          />
          <motion.div 
            animate={{ scale: [0.9, 1.1, 0.85, 1.02, 0.9] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[450px] h-[450px] rounded-full border border-blue-400/40"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-matteblack border border-white font-mono text-[9px] font-extrabold tracking-widest uppercase mb-6 shadow-md shadow-white/5">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>CONNECT WITH MYTHOS</span>
          </div>
          <h2 className="font-sans text-[32px] sm:text-[46px] md:text-[54px] font-light leading-[1.1] tracking-tight text-white max-w-3xl select-none">
            Let's Build Something <br />
            <span className="font-serif italic font-normal text-gold">Stark, Precise & Extraordinary.</span>
          </h2>
          <p className="font-sans text-[15px] text-neutral-400 font-medium max-w-xl mt-4 leading-relaxed">
            Specify your structural bottlenecks and let us custom-engineer your autonomous digital workspace.
          </p>
        </div>

        {/* Contact Layout Grid - High Contrast Black & White Combination */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* LEFT PANEL: Deep Obsidian with Silver/Gold details (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              {/* Trust point 1 with beautiful blue border & glowing scale interactions */}
              <div className="bg-blue-950/10 border border-blue-500/20 rounded-2xl p-6 flex gap-4 hover:border-blue-400/45 hover:bg-blue-950/20 hover:shadow-[0_4px_25px_rgba(59,130,246,0.12)] transition-all duration-300 cursor-default">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/25 flex items-center justify-center text-blue-400 shrink-0">
                  <Calendar className="w-5 h-5 stroke-[1.5px]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white mb-1">Direct Discovery Call</h4>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed font-medium">
                    Schedule a synchronized calendar consult to map out prompt strategies and n8n triggers directly.
                  </p>
                </div>
              </div>

              {/* Trust point 2 with beautiful blue border */}
              <div className="bg-blue-950/10 border border-blue-500/20 rounded-2xl p-6 flex gap-4 hover:border-blue-400/45 hover:bg-blue-950/20 hover:shadow-[0_4px_25px_rgba(59,130,246,0.12)] transition-all duration-300 cursor-default">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/25 flex items-center justify-center text-blue-400 shrink-0">
                  <ShieldCheck className="w-5 h-5 stroke-[1.5px]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white mb-1">Enterprise-Grade Security</h4>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed font-medium">
                    All workflows reside inside private cloud instances, protected by robust data-encryption and custom keys.
                  </p>
                </div>
              </div>

              {/* Trust point 3 with beautiful blue border */}
              <div className="bg-blue-950/10 border border-blue-500/20 rounded-2xl p-6 flex gap-4 hover:border-blue-400/45 hover:bg-blue-950/20 hover:shadow-[0_4px_25px_rgba(59,130,246,0.12)] transition-all duration-300 cursor-default">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/25 flex items-center justify-center text-blue-400 shrink-0">
                  <MessageSquare className="w-5 h-5 stroke-[1.5px]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white mb-1">15-Min Response Guarantee</h4>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed font-medium">
                    When you submit this form, our custom-trained Lead AI agent immediately qualifies records and alerts developers.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick status banner in blue */}
            <div className="p-6 bg-blue-950/20 border border-blue-500/25 rounded-2xl flex items-center justify-between font-mono text-[9px] font-extrabold text-blue-200/95 cursor-default shadow-[inset_0_1px_8px_rgba(59,130,246,0.06)]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                <span>AI GATEWAY ACTIVE</span>
              </span>
              <span className="text-blue-300/70">EST. LATENCY: 14MS</span>
            </div>
          </div>

          {/* RIGHT PANEL: Glowing Golden White Form Section */}
          <div className="lg:col-span-7">
            <div 
              style={{
                boxShadow: "0 0 35px rgba(230, 190, 108, 0.28), inset 0 0 30px rgba(255, 255, 255, 0.95)",
                background: "linear-gradient(135deg, #FFFFFF 0%, #FFFDF6 35%, #FFFDF9 65%, #FAF5E8 100%)",
                borderColor: "rgba(230, 190, 108, 0.45)",
              }}
              className="border rounded-3xl p-8 sm:p-10 shadow-2xl h-full flex flex-col justify-center text-matteblack relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-radial from-gold/15 to-transparent blur-[40px] pointer-events-none" />
              {/* Added subtle inner glow reflection strip at top */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {/* Elegant Documentation Header Tag */}
                  <div className="border-b border-gold/15 pb-4 mb-2 flex items-center justify-between">
                    <span className="font-serif italic text-gold text-xs tracking-wider">Mythos Integration Intake</span>
                    <span className="font-mono text-[8px] text-neutral-400 font-bold tracking-widest uppercase">DOC ID: M-2026</span>
                  </div>

                  {/* Honeypot field for spam prevention */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <input
                      type="text"
                      name="website_url_honey"
                      tabIndex={-1}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      placeholder="Do not fill this"
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col items-start gap-2">
                      <label className="font-mono text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full h-12 bg-white/70 hover:bg-white/90 focus:bg-white border border-gold/30 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl px-4 text-sm font-sans font-medium transition-all outline-none text-matteblack shadow-sm"
                      />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col items-start gap-2">
                      <label className="font-mono text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full h-12 bg-white/70 hover:bg-white/90 focus:bg-white border border-gold/30 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl px-4 text-sm font-sans font-medium transition-all outline-none text-matteblack shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company */}
                    <div className="flex flex-col items-start gap-2">
                      <label className="font-mono text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Enterprise"
                        className="w-full h-12 bg-white/70 hover:bg-white/90 focus:bg-white border border-gold/30 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl px-4 text-sm font-sans font-medium transition-all outline-none text-matteblack shadow-sm"
                      />
                    </div>
                    {/* Phone Number (Required, placed directly below Business Email) */}
                    <div className="flex flex-col items-start gap-2">
                      <label className="font-mono text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full h-12 bg-white/70 hover:bg-white/90 focus:bg-white border border-gold/30 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl px-4 text-sm font-sans font-medium transition-all outline-none text-matteblack shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Industry */}
                    <div className="flex flex-col items-start gap-2">
                      <label className="font-mono text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest">Industry Sector</label>
                      <input
                        type="text"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        placeholder="Healthcare / Finance"
                        className="w-full h-12 bg-white/70 hover:bg-white/90 focus:bg-white border border-gold/30 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl px-4 text-sm font-sans font-medium transition-all outline-none text-matteblack shadow-sm"
                      />
                    </div>
                    {/* Consultation date */}
                    <div className="flex flex-col items-start gap-2">
                      <label className="font-mono text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest">Preferred Consultation Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full h-12 bg-white/70 hover:bg-white/90 focus:bg-white border border-gold/30 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl px-4 text-sm font-sans font-medium transition-all outline-none cursor-pointer text-matteblack shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Message / Project Requirements */}
                  <div className="flex flex-col items-start gap-2">
                    <label className="font-mono text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest">Project Requirements Summary</label>
                    <textarea
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Briefly detail what workflow bottlenecks you intend to automate..."
                      className="w-full bg-white/70 hover:bg-white/90 focus:bg-white border border-gold/30 focus:border-gold focus:ring-1 focus:ring-gold rounded-xl p-4 text-sm font-sans font-medium transition-all outline-none resize-none text-matteblack shadow-sm"
                    />
                  </div>

                  {/* Error Notification */}
                  {submitError && (
                    <div className="bg-rose-50/90 border border-rose-200 rounded-xl p-4 text-xs font-sans font-medium text-rose-800 leading-relaxed text-left">
                      <p className="font-bold mb-1">Unable to submit your request.</p>
                      <p className="mb-1">Please try again or email us directly at:</p>
                      <a href="mailto:mythosai888111@gmail.com" className="font-bold underline hover:text-rose-950">mythosai888111@gmail.com</a>
                    </div>
                  )}

                  {/* Submit Button - Strongest Golden Glaze CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="golden-glaze-btn relative w-full h-14 font-sans font-extrabold text-xs tracking-widest text-matteblack rounded-xl transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 overflow-hidden"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-matteblack border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>INITIALIZE MYTHOS SYSTEM ENGAGEMENT</span>
                        <Sparkles className="w-4 h-4 text-matteblack animate-pulse" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-10 animate-in zoom-in-95 duration-500 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-matteblack text-white border border-matteblack flex items-center justify-center mb-6 shadow-xl shadow-black/10 animate-bounce">
                    <CheckCircle2 className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-sans font-bold text-[22px] sm:text-[24px] text-matteblack tracking-tight mb-3">
                    ✓ Thank you! Your inquiry has been received.
                  </h3>
                  <p className="font-sans text-[15px] text-neutral-600 font-medium leading-relaxed max-w-sm mb-8">
                    Our team will contact you within 24 hours.
                  </p>
                  
                  {/* Status checklist block */}
                  <div className="w-full max-w-sm bg-white/60 rounded-2xl p-5 border border-gold/15 text-left font-mono text-[10px] space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-bold">CLIENT RECORDED:</span>
                      <span className="text-matteblack font-extrabold">{submittedName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-bold">DATABASE STATUS:</span>
                      <span className="text-emerald-600 font-extrabold">RECORD RECORDED</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-bold">DISPATCH TIMELINE:</span>
                      <span className="text-matteblack font-extrabold">&lt; 24 HOURS</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
