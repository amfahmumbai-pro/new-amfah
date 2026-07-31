import NewsContent from "./NewsContent";
import { news } from "@/data/news";

export const metadata = {
  title: "Latest News & Corporate Updates | AMFAH India",
  description: "Stay informed with the latest corporate press releases, air quality updates, industry recognition, and engineering breakthroughs from AMFAH India.",
};

export default function NewsPage() {
  return <NewsContent initialNews={news} />;
}
