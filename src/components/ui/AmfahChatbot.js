"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AmfahChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Launcher Button (Shown when chat is closed) */}
      {!isOpen && (
        <div className="fixed bottom-[128px] right-4 md:bottom-[168px] md:right-6 z-50 flex flex-col items-end select-none">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
            className="flex items-center group relative"
          >
            {/* Tooltip */}
            <span className="absolute right-16 bg-brand-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-brand-border/20 font-display">
              Chat with Amfah!
            </span>

            {/* Launcher Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="bg-transparent border-none p-0 cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none"
              aria-label="Open Amfah AI Chatbot"
            >
              <img
                src="/images/chat-bot.png"
                alt="Amfah Chatbot"
                className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md"
              />
            </button>
          </motion.div>
        </div>
      )}

      {/* Floating Chat Window (Shown when chat is open) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 z-[99999] flex flex-col items-end select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mb-2 flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-navy hover:bg-slate-900 text-white text-xs font-semibold rounded-full shadow-2xl transition-all duration-200 hover:scale-105 border border-white/20 cursor-pointer"
              aria-label="Close Chatbot"
            >
              <span>Close Chat</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Chatbot Iframe Window */}
            <div className="w-[344px] md:w-[430px] h-[554px] md:h-[660px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-100px)] overflow-hidden rounded-[20px] shadow-2xl relative bg-white border border-slate-200/50">
              <iframe
                src="https://amfahchatbot.vercel.app"
                title="Amfah Expert Chatbot"
                className="w-[354px] md:w-[442px] h-[556px] md:h-[652px] absolute -top-[8px] -left-[8px] border-none max-w-none max-h-none"
                allow="autoplay"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
