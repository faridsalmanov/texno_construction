import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/seo/getSiteUrl";

const PATHS = ["", "/about", "/services", "/projects", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of PATHS) {
      const url = `${base}/${locale}${path}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
