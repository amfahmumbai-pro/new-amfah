import { Suspense } from "react";
import Image from "next/image";
import { Sparkles, Heart, ShieldAlert, Wind, ShieldCheck, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import AirPurifierCatalog from "@/components/sections/AirPurifierCatalog";
import { products } from "@/data/products";

export const metadata = {
  title: "Air Purifiers for Home & Office in India | AMFAH",
  description: "HEPA air purifiers that remove PM2.5, dust, smoke and allergens. Models for bedrooms through to large commercial floors, with service support across India.",
  alternates: {
    canonical: "https://amfah.com/air-purifiers/",
  },
  openGraph: {
    title: "Air Purifiers for Home & Office in India | AMFAH",
    description: "HEPA air purifiers that remove PM2.5, dust, smoke and allergens. Models for bedrooms through to large commercial floors, with service support across India.",
    url: "https://amfah.com/air-purifiers/",
    images: [
      {
        url: "https://amfah.com/products/amf-350-ap.png",
        alt: "Air Purifiers AMFAH",
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
      "name": "Air Purifiers",
      "item": "https://amfah.com/air-purifiers/"
    }
  ]
};

export default function AirPurifiersPage() {
  // Filter only air purifier products
  const purifierProducts = products.filter((p) => p.categoryId === "purifier");

  const purifierBenefits = [
    {
      icon: Wind,
      title: "PM2.5 & Allergen Filtration",
      desc: "True H13 HEPA filters capture 99.97% of microscopic particles including dust mites, pollen, pet dander, and PM2.5.",
    },
    {
      icon: ShieldAlert,
      title: "Pathogen & Bacteria Control",
      desc: "Actively neutralizes mold spores, airborne viruses, and bacteria to maintain a healthy, sanitized living environment.",
    },
    {
      icon: Heart,
      title: "Odor & Smoke Adsorption",
      desc: "Advanced active carbon layers absorb household odors, cooking smells, VOCs, smoke, and chemical vapors.",
    },
    {
      icon: Sparkles,
      title: "Live Air Quality Telemetry",
      desc: "Smart laser sensors measure particulate concentration in real-time, adjusting fan speed dynamically to maintain purity.",
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Category Hero */}
      <section className="relative border-b border-brand-border/60 py-24 md:py-34 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner/air-purifier.jpeg"
            alt="Category Hero Background"
            fill
            priority
            className="object-cover blur-[2px] scale-105"
          />
          {/* Overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center space-y-2 relative z-10">
          <ScrollReveal delay={0.2}>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight text-white [text-shadow:_0_2px_4px_rgba(0,0,0,0.6),_0_8px_20px_rgba(0,0,0,0.4),_0_20px_40px_rgba(0,0,0,0.3)]">
              Smart Air Purifiers
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="max-w-4xl mx-auto space-y-2">
              <p className="text-sm sm:text-base md:text-2xl font-bold text-yellow-300 leading-relaxed [text-shadow:_0_1px_3px_rgba(0,0,0,0.6)]">
                We Make Air Quality and Humidity Control Easy <br />
                In collaboration with leading technology partners worldwide <br />
                A Group Company of AMFAH GENERAL TRADING LLC, Dubai
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Grid: Products + Benefits */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-20">

          {/* 1. Products Section */}
          <div className="space-y-12">
            <Suspense fallback={<div className="text-center py-12 text-sm font-semibold text-brand-gray-medium">Loading Catalog...</div>}>
              <AirPurifierCatalog initialProducts={purifierProducts} />
            </Suspense>
          </div>

          {/* 2. Wellness/Comfort Benefits Grid */}
          <div className="pt-20 border-t border-brand-border/60 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display block">
                Indoor Air Quality (IAQ) Focus
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy">
                Why Clean Air is Vital for Your Health
              </h2>
              <p className="text-sm text-brand-gray-medium">
                Our true HEPA H13 systems continuously clean the indoor environment, removing allergens, pathogens, and VOCs to offer pure, clean air.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {purifierBenefits.map((b, index) => (
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
            Need Expert Recommendation?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our indoor air quality specialists are ready to calculate required air change rates for your space and recommend the perfect purifier.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="secondary" size="md" className="font-bold uppercase tracking-wider text-xs">
              Contact IAQ Specialist
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
