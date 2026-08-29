import { Suspense } from "react";
import Image from "next/image";
import { Factory, Wind, Settings, Droplets, CheckCircle, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import IndustrialDehumidifierHero from "@/components/sections/IndustrialDehumidifierHero";
import IndustrialDehumidifierCatalog from "@/components/sections/IndustrialDehumidifierCatalog";
import { products } from "@/data/products";

export const metadata = {
  title: "Industrial & Commercial Dehumidifiers India | AMFAH",
  description: "Heavy duty industrial dehumidifiers up to 480 L/day for factories, warehouses and cleanrooms. Stainless builds, ceiling models, free moisture load audit.",
  alternates: {
    canonical: "https://amfah.com/industrial-dehumidifiers",
  },
  openGraph: {
    title: "Industrial & Commercial Dehumidifiers India | AMFAH",
    description: "Heavy duty industrial dehumidifiers up to 480 L/day for factories, warehouses and cleanrooms. Stainless builds, ceiling models, free moisture load audit.",
    url: "https://amfah.com/industrial-dehumidifiers",
    images: [
      {
        url: "/products/amf-138dmp (2).png",
        alt: "Commercial and Industrial Dehumidifiers AMFAH",
      },
    ],
  },
};

export default async function IndustrialDehumidifiersPage() {
  // Filter only industrial hardware
  const industrialProducts = products.filter((p) => p.categoryId === "industrial");

  const engineeringChecklist = [
    "Integrated or standalone ducted configuration layout capability.",
    "Corrosion-resistant epoxy-coated sheet frames.",
    "BMS telemetry links using Siemens smart PLC controllers.",
    "Eco-friendly R407C or R410A refrigeration coolant.",
    "Hot-gas defrosting logic for sub-zero room stability."
  ];

  const industrialBenefits = [
    {
      icon: ShieldCheck,
      title: "Rust & Corrosion Protection",
      desc: "Stop moisture from rusting your expensive machinery, tools, and metal parts, keeping your equipment running smoothly.",
    },
    {
      icon: Factory,
      title: "Stock & Inventory Safety",
      desc: "Prevent cardboard boxes from collapsing and protect raw materials, paper, food, and medicine from dampness and mold.",
    },
    {
      icon: Wind,
      title: "Healthy & Safe Workplace",
      desc: "Keep floors dry to prevent slips and falls, and stop mold growth to create a clean, healthy workspace for your employees.",
    },
    {
      icon: Droplets,
      title: "Faster Processing & Drying",
      desc: "Speed up drying times for products, coatings, and packaging, helping your business save energy and boost daily output.",
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Category Hero */}
      <Suspense fallback={<div className="h-[250px] bg-brand-gray-light animate-pulse" />}>
        <IndustrialDehumidifierHero />
      </Suspense>

      {/* Main product show layout */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-20">

          {/* 1. Products Catalog Section */}
          <div className="space-y-12">
            <Suspense fallback={<div className="text-center py-12 text-sm font-semibold text-brand-gray-medium">Loading Catalog...</div>}>
              <IndustrialDehumidifierCatalog initialProducts={industrialProducts} />
            </Suspense>
          </div>

          {/* 2. Wellness/Comfort & Process Benefits Grid */}
          <div className="pt-20 border-t border-brand-border/60 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display block">
                Industrial Moisture Control Focus
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy">
                Why Industrial Dehumidification is Vital for Businesses
              </h2>
              <p className="text-sm text-brand-gray-medium font-semibold">
                Controlling humidity is crucial for protecting machinery, maintaining high product quality, ensuring worker safety, and improving overall operational efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {industrialBenefits.map((b, index) => (
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
            Need Help Choosing the Right Industrial Model?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every factory, warehouse, and storage space is different. Talk to our technical experts today to get a free recommendation for your business.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="secondary" size="md" className="font-bold uppercase tracking-wider text-xs">
              Contact an Expert
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* SLA assurance trust panel */}
      {/* <section className="py-12 bg-brand-gray-light border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex gap-3 flex-col md:flex-row items-center">
            <ShieldCheck className="h-8 w-8 text-brand-blue flex-shrink-0" />
            <div>
              <h4 className="font-display font-bold text-xs text-brand-navy uppercase tracking-wider">CE & RoHS Standard</h4>
              <p className="text-[10px] text-brand-gray-medium font-semibold">CE, RoHS certified builds.</p>
            </div>
          </div>
          <div className="flex gap-3 flex-col md:flex-row items-center">
            <Wind className="h-8 w-8 text-brand-blue flex-shrink-0" />
            <div>
              <h4 className="font-display font-bold text-xs text-brand-navy uppercase tracking-wider">Centrifugal Blowers</h4>
              <p className="text-[10px] text-brand-gray-medium font-semibold">High airflow dynamic pressure fans.</p>
            </div>
          </div>
          <div className="flex gap-3 flex-col md:flex-row items-center">
            <Droplets className="h-8 w-8 text-brand-blue flex-shrink-0" />
            <div>
              <h4 className="font-display font-bold text-xs text-brand-navy uppercase tracking-wider">120L - 480L Capacities</h4>
              <p className="text-[10px] text-brand-gray-medium font-semibold">Heavy duty commercial extractors.</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
