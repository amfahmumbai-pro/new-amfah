"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function IndustrialDehumidifierHero() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    setFilter(searchParams.get("filter"));
  }, [searchParams]);

  const isEconomy = filter === "economy";
  const isPremium = filter === "premium";
  const isCeiling = filter === "ceiling";

  const heroImage = isEconomy 
    ? "/banner/inductrail-economy(1).jpeg" 
    : isCeiling 
    ? "/banner/ceiling-dehumidifier(1).jpeg"
    : "/banner/industrial-dehumidifier(2).jpeg";

  return (
    <section className="relative border-b border-brand-border/60 overflow-hidden h-[240px] md:h-[400px] flex flex-col justify-center items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Category Hero Background"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay to ensure high text contrast */}
        <div className="absolute inset-0 bg-black/15" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10 flex flex-col items-center">
        {(isEconomy || isPremium || isCeiling) && (
          <ScrollReveal delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-widest shadow-lg select-none">
              {isEconomy ? "Economy Series" : isPremium ? "Premium Series" : "Ceiling Series"}
            </span>
          </ScrollReveal>
        )}
        <ScrollReveal delay={0.2}>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight text-white [text-shadow:_0_2px_4px_rgba(0,0,0,0.6),_0_8px_20px_rgba(0,0,0,0.4),_0_20px_40px_rgba(0,0,0,0.3)]">
            {isCeiling ? "Ceiling Dehumidifiers" : <>Commercial/Industrial <br /> Dehumidifiers</>}
          </h1>
        </ScrollReveal>
      </div>
    </section>
  );
}
