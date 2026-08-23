"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ProductImageGallery({ images, productName, badge, amazonReviews, amazonLink }) {
  const [activeImage, setActiveImage] = useState(images[0] || "/image1.jpg");

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Section: Main Image & Thumbnails */}
      <div className="w-full flex flex-col md:flex-row gap-5 items-start">
        {/* Main Large Image Display */}
        <div className="flex-grow aspect-square relative w-full bg-white rounded-2xl p-4 flex items-center justify-center overflow-hidden shadow-xs border border-brand-border/40">
          {badge && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-auto select-none">
              <div className="bg-[#0F1111] text-white text-[10px] sm:text-xs font-sans font-bold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-sm shadow-md flex items-center gap-1 border border-white/10 tracking-wide whitespace-nowrap">
                <span>Amazon&apos;s Choice</span>
              </div>
            </div>
          )}

          <Image
            src={activeImage}
            alt={productName}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            priority
            className="object-contain p-2 transition-all duration-500 hover:scale-105"
          />
        </div>

        {/* Thumbnails Sidebar List */}
        {images.length > 1 && (
          <div className="flex flex-row md:flex-col gap-3 w-full md:w-24 overflow-x-auto md:overflow-y-auto max-h-[500px] shrink-0 py-1 md:py-0 no-scrollbar scroll-smooth">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-square w-16 md:w-20 bg-brand-gray-light/35 border-2 rounded-xl overflow-hidden p-1.5 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-brand-blue/60 shrink-0 ${activeImage === img
                  ? "border-brand-blue ring-2 ring-brand-blue/15 shadow-xs"
                  : "border-brand-border/60 hover:bg-white"
                  }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Amazon Reviews & Rating Card below Product Image */}
      {amazonReviews && (
        <div className="w-full pt-1">
          {amazonLink ? (
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 sm:gap-4 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-xs hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              {/* Amazon Logo Image */}
              <div className="relative w-20 sm:w-22 h-7 sm:h-9 shrink-0">
                <Image
                  src="/images/amazon-logo.png"
                  alt="Amazon Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>

              <div className="h-7 w-px bg-slate-200" />

              <div className="flex flex-col select-none">
                {/* Stars + Rating */}
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <div className="flex items-center text-[#DE7921]">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#DE7921] text-[#DE7921]" />
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#DE7921] text-[#DE7921]" />
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#DE7921] text-[#DE7921]" />
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#DE7921] text-[#DE7921]" />
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DE7921]" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm font-sans ml-0.5">
                    {amazonReviews.rating}
                  </span>
                </div>

                <span className="text-[10px] sm:text-xs text-slate-500 font-sans group-hover:text-brand-blue transition-colors">
                  {amazonReviews.totalRatings} • Customer reviews
                </span>
              </div>
            </a>
          ) : (
            <div className="inline-flex items-center gap-3.5 sm:gap-4 bg-white border border-slate-200/90 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-xs">
              <div className="relative w-18 sm:w-22 h-5 sm:h-6 shrink-0">
                <Image
                  src="/images/amazon-logo.png"
                  alt="Amazon Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>

              <div className="h-7 w-px bg-slate-200" />

              <div className="flex flex-col select-none">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <div className="flex items-center text-[#DE7921]">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#DE7921] text-[#DE7921]" />
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#DE7921] text-[#DE7921]" />
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#DE7921] text-[#DE7921]" />
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#DE7921] text-[#DE7921]" />
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DE7921]" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm font-sans ml-0.5">
                    {amazonReviews.rating}
                  </span>
                </div>

                <span className="text-[10px] sm:text-xs text-slate-500 font-sans">
                  {amazonReviews.totalRatings}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
