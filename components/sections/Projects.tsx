"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

import cop29Image from "@/lib/assets/projects/cop29.jpeg";
import toplanImage from "@/lib/assets/projects/toplan.jpeg";
import zeferImage from "@/lib/assets/projects/zefer.png";

type Project = {
  id: number;
  image: string;
  category: string;
  title: string;
};

const projects: Project[] = [
  {
    id: 1,
    image: cop29Image.src,
    category: "International",
    title: "COP29",
  },
  {
    id: 2,
    image: zeferImage.src,
    category: "Commercial",
    title: "PMD PROJECTS",
  },
  {
    id: 3,
    image: toplanImage.src,
    category: "Construction",
    title: "TOPLAN",
  },
];

export function Projects(): ReactNode {
  const t = useTranslations("projects");

  return (
    <section className="py-20 bg-card" id="projects">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button href="/projects" variant="outline" size="lg">
            {t("view_all")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
