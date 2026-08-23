"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/components/ui/AppLink";
import {
  ChevronDown,
  Monitor,
  VolumeX,
  Clock,
  Zap,
  RotateCcw,
  Sparkles,
  Lock,
  Move,
  ShieldCheck,
  Phone,
  MessageSquareCode,
  ArrowRight,
  CheckCircle2,
  Table as TableIcon,
  Wrench,
  Droplets,
  Home,
  Check,
  Cpu,
  Layers,
  Sparkle
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  whatIsDehumidifier,
  whyNeedDehumidifier,
  whereToUseDehumidifier,
  howRefrigerantDehumidifierWorks,
  sizingTable,
  sizingGuide,
  howToUseRightWay,
  keyFeaturesToLookFor,
  maintenanceSchedule,
  cleaningGuide,
  generalFaqs,
} from "@/data/faqs";

export default function FAQContent() {
  // Accordion states - tracks single active open index
  const [openWhyIndex, setOpenWhyIndex] = useState(0);
  const [openWhereIndex, setOpenWhereIndex] = useState(0);
  const [openHowToUseIndex, setOpenHowToUseIndex] = useState(0);

  const toggleWhy = (index) => {
    setOpenWhyIndex((prev) => (prev === index ? null : index));
  };

  const toggleWhere = (index) => {
    setOpenWhereIndex((prev) => (prev === index ? null : index));
  };

  const toggleHowToUse = (index) => {
    setOpenHowToUseIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-white text-slate-700 font-sans antialiased">

      {/* 1. SECTION 1: WHAT IS AN INDOOR AIR DEHUMIDIFIER? */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left Product Card with Ambient Glow */}
          <ScrollReveal delay={0.1}>
            <div className="bg-gradient-to-tr from-[#ebf3fc] via-[#f0f7ff] to-white rounded-2xl p-8 md:p-14 flex items-center justify-center min-h-[360px] md:min-h-[480px] relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#1251a0]/15 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#d41124]/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

              <div className="relative w-64 h-72 md:w-80 md:h-100 z-10">
                <Image
                  src="/products/aquaria-s1-16p.png"
                  alt="AMFAH High-Efficiency Dehumidifier"
                  fill
                  className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right Text */}
          <ScrollReveal delay={0.2} className="space-y-6">


            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-[1.15]">
              What is an indoor air <span className="text-[#1251a0]">dehumidifier?</span>
            </h1>

            <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed font-normal">
              <p className="font-medium text-slate-800">
                {whatIsDehumidifier.paragraphs[0]}
              </p>
              <p>
                {whatIsDehumidifier.paragraphs[1]}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/home-dehumidifiers"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1251a0] hover:bg-[#0e3f7c] text-white font-display font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Explore Home Dehumidifiers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919004663226?text=Hi%20AMFAH%20team,%20I'd%20like%20to%20learn%20more%20about%20your%20dehumidifiers."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-display font-semibold text-sm transition-all"
              >
                <MessageSquareCode className="w-4 h-4 text-emerald-600" />
                <span>Ask an Engineer on WhatsApp</span>
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 2. SECTION 2: WHY DO YOU NEED A DEHUMIDIFIER IN YOUR HOME? */}
      <section className="py-12 md:py-20 bg-slate-50/70 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="gap-10 lg:gap-14 items-start">

            {/* Left: Accordion List with Colored Accents */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal delay={0.1}>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-2">
                  Why do you need a dehumidifier <span className="text-[#1251a0]">in your home?</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  {whyNeedDehumidifier.subtitle}
                </p>
              </ScrollReveal>

              <div className="divide-y divide-slate-200 border-t border-b border-slate-200 bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-slate-200">
                {whyNeedDehumidifier.items.map((item, index) => {
                  const isOpen = openWhyIndex === index;
                  return (
                    <div key={index} className="py-4 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => toggleWhy(index)}
                        className="w-full flex items-center justify-between text-left font-display font-bold text-base md:text-lg text-slate-900 hover:text-[#1251a0] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-[#ebf3fc] text-[#1251a0] font-display font-extrabold text-xs flex items-center justify-center shrink-0">
                            {item.number}
                          </span>
                          <span>{item.title}</span>
                        </div>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-base transition-colors shrink-0 ml-3 ${isOpen ? "bg-[#1251a0] text-white" : "bg-slate-100 text-slate-700 group-hover:bg-[#1251a0] group-hover:text-white"
                          }`}>
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="mt-3 pl-10 space-y-2">
                          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                            {item.content}
                          </p>
                          <span className="inline-block text-[11px] font-bold text-[#1251a0] bg-[#ebf3fc] px-2.5 py-0.5 rounded-md">
                            ✓ {item.tag}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Room Interior Photo with Badge */}
            {/* <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] lg:h-[640px] rounded-3xl overflow-hidden shadow-md border border-slate-200">
              <Image
                src="/blogs/living_room.jpg"
                alt="Protected home interior with AMFAH dehumidification"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 shadow-md">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-[#1251a0]">
                  Preserve What Matters Most
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  AMFAH keeps indoor relative humidity safely regulated between <strong>40%–50% RH</strong> to protect your home.
                </p>
              </div>
            </div> */}

          </div>
        </div>
      </section>

      {/* 3. SECTION 3: WHERE SHOULD YOU PLACE A DEHUMIDIFIER? */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left: Living Room Image */}
          <div className="lg:col-span-6 relative h-[380px] sm:h-[460px] lg:h-[540px] rounded-3xl overflow-hidden shadow-md border border-slate-200">
            <Image
              src="/blogs/portable-dehumidifier.jpg"
              alt="Multi-room dehumidifier application"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Accordion with Location Chips */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-2">
                Where should you place <span className="text-[#1251a0]">a dehumidifier?</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {whereToUseDehumidifier.subtitle}
              </p>
            </ScrollReveal>

            <div className="divide-y divide-slate-200 border-t border-b border-slate-200 bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-slate-200">
              {whereToUseDehumidifier.items.map((item, index) => {
                const isOpen = openWhereIndex === index;
                return (
                  <div key={index} className="py-4 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => toggleWhere(index)}
                      className="w-full flex items-center justify-between text-left font-display font-bold text-base md:text-lg text-slate-900 hover:text-[#1251a0] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-800 font-display font-extrabold text-xs flex items-center justify-center shrink-0">
                          {item.number}
                        </span>
                        <span>{item.title}</span>
                      </div>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-base transition-colors shrink-0 ml-3 ${isOpen ? "bg-[#1251a0] text-white" : "bg-slate-100 text-slate-700 group-hover:bg-[#1251a0] group-hover:text-white"
                        }`}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="mt-3 pl-10 space-y-2">
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                          {item.content}
                        </p>
                        <span className="inline-block text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md">
                          ✓ {item.highlight}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 4. SECTION 4: HOW DOES A REFRIGERANT DEHUMIDIFIER WORK? */}
      <section className="py-12 md:py-20 bg-slate-50/70 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Steps with Colorful Stage Badges */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal delay={0.1}>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-2">
                  How does a refrigerant <span className="text-[#1251a0]">dehumidifier work?</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  {howRefrigerantDehumidifierWorks.subtitle}
                </p>
              </ScrollReveal>

              <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed">
                {howRefrigerantDehumidifierWorks.steps.map((st) => (
                  <div
                    key={st.step}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1 hover:border-[#1251a0]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-slate-900 text-sm">
                        Step {st.step}: {st.title}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#ebf3fc] text-[#1251a0] border border-[#1251a0]/20">
                        {st.component}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Diagram Card with AMFAH Image */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-center font-display font-bold text-lg sm:text-xl text-slate-900 mb-6 uppercase tracking-wider">
                Working of an AMFAH Dehumidifier
              </h3>

              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center bg-slate-50">
                <Image
                  src="/images/dehumidifier-works.jpg"
                  alt="Working of an AMFAH Dehumidifier Diagram"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SECTION 5: HOW TO ASSESS THE RIGHT DEHUMIDIFIER SIZE? */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Family Image */}
          <div className="lg:col-span-6 relative h-[380px] sm:h-[460px] lg:h-[540px] rounded-3xl overflow-hidden shadow-md border border-slate-200">
            <Image
              src="/blogs/luxury_hotel_suite.jpg"
              alt="Choose the right dehumidifier for your home"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Sizing Text */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-2">
                How to choose the right dehumidifier size for <span className="text-[#1251a0]">your room or space?</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {sizingGuide.subtitle}
              </p>
            </ScrollReveal>

            <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
              {sizingGuide.factors.map((fc) => (
                <div
                  key={fc.number}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-[#1251a0]/30 transition-colors"
                >
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#1251a0] text-white text-xs flex items-center justify-center font-display font-bold">
                      {fc.number}
                    </span>
                    {fc.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm pl-9">
                    {fc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. SECTION 6: DEHUMIDIFIER CAPACITY SIZING MATRIX */}
      <section className="py-12 md:py-20 bg-slate-50/70 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">

          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight">
              Dehumidifier <span className="text-[#1251a0]">Capacity Sizing Matrix</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {sizingTable.subtitle}
            </p>
          </div>

          <div className="border border-slate-300 rounded-2xl overflow-hidden shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-[#0f1f3d] text-white font-display font-bold">
                    <th className="p-4 sm:p-5 border-r border-slate-800 min-w-[200px]">Condition of the Space</th>
                    <th className="p-4 sm:p-5 border-r border-slate-800 text-center">Upto 200 sq ft</th>
                    <th className="p-4 sm:p-5 border-r border-slate-800 text-center">Upto 350 sq ft</th>
                    <th className="p-4 sm:p-5 border-r border-slate-800 text-center">Upto 500 sq ft</th>
                    <th className="p-4 sm:p-5 text-center">Upto 800+ sq ft</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {sizingTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#ebf3fc]/40 transition-colors">
                      <td className="p-4 sm:p-5 font-display font-bold text-slate-900 border-r border-slate-200 bg-slate-50/70">
                        <div className="flex items-center gap-2">
                          <span>{row.condition}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${row.badgeColor}`}>
                            {row.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-normal mt-0.5 font-sans">{row.desc}</p>
                      </td>
                      {row.values.map((val, vIdx) => (
                        <td
                          key={vIdx}
                          className="p-4 sm:p-5 border-r last:border-r-0 border-slate-200 text-center font-bold text-[#1251a0]"
                        >
                          <span className="inline-block px-3 py-1 rounded-lg bg-blue-50/80 border border-blue-200/60">
                            {val}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 7. SECTION 7: OPERATING YOUR DEHUMIDIFIER FOR MAXIMUM EFFICIENCY */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-6">
          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-2">
              How to operate your dehumidifier for <span className="text-[#1251a0]">maximum efficiency</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {howToUseRightWay.subtitle}
            </p>
          </ScrollReveal>

          <div className="divide-y divide-slate-200 border-t border-b border-slate-200 bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-slate-200">
            {howToUseRightWay.steps.map((st, index) => {
              const isOpen = openHowToUseIndex === index;
              return (
                <div key={index} className="py-4 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => toggleHowToUse(index)}
                    className="w-full flex items-center justify-between text-left font-display font-bold text-base md:text-lg text-slate-900 hover:text-[#1251a0] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 font-display font-extrabold text-xs flex items-center justify-center shrink-0">
                        {st.step}
                      </span>
                      <span>{st.title}</span>
                    </div>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-base transition-colors shrink-0 ml-3 ${isOpen ? "bg-[#1251a0] text-white" : "bg-slate-100 text-slate-700 group-hover:bg-[#1251a0] group-hover:text-white"
                      }`}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-3 pl-10">
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                        {st.content}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. SECTION 8: ESSENTIAL FEATURES TO CONSIDER IN A HIGH-PERFORMANCE DEHUMIDIFIER */}
      <section className="py-12 md:py-20 bg-slate-50/70 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left: Slate Midnight Gradient Card with Amber Accents */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0f1f3d] via-[#1251a0] to-[#0f1f3d] rounded-3xl p-8 sm:p-10 text-white space-y-8 shadow-xl relative overflow-hidden">
              <div className="space-y-6">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-amber-400">
                  Engineering Innovations
                </span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-none text-white">
                  Key Features.
                </h3>

                <div className="space-y-3 font-display font-semibold text-sm sm:text-base text-slate-100">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-amber-300 shrink-0" />
                    <span>Digital Humidistat</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-5 h-5 text-amber-300 shrink-0" />
                    <span>Silent Night Mode</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-300 shrink-0" />
                    <span>Programmable 24h Timer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-amber-300 shrink-0" />
                    <span>High Energy Efficiency</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-amber-300 shrink-0" />
                    <span>Auto-Restart Memory</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
                    <span>Dual Air Cleansing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-amber-300 shrink-0" />
                    <span>Child Safety Lock</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Move className="w-5 h-5 text-amber-300 shrink-0" />
                    <span>360° Caster Wheels</span>
                  </div>
                </div>
              </div>

              {/* Dehumidifier visual at bottom */}
              <div className="relative w-48 h-56 mx-auto pt-2">
                <Image
                  src="/products/aquaria-s1-16p.png"
                  alt="AMFAH Dehumidifier Key Features"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right: Numbered Feature List with Colored Numbers */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal delay={0.1}>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-2">
                  Essential features to consider in a <span className="text-[#1251a0]">high-performance dehumidifier</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  {keyFeaturesToLookFor.subtitle}
                </p>
              </ScrollReveal>

              <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                {keyFeaturesToLookFor.features.map((feat) => (
                  <div
                    key={feat.number}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-[#1251a0]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 font-display">
                        {feat.number}. {feat.name}
                      </strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ebf3fc] text-[#1251a0]">
                        {feat.highlight}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. SECTION 9: MAINTENANCE FREQUENCY & CARE GUIDELINES */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="gap-10 lg:gap-14 items-center">

          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-2">
                Dehumidifier maintenance frequency and <span className="text-[#1251a0]">care guidelines</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {maintenanceSchedule.subtitle}
              </p>
            </ScrollReveal>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {maintenanceSchedule.points.map((pt) => (
                <div key={pt.number} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-display">
                    {pt.number}. {pt.title}
                  </strong>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {pt.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          {/* <div className="hidden md:block lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-8 flex items-center justify-center min-h-[500px]">
            <div className="relative w-64 h-72 md:w-72 md:h-90">
              <Image
                src="/banner/home-dehumidifier.png"
                alt="AMFAH dehumidifier maintenance and user care"
                fill
                className="object-cover"
              />
            </div>
          </div> */}

        </div>
      </section>

      {/* 10. SECTION 10: HOW TO CLEAN AND MAINTAIN YOUR DEHUMIDIFIER PROPERLY */}
      <section className="py-12 md:py-20 bg-slate-50/70 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Cleaning Card */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center relative min-h-[380px] md:min-h-[440px] shadow-sm">
              <div className="relative w-64 h-72 md:w-80 md:h-88">
                <Image
                  src="/products/aquaria-s1-16p.png"
                  alt="Cleaning an AMFAH dehumidifier"
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>
            </div>

            {/* Right Cleaning Steps */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1251a0] font-display font-bold text-xs uppercase tracking-wider">
                  <span>Step-by-Step Procedure</span>
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight mt-2">
                  How to clean and maintain your <span className="text-[#1251a0]">dehumidifier properly</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  {cleaningGuide.subtitle}
                </p>
              </ScrollReveal>

              <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed">
                {cleaningGuide.steps.map((st) => (
                  <div key={st.step} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <p>
                      <strong className="text-slate-900 font-display">Step {st.step} : {st.title}</strong> — {st.desc}
                    </p>
                  </div>
                ))}
                <p className="pt-2 text-xs sm:text-sm text-slate-500 italic">
                  Please note: {cleaningGuide.serviceNote}
                </p>
              </div>

              {/* AMFAH Contact Card with Styled Elements */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 text-xs sm:text-sm text-slate-700">
                <p className="font-display font-bold text-slate-900 text-sm sm:text-base">
                  Need personalized assistance? Reach out to our technical team:
                </p>
                <div className="space-y-1.5 text-slate-700 pt-1">
                  <p>
                    <strong className="text-slate-900 font-display">Sales & Sizing Consultations:</strong>{" "}
                    <a href="tel:02240107074" className="text-[#1251a0] hover:underline font-bold">022 40-107-074</a>
                    {" / "}
                    <a href="tel:+919321991812" className="text-[#1251a0] hover:underline font-bold">+91 93219 91812</a>
                    {" or email us at "}
                    <a href="mailto:info@amfah.com" className="text-[#1251a0] underline font-bold">info@amfah.com</a>
                  </p>
                  <p>
                    <strong className="text-slate-900 font-display">Service & Support Help Desk:</strong>{" "}
                    <a href="tel:02240107074" className="text-[#1251a0] hover:underline font-bold">022 40-107-074</a>
                    {" / "}
                    <a href="https://wa.me/919004663226" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold hover:underline">
                      WhatsApp +91 90046 63226
                    </a>
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 11. FOOTER CTA BAR */}
      <section className="py-12 bg-[#0f1f3d] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">Have more questions about our dehumidifiers?</h3>
            <p className="text-slate-300 text-sm">Our air quality engineers are here to assist with capacity calculations and technical guidance.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://wa.me/919004663226?text=Hi%20AMFAH%20team,%20I%20have%20a%20question%20about%20your%20dehumidifiers."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-display font-semibold text-sm transition-all shadow-md"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/40 hover:bg-white/10 text-white font-display font-semibold text-sm transition-all"
            >
              <span>Contact Us Form</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
