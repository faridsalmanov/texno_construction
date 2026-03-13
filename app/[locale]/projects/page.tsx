"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import type { ReactNode } from "react";
import type { ProjectCardData } from "@/components/projects/ProjectCard";

import cop29Image from "@/lib/assets/projects/cop29.jpeg";
import toplanImage from "@/lib/assets/projects/toplan.jpeg";
import zeferImage from "@/lib/assets/projects/zefer.png";

const PLACEHOLDER_IMAGE = (w: number, h: number, text: string) =>
  `https://placehold.co/${w}x${h}/1e3a5f/ffffff?text=${encodeURIComponent(text)}`;

const projects: ProjectCardData[] = [
  {
    id: 1,
    image: cop29Image.src,
    category: "Beynəlxalq",
    title: "COP29",
    location: "Bakı",
    year: "2024",
    description: "Beynəlxalq iqlim konfransı layihəsi",
    extendedDescription:
      "[Placeholder – Extended description for COP29 project. Add full project overview, scope of work, key achievements, timeline, and any notable details. This text will be displayed on hover and in the detail modal.]",
    galleryImages: [
      cop29Image.src,
      PLACEHOLDER_IMAGE(800, 600, "COP29 - Image 2"),
      PLACEHOLDER_IMAGE(800, 600, "COP29 - Image 3"),
    ],
  },
  {
    id: 2,
    image: zeferImage.src,
    category: "Kommersiya",
    title: "PMD PROJECTS",
    location: "Bakı",
    year: "2024",
    description: "Peşəkar tikinti-quraşdırma layihəsi",
    extendedDescription:
      "[Placeholder – Extended description for PMD PROJECTS. Add full project overview, scope of work, key achievements, timeline, and any notable details. This text will be displayed on hover and in the detail modal.]",
    galleryImages: [
      zeferImage.src,
      PLACEHOLDER_IMAGE(800, 600, "PMD - Image 2"),
      PLACEHOLDER_IMAGE(800, 600, "PMD - Image 3"),
    ],
  },
  {
    id: 3,
    image: toplanImage.src,
    category: "Tikinti",
    title: "TOPLAN",
    location: "Bakı",
    year: "2024",
    description: "Tikinti-quraşdırma layihəsi",
    extendedDescription:
      "[Placeholder – Extended description for TOPLAN project. Add full project overview, scope of work, key achievements, timeline, and any notable details. This text will be displayed on hover and in the detail modal.]",
    galleryImages: [
      toplanImage.src,
      PLACEHOLDER_IMAGE(800, 600, "TOPLAN - Image 2"),
      PLACEHOLDER_IMAGE(800, 600, "TOPLAN - Image 3"),
    ],
  },
];

export default function ProjectsPage(): ReactNode {
  const t = useTranslations("projects");
  const [selectedProject, setSelectedProject] =
    useState<ProjectCardData | null>(null);

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
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CTA />
    </main>
  );
}
