"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, RefreshCw, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { instagramVideos } from "@/data/instagramVideos";

// Custom Instagram Icon SVG
function InstagramIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
    scale: 1
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "tween", ease: "easeInOut", duration: 0.8 },
      opacity: { duration: 0.8 },
      scale: { duration: 0.8 }
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "tween", ease: "easeInOut", duration: 0.8 },
      opacity: { duration: 0.8 },
      scale: { duration: 0.8 }
    }
  })
};

export default function InstagramGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [activeIframeLoading, setActiveIframeLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRefMobile = useRef(null);
  const iframeRefDesktop = useRef(null);
  const videoRef = useRef(null);
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true, margin: "200px" });

  // Set isMounted to true on client-side mount
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const prevIndex = instagramVideos && instagramVideos.length ? (currentIndex - 1 + instagramVideos.length) % instagramVideos.length : 0;
  const prev2Index = instagramVideos && instagramVideos.length ? (currentIndex - 2 + instagramVideos.length) % instagramVideos.length : 0;
  const prev3Index = instagramVideos && instagramVideos.length ? (currentIndex - 3 + instagramVideos.length) % instagramVideos.length : 0;
  const nextIndex = instagramVideos && instagramVideos.length ? (currentIndex + 1) % instagramVideos.length : 0;
  const next2Index = instagramVideos && instagramVideos.length ? (currentIndex + 2) % instagramVideos.length : 0;
  const next3Index = instagramVideos && instagramVideos.length ? (currentIndex + 3) % instagramVideos.length : 0;

  const activeVideo = instagramVideos ? instagramVideos[currentIndex] : null;
  const prevVideo = instagramVideos ? instagramVideos[prevIndex] : null;
  const prev2Video = instagramVideos ? instagramVideos[prev2Index] : null;
  const prev3Video = instagramVideos ? instagramVideos[prev3Index] : null;
  const nextVideo = instagramVideos ? instagramVideos[nextIndex] : null;
  const next2Video = instagramVideos ? instagramVideos[next2Index] : null;
  const next3Video = instagramVideos ? instagramVideos[next3Index] : null;

  // Sync state when reel index changes
  useEffect(() => {
    setIsMuted(true);
  }, [currentIndex]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    const iframe = isMobile ? iframeRefMobile.current : iframeRefDesktop.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: newMuted ? "mute" : "unMute",
          args: []
        }),
        "*"
      );
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prevIndex);
  };

  const handlePrev2 = () => {
    setDirection(-1);
    setCurrentIndex(prev2Index);
  };

  const handlePrev3 = () => {
    setDirection(-1);
    setCurrentIndex(prev3Index);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(nextIndex);
  };

  const handleNext2 = () => {
    setDirection(1);
    setCurrentIndex(next2Index);
  };

  const handleNext3 = () => {
    setDirection(1);
    setCurrentIndex(next3Index);
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };
    if (selectedVideo) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  const openLightbox = (video) => {
    setIframeLoading(true);
    setSelectedVideo(video);
  };

  const handleLightboxPrev = (e) => {
    e.stopPropagation();
    if (!selectedVideo || !instagramVideos) return;
    const currentVidIndex = instagramVideos.findIndex(v => v.id === selectedVideo.id);
    const prevVidIndex = (currentVidIndex - 1 + instagramVideos.length) % instagramVideos.length;
    setSelectedVideo(instagramVideos[prevVidIndex]);
  };

  const handleLightboxNext = (e) => {
    e.stopPropagation();
    if (!selectedVideo || !instagramVideos) return;
    const currentVidIndex = instagramVideos.findIndex(v => v.id === selectedVideo.id);
    const nextVidIndex = (currentVidIndex + 1) % instagramVideos.length;
    setSelectedVideo(instagramVideos[nextVidIndex]);
  };

  // ALL positions use `left` only — never mix left/right or Framer Motion
  // will snap instead of sliding when a card crosses from the right track to the left.
  // right: calc(50% - Xpx) on a 200px-wide card ≡ left: calc(50% + (X-200)px)
  const getCardAnimate = (o) => {
    switch (o) {
      case -4: return { left: "calc(50% - 890px)", opacity: 0, scale: 0.6, zIndex: 0, pointerEvents: "none" };
      case -3: return { left: "calc(50% - 730px)", opacity: 1, scale: 0.7, zIndex: 10, pointerEvents: "auto" };
      case -2: return { left: "calc(50% - 570px)", opacity: 1, scale: 0.8, zIndex: 10, pointerEvents: "auto" };
      case -1: return { left: "calc(50% - 390px)", opacity: 1, scale: 0.9, zIndex: 10, pointerEvents: "auto" };
      case  0: return { left: "calc(50% - 100px)", opacity: 0, scale: 1.0, zIndex: 0,  pointerEvents: "none" };
      case  1: return { left: "calc(50% + 180px)", opacity: 1, scale: 0.9, zIndex: 10, pointerEvents: "auto" };
      case  2: return { left: "calc(50% + 360px)", opacity: 1, scale: 0.8, zIndex: 10, pointerEvents: "auto" };
      case  3: return { left: "calc(50% + 520px)", opacity: 1, scale: 0.7, zIndex: 10, pointerEvents: "auto" };
      case  4: return { left: "calc(50% + 680px)", opacity: 0, scale: 0.6, zIndex: 0,  pointerEvents: "none" };
      default:  return null;
    }
  };

  const getCardHandler = (o) => {
    if (o === -1) return handlePrev;
    if (o === -2) return handlePrev2;
    if (o === -3 || o === -4) return handlePrev3;
    if (o === 1) return handleNext;
    if (o === 2) return handleNext2;
    if (o === 3 || o === 4) return handleNext3;
    return undefined;
  };

  const visibleCards = [];
  if (instagramVideos && instagramVideos.length) {
    for (let o = -4; o <= 4; o++) {
      const anim = getCardAnimate(o);
      if (!anim) continue;
      const index = (currentIndex + o + instagramVideos.length) % instagramVideos.length;
      visibleCards.push({
        video: instagramVideos[index],
        offset: o,
        anim,
        onClick: getCardHandler(o)
      });
    }
  }

  return (
    <section ref={galleryRef} id="instagram-gallery" className="pt-4 pb-0 md:pt-10  bg-brand-gray-light/35 relative overflow-hidden">
      {/* Background radial soft light gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-8xl mx-auto px-6 md:px-20 relative z-10">
        
        {/* Header (Preserving USER edits) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 md:gap-6">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <ScrollReveal delay={0.15}>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-navy">
                Video Gallery
              </h2>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={0.25} className="shrink-0 flex justify-center md:justify-end">
            <a
              href="https://www.instagram.com/amfah_airquality/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-600 hover:via-pink-600 hover:to-purple-700 text-white font-display font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow @amfah_airquality
            </a>
          </ScrollReveal>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center h-auto sm:h-[660px] max-w-5xl mx-auto my-6 overflow-visible select-none">
          
          {/* DYNAMIC SIDE PREVIEW CARDS — single left-axis positioning */}
          {visibleCards.map(({ video, offset, anim, onClick }) => (
            video && offset !== 0 && (
              <motion.div
                key={`${video.id}-${offset < 0 ? "L" : "R"}`}
                onClick={onClick}
                className="absolute hidden md:flex flex-col items-center justify-center w-[160px] sm:w-[200px] h-[320px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg bg-black"
                initial={{ left: "calc(50% - 100px)", opacity: 0, scale: 1.0, zIndex: 0, pointerEvents: "none" }}
                animate={anim}
                transition={{
                  left:    { type: "tween", ease: [0.4, 0, 0.2, 1], duration: 0.75 },
                  opacity: { type: "tween", ease: "easeInOut",       duration: 0.5  },
                  scale:   { type: "tween", ease: [0.4, 0, 0.2, 1], duration: 0.75 },
                }}
              >
                {isMounted && video.thumbnail ? (
                  <Image 
                    src={video.thumbnail} 
                    alt={video.title || "video"} 
                    fill 
                    sizes="200px" 
                    className="object-cover pointer-events-none" 
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-slate-900" />
                )}
              </motion.div>
            )
          ))}

          {/* ── MOBILE: Clean video card, no phone frame ── */}
          <div className="block sm:hidden relative z-20 w-[75vw] max-w-[280px] rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ aspectRatio: "9/16" }}>
            {/* Slidable Video Content */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                {/* Removed Loading Spinner that was getting stuck */}
                {/* Video */}
                {isMounted && isInView && isMobile && activeVideo && activeVideo.youtubeId && (
                  <iframe
                    ref={iframeRefMobile}
                    key={activeVideo.id}
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${activeVideo.youtubeId}&controls=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute inset-0 w-full h-full"
                    style={{ pointerEvents: "none" }}
                  />
                )}
                
                {/* Overlay for clicking to open lightbox */}
                <div 
                  className="absolute inset-0 z-10 cursor-pointer" 
                  onClick={() => activeVideo && openLightbox(activeVideo)} 
                />

                {/* Volume Toggle */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 z-40 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all shadow-lg cursor-pointer flex items-center justify-center"
                  aria-label="Toggle Sound"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── DESKTOP: Hand-held phone frame ── */}
          <div className="hidden sm:block relative z-20 w-[540px] aspect-[371/373] transition-all duration-500">
            {/* The PNG Image of Hand Holding Phone */}
            <Image 
              src="/images/hand-with-phone.png"
              alt="Hand holding phone"
              fill
              sizes="320px"
              className="object-contain pointer-events-none z-20 select-none"
              priority
            />

            {/* Absolute Screen Container positioned exactly over the image's phone screen area */}
            <div 
              className="absolute rounded-[15px] overflow-hidden z-30 cursor-pointer"
              style={{
                left: "24%",
                right: "38%",
                top: "7.80%",
                bottom: "8.58%",
                transform: "translateZ(0)",
                isolation: "isolate"
              }}
              onClick={() => activeVideo && openLightbox(activeVideo)}
            >
              {/* Slidable Video Content */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full overflow-hidden rounded-[inherit]"
                >
                  {/* Removed Loading Spinner that was getting stuck */}

                  {/* Embedded Local Video Player */}
                  {isMounted && isInView && !isMobile && activeVideo && activeVideo.youtubeId && (
                    <iframe
                      ref={iframeRefDesktop}
                      key={activeVideo.id}
                      src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${activeVideo.youtubeId}&controls=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="absolute inset-0 w-full h-full z-20 rounded-[inherit]"
                      style={{ pointerEvents: "none" }}
                    />
                  )}
                  {/* Volume Toggle */}
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-4 right-4 z-40 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all shadow-lg cursor-pointer flex items-center justify-center"
                    aria-label="Toggle Sound"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Soft fade-out gradient */}
            <div className="absolute -bottom-1 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/50 to-transparent z-40 pointer-events-none" />
          </div>

          {/* LEFT SLIDER ARROW — desktop only (absolute) */}
          <button 
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 md:left-[22%] lg:left-[26%] xl:left-[30%] z-45 bg-white/90 hover:bg-brand-navy hover:!text-white text-brand-navy p-3 rounded-full border border-brand-border/60 hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer items-center justify-center"
            aria-label="Previous Video"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* RIGHT SLIDER ARROW — desktop only (absolute) */}
          <button 
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 md:right-[22%] lg:right-[26%] xl:right-[30%] z-45 bg-white/90 hover:bg-brand-navy hover:!text-white text-brand-navy p-3 rounded-full border border-brand-border/60 hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer items-center justify-center"
            aria-label="Next Video"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

        </div>

        {/* Mobile nav arrows — rendered below the video card */}
        <div className="flex sm:hidden items-center justify-center gap-6 mt-4 mb-2">
          <button
            onClick={handlePrev}
            className="bg-white/90 hover:bg-brand-navy hover:!text-white text-brand-navy p-3 rounded-full border border-brand-border/60 hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer flex items-center justify-center"
            aria-label="Previous Video"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {/* Dot indicator */}
          <div className="flex gap-1.5">
            {instagramVideos.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-5 h-2 bg-brand-navy"
                    : "w-2 h-2 bg-brand-navy/30 hover:bg-brand-navy/60"
                }`}
                aria-label={`Go to video ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="bg-white/90 hover:bg-brand-navy hover:!text-white text-brand-navy p-3 rounded-full border border-brand-border/60 hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer flex items-center justify-center"
            aria-label="Next Video"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Instagram oEmbed iframe */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Close Button (Moved outside video container to top-right) */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 bg-white/60 hover:bg-white/80 backdrop-blur-md text-black-600 p-2 sm:p-3 rounded-full border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Previous Video Button */}
            <button
              onClick={handleLightboxPrev}
              className="absolute left-2 sm:left-10 top-1/2 -translate-y-1/2 z-50 bg-white/60 hover:bg-white/80 backdrop-blur-md text-black p-2 sm:p-3 rounded-full border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center"
              aria-label="Previous Video"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Next Video Button */}
            <button
              onClick={handleLightboxNext}
              className="absolute right-2 sm:right-10 top-1/2 -translate-y-1/2 z-50 bg-white/60 hover:bg-white/80 backdrop-blur-md text-black p-2 sm:p-3 rounded-full border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center"
              aria-label="Next Video"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-[420px] aspect-[9/16] sm:aspect-[3/4] md:aspect-[9/16] max-h-[90vh] bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video content container */}
              <div className="relative w-full h-full flex-grow bg-slate-950 flex items-center justify-center">
                {selectedVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="text-white/60 text-sm">No video source available</div>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
