import Image from "next/image";
import { ShieldCheck, Award, Users2, Leaf, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "About AMFAH | Air Quality & Humidity Since 2008",
  description: "AMFAH has supplied dehumidification and air quality systems since 2008 to AIIMS, ISRO, the Indian Army, Taj and Serum Institute. Mumbai and Delhi offices.",
  alternates: {
    canonical: "https://amfah.com/about/",
  },
  openGraph: {
    title: "About AMFAH | Air Quality & Humidity Since 2008",
    description: "AMFAH has supplied dehumidification and air quality systems since 2008 to AIIMS, ISRO, the Indian Army, Taj and Serum Institute. Mumbai and Delhi offices.",
    url: "https://amfah.com/about/",
    images: [
      {
        url: "https://amfah.com/banner/dehumidifiers.jpeg",
        alt: "About AMFAH India",
      },
    ],
  },
};

export default function AboutPage() {
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
        "name": "About AMFAH",
        "item": "https://amfah.com/about/"
      }
    ]
  };

  const values = [
    {
      icon: ShieldCheck,
      title: "German Technical Precision",
      desc: "We leverage engineering partnerships with global leaders to provide robust, fail-safe humidity control systems with strict GMP standards.",
    },
    {
      icon: Award,
      title: "Pioneering Innovation",
      desc: "From smart Wi-Fi models to Siemens PLC-calibrated multi-compressor industrial hubs, we push the limits of active moisture control.",
    },
    {
      icon: Users2,
      title: "Client-Centric Audits",
      desc: "Our engineers analyze thermal factors, structural cubic volume, and ventilation before specifying customized ducted installations.",
    },
    {
      icon: Leaf,
      title: "Ecological Commitment",
      desc: "We utilize eco-friendly refrigerants like R410A and R407C, aiming for maximum energy extraction with minimal electricity consumption.",
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Section */}
      <section className="relative py-8 md:py-20 overflow-hidden border-b border-brand-border/20 text-white bg-slate-900">
        {/* Background Image with blur and dark blue overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner/dehumidifiers.jpeg"
            alt="Corporate Heritage Background"
            fill
            priority
            className="object-cover blur-[2px] opacity-50"
          />
          {/* Deep blue overlay to achieve the premium aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1251a0]/80 via-[#0e3f7c]/70 to-[#1251a0]/85 mix-blend-multiply" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4 relative z-10">
          <ScrollReveal delay={0.1} className="space-y-2">
            <h1 className="font-display font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-tight uppercase leading-tight">
              AMFAH INDIA Air Quality and Humidity Solutions.
            </h1>
            <div className="space-y-1">
              <h2 className="font-display font-extrabold text-sm sm:text-base md:text-lg text-amber-400 uppercase tracking-tight">
                India's Only Trusted Government-Approved, Patented & Licensed Brand Specializing in Air Quality and Humidity Solutions
              </h2>
              <h2 className="font-display font-extrabold text-sm sm:text-base md:text-lg text-amber-400 tracking-tight">
                THE MOST PREFERRED BRAND ON THE GOVERNMENT e-MARKETPLACE (GeM) PORTAL
              </h2>
              <p className="italic text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide text-slate-300 uppercase">
                A Group Company of AMFAH GENERAL TRADING LLC, Dubai
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.25} className="space-y-4 max-w-7xl mx-auto text-left md:text-center text-xs sm:text-sm md:text-base leading-relaxed text-slate-200">
            <p className="italic text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide text-slate-300 uppercase">
                What we do:
              </p>
            <p className="text-slate-100">
              <span className="block">Making Air Quality & Humidity Control Simple Through World-Class Technology</span>
          
              Founded in 2008, AMFAH INDIA Air Quality & Humidity Solutions Ltd. is a trusted leader in delivering advanced indoor air quality and humidity management solutions. In collaboration with leading global technology partners, we provide customized, turnkey solutions that create healthier, safer, and more efficient indoor environments.

            </p>
            <p>
             Our expertise serves a wide range of industries, including pharmaceuticals, FMCG, healthcare, hospitality, government organizations, commercial establishments, manufacturing facilities, educational institutions, and other critical environments where air quality and humidity control are essential.
            </p>
            <p>
              Recognized as one of <span className="text-yellow-300 font-bold underline">The Most Preferred Brand on the Government e Marketplace (GeM) Portal</span> and backed by patented innovations, AMFAH India is committed to engineering excellence, product reliability, and customer satisfaction.
            </p>
            <p>
              Beyond delivering innovative solutions, we are dedicated to improving public health through our CSR initiatives and the AMFAH Foundation. We actively promote awareness of the importance of maintaining optimal indoor humidity levels between 40–60% RH, helping organizations create healthier, more comfortable, and sustainable indoor spaces.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder & Foundation Journey Section */}
      <section className="py-16 md:py-24 bg-white text-brand-navy">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16 md:space-y-20">
          
          {/* Row 1: Mansoor Ali Introduction */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="md:col-span-7 space-y-15">
              <ScrollReveal delay={0.1}>
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#1251a0] tracking-tight uppercase leading-tight">
                  Mansoor Ali
                </h2>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-blue mt-1">
                  Expert in Air Quality & Humidity Solutions
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2} className="space-y-10 text-sm sm:text-base text-brand-gray-dark/95 leading-relaxed font-normal">
                <p>
                  a globally renowned figure in Indoor Air Quality, boasts over three decades of industry experience. Amid the Covid-19 pandemic, he emerged as a courageous business leader in Mumbai, showcasing the virus's airborne transmission to influential stakeholders. Acknowledged as a local advocate, his impactful initiatives were honored with Social Impact awards from Radio City 91.1FM and various media outlets.
                </p>
                <p>
                  With a background spanning diverse consumer durables companies, Mansoor Ali passionately champions indoor air quality and humidity solutions. His journey, evolving from a management trainee to a business head and entrepreneur, culminated in founding AMFAH INDIA in 2007, underscoring his commitment.
                </p>
              </ScrollReveal>
            </div>
            
            {/* Right Photo */}
            <ScrollReveal delay={0.3} className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-brand-border/60 bg-brand-gray-light">
                <Image
                  src="/about/mansoor.webp"
                  alt="Mansoor Ali"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Row 2: Ineffectiveness of Air Purifiers without Humidity Control */}
          <ScrollReveal delay={0.2} className="w-full">
            <div className="bg-[#1251a0]/5 border-l-4 border-[#1251a0] p-6 md:p-8 rounded-r-3xl">
              <p className="text-sm sm:text-base md:text-lg text-brand-navy font-semibold leading-relaxed">
                Without humidity control, air purifiers are ineffective in India and other highly tropical countries. The ideal air quality solution must include HEPA filtration and humidity control in its ventilation functions to be truly effective. The situation in India is getting worse, with only a few brands, companies, and experts understanding the true seriousness of the problem. As a tropical country, India faces major challenges in maintaining good indoor air quality, which depends on proper air filtration, ventilation, and humidity control.
              </p>
            </div>
          </ScrollReveal>

          {/* Row 3: Air Quality & Patented Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="md:col-span-7 space-y-4 text-sm sm:text-base text-brand-gray-dark/95 leading-relaxed font-normal">
              <ScrollReveal delay={0.2} className="space-y-8">
                <p>
                  This important issue was highlighted by Mr. Mansoor Ali - the Founder and Director of AMFAH INDIA, who is pioneer in India raising the issue on Air Quality with humidity.
                </p>
                <p>
                  His research during COVID-19 highlighted the urgent need for better air quality solutions. In response, he developed a Patented product in collaboration with Health Ministry officials in India, under the new Carali series, working with the world's top technology partners. The Carali series offers the right mix of air filtration and humidity control for indoor environments and was patented by the Government of India in 2024.
                </p>
              </ScrollReveal>
            </div>
            
            {/* Right Photo */}
            <ScrollReveal delay={0.3} className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-brand-border/60 bg-brand-gray-light">
                <Image
                  src="/about/award.jpeg"
                  alt="Inclusive Society & Outreach Events"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Row 4: Smart Commute & Foundation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Photo */}
            <ScrollReveal delay={0.3} className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[5/4] rounded-xl overflow-hidden shadow-lg border border-brand-border/60 bg-brand-gray-light">
                <Image
                  src="/about/award2.jpeg"
                  alt="Mansoor Ali receiving award"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </ScrollReveal>
            
            {/* Right Content */}
            <div className="md:col-span-7 space-y-4 text-sm sm:text-base text-brand-gray-dark/95 leading-relaxed font-normal">
              <ScrollReveal delay={0.2} className="space-y-8">
                <p>
                  Moreover, he holds the role of Strategy Director at The Smart Commute, a reputable sustainability organization promoting cycling as an eco-friendly mode of daily transportation, fostering a healthier and happier urban environment.
                </p>
                <p>
                  In response to post-pandemic challenges, especially in indoor air quality and the airborne virus domain, Ali established AMFAH FOUNDATION to further contribute to the cause.
                </p>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </section>

      {/* India & Dubai Division Section */}
      <section className="py-16 bg-white border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* AMFAH - INDIA */}
            <ScrollReveal delay={0.2} className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-1">
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-accent tracking-wide uppercase">
                  AMFAH - INDIA
                </h2>
                <p className="font-display font-semibold text-lg sm:text-xl text-brand-navy">
                  Air Treatment Products
                </p>
              </div>
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src="/about/air-treatment.jpeg"
                  alt="AMFAH India - Air Treatment Products"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </ScrollReveal>

            {/* AMFAH - DUBAI */}
            <ScrollReveal delay={0.2} className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-1">
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-accent tracking-wide uppercase">
                  AMFAH - DUBAI
                </h2>
                <p className="font-display font-semibold text-lg sm:text-xl text-brand-navy">
                  Office Furniture
                </p>
              </div>
              <a 
                href="https://amfahfurnitures.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 block group cursor-pointer"
              >
                <Image
                  src="/about/Office Furniture.webp"
                  alt="AMFAH Dubai - Office Furniture"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </a>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* AMFAH India Heritage & Outreach Section */}
      <section className="py-20 bg-brand-gray-light border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Gateway Image Container */}
            <ScrollReveal delay={0.1} className="md:col-span-5 flex justify-center items-center w-full">
              <div className="w-full aspect-[4/3] sm:aspect-square relative border border-slate-200 bg-white p-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/about/mumbai.png"
                    alt="AMFAH India - Mumbai Heritage"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* AMFAH India Story */}
            <div className="md:col-span-7 space-y-6">
              <ScrollReveal delay={0.2}>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy tracking-tight uppercase">
                  AMFAH INDIA
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.3} className="space-y-4 text-sm sm:text-base text-brand-gray-dark/90 leading-relaxed font-sans font-normal">
                <p>
                  AMFAH India is an industry leader in air treatment solutions and a group company of AMFAH General Trading LLC, Dubai. Since 2008, we have introduced world-class products to India including domestic and commercial dehumidifiers, air purifiers, Air-to-Water systems, and portable air conditioners backed by partnerships with leading technology innovators worldwide.
                </p>
                <p>
                  <span className="text-brand-blue font-bold underline">The Most Preferred Brand on the Government e-Marketplace (GeM) Portal, and India's only Brand having patent licence for Air Force and Humidity Solutions:</span><br/> Amfah India brings a level of credibility and engineering depth that sets us apart in the industry. We are equally committed to education and awareness helping industries, institutions, and individuals understand the real impact of poor humidity control and air quality. From dampness, mold, and mildew to respiratory conditions like asthma, we address the full spectrum of air quality challenges and the serious consequences of leaving them unresolved. Since the COVID-19 pandemic, we have been at the forefront of advocating for proper humidity control as a frontline defense against airborne viruses contributing through active research, public awareness campaigns, and meaningful CSR initiatives.
                </p>
              </ScrollReveal>
            </div>

          </div>

          {/* Offerings & Clients Spanning Sections */}
          <ScrollReveal delay={0.4} className="mt-12 space-y-6 text-sm sm:text-base text-brand-gray-dark/90 leading-relaxed font-sans font-normal">
            <p>
                Our solutions serve across Healthcare / Hospitals & Clinics / Testing Laboratories / Hotels & Restaurants / Art Galleries & Boutiques / Printing Industries / Equipment & Console Rooms / Libraries & Archives / Food & Packing Industries / Pharmaceutical Facilities / Data & Server Rooms / Warehouse & Storage Facilities.
            </p>
            <p>
              Our clients include Reliance Industries, Wipro, Novartis, Cognizant, TATA Communications, ASUS, Siemens, Jubilant Foodworks, Parle Agro, ICICI Bank, Yes Bank, RBS Bank, Four Seasons Hotel, AIIMS Hospital Delhi, Emirates Airways, Hyundai Motors, Mahindra Rise, the US Consulate, and many more.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* AMFAH Dubai Heritage & Outreach Section */}
      <section className="py-20 bg-white border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Dubai Skyline Image Container */}
            <ScrollReveal delay={0.1} className="md:col-span-5 flex justify-center items-center w-full">
              <div className="w-full aspect-[4/3] sm:aspect-square relative border border-slate-200 bg-white p-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/about/dubai.webp"
                    alt="AMFAH Dubai - Dubai Heritage"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* AMFAH Dubai Story */}
            <div className="md:col-span-7 space-y-6">
              <ScrollReveal delay={0.2}>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy tracking-tight uppercase">
                  AMFAH DUBAI
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.3} className="space-y-4 text-sm sm:text-base text-brand-gray-dark/90 leading-relaxed font-sans font-normal">
                <p>
                  AMFAH Dubai, the Dubai-based division of the AMFAH Group, specializes in delivering high-quality office interior and furniture solutions across the UAE and the wider Middle East region. Operating from its office and showroom in Al Quoz, Dubai, the company provides comprehensive, end-to-end solutions for modern workspaces, supported by a strong network of trusted suppliers, traders, and industry partners.
                </p>
                <p>
                  With extensive experience in office space planning and workplace transformation, AMFAH Dubai collaborates with leading international manufacturers to source customized solutions that meet diverse business requirements while maintaining exceptional value and competitive pricing. From office furniture and interior fit-outs to workspace optimization, the company is committed to creating functional, aesthetically appealing, and productive environments.
                </p>
                <p>
                  AMFAH Dubai has earned a reputation for reliability, quality, and customer satisfaction, reflected in its strong portfolio of successful projects and positive testimonials from government organizations, corporate enterprises, and private businesses throughout Dubai and the Middle East.
                </p>
                
              </ScrollReveal>
            </div>

          </div>

          <ScrollReveal delay={0.4} className="mt-6 text-sm sm:text-base text-brand-gray-dark/90 leading-relaxed font-sans font-normal">
                  <p>
                    As part of its growth strategy, AMFAH Dubai continues to expand its product portfolio, offering an increasingly diverse range of office interiors, furniture solutions, and consumer durable products to meet the evolving needs of modern businesses and consumers.
                  </p>
                </ScrollReveal>
        </div>
      </section>

      {/* Core Values Grid */}
      {/* <section className="py-20 bg-brand-gray-light border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display">
              Corporate Creed
            </span>
            <h2 className="font-display font-bold text-3xl text-brand-navy">
              Pillars of Our Engineering
            </h2>
            <p className="text-sm text-brand-gray-medium">
              We anchor our operational principles to four core commitments, guaranteeing top quality in every solution we ship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={0.1 * i} className="bg-white border border-brand-border p-6 md:p-8 rounded-2xl space-y-4 hover:border-brand-blue/20 transition-colors">
                <div className="h-10 w-10 bg-brand-blue-light text-brand-blue rounded-lg flex items-center justify-center">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-navy">{v.title}</h3>
                <p className="text-xs text-brand-gray-medium leading-relaxed">{v.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section> */}


      {/* AMFAH Foundation Sections */}
      {/* 1. Aiming for Healthy Indoor Air */}
      <section className="py-20 bg-[#b9e3cb] text-[#032e18]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight">
                Aiming for Healthy Indoor Air
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-sm font-semibold tracking-wide uppercase text-[#032e18]/80">
                The Fight for Improved Indoor Air Quality
              </p>
            </ScrollReveal>
          </div>

          {/* Split Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <ScrollReveal delay={0.2} className="space-y-6 text-center md:text-left">
              <span className="text-sm md:text-base font-medium text-[#032e18]/80 block italic">
                In post-pandemic world,
              </span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
                The need for indoor air quality with humidity solutions
              </h3>
              <div className="pt-4 border-t border-[#032e18]/20">
                <span className="text-xs uppercase tracking-wider text-[#7c600c] font-bold block mb-1">
                  An Initiative by
                </span>
                <span className="text-lg font-bold text-[#7c600c] font-display">
                  AMFAH Foundation
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square bg-white p-4 rounded-3xl shadow-lg border border-white/40">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/about/hero.jpg"
                    alt="Aiming for Healthy Indoor Air"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Join the Mission */}
      <section className="py-16 bg-[#063b21] text-white border-y border-[#032e18]/30">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <ScrollReveal delay={0.1}>
            <p className="text-lg md:text-xl leading-relaxed font-normal">
              Join the <span className="text-amber-400 font-bold font-display">AMFAH FOUNDATION</span> in its crucial mission to provide clean air to those who need it most, including <span className="text-amber-400 font-semibold">Elderly Homes</span>, <span className="text-amber-400 font-semibold">Maternity Wards</span>, and <span className="text-amber-400 font-semibold">Underprivileged Schools</span>.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base text-slate-200 leading-relaxed font-normal">
              As senior citizens have higher comorbidities, newborns in maternity wards and Children under 10 have lower immunity are at a higher risk of infection.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-base text-slate-200 leading-relaxed font-normal">
              By supporting Amfah Foundation, you can contribute to the effort of providing a safe and healthy environment for these vulnerable populations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Vulnerable Sectors Columns */}
      <section className="py-20 bg-[#b9e3cb] text-[#032e18]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Elderly Homes */}
            <ScrollReveal delay={0.1} className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-white/20">
                <Image
                  src="/about/room.png"
                  alt="Elderly homes"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xl">Elderly homes</h4>
                <p className="text-sm text-[#032e18]/85 leading-relaxed max-w-xs">
                  Senior citizens are prone to the risk of many health challenges including the threats from Indoor Air Quality
                </p>
              </div>
            </ScrollReveal>

            {/* Maternity Wards */}
            <ScrollReveal delay={0.2} className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-white/20">
                <Image
                  src="/about/hospital.png"
                  alt="Maternity Wards"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xl">Maternity Wards</h4>
                <p className="text-sm text-[#032e18]/85 leading-relaxed max-w-xs">
                  Newborns in maternity wards are at a higher risk of airborne infection.
                </p>
              </div>
            </ScrollReveal>

            {/* Underprivileged Schools */}
            <ScrollReveal delay={0.3} className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-white/20">
                <Image
                  src="/about/children.png"
                  alt="Underprivileged schools"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xl">Underprivileged schools</h4>
                <p className="text-sm text-[#032e18]/85 leading-relaxed max-w-xs">
                  Bad Air Quality can invite a wide range of health issues like diarrhea, typhoid, etc. which can lead to low immunity.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4} className="text-center">
            <p className="text-base md:text-lg font-bold text-[#063b21] max-w-3xl mx-auto leading-relaxed">
              By supporting the Amfah Foundation — dedicated to IAQ you can contribute to the effort of providing a safe and healthy environment for these vulnerable populations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Leader Spearheading the Cause */}
      <section className="py-20 bg-[#b9e3cb] text-[#032e18] border-t border-[#032e18]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch max-w-6xl mx-auto">
            {/* Text Card */}
            <ScrollReveal delay={0.1} className="bg-[#063b21] text-white p-6 sm:p-8 md:p-12 rounded-sm flex flex-col justify-center shadow-lg border border-[#032e18]/30 w-full md:min-h-[520px]">
              <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
                Leader
              </span>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight mt-2 mb-4 leading-tight">
                SPEARHEADING the cause
              </h3>
              <h4 className="text-amber-400 font-display font-bold text-xl mb-4">
                Mansoor Ali
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                An entrepreneur adapted to the challenges of COVID-19 and became a social entrepreneur, channeling their entrepreneurial spirit into making a positive social impact.
              </p>
            </ScrollReveal>

            {/* Photo Card */}
            <ScrollReveal delay={0.2} className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-auto rounded-sm overflow-hidden shadow-lg border border-white/20 md:min-h-[520px]">
              <Image
                src="/about/mansoor.webp"
                alt="Mansoor Ali"
                fill
                className="object-cover"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Prioritize Your Immunity Banner */}
      <section className="relative py-28 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 h-full">
          <Image
            src="/about/support.jpeg"
            alt="Supportive Hands"
            fill
            className="object-fit opacity-50 filter grayscale contrast-125"
          />
          {/* Grayscale overlay & deep blend to fit layout */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2e24]/50 via-[#0a2316]/60 to-[#1c2e24]/50 mix-blend-multiply" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
          <ScrollReveal delay={0.1}>
            <p className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight max-w-3xl mx-auto">
              "In post-Pandemic world, Prioritize Your Immunity, Air Quality, and Mental Well-being."
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="space-y-1">
            <p className="text-amber-400 font-display font-bold text-lg md:text-xl">
              - Mansoor Ali
            </p>
            <p className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
              Founder AMFAH GROUP
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Sub-banner footer */}
      <div className="bg-[#b9e3cb] py-4 border-t border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs md:text-sm font-bold tracking-wider uppercase text-[#032e18]">
            AMFAH FOUNDATION AIMS TO PROTECT SILENT SUFFERERS FROM AIRBORNE THREATS & CHALLENGES.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-20 bg-brand-gray-light border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-[140px]">
              <ScrollReveal delay={0.1}>
                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display bg-brand-blue-light px-3.5 py-1.5 rounded-full border border-brand-blue/15">
                  Get In Touch
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="space-y-4">
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-navy leading-tight">
                  Require Inquiry or Support?
                </h2>
                <span className="font-semibold">
                  Address:
                </span>
                <p className="text-sm text-brand-gray-medium leading-relaxed">
                  AMFAH INDIA TRADING PVT LTD. C-153, Oshiwara Industrial Centre Premises Co. Op. Society Ltd, Opp. Oshiwara Bus Depot, Near New Link Road, Goregaon West, Mumbai 400 104. (India).
                </p>
                <span className="font-semibold">
                  Mobile:
                </span>
                <p className="text-sm text-brand-gray-medium leading-relaxed">
                  +91 93245 16326
                  <br/>
                  +91 93219 91812
                  <br/>
                  +91 90046 63226
                </p>
                <span className="font-semibold">
                  Email:
                </span>
                <p className="text-sm text-brand-gray-medium leading-relaxed">
                  info.india@amfah.com<br/>
                  amfahair@gmail.com
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3} className="pt-4 border-t border-brand-border/60">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-brand-gray-dark uppercase tracking-wider">
                    Our Commitment:
                  </p>
                  <ul className="space-y-2 text-xs text-brand-gray-medium">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                      Free Expert Guidance
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                      Supply & Installation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                      Response within 2 hours
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.2}>
                <div className="bg-white border border-brand-border rounded-2xl p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                  <ContactForm />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
