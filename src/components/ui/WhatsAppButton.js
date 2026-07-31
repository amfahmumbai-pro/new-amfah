"use client";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const phoneNumber = "919324516326";
  const message = encodeURIComponent("Hello AMFAH, I would like to inquire about your dehumidifiers.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const callUrl = `tel:+919324516326`;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-3 md:gap-4 items-end">
      {/* Phone Call Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center group relative"
      >
        {/* Tooltip */}
        <span className="absolute right-16 bg-brand-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-brand-border/20 font-display">
          Call Us
        </span>

        {/* Call Button */}
        <a
          href={callUrl}
          className="relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 bg-[#1251a0] hover:bg-[#0e3f7c] rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-6"
          aria-label="Call AMFAH Support"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-none stroke-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </motion.div>

      {/* WhatsApp Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center group relative"
      >
        {/* Tooltip */}
        <span className="absolute right-16 bg-brand-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-brand-border/20 font-display">
          Chat with Us
        </span>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 bg-[#25D366] hover:bg-[#20ba59] rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:-rotate-6"
          aria-label="Contact AMFAH on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] md:w-7 md:h-7 fill-white">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.638 1.955 14.162.93 11.536.93c-5.445 0-9.87 4.373-9.874 9.8.001 2.019.541 3.99 1.565 5.739l-.991 3.621 3.712-.974zm10.222-6.551c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
}
