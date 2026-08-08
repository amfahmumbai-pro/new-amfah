"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Mail, Phone, X, CheckCircle2, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function RequestCallbackModal({ productName, categoryName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
    setIsSuccess(false);
    setErrorMessage("");
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!phone.trim() || !email.trim()) {
      setErrorMessage("Please enter both your phone number and email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration parameters
      const serviceId = "service_buktfuo";
      const templateId = "template_bscl7u6";
      const publicKey = "W-MxIBBmmdRj1H3xm";

      const templateParams = {
        from_name: email.split("@")[0] || "Customer",
        from_email: email.trim(),
        phone_number: phone.trim(),
        location: `Callback Request - ${productName || "Product Page"}`,
        product_type: productName || "AMFAH Product",
        solution_type: categoryName || "Direct Product Page Callback",
        message: `Customer requested an urgent callback for product: ${productName || "Equipment"}. Phone: ${phone.trim()}, Email: ${email.trim()}`,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setIsSuccess(true);
      setPhone("");
      setEmail("");

      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
      }, 2500);
    } catch (error) {
      console.error("EmailJS Callback Request Error:", error);
      const errText = error?.text || error?.message || "Failed to send callback request. Please try again.";
      setErrorMessage(errText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-4">
      {/* Trigger Button rendered below Features section */}
      <button
        type="button"
        onClick={handleOpen}
        className="w-full group relative overflow-hidden text-brand-navy hover:!text-white bg-transparent hover:bg-brand-navy border-2 border-brand-navy px-3 py-2 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-3 cursor-pointer transform active:scale-[0.99] transition-all duration-300 ease-in-out"
      >
        <div className="h-8 w-8 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
          <PhoneCall className="h-5 w-5 stroke-current text-brand-navy group-hover:!text-white transition-colors duration-300" />
        </div>
        <span className="font-extrabold leading-tight text-brand-navy group-hover:!text-white transition-colors duration-300">Request a Callback</span>
      </button>

      {/* Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-brand-navy/30 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 260 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-brand-border/80 shadow-2xl z-10 overflow-hidden"
            >
              {/* Top Banner Header */}
              <div className="bg-gradient-to-r from-brand-navy to-brand-blue p-6 text-white relative flex items-center justify-between">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">Request a Callback</span>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Form Content Body */}
              <div className="p-6 sm:p-7">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-4"
                  >
                    <div className="h-16 w-16 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-display font-bold text-xl text-brand-navy">Callback Requested!</h4>
                      <p className="text-xs text-brand-gray-medium max-w-xs mx-auto leading-relaxed">
                        Thank you! An AMFAH technical consultant will call you at <span className="font-bold text-brand-navy">{phone}</span> shortly.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                        {errorMessage}
                      </div>
                    )}

                    {/* Phone Number Field */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-gray-medium">
                          <Phone className="h-4 w-4 text-brand-blue" />
                        </div>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full pl-10 pr-4 py-3 bg-brand-gray-light/60 border border-brand-border rounded-xl text-sm font-medium text-brand-navy placeholder:text-brand-gray-medium/70 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-gray-medium">
                          <Mail className="h-4 w-4 text-brand-blue" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.name@example.com"
                          className="w-full pl-10 pr-4 py-3 bg-brand-gray-light/60 border border-brand-border rounded-xl text-sm font-medium text-brand-navy placeholder:text-brand-gray-medium/70 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 transition-all"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 bg-[#d41124] hover:bg-brand-navy text-white py-3.5 px-6 rounded-xl font-display font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <PhoneCall className="h-4 w-4 text-white" />
                          <span>Submit Callback Request</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
