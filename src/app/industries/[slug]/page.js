import { notFound } from "next/navigation";
import { industries } from "@/data/industries";

export async function generateStaticParams() {
  return industries.map((ind) => ({
    slug: ind.slug,
  }));
}

export default async function IndustryDetailPage() {
  notFound();
}

// Keep original commented code below for future reference:
// import Link from "next/link";
// import { ArrowLeft, AlertTriangle, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";
// import Button from "@/components/ui/Button";
// import ScrollReveal from "@/components/animations/ScrollReveal";
// import FAQAccordion from "@/components/ui/FAQAccordion";
// import InquiryForm from "@/components/forms/InquiryForm";
// import { products } from "@/data/products";
// 
// // Generate dynamic metadata for search engines
// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   const industry = industries.find((ind) => ind.slug === slug);
// 
//   if (!industry) {
//     return {
//       title: "Industry Profile Not Found",
//     };
//   }
// 
//   return {
//     title: `${industry.name} Humidity Control Solutions | AMFAH`,
//     description: `Analyze standard relative humidity challenges, tailored AMFAH drying systems, and recommended hardware configurations for the ${industry.name}.`,
//     openGraph: {
//       title: `${industry.name} Humidity Solutions | AMFAH India`,
//       description: industry.problem,
//     },
//   };
// }
// 
// export default async function IndustryDetailPageOld({ params }) {
//   const { slug } = await params;
//   const industry = industries.find((ind) => ind.slug === slug);
//
//   if (!industry) {
//     notFound();
//   }

//   // Pre-fill rich FAQ schema for search console rich results
//   const faqSchema = {
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     "mainEntity": industry.faqs.map((faq) => ({
//       "@type": "Question",
//       "name": faq.q,
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": faq.a
//       }
//     }))
//   };

//   // Resolve matching product models
//   const recommendedHardware = products.filter((prod) =>
//     industry.relatedProducts.includes(prod.slug)
//   );

//   return (
//     <div className="flex flex-col bg-white">
//       {/* Dynamic SEO JSON-LD injection */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
//       />

//       {/* Back Navigator Banner */}
//       <div className="bg-brand-gray-light border-b border-brand-border/40 py-4">
//         <div className="max-w-7xl mx-auto px-6 md:px-8">
//           <Link
//             href="/industries"
//             className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-blue uppercase tracking-wider transition-colors duration-200"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span>Back to Industries Hub</span>
//           </Link>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <section className="bg-brand-gray-light border-b border-brand-border/60 py-20 relative overflow-hidden">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 pointer-events-none" />
        
//         <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
//           <ScrollReveal delay={0.1}>
//             <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display bg-brand-blue-light px-3.5 py-1.5 rounded-full border border-brand-blue/15">
//               Sector Solution Guide
//             </span>
//           </ScrollReveal>
//           <ScrollReveal delay={0.2}>
//             <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-brand-navy leading-tight">
//               {industry.title}
//             </h1>
//           </ScrollReveal>
//           <ScrollReveal delay={0.3}>
//             <div className="inline-flex bg-brand-navy text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-md font-display">
//               Required Threshold: {industry.targetRH}
//             </div>
//           </ScrollReveal>
//         </div>
//       </section>

//       {/* Detailed Problems & Solution Comparison */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
//           {/* Left Column: Challenges */}
//           <ScrollReveal delay={0.1} className="space-y-6 p-8 md:p-10 border border-amber-200 bg-amber-50/20 rounded-2xl">
//             <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
//               <AlertTriangle className="h-5 w-5" />
//             </div>
//             <div className="space-y-3">
//               <h2 className="font-display font-bold text-xl text-brand-navy">
//                 Critical Humidity Challenges
//               </h2>
//               <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
//                 Industrial Damage Factors
//               </p>
//             </div>
//             <p className="text-sm leading-relaxed text-brand-gray-dark/95">
//               {industry.problem}
//             </p>
//           </ScrollReveal>

//           {/* Right Column: Solution */}
//           <ScrollReveal delay={0.2} className="space-y-6 p-8 md:p-10 border border-brand-blue/20 bg-brand-blue-light/10 rounded-2xl">
//             <div className="h-10 w-10 bg-brand-blue-light text-brand-blue rounded-lg flex items-center justify-center">
//               <Lightbulb className="h-5 w-5" />
//             </div>
//             <div className="space-y-3">
//               <h2 className="font-display font-bold text-xl text-brand-navy">
//                 AMFAH Control Strategy
//               </h2>
//               <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
//                 Dry-Air Engineering Method
//               </p>
//             </div>
//             <p className="text-sm leading-relaxed text-brand-gray-dark/95">
//               {industry.solution}
//             </p>
//           </ScrollReveal>

//         </div>
//       </section>

//       {/* Sector Standards Checklist */}
//       {industry.features && (
//         <section className="py-16 bg-brand-gray-light border-y border-brand-border/60">
//           <div className="max-w-5xl mx-auto px-6 space-y-10">
//             <h3 className="font-display font-bold text-center text-lg text-brand-navy uppercase tracking-wider">
//               Control Benefits Checklist
//             </h3>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {industry.features.map((feat, index) => (
//                 <ScrollReveal
//                   key={index}
//                   delay={0.05 * index}
//                   className="flex gap-3 p-5 rounded-xl border border-brand-border bg-white"
//                 >
//                   <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
//                   <span className="text-xs font-semibold text-brand-gray-dark leading-relaxed">
//                     {feat}
//                   </span>
//                 </ScrollReveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Recommended Hardware Section */}
//       {recommendedHardware.length > 0 && (
//         <section className="py-20 bg-white">
//           <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
//             <div className="space-y-2 text-center md:text-left">
//               <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display block">
//                 Hardware Allocations
//               </span>
//               <h2 className="font-display font-bold text-2xl text-brand-navy">
//                 Recommended AMFAH Dehumidifiers for {industry.name}
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
//               {recommendedHardware.map((hw, index) => (
//                 <ScrollReveal
//                   key={hw.slug}
//                   delay={0.1 * index}
//                   className="bg-white border border-brand-border rounded-2xl p-6 hover:border-brand-blue/30 transition-all flex flex-col justify-between h-full hover:shadow-md"
//                 >
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center">
//                       <span className="bg-brand-gray-light text-[10px] font-bold text-brand-navy px-2.5 py-1 rounded border border-brand-border uppercase">
//                         {hw.category}
//                       </span>
//                       <span className="text-xs font-semibold text-brand-blue">{hw.extraction}</span>
//                     </div>
//                     <div>
//                       <h4 className="font-display font-bold text-lg text-brand-navy mb-1">{hw.name}</h4>
//                       <p className="text-xs text-brand-gray-medium font-semibold">{hw.subtitle}</p>
//                     </div>
//                     <p className="text-xs text-brand-gray-dark/80 leading-relaxed font-medium line-clamp-3">
//                       {hw.tech}
//                     </p>
//                   </div>
//                   <div className="pt-6 mt-6 border-t border-brand-border/40">
//                     <Link
//                       href={`/products/${hw.slug}`}
//                       className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider hover:text-brand-navy transition-colors"
//                     >
//                       <span>Explore Technical Specs</span>
//                       <ArrowRight className="h-4 w-4" />
//                     </Link>
//                   </div>
//                 </ScrollReveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Inquiry Form & Sector FAQs */}
//       <section className="py-20 bg-brand-gray-light border-t border-brand-border/60">
//         <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
//           {/* Inquiry form */}
//           <div className="lg:col-span-5">
//             <ScrollReveal delay={0.1}>
//               <InquiryForm productName={`${industry.name} Sizing Package`} />
//             </ScrollReveal>
//           </div>

//           {/* Sector FAQs */}
//           <div className="lg:col-span-7 space-y-6">
//             <ScrollReveal delay={0.2} className="space-y-3">
//               <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display block">
//                 Technical Knowledge
//               </span>
//               <h2 className="font-display font-bold text-2xl text-brand-navy">
//                 Humidity Control FAQs
//               </h2>
//             </ScrollReveal>
//             <ScrollReveal delay={0.3}>
//               <FAQAccordion items={industry.faqs} />
//             </ScrollReveal>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
