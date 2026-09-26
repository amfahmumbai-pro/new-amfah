import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AIReviewButton from "@/components/ui/AIReviewButton";
import AmfahChatbot from "@/components/ui/AmfahChatbot";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Preloader from "@/components/ui/Preloader";
import ContactPopup from "@/components/forms/ContactPopup";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Dehumidifiers & Air Quality Solutions India | AMFAH",
  description: "India's patented, GeM-preferred brand for dehumidifiers, air purifiers, humidifiers and portable ACs. Trusted by AIIMS, ISRO and Taj since 2008.",
  metadataBase: new URL("https://amfah.com"),
  keywords: [
    "industrial dehumidifier",
    "home dehumidifier",
    "humidity control",
    "commercial dehumidifier",
    "pharmaceutical humidity control",
    "warehouse dehumidification",
    "AMFAH India",
  ],
  authors: [{ name: "AMFAH India" }],
  creator: "AMFAH India",
  publisher: "AMFAH India",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/fevicon.png",
    apple: "/images/fevicon.png",
  },
  openGraph: {
    title: "AMFAH Dehumidifiers | Premium Industrial & Home Moisture Control",
    description: "AMFAH is an industry pioneer in indoor air quality and humidity control. Discover our premium high-capacity industrial systems and ultra-quiet home dehumidifiers.",
    siteName: "AMFAH",
    locale: "en_US",
    type: "website",
    url: "https://amfah.com/",
    images: [
      {
        url: "https://amfah.com/images/amfah-logo.png",
        width: 800,
        height: 600,
        alt: "AMFAH India Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://amfah.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMFAH Dehumidifiers | Premium Industrial & Home Moisture Control",
    description: "Discover our premium high-capacity industrial systems and ultra-quiet home dehumidifiers.",
    images: ["https://amfah.com/images/amfah-logo.png"],
  },
};

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://amfah.com/#organization",
      name: "AMFAH India",
      legalName: "AMFAH INDIA TRADING PVT LTD",
      url: "https://amfah.com/",
      logo: {
        "@type": "ImageObject",
        "@id": "https://amfah.com/#logo",
        url: "https://amfah.com/New-Logo-3.png",
        contentUrl: "https://amfah.com/New-Logo-3.png",
        caption: "AMFAH India",
      },
      image: "https://amfah.com/New-Logo-3.png",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9321991812",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      ],
      sameAs: [
        "https://www.facebook.com/officialamfahindia/",
        "https://www.instagram.com/amfah_airquality/",
        "https://www.linkedin.com/company/amfah-india-trading-pvt-ltd/",
        "https://x.com/amfahindia",
        "https://www.youtube.com/@AMFAHINDIA",
        "https://in.pinterest.com/amfahhumiditysolutions/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://amfah.com/#website",
      url: "https://amfah.com/",
      name: "AMFAH",
      description: "Patented Dehumidifiers, Humidifiers, Air Purifiers & Portable ACs in India",
      publisher: {
        "@id": "https://amfah.com/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://amfah.com/search/?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-brand-gray-dark font-sans">
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WSGCYSLD4L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WSGCYSLD4L');
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2376677239493029');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2376677239493029&ev=PageView&noscript=1"
            alt="facebook-pixel"
          />
        </noscript>

        {/* ── STATIC PRELOADER — in first server HTML so it shows before React hydrates ── */}
        <div
          id="site-preloader"
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "#ffffff", display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 99999,
            transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), visibility 0.6s",
          }}
        >
          <div className="loader">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <defs>
                <mask id="clipping">
                  <polygon points="0,0 100,0 100,100 0,100" fill="black" />
                  <polygon points="25,25 75,25 50,75" fill="white" />
                  <polygon points="50,25 75,75 25,75" fill="white" />
                  <polygon points="35,35 65,35 50,65" fill="white" />
                  <polygon points="35,35 65,35 50,65" fill="white" />
                  <polygon points="35,35 65,35 50,65" fill="white" />
                  <polygon points="35,35 65,35 50,65" fill="white" />
                </mask>
              </defs>
            </svg>
            <div className="box"></div>
          </div>
        </div>

        {/* Lock scroll immediately — runs before any paint */}
        <script dangerouslySetInnerHTML={{ __html: `document.body.style.overflow='hidden';` }} />

        {/* Preloader component dismisses the static div above after React hydrates */}
        <Preloader />

        {/* Global Route Change Progress Bar */}
        <NextTopLoader
          color="#1251a0" // brand-blue for maximum visibility over red banner and white pages
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          zIndex={999999}
        />

        <ScrollToTop />
        <Navbar />
        <main className="flex-grow pt-[110px] sm:pt-[116px]">{children}</main>
        <Footer />
        <WhatsAppButton />
        <AIReviewButton />
        <AmfahChatbot />
        {/* <ContactPopup /> */}
      </body>
    </html>
  );
}
