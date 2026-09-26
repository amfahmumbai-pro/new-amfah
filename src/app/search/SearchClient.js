"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, X, SlidersHorizontal, RotateCcw, Droplets, ArrowRight, Sparkles, AlertCircle, HelpCircle } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/cards/ProductCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

const IGNORED_SPEC_KEYS = [
  "power supply",
  "voltage",
  "frequency",
  "phase",
  "rated voltage",
  "rated frequency",
  "voltage / frequency",
  "electric current",
  "current",
  "power current",
  "power consumption",
  "power input",
  "nominal power",
  "consumption power",
  "maximum power consumption",
  "maximum current consumption",
  "start-up current",
  "rated average power consumption",
  "weight",
  "net weight",
  "gross weight",
  "unit weight",
  "dimensions",
  "product size",
  "carton size",
  "body size",
  "unit size",
  "size"
];

const containsTokenWithNumericPrecision = (text, token) => {
  if (!text || !token) return false;
  const lowerText = text.toLowerCase();
  const lowerToken = token.toLowerCase();

  let index = lowerText.indexOf(lowerToken);
  while (index !== -1) {
    const charBefore = index > 0 ? lowerText[index - 1] : '';
    const charAfter = index + lowerToken.length < lowerText.length ? lowerText[index + lowerToken.length] : '';

    const isDigit = (c) => c >= '0' && c <= '9';

    const beforeOk = !(isDigit(lowerToken[0]) && isDigit(charBefore));
    const afterOk = !(isDigit(lowerToken[lowerToken.length - 1]) && isDigit(charAfter));

    if (beforeOk && afterOk) {
      return true;
    }

    index = lowerText.indexOf(lowerToken, index + 1);
  }
  return false;
};

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read initial query and category parameters from URL
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("cat") || "all";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("default");
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce the URL update to keep dynamic typing extremely responsive
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Update URL search parameters when debounced query or category changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery.trim()) {
      params.set("q", debouncedQuery.trim());
    }
    if (category !== "all") {
      params.set("cat", category);
    }

    // Replace URL query params smoothly without scrolling or reloading
    const newQueryString = params.toString();
    router.replace(newQueryString ? `${pathname}?${newQueryString}` : pathname, {
      scroll: false,
    });
  }, [debouncedQuery, category, pathname, router]);

  const categories = [
    { id: "all", name: "All Equipment" },
    { id: "industrial", name: "Commercial & Industrial" },
    { id: "residential", name: "Home & Retail" },
    { id: "purifier", name: "Air Purifiers" },
    { id: "humidifier", name: "Humidifiers" },
    { id: "air-to-water", name: "Air to Water" },
    { id: "portable-ac", name: "Portable AC" },
  ];

  // Search filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Category Filter matching
      if (category !== "all" && product.categoryId !== category) {
        return false;
      }

      // 2. Search query matching
      if (!query.trim()) return true;
      const q = query.toLowerCase().trim();

      // Split the search query into individual words/tokens
      const tokens = q.split(/\s+/).filter(Boolean);

      // Also create a normalized version of the search query (no spaces or hyphens)
      const normalizedQ = q.replace(/[^a-z0-9]/g, "");

      // Helper function to check if a target text matches the query/tokens
      const textMatches = (text) => {
        if (!text) return false;
        const lowerText = text.toLowerCase();
        const normalizedText = lowerText.replace(/[^a-z0-9]/g, "");

        // Match 1: Full normalized substring match (e.g. "amf60" matches "amf-60")
        if (normalizedQ && normalizedText.includes(normalizedQ)) {
          return true;
        }

        // Match 2: All tokens must be present in the text
        if (tokens.length > 0 && tokens.every(token => containsTokenWithNumericPrecision(lowerText, token))) {
          return true;
        }

        return false;
      };

      // Check if tokens match across a combination of fields (e.g. "aquaria 10")
      const checkMultiFieldMatch = () => {
        if (tokens.length === 0) return false;

        return tokens.every(token => {
          const nameMatch = containsTokenWithNumericPrecision(product.name, token);
          const subtitleMatch = containsTokenWithNumericPrecision(product.subtitle, token);
          const categoryMatch = containsTokenWithNumericPrecision(product.category, token);
          const techMatch = containsTokenWithNumericPrecision(product.tech, token);
          const featureMatch = product.features?.some(f => containsTokenWithNumericPrecision(f, token));
          const appMatch = product.applications?.some(a => containsTokenWithNumericPrecision(a, token));
          const specMatch = Object.entries(product.specifications || {}).some(
            ([key, val]) => {
              const isIgnored = IGNORED_SPEC_KEYS.some(k => key.toLowerCase().includes(k));
              if (isIgnored) return false;
              return containsTokenWithNumericPrecision(key, token) || containsTokenWithNumericPrecision(String(val), token);
            }
          );

          return nameMatch || subtitleMatch || categoryMatch || techMatch || featureMatch || appMatch || specMatch;
        });
      };

      // Check fields directly using our textMatches helper
      const nameMatch = textMatches(product.name);
      const subtitleMatch = textMatches(product.subtitle);
      const categoryMatch = textMatches(product.category);
      const techMatch = textMatches(product.tech);

      const featureMatch = product.features?.some((feature) => textMatches(feature));
      const appMatch = product.applications?.some((app) => textMatches(app));

      const specMatch = Object.entries(product.specifications || {}).some(
        ([key, val]) => {
          const isIgnored = IGNORED_SPEC_KEYS.some(k => key.toLowerCase().includes(k));
          if (isIgnored) return false;
          return textMatches(key) || textMatches(String(val));
        }
      );

      return (
        nameMatch ||
        subtitleMatch ||
        categoryMatch ||
        specMatch ||
        techMatch ||
        featureMatch ||
        appMatch ||
        checkMultiFieldMatch()
      );
    });
  }, [query, category]);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "default") return list;

    if (sortBy === "extraction-desc") {
      return list.sort((a, b) => (parseInt(b.extraction) || 0) - (parseInt(a.extraction) || 0));
    }
    if (sortBy === "extraction-asc") {
      return list.sort((a, b) => (parseInt(a.extraction) || 0) - (parseInt(b.extraction) || 0));
    }
    if (sortBy === "airflow-desc") {
      return list.sort((a, b) => {
        const valA = parseInt(a.airflow.replace(/,/g, "")) || 0;
        const valB = parseInt(b.airflow.replace(/,/g, "")) || 0;
        return valB - valA;
      });
    }
    if (sortBy === "name-asc") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [filteredProducts, sortBy]);

  // Reset all filters and queries
  const handleReset = () => {
    setQuery("");
    setCategory("all");
    setSortBy("default");
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Search Header Banner */}
      <section className="bg-brand-gray-light border-b border-brand-border/60 py-16 relative overflow-hidden">
        {/* Dynamic Industrial Blueprint Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          {/* <ScrollReveal delay={0.05}>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-display bg-brand-blue-light px-3.5 py-1.5 rounded-full border border-brand-blue/15">
              Live Catalog Search
            </span>
          </ScrollReveal> */}

          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-brand-navy leading-tight">
              Search
            </h1>
          </ScrollReveal>

          {/* <ScrollReveal delay={0.15}>
            <p className="text-sm md:text-base text-brand-gray-medium max-w-xl mx-auto leading-relaxed">
              Instantly find specific dehumidifier capacities, whisper-quiet portables, high-performance systems, or search by specific industrial application keywords.
            </p>
          </ScrollReveal> */}

          {/* Interactive Search Console Container */}
          <ScrollReveal delay={0.2} className="max-w-2xl mx-auto pt-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-brand-gray-medium transition-colors group-focus-within:text-brand-blue" />
              </div>
              <input
                type="text"
                placeholder="Search by model, application (e.g. laboratory), spec, or feature..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white border border-brand-border rounded-2xl font-display font-medium text-brand-navy placeholder:text-brand-gray-medium/80 shadow-md transition-all duration-300 focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 focus:shadow-lg text-sm sm:text-base"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 right-4 flex items-center text-brand-gray-medium hover:text-brand-accent transition-colors"
                  aria-label="Clear Search Input"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Control Console & Filter Layout */}
      <section className="py-12 bg-white flex-grow">
        <div className="max-w-7xl mx-auto px-6 md:px-8">



          {/* Results Grid Display Area */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-8">
              {sortedProducts.map((product, index) => (
                <ScrollReveal key={product.slug} delay={0.05 * (index % 3)}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            /* Clean, simple empty search result placeholder state */
            <ScrollReveal className="max-w-md mx-auto text-center py-16 space-y-5">
              <div className="h-14 w-14 bg-brand-gray-light border border-brand-border/60 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="h-6 w-6 text-brand-navy" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-brand-navy">No results found</h3>
                <p className="text-xs text-brand-gray-medium leading-relaxed font-semibold">
                  We couldn't find any products matching &ldquo;<span className="font-semibold text-brand-blue">{query}</span>&rdquo;.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="bg-brand-navy hover:bg-brand-navy-light text-white px-5 py-2.5 rounded-xl font-display text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Clear Search</span>
                </button>
              </div>
            </ScrollReveal>
          )}

          {/* Quick-links helpful panel for instant category redirects if they are exploring */}
          {sortedProducts.length > 0 && (
            <div className="mt-20 p-8 rounded-3xl bg-brand-gray-light border border-brand-border/60 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center md:text-left">
                <h4 className="font-display font-bold text-base text-brand-navy flex items-center justify-center md:justify-start gap-1.5">
                  <Sparkles className="h-4 w-4 text-brand-accent animate-pulse" />
                  <span>Need Help From Our Technical Team?</span>
                </h4>
                <p className="text-xs text-brand-gray-medium max-w-lg leading-relaxed">
                  Our professional dehumidification experts can custom-engineer large scale moisture extraction systems built specifically for extreme commercial climates.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-navy text-white px-5 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all duration-300 shrink-0 cursor-pointer"
              >
                <span>Consult An Engineer</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
