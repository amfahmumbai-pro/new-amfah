import { Suspense } from "react";
import Image from "next/image";
import { Sparkles, Heart, ShieldAlert, Droplets, ShieldCheck, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import AirToWaterCatalog from "@/components/sections/AirToWaterCatalog";
import { products } from "@/data/products";

export const metadata = {
  title: "Atmospheric Water Generators | Air to Water | AMFAH",
  description: "AMFAH air-to-water generators condense clean drinking water from humidity in the air. Capacities for homes, offices and remote sites across India.",
  alternates: {
    canonical: "https://amfah.com/air-to-water",
  },
  openGraph: {
    title: "Atmospheric Water Generators | Air to Water | AMFAH",
    description: "AMFAH air-to-water generators condense clean drinking water from humidity in the air. Capacities for homes, offices and remote sites across India.",
    url: "https://amfah.com/air-to-water",
    images: [
      {
        url: "/Air-To-Water-300-×-206-px.png",
        alt: "Air to Water Generators AMFAH",
      },
    ],
  },
};

export default function AirToWaterPage() {
  // Filter only air to water products
  const waterProducts = products.filter((p) => p.categoryId === "air-to-water");

  const awgBenefits = [
    {
      icon: Droplets,
      title: "Sustainable Water Source",
      desc: "Extracts fresh drinking water directly from the moisture in the air, creating a completely independent and sustainable source.",
    },
    {
      icon: ShieldCheck,
      title: "Hygienic Multi-Stage Purification",
      desc: "Features HEPA, Carbon, RO membrane filtration and continuous UV disinfection loops to keep stored water pathogen-free.",
    },
    {
      icon: Sparkles,
      title: "Mineral-Rich Tasty Water",
      desc: "Automatically adds essential calcium, magnesium, and natural minerals to produce tasty, mineralized alkaline drinking water.",
    },
    {
      icon: Heart,
      title: "Zero Waste & Eco-Friendly",
      desc: "Unlike traditional RO systems that waste liters of water for every liter produced, AWGs create water with zero waste runoff.",
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Category Hero */}
      <section className="relative border-b border-brand-border/60 py-30 md:py-45 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner/air-to-water.jpeg"
            alt="Category Hero Background"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <ScrollReveal delay={0.2}>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight text-white [text-shadow:_0_2px_4px_rgba(0,0,0,0.6),_0_8px_20px_rgba(0,0,0,0.4),_0_20px_40px_rgba(0,0,0,0.3)]">
              Air to Water Generators
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Grid: Products + Benefits */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-20">

          {/* 1. Products Section */}
          <div className="space-y-12">
            <Suspense fallback={<div className="text-center py-12 text-sm font-semibold text-brand-gray-medium">Loading Catalog...</div>}>
              <AirToWaterCatalog initialProducts={waterProducts} />
            </Suspense>
          </div>

          {/* 2. Benefits Grid */}
          <div className="pt-20 border-t border-brand-border/60 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display block">
                Atmospheric Water Generation (AWG)
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy">
                Pure Drinking Water From Thin Air
              </h2>
              <p className="text-sm text-brand-gray-medium">
                AWG technology provides clean, pure water even in locations with contaminated groundwater or dry climates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {awgBenefits.map((b, index) => (
                <ScrollReveal
                  key={b.title}
                  delay={0.1 * index}
                  className="bg-brand-gray-light border border-brand-border p-6 rounded-2xl space-y-4 hover:border-brand-blue/20 transition-colors"
                >
                  <div className="h-10 w-10 bg-brand-blue-light text-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-sm text-brand-navy">
                      {b.title}
                    </h3>
                    <p className="text-xs text-brand-gray-medium leading-relaxed font-semibold">
                      {b.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-16 bg-brand-navy text-white text-center space-y-6">
        <ScrollReveal delay={0.1} className="max-w-xl mx-auto space-y-4 px-6">
          <h3 className="font-display font-bold text-xl sm:text-2xl">
            Want to Know More About Atmospheric Water Generation?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our technology consultants are ready to walk you through water quality standards, daily yield limits, and system installation options.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="secondary" size="md" className="font-bold uppercase tracking-wider text-xs">
              Talk to AWG Expert
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
