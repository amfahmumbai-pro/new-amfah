"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function OfficeCardsClient() {
  return (
    <div className="grid grid-cols-1 gap-8">
      {/* Mumbai Office Card */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-8 border border-brand-border bg-white shadow-xs hover:shadow-md transition-shadow"
      >
        {/* Left: Mumbai Image & Title */}
        <div className="flex flex-col items-center gap-3 shrink-0 md:border-r md:border-brand-border/60 md:pr-10 md:w-44 text-center">
          <div className="relative w-20 h-20 md:w-24 md:h-24">
            <Image
              src="/contact/mumbai.png"
              alt="Mumbai Headquarters"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="font-bold text-xl md:text-2xl text-brand-navy tracking-wide uppercase">
            Mumbai
          </h3>
        </div>

        {/* Right: Info details */}
        <div className="flex-grow space-y-4 text-left w-full">
          {/* Address */}
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm md:text-base text-brand-navy font-bold leading-normal">
                AMFAH INDIA TRADING PVT LTD.
              </p>
              <p className="text-sm md:text-base text-brand-gray-dark font-medium leading-relaxed">
                153/C, Oshiwara Industrial Centre Premises CHS Ltd, Near Link Road, Opp. Oshiwara Bus Depot, Goregaon (West), Mumbai - 400104
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center shrink-0">
              <Phone className="h-4 w-4" />
            </div>
            <div className="text-sm md:text-base text-brand-gray-dark font-medium leading-relaxed space-y-1">
              <p>Toll Free: 022 40-107-074 (Between 10 AM to 7 PM) Monday to Saturday</p>
              <p>Call: +91 93219 91812 (Between 10 AM to 7 PM) Monday to Saturday</p>
              <p>Mobile: +91 93245 16323 (Between 10 AM to 7 PM) Monday to Saturday</p>
              <p>Whatsapp: +91 90046 63226 / +91 93219 91814 (Available 24/7 on Whatsapp)</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center shrink-0">
              <Mail className="h-4 w-4" />
            </div>
            <div className="text-sm md:text-base text-brand-gray-dark font-medium leading-relaxed space-y-0.5">
              <p><span className="font-semibold text-brand-navy">Email:</span> info.india@amfah.com</p>
              <p><span className="font-semibold text-brand-navy">Support:</span> amfahair@gmail.com</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delhi Office Card */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-8 border border-brand-border bg-white shadow-xs hover:shadow-md transition-shadow"
      >
        {/* Left: Delhi Image & Title */}
        <div className="flex flex-col items-center gap-3 shrink-0 md:border-r md:border-brand-border/60 md:pr-10 md:w-44 text-center">
          <div className="relative w-20 h-20 md:w-24 md:h-24">
            <Image
              src="/contact/delhi.webp"
              alt="Delhi Illustration"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="font-bold text-xl md:text-2xl text-brand-navy tracking-wide uppercase">
            Delhi
          </h3>
        </div>

        {/* Right: Info details */}
        <div className="flex-grow space-y-4 text-left w-full">
          {/* Address */}
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm md:text-base text-brand-navy font-bold leading-normal">
                AMFAH INDIA TRADING PVT LTD.
              </p>
              <p className="text-sm md:text-base text-brand-gray-dark font-medium leading-relaxed">
                Flat No. 201, H.No 1147, Block No. 111/9, Kishan Garh, Khasra No. 1674 Vasant Kunj, New Delhi - 110070
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center shrink-0">
              <Phone className="h-4 w-4" />
            </div>
            <div className="text-sm md:text-base text-brand-gray-dark font-medium leading-relaxed">
              <p>Mobile: +91 93219 91810 (Between 10 AM to 7 PM) Monday to Saturday</p>
              <p>WhatsApp: +91 90046 63226 / +91 93219 91814 (Available 24/7 on Whatsapp)</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center shrink-0">
              <Mail className="h-4 w-4" />
            </div>
            <div className="text-sm md:text-base text-brand-gray-dark font-medium leading-relaxed space-y-0.5">
              <p><span className="font-semibold text-brand-navy">Email:</span> info.india@amfah.com</p>
              <p><span className="font-semibold text-brand-navy">Support:</span> amfahair@gmail.com</p>
              {/* <p className="pl-13">mansoor.a@amfah.com</p> */}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dubai Office Card */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-8 border border-brand-border bg-white shadow-xs hover:shadow-md transition-shadow"
      >
        {/* Left: Dubai Image & Title */}
        <div className="flex flex-col items-center gap-3 shrink-0 md:border-r md:border-brand-border/60 md:pr-10 md:w-44 text-center">
          <div className="relative w-20 h-20 md:w-24 md:h-24">
            <Image
              src="/contact/dubai.webp"
              alt="Dubai Illustration"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="font-bold text-xl md:text-2xl text-brand-navy tracking-wide uppercase">
            Dubai
          </h3>
        </div>

        {/* Right: Info details */}
        <div className="flex-grow space-y-4 text-left w-full">
          {/* Address */}
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm md:text-base text-brand-navy font-bold leading-normal">
                AMFAH GENERAL TRADING LLC.
              </p>
              <p className="text-sm md:text-base text-brand-gray-dark font-medium leading-relaxed">
                22nd Street, Al Marabea Road, Al Quoz Industrial Area 2, Dubai, United Arab Emirates
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center shrink-0">
              <Phone className="h-4 w-4" />
            </div>
            <div className="text-sm md:text-base text-brand-gray-dark font-medium leading-relaxed space-y-1.5">
              <div>
                <p>Mobile: +971 42857732</p>
                <p>Mobile: +971 559838430</p>
                <p>Mobile: +971 565076139</p>
                <p>Whatsapp: +971 559838433</p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center shrink-0">
              <Mail className="h-4 w-4" />
            </div>
            <div className="text-sm md:text-base text-brand-gray-dark font-medium leading-relaxed space-y-0.5">
              <p><span className="font-semibold text-brand-navy">Email:</span> admin.dxb@amfah.com</p>
            </div>
          </div>

          {/* Website */}
          <div className="flex gap-4 items-start">
            <div className="h-8 w-8 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center shrink-0">
              <Globe className="h-4 w-4" />
            </div>
            <div className="text-sm md:text-base text-brand-gray-dark font-medium leading-relaxed space-y-0.5">
              <p>
                <span className="font-semibold text-brand-navy">Website:</span>{" "}
                <a
                  href="https://www.amfahfurnitures.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:underline"
                >
                  www.amfahfurnitures.ae
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
