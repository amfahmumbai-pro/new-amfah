"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function InquiryForm({ productName }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "1",
    message: `Hi, I am interested in obtaining technical pricing and delivery details for the ${productName}. Please get back to me.`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      quantity: "1",
      message: `Hi, I am interested in obtaining technical pricing and delivery details for the ${productName}. Please get back to me.`,
    });
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-fade-in-up">
        <div className="mx-auto h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <h4 className="font-display font-bold text-brand-navy text-lg">
          Inquiry Logged
        </h4>
        <p className="text-xs text-brand-gray-dark leading-relaxed">
          Your request for <strong>{productName}</strong> has been logged. An AMFAH specialist will call/email you within 2 business hours with full pricing.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-brand-gray-light border border-brand-border rounded-2xl p-6 md:p-8 space-y-6">
      <div className="space-y-1">
        <h3 className="font-display font-bold text-lg text-brand-navy">
          Quick Product Inquiry
        </h3>
        <p className="text-xs text-brand-gray-medium">
          Request catalog specs, commercial quotation, or lead times for this model.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Pre-fill Info (Disabled label display) */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider block">
            Selected Equipment
          </label>
          <div className="w-full bg-white border border-brand-border px-3 py-2 rounded-lg text-xs font-semibold text-brand-navy">
            {productName}
          </div>
        </div>

        {/* Contact Name */}
        <div className="space-y-1">
          <label htmlFor="inquiry-name" className="text-[10px] font-bold text-brand-navy uppercase tracking-wider block">
            Full Name *
          </label>
          <input
            type="text"
            id="inquiry-name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-white border border-brand-border px-3 py-2 rounded-lg text-xs text-brand-navy focus:outline-none focus:border-brand-blue"
          />
        </div>

        {/* Contact Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="inquiry-email" className="text-[10px] font-bold text-brand-navy uppercase tracking-wider block">
              Business Email *
            </label>
            <input
              type="email"
              id="inquiry-email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              className="w-full bg-white border border-brand-border px-3 py-2 rounded-lg text-xs text-brand-navy focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="inquiry-phone" className="text-[10px] font-bold text-brand-navy uppercase tracking-wider block">
              Phone Number *
            </label>
            <input
              type="tel"
              id="inquiry-phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full bg-white border border-brand-border px-3 py-2 rounded-lg text-xs text-brand-navy focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="space-y-1">
          <label htmlFor="inquiry-quantity" className="text-[10px] font-bold text-brand-navy uppercase tracking-wider block">
            Estimated Units Required
          </label>
          <select
            id="inquiry-quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full bg-white border border-brand-border px-3 py-2 rounded-lg text-xs text-brand-navy focus:outline-none focus:border-brand-blue cursor-pointer"
          >
            <option value="1">1 Unit</option>
            <option value="2-5">2 - 5 Units</option>
            <option value="6-10">6 - 10 Units</option>
            <option value="10+">More than 10 Units</option>
          </select>
        </div>

        {/* Request Message */}
        <div className="space-y-1">
          <label htmlFor="inquiry-message" className="text-[10px] font-bold text-brand-navy uppercase tracking-wider block">
            Requirement Details
          </label>
          <textarea
            id="inquiry-message"
            name="message"
            rows="3"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-white border border-brand-border px-3 py-2 rounded-lg text-xs text-brand-navy focus:outline-none focus:border-brand-blue resize-none"
          ></textarea>
        </div>

        {/* Action button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="secondary"
            className="w-full text-xs font-bold py-3 uppercase tracking-wider"
            disabled={isSubmitting}
            icon={Send}
          >
            {isSubmitting ? "Sending..." : "Submit Inquiry"}
          </Button>
        </div>
      </form>
    </div>
  );
}
