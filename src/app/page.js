import Link from "@/components/ui/AppLink";
import Image from "next/image";
import { ArrowRight, Droplets, Shield, Cpu, RefreshCw, Layers, Sparkles, Wind, Waves, Thermometer } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AmbientVideo from "@/components/ui/AmbientVideo";
import ProductCard from "@/components/cards/ProductCard";
import IndustryCard from "@/components/cards/IndustryCard";
import HeroImageSlider from "@/components/sections/HeroImageSlider";
import NewHero from "@/components/sections/NewHero";
import MonsoonPromoBanner from "@/components/sections/MonsoonPromoBanner";
import HumidityTrackerCard from "@/components/sections/HumidityTrackerCard";
import dynamic from "next/dynamic";

const ReviewCarousel = dynamic(() => import("@/components/sections/ReviewCarousel"));
const ImageTestimonials = dynamic(() => import("@/components/sections/ImageTestimonials"));
const ExpertiseStats = dynamic(() => import("@/components/sections/ExpertiseStats"));
const ClienteleShowcase = dynamic(() => import("@/components/sections/ClienteleShowcase"));
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"));
const InstagramGallery = dynamic(() => import("@/components/sections/InstagramGallery"));
import { products } from "@/data/products";
import { industries } from "@/data/industries";

export default function Home() {
  // Select top 3 products for preview (mix of industrial and residential)
  const featuredProducts = products.slice(0, 3);

  // Select top 4 industries for homepage showcase
  const featuredIndustries = industries.slice(0, 4);

  // Widely Used In categories with corresponding assets and search queries
  const categories = [
    { name: "IT & Data Center", image: "/widely_used_in/Data-Server-Rooms-1-300x300-1.webp", link: "/industrial-uses/it-data-center" },
    { name: "Health Care Facilities", image: "/widely_used_in/Healthcare.webp", link: "/industrial-uses/healthcare-facilities" },
    { name: "Hospitals & Clinics", image: "/widely_used_in/Hospital-and-Clinics.webp", link: "/industrial-uses/hospitals-clinics" },
    { name: "Hotels & Restaurants", image: "/widely_used_in/Hotels-and-Restaurants.webp", link: "/industrial-uses/hotels-restaurants" },
    { name: "Art Galleries & Boutiques", image: "/widely_used_in/Art-galleries-and-boutiques.webp", link: "/home-uses/art-galleries-boutiques" },
    { name: "Jewellery Stores", image: "/widely_used_in/Jewelry-stores.webp", link: "/home-uses/jewellery-stores" },
    { name: "Printing Industries", image: "/widely_used_in/Printing-Industries.webp", link: "/industrial-uses/printing-industries" },
    { name: "Equipment & Console Room", image: "/widely_used_in/Equipment-and-console-rooms-1.webp", link: "/industrial-uses/equipment-console-room" },
    { name: "Testing Laboratory", image: "/widely_used_in/Testing-Laboratories.webp", link: "/industrial-uses/testing-laboratory" },
    { name: "Library & Archives", image: "/widely_used_in/Library.webp", link: "/home-uses/library-archives" },
    { name: "Food Industry", image: "/widely_used_in/Food-Industry-1.webp", link: "/industrial-uses/food-industry" },
    { name: "Packing Industry", image: "/widely_used_in/Packing-Industry-1.webp", link: "/industrial-uses/packing-industry" },
    { name: "Pharmaceutical Industry", image: "/widely_used_in/Pharmaceutical-Industry.webp", link: "/industrial-uses/pharmaceutical-industry" },
    { name: "Warehouse & Storage Facilities", image: "/widely_used_in/Warehouse-and-storage-facilities-1.webp", link: "/industrial-uses/warehouse-storage" },
    { name: "Home Theatre", image: "/widely_used_in/Untitled-design.png", link: "/home-uses/home-theatre" },
    { name: "Basements", image: "/widely_used_in/image1.webp", link: "/home-uses/basements" },
    { name: "Leather Industry", image: "/widely_used_in/leather-industry.jpg", link: "/industrial-uses/leather-industry" },
  ];

  const half = Math.ceil(categories.length / 2);
  const categoriesRow1 = categories.slice(0, half);
  const categoriesRow2 = categories.slice(half);

  return (
    <div className="flex flex-col bg-white">
      {/* Search-optimized H1 for search engines */}
      <h1 className="sr-only">Best Premium Industrial & Home Dehumidifiers | AMFAH</h1>

      {/* 1. HERO SECTION */}
      {/* Commented out previous Hero Section
      <section className="relative bg-white py-10 md:py-16 lg:py-20 overflow-hidden border-b border-brand-border/60">
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner.jpg"
            alt="AMFAH Industrial Background Banner"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>


        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">

              <ScrollReveal delay={0.2} y={20}>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-brand-navy leading-[1.05]">
                  Precise Humidity <br className="hidden sm:inline" />
                  <span className="text-brand-accent">Control Solutions</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.3} y={20}>
                <p className="text-base sm:text-lg text-brand-gray-dark/85 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  AMFAH designs and manufactures premium, high-capacity industrial moisture extraction systems and ultra-quiet smart home dehumidifiers for demanding cleanrooms, warehouses, and living spaces.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4} y={20}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button href="/products" variant="primary" size="lg" icon={ArrowRight}>
                    Explore Dehumidifiers
                  </Button>
                  <Button href="/contact" variant="outline" size="lg">
                    Request Technical Consultation
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5} y={10}>
                <div className="pt-6 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 border-t border-brand-border/60 text-left">
                  <div>
                    <span className="block font-display font-extrabold text-2xl text-[#1251a0]">15+</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gray-medium">Years Expertise</span>
                  </div>
                  <div>
                    <span className="block font-display font-extrabold text-2xl text-[#1251a0]">99.9%</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gray-medium">Cleanroom Uptime</span>
                  </div>
                  <div>
                    <span className="block font-display font-extrabold text-2xl text-[#1251a0]">40+</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gray-medium">Plug & Play Models</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5 flex justify-center items-center relative z-10">
              <ScrollReveal delay={0.3} scale={0.96} className="w-full flex justify-center">
                <HeroImageSlider />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Monsoon Promo Banner */}
      <MonsoonPromoBanner />

      {/* New Sliding Hero Section */}
      <NewHero />

      {/* Expertise Stats Section */}
      <ExpertiseStats />

      {/* 2. THREE TECHNICAL PILLARS */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1} className="space-y-4 p-8 border border-brand-border rounded-2xl bg-white hover:border-brand-blue/20 transition-all duration-300">
              <div className="h-10 w-10 bg-brand-blue-light text-brand-blue rounded-lg flex items-center justify-center">
                <Droplets className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-navy">High-Capacity Dehumidification</h3>
              <p className="text-sm text-brand-gray-medium leading-relaxed">
                Extract massive humidity loads ranging from 20L up to 480L per day under extreme ambient operating temperatures.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="space-y-4 p-8 border border-brand-border rounded-2xl bg-white hover:border-brand-blue/20 transition-all duration-300">
              <div className="h-10 w-10 bg-brand-blue-light text-brand-blue rounded-lg flex items-center justify-center">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-navy">Smart Microprocessor PLC</h3>
              <p className="text-sm text-brand-gray-medium leading-relaxed">
                Integrated Siemens smart controllers ensure humidity envelopes remain within a strict ±2% RH range with live cloud telemetry.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="space-y-4 p-8 border border-brand-border rounded-2xl bg-white hover:border-brand-blue/20 transition-all duration-300">
              <div className="h-10 w-10 bg-brand-blue-light text-brand-blue rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-navy">Robust Industrial Build</h3>
              <p className="text-sm text-brand-gray-medium leading-relaxed">
                Corrosion-free structural ABS shells and epoxy-coated heavy metal frames protect interior mechanical assemblies from moisture damage.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section> */}

      {/* 2.5 OUR PRODUCTS SHOWCASE */}
      <section className="py-10 lg:py-18 bg-white relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 " />

        <div className="max-w-8xl mx-auto px-6 md:px-20 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <ScrollReveal delay={0.05}>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-navy">
                Explore Our Products
              </h2>
            </ScrollReveal>
            {/* <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-navy">
                Complete IAQ & Climate Control Systems
              </h2>
            </ScrollReveal> */}
            <ScrollReveal delay={0.15}>
              <p className="text-sm md:text-base text-brand-gray-medium leading-relaxed">
                Discover our range of advanced air treatment technologies designed for extreme commercial performance and sleek smart home integrations.
              </p>
            </ScrollReveal>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Dehumidifiers */}
            <ScrollReveal delay={0.1} className="group bg-white border border-brand-border rounded-2xl overflow-hidden hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
              <div className="relative aspect-[4/3] w-full bg-brand-gray-light flex items-center justify-center p-6 border-b border-brand-border/60 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-15" />
                <Image
                  src="/products/dehumidifier.png"
                  alt="Dehumidifier Equipment"
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out z-10"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="mb-6 space-y-2">
                  <h3 className="font-display font-bold text-xl text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                    Dehumidifiers
                  </h3>
                  <p className="text-xs text-brand-gray-medium leading-relaxed">
                    High-efficiency moisture extraction systems for homes, offices, and industries.
                  </p>
                </div>
                <div className="mt-auto">
                  <Button href="/products" variant="outline" size="sm" className="w-full text-brand-accent border-brand-border hover:border-brand-accent/40 hover:bg-brand-accent/5 text-sm font-semibold py-2.5 group" icon={ArrowRight}>
                    View all products
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Air to Water */}
            <ScrollReveal delay={0.15} className="group bg-white border border-brand-border rounded-2xl overflow-hidden hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
              <div className="relative aspect-[4/3] w-full bg-brand-gray-light flex items-center justify-center p-6 border-b border-brand-border/60 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-15" />
                <Image
                  src="/products/air-to-water.png"
                  alt="Air to Water Generation Equipment"
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out z-10"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="mb-6 space-y-2">
                  <h3 className="font-display font-bold text-xl text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                    Air to Water
                  </h3>
                  <p className="text-xs text-brand-gray-medium leading-relaxed">
                    Innovative generators harvesting pure drinking water directly from the air.
                  </p>
                </div>
                <div className="mt-auto">
                  <Button href="/air-to-water" variant="outline" size="sm" className="w-full text-brand-accent border-brand-border hover:border-brand-accent/40 hover:bg-brand-accent/5 text-sm font-semibold py-2.5 group" icon={ArrowRight}>
                    View all products
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* 3. Humidifiers */}
            <ScrollReveal delay={0.2} className="group bg-white border border-brand-border rounded-2xl overflow-hidden hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
              <div className="relative aspect-[4/3] w-full bg-brand-gray-light flex items-center justify-center p-6 border-b border-brand-border/60 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-15" />
                <Image
                  src="/products/amf-13hm (2).png"
                  alt="Humidification Equipment"
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out z-10"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="mb-6 space-y-2">
                  <h3 className="font-display font-bold text-xl text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                    Humidifiers
                  </h3>
                  <p className="text-xs text-brand-gray-medium leading-relaxed">
                    Precision moisture control systems for clean, healthy, and comfortable indoor air.
                  </p>
                </div>
                <div className="mt-auto">
                  <Button href="/humidifiers" variant="outline" size="sm" className="w-full text-brand-accent border-brand-border hover:border-brand-accent/40 hover:bg-brand-accent/5 text-sm font-semibold py-2.5 group" icon={ArrowRight}>
                    View all products
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* 4. Air Purifiers */}
            <ScrollReveal delay={0.25} className="group bg-white border border-brand-border rounded-2xl overflow-hidden hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
              <div className="relative aspect-[4/3] w-full bg-brand-gray-light flex items-center justify-center p-6 border-b border-brand-border/60 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-15" />
                <Image
                  src="/products/amf-250-ap.png"
                  alt="Air Purification System"
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out z-10"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="mb-6 space-y-2">
                  <h3 className="font-display font-bold text-xl text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                    Air Purifiers
                  </h3>
                  <p className="text-xs text-brand-gray-medium leading-relaxed">
                    Advanced air filtration systems to remove dust, allergens, and pollutants.
                  </p>
                </div>
                <div className="mt-auto">
                  <Button href="/air-purifiers" variant="outline" size="sm" className="w-full text-brand-accent border-brand-border hover:border-brand-accent/40 hover:bg-brand-accent/5 text-sm font-semibold py-2.5 group" icon={ArrowRight}>
                    View all products
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. Portable ACs */}
            <ScrollReveal delay={0.3} className="group bg-white border border-brand-border rounded-2xl overflow-hidden hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
              <div className="relative aspect-[4/3] w-full bg-brand-gray-light flex items-center justify-center p-6 border-b border-brand-border/60 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-15" />
                <Image
                  src="/products/portable-ac.png"
                  alt="Portable Air Conditioner"
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out z-10"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="mb-6 space-y-2">
                  <h3 className="font-display font-bold text-xl text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                    Portable AC&apos;s
                  </h3>
                  <p className="text-xs text-brand-gray-medium leading-relaxed">
                    Energy-efficient mobile cooling systems for instant temperature control.
                  </p>
                </div>
                <div className="mt-auto">
                  <Button href="/products" variant="outline" size="sm" className="w-full text-brand-accent border-brand-border hover:border-brand-accent/40 hover:bg-brand-accent/5 text-sm font-semibold py-2.5 group" icon={ArrowRight}>
                    View all products
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. Portable ACs */}
            <ScrollReveal delay={0.3} className="group bg-white border border-brand-border rounded-2xl overflow-hidden hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
              <div className="relative aspect-[4/3] w-full bg-brand-gray-light flex items-center justify-center p-6 border-b border-brand-border/60 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-15" />
                <Image
                  src="/products/mf-gdhd-26l (1).png"
                  alt="Ceiling Dehumidifiers"
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out z-10"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="mb-6 space-y-2">
                  <h3 className="font-display font-bold text-xl text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                    Ceiling Dehumidifiers
                  </h3>
                  <p className="text-xs text-brand-gray-medium leading-relaxed">
                    Space-saving overhead dehumidifiers for residential and commercial spaces.
                  </p>
                </div>
                <div className="mt-auto">
                  <Button href="/products" variant="outline" size="sm" className="w-full text-brand-accent border-brand-border hover:border-brand-accent/40 hover:bg-brand-accent/5 text-sm font-semibold py-2.5 group" icon={ArrowRight}>
                    View all products
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* YOUTUBE VIDEO & HUMIDITY TRACKER SECTION */}
      <section className="py-5 md:py-10 relative overflow-hidden bg-white">
        <div className="w-full px-6 md:px-16 max-w-8xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT SIDE: YOUTUBE VIDEO */}
            <div className="lg:col-span-5 space-y-4">
              <ScrollReveal delay={0.2} scale={0.98} className="w-full">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-brand-border bg-black shadow-xl shadow-black/5 group transition-all duration-500 hover:scale-[1.01]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/pI7V5L8Nqrc?si=owV7kHF5qoThFL4S"
                    title="AMFAH Dehumidifier Demonstration"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT SIDE: HUMIDITY TRACKER UI CARD */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.25}>
                <HumidityTrackerCard />
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* INSTAGRAM VIDEO GALLERY */}
      <InstagramGallery />

      {/* 3. WIDELY USED IN - INFINITE MARQUEE SHOWCASE */}
      <section className="pt-8 pb-10 md:pt-12 md:pb-24 bg-brand-gray-light relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0" />

        <div className="relative z-10 space-y-16">
          <div className="max-w-8xl mx-auto px-6 md:px-20 text-center md:text-left space-y-2 md:space-y-4 flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6">
            <div className="space-y-2 md:space-y-3 max-w-2xl">
              <ScrollReveal delay={0.1}>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-navy">
                  Widely Used In
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="text-sm md:text-base text-brand-gray-medium leading-relaxed">
                  AMFAH dehumidification and air quality systems are engineered to integrate seamlessly within high-spec facilities and luxury environments alike.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.2} className="shrink-0">
              <Button href="/search" variant="outline" size="sm" icon={ArrowRight}>
                Search All Applications
              </Button>
            </ScrollReveal>
          </div>

          {/* Marquee Rows Container */}
          <div className="space-y-4 md:space-y-8 w-full overflow-hidden">

            {/* Row 1: Forward Infinite Scroll (Right to Left) */}
            <div className="flex overflow-hidden select-none hover-pause gap-6 w-full">
              <div className="flex shrink-0 animate-marquee gap-6 min-w-full justify-around">
                {categoriesRow1.map((cat) => (
                  <Link
                    key={`${cat.name}-r1-1`}
                    href={cat.link}
                    prefetch={false}
                    className="group relative w-48 sm:w-80 h-32 sm:h-48 rounded-2xl border border-brand-border overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all duration-500 shrink-0 cursor-pointer flex flex-col justify-end"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 transition-opacity duration-300 group-hover:from-slate-900/90" />
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 space-y-1">
                      <h3 className="font-display font-bold text-sm sm:text-lg !text-white group-hover:!text-brand-blue-light transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <span className="inline-flex items-center text-[10px] font-bold text-brand-blue-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        Explore Systems <ArrowRight className="h-3 w-3 ml-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex shrink-0 animate-marquee gap-6 min-w-full justify-around" aria-hidden="true">
                {categoriesRow1.map((cat) => (
                  <Link
                    key={`${cat.name}-r1-2`}
                    href={cat.link}
                    prefetch={false}
                    className="group relative w-48 sm:w-80 h-32 sm:h-48 rounded-2xl border border-brand-border overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all duration-500 shrink-0 cursor-pointer flex flex-col justify-end"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 transition-opacity duration-300 group-hover:from-slate-900/90" />
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 space-y-1">
                      <h3 className="font-display font-bold text-sm sm:text-lg !text-white group-hover:!text-brand-blue-light transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <span className="inline-flex items-center text-[10px] font-bold text-brand-blue-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        Explore Systems <ArrowRight className="h-3 w-3 ml-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Row 2: Reverse Infinite Scroll (Left to Right) */}
            <div className="flex overflow-hidden select-none hover-pause gap-6 w-full">
              <div className="flex shrink-0 animate-marquee-reverse gap-6 min-w-full justify-around">
                {categoriesRow2.map((cat) => (
                  <Link
                    key={`${cat.name}-r2-1`}
                    href={cat.link}
                    prefetch={false}
                    className="group relative w-48 sm:w-80 h-32 sm:h-48 rounded-2xl border border-brand-border overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all duration-500 shrink-0 cursor-pointer flex flex-col justify-end"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 transition-opacity duration-300 group-hover:from-slate-900/90" />
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 space-y-1">
                      <h3 className="font-display font-bold text-sm sm:text-lg !text-white group-hover:!text-brand-blue-light transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <span className="inline-flex items-center text-[10px] font-bold text-brand-blue-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        Explore Systems <ArrowRight className="h-3 w-3 ml-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex shrink-0 animate-marquee-reverse gap-6 min-w-full justify-around" aria-hidden="true">
                {categoriesRow2.map((cat) => (
                  <Link
                    key={`${cat.name}-r2-2`}
                    href={cat.link}
                    prefetch={false}
                    className="group relative w-48 sm:w-80 h-32 sm:h-48 rounded-2xl border border-brand-border overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all duration-500 shrink-0 cursor-pointer flex flex-col justify-end"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 transition-opacity duration-300 group-hover:from-slate-900/90" />
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 space-y-1">
                      <h3 className="font-display font-bold text-sm sm:text-lg !text-white group-hover:!text-brand-blue-light transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <span className="inline-flex items-center text-[10px] font-bold text-brand-blue-light tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        Explore Systems <ArrowRight className="h-3 w-3 ml-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCT SHOWCASE */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display">
                Featured Catalog
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-navy">
                Engineered Humidity Control Systems
              </h2>
            </div>
            <Button href="/products" variant="outline" size="sm" icon={ArrowRight}>
              View All Products
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.slug} delay={0.1 * index}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* 5. WHY DO YOU NEED A DEHUMIDIFIER SECTION */}
      <section className="py-10 md:py-18 bg-white border-y border-brand-border/60 relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:2rem_2rem] opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 space-y-2 lg:space-y-4">

          {/* Section Heading - Spans full width on its own line */}
          <div className="max-w-3xl">
            <ScrollReveal delay={0.2} y={20}>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brand-navy leading-tight">
                Why do you need a<span className="text-brand-accent"> Dehumidifier?</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Grid Layout - Paragraph Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Content Column (Paragraphs & details) */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8">

              <ScrollReveal delay={0.3} y={20}>
                <p className="text-base md:text-lg text-brand-gray-medium leading-relaxed max-w-2xl text-justify">
                  Excess ambient moisture poses severe risks to both indoor comfort and critical industrial performance. In residential spaces, unchecked humidity fuels toxic mold, triggers chronic allergies, and ruins expensive wood interiors. Across commercial and industrial sites, uncontrolled moisture causes machinery to rust, powder formulations to clump, packaging to collapse, and pharmaceutical productions to fail quality compliance.
                </p>
              </ScrollReveal>

              {/* Home vs Industrial Comparison Points */}
              <ScrollReveal delay={0.4} y={20}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-brand-border">
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-lg text-brand-navy flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-accent" />
                      For Residential Spaces
                    </h3>
                    <p className="text-xs text-brand-gray-medium leading-relaxed text-justify">
                      Safeguards interior structures, protects precious wood and metal fixtures, prevents respiratory allergies, and keeps humidity levels within a perfect, comfortable 40%–50% RH.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-lg text-brand-navy flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-blue" />
                      For Industrial Operations
                    </h3>
                    <p className="text-xs text-brand-gray-medium leading-relaxed text-justify">
                      Protects machine reliability, preserves chemical stability, prevents clumping of organic powders, and ensures GMP/FDA compliance for pharmaceutical cleanrooms.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Action Buttons */}
              <ScrollReveal delay={0.5} y={20}>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button href="/home-dehumidifiers" variant="primary" size="md" icon={ArrowRight} className="font-semibold uppercase tracking-wider text-xs py-3.5 bg-brand-accent">
                    For Residential
                  </Button>
                  <Button href="/industrial-dehumidifiers" variant="outline" size="md" className="font-semibold uppercase tracking-wider text-xs py-3.5 text-brand-navy">
                    For Industrial
                  </Button>
                </div>
              </ScrollReveal>

            </div>

            {/* Right Image Column (Transparent PNG) */}
            <div className="hidden md:block lg:col-span-5 relative flex justify-end items-start w-full">
              <ScrollReveal delay={0.3} scale={0.96} className="w-full flex justify-end">
                <div className="relative w-full max-w-[420px] aspect-[4/3] group flex items-center justify-end">
                  <Image
                    src="/banner/banner1.png"
                    alt="AMFAH Dehumidification Technology"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain object-right group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 5.5 CLIENTELE LOGOS SHOWCASE */}
      <ClienteleShowcase />

      {/* 5.75 IMAGE TESTIMONIALS SECTION */}
      <ImageTestimonials />

      {/* 6. GOOGLE REVIEWS SECTION */}
      <ReviewCarousel />

      {/* 7. DYNAMIC CALL-TO-ACTION */}
      <section className="py-10 md:py-20 bg-brand-navy text-white relative overflow-hidden">
        {/* Subtle geometric circles */}
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full border border-white/5" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full border border-white/5" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <ScrollReveal delay={0.1} y={15}>
            <span className="inline-block bg-white/10 text-brand-blue-light text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-display border border-white/5">
              Secure Your Climate Envelope
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.2} y={20}>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight text-white">
              Ready to Control Your Environment's Relative Humidity?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3} y={20}>
            <p className="text-sm md:text-base text-white max-w-xl mx-auto leading-relaxed">
              Partner with AMFAH for dynamic humidity audits. Our engineering teams are available to detail structural load calculations and recommend exact units.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} y={20}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-sm py-4">
                Contact Us
              </Button>
              <a
                href="tel:+919324516326"
                className="text-sm font-semibold hover:text-brand-blue-light transition-colors py-2 text-slate-300 hover:text-white"
              >
                Or Call Direct: +91 93219 91812
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <FAQSection />
    </div>
  );
}
