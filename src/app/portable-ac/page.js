import { Suspense } from "react";
import Image from "next/image";
import { Snowflake, Sparkles, Droplets, Wind, ShieldCheck, Heart } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import PortableACCatalog from "@/components/sections/PortableACCatalog";
import { products } from "@/data/products";

export const metadata = {
  title: "Premium Portable Air Conditioners | High-Efficiency 1.5 Ton Cooling",
  description: "Browse AMFAH's range of high-efficiency portable air conditioners. Ideal for bedrooms, server rooms, retail shops, and offices.",
};

export default function PortableACPage() {
  // Filter only portable-ac products
  const acProducts = products.filter((p) => p.categoryId === "portable-ac");

  const benefits = [
    {
      icon: Snowflake,
      title: "Rapid Room Cooling",
      desc: "Delivers powerful 1.5 Ton cooling capacity, rapidly lowering ambient temperature in areas up to 120 sq ft.",
    },
    {
      icon: Wind,
      title: "No-Drip Self-Evaporating",
      desc: "Uses an auto-evaporation system to recycle condensed water, cooling the coils and venting moisture out through the exhaust duct.",
    },
    {
      icon: Droplets,
      title: "Dehumidifier Action",
      desc: "Includes a dedicated dehumidifying mode to extract moisture and suppress sticky humidity during muggy summer seasons.",
    },
    {
      icon: Sparkles,
      title: "Plug & Play Portability",
      desc: "Features rolling caster wheels and an easy-to-install window exhaust slider kit, requiring no permanent masonry wall cuts.",
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      <section className="relative border-b border-brand-border/60 py-20 md:py-45 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Background Image */}
          <div className="hidden sm:block absolute inset-0">
            <Image
              src="/banner/portable-ac.jpeg"
              alt="Category Hero Background"
              fill
              priority
              className="object-cover"
            />
          </div>
          {/* Mobile Background Image */}
          <div className="block sm:hidden absolute inset-0">
            <Image
              src="/banner/portable-ac-mobile.jpeg"
              alt="Category Hero Background Mobile"
              fill
              priority
              className="object-cover"
            />
          </div>
          {/* Overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <ScrollReveal delay={0.2}>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight text-white uppercase [text-shadow:_0_2px_4px_rgba(0,0,0,0.6),_0_8px_20px_rgba(0,0,0,0.4),_0_20px_40px_rgba(0,0,0,0.3)]">
              Portable Air <br /> Conditioners
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
              <PortableACCatalog initialProducts={acProducts} />
            </Suspense>
          </div>

          {/* 2. Wellness/Comfort Benefits Grid */}
          <div className="pt-20 border-t border-brand-border/60 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display block">
                Climate Engineering
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy">
                Why Choose AMFAH Portable ACs?
              </h2>
              <p className="text-sm text-brand-gray-medium">
                Our portable air conditioning systems offer versatile cooling and active relative humidity control without permanent structural installation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b, index) => (
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
            Need Sizing Advice for Your Space?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our refrigeration engineers are online to evaluate room heat loads, window formats, and match the correct portable cooling model for your premises.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="secondary" size="md" className="font-bold uppercase tracking-wider text-xs">
              Talk to Cooling Expert
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
