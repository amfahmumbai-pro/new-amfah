"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroImageSlider() {
  const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000); // Cycle every 4 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Dynamic cross-fade animation parameters
  const fadeVariants = {
    initial: (dir) => ({
      opacity: 0,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.8, ease: "easeInOut" },
        scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: {
        opacity: { duration: 0.6, ease: "easeInOut" },
        scale: { duration: 0.6, ease: "easeInOut" },
      },
    },
  };

  return (
    <div className="relative w-full max-w-md aspect-[3.5/4] bg-white/90 backdrop-blur-xs border border-brand-border rounded-xl overflow-hidden shadow-lg group flex flex-col justify-between">
      {/* Dynamic Image Canvas */}
      <div className="relative w-full flex-grow overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`AMFAH Dehumidifier System Showcase ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 500px"
              priority
            />
          </motion.div>
        </AnimatePresence>


        {/* Manual Arrow Navigations (Visible on hover) */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 hover:bg-white border border-brand-border text-brand-navy flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow cursor-pointer z-10"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 hover:bg-white border border-brand-border text-brand-navy flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow cursor-pointer z-10"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Pagination Status Indicators Bottom Bar */}
      <div className="h-12 bg-white border-t border-brand-border/60 flex items-center justify-between px-6 z-10">
        <span className="text-[10px] font-bold font-display text-brand-gray-medium uppercase tracking-wider">
          AMFAH Installation
        </span>
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? "w-6 bg-brand-accent" // Red accent color for active dot!
                  : "w-2 bg-brand-blue/30" // Blue color for inactive dots!
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
