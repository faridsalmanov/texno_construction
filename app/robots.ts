import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/getSiteUrl";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteUrl().origin;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
