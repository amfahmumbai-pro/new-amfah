"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Droplets } from "lucide-react";
import ProductCard from "@/components/cards/ProductCard";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { products } from "@/data/products";
import { sortByCoverageArea } from "@/utils/productUtils";

const categories = [
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

  const catParam = searchParams.get("cat") || "industrial";
  const [prevCatParam, setPrevCatParam] = useState(catParam);
  const [activeCategory, setActiveCategory] = useState(catParam);

  if (catParam !== prevCatParam) {
    setPrevCatParam(catParam);
    setActiveCategory(catParam);
  }

  const [stickyTopOffset, setStickyTopOffset] = useState("130px");
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const tabContainerRef = useRef(null);
  const activeTabRef = useRef(null);

  // Auto-scroll active tab into horizontal view on mobile when activeCategory changes
  useEffect(() => {
    if (activeTabRef.current && tabContainerRef.current) {
      const container = tabContainerRef.current;
      const tab = activeTabRef.current;

      const containerWidth = container.offsetWidth;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;

      // Center the active tab in the scroll container
      const targetScrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: "smooth",
      });
    }
  }, [activeCategory]);

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
    const sectionIds = categories.map((c) => c.id);

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

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleFilter = (catId) => {
    setActiveCategory(catId);

    // Lock observer changes while smooth scroll is in progress
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const params = new URLSearchParams(searchParams.toString());
    if (catId === "industrial") {
      params.delete("cat");
    } else {
      params.set("cat", catId);
    }
    // Replace URL without a full page navigation
    router.replace(`/products${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });

    // Perform smooth scroll
    const element = document.getElementById(catId);
    if (element) {
      const header = document.querySelector("header");
      // Header height + sub-nav height + safe spacing offset
      const navbarHeight = (header?.offsetHeight || 130) + 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
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
        className="sticky transition-[top] duration-300 z-30 bg-white/95 backdrop-blur-md border-b border-brand-border/60 py-2.5 sm:py-3 mb-8 md:mb-12 shadow-sm"
        style={{ top: stickyTopOffset }}
      >
        <div
          ref={tabContainerRef}
          className="max-w-7xl mx-auto px-3 md:px-8 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
        >
          <div className="flex flex-nowrap gap-1.5 sm:gap-2 justify-start md:justify-center bg-brand-gray-light border border-brand-border p-1.5 rounded-xl w-max md:w-full mx-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  ref={isActive ? activeTabRef : null}
                  onClick={() => handleFilter(cat.id)}
                  className={`whitespace-nowrap px-3.5 py-2 md:px-5 md:py-2.5 rounded-lg font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex-shrink-0 ${
                    isActive
                      ? "bg-brand-navy text-white shadow-md scale-[1.02]"
                      : "text-brand-gray-medium hover:text-brand-blue hover:bg-white/60"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Categories Content Sections */}
      <div className="max-w-7xl mx-auto px-3 md:px-8">
        <div className="space-y-16 md:space-y-24">
          {categories.map((cat) => {
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
