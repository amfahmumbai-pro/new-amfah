"use client";
import Link from "@/components/ui/AppLink";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageSquareCode, Smartphone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home Profile", href: "/" },
    { name: "Our Expertise", href: "/about" },
    { name: "All Dehumidifiers", href: "/products" },
    { name: "Patent Licence", href: "/pdf/patent-licence.pdf", isPdf: true },
    { name: "Get in Touch", href: "/contact" },
  ];

  return (
    <footer className="bg-brand-gray-light border-t border-brand-border text-brand-gray-dark font-sans pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
        {/* Brand Information & WhatsApp CTA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center">
            <Image
              src="/New-Logo-3.png"
              alt="AMFAH Logo"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed text-brand-gray-medium">
            Since 2008, AMFAH has been delivering trusted air treatment solutions that improve air quality, control humidity, and create healthier indoor environments for homes, businesses, and industries.
          </p>
          <div className="pt-2 flex flex-col gap-4">
            <a
              href="https://wa.me/919004663226?text=Hi%20AMFAH%20team,%20I'm%20interested%20in%20your%20humidity%20control%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-display font-semibold text-sm px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer w-full sm:w-auto"
            >
              <MessageSquareCode className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
            
            {/* Premium Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/officialamfahindia/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full shrink-0 aspect-square bg-white hover:bg-[#1251a0] hover:text-white border border-brand-border text-brand-gray-medium flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-110 cursor-pointer"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              
              <a
                href="https://www.instagram.com/amfah_airquality/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full shrink-0 aspect-square bg-white hover:bg-gradient-to-tr hover:from-amber-400 hover:via-pink-500 hover:to-purple-600 hover:text-white border border-brand-border text-brand-gray-medium flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-110 cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              
              <a
                href="https://www.linkedin.com/company/amfah-india-trading-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full shrink-0 aspect-square bg-white hover:bg-[#0077b5] hover:text-white border border-brand-border text-brand-gray-medium flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-110 cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              
              <a
                href="https://x.com/amfahindia"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full shrink-0 aspect-square bg-white hover:bg-black hover:text-white border border-brand-border text-brand-gray-medium flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-110 cursor-pointer"
                aria-label="X"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              
              <a
                href="https://www.youtube.com/@AMFAHINDIA"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full shrink-0 aspect-square bg-white hover:bg-[#ff0000] hover:text-white border border-brand-border text-brand-gray-medium flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-110 cursor-pointer"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              
              <a
                href="https://in.pinterest.com/amfahhumiditysolutions/?invite_code=73ee0de8dd354f7ba2d0afca3e1bfa70&sender=694891554912906208"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full shrink-0 aspect-square bg-white hover:bg-[#bd081c] hover:text-white border border-brand-border text-brand-gray-medium flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-110 cursor-pointer"
                aria-label="Pinterest"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="12" y1="8" x2="12" y2="22" />
                  <path d="M12 2a10 10 0 0 0-10 10c0 4.1 2.5 7.6 6 9.1-.1-.8-.1-2.1.2-3 .3-.9 1.8-7.7 1.8-7.7s-.5-1-.5-2.4c0-2.3 1.3-4 3-4 1.4 0 2.1 1.1 2.1 2.4 0 1.4-.9 3.6-1.4 5.6-.4 1.7.9 3.1 2.6 3.1 3.1 0 5.5-3.3 5.5-8.1 0-4.2-3-7.2-7.4-7.2-5 0-8 3.8-8 7.7 0 1.5.6 3.2 1.3 4.1.1.1.1.3 0 .4l-.5 2.1c0 .2-.2.3-.4.2-1.8-.8-3-3.6-3-5.8 0-4.7 3.4-9.1 9.9-9.1 5.2 0 9.2 3.7 9.2 8.6 0 5.2-3.3 9.4-7.8 9.4-1.5 0-3-.8-3.5-1.7l-1 3.7c-.3 1.3-1.3 2.9-2 4 1 .3 2.1.5 3.2.5a10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Company Quick Links */}
        <div className="lg:col-span-2">
          <h3 className="font-display font-bold text-brand-navy text-sm uppercase tracking-wider mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3.5">
            {quickLinks.map((link) => (
              <li key={link.name}>
                {link.isPdf ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors duration-250"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-brand-gray-medium hover:text-brand-blue transition-colors duration-250"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact: Corporate Office */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h3 className="font-display font-bold text-brand-navy text-sm uppercase tracking-wider mb-6">
              Corporate Office
            </h3>
            <ul className="space-y-2">
              <li className="flex gap-3 text-sm text-brand-gray-medium">
                <MapPin className="h-5 w-5 text-brand-blue flex-shrink-0" />
                <span className="leading-relaxed">AMFAH INDIA TRADING PVT LTD.
                  153/C, Oshiwara Industrial Centre Premises CHS Ltd, Near Link Road, Opp. Oshiwara Bus Depot, Goregaon (West), Mumbai - 400104
                </span>
              </li>
              <li className="flex gap-3 text-xs text-brand-gray-medium items-center">
                <Phone className="h-4 w-4 text-brand-blue flex-shrink-0" />
                <a href="tel:02240107074" className="hover:text-brand-blue font-medium">Toll Free: 022 40-107-074</a>
              </li>
              <li className="flex gap-3 text-xs text-brand-gray-medium items-center">
                <Phone className="h-4 w-4 text-brand-blue flex-shrink-0" />
                <a href="tel:+919321991812" className="hover:text-brand-blue font-medium">Call: +91 93219 91812</a>
              </li>
              <li className="flex gap-3 text-xs text-brand-gray-medium items-center">
                <Smartphone className="h-4 w-4 text-brand-blue flex-shrink-0" />
                <a href="tel:+919324516326" className="hover:text-brand-blue font-medium">Mobile: +91 93245 16326</a>
              </li>
              <li className="flex gap-3 text-xs text-brand-gray-medium items-center">
                <MessageSquareCode className="h-4 w-4 text-brand-blue flex-shrink-0" />
                <p className="hover:text-brand-blue font-medium">WhatsApp: +91 90046 63226 / +91 93245 16326</p>
              </li>
              <li className="flex gap-3 text-xs text-brand-gray-medium items-center">
                <Mail className="h-4 w-4 text-brand-blue flex-shrink-0" />
                <a href="mailto:info.india@amfah.com" className="hover:text-brand-blue">
                  info.india@amfah.com
                </a>
              </li>
              <li className="flex gap-3 text-xs text-brand-gray-medium items-center">
                <Mail className="h-4 w-4 text-brand-blue flex-shrink-0" />
                <a href="mailto:amfahair@gmail.com" className="hover:text-brand-blue">
                  amfahair@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact: Branch Office */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h3 className="font-display font-bold text-brand-navy text-sm uppercase tracking-wider mb-6">
              Branch Office
            </h3>
            <ul className="space-y-2">
              <li className="flex gap-3 text-sm text-brand-gray-medium">
                <MapPin className="h-5 w-5 text-brand-blue flex-shrink-0" />
                <span className="leading-relaxed">AMFAH INDIA TRADING (P) LTD. Flat No. 201, H.No 1147, Block No. 111/9, Kishan Garh, Khasra No. 1674 Vasant Kunj, New Delhi - 110070</span>
              </li>
              <li className="flex gap-3 text-xs text-brand-gray-medium items-center">
                <Phone className="h-4 w-4 text-brand-blue flex-shrink-0" />
                <a href="tel:+919321991810" className="hover:text-brand-blue font-medium">Call: +91 9321991810</a>
              </li>
              <li className="flex gap-3 text-xs text-brand-gray-medium items-center">
                <MessageSquareCode className="h-4 w-4 text-brand-blue flex-shrink-0" />
                <a href="tel:+919324516326" className="hover:text-brand-blue font-medium">WhatsApp: +91 9324 516326</a>
              </li>
              <li className="flex gap-3 text-xs text-brand-gray-medium items-center">
                <Mail className="h-4 w-4 text-brand-blue flex-shrink-0" />
                <a href="mailto:info.india@amfah.com" className="hover:text-brand-blue">
                  info.india@amfah.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between text-xs text-brand-gray-medium space-y-4 md:space-y-0">
        <div>
          © {currentYear} AMFAH INDIA TRADING PVT LTD. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link href="/contact" className="hover:text-brand-navy transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-brand-navy transition-colors">Terms of Use</Link>
          <Link href="/contact" className="hover:text-brand-navy transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
