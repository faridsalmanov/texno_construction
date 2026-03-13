"use client";

import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import type { ReactNode } from "react";

export type ProjectCardData = {
  id: number;
  image: string;
  category: string;
  title: string;
  location: string;
  year: string;
  description: string;
  extendedDescription?: string;
  galleryImages?: string[];
};

type ProjectCardProps = {
  project: ProjectCardData;
  onClick: () => void;
};

export function ProjectCard({ project, onClick }: ProjectCardProps): ReactNode {
  return (
    <Card
      className="group cursor-pointer h-full overflow-hidden"
      hover={true}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full h-full text-left block"
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Hover overlay - more info on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
            <p className="text-white/95 text-sm line-clamp-3 mb-4">
              {project.extendedDescription ?? project.description}
            </p>
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                {project.year}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 mt-3 text-secondary-light font-medium text-sm">
              View full details
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
        <div className="p-6">
          <span className="text-xs font-medium text-secondary uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="text-xl font-semibold text-foreground mt-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-4 text-muted text-sm mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {project.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {project.year}
            </span>
          </div>
        </div>
      </button>
    </Card>
  );
}
