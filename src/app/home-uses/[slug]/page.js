import { notFound } from "next/navigation";
import Link from "@/components/ui/AppLink";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShieldCheck, Heart, Droplets, CheckCircle2, AlertOctagon, Settings, Cpu, Layers } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ProductCard from "@/components/cards/ProductCard";
import { applications } from "@/data/applications";
import { products } from "@/data/products";
import { sortByCoverageArea } from "@/utils/productUtils";

// Generate dynamic SEO metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const appData = applications.find((app) => app.slug === slug && app.type === "home");

  if (!appData) {
    return {
      title: "Application Not Found",
    };
  }

  return {
    title: `Home Dehumidifiers for ${appData.name} | AMFAH`,
    description: appData.shortDescription,
  };
}

// Generate static params for fast loads
export async function generateStaticParams() {
  return applications
    .filter((app) => app.type === "home")
    .map((app) => ({
      slug: app.slug,
    }));
}

export default async function HomeUseDetailPage({ params }) {
  const { slug } = await params;
  const currentApp = applications.find((app) => app.slug === slug && app.type === "home");

  if (!currentApp) {
    notFound();
  }

  // Get all home applications for the sidebar
  const homeApps = applications.filter((app) => app.type === "home");

  // Get recommended product items
  const recommendedItems = sortByCoverageArea(
    products.filter((prod) =>
      currentApp.recommendedProducts.includes(prod.slug)
    )
  );

  // Custom risk factors for residential environments
  const riskFactors = [
    {
      title: "Mold & Musty Smells",
      desc: "Trapped moisture makes mold grow in wardrobes, carpets, and walls, causing bad damp smells."
    },
    {
      title: "Damaged Walls & Wood",
      desc: "Too much humidity warps wooden furniture, rusts metal parts, and makes wall paint bubble and peel."
    },
    {
      title: "Allergies & Bugs",
      desc: "Air that is too damp is a breeding ground for dust mites and mold, triggering asthma, allergies, and itchy skin."
    }
  ];

  // How AMFAH Controls moisture steps
  const controlSteps = [
    {
      step: "01",
      title: "Quietly Pulls in Damp Air",
      desc: "The machine pulls in damp room air through filters to catch dust and clean the air."
    },
    {
      step: "02",
      title: "Turns Humidity into Water",
      desc: "Inside the machine, cold coils turn the moisture in the air into water droplets that fall into the tank."
    },
    {
      step: "03",
      title: "Breathes Out Clean, Dry Air",
      desc: "The machine warms up the dry, filtered air and blows it back into your room, keeping your home fresh and healthy."
    }
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Main Grid Section */}
      <section className="py-4 md:py-12 bg-white">
        <div className="max-w-8xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Sidebar (Application Areas) */}
            <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-28 order-last lg:order-first">
              <div className="hidden lg:block border border-brand-border rounded-2xl p-5 bg-brand-gray-light/60 shadow-sm">
                <h3 className="font-display font-extrabold text-lg text-brand-navy mb-4 tracking-tight px-2 border-b border-brand-border/60 pb-3">
                  Application Areas
                </h3>
                <nav className="space-y-2">
                  {homeApps.map((app) => {
                    const isActive = app.slug === slug;
                    return (
                      <Link
                        key={app.slug}
                        href={`/home-uses/${app.slug}`}
                        prefetch={false}
                        className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all duration-300 ${
                          isActive
                            ? "bg-brand-blue-light/70 text-brand-blue border-brand-blue/20 shadow-sm"
                            : "bg-transparent text-brand-gray-dark border-transparent hover:bg-slate-50 hover:text-brand-blue"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Indicator Dot with Ring animation if active */}
                          <div className="relative flex items-center justify-center shrink-0">
                            {isActive && (
                              <span className="absolute inline-flex h-4 w-4 rounded-full bg-brand-accent/25 animate-ping" />
                            )}
                            <span
                              className={`relative h-2 w-2 rounded-full transition-colors ${
                                isActive ? "bg-brand-accent" : "bg-slate-300 group-hover:bg-brand-blue"
                              }`}
                            />
                          </div>
                          <span className={`text-sm md:text-base font-semibold tracking-wide ${isActive ? "font-bold" : ""}`}>
                            {app.name}
                          </span>
                        </div>
                        <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-300 opacity-0 group-hover:opacity-100 ${
                          isActive ? "text-brand-blue translate-x-0" : "text-brand-gray-medium translate-x-[-4px]"
                        }`} />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Technical Sizing Panel */}
              <div className="border border-brand-blue/15 bg-brand-blue-light/35 rounded-2xl p-6 space-y-4 shadow-sm">
                <h4 className="font-display font-bold text-xs text-brand-navy uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-brand-blue" />
                  <span>Home Air Services</span>
                </h4>
                <p className="text-xs text-brand-gray-medium leading-relaxed font-semibold">
                  Get expert advice and moisture testing for your home.
                </p>
                <Button
                  href="/contact"
                  variant="primary"
                  className="w-full text-xs font-bold py-2.5 bg-brand-blue text-white hover:bg-brand-navy-light"
                >
                  Talk to an Expert
                </Button>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:col-span-9 space-y-12 order-first lg:order-last">
              
              {/* Mobile-Only Horizontal Scroll Categories Navigation */}
              <div className="block lg:hidden bg-brand-gray-light border border-brand-border rounded-2xl p-4 shadow-sm mb-4">
                <div className="flex flex-col mb-3">
                  <h3 className="font-display font-extrabold text-sm text-brand-navy tracking-tight">
                    Application Areas
                  </h3>
                  <p className="text-[11px] text-brand-gray-medium font-semibold">
                    Swipe horizontally to explore other uses
                  </p>
                </div>
                <div className="relative">
                  {/* Left/Right Fades to indicate scrolling */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-brand-gray-light to-transparent pointer-events-none z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-brand-gray-light to-transparent pointer-events-none z-10" />
                  
                  <div className="flex gap-2.5 overflow-x-auto pb-1.5 pt-1 no-scrollbar scroll-smooth">
                    {homeApps.map((app) => {
                      const isActive = app.slug === slug;
                      return (
                        <Link
                          key={app.slug}
                          href={`/home-uses/${app.slug}`}
                          prefetch={false}
                          className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 whitespace-nowrap shrink-0 text-xs ${
                            isActive
                              ? "bg-brand-blue text-white border-brand-blue shadow-sm font-bold"
                              : "bg-white text-brand-gray-dark border-brand-border hover:bg-brand-blue-light hover:text-brand-blue hover:border-brand-blue/30 font-semibold"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                              isActive 
                                ? "bg-brand-accent ring-2 ring-brand-accent/30 animate-pulse" 
                                : "bg-slate-300 group-hover:bg-brand-blue"
                            }`}
                          />
                          <span>{app.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Header Title */}
              <div className="space-y-4">
                <span className="inline-block bg-brand-accent/10 text-brand-accent text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-brand-accent/10">
                  Home Use Guide
                </span>
                <h1 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-brand-navy tracking-tight leading-tight">
                  {currentApp.title}
                </h1>
                <p className="text-sm md:text-base text-brand-gray-medium leading-relaxed max-w-3xl text-justify">
                  {currentApp.shortDescription}
                </p>
              </div>

              {/* Main Image */}
              <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 w-full rounded-2xl overflow-hidden border border-brand-border shadow-md">
                <Image
                  src={currentApp.image}
                  alt={currentApp.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Description & Target RH Badge */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-6 border-t border-brand-border/60">
                {/* Left Side: Long Description */}
                <div className="md:col-span-8 space-y-6">
                  <p className="text-sm md:text-base text-brand-gray-dark/95 leading-relaxed text-justify whitespace-pre-line font-medium">
                    {currentApp.detailedDescription}
                  </p>
                  
                  {/* General Features Checklist */}
                  <div className="bg-brand-gray-light p-6 rounded-2xl border border-brand-border/60 space-y-4 shadow-sm">
                    <h4 className="font-display font-bold text-xs text-brand-navy uppercase tracking-widest flex items-center gap-2">
                      <Heart className="h-4.5 w-4.5 text-brand-accent animate-pulse" />
                      <span>Home Health & Comfort Standards</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-brand-gray-medium font-semibold">
                      <li className="flex gap-2.5 items-center">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                        <span>Stops allergy triggers (like dust mites & mold)</span>
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                        <span>Stops mold from growing on walls and ceilings</span>
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                        <span>Protects expensive wood, leather, and clothes</span>
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                        <span>Removes musty and damp smells</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Side: Required Threshold Badge */}
                <div className="md:col-span-4 space-y-6">
                  <div className="bg-brand-blue text-white p-6 rounded-2xl flex flex-col items-center text-center space-y-3 shadow-md">
                    <Droplets className="h-8 w-8 text-brand-blue-light animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Recommended RH Level</span>
                    <h3 className="font-display font-extrabold text-2xl tracking-tight text-white">
                      {currentApp.targetRH}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Section 1: Environmental Risk Factors (NEW CONTENT) */}
              <div className="pt-8 border-t border-brand-border/60 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-brand-navy">
                    Key Environmental Risk Factors
                  </h3>
                  <p className="text-xs text-brand-gray-medium font-semibold uppercase tracking-wider">
                    Uncontrolled moisture leads to critical damage
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {riskFactors.map((risk, index) => (
                    <div key={index} className="p-6 rounded-2xl border border-brand-border bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col space-y-3">
                      <div className="h-9 w-9 bg-brand-accent/5 rounded-lg flex items-center justify-center text-brand-accent">
                        <AlertOctagon className="h-5 w-5" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-brand-navy">
                        {risk.title}
                      </h4>
                      <p className="text-xs text-brand-gray-medium leading-relaxed font-semibold text-justify">
                        {risk.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: How AMFAH Solves It Timeline (NEW CONTENT) */}
              <div className="pt-8 border-t border-brand-border/60 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-brand-navy">
                    AMFAH Dehumidification Process
                  </h3>
                  <p className="text-xs text-brand-gray-medium font-semibold uppercase tracking-wider">
                    Three simple steps to control moisture in your room
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {controlSteps.map((step, index) => (
                    <div key={index} className="relative flex flex-col space-y-3 p-5 rounded-2xl bg-brand-gray-light border border-brand-border/60">
                      <span className="font-display font-extrabold text-3xl text-brand-blue/15 block select-none">
                        {step.step}
                      </span>
                      <h4 className="font-display font-bold text-sm text-brand-navy">
                        {step.title}
                      </h4>
                      <p className="text-xs text-brand-gray-medium leading-relaxed font-semibold text-justify">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>


              {/* Recommended Hardware Cards */}
              <div className="pt-8 border-t border-brand-border/60 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-brand-navy">
                    Recommended Dehumidifiers
                  </h3>
                  <p className="text-xs text-brand-gray-medium font-semibold uppercase tracking-wider">
                    Quiet smart dehumidifiers perfect for your {currentApp.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-6 max-w-4xl">
                  {recommendedItems.map((prod) => (
                    <ProductCard key={prod.slug} product={prod} />
                  ))}
                </div>
              </div>

            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
