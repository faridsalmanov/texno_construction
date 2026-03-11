import type { ReactNode } from "react";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Partners } from "@/components/sections/Partners";
import { CTA } from "@/components/sections/CTA";

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
