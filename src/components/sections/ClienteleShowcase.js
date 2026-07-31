"use client";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";

const clienteles = {
  "Govt Institutions": [
    { name: "PMO India", image: "/clientels/1-150x150.png" },
    { name: "ISRO", image: "/clientels/isro.png" },
    { name: "BARC", image: "/clientels/2-1-150x150.png" },
    { name: "Indian Army", image: "/clientels/6-150x150.png" },
    { name: "MCGM", image: "/clientels/3-150x150.png" },
    { name: "Times of India", image: "/clientels/4-150x150.png" },
    { name: "US Embassy", image: "/clientels/5-150x150.png" },
    { name: "Embassy of Belgium", image: "/clientels/7-150x150.png" },
    { name: "UNICEF", image: "/clientels/UNICEF-logo-removebg-preview.png" },
    { name: "GOI", image: "/clientels/GOI.png" }
  ],
  "Healthcare": [
    { name: "AIIMS", image: "/clientels/17-150x150.png" },
    { name: "TIFR", image: "/clientels/69-150x150.png" },
    { name: "Apollo Hospitals", image: "/clientels/70-150x150.png" },
    { name: "CBR", image: "/clientels/71-150x150.png" },
    { name: "Batra Hospital", image: "/clientels/72-150x150.png" },
    { name: "Fortis", image: "/clientels/fortis-logo-1.png" },
    { name: "Asian Heart", image: "/clientels/74-150x150.png" },
    { name: "Max Healthcare", image: "/clientels/54-150x150.png" },
    { name: "Paras Healthcare", image: "/clientels/57-150x150.png" },
    { name: "Apex Hospital", image: "/clientels/59-150x150.png" },
    { name: "Apex Hospitals", image: "/clientels/52-150x150.png" },
    { name: "Balaji Hospital", image: "/clientels/63-150x150.png" },
    { name: "Sunrise Hospital", image: "/clientels/66-150x150.png" },
    { name: "Valentis Cancer Hospital", image: "/clientels/62-150x150.png" },
    { name: "BIMR Institutes", image: "/clientels/55-150x150.png" },
    { name: "Shanti Memorial Hospital", image: "/clientels/58-150x150.png" },
    { name: "Sree Chitra Tirunal", image: "/clientels/60-150x150.png" }
  ],
  "Pharma": [
    { name: "Ajanta Pharma", image: "/clientels/53-150x150.png" },
    { name: "Emcure", image: "/clientels/64-150x150.png" },
    { name: "Bliss GVS", image: "/clientels/56-150x150.png" },
    { name: "Premas Life Sciences", image: "/clientels/67-150x150.png" },
    { name: "Terumo", image: "/clientels/68-150x150.png" },
    { name: "inStem", image: "/clientels/18-150x150.png" },
    { name: "Serum Institute of India", image: "/clientels/19-150x150.png" }
  ],
  "IT/ Data Center": [
    { name: "Sify", image: "/clientels/75-150x150.png" },
    { name: "HCL", image: "/clientels/76-150x150.png" },
    { name: "Tech Mahindra", image: "/clientels/82-150x150.png" },
    { name: "Wipro", image: "/clientels/81-150x150.png" },
    { name: "Mumbai Metro", image: "/clientels/77-150x150.png" },
    { name: "Schneider Electric", image: "/clientels/80-150x150.png" },
    { name: "Cognizant", image: "/clientels/83-150x150.png" },
    { name: "Siemens", image: "/clientels/28-150x150.webp" },
    { name: "Mahindra", image: "/clientels/mahindra.png" },
    { name: "GVK", image: "/clientels/gvk.png" }
  ],
  "Hotels": [
    { name: "Sahara Star", image: "/clientels/95-150x150.png" },
    { name: "Novotel", image: "/clientels/87-150x150.png" },
    { name: "JW Marriott", image: "/clientels/jw marriott.png" },
    { name: "Hyatt", image: "/clientels/89-150x150.png" },
    { name: "Vivanta", image: "/clientels/90-150x150.png" },
    { name: "The Lalit", image: "/clientels/91-150x150.png" },
    { name: "Holiday Inn", image: "/clientels/92-150x150.png" },
    { name: "Oberoi", image: "/clientels/94-150x150.png" },
    { name: "St Regis", image: "/clientels/105-150x150.webp" },
    { name: "Taj Hotels Resorts", image: "/clientels/5a6828d015df50ed59c5c38743c781a7.png" },
    { name: "Four Seasons", image: "/clientels/93-150x150.png" },
    { name: "Pullman", image: "/clientels/97-150x150.png" },
    { name: "Oberoi Realty", image: "/clientels/Oberoi-Realty.png" },
    { name: "Emirates", image: "/clientels/emirates.png" }
  ],
  "Educational Institutions": [
    { name: "aes", image: "/clientels/9-150x150.png" },
    { name: "Woodstock School", image: "/clientels/11-150x150.png" },
    { name: "SVKM", image: "/clientels/14-150x150.png" },
    { name: "NITIE", image: "/clientels/15-150x150.png" },
    { name: "JBCN", image: "/clientels/10-150x150.png" },
    { name: "UPES", image: "/clientels/16-150x150.png" },
    { name: "IIT Madras", image: "/clientels/12-150x150.png" },
    { name: "IIT Bombay", image: "/clientels/13-150x150.png" },
    { name: "NISER", image: "/clientels/8-150x150.png" }
  ],
  "Banks": [
    { name: "RBI", image: "/clientels/46-150x150.webp" },
    { name: "Bank of Baroda", image: "/clientels/41-150x150.webp" },
    { name: "Kotak Mahindra Bank", image: "/clientels/40-150x150.webp" },
    { name: "SBI", image: "/clientels/45-150x150.webp" },
    { name: "Union Bank", image: "/clientels/44-150x150.webp" },
    { name: "Central Bank", image: "/clientels/43-150x150.webp" },
    { name: "HDFC Bank", image: "/clientels/42-150x150.webp" },
    { name: "Bank of Maharashtra", image: "/clientels/47-150x150.webp" },
    { name: "ICICI Bank", image: "/clientels/48-150x150.webp" },
    { name: "Canara Bank", image: "/clientels/49-150x150.webp" },
    { name: "Axis Bank", image: "/clientels/51-150x150.webp" },
    { name: "IndusInd Bank", image: "/clientels/50-150x150.webp" },
    { name: "Yes Bank", image: "/clientels/84-150x150.png" }
  ]
};

// Flatten and distribute all logos into two distinct rows for scrolling
const allLogos = Object.values(clienteles).flat();

// Filter duplicates by name if any, to keep it clean
const uniqueLogos = [];
const seenNames = new Set();
for (const logo of allLogos) {
  if (!seenNames.has(logo.name)) {
    seenNames.add(logo.name);
    uniqueLogos.push(logo);
  }
}

// Split into two balanced rows
const row1Logos = [];
const row2Logos = [];
uniqueLogos.forEach((logo, index) => {
  if (index % 2 === 0) {
    row1Logos.push(logo);
  } else {
    row2Logos.push(logo);
  }
});

export default function ClienteleShowcase() {
  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-slate-50 via-brand-blue-light/20 to-white border-b border-brand-border/60 relative overflow-hidden">
      {/* Subtle radial glow blobs for color accentuation */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-blue/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-brand-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      {/* Decorative dot grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:2.5rem_2.5rem] opacity-35 pointer-events-none" />

      <div className="max-w-8xl mx-auto px-2 md:px-8 relative z-10 space-y-12">
        {/* Section Title - Centered & Simple */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <ScrollReveal delay={0.1}>
            <span className="text-sm md:text-xl font-bold text-brand-blue uppercase tracking-widest font-display block">
              Clienteles
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-navy">
              Trusted by Industry Leaders
            </h2>
          </ScrollReveal>
        </div>

        {/* Dual Row Infinite Logo Marquees */}
        <div className="space-y-6 md:space-y-8 pt-2">
          {/* Row 1 (Scrolls Left) */}
          <ScrollReveal delay={0.25}>
            <div className="relative w-full overflow-hidden py-2">
              {/* Left and Right Fade Masks for marquee edges */}
              <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

              <div className="flex overflow-hidden select-none hover-pause gap-4 md:gap-6 w-full">
                {/* First loop of logos */}
                <div className="flex shrink-0 animate-marquee-clientele gap-4 md:gap-6 min-w-full justify-around items-center">
                  {row1Logos.map((logo, index) => (
                    <div
                      key={`row1-loop1-${logo.name}-${index}`}
                      className="bg-white border border-brand-border/60 rounded-xl p-4 flex items-center justify-center w-32 h-20 sm:w-52 sm:h-30 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-brand-blue/20 hover:scale-[1.03] transition-all duration-300 relative group overflow-hidden"
                    >
                       <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                       <div className="relative w-full h-[40px] sm:h-[70px] flex items-center justify-center">
                         <Image
                           src={logo.image}
                           alt={logo.name}
                           fill
                           sizes="(max-width: 640px) 45vw, 25vw"
                           className="object-contain transition-transform duration-300 group-hover:scale-105 z-10"
                         />
                       </div>
                    </div>
                  ))}
                </div>
                {/* Second loop of logos (duplicate for infinite scroll) */}
                <div className="flex shrink-0 animate-marquee-clientele gap-4 md:gap-6 min-w-full justify-around items-center" aria-hidden="true">
                  {row1Logos.map((logo, index) => (
                    <div
                      key={`row1-loop2-${logo.name}-${index}`}
                      className="bg-white border border-brand-border/60 rounded-xl p-4 flex items-center justify-center w-32 h-20 sm:w-52 sm:h-30 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-brand-blue/20 hover:scale-[1.03] transition-all duration-300 relative group overflow-hidden"
                    >
                       <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                       <div className="relative w-full h-[40px] sm:h-[70px] flex items-center justify-center">
                         <Image
                           src={logo.image}
                           alt={logo.name}
                           fill
                           sizes="(max-width: 640px) 45vw, 25vw"
                           className="object-contain transition-transform duration-300 group-hover:scale-105 z-10"
                         />
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Row 2 (Scrolls Right) */}
          <ScrollReveal delay={0.3}>
            <div className="relative w-full overflow-hidden py-2">
              {/* Left and Right Fade Masks for marquee edges */}
              <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

              <div className="flex overflow-hidden select-none hover-pause gap-4 md:gap-6 w-full">
                {/* First loop of logos */}
                <div className="flex shrink-0 animate-marquee-clientele-reverse gap-4 md:gap-6 min-w-full justify-around items-center">
                  {row2Logos.map((logo, index) => (
                    <div
                      key={`row2-loop1-${logo.name}-${index}`}
                      className="bg-white border border-brand-border/60 rounded-xl p-4 flex items-center justify-center w-32 h-20 sm:w-52 sm:h-30 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-brand-blue/20 hover:scale-[1.03] transition-all duration-300 relative group overflow-hidden"
                    >
                       <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                       <div className="relative w-full h-[40px] sm:h-[70px] flex items-center justify-center">
                         <Image
                           src={logo.image}
                           alt={logo.name}
                           fill
                           sizes="(max-width: 640px) 45vw, 25vw"
                           className="object-contain transition-transform duration-300 group-hover:scale-105 z-10"
                         />
                       </div>
                    </div>
                  ))}
                </div>
                {/* Second loop of logos (duplicate for infinite scroll) */}
                <div className="flex shrink-0 animate-marquee-clientele-reverse gap-4 md:gap-6 min-w-full justify-around items-center" aria-hidden="true">
                  {row2Logos.map((logo, index) => (
                    <div
                      key={`row2-loop2-${logo.name}-${index}`}
                      className="bg-white border border-brand-border/60 rounded-xl p-4 flex items-center justify-center w-32 h-20 sm:w-52 sm:h-30 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-brand-blue/20 hover:scale-[1.03] transition-all duration-300 relative group overflow-hidden"
                    >
                       <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                       <div className="relative w-full h-[40px] sm:h-[70px] flex items-center justify-center">
                         <Image
                           src={logo.image}
                           alt={logo.name}
                           fill
                           sizes="(max-width: 640px) 45vw, 25vw"
                           className="object-contain transition-transform duration-300 group-hover:scale-105 z-10"
                         />
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
