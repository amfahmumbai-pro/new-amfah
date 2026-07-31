"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, PhoneCall, X, Send, CheckCircle2, Sparkles, MessageCircle, CloudRain, ShieldCheck } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function MonsoonPromoBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: "24", minutes: "00", seconds: "00" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Callback Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);

  // Generate Confetti Particles on client side mount
  useEffect(() => {
    const colors = ["#f43f5e", "#3b82f6", "#10b981", "#eab308", "#ec4899", "#8b5cf6", "#f97316"];
    const shapes = ["rect", "circle", "triangle"];
    const particles = Array.from({ length: 45 }).map((_, i) => {
      const sizeVal = Math.random() * 6 + 5; // size between 5px and 11px
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${sizeVal}px`,
        height: Math.random() > 0.5 ? `${sizeVal * 1.6}px` : `${sizeVal}px`,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        duration: `${Math.random() * 2.5 + 3}s`, // duration between 3s and 5.5s
        delay: `${Math.random() * -6}s`, // start immediately at random animation frame
        tilt: `${Math.random() * 40 - 20}deg`,
      };
    });
    setConfettiParticles(particles);
  }, []);

  // Initialize visibility and timer
  useEffect(() => {
    const STORAGE_KEY = "amfah_monsoon_countdown_end_v2";
    const isDismissed = sessionStorage.getItem("monsoonBannerDismissed");

    // Timer Logic
    const initializeTimer = () => {
      let endTime = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();

      // If no end time is stored yet, set it to 24 hours from now
      if (!endTime) {
        const newEndTime = now + 24 * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, newEndTime.toString());
        endTime = newEndTime.toString();
      }

      const endTimestamp = parseInt(endTime, 10);

      // If the timer has already expired, the banner should disappear
      if (endTimestamp <= now) {
        setIsVisible(false);
        return null;
      }

      // If not dismissed, make it visible
      if (!isDismissed) {
        setIsVisible(true);
      }

      let interval;
      const updateCountdown = () => {
        const currentNow = Date.now();
        const diff = endTimestamp - currentNow;

        // If it expires, hide the banner and clear interval
        if (diff <= 0) {
          setIsVisible(false);
          if (interval) clearInterval(interval);
          return;
        }

        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({
          hours: h.toString().padStart(2, "0"),
          minutes: m.toString().padStart(2, "0"),
          seconds: s.toString().padStart(2, "0"),
        });
      };

      updateCountdown();
      interval = setInterval(updateCountdown, 1000);
      return interval;
    };

    const timerInterval = initializeTimer();
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, []);

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.setItem("monsoonBannerDismissed", "true");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitting(true);

    try {
      // Use existing configured EmailJS parameters
      const serviceId = "service_buktfuo";
      const templateId = "template_bscl7u6";
      const publicKey = "W-MxIBBmmdRj1H3xm";

      const templateParams = {
        from_name: name,
        from_email: "monsoon-promo@amfah.com",
        phone_number: phone,
        location: "Monsoon Promo Callback Request",
        product_type: "Dehumidifier",
        solution_type: "Home Use",
        message: "Customer requested an urgent callback to claim the 10% Monsoon Discount (Commercial & Industrial Models).",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setIsSuccess(true);
      setName("");
      setPhone("");
      setTimeout(() => {
        setIsSuccess(false);
        setIsModalOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Promo banner callback send failed:", error);
      alert("Failed to submit request. Please dial our hotline directly to claim your discount.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-navy via-[#1e60b5] to-[#1251a0] text-white border-brand-accent shadow-lg z-30 mt-3 md:mt-9">
        
        {/* Dynamic Curved Vector Accents (Inspired by the Sock Sensei template styling) */}
        <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#10b981] filter blur-xl transform rotate-45" />
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-yellow-400 filter blur-2xl opacity-70" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-brand-accent filter blur-xl" />
        </div>

        {/* Diagonal Stripe Accent lines */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-yellow-400 to-brand-accent pointer-events-none" />

        {/* Confetti Particles (3D Celebration/Birthday Fall Effect) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {confettiParticles.map((p) => (
            <div
              key={p.id}
              className="absolute"
              style={{
                left: p.left,
                top: "-15px",
                width: p.size,
                height: p.shape === "rect" ? p.height : p.size,
                backgroundColor: p.color,
                borderRadius: p.shape === "circle" ? "50%" : "0px",
                clipPath: p.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
                opacity: 0.85,
                transform: `rotate(${p.tilt})`,
                animation: `confettiFall ${p.duration} linear infinite`,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>

        {/* CSS Keyframe Style definition for 3D confetti fall */}
        <style>{`
          @keyframes confettiFall {
            0% {
              transform: translateY(-20px) rotateX(0deg) rotateY(0deg) rotate(0deg);
            }
            100% {
              transform: translateY(220px) rotateX(720deg) rotateY(360deg) rotate(360deg);
            }
          }
        `}</style>

        {/* Banner content */}
        <div className="max-w-8xl mx-auto px-4 sm:px-8 lg:px-14 py-3.5 sm:py-5 flex flex-col lg:flex-row items-center justify-between gap-4 relative">
          
          {/* Left Block: Offer and Monsoon Text */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 text-center lg:text-left flex-col sm:flex-row">
            <div className="bg-brand-accent text-white font-display font-extrabold text-sm sm:text-base px-3 py-1.5 rounded-lg shadow-md animate-pulse shrink-0 border border-white/20 tracking-wider">
              10% OFF
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs sm:text-sm font-display font-bold text-yellow-300 uppercase tracking-widest">
                <CloudRain className="h-4.5 w-4.5 text-sky-300" />
                Monsoon Dampness Alert
              </div>
              <p className="text-xs sm:text-sm md:text-md text-white font-sans font-medium mt-0.5 leading-snug">
                Extract high humidity, prevent mold & save big! Get 10% Monsoon Discount on our Commercial & Industrial Models.
              </p>
            </div>
          </div>

          {/* Center Block: Countdown Timer */}
          <div className="flex items-center gap-3 bg-black/35 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shrink-0 select-none">
            <div className="flex items-center gap-1.5 text-sky-200">
              <Clock className="h-4 w-4 animate-spin-slow" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Offer Ends In:</span>
            </div>
            
            <div className="flex items-center gap-1 font-display font-bold text-sm sm:text-base">
              <div className="flex flex-col items-center">
                <span className="bg-white/15 text-white px-2 py-0.5 rounded text-xs min-w-[22px] text-center">{timeLeft.hours}</span>
              </div>
              <span className="text-white/60 text-xs">:</span>
              <div className="flex flex-col items-center">
                <span className="bg-white/15 text-white px-2 py-0.5 rounded text-xs min-w-[22px] text-center">{timeLeft.minutes}</span>
              </div>
              <span className="text-white/60 text-xs">:</span>
              <div className="flex flex-col items-center">
                <span className="bg-white/15 text-white px-2 py-0.5 rounded text-xs min-w-[22px] text-center">{timeLeft.seconds}</span>
              </div>
            </div>
          </div>

          {/* Right Block: Actions */}
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-brand-navy font-display font-bold text-xs sm:text-sm rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-black/15 flex items-center justify-center gap-2 cursor-pointer border border-yellow-200"
            >
              <PhoneCall className="h-4 w-4 text-brand-navy fill-current" />
              Call to Claim Offer
            </button>
            
            {/* Dismiss banner */}
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Monsoon Hotline Modal - Forces Call or Inquiry */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 240 }}
              className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl z-10 border border-brand-border overflow-hidden"
            >
              {/* Header Design Accent */}
              <div className="bg-gradient-to-r from-brand-navy to-[#1e60b5] text-white p-6 relative">
                <div className="absolute top-0 right-0 p-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-yellow-300 uppercase tracking-wider mb-1">
                  Monsoon Special Offer Activated
                </div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight leading-tight">
                  Get 10% Discount & Save Your Space!
                </h3>
                <p className="text-xs text-blue-100 mt-1">
                  Special discount applicable on Commercial & Industrial models only. Monsoon humidity levels exceed 85%, causing severe mold, rust, and operational hazards. Secure your dehumidifier now.
                </p>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                
                {/* 1. HOTLINE CALLING BLOCK (Direct action) */}
                <div className="space-y-3">
                  <span className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider">
                    👉 Option 1: Dial Corporate Hotlines Directly
                  </span>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    <a
                      href="tel:+919321991812"
                      className="flex items-center justify-between p-3.5 bg-brand-blue-light hover:bg-[#d8e8fc] border border-brand-blue/15 rounded-xl transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-blue text-white rounded-lg group-hover:scale-110 transition-transform">
                          <PhoneCall className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-brand-navy/60 uppercase tracking-wide">Hotline Call 1</div>
                          <div className="text-sm font-bold text-brand-navy font-display">+91 93219 91812</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-brand-blue group-hover:translate-x-1 transition-transform">Call Now &rarr;</span>
                    </a>

                    <a
                      href="tel:02240107074"
                      className="flex items-center justify-between p-3.5 bg-brand-blue-light hover:bg-[#d8e8fc] border border-brand-blue/15 rounded-xl transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-blue text-white rounded-lg group-hover:scale-110 transition-transform">
                          <PhoneCall className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-brand-navy/60 uppercase tracking-wide">Hotline Call 2</div>
                          <div className="text-sm font-bold text-brand-navy font-display">022 40-107-074</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-brand-blue group-hover:translate-x-1 transition-transform">Call Now &rarr;</span>
                    </a>

                    <a
                      href="https://wa.me/919324516326?text=Hi%2C%20I'm%20interested%20in%20the%20Monsoon%20Dehumidifier%20Discount%20Offer.%20Please%20contact%20me."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 text-white rounded-lg group-hover:scale-110 transition-transform">
                          <MessageCircle className="h-4 w-4 fill-current" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">WhatsApp Inquiry</div>
                          <div className="text-sm font-bold text-emerald-800 font-display">+91 93245 16326</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">Chat Now &rarr;</span>
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-brand-border"></div>
                  <span className="flex-shrink mx-3 text-brand-gray-medium text-[10px] font-bold uppercase tracking-wider bg-white px-2">OR</span>
                  <div className="flex-grow border-t border-brand-border"></div>
                </div>

                {/* 2. CALLBACK FORM */}
                <div className="space-y-3">
                  <span className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider">
                    ✉️ Option 2: Request Instant Callback (We Call You)
                  </span>

                  {isSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-sm">Callback Requested!</div>
                        <p className="text-xs text-emerald-700/90 mt-0.5">
                          We will call you back within 15 minutes to discuss dehumidifier sizes and confirm your 10% discount.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Full Name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-xs sm:text-sm text-brand-gray-dark font-sans"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          placeholder="Phone Number (e.g. +91 98765 43210)"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-blue/30 text-xs sm:text-sm text-brand-gray-dark font-sans"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-5 py-2.5 bg-brand-accent hover:bg-brand-navy text-white font-display font-bold text-xs rounded-xl shadow-md transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              Submit
                              <Send className="h-3 w-3" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Footer Assurance */}
                <div className="pt-2 flex items-center gap-2 text-[10px] text-brand-gray-medium justify-center border-t border-brand-border/60">
                  <ShieldCheck className="h-4.5 w-4.5 text-brand-navy/60" />
                  <span>Official Authorized AMFAH Humidity Support Center</span>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
