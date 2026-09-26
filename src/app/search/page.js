import { Suspense } from "react";
import SearchClient from "./SearchClient";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Search Dehumidifiers | Premium Air Treatment Systems",
  description: "Search and filter our complete catalog of industrial, commercial, and residential smart dehumidifiers to find the perfect match for your space.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://amfah.com/search/",
  },
  openGraph: {
    title: "Search Dehumidifiers | AMFAH",
    description: "Search and filter our complete catalog of industrial, commercial, and residential smart dehumidifiers to find the perfect match for your space.",
    url: "https://amfah.com/search/",
    images: [
      {
        url: "https://amfah.com/New-Logo-3.png",
        alt: "Search AMFAH Products",
      },
    ],
  },
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-center px-6">
          <Loader2 className="h-12 w-12 text-brand-blue animate-spin mb-4" />
          <h2 className="font-display font-bold text-xl text-brand-navy">Initializing Catalog Search...</h2>
          <p className="text-sm text-brand-gray-medium mt-1">Gathering premium moisture extraction specifications...</p>
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
