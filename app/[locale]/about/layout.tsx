import type { Metadata } from "next";
import type { ReactNode } from "react";
import { loadSeoMetadata } from "@/lib/seo/loadSeoMetadata";

type AboutLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  return loadSeoMetadata(locale, "about");
}

export default function AboutLayout({ children }: AboutLayoutProps): ReactNode {
  return children;
}
