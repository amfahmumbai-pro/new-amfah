export const dynamic = "force-static";

import { products } from "@/data/products";
import { applications } from "@/data/applications";
import { blogs } from "@/data/blogs";
import { news } from "@/data/news";

export default function sitemap() {
  const baseUrl = "https://amfah.com";

  // 1. Static Canonical Pages mapping (standardized with trailing slash)
  const staticPaths = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/products/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/home-dehumidifiers/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/industrial-dehumidifiers/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/ceiling-dehumidifiers/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/portable-ac/", priority: 0.85, changeFrequency: "weekly" },
    { path: "/air-purifiers/", priority: 0.85, changeFrequency: "weekly" },
    { path: "/humidifiers/", priority: 0.85, changeFrequency: "weekly" },
    { path: "/air-to-water/", priority: 0.85, changeFrequency: "weekly" },
    { path: "/about/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blogs/", priority: 0.8, changeFrequency: "weekly" },
    { path: "/news/", priority: 0.75, changeFrequency: "weekly" },
  ].map((item) => ({
    url: `${baseUrl}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // 2. Dynamic Product URLs (43 verified models)
  const productPaths = products.map((prod) => ({
    url: `${baseUrl}/products/${prod.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Dynamic Live Application URLs (17 verified active industrial & home applications)
  const applicationPaths = applications.map((app) => ({
    url: `${baseUrl}/${app.type === "home" ? "home-uses" : "industrial-uses"}/${app.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // 4. Dynamic Blog URLs (49 verified articles)
  const blogPaths = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 5. Dynamic News URLs (3 verified announcements)
  const newsPaths = news.map((item) => ({
    url: `${baseUrl}/news/${item.slug}/`,
    lastModified: new Date(),
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
