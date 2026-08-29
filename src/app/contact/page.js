import { MapPin, Clock, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import ScrollReveal from "@/components/animations/ScrollReveal";
import OfficeCardsClient from "./OfficeCardsClient";

export const metadata = {
  title: "Contact AMFAH | Mumbai & Delhi | Free Quote",
  description: "Get a free humidity audit and unit recommendation. AMFAH sales and service in Mumbai and New Delhi. Call, WhatsApp or send an enquiry.",
  alternates: {
    canonical: "https://amfah.com/contact",
  },
  openGraph: {
    title: "Contact AMFAH | Mumbai & Delhi | Free Quote",
    description: "Get a free humidity audit and unit recommendation. AMFAH sales and service in Mumbai and New Delhi. Call, WhatsApp or send an enquiry.",
    url: "https://amfah.com/contact",
    images: [
      {
        url: "/images/amfah-logo.png",
        alt: "Contact AMFAH India",
      },
    ],
  },
};

export default function ContactPage() {
  const contacts = [
    {
      icon: MapPin,
      title: "Corporate Headquarters",
      details: "AMFAH India Trading - Pvt. Ltd.",
      subDetails: "Oshiwara Ind Centre, Bus Depot, Prem CHS LTD, C-153, New Link Rd, opp. Oshiwara, Bhagat Singh II, Goregaon West, Mumbai, Maharashtra 400104",
    },
    {
      icon: Clock,
      title: "Operational Work Hours",
      details: "Monday - Saturday: 10:00 AM - 7:00 PM",
      subDetails: "Emergency Industrial SLA Support: 24/7 Available",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Title Header */}
      <section className="py-8 md:py-16 relative overflow-hidden">
        
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* <ScrollReveal delay={0.1}>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display bg-brand-blue-light px-3.5 py-1.5 rounded-full border border-brand-blue/15">
              Support Center
            </span>
          </ScrollReveal> */}
          <ScrollReveal delay={0.2}>
            <h1 className="font-display font-extrabold text-2xl md:text-4xl sm:text-5xl text-brand-navy leading-tight">
              Connect with Humidity Experts
            </h1>
          </ScrollReveal>
          {/* <ScrollReveal delay={0.3}>
            <p className="text-base text-brand-gray-medium leading-relaxed max-w-xl mx-auto">
              Have humidity challenges or sizing inquiries? Submit your environmental details below, and an expert relative humidity engineer will contact you in under two business hours.
            </p>
          </ScrollReveal> */}
        </div>
      </section>

      {/* Main Grid: Form + Office details */}
      <section className="bg-white pb-14">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Form Panel */}
            <div className="lg:col-span-7 space-y-8">
              <ScrollReveal delay={0.1}>
                <div className="bg-white border border-brand-border rounded-2xl p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                  <ContactForm />
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Address Cards & Map */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {contacts.map((contact, index) => (
                  <ScrollReveal
                    key={contact.title}
                    delay={0.1 * index}
                    className="flex gap-4 p-5 border border-brand-border rounded-xl bg-white hover:border-brand-blue/20 transition-colors"
                  >
                    <div className="h-10 w-10 bg-brand-blue-light text-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <contact.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-display font-bold text-sm text-brand-navy truncate">
                        {contact.title}
                      </h3>
                      <p className={`text-xs text-brand-gray-dark font-medium ${contact.title === "Corporate Headquarters" ? "break-words" : "truncate"}`}>
                        {contact.details}
                      </p>
                      <p className={`text-[10px] text-brand-gray-medium font-semibold ${contact.title === "Corporate Headquarters" ? "break-words" : "truncate"}`}>
                        {contact.subDetails}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Physical Map */}
              <ScrollReveal delay={0.3} className="relative aspect-video lg:aspect-auto lg:h-80 rounded-2xl border border-brand-border bg-brand-gray-light overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <iframe
                  title="AMFAH Corporate Office Location"
                  src="https://maps.google.com/maps?q=AMFAH%20INDIA%20-%20World's%20Finest%20Dehumidifiers%20%7C%20Expert%20in%20Air%20Quality%20%26%20Humidity%20Solutions&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Offices Section */}
      <section className="bg-white pb-20 pt-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-8">  
          <OfficeCardsClient />
        </div>
      </section>

      {/* Trust and SLA banner */}
      {/* <section className="py-12 bg-brand-navy text-white border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex gap-4 items-center flex-col md:flex-row">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-brand-blue-light">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">Guaranteed Support SLAs</h3>
              <p className="text-xs text-slate-300">All registered commercial inquiries receive phone callbacks within 120 minutes.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full uppercase">
            SECURE CLIMATE ENVELOPE
          </span>
        </div>
      </section> */}
    </div>
  );
}
