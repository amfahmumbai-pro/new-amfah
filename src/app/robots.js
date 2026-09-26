export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/private/",
        "/feed/",
        "*/feed/",
        "/author/",
        "/wp-admin/",
      ],
    },
    sitemap: "https://amfah.com/sitemap.xml",
  };
}
