"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Tag, 
  Sparkles, 
  AlertCircle, 
  ChevronDown, 
  Check, 
  X,
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Clock, 
  SortAsc, 
  SortDesc, 
  Flame 
} from "lucide-react";
import ProductCard from "@/components/cards/ProductCard";
import { getCoverageSqFt } from "@/utils/productUtils";

// Parsing Helpers
const getNumericCoverage = (product) => {
  return getCoverageSqFt(product);
};

const getProductCapacityLiters = (product) => {
  const extStr = product.extraction || product.specifications?.["Dehumidification Capacity"] || product.specifications?.["Dehumidifier Capacity"] || "";
  const numbers = extStr.match(/\d[\d,.]*/g);
  if (!numbers) return 0;
  const cleanNumbers = numbers.map(n => parseFloat(n.replace(/,/g, '')));
  return Math.max(...cleanNumbers);
};

const getProductTankCapacity = (product) => {
  const specs = product.specifications || {};
  const tankStr = 
    specs["Water Tank Capacity"] || 
    specs["Condensate Tank Capacity"] || 
    specs["Tank Volume"] || 
    specs["Capacity of Condensate Water Tank"] || 
    "";
  const numbers = tankStr.match(/\d[\d,.]*/g);
  if (!numbers) return 0;
  return parseFloat(numbers[0]);
};

export default function HomeDehumidifierCatalog({ initialProducts }) {
  const searchParams = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState("all"); // "all", "amfah-olympia", "amfah"
  const [selectedSize, setSelectedSize] = useState("all"); // "all", "small", "medium", "large"
  const [selectedCapacity, setSelectedCapacity] = useState("all"); // "all", "low", "medium", "high"
  const [selectedTank, setSelectedTank] = useState("all"); // "all", "small", "medium", "large"
  const [sortBy, setSortBy] = useState("featured"); // featured, relevance, sales, name-asc, ...
  const [activeTier, setActiveTier] = useState("all"); // "all", "premium", "economy"
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const sortRef = useRef(null);

  // Set mounted status on client load
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync state with URL search parameters on load/change
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    const sizeParam = searchParams.get("size");
    const filterParam = searchParams.get("filter");
    if (brandParam) setSelectedBrand(brandParam);
    if (sizeParam) setSelectedSize(sizeParam);
    if (filterParam) {
      setActiveTier(filterParam);
    } else {
      setActiveTier("all");
    }
  }, [searchParams]);

  // Handle mobile detection dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sort Option Definitions
  const sortOptions = [
    { id: "coverage-asc", label: "Coverage Area, low to high", icon: SortAsc },
    { id: "coverage-desc", label: "Coverage Area, high to low", icon: SortDesc },
    { id: "featured", label: "Featured", icon: Sparkles },
    { id: "relevance", label: "Most relevant", icon: TrendingUp },
    { id: "sales", label: "Best selling", icon: Flame },
    { id: "name-asc", label: "Alphabetically, A-Z", icon: SortAsc },
    { id: "name-desc", label: "Alphabetically, Z-A", icon: SortDesc },
    { id: "price-asc", label: "Price, low to high", icon: DollarSign },
    { id: "price-desc", label: "Price, high to low", icon: DollarSign },
    { id: "date-asc", label: "Date, old to new", icon: Clock },
    { id: "date-desc", label: "Date, new to old", icon: Calendar }
  ];

  const currentSortLabel = sortOptions.find(opt => opt.id === sortBy)?.label || "Featured";

  // Virtual product attributes for realistic sorting since prices/dates are not in source products database
  const virtualMetadata = {
    "aquaria-slim-10p": { price: 15999, date: new Date("2026-01-10"), sales: 150, relevance: 90, featured: 1 },
    "aquaria-s1-12p": { price: 19500, date: new Date("2026-02-15"), sales: 240, relevance: 95, featured: 2 },
    "aquaria-s1-14p": { price: 22000, date: new Date("2026-03-01"), sales: 180, relevance: 92, featured: 3 },
    "aquaria-s1-16p": { price: 25999, date: new Date("2026-03-20"), sales: 320, relevance: 97, featured: 4 },
    "aquaria-s1-20p": { price: 32500, date: new Date("2026-04-10"), sales: 480, relevance: 99, featured: 5 },
    "aquaria-s1-24p": { price: 36999, date: new Date("2026-04-18"), sales: 410, relevance: 98, featured: 6 },
    "amf-18dm": { price: 12999, date: new Date("2026-02-10"), sales: 210, relevance: 91, featured: 7 },
    // "amf-30dm": { price: 16500, date: new Date("2026-03-05"), sales: 190, relevance: 93, featured: 8 },
    "amf-20pd": { price: 12999, date: new Date("2026-02-18"), sales: 165, relevance: 93, featured: 9.5 },
    "amf-25pd": { price: 14999, date: new Date("2026-02-20"), sales: 170, relevance: 94, featured: 10 },
    "amf-30pd": { price: 16999, date: new Date("2026-02-25"), sales: 160, relevance: 92, featured: 11 },
    "amf-35dm": { price: 18999, date: new Date("2026-03-10"), sales: 220, relevance: 95, featured: 11.5 },
    "amf-45dm": { price: 21999, date: new Date("2026-03-10"), sales: 220, relevance: 95, featured: 12 },
    "amf-50dm": { price: 24999, date: new Date("2026-03-15"), sales: 180, relevance: 93, featured: 13 },
    "amf-35d-a": { price: 38500, date: new Date("2025-10-10"), sales: 155, relevance: 96, featured: 15 },
    "amf-50d-a": { price: 47500, date: new Date("2025-12-05"), sales: 210, relevance: 98, featured: 16 },
    "amf-jydh-30": { price: 34999, date: new Date("2026-05-01"), sales: 380, relevance: 97, featured: 14 }
  };

  const getMeta = (slug) => {
    return virtualMetadata[slug] || { price: 0, date: new Date(), sales: 0, relevance: 0, featured: 99 };
  };

  // Helper to get product brand
  const getProductBrand = (product) => {
    if (product.slug.startsWith("aquaria")) {
      return "amfah-olympia";
    }
    return "amfah";
  };

  // Helper to classify product tier
  const getProductTier = (product) => {
    if (
      product.slug === "amf-35d-a" ||
      product.slug === "amf-50d-a" ||
      product.slug === "amf-jydh-30" ||
      product.slug === "amf-20pd" ||
      product.slug === "amf-25pd" ||
      product.slug === "amf-30pd"
    ) {
      return "premium";
    }
    if (product.slug.startsWith("amf-")) {
      return "economy";
    }
    return "premium";
  };

  // Filter products
  const filteredProducts = initialProducts.filter((product) => {
    const matchesTier = activeTier === "all" || getProductTier(product) === activeTier;
    const matchesBrand = selectedBrand === "all" || getProductBrand(product) === selectedBrand;
    
    // Room Size (Sq Ft) check
    let matchesSize = true;
    if (selectedSize !== "all") {
      const sizeSqFt = getNumericCoverage(product);
      if (selectedSize === "small") matchesSize = sizeSqFt <= 250;
      else if (selectedSize === "medium") matchesSize = sizeSqFt > 250 && sizeSqFt <= 500;
      else if (selectedSize === "large") matchesSize = sizeSqFt > 500;
    }

    // Capacity check
    let matchesCapacity = true;
    if (selectedCapacity !== "all") {
      const liters = getProductCapacityLiters(product);
      if (selectedCapacity === "low") matchesCapacity = liters <= 15;
      else if (selectedCapacity === "medium") matchesCapacity = liters > 15 && liters <= 30;
      else if (selectedCapacity === "high") matchesCapacity = liters > 30;
    }

    // Tank Capacity check
    let matchesTank = true;
    if (selectedTank !== "all") {
      const tankCap = getProductTankCapacity(product);
      if (tankCap === 0) {
        matchesTank = false;
      } else {
        if (selectedTank === "small") matchesTank = tankCap <= 3;
        else if (selectedTank === "medium") matchesTank = tankCap > 3 && tankCap <= 6;
        else if (selectedTank === "large") matchesTank = tankCap > 6;
      }
    }

    return matchesTier && matchesBrand && matchesSize && matchesCapacity && matchesTank;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const metaA = getMeta(a.slug);
    const metaB = getMeta(b.slug);

    switch (sortBy) {
      case "coverage-asc":
        return getCoverageSqFt(a) - getCoverageSqFt(b);
      case "coverage-desc":
        return getCoverageSqFt(b) - getCoverageSqFt(a);
      case "relevance":
        return metaB.relevance - metaA.relevance;
      case "sales":
        return metaB.sales - metaA.sales;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return metaA.price - metaB.price;
      case "price-desc":
        return metaB.price - metaA.price;
      case "date-asc":
        return metaA.date.getTime() - metaB.date.getTime();
      case "date-desc":
        return metaB.date.getTime() - metaA.date.getTime();
      case "featured":
      default:
        return getCoverageSqFt(a) - getCoverageSqFt(b);
    }
  });

  const activeFiltersCount = 
    (selectedBrand !== "all" ? 1 : 0) + 
    (selectedSize !== "all" ? 1 : 0) + 
    (selectedCapacity !== "all" ? 1 : 0) +
    (selectedTank !== "all" ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedBrand("all");
    setSelectedSize("all");
    setSelectedCapacity("all");
    setSelectedTank("all");
  };

  const brandOptions = [
    { id: "all", label: "All Brands" },
    { id: "amfah-olympia", label: "Olimpia Splendid (Italy)" },
    { id: "amfah", label: "AMFAH" }
  ];

  const sizeOptions = [
    { id: "all", label: "All Sizes" },
    { id: "small", label: "Small (Up to 250 Sq Ft)" },
    { id: "medium", label: "Medium (251 - 500 Sq Ft)" },
    { id: "large", label: "Large (Above 500 Sq Ft)" }
  ];

  const capacityOptions = [
    { id: "all", label: "All Capacities" },
    { id: "low", label: "Low (Up to 15 L/Day)" },
    { id: "medium", label: "Medium (16 - 30 L/Day)" },
    { id: "high", label: "High (Above 30 L/Day)" }
  ];

  const tankOptions = [
    { id: "all", label: "All Tank Capacities" },
    { id: "small", label: "Small (Up to 3 Liters)" },
    { id: "medium", label: "Medium (3.1 - 6 Liters)" },
    { id: "large", label: "Large (Above 6 Liters)" }
  ];

  return (
    <div className="space-y-8">
      {/* Filters and Sorting Bar */}
      <div className="hidden md:flex flex-col sm:flex-row gap-4 items-center justify-between bg-brand-gray-light border border-brand-border p-4 rounded-2xl shadow-sm">
        
        {/* Filters Group */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsFilterSidebarOpen(true)}
            className="w-full sm:w-auto bg-white border border-brand-border px-5 py-2.5 rounded-xl text-xs font-bold text-brand-navy hover:border-brand-blue/30 hover:bg-brand-blue-light/30 focus:outline-none flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4 text-brand-blue" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-brand-blue text-white text-[10px] font-extrabold px-1">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-brand-blue hover:text-brand-navy underline cursor-pointer shrink-0 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Custom Animated Dropdown Sort Controls */}
        <div ref={sortRef} className="relative w-full sm:w-64 shrink-0 z-30">
          <div className="flex items-center justify-end gap-3 w-full">
            <span className="hidden sm:inline text-xs font-bold text-brand-navy uppercase tracking-wider shrink-0">
              Sort By:
            </span>
            
            <button
              onClick={() => {
                setIsSortOpen(!isSortOpen);
              }}
              className="w-full sm:w-56 bg-white border border-brand-border px-4 py-2.5 rounded-xl text-xs font-bold text-brand-gray-dark hover:border-brand-blue/30 focus:outline-none flex items-center justify-between gap-2 shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-3.5 w-3.5 text-brand-blue" />
                <span>{currentSortLabel}</span>
              </div>
              <ChevronDown className={`h-4 w-4 text-brand-gray-medium transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Animated Dropdown Menu Options */}
          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-full sm:w-56 rounded-xl bg-white border border-brand-border p-2 shadow-xl z-50 flex flex-col gap-0.5"
              >
                {sortOptions.map((option) => {
                  const isSelected = sortBy === option.id;
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-brand-blue-light/70 text-brand-blue"
                          : "text-brand-gray-dark hover:bg-slate-50 hover:text-brand-blue"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className={`h-3.5 w-3.5 ${isSelected ? "text-brand-blue" : "text-brand-gray-medium"}`} />
                        <span>{option.label}</span>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-brand-blue" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Slide-out Sidebar Panel & Mobile Floating Action Bar */}
      {mounted && createPortal(
        <>
          <AnimatePresence>
            {isFilterSidebarOpen && (
              <>
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFilterSidebarOpen(false)}
                  className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px]"
                />

                {/* Sidebar Slide-in */}
                <motion.div
                  initial={isMobile ? { y: "100%", x: 0 } : { x: "-100%", y: 0 }}
                  animate={{ y: 0, x: 0 }}
                  exit={isMobile ? { y: "100%", x: 0 } : { x: "-100%", y: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 220 }}
                  className="fixed z-50 bg-white shadow-2xl flex flex-col
                    left-0 right-0 top-0 bottom-0 h-full rounded-t-[24px]
                    md:left-0 md:top-0 md:bottom-0 md:h-full md:w-120 md:rounded-r-[24px] md:rounded-t-none"
                >
                  {/* Mobile handle indicator */}
                  <div className="md:hidden w-12 h-1 bg-slate-200 rounded-full mx-auto my-3 shrink-0" />

                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border shrink-0">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-brand-blue" />
                      <h3 className="font-display font-extrabold text-base text-brand-navy">
                        Filters
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={handleResetFilters}
                          className="text-xs font-bold text-brand-blue hover:text-brand-navy underline cursor-pointer"
                        >
                          Clear All
                        </button>
                      )}
                      <button
                        onClick={() => setIsFilterSidebarOpen(false)}
                        className="p-1.5 rounded-lg hover:bg-brand-gray-light text-brand-gray-medium hover:text-brand-navy transition-colors cursor-pointer border border-brand-border"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Filters Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                    {/* 1. Brands Section */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-brand-navy">
                        Brand
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {brandOptions.map((opt) => {
                          const active = selectedBrand === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedBrand(opt.id)}
                              className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                                active
                                  ? "bg-brand-blue-light/70 border-brand-blue text-brand-navy"
                                  : "bg-white border-brand-border text-brand-gray-dark hover:border-brand-blue/30"
                              }`}
                            >
                              <span>{opt.label}</span>
                              {active && <Check className="h-4 w-4 text-brand-blue shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <hr className="border-brand-border/60" />

                    {/* 2. Room Size Section */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-brand-navy">
                        Room Size (Sq Ft)
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {sizeOptions.map((opt) => {
                          const active = selectedSize === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedSize(opt.id)}
                              className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                                active
                                  ? "bg-brand-blue-light/70 border-brand-blue text-brand-navy"
                                  : "bg-white border-brand-border text-brand-gray-dark hover:border-brand-blue/30"
                              }`}
                            >
                              <span>{opt.label}</span>
                              {active && <Check className="h-4 w-4 text-brand-blue shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <hr className="border-brand-border/60" />

                    {/* 3. Capacity Section */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-brand-navy">
                        Dehumidification Capacity
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {capacityOptions.map((opt) => {
                          const active = selectedCapacity === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedCapacity(opt.id)}
                              className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                                active
                                  ? "bg-brand-blue-light/70 border-brand-blue text-brand-navy"
                                  : "bg-white border-brand-border text-brand-gray-dark hover:border-brand-blue/30"
                              }`}
                            >
                              <span>{opt.label}</span>
                              {active && <Check className="h-4 w-4 text-brand-blue shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <hr className="border-brand-border/60" />

                    {/* 4. Tank Capacity Section */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-brand-navy">
                        Tank Capacity
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {tankOptions.map((opt) => {
                          const active = selectedTank === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedTank(opt.id)}
                              className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                                active
                                  ? "bg-brand-blue-light/70 border-brand-blue text-brand-navy"
                                  : "bg-white border-brand-border text-brand-gray-dark hover:border-brand-blue/30"
                              }`}
                            >
                              <span>{opt.label}</span>
                              {active && <Check className="h-4 w-4 text-brand-blue shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Footer */}
                  <div className="p-6 border-t border-brand-border bg-brand-gray-light/60 shrink-0 md:rounded-br-[24px]">
                    <button
                      onClick={() => setIsFilterSidebarOpen(false)}
                      className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-display font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer text-center block uppercase tracking-wider"
                    >
                      Apply Filters ({sortedProducts.length} Models)
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Floating Mobile Action Pill */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-brand-navy text-white rounded-full shadow-2xl border border-white/10 backdrop-blur-md bg-opacity-95 flex items-center gap-4 px-6 py-3 md:hidden">
            {/* Filter Button */}
            <button
              onClick={() => setIsFilterSidebarOpen(true)}
              className="flex items-center justify-center gap-1.5 text-xs font-bold text-center cursor-pointer transition-all hover:text-brand-blue-light"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-brand-blue" />
              <span>Filter</span>
              {activeFiltersCount > 0 && (
                <span className="flex items-center justify-center h-4 w-4 rounded-full bg-brand-blue text-white text-[9px] font-extrabold px-1">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            
            {/* Divider */}
            <div className="h-4 w-px bg-white/15" />
            
            {/* Sort Button */}
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center justify-center gap-1.5 text-xs font-bold text-center cursor-pointer transition-all hover:text-brand-blue-light"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-brand-blue" />
              <span>Sort</span>
            </button>
          </div>

          {/* Floating Mobile Sort Dropdown List */}
          <AnimatePresence>
            {isSortOpen && (
              <>
                <div 
                  className="fixed inset-0 bg-black/20 z-40 md:hidden" 
                  onClick={() => setIsSortOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] bg-white border border-brand-border rounded-2xl p-2 shadow-2xl z-50 flex flex-col gap-0.5 md:hidden"
                >
                  <div className="px-3 py-2 border-b border-brand-border/60 mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-brand-navy uppercase tracking-wider">Sort Products By</span>
                    <button
                      onClick={() => setIsSortOpen(false)}
                      className="p-1 rounded hover:bg-slate-100 text-brand-gray-medium transition-colors cursor-pointer border border-brand-border/50"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  {sortOptions.map((option) => {
                    const isSelected = sortBy === option.id;
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSortBy(option.id);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-brand-blue-light/70 text-brand-blue"
                            : "text-brand-gray-dark hover:bg-slate-50 hover:text-brand-blue"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className={`h-3.5 w-3.5 ${isSelected ? "text-brand-blue" : "text-brand-gray-medium"}`} />
                          <span>{option.label}</span>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-brand-blue" />}
                      </button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}


      {/* Catalog Display */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {sortedProducts.map((prod) => (
            <ProductCard key={prod.slug} product={prod} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-brand-border p-12 text-center rounded-2xl bg-brand-gray-light/30 space-y-3">
          <AlertCircle className="h-10 w-10 text-brand-gray-medium mx-auto animate-bounce" />
          <h4 className="font-display font-bold text-brand-navy text-base">No models found</h4>
          <p className="text-xs text-brand-gray-medium leading-relaxed font-semibold">
            We couldn't find any home dehumidifiers fitting this selection criteria.
          </p>
        </div>
      )}
    </div>
  );
}
