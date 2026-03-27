import type { Metadata } from "next";
import type { ReactNode } from "react";
import { loadSeoMetadata } from "@/lib/seo/loadSeoMetadata";

type ProjectsLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ProjectsLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  return loadSeoMetadata(locale, "projects");
}

export default function ProjectsLayout({
  children,
}: ProjectsLayoutProps): ReactNode {
  return children;
}
