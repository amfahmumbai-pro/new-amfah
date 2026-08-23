"use client";
import { useState, useEffect } from "react";
import Link from "@/components/ui/AppLink";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, PhoneCall, Mail, Search, MessageSquareCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
    setSelected(val);
  };
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [contactIndex, setContactIndex] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setInterval(() => {
      setContactIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const contacts = [
    {
      type: "phone",
      href: "tel:+919321991812",
      label: "+91 93219 91812",
      icon: <PhoneCall className="h-4 w-4 text-brand-blue" />,
    },
    {
      type: "phone",
      href: "tel:02240107074",
      label: "022 40-107-074",
      icon: <PhoneCall className="h-4 w-4 text-brand-blue" />,
    },
    {
      type: "whatsapp",
      href: "https://wa.me/919004663226 ",
      label: "+91 90046 63226 ",
      icon: <MessageSquareCode className="h-4 w-4 text-brand-blue" />,
    },
    {
      type: "email",
      href: "mailto:info.india@amfah.com",
      label: "info.india@amfah.com",
      icon: <Mail className="h-4 w-4 text-brand-blue" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add solid white background and thin border on scroll
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && !isOpen) {
          setIsVisible(false); // scrolling down
        } else {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Home Dehumidifiers",
      href: "/home-dehumidifiers",
      dropdown: [
        { name: "Premium Series", href: "/home-dehumidifiers?filter=premium" },
        { name: "Economy Series", href: "/home-dehumidifiers?filter=economy" }
      ],
    },
    {
      name: "Commercial/Industrial Dehumidifiers",
      href: "/industrial-dehumidifiers",
      dropdown: [
        { name: "Premium Series", href: "/industrial-dehumidifiers?filter=premium" },
        { name: "Economy Series", href: "/industrial-dehumidifiers?filter=economy" },
        { name: "Ceiling Dehumidifier", href: "/industrial-dehumidifiers?filter=ceiling" },
      ],
    },
    { name: "Portable AC", href: "/portable-ac" },
    {
      name: "Products",
      href: "/products",
      dropdown: [
        { name: "Dehumidifiers", href: "/products" },
        { name: "Ceiling Dehumidifier", href: "/industrial-dehumidifiers?filter=ceiling" },
        { name: "Dehumidifiers (Desiccant / Hetro)", href: "https://www.dewteq.com/" },
        { name: "Air Purifiers", href: "/air-purifiers" },
        { name: "Humidifiers", href: "/humidifiers" },
        { name: "AIR to Water", href: "/air-to-water" },
      ],
    },
    {
      name: "Others",
      href: "#",
      dropdown: [
        { name: "About Us", href: "/about" },
        { name: "Blogs", href: "/blogs" },
        { name: "News", href: "/news" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <header
      onMouseLeave={() => handleSetSelected(null)}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm"
          : "bg-white border-b border-transparent"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Patent Announcement Banner */}
      <div className="bg-[#d41124] text-white text-center py-2.5 sm:py-4 text-xs md:text-[10px] lg:text-[14px] font-medium tracking-wide font-display relative z-10 select-none overflow-hidden">
        {/* Desktop View */}
        <div className="hidden sm:flex max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex-row items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5">
            India&apos;s Only Trusted Government-Approved, Patented & Licensed Brand Specializing in Air Quality and Humidity Solutions
            <img src="/images/patent.png" alt="Patent Logo" className="h-8 w-auto object-contain" />
          </span>
          <span className="opacity-60">|</span>
          <span className="inline-flex text-white/95 items-center gap-1.5">The Most Preferred Brand on the Government e-Marketplace (GeM) Portal
            <img src="/images/gem-logo.png" alt="Gem Logo" className="h-8 w-auto object-contain" />
          </span>
        </div>

        {/* Mobile Scrolling View */}
        <div className="sm:hidden w-full overflow-hidden whitespace-nowrap relative flex items-center">
          <div className="inline-flex animate-marquee gap-8" style={{ animationDuration: "25s" }}>
            <span className="shrink-0 pl-4 inline-flex items-center gap-1.5">
              India&apos;s only brand having patent licence for air quality and humidity solutions
              <img src="/images/patent.png" alt="Patent Logo" className="h-5 w-auto object-contain" />
              <span className="opacity-60 ml-1.5">|</span>
              <span className="ml-1.5 inline-flex">The Most Preferred Brand on the Government e-Marketplace (GeM) Portal.
                <img src="/images/gem-logo.png" alt="Gem Logo" className="h-4 w-auto object-contain" /></span>
            </span>
            <span className="shrink-0 inline-flex items-center gap-1.5" aria-hidden="true">
              India&apos;s only brand having patent licence for air quality and humidity solutions
              <img src="/images/patent.png" alt="Patent Logo" className="h-5 w-auto object-contain" />
              <span className="opacity-60 ml-1.5">|</span>
              <span className="ml-1.5 inline-flex">The Most Preferred Brand on the Government e-Marketplace (GeM) Portal.
                <img src="/images/gem-logo.png" alt="Gem Logo" className="h-4 w-auto object-contain" /></span>
            </span>
          </div>
        </div>
      </div>

      <div className={`max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-3" : "py-4 sm:py-5"
        }`}>
        {/* Logo */}
        <Link
          href="/"
          onMouseEnter={() => handleSetSelected(null)}
          className="flex items-center group shrink-0"
        >
          <Image
            src="/images/amfah-logo.png"
            alt="AMFAH Logo"
            width={140}
            height={40}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav
          id="desktop-nav-container"
          className="hidden lg:flex items-center gap-1.5 lg:gap-2.5 xl:gap-6 2xl:gap-7 shrink-0 relative"
        >
          {navLinks.map((link, index) => {
            const isActive =
              (link.href && link.href !== "#" && (pathname === link.href || pathname?.startsWith(link.href + "/"))) ||
              (link.dropdown && link.dropdown.some(sub => pathname === sub.href || pathname?.startsWith(sub.href + "/")));

            if (link.dropdown) {
              const isDropdownOpen = selected === index;
              const hasLink = link.href && link.href !== "#";
              const content = (
                <>
                  <span>{link.name}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </>
              );
              const linkClass = `flex items-center gap-0.5 font-display font-medium text-xs lg:text-xs xl:text-sm 2xl:text-base hover:text-brand-blue py-2 transition-colors cursor-pointer shrink-0 ${isActive ? "text-brand-blue" : "text-brand-navy"
                }`;

              return (
                <div
                  key={link.name}
                  className="relative shrink-0"
                >
                  {hasLink ? (
                    <Link
                      id={`shift-tab-${index}`}
                      href={link.href}
                      onMouseEnter={() => handleSetSelected(index)}
                      onClick={() => handleSetSelected(null)}
                      className={linkClass}
                    >
                      {content}
                    </Link>
                  ) : (
                    <button
                      id={`shift-tab-${index}`}
                      onMouseEnter={() => handleSetSelected(index)}
                      onClick={() => handleSetSelected(index)}
                      className={linkClass}
                    >
                      {content}
                    </button>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                id={`shift-tab-${index}`}
                href={link.href}
                onMouseEnter={() => handleSetSelected(null)}
                className={`inline-flex items-center font-display font-medium text-xs lg:text-xs xl:text-sm 2xl:text-base py-2 transition-all hover:text-brand-blue shrink-0 ${isActive ? "text-brand-blue" : "text-brand-navy"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          <AnimatePresence>
            {selected !== null && (
              <Content
                selected={selected}
                dir={dir}
                navLinks={navLinks}
                pathname={pathname}
                setSelected={setSelected}
              />
            )}
          </AnimatePresence>
        </nav>

        {/* CTA Contact Button */}
        <div
          onMouseEnter={() => handleSetSelected(null)}
          className="hidden lg:flex items-center gap-1 lg:gap-2 xl:gap-3 2xl:gap-4 shrink-0"
        >
          <div className="hidden xl:flex relative h-6 w-[175px] overflow-hidden flex items-center justify-start shrink-0">
            <AnimatePresence mode="wait">
              <motion.a
                key={contactIndex}
                href={contacts[contactIndex].href}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-y-0 flex items-center gap-2 font-display font-semibold text-sm justify-center text-brand-navy hover:text-brand-blue pl-0 md:pl-2 "
              >
                {contacts[contactIndex].icon}
                <span>{contacts[contactIndex].label}</span>
              </motion.a>
            </AnimatePresence>
          </div>
          <Link
            href="/search"
            className="h-10 w-10 flex items-center justify-center text-brand-navy hover:text-brand-blue transition-all duration-300 cursor-pointer group shrink-0"
            aria-label="Search Products"
          >
            <Search className="h-7 w-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
          </Link>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-brand-accent px-4 xl:px-5 py-2 xl:py-2.5 font-display font-semibold text-sm text-white transition-all [box-shadow:0px_4px_1px_#c27275] active:translate-y-[2px] active:shadow-none hover:bg-neutral-50 cursor-pointer shrink-0"
          >
            Inquire Now
          </Link>
        </div>

        {/* Mobile Search & Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/search"
            className="h-10 w-10 flex items-center justify-center text-brand-navy hover:text-brand-blue transition-all duration-300 cursor-pointer group"
            aria-label="Search Products"
          >
            <Search className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-brand-navy p-2 hover:bg-brand-gray-light rounded-lg transition-colors cursor-pointer "
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-brand-border shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-40 ${isOpen ? "h-[calc(100vh-100%)] overflow-y-auto opacity-100 py-6" : "h-0 overflow-hidden opacity-0 py-0"
          }`}
      >
        <div className="px-6 space-y-4 flex flex-col">
          {navLinks.map((link) => {
            if (link.dropdown) {
              const hasLink = link.href && link.href !== "#";
              return (
                <div key={link.name} className="space-y-1">
                  {hasLink ? (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block font-display font-semibold text-brand-gray-medium text-xs uppercase tracking-wider pl-2 hover:text-brand-blue transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <div className="font-display font-semibold text-brand-gray-medium text-xs uppercase tracking-wider pl-2">
                      {link.name}
                    </div>
                  )}
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      target={sub.href.startsWith("http") ? "_blank" : undefined}
                      rel={sub.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={`block px-2 py-2 rounded-lg font-display font-medium text-brand-navy hover:bg-brand-gray-light ${pathname === sub.href ? "text-brand-blue bg-brand-blue-light" : ""
                        }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-2 py-2.5 rounded-lg font-display font-semibold text-lg text-brand-navy hover:bg-brand-gray-light ${pathname === link.href ? "text-brand-blue bg-brand-blue-light" : ""
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-brand-border space-y-4 pb-20">
            <div className="relative h-10 w-full overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.a
                  key={contactIndex}
                  href={contacts[contactIndex].href}
                  onClick={() => setIsOpen(false)}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center gap-2 font-display font-bold text-brand-navy py-2 px-4 rounded-lg hover:bg-brand-gray-light"
                >
                  {contacts[contactIndex].icon}
                  <span>{contacts[contactIndex].label}</span>
                </motion.a>
              </AnimatePresence>
            </div>
            <Button href="/search" variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
              Search Products
            </Button>
            <Button href="/contact" variant="secondary" className="w-full " onClick={() => setIsOpen(false)}>
              Get Free Quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

const Content = ({ selected, dir, navLinks, pathname, setSelected }) => {
  const [left, setLeft] = useState(0);
  const [nubLeft, setNubLeft] = useState(0);
  const width = 270; // Width of the dropdown panel

  useEffect(() => {
    const movePanel = () => {
      if (selected !== null) {
        const hoveredTab = document.getElementById(`shift-tab-${selected}`);
        const navContainer = document.getElementById("desktop-nav-container");
        if (!hoveredTab || !navContainer) return;

        const tabRect = hoveredTab.getBoundingClientRect();
        const navRect = navContainer.getBoundingClientRect();

        // Calculate horizontal center of the active tab relative to the nav container
        const tabCenter = tabRect.left + tabRect.width / 2 - navRect.left;

        // Position the dropdown content centered under the tab
        let idealLeft = tabCenter - width / 2;

        // Constraint checking to keep dropdown within nav boundaries
        const minLeft = -20;
        const maxLeft = navRect.width - width + 20;
        idealLeft = Math.max(minLeft, Math.min(idealLeft, maxLeft));

        setLeft(idealLeft);

        // Position the nub precisely under the center of the tab relative to the dropdown container
        const relativeNubLeft = tabCenter - idealLeft;
        setNubLeft(relativeNubLeft);
      }
    };

    movePanel();
    // Re-run on resize
    window.addEventListener("resize", movePanel);
    return () => window.removeEventListener("resize", movePanel);
  }, [selected]);

  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: -16,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        left,
      }}
      exit={{
        opacity: 0,
        y: -16,
        scale: 0.96,
      }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1], // premium cubic-bezier ease out
        left: { duration: 0.25, ease: "easeInOut" }, // smooth slide
      }}
      className="absolute top-[calc(100%_-_4px)] z-50 bg-white border border-brand-border/60 rounded-2xl shadow-xl p-4 flex flex-col pointer-events-auto"
      style={{ width }}
    >
      {/* Interaction bridge to keep mouse hovering */}
      <div className="absolute -top-[16px] left-0 right-0 h-[16px] cursor-default" />

      {/* Shifting Nub */}
      <motion.span
        style={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        }}
        animate={{ left: nubLeft }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute -top-[7px] h-2 w-3.5 bg-brand-border/60 flex items-center justify-center -translate-x-1/2"
      >
        <span
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          className="h-2 w-3 bg-white mt-[1px]"
        />
      </motion.span>

      {/* Dropdown Contents with Slide Transitions */}
      {navLinks.map((link, index) => {
        if (!link.dropdown) return null;

        return (
          <div className="overflow-hidden" key={link.name}>
            {selected === index && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === "l" ? 40 : dir === "r" ? -40 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="flex flex-col space-y-1.5"
              >
                {link.dropdown.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    target={sub.href.startsWith("http") ? "_blank" : undefined}
                    rel={sub.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() => setSelected(null)}
                    className={`block px-3 py-2 rounded-xl font-display text-sm font-medium hover:bg-brand-gray-light hover:text-brand-blue transition-all ${pathname === sub.href
                        ? "text-brand-blue bg-brand-blue-light"
                        : "text-brand-navy"
                      }`}
                  >
                    {sub.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};
