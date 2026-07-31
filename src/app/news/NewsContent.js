"use client";

import { useState, useMemo } from "react";
import Link from "@/components/ui/AppLink";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, ArrowRight, MessageSquare, Mail, Phone, Calendar } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function NewsContent({ initialNews }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Unique categories list
  const categories = useMemo(() => {
    const list = new Set(initialNews.map((n) => n.category));
    return ["All", ...Array.from(list)];
  }, [initialNews]);

  // Filtered news list
  const filteredNews = useMemo(() => {
    return initialNews.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialNews, activeCategory, searchQuery]);

  // Featured news post (first in the array)
  // Only display featured post banner if user is on "All" category and not actively searching
  const featuredNews = useMemo(() => {
    /*
    if (activeCategory === "All" && searchQuery === "" && initialNews.length > 0) {
      return initialNews[0];
    }
    */
    return null;
  }, [initialNews, activeCategory, searchQuery]);

  // Grid news (excluding the featured one if visible)
  const gridNews = useMemo(() => {
    if (featuredNews) {
      return filteredNews.filter((n) => n.slug !== featuredNews.slug);
    }
    return filteredNews;
  }, [filteredNews, featuredNews]);

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans selection:bg-brand-navy selection:text-white">
      {/* 1. Sleek Press Room Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-950 to-brand-navy text-white py-16 md:py-24 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-brand-navy/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center md:text-left space-y-4">
          <ScrollReveal delay={0.1}>
            <span className="text-[10px] sm:text-xs font-bold text-brand-blue-light uppercase tracking-[0.25em] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              Press & Media Room
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.2} y={15}>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
              The Role Of AMFAH Foundation
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3} y={15}>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans font-medium">
              Official press releases, media coverage, and technical breakthroughs detailing our patented air quality and humidity control solutions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 mt-12 md:mt-16 space-y-16">
        
        {/* 2. Featured Release (Asymmetrical Glass card) (Commented Out for now) */}
        {/* 
        <AnimatePresence>
          {featuredNews && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center bg-white border border-brand-border/60 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-500">
                <div className="lg:col-span-5 flex items-center justify-center bg-slate-50/80 rounded-2xl overflow-hidden p-4 group border border-brand-border/40 shrink-0">
                  <img
                    src={featuredNews.image || "/banner/dehumidifiers.jpeg"}
                    alt={featuredNews.title}
                    className="w-full h-auto max-h-[450px] object-contain rounded-xl shadow-xs transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  />
                </div>

                <div className="lg:col-span-7 p-4 sm:p-6 space-y-6 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold bg-brand-navy text-white uppercase tracking-wider px-2.5 py-1 rounded">
                        Featured Release
                      </span>
                      <span className="text-xs text-brand-gray-medium font-bold uppercase tracking-wider font-display inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {featuredNews.date}
                      </span>
                    </div>

                    <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-navy leading-tight hover:text-brand-accent transition-colors duration-250">
                      <Link href={`/news/${featuredNews.slug}`}>
                        {featuredNews.title}
                      </Link>
                    </h2>

                    <p className="text-sm leading-relaxed text-brand-gray-dark/85 font-sans">
                      {featuredNews.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-gray-medium font-display">{featuredNews.readTime}</span>
                    <Link
                      href={`/news/${featuredNews.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-navy uppercase tracking-wider hover:text-brand-accent transition-all group"
                    >
                      <span>Read Release</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        */}

        {/* 3. Control Panel (Minimal category tabs & search) (Commented Out for now) */}
        {/*
        <section className="bg-white border border-brand-border/60 p-4 rounded-2xl shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1 no-scrollbar">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-4.5 py-2 text-[10px] sm:text-xs font-bold rounded-xl font-display uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-brand-navy text-white shadow-md shadow-brand-navy/10"
                        : "text-brand-gray-medium hover:text-brand-navy hover:bg-brand-gray-light"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-gray-medium/60">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search media library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-brand-gray-light/50 border border-brand-border/80 focus:border-brand-navy rounded-xl text-xs font-sans text-brand-gray-dark placeholder-brand-gray-medium/60 focus:outline-none transition-colors duration-300"
              />
            </div>
          </div>
        </section>
        */}

        {/* 4. Press Feed: Magazine List Layout */}
        <section className="space-y-8">
          {gridNews.length > 0 ? (
            <motion.div
              layout
              className="flex flex-col gap-6"
            >
              <AnimatePresence mode="popLayout">
                {gridNews.map((item, index) => (
                  <motion.div
                    layout
                    key={item.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, delay: 0.05 * index }}
                  >
                    <PressCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* No Results */
            <div className="py-20 text-center bg-white border border-brand-border/60 rounded-xl max-w-lg mx-auto space-y-6">
              <div className="h-16 w-16 bg-[#FAF7F2] text-brand-navy rounded-full flex items-center justify-center mx-auto">
                <FileText className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-brand-navy">
                  No Announcements Found
                </h3>
                <p className="text-xs text-brand-gray-medium leading-relaxed font-sans max-w-sm mx-auto px-4">
                  No press releases matched your query &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo; in the <span className="font-semibold">{activeCategory}</span> filter.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="inline-block text-[11px] font-bold text-brand-navy uppercase tracking-wider border-b border-brand-navy pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors"
              >
                Clear Search filters
              </button>
            </div>
          )}
        </section>

        {/* 5. PR & Media Contact Block */}
        <section className="bg-slate-900 text-white rounded-xl p-8 sm:p-12 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-navy/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white inline-flex items-center gap-2">
                <MessageSquare className="h-7 w-7 text-brand-blue-light" />
                Media Enquiries
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed font-sans">
                For press credentials, interviews, and official comments regarding our patented air quality and relative humidity systems, please reach out directly to our PR department.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3 font-display text-xs font-bold uppercase tracking-wider">
              <a
                href="mailto:info.india@amfah.com"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/15 p-4 rounded-xl text-white transition-all cursor-pointer"
              >
                <Mail className="h-5 w-5 text-brand-blue-light" />
                info.india@amfah.com
              </a>
              <a
                href="tel:+919321991812"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/15 p-4 rounded-xl text-white transition-all cursor-pointer"
              >
                <Phone className="h-5 w-5 text-brand-blue-light" />
                +91 93219 91812
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

// Magazine Style Press Card Component
function PressCard({ item }) {
  const { slug, title, summary, date, readTime, category, image, author, tags, officialLink } = item;
  
  // Custom source tags depending on slug or categories
  const sourceTag = useMemo(() => {
    if (slug.includes("covid")) return "Express Healthcare Feature";
    if (slug.includes("patented")) return "Official Press Release";
    return "Corporate Update";
  }, [slug]);

  return (
    <article className="group bg-white border border-brand-border/60 hover:border-brand-navy/20 p-6 md:p-8 rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row gap-8 items-stretch">
      {/* Thumbnail */}
      <Link
        href={`/news/${slug}`}
        prefetch={false}
        className="block overflow-hidden rounded-2xl lg:w-[440px] lg:h-72 md:h-64 h-48 w-full shrink-0 relative bg-brand-blue-light/35 shadow-xs border border-brand-border/40"
      >
        <img
          src={image || "/banner/dehumidifiers.jpeg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
          loading="lazy"
        />
      </Link>

      {/* Info Column */}
      <div className="flex-grow flex flex-col justify-between space-y-4 py-1.5 w-full">
        <div className="space-y-3.5">
          {/* Source Badge & Date */}
          <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-bold text-brand-gray-medium uppercase tracking-wider font-display flex-wrap">
            <span className="text-brand-navy bg-brand-blue-light px-3 py-1 rounded-md">
              {sourceTag}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
            <span>{date}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
            <span>{readTime}</span>
            {officialLink && (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
                <a
                  href={officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:text-brand-navy underline transition-colors normal-case font-semibold"
                >
                  View Official News Source
                </a>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-brand-navy group-hover:text-brand-accent transition-colors duration-300 leading-tight">
            <Link href={`/news/${slug}`} prefetch={false}>
              {title}
            </Link>
          </h3>

          {/* Summary */}
          <p className="text-sm sm:text-base leading-relaxed text-brand-gray-dark/85 line-clamp-5 font-sans">
            {summary}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag) => (
                <span key={tag} className="text-[10px] font-bold bg-[#FAF7F2] text-brand-navy border border-brand-border/60 px-3 py-1 rounded-full font-display uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer info & Read Link */}
        <div className="pt-4 border-t border-brand-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 font-bold uppercase tracking-wider font-display">
            By <span className="text-brand-navy">{author}</span>
          </span>
          <Link
            href={`/news/${slug}`}
            prefetch={false}
            className="inline-flex items-center gap-1.5 font-bold text-brand-navy uppercase tracking-wider border-b-2 border-brand-navy/35 hover:border-brand-accent hover:text-brand-accent transition-all pb-0.5"
          >
            <span>Read Publication</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
