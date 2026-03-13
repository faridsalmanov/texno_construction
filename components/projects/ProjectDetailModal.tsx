"use client";

import { useEffect, useCallback } from "react";
import { X, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import type { ProjectCardData } from "./ProjectCard";

type ProjectDetailModalProps = {
  project: ProjectCardData | null;
  onClose: () => void;
};

export function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps): ReactNode {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [project, handleEscape]);

  return (
    <AnimatePresence>
      {project && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-label="Close modal"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>

          {/* Image gallery */}
          <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide bg-card border-b border-border">
            {(project.galleryImages ?? [project.image]).map((src, index) => (
              <div
                key={`${project.id}-img-${index}`}
                className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden bg-muted"
              >
                <img
                  src={src}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Text content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <span className="text-xs font-medium text-secondary uppercase tracking-wider">
              {project.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1 mb-4">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-muted text-sm mb-6">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {project.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {project.year}
              </span>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-muted leading-relaxed">
                {project.extendedDescription ?? project.description}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
