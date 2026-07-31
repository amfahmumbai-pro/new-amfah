"use client";
import { useState } from "react";
import { Send, CheckCircle2, ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";
import Button from "@/components/ui/Button";

export default function ContactForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    productType: "Dehumidifier",
    solutionType: "Home Use",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProductSelectOpen, setIsProductSelectOpen] = useState(false);
  const [isSolutionSelectOpen, setIsSolutionSelectOpen] = useState(false);

  const productOptions = [
    "Dehumidifier",
    "Humidifier",
    "Portable AC",
    "Air Purifier",
    "Air to Water"
  ];

  const options = [
    "Home Use",
    "Pharmaceuticals",
    "Hospital",
    "Food",
    "Hotel",
    "Art & Gallery",
    "Manufacturing",
    "Warehouse & Storage",
    "Jewellery Store",
    "Electronics",
    "Others"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (isSuccess) setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace these placeholders with your actual EmailJS keys
      const serviceId = "service_buktfuo";
      const templateId = "template_bscl7u6";
      const publicKey = "W-MxIBBmmdRj1H3xm";

      // The keys in this object should match the variables {{ }} in your EmailJS template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone,
        location: formData.location,
        product_type: formData.productType,
        solution_type: formData.solutionType,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        productType: "Dehumidifier",
        solutionType: "Home Use",
        message: "",
      });

      if (onSubmitSuccess) {
        setTimeout(() => {
          onSubmitSuccess();
        }, 1500);
      }

      setTimeout(() => {
        setIsSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to send email via EmailJS:", error);
      const errMsg = error?.text || error?.message || (typeof error === 'string' ? error : "Unknown error");
      alert(`Failed to send message (${errMsg}). Please try again later or contact us directly.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
      {/* Full Name */}
      <div className="space-y-1 md:space-y-1.5">
        <label htmlFor="name" className="text-[10px] md:text-[11px] font-bold text-brand-navy uppercase tracking-wider block">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. John Doe"
          className="w-full bg-white border border-brand-border px-2 md:px-4 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-sm text-brand-navy placeholder-brand-gray-medium/50 transition-all duration-300 hover:border-brand-blue/40 focus:outline-none focus:border-brand-blue focus:ring-2 md:focus:ring-4 focus:ring-brand-blue/10"
        />
      </div>

      {/* Business Email */}
      <div className="space-y-1 md:space-y-1.5">
        <label htmlFor="email" className="text-[10px] md:text-[11px] font-bold text-brand-navy uppercase tracking-wider block">
          Business Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. john@company.com"
          className="w-full bg-white border border-brand-border px-2 md:px-4 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-sm text-brand-navy placeholder-brand-gray-medium/50 transition-all duration-300 hover:border-brand-blue/40 focus:outline-none focus:border-brand-blue focus:ring-2 md:focus:ring-4 focus:ring-brand-blue/10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {/* Contact Phone */}
        <div className="space-y-1 md:space-y-1.5">
          <label htmlFor="phone" className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">
            Phone Number *
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            className="w-full bg-white border border-brand-border px-2 md:px-4 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-sm text-brand-navy placeholder-brand-gray-medium/50 transition-all duration-300 hover:border-brand-blue/40 focus:outline-none focus:border-brand-blue focus:ring-2 md:focus:ring-4 focus:ring-brand-blue/10"
          />
        </div>
 
        {/* Location */}
        <div className="space-y-1 md:space-y-1.5">
          <label htmlFor="location" className="text-[10px] md:text-[11px] font-bold text-brand-navy uppercase tracking-wider block">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Mumbai, Delhi"
            className="w-full bg-white border border-brand-border px-2 md:px-4 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-sm text-brand-navy placeholder-brand-gray-medium/50 transition-all duration-300 hover:border-brand-blue/40 focus:outline-none focus:border-brand-blue focus:ring-2 md:focus:ring-4 focus:ring-brand-blue/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 md:gap-4">
        {/* What do you need? dropdown */}
        <div className="space-y-1 md:space-y-1.5 relative">
          <label htmlFor="productType" className="text-[10px] md:text-[11px] font-bold text-brand-navy uppercase tracking-wider block">
            What do you need?
          </label>
          
          {/* Dropdown Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setIsProductSelectOpen(!isProductSelectOpen);
              setIsSolutionSelectOpen(false);
            }}
            className="w-full bg-white border border-brand-border px-2 md:px-4 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-sm text-brand-navy focus:outline-none focus:border-brand-blue focus:ring-2 md:focus:ring-4 focus:ring-brand-blue/10 cursor-pointer transition-all duration-300 hover:border-brand-blue/40 text-left flex items-center justify-between"
          >
            <span>{formData.productType}</span>
            <ChevronDown className={`h-4 w-4 text-brand-gray-medium transition-transform duration-300 ${isProductSelectOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Options Menu */}
          {isProductSelectOpen && (
            <>
              {/* Backdrop click to close */}
              <div className="fixed inset-0 z-30" onClick={() => setIsProductSelectOpen(false)} />
              
              {/* Options List container */}
              <ul className="absolute left-0 right-0 z-40 bg-white border border-brand-border rounded-lg md:rounded-xl shadow-lg mt-1 overflow-y-auto max-h-[136px] md:max-h-[148px] scrollbar-thin py-1">
                {productOptions.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, productType: option }));
                        setIsProductSelectOpen(false);
                      }}
                      className={`w-full text-left px-3 md:px-4 py-1.5 text-xs md:text-sm transition-colors cursor-pointer ${
                        formData.productType === option
                          ? "bg-brand-blue-light text-brand-blue font-semibold"
                          : "text-brand-gray-dark hover:bg-brand-gray-light"
                      }`}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Need {productType} for dropdown */}
        <div className="space-y-1 md:space-y-1.5 relative">
          <label htmlFor="solutionType" className="text-[10px] md:text-[11px] font-bold text-brand-navy uppercase tracking-wider block">
            Need {formData.productType} for
          </label>
          
          {/* Dropdown Toggle Button */}
          <button
            type="button"
            onClick={() => {
              setIsSolutionSelectOpen(!isSolutionSelectOpen);
              setIsProductSelectOpen(false);
            }}
            className="w-full bg-white border border-brand-border px-2 md:px-4 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-sm text-brand-navy focus:outline-none focus:border-brand-blue focus:ring-2 md:focus:ring-4 focus:ring-brand-blue/10 cursor-pointer transition-all duration-300 hover:border-brand-blue/40 text-left flex items-center justify-between"
          >
            <span>{formData.solutionType}</span>
            <ChevronDown className={`h-4 w-4 text-brand-gray-medium transition-transform duration-300 ${isSolutionSelectOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Options Menu */}
          {isSolutionSelectOpen && (
            <>
              {/* Backdrop click to close */}
              <div className="fixed inset-0 z-30" onClick={() => setIsSolutionSelectOpen(false)} />
              
              {/* Options List container */}
              <ul className="absolute left-0 right-0 z-40 bg-white border border-brand-border rounded-lg md:rounded-xl shadow-lg mt-1 overflow-y-auto max-h-[136px] md:max-h-[148px] scrollbar-thin py-1">
                {options.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, solutionType: option }));
                        setIsSolutionSelectOpen(false);
                      }}
                      className={`w-full text-left px-3 md:px-4 py-1.5 text-xs md:text-sm transition-colors cursor-pointer ${
                        formData.solutionType === option
                          ? "bg-brand-blue-light text-brand-blue font-semibold"
                          : "text-brand-gray-dark hover:bg-brand-gray-light"
                      }`}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1 md:space-y-1.5">
        <label htmlFor="message" className="text-[10px] md:text-[11px] font-bold text-brand-navy uppercase tracking-wider block">
          Message (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows="3"
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe your environment size, current humidity issues, or desired relative humidity requirements..."
          className="w-full bg-white border border-brand-border px-2 md:px-4 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-sm text-brand-navy placeholder-brand-gray-medium/50 transition-all duration-300 hover:border-brand-blue/40 focus:outline-none focus:border-brand-blue focus:ring-2 md:focus:ring-4 focus:ring-brand-blue/10 resize-y"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="pt-0 md:pt-2">
        <Button
          type="submit"
          variant="primary"
          className="w-full py-0 md:py-3 text-xs md:text-sm uppercase tracking-wider font-base md:font-bold rounded-xl"
          disabled={isSubmitting}
          icon={Send}
        >
          {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
        </Button>
      </div>

      {isSuccess && (
        <p className="md:text-sm text-xs font-semibold text-emerald-600 animate-fade-in-up mt-1 md:mt-3">
          Inquiry Successfully Sent. Thank you!
        </p>
      )}
    </form>
  );
}
