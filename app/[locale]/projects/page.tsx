"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import type { ReactNode } from "react";
import type { ProjectCardData } from "@/components/projects/ProjectCard";

import cop29Image from "@/lib/assets/projects/cop29.jpeg";
import cop29Photo from "@/lib/assets/projects/cop29_photo.jpeg";
import toplanImage from "@/lib/assets/projects/toplan.jpeg";
import toplanImagePng from "@/lib/assets/projects/toplan image.png";
import zeferImage from "@/lib/assets/projects/zefer.png";
import zeferMuzey from "@/lib/assets/projects/zefer muzey.jpg";
import zeferMuzey2 from "@/lib/assets/projects/zefermuzey2.jpg";
import azerisiqImage from "@/lib/assets/projects/azerisiq.png";
import azerisiqImage1 from "@/lib/assets/projects/azerisiq1.jpg";
import mediaCenterImage from "@/lib/assets/projects/media center.jpg";
import mediacenterImage from "@/lib/assets/projects/mediacenter.png";
import oliveImage from "@/lib/assets/projects/olive.jpeg";
import olivegardenImage from "@/lib/assets/projects/olivegarden.png";
import bakuoliveImage from "@/lib/assets/projects/bakuolive.png";

type TWithValues = (key: string, values?: Record<string, string>) => string;

type ProjectsData = {
  projects: ProjectCardData[];
  works: ProjectCardData[];
};

function useActivitiesData(t: TWithValues): ProjectsData {
  return useMemo(
    () => ({
      projects: [
        {
          id: 1,
          image: cop29Image.src,
          category: t("categories.international"),
          title: t("names.cop29"),
          location: "Bakı",
          year: "2024",
          description: t("descriptions.cop29_short"),
          extendedDescription: t("extended.cop29"),
          galleryImages: [cop29Image.src, cop29Photo.src],
        },
        {
          id: 2,
          image: zeferImage.src,
          category: t("categories.commercial"),
          title: t("names.zefer_muzeyi"),
          location: "Bakı",
          year: "2024",
          description: t("descriptions.pmd_short"),
          extendedDescription: t("extended.pmd"),
          galleryImages: [
            zeferImage.src,
            zeferMuzey.src,
            zeferMuzey2.src,
          ],
        },
        {
          id: 3,
          image: toplanImage.src,
          category: t("categories.construction"),
          title: t("names.toplan"),
          location: "Bakı",
          year: "2024",
          description: t("descriptions.toplan_short"),
          extendedDescription: t("extended.toplan"),
          galleryImages: [toplanImage.src, toplanImagePng.src],
        },
      ],
      works: [
        {
          id: 4,
          image: mediaCenterImage.src,
          category: t("categories.commercial"),
          title: t("names.baku_media_center"),
          location: "Bakı",
          year: "2024",
          description: t("descriptions.media_center_short"),
          extendedDescription: t("extended.media_center"),
          galleryImages: [mediaCenterImage.src, mediacenterImage.src],
        },
        {
          id: 5,
          image: azerisiqImage1.src,
          category: t("categories.commercial"),
          title: t("names.azerisiq"),
          location: "Bakı",
          year: "2024",
          description: t("descriptions.azerisiq_short"),
          extendedDescription: t("extended.azerisiq"),
          galleryImages: [azerisiqImage1.src, azerisiqImage.src],
        },
        {
          id: 6,
          image: olivegardenImage.src,
          category: t("categories.commercial"),
          title: t("names.absheron_olive_garden"),
          location: "Bakı",
          year: "2024",
          description: t("descriptions.olive_garden_short"),
          extendedDescription: t("extended.olive_garden"),
          galleryImages: [olivegardenImage.src, oliveImage.src, bakuoliveImage.src],
        },
      ],
    }),
    [t]
  );
}

function ActivityGrid({
  items,
  onSelect,
}: {
  items: ProjectCardData[];
  onSelect: (project: ProjectCardData) => void;
}): ReactNode {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((project) => (
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
            onClick={() => onSelect(project)}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function ProjectsPage(): ReactNode {
  const t = useTranslations("projects");
  const { projects, works } = useActivitiesData(t as TWithValues);
  const [selectedProject, setSelectedProject] =
    useState<ProjectCardData | null>(null);

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pt-28 sm:pb-18 md:pt-32 md:pb-20 bg-primary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-white/90">{t("subtitle")}</p>
          </motion.div>
        </Container>
      </section>

      {/* Our Projects Section */}
      <section className="py-16 bg-card">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-foreground mb-10"
          >
            {t("section_projects")}
          </motion.h2>
          <ActivityGrid items={projects} onSelect={setSelectedProject} />
        </Container>
      </section>

      {/* Our Works Section */}
      <section className="py-16 bg-background">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-foreground mb-10"
          >
            {t("section_works")}
          </motion.h2>
          <ActivityGrid items={works} onSelect={setSelectedProject} />
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
