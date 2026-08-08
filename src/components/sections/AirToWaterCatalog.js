"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  AlertCircle, 
  ChevronDown, 
  Check, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Clock, 
  SortAsc, 
  SortDesc, 
  Flame,
  Droplets
} from "lucide-react";
import ProductCard from "@/components/cards/ProductCard";
import { getCoverageSqFt } from "@/utils/productUtils";

export default function AirToWaterCatalog({ initialProducts }) {
  const searchParams = useSearchParams();
  const [selectedCapacity, setSelectedCapacity] = useState("all"); // "all", "10"
  const [sortBy, setSortBy] = useState("featured"); // featured, relevance, sales, name-asc, ...
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCapacityOpen, setIsCapacityOpen] = useState(false);

  const sortRef = useRef(null);
  const capacityRef = useRef(null);

  // Sync state with URL search parameters on load/change
  useEffect(() => {
    const capacityParam = searchParams.get("capacity");
    if (capacityParam) setSelectedCapacity(capacityParam);
  }, [searchParams]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
      if (capacityRef.current && !capacityRef.current.contains(event.target)) {
        setIsCapacityOpen(false);
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
    { id: "name-desc", label: "Alphabetically, Z-A", icon: SortDesc }
  ];

  const currentSortLabel = sortOptions.find(opt => opt.id === sortBy)?.label || "Featured";

  // Virtual product attributes for realistic sorting
  const virtualMetadata = {
    "amfah-a-10": { price: 65000, date: new Date("2026-05-20"), sales: 75, relevance: 95, featured: 1 }
  };

  const getMeta = (slug) => {
    return virtualMetadata[slug] || { price: 0, date: new Date(), sales: 0, relevance: 0, featured: 99 };
  };

  // Filter products
  const filteredProducts = initialProducts.filter((product) => {
    const matchesCapacity = selectedCapacity === "all" || 
      (selectedCapacity === "10" && product.extraction.includes("10"));
    return matchesCapacity;
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
      case "featured":
      default:
        return getCoverageSqFt(a) - getCoverageSqFt(b);
    }
  });

  return (
    <div className="space-y-8">
      {/* Filters and Sorting Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-brand-gray-light border border-brand-border p-4 rounded-2xl shadow-sm">
        
        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy uppercase tracking-wider mr-1 shrink-0">
            <SlidersHorizontal className="h-4 w-4 text-brand-blue" />
            <span>Filters:</span>
          </div>

          {/* Capacity Filter Dropdown */}
          <div ref={capacityRef} className="relative z-30 shrink-0">
            <button
              onClick={() => {
                setIsCapacityOpen(!isCapacityOpen);
                setIsSortOpen(false);
              }}
              className="bg-white border border-brand-border px-4 py-2.5 rounded-xl text-xs font-bold text-brand-gray-dark hover:border-brand-blue/30 focus:outline-none flex items-center justify-between gap-2 shadow-sm transition-all cursor-pointer min-w-[150px]"
            >
              <span>
                {selectedCapacity === "all" 
                  ? "Capacity: All" 
                  : "10 Liters / Day"}
              </span>
              <ChevronDown className={`h-3.5 w-3.5 text-brand-gray-medium transition-transform duration-300 ${isCapacityOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isCapacityOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-56 rounded-xl bg-white border border-brand-border p-2 shadow-xl z-50 flex flex-col gap-0.5"
                >
                  <button
                    onClick={() => { setSelectedCapacity("all"); setIsCapacityOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${selectedCapacity === "all" ? "bg-brand-blue-light/70 text-brand-blue" : "text-brand-gray-dark hover:bg-slate-50"}`}
                  >
                    All Capacities
                  </button>
                  <button
                    onClick={() => { setSelectedCapacity("10"); setIsCapacityOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${selectedCapacity === "10" ? "bg-brand-blue-light/70 text-brand-blue" : "text-brand-gray-dark hover:bg-slate-50"}`}
                  >
                    10 L/Day production
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reset Filters button */}
          {selectedCapacity !== "all" && (
            <button
              onClick={() => {
                setSelectedCapacity("all");
              }}
              className="text-xs font-bold text-brand-blue hover:text-brand-navy underline cursor-pointer shrink-0 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Custom Animated Dropdown Sort Controls */}
        <div ref={sortRef} className="relative w-full md:w-64 shrink-0 z-30">
          <div className="flex items-center justify-end gap-3 w-full">
            <span className="hidden sm:inline text-xs font-bold text-brand-navy uppercase tracking-wider shrink-0">
              Sort By:
            </span>
            
            <button
              onClick={() => {
                setIsSortOpen(!isSortOpen);
                setIsCapacityOpen(false);
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
            We couldn't find any atmospheric water generators fitting this selection criteria.
          </p>
        </div>
      )}
    </div>
  );
}
