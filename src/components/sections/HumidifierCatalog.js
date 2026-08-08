"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
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
  Flame,
  Droplets
} from "lucide-react";
import ProductCard from "@/components/cards/ProductCard";
import { getCoverageSqFt } from "@/utils/productUtils";

export default function HumidifierCatalog({ initialProducts }) {
  const searchParams = useSearchParams();
  const [selectedCoverage, setSelectedCoverage] = useState("all"); // "all", "150", "500", "750"
  const [sortBy, setSortBy] = useState("featured"); // featured, relevance, sales, name-asc, ...
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
    const coverageParam = searchParams.get("coverage");
    if (coverageParam) setSelectedCoverage(coverageParam);
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
    { id: "moisture-desc", label: "Moisture Output, high to low", icon: Droplets },
    { id: "moisture-asc", label: "Moisture Output, low to high", icon: Droplets }
  ];

  const currentSortLabel = sortOptions.find(opt => opt.id === sortBy)?.label || "Featured";

  // Virtual product attributes for realistic sorting
  const virtualMetadata = {
    "amf-08hm": { price: 8500, date: new Date("2026-04-10"), sales: 120, relevance: 91, featured: 1 },
    "amf-13hm": { price: 14800, date: new Date("2026-04-25"), sales: 150, relevance: 94, featured: 2 },
    "amf-24hm": { price: 28500, date: new Date("2026-05-05"), sales: 85, relevance: 96, featured: 3 }
  };

  const getMeta = (slug) => {
    return virtualMetadata[slug] || { price: 0, date: new Date(), sales: 0, relevance: 0, featured: 99 };
  };

  // Filter products
  const filteredProducts = initialProducts.filter((product) => {
    const matchesCoverage = selectedCoverage === "all" || 
      (selectedCoverage === "150" && product.coverage.includes("150")) ||
      (selectedCoverage === "500" && product.coverage.includes("500")) ||
      (selectedCoverage === "750" && product.coverage.includes("750"));
    return matchesCoverage;
  });

  const activeFiltersCount = selectedCoverage !== "all" ? 1 : 0;

  const handleResetFilters = () => {
    setSelectedCoverage("all");
  };

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
      case "moisture-desc":
        return (parseInt(b.extraction) || 0) - (parseInt(a.extraction) || 0);
      case "moisture-asc":
        return (parseInt(a.extraction) || 0) - (parseInt(b.extraction) || 0);
      case "featured":
      default:
        return getCoverageSqFt(a) - getCoverageSqFt(b);
    }
  });

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
                    {/* Coverage Area Section */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-brand-navy">
                        Coverage Area
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {[
                          { id: "all", label: "All Coverages" },
                          { id: "150", label: "Small Area (150 Sq ft)" },
                          { id: "500", label: "Medium Area (500 Sq ft)" },
                          { id: "750", label: "Large Area (750 Sq ft)" }
                        ].map((opt) => {
                          const active = selectedCoverage === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedCoverage(opt.id)}
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
            We couldn't find any humidifiers fitting this selection criteria.
          </p>
        </div>
      )}
    </div>
  );
}
