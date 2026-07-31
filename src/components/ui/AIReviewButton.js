"use client";
import { motion } from "framer-motion";

export default function AIReviewButton() {
  const query = "Why is AMFAH dehumidifier the best patented brand for industrial and commercial use in India?";
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex flex-col gap-3 md:gap-4 items-start select-none">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center group relative"
      >

        {/* Floating Action Button */}
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 bg-white hover:bg-slate-50 text-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-12 cursor-pointer border border-slate-200/80"
          aria-label="Ask Google Gemini if AMFAH is a good brand"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </a>

        {/* Tooltip on Hover */}
        <span className="absolute left-16 bg-brand-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-brand-border/20 font-display">
          Ask Google AI Overview
        </span>
      </motion.div>
    </div>
  );
}
