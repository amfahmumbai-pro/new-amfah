"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CITIES = {
  "NEW DELHI": {
    name: "NEW DELHI",
    lat: 28.6139,
    lon: 77.209,
    rh: 78,
    temp: "34°C",
    target: "45-50%",
    status: "Critical Dampness",
    desc: "Monsoon moisture causes severe indoor dampness and airborne mold across NCR.",
    image: "/images/Delhi.png",
  },
  "MUMBAI": {
    name: "MUMBAI",
    lat: 19.076,
    lon: 72.8777,
    rh: 86,
    temp: "31°C",
    target: "45-50%",
    status: "Extreme Moisture",
    desc: "Coastal proximity keeps humidity above 80% RH year-round, damaging luxury spaces.",
    image: "/images/Mumbai.png",
  },
  "HYDERABAD": {
    name: "HYDERABAD",
    lat: 17.385,
    lon: 78.4867,
    rh: 76,
    temp: "30°C",
    target: "45-50%",
    status: "High Dampness",
    desc: "Seasonal monsoon shifts lead to sticky indoor air, affecting electronics and wooden interiors.",
    image: "/images/Hyderabad.png",
  },
  "PUNE": {
    name: "PUNE",
    lat: 18.5204,
    lon: 73.8567,
    rh: 74,
    temp: "29°C",
    target: "45-50%",
    status: "High Humidity",
    desc: "Deccan plateau rains create heavy indoor air stagnation and wall condensation.",
    image: "/images/Pune.png",
  },
  "BANGALORE": {
    name: "BANGALORE",
    lat: 12.9716,
    lon: 77.5946,
    rh: 79,
    temp: "28°C",
    target: "45-50%",
    status: "Elevated Moisture",
    desc: "Frequent showers and high elevation lead to continuous moisture trapped in homes and offices.",
    image: "/images/Bangalore.png",
  },
  "CHENNAI": {
    name: "CHENNAI",
    lat: 13.0827,
    lon: 80.2707,
    rh: 88,
    temp: "33°C",
    target: "45-50%",
    status: "Severe Moisture",
    desc: "Tropical coastal humidity promotes rust, equipment damage, and musty odors.",
    image: "/images/Chennai.png",
  },
};

const CITY_KEYS = Object.keys(CITIES);
const SET_SIZE = CITY_KEYS.length;
// Duplicate city keys 3 times to create a continuous, non-reversing infinite scroll loop
const INFINITE_CITY_KEYS = [...CITY_KEYS, ...CITY_KEYS, ...CITY_KEYS];

export default function HumidityTrackerCard() {
  // Start at index SET_SIZE (6), the beginning of the middle set
  const [virtualIndex, setVirtualIndex] = useState(SET_SIZE);
  const [liveData, setLiveData] = useState(CITIES);
  const [isLive, setIsLive] = useState(false);
  const containerRef = useRef(null);
  const tabRefs = useRef([]);

  const activeCityKey = CITY_KEYS[virtualIndex % SET_SIZE];
  const currentCity = liveData[activeCityKey] || CITIES[activeCityKey];

  // Fetch real-time live weather and humidity data for all cities via Open-Meteo API
  useEffect(() => {
    async function fetchLiveWeather() {
      try {
        const lats = CITY_KEYS.map((k) => CITIES[k].lat).join(",");
        const lons = CITY_KEYS.map((k) => CITIES[k].lon).join(",");
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=relative_humidity_2m,temperature_2m`;

        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();

        // Open-Meteo returns an array of objects when multiple coordinates are passed
        const results = Array.isArray(data) ? data : [data];

        setLiveData((prev) => {
          const updated = { ...prev };
          CITY_KEYS.forEach((key, index) => {
            const item = results[index];
            if (item && item.current) {
              const liveRh = Math.round(item.current.relative_humidity_2m);
              const liveTemp = `${Math.round(item.current.temperature_2m)}°C`;

              let status = "Elevated Moisture";
              if (liveRh >= 85) status = "Severe Moisture";
              else if (liveRh >= 78) status = "Extreme Moisture";
              else if (liveRh >= 70) status = "Critical Dampness";
              else if (liveRh >= 60) status = "High Humidity";

              updated[key] = {
                ...updated[key],
                rh: liveRh,
                temp: liveTemp,
                status: status,
              };
            }
          });
          return updated;
        });
        setIsLive(true);
      } catch (err) {
        console.error("Live weather fetch failed, using fallback averages:", err);
      }
    }

    fetchLiveWeather();
  }, []);

  // Automatic continuous forward rotation (resets countdown whenever active city changes or is clicked)
  useEffect(() => {
    const timer = setInterval(() => {
      setVirtualIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [virtualIndex]);

  // Smoothly scroll forward/backward to center the active virtual tab
  useEffect(() => {
    const container = containerRef.current;
    const tab = tabRefs.current[virtualIndex];

    if (container && tab) {
      const targetScrollLeft = tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });

      // After smooth animation, silently normalize virtualIndex to middle set (set 1: indices 6..11) if needed
      const timeout = setTimeout(() => {
        if (virtualIndex >= SET_SIZE * 2 || virtualIndex < SET_SIZE) {
          const normalizedIndex = (virtualIndex % SET_SIZE) + SET_SIZE;
          const normalizedTab = tabRefs.current[normalizedIndex];
          if (normalizedTab && container) {
            const normalizedScrollLeft = normalizedTab.offsetLeft - container.offsetWidth / 2 + normalizedTab.offsetWidth / 2;
            container.scrollTo({ left: normalizedScrollLeft, behavior: "auto" });
            setVirtualIndex(normalizedIndex);
          }
        }
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [virtualIndex]);

  // Direct click handler for specific tab button index
  const handleCityClick = (idx) => {
    setVirtualIndex(idx);
  };

  return (
    <div className="space-y-6">
      {/* Top Header outside card */}
      <div className="space-y-2">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-navy tracking-tight leading-tight">
          If it's not in the dehumidifier,{" "}
          <span className="text-[#D41124] block sm:inline">it's in your room.</span>
        </h2>
        <p className="text-xs md:text-sm text-brand-gray-medium max-w-xl font-sans leading-relaxed">
          AMFAH's heavy-duty humidity control extracts up to 96+ liters of excess moisture daily, capturing dampness before it affects your air, furniture, and walls.
        </p>
      </div>

      {/* Main Interactive Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 relative overflow-hidden font-sans">
        {/* Subtle background gradient glow */}
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-gradient-to-tl from-red-500/5 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row inside Card: Text + City Selector Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4">
          <p className="text-xs sm:text-sm text-slate-600 max-w-xs sm:max-w-sm leading-relaxed shrink-0">
            Humidity across India's top cities and coastal regions is in high double-digits for the majority of the year. Ideal indoor RH is{" "}
            <strong className="text-slate-900 font-bold">45&ndash;50%</strong>.
          </p>

          {/* City Selection Tabs - Continuous Forward Scroll Bar */}
          <div
            ref={containerRef}
            className="w-full lg:w-auto min-w-0 flex-1 overflow-x-auto no-scrollbar scroll-smooth py-1 relative text-gray-500"
          >
            <div className="flex items-center gap-2 whitespace-nowrap px-[35%] sm:px-[40%] md:px-[45%] py-1">
              {INFINITE_CITY_KEYS.map((cityKey, idx) => {
                const isActive = idx === virtualIndex;
                return (
                  <button
                    key={`${cityKey}-${idx}`}
                    ref={(el) => (tabRefs.current[idx] = el)}
                    onClick={() => handleCityClick(idx)}
                    className={`relative px-3 py-1 rounded-full text-xs font-bold tracking-wider font-display transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2 shrink-0 select-none ${isActive
                      ? "text-[#1D4ED8]"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCityBadge"
                        className="absolute inset-0 bg-[#EBF2FE] rounded-full shadow-sm ring-1 ring-[#1D4ED8]/20"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1 justify-center">
                      {isActive && (
                        <span className="relative flex h-2 w-2">
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1D4ED8]"></span>
                        </span>
                      )}
                      <span>{cityKey}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Body: Stats (Left) + 3D Monument Graphic (Right) */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-center">

          {/* Left Stats Section */}
          <div className="sm:col-span-6 space-y-2 sm:space-y-4 flex flex-col justify-start min-h-0 sm:min-h-[260px] md:min-h-[280px]">

            {/* Target RH & Temp Indicators */}
            <div className="flex items-center gap-8 text-xs py-2 sm:py-4 shrink-0">
              <div>
                <span className="block text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Target RH
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-800 font-display">
                  {currentCity.target}
                </span>
              </div>
              <div className="border-l border-slate-200 pl-8">
                <span className="block text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Avg Temp
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCity.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-800 font-display">
                      {currentCity.temp}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Big Live Humidity Number & Status */}
            <div className="space-y-1 flex-1 flex flex-col justify-start">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
                  Live Humidity
                </span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D41124]"></span>
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCity.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-0.5"
                >
                  <div className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-[#D41124] font-display tracking-tight leading-none my-0.5">
                    {currentCity.rh}%
                  </div>

                </motion.div>
              </AnimatePresence>
              <div className="text-sm text-slate-500 font-medium pt-1">
                Status
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCity.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1"
                >
                  <div className="text-base sm:text-lg font-extrabold text-[#D41124] font-display tracking-tight">
                    {currentCity.status}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Right 3D Landmark Graphic Container */}
          <div className="sm:col-span-6 flex items-center justify-center sm:justify-end relative mt-2 sm:mt-0">
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[450px] h-[200px] sm:h-[280px] md:h-[320px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentCity.name}
                  src={currentCity.image}
                  alt={`3D ${currentCity.name} Landmark`}
                  initial={{ opacity: 0, scale: 0.90 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0, ease: "easeOut" }}
                  className="w-full h-full max-h-full max-w-full object-contain filter transition-transform duration-300"
                />
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}



