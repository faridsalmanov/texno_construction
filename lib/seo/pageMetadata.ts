import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/seo/getSiteUrl";

const LINK_PREVIEW_IMAGE = "/logo.png";
const OG_IMAGE_WIDTH = 1024;
const OG_IMAGE_HEIGHT = 944;
const SITE_NAME = "TEXNO CONSTRUCTION AZ MMC";

type PageMetadataInput = {
  locale: string;
  /** URL path after locale, e.g. "" for home, "/about" for about */
  path: string;
  title: string;
  description: string;
};

/**
 * Per-page title, description, Open Graph, Twitter, and hreflang alternates.
 * Does not render any visible UI.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetadataInput): Metadata {
  const urlPath = `/${locale}${path}`;
  const origin = getSiteUrl().origin;

  const languages: Record<string, string> = {
    "x-default": `${origin}/az${path}`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${origin}/${loc}${path}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages,
    },
    openGraph: {
      title,
      description,
      locale,
      url: urlPath,
      type: "website",
      siteName: SITE_NAME,
      images: [
        {
          url: LINK_PREVIEW_IMAGE,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [LINK_PREVIEW_IMAGE],
    },
  };
}
