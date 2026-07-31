"use client";
import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 24,
  x = 0,
  scale = 1,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Premium ease-out expo curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
