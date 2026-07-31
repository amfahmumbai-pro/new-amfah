"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // 250ms debounce to avoid flashing the loader on fast transitions
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, 250);
 
    return () => clearTimeout(timer);
  }, []);

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center z-[9999]">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Simple modern spinner */}
        <div className="relative w-12 h-12">
          {/* Inner ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          {/* Active spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-brand-navy border-r-brand-navy border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="font-display font-bold text-xs tracking-widest text-brand-navy uppercase animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
