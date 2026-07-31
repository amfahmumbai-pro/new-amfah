import { Suspense } from "react";
import Image from "next/image";
import { Sparkles, Heart, ShieldAlert, Thermometer, CheckCircle, RefreshCw } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import HomeDehumidifierHero from "@/components/sections/HomeDehumidifierHero";
import HomeDehumidifierCatalog from "@/components/sections/HomeDehumidifierCatalog";
import HomeDehumidifierVideo from "@/components/sections/HomeDehumidifierVideo";
import { products } from "@/data/products";

export const metadata = {
  title: "Buy Home Dehumidifiers at Best Price",
  description: "Home Dehumidifier for sale in India. High quality & reliable delivery. Best Price Guaranteed! Get a quick quote or Call 022 40-107-074",
};

export default async function HomeDehumidifiersPage() {
  // Filter only residential/retail products
  const residentialProducts = products.filter((p) => p.categoryId === "residential");

  const homeBenefits = [
    {
      icon: Heart,
      title: "Allergy & Asthma Relief",
      desc: "Lower humidity stops dust mites and mold from growing, helping you breathe easier and reducing allergy symptoms.",
    },
    {
      icon: ShieldAlert,
      title: "Mold & Mildew Prevention",
      desc: "Stop mold from growing on your walls, ceilings, carpets, and favorite wooden furniture.",
    },
    {
      icon: Thermometer,
      title: "Cooler Air & Energy Savings",
      desc: "Dry air feels naturally cooler, so you can run your air conditioner less and save money on electricity.",
    },
    {
      icon: RefreshCw,
      title: "Fresh Air (No Damp Smell)",
      desc: "Get rid of musty, damp smells in your basement, closets, wardrobes, and living rooms.",
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Category Hero */}
      <Suspense fallback={<div className="h-[250px] bg-brand-gray-light animate-pulse" />}>
        <HomeDehumidifierHero />
      </Suspense>

      {/* Main Catalog: Products Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="space-y-12">
            <Suspense fallback={<div className="text-center py-12 text-sm font-semibold text-brand-gray-medium">Loading Catalog...</div>}>
              <HomeDehumidifierCatalog initialProducts={residentialProducts} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Full-width Video Section with Scroll Reveal / Parallax - Hidden if economy filter is active */}
      <Suspense fallback={null}>
        <HomeDehumidifierVideo />
      </Suspense>

      {/* 2. Wellness/Comfort Benefits Grid Section */}
      <section className="py-20 bg-white border-t border-brand-border/60 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display block">
              Healthy Home Environment
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy">
              Why Your Home Needs a Dehumidifier
            </h2>
            <p className="text-sm text-brand-gray-medium font-semibold">
              Keeping the right moisture level is the easiest way to stop mold, prevent allergies, protect your home, and keep your air clean and fresh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {homeBenefits.map((b, index) => (
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
      </section>

      {/* Conversion Banner */}
      <section className="py-16 bg-brand-navy text-white text-center space-y-6">
        <ScrollReveal delay={0.1} className="max-w-xl mx-auto space-y-4 px-6">
          <h3 className="font-display font-bold text-xl sm:text-2xl">
            Unsure Which Model Fits Your Space?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every home is different. Talk to our customer support team today to get a quick recommendation for your space.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="secondary" size="md" className="font-bold uppercase tracking-wider text-xs">
              Talk to Our Team
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
