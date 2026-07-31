"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "@/components/ui/AppLink";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "INDUSTRIAL DEHUMIDIFIERS",
    subtitle: "Protect Products, Equipment, and Processes from Excess Moisture",
    image: "/banner/14-removebg-preview.png",
    buttonText: "know more",
    buttonLink: "/industrial-dehumidifiers",
    align: "right", // Image left, Text right
  },
  {
    title: "COMMERCIAL DEHUMIDIFIER",
    subtitle: "Control Humidity and Keep Your Business Running at Its Best",
    image: "/banner/banner1.png",
    buttonText: "know more",
    buttonLink: "/commercial-dehumidifiers",
    align: "left", // Text left, Image right
  },
  {
    title: "SMART HOME DEHUMIDIFIERS",
    subtitle: "Protect Your Family from Excess Humidity and Indoor Air Discomfort",
    image: "/banner/home-dehumidifier.png",
    buttonText: "know more",
    buttonLink: "/home-dehumidifiers",
    align: "left", // Text left, Image right
  },
  {
    title: "CEILING DEHUMIDIFIER",
    subtitle: "Save Space While Keeping Your Environment Dry and Comfortable",
    image: "/banner/banner3.png",
    buttonText: "know more",
    buttonLink: "/industrial-dehumidifiers?filter=ceiling",
    align: "right", // Image left, Text right
  },
  {
    type: "advocacy",
    bgImage: "/banner/40to60.jpg",
    text: "Take action and join me in the fight against respiratory infections! Relative humidity of 40-60% in buildings will reduce respiratory infections and save lives.",
    signatureImage: "/banner/dr-taylor-signature.webp",
    signatureAuthor: "Dr. Stephanie Taylor (Harvard Medical School Alumna)"
  }
];

export default function NewHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const resetTimer = () => {
    setResetTrigger((prev) => prev + 1);
  };

  const handleManualNext = () => {
    resetTimer();
    handleNext();
  };

  const handleManualPrev = () => {
    resetTimer();
    handlePrev();
  };

  const handleManualDotClick = (index) => {
    resetTimer();
    handleDotClick(index);
  };

  // Auto-play cycling every 5 seconds
  useEffect(() => {
    if (!isMounted) return;
    if (isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, resetTrigger, isMounted]);

  if (!isMounted) {
    return (
      <section className="relative w-full overflow-hidden bg-brand-gray-light border-b border-brand-border/40">
        {/* Hidden preloader for all slide images to prevent late popping */}
        <div className="hidden" aria-hidden="true">
          {slides.map((slide, idx) => (
            <Image 
              key={`preload-static-${idx}`} 
              src={slide.type === "advocacy" ? slide.bgImage : slide.image} 
              alt="preload" 
              width={10} 
              height={10} 
              priority 
            />
          ))}
        </div>
        <div className="max-w-8xl px-4 md:px-6 lg:px-8 xl:px-12 pt-14 py-6 md:py-8 mx-auto relative min-h-[280px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[500px] flex items-center">
          <div className="w-full grid grid-cols-12 gap-4 lg:gap-0 items-center">
            <div 
              className={`col-span-7 flex flex-col justify-center text-left space-y-2 sm:space-y-4 md:space-y-6 ${
                slides[0].align === "right" 
                  ? "lg:col-span-5 lg:col-start-8 lg:order-2 order-2" 
                  : "lg:col-span-5 lg:order-1 order-1 pl-4"
              }`}
            >
              <h2 className="font-display font-bold text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#1251a0] leading-tight select-none">
                {slides[0].title}
              </h2>
              <p className="font-sans italic text-xs sm:text-base md:text-xl lg:text-2xl text-[#475569]/90 select-none">
                {slides[0].subtitle}
              </p>
              <div className="pt-1 sm:pt-2">
                <Link
                  href={slides[0].buttonLink}
                  prefetch={false}
                  className="inline-block px-4 py-1.5 sm:px-8 sm:py-3 bg-[#d41124] text-white font-sans text-[10px] sm:text-sm font-medium rounded-full shadow-sm hover:bg-[#1251a0] transition-all duration-300"
                >
                  {slides[0].buttonText}
                </Link>
              </div>
            </div>
            <div 
              className={`col-span-5 flex items-center w-full ${
                slides[0].align === "right" 
                  ? "lg:col-span-5 lg:order-1 order-1 justify-start" 
                  : "lg:col-span-5 lg:col-start-8 lg:order-2 order-2 justify-end"
              }`}
            >
              <div className="relative w-full max-w-[170px] sm:max-w-[270px] md:max-w-[390px] lg:max-w-[580px] aspect-[4/3] flex items-center justify-center pointer-events-none select-none">
                <Image
                  src={slides[0].image}
                  alt={slides[0].title}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)]"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Premium animation variants for the sliding banner contents
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-brand-gray-light border-b border-brand-border/40 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden preloader for all slide images to prevent late popping */}
      <div className="hidden" aria-hidden="true">
        {slides.map((slide, idx) => (
          <Image 
            key={`preload-${idx}`} 
            src={slide.type === "advocacy" ? slide.bgImage : slide.image} 
            alt="preload" 
            width={10} 
            height={10} 
            priority 
          />
        ))}
      </div>
      <div className="max-w-8xl px-4 md:px-6 lg:px-8 xl:px-12 pt-10 md:pt-14 py-6 md:py-8 mx-auto relative min-h-[280px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[500px] flex items-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {slides[currentIndex].type === "advocacy" ? (
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid grid-cols-12 gap-4 lg:gap-0 items-center relative"
            >
              <div 
                className="absolute z-0 pointer-events-none select-none w-screen lg:w-[78vw]"
                style={{
                  left: "calc(-50vw + 50%)",
                  top: "-4rem",
                  bottom: "-4rem",
                }}
              >
                <Image
                  src={slides[currentIndex].bgImage}
                  alt="Advocacy Background"
                  fill
                  className="object-cover opacity-85 z-0"
                  style={{ objectPosition: "95% top" }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-gray-light via-brand-gray-light/80 to-transparent z-10" />
              </div>

              {/* Slide Content wrapper to overlay background */}
              <div className="col-span-12 grid grid-cols-12 gap-4 lg:gap-6 items-center relative z-20 w-full">
                {/* Left/Center: Advocacy Text & Signature (shifted left) */}
                <div className="col-span-12 lg:col-span-8 lg:col-start-1 text-center space-y-1 sm:space-y-4 md:space-y-5 px-2 sm:px-4">
                  <h3 className="font-display italic font-medium text-xs sm:text-lg md:text-xl lg:text-2xl text-brand-navy leading-normal sm:leading-relaxed max-w-xl mx-auto select-none">
                    &ldquo;{slides[currentIndex].text}&rdquo;
                  </h3>

                  {/* Signature Area with adjustable layout */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-[50px] sm:w-[140px] h-[20px] sm:h-[45px] mt-0 md:mt-4 mb-0.5 opacity-[0.95]">
                      <Image
                        src={slides[currentIndex].signatureImage}
                        alt="Signature"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-widest text-[#475569] font-display select-none">
                      {slides[currentIndex].signatureAuthor}
                    </span>
                  </div>

                  {/* Research Partner Logo & Text */}
                  <div className="flex flex-col items-center mt-0 md:mt-4 pt-0 md:pt-4 border-t border-[#1251a0]/10 select-none">
                    <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-widest text-[#475569]/90 font-display mb-0 md:mb-1.5">
                      Research Partner
                    </span>
                    <a 
                      href="https://40to60rh.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="relative block hover:scale-105 active:scale-98 transition-all duration-300 pointer-events-auto w-[70px] sm:w-[170px] h-[30px] sm:h-[70px]"
                    >
                      <Image
                        src="/banner/40to60rh-logo.webp"
                        alt="40to60rh Logo"
                        fill
                        className="object-contain"
                      />
                    </a>
                  </div>
                </div>

                {/* Desktop Right: Partners Panel Box Container (Full Height & Edge-to-Edge) */}
                <div 
                  className="hidden lg:flex absolute z-10 bg-slate-50 border-l border-slate-200/80 p-6 flex-col justify-start items-center"
                  style={{
                    width: "22vw",
                    right: "calc(-50vw + 50%)",
                    top: "-4rem",
                    bottom: "-4rem",
                  }}
                >
                  <h3 className="text-xs sm:text-sm font-bold text-[#1251a0] uppercase tracking-wider mb-6 text-center select-none mt-2">
                    Our Partner
                  </h3>
                  <div className="flex flex-col items-center pt-10 flex-grow gap-6 w-full py-4">

                    {/* Partner 2: amfah */}
                    <div className="hover:scale-105 transition-transform duration-300">
                      <div className="relative w-15 sm:w-34 h-7.5 sm:h-24">
                        <Image
                          src="/images/amfah-logo.png"
                          alt="amfah logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile/Tablet Right: Partners Panel Box Container */}
                <div className="col-span-12 lg:hidden bg-slate-50/95 border-t border-slate-200 p-4 rounded-lg flex flex-col justify-start items-center z-10 w-full relative">
                  <h3 className="text-xs font-bold text-[#1251a0] uppercase tracking-wider mb-3 text-center select-none">
                    Our Partner
                  </h3>
                  <div className="flex flex-row items-center justify-center gap-4 flex-wrap w-full py-1">

                    {/* Partner 2: amfah */}
                    <div className="hover:scale-105 transition-transform duration-300">
                      <div className="relative w-[50px] sm:w-[65px] h-[25px] sm:h-[30px]">
                        <Image
                          src="/images/amfah-logo.png"
                          alt="amfah logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid grid-cols-12 gap-4 lg:gap-0 items-center"
            >
              {/* Left-aligned Text Layout or Right-aligned Image Layout */}
              <div 
                className={`col-span-7 flex flex-col justify-center text-left space-y-2 sm:space-y-4 md:space-y-6 ${
                  slides[currentIndex].align === "right" 
                    ? "lg:col-span-5 lg:col-start-8 lg:order-2 order-2" 
                    : "lg:col-span-5 lg:order-1 order-1 pl-4"
                }`}
              >
                <h2 className="font-display font-bold text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#1251a0] leading-tight select-none">
                  {slides[currentIndex].title}
                </h2>
                
                <p className="font-sans italic text-xs sm:text-base md:text-xl lg:text-2xl text-[#475569]/90 select-none">
                  {slides[currentIndex].subtitle}
                </p>
                
                <div className="pt-1 sm:pt-2">
                  <Link
                    href={slides[currentIndex].buttonLink}
                    prefetch={false}
                    className="inline-block px-4 py-1.5 sm:px-8 sm:py-3 bg-[#d41124] text-white font-sans text-[10px] sm:text-sm font-medium rounded-full shadow-sm hover:bg-[#1251a0] active:scale-[0.98] transition-all duration-300"
                  >
                    {slides[currentIndex].buttonText}
                  </Link>
                </div>
              </div>

              {/* Image Showcase Layout */}
              <div 
                className={`col-span-5 flex items-center w-full ${
                  slides[currentIndex].align === "right" 
                    ? "lg:col-span-5 lg:order-1 order-1 justify-start" 
                    : "lg:col-span-5 lg:col-start-8 lg:order-2 order-2 justify-end"
                }`}
              >
                <div className="relative w-full max-w-[170px] sm:max-w-[270px] md:max-w-[390px] lg:max-w-[580px] aspect-[4/3] flex items-center justify-center pointer-events-none select-none">
                  <Image
                    src={slides[currentIndex].image}
                    alt={slides[currentIndex].title}
                    fill
                    priority
                    className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)]"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Manual Arrow Controls (visible on hover/large screens) */}
        <button
          onClick={handleManualPrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/70 hover:bg-white border border-[#e2e8f0]/80 text-[#1251a0] flex items-center justify-center opacity-0 md:group-hover:opacity-100 lg:opacity-100 transition-opacity duration-300 shadow-xs cursor-pointer z-20 hover:scale-105 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          onClick={handleManualNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/70 hover:bg-white border border-[#e2e8f0]/80 text-[#1251a0] flex items-center justify-center opacity-0 md:group-hover:opacity-100 lg:opacity-100 transition-opacity duration-300 shadow-xs cursor-pointer z-20 hover:scale-105 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Pagination Status Indicators Bottom Dot Bar */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center items-center gap-2 sm:gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualDotClick(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === index
                ? "w-4 sm:w-6 bg-[#1251a0]" // Active darker dot
                : "w-1.5 sm:w-2 bg-[#1251a0]/25 hover:bg-[#1251a0]/40" // Inactive lighter dots
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
