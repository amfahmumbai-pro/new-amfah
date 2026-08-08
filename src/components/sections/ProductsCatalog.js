"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Droplets } from "lucide-react";
import ProductCard from "@/components/cards/ProductCard";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { products } from "@/data/products";
import { sortByCoverageArea } from "@/utils/productUtils";

const categories = [
  { name: "All Equipment", id: "all" },
  { name: "Commercial & Industrial", id: "industrial" },
  { name: "Home & Retail", id: "residential" },
  { name: "Air Purifiers", id: "purifier" },
  { name: "Humidifiers", id: "humidifier" },
  { name: "Air to Water", id: "air-to-water" },
  { name: "Portable AC", id: "portable-ac" },
];

export default function ProductsCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const catParam = searchParams.get("cat") || "all";
  const [prevCatParam, setPrevCatParam] = useState(catParam);
  const [activeCategory, setActiveCategory] = useState(catParam);

  if (catParam !== prevCatParam) {
    setPrevCatParam(catParam);
    setActiveCategory(catParam);
  }

  const [stickyTopOffset, setStickyTopOffset] = useState("130px");
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Dynamic sticky top offset calculation to match header state
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const header = document.querySelector("header");
      if (!header) return;
      
      const totalHeaderHeight = header.offsetHeight;
      const banner = header.querySelector(".bg-\\[\\#d41124\\]");
      const bannerHeight = banner ? banner.offsetHeight : 0;
      const mainHeaderHeight = totalHeaderHeight - bannerHeight;

      if (currentScrollY > 150) {
        // If scrolling down, navbar translates up out of view (hidden)
        const isHeaderHidden = currentScrollY > lastScrollY;
        if (isHeaderHidden) {
          setStickyTopOffset("0px");
        } else {
          setStickyTopOffset(`${totalHeaderHeight}px`);
        }
      } else {
        setStickyTopOffset(`${totalHeaderHeight}px`);
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll-spy active state tracking
  useEffect(() => {
    const sectionIds = categories.filter((c) => c.id !== "all").map((c) => c.id);
    
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px", // Trigger when category header/content occupies mid viewport
      threshold: 0,
    };
    
    const handleIntersection = (entries) => {
      if (isScrollingRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    
    // Reset to "all" when scrolled to the very top
    const handleScrollTop = () => {
      if (window.scrollY < 200) {
        if (!isScrollingRef.current) {
          setActiveCategory("all");
        }
      }
    };
    
    window.addEventListener("scroll", handleScrollTop, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollTop);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleFilter = (catId) => {
    setActiveCategory(catId);
    
    // Lock observer changes while smooth scroll is in progress
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    
    const params = new URLSearchParams(searchParams.toString());
    if (catId === "all") {
      params.delete("cat");
    } else {
      params.set("cat", catId);
    }
    // Replace URL without a full page navigation
    router.replace(`/products${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });

    // Perform smooth scroll
    if (catId === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(catId);
      if (element) {
        const header = document.querySelector("header");
        // Header height + sub-nav height + safe spacing offset
        const navbarHeight = (header?.offsetHeight || 130) + 70;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }

    // Release observer lock once scroll animation ends
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 850);
  };

  return (
    <section className="bg-white pb-16 md:pb-24 relative">
      {/* Sticky Category Tab Navigation Bar */}
      <div 
        className="sticky transition-[top] duration-300 z-30 bg-white border-b border-brand-border/60 py-3 mb-8 md:mb-12 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shadow-sm"
        style={{ top: stickyTopOffset }}
      >
        <div className="max-w-7xl mx-auto px-3 md:px-8">
          <div className="flex flex-nowrap gap-2 justify-start md:justify-center bg-brand-gray-light border border-brand-border p-1.5 rounded-xl w-max md:w-full mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilter(cat.id)}
                className={`whitespace-nowrap px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex-shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-brand-navy text-white shadow-md"
                    : "text-brand-gray-medium hover:text-brand-blue"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Content Sections */}
      <div className="max-w-7xl mx-auto px-3 md:px-8">
        <div className="space-y-16 md:space-y-24">
          {categories
            .filter((cat) => cat.id !== "all")
            .map((cat) => {
              const catProducts = sortByCoverageArea(
                products.filter((product) => product.categoryId === cat.id)
              );
              
              if (catProducts.length === 0) return null;

              return (
                <div 
                  key={cat.id} 
                  id={cat.id} 
                  className="space-y-6 md:space-y-8 scroll-mt-24"
                >
                  {/* Category Section Title Bar */}
                  <div className="border-b border-brand-border/60 pb-3 flex items-center justify-between">
                    <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-navy">
                      {cat.name}
                    </h2>
                    <span className="text-xs font-bold text-brand-gray-medium bg-brand-gray-light px-3.5 py-1.5 rounded-full border border-brand-border/40">
                      {catProducts.length} {catProducts.length === 1 ? "Model" : "Models"}
                    </span>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-5">
                    {catProducts.map((product, index) => (
                      <ScrollReveal key={product.slug} delay={0.03 * (index % 5)}>
                        <ProductCard product={product} />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
