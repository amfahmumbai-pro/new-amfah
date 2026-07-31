"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "@/components/ui/AppLink";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Clock, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "@/components/cards/BlogCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

const ITEMS_PER_PAGE = 9;

export default function BlogsContent({ initialBlogs }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef(null);

  // Unique categories list
  const categories = useMemo(() => {
    const list = new Set(initialBlogs.map((b) => b.category));
    return ["All", ...Array.from(list)];
  }, [initialBlogs]);

  // Filtered blogs list
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" || blog.category === activeCategory;
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialBlogs, activeCategory, searchQuery]);

  // Featured blog post (first in the array)
  // Only display featured post banner if user is on "All" category and not actively searching
  const featuredBlog = useMemo(() => {
    if (activeCategory === "All" && searchQuery === "" && initialBlogs.length > 0) {
      return initialBlogs[0];
    }
    return null;
  }, [initialBlogs, activeCategory, searchQuery]);

  // Grid blogs (excluding the featured one if visible)
  const gridBlogs = useMemo(() => {
    if (featuredBlog) {
      return filteredBlogs.filter((b) => b.slug !== featuredBlog.slug);
    }
    return filteredBlogs;
  }, [filteredBlogs, featuredBlog]);

  // Pagination calculation
  const totalPages = Math.ceil(gridBlogs.length / ITEMS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return gridBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [gridBlogs, currentPage]);

  // Reset to first page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getPageNumbers = (current, total) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 3) {
      return [1, 2, 3, 4, "...", total];
    }
    if (current >= total - 2) {
      return [1, "...", total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setCurrentPage(1);
  };

  return (
    <div className="bg-white min-h-screen pb-14 font-sans">
      {/* Centered Editorial Header */}
      <header className="max-w-8xl mx-auto px-6 md:px-24  pt-4 md:pt-10 pb-6 md:pb-8 text-center space-y-3">
        <ScrollReveal delay={0.1}>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-brand-navy tracking-tight">
            Blogs
          </h1>
        </ScrollReveal>
        {/* <ScrollReveal delay={0.2}>
          <p className="text-sm sm:text-base text-brand-gray-medium max-w-lg mx-auto font-sans leading-relaxed">
            Technical analysis, industrial relative humidity standards, and indoor air health advisories.
          </p>
        </ScrollReveal> */}
      </header>

      {/* Main Container */}
      <main className="max-w-8xl mx-auto px-6 md:px-24 space-y-16">
        
        {/* Featured Post Card - Replicating Enso's top layout */}
        <AnimatePresence>
          {featuredBlog && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-[#FAF7F2] rounded-md p-6 sm:p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Text Block */}
                <div className="lg:col-span-6 space-y-5 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    {/* Category • Date */}
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-gray-medium uppercase tracking-widest font-display">
                      <span>{featuredBlog.category}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
                      <span>{featuredBlog.date}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-3xl text-brand-navy leading-tight hover:text-brand-accent transition-colors duration-200">
                      <Link href={`/blogs/${featuredBlog.slug}`} prefetch={false} className="focus:outline-none">
                        {featuredBlog.title}
                      </Link>
                    </h2>

                    {/* Summary */}
                    <p className="text-sm sm:text-base text-brand-gray-dark/85 leading-relaxed font-sans max-w-xl">
                      {featuredBlog.summary}
                    </p>
                  </div>

                  {/* Underlined Read Link */}
                  <div className="pt-4">
                    <Link
                      href={`/blogs/${featuredBlog.slug}`}
                      prefetch={false}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-navy uppercase tracking-wider border-b border-brand-navy/60 pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-all duration-300 group"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right Image Cover - Shifted to overflow parent card edge on large screens */}
                <div className="lg:col-span-6 lg:-my-16 lg:translate-x-16 xl:-my-24 xl:translate-x-28 transition-all duration-500">
                  <Link 
                    href={`/blogs/${featuredBlog.slug}`} 
                    prefetch={false}
                    className="block overflow-hidden rounded-md aspect-[16/10] sm:aspect-[16/9] lg:aspect-[1.6] relative bg-brand-blue-light shadow-xl shadow-black/8 hover:shadow-2xl hover:shadow-black/12 transition-all duration-500 hover:scale-[1.01]"
                  >
                    <img
                      src={featuredBlog.image || "/banner/dehumidifiers.jpeg"}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                    />
                  </Link>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal Control Bar (Underlined Categories and Search) */}
        <section ref={gridRef} className="scroll-mt-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Category Navigation List */}
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-4.5 py-2 text-[11px] sm:text-xs font-bold rounded-full font-display uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-brand-blue-light text-brand-navy"
                        : "text-brand-gray-medium hover:text-brand-navy hover:bg-brand-gray-light"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Minimalist Search Underline */}
            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 pl-1.5 flex items-center pointer-events-none text-brand-gray-medium/60">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-3 py-2 bg-transparent border-b border-brand-border focus:border-brand-navy text-xs font-sans text-brand-gray-dark placeholder-brand-gray-medium/60 focus:outline-none transition-colors duration-300"
              />
            </div>
          </div>
        </section>

        {/* 3-Column Editorial Blogs Grid */}
        <section className="space-y-12">
          {paginatedBlogs.length > 0 ? (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-14"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedBlogs.map((blog, index) => (
                    <motion.div
                      layout
                      key={blog.slug}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5, delay: 0.04 * index }}
                    >
                      <BlogCard blog={blog} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <nav className="flex flex-wrap items-center justify-center gap-4 pt-5">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center justify-center h-10 px-3.5 rounded-full text-xs font-bold font-display uppercase tracking-wider text-brand-navy bg-brand-gray-light/60 hover:bg-brand-blue-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {getPageNumbers(currentPage, totalPages).map((p, idx) =>
                      p === "..." ? (
                        <span key={`ellipsis-${idx}`} className="px-2 text-xs text-brand-gray-medium font-bold select-none">
                          ...
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`h-10 w-10 rounded-full text-xs font-bold font-display transition-all duration-200 cursor-pointer ${
                            currentPage === p
                              ? "bg-brand-navy text-white shadow-md shadow-brand-navy/15"
                              : "text-brand-gray-dark hover:bg-brand-blue-light/60"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center justify-center h-10 px-3.5 rounded-full text-xs font-bold font-display uppercase tracking-wider text-brand-navy bg-brand-gray-light/60 hover:bg-brand-blue-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="Next Page"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </nav>
              )}
            </>
          ) : (
            /* No Results Page */
            <div className="py-20 text-center max-w-md mx-auto space-y-6">
              <div className="h-16 w-16 bg-[#FAF7F2] text-brand-navy rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-brand-navy">
                  No Insights Found
                </h3>
                <p className="text-xs text-brand-gray-medium leading-relaxed font-sans">
                  No publications matched your search query &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo; in the <span className="font-semibold">{activeCategory}</span> filter.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="inline-block text-[11px] font-bold text-brand-navy uppercase tracking-wider border-b border-brand-navy pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors"
              >
                Clear Filters & Search
              </button>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
