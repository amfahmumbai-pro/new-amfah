"use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, HelpCircle } from "lucide-react";
// import ContactForm from "./ContactForm";

export default function ContactPopup() {
  /*
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only initialize and check on client-side
    if (typeof window !== "undefined") {
      const isDismissed = sessionStorage.getItem("contactPopupDismissed");
      if (isDismissed === "true") {
        return;
      }

      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000 * 30);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("contactPopupDismissed", "true");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative bg-white rounded-3xl border border-brand-border/60 max-w-lg w-full shadow-2xl z-10 flex flex-col max-h-[90vh]"
          >
            <button
              onClick={handleClose}
              className="absolute -top-10 md:-top-10 right-0 md:-right-10 p-2.5 rounded-full bg-white/20 hover:bg-brand-accent text-white backdrop-blur-sm transition-all duration-300 cursor-pointer border border-white/30 shadow-xl"
              aria-label="Close form"
            >
              <X className="h-3 md:h-5 w-3 md:w-5 " />
            </button>

            <div className="flex-1 overflow-y-auto p-6 md:p-6 scrollbar-thin rounded-2xl md:rounded-3xl bg-white">
              <div className="text-center mb-3">
                <h3 className="font-display font-semibold md:font-bold text-md md:text-lg text-brand-navy leading-tight">
                  Need Dehumidifier Advice?
                </h3>
              </div>

              <ContactForm onSubmitSuccess={handleClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
  */
  return null;
}
