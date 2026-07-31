export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/search"],
    },
    sitemap: "https://amfah.com/sitemap.xml",
  };
}
