"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImageGallery({ images, productName }) {
  const [activeImage, setActiveImage] = useState(images[0] || "/image1.jpg");

  return (
    <div className="w-full flex flex-col md:flex-row gap-5 items-start">
      {/* Main Large Image Display */}
      <div className="flex-grow aspect-square relative w-full bg-white rounded-2xl p-4 flex items-center justify-center overflow-hidden shadow-xs">
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
              className={`relative aspect-square w-16 md:w-20 bg-brand-gray-light/35 border-2 rounded-xl overflow-hidden p-1.5 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-brand-blue/60 shrink-0 ${
                activeImage === img 
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
  );
}
