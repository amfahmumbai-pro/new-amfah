"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const reviews = [
  {
    id: 1,
    name: "Arpit",
    role: "1 review ",
    time: "1 week ago",
    stars: 5,
    text: "Really impressed with Amfah and this dehumidifier. I bought it because my room used to feel very humid especially during rainy weather and at night. After using it for a few days I could genuinely feel the difference. The air feels fresher the room feels more comfortable and there’s much less dampness now. It also collects a surprising amount of moisture which shows that it’s working properly. The machine is easy to use not too noisy and doesn’t take up much space in the room. Overall I’m very happy with this purchase and would definitely recommend it to anyone dealing with humidity issues"
  },
  {
    id: 2,
    name: "Kaushik Naarayan",
    role: "Local Guide · 26 reviews · 10 photos",
    time: "7 months ago",
    stars: 5,
    text: "It's built as a fully indoor AC compressor. It's small form factor, build quality and power to size ratio is amazing. The cooling is immediately felt. Im using in BLR for a small server room so cooling load isn't much. I would assume it works decently well in South Indian weather for small rooms with less light coming in. Recommend buying an electronic stabilizer to go with it."
  },
  {
    id: 3,
    name: "Melroy Dias",
    role: "Local Guide · 18 reviews · 148 photos",
    time: "10 months ago",
    stars: 5,
    text: "I'm loving my AMFAH 1.5 Ton Portable Air Conditioner! It's a game-changer for my home. The 4-in-1 design is so versatile, and the energy efficiency is impressive. The fast cooling feature is amazing, and the adjustable vents make it perfect for customized comfort. Highly recommend! 🌟👍❄️"
  },
  {
    id: 4,
    name: "Indiangas Technicalco.",
    role: "Local Guide · 1 review · 7 photos",
    time: "10 months ago",
    stars: 5,
    text: "Amazing product, Easy-to-use remote with all essential features"
  },
  {
    id: 5,
    name: "Amish Patel",
    role: "Local Guide · 10 reviews · 8 photos",
    time: "2 months ago",
    stars: 5,
    text: "Really excellent good combo purifier with dehumidifier. Feel really difference at home. I am using from past 3 months. Works excellent."
  },
  {
    id: 6,
    name: "Nitesh Patil",
    role: "1 review · 9 years ago",
    stars: 5,
    text: "They have best in class Portable Air Conditioner, especially for ppl who live in rented accommodation. As these unit doesn't need installation as conventional AC units. Loved it.."
  }
];

export default function ReviewCarousel() {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
      // Run once on mount
      checkScroll();
      // Run on resize
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

  // Helper to get initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper for unique profile background gradients matching high-end design
  const getAvatarBg = (id) => {
    const gradients = [
      "bg-gradient-to-tr from-brand-navy to-brand-navy-light text-white",
      "bg-gradient-to-tr from-blue-600 to-indigo-400 text-white",
      "bg-gradient-to-tr from-brand-accent to-red-400 text-white",
      "bg-gradient-to-tr from-emerald-600 to-teal-400 text-white",
      "bg-gradient-to-tr from-amber-600 to-yellow-400 text-white",
    ];
    return gradients[(id - 1) % gradients.length];
  };

  return (
    <section className="py-12 bg-white border-y border-brand-border/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        {/* Testimonials Header (Exact Screenshot layout styled beautifully) */}
        <div className="flex flex-col items-center text-center mb-10 space-y-4">
          <ScrollReveal delay={0.05} y={15}>
            <div className="inline-flex items-center gap-2 bg-[#edf2f7] px-4.5 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
              <span className="text-[10px] md:text-[20px] font-black text-brand-navy uppercase tracking-widest font-display flex items-center gap-1.5">
                🌟 Google Reviews
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} y={15}>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-brand-navy uppercase tracking-tight leading-tight">
              WHAT OUR CUSTOMERS SAY
            </h2>
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
            {reviews.map((review) => (
              <div
                key={review.id}
                className="snap-start shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-always"
              >
                <a
                  href="https://www.google.com/search?q=amfah&rlz=1C1VDKB_enIN1025IN1025&oq=amfah+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg7MgYIAhBFGDwyBggDEEUYPDIGCAQQRRg80gEINDcwM2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x3be7b641ac65a83d:0x5e8a791c65436df4,1,,,,"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full flex flex-col justify-between p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-blue/15 transition-all duration-500 relative group overflow-hidden no-underline cursor-pointer"
                >
                  
                  {/* Subtle top bar glow on card hover */}
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-brand-blue/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(review.stars)].map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400 shrink-0" />
                      ))}
                    </div>

                    {/* Text */}
                    <div className="space-y-2">
                      {review.title && (
                        <h4 className="font-display font-bold text-base text-brand-navy leading-tight">
                          {review.title}
                        </h4>
                      )}
                      <p className="text-sm text-brand-gray-dark font-sans italic leading-relaxed text-slate-600">
                        &ldquo;{review.text}&ldquo;
                      </p>
                    </div>
                  </div>

                  {/* Profile Bottom Row */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className={`h-11 w-11 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0 shadow-sm ${getAvatarBg(review.id)}`}>
                        {getInitials(review.name)}
                      </div>
                      
                      {/* Name & Subtitle */}
                      <div className="min-w-0">
                        <h5 className="font-display font-bold text-sm text-brand-navy truncate">
                          {review.name}
                        </h5>
                        <p className="text-[10px] text-brand-gray-medium font-semibold truncate leading-tight mt-0.5">
                          {review.role}
                        </p>
                        <p className="text-[9px] text-brand-gray-medium/60 font-semibold mt-0.5 uppercase tracking-wider">
                          {review.time}
                        </p>
                      </div>
                    </div>

                    {/* Google Logo */}
                    <div className="h-6 w-6 shrink-0 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
                      <svg viewBox="0 0 24 24" className="h-4 w-4">
                        <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.245-3.12A12.9 12.9 0 0 0 12.24 0C5.466 0 0 5.37 0 12s5.466 12 12.24 12c7.054 0 11.75-4.887 11.75-11.76 0-.79-.086-1.396-.19-1.955H12.24z"/>
                      </svg>
                    </div>
                  </div>

                </a>
              </div>
            ))}
          </div>

          {/* Navigation Arrows (Screenshot style floating at sides) */}
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
    </section>
  );
}
