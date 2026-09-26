import NewsContent from "./NewsContent";
import { news } from "@/data/news";

export const metadata = {
  title: "AMFAH News, Launches & Press | AMFAH India",
  description: "Product launches, patent milestones, GeM listings and press coverage from AMFAH India's air quality and humidity business.",
  alternates: {
    canonical: "https://amfah.com/news/",
  },
  openGraph: {
    title: "AMFAH News, Launches & Press | AMFAH India",
    description: "Product launches, patent milestones, GeM listings and press coverage from AMFAH India's air quality and humidity business.",
    url: "https://amfah.com/news/",
    images: [
      {
        url: "https://amfah.com/news/dental-tribune.jpg",
        alt: "AMFAH News and Press",
      },
    ],
  },
};

export default function NewsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://amfah.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "News",
        "item": "https://amfah.com/news/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NewsContent initialNews={news} />
    </>
  );
}
