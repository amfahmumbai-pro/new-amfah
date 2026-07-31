// import { Landmark } from "lucide-react";
// import IndustryCard from "@/components/cards/IndustryCard";
// import ScrollReveal from "@/components/animations/ScrollReveal";
// import { industries } from "@/data/industries";

// export const metadata = {
//   title: "Industrial Humidity Applications | Sector Solutions Guide",
//   description: "Read detailed environmental solutions guides for Pharmaceuticals, Warehousing, Hospitals, Hotels, Cold Storage, Data Centers, and Manufacturing.",
// };

// export default function IndustriesPage() {
//   return (
//     <div className="flex flex-col bg-white">
//       {/* Industries Hero */}
//       <section className="bg-brand-gray-light border-b border-brand-border/60 py-20 relative overflow-hidden">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 pointer-events-none" />
        
//         <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
//           <ScrollReveal delay={0.1}>
//             <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display bg-brand-blue-light px-3.5 py-1.5 rounded-full border border-brand-blue/15">
//               Sector Case Studies
//             </span>
//           </ScrollReveal>
//           <ScrollReveal delay={0.2}>
//             <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
//               Bespoke Industrial Air Engineering
//             </h1>
//           </ScrollReveal>
//           <ScrollReveal delay={0.3}>
//             <p className="text-base text-brand-gray-medium leading-relaxed max-w-xl mx-auto">
//               Different environments require distinct relative humidity parameters. Explore how AMFAH controls moisture inside clinical cleanrooms, logistics zones, and data centers.
//             </p>
//           </ScrollReveal>
//         </div>
//       </section>

//       {/* Grid section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
//           <div className="space-y-2 text-center md:text-left">
//             <h2 className="font-display font-bold text-2xl text-brand-navy">
//               Industries Under Our Protection
//             </h2>
//             <p className="text-xs text-brand-gray-medium font-semibold uppercase tracking-wider">
//               Select a sector to analyze problems and customized AMFAH solutions
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {industries.map((ind, index) => (
//               <ScrollReveal key={ind.slug} delay={0.05 * index}>
//                 <IndustryCard industry={ind} />
//               </ScrollReveal>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { notFound } from "next/navigation";

export default function IndustriesPage() {
  notFound();
}

