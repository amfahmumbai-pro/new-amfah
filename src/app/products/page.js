import { Suspense } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ProductsCatalog from "@/components/sections/ProductsCatalog";

export const metadata = {
  title: "All Dehumidifiers & Air Quality Products | AMFAH",
  description:
    "Browse every AMFAH dehumidifier, air purifier, humidifier and portable AC. Compare capacity, tank size and coverage area to find the right unit.",
  alternates: {
    canonical: "https://amfah.com/products",
  },
  openGraph: {
    title: "All Dehumidifiers & Air Quality Products | AMFAH",
    description:
      "Browse every AMFAH dehumidifier, air purifier, humidifier and portable AC. Compare capacity, tank size and coverage area to find the right unit.",
    url: "https://amfah.com/products",
    images: [
      {
        url: "/banner/dehumidifiers.jpeg",
        alt: "AMFAH Dehumidifiers Catalog",
      },
    ],
  },
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* Catalog Hero */}
      <section className="relative py-2 md:py-46 overflow-hidden border-b border-brand-border/60">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 blur-[2px]">
          <Image
            src="/banner/dehumidifiers.jpeg"
            alt="Catalog Background"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay to ensure high text contrast */}
          <div className="absolute inset-0 bg-black/30 " />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          {/* <ScrollReveal delay={0.1}>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display bg-white/90 px-3.5 py-1.5 rounded-full border border-brand-blue/15 shadow-sm">
              Equipment Catalog
            </span>
          </ScrollReveal> */}
          <ScrollReveal delay={0.2}>
            <h1 className="font-display font-extrabold sm:text-4xl md:text-5xl text-white leading-tight pt-4 [text-shadow:_0_2px_4px_rgba(0,0,0,0.6),_0_8px_20px_rgba(0,0,0,0.4),_0_20px_40px_rgba(0,0,0,0.3)]">
              Complete Air Treatment Solutions
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-xs md:text-lg font-medium text-white leading-relaxed max-w-xl mx-auto">
              Discover innovative products designed to improve air quality, control humidity, enhance comfort, and create healthier indoor environments.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Catalog Grid Area — client component handles filtering */}
      <Suspense fallback={<div className="py-16 text-center text-brand-gray-medium text-sm">Loading catalog…</div>}>
        <ProductsCatalog />
      </Suspense>
    </div>
  );
}
