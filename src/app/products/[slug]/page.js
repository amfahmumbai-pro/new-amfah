import { notFound } from "next/navigation";
import Link from "@/components/ui/AppLink";
import Image from "next/image";
import { ArrowLeft, Check, Compass, Cpu, Settings, Award, FileDown } from "lucide-react";
import Button from "@/components/ui/Button";
// import InquiryForm from "@/components/forms/InquiryForm";
import ContactForm from "@/components/forms/ContactForm";
import RequestCallbackModal from "@/components/forms/RequestCallbackModal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { products } from "@/data/products";
import { sortByCoverageArea } from "@/utils/productUtils";
import { defaultProductImages } from "@/data/productImages";
import ProductImageGallery from "@/components/ui/ProductImageGallery";

// Dynamic SEO Metadata Sizing API
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Equipment Not Found",
    };
  }

  const overrides = {
    "seccoprof-40p": "AMFAH - Olimpia Splendid SECCOPROF 40P",
    "seccoprof-30p": "AMFAH - Olimpia Splendid SECCOPROF 30P",
    "aquaria-slim-10p": "AMFAH - Olimpia Splendid Aquaria Slim 10P (Italy)",
    "aquaria-s1-12p": "AMFAH - Olimpia Splendid Aquaria S1 - 12P (Italy)",
    "aquaria-s1-14p": "AMFAH - Olimpia Splendid Aquaria S1 - 14P (Italy)",
    "aquaria-s1-16p": "AMFAH - Olimpia Splendid Aquaria S1 - 16P (Italy)",
    "aquaria-s1-20p": "AMFAH - Olimpia Splendid Aquaria S1 - 20P (Italy)",
    "aquaria-s1-24p": "AMFAH - Olimpia Splendid Aquaria S1 - 24P (Italy)"
  };
  const nameToUse = overrides[product.slug] || product.name;

  return {
    title: `${nameToUse} | Premium ${product.category}`,
    description: `Technical specifications, features, applications, and commercial inquiry for the ${nameToUse} ${product.subtitle}.`,
    openGraph: {
      title: `${nameToUse} | Dehumidifier Specifications`,
      description: product.tech,
    },
  };
}

// Generate static routes for the products to optimize LCP & Performance
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Helper function to extract specific values from specifications case-insensitively
function getSpecValue(specifications = {}, searchTerms = []) {
  if (!specifications) return null;
  const keys = Object.keys(specifications);
  for (const term of searchTerms) {
    const foundKey = keys.find(k => k.toLowerCase().includes(term.toLowerCase()));
    if (foundKey) {
      return specifications[foundKey];
    }
  }
  return null;
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const overrides = {
    "seccoprof-40p": "AMFAH - Olimpia Splendid SECCOPROF 40P",
    "seccoprof-30p": "AMFAH - Olimpia Splendid SECCOPROF 30P",
    "aquaria-slim-10p": "AMFAH - Olimpia Splendid Aquaria Slim 10P (Italy)",
    "aquaria-s1-12p": "AMFAH - Olimpia Splendid Aquaria S1 - 12P (Italy)",
    "aquaria-s1-14p": "AMFAH - Olimpia Splendid Aquaria S1 - 14P (Italy)",
    "aquaria-s1-16p": "AMFAH - Olimpia Splendid Aquaria S1 - 16P (Italy)",
    "aquaria-s1-20p": "AMFAH - Olimpia Splendid Aquaria S1 - 20P (Italy)",
    "aquaria-s1-24p": "AMFAH - Olimpia Splendid Aquaria S1 - 24P (Italy)"
  };
  const nameToUse = overrides[product.slug] || product.name;

  const productImages = defaultProductImages[product.slug] || [product.image];
  const primaryImage = productImages[0] || "/image1.jpg";

  // Pre-fill rich technical schema JSON-LD for Search Crawlers
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": nameToUse,
    "image": `https://amfah.com${product.image}`,
    "description": product.tech,
    "brand": {
      "@type": "Brand",
      "name": "AMFAH"
    },
    "category": product.category,
    "model": product.slug,
  };

  // Find related products (same category but not current product)
  const relatedProducts = sortByCoverageArea(
    products.filter((p) => p.categoryId === product.categoryId && p.slug !== product.slug)
  ).slice(0, 2);

  // Dynamic category label for related products section
  const categoryLabel = (product.categoryId === "industrial" || product.categoryId === "residential")
    ? "Dehumidifiers"
    : product.categoryId === "purifier"
      ? "Air Purifiers"
      : product.categoryId === "humidifier"
        ? "Humidifiers"
        : product.categoryId === "portable-ac"
          ? "Portable ACs"
          : product.categoryId === "air-to-water"
            ? "Water Generators"
            : "Products";

  // Helper variables to extract specific product specs for custom FAQs
  const tankCapacity = getSpecValue(product.specifications, ["water tank capacity", "tank volume", "condensate tank", "water tank", "storage tank capacity", "tank capacity"]) || "built-in tank";
  const noise = getSpecValue(product.specifications, ["noise level", "sound pressure level", "sound"]) || "quiet operating levels";
  const tempRange = getSpecValue(product.specifications, ["operating temperature", "operational temperature", "operating range", "ambient temperature"]) || "5°C to 35°C";
  const refrigerant = getSpecValue(product.specifications, ["refrigerant", "coolant", "refrigerant gas"]) || "R290";
  const power = getSpecValue(product.specifications, ["power consumption", "power input", "nominal power", "power"]) || "energy-efficient levels";
  const current = getSpecValue(product.specifications, ["electric current", "current", "power current"]) || "low current draw";
  const compressor = getSpecValue(product.specifications, ["compressor"]);
  const fanSpeeds = getSpecValue(product.specifications, ["fan speed", "speeds", "number of fan speeds"]) || "multiple speed levels";
  const coverageVal = product.coverage || getSpecValue(product.specifications, ["coverage"]) || "standard spaces";

  const featuresList = product.features || [];
  const techSummary = product.tech || "";

  // Generate specialized FAQs dynamically based on category and product-specific attributes
  const faqs = product.categoryId === "industrial"
    ? [
      {
        q: `What is the moisture extraction capacity and coverage area of the ${nameToUse}?`,
        a: `The ${nameToUse} is rated to extract ${product.extraction} of moisture per day and is optimized for coverage areas of ${coverageVal}.`
      },
      {
        q: `What are the drainage options and water tank specifications for this model?`,
        a: `This model features a condensate tank capacity of ${tankCapacity} ${featuresList.some(f => f.toLowerCase().includes("pump")) ? "and features an integrated high-lift water pump to dispose of water vertically or horizontally up to 15 feet." : "and supports continuous gravity drainage. You can attach a high-pressure hose to the drain connection for uninterrupted 24-hour drainage."}`
      },
      {
        q: `Can the ${nameToUse} operate in low-temperature environments?`,
        a: `Yes, it is designed to operate efficiently within a temperature range of ${tempRange}. It incorporates a specialized defrosting system (hot-gas or warm-gas defrost) that prevents frost from building up on the cooling coils, ensuring continuous operation down to low temperatures.`
      },
      {
        q: `What are the electrical requirements and refrigerant used in the ${nameToUse}?`,
        a: `It runs on eco-friendly refrigerant ${refrigerant}, consuming approximately ${power} and drawing ${current} of electric current during normal operations. ${compressor ? `It is powered by a high-grade ${compressor} compressor for maximum reliability.` : ""}`
      }
    ]
    : product.categoryId === "purifier"
      ? [
        {
          q: `What filter technologies does the ${nameToUse} use and how often should they be replaced?`,
          a: `The ${nameToUse} employs a high-efficiency filtration system, typically consisting of a washable pre-filter, a high-efficiency H13 HEPA filter, and an active carbon filter. The pre-filter should be cleaned regularly, while the HEPA and carbon filters should be replaced every 6 to 12 months depending on usage.`
        },
        {
          q: `What is the clean airflow rating and coverage area of this purifier?`,
          a: `It provides a clean airflow circulation rate of ${product.airflow || "optimal circulation"} and is optimized to purify spaces of ${coverageVal}.`
        },
        {
          q: `Can the ${nameToUse} be used to reduce room humidity?`,
          a: `No, the ${nameToUse} is dedicated to high-efficiency air filtration (eliminating dust, smoke, allergens, and PM2.5). For humidity control, please check our range of home and commercial dehumidifiers.`
        }
      ]
      : product.categoryId === "air-to-water"
        ? [
          {
            q: `How does the ${nameToUse} generate pure drinking water from the air?`,
            a: `The ${nameToUse} extracts moisture directly from the humidity in the ambient air, condenses it, and passes it through an advanced filtration system. You simply plug the unit into a standard power outlet, and it generates fresh drinking water without requiring any plumbing or external water connection.`
          },
          {
            q: `What purification stages does this generator use to ensure water safety?`,
            a: `It features an advanced multi-stage purification system (including Pre-Filter, HEPA H13, Active Carbon, RO membrane, and UV Sterilization) to remove all contaminants. Additionally, a mineralization filter adds essential trace minerals like Calcium and Magnesium to ensure clean, refreshing alkaline water (pH 7.2 to 7.8).`
          },
          {
            q: `What is the daily water production capacity and storage tank volume?`,
            a: `It has a daily water production capacity of ${product.extraction} and is equipped with an integrated ${tankCapacity} storage tank.`
          }
        ]
        : product.categoryId === "humidifier"
          ? [
            {
              q: `What is the moisture output and recommended coverage area for the ${nameToUse}?`,
              a: `The ${nameToUse} has a humidification capacity of ${product.extraction} per day and is optimized for coverage areas of ${coverageVal}.`
            },
            {
              q: `What technology does the ${nameToUse} use to generate mist, and is it quiet?`,
              a: `It utilizes advanced ultrasonic cool mist transducer technology to vibrate water into a micro-fine mist, dispersing it quickly and evenly. It is whisper-silent, operating at a noise level of ${noise}, which is ideal for nurseries, bedrooms, and offices.`
            },
            {
              q: `What type of water should be used, and how do I clean the humidifier?`,
              a: `We highly recommend using distilled or demineralized water to prevent mineral dust build-up. For maintenance, rinse the tank weekly and clean the ultrasonic transducer oscillator every 2-3 weeks with white vinegar to clear scaling.`
            }
          ]
          : product.categoryId === "portable-ac"
            ? [
              {
                q: `What is the cooling capacity of the ${nameToUse} and how is it installed?`,
                a: `The ${nameToUse} features a powerful cooling capacity of ${product.extraction} (suitable for areas of ${coverageVal}). It includes a simple window slider kit and flexible exhaust duct. To install, position the panel in a window, connect the hose from the unit to the panel, and plug it in.`
              },
              {
                q: `Does the ${nameToUse} require manual water drainage during operation?`,
                a: `Under normal cooling conditions, the unit is equipped with a self-evaporative system that recycles condensed water to cool the condenser coils and vents it out through the exhaust duct as steam. Manual drainage is only necessary in extremely humid conditions or in dedicated dehumidifier mode.`
              },
              {
                q: `What fan speeds and protection features does this portable AC have?`,
                a: `It supports ${fanSpeeds} fan speeds and has smart features like thermostatic cut-off, auto-shutoff, overheating protection, auto-diagnosis, and an anti-bacterial water tank for maximum safety and comfort.`
              }
            ]
            : [
              {
                q: `How much moisture can the ${nameToUse} extract, and what area does it cover?`,
                a: `The ${nameToUse} has a dehumidification capacity of ${product.extraction} per day and is engineered for coverage areas of ${coverageVal}.`
              },
              {
                q: `Does the ${nameToUse} include air purification capabilities?`,
                a: `${featuresList.some(f => /hepa|carbon|purif|filtr/.test(f.toLowerCase())) || techSummary.toLowerCase().includes("purif") || techSummary.toLowerCase().includes("hepa") ? `Yes! This model features advanced multi-stage air purification (including a HEPA and active carbon filter system) that effectively filters dust, allergens, PM2.5, and odors from the air while controlling humidity.` : `Yes, it is equipped with a high-efficiency dust filter that traps airborne particles, ensuring the air circulated back into the room is clean and filtered.`}`
              },
              {
                q: `What is the noise level of the ${nameToUse} during operation?`,
                a: `The unit operates at a quiet noise level of ${noise}, ensuring a peaceful indoor environment. This makes it perfect for bedrooms, studies, and living spaces without causing distraction.`
              },
              {
                q: `What is the water tank capacity and does it support auto-shutoff?`,
                a: `It features a ${tankCapacity} water tank with a full tank alarm and auto-shutoff function to prevent overflow. It also offers a continuous drainage port, letting you connect a hose for hands-free 24/7 moisture control.`
              }
            ];

  return (
    <div className="flex flex-col bg-white">
      {/* Dynamic SEO JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Navigator Banner */}
      {/* <div className="bg-brand-gray-light border-b border-brand-border/40 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-blue uppercase tracking-wider transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Equipment Catalog</span>
          </Link>
        </div>
      </div> */}

      {/* Main product specs panel */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Product Image & Gallery */}
            <div className="lg:col-span-6">
              <ScrollReveal delay={0.1}>
                <ProductImageGallery
                  images={productImages}
                  productName={nameToUse}
                  badge={product.badge}
                  amazonReviews={product.amazonReviews}
                  amazonLink={product.amazonLink}
                />
              </ScrollReveal>
            </div>

            {/* Right: Technical Details & Info */}
            <div className="lg:col-span-6 space-y-8">
              <ScrollReveal delay={0.1}>
                {/* <span className="text-[10px] font-bold text-brand-blue bg-brand-blue-light border border-brand-blue/15 px-3 py-1 rounded-full uppercase tracking-wider font-display">
                  {product.category}
                </span> */}
                <span className="inline-block pt-1 text-2xl border rounded-lg p-2 bg-red-100 font-bold text-brand-accent">
                  {product.subtitle}
                </span>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 mb-2">
                  <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy">
                    {nameToUse}
                  </h1>
                  {product.amazonLink && (
                    <a
                      href={product.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 font-sans text-xs sm:text-sm font-bold rounded-full shadow-xs active:scale-[0.98] transition-all duration-300 cursor-pointer bg-[#FFCE12] text-slate-900 hover:bg-[#e5b80b] hover:shadow-md shrink-0"
                    >
                      View On Amazon
                    </a>
                  )}
                </div>
              </ScrollReveal>

              {/* Features Section */}
              <div className="py-6 border-y border-brand-border/60">
                <ScrollReveal delay={0.2} className="space-y-3">
                  <h3 className="font-display font-semibold text-brand-navy text-sm uppercase tracking-wide flex items-center gap-1.5">
                    <Settings className="h-4 w-4 text-brand-blue" />
                    <span >Features</span>
                  </h3>
                  <ul className={`${product.features && product.features.length > 6
                      ? "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3"
                      : "space-y-3"
                    } text-sm text-brand-gray-dark font-medium`}>
                    {product.features && product.features.map((f, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Request a Callback button directly below features */}
                  <RequestCallbackModal productName={nameToUse} categoryName={product.category} />
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <ScrollReveal delay={0.3} className="space-y-4 mt-16">
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-400">
              Technical Specifications Ledger
            </h3>
            <div className="border border-brand-border rounded-2xl bg-white overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-brand-gray-light border-b border-brand-border font-display font-bold text-brand-navy text-[10px] uppercase tracking-wider">
                    <th className="px-6 py-4">Parameter Name</th>
                    <th className="px-6 py-4">Specification Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40 font-medium text-brand-gray-dark">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <tr key={key} className="hover:bg-brand-gray-light/35 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-brand-navy">{key}</td>
                      <td className="px-6 py-3.5">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Product Brochure Download CTA */}
          {product.brochure && (
            <ScrollReveal delay={0.4} className="mt-8">
              <div className="bg-gradient-to-br from-brand-gray-light to-white border border-brand-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-brand-blue-light border border-brand-blue/15 flex items-center justify-center text-brand-blue shrink-0">
                    <FileDown className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm sm:text-base text-brand-navy">
                      Product Brochure & Technical Datasheet
                    </h4>
                    <p className="text-xs text-brand-gray-medium leading-relaxed max-w-xl font-semibold">
                      Download the official PDF brochure for the {nameToUse}
                    </p>
                  </div>
                </div>
                <a
                  href={product.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#d41124] hover:bg-brand-navy text-white px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all duration-300 shrink-0 cursor-pointer transform active:scale-98"
                >
                  <FileDown className="h-4 w-4" />
                  <span>Download PDF Brochure</span>
                </a>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Inquiry and FAQs grid */}
      <section className="py-20 bg-brand-gray-light border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inquiry form column */}
          <div className="lg:col-span-5">
            {/* <InquiryForm productName={product.name} /> */}
            <ContactForm />
          </div>

          {/* Product type FAQ accordion column */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal delay={0.2} className="space-y-3">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display block">
                Technical FAQ
              </span>
              <h2 className="font-display font-bold text-2xl text-brand-navy">
                Questions Regarding Operation
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <FAQAccordion items={faqs} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display">
                RELATED MODELS
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-brand-navy">
                Related {categoryLabel}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {relatedProducts.map((rel, index) => {
                const relImages = defaultProductImages[rel.slug] || [rel.image];
                const relImage = relImages[0] || "/image1.jpg";
                return (
                  <ScrollReveal key={rel.slug} delay={0.1 * index}>
                    <div className="bg-white border border-brand-border rounded-xl p-5 hover:border-brand-blue/30 transition-colors flex gap-4 items-center">
                      <div className="h-16 w-16 bg-brand-gray-light rounded-lg border border-brand-border flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                        <Image
                          src={relImage}
                          alt={rel.name}
                          fill
                          sizes="64px"
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="space-y-1 min-w-0 flex-grow">
                        <h4 className="font-display font-bold text-sm text-brand-navy truncate">{rel.name}</h4>
                        <p className="text-[10px] text-brand-gray-medium font-semibold truncate">{rel.subtitle}</p>
                        <Link href={`/products/${rel.slug}`} prefetch={false} className="block text-[10px] text-brand-blue font-bold uppercase tracking-wider hover:text-brand-navy pt-1 transition-colors">
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
