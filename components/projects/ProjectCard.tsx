"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { ReactNode } from "react";

export type ProjectCardData = {
  id: number;
  image: string;
  category: string;
  title: string;
  location?: string;
  year?: string;
  description: string;
  extendedDescription?: string;
  galleryImages?: string[];
};

type ProjectCardProps = {
  project: ProjectCardData;
  onClick: () => void;
};

export function ProjectCard({ project, onClick }: ProjectCardProps): ReactNode {
  const t = useTranslations("projects");
  return (
    <Card
      className="group cursor-pointer h-full overflow-hidden border border-border/60"
      hover={true}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full h-full text-left block"
      >
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
            <p className="text-white/95 text-xs line-clamp-2 mb-3">
              {project.extendedDescription ?? project.description}
            </p>
            <span className="inline-flex items-center gap-1.5 text-secondary-light font-medium text-xs">
              {t("view_full_details")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
        <div className="p-4 border-t border-border/50">
          <h3 className="text-base font-semibold text-foreground leading-tight">
            {project.title}
          </h3>
        </div>
      </button>
    </Card>
  );
}
