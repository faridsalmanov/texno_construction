"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/CTA";
import type { ReactNode } from "react";

import cop29Image from "@/lib/assets/projects/cop29.jpeg";
import toplanImage from "@/lib/assets/projects/toplan.jpeg";
import zeferImage from "@/lib/assets/projects/zefer.png";

type Project = {
  id: number;
  image: string;
  category: string;
  title: string;
  location: string;
  year: string;
  description: string;
};

const projects: Project[] = [
  {
    id: 1,
    image: cop29Image.src,
    category: "Beynəlxalq",
    title: "COP29",
    location: "Bakı",
    year: "2024",
    description: "Beynəlxalq iqlim konfransı layihəsi",
  },
  {
    id: 2,
    image: zeferImage.src,
    category: "Kommersiya",
    title: "PMD PROJECTS",
    location: "Bakı",
    year: "2024",
    description: "Peşəkar tikinti-quraşdırma layihəsi",
  },
  {
    id: 3,
    image: toplanImage.src,
    category: "Tikinti",
    title: "TOPLAN",
    location: "Bakı",
    year: "2024",
    description: "Tikinti-quraşdırma layihəsi",
  },
];

export default function ProjectsPage(): ReactNode {
  const t = useTranslations("projects");

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-white/90">{t("subtitle")}</p>
          </motion.div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <Container>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group cursor-pointer h-full">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-muted text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {project.year}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </Container>
      </section>

      <CTA />
    </main>
  );
}
