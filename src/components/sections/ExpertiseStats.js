"use client";

import { useEffect, useState, useRef } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";

function Counter({ value, suffix = "", duration = 1200 }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp = null;
    const isDecimal = value.toString().includes(".");
    const decimalPlaces = isDecimal ? value.toString().split(".")[1].length : 0;
    const target = parseFloat(value);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing: easeOutExpo for premium fluid acceleration/deceleration feel
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = easeProgress * target;
      
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, value, duration]);

  const formattedCount = count.toFixed(
    value.toString().includes(".") ? value.toString().split(".")[1].length : 0
  );

  return (
    <span ref={elementRef} className="block font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-brand-accent transition-colors duration-300">
      {formattedCount}{suffix}
    </span>
  );
}

export default function ExpertiseStats() {
  return (
    <section className="py-4 lg:py-10 bg-white">
      <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 md:gap-x-0 max-w-6xl mx-auto text-center">
            <div className="flex flex-col justify-center md:border-r border-brand-border/60 px-4">
              <Counter value={18} suffix="+" duration={1000} />
              <span className="text-[9px] sm:text-[11px] md:text-xs uppercase font-bold tracking-wider text-brand-gray-medium mt-1">Years Expertise</span>
            </div>
            <div className="flex flex-col justify-center md:border-r border-brand-border/60 px-4">
              <Counter value={99.9} suffix="%" duration={1200} />
              <span className="text-[9px] sm:text-[11px] md:text-xs uppercase font-bold tracking-wider text-brand-gray-medium mt-1">Cleanroom Uptime</span>
            </div>
            <div className="flex flex-col justify-center md:border-r border-brand-border/60 px-4">
              <Counter value={45} duration={1400} />
              <span className="text-[9px] sm:text-[11px] md:text-xs uppercase font-bold tracking-wider text-brand-gray-medium mt-1">Plug & Play Models</span>
            </div>
            <div className="flex flex-col justify-center px-4">
              <div className="flex items-start justify-center gap-1 md:gap-1.5">
                <Counter value={60} suffix="K+" duration={1500} />
                <span className="bg-brand-accent/15 text-brand-accent text-[8px] md:text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider whitespace-nowrap mt-1 border border-brand-accent/10">
                  Clients
                </span>
              </div>
              <span className="text-[9px] sm:text-[11px] md:text-xs uppercase font-bold tracking-wider text-brand-gray-medium mt-1">Used By</span>
            </div>
          </div>
      </div>
    </section>
  );
}
