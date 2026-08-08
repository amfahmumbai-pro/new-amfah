"use client";

import { Scaling, Gauge, Droplets, Zap, Move } from "lucide-react";

const SELECTION_STEPS = [
  {
    icon: Scaling,
    title: "Get the correct size",
    desc: "Match daily extraction capacity (L/day) and room airflow coverage directly against your specific indoor moisture requirements.",
  },
  {
    icon: Gauge,
    title: "Identify the ideal humidity level",
    desc: "An in-built digital hygrostat maintains desired 45–50% RH automatically, cycling on/off to optimize climate control and reduce electricity cost.",
  },
  {
    icon: Droplets,
    title: "Know the drainage options",
    desc: "Choose between manual emptying using a removable water tank or continuous pipe/hose drainage for round-the-clock automated extraction.",
  },
  {
    icon: Zap,
    title: "Manage the operating cost",
    desc: "Evaluate compressor power draw alongside moisture removal rate to ensure long-term energy efficiency and lower daily utility expenses.",
  },
  {
    icon: Move,
    title: "Consider the applicability",
    desc: "Heavy-duty multi-directional castors and ergonomic handles make it effortless to relocate units across rooms, basements, or offices.",
  },
];

export default function DehumidifierBuyingGuide() {
  return (
    <div className="space-y-6 flex flex-col justify-between h-full w-full">
      {/* Top Header outside card matching HumidityTrackerCard layout */}
      <div className="space-y-2 sm:min-h-[96px] flex flex-col justify-end">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-navy tracking-tight leading-tight">
          How to choose the right{" "}
          <span className="text-[#1D4ED8] block sm:inline">dehumidifier for you?</span>
        </h2>
        <p className="text-xs md:text-sm text-brand-gray-medium max-w-xl font-sans leading-relaxed">
          Key technical criteria to evaluate before selecting high-efficiency moisture extraction for your space.
        </p>
      </div>

      {/* Main Container Card */}
      <div className=" p-6 sm:p-7 relative overflow-hidden font-sans flex-1 flex flex-col justify-between">
        {/* Ambient background glow */}
        {/* <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" /> */}

        <div className="space-y-1 relative z-10">
          {SELECTION_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group flex items-start gap-3 sm:gap-4 p-2.5 sm:p-3 -mx-2 rounded-2xl transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-[#1D4ED8]">
                  <Icon className="w-10 h-10" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-bold text-slate-900 text-sm sm:text-lg transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
