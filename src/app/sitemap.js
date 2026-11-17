export const dynamic = "force-static";

import { products } from "@/data/products";
import { applications } from "@/data/applications";
import { blogs } from "@/data/blogs";
import { news } from "@/data/news";

/**
 * Safely parse a date string or timestamp into a valid Date object.
 * Falls back to fallbackDate if invalid.
 */
function parseDateSafe(dateVal, fallbackDate) {
  if (!dateVal) return fallbackDate;
  const d = new Date(dateVal);
  return isNaN(d.getTime()) ? fallbackDate : d;
}

export default function sitemap() {
  const baseUrl = "https://amfah.com";

  // 1. Static Canonical Pages mapping with verified, realistic modification dates
  const staticPaths = [
    { path: "/", priority: 1.0, changeFrequency: "daily", lastModified: new Date("2026-11-17") },
    { path: "/blogs/", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-11-17") },
    { path: "/portable-ac/", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-11-17") },
    { path: "/products/", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-11-17") },
    { path: "/home-dehumidifiers/", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-11-01") },
    { path: "/industrial-dehumidifiers/", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-11-01") },
    { path: "/ceiling-dehumidifiers/", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-10-15") },
    { path: "/air-purifiers/", priority: 0.85, changeFrequency: "weekly", lastModified: new Date("2026-10-15") },
    { path: "/humidifiers/", priority: 0.85, changeFrequency: "weekly", lastModified: new Date("2026-10-15") },
    { path: "/air-to-water/", priority: 0.85, changeFrequency: "weekly", lastModified: new Date("2026-10-15") },
    { path: "/news/", priority: 0.75, changeFrequency: "weekly", lastModified: new Date("2026-06-24") },
    { path: "/about/", priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-08-01") },
    { path: "/faq/", priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-09-01") },
    { path: "/contact/", priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-08-01") },
  ].map((item) => ({
    url: `${baseUrl}${item.path}`,
    lastModified: item.lastModified,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // 2. Dynamic Product URLs (Uses product updatedAt / lastModified if specified, or specific recent update dates)
  const productPaths = products.map((prod) => {
    let modDate = new Date("2026-10-01"); // Base catalog baseline
    if (prod.lastModified || prod.updatedAt) {
      modDate = parseDateSafe(prod.lastModified || prod.updatedAt, modDate);
    } else if (prod.slug === "amf-pdac-18hc") {
      modDate = new Date("2026-11-17"); // New model launched Nov 17, 2026
    } else if (prod.slug === "amf-pdac18") {
      modDate = new Date("2026-11-15"); // Updated with cool status & badge Nov 15, 2026
    }

    return {
      url: `${baseUrl}/products/${prod.slug}/`,
      lastModified: modDate,
      changeFrequency: "weekly",
      priority: 0.9,
    };
  });

  // 3. Dynamic Live Application URLs
  const applicationPaths = applications.map((app) => ({
    url: `${baseUrl}/${app.type === "home" ? "home-uses" : "industrial-uses"}/${app.slug}/`,
    lastModified: parseDateSafe(app.lastModified || app.updatedAt, new Date("2026-09-15")),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // 4. Dynamic Blog URLs (Directly derived from the article's actual published/updated date)
  const blogPaths = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}/`,
    lastModified: parseDateSafe(blog.lastModified || blog.date, new Date("2026-01-01")),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 5. Dynamic News URLs (Derived from the news announcement date)
  const newsPaths = news.map((item) => ({
    url: `${baseUrl}/news/${item.slug}/`,
    lastModified: parseDateSafe(item.lastModified || item.date, new Date("2026-01-01")),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPaths,
    ...productPaths,
    ...applicationPaths,
    ...blogPaths,
    ...newsPaths,
  ];
}
