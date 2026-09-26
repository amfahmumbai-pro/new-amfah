import { Suspense } from "react";
import { Factory, Wind, Droplets, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import IndustrialDehumidifierHero from "@/components/sections/IndustrialDehumidifierHero";
import IndustrialDehumidifierCatalog from "@/components/sections/IndustrialDehumidifierCatalog";
import { products } from "@/data/products";

export const metadata = {
  title: "Ceiling Dehumidifiers India | Space-Saving Duct Mount | AMFAH",
  description: "Heavy duty ceiling-mounted & ducted dehumidifiers in India. Space saving, whisper-quiet performance, and premium moisture extraction for commercial and residential spaces.",
  alternates: {
    canonical: "https://amfah.com/ceiling-dehumidifiers/",
  },
  openGraph: {
    title: "Ceiling Dehumidifiers India | Space-Saving Duct Mount | AMFAH",
    description: "Heavy duty ceiling-mounted & ducted dehumidifiers in India. Space saving, whisper-quiet performance, and premium moisture extraction for commercial and residential spaces.",
    url: "https://amfah.com/ceiling-dehumidifiers/",
    images: [
      {
        url: "https://amfah.com/banner/ceiling-dehumidifier(1).jpeg",
        alt: "Ceiling Dehumidifiers AMFAH",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://amfah.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Ceiling Dehumidifiers",
      "item": "https://amfah.com/ceiling-dehumidifiers/"
    }
  ]
};

export default async function CeilingDehumidifiersPage() {
  // Filter industrial hardware
  const industrialProducts = products.filter((p) => p.categoryId === "industrial");

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
      desc: "Keep floors dry to prevent slips and falls, and stop mold growth to create a clean, healthy workplace for your employees.",
    },
    {
      icon: Droplets,
      title: "Faster Processing & Drying",
      desc: "Speed up drying times for products, coatings, and packaging, helping your business save energy and boost daily output.",
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Category Hero */}
      <Suspense fallback={<div className="h-[250px] bg-brand-gray-light animate-pulse" />}>
        <IndustrialDehumidifierHero defaultFilter="ceiling" />
      </Suspense>

      {/* Main product show layout */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-20">

          {/* 1. Products Catalog Section */}
          <div className="space-y-12">
            <Suspense fallback={<div className="text-center py-12 text-sm font-semibold text-brand-gray-medium">Loading Catalog...</div>}>
              <IndustrialDehumidifierCatalog initialProducts={industrialProducts} defaultTier="ceiling" />
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
    </div>
  );
}
