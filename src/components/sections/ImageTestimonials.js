"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const testimonialImages = [
  {
    id: 1,
    src: "/testimonials/testimonial4.jpg",
    alt: "Client Testimonial Letter 1",
  },
  {
    id: 2,
    src: "/testimonials/testimonial6.jpeg",
    alt: "Client Testimonial Letter 2",
  },
  {
    id: 3,
    src: "/testimonials/testimonial2.jpeg",
    alt: "Client Testimonial Letter 3",
  },
  {
    id: 4,
    src: "/testimonials/testimonial1.jpeg",
    alt: "Client Testimonial Letter 4",
  },
  {
    id: 5,
    src: "/testimonials/testimonial5.jpeg",
    alt: "Client Testimonial Letter 5",
  },
  {
    id: 6,
    src: "/testimonials/testimonial3.jpeg",
    alt: "Client Testimonial Letter 6",
  },
];

export default function ImageTestimonials() {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : testimonialImages.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev < testimonialImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-12 bg-brand-gray-light border-t border-brand-border/60 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:2rem_2rem] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <ScrollReveal delay={0.05} y={15}>
            <div className="inline-flex items-center gap-2 bg-[#edf2f7] px-4.5 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
              <span className="text-[10px] md:text-[20px] font-black text-brand-navy uppercase tracking-widest font-display flex items-center gap-1.5">
                💬 TESTIMONIALS
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} y={15}>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-brand-navy uppercase tracking-tight leading-tight">
              Client Appreciation & Letters
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.15} y={15}>
            <p className="text-sm md:text-base text-brand-gray-medium max-w-xl mx-auto leading-relaxed">
              Read verified recommendation letters and notes shared directly by our residential and industrial clients.
            </p>
          </ScrollReveal>
        </div>

        {/* Carousel Container */}
        <div className="relative px-2 sm:px-6">
          
          {/* Scrollable Row */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 no-scrollbar scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {testimonialImages.map((img, index) => (
              <div 
                key={img.id}
                className="snap-start shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-always"
              >
                <div
                  onClick={() => setActiveIndex(index)}
                  className="group relative bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/35 transition-all duration-500 cursor-pointer flex flex-col p-4 h-full"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[3/4] w-full bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-brand-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md text-brand-navy transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Caption */}
                  <div className="pt-4 pb-2 text-center mt-auto">
                    <span className="font-display font-semibold text-xs tracking-wider text-brand-gray-medium uppercase block group-hover:text-brand-blue transition-colors duration-300">
                      Click to enlarge letter
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-8 h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-20 cursor-pointer ${
              canScrollLeft
                ? "bg-[#82C82B] text-white hover:bg-[#71B024] hover:scale-105 active:scale-95"
                : "bg-slate-100 text-slate-300 cursor-not-allowed opacity-30"
            }`}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-8 h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-20 cursor-pointer border border-slate-200 ${
              canScrollRight
                ? "bg-white text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95"
                : "bg-slate-100 text-slate-300 cursor-not-allowed opacity-30"
            }`}
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal with navigation */}
      {activeIndex !== null && (
        <div 
          className="fixed inset-0 bg-brand-navy/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in-up"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close button */}
          <button 
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200 z-50 shadow-lg cursor-pointer"
            aria-label="Close image viewer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox Navigation Left */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-all duration-200 z-50 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous testimonial image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Lightbox Navigation Right */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-all duration-200 z-50 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next testimonial image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          
          {/* Modal Container */}
          <div 
            className="relative w-full max-w-4xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden">
              <Image
                src={testimonialImages[activeIndex].src}
                alt={testimonialImages[activeIndex].alt}
                fill
                className="object-contain p-2"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
