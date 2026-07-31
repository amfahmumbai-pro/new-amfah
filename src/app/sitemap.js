export const dynamic = "force-static";

import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { blogs } from "@/data/blogs";
import { news } from "@/data/news";

export default function sitemap() {
  const baseUrl = "https://amfah.com";

  // 1. Static Pages mapping
  const staticPaths = [
    "",
    "/about",
    "/products",
    "/industrial-dehumidifiers",
    "/home-dehumidifiers",
    "/humidifiers",
    "/air-purifiers",
    "/air-to-water",
    "/portable-ac",
    "/industries",
    "/blogs",
    "/news",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Products URLs mapping
  const productPaths = products.map((prod) => ({
    url: `${baseUrl}/products/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Dynamic Industry URLs mapping
  const industryPaths = industries.map((ind) => ({
    url: `${baseUrl}/industries/${ind.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // 4. Dynamic Blog URLs mapping
  const blogPaths = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 5. Dynamic News URLs mapping
  const newsPaths = news.map((item) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPaths,
    ...productPaths,
    ...industryPaths,
    ...blogPaths,
    ...newsPaths,
  ];
}

