"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const faqData = [
  {
    question: "What is humidity?",
    answer: "Humidity refers to the amount of water vapor present in the air. High humidity levels can make the air feel hot, sticky, and uncomfortable, while promoting mold growth, bacterial spread, dust mites, and structural decay. Controlling relative humidity (RH) is critical for maintaining healthy, comfortable, and safe indoor climates."
  },
  {
    question: "What is a dehumidifier?",
    answer: "A dehumidifier is an advanced climate control appliance designed to extract excess moisture from indoor air. It operates by drawing in damp air, cooling it using refrigeration coils to condense the moisture into water droplets (which drain out safely), and then reheating the air slightly before releasing it back as clean, dry air."
  },
  {
    question: "Why do we need a dehumidifier at home?",
    answer: "Excessive indoor humidity creates breeding grounds for allergens, dust mites, and mold spores. It can cause musty odors, warp luxury wooden flooring, damage walls and paintings, and corrode sensitive home electronics. A home dehumidifier safeguards your family's respiratory health and preserves high-value home assets."
  },
  {
    question: "Why do we need a dehumidifier in industry?",
    answer: "Industrial operations require tight environmental control to guarantee product consistency, prevent expensive machinery corrosion, accelerate drying cycles, and preserve sterile conditions. Industries like pharmaceuticals, food processing, server rooms, packaging, and archives rely on dehumidification to satisfy strict Relative Humidity (% RH) compliance codes."
  },
  {
    question: "How to choose the right dehumidifier?",
    answer: "Selecting the ideal unit depends on parameters like room volume (cubic space), ambient temperatures, initial vs. target humidity, and moisture sources (e.g., ventilation rate or occupant density). Our engineering team performs tailored moisture load calculations to recommend the precise capacity required, ranging from 20L to 480L per day."
  },
  {
    question: "Why to choose AMFAH dehumidifier?",
    answer: "AMFAH is a pioneer in professional dehumidification and indoor air quality solutions. Our systems are engineered with Siemens smart microprocessor PLCs, rust-proof heavy-duty structural builds, and optimized low-temperature defrost control. We back our products with expert site humidity audits, bespoke system design, and dedicated after-sales service."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:py-20 bg-brand-gray-light/40 relative overflow-hidden border-t border-brand-border/60">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-10 md:mb-16">
          <ScrollReveal delay={0.15}>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-navy">
              Got Questions? We Have Answers
            </h2>
          </ScrollReveal>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={0.05 * index} className="w-full">
                <div 
                  className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${
                    isOpen ? "border-brand-blue/40 ring-1 ring-brand-blue/10" : "border-brand-border hover:border-brand-blue/20"
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  {/* Question Header */}
                  <button
                    className="w-full px-3 py-3 flex items-center justify-between text-left gap-4 font-display font-bold text-base md:text-lg text-brand-navy hover:text-brand-blue transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand-gray-light text-brand-navy transition-all duration-300 ${
                      isOpen ? "bg-brand-blue text-white rotate-180" : ""
                    }`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {/* Answer Panel using CSS Grid for smooth height animation */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-3 pb-6 text-sm md:text-base text-brand-gray-medium leading-relaxed border-t border-brand-border/40 pt-4">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
