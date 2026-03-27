import type { Metadata } from "next";
import type { ReactNode } from "react";
import { loadSeoMetadata } from "@/lib/seo/loadSeoMetadata";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Partners } from "@/components/sections/Partners";
import { CTA } from "@/components/sections/CTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return loadSeoMetadata(locale, "home");
}

export default function HomePage(): ReactNode {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Projects />
      <Partners />
      <CTA />
    </main>
  );
}
