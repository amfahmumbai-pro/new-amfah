import { Suspense } from "react";
import Image from "next/image";
import { Sparkles, Heart, ShieldAlert, Droplets, ShieldCheck, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import HumidifierCatalog from "@/components/sections/HumidifierCatalog";
import { products } from "@/data/products";

export const metadata = {
  title: "Premium Ultrasonic Humidifiers | Target Moisture Output Systems",
  description: "Browse AMFAH's ultrasonic cool mist humidifiers designed for nurseries, living rooms, cleanrooms, and wooden interiors.",
};

export default function HumidifiersPage() {
  // Filter only humidifier products
  const humidifierProducts = products.filter((p) => p.categoryId === "humidifier");

  const benefits = [
    {
      icon: Heart,
      title: "Respiratory & Skin Health",
      desc: "Adds soothing moisture to dry indoor air, alleviating congestion, dry coughs, irritated sinuses, and dry itchy skin.",
    },
    {
      icon: ShieldAlert,
      title: "Nursery & Baby Comfort",
      desc: "Ensures babies and young children sleep soundly by maintaining optimal humidity, helping clear nasal passages.",
    },
    {
      icon: Sparkles,
      title: "Wood & Instrument Protection",
      desc: "Prevents expensive hardwood floors, wooden furniture, and musical instruments from cracking or warping due to dry air.",
    },
    {
      icon: Droplets,
      title: "Electrostatic Discharge Control",
      desc: "Reduces static electricity buildup in dry room climates, protecting delicate electronics and server systems.",
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Category Hero */}
      <section className="relative border-b border-brand-border/60 py-20 md:py-45 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner/humidifier.jpeg"
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
               Ultrasonic Humidifiers
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
              <HumidifierCatalog initialProducts={humidifierProducts} />
            </Suspense>
          </div>

          {/* 2. Wellness/Comfort Benefits Grid */}
          <div className="pt-20 border-t border-brand-border/60 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display block">
                Target Humidification
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy">
                Benefits of Balanced Indoor Moisture
              </h2>
              <p className="text-sm text-brand-gray-medium">
                Proper humidification is essential for dry environments, protecting health, wood structures, and creating a comfortable indoor climate.
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
            Need Help Selecting the Right Humidifier Capacity?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our indoor climate experts are online to calculate dry room loads and suggest the perfect ultrasonic cool mist system.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="secondary" size="md" className="font-bold uppercase tracking-wider text-xs">
              Talk to Humidification Expert
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
