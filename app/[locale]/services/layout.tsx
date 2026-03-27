import type { Metadata } from "next";
import type { ReactNode } from "react";
import { loadSeoMetadata } from "@/lib/seo/loadSeoMetadata";

type ServicesLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ServicesLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  return loadSeoMetadata(locale, "services");
}

export default function ServicesLayout({
  children,
}: ServicesLayoutProps): ReactNode {
  return children;
}
