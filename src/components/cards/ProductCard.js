"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/components/ui/AppLink";
import { Droplets, Droplet, Home, ChevronLeft, ChevronRight } from "lucide-react";

import { defaultProductImages } from "@/data/productImages";

export default function ProductCard({ product }) {
  const { slug, name, category, subtitle, extraction, airflow, coverage, categoryId } = product;
  const [activeImageIndex, setActiveImageIndex] = useState(0); // 0: img1, 1: img2, 2: img3
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const images = defaultProductImages[slug] || ["/image1.jpg", "/image2.jpg", "/image3.jpg"];

  const handleTouchStart = (e) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const swipeDistance = touchStartX - touchEndX;
    const minSwipe = 35; // sensitivity threshold
    
    if (Math.abs(swipeDistance) > minSwipe) {
      e.preventDefault();
      e.stopPropagation();
      if (swipeDistance > 0) {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      } else {
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
  };

  const isSqFt = coverage && (coverage.toLowerCase().includes("sq") || coverage.toLowerCase().includes("feet"));
  const getCoverageValue = () => {
    if (!coverage) return "";
    // Normalize spaces around hyphens to ensure a reliable split format
    const normalized = coverage.replace(/\s*-\s*/, " - ");
    if (normalized.includes("Up to")) {
      return normalized.split(" ")[2];
    }
    if (normalized.includes(" - ")) {
      return normalized.split(" ")[2];
    }
    return normalized.split(" ")[0];
  };

  const getWaterTankCapacity = () => {
    const tank = product.specifications?.["Water Tank Capacity"] || product.specifications?.["Tank Volume"] || product.specifications?.["Water Tank"];
    if (tank) {
      const match = tank.match(/^([\d.]+)\s*(Liters|Litres|Ltr|Ltrs|L)/i);
      if (match) {
        return `${match[1]} L`;
      }
      return tank.split(" ")[0];
    }
    if (product.categoryId === "industrial") {
      if (product.slug === "amfah-acd-55" || product.slug === "fral-fdnp-96" || product.slug === "amfah-sd-50") {
        return "Auto Pump";
      }
      return "Continuous";
    }
    return "N/A";
  };

  return (
    <Link 
      href={`/products/${slug}`}
      className="group bg-white border border-brand-border rounded-xl md:rounded-2xl overflow-hidden hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col h-full cursor-pointer mx-auto sm:mx-0 w-full"
    >
      {/* Visual Product Showcase */}
      <div 
        className="relative aspect-[4/3] sm:aspect-square w-full bg-brand-gray-light border-b border-brand-border/60 overflow-hidden select-none"
        onMouseLeave={() => setActiveImageIndex(0)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Horizontal Slider Wrapper */}
        <div 
          className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ 
            width: `${images.length * 100}%`,
            transform: `translateX(-${activeImageIndex * (100 / images.length)}%)` 
          }}
        >
          {images.map((img, index) => (
            <div key={index} className={`relative h-full ${index > 0 ? "hidden md:block" : ""}`} style={{ width: `${100 / images.length}%` }}>
              <Image
                src={img}
                alt={`${name} View ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                priority={index === 0}
                className="object-contain p-1 sm:p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Navigation Indicator Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 hidden md:flex gap-1.5 z-20 bg-black/25 px-2.5 py-1 rounded-full backdrop-blur-xs">
          {images.map((_, index) => (
            <span 
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                activeImageIndex === index ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Tap Arrow Controls (always visible on mobile, visible on hover on desktop) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-25 h-7 w-7 rounded-full bg-white/90 text-brand-navy hidden md:flex items-center justify-center shadow-md active:scale-95 transition-all md:opacity-0 md:group-hover:opacity-100 border border-brand-border cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-25 h-7 w-7 rounded-full bg-white/90 text-brand-navy hidden md:flex items-center justify-center shadow-md active:scale-95 transition-all md:opacity-0 md:group-hover:opacity-100 border border-brand-border cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </>
        )}

        {/* Hover Detection Zones (Desktop only) */}
        <div className="hidden md:block">
          {images.map((_, index) => (
            <div 
              key={index}
              className="absolute top-0 h-full z-20 cursor-pointer"
              style={{ 
                left: `${(index * 100) / images.length}%`, 
                width: `${100 / images.length}%` 
              }}
              onMouseEnter={() => setActiveImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Info & Metrics Container */}
      <div className="p-2 sm:p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="font-display font-bold text-xs sm:text-base text-brand-navy group-hover:text-brand-blue transition-colors duration-300 mb-1 line-clamp-1">
            {name}
          </h3>
          <p className="text-[10px] sm:text-[11px] font-medium text-brand-gray-medium leading-normal line-clamp-2">
            {subtitle}
          </p>
        </div>

        {/* High-Fidelity Specs Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 pt-3 border-t border-brand-border/60 text-brand-gray-dark mt-auto">
          {product.categoryId === "purifier" ? (
            <>
              <div className="flex flex-col items-center text-center p-0.5 sm:p-1.5 rounded-lg bg-brand-gray-light">
                <Droplets className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-blue mb-0.5 sm:mb-1" />
                <span className="text-[8px] sm:text-[9px] font-bold text-brand-navy leading-tight">{airflow ? airflow.split(" ")[0] : "N/A"} m³</span>
                <span className="text-[7px] sm:text-[8px] text-brand-gray-medium uppercase tracking-wider font-semibold">Airflow</span>
              </div>
              <div className="flex flex-col items-center text-center p-0.5 sm:p-1.5 rounded-lg bg-brand-gray-light">
                <Droplet className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-blue mb-0.5 sm:mb-1" />
                <span className="text-[8px] sm:text-[9px] font-bold text-brand-navy leading-tight">HEPA H13</span>
                <span className="text-[7px] sm:text-[8px] text-brand-gray-medium uppercase tracking-wider font-semibold">Filter</span>
              </div>
            </>
          ) : product.categoryId === "air-to-water" ? (
            <>
              <div className="flex flex-col items-center text-center p-0.5 sm:p-1.5 rounded-lg bg-brand-gray-light">
                <Droplets className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-blue mb-0.5 sm:mb-1" />
                <span className="text-[8px] sm:text-[9px] font-bold text-brand-navy leading-tight">{extraction ? extraction.split(" ")[0] : "0"} L</span>
                <span className="text-[7px] sm:text-[8px] text-brand-gray-medium uppercase tracking-wider font-semibold">Water/Day</span>
              </div>
              <div className="flex flex-col items-center text-center p-0.5 sm:p-1.5 rounded-lg bg-brand-gray-light">
                <Droplet className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-blue mb-0.5 sm:mb-1" />
                <span className="text-[8px] sm:text-[9px] font-bold text-brand-navy leading-tight">{getWaterTankCapacity()}</span>
                <span className="text-[7px] sm:text-[8px] text-brand-gray-medium uppercase tracking-wider font-semibold">Storage</span>
              </div>
            </>
          ) : product.categoryId === "portable-ac" ? (
            <>
              <div className="flex flex-col items-center text-center p-0.5 sm:p-1.5 rounded-lg bg-brand-gray-light">
                <Droplets className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-blue mb-0.5 sm:mb-1" />
                <span className="text-[8px] sm:text-[9px] font-bold text-brand-navy leading-tight">{product.specifications?.["Cooling Capacity"] || "1.5 TON"}</span>
                <span className="text-[7px] sm:text-[8px] text-brand-gray-medium uppercase tracking-wider font-semibold">Capacity</span>
              </div>
              <div className="flex flex-col items-center text-center p-0.5 sm:p-1.5 rounded-lg bg-brand-gray-light">
                <Droplet className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-blue mb-0.5 sm:mb-1" />
                <span className="text-[8px] sm:text-[9px] font-bold text-brand-navy leading-tight">{product.specifications?.["Best Selling"] === "Yes" ? "Best Seller" : "Standard"}</span>
                <span className="text-[7px] sm:text-[8px] text-brand-gray-medium uppercase tracking-wider font-semibold">Status</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center text-center p-0.5 sm:p-1.5 rounded-lg bg-brand-gray-light">
                <Droplets className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-blue mb-0.5 sm:mb-1" />
                <span className="text-[8px] sm:text-[9px] font-bold text-brand-navy leading-tight">{extraction ? extraction.split(" ")[0] : "0"} L</span>
                <span className="text-[7px] sm:text-[8px] text-brand-gray-medium uppercase tracking-wider font-semibold">{product.categoryId === "humidifier" ? "Humidify" : "Dehumidify"}</span>
              </div>
              <div className="flex flex-col items-center text-center p-0.5 sm:p-1.5 rounded-lg bg-brand-gray-light">
                <Droplet className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-blue mb-0.5 sm:mb-1" />
                <span className="text-[8px] sm:text-[9px] font-bold text-brand-navy leading-tight">{getWaterTankCapacity()}</span>
                <span className="text-[7px] sm:text-[8px] text-brand-gray-medium uppercase tracking-wider font-semibold">Tank</span>
              </div>
            </>
          )}
          <div className="flex flex-col items-center text-center p-0.5 sm:p-1.5 rounded-lg bg-brand-gray-light">
            <Home className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-blue mb-0.5 sm:mb-1" />
            <span className="text-[8px] sm:text-[9px] font-bold text-brand-navy leading-tight">{product.categoryId === "air-to-water" ? "Home/Office" : `${getCoverageValue()} ${isSqFt ? "sq.ft." : "c.f."}`}</span>
            <span className="text-[7px] sm:text-[8px] text-brand-gray-medium uppercase tracking-wider font-semibold">Coverage</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

