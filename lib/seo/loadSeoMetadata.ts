import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo/pageMetadata";

export type SeoPageKey =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "contact";

const PATHS: Record<SeoPageKey, string> = {
  home: "",
  about: "/about",
  services: "/services",
  projects: "/projects",
  contact: "/contact",
};

export async function loadSeoMetadata(
  locale: string,
  page: SeoPageKey
): Promise<Metadata> {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildPageMetadata({
    locale,
    path: PATHS[page],
    title: t(`${page}.title`),
    description: t(`${page}.description`),
  });
}
