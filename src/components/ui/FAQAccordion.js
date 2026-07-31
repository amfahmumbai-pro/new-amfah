"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!items.length) return null;

  return (
    <dl className="space-y-4 max-w-3xl mx-auto w-full">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className="border border-brand-border rounded-xl bg-white overflow-hidden transition-all duration-300 hover:border-brand-gray-medium/30"
          >
            <dt>
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-5 text-left font-display font-semibold text-brand-navy hover:text-brand-blue transition-colors duration-200 cursor-pointer"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <span className="ml-4 flex-shrink-0">
                  <ChevronDown
                    className={`h-5 w-5 text-brand-gray-medium transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-blue" : ""
                    }`}
                  />
                </span>
              </button>
            </dt>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <dd className="px-6 pb-6 pt-0 text-brand-gray-dark border-t border-brand-border/40 text-sm leading-relaxed mt-2">
                    <p>{item.a}</p>
                  </dd>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </dl>
  );
}
