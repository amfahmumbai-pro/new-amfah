import NewsContent from "./NewsContent";
import { news } from "@/data/news";

export const metadata = {
  title: "AMFAH News, Launches & Press | AMFAH India",
  description: "Product launches, patent milestones, GeM listings and press coverage from AMFAH India's air quality and humidity business.",
  alternates: {
    canonical: "https://amfah.com/news",
  },
  openGraph: {
    title: "AMFAH News, Launches & Press | AMFAH India",
    description: "Product launches, patent milestones, GeM listings and press coverage from AMFAH India's air quality and humidity business.",
    url: "https://amfah.com/news",
    images: [
      {
        url: "/news/dental-tribune.jpg",
        alt: "AMFAH News and Press",
      },
    ],
  },
};

export default function NewsPage() {
  return <NewsContent initialNews={news} />;
}
